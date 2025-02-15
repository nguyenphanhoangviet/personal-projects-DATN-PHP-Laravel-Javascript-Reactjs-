<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitors extends Model
{
    //
    protected $fillable = [
        'ip_address', 'date_visit'
    ];
    protected $table = 'visitors';
}
