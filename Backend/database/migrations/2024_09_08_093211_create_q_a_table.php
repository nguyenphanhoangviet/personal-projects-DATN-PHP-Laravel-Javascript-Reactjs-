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
        Schema::create('q_a', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('product_id')->constrained()->onDelete('cascade'); // Khóa ngoại đến bảng products
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('message'); // Câu hỏi
            $table->integer('parent_id')->nullable();
            $table->integer('status')->default(1);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('q_a');
    }
};
