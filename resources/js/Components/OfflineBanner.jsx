import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [showRestored, setShowRestored] = useState(false);

    useEffect(() => {
        const handleOffline = () => {
            setIsOffline(true);
            setShowRestored(false);
        };

        const handleOnline = () => {
            setIsOffline(false);
            setShowRestored(true);
            const timer = setTimeout(() => setShowRestored(false), 3500);
            return () => clearTimeout(timer);
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    return (
        <AnimatePresence>
            {isOffline && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%]"
                >
                    <div className="bg-rose-950/90 border border-rose-500/50 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl shadow-rose-900/40 text-rose-200 flex items-center justify-between gap-3 text-xs font-bold">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                                <WifiOff className="w-4 h-4 animate-pulse" />
                            </div>
                            <div>
                                <span className="text-white block font-extrabold">Network Connection Lost</span>
                                <span className="text-[11px] text-rose-300 font-normal">Offline mode active. Reconnecting...</span>
                            </div>
                        </div>
                        <RefreshCw className="w-4 h-4 text-rose-400 animate-spin flex-shrink-0" />
                    </div>
                </motion.div>
            )}

            {!isOffline && showRestored && (
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%]"
                >
                    <div className="bg-emerald-950/90 border border-emerald-500/50 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl shadow-emerald-900/40 text-emerald-200 flex items-center gap-3 text-xs font-bold">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Wifi className="w-4 h-4" />
                        </div>
                        <div>
                            <span className="text-white block font-extrabold">Connection Restored</span>
                            <span className="text-[11px] text-emerald-300 font-normal">Network is online & telemetry reconnected.</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
