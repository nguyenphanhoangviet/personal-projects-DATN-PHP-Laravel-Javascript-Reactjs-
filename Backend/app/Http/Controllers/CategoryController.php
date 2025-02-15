<?php

namespace App\Http\Controllers;

use App\Exports\CategoriesExport;
use App\Imports\CategoriesImport;
use App\Models\Category;
use Exception;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $categories = $this->getCategories();
        return response()->json($categories, 200);
    }

    public function getCategories()
    {
        $categories = Category::paginate(10);
        $listCategory = [];
        Category::recursive($categories, $parent = 0, $level = 1, $listCategory);
        return $listCategory;
    }

    public function show($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json($category, 200);
        } else
            return response()->json('category not found');
    }
    public function store(Request $request)
    {
        try {
            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'required|unique:categories,name',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif|max:2048', // Validate the image type and size
                'slug' => 'required',
                'sort_order' => 'required|integer',
                'parent_id' => 'required',
                'status' => 'nullable|boolean',
                'showHome' => 'nullable|boolean',
            ]);

            $category = new Category();

            // Handle image upload
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;

                // Move the image to the correct directory
                $file->move('assets/uploads/category/', $filename);
                $category->image = $filename;
            }

            // Assign values from request to the category object
            $category->name = $request->name;
            $category->slug = $request->slug;
            $category->sort_order = $request->sort_order;
            $category->parent_id = $request->parent_id;
            $category->status = $request->status; // Default to 0 if null
            $category->showHome = $request->showHome; // Default to 0 if null

            // Save the category
            $category->save();

            return response()->json('Category added successfully', 201);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update($id, Request $request)
    {
        try {
            // Validate request data
            $request->validate([
                'name' => 'required|unique:categories,name,' . $id, // Exclude the current category from the unique validation
                'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048', // Image is nullable, validate type and size
                'slug' => 'required',
                'sort_order' => 'required|integer',
                'parent_id' => 'required',
                'status' => 'nullable|boolean',
                'showHome' => 'nullable|boolean',
            ]);

            // Find the category by ID or throw a 404 error
            $category = Category::findOrFail($id);

            // Handle image update if a new image is uploaded
            if ($request->hasFile('image')) {
                $path = 'assets/uploads/category/' . $category->image;
                if (File::exists($path)) {
                    File::delete($path); // Delete the old image if it exists
                }
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;

                // Move the new image to the designated directory
                $file->move('assets/uploads/category/', $filename);
                $category->image = $filename;
            }

            // Update the category fields
            $category->name = $request->name;
            $category->slug = $request->slug;
            $category->sort_order = $request->sort_order;
            $category->parent_id = $request->parent_id;
            $category->status = $request->status;
            $category->showHome = $request->showHome;

            // Save the updated category
            $category->save();

            return response()->json('Category updated successfully', 200);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500); // Return the error message
        }
    }


    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category) {
            $category->delete();
            return response()->json('category delete');
        } else
            return response()->json('category not found');
    }

    public function export_csv()
    {
        return Excel::download(new CategoriesExport, 'category.xlsx');
    }

    public function import_csv(Request $request)
    {
        try {
            $file = $request->file('file');

            if (!$file) {
                return response()->json(['message' => 'No file uploaded'], 400);
            }

            $path = $file->getRealPath();

            Excel::import( new CategoriesImport, $path);

            return response()->json(['message' => 'File imported successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error during import', 'error' => $e->getMessage()], 500);
        }
    }


}
