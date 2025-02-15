<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Google\Cloud\Vision\V1\ImageAnnotatorClient;
use Illuminate\Http\Request;

class ImageSearchController extends Controller
{
    public function searchByImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Store the image temporarily
        $imagePath = $request->file('image')->store('images');

        // Load the image file
        $imageAnnotator = new ImageAnnotatorClient([
            'credentials' => storage_path('app/google-credentials.json'),
        ]);

        $imageContent = file_get_contents(storage_path('app/' . $imagePath));

        // Send image to Google Vision API for label detection
        $response = $imageAnnotator->labelDetection($imageContent);
        $labels = $response->getLabelAnnotations();

        $imageAnnotator->close();

        $searchTerms = [];

        foreach ($labels as $label) {
            $searchTerms[] = $label->getDescription();
        }

        // Search the products based on the labels identified by Google Vision
        $products = Product::where(function ($query) use ($searchTerms) {
            foreach ($searchTerms as $term) {
                $query->orWhere('name', 'like', "%$term%")
                      ->orWhere('description', 'like', "%$term%");
            }
        })->get();

        return response()->json(['products' => $products]);
    }
}

