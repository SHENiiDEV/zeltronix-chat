import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password | Zeltrionix" />

            <div className="relative min-h-[calc(100vh-160px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[130px] rounded-full pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-3">
                            <ZeltrionixLogo className="h-10" />
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight">Forgot Password?</h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            No problem. Enter your email address and we'll send you a password reset link.
                        </p>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-blue-500/10">
                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoFocus
                                        required
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@company.com"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                                {errors.email && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                Send Password Reset Link <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href={route('login')} className="text-xs text-slate-400 hover:text-white font-semibold flex items-center justify-center gap-1">
                                <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
