import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    HelpCircle, Mail, Receipt, Building2, ChevronDown, ShieldCheck, 
    FileText, Lock, ArrowRight, Wallet, CheckCircle2 
} from 'lucide-react';

const FAQS = [
    {
        q: 'What is included in Voltoria AI sourcing packages?',
        a: 'Our packages (Starter €149, Pro €499, Enterprise €1,499) credit your digital wallet with AI infrastructure capacity. Pro packages include 6-page institutional investment dossiers, bilingual English/Chinese factory negotiation scripts, sea freight tariff calculations, and direct Shenzhen OEM supplier matches.'
    },
    {
        q: 'How does the 14-day money-back guarantee work?',
        a: 'All digital wallet deposits are backed by a 14-day money-back refund policy provided less than 10% of your purchased token quota has been consumed. Contact info@voltoria.co.uk to request a prompt refund.'
    },
    {
        q: 'How is VAT handled for B2B invoices?',
        a: 'Invoices issued by INCHWARD LIMITED (UK Co. No. 16021412) are processed under UK B2B rules and International Reverse Charge regulations (0% VAT). Official B2B PDF tax receipts stamped PAID & VERIFIED are automatically generated and attached to all top-up receipts.'
    },
    {
        q: 'Who owns the Intellectual Property (IP) of generated dossiers?',
        a: 'You retain 100% intellectual property ownership of all uploaded documentation, project briefs, and generated dossiers. Voltoria AI operates under a zero public foundation model training pledge.'
    },
    {
        q: 'How can I download official PDF invoices for my accounting team?',
        a: 'Navigate to Invoices & Billing (/invoices) in your dashboard or click the "Invoice (PDF)" download link next to any top-up transaction. PDFs are formatted to standard A4 UK tax standards.'
    }
];

export default function Support({ company }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFaq = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <GuestLayout>
            <Head title="Support & Help Desk — FAQ & Invoicing Assistance | Voltoria AI" />

            <div className="relative min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-purple-600/20 via-blue-600/20 to-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 space-y-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-extrabold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-md">
                            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                            HELP CENTER & EXECUTIVE DISPATCH
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                            Support & Help Desk
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Everything you need to know about our OEM factory vector engine, B2B invoicing, and wallet refund policies.
                        </p>
                    </div>

                    {/* Support Channels Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Channel 1: Email */}
                        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between hover:border-blue-500/50 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Executive Email Support</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                    Direct line to our compliance and trade support desk for complex sourcing inquiries.
                                </p>
                            </div>
                            <a
                                href={`mailto:${company?.support_email || 'info@voltoria.co.uk'}`}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                Send Direct Email <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* Channel 2: B2B Invoices */}
                        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between hover:border-amber-500/50 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">B2B Invoices & Wallet</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                    View billing transactions, manage wallet deposits, and download PDF tax receipts.
                                </p>
                            </div>
                            <Link
                                href={route('invoices.index')}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 px-4 rounded-xl text-center border border-slate-700 transition-all flex items-center justify-center gap-2"
                            >
                                Open Invoices Portal <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Channel 3: Corporate Inquiries */}
                        <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col justify-between hover:border-purple-500/50 transition-all">
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Corporate Inquiries</h3>
                                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                                    Initiate formal trade desk support tickets with SLA response guaranteed within 24-48 hours.
                                </p>
                            </div>
                            <Link
                                href={route('contact')}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3 px-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                            >
                                Open Ticket Form <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Interactive FAQ Accordion */}
                    <div className="max-w-4xl mx-auto bg-slate-900/90 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-black text-white mb-2">Frequently Asked Questions</h2>
                            <p className="text-xs text-slate-400">Click any question below to expand detailed compliance information.</p>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, idx) => (
                                <div key={idx} className="border border-slate-800/90 rounded-2xl overflow-hidden bg-slate-950/60">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-blue-400 transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-blue-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {openIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden border-t border-slate-800/80 bg-slate-900/40 p-5 text-xs text-slate-300 leading-relaxed"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
