<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * Display a listing of user invoices.
     */
    public function index(Request $request): Response
    {
        $invoices = $request->user()->invoices()
            ->latest()
            ->get();

        return Inertia::render('Invoices/Index', [
            'invoices' => $invoices,
        ]);
    }

    /**
     * Display a specific branded printable invoice.
     */
    public function show(Request $request, Invoice $invoice): Response
    {
        if ($invoice->user_id !== $request->user()->id) {
            abort(403);
        }

        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice,
            'customer' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
            ],
            'company' => config('services.company'),
        ]);
    }
}
