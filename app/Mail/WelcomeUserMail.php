<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeUserMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public User $user)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to Voltoria AI — High-Ticket Business Plan Architect',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.welcome_user',
            with: [
                'user' => $this->user,
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
