<?php

namespace App\Http\Controllers\AutoPriceQuotation;

use Illuminate\Http\Request;
use App\Models\PlatformAccount;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PlatformAccountController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'data' => PlatformAccount::paginate(20)
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|numeric',
            'username' => 'required|string',
            'name' => 'required|string',
            'user_url' => 'required|string',
            'email' => 'required|email',
            'profile_type' => 'required|numeric',
            'generated_on' => 'required',
            'multiplying_factor' => 'required|numeric',
            'confirmation_of_data_accuracy' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()->all()
            ], 422);
        }

        $validated = $validator->validated();
        
        $validated['added_by'] = Auth::user()->id;
        // return $validated;

        try {
            PlatformAccount::create($validated);
            return response()->json([
                'status' => 200,
                'message' => "Platform account created successfully"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => "Something went wrong!"
            ]);
        }
    }

    
    public function show($id)
    {
        return response()->json([
            'status' => 200,
            'data' => PlatformAccount::find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'type' => 'required|numeric',
            'username' => 'required|string',
            'name' => 'required|string',
            'user_url' => 'required|string',
            'email' => 'required|email',
            'profile_type' => 'required|numeric',
            'generated_on' => 'required',
            'multiplying_factor' => 'required|numeric',
            'confirmation_of_data_accuracy' => 'nullable'
        ]);

        try {
            PlatformAccount::where('id', $id)->update($validated);
            return response()->json([
                'status' => 200,
                'message' => "Platform account updated successfully"
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 400,
                'message' => "Something went wrong!"
            ]);
        }
    }
}
