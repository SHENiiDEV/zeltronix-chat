import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ bots }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        greeting_message: 'Hello! How can I help you today?',
        system_prompt: 'You are a helpful customer support assistant. Answer questions concisely based strictly on provided documentation.',
        primary_color: '#3b82f6',
        secondary_color: '#a855f7',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('bots.store'), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            }
        });
    };

    return (
        <AppLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Support Agents</h1>
                        <p className="text-sm text-slate-400">Manage your virtual assistants and knowledge bases</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
                    >
                        + Create New Agent
                    </button>
                </div>
            }
        >
            <Head title="AI Agents | Zeltrionix" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bots.map((bot) => (
                    <div
                        key={bot.id}
                        className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${bot.primary_color}, ${bot.secondary_color})` }}
                                >
                                    ⚡
                                </div>
                                <span className="text-[11px] font-mono bg-slate-800 text-slate-400 px-2.5 py-1 rounded-md border border-slate-700">
                                    ID: {bot.uuid.substring(0, 8)}...
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">{bot.name}</h3>
                            <p className="text-xs text-slate-400 mb-6 line-clamp-2">
                                {bot.greeting_message}
                            </p>

                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 mb-6">
                                <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                    📄 {bot.documents_count} Docs
                                </span>
                                <span className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                                    💬 {bot.chat_sessions_count} Sessions
                                </span>
                            </div>
                        </div>

                        <Link
                            href={route('bots.show', bot.id)}
                            className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm shadow-md shadow-blue-500/20"
                        >
                            Configure & Integration ➔
                        </Link>
                    </div>
                ))}
            </div>

            {/* Create Bot Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Create New AI Support Agent</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                    Agent Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g. Acme Tech Support"
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                                {errors.name && <span className="text-xs text-rose-400">{errors.name}</span>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                    Greeting Message
                                </label>
                                <input
                                    type="text"
                                    value={data.greeting_message}
                                    onChange={(e) => setData('greeting_message', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                        Primary Color
                                    </label>
                                    <input
                                        type="color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        className="w-full h-10 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer p-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                                        Secondary Color
                                    </label>
                                    <input
                                        type="color"
                                        value={data.secondary_color}
                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                        className="w-full h-10 bg-slate-800 border border-slate-700 rounded-xl cursor-pointer p-1"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm shadow-lg shadow-blue-500/20"
                                >
                                    Create Agent
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
