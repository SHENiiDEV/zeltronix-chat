import React from 'react';
import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Privacy({ company }) {
    const companyName = company?.name || 'INCHWARD LIMITED';
    const companyEmail = company?.support_email || 'info@voltoria.co.uk';

    return (
        <LegalLayout
            title="Privacy Policy & Data Security"
            subtitle="How Zeltrionix AI protects your data, knowledge base documents, and customer privacy."
            company={company}
        >
            <Head title="Privacy Policy | Zeltrionix AI" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. Data Protection Commitment</h3>
                <p>
                    At <strong>{companyName}</strong>, data privacy and security are fundamental principles. This Privacy Policy explains how we collect, use, store, and safeguard information when you use our AI customer support widget platform.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">2. Information We Collect</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-300">
                    <li><strong>Account Information:</strong> Name, email address, and encrypted authentication credentials.</li>
                    <li><strong>Knowledge Base Content:</strong> PDF, DOCX, TXT, and CSV documents uploaded to train your AI agents.</li>
                    <li><strong>Widget Interaction Data:</strong> End-user chat transcripts, IP addresses, and user-agent metadata required for conversation context.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">3. Zero Model Training Pledge</h3>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-300 font-semibold text-xs">
                    🔒 <strong>Strict Guarantee:</strong> Your uploaded business documents and customer chat logs are NEVER used to train public foundation AI models. Your vector data is strictly isolated within your private account space.
                </div>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">4. GDPR & Data Subject Rights</h3>
                <p>
                    Under the General Data Protection Regulation (GDPR), users and visitors have the right to request access to, correction of, or deletion of their personal data. To exercise these rights, please contact our Data Protection Officer at <a href={`mailto:${companyEmail}`} className="text-blue-400 font-semibold underline">{companyEmail}</a>.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">5. Security Measures</h3>
                <p>
                    We employ industry-standard AES-256 encryption in transit (HTTPS/TLS) and at rest, along with secure vector indexing and automated token expiration controls.
                </p>
            </section>
        </LegalLayout>
    );
}
