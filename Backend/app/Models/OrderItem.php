<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'order_code',
        'product_id',
        'coupon_code',
        'price',
        'quantity',
    ];

    public function order(){
       return $this->belongsTo(Order::class, 'order_id');
    }

    public function product(){
       return $this->belongsTo(Product::class);
    }
}
