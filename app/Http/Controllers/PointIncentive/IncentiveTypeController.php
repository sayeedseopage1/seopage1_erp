<?php

namespace App\Http\Controllers\PointIncentive;

use Illuminate\Http\Request;
use App\Models\IncentiveType;
use App\Http\Controllers\Controller;

class IncentiveTypeController extends Controller
{
    public function index()
    {
        return response()->json([
            'status' => 200,
            'data' => IncentiveType::get()
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $incentiveType = IncentiveType::find($id);
            $incentiveType->title = $request->title;
            $incentiveType->cash_value = $request->cash_value;
            $incentiveType->save();

            return response()->json([
                'status' => 200,
                'message' => 'The incentive type updated successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 400,
                'message' => 'Something went wrong!'
            ]);
        }
    }
}
