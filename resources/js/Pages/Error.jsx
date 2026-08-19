import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { ShieldAlert, ArrowLeft, RefreshCw, Moon, Lock, AlertTriangle, Wrench } from 'lucide-react';

export default function Error({ status = 404, message }) {
    const errorConfigs = {
        404: {
            code: '404',
            tag: 'Lost in the Night Routine',
            title: 'Page Not Found',
            description: message || 'The requested page has been moved, renamed, or is currently sleeping in the dark.',
            icon: Moon,
            color: 'from-blue-500 to-purple-600',
            borderColor: 'border-blue-500/30',
        },
        500: {
            code: '500',
            tag: 'Temporary Clinical Rest',
            title: 'Server Failure',
            description: message || 'An unexpected server exception occurred. Our automated telemetry is repairing the system.',
            icon: AlertTriangle,
            color: 'from-rose-500 to-amber-600',
            borderColor: 'border-rose-500/30',
        },
        403: {
            code: '403',
            tag: 'Restricted Medical Section',
            title: 'Access Restricted',
            description: message || 'You do not have permission or security clearance to access this protected resource.',
            icon: Lock,
            color: 'from-amber-500 to-rose-600',
            borderColor: 'border-amber-500/30',
        },
        503: {
            code: '503',
            tag: 'Scheduled System Care',
            title: 'Under Maintenance',
            description: message || 'We are performing essential system care and updates. Please check back in a few minutes.',
            icon: Wrench,
            color: 'from-cyan-500 to-blue-600',
            borderColor: 'border-cyan-500/30',
        },
    };

    const config = errorConfigs[status] || errorConfigs[404];
    const IconComponent = config.icon;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-blue-500 selection:text-white">
            <Head title={`${config.code} - ${config.title} | FERNBLAKE LIMITED`} />

            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/15 via-purple-600/15 to-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="max-w-md w-full text-center relative z-10">
                {/* Logo */}
                <Link href="/" className="inline-block mb-8 hover:opacity-90 transition-opacity">
                    <ZeltrionixLogo className="h-10 mx-auto" />
                </Link>

                {/* Error Card */}
                <div className={`bg-slate-900/90 border ${config.borderColor} backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6`}>
                    <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto shadow-inner">
                        <IconComponent className="w-8 h-8 text-blue-400" />
                    </div>

                    <div>
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-extrabold uppercase tracking-widest mb-3">
                            {config.tag}
                        </span>
                        <h1 className="text-5xl font-black text-white tracking-tight mb-2 font-mono">
                            {config.code}
                        </h1>
                        <h2 className="text-xl font-bold text-slate-200 mb-3">
                            {config.title}
                        </h2>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            {config.description}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href="/"
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" /> Return to Safety
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full sm:w-auto bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-4 h-4" /> Retry
                        </button>
                    </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-8">
                    FERNBLAKE LIMITED • Official Telemetry & System Status
                </p>
            </div>
        </div>
    );
}
