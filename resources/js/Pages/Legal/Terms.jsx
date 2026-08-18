import React from 'react';
import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Terms({ company }) {
    const companyName = company?.name || 'FERNBLAKE LIMITED';
    const companyEmail = company?.support_email || 'support@zeltrionix.com';

    return (
        <LegalLayout
            title="Terms of Service & Conditions"
            subtitle="Please read these terms carefully before using Zeltrionix AI Widget platform services."
            company={company}
        >
            <Head title="Terms of Service | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. Acceptance of Terms</h3>
                <p>
                    By creating an account, accessing, or using the <strong>{companyName}</strong> AI Customer Support Widget platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">2. Description of Service</h3>
                <p>
                    {companyName} provides automated AI-powered support widgets for websites. Our platform enables users to upload documentation (PDF, DOCX, TXT, CSV), build custom vector knowledge bases using Retrieval-Augmented Generation (RAG), and embed interactive AI chat widgets on client websites.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">3. Token Usage & Subscriptions</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                    <li><strong>Free Trial:</strong> New registered users receive a complimentary 10,000 AI token balance to test the platform capabilities.</li>
                    <li><strong>AI Token Top-Ups:</strong> Tokens can be purchased in packages (e.g. €0.60 per 1,000,000 tokens). Purchased tokens do not expire as long as your account remains active.</li>
                    <li><strong>Strict Anti-Hallucination Policy:</strong> Our AI agents are programmed to answer strictly from uploaded documents and will direct users to human support when information is absent.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">4. User Content & Knowledge Base Documents</h3>
                <p>
                    You retain full ownership of all documents, text, and knowledge base data uploaded to {companyName}. You represent and warrant that you have all necessary rights to upload and process such content on our platform.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">5. Service Availability & Limitations</h3>
                <p>
                    While we strive for 99.9% platform uptime, {companyName} is provided on an "as is" and "as available" basis. We reserve the right to suspend or terminate accounts that violate our usage policies or attempt malicious vector injection.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">6. Contact Information</h3>
                <p>
                    If you have any questions regarding these Terms, please contact our legal team at <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a>.
                </p>
            </section>
        </LegalLayout>
    );
}
