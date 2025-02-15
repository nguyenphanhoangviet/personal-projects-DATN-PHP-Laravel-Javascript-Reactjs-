<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    //
    public function load_comments(Request $request)
    {
        $product_id = $request->product_id;
        $comments = Comment::where('product_id', $product_id)->where('parent_id', '=', 0)->where('status', 0)->get();
        $comment_reply = Comment::with('product')->where('parent_id', '>', 0)->get();
        return response()->json([
            'comments' => $comments,
            'comment_reply' => $comment_reply
        ], 200);
    }

    public function send_comment(Request $request)
    {
        // Check if the user is authenticated
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Validate input
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create and save the comment
        $comment = new Comment();
        $comment->product_id = $request->product_id;
        $comment->name = $request->name;
        $comment->email = $request->email;
        $comment->message = $request->message;
        $comment->parent_id = 0;
        $comment->user_id = Auth::id();
        $comment->date = Carbon::now();
        $comment->save();

        return response()->json(['message' => 'Comment added successfully'], 201);
    }

    // Thêm bình luận sản phẩm
    public function store(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product_id = $product->id;
        $comment = Comment::create([
            'user_id' => Auth::id(),
            'product_id' => $product_id,
            'message' => $request->message,
        ]);

        return response()->json($comment, 201);
    }

    // Lấy danh sách bình luận của sản phẩm
    public function index()
    {
        $comments = Comment::with('product')->where('parent_id', '=', 0)->orderBy('status', 'DESC')->get();
        $comment_reply = Comment::with('product')->where('parent_id', '>', 0)->get();

        return response()->json([
            'comments' => $comments,
            'comment_reply' => $comment_reply
        ], 200);
    }


    public function allow_comment(Request $request)
    {
        $data = $request->all();
        $comment = Comment::findOrFail($data['id']);
        $comment->status = $data['status'];
        $comment->save();
        return response()->json($comment, 200);

    }

    public function reply_comment(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'product_id' => 'required|integer',
            'message' => 'required|string',
            'parent_id' => 'required|integer', // Parent comment ID
        ]);

        // Create a new comment for the reply
        $comment = new Comment();
        $comment->product_id = $request->product_id;
        $comment->parent_id = $request->parent_id; // Set parent_id as the comment being replied to
        $comment->name = auth()->user()->name;
        $comment->email = auth()->user()->email;
        $comment->message = $request->message;
        $comment->status = 1;  // You can set the status to 1 or any appropriate status
        $comment->user_id = auth()->id();
        $comment->date = Carbon::now();

        // Save the comment
        $comment->save();

        // Return a response with the saved comment
        return response()->json($comment, 201);
    }

    // Xóa bình luận (Admin hoặc người dùng đã đăng)
    public function destroy($id)
    {
        $comment = Comment::find($id);

        if (!$comment || ($comment->user_id != Auth::id() && !Auth::user()->role_id('1,3'))) {
            return response()->json(['message' => 'Unauthorized or comment not found'], 403);
        }

        $comment->delete();
        return response()->json(['message' => 'Comment deleted'], 200);
    }
}
