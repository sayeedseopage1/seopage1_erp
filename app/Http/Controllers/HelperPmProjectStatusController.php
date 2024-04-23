<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Deal;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\ProjectPmGoal;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\ProjectMilestone;

class HelperPmProjectStatusController extends AccountBaseController
{
    public function ProjectPmGoalCreation($pmGoalSetting,$findDeal, $findProject){
        $deal = Deal::where('id',$findDeal->id)->first();
        $milestone_count= ProjectMilestone::where('project_id',$findProject->id)->count();
        if($pmGoalSetting->name == 'Regular'){
            $p_pm_regular_goal = new ProjectPmGoal();
            $p_pm_regular_goal->project_id = $findProject->id;
            $p_pm_regular_goal->client_id = $findDeal->client_id;
            $p_pm_regular_goal->pm_id = $findDeal->pm_id;
            $p_pm_regular_goal->project_type = $findDeal->project_type;
            $p_pm_regular_goal->project_category = 'Regular';
            $p_pm_regular_goal->goal_code = 'DCS';
            $p_pm_regular_goal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
            $p_pm_regular_goal->goal_type = 'deliverable_signed_by_client';
            if ($deal->released_at != null) {
                $p_pm_regular_goal->goal_start_date = $deal->released_at;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(3);
            }
            $p_pm_regular_goal->duration = 3;
            $p_pm_regular_goal->added_by = Auth::user()->id;
            $p_pm_regular_goal->save();

            $p_pm_regular_goal = new ProjectPmGoal();
            $p_pm_regular_goal->project_id = $findProject->id;
            $p_pm_regular_goal->client_id = $findDeal->client_id;
            $p_pm_regular_goal->pm_id = $findDeal->pm_id;
            $p_pm_regular_goal->project_type = $findDeal->project_type;
            $p_pm_regular_goal->project_category = 'Regular';
            $p_pm_regular_goal->goal_code = 'TSM';
            $p_pm_regular_goal->goal_name = '1st submission has to be made';
            $p_pm_regular_goal->goal_type = '1st_task_submissino';
            if ($deal->released_at != null) {
                $p_pm_regular_goal->goal_start_date = $deal->released_at;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
            }
            $p_pm_regular_goal->duration = 7;
            $p_pm_regular_goal->added_by = Auth::user()->id;
            $p_pm_regular_goal->save();

            $p_pm_regular_goal = new ProjectPmGoal();
            $p_pm_regular_goal->project_id = $findProject->id;
            $p_pm_regular_goal->client_id = $findDeal->client_id;
            $p_pm_regular_goal->pm_id = $findDeal->pm_id;
            $p_pm_regular_goal->project_type = $findDeal->project_type;
            $p_pm_regular_goal->project_category = 'Regular';
            $p_pm_regular_goal->goal_code = 'FPMR';
            $p_pm_regular_goal->goal_name = 'At least 50% of the milestones have to be released';
            $p_pm_regular_goal->goal_type = '50%_milestone_value_released';
            if ($deal->released_at != null) {
                $p_pm_regular_goal->goal_start_date = $deal->released_at;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
            };
            $p_pm_regular_goal->duration = 12;
            $p_pm_regular_goal->added_by = Auth::user()->id;
            $p_pm_regular_goal->save();
            if($milestone_count > 1)
            {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = 'MPMR';
                $p_pm_regular_goal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $p_pm_regular_goal->goal_type = 'more_milestone_released';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(15);
                }
                $p_pm_regular_goal->duration = 15;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }
            if($milestone_count > 2)
            {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = 'MMPMR';
                $p_pm_regular_goal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $p_pm_regular_goal->goal_type = 'more_and_more_milestone_released';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(22);
                }
                $p_pm_regular_goal->duration = 22;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
                
            }
            if($milestone_count > 3)
            {
                
            $p_pm_regular_goal = new ProjectPmGoal();
            $p_pm_regular_goal->project_id = $findProject->id;
            $p_pm_regular_goal->client_id = $findDeal->client_id;
            $p_pm_regular_goal->pm_id = $findDeal->pm_id;
            $p_pm_regular_goal->project_type = $findDeal->project_type;
            $p_pm_regular_goal->project_category = 'Regular';
            $p_pm_regular_goal->goal_code = 'LM';
            $p_pm_regular_goal->goal_name = 'This 1 more milestone need to be released until the completion of the project following every 7 days';
            $p_pm_regular_goal->goal_type = 'last_milestone';
            if ($deal->released_at != null) {
                $p_pm_regular_goal->goal_start_date = $deal->released_at;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(29);
            }
            $p_pm_regular_goal->duration = 29;
            $p_pm_regular_goal->added_by = Auth::user()->id;
            $p_pm_regular_goal->save();


            }
               

        }elseif($pmGoalSetting->name == 'Priority'){
            $pPmPriorityGoal = new ProjectPmGoal();
            $pPmPriorityGoal->project_id = $findProject->id;
            $pPmPriorityGoal->client_id = $findDeal->client_id;
            $pPmPriorityGoal->pm_id = $findDeal->pm_id;
            $pPmPriorityGoal->project_type = $findDeal->project_type;
            $pPmPriorityGoal->project_category = 'Priority';
            $pPmPriorityGoal->goal_code = 'DCS';
            $pPmPriorityGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
            $pPmPriorityGoal->goal_type = 'deliverable_signed_by_client';
            if ($deal->released_at != null) {
                $pPmPriorityGoal->goal_start_date = $deal->released_at;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(3);
            }
            $pPmPriorityGoal->duration = 3;
            $pPmPriorityGoal->added_by = Auth::user()->id;
            $pPmPriorityGoal->save();

            $pPmPriorityGoal = new ProjectPmGoal();
            $pPmPriorityGoal->project_id = $findProject->id;
            $pPmPriorityGoal->client_id = $findDeal->client_id;
            $pPmPriorityGoal->pm_id = $findDeal->pm_id;
            $pPmPriorityGoal->project_type = $findDeal->project_type;
            $pPmPriorityGoal->project_category = 'Priority';
            $pPmPriorityGoal->goal_code = 'TSM';
            $pPmPriorityGoal->goal_name = '1st submission has to be made';
            $pPmPriorityGoal->goal_type = '1st_task_submissino';
            if ($deal->released_at != null) {
                $pPmPriorityGoal->goal_start_date = $deal->released_at;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(4);
            }
            $pPmPriorityGoal->duration = 4;
            $pPmPriorityGoal->added_by = Auth::user()->id;
            $pPmPriorityGoal->save();

            $pPmPriorityGoal = new ProjectPmGoal();
            $pPmPriorityGoal->project_id = $findProject->id;
            $pPmPriorityGoal->client_id = $findDeal->client_id;
            $pPmPriorityGoal->pm_id = $findDeal->pm_id;
            $pPmPriorityGoal->project_type = $findDeal->project_type;
            $pPmPriorityGoal->project_category = 'Priority';
            $pPmPriorityGoal->goal_code = 'FMR';
            $pPmPriorityGoal->goal_name = '1st milestone has to be released';
            $pPmPriorityGoal->goal_type = '1st_milestone_released';
            if ($deal->released_at != null) {
                $pPmPriorityGoal->goal_start_date = $deal->released_at;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
            }
            $pPmPriorityGoal->duration = 7;
            $pPmPriorityGoal->added_by = Auth::user()->id;
            $pPmPriorityGoal->save();
            if($milestone_count > 1)
            {
                $pPmPriorityGoal = new ProjectPmGoal();
                $pPmPriorityGoal->project_id = $findProject->id;
                $pPmPriorityGoal->client_id = $findDeal->client_id;
                $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                $pPmPriorityGoal->project_type = $findDeal->project_type;
                $pPmPriorityGoal->project_category = 'Priority';
                $pPmPriorityGoal->goal_code = 'MPMR';
                $pPmPriorityGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                $pPmPriorityGoal->goal_type = 'more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmPriorityGoal->goal_start_date = $deal->released_at;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $pPmPriorityGoal->duration = 12;
                $pPmPriorityGoal->added_by = Auth::user()->id;
                $pPmPriorityGoal->save();
    

            }
            if($milestone_count > 2)
            {
                $pPmPriorityGoal = new ProjectPmGoal();
                $pPmPriorityGoal->project_id = $findProject->id;
                $pPmPriorityGoal->client_id = $findDeal->client_id;
                $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                $pPmPriorityGoal->project_type = $findDeal->project_type;
                $pPmPriorityGoal->project_category = 'Priority';
                $pPmPriorityGoal->goal_code = 'MMPMR';
                $pPmPriorityGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmPriorityGoal->goal_type = 'more_and_more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmPriorityGoal->goal_start_date = $deal->released_at;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(15);
                }
                $pPmPriorityGoal->duration = 15;
                $pPmPriorityGoal->added_by = Auth::user()->id;
                $pPmPriorityGoal->save();

            }
            if($milestone_count > 3)
            {
                $pPmPriorityGoal = new ProjectPmGoal();
                $pPmPriorityGoal->project_id = $findProject->id;
                $pPmPriorityGoal->client_id = $findDeal->client_id;
                $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                $pPmPriorityGoal->project_type = $findDeal->project_type;
                $pPmPriorityGoal->project_category = 'Priority';
                $pPmPriorityGoal->goal_code = 'LM';
                $pPmPriorityGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmPriorityGoal->goal_type = 'last_milestone';
                if ($deal->released_at != null) {
                    $pPmPriorityGoal->goal_start_date = $deal->released_at;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(22);
                }
                $pPmPriorityGoal->duration = 22;
                $pPmPriorityGoal->added_by = Auth::user()->id;
                $pPmPriorityGoal->save();

            }
           

        }elseif($pmGoalSetting->name == 'High-priority'){
            $pPmHPGoal = new ProjectPmGoal();
            $pPmHPGoal->project_id = $findProject->id;
            $pPmHPGoal->client_id = $findDeal->client_id;
            $pPmHPGoal->pm_id = $findDeal->pm_id;
            $pPmHPGoal->project_type = $findDeal->project_type;
            $pPmHPGoal->project_category = 'High-priority';
            $pPmHPGoal->goal_code = 'DCS';
            $pPmHPGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
            $pPmHPGoal->goal_type = 'deliverable_signed_by_client';
            if ($deal->released_at != null) {
                $pPmHPGoal->goal_start_date = $deal->released_at;
                $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(3);
            }
            $pPmHPGoal->duration = 3;
            $pPmHPGoal->added_by = Auth::user()->id;
            $pPmHPGoal->save();

            $pPmHPGoal = new ProjectPmGoal();
            $pPmHPGoal->project_id = $findProject->id;
            $pPmHPGoal->client_id = $findDeal->client_id;
            $pPmHPGoal->pm_id = $findDeal->pm_id;
            $pPmHPGoal->project_type = $findDeal->project_type;
            $pPmHPGoal->project_category = 'High-priority';
            $pPmHPGoal->goal_code = 'TSM';
            $pPmHPGoal->goal_name = '1st submission has to be made';
            $pPmHPGoal->goal_type = '1st_task_submissino';
            if ($deal->released_at != null) {
                $pPmHPGoal->goal_start_date = $deal->released_at;
                $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(4);
            }
            $pPmHPGoal->duration = 4;
            $pPmHPGoal->added_by = Auth::user()->id;
            $pPmHPGoal->save();

            $pPmHPGoal = new ProjectPmGoal();
            $pPmHPGoal->project_id = $findProject->id;
            $pPmHPGoal->client_id = $findDeal->client_id;
            $pPmHPGoal->pm_id = $findDeal->pm_id;
            $pPmHPGoal->project_type = $findDeal->project_type;
            $pPmHPGoal->project_category = 'High-priority';
            $pPmHPGoal->goal_code = 'FMR';
            $pPmHPGoal->goal_name = '1st milestone has to be released';
            $pPmHPGoal->goal_type = '1st_milestone_released';
            if ($deal->released_at != null) {
                $pPmHPGoal->goal_start_date = $deal->released_at;
                $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
            }
            $pPmHPGoal->duration = 7;
            $pPmHPGoal->added_by = Auth::user()->id;
            $pPmHPGoal->save();
            if($milestone_count > 1)
            {
                $pPmHPGoal = new ProjectPmGoal();
                $pPmHPGoal->project_id = $findProject->id;
                $pPmHPGoal->client_id = $findDeal->client_id;
                $pPmHPGoal->pm_id = $findDeal->pm_id;
                $pPmHPGoal->project_type = $findDeal->project_type;
                $pPmHPGoal->project_category = 'High-priority';
                $pPmHPGoal->goal_code = 'MPMR';
                $pPmHPGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                $pPmHPGoal->goal_type = 'more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmHPGoal->goal_start_date = $deal->released_at;
                    $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $pPmHPGoal->duration = 12;
                $pPmHPGoal->added_by = Auth::user()->id;
                $pPmHPGoal->save();

            }
            if($milestone_count > 2)
            {
                $pPmHPGoal = new ProjectPmGoal();
                $pPmHPGoal->project_id = $findProject->id;
                $pPmHPGoal->client_id = $findDeal->client_id;
                $pPmHPGoal->pm_id = $findDeal->pm_id;
                $pPmHPGoal->project_type = $findDeal->project_type;
                $pPmHPGoal->project_category = 'High-priority';
                $pPmHPGoal->goal_code = 'MMPMR';
                $pPmHPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmHPGoal->goal_type = 'more_and_more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmHPGoal->goal_start_date = $deal->released_at;
                    $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(15);
                }
                $pPmHPGoal->duration = 15;
                $pPmHPGoal->added_by = Auth::user()->id;
                $pPmHPGoal->save();
    

            }
            if($milestone_count > 3)
            {
                $pPmHPGoal = new ProjectPmGoal();
                $pPmHPGoal->project_id = $findProject->id;
                $pPmHPGoal->client_id = $findDeal->client_id;
                $pPmHPGoal->pm_id = $findDeal->pm_id;
                $pPmHPGoal->project_type = $findDeal->project_type;
                $pPmHPGoal->project_category = 'High-priority';
                $pPmHPGoal->goal_code = 'LM';
                $pPmHPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmHPGoal->goal_type = 'last_milestone';
                if ($deal->released_at != null) {
                    $pPmHPGoal->goal_start_date = $deal->released_at;
                    $pPmHPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(22);
                }
                $pPmHPGoal->duration = 22;
                $pPmHPGoal->added_by = Auth::user()->id;
                $pPmHPGoal->save();
    
                
            }

        }elseif($pmGoalSetting->name == 'Top most priority'){
            $pPmTMPGoal = new ProjectPmGoal();
            $pPmTMPGoal->project_id = $findProject->id;
            $pPmTMPGoal->client_id = $findDeal->client_id;
            $pPmTMPGoal->pm_id = $findDeal->pm_id;
            $pPmTMPGoal->project_type = $findDeal->project_type;
            $pPmTMPGoal->project_category = 'Top most priority';
            $pPmTMPGoal->goal_code = 'DCS';
            $pPmTMPGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
            $pPmTMPGoal->goal_type = 'deliverable_signed_by_client';
            if ($deal->released_at != null) {
                $pPmTMPGoal->goal_start_date = $deal->released_at;
                $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(3);
            }
            $pPmTMPGoal->duration = 3;
            $pPmTMPGoal->added_by = Auth::user()->id;
            $pPmTMPGoal->save();

            $pPmTMPGoal = new ProjectPmGoal();
            $pPmTMPGoal->project_id = $findProject->id;
            $pPmTMPGoal->client_id = $findDeal->client_id;
            $pPmTMPGoal->pm_id = $findDeal->pm_id;
            $pPmTMPGoal->project_type = $findDeal->project_type;
            $pPmTMPGoal->project_category = 'Top most priority';
            $pPmTMPGoal->goal_code = 'TSM';
            $pPmTMPGoal->goal_name = '1st submission has to be made';
            $pPmTMPGoal->goal_type = '1st_task_submissino';
            if ($deal->released_at != null) {
                $pPmTMPGoal->goal_start_date = $deal->released_at;
                $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(4);
            }
            $pPmTMPGoal->duration = 4;
            $pPmTMPGoal->added_by = Auth::user()->id;
            $pPmTMPGoal->save();

            $pPmTMPGoal = new ProjectPmGoal();
            $pPmTMPGoal->project_id = $findProject->id;
            $pPmTMPGoal->client_id = $findDeal->client_id;
            $pPmTMPGoal->pm_id = $findDeal->pm_id;
            $pPmTMPGoal->project_type = $findDeal->project_type;
            $pPmTMPGoal->project_category = 'Top most priority';
            $pPmTMPGoal->goal_code = 'FMR';
            $pPmTMPGoal->goal_name = '1st milestone has to be released';
            $pPmTMPGoal->goal_type = '1st_milestone_released';
            if ($deal->released_at != null) {
                $pPmTMPGoal->goal_start_date = $deal->released_at;
                $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
            }
            $pPmTMPGoal->duration = 7;
            $pPmTMPGoal->added_by = Auth::user()->id;
            $pPmTMPGoal->save();
            if($milestone_count > 1)
            {
                $pPmTMPGoal = new ProjectPmGoal();
                $pPmTMPGoal->project_id = $findProject->id;
                $pPmTMPGoal->client_id = $findDeal->client_id;
                $pPmTMPGoal->pm_id = $findDeal->pm_id;
                $pPmTMPGoal->project_type = $findDeal->project_type;
                $pPmTMPGoal->project_category = 'Top most priority';
                $pPmTMPGoal->goal_code = 'MPMR';
                $pPmTMPGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                $pPmTMPGoal->goal_type = 'more_milestone_released'; 
                if ($deal->released_at != null) {
                    $pPmTMPGoal->goal_start_date = $deal->released_at;
                    $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $pPmTMPGoal->duration = 12;
                $pPmTMPGoal->added_by = Auth::user()->id;
                $pPmTMPGoal->save();

            }
            if($milestone_count > 2)
            {
                $pPmTMPGoal = new ProjectPmGoal();
                $pPmTMPGoal->project_id = $findProject->id;
                $pPmTMPGoal->client_id = $findDeal->client_id;
                $pPmTMPGoal->pm_id = $findDeal->pm_id;
                $pPmTMPGoal->project_type = $findDeal->project_type;
                $pPmTMPGoal->project_category = 'Top most priority';
                $pPmTMPGoal->goal_code = 'MMPMR';
                $pPmTMPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmTMPGoal->goal_type = 'more_and_more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmTMPGoal->goal_start_date = $deal->released_at;
                    $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(15);
                }
                $pPmTMPGoal->duration = 15;
                $pPmTMPGoal->added_by = Auth::user()->id;
                $pPmTMPGoal->save();

            }
            if($milestone_count > 3)
            {
                
            $pPmTMPGoal = new ProjectPmGoal();
            $pPmTMPGoal->project_id = $findProject->id;
            $pPmTMPGoal->client_id = $findDeal->client_id;
            $pPmTMPGoal->pm_id = $findDeal->pm_id;
            $pPmTMPGoal->project_type = $findDeal->project_type;
            $pPmTMPGoal->project_category = 'Top most priority';
            $pPmTMPGoal->goal_code = 'LM';
            $pPmTMPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
            $pPmTMPGoal->goal_type = 'last_milestone';
            if ($deal->released_at != null) {
                $pPmTMPGoal->goal_start_date = $deal->released_at;
                $pPmTMPGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(22);
            }
            $pPmTMPGoal->duration = 22;
            $pPmTMPGoal->added_by = Auth::user()->id;
            $pPmTMPGoal->save();

            }
 

        }else{
            $pPmCSGoal = new ProjectPmGoal();
            $pPmCSGoal->project_id = $findProject->id;
            $pPmCSGoal->client_id = $findDeal->client_id;
            $pPmCSGoal->pm_id = $findDeal->pm_id;
            $pPmCSGoal->project_type = $findDeal->project_type;
            $pPmCSGoal->project_category = 'Critically sensitive';
            $pPmCSGoal->goal_code = 'DCS';
            $pPmCSGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
            $pPmCSGoal->goal_type = 'deliverable_signed_by_client';
            if ($deal->released_at != null) {
                $pPmCSGoal->goal_start_date = $deal->released_at;
                $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(3);
            }
            $pPmCSGoal->duration = 3;
            $pPmCSGoal->added_by = Auth::user()->id;
            $pPmCSGoal->save();

            $pPmCSGoal = new ProjectPmGoal();
            $pPmCSGoal->project_id = $findProject->id;
            $pPmCSGoal->client_id = $findDeal->client_id;
            $pPmCSGoal->pm_id = $findDeal->pm_id;
            $pPmCSGoal->project_type = $findDeal->project_type;
            $pPmCSGoal->project_category = 'Critically sensitive';
            $pPmCSGoal->goal_code = 'TSM';
            $pPmCSGoal->goal_name = '1st submission has to be made';
            $pPmCSGoal->goal_type = '1st_task_submissino';
            if ($deal->released_at != null) {
                $pPmCSGoal->goal_start_date = $deal->released_at;
                $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(4);
            }
            $pPmCSGoal->duration = 4;
            $pPmCSGoal->added_by = Auth::user()->id;
            $pPmCSGoal->save();

            $pPmCSGoal = new ProjectPmGoal();
            $pPmCSGoal->project_id = $findProject->id;
            $pPmCSGoal->client_id = $findDeal->client_id;
            $pPmCSGoal->pm_id = $findDeal->pm_id;
            $pPmCSGoal->project_type = $findDeal->project_type;
            $pPmCSGoal->project_category = 'Critically sensitive';
            $pPmCSGoal->goal_code = 'FMR';
            $pPmCSGoal->goal_name = '1st milestone has to be released';
            $pPmCSGoal->goal_type = '1st_milestone_released';
            if ($deal->released_at != null) {
                $pPmCSGoal->goal_start_date = $deal->released_at;
                $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
            }
            $pPmCSGoal->duration = 7;
            $pPmCSGoal->added_by = Auth::user()->id;
            $pPmCSGoal->save();
            if($milestone_count > 1)
            {
                $pPmCSGoal = new ProjectPmGoal();
                $pPmCSGoal->project_id = $findProject->id;
                $pPmCSGoal->client_id = $findDeal->client_id;
                $pPmCSGoal->pm_id = $findDeal->pm_id;
                $pPmCSGoal->project_type = $findDeal->project_type;
                $pPmCSGoal->project_category = 'Critically sensitive';
                $pPmCSGoal->goal_code = 'MPMR';
                $pPmCSGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                $pPmCSGoal->goal_type = 'more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmCSGoal->goal_start_date = $deal->released_at;
                    $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $pPmCSGoal->duration = 12;
                $pPmCSGoal->added_by = Auth::user()->id;
                $pPmCSGoal->save();

            }
           
            if($milestone_count > 2)
            {
                $pPmCSGoal = new ProjectPmGoal();
                $pPmCSGoal->project_id = $findProject->id;
                $pPmCSGoal->client_id = $findDeal->client_id;
                $pPmCSGoal->pm_id = $findDeal->pm_id;
                $pPmCSGoal->project_type = $findDeal->project_type;
                $pPmCSGoal->project_category = 'Critically sensitive';
                $pPmCSGoal->goal_code = 'MMPMR';
                $pPmCSGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmCSGoal->goal_type = 'more_and_more_milestone_released';
                if ($deal->released_at != null) {
                    $pPmCSGoal->goal_start_date = $deal->released_at;
                    $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(15);
                }
                $pPmCSGoal->duration = 15;
                $pPmCSGoal->added_by = Auth::user()->id;
                $pPmCSGoal->save();

            }
           
            if($milestone_count > 3)
            {
                $pPmCSGoal = new ProjectPmGoal();
                $pPmCSGoal->project_id = $findProject->id;
                $pPmCSGoal->client_id = $findDeal->client_id;
                $pPmCSGoal->pm_id = $findDeal->pm_id;
                $pPmCSGoal->project_type = $findDeal->project_type;
                $pPmCSGoal->project_category = 'Critically sensitive';
                $pPmCSGoal->goal_code = 'LM';
                $pPmCSGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                $pPmCSGoal->goal_type = 'last_milestone';
                if ($deal->released_at != null) {
                    $pPmCSGoal->goal_start_date = $deal->released_at;
                    $pPmCSGoal->goal_end_date = Carbon::parse($deal->released_at)->addDay(22);
                }
                $pPmCSGoal->duration = 22;
                $pPmCSGoal->added_by = Auth::user()->id;
                $pPmCSGoal->save();

            }
           
        }
    }
    public function HourlyProjectPmGoalCreation($findDeal, $findProject){
        $deal = Deal::where('id',$findDeal->id)->first();
        $project = Project::where('id',$findProject->id)->first();
        if($project->status != 'finished'){
            if($findDeal->hourly_rate <=20 ){
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(30);
                }
                $p_pm_regular_goal->duration = 2;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = '3HT';
                $p_pm_regular_goal->goal_name = 'At least 3 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_3_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(60);
                }
                $p_pm_regular_goal->duration = 4;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = '6HT';
                $p_pm_regular_goal->goal_name = 'At least 6 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_6_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(5);
                }
                $p_pm_regular_goal->duration = 5;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = '10HT';
                $p_pm_regular_goal->goal_name = 'At least 10 hours have been tracked between 6th and 12th days';
                $p_pm_regular_goal->goal_type = 'hours_10_tracked_between_6th_and_12th_days';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = '10HTW';
                $p_pm_regular_goal->goal_name = 'At least 10 hours have been tracked during that week';
                $p_pm_regular_goal->goal_type = 'hours_10_tracked_during_week';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
                }
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }elseif($findDeal->hourly_rate >=21 && $findDeal->hourly_rate <=30){
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(30);
                }
                $p_pm_regular_goal->duration = 2;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = '3HT';
                $p_pm_regular_goal->goal_name = 'At least 3 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_3_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(60);
                }
                $p_pm_regular_goal->duration = 4;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = '7HT';
                $p_pm_regular_goal->goal_name = 'At least 7 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_7_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(5);
                }
                $p_pm_regular_goal->duration = 5;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = '12HT';
                $p_pm_regular_goal->goal_name = 'At least 12 hours have been tracked between 6th and 12th days';
                $p_pm_regular_goal->goal_type = 'hours_12_tracked_between_6th_and_12th_days';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = '12HTW';
                $p_pm_regular_goal->goal_name = 'At least 12 hours have been tracked during that week';
                $p_pm_regular_goal->goal_type = 'hours_12_tracked_during_week';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
                }
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }elseif($findDeal->hourly_rate >=31 && $findDeal->hourly_rate <=40){
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(30);
                }
                $p_pm_regular_goal->duration = 2;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = '4HT';
                $p_pm_regular_goal->goal_name = 'At least 4 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_4_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(60);
                }
                $p_pm_regular_goal->duration = 4;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = '8HT';
                $p_pm_regular_goal->goal_name = 'At least 8 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_8_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(5);
                }
                $p_pm_regular_goal->duration = 5;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = '15HT';
                $p_pm_regular_goal->goal_name = 'At least 15 hours have been tracked between 6th and 12th days';
                $p_pm_regular_goal->goal_type = 'hours_15_tracked_between_6th_and_12th_days';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = '15HTW';
                $p_pm_regular_goal->goal_name = 'At least 15 hours have been tracked during that week';
                $p_pm_regular_goal->goal_type = 'hours_15_tracked_during_week';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
                }
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }elseif($findDeal->hourly_rate >=41 && $findDeal->hourly_rate <=50){
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(30);
                }
                $p_pm_regular_goal->duration = 2;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = '5HT';
                $p_pm_regular_goal->goal_name = 'At least 5 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_5_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(60);
                }
                $p_pm_regular_goal->duration = 4;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = '8HT';
                $p_pm_regular_goal->goal_name = 'At least 8 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_8_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(5);
                }
                $p_pm_regular_goal->duration = 5;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = '15HT';
                $p_pm_regular_goal->goal_name = 'At least 15 hours have been tracked between 6th and 12th days';
                $p_pm_regular_goal->goal_type = 'hours_15_tracked_between_6th_and_12th_days';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = '15HTW';
                $p_pm_regular_goal->goal_name = 'At least 15 hours have been tracked during that week';
                $p_pm_regular_goal->goal_type = 'hours_15_tracked_during_week';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
                }
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }else{
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(30);
                }
                $p_pm_regular_goal->duration = 2;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = '5HT';
                $p_pm_regular_goal->goal_name = 'At least 5 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_5_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addHours(60);
                }
                $p_pm_regular_goal->duration = 4;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = '10HT';
                $p_pm_regular_goal->goal_name = 'At least 10 hours have been tracked';
                $p_pm_regular_goal->goal_type = 'hours_10_tracked';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(5);
                }
                $p_pm_regular_goal->duration = 5;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = '18HT';
                $p_pm_regular_goal->goal_name = 'At least 18 hours have been tracked between 6th and 12th days';
                $p_pm_regular_goal->goal_type = 'hours_18_tracked_between_6th_and_12th_days';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(12);
                }
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = '18HTW';
                $p_pm_regular_goal->goal_name = 'At least 18 hours have been tracked during that week';
                $p_pm_regular_goal->goal_type = 'hours_18_tracked_during_week';
                if ($deal->released_at != null) {
                    $p_pm_regular_goal->goal_start_date = $deal->released_at;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($deal->released_at)->addDay(7);
                }
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();

            }
        }
    }
}
