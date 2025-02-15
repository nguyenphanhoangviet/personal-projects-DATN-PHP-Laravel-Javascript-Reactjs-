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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('description');
            $table->text('content');
            $table->string('image');
            $table->integer('view');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Khóa ngoại đến bảng users
            $table->foreignId('category_posts_id')->constrained()->onDelete('cascade'); // Khóa ngoại đến bảng  categories posts
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
