<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarehouseProduct extends Model
{
    use HasFactory;
    protected $fillable = [
        'warehouse_id',
        'product_id',
        'quantity',
    ];

    // public function warehouses()
    // {
    //     return $this->belongsToMany(Warehouse::class, 'warehouse_products')
    //                 ->withPivot('quantity')
    //                 ->withTimestamps();
    // }
}
