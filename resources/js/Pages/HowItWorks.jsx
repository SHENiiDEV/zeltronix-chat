import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { 
    Cpu, ShieldCheck, Zap, Layers, Globe, Check, ArrowRight, Wallet, 
    FileText, Calculator, Building2, Coins, Sparkles, Sliders 
} from 'lucide-react';

const STEPS = [
    {
        num: '01',
        title: 'Instant Provisioning & Digital Wallet',
        subtitle: 'Multi-Currency Balance & UK B2B Invoices',
        desc: 'Instant account activation with zero forced recurring subscriptions. Fund your digital wallet in EUR (€), USD ($), or GBP (£) with full 14-day unused balance refund guarantee and official UK B2B PDF tax invoices.',
        icon: Wallet,
        tag: 'Infrastructure & Deposit',
        color: 'from-blue-500 to-cyan-500',
        points: [
            'Multi-Currency Support (EUR, USD, GBP)',
            'No Monthly Mandatory Subscriptions',
            '14-Day Money Back Refund Policy',
            'Instant Official UK B2B PDF Invoices'
        ]
    },
    {
        num: '02',
        title: 'Neural Factory Discovery & Intelligence',
        subtitle: '1,200+ Verified OEM/ODM Suppliers Scan',
        desc: 'Our neural RAG vector engine scans over 1,200+ audited tier-1 manufacturers across Shenzhen, Ningbo, Dongguan, and Vietnam in under 60 seconds, evaluating production capacity, ISO certifications, and MOQ boundaries.',
        icon: Cpu,
        tag: 'Sourcing & Discovery',
        color: 'from-purple-500 to-indigo-500',
        points: [
            'Deep Shenzhen & Ningbo OEM Directory',
            'Autonomous RAG Vector Match (<60s)',
            'Audited ISO & BSCI Compliance Verification',
            'Tier-1 Factory Direct Sourcing'
        ]
    },
    {
        num: '03',
        title: 'Reverse Landed Cost & Customs Tariffs',
        subtitle: 'HS Code & Container Freight Calculation',
        desc: 'Automated HS Code classification, sea freight FCL/LCL tariff calculations, customs duty modeling, and turnkey landed cost estimation per unit before issuing initial RFQ purchase orders.',
        icon: Calculator,
        tag: 'Financial Economics',
        color: 'from-cyan-500 to-blue-600',
        points: [
            'Automated HS Code Tariff Matching',
            'Sea Freight & Air Cargo Rate Calculations',
            'Turnkey Landed Unit Cost Modeling',
            'Customs & Import Duty Estimates'
        ]
    },
    {
        num: '04',
        title: 'Turnkey Dossiers & B2B Invoices',
        subtitle: 'Bilingual RFQ Scripts & Downloadable PDF',
        desc: 'Generate 6-page institutional investment dossiers, bilingual English/Chinese factory negotiation scripts, and download official PDF receipts stamped with PAID & VERIFIED verification.',
        icon: FileText,
        tag: 'Execution & Deliverables',
        color: 'from-emerald-500 to-teal-600',
        points: [
            '6-Page Institutional Dossiers (PDF)',
            'Bilingual English/Chinese Factory RFQ Scripts',
            'Stamped PAID & VERIFIED Receipts',
            '100% IP Ownership Retention'
        ]
    }
];

