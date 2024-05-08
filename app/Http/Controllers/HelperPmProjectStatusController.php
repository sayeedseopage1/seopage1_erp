<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AwardTimeIncress;
use App\Models\Deal;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\ProjectPmGoal;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\ProjectMilestone;
use DateTime;
use Exception;
use Illuminate\Support\Facades\DB;

class HelperPmProjectStatusController extends AccountBaseController
{
    public function ProjectPmGoalCreation($pmGoalSetting, $findDeal, $findProject)
    {
        $milestone_count = ProjectMilestone::where('project_id', $findProject->id)->count();
        $milestoneSum = ProjectMilestone::where('project_id', $findProject->id)->sum('cost');

        // --------------- calculate total number of days for the project --------------------- //
        $extraGoal = $milestoneSum < $findDeal->actual_amount ? 1 : 0;

        $totalRequiedDayes = self::calculateProjectRequiedDays($pmGoalSetting->name, $milestone_count + $extraGoal);
        // ------------- end -------------- //

        $pm_project = PMProject::where('project_id', $findProject->id)->first();

        // goal creation time
        $goal_start_date = self::getGoalStartDate($findProject, $findDeal, $pm_project);

        // check if deadline is short
        $d1 = date_create($findDeal->start_date);
        $d2 = date_create($findDeal->deadline);
        $diff = date_diff($d1, $d2);
        $totalProjectDays = (int) $diff->format("%a");


        if ($totalRequiedDayes !== 0 && $totalRequiedDayes > $totalProjectDays) {
            return self::createShortDeadlinePmGoals($pmGoalSetting->name, $findProject, $findDeal, $pm_project, $milestone_count, $extraGoal, $totalProjectDays);
        }
        // check end

        DB::beginTransaction();

        try {
            if ($pmGoalSetting->name == 'Regular') {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = 'DCS';
                $p_pm_regular_goal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
                $p_pm_regular_goal->goal_type = 'deliverable_signed_by_client';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(3);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
                $p_pm_regular_goal->duration = 12;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
                if ($milestone_count > 1) {
                    $p_pm_regular_goal = new ProjectPmGoal();
                    $p_pm_regular_goal->project_id = $findProject->id;
                    $p_pm_regular_goal->client_id = $findDeal->client_id;
                    $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                    $p_pm_regular_goal->project_type = $findDeal->project_type;
                    $p_pm_regular_goal->project_category = 'Regular';
                    $p_pm_regular_goal->goal_code = 'MPMR';
                    $p_pm_regular_goal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $p_pm_regular_goal->goal_type = 'more_milestone_released';
                    $p_pm_regular_goal->goal_start_date = $goal_start_date;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(15);
                    $p_pm_regular_goal->duration = 15;
                    $p_pm_regular_goal->added_by = Auth::user()->id;
                    $p_pm_regular_goal->save();
                }
                if ($milestone_count > 2) {
                    $p_pm_regular_goal = new ProjectPmGoal();
                    $p_pm_regular_goal->project_id = $findProject->id;
                    $p_pm_regular_goal->client_id = $findDeal->client_id;
                    $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                    $p_pm_regular_goal->project_type = $findDeal->project_type;
                    $p_pm_regular_goal->project_category = 'Regular';
                    $p_pm_regular_goal->goal_code = 'MMPMR';
                    $p_pm_regular_goal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $p_pm_regular_goal->goal_type = 'more_and_more_milestone_released';
                    $p_pm_regular_goal->goal_start_date = $goal_start_date;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(22);
                    $p_pm_regular_goal->duration = 22;
                    $p_pm_regular_goal->added_by = Auth::user()->id;
                    $p_pm_regular_goal->save();
                }
                if ($milestone_count > 3) {

                    $p_pm_regular_goal = new ProjectPmGoal();
                    $p_pm_regular_goal->project_id = $findProject->id;
                    $p_pm_regular_goal->client_id = $findDeal->client_id;
                    $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                    $p_pm_regular_goal->project_type = $findDeal->project_type;
                    $p_pm_regular_goal->project_category = 'Regular';
                    $p_pm_regular_goal->goal_code = 'LM';
                    $p_pm_regular_goal->goal_name = 'This 1 more milestone need to be released until the completion of the project following every 7 days';
                    $p_pm_regular_goal->goal_type = 'last_milestone';
                    $p_pm_regular_goal->goal_start_date = $goal_start_date;
                    $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(29);
                    $p_pm_regular_goal->duration = 29;
                    $p_pm_regular_goal->added_by = Auth::user()->id;
                    $p_pm_regular_goal->save();
                }
                $timePassed = $p_pm_regular_goal->duration;
            } elseif ($pmGoalSetting->name == 'Priority') {
                $pPmPriorityGoal = new ProjectPmGoal();
                $pPmPriorityGoal->project_id = $findProject->id;
                $pPmPriorityGoal->client_id = $findDeal->client_id;
                $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                $pPmPriorityGoal->project_type = $findDeal->project_type;
                $pPmPriorityGoal->project_category = 'Priority';
                $pPmPriorityGoal->goal_code = 'DCS';
                $pPmPriorityGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
                $pPmPriorityGoal->goal_type = 'deliverable_signed_by_client';
                $pPmPriorityGoal->goal_start_date = $goal_start_date;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(3);
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
                $pPmPriorityGoal->goal_start_date = $goal_start_date;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(4);
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
                $pPmPriorityGoal->goal_start_date = $goal_start_date;
                $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $pPmPriorityGoal->duration = 7;
                $pPmPriorityGoal->added_by = Auth::user()->id;
                $pPmPriorityGoal->save();
                if ($milestone_count > 1) {
                    $pPmPriorityGoal = new ProjectPmGoal();
                    $pPmPriorityGoal->project_id = $findProject->id;
                    $pPmPriorityGoal->client_id = $findDeal->client_id;
                    $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                    $pPmPriorityGoal->project_type = $findDeal->project_type;
                    $pPmPriorityGoal->project_category = 'Priority';
                    $pPmPriorityGoal->goal_code = 'MPMR';
                    $pPmPriorityGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                    $pPmPriorityGoal->goal_type = 'more_milestone_released';
                    $pPmPriorityGoal->goal_start_date = $goal_start_date;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
                    $pPmPriorityGoal->duration = 12;
                    $pPmPriorityGoal->added_by = Auth::user()->id;
                    $pPmPriorityGoal->save();
                }
                if ($milestone_count > 2) {
                    $pPmPriorityGoal = new ProjectPmGoal();
                    $pPmPriorityGoal->project_id = $findProject->id;
                    $pPmPriorityGoal->client_id = $findDeal->client_id;
                    $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                    $pPmPriorityGoal->project_type = $findDeal->project_type;
                    $pPmPriorityGoal->project_category = 'Priority';
                    $pPmPriorityGoal->goal_code = 'MMPMR';
                    $pPmPriorityGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmPriorityGoal->goal_type = 'more_and_more_milestone_released';
                    $pPmPriorityGoal->goal_start_date = $goal_start_date;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(15);
                    $pPmPriorityGoal->duration = 15;
                    $pPmPriorityGoal->added_by = Auth::user()->id;
                    $pPmPriorityGoal->save();
                }
                if ($milestone_count > 3) {
                    $pPmPriorityGoal = new ProjectPmGoal();
                    $pPmPriorityGoal->project_id = $findProject->id;
                    $pPmPriorityGoal->client_id = $findDeal->client_id;
                    $pPmPriorityGoal->pm_id = $findDeal->pm_id;
                    $pPmPriorityGoal->project_type = $findDeal->project_type;
                    $pPmPriorityGoal->project_category = 'Priority';
                    $pPmPriorityGoal->goal_code = 'LM';
                    $pPmPriorityGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmPriorityGoal->goal_type = 'last_milestone';
                    $pPmPriorityGoal->goal_start_date = $goal_start_date;
                    $pPmPriorityGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(22);
                    $pPmPriorityGoal->duration = 22;
                    $pPmPriorityGoal->added_by = Auth::user()->id;
                    $pPmPriorityGoal->save();
                }

                $timePassed = $pPmPriorityGoal->duration;
            } elseif ($pmGoalSetting->name == 'High-priority') {
                $pPmHPGoal = new ProjectPmGoal();
                $pPmHPGoal->project_id = $findProject->id;
                $pPmHPGoal->client_id = $findDeal->client_id;
                $pPmHPGoal->pm_id = $findDeal->pm_id;
                $pPmHPGoal->project_type = $findDeal->project_type;
                $pPmHPGoal->project_category = 'High-priority';
                $pPmHPGoal->goal_code = 'DCS';
                $pPmHPGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
                $pPmHPGoal->goal_type = 'deliverable_signed_by_client';
                $pPmHPGoal->goal_start_date = $goal_start_date;
                $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(3);
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
                $pPmHPGoal->goal_start_date = $goal_start_date;
                $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(4);
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
                $pPmHPGoal->goal_start_date = $goal_start_date;
                $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $pPmHPGoal->duration = 7;
                $pPmHPGoal->added_by = Auth::user()->id;
                $pPmHPGoal->save();
                if ($milestone_count > 1) {
                    $pPmHPGoal = new ProjectPmGoal();
                    $pPmHPGoal->project_id = $findProject->id;
                    $pPmHPGoal->client_id = $findDeal->client_id;
                    $pPmHPGoal->pm_id = $findDeal->pm_id;
                    $pPmHPGoal->project_type = $findDeal->project_type;
                    $pPmHPGoal->project_category = 'High-priority';
                    $pPmHPGoal->goal_code = 'MPMR';
                    $pPmHPGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                    $pPmHPGoal->goal_type = 'more_milestone_released';
                    $pPmHPGoal->goal_start_date = $goal_start_date;
                    $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
                    $pPmHPGoal->duration = 12;
                    $pPmHPGoal->added_by = Auth::user()->id;
                    $pPmHPGoal->save();
                }
                if ($milestone_count > 2) {
                    $pPmHPGoal = new ProjectPmGoal();
                    $pPmHPGoal->project_id = $findProject->id;
                    $pPmHPGoal->client_id = $findDeal->client_id;
                    $pPmHPGoal->pm_id = $findDeal->pm_id;
                    $pPmHPGoal->project_type = $findDeal->project_type;
                    $pPmHPGoal->project_category = 'High-priority';
                    $pPmHPGoal->goal_code = 'MMPMR';
                    $pPmHPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmHPGoal->goal_type = 'more_and_more_milestone_released';
                    $pPmHPGoal->goal_start_date = $goal_start_date;
                    $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(15);
                    $pPmHPGoal->duration = 15;
                    $pPmHPGoal->added_by = Auth::user()->id;
                    $pPmHPGoal->save();
                }
                if ($milestone_count > 3) {
                    $pPmHPGoal = new ProjectPmGoal();
                    $pPmHPGoal->project_id = $findProject->id;
                    $pPmHPGoal->client_id = $findDeal->client_id;
                    $pPmHPGoal->pm_id = $findDeal->pm_id;
                    $pPmHPGoal->project_type = $findDeal->project_type;
                    $pPmHPGoal->project_category = 'High-priority';
                    $pPmHPGoal->goal_code = 'LM';
                    $pPmHPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmHPGoal->goal_type = 'last_milestone';
                    $pPmHPGoal->goal_start_date = $goal_start_date;
                    $pPmHPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(22);
                    $pPmHPGoal->duration = 22;
                    $pPmHPGoal->added_by = Auth::user()->id;
                    $pPmHPGoal->save();
                }

                $timePassed = $pPmHPGoal->duration;
            } elseif ($pmGoalSetting->name == 'Top most priority') {
                $pPmTMPGoal = new ProjectPmGoal();
                $pPmTMPGoal->project_id = $findProject->id;
                $pPmTMPGoal->client_id = $findDeal->client_id;
                $pPmTMPGoal->pm_id = $findDeal->pm_id;
                $pPmTMPGoal->project_type = $findDeal->project_type;
                $pPmTMPGoal->project_category = 'Top most priority';
                $pPmTMPGoal->goal_code = 'DCS';
                $pPmTMPGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
                $pPmTMPGoal->goal_type = 'deliverable_signed_by_client';
                $pPmTMPGoal->goal_start_date = $goal_start_date;
                $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(3);
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
                $pPmTMPGoal->goal_start_date = $goal_start_date;
                $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(4);
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
                $pPmTMPGoal->goal_start_date = $goal_start_date;
                $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $pPmTMPGoal->duration = 7;
                $pPmTMPGoal->added_by = Auth::user()->id;
                $pPmTMPGoal->save();
                if ($milestone_count > 1) {
                    $pPmTMPGoal = new ProjectPmGoal();
                    $pPmTMPGoal->project_id = $findProject->id;
                    $pPmTMPGoal->client_id = $findDeal->client_id;
                    $pPmTMPGoal->pm_id = $findDeal->pm_id;
                    $pPmTMPGoal->project_type = $findDeal->project_type;
                    $pPmTMPGoal->project_category = 'Top most priority';
                    $pPmTMPGoal->goal_code = 'MPMR';
                    $pPmTMPGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                    $pPmTMPGoal->goal_type = 'more_milestone_released';
                    $pPmTMPGoal->goal_start_date = $goal_start_date;
                    $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
                    $pPmTMPGoal->duration = 12;
                    $pPmTMPGoal->added_by = Auth::user()->id;
                    $pPmTMPGoal->save();
                }
                if ($milestone_count > 2) {
                    $pPmTMPGoal = new ProjectPmGoal();
                    $pPmTMPGoal->project_id = $findProject->id;
                    $pPmTMPGoal->client_id = $findDeal->client_id;
                    $pPmTMPGoal->pm_id = $findDeal->pm_id;
                    $pPmTMPGoal->project_type = $findDeal->project_type;
                    $pPmTMPGoal->project_category = 'Top most priority';
                    $pPmTMPGoal->goal_code = 'MMPMR';
                    $pPmTMPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmTMPGoal->goal_type = 'more_and_more_milestone_released';
                    $pPmTMPGoal->goal_start_date = $goal_start_date;
                    $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(15);
                    $pPmTMPGoal->duration = 15;
                    $pPmTMPGoal->added_by = Auth::user()->id;
                    $pPmTMPGoal->save();
                }
                if ($milestone_count > 3) {

                    $pPmTMPGoal = new ProjectPmGoal();
                    $pPmTMPGoal->project_id = $findProject->id;
                    $pPmTMPGoal->client_id = $findDeal->client_id;
                    $pPmTMPGoal->pm_id = $findDeal->pm_id;
                    $pPmTMPGoal->project_type = $findDeal->project_type;
                    $pPmTMPGoal->project_category = 'Top most priority';
                    $pPmTMPGoal->goal_code = 'LM';
                    $pPmTMPGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmTMPGoal->goal_type = 'last_milestone';
                    $pPmTMPGoal->goal_start_date = $goal_start_date;
                    $pPmTMPGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(22);
                    $pPmTMPGoal->duration = 22;
                    $pPmTMPGoal->added_by = Auth::user()->id;
                    $pPmTMPGoal->save();
                }

                $timePassed = $pPmTMPGoal->duration;
            } else {
                $pPmCSGoal = new ProjectPmGoal();
                $pPmCSGoal->project_id = $findProject->id;
                $pPmCSGoal->client_id = $findDeal->client_id;
                $pPmCSGoal->pm_id = $findDeal->pm_id;
                $pPmCSGoal->project_type = $findDeal->project_type;
                $pPmCSGoal->project_category = 'Critically sensitive';
                $pPmCSGoal->goal_code = 'DCS';
                $pPmCSGoal->goal_name = 'Deliverables have to be signed off and all the tasks have to be created with proper planning';
                $pPmCSGoal->goal_type = 'deliverable_signed_by_client';
                $pPmCSGoal->goal_start_date = $goal_start_date;
                $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(3);
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
                $pPmCSGoal->goal_start_date = $goal_start_date;
                $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(4);
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
                $pPmCSGoal->goal_start_date = $goal_start_date;
                $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $pPmCSGoal->duration = 7;
                $pPmCSGoal->added_by = Auth::user()->id;
                $pPmCSGoal->save();
                if ($milestone_count > 1) {
                    $pPmCSGoal = new ProjectPmGoal();
                    $pPmCSGoal->project_id = $findProject->id;
                    $pPmCSGoal->client_id = $findDeal->client_id;
                    $pPmCSGoal->pm_id = $findDeal->pm_id;
                    $pPmCSGoal->project_type = $findDeal->project_type;
                    $pPmCSGoal->project_category = 'Critically sensitive';
                    $pPmCSGoal->goal_code = 'MPMR';
                    $pPmCSGoal->goal_name = 'One more milestone has to be released between 7-12 th days';
                    $pPmCSGoal->goal_type = 'more_milestone_released';
                    $pPmCSGoal->goal_start_date = $goal_start_date;
                    $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
                    $pPmCSGoal->duration = 12;
                    $pPmCSGoal->added_by = Auth::user()->id;
                    $pPmCSGoal->save();
                }

                if ($milestone_count > 2) {
                    $pPmCSGoal = new ProjectPmGoal();
                    $pPmCSGoal->project_id = $findProject->id;
                    $pPmCSGoal->client_id = $findDeal->client_id;
                    $pPmCSGoal->pm_id = $findDeal->pm_id;
                    $pPmCSGoal->project_type = $findDeal->project_type;
                    $pPmCSGoal->project_category = 'Critically sensitive';
                    $pPmCSGoal->goal_code = 'MMPMR';
                    $pPmCSGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmCSGoal->goal_type = 'more_and_more_milestone_released';
                    $pPmCSGoal->goal_start_date = $goal_start_date;
                    $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(15);
                    $pPmCSGoal->duration = 15;
                    $pPmCSGoal->added_by = Auth::user()->id;
                    $pPmCSGoal->save();
                }

                if ($milestone_count > 3) {
                    $pPmCSGoal = new ProjectPmGoal();
                    $pPmCSGoal->project_id = $findProject->id;
                    $pPmCSGoal->client_id = $findDeal->client_id;
                    $pPmCSGoal->pm_id = $findDeal->pm_id;
                    $pPmCSGoal->project_type = $findDeal->project_type;
                    $pPmCSGoal->project_category = 'Critically sensitive';
                    $pPmCSGoal->goal_code = 'LM';
                    $pPmCSGoal->goal_name = 'At least 1 more milestone released between 12-15 days';
                    $pPmCSGoal->goal_type = 'last_milestone';
                    $pPmCSGoal->goal_start_date = $goal_start_date;
                    $pPmCSGoal->goal_end_date = Carbon::parse($goal_start_date)->addDay(22);
                    $pPmCSGoal->duration = 22;
                    $pPmCSGoal->added_by = Auth::user()->id;
                    $pPmCSGoal->save();
                }

                $timePassed = $pPmCSGoal->duration;
            }

            if ($extraGoal) {

                $goalCodes = ProjectPmGoal::$goalCodes['extraGoal'];

                $goalDuration = 7;

                $goal = new ProjectPmGoal();
                $goal->project_id = $findProject->id;
                $goal->client_id = $findDeal->client_id;
                $goal->pm_id = $findDeal->pm_id;
                $goal->project_type = $findDeal->project_type;
                $goal->project_category = $pmGoalSetting->name;

                $goal->goal_code = $goalCodes['code'];
                $goal->goal_name = $goalCodes['name'];
                $goal->goal_type = $goalCodes['type'];

                $goal->goal_start_date = $goal_start_date;
                $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($timePassed + $goalDuration);
                $goal->duration = $timePassed + $goalDuration;
                $goal->added_by = Auth::user()->id;
                $goal->save();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
    public function HourlyProjectPmGoalCreation($findDeal, $findProject)
    {
        $pm_project = PMProject::where('project_id', $findProject->id)->first();
        $project = Project::where('id', $pm_project->project_id)->first();
        // goal creation time
        $goal_start_date = self::getGoalStartDate($findProject, $findDeal, $pm_project);

        if ($project->status != 'finished') {
            if ($findDeal->hourly_rate <= 20) {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Regular';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(5);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
            } elseif ($findDeal->hourly_rate >= 21 && $findDeal->hourly_rate <= 30) {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(5);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
            } elseif ($findDeal->hourly_rate >= 31 && $findDeal->hourly_rate <= 40) {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'High-priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(5);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
            } elseif ($findDeal->hourly_rate >= 41 && $findDeal->hourly_rate <= 50) {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Top most priority';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(5);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
            } else {
                $p_pm_regular_goal = new ProjectPmGoal();
                $p_pm_regular_goal->project_id = $findProject->id;
                $p_pm_regular_goal->client_id = $findDeal->client_id;
                $p_pm_regular_goal->pm_id = $findDeal->pm_id;
                $p_pm_regular_goal->project_type = $findDeal->project_type;
                $p_pm_regular_goal->project_category = 'Critically sensitive';
                $p_pm_regular_goal->goal_code = 'HTA';
                $p_pm_regular_goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
                $p_pm_regular_goal->goal_type = 'task_need_to_be_assigned';
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(5);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(12);
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
                $p_pm_regular_goal->goal_start_date = $goal_start_date;
                $p_pm_regular_goal->goal_end_date = Carbon::parse($goal_start_date)->addDay(7);
                $p_pm_regular_goal->duration = 7;
                $p_pm_regular_goal->added_by = Auth::user()->id;
                $p_pm_regular_goal->save();
            }
        }
    }

    function getGoalStartDate($project, $deal, $pm_project)
    {
        switch ($project->goal_creation_time_type) {
            case '1':
            default:
                return $pm_project->project_award_time_platform;
                break;
            case '2':
                return $deal->released_at;
                break;
            case '3':
                return $deal->authorized_on;
                break;
            case '4':
                return $project->project_acceptance_time;
                break;
            case '5':
                $incressesRequest = AwardTimeIncress::where('deal_id', $deal->id)->first();
                if (!$incressesRequest) throw new Exception('Award Time Incress data not found');
                return $incressesRequest->updated_at;
                break;
        }
    }

    function calculateProjectRequiedDays($priorityType, $milestoneCount)
    {
        $priorityType = strtolower($priorityType);
        if (
            $milestoneCount <= 0 ||
            !in_array($priorityType, ['regular', 'priority', 'highPriority', 'topMost', 'criticallySensitive'])
        ) {
            return 0;
        }

        $priorityType = in_array($priorityType, ['highPriority', 'topMost', 'criticallySensitive']) ? 'priority' : $priorityType;

        /**
         * +Regular
            1- 3 + 4 = 7(1) + 5 			                = 12
            2- 7(2) + 5 = 12(1) + 3                         = 15(3)
            3- 7(2) + 5 = 12(1) + 3                         = 15(0)
            4- 12(2) + 3 = 15(1) + 7	    		        = 22(7)
            5- 12(2) + 3 = 15(1) + 7 	    	            = 22(0)
            6- 12(3)+3 =15(2)+7 =22(1)+7                    = 29(7)
            7- 12(3)+3 =15(2)+7 =22(1)+7                    = 29(0)
            8- 12(4)+3 =15(3)+7 =22(2)+7 =29(1)+7           = 36(7)
            9- 12(4)+3 =15(3)+7 =22(2)+7=29                 = 36(0)
            10-12(5)+3 =15(4)+7 =22(3)+7 =29(2)+7 =36(1)+7  = 43(7)

         * milestone count -> milestone count/2 + (remaining count) = 12 + 3(remaining count - 1) = 15 + (remaining count * 7)
            5 - 5/2 = 12+ 3(2.5) = 12(2)+ 3 = 15(1) + (7*1) = 15+ 7 = 22
            6 - 6/2 = 12(3) = 12(2) + 3 = 15(2) + (7*2) = 15+ 14 = 29
            7 - 7/2 = 12(3.5) = 12(2) + 3 = 15(2) + (7*2) = 15+ 14 = 29
            8 - 8/2 = 12(4) = 12(3) + 3 = 15(3) + (7*3) = 15+ 21 = 36
            9 - 9/2 = 12(4.5) = 12(3) + 3 = 15(3) + (7*3) = 15+ 21 = 36
            10 - 10/2 = 12(5) = 12(4) + 3 = 15(4) + (7*4) = 15+ 28 = 43
         */

        $timeMatrix = [
            'regular' => [
                '1' => 12,
                '2' => 15,
                '3' => 15,
            ],
            'priority' => [
                '1' => 7,
                '2' => 12,
                '3' => 15,
            ]
        ];

        if ($milestoneCount > 3) return $timeMatrix[$priorityType]['3'] + (($milestoneCount - (round(($milestoneCount / 2), 0)) - 1)  * 7);

        return $timeMatrix[$priorityType][$milestoneCount];
    }

    function createShortDeadlinePmGoals($priorityType, $project, $deal, $pmProject, $milestoneCount, $extraGoal, $totalProjectDuration)
    {

        /**
         * total goal count
         * ragular
         * Milestone -> goals
         * 1 - 2+1 = 3
         * 2 - 2 +1(1) +1(1) = 4
         * 3 - 2 +1(2) +1(1) = 4
         * 4 - 2 +1(2) +1(1) +1(1) = 5
         * 5 - 2 +1(3) +1(1) +1(1) = 5
         * 6 - 2 +1(3) +1(1) +1(1) +1(1)= 6
         * 7 - 2 +1(4) +1(1) +1(1) +1(1)= 6
         * 8 - 2 +1(4) +1(1) +1(1) +1(1) +1(1)= 7
         *
         * milestone count(mc) = 2 + 1 + mc - up round(mc/2)
         */

        $goalCount = 2 + 1 + $milestoneCount - round($milestoneCount / 2, 0);
        $goalCodes = ProjectPmGoal::$goalCodes[strtolower($priorityType)];

        DB::beginTransaction();
        try {
            $timePassed = 0;
            // first deliverables
            $goal = new ProjectPmGoal();
            $goal->project_id = $project->id;
            $goal->client_id = $deal->client_id;
            $goal->pm_id = $deal->pm_id;
            $goal->project_type = $deal->project_type;
            $goal->project_category = $priorityType;
            $goal->goal_code = $goalCodes[0]['code'];
            $goal->goal_name = $goalCodes[0]['name'];
            $goal->goal_type = $goalCodes[0]['type'];
            $goal->goal_start_date = $pmProject->created_at;
            $goal->duration = 3;
            $goal->goal_end_date = Carbon::parse($deal->award_time)->addDay(3);
            $goal->added_by = Auth::user()->id;
            $goal->save();

            $goalCount -= 1;
            $timePassed = 3;

            $daysRemain = ($totalProjectDuration - 3) + 2;
            $perGoalDuration = $daysRemain / ($milestoneCount = $milestoneCount + $extraGoal - 1);
            $perGoalDuration = number_format($perGoalDuration, 2);

            for ($i = 1; $i <= $goalCount; $i++) {

                $goal = new ProjectPmGoal();
                $goal->project_id = $project->id;
                $goal->client_id = $deal->client_id;
                $goal->pm_id = $deal->pm_id;
                $goal->project_type = $deal->project_type;
                $goal->project_category = $priorityType;

                if ($i <= 5) {
                    $goal->goal_code = $goalCodes[$i]['code'];
                    $goal->goal_name = $goalCodes[$i]['name'];
                    $goal->goal_type = $goalCodes[$i]['type'];
                } else {
                    $goal->goal_code = $goalCodes[5]['code'] . ($i - 5);
                    $goal->goal_name = $goalCodes[5]['name'];
                    $goal->goal_type = $goalCodes[5]['type'];
                }
                $goal->goal_start_date = $deal->award_time;
                $goal->goal_end_date = Carbon::parse($deal->award_time)->addHours((24 * ($timePassed += $perGoalDuration)));
                $goal->duration = $timePassed;
                $goal->added_by = Auth::user()->id;
                $goal->save();
            }

            if ($extraGoal) {

                $goalCodes = ProjectPmGoal::$goalCodes['extraGoal'];

                $goal = new ProjectPmGoal();
                $goal->project_id = $project->id;
                $goal->client_id = $deal->client_id;
                $goal->pm_id = $deal->pm_id;
                $goal->project_type = $deal->project_type;
                $goal->project_category = $priorityType;

                $goal->goal_code = $goalCodes['code'];
                $goal->goal_name = $goalCodes['name'];
                $goal->goal_type = $goalCodes['type'];

                $goal->goal_start_date = $deal->award_time;
                $goal->goal_end_date = Carbon::parse($deal->award_time)->addHours((24 * ($timePassed += $perGoalDuration)));
                $goal->duration = $timePassed;
                $goal->added_by = Auth::user()->id;
                $goal->save();
            }

            DB::commit();
        } catch (\Throwable $th) {
            throw $th;
            DB::rollBack();
        }
    }
}
