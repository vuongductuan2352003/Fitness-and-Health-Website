<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Str;
class AuthController extends Controller
{
    // Gửi mã xác thực qua email (bao gồm kiểm tra tên người dùng và ngày sinh)
    public function sendCode(Request $request)
    {
        // Validate email, tên người dùng và ngày sinh
        $t =$request->validate([
            'email' => 'required|email',
            'name' => 'required|string|max:255',
            'birth' => 'required|date', // Kiểm tra định dạng ngày tháng năm sinh
        ]);
    
        // Kiểm tra xem email đã tồn tại chưa
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['success' => false, 'message' => 'Email này đã tồn tại.'], 422);
        }
    
        // Tạo mã xác thực (6 ký tự ngẫu nhiên)
        $code = random_int(100000, 999999);
    
        // Lưu mã xác thực và thông tin người dùng vào Cache (ví dụ 10 phút)
        Cache::put('verification_code_' . $request->email, [
            'code' => $code,
            'name' => $request->name,
            'birth' => $request->birth,
        ], now()->addMinutes(10));
    
        // Gửi email với mã xác thực
        Mail::raw("Your verification code is: $code", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Email Verification Code');
        });
    
        return response()->json(['message' => 'Verification code sent successfully.',$t]);
    }



    // Xác thực mã và tạo tài khoản
    public function verifyCode(Request $request)
    {
        // Validate dữ liệu đầu vào
        $t= $request->validate([
            'email' => 'required|email',
            'code' => 'required|numeric',
        ]);
    
        // Lấy mã xác thực và thông tin người dùng từ Cache
        $cachedData = Cache::get('verification_code_' . $request->email);
    
        // Kiểm tra xem mã xác thực có đúng không
        if ($cachedData && $cachedData['code'] == $request->code) {
            // Tạo tài khoản người dùng
            $user = User::create([
                'name' => $cachedData['name'],
                'email' => $request->email,
                'birth' => $cachedData['birth'], // Lưu ngày tháng năm sinh
                'password' => null, // Chưa có mật khẩu
                'email_verified_at' => now(), // Ghi nhận thời gian xác thực
            ]);
    
            // Xóa mã xác thực khỏi Cache
            Cache::forget('verification_code_' . $request->email);
    
            return response()->json(['success' => true, 'message' => 'Email verified successfully. Please provide your password to complete the registration.']);
        }
    
        return response()->json(['success' => false, 'message' => 'Invalid verification code.',$t], 422);
    }

    // Hàm cập nhật mật khẩu sau khi xác nhận email
    public function setPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed' // Thay đổi điều kiện mật khẩu nếu cần
        ]);
        // Validate mật khẩu
       $t=User::all();
        // Tìm người dùng theo email
        $email = strtolower(trim($request->email));
        $user = User::where('email', $email)->first();
        
          // Ghi lại thông tin để kiểm tra
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'User not found.', $t,$request->email], 404);
    }

        if (!$user || !$user->email_verified_at) {
            return response()->json(['success' => false, 'message' => 'User not found or email not verified.'], 404);
        }

        // Cập nhật mật khẩu
        $user->update([
            'password' => Hash::make($request->password), // Mã hóa mật khẩu
        ]);

        return response()->json(['success' => true, 'message' => 'Password set successfully. You can now login.']);
    }
    public function login(Request $request)
    {
        // Validate request
        $fields = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required'
        ]);
    
        // Find user by email
        $user = User::where('email', $request->email)->first();
    
        // Check password
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 401);
        }
    
        // Create access token
        $token = $user->createToken($user->role);
    
        // Create refresh token
        $refreshToken = $user->refreshTokens()->create([
           'refresh_token' => hash('sha256', Str::random(60)),
            'refresh_token_expires_at' => Carbon::now()->addDay(1), // Thời gian hết hạn 1 ngày
            'is_active' => 1,
        ]);
    
        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken,
            'refresh_token' => $refreshToken,
        ]);
    }
    
    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return[
            'massage' => 'You are logged out.'
        ];


    }
}
