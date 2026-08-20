<?php

namespace App\Http\Controllers;

use App\Mail\WalletTopUpMail;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TopUpController extends Controller
{
    /**
     * Top-up tokens for the user balance with multi-currency support (€1.00 per 1,000 tokens base).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tokens' => 'required|integer|min:1000|max:100000000',
            'currency' => 'nullable|string|in:EUR,USD,GBP',
            'amount' => 'nullable|numeric|min:0.01',
        ]);

        $tokens = (int) $validated['tokens'];
        $currency = strtoupper($validated['currency'] ?? 'EUR');

        $rates = [
            'EUR' => 1.0,
            'USD' => 1.09,
            'GBP' => 0.86,
        ];
        $symbols = [
            'EUR' => '€',
            'USD' => '$',
            'GBP' => '£',
        ];

        $multiplier = $rates[$currency] ?? 1.0;
        $symbol = $symbols[$currency] ?? '€';

        // Base rate: 1,000 AI Tokens = €1.00 EUR
        $basePriceEur = ($tokens / 1000) * 1.00;
        $calculatedAmount = isset($validated['amount']) 
            ? (float) $validated['amount'] 
            : round($basePriceEur * $multiplier, 2);

        $user = $request->user();
        $user->token_balance += $tokens;
        $user->balance += $calculatedAmount;
        $user->save();

        $gatewayRef = 'TOPUP-' . date('Ymd') . '-' . strtoupper(substr(md5(uniqid()), 0, 6));
        $invoiceNumber = 'INV-' . date('Ymd') . '-' . sprintf('%04d', Invoice::count() + 1);
        $serviceName = 'AI Token Top-Up Package (' . number_format($tokens) . ' Tokens)';

        $invoice = $user->invoices()->create([
            'invoice_number' => $invoiceNumber,
            'gateway_reference' => $gatewayRef,
            'type' => 'topup',
            'service_name' => $serviceName,
            'description' => $serviceName,
            'amount' => $calculatedAmount,
            'currency' => $currency,
            'tokens_credited' => $tokens,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        // Send Wallet Top-Up Confirmation Email with attached PDF Invoice
        try {
            Mail::to($user->email)->send(new WalletTopUpMail($user, $invoice));
        } catch (\Throwable $e) {
            Log::error('Wallet top-up email dispatch failed: ' . $e->getMessage());
        }

        $formattedTokens = number_format($tokens);
        return back()->with('success', "Added {$formattedTokens} AI tokens to your balance ({$symbol}{$calculatedAmount} {$currency}) & issued Invoice #{$gatewayRef}!");
    }
}
