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
        desc: 'Instant account activation with zero forced monthly subscriptions. Fund your digital wallet with AI tokens in EUR (€), USD ($), or GBP (£) with a full 14-day unused balance refund guarantee and official UK B2B PDF tax invoices.',
        icon: Wallet,
        tag: 'Infrastructure & Deposit',
        color: 'from-blue-500 to-cyan-500',
        points: [
            'Multi-Currency Support (EUR, USD, GBP)',
            'No Mandatory Recurring Subscriptions',
            '14-Day Money Back Refund Policy',
            'Instant Official UK B2B PDF Invoices'
        ]
    },
    {
        num: '02',
        title: 'Feed Knowledge Base (PDF, DOCX, TXT, CSV)',
        subtitle: 'Automated Semantic Chunking & Neural Vectorization',
        desc: 'Simply upload your product documentation, manuals, pricing sheets, or FAQs. Our document parser extracts text into contextual chunks and indexes high-density vector embeddings in under 60 seconds.',
        icon: Cpu,
        tag: 'Knowledge Base & RAG',
        color: 'from-purple-500 to-indigo-500',
        points: [
            'Direct PDF, DOCX, TXT & CSV Ingestion',
            'DeepSeek & OpenAI Embedding Vectorization',
            'High-Speed Pinecone Semantic Search (<60ms)',
            '100% Private Knowledge Base Data Isolation'
        ]
    },
    {
        num: '03',
        title: 'Configure Bot Persona & Anti-Hallucination',
        subtitle: 'Zero-Hallucination Guardrails & Human Escalation',
        desc: 'Customize your assistant name, system prompt, brand accent color, and fallback instructions. The agent answers strictly from your uploaded files, escalating unknown queries to human support.',
        icon: Sliders,
        tag: 'Agent Persona & Guardrails',
        color: 'from-cyan-500 to-blue-600',
        points: [
            'Strict Zero-Hallucination Answer Guardrails',
            'Custom Brand Accent Colors & Welcome Copy',
            'Automated Human Support Email Escalation',
            'Full Multi-turn Conversation Context Memory'
        ]
    },
    {
        num: '04',
        title: '1-Line Embed Script & 24/7 Live Support',
        subtitle: 'Drop-in JavaScript Widget on Any Website or CMS',
        desc: 'Copy your unique 1-line script tag and paste it into WordPress, Shopify, Webflow, or custom React/HTML. Your AI assistant immediately begins resolving customer inquiries 24/7 across multiple languages.',
        icon: FileText,
        tag: 'Deployment & Live Support',
        color: 'from-emerald-500 to-teal-600',
        points: [
            'Single-Line Embed Script (widget.js)',
            'Mobile-Responsive Glassmorphic UI',
            'Real-Time AI Token Usage Accounting',
            '100% IP Retention & Zero Public Training'
        ]
    }
];

