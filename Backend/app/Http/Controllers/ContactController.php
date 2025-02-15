<?php

namespace App\Http\Controllers;
use App\Events\ContactCreated;
use App\Mail\AdminContactNotification;
use App\Models\Contact;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Mail\ContactSubmittedMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index()
    {
        // Kiểm tra quyền admin
        if (!Auth::user()->role_id(1, 3)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Lấy danh sách tất cả liên hệ
        $contacts = Contact::all();

        return response()->json($contacts, 200);
    }

    public function show($id)
    {
        // Kiểm tra quyền admin
        if (!Auth::user()->role_id(1, 3)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Tìm liên hệ
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        return response()->json($contact, 200);
    }



    // Khách hàng gửi liên hệ
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|digits:10',
            'title' => 'required',
            'message' => 'required|string',
        ]);

        if (!Auth::check()) {
            return response()->json(['error' => 'You must be logged in to submit a contact form.'], 403);
        }


        // Tạo liên hệ mới
        $contact = Contact::create([
            'user_id' => Auth::id() ?? 0,  // Nếu khách hàng đã đăng nhập
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'title' => $request->title,
            'message' => $request->message,
        ]);

        // Gửi email xác nhận cho khách hàng
        Mail::to($request->email)->send(new ContactSubmittedMail($contact));
        // Gửi email thông báo cho admin
        Mail::to('thanntps27233@fpt.edu.vn')->send(new AdminContactNotification($contact));
        event(new ContactCreated($contact));

        return response()->json(['message' => 'Contact submitted successfully', 'contact' => $contact], 201);
    }
// thanntps27233@fpt.edu.vn
    public function destroy($id)
    {
        // Kiểm tra quyền admin
        if (!Auth::user()->role_id(1, 3)) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Tìm liên hệ
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json(['message' => 'Contact not found'], 404);
        }

        // Xóa liên hệ
        $contact->delete();

        return response()->json(['message' => 'Contact deleted'], 200);
    }

}
