<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name',
    'surname',
    'email',
    'phone',
    'date_of_birth',
    'address_street',
    'address_city',
    'address_country',
    'address_postcode',
    'terms_accepted',
    'terms_accepted_at',
    'password',
    'subscription_plan',
    'token_balance',
    'total_tokens_used',
    'balance',
])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'terms_accepted_at' => 'datetime',
            'date_of_birth' => 'date',
            'terms_accepted' => 'boolean',
            'password' => 'hashed',
            'token_balance' => 'integer',
            'total_tokens_used' => 'integer',
            'balance' => 'decimal:2',
        ];
    }

    public function bots(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Bot::class);
    }

    public function invoices(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
