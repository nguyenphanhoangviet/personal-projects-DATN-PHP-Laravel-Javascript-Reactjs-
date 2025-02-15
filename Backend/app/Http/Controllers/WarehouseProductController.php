<?php

namespace App\Http\Controllers;

use App\Models\WarehouseProduct;
use Exception;
use Illuminate\Http\Request;

class WarehouseProductController extends Controller
{
    //

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',


            ]);

            $warehouseProduct = new WarehouseProduct();

            $warehouseProduct->warehouse_id = $request->warehouse_id;
            $warehouseProduct->product_id = $request->product_id;

            $warehouseProduct->quantity = $request->quantity;


            $warehouseProduct->save();
            return response()->json('Warehouse Product added', 201);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function update($warehouse_id, $product_id, Request $request)
    {
        try {
            $validated = $request->validate([
                'quantity' => 'required|integer|min:1',

            ]);

            $warehouseProduct = WarehouseProduct::where('warehouse_id', $warehouse_id)
                ->where('product_id', $product_id)
                ->firstOrFail();


            $warehouseProduct->quantity = $validated['quantity'];
            $warehouseProduct->update();
            return response()->json('Warehouse Product updated', 200);
        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }

    public function destroy($warehouse_id, $product_id)
    {
        $warehouseProduct = WarehouseProduct::where('warehouse_id', $warehouse_id)
                            ->where('product_id', $product_id)
                            ->firstOrFail();
        if ($warehouseProduct) {
            $warehouseProduct->delete();
            return response()->json('Warehouse Product delete',204);
        } else
            return response()->json('Warehouse Product not found');
    }
}
