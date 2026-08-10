import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Bot, FileText, Layers, MessageSquare, TrendingUp, ArrowUpRight, Plus, ChevronRight, Coins, Sliders, Globe } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const CURRENCIES = {
    EUR: { code: 'EUR', symbol: '€', rate: 1.0, name: 'Euro (€)' },
    USD: { code: 'USD', symbol: '$', rate: 1.09, name: 'US Dollar ($)' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.86, name: 'British Pound (£)' },
};

export default function Dashboard({ stats, chartData = [], recentBots }) {
    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');
    const [customTokenInput, setCustomTokenInput] = useState(5000); // 5,000 tokens

    const { post, processing } = useForm();

    const curr = CURRENCIES[selectedCurrency] || CURRENCIES.EUR;

    const calcPrice = (tokens) => {
        const baseEur = (tokens / 1000) * 1.00; // €1.00 per 1,000 tokens
        return (baseEur * curr.rate).toFixed(2);
    };

    const handleTopUpSubmit = (amountTokens) => {
        const price = calcPrice(amountTokens);
        post(route('topup.store', { 
            tokens: amountTokens,
            currency: curr.code,
            amount: price
        }), {
            onSuccess: () => {
                setShowTopUpModal(false);
                toast.success(`Successfully added ${amountTokens.toLocaleString()} tokens (${curr.symbol}${price} ${curr.code})!`);
            }
        });
    };

    return (
        <AppLayout
            header={
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-extrabold text-white tracking-tight">Platform Dashboard</h1>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                {stats.subscriptionPlan} PLAN
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 font-normal">Manage AI token usage, knowledge bases, and support agents</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowTopUpModal(true)}
                            className="bg-slate-900 border border-amber-500/30 hover:border-amber-500/60 text-amber-400 text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
                        >
                            <Coins className="w-4 h-4 text-amber-400" /> Top-Up Tokens
                        </button>
                        <Link
                            href={route('bots.index')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" /> Create New Agent
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard | Zeltrionix" />

            {/* Metric Cards including Token Balance */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Token Balance Card */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Available AI Tokens</span>
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                            <Coins className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-black text-white mt-4 flex items-baseline gap-2">
                        {stats.tokenBalance.toLocaleString()}
                        <span className="text-xs text-amber-400 font-semibold">Tokens</span>
                    </div>
                    <button
                        onClick={() => setShowTopUpModal(true)}
                        className="mt-3 text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                        + Top-Up Tokens ➔
                    </button>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active AI Agents</span>
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                            <Bot className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-white mt-4 flex items-baseline gap-2">
                        {stats.totalBots}
                    </div>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Knowledge Docs</span>
                        <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-purple-400 mt-4 flex items-baseline gap-2">
                        {stats.totalDocs}
                        <span className="text-xs text-slate-500 font-normal">files indexed</span>
                    </div>
                </div>

                <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Chat Messages</span>
                        <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-cyan-400 mt-4 flex items-baseline gap-2">
                        {stats.totalMessages}
                    </div>
                </div>
            </div>

            {/* Recharts Analytics Chart */}
            <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                            Support & Token Consumption Volume
                        </h3>
                        <p className="text-xs text-slate-400">7-Day token consumption and message volume across active agents</p>
                    </div>
                    <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold px-3 py-1 rounded-full">
                        Live Database Telemetry
                    </span>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorQueries)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent AI Agents List */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" /> Your Support Agents
                    </h3>
                    <Link href={route('bots.index')} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        View All Agents <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentBots.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <p className="mb-4 text-sm">No AI agents created yet.</p>
                        <Link
                            href={route('bots.index')}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            <Plus className="w-4 h-4" /> Create Your First AI Agent
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {recentBots.map((bot) => (
                            <div key={bot.id} className="p-6 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-md"
                                        style={{ background: `linear-gradient(135deg, ${bot.primary_color}, ${bot.secondary_color})` }}
                                    >
                                        <Bot className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-base">{bot.name}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {bot.documents_count} Knowledge Docs • {bot.chat_sessions_count} Active Sessions
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href={route('bots.show', bot.id)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                                >
                                    Manage & Embed <ChevronRight className="w-4 h-4 text-blue-400" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MULTI-CURRENCY TOKEN TOP-UP MODAL */}
            {showTopUpModal && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <Coins className="w-6 h-6 text-amber-400" />
                                <h3 className="text-xl font-bold text-white">Top-Up AI Tokens</h3>
                            </div>
                            <button
                                onClick={() => setShowTopUpModal(false)}
                                className="text-slate-400 hover:text-white text-lg font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Multi-Currency Selector */}
                        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-6 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-blue-400" /> Payment Currency:
                            </span>
                            <div className="flex gap-1.5">
                                {Object.values(CURRENCIES).map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => setSelectedCurrency(c.code)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                            selectedCurrency === c.code
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                                : 'bg-slate-900 text-slate-400 hover:text-white'
                                        }`}
                                    >
                                        {c.symbol} {c.code}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-slate-400 mb-4">
                            Rate: <strong>{curr.symbol}{(1.00 * curr.rate).toFixed(2)} {curr.code} per 1,000 AI tokens</strong>
                        </p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <button
                                type="button"
                                onClick={() => handleTopUpSubmit(1000)}
                                className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-3 rounded-2xl text-left transition-all group"
                            >
                                <span className="text-[10px] text-amber-400 font-bold block mb-1">Starter Pack</span>
                                <div className="text-base font-black text-white">1,000 Tokens</div>
                                <span className="text-xs text-slate-400 font-semibold mt-1 block">{curr.symbol}{calcPrice(1000)}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTopUpSubmit(5000)}
                                className="bg-slate-950 border border-amber-500/40 hover:border-amber-500 p-3 rounded-2xl text-left transition-all shadow-lg shadow-amber-500/5 group"
                            >
                                <span className="text-[10px] text-amber-400 font-bold block mb-1">Popular Pack</span>
                                <div className="text-base font-black text-white">5,000 Tokens</div>
                                <span className="text-xs text-slate-400 font-semibold mt-1 block">{curr.symbol}{calcPrice(5000)}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => handleTopUpSubmit(10000)}
                                className="bg-slate-950 border border-purple-500/40 hover:border-purple-500 p-3 rounded-2xl text-left transition-all group"
                            >
                                <span className="text-[10px] text-purple-400 font-bold block mb-1">Pro Pack</span>
                                <div className="text-base font-black text-white">10,000 Tokens</div>
                                <span className="text-xs text-slate-400 font-semibold mt-1 block">{curr.symbol}{calcPrice(10000)}</span>
                            </button>
                        </div>

                        {/* Custom Token Input */}
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                Custom Token Amount
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="1000"
                                    max="100000000"
                                    step="1000"
                                    value={customTokenInput}
                                    onChange={(e) => setCustomTokenInput(Number(e.target.value))}
                                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleTopUpSubmit(customTokenInput)}
                                    disabled={processing}
                                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/20"
                                >
                                    Top Up ({curr.symbol}{calcPrice(customTokenInput)})
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowTopUpModal(false)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-2.5 rounded-xl text-xs"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
