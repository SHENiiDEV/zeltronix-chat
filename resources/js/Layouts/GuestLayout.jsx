import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import CookieConsent from '@/Components/CookieConsent';
import OfflineBanner from '@/Components/OfflineBanner';
import CurrencyDropdown from '@/Components/CurrencyDropdown';
import { Building2, MapPin, Mail, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuestLayout({ children }) {
    const { auth, company } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
                        <Link href={route('how-it-works')} className={`hover:text-blue-400 transition-colors ${route().current('how-it-works') ? 'text-blue-400 font-bold' : ''}`}>
                            How It Works
                        </Link>
                        <Link href={route('about')} className={`hover:text-blue-400 transition-colors ${route().current('about') ? 'text-blue-400 font-bold' : ''}`}>
                            About Us
                        </Link>
                        <Link href={route('support')} className={`hover:text-blue-400 transition-colors ${route().current('support') ? 'text-blue-400 font-bold' : ''}`}>
                            Support & FAQ
                        </Link>
                        <Link href={route('contact')} className={`hover:text-blue-400 transition-colors ${route().current('contact') ? 'text-blue-400 font-bold' : ''}`}>
                            Contact Us
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-4">
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

                    {/* Mobile Hamburger Toggle Button */}
                    <div className="flex lg:hidden items-center gap-3">
                        <CurrencyDropdown />
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:border-blue-500 transition-colors"
                            aria-label="Open mobile menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Slide-Over Drawer (Right Side) */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 lg:hidden"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900/95 border-l border-slate-800 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden"
                        >
                            <div>
                                {/* Drawer Header */}
                                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                                    <ZeltrionixLogo className="h-8" />
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Drawer Navigation Links */}
                                <nav className="mt-8 space-y-3 text-base font-semibold text-slate-300">
                                    <Link
                                        href={route('how-it-works')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all"
                                    >
                                        How It Works
                                    </Link>
                                    <Link
                                        href={route('about')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all"
                                    >
                                        About Us
                                    </Link>
                                    <Link
                                        href={route('support')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all"
                                    >
                                        Support & FAQ
                                    </Link>
                                    <Link
                                        href={route('contact')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all"
                                    >
                                        Contact Support
                                    </Link>
                                </nav>
                            </div>

                            {/* Drawer Footer Actions */}
                            <div className="pt-6 border-t border-slate-800 space-y-3">
                                {auth?.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                                    >
                                        Open Dashboard <ArrowRight className="w-4 h-4" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl text-center block shadow-lg shadow-blue-500/25 text-sm"
                                        >
                                            Get Started
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="w-full bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold py-3 px-6 rounded-xl text-center block text-sm transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Page Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Comprehensive Footer with Navigation & Full Company Information */}
            <footer className="bg-slate-950 border-t border-slate-900 pt-12 pb-8 text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    {/* Top Row: Logo & Corporate Information */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-900 items-start">
                        <div className="md:col-span-4 space-y-3">
                            <ZeltrionixLogo className="h-8" showText={true} />
                            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                                Autonomous AI Support Infrastructure & Direct OEM Sourcing Architecture.
                            </p>
                        </div>

                        {/* Official Company Details Block */}
                        <div className="md:col-span-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Company Details</span>
                                <h4 className="font-bold text-white text-sm mb-1">{company?.name || 'INCHWARD LIMITED'}</h4>
                                <p className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-400" /> {company?.registration_number || 'UK Co. No. 16021412'}</p>
                                <p className="text-slate-400 flex items-center gap-1.5 mt-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> <a href={`mailto:${company?.support_email || 'info@voltoria.co.uk'}`} className="hover:text-blue-300 underline">{company?.support_email || 'info@voltoria.co.uk'}</a></p>
                            </div>

                            <div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Registered Address</span>
                                <p className="text-slate-300 leading-relaxed flex items-start gap-1.5">
                                    <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <span>{company?.address || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom'}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Legal Links Bar */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href={route('how-it-works')} className="hover:text-white transition-colors">How It Works</Link>
                            <Link href={route('about')} className="hover:text-white transition-colors">About Us</Link>
                            <Link href={route('support')} className="hover:text-white transition-colors">Support & FAQ</Link>
                            <Link href={route('contact')} className="hover:text-white transition-colors">Contact Support</Link>
                            <span className="text-slate-700">|</span>
                            <Link href={route('legal.terms')} className="hover:text-white transition-colors">Terms</Link>
                            <Link href={route('legal.privacy')} className="hover:text-white transition-colors">Privacy</Link>
                            <Link href={route('legal.cookies')} className="hover:text-white transition-colors">Cookies</Link>
                            <Link href={route('legal.refund')} className="hover:text-white transition-colors">Refund Policy</Link>
                        </div>

                        <div className="flex items-center gap-2 text-slate-500">
                            <ShieldCheck className="w-4 h-4 text-blue-400" />
                            <span>© 2026 {company?.name || 'INCHWARD LIMITED'}. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Glassmorphism Cookie Consent Modal */}
            <CookieConsent />
        </div>
    );
}
