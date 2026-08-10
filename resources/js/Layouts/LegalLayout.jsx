import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { ShieldCheck, FileText, Lock, Cookie, RefreshCw, ArrowLeft } from 'lucide-react';

export default function LegalLayout({ title, subtitle, lastUpdated = "August 5, 2026", children, company }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
            {/* Header */}
            <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <ZeltrionixLogo className="h-8" />
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 transition-all"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                        </Link>
                        
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20"
                            >
                                Dashboard →
                            </Link>
                        ) : (
                            <Link
                                href={route('login')}
                                className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-500/20"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Page Header */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border-b border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-extrabold uppercase mb-4">
                        <ShieldCheck className="w-4 h-4" /> Legal & Compliance
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
                        {title}
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base">{subtitle}</p>
                    <p className="text-xs text-slate-500 mt-4 font-mono">Last Updated: {lastUpdated}</p>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1 space-y-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block px-3 mb-2">Legal Docs</span>

                        <Link
                            href={route('legal.terms')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                route().current('legal.terms') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <FileText className="w-4 h-4" /> Terms of Service
                        </Link>

                        <Link
                            href={route('legal.privacy')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                route().current('legal.privacy') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Lock className="w-4 h-4" /> Privacy Policy
                        </Link>

                        <Link
                            href={route('legal.cookies')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                route().current('legal.cookies') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Cookie className="w-4 h-4" /> Cookie Policy
                        </Link>

                        <Link
                            href={route('legal.refund')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                                route().current('legal.refund') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 font-bold' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <RefreshCw className="w-4 h-4" /> Refund Policy
                        </Link>
                    </div>

                    {/* Article Content */}
                    <div className="md:col-span-3 bg-slate-900/60 p-6 sm:p-10 rounded-3xl border border-slate-800 shadow-xl prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-6">
                        {children}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <ZeltrionixLogo className="h-6" />
                        <span className="text-xs text-slate-500">© 2026 {company?.name || 'Zeltrionix Inc.'}. All rights reserved.</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
                        <Link href={route('legal.terms')} className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href={route('legal.privacy')} className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href={route('legal.cookies')} className="hover:text-white transition-colors">Cookie Policy</Link>
                        <Link href={route('legal.refund')} className="hover:text-white transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
