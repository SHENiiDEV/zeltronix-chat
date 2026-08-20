<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Business Plan & Document Payment Confirmation</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
    @php
        $currencySymbol = match($payment->currency ?? 'EUR') {
            'USD' => '$',
            'GBP' => '£',
            default => '€'
        };
        $ref = $payment->gateway_reference ?? ($payment->invoice_number ?? 'INV-'.$payment->id);
    @endphp

    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; padding:40px 10px;">
        <tr>
            <td align="center">
                <!-- Main Email Card -->
                <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#1e293b; border:1px solid #334155; border-radius:16px; overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 32px 20px 32px; background-color:#0f172a; border-bottom:1px solid #334155; text-align:center;">
                            <div style="font-size:24px; font-weight:900; color:#ffffff; tracking-tight:-0.5px;">VOLTORIA AI</div>
                            <div style="font-size:11px; color:#a855f7; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-top:4px;">&#10003; Business Plan Unlocked</div>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:32px; color:#e2e8f0; font-size:14px; line-height:1.6;">
                            <p style="margin:0 0 16px 0; color:#cbd5e1;">Dear <strong>{{ $user->name }}</strong>,</p>

                            <p style="margin:0 0 20px 0; color:#cbd5e1;">
                                Thank you for your payment. Your <strong>{{ $payment->service_name ?? ($payment->description ?? 'Pro Venture Institutional Memorandum') }}</strong> is unlocked and ready.
                            </p>

                            <!-- Document / Service Card -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #a855f7; border-radius:12px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:20px;">
                                        <div style="font-size:11px; font-weight:800; color:#a855f7; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Service Purchased</div>
                                        <div style="font-size:18px; font-weight:900; color:#ffffff;">{{ $payment->service_name ?? ($payment->description ?? 'Pro Venture Institutional Memorandum') }}</div>
                                        @if(!empty($projectName))
                                            <div style="font-size:12px; color:#38bdf8; margin-top:4px;"><strong>Project:</strong> {{ $projectName }}</div>
                                        @endif
                                    </td>
                                </tr>
                            </table>

                            <!-- Billing Table -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #334155; border-radius:12px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#94a3b8; font-size:12px;">Invoice Reference:</td>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#ffffff; font-weight:800; font-family:monospace; font-size:13px; text-align:right;">{{ $ref }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#94a3b8; font-size:12px;">Amount Debited:</td>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#22c55e; font-weight:800; font-size:13px; text-align:right;">{{ $currencySymbol }}{{ number_format($payment->amount, 2) }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 20px; color:#94a3b8; font-size:12px;">Remaining Balance:</td>
                                    <td style="padding:14px 20px; color:#38bdf8; font-weight:800; font-size:13px; text-align:right;">{{ number_format($user->token_balance) }} Tokens</td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/dashboard') }}" target="_blank" style="display:inline-block; background-color:#9333ea; color:#ffffff; font-size:14px; font-weight:800; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 12px rgba(147,51,234,0.3);">
                                            View &amp; Download 6-Page PDF &rarr;
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Legal Footer -->
                    <tr>
                        <td style="padding:24px 32px; background-color:#0f172a; border-top:1px solid #334155; text-align:center; font-size:11px; color:#64748b; line-height:1.5;">
                            <strong style="color:#94a3b8;">{{ config('services.company.name', 'INCHWARD LIMITED') }}</strong> &bull; {{ config('services.company.registration_number', 'UK Co. No. 16021412') }}<br>
                            {{ config('services.company.address', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom') }}<br>
                            Official Invoice PDF attached to this email. &copy; {{ date('Y') }} Voltoria AI.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
