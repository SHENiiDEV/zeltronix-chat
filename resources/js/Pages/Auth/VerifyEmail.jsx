import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { MailCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification | Zeltrionix" />

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
                        <h2 className="text-2xl font-black text-white tracking-tight">Verify Your Email</h2>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            Thanks for signing up! Before getting started, please verify your email address by clicking on the link we just emailed to you.
                        </p>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-800/90 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl shadow-blue-500/10">
                        {status === 'verification-link-sent' && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                                A new verification link has been sent to the email address you provided during registration.
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                <MailCheck className="w-4 h-4" /> Resend Verification Email
                            </button>

                            <div className="flex items-center justify-between pt-4 text-xs font-semibold">
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-slate-400 hover:text-white underline"
                                >
                                    Sign Out
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </GuestLayout>
    );
}
