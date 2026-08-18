import React from 'react';
import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Refund({ company }) {
    const companyName = company?.name || 'FERNBLAKE LIMITED';
    const billingEmail = company?.billing_email || company?.support_email || 'billing@zeltrionix.com';

    return (
        <LegalLayout
            title="Refund & Cancellation Policy"
            subtitle="Our 14-day money-back guarantee and subscription cancellation terms."
            company={company}
        >
            <Head title="Refund Policy | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. 14-Day Money-Back Guarantee</h3>
                <p>
                    We want you to be completely satisfied with <strong>{companyName}</strong>. If you subscribe to any of our paid monthly plans (Pro or Enterprise) and decide it's not the right fit, you may request a <strong>100% full refund within 14 days</strong> of your initial purchase.
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
                    To request a refund, simply send an email to <a href={`mailto:${billingEmail}`} className="text-blue-400 font-semibold underline">{billingEmail}</a> with your account email and invoice number. Our billing team will process your request within 1 to 3 business days.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">4. Cancellation Policy</h3>
                <p>
                    You can cancel your subscription at any time from your account dashboard. Upon cancellation, your service will remain active until the end of your current billing cycle.
                </p>
            </section>
        </LegalLayout>
    );
}
