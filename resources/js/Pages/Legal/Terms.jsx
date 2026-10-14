import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Terms({ company }) {
    const { company: pageCompany } = usePage().props;
    const currentCompany = company || pageCompany;
    const companyName = currentCompany?.name || import.meta.env.VITE_COMPANY_NAME || 'INCHWARD LIMITED';
    const companyRegNumber = currentCompany?.registration_number || currentCompany?.reg_number || import.meta.env.VITE_COMPANY_REG_NUMBER || 'UK Co. No. 16021412';
    const companyAddress = currentCompany?.address || import.meta.env.VITE_COMPANY_ADDRESS || 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom';
    const companyEmail = currentCompany?.email || currentCompany?.support_email || import.meta.env.VITE_COMPANY_EMAIL || 'info@voltoria.co.uk';

    return (
        <LegalLayout
            title="Terms of Service & Conditions"
            subtitle="Please read these terms carefully before using Zeltrionix AI Widget platform services."
            company={currentCompany}
        >
            <Head title="Terms of Service | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. Acceptance of Terms</h3>
                <p>
                    By creating an account, accessing, or using the <strong>{companyName}</strong> (Registration No: {companyRegNumber}) AI Customer Support Widget platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
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
                <h3 className="text-lg font-bold text-white">6. Operator Information & Legal Notice</h3>
                <p>
                    This service is owned and operated by <strong>{companyName}</strong>, registered under company registration number <strong>{companyRegNumber}</strong>.
                </p>
                <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl text-xs space-y-1.5 text-slate-300">
                    <div><strong className="text-white">Corporate Entity:</strong> {companyName}</div>
                    <div><strong className="text-white">Company Registration:</strong> {companyRegNumber}</div>
                    <div><strong className="text-white">Registered Address:</strong> {companyAddress}</div>
                    <div><strong className="text-white">Official Contact Email:</strong> <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a></div>
                </div>
                <p>
                    If you have any questions regarding these Terms or our services, please contact our legal team at <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a>.
                </p>
            </section>
        </LegalLayout>
    );
}

