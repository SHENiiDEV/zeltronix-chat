<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $payment->gateway_reference ?? $payment->invoice_number }}</title>
    <style>
        @page {
            margin: 40px 45px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 11px;
            color: #1e293b;
            line-height: 1.4;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .header-table td {
            vertical-align: top;
        }
        .brand-title {
            font-size: 22px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            margin: 0 0 4px 0;
        }
        .brand-subtitle {
            font-size: 10px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0;
        }
        .badge-paid {
            display: inline-block;
            background-color: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 12px;
            letter-spacing: 0.5px;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 900;
            color: #0f172a;
            margin: 8px 0 2px 0;
            font-family: monospace;
        }
        .invoice-date {
            font-size: 10px;
            color: #64748b;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
        }
        .info-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 15px;
            vertical-align: top;
            width: 48%;
        }
        .box-title {
            font-size: 9px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
        }
        .box-name {
            font-size: 12px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 3px;
        }
        .box-text {
            font-size: 10px;
            color: #334155;
            margin: 2px 0;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 11px;
        }
        .items-table tr:nth-child(even) {
            background-color: #f8fafc;
        }
        .summary-table {
            width: 260px;
            margin-left: auto;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .summary-table td {
            padding: 5px 0;
            font-size: 11px;
        }
        .summary-table .label {
            color: #64748b;
        }
        .summary-table .value {
            text-align: right;
            font-weight: 600;
            color: #0f172a;
        }
        .summary-table .total-row td {
            border-top: 2px solid #0f172a;
            padding-top: 8px;
            font-size: 14px;
            font-weight: 800;
            color: #15803d;
        }
        .footer-disclaimer {
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 9px;
            color: #64748b;
            text-align: center;
            line-height: 1.5;
        }
    </style>
</head>
<body>
    @php
        $currencySymbol = match($payment->currency ?? 'EUR') {
            'USD' => '$',
            'GBP' => '£',
            default => '€'
        };
        $merchantName = config('services.company.name', 'INCHWARD LIMITED');
        $merchantReg = config('services.company.registration_number', 'UK Co. No. 16021412');
        $merchantAddress = config('services.company.address', 'Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, CF31 1JF, United Kingdom');
        $merchantEmail = config('services.company.support_email', 'info@voltoria.co.uk');
        $ref = $payment->gateway_reference ?? ($payment->invoice_number ?? 'INV-'.$payment->id);
    @endphp

    <!-- Header Section -->
    <table class="header-table">
        <tr>
            <td>
                <div class="brand-title">VOLTORIA AI</div>
                <div class="brand-subtitle">Autonomous AI Support & Business Planning Infrastructure</div>
            </td>
            <td style="text-align: right;">
                <div class="badge-paid">&#10003; PAID & VERIFIED</div>
                <div class="invoice-title">{{ $ref }}</div>
                <div class="invoice-date">Issued: {{ \Carbon\Carbon::parse($payment->paid_at ?? $payment->created_at)->format('F d, Y') }}</div>
            </td>
        </tr>
    </table>

    <!-- Info Section: Issuer & Client -->
    <table class="info-table">
        <tr>
            <td class="info-box">
                <div class="box-title">Merchant of Record (Issuer)</div>
                <div class="box-name">{{ $merchantName }}</div>
                <div class="box-text"><strong>Registration:</strong> {{ $merchantReg }}</div>
                <div class="box-text"><strong>Address:</strong> {{ $merchantAddress }}</div>
                <div class="box-text"><strong>Email:</strong> {{ $merchantEmail }}</div>
            </td>
            <td style="width: 4%;"></td>
            <td class="info-box">
                <div class="box-title">Billed To (Client)</div>
                <div class="box-name">{{ $user->name }} {{ $user->surname ?? '' }}</div>
                <div class="box-text"><strong>Email:</strong> {{ $user->email }}</div>
                @if(!empty($user->phone))
                    <div class="box-text"><strong>Phone:</strong> {{ $user->phone }}</div>
                @endif
                @if(!empty($user->address_street))
                    <div class="box-text"><strong>Address:</strong> {{ $user->address_street }}, {{ $user->address_city }}, {{ $user->address_country }} {{ $user->address_postcode }}</div>
                @endif
                <div class="box-text"><strong>Payment Method:</strong> Instant Token Deposit / Card</div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 60%;">Description / Service Item</th>
                <th style="text-align: center; width: 10%;">Qty</th>
                <th style="text-align: right; width: 15%;">Unit Price</th>
                <th style="text-align: right; width: 15%;">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong style="color: #0f172a; font-size: 12px;">{{ $payment->service_name ?? ($payment->description ?? 'AI Platform Token Deposit') }}</strong>
                    <div style="font-size: 9px; color: #64748b; margin-top: 2px;">
                        @if(($payment->tokens_credited ?? 0) > 0)
                            Quota Credited: +{{ number_format($payment->tokens_credited) }} AI Tokens
                        @else
                            Automated High-Ticket Business Plan & Document Generation
                        @endif
                    </div>
                </td>
                <td style="text-align: center; font-weight: bold;">1</td>
                <td style="text-align: right;">{{ $currencySymbol }}{{ number_format($payment->amount, 2) }}</td>
                <td style="text-align: right; font-weight: bold;">{{ $currencySymbol }}{{ number_format($payment->amount, 2) }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Total Summary Table -->
    <table class="summary-table">
        <tr>
            <td class="label">Subtotal:</td>
            <td class="value">{{ $currencySymbol }}{{ number_format($payment->amount, 2) }}</td>
        </tr>
        <tr>
            <td class="label">VAT / Tax (0% UK B2B / Reverse Charge):</td>
            <td class="value">{{ $currencySymbol }}0.00</td>
        </tr>
        <tr class="total-row">
            <td class="label" style="color: #0f172a;">Total Paid:</td>
            <td class="value">{{ $currencySymbol }}{{ number_format($payment->amount, 2) }} {{ $payment->currency ?? 'EUR' }}</td>
        </tr>
    </table>

    <!-- Legal Disclaimer Footer -->
    <div class="footer-disclaimer">
        <strong>Official B2B Receipt & Tax Invoice • Issued by {{ $merchantName }} ({{ $merchantReg }})</strong><br>
        Registered in England & Wales • All services are subject to our 14-day refund policy for unused token balances.<br>
        Thank you for choosing Voltoria AI for your business infrastructure.
    </div>
</body>
</html>
