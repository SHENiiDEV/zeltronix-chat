<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;

class TopUpController extends Controller
{
    /**
     * Top-up tokens for the user balance and generate branded invoice.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tokens' => 'required|integer|min:10000|max:500000000',
            'amount_euro' => 'nullable|numeric|min:0.01',
        ]);

        $tokens = (int) $validated['tokens'];
        $amountEuro = isset($validated['amount_euro']) 
            ? (float) $validated['amount_euro'] 
            : round(($tokens / 1000000) * 0.60, 2);

        $user = $request->user();
        $user->token_balance += $tokens;
        $user->save();

        $invoiceNumber = 'INV-' . date('Ymd') . '-' . sprintf('%04d', Invoice::count() + 1);

        $user->invoices()->create([
            'invoice_number' => $invoiceNumber,
            'description' => 'AI Token Top-Up Package (' . number_format($tokens) . ' Tokens)',
            'amount' => $amountEuro,
            'currency' => 'EUR',
            'tokens_credited' => $tokens,
            'status' => 'paid',
            'paid_at' => now(),
        ]);

        $formattedTokens = number_format($tokens);
        return back()->with('success', "Successfully added {$formattedTokens} AI tokens to your balance & created Invoice #{$invoiceNumber}!");
    }
}
