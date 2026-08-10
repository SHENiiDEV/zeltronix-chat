import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { Lock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password | Zeltrionix" />

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
                        <h2 className="text-2xl font-black text-white tracking-tight">Security Confirmation</h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                            This is a secure area of the application. Please confirm your password before continuing.
                        </p>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-blue-500/10">
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoFocus
                                        required
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-rose-400 font-medium">{errors.password}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <ShieldCheck className="w-4 h-4" /> Confirm & Proceed
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
