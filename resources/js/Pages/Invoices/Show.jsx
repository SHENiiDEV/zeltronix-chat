import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ZeltrionixLogo from '@/Components/ZeltrionixLogo';
import { Printer, ArrowLeft, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Show({ invoice, customer, company }) {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-8 flex flex-col items-center">
            <Head title={`Invoice ${invoice.invoice_number} | Zeltrionix`} />

            {/* Print Controls (Hidden when printing) */}
            <div className="w-full max-w-3xl flex items-center justify-between mb-6 print:hidden">
                <Link
                    href={route('invoices.index')}
                    className="text-slate-400 hover:text-white text-sm font-semibold flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Invoices
                </Link>

                <button
                    onClick={handlePrint}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2"
                >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                </button>
            </div>

            {/* Printable Branded Invoice Card */}
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
                {/* Invoice Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 print:border-slate-300 pb-8 mb-8 gap-6">
                    <div>
                        <ZeltrionixLogo className="h-10 mb-3" />
                        <div className="text-xs text-slate-400 print:text-slate-600 space-y-1 mt-3">
                            <p className="font-bold text-slate-200 print:text-slate-900">{company?.name || 'Zeltrionix Inc.'}</p>
                            <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400 print:hidden" /> {company?.address || '100 Tech Plaza, San Francisco, CA 94107'}</p>
                            <p className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-blue-400 print:hidden" /> {company?.billing_email || 'billing@zeltrionix.com'}</p>
                            <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-400 print:hidden" /> {company?.phone || '+1 (800) 555-0199'}</p>
                        </div>
                    </div>

                    <div className="text-left sm:text-right">
                        <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black px-3.5 py-1 rounded-full uppercase mb-3 print:bg-emerald-100 print:text-emerald-800 print:border-emerald-300">
                            <CheckCircle2 className="w-4 h-4" /> INVOICE PAID
                        </div>
                        <h2 className="text-2xl font-black text-white print:text-slate-900 font-mono tracking-tight">{invoice.invoice_number}</h2>
                        <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                            Issued: {new Date(invoice.paid_at || invoice.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                </div>

                {/* Billed To Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 p-6 bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 rounded-2xl">
                    <div>
                        <span className="text-[11px] font-bold text-slate-400 print:text-slate-500 uppercase tracking-wider block mb-1">Billed To</span>
                        <h4 className="text-base font-bold text-white print:text-slate-900">{customer.name}</h4>
                        <p className="text-xs text-slate-300 print:text-slate-700 mt-0.5">{customer.email}</p>
                    </div>

                    <div>
                        <span className="text-[11px] font-bold text-slate-400 print:text-slate-500 uppercase tracking-wider block mb-1">Payment Details</span>
                        <p className="text-xs text-slate-300 print:text-slate-700">Payment Method: <strong>Instant Card / Token Top-Up</strong></p>
                        <p className="text-xs text-slate-300 print:text-slate-700 mt-0.5">Status: <strong className="text-emerald-400 print:text-emerald-700">Completed</strong></p>
                    </div>
                </div>

                {/* Line Items Table */}
                <div className="border border-slate-800 print:border-slate-300 rounded-2xl overflow-hidden mb-8">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-950 print:bg-slate-100 text-slate-400 print:text-slate-700 font-bold uppercase tracking-wider border-b border-slate-800 print:border-slate-300">
                            <tr>
                                <th className="p-4">Description</th>
                                <th className="p-4 text-center">Tokens Credited</th>
                                <th className="p-4 text-right">Amount (EUR)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 print:divide-slate-200 text-slate-200 print:text-slate-800">
                            <tr>
                                <td className="p-4 font-medium">
                                    <div className="font-bold text-white print:text-slate-900">{invoice.description}</div>
                                    <span className="text-[11px] text-slate-400 print:text-slate-500">Zeltrionix AI Infrastructure Token Deposit</span>
                                </td>
                                <td className="p-4 text-center font-mono font-bold text-blue-400 print:text-blue-700">
                                    +{Number(invoice.tokens_credited).toLocaleString()}
                                </td>
                                <td className="p-4 text-right font-black text-white print:text-slate-900 text-sm">
                                    €{parseFloat(invoice.amount).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Total Summary */}
                <div className="flex justify-end mb-8">
                    <div className="w-full sm:w-64 space-y-2 text-xs">
                        <div className="flex justify-between text-slate-400 print:text-slate-600">
                            <span>Subtotal:</span>
                            <span>€{parseFloat(invoice.amount).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400 print:text-slate-600">
                            <span>VAT (0% - Reverse Charge):</span>
                            <span>€0.00</span>
                        </div>
                        <div className="flex justify-between text-base font-black text-white print:text-slate-900 pt-2 border-t border-slate-800 print:border-slate-300">
                            <span>Total Paid:</span>
                            <span className="text-emerald-400 print:text-emerald-700">€{parseFloat(invoice.amount).toFixed(2)} EUR</span>
                        </div>
                    </div>
                </div>

                {/* Invoice Footer */}
                <div className="border-t border-slate-800 print:border-slate-300 pt-6 text-center text-xs text-slate-500 print:text-slate-600">
                    <p className="flex items-center justify-center gap-1.5 mb-1 font-semibold">
                        <ShieldCheck className="w-4 h-4 text-blue-400 print:hidden" /> Thank you for choosing {company?.name || 'Zeltrionix Inc.'}!
                    </p>
                    <p>If you have any questions regarding this invoice, please contact {company?.billing_email || 'billing@zeltrionix.com'}</p>
                </div>
            </div>
        </div>
    );
}
