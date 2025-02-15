<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'user_id',
        'time',
        'condition',
        'number',
        'code',
        'date_start',
        'date_end',
        'used',
        'status',
    ];
}
