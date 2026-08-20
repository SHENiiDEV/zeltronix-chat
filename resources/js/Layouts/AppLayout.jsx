import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import CookieConsent from '@/Components/CookieConsent';
import OfflineBanner from '@/Components/OfflineBanner';
import CurrencyDropdown from '@/Components/CurrencyDropdown';
import { Receipt, Building2, MapPin, Mail, Menu, X, Bot, LayoutDashboard, LogOut, User, HelpCircle, PhoneCall, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppLayout({ header, children }) {
    const { auth, company } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col">
            {/* Global Network Connectivity Detector */}
            <OfflineBanner />

            {/* Top Navigation Bar */}
            <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-8">
                            {/* Brand Logo */}
                            <Link href={route('dashboard')} className="flex items-center">
                                <ZeltrionixLogo className="h-8" />
                            </Link>

                            {/* Desktop Nav Links */}
                            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
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
                                <Link
                                    href={route('how-it-works')}
                                    className={`px-3 py-2 rounded-lg transition-colors ${
                                        route().current('how-it-works') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'hover:text-white'
                                    }`}
                                >
                                    How It Works
                                </Link>
                            </div>
                        </div>

                        {/* Desktop User Profile & Flag Currency Dropdown */}
                        <div className="hidden md:flex md:items-center md:gap-3">
                            <CurrencyDropdown />

                            <span className="text-xs font-semibold text-slate-200 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700">
                                {auth.user.name}
                            </span>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-xl border border-rose-500/20 transition-all"
                            >
                                Sign Out
                            </Link>
                        </div>

                        {/* Mobile Hamburger Toggle Button */}
                        <div className="flex md:hidden items-center gap-2">
                            <CurrencyDropdown />
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:border-blue-500 transition-colors"
                                aria-label="Open mobile menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

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
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 md:hidden"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-900/95 border-l border-slate-800 backdrop-blur-2xl z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden"
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

                                {/* User Info Card inside Drawer */}
                                <div className="mt-6 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <div className="font-bold text-white text-sm truncate">{auth.user.name} {auth.user.surname || ''}</div>
                                        <div className="text-xs text-slate-400 truncate">{auth.user.email}</div>
                                    </div>
                                </div>

                                {/* Drawer Navigation Links */}
                                <nav className="mt-6 space-y-2 text-sm font-semibold">
                                    <Link
                                        href={route('dashboard')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            route().current('dashboard')
                                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                        }`}
                                    >
                                        <LayoutDashboard className="w-5 h-5 text-blue-400" />
                                        Dashboard
                                    </Link>

                                    <Link
                                        href={route('bots.index')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            route().current('bots.*')
                                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                        }`}
                                    >
                                        <Bot className="w-5 h-5 text-purple-400" />
                                        AI Agents
                                    </Link>

                                    <Link
                                        href={route('invoices.index')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                            route().current('invoices.*')
                                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                                        }`}
                                    >
                                        <Receipt className="w-5 h-5 text-amber-400" />
                                        Invoices & Billing
                                    </Link>

                                    <Link
                                        href={route('how-it-works')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                                    >
                                        <HelpCircle className="w-5 h-5 text-cyan-400" />
                                        How It Works
                                    </Link>

                                    <Link
                                        href={route('support')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                                    >
                                        <HelpCircle className="w-5 h-5 text-emerald-400" />
                                        Support & FAQ
                                    </Link>

                                    <Link
                                        href={route('contact')}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all"
                                    >
                                        <PhoneCall className="w-5 h-5 text-rose-400" />
                                        Contact Support
                                    </Link>
                                </nav>
                            </div>

                            {/* Drawer Footer Actions */}
                            <div className="pt-6 border-t border-slate-800">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold py-3 px-4 rounded-xl text-center flex items-center justify-center gap-2 text-sm transition-all"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

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

            {/* Dashboard Footer with Navigation & Full Company Information */}
            <footer className="bg-slate-950 border-t border-slate-900/90 py-8 text-slate-400 text-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-900">
                        <div>
                            <span className="font-bold text-white text-sm block mb-1">{company?.name || 'INCHWARD LIMITED'}</span>
                            <div className="flex flex-wrap items-center gap-4 text-slate-400 text-[11px]">
                                <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-blue-400" /> {company?.registration_number || 'UK Co. No. 16021412'}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /> {company?.address || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom'}</span>
                                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-400" /> <a href={`mailto:${company?.support_email || 'info@voltoria.co.uk'}`} className="hover:text-blue-300 underline">{company?.support_email || 'info@voltoria.co.uk'}</a></span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-6 font-semibold">
                            <Link href={route('how-it-works')} className="hover:text-white transition-colors">How It Works</Link>
                            <Link href={route('about')} className="hover:text-white transition-colors">About Us</Link>
                            <Link href={route('support')} className="hover:text-white transition-colors">Support & FAQ</Link>
                            <Link href={route('contact')} className="hover:text-white transition-colors">Contact Support</Link>
                            <span className="text-slate-700">|</span>
                            <Link href={route('legal.terms')} className="hover:text-white transition-colors">Terms</Link>
                            <Link href={route('legal.privacy')} className="hover:text-white transition-colors">Privacy</Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <ZeltrionixLogo className="h-6" showText={true} />
                            <span className="text-slate-600">|</span>
                            <span className="text-slate-500">© 2026 {company?.name || 'INCHWARD LIMITED'}. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Glassmorphism Cookie Consent Modal */}
            <CookieConsent />
        </div>
    );
}
