<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('subscription_plan', 50)->default('free_trial'); // free_trial, pro, or enterprise
            $table->unsignedBigInteger('token_balance')->default(10000); // 10k trial tokens
            $table->unsignedBigInteger('total_tokens_used')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['subscription_plan', 'token_balance', 'total_tokens_used']);
        });
    }
};
