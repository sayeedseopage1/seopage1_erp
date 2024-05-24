<?php

namespace App\Http\Controllers;

use App\Models\AwardTimeIncress;
use App\Models\Deal;
use App\Models\PmGoalSetting;
use App\Models\PMProject;
use App\Models\Project;
use App\Models\ProjectDeliverable;
use App\Models\ProjectPmGoal;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\ProjectMilestone;
use Exception;
use Illuminate\Support\Facades\DB;

class HelperPmProjectStatusController extends AccountBaseController
{

    function goalCount($priorityType,  $milestoneCount): int
    {
        /**
         * total goal count
         * regular
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
         * milestone count(mc)
         * goal count = 2 + 1 + mc - up round(mc/2)
         *
         * Priority
         *  goal count = 2 + mc
         */

        $priorityType = in_array($priorityType, ['highPriority', 'topMostPriority', 'criticallySensitive']) ? 'priority' : $priorityType;

        switch ($priorityType) {
            case 'regular':
                return 2 + 1 + $milestoneCount - round($milestoneCount / 2, 0);
                break;
            case 'priority':
                return 2 + $milestoneCount;
                break;
            default:
                return new Exception('Project priority type is invalid');
        }
    }

    public function ProjectPmGoalCreation(PmGoalSetting $pmGoalSetting, Deal $findDeal, Project $findProject)
    {
        if (!in_array($pmGoalSetting->category, array_keys(Project::$categories))) return new Exception('Project priority type is invalid');

        // dd($pmGoalSetting);
        $milestoneCount = ProjectMilestone::where('project_id', $findProject->id)->count();
        $milestoneSum = (new ProjectMilestoneController)->getCostSum($findProject->id);

        // --------------- calculate total number of days for the project --------------------- //
        $extraGoal = $milestoneSum < $findDeal->actual_amount ? 1 : 0;

        $totalRequiredDays = self::calculateProjectRequiredDays($pmGoalSetting->category, $milestoneCount + $extraGoal);
        // ------------- end -------------- //

        $pm_project = PMProject::where('project_id', $findProject->id)->first();

        // goal creation time
        $goal_start_date = self::getGoalStartDate($findProject, $findDeal, $pm_project);

        // check if deadline is short
        $d1 = date_create($findDeal->start_date);
        $d2 = date_create($findDeal->deadline);
        $diff = date_diff($d1, $d2);
        $totalProjectDays = (int) $diff->format("%a");

        if ($totalRequiredDays !== 0 && $totalRequiredDays > $totalProjectDays) {
            return self::createShortDeadlinePmGoals($pmGoalSetting->category, $findProject, $findDeal, $pm_project, $milestoneCount, $extraGoal, $totalProjectDays);
        }
        // check end

        DB::beginTransaction();

        $goalCount = self::goalCount($pmGoalSetting->category, $milestoneCount);
        $goalCodes = ProjectPmGoal::$goalCodes['fixed'][in_array($pmGoalSetting->category, ['highPriority', 'topMostPriority', 'criticallySensitive']) ? 'priority' : $pmGoalSetting->category];

        try {
            if ($pmGoalSetting->category == 'regular') {

                $goalDurationArray = [3, 7, 12, 15, 22, 29];
                $i = 0;

                $goal = new ProjectPmGoal();
                $goal->project_id = $findProject->id;
                $goal->client_id = $findDeal->client_id;
                $goal->pm_id = $findDeal->pm_id;
                $goal->project_type = $findDeal->project_type;
                $goal->project_category = 'Regular';

                $goal->goal_code = $goalCodes[$i]['code'];
                $goal->goal_name = $goalCodes[$i]['name'];
                $goal->goal_type = $goalCodes[$i]['type'];

                $goal->goal_start_date = $goal_start_date;
                $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goalDurationArray[$i]);
                $goal->duration = $goalDurationArray[$i];
                $goal->added_by = Auth::user()->id;
                $goal->save();

                $timePassed = 0;
                for (++$i; $i < $goalCount; $i++) {
                    $goal = new ProjectPmGoal();
                    $goal->project_id = $findProject->id;
                    $goal->client_id = $findDeal->client_id;
                    $goal->pm_id = $findDeal->pm_id;
                    $goal->project_type = $findDeal->project_type;
                    $goal->project_category = 'Regular';
                    $goal->goal_start_date = $goal_start_date;

                    if ($i < 6) {
                        $goal->goal_code = $goalCodes[$i]['code'];

                        if ($milestoneCount == 1 && $i == 2) $goal->goal_name = $goalCodes[$i]['single'];
                        else $goal->goal_name = $goalCodes[$i]['name'];

                        $goal->goal_type = $goalCodes[$i]['type'];
                        $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goalDurationArray[$i]);
                        $goal->duration = $goalDurationArray[$i];
                    } else {
                        $goal->goal_code = $goalCodes[5]['code'];
                        $goal->goal_name = $goalCodes[5]['name'];
                        $goal->goal_type = $goalCodes[5]['type'];

                        $goal->duration = $goalDurationArray[5] + ($timePassed += 7);
                        $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goal->duration);
                    }

                    $goal->added_by = Auth::user()->id;
                    $goal->save();
                }

