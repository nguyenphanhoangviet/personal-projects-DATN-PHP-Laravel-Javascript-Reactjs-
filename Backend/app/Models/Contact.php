<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name', 'email', 'phone','title','message'];

    // Liên kết với User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
