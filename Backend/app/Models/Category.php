<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'status',
        'image',
        'parent_id',
        'showHome',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];



    public function products()
    {
        return $this->belongsToMany(Product::class);
    }

    public static function recursive($categories, $parent = 0, $level = 1, &$listCategory)
    {
        if (count($categories) > 0) {
            foreach ($categories as $key => $value) {
                if ($value->parent_id == $parent) {
                    $value->level = $level;
                    $listCategory[] = $value;
                    unset($categories[$key]);
                    self::recursive($categories, $value->id, $level + 1, $listCategory);
                }
            }
        }
    }
}
