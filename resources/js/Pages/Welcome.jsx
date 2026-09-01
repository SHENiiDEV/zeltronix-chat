import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import WidgetPreview from '@/Components/WidgetPreview';
import { 
    Bot, ShieldCheck, Zap, Layers, Cpu, Globe, Check, ArrowRight, Wallet, 
    FileText, Calculator, Building2, Coins, Sparkles, Sliders, MessageSquare, 
    TrendingUp, Clock, Brain, Lock, MapPin, Mail 
} from 'lucide-react';

const CURRENCIES = {
    EUR: { code: 'EUR', symbol: '€', rate: 1.0, name: 'Euro (€)' },
    USD: { code: 'USD', symbol: '$', rate: 1.09, name: 'US Dollar ($)' },
    GBP: { code: 'GBP', symbol: '£', rate: 0.86, name: 'British Pound (£)' },
};

const WELCOME_PACKAGES = [
    { name: 'Starter Sourcing', eurPrice: 649, tokens: 649000, tag: 'Entry Tier', desc: 'Initial OEM product sourcing & supplier verification', badge: null },
    { name: 'Standard Sourcing', eurPrice: 1249, tokens: 1249000, tag: 'Standard Tier', desc: 'HS Code tariff calculations & RFQ negotiation scripts', badge: null },
    { name: 'Pro Sourcing', eurPrice: 2499, tokens: 2499000, tag: 'Institutional', desc: 'Full 6-page institutional Memorandum & RFQ scripts', badge: 'Most Popular' },
    { name: 'Growth Infrastructure', eurPrice: 3899, tokens: 3899000, tag: 'Growth Scaled', desc: 'Multi-product OEM negotiations & container FCL routing', badge: null },
    { name: 'Institutional Scale', eurPrice: 5299, tokens: 5299000, tag: 'Scale Tier', desc: 'Dedicated Trade Desk & custom factory sample audits', badge: null },
    { name: 'Enterprise Global', eurPrice: 6759, tokens: 6759000, tag: 'Enterprise', desc: 'Full turnkey supply chain architecture & unlimited exports', badge: 'Enterprise' },
];

export default function Welcome({ auth }) {
    const { company } = usePage().props;
    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        return localStorage.getItem('zeltronix_currency') || 'EUR';
    });

    const curr = CURRENCIES[selectedCurrency] || CURRENCIES.EUR;

    const calcPrice = (eurAmount) => (eurAmount * curr.rate).toFixed(0);

    const handleCurrencyChange = (code) => {
        setSelectedCurrency(code);
        localStorage.setItem('zeltronix_currency', code);
        window.dispatchEvent(new Event('zeltronix_currency_changed'));
    };

    return (
        <GuestLayout>
            <Head title="Zeltrionix AI — Autonomous AI Support Infrastructure & Direct OEM Sourcing" />

            {/* 1. HERO SECTION WITH EMBEDDED LIVE AI CHAT WIDGET */}
            <section className="relative overflow-hidden pt-16 pb-24 bg-slate-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
                            <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                            DIRECT OEM FACTORY SOURCING & AI AGENT INFRASTRUCTURE
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
                            Autonomous AI Support & <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Direct OEM Sourcing Architecture
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
                            Bypass 30–40% trading broker markups. Connect your business directly to 1,200+ audited Shenzhen, Ningbo & Vietnam OEM factories with autonomous RAG vector intelligence and 6-page institutional dossiers in &lt;60s.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                            >
                                Get Started Now <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="#pricing"
                                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-sm px-8 py-3.5 rounded-2xl transition-all text-center"
                            >
                                View Sourcing Packages
                            </a>
                        </div>
                    </div>

                    {/* LIVE CHAT WIDGET EMBEDDED DIRECTLY IN HERO */}
                    <div className="max-w-4xl mx-auto mb-16 shadow-2xl rounded-3xl border border-slate-800/80 overflow-hidden bg-slate-900/60 backdrop-blur-xl">
                        <div className="bg-slate-900/90 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Live AI Support Assistant</span>
                            </div>
                            <span className="text-[11px] text-blue-400 font-mono">DeepSeek-R1 Vector RAG Engine</span>
                        </div>
                        <WidgetPreview />
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-900 text-xs font-semibold text-slate-400">
                        <div className="flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 1,200+ OEM Factories Audited
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4 text-blue-400" /> &lt;60s Vector Dossier Match
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4 text-purple-400" /> 100% IP Ownership Retention
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <Coins className="w-4 h-4 text-amber-400" /> UK B2B PDF Tax Invoices
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PLATFORM FEATURES & VALUE PROP */}
            <section id="features" className="py-24 bg-slate-950 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Architectural Edge</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Infrastructure Built for Scaling B2B Platforms
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Traditional Middlemen</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Overseas trading brokers mark up factory unit costs by 30–40%, conceal actual OEM factory contacts, and delay RFQ negotiation cycles.
                            </p>
                        </div>

                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border border-blue-500/30 hover:border-blue-500/60 transition-all shadow-xl shadow-blue-500/5 relative">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">The Zeltrionix Way</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Autonomous vector search maps your requirements directly to audited OEM manufacturers in Shenzhen and Ningbo with reverse landed cost calculation.
                            </p>
                        </div>

                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">The Institutional Result</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Average 58.4% profit margin gain, 6-page institutional investment dossiers, and official UK B2B PDF tax receipts stamped PAID & VERIFIED.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. SOURCING PACKAGES */}
            <section id="pricing" className="py-24 bg-slate-950 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Sourcing Packages & Token Infrastructure</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Transparent Sourcing Packages
                        </p>
                        <p className="text-slate-400 text-sm mt-3">
                            Digital wallet deposits backed by 14-day unused balance refund policy and UK B2B PDF invoices.
                        </p>

                        {/* Multi-Currency Selector */}
                        <div className="inline-flex items-center gap-2 mt-6 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
                            <Globe className="w-4 h-4 text-blue-400 ml-2" />
                            <span className="text-xs text-slate-400 font-bold mr-2">Billing Currency:</span>
                            {Object.values(CURRENCIES).map((c) => (
                                <button
                                    key={c.code}
                                    type="button"
                                    onClick={() => handleCurrencyChange(c.code)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        selectedCurrency === c.code
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {c.symbol} {c.code}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                        {WELCOME_PACKAGES.map((pkg, idx) => (
                            <div
                                key={idx}
                                className={`p-8 rounded-3xl border shadow-xl flex flex-col justify-between relative transition-all ${
                                    pkg.badge === 'Most Popular'
                                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500 shadow-blue-500/10'
                                        : pkg.badge === 'Enterprise'
                                        ? 'bg-slate-900/90 border-purple-500/50 hover:border-purple-500'
                                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                                {pkg.badge && (
                                    <span className="absolute -top-3 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                                        {pkg.badge}
                                    </span>
                                )}

                                <div>
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                                        {pkg.tag}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                                    <p className="text-xs text-slate-400 mb-6">{pkg.desc}</p>

                                    <div className="text-4xl font-black text-white mb-4">
                                        {curr.symbol}{calcPrice(pkg.eurPrice)}{' '}
                                        <span className="text-xs text-slate-400 font-semibold">{curr.code}</span>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2.5 mb-6 text-center">
                                        <span className="text-xs text-blue-300 font-extrabold font-mono">
                                            +{pkg.tokens.toLocaleString()} AI Tokens
                                        </span>
                                    </div>
                                </div>

                                <Link
                                    href={route('register')}
                                    className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Select {pkg.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
