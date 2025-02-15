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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->enum('status',['Pending','Delivered','Out for Delivery','Cancelled','Accepted'])->default('Pending');

            $table->integer('total_price');
            $table->string('date_deliver');
            $table->string('order_code')->unique();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade');
            // $table->foreignId('location_id')->references('id')->on('locations')->onDelete('cascade');
            $table->string('payment_method');
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
