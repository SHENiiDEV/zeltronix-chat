import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, CheckCircle2, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

export default function WidgetPreview({
    botId = null,
    botName = "Zeltrionix Support Bot",
    primaryColor = "#3b82f6",
    secondaryColor = "#a855f7",
    themeMode = "dark",
    greetingMessage = "Hello! I am your AI Support Assistant trained on your business docs. Ask me anything!"
}) {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'assistant', text: greetingMessage }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionToken, setSessionToken] = useState(null);
    const [activeTheme, setActiveTheme] = useState(themeMode);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setActiveTheme(themeMode);
    }, [themeMode]);

    const isDark = activeTheme === 'dark';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Parse Markdown (**bold**, *italic*, lists, line breaks) safely into HTML
    const renderFormattedText = (text) => {
        if (!text) return '';
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const boldColorClass = isDark ? 'text-white' : 'text-slate-900';
        const italicColorClass = isDark ? 'text-slate-300' : 'text-slate-700';

        html = html.replace(/\*\*(.*?)\*\*/g, `<strong class="font-extrabold ${boldColorClass}">$1</strong>`);
        html = html.replace(/__(.*?)__/g, `<strong class="font-extrabold ${boldColorClass}">$1</strong>`);
        html = html.replace(/\*(.*?)\*/g, `<em class="italic ${italicColorClass}">$1</em>`);
        html = html.replace(/`(.*?)`/g, '<code class="bg-slate-800/20 text-blue-500 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
        html = html.replace(/(?:^|\n)[-•*]\s+(.*?)(?=\n|$)/g, '<br/>• $1');
        html = html.replace(/\n/g, '<br/>');

        return <span dangerouslySetInnerHTML={{ __html: html }} />;
    };

    // Initialize session if botId is provided
    useEffect(() => {
        if (botId) {
            fetch('/api/v1/widget/init', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bot_id: botId })
            })
            .then(res => res.json())
            .then(data => {
                if (data.session_token) {
                    setSessionToken(data.session_token);
                }
                if (data.bot?.theme_mode) {
                    setActiveTheme(data.bot.theme_mode);
                }
                if (data.history && data.history.length > 0) {
                    setMessages(data.history.map((m, i) => ({
                        id: i + 1,
                        sender: m.sender,
                        text: m.content
                    })));
                }
            })
            .catch(err => console.error('Widget init error:', err));
        }
    }, [botId]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userText = input.trim();
        const userMsgId = Date.now();
        setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: userText }]);
        setInput('');
        setIsTyping(true);

        try {
            if (botId) {
                // Real RAG Backend Call
                const response = await fetch('/api/v1/widget/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        bot_id: botId,
                        session_token: sessionToken || 'demo-session',
                        question: userText
                    })
                });

                const data = await response.json();
                setIsTyping(false);

                if (data.answer) {
                    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'assistant', text: data.answer }]);
                    if (data.session_token) setSessionToken(data.session_token);
                    toast.success('AI Agent responded', { duration: 1500 });
                } else {
                    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'assistant', text: "Error connecting to AI service." }]);
                }
            } else {
                // Landing page demo simulation or fallback
                setTimeout(() => {
                    setIsTyping(false);
                    let reply = "Based on our knowledge base, we offer 24/7 automated support with instant integration!";
                    const lower = userText.toLowerCase();

                    if (lower.includes('price') || lower.includes('cost') || lower.includes('тариф') || lower.includes('цена')) {
                        reply = "Our **Pro Plan** is €30/month for **50,000,000 AI tokens**, and **Enterprise** is €100/month for **175,000,000 AI tokens**!";
                    } else if (lower.includes('email') || lower.includes('support') || lower.includes('phone') || lower.includes('contact')) {
                        reply = "You can contact human support at **support@zeltrionix.com** or billing inquiries at **billing@zeltrionix.com**.";
                    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('привет')) {
                        reply = "Hello there! How can I assist your business today?";
                    }

                    setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'assistant', text: reply }]);
                }, 800);
            }
        } catch (err) {
            setIsTyping(false);
            toast.error('API connection error');
        }
    };

    return (
        <div className={`w-full max-w-md backdrop-blur-2xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[530px] transition-colors duration-300 ${
            isDark 
                ? 'bg-slate-950/95 border-slate-800/90 text-white shadow-blue-500/10' 
                : 'bg-white/95 border-slate-200/90 text-slate-900 shadow-slate-300/50'
        }`}>
            {/* Widget Header */}
            <div
                className={`p-4 flex items-center justify-between border-b transition-colors duration-300 ${
                    isDark ? 'border-slate-800/80 bg-slate-900/95' : 'border-slate-200/80 bg-slate-50/95'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                        >
                            <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900 shadow-sm shadow-emerald-500"></span>
                    </div>
                    <div>
                        <h4 className={`text-sm font-bold leading-snug flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {botName}
                        </h4>
                        <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online 24/7
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTheme(isDark ? 'light' : 'dark')}
                        className={`p-1.5 rounded-xl border transition-all ${
                            isDark ? 'bg-slate-800 border-slate-700 text-amber-400 hover:text-amber-300' : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title="Toggle Widget Theme Preview"
                    >
                        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                        isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200'
                    }`}>
                        <CheckCircle2 className="w-3 h-3" /> Preview
                    </span>
                </div>
            </div>

            {/* Messages Feed */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 transition-colors duration-300 ${
                isDark ? 'bg-slate-950/70' : 'bg-slate-50/70'
            }`}>
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="flex gap-2.5 max-w-[85%]">
                                {msg.sender === 'assistant' && (
                                    <div
                                        className="w-7 h-7 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs mt-0.5 shadow-sm"
                                        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                                    >
                                        <Bot className="w-4 h-4" />
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-xs'
                                            : isDark
                                                ? 'bg-slate-900 text-slate-200 border border-slate-800/90 rounded-bl-xs'
                                                : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                                    }`}
                                >
                                    {msg.sender === 'assistant' ? renderFormattedText(msg.text) : msg.text}
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/30 flex-shrink-0 flex items-center justify-center text-blue-500 text-xs mt-0.5">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start items-center gap-2"
                    >
                        <div
                            className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs"
                            style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                        >
                            <Bot className="w-4 h-4 animate-bounce" />
                        </div>
                        <div className={`px-4 py-2.5 rounded-2xl rounded-bl-xs text-sm flex items-center gap-1.5 border ${
                            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-100"></span>
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse delay-200"></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className={`p-3 border-t flex gap-2 transition-colors duration-300 ${
                isDark ? 'bg-slate-900 border-slate-800/80' : 'bg-slate-100 border-slate-200/80'
            }`}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDark 
                            ? 'bg-slate-950 border border-slate-800 text-white placeholder-slate-500' 
                            : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400'
                    }`}
                />
                <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white rounded-xl font-medium text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
