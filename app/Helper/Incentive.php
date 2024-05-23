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
            $incentiveCriteria = IncentiveCriteria::with('incentiveFactors')->find($incentiveCriteriaId);
            $incentiveAmount = 0;
            foreach($incentiveCriteria->incentiveFactors as $incentiveFactor){
                if(($comparable_value == 0 || $incentiveFactor->lower_limit < $comparable_value) && $incentiveFactor->upper_limit >= $comparable_value){
                    ProgressiveIncentive::create([
                        'date' => $now,
                        'pm_id' => $pm_id,
                        'incentive_factor_id' => $incentiveFactor->id,
                        'acquired_value' => $comparable_value,
                        'incentive_amount_type' => $incentiveFactor->incentive_amount_type,
                        'incentive_amount' => $incentiveFactor->incentive_amount
                    ]);
                    $incentiveAmount = $incentiveFactor->incentive_amount;
                    break;
                }
            }
            return $incentiveAmount;
        } catch (\Throwable $th) {
            // throw $th;
            return false;
        }
        
    }
}