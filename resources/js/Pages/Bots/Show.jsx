import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import WidgetPreview from '@/Components/WidgetPreview';
import { Copy, Check, UploadCloud, FileText, Settings, Palette, Trash2, Sparkles, ArrowLeft, Moon, Sun } from 'lucide-react';
import { toast } from 'sonner';

const COLOR_PRESETS = [
    { name: 'Neon Electric', primary: '#3b82f6', secondary: '#a855f7' },
    { name: 'Cyber Cyan', primary: '#06b6d4', secondary: '#3b82f6' },
    { name: 'Emerald Matrix', primary: '#10b981', secondary: '#06b6d4' },
    { name: 'Violet Glow', primary: '#8b5cf6', secondary: '#ec4899' },
    { name: 'Sunset Fire', primary: '#f97316', secondary: '#e11d48' },
    { name: 'Dark Obsidian', primary: '#475569', secondary: '#0f172a' },
];

export default function Show({ bot, embedSnippet }) {
    const [copied, setCopied] = useState(false);

    // Bot settings form
    const { data: botData, setData: setBotData, put: updateBot, processing: botProcessing } = useForm({
        name: bot.name,
        system_prompt: bot.system_prompt || '',
        greeting_message: bot.greeting_message || '',
        primary_color: bot.primary_color || '#3b82f6',
        secondary_color: bot.secondary_color || '#a855f7',
        theme_mode: bot.theme_mode || 'dark',
        allowed_domains: bot.allowed_domains || '',
    });

    // Document upload form
    const { data: docData, setData: setDocData, post: postDoc, processing: docProcessing, errors: docErrors, reset: resetDoc } = useForm({
        document: null,
    });

    const handleBotUpdate = (e) => {
        e.preventDefault();
        updateBot(route('bots.update', bot.id), {
            onSuccess: () => toast.success('Agent configuration updated successfully!')
        });
    };

    const applyColorPreset = (preset) => {
        setBotData(prev => ({
            ...prev,
            primary_color: preset.primary,
            secondary_color: preset.secondary,
        }));
        toast.info(`Applied "${preset.name}" color scheme!`);
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        if (!docData.document) return;
        postDoc(route('bots.documents.store', bot.id), {
            onSuccess: () => {
                resetDoc('document');
                toast.success('Document uploaded & vectorized into knowledge base!');
            },
            onError: () => toast.error('Document processing error')
        });
    };

    const copyEmbedCode = () => {
        navigator.clipboard.writeText(embedSnippet);
        setCopied(true);
        toast.success('Embed script copied to clipboard!');
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('bots.index')}
                            className="text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Agents
                        </Link>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-blue-400" />
                            {bot.name}
                        </h1>
                    </div>
                </div>
            }
        >
            <Head title={`${bot.name} | Zeltrionix Agent`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Embed Snippet & Knowledge Base */}
                <div className="lg:col-span-7 space-y-8">
                    {/* Embed Code Snippet Generator */}
                    <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Copy className="w-5 h-5 text-blue-400" /> Embed Script
                                </h3>
                                <p className="text-xs text-slate-400">Copy this single line of JavaScript into your website's HTML before &lt;/body&gt;</p>
                            </div>
                            <button
                                onClick={copyEmbedCode}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy Snippet'}
                            </button>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-blue-300 break-all overflow-x-auto selection:bg-blue-500 selection:text-white">
                            {embedSnippet}
                        </div>
                    </div>

                    {/* Knowledge Base Upload (Supported: PDF, DOCX, TXT, CSV) */}
                    <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-purple-400" /> Knowledge Base File Uploads
                        </h3>
                        <p className="text-xs text-slate-400 mb-6">
                            Upload PDFs, DOCX, TXT, or CSV files. Zeltrionix automatically parses and vectorizes content for accurate RAG queries.
                        </p>

                        {/* Upload Form */}
                        <form onSubmit={handleFileUpload} className="mb-8 p-6 bg-slate-950/80 border border-dashed border-slate-700/80 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                            <input
                                type="file"
                                accept=".txt,.pdf,.md,.doc,.docx,.csv"
                                onChange={(e) => setDocData('document', e.target.files[0])}
                                className="text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer"
                            />
                            <button
                                type="submit"
                                disabled={docProcessing || !docData.document}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs px-5 py-3 rounded-xl disabled:opacity-50 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                            >
                                <UploadCloud className="w-4 h-4" />
                                {docProcessing ? 'Processing Vector Chunks...' : 'Upload File'}
                            </button>
                        </form>
                        {docErrors.document && <p className="text-xs text-rose-400 mb-4">{docErrors.document}</p>}

                        {/* Document Table */}
                        <div className="space-y-3">
                            {bot.documents.length === 0 ? (
                                <p className="text-center text-xs text-slate-500 py-6">No knowledge base documents uploaded yet.</p>
                            ) : (
                                bot.documents.map((doc) => (
                                    <div key={doc.id} className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-white">{doc.filename}</span>
                                                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full ${
                                                    doc.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    doc.status === 'processing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                                }`}>
                                                    ● {doc.status}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">
                                                {(doc.file_size / 1024).toFixed(1)} KB • {doc.chunk_count} Vector Chunks
                                            </p>
                                        </div>

                                        <Link
                                            href={route('documents.destroy', doc.id)}
                                            method="delete"
                                            as="button"
                                            onSuccess={() => toast.success('Document removed from knowledge base')}
                                            className="text-xs text-rose-400 hover:text-rose-300 p-2 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Agent Customization, Theme Mode & Color Presets */}
                    <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-cyan-400" /> Agent Styling & Theme Settings
                        </h3>

                        {/* Theme Mode Toggle (Dark / Light) */}
                        <div className="mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                                Widget Theme Mode
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setBotData('theme_mode', 'dark')}
                                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                                        botData.theme_mode === 'dark'
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Moon className="w-4 h-4 text-blue-300" /> Dark Mode (Тёмный)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setBotData('theme_mode', 'light')}
                                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs transition-all ${
                                        botData.theme_mode === 'light'
                                            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <Sun className="w-4 h-4 text-amber-400" /> Light Mode (Светлый)
                                </button>
                            </div>
                        </div>

                        {/* Color Presets Selector */}
                        <div className="mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                <Palette className="w-3.5 h-3.5 text-blue-400" /> Quick Color Presets
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {COLOR_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        type="button"
                                        onClick={() => applyColorPreset(preset)}
                                        className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl flex items-center gap-2.5 transition-all text-left group"
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full shadow-sm flex-shrink-0"
                                            style={{ background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})` }}
                                        />
                                        <span className="text-xs font-semibold text-slate-300 group-hover:text-white truncate">
                                            {preset.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleBotUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                    Agent Name
                                </label>
                                <input
                                    type="text"
                                    value={botData.name}
                                    onChange={(e) => setBotData('name', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                    System Prompt / Guardrails
                                </label>
                                <textarea
                                    rows={4}
                                    value={botData.system_prompt}
                                    onChange={(e) => setBotData('system_prompt', e.target.value)}
                                    placeholder="Set agent instructions and tone..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                    Greeting Message
                                </label>
                                <input
                                    type="text"
                                    value={botData.greeting_message}
                                    onChange={(e) => setBotData('greeting_message', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <Palette className="w-3.5 h-3.5" /> Primary Color Hex
                                    </label>
                                    <input
                                        type="color"
                                        value={botData.primary_color}
                                        onChange={(e) => setBotData('primary_color', e.target.value)}
                                        className="w-full h-10 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer p-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <Palette className="w-3.5 h-3.5" /> Secondary Color Hex
                                    </label>
                                    <input
                                        type="color"
                                        value={botData.secondary_color}
                                        onChange={(e) => setBotData('secondary_color', e.target.value)}
                                        className="w-full h-10 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer p-1"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={botProcessing}
                                className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20"
                            >
                                Save Agent Configuration
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: Real-time Live Widget Preview */}
                <div className="lg:col-span-5 flex flex-col items-center">
                    <div className="sticky top-24 w-full flex flex-col items-center">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-emerald-400" /> Real-time Live Preview
                        </h3>
                        <WidgetPreview
                            botId={bot.uuid}
                            botName={botData.name}
                            primaryColor={botData.primary_color}
                            secondaryColor={botData.secondary_color}
                            themeMode={botData.theme_mode}
                            greetingMessage={botData.greeting_message}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
