<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Wallet Top-Up Receipt</title>
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
                <!-- Email Container -->
                <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#1e293b; border:1px solid #334155; border-radius:16px; overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding:32px 32px 20px 32px; background-color:#0f172a; border-bottom:1px solid #334155; text-align:center;">
                            <div style="font-size:24px; font-weight:900; color:#ffffff; tracking-tight:-0.5px;">VOLTORIA AI</div>
                            <div style="font-size:11px; color:#22c55e; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-top:4px;">&#10003; Wallet Top-Up Successful</div>
                        </td>
                    </tr>

                    <!-- Main Body -->
                    <tr>
                        <td style="padding:32px; color:#e2e8f0; font-size:14px; line-height:1.6;">
                            <p style="margin:0 0 16px 0; color:#cbd5e1;">Dear <strong>{{ $user->name }}</strong>,</p>

                            <p style="margin:0 0 24px 0; color:#94a3b8; font-size:13px;">
                                Your wallet top-up request has been processed successfully. An official B2B PDF invoice has been generated and attached to this email.
                            </p>

                            <!-- Big Amount Display Box -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #22c55e; border-radius:12px; margin-bottom:24px; text-align:center;">
                                <tr>
                                    <td style="padding:24px;">
                                        <div style="font-size:11px; font-weight:800; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">Total Amount Credited</div>
                                        <div style="font-size:36px; font-weight:900; color:#22c55e;">+{{ $currencySymbol }}{{ number_format($payment->amount, 2) }} {{ $payment->currency ?? 'EUR' }}</div>
                                        @if(($payment->tokens_credited ?? 0) > 0)
                                            <div style="font-size:12px; font-weight:700; color:#38bdf8; margin-top:6px;">+{{ number_format($payment->tokens_credited) }} AI Tokens Deposited</div>
                                        @endif
                                    </td>
                                </tr>
                            </table>

                            <!-- Transaction Details Table -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #334155; border-radius:12px; margin-bottom:24px;">
                                <tr>
                                    <td style="padding:16px 20px; border-bottom:1px solid #334155; color:#94a3b8; font-size:12px;">Invoice Reference:</td>
                                    <td style="padding:16px 20px; border-bottom:1px solid #334155; color:#ffffff; font-weight:800; font-family:monospace; font-size:13px; text-align:right;">{{ $ref }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:16px 20px; border-bottom:1px solid #334155; color:#94a3b8; font-size:12px;">Updated Available Balance:</td>
                                    <td style="padding:16px 20px; border-bottom:1px solid #334155; color:#38bdf8; font-weight:800; font-size:13px; text-align:right;">{{ number_format($user->token_balance) }} Tokens</td>
                                </tr>
                                <tr>
                                    <td style="padding:16px 20px; color:#94a3b8; font-size:12px;">Date &amp; Time:</td>
                                    <td style="padding:16px 20px; color:#ffffff; font-weight:600; font-size:12px; text-align:right;">{{ \Carbon\Carbon::parse($payment->paid_at ?? $payment->created_at)->format('Y-m-d H:i:s T') }}</td>
                                </tr>
                            </table>

                            <!-- CTA Button -->
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                                <tr>
                                    <td align="center">
                                        <a href="{{ url('/dashboard') }}" target="_blank" style="display:inline-block; background-color:#2563eb; color:#ffffff; font-size:14px; font-weight:800; text-decoration:none; padding:14px 28px; border-radius:10px; box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                                            Open Platform Dashboard &rarr;
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
