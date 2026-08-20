<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\WelcomeUserMail;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Prohibited / sanctioned country names that cannot register.
     */
    protected array $prohibitedCountries = [
        'sudan', 'dem. rep. of the congo', 'democratic republic of the congo', 'drc',
        'iran', 'mali', 'myanmar', 'burma', 'north korea', 'korea, democratic people\'s republic of',
        'south sudan', 'syria', 'yemen', 'afghanistan', 'belarus', 'central african republic',
        'cuba', 'haiti', 'iraq', 'russia', 'somalia', 'venezuela', 'zimbabwe'
    ];

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:today',
            'address_street' => 'required|string|max:255',
            'address_city' => 'required|string|max:255',
            'address_country' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (in_array(strtolower(trim($value)), $this->prohibitedCountries)) {
                        $fail('Registration from the selected jurisdiction is currently not supported due to compliance regulations.');
                    }
                },
            ],
            'address_postcode' => 'required|string|max:30',
            'terms' => 'accepted',
        ], [
            'terms.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy to create an account.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'address_street' => $request->address_street,
            'address_city' => $request->address_city,
            'address_country' => $request->address_country,
            'address_postcode' => $request->address_postcode,
            'terms_accepted' => true,
            'terms_accepted_at' => now(),
            'password' => Hash::make($request->password),
            'subscription_plan' => 'free_trial',
            'token_balance' => 10000, // 10k trial tokens for initial testing
        ]);

        event(new Registered($user));

        // Trigger Welcome Onboarding Mail
        try {
            Mail::to($user->email)->send(new WelcomeUserMail($user));
        } catch (\Throwable $e) {
            Log::error('Welcome email dispatch failed: ' . $e->getMessage());
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
