<?php

namespace App\Helper;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\Project;
use App\Models\CashPoint;
use App\Models\TaskRevision;
use App\Models\ProjectMilestone;
use App\Models\IncentiveCriteria;
use Illuminate\Support\Facades\DB;
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

    public static function progressiveCalculation($incentiveCriteria, $request)
    {
        try {
            $startDate = $request->start_date ? Carbon::parse($request->start_date)->startOfDay() : Carbon::now()->startOfMonth();
            $endDate = Carbon::parse($request->end_date ?? now())->endOfDay();
            $incentiveCriteria->acquired_percent = 0; 
            $incentiveCriteria->incentive_amount_type = null;
            $incentiveCriteria->obtained_incentive = 0;
            $user_id = $request->user_id ?? null;

            if($incentiveCriteria->id == 1){
                $total_tasks = Task::select('tasks.id')->where('tasks.added_by', $user_id)->whereBetween('tasks.created_at', [$startDate, $endDate])->count();
                $pm_revisions = TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')->where('projects.pm_id', $user_id)->where('task_revisions.final_responsible_person','PM')->whereBetween('task_revisions.created_at', [$startDate, $endDate])->count();
                $incentiveCriteria->acquired_percent = $total_tasks ? number_format(( $pm_revisions / $total_tasks ) * 100, 2) : 0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 2){
                $projects = Project::select(['id','project_name','pm_id','status','project_status'])
                ->where([['pm_id', $user_id],['status', 'in progress'],['project_status', 'Accepted']])
                ->withCount(['pmGoals as total_goals' => function($pmGoal){
                    return $pmGoal->where('goal_status', 0)->where('goal_end_date', '<=', now());
                }])
                ->withCount(['pmGoals as total_goals_met' => function($pmGoal){
                    return $pmGoal->where('goal_status', 1);
                }])
                ->get();

                $incentiveCriteria->acquired_percent = $projects->sum('total_goals') ? number_format(($projects->sum('total_goals_met') / $projects->sum('total_goals')) * 100, 2) : 0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 3){
                $cashPoints = CashPoint::where('user_id', $user_id)->whereBetween('created_at', [$startDate, $endDate])->whereNotNull('factor_id')->get();
                $totalEarnedPoints = $cashPoints->sum('total_points_earn');
                $totalLostPoints = $cashPoints->sum('total_points_lost');
                $total_points = $totalEarnedPoints + $totalLostPoints;
                $incentiveCriteria->acquired_percent = $total_points ? number_format(($totalLostPoints / $total_points) * 100, 2) : 0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 4){
                $incentiveCriteria->acquired_percent = Project::selectRaw('FORMAT((SUM(CASE WHEN p_m_projects.delayed_status = 1 THEN 1 ELSE 0 END) / SUM(CASE WHEN p_m_projects.delayed_status = NULL THEN 0 ELSE 1 END)) * 100, 2) as delayed_project_percentage')
                ->join('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                ->where([['projects.pm_id', $user_id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
                ->first()->delayed_project_percentage??0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 5){
                $incentiveCriteria->acquired_percent = Project::selectRaw('FORMAT((SUM(CASE WHEN project_milestones.status = "canceled" THEN 1 ELSE 0 END) / SUM(CASE WHEN project_milestones.status = "complete" THEN 1 ELSE 0 END)) * 100, 2) as milestone_cancelation_rate')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where([['projects.pm_id', $user_id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->first()->milestone_cancelation_rate??0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 6){
                $projects = Project::where([['projects.pm_id', $user_id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])->get();
                $incentiveCriteria->acquired_percent = $projects->count() ? number_format(($projects->where('deadline', '<', now())->count() / $projects->count()) * 100, 2) : 0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 7){
                $pm_created_clients = Project::where('added_by', $user_id)->where('created_at', '>=', $startDate)->pluck('client_id');
                $pm_assigned_clients = Project::where('pm_id', $user_id)->whereIn('client_id', $pm_created_clients)->where('created_at', '>=', $startDate)->pluck('client_id')->toArray();
                $retension_this_month = count(array_keys(array_filter(array_count_values($pm_assigned_clients), fn($count) => $count > 1)));
                $incentiveCriteria->acquired_percent = $pm_created_clients->count() ? number_format(((Project::whereIn('client_id', $pm_created_clients)->where('pm_id', $user_id)->where('created_at', '<=', $startDate)->pluck('client_id')->count() + $retension_this_month) / $pm_created_clients->count())*100, 2) : 0;
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 8){
                $incentiveCriteria->acquired_percent = ProjectMilestone::select('project_milestones.*')
                ->join('projects','projects.id','project_milestones.project_id')
                ->join('deals','deals.id','projects.deal_id')
                ->where('deals.project_type','fixed')
                ->where('projects.pm_id', $user_id)
                ->where('project_milestones.added_by', $user_id)
                ->where('project_milestones.status','!=','canceled')
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->sum('project_milestones.cost');
                if($incentiveCriteria->acquired_percent) self::findIncentive($incentiveCriteria);
                else{
                    $incentiveCriteria->incentive_amount_type = $incentiveCriteria->incentiveFactors->first()->incentive_amount_type;
                    $incentiveCriteria->obtained_incentive = 0;
                }
            }elseif($incentiveCriteria->id == 9){
                $incentiveCriteria->acquired_percent = DB::table('users')
                ->join('projects', 'users.id', '=', 'projects.pm_id')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->whereBetween('payments.paid_on', [$startDate, $endDate])
                ->where('payments.added_by', $user_id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');
                self::findIncentive($incentiveCriteria);
            }elseif($incentiveCriteria->id == 10){
                $bonus_points = 70;
                $lower_limit = 0;

                $remain_unreleased_amount_last_months = DB::table('projects')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->where('project_milestones.created_at', '<', $startDate)
                ->where(function ($q1) use ($startDate) {
                    $q1->whereNull('payments.paid_on')
                        ->orWhere('payments.paid_on', '>', $startDate);
                })
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.pm_id', $user_id)
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost'); 

                $assigned_amount_this_month = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where('projects.pm_id', $user_id)
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->where('projects.project_status','Accepted')
                ->sum('cost');

                $released_amount_this_month_assigned = DB::table('users')
                ->join('projects', 'users.id', '=', 'projects.pm_id')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                //->whereNotNull('project_milestones.invoice_id')
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->whereBetween('payments.paid_on', [$startDate, $endDate])
                ->where('payments.added_by', $user_id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');

                $released_amount_this_month = DB::table('users')
                ->join('projects', 'users.id', '=', 'projects.pm_id')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                //->whereNotNull('project_milestones.invoice_id')
                ->whereBetween('payments.paid_on', [$startDate, $endDate])
                ->where('payments.added_by', $user_id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');

                $this_month_released_percent = round(($released_amount_this_month_assigned / $assigned_amount_this_month) * 100, 2);
                $previous_months_released_percent = round((($released_amount_this_month - $released_amount_this_month_assigned) / $remain_unreleased_amount_last_months) * 100, 2);
                $match_trigger = 0;
                $incentiveCriteria->acquired_percent = round($assigned_amount_this_month + $remain_unreleased_amount_last_months - $released_amount_this_month, 2);
                $incentiveCriteria->obtained_incentive = 0;
                $incentiveCriteria->previous_month_released_percent = $previous_months_released_percent;
                $incentiveCriteria->current_month_released_percent = $this_month_released_percent;
                foreach($incentiveCriteria->incentiveFactors as $factor){
                    $incentiveCriteria->incentive_amount_type = $factor->incentive_amount_type;
                    if(!$match_trigger && $factor->lower_limit <= $previous_months_released_percent && $factor->uppder_limit <= $this_month_released_percent){
                        $match_trigger++;
                        $incentiveCriteria->obtained_incentive = $factor->incentive_amount;
                    }
                    $factor->upper_limit = round(($assigned_amount_this_month - (($assigned_amount_this_month/100) * $factor->upper_limit)) + ($remain_unreleased_amount_last_months - (($remain_unreleased_amount_last_months/100) * $factor->lower_limit)), 2);
                    $factor->lower_limit = $lower_limit;
                    $lower_limit = $factor->upper_limit;
                }

            }elseif($incentiveCriteria->id == 11){
                $remain_unreleased_amount_last_months = DB::table('projects')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->where('project_milestones.created_at', '<', $startDate)
                ->where(function ($q1) use ($startDate) {
                    $q1->whereNull('payments.paid_on')
                        ->orWhere('payments.paid_on', '>', $startDate);
                })
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.pm_id', $user_id)
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');   

                $assigned_amount_this_month = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where('projects.pm_id', $user_id)
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->where('projects.project_status','Accepted')
                ->sum('cost');

                $released_amount_this_month = DB::table('users')
                ->join('projects', 'users.id', '=', 'projects.pm_id')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                //->whereNotNull('project_milestones.invoice_id')
                ->whereBetween('payments.paid_on', [$startDate, $endDate])
                ->where('payments.added_by', $user_id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');

                $incentiveCriteria->acquired_percent = number_format(($released_amount_this_month/($remain_unreleased_amount_last_months + $assigned_amount_this_month)) * 100, 2);
                self::findIncentive($incentiveCriteria);
            }

        } catch (\Throwable $th) {
            // throw $th;
            return false;
        }
    }

    public static function findIncentive($incentiveCriteria)
    {
        foreach($incentiveCriteria->incentiveFactors as $incentiveFactor){
            if(($incentiveCriteria->acquired_percent == 0 || $incentiveFactor->lower_limit < $incentiveCriteria->acquired_percent) && $incentiveFactor->upper_limit >=  $incentiveCriteria->acquired_percent){
                $incentiveCriteria->incentive_amount_type = $incentiveFactor->incentive_amount_type;
                $incentiveCriteria->obtained_incentive = $incentiveFactor->incentive_amount;
                return true;
            }
        }
    }
}