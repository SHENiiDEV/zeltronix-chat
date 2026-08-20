<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Voltoria AI</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; padding:40px 10px;">
        <tr>
            <td align="center">
                <!-- Main Email Card -->
                <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#1e293b; border:1px solid #334155; border-radius:16px; overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 32px 24px 32px; background-color:#0f172a; border-bottom:1px solid #334155; text-align:center;">
                            <div style="font-size:24px; font-weight:900; color:#ffffff; tracking-tight: -0.5px;">VOLTORIA AI</div>
                            <div style="font-size:11px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-top:4px;">High-Ticket Business Plan Architect</div>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:32px; color:#e2e8f0; font-size:14px; line-height:1.6;">
                            <h1 style="font-size:20px; font-weight:800; color:#ffffff; margin:0 0 16px 0;">Dear {{ $user->name }},</h1>
                            
                            <p style="margin:0 0 20px 0; color:#cbd5e1;">
                                Welcome to <strong>Voltoria AI</strong>. Your enterprise account has been successfully provisioned. You now have full access to our autonomous AI support agents and high-ticket business planning infrastructure.
                            </p>

                            <!-- Feature Card Box -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #334155; border-radius:12px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <div style="font-size:12px; font-weight:800; color:#38bdf8; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Platform Core Capabilities</div>
                                        <ul style="margin:0; padding-left:18px; color:#94a3b8; font-size:13px; line-height:1.8;">
                                            <li><strong style="color:#ffffff;">6-Page Institutional Memorandum:</strong> Automated PDF export with financial metrics.</li>
                                            <li><strong style="color:#ffffff;">3-Year P&L Financial Forecasting:</strong> Unit Economics, EBITDA, & IRR modeling.</li>
                                            <li><strong style="color:#ffffff;">Zero Hallucination RAG Engine:</strong> Trained strictly on your documentation.</li>
                                        </ul>
                                    </td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/dashboard') }}" target="_blank" style="display:inline-block; background-color:#2563eb; color:#ffffff; font-size:14px; font-weight:800; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                                            Create Your First Business Plan Brief &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0; font-size:13px; color:#94a3b8;">
                                If you have any questions or need technical support, contact our compliance desk at <a href="mailto:{{ config('services.company.support_email', 'info@voltoria.co.uk') }}" style="color:#38bdf8; text-decoration:underline;">{{ config('services.company.support_email', 'info@voltoria.co.uk') }}</a>.
                            </p>
                        </td>
                    </tr>

                    <!-- Legal Footer -->
                    <tr>
                        <td style="padding:24px 32px; background-color:#0f172a; border-top:1px solid #334155; text-align:center; font-size:11px; color:#64748b; line-height:1.5;">
                            <strong style="color:#94a3b8;">{{ config('services.company.name', 'INCHWARD LIMITED') }}</strong> &bull; {{ config('services.company.registration_number', 'UK Co. No. 16021412') }}<br>
                            {{ config('services.company.address', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom') }}<br>
                            &copy; {{ date('Y') }} Voltoria AI. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
