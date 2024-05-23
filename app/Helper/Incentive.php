<?php

namespace App\Helper;

use App\Models\CashPoint;
use App\Models\IncentiveCriteria;
use App\Models\ProgressiveIncentive;

class Incentive
{
    public static function progressiveStore($incentiveCriteriaId, $pm_id, $comparable_value, $now = null)
    {
        try {
            $cashPoints = CashPoint::whereNotNull('factor_id')->get();
            $totalEarnedPoints = $cashPoints->sum('total_points_earn');
            $totalLostPoints = $cashPoints->sum('total_points_lost');
            $availablePoints = $totalEarnedPoints - $totalLostPoints + 500;

            $incentiveCriteria = IncentiveCriteria::with('incentiveFactors')->find($incentiveCriteriaId);
            foreach($incentiveCriteria->incentiveFactors as $incentiveFactor){
                if(($comparable_value == 0 || $incentiveFactor->lower_limit < $comparable_value) && $incentiveFactor->upper_limit >= $comparable_value){
                    ProgressiveIncentive::create([
                        'date' => $now,
                        'pm_id' => $pm_id,
                        'incentive_factor_id' => $incentiveFactor->id,
                        'incentive_amount_type' => $incentiveFactor->incentive_amount_type,
                        'incentive_amount' => $incentiveFactor->incentive_amount,
                        'achieved_points' => $incentiveFactor->incentive_amount_type == 1 ? $incentiveFactor->incentive_amount : ($incentiveFactor->incentive_amount / $availablePoints) * 100,
                    ]);
                }
            }
            return true;
        } catch (\Throwable $th) {
            // throw $th;
            return false;
        }
        
    }
}