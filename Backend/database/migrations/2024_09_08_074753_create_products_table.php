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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Tên sản phẩm
            $table->string('slug')->unique(); // Slug duy nhất
            $table->text('description')->nullable(); // Mô tả sản phẩm
            $table->integer('price_cost'); // Giá gốc sản phẩm
            $table->integer('price'); // Giá sản phẩm
            $table->text('category_id'); // Thay đổi từ foreignId sang text
            $table->foreignId('brand_id')->constrained()->onDelete('cascade'); // Khóa ngoại đến bảng brands
            $table->integer('favorite');
            $table->integer('view');
            $table->string('ingredient'); // thành phần
            $table->foreignId('product_type_id')->constrained()->onDelete('cascade'); // Khóa ngoại đến bảng product_type
            $table->string('image');
            $table->integer('status');
            $table->string('uses');// Sử dụng
            $table->string('user_manual'); // hướng dẫn sử dụng
            $table->string('sku'); // mã sản phẩm tồn kho
            $table->string('barcode')->nullable(); // mã vạch sản phẩm
            $table->integer('track_qty')
                ->default('1'); // theo dỗi số lượng tồn kho
            $table->integer('qty')->nullable(); // số lượng sản phẩm
            $table->integer('sold')->nullable(); // số lượng sản phẩm bán
            $table->softDeletes();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
