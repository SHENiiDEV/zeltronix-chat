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

class DocumentPaymentMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public Invoice $payment,
        public ?string $projectName = null
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
            subject: "Voltoria AI — Official Invoice & Business Plan Unlocked ({$currencySymbol}{$formattedAmount})",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.document_payment',
            with: [
                'user' => $this->user,
                'payment' => $this->payment,
                'projectName' => $this->projectName,
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
