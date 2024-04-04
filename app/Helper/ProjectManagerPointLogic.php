<?php

namespace App\Helper;

use App\Models\CashPoint;
use App\Models\Criteria;
use App\Models\Project;
use Illuminate\Contracts\Validation\Validator;

class ProjectManagerPointLogic
{
    public static function distribute($criteriaId, $projectId, $comparable_value)
    {
        $criteria = Criteria::with('factors')->find($criteriaId);
        if(!$criteria->factors->count()) return false;
        $project = Project::find($projectId);
        $earned_points = 0;
        $factor_id = null;

        foreach ($criteria->factors as $factor) {
            if(!$factor->status) continue;
            if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$comparable_value;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$comparable_value;"))
            {
                $earned_points = $factor->getCalculatedPoints($projectId);
                $factor_id = $factor->id;
                break;
            }elseif($criteriaId == 2 && $factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<=' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$comparable_value;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$comparable_value;"))){
                $earned_points = $factor->getCalculatedPoints($projectId);
                $factor_id = $factor->id;
                break;
            }
        }
        
        if($earned_points==0) return false;

        try {
            CashPoint::create([
                'user_id' => $project->pm_id,
                'project_id' => $projectId,
                'activity' => 'null',
                'gained_as' => 'Individual',
                'points' => abs($earned_points),
                'total_points_earn' => $earned_points > 0 ? $earned_points : 0,
                'total_points_lost' => $earned_points < 0 ? abs($earned_points) : 0,
                'factor_id' => $factor_id
            ]);
            return true;
        } catch (\Throwable $th) {
            // throw $th;
            return false;
        }
        
    }
}