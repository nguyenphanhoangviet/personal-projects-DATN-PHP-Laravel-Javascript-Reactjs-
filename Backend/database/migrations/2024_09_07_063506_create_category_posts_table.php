<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category_posts', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Tên danh mục
            $table->string('slug')->unique(); // Slug duy nhất cho danh mục
            $table->integer('status'); 
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_posts');
    }
};
