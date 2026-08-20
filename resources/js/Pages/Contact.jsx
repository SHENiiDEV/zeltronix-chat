import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import { motion } from 'framer-motion';
import { 
    Mail, MapPin, Building2, Clock, Send, ShieldCheck, CheckCircle2, MessageSquare, Phone 
} from 'lucide-react';

export default function Contact({ company }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact Support & Executive Trade Desk | Voltoria AI" />

            <div className="relative min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10 space-y-12">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-extrabold tracking-widest uppercase mb-4 shadow-lg backdrop-blur-md">
                            <Clock className="w-3.5 h-3.5 text-blue-400" />
                            SLA TARGET: &lt; 4 BUSINESS HOURS RESPONSE
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                            Executive Trade Desk & Support
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Have questions regarding factory discovery, custom B2B invoices, or digital wallet deposits? Our trade desk team is ready to assist.
                        </p>
                    </div>

                    {/* Success Flash Banner */}
                    {flash?.success && (
                        <div className="max-w-3xl mx-auto bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs font-bold flex items-center gap-3 shadow-xl">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                        {/* Left Column: Corporate Information */}
                        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">Corporate Details</h3>
                                <p className="text-xs text-slate-400">Official Merchant of Record Details</p>
                            </div>

                            <div className="space-y-4 text-xs">
                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
                                    <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Company Name & Registration</span>
                                        <h4 className="font-bold text-white text-sm mt-0.5">{company?.name || 'INCHWARD LIMITED'}</h4>
                                        <p className="text-slate-400 mt-0.5">{company?.registration_number || 'UK Co. No. 16021412'}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Registered Address</span>
                                        <p className="text-slate-300 font-medium leading-relaxed mt-0.5">
                                            {company?.address || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom'}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Official Email</span>
                                        <a href={`mailto:${company?.support_email || 'info@voltoria.co.uk'}`} className="font-bold text-blue-400 hover:underline text-sm block mt-0.5">
                                            {company?.support_email || 'info@voltoria.co.uk'}
                                        </a>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-300 text-xs">
                                    <div className="font-bold text-white mb-1 flex items-center gap-1.5">
                                        <ShieldCheck className="w-4 h-4 text-blue-400" /> Guaranteed SLA Standard
                                    </div>
                                    <p className="text-[11px] text-slate-300 leading-relaxed">
                                        All support inquiries are logged and addressed by dedicated trade officers within 4 business hours.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Support Ticket Form */}
                        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-2xl">
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-400" /> Send Support Ticket
                            </h3>
                            <p className="text-xs text-slate-400 mb-6">Fill out the form below to initiate a ticket with our trade desk.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Your Full Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            placeholder="Alex Rivera"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                            Work Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            placeholder="alex@company.com"
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Ticket Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        required
                                        placeholder="Inquiry regarding Shenzhen Factory Dossiers & Invoicing"
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    {errors.subject && <p className="mt-1 text-xs text-rose-400">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                                        Message Details
                                    </label>
                                    <textarea
                                        rows={5}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        required
                                        placeholder="Describe your inquiry or sourcing requirements in detail..."
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                                    />
                                    {errors.message && <p className="mt-1 text-xs text-rose-400">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                                >
                                    Submit Ticket <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
