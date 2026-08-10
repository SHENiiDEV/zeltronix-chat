(function () {
    if (window.ZeltrionixWidgetLoaded) return;
    window.ZeltrionixWidgetLoaded = true;

    // Find script tag and extract bot id
    const currentScript = document.currentScript || (function () {
        const scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    const botId = currentScript ? currentScript.getAttribute('data-bot-id') : null;
    if (!botId) {
        console.error('Zeltrionix Widget: Missing data-bot-id attribute on script tag.');
        return;
    }

    const API_BASE = currentScript.src ? new URL(currentScript.src).origin : window.location.origin;

    let sessionToken = localStorage.getItem('zeltronix_session_' + botId) || null;
    let botConfig = {
        name: 'AI Support Assistant',
        greeting_message: 'Hello! How can I help you today?',
        primary_color: '#3b82f6',
        secondary_color: '#a855f7',
        theme_mode: 'dark'
    };

    let isOpen = false;
    let isSending = false;

    // Helper: Safe Markdown Parser for Assistant Responses
    function parseMarkdown(text, isLight) {
        if (!text) return '';
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const boldColor = isLight ? '#0f172a' : '#ffffff';
        const italicColor = isLight ? '#334155' : '#cbd5e1';

        // Bold **text** or __text__
        html = html.replace(/\*\*(.*?)\*\*/g, `<strong style="font-weight:700; color:${boldColor};">$1</strong>`);
        html = html.replace(/__(.*?)__/g, `<strong style="font-weight:700; color:${boldColor};">$1</strong>`);

        // Italic *text* or _text_
        html = html.replace(/\*(.*?)\*/g, `<em style="font-style:italic; color:${italicColor};">$1</em>`);

        // Code blocks `code`
        html = html.replace(/`(.*?)`/g, '<code style="background:rgba(59,130,246,0.1); padding:2px 6px; border-radius:4px; font-family:monospace; font-size:12px; color:#2563eb;">$1</code>');

        // Bullet points "- " or "* "
        html = html.replace(/(?:^|\n)[-•*]\s+(.*?)(?=\n|$)/g, '<br/>• $1');

        // Line breaks
        html = html.replace(/\n/g, '<br/>');

        return html;
    }

    // Create container
    const widgetContainer = document.createElement('div');
    widgetContainer.id = 'zeltronix-widget-root';
    widgetContainer.innerHTML = `
        <style>
            #zeltronix-widget-root {
                position: fixed;
                bottom: 24px;
                right: 24px;
                z-index: 999999;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            }
            .zt-toggle-btn {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, var(--zt-primary, #3b82f6), var(--zt-secondary, #a855f7));
                box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.2);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            .zt-toggle-btn:hover {
                transform: scale(1.08);
                box-shadow: 0 15px 30px -5px rgba(168, 85, 247, 0.6);
            }
            .zt-toggle-btn svg {
                width: 28px;
                height: 28px;
                fill: white;
            }

            /* CHAT WINDOW BASE STYLES */
            .zt-chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 380px;
                max-width: calc(100vw - 32px);
                height: 540px;
                max-height: calc(100vh - 120px);
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                pointer-events: none;
                transition: opacity 0.25s ease, transform 0.25s ease, background 0.3s ease;
            }
            .zt-chat-window.open {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }

            /* DARK THEME STYLES */
            .zt-chat-window.zt-theme-dark {
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 20px rgba(59, 130, 246, 0.2);
            }
            .zt-theme-dark .zt-header {
                background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95));
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
            .zt-theme-dark .zt-header-title { color: #f8fafc; }
            .zt-theme-dark .zt-messages { background: #090d16; }
            .zt-theme-dark .zt-msg-assistant {
                background: #1e293b;
                color: #e2e8f0;
                border: 1px solid rgba(255, 255, 255, 0.08);
            }
            .zt-theme-dark .zt-input-area {
                background: #0f172a;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
            }
            .zt-theme-dark .zt-input {
                background: #1e293b;
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: white;
            }
            .zt-theme-dark .zt-footer-branding { background: #0b1120; color: #64748b; }

            /* LIGHT THEME STYLES */
            .zt-chat-window.zt-theme-light {
                background: #ffffff;
                border: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 15px rgba(0, 0, 0, 0.05);
            }
            .zt-theme-light .zt-header {
                background: linear-gradient(135deg, #ffffff, #f8fafc);
                border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            }
            .zt-theme-light .zt-header-title { color: #0f172a; }
            .zt-theme-light .zt-messages { background: #f8fafc; }
            .zt-theme-light .zt-msg-assistant {
                background: #ffffff;
                color: #1e293b;
                border: 1px solid rgba(0, 0, 0, 0.08);
                box-shadow: 0 2px 4px rgba(0,0,0,0.02);
            }
            .zt-theme-light .zt-input-area {
                background: #ffffff;
                border-top: 1px solid rgba(0, 0, 0, 0.08);
            }
            .zt-theme-light .zt-input {
                background: #f1f5f9;
                border: 1px solid #cbd5e1;
                color: #0f172a;
            }
            .zt-theme-light .zt-footer-branding { background: #f1f5f9; color: #64748b; }

            .zt-header {
                padding: 16px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .zt-header-title {
                font-weight: 700;
                font-size: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .zt-status-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #10b981;
                box-shadow: 0 0 8px #10b981;
            }
            .zt-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 6px;
            }
            .zt-close-btn:hover {
                color: #0f172a;
                background: rgba(0, 0, 0, 0.05);
            }
            .zt-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .zt-msg {
                max-width: 85%;
                padding: 12px 16px;
                border-radius: 16px;
                font-size: 14px;
                line-height: 1.5;
                word-break: break-word;
            }
            .zt-msg-user {
                align-self: flex-end;
                background: linear-gradient(135deg, var(--zt-primary, #3b82f6), #2563eb);
                color: white;
                border-bottom-right-radius: 4px;
                box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
            }
            .zt-msg-assistant {
                align-self: flex-start;
                border-bottom-left-radius: 4px;
            }
            .zt-input-area {
                padding: 14px 16px;
                display: flex;
                gap: 8px;
                align-items: center;
            }
            .zt-input {
                flex: 1;
                border-radius: 12px;
                padding: 10px 14px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.2s;
            }
            .zt-input:focus {
                border-color: var(--zt-primary, #3b82f6);
            }
            .zt-send-btn {
                background: var(--zt-primary, #3b82f6);
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 10px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: transform 0.15s, opacity 0.2s;
            }
            .zt-send-btn:hover {
                transform: scale(1.05);
            }
            .zt-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            .zt-footer-branding {
                text-align: center;
                font-size: 11px;
                padding: 6px;
            }
            .zt-footer-branding a {
                color: #3b82f6;
                text-decoration: none;
            }
            .zt-typing {
                display: flex;
                gap: 4px;
                align-items: center;
                padding: 8px 12px;
            }
            .zt-typing-dot {
                width: 6px;
                height: 6px;
                background: #94a3b8;
                border-radius: 50%;
                animation: ztBlink 1.4s infinite ease-in-out both;
            }
            .zt-typing-dot:nth-child(1) { animation-delay: 0s; }
            .zt-typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .zt-typing-dot:nth-child(3) { animation-delay: 0.4s; }
            @keyframes ztBlink {
                0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
                40% { opacity: 1; transform: scale(1.1); }
            }
        </style>

        <div class="zt-chat-window zt-theme-dark" id="zt-chat-window">
            <div class="zt-header">
                <div class="zt-header-title">
                    <span class="zt-status-dot"></span>
                    <span id="zt-bot-name">AI Support</span>
                </div>
                <button class="zt-close-btn" id="zt-close-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="zt-messages" id="zt-messages"></div>
            <div class="zt-input-area">
                <input type="text" class="zt-input" id="zt-input" placeholder="Type your message..." />
                <button class="zt-send-btn" id="zt-send-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
            <div class="zt-footer-branding">
                Powered by <a href="#" target="_blank">Zeltrionix AI</a>
            </div>
        </div>

        <button class="zt-toggle-btn" id="zt-toggle-btn">
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
            </svg>
        </button>
    `;

    document.body.appendChild(widgetContainer);

    const chatWindow = document.getElementById('zt-chat-window');
    const toggleBtn = document.getElementById('zt-toggle-btn');
    const closeBtn = document.getElementById('zt-close-btn');
    const messagesBox = document.getElementById('zt-messages');
    const inputEl = document.getElementById('zt-input');
    const sendBtn = document.getElementById('zt-send-btn');
    const botNameEl = document.getElementById('zt-bot-name');

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('open', isOpen);
        if (isOpen && messagesBox.children.length === 0) {
            initSession();
        }
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.remove('open');
    });

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function applyStyles() {
        widgetContainer.style.setProperty('--zt-primary', botConfig.primary_color || '#3b82f6');
        widgetContainer.style.setProperty('--zt-secondary', botConfig.secondary_color || '#a855f7');
        botNameEl.textContent = botConfig.name || 'AI Support';

        const theme = botConfig.theme_mode === 'light' ? 'zt-theme-light' : 'zt-theme-dark';
        chatWindow.className = `zt-chat-window ${theme} ${isOpen ? 'open' : ''}`;
    }

    function appendMessage(sender, text) {
        const msg = document.createElement('div');
        msg.className = `zt-msg zt-msg-${sender}`;
        if (sender === 'assistant') {
            msg.innerHTML = parseMarkdown(text, botConfig.theme_mode === 'light');
        } else {
            msg.textContent = text;
        }
        messagesBox.appendChild(msg);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function showTyping() {
        const typing = document.createElement('div');
        typing.id = 'zt-typing-indicator';
        typing.className = 'zt-msg zt-msg-assistant zt-typing';
        typing.innerHTML = `
            <div class="zt-typing-dot"></div>
            <div class="zt-typing-dot"></div>
            <div class="zt-typing-dot"></div>
        `;
        messagesBox.appendChild(typing);
        messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('zt-typing-indicator');
        if (el) el.remove();
    }

    function initSession() {
        fetch(`${API_BASE}/api/v1/widget/init`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bot_id: botId,
                session_token: sessionToken,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.bot) {
                botConfig = data.bot;
                applyStyles();
            }
            if (data.session_token) {
                sessionToken = data.session_token;
                localStorage.setItem('zeltronix_session_' + botId, sessionToken);
            }
            messagesBox.innerHTML = '';
            if (data.history && data.history.length > 0) {
                data.history.forEach(m => appendMessage(m.sender, m.content));
            } else {
                appendMessage('assistant', botConfig.greeting_message || 'Hello! How can I help you today?');
            }
        })
        .catch(err => {
            console.error('Zeltrionix init failed:', err);
            appendMessage('assistant', botConfig.greeting_message || 'Hello! How can I help you today?');
        });
    }

    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || isSending) return;

        appendMessage('user', text);
        inputEl.value = '';
        isSending = true;
        sendBtn.disabled = true;
        showTyping();

        fetch(`${API_BASE}/api/v1/widget/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                bot_id: botId,
                session_token: sessionToken,
                question: text
            })
        })
        .then(res => res.json())
        .then(data => {
            hideTyping();
            isSending = false;
            sendBtn.disabled = false;
            if (data.answer) {
                appendMessage('assistant', data.answer);
            } else {
                appendMessage('assistant', 'Sorry, I encountered an issue. Please try again.');
            }
        })
        .catch(err => {
            hideTyping();
            isSending = false;
            sendBtn.disabled = false;
            appendMessage('assistant', 'Unable to connect to assistant backend.');
        });
    }
})();
