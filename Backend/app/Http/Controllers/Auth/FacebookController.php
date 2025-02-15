<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Social;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Session;

class FacebookController extends Controller
{
    //
    public function login_facebook(){
        return Socialite::driver('facebook')->stateless()->redirect();
    }

    public function callback_facebook(){
        $provider = Socialite::driver('facebook')->user();
        $account = Social::where('provider','facebook')->where('provider_user_id',$provider->getId())->first();
        if($account){
            //login in vao trang quan tri
            $account_name = User::where('id',$account->user_id)->first();
            Session::put('name',$account_name->name);
            Session::put('id',$account_name->id);
            $token = JWTAuth::fromUser($account_name);
            // return response()->json([
            //     'user' => $account_name,
            //     'token' => $token,
            //     'message' =>'đăng nhập Admin bằng facebook thành công'
            // ]);
            return redirect()->to("http://localhost:3000/?token={$token}");
        }else{

            $than = new Social([
                'provider_user_id' => $provider->getId(),
                'provider' => 'facebook'
            ]);

            $orang = User::where('email',$provider->getEmail())->first();

            if(!$orang){
                $orang = User::create([
                    'name' => $provider->getName(),
                    'email' => $provider->getEmail(),
                    'password' => '',
                    'phone' => '0000000000'

                ]);
            }
            $than->login()->associate($orang);
            $than->save();

            $account_name = User::where('id',$than->user_id)->first();
            Session::put('name',$account_name->name);
            Session::put('id',$account_name->id);
            return $than;
        }
    }

}
