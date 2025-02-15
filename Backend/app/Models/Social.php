<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    //
    protected $fillable =
        [
            'provider',
            'provider_user_id',
            'user_id'
        ];

    public function login(){
        return $this->belongsTo(User::class,'user_id');
    }


}
