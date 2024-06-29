<?php

namespace App\Http\Controllers\PointIncentive;

use App\Models\Factor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GetCriteriaWiseFactorController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $id)
    {
        return response()->json([
            'status'=> 200,
            'data' => Factor::where('criteria_id', $id)->first()
        ]);
    }
}
