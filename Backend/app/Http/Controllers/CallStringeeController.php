<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Firebase\JWT\JWT;

class CallStringeeController extends Controller
{
    public function generateToken(Request $request)
    {
        // Define API keys from environment variables
        $apiKeySid = env('API_KEY_SID');
        $apiKeySecret = env('API_KEY_SECRET');

        // Get the authenticated user
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $now = time();
        $header = ['cty' => 'stringee-api;v=1'];
        $payload = [
            'jti' => $apiKeySid . '-' . $now,
            'iss' => $apiKeySid,
            'exp' => $now + 3600, // Token expiration time (1 hour)
            'userId' => $user->id // Or $user->username, depending on your use case
        ];

        // Encode the JWT token using Firebase JWT
        $jwt = JWT::encode($payload, $apiKeySecret, 'HS256', null, $header);

        // Return the JWT token as a JSON response
        return response()->json(['access_token' => $jwt])
            ->header('Access-Control-Allow-Origin', '*');
    }
}
