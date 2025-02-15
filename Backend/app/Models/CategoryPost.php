<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryPost extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'status',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    
}
