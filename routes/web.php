<?php

use App\Http\Controllers\BotController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TopUpController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Platform Public Pages
Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorks', ['company' => config('services.company')]);
})->name('how-it-works');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/support', function () {
    return Inertia::render('Support', ['company' => config('services.company')]);
})->name('support');

Route::get('/about', function () {
    return Inertia::render('About', ['company' => config('services.company')]);
})->name('about');

// Legal Pages
Route::get('/terms', function () {
    return Inertia::render('Legal/Terms', ['company' => config('services.company')]);
})->name('legal.terms');

Route::get('/privacy', function () {
    return Inertia::render('Legal/Privacy', ['company' => config('services.company')]);
})->name('legal.privacy');

Route::get('/cookies', function () {
    return Inertia::render('Legal/Cookies', ['company' => config('services.company')]);
})->name('legal.cookies');

Route::get('/refund', function () {
    return Inertia::render('Legal/Refund', ['company' => config('services.company')]);
})->name('legal.refund');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('bots', BotController::class);
    Route::post('/bots/{bot}/documents', [DocumentController::class, 'store'])->name('bots.documents.store');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

    Route::post('/topup', [TopUpController::class, 'store'])->name('topup.store');
    Route::post('/wallet/topup', [TopUpController::class, 'store'])->name('wallet.topup');

    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');
    Route::get('/invoices/{invoice}/download', [InvoiceController::class, 'downloadInvoice'])->name('invoices.download');
    Route::get('/wallet/invoice/{invoice}', [InvoiceController::class, 'downloadInvoice'])->name('wallet.invoice');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
