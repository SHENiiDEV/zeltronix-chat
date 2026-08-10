import React from 'react';
import { Head } from '@inertiajs/react';
import LegalLayout from '@/Layouts/LegalLayout';

export default function Cookies({ company }) {
    const companyName = company?.name || 'Zeltrionix Inc.';

    return (
        <LegalLayout
            title="Cookie & Local Storage Policy"
            subtitle="Understanding how Zeltrionix uses cookies and browser storage for chat widget continuity."
            company={company}
        >
            <Head title="Cookie Policy | Zeltrionix" />

            <section className="space-y-4">
                <h3 className="text-lg font-bold text-white">1. What Are Cookies and Local Storage?</h3>
                <p>
                    Cookies and HTML5 Local Storage (`localStorage`) are small data files stored on your web browser to remember session states, user preferences, and maintain continuous service across web pages.
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
        </LegalLayout>
    );
}
