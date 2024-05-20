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
}
