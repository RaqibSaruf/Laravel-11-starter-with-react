<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('otp_verification_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255)->nullable()->unique();
            $table->string('token', 255);
            $table->char('otp', 6);
            $table->boolean('verified')->default(0);
            $table->boolean('revoked')->default(0);
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('otp_verification_tokens');
    }
};
