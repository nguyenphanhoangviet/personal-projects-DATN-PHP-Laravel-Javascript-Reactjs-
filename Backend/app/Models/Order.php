<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'order_code',
        'total_price',
        'payment_method',
        'date_deliver',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // public function items()
    // {
    //     $this->hasMany(OrderItem::class);
    // }
    public function items()
    {
    return $this->hasMany(OrderItem::class, 'order_id');
    }
}
