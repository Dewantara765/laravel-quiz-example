<?php

namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\ValidationException;
    use Illuminate\Http\JsonResponse;
    use Validator;


class UserController extends Controller
{
    public function register(Request $request): JsonResponse
        {


            $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'in:admin,user',

        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
            $input['password'] = Hash::make($input['password']);
            $user = User::create($input);

            $success['token'] =  $user->createToken('authToken')->plainTextToken;
            $success['name'] =  $user->name;



            return response()->json([
                'message' => 'User created successfully.',
               
            ], 201);

        }

       public function login(Request $request): JsonResponse
        {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Validation Error.',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'data' => [
                    'token' => $token,
                    'user' => $user,
                    'name' => $user->name,
                    'role' => $user->role
                ]
            ], 200);
        }


        public function logout(Request $request): JsonResponse
        {
            $request->user()->currentAccessToken()->delete();
            return response()->json([
                'message' => 'Logout successful'
            ]);
        }

        public function user(Request $request)
        {
            $user = Auth::user();
            return response()->json([
                'user' => $user,
            ]);
        }
}
