<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Statistic;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\OrderCompletedEvent;
use App\Mail\OrderInvoiceMail;
use Illuminate\Support\Facades\Mail;
use PDF;

class OrderController extends Controller
{

    public function print_order($order_code)
    {
        $pdf = \App::make('dompdf.wrapper');
        $pdf->loadHTML($this->print_order_convert($order_code));

        return $pdf->stream();
    }


    public function print_order_convert($order_code)
    {
        $order = Order::with('user', 'items.product')->where('order_code', $order_code)->first();

        if (!$order) {
            return "Order not found.";
        }

        $user = $order->user;
        $order_items = $order->items;

        $coupon = null;
        $coupon_echo = '0';
        $feeShip = 50000;

        $coupon_code = null;
        foreach ($order_items as $item) {
            $coupon_code = $item->coupon_code;
        }

        $coupon_condition = 2;
        $coupon_number = 0;

        if ($coupon_code && $coupon_code != 'no') {
            $coupon = Coupon::where('code', $coupon_code)->first();
            if ($coupon) {
                $coupon_condition = $coupon->condition;
                $coupon_number = $coupon->number;

                if ($coupon_condition == 1) {
                    $coupon_echo = $coupon_number . '%';
                } elseif ($coupon_condition == 2) {
                    $coupon_echo = number_format($coupon_number, 0, ',', '.') . 'đ';
                }
            }
        }

        $output = '';

        // CSS and logo
        $output .= '
        <style>
            body {
                font-family: DejaVu Sans, sans-serif;
                margin: 20px;
            }
            .logo {
                text-align: center;
                margin-bottom: 20px;
            }
            .logo img {
                max-width: 150px;
            }
            h1, h4 {
                text-align: center;
                margin: 5px 0;
            }
            .table-styling {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .table-styling thead {
                background-color: #f2f2f2;
            }
            .table-styling, .table-styling th, .table-styling td {
                border: 1px solid #000;
            }
            .table-styling th, .table-styling td {
                padding: 8px;
                text-align: left;
            }
            .text-end {
                text-align: right;
                margin-top: 20px;
            }
            .signature-table {
                width: 100%;
                margin-top: 20px;
            }
            .signature-table th {
                text-align: center;
            }
        </style>';

        // Logo
        $output .= '
        <div class="logo">
            <img src="./assets/images/logo/logoo.png" alt="Logo">
        </div>
        <h1>Nhà thuốc Yên Tâm</h1>
        <h4>Độc lập - Tự do - Hạnh phúc</h4>';

        // Customer details
        $output .= '
        <p><strong>Người đặt hàng:</strong></p>
        <table class="table-styling">
            <thead>
                <tr>
                    <th>Tên khách đặt</th>
                    <th>Số điện thoại</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>' . $user->name . '</td>
                    <td>' . $user->phone . '</td>
                    <td>' . $user->email . '</td>
                </tr>
            </tbody>
        </table>';

        // Order details
        $output .= '
        <p><strong>Đơn hàng đặt:</strong></p>
        <table class="table-styling">
            <thead>
                <tr>
                    <th>Tên sản phẩm</th>
                    <th>Mã giảm giá</th>
                    <th>Số lượng</th>
                    <th>Giá sản phẩm</th>
                    <th>Thành tiền</th>
                </tr>
            </thead>
            <tbody>';

        $total = 0;

        foreach ($order_items as $item) {
            $subtotal = $item->price * $item->quantity;
            $total += $subtotal;

            $output .= '
                <tr>
                    <td>' . $item->product->name . '</td>
                    <td>' . ($coupon_code ?? 'Không mã') . '</td>
                    <td>' . $item->quantity . '</td>
                    <td>' . number_format($item->price, 0, ',', '.') . 'đ</td>
                    <td>' . number_format($subtotal, 0, ',', '.') . 'đ</td>
                </tr>';
        }

        // Calculate totals
        $discount = $coupon_condition == 1 ? ($total * $coupon_number) / 100 : $coupon_number;
        $total_after_discount = $total - $discount + $feeShip;

        $output .= '
            <tr>
                <td colspan="4" style="text-align: right;"><strong>Phí vận chuyển:</strong></td>
                <td>' . number_format($feeShip, 0, ',', '.') . 'đ</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: right;"><strong>Tổng giảm:</strong></td>
                <td>' . $coupon_echo . '</td>
            </tr>
            <tr>
                <td colspan="4" style="text-align: right;"><strong>Thanh toán:</strong></td>
                <td>' . number_format($total_after_discount, 0, ',', '.') . 'đ</td>
            </tr>
        </tbody>
        </table>';

        // Signatures
        $output .= '
        <p class="text-end" style=" margin-top: 30px; font-weight: bold;">Ký tên</p>
        <table style="width: 100%; margin-top: 50px; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="width: 50%; text-align: center; border: none;">Người lập phiếu</th>
                    <th style="width: 50%; text-align: center; border: none;">Người nhận</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="text-align: center; padding-top: 50px;">______________________</td>
                    <td style="text-align: center; padding-top: 50px;">______________________</td>
                </tr>
            </tbody>
        </table>';



        return $output;
    }




    public function manager_order()
    {
        $orders = Order::with('user')->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'success' => true,
            'data' => $orders
        ], 200);
    }

    public function view_order($order_code)
    {
        $order_item = OrderItem::with('product')->where('order_code', $order_code)->get();
        $orders = Order::where('order_code', $order_code)->get();
        foreach ($orders as $key => $order) {
            $user_id = $order->user_id;
            $status = $order->status;
        }
        $user = User::where('id', $user_id)->first();

        $order_items = OrderItem::with('product')->where('order_code', $order_code)->get();

        foreach ($order_items as $item) {
            $coupon_code = $item->coupon_code;
        }
        $condition = 2;
        $number = 0;

        // If a coupon code exists and is not 'no', fetch the coupon details
        if ($coupon_code && $coupon_code != 'no') {
            $coupon = Coupon::where('code', $coupon_code)->first();
            if ($coupon) {
                $condition = $coupon->condition;
                $number = $coupon->number;
            }
        }
        return response()->json([
            'success' => true,
            'order_item' => $order_item,
            'orders' => $orders,
            'user' => $user,
            'order_items' => $order_items,
            'condition' => $condition,
            'number' => $number,
            'status' => $status,
        ], 200);
    }

    //
    public function index()
    {
        $orders = Order::with('user')
            ->paginate(20);
        if ($orders) {
            foreach ($orders as $order) {
                foreach ($order->items as $order_items) {
                    $product = Product::where('id', $order_items->product_id)->pluck('name');
                    $order_items->products_name = $product['0'];
                }
            }
            return response()->json($orders, 200);
        } else
            return response()->json('there is no orders');

    }

    public function show($id)
    {
        $order = Order::find($id);
        return response()->json($order, 200);
    }

    public function store(Request $request)
    {
        try {
            // $location = Locations::where('user_id', Auth::id())->first();

            $request->validate([
                'order_items' => 'required',
                'total_price' => 'required',
                'quantity' => 'required',
                'payment_method' => 'required',
                'date_deliver' => 'required'

            ]);

            $order = new Order();
            $order->user_id = Auth::id();
            // $order->location_id = $location->id;
            $order->payment_method = $request->payment_method;
            $order->total_price = $request->total_price;
            $order->data_deliver = now()->addDays(7);
            $order->status = 'pending';
            $order->save();
            foreach ($request->order_items as $order_items) {
                $items = new OrderItem();
                $items->order_id = $order->id;
                $items->price = $order_items['price'];
                $items->product_id = $order_items['product_id'];
                $items->quantity = $order_items['quantity'];
                $items->save();
                $product = Product::where('id', $order_items['product_id'])->first();
                $product->qty = $order_items['quantity'];

                $product->save();
            }
            return response()->json('order is added', 201);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }

    public function get_order_items($id)
    {
        $order_items = OrderItem::where('order_id', $id)->get();
        if ($order_items) {
            foreach ($order_items as $order_item) {
                $product = Product::where('id', $order_item->product_id)->pluck('name');
                $order_item->products_name = $product['0'];
            }
            return response()->json($order_items, 200);
        } else
            return response()->json('no items found');
    }

    public function get_user_orders($id)
    {
        $orders = Order::where('user_id', $id)
            ->with('items', function ($query) {
                $query->orderBy('created_at', 'desc');
            })->get();

        if ($orders) {
            foreach ($orders as $order) {
                foreach ($order->items as $order_items) {
                    $product = Product::where('id', $order_items->product_id)->pluck('name');
                    $order_items->product_name = $product['0'];
                }
            }
            return response()->json($order, 200);
        } else
            return response()->json('no orders found for this user');

    }

    public function change_order_status($id, Request $request)
    {
        $order = Order::with('items')->find($id);

        if (!$order) {
            return response()->json('Không tìm thấy đơn đặt hàng', 404);
        }

        $order->update(['status' => $request->status]);

        $order_date = $order->date_deliver;
        $statistic = Statistic::where('order_date', $order_date)->get();
        if ($statistic) {
            $statistic_count = $statistic->count();
        } else {
            $statistic_count = 0;
        }

        // Update product quantities if the order status is changed to "Delivered"
        if ($request->status == 'Delivered') {

            $total_order = 0;
            $sales = 0;
            $profit = 0;
            $quantity = 0;

            foreach ($order->items as $item) { // Ensure orderItems is not null
                $product = Product::find($item->product_id);

                if ($product) {
                    $product->qty -= $item->quantity; // Decrease product quantity by ordered amount
                    $product->sold += $item->quantity; // Increase sold count by ordered amount
                    $product->save();

                    $quantity += $item->quantity;
                    $total_order += 1;
                    $sales += $product->price * $item->quantity;
                    $profit += ($product->price - $product->price_cost) * $item->quantity;
                }
            }

            if ($statistic_count > 0) {
                $statistic_update = Statistic::where('order_date', $order_date)->first();
                $statistic_update->sales = $statistic_update->sales + $sales;
                $statistic_update->profit = $statistic_update->profit + $profit;
                $statistic_update->quantity = $statistic_update->quantity + $quantity;
                $statistic_update->total_order = $statistic_update->total_order + $total_order;
                $statistic_update->save();
            } else {
                $statistic_new = new Statistic();
                $statistic_new->order_date = $order_date;
                $statistic_new->sales = $sales;
                $statistic_new->profit = $profit;
                $statistic_new->quantity = $quantity;
                $statistic_new->total_order = $total_order;
                $statistic_new->save();
            }

        } elseif ($request->status != 'Delivered' && $request->status = 'Cancelled' && $request->status != 'Out for Delivery' && $request->status != 'Accepted') {
            foreach ($order->items as $item) { // Ensure orderItems is not null
                $product = Product::find($item->product_id);

                if ($product) {
                    $product->qty += $item->quantity; // Decrease product quantity by ordered amount
                    $product->sold -= $item->quantity; // Increase sold count by ordered amount
                    $product->save();
                }
            }
        }

        return response()->json('Thay đổi trạng thái thành công');
    }


    public function update_order_qty(Request $request)
    {
        $data = $request->all();
        $order_items = OrderItem::where('product_id', $data['product_id'])->where('order_code', $data['order_code'])->first();
        $order_items->quantity = $data['quantity'];
        $order_items->save();

    }

    public function cancel_order($id)
    {
        $order = Order::findOrFail($id);

        if ($order->status === 'Cancelled') {
            return response()->json(['message' => 'Đơn hàng đã bị hủy trước đó.'], 400);
        }

        $order->status = 'Cancelled';
        $order->save();

        return response()->json(['message' => 'Đơn hàng đã bị hủy thành công.']);
    }


    public function confirm_order(Request $request)
    {
        // Fetch cart items from session instead of request input
        $cartItems = $request->input('cartItems', []);
        // $cartItems = session('cart', []);

        if (empty($cartItems)) {
            return response()->json(['message' => 'Cart is empty!'], 400);
        }

        $total = 0;
        foreach ($cartItems as $item) {
            $total += $item['price'] * $item['quantity'];
        }

        try {
            // Create the order in the database
            $order = new Order();
            $order->user_id = Auth::id();
            $order->total_price = $total;
            $order->date_deliver = Carbon::now('Asia/Ho_Chi_Minh')->toDateString();
            ;
            $order->payment_method = '1';  // Thanh toán bằng tiền mặt
            $order->status = 'Pending'; // Initial status
            $order->save();

            // Save order items and reduce stock
            foreach ($cartItems as $item) {
                // Find the product
                $product = Product::find($item['product_id']);
                if (!$product || $product->qty < $item['quantity']) {
                    return response()->json(['message' => 'Product stock is insufficient!'], 400);
                }

                // Create order item
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $item['product_id'];
                $orderItem->price = $item['price'];
                $orderItem->quantity = $item['quantity'];
                $orderItem->save();

                // Reduce product stock
                $product->qty -= $item['quantity'];
                $product->save();
            }

            // Update user's reward points
            $user = Auth::user();
            $user->points += floor($total / 1000); // Tiêu 1000 được 1 điểm
            $user->save();

            // Broadcast order completion event
            broadcast(new OrderCompletedEvent($order))->toOthers();

            // Send order confirmation email
            Mail::to($user->email)->send(new OrderInvoiceMail($order));

            // Clear the cart session
            session()->forget('cart');

            return response()->json(['message' => 'Order created successfully!', 'order' => $order], 201);
        } catch (\Exception $e) {
            // General error handling
            return response()->json(['message' => 'An error occurred! ' . $e->getMessage()], 500);
        }
    }


    // public function placeOrder(Request $request)
    // {
    //     $user = Auth::user();
    //     $totalPrice = 0;
    //     $couponDiscount = 0;

    //     // Validate request
    //     $validatedData = $request->validate([
    //         'products' => 'required|array', // Danh sách ID sản phẩm với số lượng
    //         'payment_method' => 'required|string',
    //         'code' => 'nullable|string',
    //     ]);

    //     // Kiểm tra xem phiếu giảm giá có hợp lệ không
    //     if ($request->has('code') && !empty($request->code)) {
    //         $coupon = Coupon::where('code', $request->code)->first();
    //         if (!$coupon) {
    //             return response()->json(['message' => 'Mã phiếu giảm giá không hợp lệ'], 400);
    //         }

    //         if ($coupon->time <= 0) {
    //             return response()->json(['message' => 'Phiếu giảm giá đã được sử dụng hết'], 400);
    //         }
    //     }

    //     // Tính tổng giá sản phẩm
    //     foreach ($request->products as $product_id => $quantity) {
    //         $product = Product::find($product_id);
    //         if (!$product || $product->qty < $quantity) {
    //             return response()->json(['message' => 'Sản phẩm không hợp lệ hoặc không đủ hàng'], 400);
    //         }
    //         $totalPrice += $product->price * $quantity;
    //     }

    //     // Áp dụng giảm giá phiếu giảm giá
    //     if (isset($coupon)) {
    //         if ($coupon->condition === 'percentage') {  // percentage nghĩa là tỷ lệ phần trăm (%)
    //             $couponDiscount = ($totalPrice * $coupon->number) / 100;
    //         } elseif ($coupon->condition === 'fixed') {
    //             $couponDiscount = $coupon->number;
    //         }

    //         $totalPrice -= $couponDiscount;
    //         $coupon->time -= 1; // Giảm số lượng sử dụng phiếu giảm giá
    //         $coupon->save();
    //     }

    //     // Tạo đơn hàng
    //     $order = Order::create([
    //         'user_id' => $user->id,
    //         'total_price' => $totalPrice,
    //         'payment_method' => $request->payment_method,
    //         'date_deliver' => now()->addDays(7), // Ví dụ: Giao hàng trong 7 ngày
    //         'status' => 'pending',
    //     ]);

    //     // Giảm lượng sản phẩm tồn kho và tạo OrderItem
    //     foreach ($request->products as $product_id => $quantity) {
    //         $product = Product::find($product_id);
    //         $product->qty -= $quantity;
    //         $product->save();

    //         $order->orderItems()->create([
    //             'product_id' => $product_id,
    //             'quantity' => $quantity,
    //             'price' => $product->price,
    //         ]);
    //     }

    //     // Cập nhật điểm thưởng cho người dùng
    //     $user->points += floor($totalPrice / 1000); // Tiêu 1000 được 1 điểm
    //     $user->save();

    //     // Phát sự kiện đơn hàng hoàn thành (realtime cho admin)
    //     broadcast(new OrderCompletedEvent($order))->toOthers();

    //     // Gửi email hóa đơn sau khi đặt hàng
    //     Mail::to(auth()->user()->email)->send(new OrderInvoiceMail($order));

    //     return response()->json(['message' => 'Đặt hàng thành công', 'order' => $order]);
    // }


    public function get_order_items_user($id){
        $orders = Order::where('user_id', $id)
        ->with(['items.product' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])
        ->get();

        if ($orders) {
            foreach ($orders as $order) {
                foreach ($order->items as $order_items) {
                    $product = Product::where('id', $order_items->product_id)->pluck('name');
                    $order_items->product_name = $product['0'];
                }
            }
            return response()->json($orders, 200);
        } else {
            return response()->json('No orders found for this user');
        }
    }
}
