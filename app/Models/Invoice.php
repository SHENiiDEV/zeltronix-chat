<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'user_id',
        'type',
        'service_name',
        'gateway_reference',
        'project_id',
        'description',
        'amount',
        'currency',
        'tokens_credited',
        'status',
        'paid_at',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get effective gateway reference number.
     */
    public function getRefAttribute(): string
    {
        return $this->gateway_reference ?: ($this->invoice_number ?: 'INV-' . $this->id);
    }
}
