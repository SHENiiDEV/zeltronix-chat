import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Cookie, ShieldCheck, Check, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showCustom, setShowCustom] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true, // Always true
        analytics: true,
        marketing: false,
    });

    useEffect(() => {
        const consent = localStorage.getItem('zeltronix_cookie_consent');
        if (!consent) {
            // Show after short delay for optimal UX
            const timer = setTimeout(() => setVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('zeltronix_cookie_consent', JSON.stringify({
            status: 'accepted',
            essential: true,
            analytics: true,
            marketing: true,
            date: new Date().toISOString(),
        }));
        setVisible(false);
    };

    const handleEssentialOnly = () => {
        localStorage.setItem('zeltronix_cookie_consent', JSON.stringify({
            status: 'essential',
            essential: true,
            analytics: false,
            marketing: false,
            date: new Date().toISOString(),
        }));
        setVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('zeltronix_cookie_consent', JSON.stringify({
            status: 'customized',
            ...preferences,
            date: new Date().toISOString(),
        }));
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50"
            >
                <div className="bg-slate-900/95 border border-slate-800/90 backdrop-blur-xl p-5 sm:p-6 rounded-3xl shadow-2xl shadow-purple-500/10 text-slate-100 relative overflow-hidden">
                    <div className="flex items-start gap-3.5 mb-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                            <Cookie className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-white text-sm">Cookie & Privacy Choices</h3>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                                We use essential cookies to maintain secure sessions and local storage for chat widget continuity. 
                                View our <Link href={route('legal.cookies')} className="text-blue-400 underline font-semibold hover:text-blue-300">Cookie Policy</Link>.
                            </p>
                        </div>
                    </div>

                    {/* Preferences Customizer Accordion */}
                    {showCustom && (
                        <div className="my-4 pt-3 border-t border-slate-800/80 space-y-3 text-xs">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-white block">Essential Cookies</span>
                                    <span className="text-[11px] text-slate-400">Required for login & chat widget state</span>
                                </div>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-extrabold uppercase">
                                    Required
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-bold text-white block">Performance Analytics</span>
                                    <span className="text-[11px] text-slate-400">Helps us optimize response speeds</span>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={preferences.analytics}
                                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                    className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {showCustom ? (
                            <button
                                onClick={handleSavePreferences}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                            >
                                <Check className="w-3.5 h-3.5" /> Save Preferences
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                                >
                                    <ShieldCheck className="w-3.5 h-3.5" /> Accept All
                                </button>

                                <button
                                    onClick={handleEssentialOnly}
                                    className="bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs py-2.5 px-3.5 rounded-xl transition-all"
                                >
                                    Essential Only
                                </button>

                                <button
                                    onClick={() => setShowCustom(!showCustom)}
                                    className="p-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded-xl transition-all"
                                    title="Customize options"
                                >
                                    <Settings className="w-4 h-4" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
