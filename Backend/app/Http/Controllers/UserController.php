<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

class UserController extends Controller
{
    //
    // public function __construct()
    // {
    //     $list_categories = Category::where('status', '=', '1')
    //         ->where('showHome', 'Yes')->orderBy('sort_order')->get();

    //     $list_brands = Brand::where('status', '=', '1')->get();

    //     \View::share([
    //         'list_categories' => $list_categories,

    //         'list_brands' => $list_brands,
    //     ]);
    // }

    public function index()
    {
        $users = User::orderBy('created_at', 'DESC')->paginate(10);
        return response()->json($users, 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user) {
            return response()->json($user, 200);
        } else
            return response()->json('user not found');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:users,name',
                'image' => 'required|file|image|mimes:jpeg,png,gif,webp|max:2048',
                'email' => 'required|email|unique:users,email',
                'phone' => 'required',
                'address' => 'required',
                'lock' => 'nullable',
                'points' => 'nullable',
                'role_id' => 'required',
                'password' => 'required|min:8',

            ]);

            $user = new User();

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move('assets/uploads/user/', $filename);
                $user->image = $filename;
            }

            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->address = $request->address;
            $user->lock = $request->lock;
            $user->points = $request->points;
            $user->role_id = $request->role_id;
            $user->password = $request->password;


            $user->save();
            return response()->json('user added', 201);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }
    public function update($id, Request $request)
    {
        try {
            $validated = $request->validate([
                'image' => 'nullable|file|image|mimes:jpeg,png,gif,webp|max:2048',
                'email' => 'nullable|email|unique:users,email,' . $id,
                'name' => 'nullable|string|unique:users,name,' . $id,
                'phone' => 'nullable|max:10|min:0|unique:users,phone,' . $id,
                'address' => 'nullable|string',
                'lock' => 'nullable',
                'points' => 'nullable|integer',
                'role_id' => 'nullable|integer',
                'password' => 'nullable|min:8',
            ]);

            $user = User::find($id);

            if (!$user) {
                return response()->json('user not found', 404);
            }

            if ($request->hasFile('image')) {
                // Delete the existing image if it exists
                $path = 'assets/uploads/user/' . $user->image;
                if (File::exists($path)) {
                    File::delete($path); // Delete the old image
                }
                // Save the new image
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move('assets/uploads/user/', $filename);
                $user->image = $filename; // Update image field in the brand
            }

            if ($request->has('name')) {
                $user->name = $request->input('name');
            }
            if ($request->has('email')) {
                $user->email = $request->input('email');
            }
            if ($request->has('phone')) {
                $user->phone = $request->input('phone');
            }
            if ($request->has('address')) {
                $user->address = $request->input('address');
            }
            if ($request->has('lock')) {
                $user->lock = $request->input('lock');
            }
            if ($request->has('points')) {
                $user->points = $request->input('points');
            }
            if ($request->has('role_id')) {
                $user->role_id = $request->input('role_id');
            }
            if ($request->has('password')) {
                $user->password = app('hash')->make($request->input('password'));
            }

            $user->save();

            return response()->json('user updated', 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function destroy($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return response()->json('user deleted');
        } else
            return response()->json('user not found');
    }

    public function change_user_lock($id,Request $request){
        $user= User::find($id);
        if($user){
            $user->update(['lock' =>$request->lock]);
            return response()->json('Lock change successfully');
        } else return response()->json('Order was not found');
    }

    public function change_user_info(Request $request)
    {
        try {
            var_dump($request->all());
            // 3 fields name, email, phone
            $validated = $request->validate([
                'name' => 'required',
                'email' => 'required|email',
                'phone' => 'required',
                'image' => 'nullable|image|image|mimes:jpeg,png,gif,webp|max:2048',
            ]);

            $user = User::find($request->id);

            if (!$user) {
                return response()->json('user not found', 404);
            }

            // Handle image update
            if ($request->hasFile('image')) {
                // Delete the existing image if it exists
                $path = 'assets/uploads/user/' . $user->image;
                if (File::exists($path)) {
                    File::delete($path); // Delete the old image
                }

                // Save the new image
                $file = $request->file('image');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move('assets/uploads/user/', $filename);
                $user->image = $filename; // Update image field in the brand
            } 

            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            return response()->json('user updated', 200);

        } catch (Exception $e) {
            return response()->json($e, 500);
        }
    } 

    public function change_user_password(Request $request){
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'password' => 'required|min:8',       // Current password
                'newPassword' => 'required|min:8',    // New password
                'confirmPassword' => 'required|min:8' // Confirm new password
            ]);
    
            $user = User::find($request->id);
    
            if (!$user) {
                return response()->json('User not found', 404);
            }
    
            // Check if the current password is correct
            if (!app('hash')->check($request->input('password'), $user->password)) {
                return response()->json('Current password is incorrect', 400);
            }
    
            // Check if new password matches confirm password
            if ($request->newPassword !== $request->confirmPassword) {
                return response()->json('New password and confirm password do not match', 400);
            }
    
            // Hash the new password and save it
            $user->password = app('hash')->make($request->input('newPassword'));
            $user->save();
    
            return response()->json('Password updated successfully', 200);
    
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }

}
