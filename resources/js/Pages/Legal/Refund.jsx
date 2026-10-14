import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Refund({ company }) {
    const { company: pageCompany } = usePage().props;
    const currentCompany = company || pageCompany;
    const companyName = currentCompany?.name || import.meta.env.VITE_COMPANY_NAME || 'INCHWARD LIMITED';
    const companyRegNumber = currentCompany?.registration_number || currentCompany?.reg_number || import.meta.env.VITE_COMPANY_REG_NUMBER || 'UK Co. No. 16021412';
    const companyAddress = currentCompany?.address || import.meta.env.VITE_COMPANY_ADDRESS || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom';
    const companyEmail = currentCompany?.email || currentCompany?.billing_email || currentCompany?.support_email || import.meta.env.VITE_COMPANY_EMAIL || 'info@voltoria.co.uk';

    return (
        <LegalLayout
            title="Refund & Cancellation Policy"
            subtitle="Our 14-day money-back guarantee and subscription cancellation terms."
            company={currentCompany}
        >
            <Head title="Refund Policy | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. 14-Day Money-Back Guarantee</h3>
                <p>
                    We want you to be completely satisfied with <strong>{companyName}</strong> (Registration No: {companyRegNumber}). If you subscribe to any of our paid monthly plans (Pro or Enterprise) and decide it's not the right fit, you may request a <strong>100% full refund within 14 days</strong> of your initial purchase.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">2. Token Top-Up Packages</h3>
                <p>
                    Unused AI token top-up packages are eligible for a full refund within 14 days of purchase, provided that less than 10% of the purchased token balance has been consumed by AI model queries.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">3. How to Request a Refund</h3>
                <p>
                    To request a refund, simply send an email to <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a> with your account email and invoice number, or reach us at our registered address: {companyAddress}. Our billing team will process your request within 1 to 3 business days.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">4. Cancellation Policy</h3>
                <p>
                    You can cancel your subscription at any time from your account dashboard. Upon cancellation, your service will remain active until the end of your current billing cycle.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">5. Merchant of Record Information</h3>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-xs space-y-1.5 text-slate-300">
                    <div><strong className="text-white">Merchant of Record:</strong> {companyName}</div>
                    <div><strong className="text-white">Registration Number:</strong> {companyRegNumber}</div>
                    <div><strong className="text-white">Registered Address:</strong> {companyAddress}</div>
                    <div><strong className="text-white">Billing & Inquiries:</strong> <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a></div>
                </div>
            </section>
        </LegalLayout>
    );
}

