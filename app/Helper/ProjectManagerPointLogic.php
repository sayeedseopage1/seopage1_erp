<?php

namespace App\Helper;

use App\Models\CashPoint;
use App\Models\Criteria;
use App\Models\Factor;
use App\Models\Project;
use Illuminate\Contracts\Validation\Validator;

class ProjectManagerPointLogic
{
    public static function distribute($criteriaId, $projectId, $comparable_value, $points = null)
    {
        $project = Project::with('deal:id,project_type', 'client:id,name')->find($projectId);
        if(!$project) return false;
        $criteria = Criteria::with(['factors' => function($factor) use ($project){
            return $factor->where('project_type', $project->deal->project_type == 'fixed' ? 1 : 2);
        }])->find($criteriaId);
        if(!$criteria->factors->count()) return false;
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
            }elseif($points){
                $factor_id = $factor->id;
            }
        }
        
        $earned_points = $points ? $points : $earned_points;
        if($earned_points==0) return false;

        try {

            $activity = null;
            
            if($criteriaId == 1){
                $activity = 'Deliverables for project: <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> have been signed!';
            }elseif($criteriaId == 2){
                $activity = 'Your estimated hours for project: <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, from client: <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> has matched the logged hours by '.$comparable_value.'%';
            }elseif($criteriaId == 3){
                $activity = 'Revisions for project: <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, from client: <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> consumed less than '.$comparable_value.'% time of the estimated time';
            }
            
            // <a style="color:blue" href="https://erp.seopage1.net/account/employees/220">Md. Nozib Ud Dowla</a> created the bid Project : <a style="color:blue" href="https://erp.seopage1.net/account/projects/456">Slider Revolution Module for front page HEADER of WP website</a>, Client: <a style="color:blue" href="https://erp.seopage1.net/account/clients/456">Daniel P.</a>Hours logged more than 12%

            // '<a style="color:blue" href="'.route('employees.show',$user_name->id).'">'.$user_name->name . '</a> created the bid Project : <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a>, Client: <a style="color:blue" href="'.route('clients.show',$project->client_id).'">'. $project->client_name->name. '</a>Hours logged '.$value->logged_hours_sales_amount. '%';

            
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