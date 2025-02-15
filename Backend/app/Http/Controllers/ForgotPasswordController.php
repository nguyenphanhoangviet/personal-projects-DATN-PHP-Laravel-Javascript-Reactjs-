<?php

namespace App\Http\Controllers;

use App\Mail\ForgotPasswordMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ForgotPasswordController extends Controller
{
    // public function sendResetLinkEmail(Request $request)
    // {
    //     $request->validate(['email' => 'required|email']);

    //     $status = Password::sendResetLink(
    //         $request->only('email')
    //     );

    //     return $status === Password::RESET_LINK_SENT
    //         ? response()->json(['message' => 'Reset link sent to your email'])
    //         : response()->json(['error' => 'Unable to send reset link'], 400);
    // }
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        if ($status === Password::RESET_LINK_SENT) {
            $token = Password::createToken($request->user());
            Mail::to($request->email)->send(new ForgotPasswordMail($token, $request->email));
            return response()->json(['message' => 'Reset link sent to your email']);
        }

        return response()->json(['error' => 'Unable to send reset link'], 400);
    }

    public function showResetForm($token)
    {
        return view('auth.passwords.reset', ['token' => $token]);
    }

    public function reset(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $request->validate([
                'email' => 'required|email|exists:users,email',
                'token' => 'required',
                'password' => 'required|min:8',
                'password2' => 'required',
            ]);

        if ($request->password != $request->password2) {
            return response()->json(['error' => 'Password not match'], 400);
        }
        
        if (!$request->email || !$request->token || !$request->password) {
            return response()->json(['error' => 'All fields are required'], 400);
        }
        // Tìm user theo email
        $user = User::where('email', $request->email)->first();
        if ($user) {
            $user->password = Hash::make($request->password);
            $user->save();
            // return response()->json(['message' => 'Password reset successfully.']);
            return view('auth.passwords.success');
        } 

        return response()->json(['error' => 'Invalid token or email.'], 400);
    }
    public function forgot_password(Request $request)
    {
        var_dump($request->all());
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email'])
            : response()->json(['error' => 'Unable to send reset link'], 400);
    }
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required', // Token trong liên kết reset
            'password' => 'required|min:8|confirmed', // confirmed = cần field `password_confirmation`
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            // Dieu huong ve trang login localhost:3000/login-register
            return response()->json([
                'message' => 'Password reset successfully.',
                'redirect_url' => 'localhost:3000/login-register'  // Return the URL to redirect to
            ]);
        }

        return response()->json(['error' => 'Invalid token or email.'], 400);
    }
}