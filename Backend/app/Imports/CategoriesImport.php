<?php

namespace App\Imports;

use App\Models\Category;
use Maatwebsite\Excel\Concerns\ToModel;

class CategoriesImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Category([
            //
            'name' => $row[0],
            'slug' => $row[1],
            'sort_order' => $row[2],
            'status' => $row[3],
            'image' => $row[4],
            'parent_id'=> $row[5],
            'showHome' => $row[6],
        ]);
    }
}