export default function HowItWorks({ auth }) {
    const [selectedCurrency, setSelectedCurrency] = useState('EUR');

    const SYMBOLS = { EUR: '€', USD: '$', GBP: '£' };
    const RATES = { EUR: 1.0, USD: 1.09, GBP: 0.86 };

    const symbol = SYMBOLS[selectedCurrency] || '€';
    const rate = RATES[selectedCurrency] || 1.0;

    const calcPrice = (eurAmount) => (eurAmount * rate).toFixed(0);

    return (
        <GuestLayout>
            <Head title="How It Works — Step-by-Step AI Sourcing & B2B Invoices | Voltoria AI" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-16 pb-24 bg-slate-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
                        <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        INSTANT AI PROVISIONING WORKFLOW
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        How <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Voltoria AI</span> Powers Your <br />
                        Global Supply Chain Architecture
                    </h1>

                    <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
                        From instant multi-currency digital wallet funding to autonomous Shenzhen OEM factory discovery and 6-page institutional dossiers in under 60 seconds.
                    </p>
                </div>
            </section>

            {/* INTERACTIVE WORKFLOW STEPS */}
            <section className="py-20 bg-slate-950 text-white border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Architectural Blueprint</h2>
                        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            4 Steps to Direct OEM Factory Sourcing & PDF Dossiers
                        </p>
                    </div>

                    <div className="space-y-12">
                        {STEPS.map((step, idx) => {
                            const IconComponent = step.icon;
                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                                >
                                    {/* Left Step Header & Icon */}
                                    <div className="lg:col-span-5 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-4xl font-black font-mono bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                {step.num}
                                            </span>
                                            <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {step.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm font-semibold text-blue-400">
                                            {step.subtitle}
                                        </p>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Right Key Points List */}
                                    <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <IconComponent className="w-4 h-4 text-blue-400" /> Executive Highlights
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {step.points.map((pt, pIdx) => (
                                                <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-200 font-medium">
                                                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                    <span>{pt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SUPPLY PACKAGES CARDS SECTION */}
            <section className="py-24 bg-slate-950 border-t border-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Sourcing Packages</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Select Your Supply Chain Package
                        </p>
                        <p className="text-slate-400 text-sm mt-3">
                            Instant credit to your digital wallet with official UK B2B PDF tax invoice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Starter Package (€149) */}
                        <div className="bg-slate-900/90 p-8 rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between hover:border-blue-500/40 transition-all">
                            <div>
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">Starter Sourcing</span>
                                <h3 className="text-xl font-bold text-white mb-2">Starter Package</h3>
                                <p className="text-xs text-slate-400 mb-6">Ideal for initial product sourcing & verification</p>

                                <div className="text-4xl font-black text-white mb-6">
                                    {symbol}{calcPrice(149)} <span className="text-xs text-slate-400 font-semibold">{selectedCurrency}</span>
                                </div>

                                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 3 Shenzhen OEM Factory Matches</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic Reverse Landed Cost Model</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Downloadable PDF Invoice Stamped PAID</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 14-Day Money Back Guarantee</li>
                                </ul>
                            </div>
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="w-full text-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all"
                            >
                                Select Starter Package
                            </Link>
                        </div>

                        {/* Pro Package (€499) */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border-2 border-blue-500 shadow-2xl shadow-blue-500/10 flex flex-col justify-between relative">
                            <span className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </span>
                            <div>
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">Institutional Sourcing</span>
                                <h3 className="text-xl font-bold text-white mb-2">Pro Sourcing Package</h3>
                                <p className="text-xs text-slate-400 mb-6">Full institutional Memorandum & RFQ Scripts</p>

                                <div className="text-4xl font-black text-white mb-6">
                                    {symbol}{calcPrice(499)} <span className="text-xs text-slate-400 font-semibold">{selectedCurrency}</span>
                                </div>

                                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Full 6-Page Institutional Memorandum</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Bilingual English/Chinese Negotiation Scripts</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Sea Freight & HS Code Duty Tariff Calculator</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority Executive Support (&lt;4h SLA)</li>
                                </ul>
                            </div>
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all shadow-lg shadow-blue-500/25"
                            >
                                Select Pro Package
                            </Link>
                        </div>

                        {/* Enterprise Package (€1,499) */}
                        <div className="bg-slate-900/90 p-8 rounded-3xl border border-purple-500/40 shadow-xl flex flex-col justify-between hover:border-purple-500 transition-all">
                            <div>
                                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block mb-1">Enterprise Scaled</span>
                                <h3 className="text-xl font-bold text-white mb-2">Enterprise Package</h3>
                                <p className="text-xs text-slate-400 mb-6">Dedicated Trade Desk & Custom Factory Audits</p>

                                <div className="text-4xl font-black text-white mb-6">
                                    {symbol}{calcPrice(1499)} <span className="text-xs text-slate-400 font-semibold">{selectedCurrency}</span>
                                </div>

                                <ul className="space-y-3 text-xs text-slate-300 mb-6">
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Dedicated Trade Desk Manager</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Custom Factory Sample Verification</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Unlimited Vector Dossier Exports</li>
                                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-400" /> Custom Multi-Currency B2B Invoicing</li>
                                </ul>
                            </div>
                            <Link
                                href={auth?.user ? route('dashboard') : route('register')}
                                className="w-full text-center bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-lg shadow-purple-500/25"
                            >
                                Select Enterprise Package
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
