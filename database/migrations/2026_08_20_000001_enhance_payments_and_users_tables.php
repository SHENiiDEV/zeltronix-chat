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
            if (!Schema::hasColumn('users', 'balance')) {
                $table->decimal('balance', 10, 2)->default(0.00)->after('token_balance');
            }
            if (!Schema::hasColumn('users', 'terms_accepted_at')) {
                $table->timestamp('terms_accepted_at')->nullable()->after('terms_accepted');
            }
        });

        Schema::table('invoices', function (Blueprint $table) {
            if (!Schema::hasColumn('invoices', 'type')) {
                $table->string('type', 50)->default('topup')->after('user_id');
            }
            if (!Schema::hasColumn('invoices', 'service_name')) {
                $table->string('service_name', 255)->nullable()->after('type');
            }
            if (!Schema::hasColumn('invoices', 'gateway_reference')) {
                $table->string('gateway_reference', 100)->nullable()->after('invoice_number');
            }
            if (!Schema::hasColumn('invoices', 'project_id')) {
                $table->unsignedBigInteger('project_id')->nullable()->after('gateway_reference');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['balance', 'terms_accepted_at']);
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn(['type', 'service_name', 'gateway_reference', 'project_id']);
        });
    }
};
