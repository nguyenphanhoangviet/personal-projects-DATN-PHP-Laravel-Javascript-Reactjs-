<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class SubCategoryController extends Controller
{
    //
    public function index()
    {
        $sub_categories = SubCategory::paginate(10);
        return response()->json($sub_categories, 200);
    }

    public function show($id)
    {
        $sub_category = SubCategory::find($id);
        if ($sub_category) {
            return response()->json($sub_category, 200);
        } else
            return response()->json('sub category not found');
    }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:sub_categories,name',
                'image' => 'required|file|image|mimes:jpeg,png,gif,webp|max:2048',
                'slug' => 'required',
                'status' => 'nullable',
                'showHome' => 'nullable',
            ]);

            $sub_category = new SubCategory();

            if ($request->hasFile('image')) {
                $path = 'assets/uploads/sub_category/' . $sub_category->image;
                if (File::exists($path)) {
                    File::delete($path);
                }
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;
                try {
                    $file->move('assets/uploads/category' . $filename);
                } catch (FileException $e) {
                    dd($e);
                }
                $sub_category->image = $filename;
            }

            $sub_category->name = $request->name;
            $sub_category->slug = $request->slug;

            $sub_category->status = $request->status;
            $sub_category->showHome = $request->showHome;

            $sub_category->save();
            return response()->json('sub category added', 201);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function update($id, Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:sub_categories,name',

                'slug' => 'required',
                'image' => 'required|file|image|mimes:jpeg,png,gif,webp|max:2048',
                'status' => 'nullable',
                'showHome' => 'nullable',
            ]);

            $sub_category = SubCategory::find($id);

            if ($request->hasFile('image')) {
                $path = 'assets/uploads/sub_category/' . $sub_category->image;
                if (File::exists($path)) {
                    File::delete($path);
                }
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;
                try {
                    $file->move('assets/uploads/category' . $filename);
                } catch (FileException $e) {
                    dd($e);
                }
                $sub_category->image = $filename;
            }
            $sub_category->name = $request->name;
            $sub_category->slug = $request->slug;

            $sub_category->status = $request->status;
            $sub_category->showHome = $request->showHome;

            $sub_category->update();
            return response()->json('sub category updated', 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function destroy($id)
    {
        $sub_category = SubCategory::find($id);
        if ($sub_category) {
            $sub_category->delete();
            return response()->json('sub category delete');
        } else
            return response()->json('sub category not found');
    }
}
