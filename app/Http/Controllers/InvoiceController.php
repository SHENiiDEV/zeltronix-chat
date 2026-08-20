<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Barryvdh\DomPDF\Facade\Pdf;
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
        if ($invoice->user_id !== $request->user()->id && !($request->user()->is_admin ?? false)) {
            abort(403);
        }

        return Inertia::render('Invoices/Show', [
            'invoice' => $invoice,
            'customer' => [
                'name' => $request->user()->name,
                'surname' => $request->user()->surname,
                'email' => $request->user()->email,
            ],
            'company' => config('services.company'),
        ]);
    }

    /**
     * Download B2B PDF invoice file.
     */
    public function downloadInvoice(Request $request, Invoice $invoice)
    {
        if ($invoice->user_id !== $request->user()->id && !($request->user()->is_admin ?? false)) {
            abort(403, 'Unauthorized access to invoice.');
        }

        $pdf = Pdf::loadView('pdf.wallet_invoice', [
            'payment' => $invoice,
            'user' => $invoice->user,
        ]);

        $ref = $invoice->gateway_reference
            ?: ($invoice->invoice_number ?: ('INV-' . $invoice->id));

        return $pdf->download("Invoice_{$ref}.pdf");
    }
}
