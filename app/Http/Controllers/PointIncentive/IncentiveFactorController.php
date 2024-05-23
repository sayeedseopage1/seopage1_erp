<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use App\Models\Task;
use App\Helper\Incentive;
use App\Models\TaskRevision;
use Illuminate\Http\Request;
use App\Models\IncentiveType;
use App\Models\IncentiveFactor;
use App\Http\Controllers\Controller;

class IncentiveFactorController extends Controller
{
    public function index()
    {
        $total_points = 500;
        $incentiveData = IncentiveType::with('incentiveCriterias.incentiveFactors')->get()->map(function($incentiveType){
            $incentiveType->incentiveCriterias->map(function($incentiveCriteria){
                Incentive::progressiveCalculation($incentiveCriteria, $incentiveCriteria->acquired_percent);
            });
            return $incentiveType;
        });

        $data['total_points'] = $total_points;
        $data['incentive_data'] = $incentiveData;

        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        try {
            $referenceFactor = IncentiveFactor::where('incentive_criteria_id', $request->incentive_criteria_id)->first();
            IncentiveFactor::create([
                'incentive_criteria_id' => $request->incentive_criteria_id,
                'limit_type' => $referenceFactor->limit_type,
                'lower_limit' => $request->lower_limit,
                'upper_limit' => $request->upper_limit,
                'incentive_amount_type' => $referenceFactor->incentive_amount_type,
                'incentive_amount' => $request->incentive_amount,
            ]);

            return response()->json([
                'status' => 200,
                'message' => 'The incentive factor created successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 400,
                'message' => 'Something went wrong!'
            ]);
        }
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        try {
            $incentiveFactor = IncentiveFactor::find($id);
            $incentiveFactor->lower_limit = $request->lower_limit;
            $incentiveFactor->upper_limit = $request->upper_limit;
            $incentiveFactor->incentive_amount_type = $request->incentive_amount_type;
            $incentiveFactor->incentive_amount = $request->incentive_amount;
            $incentiveFactor->save();

            return response()->json([
                'status' => 200,
                'message' => 'The incentive factor created successfully'
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'status' => 400,
                'message' => 'Something went wrong!'
            ]);
        }
    }

    public function destroy($id)
    {
        try {
            $id = "4";
            IncentiveFactor::where('id', $id)->delete();
            return response()->json([
                'status' => 200,
                'message' => 'The incentive factor deleted successfully'
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
