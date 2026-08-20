<?php

namespace App\Mail;

use App\Models\Invoice;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WalletTopUpMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Invoice $payment
    ) {
    }

    public function envelope(): Envelope
    {
        $currencySymbol = match($this->payment->currency ?? 'EUR') {
            'USD' => '$',
            'GBP' => '£',
            default => '€'
        };
        $formattedAmount = number_format($this->payment->amount, 2);

        return new Envelope(
            subject: "Voltoria AI — Wallet Top-Up Receipt ({$currencySymbol}{$formattedAmount})",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.wallet_topup',
            with: [
                'user' => $this->user,
                'payment' => $this->payment,
            ],
        );
    }

    public function attachments(): array
    {
        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $this->payment,
            'user' => $this->user,
        ]);

        $invoiceRef = $this->payment->gateway_reference
            ?: ($this->payment->invoice_number ?: ('INV-' . $this->payment->id));

        return [
            Attachment::fromData(fn () => $pdf->output(), "Invoice_{$invoiceRef}.pdf")
                ->withMime('application/pdf'),
        ];
    }
}
