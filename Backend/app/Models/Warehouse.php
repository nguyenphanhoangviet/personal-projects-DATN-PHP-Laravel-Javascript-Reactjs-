<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use HasFactory;
    protected $fillable = [
        'location',
        'user_id',
        'status',
    ];
    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'warehouse_products')->withPivot('quantity');
    }
}
