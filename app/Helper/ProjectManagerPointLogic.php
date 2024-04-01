<?php

namespace App\Helper;

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
        if($criteriaId==1){
            foreach ($criteria->factors as $factor) {
                if(eval("return \$factor->lower_limit $factor->lower_limit_condition \$comparable_value;") && eval("return \$factor->upper_limit $factor->upper_limit_condition \$comparable_value;"))
                {
                    $earned_points = $factor->getCalculatedPoints($projectId);
                    break;
                }
            }
        }
        return $earned_points;
    }
}