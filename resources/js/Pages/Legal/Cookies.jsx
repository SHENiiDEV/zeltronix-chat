import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Cookies({ company }) {
    const { company: pageCompany } = usePage().props;
    const currentCompany = company || pageCompany;
    const companyName = currentCompany?.name || import.meta.env.VITE_COMPANY_NAME || 'FERNBLAKE LIMITED';
    const companyRegNumber = currentCompany?.registration_number || currentCompany?.reg_number || import.meta.env.VITE_COMPANY_REG_NUMBER || '16020960';
    const companyAddress = currentCompany?.address || import.meta.env.VITE_COMPANY_ADDRESS || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, United Kingdom, CF31 1JF';
    const companyEmail = currentCompany?.email || currentCompany?.support_email || import.meta.env.VITE_COMPANY_EMAIL || 'info@zeltrionix.co.uk';

    return (
        <LegalLayout
            title="Cookie & Local Storage Policy"
            subtitle="Understanding how Zeltrionix uses cookies and browser storage for chat widget continuity."
            company={currentCompany}
        >
            <Head title="Cookie Policy | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. What Are Cookies and Local Storage?</h3>
                <p>
                    This Cookie & Storage Policy explains how <strong>{companyName}</strong> (Registration No: {companyRegNumber}) uses cookies and HTML5 Local Storage (`localStorage`) across our services to remember session states, user preferences, and maintain continuous service across web pages.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">2. How Zeltrionix Uses Storage</h3>
                <div className="space-y-3">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                        <h4 className="font-bold text-white mb-1">Essential Session Cookies</h4>
                        <p className="text-xs text-slate-400">Used for user authentication and CSRF security protection in the dashboard.</p>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl">
                        <h4 className="font-bold text-white mb-1">Widget Session Token (`zeltronix_session_*`)</h4>
                        <p className="text-xs text-slate-400">
                            Stored in your browser's `localStorage` when chatting with an embedded AI widget. This allows your chat transcript to persist when navigating between pages or refreshing your browser.
                        </p>
                    </div>
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">3. Managing & Disabling Cookies</h3>
                <p>
                    You can manage or disable cookies directly in your browser settings. Note that clearing your browser's `localStorage` will reset ongoing AI widget chat conversations.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">4. Questions & Contact</h3>
                <p>
                    If you have questions about our cookie practices or data storage, please contact <strong>{companyName}</strong> at <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a> or write to our registered office: {companyAddress}.
                </p>
            </section>
        </LegalLayout>
    );
}

