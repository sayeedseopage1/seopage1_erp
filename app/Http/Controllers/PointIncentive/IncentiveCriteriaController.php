<?php

namespace App\Http\Controllers\PointIncentive;

use App\Http\Controllers\Controller;
use App\Models\IncentiveCriteria;
use Illuminate\Http\Request;

class IncentiveCriteriaController extends Controller
{
    public function show($id){
        return response()->json([
            'status' => 200,
            'data' => IncentiveCriteria::with('incentiveFactors')->find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $incentiveCriteria = IncentiveCriteria::find($id);
            // $incentiveCriteria->title = $request->title;
            $incentiveCriteria->min_limit = $request->min_limit;
            $incentiveCriteria->max_limit = $request->max_limit;
            $incentiveCriteria->save();

            return response()->json([
                'status' => 200,
                'message' => 'The incentive criteria updated successfully'
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
