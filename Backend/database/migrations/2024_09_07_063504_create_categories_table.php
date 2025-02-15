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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Tên danh mục
            $table->string('slug')->unique(); // Slug duy nhất cho danh mục
            $table->string('image');
            $table->integer('status');
            $table->integer('parent_id')->nullable();
            $table->integer('sort_order'); // sắp xếp thứ tự
            $table->enum('showHome',['Yes','No'])->default('No');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
