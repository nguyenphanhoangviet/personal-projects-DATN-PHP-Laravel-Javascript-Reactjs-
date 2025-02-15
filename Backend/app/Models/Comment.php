<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'product_id',
        'message',
        'date',
        'parent_id',
        'status',
    ];

    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
