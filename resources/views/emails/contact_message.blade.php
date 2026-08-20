<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Support Ticket Message</title>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; padding:40px 10px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#1e293b; border:1px solid #334155; border-radius:16px; overflow:hidden;">
                    
                    <!-- Header -->
                    <tr>
                        <td style="padding:28px 32px; background-color:#0f172a; border-bottom:1px solid #334155; text-align:center;">
                            <div style="font-size:22px; font-weight:900; color:#ffffff;">VOLTORIA AI</div>
                            <div style="font-size:11px; color:#38bdf8; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-top:4px;">New Executive Support Ticket Received</div>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:32px; color:#e2e8f0; font-size:14px; line-height:1.6;">
                            <h2 style="font-size:18px; font-weight:800; color:#ffffff; margin:0 0 16px 0;">Ticket Subject: {{ $subjectText }}</h2>
                            
                            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0f172a; border:1px solid #334155; border-radius:12px; margin-bottom:20px;">
                                <tr>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#94a3b8; font-size:12px;">Sender Name:</td>
                                    <td style="padding:14px 20px; border-bottom:1px solid #334155; color:#ffffff; font-weight:700; font-size:13px;">{{ $name }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 20px; color:#94a3b8; font-size:12px;">Sender Email:</td>
                                    <td style="padding:14px 20px; color:#38bdf8; font-weight:700; font-size:13px;"><a href="mailto:{{ $email }}" style="color:#38bdf8; text-decoration:underline;">{{ $email }}</a></td>
                                </tr>
                            </table>

                            <div style="font-size:12px; font-weight:800; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">Message Content:</div>
                            <div style="background-color:#0f172a; border:1px solid #334155; border-radius:12px; padding:16px; color:#f1f5f9; font-size:13px; white-space:pre-wrap;">{{ $messageText }}</div>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:20px 32px; background-color:#0f172a; border-top:1px solid #334155; text-align:center; font-size:11px; color:#64748b;">
                            SLA Target: &lt; 4 Business Hours Response &bull; {{ config('services.company.name', 'INCHWARD LIMITED') }}
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
