<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Redirect;
use Session;
use Mail;

class CouponController extends Controller
{
    //
    public function index()
    {
        $coupons = Coupon::orderby('id', 'DESC')->paginate(10);
        return response()->json($coupons);
    }

    public function store(Request $request)
    {

        try {
            $request->merge([
                'date_start' => Carbon::createFromFormat('d/m/Y', $request->date_start)->format('d/m/Y'),
                'date_end' => Carbon::createFromFormat('d/m/Y', $request->date_end)->format('d/m/Y'),
            ]);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['date_format' => 'Invalid date format. Use dd/MM/yyyy']], 422);
        }

        // Validate the request
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'number' => 'required|integer|min:1',
            'code' => 'required|string|max:255|unique:coupons,code',
            'time' => 'required|integer|min:1',
            'condition' => 'required|integer|in:1,2',
            'date_start' => 'required|string', // Thay vì date, hãy để nó là string
            'date_end' => 'required|string',
            'status' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Tạo mới một Coupon
        $coupon = Coupon::create($request->only([
            'user_id',
            'name',
            'number',
            'code',
            'time',
            'condition',
            'date_start',  // Lưu chuỗi ngày
            'date_end',    // Lưu chuỗi ngày
            'status'
        ]));

        return response()->json([
            'message' => 'Coupon created successfully',
            'coupon' => $coupon
        ], 201);
    }



    public function show($id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json(['message' => 'Coupon not found'], 404);
        }

        return response()->json($coupon);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json(['message' => 'Coupon not found'], 404);
        }

        try {
            $request->merge([
                'date_start' => Carbon::createFromFormat('d/m/Y', $request->date_start)->format('d/m/Y'),
                'date_end' => Carbon::createFromFormat('d/m/Y', $request->date_end)->format('d/m/Y'),
            ]);
        } catch (\Exception $e) {
            return response()->json(['errors' => ['date_format' => 'Invalid date format. Use dd/MM/yyyy']], 422);
        }

        // Validate the request
        $validator = Validator::make($request->all(), [
            'user_id' => 'sometimes|required|exists:users,id',
            'name' => 'sometimes|required|string|max:255',
            'number' => 'sometimes|required|integer',
            'code' => 'sometimes|required|string|max:255|unique:coupons,code,' . $coupon->id,
            'time' => 'sometimes|required|integer',
            'condition' => 'sometimes|required|integer',
            'date_start' => 'sometimes',
            'date_end' => 'sometimes|after_or_equal:date_start',
            'status' => 'sometimes|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $coupon->user_id = $request->user_id;
        $coupon->name = $request->name;
        $coupon->number = $request->number;
        $coupon->code = $request->code;
        $coupon->time = $request->time;
        $coupon->condition = $request->condition;
        $coupon->date_start = $request->date_start;
        $coupon->date_end = $request->date_end;
        $coupon->status = $request->status;
        $coupon->save();

        return response()->json(['message' => 'Coupon updated successfully', 'coupon' => $coupon]);
    }

    public function destroy($id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json(['message' => 'Coupon not found'], 404);
        }

        $coupon->delete();

        return response()->json(['message' => 'Coupon deleted successfully']);
    }

    public function update_status(Request $request)
    {
        $data = $request->all();
        $coupon = Coupon::findOrFail($data['id']);
        $coupon->status = $data['status'];
        $coupon->save();
        return response()->json($coupon, 200);

    }

    public function check_coupon(Request $request)
    {
        $today = Carbon::now('Asia/Ho_Chi_Minh')->format('d/m/Y');
        $couponCode = $request->input('coupon');
        $userId = Auth::id();

        // Step 1: Check if user is logged in and if the coupon has been used
        if ($userId) {
            $coupon = Coupon::where('code', $couponCode)
                ->where('used', 'LIKE', '%' . $userId . '%')
                ->where('status', 1)
                ->where('date_end', '>=', $today)
                ->first();

            if ($coupon) {
                return response()->json([
                    'success' => false,
                    'used' => true,
                    'message' => 'Mã giảm giá đã sử dụng, vui lòng nhập mã khác',
                ]);
            }
        }

        // Step 2: Find an active, non-expired coupon
        $coupon = Coupon::where('code', $couponCode)
            ->where('status', 1)
            ->where('date_end', '>=', $today)
            ->first();

        if ($coupon) {

            $couponSession = Session::get('coupon', []);

            // Check if the coupon is already in the session
            $isAvailable = collect($couponSession)->contains('code', $couponCode);

            if (!$isAvailable) {
                // Add the coupon details to the session if it's not already there
                $couponSession[] = [
                    'code' => $coupon->code,
                    'condition' => $coupon->condition,
                    'number' => $coupon->number,
                    'used' => $coupon->used,
                ];
                Session::put('coupon', $couponSession);
                Session::save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Thêm mã giảm giá thành công',
                'coupon' => $coupon,
            ]);

        } else {
            return response()->json([
                'success' => false,
                'message' => 'Mã giảm giá không hợp lệ hoặc đã hết hạn',
            ]);
        }

        // Step 3: Handle adding the coupon to the session

    }

    public function send_mail_user_vip_coupon(Request $request){
        $data = $request->all();
        $user_vip = User::where('points','>=','1000')->get();
        $now = Carbon::now('Asia/Ho_Chi_Minh')->format('d-m-Y H:i:s');
        $title_mail = "Mã khuyến mãi ngày".' '.$now;
        foreach ($user_vip as $vip) {
            $email_data = [
                'email' => $vip->email,
                'name' => $vip->name,
                'coupon' => $data,
            ];

            try {
                Mail::send('emails.send-user-vip-coupon', $email_data, function ($message) use ($title_mail, $email_data) {
                    $message->to($email_data['email'])->subject($title_mail);
                    $message->from('thanntps27233@fpt.edu.vn', 'Nhà thuốc Yên Tâm');
                });
            } catch (\Exception $e) {
                \Log::error('Failed to send email to ' . $data['email'] . ': ' . $e->getMessage());
            }
        }

        return response()->json(['message' => 'Gửi mã khuyến mãi khách Vip thành công!']);
    }

    public function send_mail_user_coupon(Request $request){
        $data = $request->all();
        $user = User::where('points','<','1000')->get();
        $now = Carbon::now('Asia/Ho_Chi_Minh')->format('d-m-Y H:i:s');
        $title_mail = "Mã khuyến mãi ngày".' '.$now;
        foreach ($user as $normal) {
            $email_data = [
                'email' => $normal->email,
                'name' => $normal->name,
                'coupon' => $data,
            ];

            try {
                Mail::send('emails.send-user-coupon', $email_data, function ($message) use ($title_mail, $email_data) {
                    $message->to($email_data['email'])->subject($title_mail);
                    $message->from('thanntps27233@fpt.edu.vn', 'Nhà thuốc Yên Tâm');
                });
            } catch (\Exception $e) {
                \Log::error('Failed to send email to ' . $email_data['email'] . ': ' . $e->getMessage());
            }
        }

        return response()->json(['message' => 'Gửi mã khuyến mãi khách thường thành công!']);
    }
}
