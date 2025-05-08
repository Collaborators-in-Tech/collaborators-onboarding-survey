<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $userData =  $request->validate([
            'email' => ['required','email','unique:users'],
            'name' => 'required',
            'password' => ['required','min:6'],
            
        ]);
        $user = User::create($userData);
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }
    public function login(Request $request){
        $userData =  $request->validate([
            'email' => ['required','email','exists:users'],
            'password' => ['required','min:6'],
            
        ]);
        $user = User::where('email',$userData['email'])->first();
        if(!$user || !Hash::check($userData['password'],$user->password)){
            return response()->json([
                'message' => 'Invalid user data',

            ],401);
        }
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);

    }
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
    public function updatePassword(Request $request){
        $userData = $request->validate([
            'current_password' => ['required'],
            'new_password' => ['required','min:6']
        ]);
        $user = $request->user();

        if (!Hash::check($userData['current_password'], $user->password)) {
            return response()->json([
                'message' => 'Current password is incorrect'
            ], 403);
        }
        $user->update([
            'password' => bcrypt($request->new_password)
        ]);
        return response()->json([
            'message' => 'Password updated successfully!'
        ]);
    }
}
