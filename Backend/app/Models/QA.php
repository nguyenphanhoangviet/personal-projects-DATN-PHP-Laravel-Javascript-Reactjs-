<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QA extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        // 'product_id',
        'message',
        'status',
        'parent_id',

    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // public function products()
    // {
    //     return $this->belongsTo(Product::class, 'product_id');
    // }
    public function answers()
{
    return $this->hasMany(QA::class, 'parent_id');
}
}
