import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import CookieConsent from '@/Components/CookieConsent';
import OfflineBanner from '@/Components/OfflineBanner';
import CurrencyDropdown from '@/Components/CurrencyDropdown';
import { Building2, MapPin, Mail, ShieldCheck } from 'lucide-react';

export default function GuestLayout({ children }) {
    const { auth, company } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
            {/* Global Network Connectivity Detector */}
            <OfflineBanner />

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
                        {/* Header Flag Currency Selector */}
                        <CurrencyDropdown />

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

            {/* Comprehensive Footer with Full Company Information */}
            <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Top Row: Logo & Detailed Company Information */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900 items-start">
                        <div className="md:col-span-4 space-y-3">
                            <ZeltrionixLogo className="h-8" showText={true} />
                            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                                Autonomous AI Support Infrastructure. Trained exclusively on your business documentation for zero-hallucination support.
                            </p>
                        </div>

                        {/* Official Company Details Block */}
                        <div className="md:col-span-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Company Details</span>
                                <h4 className="font-bold text-white text-sm mb-1">{company?.name || 'FERNBLAKE LIMITED'}</h4>
                                <p className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-400" /> {company?.registration_number || 'Company No. 16020960'}</p>
                                <p className="text-slate-400 flex items-center gap-1.5 mt-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> <a href={`mailto:${company?.support_email || 'info@zeltrionix.com'}`} className="hover:text-blue-300 underline">{company?.support_email || 'info@zeltrionix.com'}</a></p>
                            </div>

                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Registered Address</span>
                                <p className="text-slate-300 leading-relaxed flex items-start gap-1.5">
                                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>{company?.address || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF'}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Legal Links Bar */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-blue-400" />
                            <span>© 2026 {company?.name || 'FERNBLAKE LIMITED'}. All rights reserved.</span>
                        </div>

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

            {/* Glassmorphism Cookie Consent Modal */}
            <CookieConsent />
        </div>
    );
}
