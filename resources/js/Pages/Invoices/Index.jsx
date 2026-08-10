import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Receipt, Download, FileText, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export default function Index({ invoices = [] }) {
    return (
        <AppLayout
            header={
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                            <Receipt className="w-6 h-6 text-amber-400" />
                            Invoices & Billing History
                        </h1>
                        <p className="text-sm text-slate-400">View and download official VAT invoices for token top-ups and plan subscriptions</p>
                    </div>
                </div>
            }
        >
            <Head title="Invoices & Billing History | Zeltrionix" />

            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" /> Billing Transactions ({invoices.length})
                    </h3>
                </div>

                {invoices.length === 0 ? (
                    <div className="p-16 text-center text-slate-400">
                        <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto mb-4">
                            <Receipt className="w-8 h-8" />
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">No Invoices Found</h4>
                        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                            You haven't purchased any token packages or top-ups yet. Invoices are automatically generated when you top up your balance.
                        </p>
                        <Link
                            href={route('dashboard')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            Go to Dashboard & Top-Up <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {invoices.map((inv) => (
                            <div key={inv.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                                        <Receipt className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-bold text-white text-base">{inv.invoice_number}</span>
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3" /> PAID
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1">
                                            {inv.description} • {new Date(inv.paid_at || inv.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="text-lg font-black text-white">€{parseFloat(inv.amount).toFixed(2)}</span>
                                        <span className="text-xs text-slate-400 block font-semibold">EUR</span>
                                    </div>

                                    <Link
                                        href={route('invoices.show', inv.id)}
                                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
                                    >
                                        View & Print <ExternalLink className="w-4 h-4 text-blue-400" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
