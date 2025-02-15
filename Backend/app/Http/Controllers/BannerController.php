<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManagerStatic as Image;
// use Intervention\Image\Laravel\Facades\Image;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::orderBy('id', 'DESC')->paginate(10);
        return response()->json($banners);
    }

    public function store(Request $request)
    {
        $validator = $this->validateBanner($request);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image_path')) {
            $imageName = $this->handleImageUpload($request->file('image_path'), $request->input('size'));

            $banner = Banner::create([
                'name' => $request->input('name'),
                'image_path' => $imageName,
                'status' => $request->input('status'),
                'description' => $request->input('description'),
                'size' => $request->input('size'),
            ]);

            return response()->json(['message' => 'Banner created successfully', 'banner' => $banner], 201);
        }

        return response()->json(['message' => 'Please upload an image'], 422);
    }

    public function show($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        return response()->json($banner);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $validator = $this->validateBanner($request, true);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->hasFile('image_path')) {
            // Xóa ảnh cũ nếu có
            if ($banner->image_path) {
                $oldDirectory = $this->getSizeDirectory($banner->size); // Lấy thư mục cũ từ size cũ
                $oldImagePath = "assets/uploads/banner/{$oldDirectory}/" . $banner->image_path;

                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath); // Xóa ảnh cũ
                }
            }

            // Tải ảnh mới và thay đổi kích thước theo size mới
            $imageName = $this->handleImageUpload($request->file('image_path'), $request->input('size'));
            $banner->image_path = $imageName;
        }

        // Cập nhật các thông tin khác của banner
        $banner->update($request->only('name', 'status', 'description', 'size'));

        return response()->json(['message' => 'Banner updated successfully', 'banner' => $banner]);
    }


    public function destroy($id)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        if ($banner->image_path) {
            Storage::delete('public/uploads/banner/' . $banner->image_path);
        }

        $banner->delete();

        return response()->json(['message' => 'Banner deleted successfully']);
    }

    public function activate($id)
    {
        return $this->changeStatus($id, 1);
    }

    public function deactivate($id)
    {
        return $this->changeStatus($id, 0);
    }

    private function changeStatus($id, $status)
    {
        $banner = Banner::find($id);

        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $banner->status = $status;
        $banner->save();

        return response()->json(['message' => $status ? 'Banner activated successfully' : 'Banner deactivated successfully']);
    }

    private function validateBanner(Request $request, $update = false)
    {
        return Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'image_path' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'size' => 'required|integer|in:1,2,3,4,5',
            'status' => 'required|boolean',
            'description' => 'nullable|string',
        ]);
    }

    private function handleImageUpload($image, $size)
{
    $imageName = time() . '.' . $image->getClientOriginalExtension();
    list($width, $height) = $this->getImageDimensions($size);
    $directory = $this->getSizeDirectory($size);

    // Define the full path to the directory
    $path = "assets/uploads/banner/{$directory}/";

    // Check if the directory exists, if not, create it
    if (!file_exists($path)) {
        mkdir($path, 0755, true); // Create directory with the proper permissions
    }

    // Resize and save the image
    $imageManager = new ImageManager(new Driver());
    $imageManager->read($image)->resize($width, $height)
        ->save($path . $imageName);

    return $imageName;
}

public function getBannersBySize($size)
{
    // Validate that size is valid
    if (!in_array($size, [1, 2, 3, 4, 5])) {
        return response()->json(['message' => 'Invalid size parameter'], 422);
    }

    // Fetch banners by size
    $banners = Banner::where('size', $size)->where('status', 1)->get();

    if ($banners->isEmpty()) {
        return response()->json(['message' => 'No banners found for the specified size'], 404);
    }

    return response()->json($banners);
}



    /**
 * Get image dimensions based on the size parameter.
 *
 * @param int $size
 * @return array
 */
private function getImageDimensions($size)
{
    switch ($size) {
        case 1:
            return [800, 600];  // Size 1: 800x600
        case 2:
            return [650, 250];  // Size 2: 650x250
        case 3:
            return [525, 425];  // Size 3: 525x425
        case 4:
            return [250, 200];  // Size 4: 250x200
        case 5:
            return [400, 125];  // Size 5: 400x125
        default:
            return [800, 600];  // Default to Size 1 if no match
    }
}

    private function getSizeDirectory($size)
    {
        switch ($size) {
            case 1: return 'banner800x600';
            case 2: return 'banner650x250';
            case 3: return 'banner525x425';
            case 4: return 'banner250x200';
            case 5: return 'banner400x125';
            default: return 'banner800x600';
        }
    }
}
