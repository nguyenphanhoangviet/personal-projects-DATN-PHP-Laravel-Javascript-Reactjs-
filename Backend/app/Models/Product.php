<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'price_cost',
        'price',
        'description',
        'brand_id',
        'category_id',
        'favorite',
        'view',
        'sku',
        'product_type_id',
        'image',
        'uses',
        'user_manual',
        'ingredient',
        'barcode',
        'track_qty',
        'qty',
        'sold',
        'status',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
    ];

    protected $casts = [
        'price_cost' => 'integer',
        'price' => 'integer',
        'favorite' => 'integer',
        'view' => 'integer',
        'track_qty' => 'integer',
        'qty' => 'integer',
        'sold' => 'integer',
        'status' => 'integer',
    ];

    public function product_images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function category_product()
    {
        return $this->belongsToMany(Category::class, 'category_product', 'product_id', 'category_id');
    }

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'warehouse_products')
                    ->withPivot('quantity');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function comment(){
        return $this->belongsToMany(Comment::class);
    }
}