const PACKAGES = [
    {
        name: 'Starter Agent',
        eurPrice: 649,
        tokens: 649000,
        tag: 'Entry Tier',
        desc: 'Ideal for small business websites & knowledge base setup',
        badge: null,
        features: [
            'Up to 3 Custom AI Bots',
            '649,000 AI Token Balance',
            'PDF, DOCX, TXT & CSV Knowledge Base',
            '1-Line Embeddable Chat Widget',
            'Downloadable PDF Invoice Stamped PAID',
            '14-Day Money Back Guarantee'
        ],
        btnColor: 'bg-slate-800 hover:bg-slate-700'
    },
    {
        name: 'Standard Agent',
        eurPrice: 1249,
        tokens: 1249000,
        tag: 'Standard Tier',
        desc: 'For growing platforms with high customer chat volume',
        badge: null,
        features: [
            'Up to 7 Custom AI Bots',
            '1,249,000 AI Token Balance',
            'Real-Time RAG Vector Semantic Search',
            'Multi-Language Automated Inquiries',
            'Downloadable PDF Invoice Stamped PAID'
        ],
        btnColor: 'bg-slate-800 hover:bg-slate-700'
    },
    {
        name: 'Pro Support',
        eurPrice: 2499,
        tokens: 2499000,
        tag: 'Pro Tier',
        desc: 'For scaling e-commerce & SaaS client customer operations',
        badge: 'Most Popular',
        features: [
            'Up to 15 Custom AI Bots',
            '2,499,000 AI Token Balance',
            'Advanced Anti-Hallucination Guardrails',
            'Custom Brand Accent Colors & Persona',
            'Priority Support Desk (24-48h SLA)'
        ],
        btnColor: 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/25'
    },
    {
        name: 'Growth Infrastructure',
        eurPrice: 3899,
        tokens: 3899000,
        tag: 'Growth Scaled',
        desc: 'Multi-site deployment & high-volume customer inquiries',
        badge: null,
        features: [
            'Unlimited Custom AI Bots',
            '3,899,000 AI Token Balance',
            'Deep Semantic Vector Knowledge Retrieval',
            'Dedicated Account Manager',
            '100% IP Data Privacy Guarantee'
        ],
        btnColor: 'bg-slate-800 hover:bg-slate-700'
    },
    {
        name: 'Institutional Scale',
        eurPrice: 5299,
        tokens: 5299000,
        tag: 'Institutional Scale',
        desc: 'High-throughput corporate support & knowledge base sync',
        badge: null,
        features: [
            'Dedicated Trade Desk Manager',
            '5,299,000 AI Token Balance',
            'Unlimited Document Vector Embeddings',
            '100% Private Knowledge Base Space',
            'VIP SLA Direct Technical Support'
        ],
        btnColor: 'bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/25'
    },
    {
        name: 'Enterprise Global',
        eurPrice: 6759,
        tokens: 6759000,
        tag: 'Enterprise Maximum',
        desc: 'Maximum enterprise throughput with dedicated engineering dispatch',
        badge: 'Enterprise',
        features: [
            '6,759,000 AI Token Balance',
            'Unlimited Bots & Custom Domains',
            'Custom Multi-Currency B2B Invoicing',
            'Zero Public Model Training Guarantee',
            'VIP SLA Direct Engineering Line'
        ],
        btnColor: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-purple-500/30'
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
            <Head title="How It Works — Step-by-Step AI Chat Widget & Knowledge Base RAG | Zeltrionix AI" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-16 pb-24 bg-slate-950 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-6 shadow-lg backdrop-blur-md">
                        <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        INSTANT AI SUPPORT WIDGET WORKFLOW
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        How <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Zeltrionix AI</span> Automates <br />
                        Your Customer Support Operations
                    </h1>

                    <p className="text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
                        From document ingestion (PDF, DOCX, TXT, CSV) to semantic Pinecone vector indexing and 1-line website widget embedding in under 60 seconds.
                    </p>
                </div>
            </section>

            {/* INTERACTIVE WORKFLOW STEPS */}
            <section className="py-20 bg-slate-950 text-white border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Architectural Blueprint</h2>
                        <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                            4 Steps to Deploy Your Autonomous AI Chatbot
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
                                            <IconComponent className="w-4 h-4 text-blue-400" /> Platform Highlights
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

            {/* SUPPLY PACKAGES CARDS SECTION (6 PACKAGES €649 to €6759) */}
            <section className="py-24 bg-slate-950 border-t border-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Token Infrastructure Packages</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Select Your AI Infrastructure Package
                        </p>
                        <p className="text-slate-400 text-sm mt-3">
                            Instant credit to your digital wallet with official UK B2B PDF tax invoice.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {PACKAGES.map((pkg, idx) => (
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
                                        {symbol}{calcPrice(pkg.eurPrice)}{' '}
                                        <span className="text-xs text-slate-400 font-semibold">{selectedCurrency}</span>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2.5 mb-6 text-center">
                                        <span className="text-xs text-blue-300 font-extrabold font-mono">
                                            +{pkg.tokens.toLocaleString()} AI Tokens
                                        </span>
                                    </div>

                                    <ul className="space-y-3 text-xs text-slate-300 mb-8">
                                        {pkg.features.map((feat, fIdx) => (
                                            <li key={fIdx} className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href={auth?.user ? route('dashboard') : route('register')}
                                    className={`w-full text-center text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-all ${pkg.btnColor}`}
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
