<?php

namespace App\Helper;

use Carbon\Carbon;
use App\Models\Factor;
use App\Models\Project;
use App\Models\Criteria;
use App\Models\CashPoint;
use Illuminate\Contracts\Validation\Validator;

class ProjectManagerPointLogic
{
    public static function distribute($criteriaId, $projectId, $comparable_value, $points = null, $activity = null)
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
            }elseif($criteriaId == 2 && $factor->lower_limit_condition == '>' && $factor->upper_limit_condition == '<' && (eval("return \$factor->lower_limit $factor->lower_limit_condition \$comparable_value;") || eval("return \$factor->upper_limit $factor->upper_limit_condition \$comparable_value;"))){
                $earned_points = $factor->getCalculatedPoints($projectId);
                $factor_id = $factor->id;
                break;
            }elseif($points){
                $factor_id = $factor->id;
            }
        }
        
        $earned_points = $points ? $points : $earned_points;
        $created_at = now();
        if($earned_points==0) return false;

        try {
            if($criteriaId == 1){
                $activity = 'Deliverables for project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> (Client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a>) have been signed!';
            }elseif($criteriaId == 2){
                $activity = 'Your estimated hours for project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> has matched the logged hours by '.$comparable_value.'%';
            }elseif($criteriaId == 3){
                $activity = 'Revisions for project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> consumed less than '.$comparable_value.'% time of the estimated time';
            }elseif($criteriaId == 5){
                $activity = 'You completed the project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a>';
            }elseif($criteriaId == 6){
                $activity = 'You have created first tasks for the project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> at the first '.$comparable_value.' hours';
            }elseif($criteriaId == 7){
                $activity = 'The deadline for the project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> has been met!';
            }elseif($criteriaId == 9){
                $activity = 'You completed '.$comparable_value.' projects in the first 7 days!';
                $created_at = Carbon::now()->subMonth()->endOfMonth();
            }elseif($criteriaId == 10){
                $activity = 'You completed '.$comparable_value.' projects in the first 12 days!';
                $created_at = Carbon::now()->subMonth()->endOfMonth();
            }elseif($criteriaId == 11){
                $activity = 'First submission for project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> is made within 100 hours after the project started!';
            }elseif($criteriaId == 17){
                // $activity = 'You crossed '.$comparable_value.' billable hours for your hourly projects this week!';
            }elseif($criteriaId == 19){
                $activity = 'First submission for project <a style="color:blue" href="'.route('projects.show',$project->id).'">'.$project->project_name. '</a> from client <a style="color:blue" href="'.route('clients.show', $project->client->id).'">'. $project->client->name. '</a> is made within 100 hours after the project started!';
            }
            
            CashPoint::create([
                'user_id' => $project->pm_id,
                'project_id' => $projectId,
                'activity' => $activity??'N/A',
                'gained_as' => 'Individual',
                'points' => abs($earned_points),
                'total_points_earn' => $earned_points > 0 ? $earned_points : 0,
                'total_points_lost' => $earned_points < 0 ? abs($earned_points) : 0,
                'factor_id' => $factor_id,
                'created_at' => $created_at,
                'updated_at' => $created_at
            ]);
            return true;
        } catch (\Throwable $th) {
            // throw $th;
            return false;
        }
        
    }
}