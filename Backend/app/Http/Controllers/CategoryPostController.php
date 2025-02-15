<?php

namespace App\Http\Controllers;

use App\Models\CategoryPost;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class CategoryPostController extends Controller
{
    //
    public function index()
    {
        $category_posts = CategoryPost::paginate(10);
        return response()->json($category_posts, 200);
    }

    public function show($id)
    {
        $category_post = CategoryPost::find($id);
        if ($category_post) {
            return response()->json($category_post, 200);
        } else
            return response()->json('category not found');
    }
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:category_posts,name',

                'slug' => 'required',

                'status' => 'nullable',

            ]);

            $category_post = new CategoryPost();

            $category_post->name = $request->name;
            $category_post->slug = $request->slug;

            $category_post->status = $request->status;


            $category_post->save();
            return response()->json('category posts added', 201);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function update($id, Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:category_posts,name,' . $id,
            'slug' => 'required',
            'status' => 'nullable|boolean', 

            ]);

            $category_post = CategoryPost::find($id);


            $category_post->name = $request->name;
            $category_post->slug = $request->slug;

            $category_post->status = $request->status;


            $category_post->update();
            return response()->json('category post updated', 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function destroy($id)
    {
        $category_post = CategoryPost::find($id);
        if ($category_post) {
            $category_post->delete();
            return response()->json('category post delete');
        } else
            return response()->json('category post not found');
    }
}
