import React, { useState, useEffect } from 'react';
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

const TOPUP_PACKAGES = [
    { name: 'Starter Sourcing', tokens: 649000, eurPrice: 649, badge: 'Entry' },
    { name: 'Standard Sourcing', tokens: 1249000, eurPrice: 1249, badge: null },
    { name: 'Pro Sourcing', tokens: 2499000, eurPrice: 2499, badge: 'Popular' },
    { name: 'Growth Infrastructure', tokens: 3899000, eurPrice: 3899, badge: null },
    { name: 'Institutional Scale', tokens: 5299000, eurPrice: 5299, badge: null },
    { name: 'Enterprise Global', tokens: 6759000, eurPrice: 6759, badge: 'Enterprise' },
];

export default function Dashboard({ stats, chartData = [], recentBots }) {
    const [showTopUpModal, setShowTopUpModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem('zeltronix_currency') || 'EUR';
    });
    const [customTokenInput, setCustomTokenInput] = useState(649000); // Default 649k tokens (€649)

    useEffect(() => {
        const handleStorageChange = () => {
            setSelectedCurrency(localStorage.getItem('zeltronix_currency') || 'EUR');
        };
        window.addEventListener('zeltronix_currency_changed', handleStorageChange);
        return () => window.removeEventListener('zeltronix_currency_changed', handleStorageChange);
    }, []);

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
            <Head title="Dashboard | INCHWARD LIMITED" />

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
                            <TrendingUp className="w-5 h-5 text-blue-400" /> Token Consumption Activity
                        </h3>
                        <p className="text-xs text-slate-400">Daily deepseek token usage metrics across customer bots</p>
                    </div>
                </div>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="tokens" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent AI Agents List */}
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Bot className="w-5 h-5 text-purple-400" /> Deployed AI Support Agents
                    </h3>
                    <Link href={route('bots.index')} className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
                        View All Agents <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {recentBots.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                        <Bot className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h4 className="text-base font-bold text-white mb-1">No AI Agents Deployed Yet</h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">Create your first AI Support Agent and upload knowledge documentation.</p>
                        <Link href={route('bots.index')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Create First Agent
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {recentBots.map((bot) => (
                            <div key={bot.id} className="p-5 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{bot.name}</h4>
                                        <p className="text-xs text-slate-400">{bot.documents_count || 0} indexed docs • Model: DeepSeek Chat</p>
                                    </div>
                                </div>

                                <Link
                                    href={route('bots.show', bot.id)}
                                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                                >
                                    Manage <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* TOP-UP MODAL (6 PACKAGES €649 - €6,759) */}
            {showTopUpModal && (
                <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative">
                        <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                            <Coins className="w-6 h-6 text-amber-400" /> Digital Wallet Token Top-Up
                        </h3>
                        <p className="text-xs text-slate-400 mb-6">
                            Select a high-volume supply package ranging from <strong>€649 to €6,759</strong> or specify custom token deposits. Official B2B PDF tax invoice generated instantly.
                        </p>

                        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-6 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-blue-400" /> Billing Currency:
                            </span>
                            <div className="flex gap-1.5">
                                {Object.values(CURRENCIES).map((c) => (
                                    <button
                                        key={c.code}
                                        type="button"
                                        onClick={() => {
                                            setSelectedCurrency(c.code);
                                            localStorage.setItem('zeltronix_currency', c.code);
                                            window.dispatchEvent(new Event('zeltronix_currency_changed'));
                                        }}
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

                        {/* 6 Top-Up Packages Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                            {TOPUP_PACKAGES.map((pkg, pIdx) => (
                                <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => handleTopUpSubmit(pkg.tokens)}
                                    className={`bg-slate-950 border p-3 rounded-2xl text-left transition-all relative group hover:scale-[1.02] ${
                                        pkg.badge === 'Popular'
                                            ? 'border-blue-500/60 hover:border-blue-500 shadow-md shadow-blue-500/10'
                                            : pkg.badge === 'Enterprise'
                                            ? 'border-purple-500/60 hover:border-purple-500'
                                            : 'border-slate-800 hover:border-amber-500/50'
                                    }`}
                                >
                                    {pkg.badge && (
                                        <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase absolute top-2 right-2">
                                            {pkg.badge}
                                        </span>
                                    )}
                                    <span className="text-[10px] text-amber-400 font-bold block mb-1">{pkg.name}</span>
                                    <div className="text-sm font-black text-white">{(pkg.tokens / 1000).toLocaleString()}k Tokens</div>
                                    <span className="text-xs text-slate-300 font-extrabold mt-1 block">
                                        {curr.symbol}{calcPrice(pkg.tokens)} {curr.code}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Custom Large Token Input */}
                        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-6">
                            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                Custom Token Deposit Amount
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    min="100000"
                                    max="500000000"
                                    step="10000"
                                    value={customTokenInput}
                                    onChange={(e) => setCustomTokenInput(Number(e.target.value))}
                                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleTopUpSubmit(customTokenInput)}
                                    disabled={processing}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/20 flex-shrink-0"
                                >
                                    Purchase ({curr.symbol}{calcPrice(customTokenInput)})
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>Official Invoice Issued by INCHWARD LIMITED</span>
                            <button
                                type="button"
                                onClick={() => setShowTopUpModal(false)}
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-5 py-2 rounded-xl"
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
