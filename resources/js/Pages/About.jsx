import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { 
    Building2, ShieldCheck, Target, TrendingUp, Cpu, Lock, Globe, 
    CheckCircle2, ArrowRight, MapPin, Mail, Scale 
} from 'lucide-react';

export default function About({ company }) {
    return (
        <GuestLayout>
            <Head title="About Us — Destroying Middleman Markups & Direct OEM Sourcing | Voltoria AI" />

            <div className="relative min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[160px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-md">
                            <Target className="w-3.5 h-3.5 text-blue-400" />
                            OUR CORPORATE MISSION
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                            Eliminating <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">30–40% Trader Markups</span> Through AI Neural Sourcing
                        </h1>
                        <p className="text-slate-300 text-base leading-relaxed">
                            Voltoria AI was built to bypass intermediary trading brokers, connecting global brand owners directly to Tier-1 OEM/ODM manufacturing facilities in Shenzhen, Ningbo, Dongguan, and Vietnam.
                        </p>
                    </div>

                    {/* Bento Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {/* Stat 1 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-blue-500/30 shadow-xl relative overflow-hidden">
                            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <div className="text-4xl font-black text-white mb-1">1,200+</div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Audited Factories</span>
                            <p className="text-[11px] text-slate-400 mt-2">Shenzhen, Ningbo & Vietnam tier-1 verified OEM manufacturers.</p>
                        </div>

                        {/* Stat 2 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-emerald-500/30 shadow-xl relative overflow-hidden">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="text-4xl font-black text-white mb-1">58.4%</div>
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Avg Margin Gain</span>
                            <p className="text-[11px] text-slate-400 mt-2">Direct factory unit cost reduction vs middleman trading brokers.</p>
                        </div>

                        {/* Stat 3 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-purple-500/30 shadow-xl relative overflow-hidden">
                            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                                <Cpu className="w-5 h-5" />
                            </div>
                            <div className="text-4xl font-black text-white mb-1">&lt; 60s</div>
                            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Match & Dossier</span>
                            <p className="text-[11px] text-slate-400 mt-2">RAG vector match and 6-page institutional dossier generation.</p>
                        </div>

                        {/* Stat 4 */}
                        <div className="bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-3xl border border-cyan-500/30 shadow-xl relative overflow-hidden">
                            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4">
                                <Lock className="w-5 h-5" />
                            </div>
                            <div className="text-4xl font-black text-white mb-1">100%</div>
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">IP Retention</span>
                            <p className="text-[11px] text-slate-400 mt-2">Zero public model training guarantee for your proprietary designs.</p>
                        </div>
                    </div>

                    {/* Official Merchant of Record Issuer Block */}
                    <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Merchant of Record & Legal Issuer</h3>
                                <p className="text-xs text-slate-400">Registered Corporate Entity in England & Wales</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-2xl border border-slate-800/80 text-xs">
                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Corporate Name</span>
                                <h4 className="font-bold text-white text-base mb-1">{company?.name || 'INCHWARD LIMITED'}</h4>
                                <p className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-4 h-4 text-blue-400" /> {company?.registration_number || 'UK Co. No. 16021412'}</p>
                                <p className="text-slate-400 flex items-center gap-1.5 mt-1"><Mail className="w-4 h-4 text-blue-400" /> <a href={`mailto:${company?.support_email || 'info@voltoria.co.uk'}`} className="hover:text-blue-300 underline">{company?.support_email || 'info@voltoria.co.uk'}</a></p>
                            </div>

                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Registered Address</span>
                                <p className="text-slate-300 leading-relaxed flex items-start gap-1.5">
                                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>{company?.address || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom'}</span>
                                </p>
                                <p className="text-[11px] text-slate-400 mt-2 font-semibold flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> B2B 0% VAT Reverse Charge Compliant
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
