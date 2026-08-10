import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import WidgetPreview from '@/Components/WidgetPreview';
import { motion } from 'framer-motion';
import {
    Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Target, Palette,
    UserPlus, BarChart3, Lock, Globe, Clock, Brain, TrendingUp, Check, Star,
    Coins, Sliders
} from 'lucide-react';

export default function Welcome({ auth }) {
    // Custom token calculator (€0.60 per 1,000,000 tokens)
    const [customTokens, setCustomTokens] = useState(10000000); // 10 Million Tokens
    const calculatedEuro = ((customTokens / 1000000) * 0.60).toFixed(2);

    return (
        <GuestLayout>
            <Head title="Zeltrionix | Autonomous AI Support Agents & Token-based AI Infrastructure" />

            {/* 1. HERO SECTION */}
            <section className="relative overflow-hidden pt-16 pb-28 lg:pt-24 lg:pb-36 bg-slate-950 text-white">
                {/* Background Glows & Aceternity-style Animated Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"></div>
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Copy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-6 shadow-lg shadow-blue-500/10 backdrop-blur-md">
                            <Zap className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                            TRANSPARENT TOKEN-BASED MONETIZATION
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6">
                            Your Knowledge. <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Our AI Agents.
                            </span> <br />
                            Pay-Per-Token Precision.
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 font-normal leading-relaxed">
                            Deploy autonomous AI support agents trained on your business docs. Pay strictly for the AI tokens your agents consume, top-up anytime with custom amounts, and save thousands on support costs.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-blue-500/30 hover:shadow-purple-500/40 text-center flex items-center justify-center gap-2"
                                >
                                    Open Dashboard <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-blue-500/30 hover:shadow-purple-500/40 text-center flex items-center justify-center gap-2"
                                    >
                                        Build Your AI Agent <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <a
                                        href="#pricing"
                                        className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold py-4 px-8 rounded-2xl transition-colors border border-slate-800 text-center"
                                    >
                                        View Plans (€30 / €100)
                                    </a>
                                </>
                            )}
                        </div>

                        <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-slate-400 text-xs font-semibold">
                            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Monthly Token Quota</span>
                            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-400" /> Custom Top-Up Any Time</span>
                            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-400" /> SOC2 Compliant</span>
                        </div>
                    </motion.div>

                    {/* Right Interactive Widget Demo */}
                    <motion.div
                        id="demo"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 flex justify-center"
                    >
                        <WidgetPreview />
                    </motion.div>
                </div>
            </section>

            {/* 2. TRUST BAR */}
            <section className="py-12 bg-slate-950/80 border-y border-slate-900">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                        Trusted by innovative teams worldwide
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all text-slate-300 font-extrabold text-lg">
                        <span>OMNITECH</span>
                        <span>APEX LOGISTICS</span>
                        <span>CLOUDFLOW</span>
                        <span>PAYPHANTOM</span>
                        <span>VORTEX SAAS</span>
                    </div>
                </div>
            </section>

            {/* 3. PROBLEM / SOLUTION SECTION */}
            <section className="py-24 bg-slate-950 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Efficiency Reimagined</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Support that Scales Without the Headcount
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">The Old Way</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Support teams overwhelmed by repetitive questions, leading to slow response times, high operational costs, and frustrated customers.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-8 rounded-3xl border border-blue-500/30 hover:border-blue-500/60 transition-all shadow-xl shadow-blue-500/5 relative">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                                <Brain className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">The Zeltrionix Way</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Your AI Agent learns your business in minutes. It handles 80% of common support queries instantly, consuming tokens only when active.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-slate-900/60 p-8 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">The Result</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Drastically reduced support ticket costs, full control over token consumption, and ability to top-up tokens flexibly as your business grows.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PRICING SECTION - PRO (€30 = 50M TOKENS) AND ENTERPRISE (€100 = 175M TOKENS) */}
            <section id="pricing" className="py-24 bg-slate-950 border-t border-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Token-Based Plans</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Transparent Plans & Flexible Token Top-Ups
                        </p>
                        <p className="text-slate-400 text-sm mt-3">
                            Each plan includes a massive monthly quota of AI tokens. Top-up any custom token amount anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                        {/* PRO Plan - €30 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-10 rounded-3xl border border-slate-800 shadow-2xl flex flex-col justify-between relative hover:border-blue-500/50 transition-all">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">PRO Plan</h3>
                                        <p className="text-slate-400 text-sm">Ideal for growing SaaS & stores</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                                        <Coins className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="text-5xl font-extrabold mb-8 text-white">€30<span className="text-base text-slate-400 font-normal"> / month</span></div>

                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 mb-6 text-center">
                                    <span className="text-xs text-blue-300 font-semibold block uppercase tracking-wider">Included Monthly Quota</span>
                                    <span className="text-2xl font-black text-blue-400">50,000,000 AI Tokens</span>
                                </div>

                                <ul className="space-y-4 text-sm text-slate-200 mb-8">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-400" /> <span><strong>5 AI Support Agents</strong></span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-400" /> <span>Up to 50 Knowledge Base Files & URLs</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-400" /> <span>Full Color & Design Customization</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-400" /> <span>Instant Token Top-Ups at wholesale rates</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-blue-400" /> <span>Chat History & Token Telemetry</span></li>
                                </ul>
                            </div>
                            <Link
                                href={route('register')}
                                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                            >
                                Choose PRO (€30/mo) <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* ENTERPRISE Plan - €100 */}
                        <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-10 rounded-3xl border-2 border-purple-500 shadow-2xl shadow-purple-500/20 flex flex-col justify-between relative">
                            <span className="absolute -top-3.5 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-white" /> Enterprise Grade
                            </span>
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-1">ENTERPRISE</h3>
                                        <p className="text-purple-300 text-sm">For high-traffic operations & scale</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                </div>

                                <div className="text-5xl font-extrabold mb-8 text-white">€100<span className="text-base text-purple-300 font-normal"> / month</span></div>

                                <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-4 mb-6 text-center">
                                    <span className="text-xs text-purple-300 font-semibold block uppercase tracking-wider">Included Monthly Quota</span>
                                    <span className="text-2xl font-black text-purple-300">175,000,000 AI Tokens</span>
                                </div>

                                <ul className="space-y-4 text-sm text-slate-200 mb-8">
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-400" /> <span><strong>Unlimited AI Agents</strong></span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-400" /> <span>Unlimited Knowledge Documents & URLs</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-400" /> <span>Custom Token Top-Up Module (Any Amount)</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-400" /> <span>Dedicated Account Manager & SLA</span></li>
                                    <li className="flex items-center gap-3"><Check className="w-4 h-4 text-purple-400" /> <span>Enterprise API Access & Webhooks</span></li>
                                </ul>
                            </div>
                            <Link
                                href={route('register')}
                                className="w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
                            >
                                Choose ENTERPRISE (€100/mo) <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* INTERACTIVE CUSTOM TOKEN TOP-UP CALCULATOR */}
                    <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                                <Sliders className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Custom Token Top-Up Calculator</h3>
                                <p className="text-xs text-slate-400">Need extra tokens? Calculate custom token top-ups instantly.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
                            <div className="md:col-span-8 space-y-4">
                                <div className="flex justify-between text-xs font-bold text-slate-300">
                                    <span>Top-Up Token Amount:</span>
                                    <span className="text-blue-400 text-sm font-black">{customTokens.toLocaleString()} Tokens</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000000"
                                    max="100000000"
                                    step="1000000"
                                    value={customTokens}
                                    onChange={(e) => setCustomTokens(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                                    <span>1,000,000 tokens</span>
                                    <span>50,000,000 tokens</span>
                                    <span>100,000,000 tokens</span>
                                </div>
                            </div>

                            <div className="md:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center">
                                <span className="text-xs text-slate-400 block font-semibold mb-1">Top-Up Price</span>
                                <div className="text-3xl font-black text-white">€{calculatedEuro}</div>
                                <span className="text-[10px] text-emerald-400 block mt-1">Instant Token Credit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. KEY FEATURES GRID */}
            <section id="features" className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-blue-500 font-bold uppercase tracking-wider text-xs mb-2">Enterprise Ready</h2>
                        <p className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Built for Accuracy, Designed for Business
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Precision & Accuracy</h3>
                            <p className="text-slate-400 text-sm">No Hallucinations. RAG engine ensures the AI strictly answers using your verified business documentation.</p>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                                <Palette className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Full Customization</h3>
                            <p className="text-slate-400 text-sm">Your Brand, Your Voice. Customize colors, greeting text, and assistant names to match your design.</p>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Smart Escalation</h3>
                            <p className="text-slate-400 text-sm">Seamless Human Handover. When queries are complex, the AI routes requests to your human support team.</p>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Deep Analytics</h3>
                            <p className="text-slate-400 text-sm">Monitor conversation logs, token consumption rates, and identify gaps in your knowledge base.</p>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Secure & Private</h3>
                            <p className="text-slate-400 text-sm">Your customer data is encrypted in transit and at rest, and never used to train public models.</p>
                        </div>

                        <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/50 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Multi-lingual Support</h3>
                            <p className="text-slate-400 text-sm">Automatically detects and responds in over 50 languages to support your global customer base.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FINAL CTA */}
            <section className="py-20 bg-gradient-to-r from-blue-900/40 via-slate-900 to-purple-900/40 border-t border-slate-800 text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">
                        Ready to Transform Your Customer Service?
                    </h2>
                    <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
                        Join hundreds of forward-thinking businesses reducing costs and boosting satisfaction with Zeltrionix. Start with your PRO (€30) or ENTERPRISE (€100) token plan today.
                    </p>
                    <Link
                        href={route('register')}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-4 px-10 rounded-2xl text-lg shadow-2xl shadow-blue-500/40 transition-all transform hover:scale-105"
                    >
                        Get Started Today <Sparkles className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </GuestLayout>
    );
}
