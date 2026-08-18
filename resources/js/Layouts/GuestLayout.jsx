import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';

const CURRENCY_SYMBOLS = { EUR: '€', USD: '$', GBP: '£' };

export default function GuestLayout({ children }) {
    const { auth, company } = usePage().props;

    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('zeltronix_currency') || 'EUR';
    });

    const handleCurrencyChange = (code) => {
        setCurrency(code);
        localStorage.setItem('zeltronix_currency', code);
        window.dispatchEvent(new Event('zeltronix_currency_changed'));
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <ZeltrionixLogo className="h-9" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <a href="#features" className="hover:text-blue-400 transition-colors">Platform</a>
                        <a href="#how-it-works" className="hover:text-blue-400 transition-colors">Solutions</a>
                        <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
                        <a href="#demo" className="hover:text-blue-400 transition-colors">Live Demo</a>
                    </nav>

                    <div className="flex items-center gap-4">
                        {/* Header Currency Selector */}
                        <div className="hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs font-bold">
                            {['EUR', 'USD', 'GBP'].map((code) => (
                                <button
                                    key={code}
                                    onClick={() => handleCurrencyChange(code)}
                                    className={`px-2.5 py-1 rounded-lg transition-all ${
                                        currency === code
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {CURRENCY_SYMBOLS[code]} {code}
                                </button>
                            ))}
                        </div>

                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
                            >
                                Dashboard →
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-slate-300 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-purple-500/35"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Comprehensive Footer with Legal Section */}
            <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-900">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <ZeltrionixLogo className="h-7" showText={true} />
                            <span className="hidden sm:inline text-slate-700">|</span>
                            <span className="text-xs text-slate-500">© 2026 {company?.name || 'FERNBLAKE LIMITED'}. All rights reserved.</span>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs font-semibold">
                            <span>Email: <a href={`mailto:${company?.support_email}`} className="text-blue-400 hover:underline">{company?.support_email || 'support@fernblake.com'}</a></span>
                        </div>
                    </div>

                    {/* Legal Links Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
                        <span className="text-slate-500">Legal Compliance & Security • {company?.name || 'FERNBLAKE LIMITED'}</span>
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href={route('legal.terms')} className="hover:text-white transition-colors">
                                Terms & Conditions
                            </Link>
                            <Link href={route('legal.privacy')} className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href={route('legal.cookies')} className="hover:text-white transition-colors">
                                Cookie Policy
                            </Link>
                            <Link href={route('legal.refund')} className="hover:text-white transition-colors">
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
