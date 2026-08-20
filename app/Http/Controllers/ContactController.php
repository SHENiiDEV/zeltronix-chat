<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessageMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display the contact page with dynamic corporate details.
     */
    public function index()
    {
        return Inertia::render('Contact', [
            'company' => config('services.company'),
        ]);
    }

    /**
     * Process support ticket form submission.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:5000',
        ]);

        $recipient = config('services.company.support_email', 'info@voltoria.co.uk');

        try {
            Mail::to($recipient)->send(new ContactMessageMail(
                $validated['name'],
                $validated['email'],
                $validated['subject'],
                $validated['message']
            ));
        } catch (\Throwable $e) {
            Log::error('Contact ticket email dispatch failed: ' . $e->getMessage());
        }

        return back()->with('success', 'Your support ticket has been submitted successfully! Our trade desk SLA target is 24-48 business hours.');
    }
}
