<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Project;
use App\Helper\Incentive;
use App\Models\CashPoint;
use App\Models\TaskRevision;
use Illuminate\Http\Request;
use App\Models\IncentiveType;
use App\Models\IncentiveFactor;
use App\Http\Controllers\Controller;
use App\Models\IncentiveCriteria;
use App\Models\ProgressiveIncentive;
use App\View\Components\Forms\Number;

class IncentiveFactorController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = Carbon::parse($request->end_date ?? now())->endOfDay();
        $user_id = $request->user_id ?? null;
        $prevMonthStartDate = $startDate->subMonth()->startOfMonth();
        $prevMonthEndDate = $endDate->subMonth()->endOfMonth();

        $cashPoints = CashPoint::where('user_id', $request->user_id)->whereBetween('created_at', [$startDate, $endDate])->whereNotNull('factor_id')->get();
        $total_points = $cashPoints->sum('total_points_earn') - $cashPoints->sum('total_points_lost');
        $total_previous_assigned_amount = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
        ->where('projects.pm_id', $user_id)
        ->whereBetween('project_milestones.created_at', [Carbon::now()->subMonth()->startOfMonth(), Carbon::now()->subMonth()->endOfMonth()])
        ->where('projects.project_status','Accepted')
        ->sum('cost');

        $incentiveData = IncentiveType::with('incentiveCriterias.incentiveFactors')->get()->map(function($incentiveType) use($request){
            $incentiveType->incentiveCriterias->map(function($incentiveCriteria) use($request){
                if($request->user_id && Carbon::now()->startOfMonth() > Carbon::parse($request->start_date)){
                    $progressiveIncentive = ProgressiveIncentive::where('pm_id', $request->user_id)->whereMonth('date', Carbon::parse($request->start_date)->month)->where('incentive_criteria_id', $incentiveCriteria->id)->first();
                    $incentiveCriteria->acquired_percent = $progressiveIncentive->acquired_value ?? 0;
                    $incentiveCriteria->incentive_amount_type = $progressiveIncentive->incentive_amount_type ?? IncentiveFactor::where('incentive_criteria_id', $incentiveCriteria->id)->first()->incentive_amount_type;
                    $incentiveCriteria->obtained_incentive = $progressiveIncentive->incentive_amount ?? 0;
                    return $incentiveCriteria;
                }elseif($request->user_id){
                    Incentive::progressiveCalculation($incentiveCriteria, $request);
                }else{
                    $incentiveCriteria->acquired_percent = 0;
                    $incentiveCriteria->incentive_amount_type = IncentiveFactor::where('incentive_criteria_id', $incentiveCriteria->id)->first()->incentive_amount_type;
                    $incentiveCriteria->obtained_incentive = 0;
                }
            });
            return $incentiveType;
        });

        $data['total_points'] = $total_points;
        $data['total_previous_assigned_amount'] = $total_previous_assigned_amount;
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
