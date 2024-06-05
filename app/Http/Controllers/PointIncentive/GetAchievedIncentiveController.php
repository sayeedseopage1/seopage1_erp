<?php

namespace App\Http\Controllers\PointIncentive;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AchievedIncentive;

class GetAchievedIncentiveController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
        $endDate = Carbon::parse($request->end_date ?? now())->endOfDay();
        $user_id = $request->user_id ?? null;

        $achievedIncentives = AchievedIncentive::where('user_id', $user_id)->whereBetween('date', [$startDate,$endDate])->get()->groupBy(function($date) {
            return \Carbon\Carbon::parse($date->date)->format('Y-m-d');
        })->map(function($query) use ($user_id){
            $regularIncentive = $query->where('incentive_type_id', 1)->first();
            $upsaleIncentive = $query->where('incentive_type_id', 2)->first();
            $bonusIncentive = $query->where('incentive_type_id', 3)->first();
            $keys = [];
            $keys['date'] = $regularIncentive->date;
            $keys['regular_points'] = $regularIncentive->acquired_points;
            $keys['actual_points'] = $regularIncentive->incentive_point;
            $keys['upsale_points'] = $upsaleIncentive->incentive_point;
            $keys['bonus_points'] = $bonusIncentive->incentive_point;
            $keys['incentive_amount'] = $query->sum('total_cash_amount');
            $keys['comulative_incentive_amount'] = $query->sum('total_cash_amount') + AchievedIncentive::where('user_id', $user_id)->where('date', '<', $regularIncentive->date)->sum('total_cash_amount');
            return $query->test = $keys;
        });

        $data = collect();

        foreach($achievedIncentives as $achievedIncentive){
            $singleItem = [
                'date' => $achievedIncentive['date'],
                'regular_points' => $achievedIncentive['regular_points'],
                'actual_points' => $achievedIncentive['actual_points'],
                'upsale_points' => $achievedIncentive['upsale_points'],
                'bonus_points' => $achievedIncentive['bonus_points'],
                'incentive_amount' => $achievedIncentive['incentive_amount'],
                'comulative_incentive_amount' => $achievedIncentive['comulative_incentive_amount']
            ];
            $data->push($singleItem);
        }

        return response()->json([
            'status' => 200,
            'data' => $data
        ]);
    }
}
