<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\OrderItem;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::find($request->product_id);

        // Check if product exists and has enough quantity
        if ($product && $product->qty >= $request->quantity) {
            // Create or update cart session
            $cart = session()->get('cart', []);
            $cart[$request->product_id] = [
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $request->quantity
            ];

            session()->put('cart', $cart);
            return response()->json(['message' => 'Product added to cart successfully!'], 200);
        }

        return response()->json(['message' => 'Insufficient product quantity!'], 400);
    }

    public function viewCart()
    {
        $cart = session()->get('cart', []);
        return response()->json($cart, 200);
    }

    public function removeFromCart($product_id)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$product_id])) {
            unset($cart[$product_id]);
            session()->put('cart', $cart);
            return response()->json(['message' => 'Product removed from cart!'], 200);
        }

        return response()->json(['message' => 'Product not found in cart!'], 404);
    }

    public function clearCart()
    {
        session()->forget('cart');
        return response()->json(['message' => 'Cart cleared!'], 200);
    }
}
