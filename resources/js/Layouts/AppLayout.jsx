import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { Receipt } from 'lucide-react';

export default function AppLayout({ header, children }) {
    const { auth, company } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            {/* Top Navigation Bar */}
            <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-8">
                            {/* Brand Logo */}
                            <Link href={route('dashboard')} className="flex items-center">
                                <ZeltrionixLogo className="h-8" />
                            </Link>

                            {/* Nav Links */}
                            <div className="hidden sm:flex items-center gap-6 text-sm font-semibold text-slate-300">
                                <Link
                                    href={route('dashboard')}
                                    className={`px-3 py-2 rounded-lg transition-colors ${
                                        route().current('dashboard') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:text-white'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('bots.index')}
                                    className={`px-3 py-2 rounded-lg transition-colors ${
                                        route().current('bots.*') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:text-white'
                                    }`}
                                >
                                    AI Agents
                                </Link>
                                <Link
                                    href={route('invoices.index')}
                                    className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                                        route().current('invoices.*') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:text-white'
                                    }`}
                                >
                                    <Receipt className="w-4 h-4 text-amber-400" /> Invoices & Billing
                                </Link>
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="hidden sm:flex sm:items-center sm:gap-4">
                            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                                {auth.user.name}
                            </span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-lg border border-rose-500/20 transition-all"
                            >
                                Sign Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sub-Header */}
            {header && (
                <header className="bg-slate-900/40 border-b border-slate-800/60 py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Dashboard Footer */}
            <footer className="bg-slate-950 border-t border-slate-900/90 py-8 text-slate-400 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <ZeltrionixLogo className="h-6" showText={true} />
                        <span className="text-slate-600">|</span>
                        <span className="text-slate-500">© 2026 {company?.name || 'Zeltrionix Inc.'}. All rights reserved.</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 font-semibold">
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
            </footer>
        </div>
    );
}
