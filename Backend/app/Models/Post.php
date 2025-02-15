<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
         'title', 'slug', 'description', 'content', 'image','view' ,'user_id', 'category_posts_id', 'status'

    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category_posts()
    {
        return $this->belongsTo(CategoryPost::class, 'category_posts_id');
    }
}
