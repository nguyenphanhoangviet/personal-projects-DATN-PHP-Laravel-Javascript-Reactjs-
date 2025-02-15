<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    //
protected $fillable = [
    'order_date','sales','profit','quantity','total_order',
];
protected $table= 'statistical';
}
