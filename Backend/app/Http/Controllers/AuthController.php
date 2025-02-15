<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterValid;
use App\Mail\WelcomeMail;
use App\Models\User;
use App\Rules\Captcha;
use Illuminate\Support\Facades\Mail;
use Illuminate\Auth\Events\Registered;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Validator;


class AuthController extends Controller
{

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register()
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            // 'password' => 'required|min:8',
            'password' => 'required|min:8|same:password2',
            'password2' => 'required|min:8',
            'g-recaptcha-response' => new Captcha(),

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = new User;
        $user->name = request()->name;
        $user->email = request()->email;
        $user->phone = request()->phone;
        $user->password = bcrypt(request()->password);

        $user->save();

        // Generate a JWT token for the user
        $token = JWTAuth::fromUser($user);

        // Trigger Registered event for sending emails, etc.
        // event(new Registered($user));

        // Send email after registration
        Mail::to($user->email)->send(new WelcomeMail($user));

        return response()->json([
            'message' => 'Đăng ký hoàn tất!',
            'user' => $user,
            'token' => $token
        ],201);
    }


    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        if ($user->id_role == 1) {
            // Redirect to admin
            return response()->json([
                'message' => 'Welcome Admin',

                'token' => $token
            ]);
        } else if ($user->id_role == 2) {
            // Redirect to website
            return response()->json([
                'message' => 'Welcome to the website',

                'token' => $token
            ]);
        } else if ($user->id_role == 3) {
            // Redirect to admin
            return response()->json([
                'message' => 'Welcome Admin',

                'token' => $token
            ]);
        }
        return $this->respondWithToken($token);

    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function your_profile()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Successfully logged out',
            'redirect_url' => '/',
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


}
