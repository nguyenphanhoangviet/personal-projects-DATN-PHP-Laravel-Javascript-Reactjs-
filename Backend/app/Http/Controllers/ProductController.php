<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\File\Exception\FileException;


class ProductController extends Controller
{
    //
    public function index()
    {
        $products = Product::with('category_product')->orderBy('id', 'desc')->paginate(20);
        if ($products) {
            return response()->json($products, 200);
        } else
            return response()->json('No products');
    }

    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json($product, 200);
        } else
            return response()->json('product was not found');
    }

    public function store(Request $request)
    {
        // Xác thực dữ liệu yêu cầu
        Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required',
            'price_cost'=>'required|numeric',
            'price' => 'required|numeric',
            'description' => 'required',
            'category_id' => 'required|array', // This ensures category_id is an array
            'category_id.*' => 'integer|exists:categories,id', // Checks each array item
            'brand_id' => 'required|numeric',

            'favorite' => 'required',
            'view' => 'required',
            'sku' => 'required',
            'product_type_id' => 'required',
            'image' => 'required|file|image|mimes:jpeg,png,gif,webp|max:2048', //Xác thực hình ảnh
            'uses' => 'required',
            'user_manual' => 'required',
            'ingredient' => 'required',
            'barcode' => 'required',
            'track_qty' => 'required',
            'qty' => 'required',
            'status' => 'required',
            'product_images.*' => 'file|image|mimes:jpeg,png,gif,webp|max:2048' //Xác thực nhiều hình ảnh
        ])->validate();

        // Tạo 1 sản phẩm mới
        $product = new Product();
        $product->name = $request->name;
        $product->slug = $request->slug; // You missed the slug
        $product->price_cost = $request->price_cost;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->category_id = json_encode($request->category_id); // Chuyển đổi mảng thành JSON
        $product->brand_id = $request->brand_id;

        $product->favorite = $request->favorite;
        $product->view = $request->view;
        $product->sku = $request->sku;
        $product->product_type_id = $request->product_type_id;
        $product->uses = $request->uses;
        $product->user_manual = $request->user_manual;
        $product->ingredient = $request->ingredient;
        $product->barcode = $request->barcode;
        $product->track_qty = $request->track_qty;
        $product->qty = $request->qty;
        $product->status = $request->status;

        // Xử lý việc tải lên hình ảnh sản phẩm
        // if ($request->hasFile('image')) {
        //     $file = $request->file('image');
        //     $ext = $file->getClientOriginalExtension();
        //     $filename = time() . '.' . $ext;
        //     $file->move('assets/uploads/product/', $filename);
        //     $product->image = $filename;
        // }

        if ($request->hasFile('image')) {
            $path = 'assets/uploads/product/' . $product->image;
            if (File::exists($path)) {
                File::delete($path);
            }
            $file = $request->file('image');
            $ext = $file->getClientOriginalExtension();
            $filename = time() . '.' . $ext;
            try {
                $file->move('assets/uploads/product', $filename);
            } catch (FileException $e) {
                Log::error('File upload failed: ' . $e->getMessage());
                return response()->json(['error' => 'File upload failed'], 500);
            }
            $product->image = $filename;
        }
        // lưu sản phẩm
        $product->save();

        //thêm nhiều loại cho sản phẩm
        $product->category_product()->attach($request->category_id);

        // Xử lý tải lên hình ảnh liên quan
        if ($request->hasFile('product_images')) {
            $files = $request->file('product_images');
            foreach ($files as $index => $file) {
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move('assets/uploads/product/', $fileName);

                // Tạo bản ghi ProductImage mới
                $product_image = new ProductImage();
                $product_image->product_id = $product->id; // Sử dụng product_id thay vì id
                $product_image->sort_order = ($index + 1);
                $product_image->image = $fileName;
                $product_image->save();
            }
        }

        return response()->json([
            'message' => 'Product added',
            'product' => $product
        ], 201);
    }

    public function update($id, Request $request)
    {
        // Xác thực dữ liệu yêu cầu
        Validator::make($request->all(), [
            'name' => 'required',
            'slug' => 'required',

            'price_cost' => 'required|numeric',
            'price' => 'required|numeric',
            'description' => 'required',
            'category_id' => 'required|array', // This ensures category_id is an array
            'category_id.*' => 'integer|exists:categories,id', // Checks each array item
            'brand_id' => 'required|numeric',

            'favorite' => 'required',
            'view' => 'required',
            'sku' => 'required',
            'barcode' => 'required',
            'product_type_id' => 'required',
            'image' => 'nullable|file|image|mimes:jpeg,png,gif,webp|max:2048',
            'uses' => 'required',
            'user_manual' => 'required',
            'ingredient' => 'required',

            'track_qty' => 'required',
            'qty' => 'required',
            'status' => 'required',
            'product_image.*' => 'nullable|file|image|mimes:jpeg,png,gif,webp|max:2048'
        ])->validate();

        // Tìm sản phẩm theo ID
        $product = Product::find($id);

        if ($product) {
            // Cập nhật thông tin chi tiết sản phẩm
            $product->name = $request->name;
            $product->slug = $request->slug;
            $product->price_cost = $request->price_cost;
            $product->price = $request->price;
            $product->description = $request->description;
            $product->category_id = json_encode($request->category_id); // Chuyển đổi mảng thành JSON
            $product->brand_id = $request->brand_id;

            $product->favorite = $request->favorite;
            $product->view = $request->view;
            $product->sku = $request->sku;
            $product->product_type_id = $request->product_type_id;
            $product->uses = $request->uses;
            $product->user_manual = $request->user_manual;
            $product->ingredient = $request->ingredient;
            $product->barcode = $request->barcode;
            $product->track_qty = $request->track_qty;
            $product->qty = $request->qty;
            $product->status = $request->status;

            // Xử lý việc tải lên hình ảnh sản phẩm chính
            if ($request->hasFile('image')) {
                $path = 'assets/uploads/product/' . $product->image;
                if (File::exists($path)) {
                    File::delete($path);
                }
                $file = $request->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time() . '.' . $ext;
                try {
                    $file->move('assets/uploads/product/', $filename);
                } catch (FileException $e) {
                    Log::error('File upload failed: ' . $e->getMessage());
                    return response()->json(['error' => 'File upload failed'], 500);
                }
                $product->image = $filename;
            }

            // Xử lý tải lên hình ảnh liên quan
            if ($request->hasFile('product_images')) {
                // Xóa hình ảnh cũ liên quan
                foreach ($product->relatedImages as $relatedImage) {
                    Storage::delete('assets/uploads/product/' . $relatedImage->image);
                    $relatedImage->delete();
                }

                // Lưu hình ảnh liên quan mới
                foreach ($request->file('product_images') as $index => $file) {
                    $fileName = time() . '_' . $file->getClientOriginalName();
                    $file->storeAs('assets/uploads/product/', $fileName);

                    // Tạo bản ghi hình ảnh liên quan mới
                    $relatedImage = new ProductImage();
                    $relatedImage->product_id = $product->id;
                    $relatedImage->sort_order = ($index + 1);
                    $relatedImage->image = $fileName;
                    $relatedImage->update();
                }
            }

            // Lưu sản phẩm cập nhật
            $product->update();

             // cập nhật nhiều loại cho sản phẩm
        $product->category_product()->sync($request->category_id);

            return response()->json('Product updated successfully', 200);
        } else {
            return response()->json('Product not found', 404);
        }
    }

    public function destroy($id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::find($id);
        if ($product) {
            // Xóa hình ảnh liên quan
            foreach ($product->product_images()->get() as $product_image) {
                // Xóa tệp hình ảnh để tránh các tệp còn sót lại
                $imagePath = 'assets/uploads/product/' . $product_image->image;
                if (Storage::exists($imagePath)) {
                    Storage::delete($imagePath);
                }

                // Xóa bỏ bản ghi khỏi cơ sở dữ liệu
                $product_image->delete();
            }

            // Xóa hình ảnh sản phẩm chính
            $mainImagePath = 'assets/uploads/product/' . $product->image;
            if (Storage::exists($mainImagePath)) {
                Storage::delete($mainImagePath);
            }

            // Xóa chính sản phẩm
            $product->delete();

            return response()->json('Product deleted successfully', 200);
        } else {
            return response()->json('Product not found', 404);
        }
    }

    public function incrementFavorite($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        $product->increment('favorite'); 
        return response()->json(['message' => 'Đã tăng số lần yêu thích', 'favorite' => $product->favorite], 200);
    }

    public function decrementFavorite($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }


        if ($product->favorite > 0) {
            $product->decrement('favorite');
        }

        return response()->json(['message' => 'Đã giảm số lần yêu thích', 'favorite' => $product->favorite], 200);
    }
}
