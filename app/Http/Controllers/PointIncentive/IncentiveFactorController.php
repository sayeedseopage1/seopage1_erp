<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\TaskRevision;
use Illuminate\Http\Request;
use App\Models\IncentiveType;
use App\Models\IncentiveFactor;
use App\Models\IncentiveCriteria;
use App\Http\Controllers\Controller;
use App\View\Components\Auth;
use PayPal\Api\Incentive;

class IncentiveFactorController extends Controller
{
    public function index()
    {
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $total_points = 500;
        $incentiveData = IncentiveType::with('incentiveCriterias.incentiveFactors')->get()->map(function($incentiveType) use ($startDate, $endDate){
            $incentiveType->incentiveCriterias->map(function($incentiveCriteria) use ($startDate, $endDate){
                
                $incentiveCriteria->acquired_percent = 0; 
                $incentiveCriteria->obtained_incentive = 0;
                $user_id = 209;
                if($incentiveCriteria->id == 1){
                    $total_tasks = Task::select('tasks.id')
                    ->where('tasks.added_by', $user_id)
                    ->whereBetween('tasks.created_at', [$startDate, $endDate])
                    ->count();
                    
                    $pm_revisions = TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                    ->where('projects.pm_id', $user_id)
                    ->where('task_revisions.final_responsible_person','PM')
                    ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                    ->count();

                    $incentiveCriteria->acquired_percent = number_format(( $pm_revisions / $total_tasks ) * 100, 2);

                    foreach($incentiveCriteria->incentiveFactors as $factor){
                        if(($incentiveCriteria->acquired_percent == 0 || $factor->lower_limit < $incentiveCriteria->acquired_percent) && $factor->upper_limit >= $incentiveCriteria->acquired_percent) {
                            $incentiveCriteria->obtained_incentive = $factor->incentive_amount;
                            break;
                        }
                    }
                }
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
                'message' => 'The incentive factor updated successfully'
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
            $incentiveFactor = IncentiveFactor::where('id', $id)->delete();

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