                $timePassed = $goal->duration;
            } else {

                $goalDurationArray = [3, 4, 7, 12, 15, 22];
                $i = 0;

                $goal = new ProjectPmGoal();
                $goal->project_id = $findProject->id;
                $goal->client_id = $findDeal->client_id;
                $goal->pm_id = $findDeal->pm_id;
                $goal->project_type = $findDeal->project_type;
                $goal->project_category = $pmGoalSetting->category;

                $goal->goal_code = $goalCodes[$i]['code'];
                $goal->goal_name = $goalCodes[$i]['name'];
                $goal->goal_type = $goalCodes[$i]['type'];

                $goal->goal_start_date = $goal_start_date;
                $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goalDurationArray[$i]);
                $goal->duration = $goalDurationArray[$i];
                $goal->added_by = Auth::user()->id;
                $goal->save();

                $timePassed = 0;
                for (++$i; $i < $goalCount; $i++) {
                    $goal = new ProjectPmGoal();
                    $goal->project_id = $findProject->id;
                    $goal->client_id = $findDeal->client_id;
                    $goal->pm_id = $findDeal->pm_id;
                    $goal->project_type = $findDeal->project_type;
                    $goal->project_category = $pmGoalSetting->category;
                    $goal->goal_start_date = $goal_start_date;

                    if ($i < 6) {
                        $goal->goal_code = $goalCodes[$i]['code'];

                        if ($milestoneCount == 1 && $i == 2) $goal->goal_name = $goalCodes[$i]['single'];
                        else $goal->goal_name = $goalCodes[$i]['name'];

                        $goal->goal_type = $goalCodes[$i]['type'];
                        $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goalDurationArray[$i]);
                        $goal->duration = $goalDurationArray[$i];
                    } else {
                        $goal->goal_code = $goalCodes[5]['code'];
                        $goal->goal_name = $goalCodes[5]['name'];
                        $goal->goal_type = $goalCodes[5]['type'];

                        $goal->duration = $goalDurationArray[5] + ($timePassed += 7);
                        $goal->goal_end_date = Carbon::parse($goal_start_date)->addDay($goal->duration);
                    }

                    $goal->added_by = Auth::user()->id;
                    $goal->save();
                }

                $timePassed = $goal->duration;
            }

            if ($extraGoal) {

                $goalCodes = ProjectPmGoal::$goalCodes['fixed']['extraGoal'];

                $goalDuration = 7;

                $goal = new ProjectPmGoal();
                $goal->project_id = $findProject->id;
                $goal->client_id = $findDeal->client_id;
                $goal->pm_id = $findDeal->pm_id;
                $goal->project_type = $findDeal->project_type;
                $goal->project_category = $pmGoalSetting->category;

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
    public function HourlyProjectPmGoalCreation(PmGoalSetting $pmGoalSetting, Deal $findDeal, Project $findProject)
    {
        $pm_project = PMProject::where('project_id', $findProject->id)->first();
        // goal creation time
        $goal_start_date = self::getGoalStartDate($findProject, $findDeal, $pm_project);

        $goal = new ProjectPmGoal();
        $goal->project_id = $findProject->id;
        $goal->client_id = $findDeal->client_id;
        $goal->pm_id = $findDeal->pm_id;
        $goal->project_type = $findDeal->project_type;
        $goal->project_category = $pmGoalSetting->category;
        $goal->goal_code = 'HTA';
        $goal->goal_name = 'At least one task has been assigned and 1 hour has been tracked';
        $goal->goal_type = 'task_need_to_be_assigned';
        $goal->goal_start_date = $goal_start_date;
        $goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(30);
        $goal->duration = 30 / 24;
        $goal->added_by = Auth::user()->id;
        $goal->save();

        // 2nd goal
        $goal = new ProjectPmGoal();
        $goal->project_id = $findProject->id;
        $goal->client_id = $findDeal->client_id;
        $goal->pm_id = $findDeal->pm_id;
        $goal->project_type = $findDeal->project_type;
        $goal->project_category = $pmGoalSetting->category;

        switch ($pmGoalSetting->category) {
            case 'regular':
            case 'priority':
                $goal->goal_code = '3HT';
                $goal->goal_name = 'At least 3 hours have been tracked';
                $goal->goal_type = 'hours_3_tracked';
                break;
            case 'highPriority':
                $goal->goal_code = '4HT';
                $goal->goal_name = 'At least 4 hours have been tracked';
                $goal->goal_type = 'hours_4_tracked';
                break;
            case 'topMostPriority':
            case 'criticallySensitive':
                $goal->goal_code = '5HT';
                $goal->goal_name = 'At least 5 hours have been tracked';
                $goal->goal_type = 'hours_5_tracked';
                break;
            default:
                return new Exception('Project priority type is invalid');
                break;
        }

        $goal->goal_start_date = $goal_start_date;
        $goal->goal_end_date = Carbon::parse($goal_start_date)->addHours(60);
        $goal->duration = 60 / 24;
        $goal->added_by = Auth::user()->id;
        $goal->save();
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
                $increaseRequest = AwardTimeIncress::where('deal_id', $deal->id)->first();
                if (!$increaseRequest) throw new Exception('Award Time Increase data not found');
                return $increaseRequest->updated_at;
                break;
        }
    }

    function calculateProjectRequiredDays($priorityType, $milestoneCount)
    {
        if (
            $milestoneCount <= 0 ||
            !in_array($priorityType, array_keys(Project::$categories))
        ) {
            return new Exception('Project priority type is invalid');
        }

        $priorityType = in_array($priorityType, ['highPriority', 'topMostPriority', 'criticallySensitive']) ? 'priority' : $priorityType;

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
            6 - 6/2 = 12(3) = 12(2) + 3 = 15(2) + (7*2) = 15+ 14    = 29
            7 - 7/2 = 12(3.5) = 12(2) + 3 = 15(2) + (7*2) = 15+ 14  = 29
            8 - 8/2 = 12(4) = 12(3) + 3 = 15(3) + (7*3) = 15+ 21    = 36
            9 - 9/2 = 12(4.5) = 12(3) + 3 = 15(3) + (7*3) = 15+ 21  = 36
            10 - 10/2 = 12(5) = 12(4) + 3 = 15(4) + (7*4) = 15+ 28  = 43

         *+Priority
            1 - 4+3     = 7
            2 - 4+3+5   = 12
            4+3(m-1)+5(m-1)+3(m-1)+(7(m-1))*

         */

        switch ($priorityType) {
            case 'regular':
                $timeMatrix = [
                    '1' => 12,
                    '2' => 15,
                    '3' => 15,
                ];
                // calculation in comment
                if ($milestoneCount > 3) return $timeMatrix['3'] + (($milestoneCount - (round(($milestoneCount / 2), 0)) - 1)  * 7);
                return $timeMatrix[$milestoneCount];
                break;

            case 'priority':
                // 4+3(m-1) +5(m-1) +3(m-1) + 7 * (m-1))*
                return 4 + (($milestoneCount-- > 0) ? 3 : 0) + (($milestoneCount-- > 0) ? 5 : 0) + (($milestoneCount-- > 0) ? 3 : 0) + ($milestoneCount > 0 ? $milestoneCount  * 7 : 0);
                break;
        }
    }

    function createShortDeadlinePmGoals($priorityType, $project, $deal, $pmProject, $milestoneCount, $extraGoal, $totalProjectDuration)
    {
        $goalCount = self::goalCount($priorityType, $milestoneCount);
        $goalCodes = ProjectPmGoal::$goalCodes['fixed'][in_array($priorityType, ['highPriority', 'topMostPriority', 'criticallySensitive']) ? 'priority' : $priorityType];
        $goalStartDate = self::getGoalStartDate($project, $deal, $pmProject);

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
            $goal->goal_start_date = $goalStartDate;
            $goal->goal_end_date = Carbon::parse($goalStartDate)->addDay(3);
            $goal->duration = 3;
            $goal->added_by = Auth::user()->id;
            $goal->save();

            $goalCount -= 1;
            $timePassed = 3;

            $daysRemain = ($totalProjectDuration - 3) + 2;
            $perGoalDuration = $daysRemain / ($goalCount += $extraGoal);
            $perGoalDuration = number_format($perGoalDuration, 2);

            // removing extra goal  for separate insert
            $goalCount -= $extraGoal;

            for ($i = 1; $i <= $goalCount; $i++) {

                $goal = new ProjectPmGoal();
                $goal->project_id = $project->id;
                $goal->client_id = $deal->client_id;
                $goal->pm_id = $deal->pm_id;
                $goal->project_type = $deal->project_type;
                $goal->project_category = $priorityType;

                if ($i <= 5) {
                    $goal->goal_code = $goalCodes[$i]['code'];

                    if ($milestoneCount == 1 && $i == 2) $goal->goal_name = $goalCodes[$i]['single'];
                    else $goal->goal_name = $goalCodes[$i]['name'];

                    $goal->goal_type = $goalCodes[$i]['type'];
                } else {
                    $goal->goal_code = $goalCodes[5]['code'] . ($i - 5);
                    $goal->goal_name = $goalCodes[5]['name'];
                    $goal->goal_type = $goalCodes[5]['type'];
                }
                $goal->goal_start_date = $goalStartDate;
                $goal->goal_end_date = Carbon::parse($goalStartDate)->addHours((24 * ($timePassed += $perGoalDuration)));
                $goal->duration = $timePassed;
                $goal->added_by = Auth::user()->id;
                $goal->save();
            }

            if ($extraGoal) {

                $goalCodes = ProjectPmGoal::$goalCodes['fixed']['extraGoal'];

                $goal = new ProjectPmGoal();
                $goal->project_id = $project->id;
                $goal->client_id = $deal->client_id;
                $goal->pm_id = $deal->pm_id;
                $goal->project_type = $deal->project_type;
                $goal->project_category = $priorityType;

                $goal->goal_code = $goalCodes['code'];
                $goal->goal_name = $goalCodes['name'];
                $goal->goal_type = $goalCodes['type'];

                $goal->goal_start_date = $goalStartDate;
                $goal->goal_end_date = Carbon::parse($goalStartDate)->addHours((24 * ($timePassed += $perGoalDuration)));
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

    public function upsellGoalCreation(ProjectMilestone $milestone)
    {
        // get total milestone amount
        $milestoneSum = ProjectMilestone::where('project_id', $milestone->project_id)->sum('cost');
        $project = Project::find($milestone->project_id);

        // check if total budget has been completed
        // if not then pm goal will not be created
        // dd($milestoneSum, $project->project_budget, $milestoneSum < $project->project_budget);
        if ($milestoneSum < $project->project_budget) {
            return;
        }

        $lastGoal = ProjectPmGoal::where('project_id', $milestone->project_id)->orderBy('goal_end_date', 'desc')->first();

        $goalCodes = ProjectPmGoal::$goalCodes['upsell'];

        // dd($milestone);

        if ($milestone->cost < 100) $goalDuration = 3;
        else $goalDuration = 3 +  (int) ($milestone->cost / 100);

        $goal = new ProjectPmGoal();
        $goal->project_id = $lastGoal->project_id;
        $goal->client_id = $lastGoal->client_id;
        $goal->pm_id = $lastGoal->pm_id;
        $goal->project_type = $lastGoal->project_type;
        $goal->project_category = $lastGoal->project_category;

        $goal->goal_code = $goalCodes['code'];
        $goal->goal_name = $goalCodes['name'];
        $goal->goal_type = $goalCodes['type'];

        $goal->goal_start_date = $lastGoal->goal_start_date;
        $goal->goal_end_date = Carbon::parse($lastGoal->goal_start_date)->addDay($lastGoal->duration + $goalDuration);
        $goal->duration = $lastGoal->duration + $goalDuration;
        $goal->added_by = Auth::user()->id;
        $goal->save();
    }

    function deliverablePmGoalCreation(ProjectDeliverable $deliverable)
    {
        $preGoals = ProjectPmGoal::where('project_id', $deliverable->project_id);
        $goalCount = $preGoals->count();
        $lastGoal = $preGoals->first();

        switch ($goalCount) {
            case 2:
                $days = ceil(($deliverable->estimation_time - 4) / 3);
                break;
            case $goalCount > 2:
                $days = ceil($deliverable->estimation_time / 3);
                break;

            default:
                return;
                break;
        }

        $goal = new ProjectPmGoal();
        $goal->project_id = $lastGoal->project_id;
        $goal->client_id = $lastGoal->client_id;
        $goal->pm_id = $lastGoal->pm_id;
        $goal->project_type = $lastGoal->project_type;
        $goal->project_category = $lastGoal->project_category;

        $goal->goal_code = 'HP' . $goalCount;
        $goal->goal_name = 'If at least ' . $deliverable->estimation_time . ' hours have been tracked';
        $goal->goal_type = 'hourly_project_no' . $goalCount;
        $goal->goal_start_date = $deliverable->created_at;

        $endDate = $goal->goal_start_date;
        for ($i = 0; $i < $days; $i++) {
            $endDate = Carbon::parse($endDate)->addDay(1);
            if (Carbon::parse($endDate)->format("D") == "Sun") $endDate = Carbon::parse($endDate)->addDay(1);
        }
        $goal->goal_end_date = $endDate;

        $goal->duration = $days;
        $goal->added_by = Auth::user()->id;
        $goal->save();
    }
}
