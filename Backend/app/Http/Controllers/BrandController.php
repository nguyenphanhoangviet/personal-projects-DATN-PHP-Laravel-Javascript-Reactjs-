<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class BrandController extends Controller
{
    //
    public function index()
    {
        $brands = Brand::orderBy('created_at', 'desc')->paginate(10);
        return response()->json($brands, 200);
    }


    public function show($id)
    {
        $brand = Brand::find($id);
        if ($brand) {
            return response()->json($brand, 200);
        } else
            return response()->json('brand not found');
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:brands,name',
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
            ]);

            $brand = new Brand();
            $brand->name = $request->name;
            $brand->slug = $request->slug;
            $brand->status = $request->status;

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move('assets/uploads/brand/', $filename);
                $brand->image = $filename;
            }

            $brand->save();

            return response()->json(['message' => 'Brand added successfully'], 201);
        } catch (Exception $e) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }
    }

    public function update($id, Request $request)
    {
        try {
            // Validation with the unique rule excluding the current brand ID
            $request->validate([
                'name' => 'required|unique:brands,name,'.$id,
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
            ]);

            $brand = Brand::findOrFail($id); // Fetch the brand or throw a 404

            // Handle image update
            if ($request->hasFile('image')) {
                // Delete the existing image if it exists
                $path = 'assets/uploads/brand/' . $brand->image;
                if (File::exists($path)) {
                    File::delete($path); // Delete the old image
                }

                // Save the new image
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move('assets/uploads/brand/', $filename);
                $brand->image = $filename; // Update image field in the brand
            }

            // Update the brand with new values
            $brand->update([
                'name' => $request->name,
                'slug' => $request->slug,
                'status' => $request->status,
            ]);

            return response()->json('Brand updated successfully', 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Handle errors
        }
    }





    public function destroy($id)
    {
        $brand = Brand::find($id);
        if ($brand) {
            $brand->delete();
            return response()->json('brand delete');
        } else
            return response()->json('brand not found');
    }
}
