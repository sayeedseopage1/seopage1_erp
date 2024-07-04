<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Helper\Incentive;
use App\Models\CashPoint;
use App\Models\TaskRevision;
use App\Models\IncentiveType;
use Illuminate\Console\Command;
use App\Models\IncentivePayment;
use App\Models\ProjectMilestone;
use App\Models\AchievedIncentive;
use App\Models\IncentiveCriteria;
use Illuminate\Support\Facades\DB;
use App\Models\ProgressiveIncentive;

class DisbursePmIncentiveMonthly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'disburse-pm-incentive:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Disburse project manager incentive monthly basis';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $startDate = Carbon::now()->subMonth()->startOfMonth();
        $endDate = Carbon::now()->subMonth()->endOfMonth();
        $users = User::where('role_id',4)->get();
        $now = now()->subMonth()->endOfMonth();

        try {
            DB::beginTransaction();
            foreach($users as $user){
                $cashPoints = CashPoint::where('user_id', $user->id)->whereBetween('created_at', [$startDate, $endDate])->whereNotNull('factor_id')->get();
                $totalEarnedPoints = $cashPoints->sum('total_points_earn');
                $totalLostPoints = $cashPoints->sum('total_points_lost');
                $availablePoints = $totalEarnedPoints - $totalLostPoints;
                $obtainedIncentive = [];
                $totalCashValue = 0;

                // Revision vs task ratio
                $total_tasks = Task::select('tasks.id')
                ->where('tasks.added_by', $user->id)
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->count();

                $pm_revisions = TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id', $user->id)
                ->where('task_revisions.final_responsible_person','PM')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();

                $revision_percent = $total_tasks ? number_format(( $pm_revisions / $total_tasks ) * 100, 2) : 0;
                $obtainedIncentive[] = Incentive::progressiveStore(1, $user->id, $revision_percent, $now);
                // End

                // Goal achieve rate
                $projects = Project::select(['id','project_name','pm_id','status','project_status'])
                ->where([['pm_id', $user->id],['status', 'in progress'],['project_status', 'Accepted']])
                ->withCount(['pmGoals as total_goals' => function($pmGoal) use ($now){
                    return $pmGoal->where('goal_status', 0)->where('goal_end_date', '<=', $now);
                }])
                ->withCount(['pmGoals as total_goals_met' => function($pmGoal){
                    return $pmGoal->where('goal_status', 1);
                }])
                ->get();

                $goal_achieved_percent = $projects->sum('total_goals') ? number_format(($projects->sum('total_goals_met') / $projects->sum('total_goals')) * 100, 2) : 0;
                $obtainedIncentive[] = Incentive::progressiveStore(2, $user->id, $goal_achieved_percent, $now);
                // End

                // Negative vs poisitive point
                $total_points = $totalEarnedPoints + $totalLostPoints;
                $negative_point_rete = $total_points ? number_format(($totalLostPoints / $total_points) * 100, 2) : 0;
                $obtainedIncentive[] = Incentive::progressiveStore(3, $user->id, $negative_point_rete, $now);
                // End

                // Percentage of delayed project
                $result = Project::selectRaw('
                    SUM(CASE WHEN projects.status = "in progress" AND project_status = "Accepted" AND p_m_projects.delayed_status = 1 THEN 1 ELSE 0 END) as inProgressDelayedProjects,
                    SUM(CASE WHEN projects.status = "in progress" AND project_status = "Accepted" AND p_m_projects.delayed_status = 0 THEN 1 ELSE 0 END) as inProgressNotDelayedProjects,
                    SUM(CASE WHEN projects.status IN ("finished", "partially finished") AND p_m_projects.delayed_status = 1 AND projects.project_completion_time BETWEEN ? AND ? THEN 1 ELSE 0 END) as completedDelayedProjectsThisMonth,
                    SUM(CASE WHEN projects.status IN ("finished", "partially finished") AND p_m_projects.delayed_status = 0 AND projects.project_completion_time BETWEEN ? AND ? THEN 1 ELSE 0 END) as completedNonDelayedProjectsThisMonth
                ', [$startDate, $endDate, $startDate, $endDate])
                ->where('projects.pm_id', $user->id)
                ->leftJoin('p_m_projects', 'projects.id', '=', 'p_m_projects.project_id')
                ->first();

                $inProgressDelayedProjects = $result->inProgressDelayedProjects;
                $inProgressNotDelayedProjects = $result->inProgressNotDelayedProjects;
                $completedDelayedProjectsThisMonth = $result->completedDelayedProjectsThisMonth;
                $completedNonDelayedProjectsThisMonth = $result->completedNonDelayedProjectsThisMonth;

                $totalProjects = $inProgressDelayedProjects + $inProgressNotDelayedProjects + $completedDelayedProjectsThisMonth + $completedNonDelayedProjectsThisMonth;
                $delayedPercent = $totalProjects > 0 ? (($inProgressDelayedProjects + $completedDelayedProjectsThisMonth) / $totalProjects) * 100 : 0;
                $delayed_project_percentage = $delayedPercent;
                
                // Project::selectRaw('FORMAT((SUM(CASE WHEN p_m_projects.delayed_status = 1 THEN 1 ELSE 0 END) / SUM(CASE WHEN p_m_projects.delayed_status = NULL THEN 0 ELSE 1 END)) * 100, 2) as delayed_project_percentage')
                // ->join('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
                // ->where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
                // ->first()->delayed_project_percentage;

                $obtainedIncentive[] = Incentive::progressiveStore(4, $user->id, $delayed_project_percentage, $now);
                // End
                
                // Milestone cancelation rate
                $milestone_cancelation_rate = Project::selectRaw('FORMAT((SUM(CASE WHEN project_milestones.status = "canceled" THEN 1 ELSE 0 END) / SUM(CASE WHEN project_milestones.status = "complete" THEN 1 ELSE 0 END)) * 100, 2) as milestone_cancelation_rate')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
                // ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->first()->milestone_cancelation_rate;
                $obtainedIncentive[] = Incentive::progressiveStore(5, $user->id, $milestone_cancelation_rate, $now);
                // End

                // Project dateline miss rate
                $projects = Project::where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])->get();
                $deadline_miss_rate = $projects->count() ? number_format(($projects->where('deadline', '<', $now)->count() / $projects->count()) * 100, 2) : 0;
                $obtainedIncentive[] = Incentive::progressiveStore(6, $user->id, $deadline_miss_rate, $now);
                // End

                // Client retention rate 
                $thisMonthPmClientIds = Project::where('added_by', $user->id)->where('created_at', '>=', $startDate)->pluck('client_id');
                $pevUniqueClientIdsCameThisMonth = array_unique(Project::where('added_by', $user->id)->whereIn('client_id', $thisMonthPmClientIds)->where('created_at', '<', $startDate)->pluck('client_id')->toArray());
                $thisMonthRetentionCliendIds = array_keys(array_filter(array_count_values($thisMonthPmClientIds->toArray()), fn($count) => $count > 1));
                $actualRetentionClientThisMonth = array_diff($thisMonthRetentionCliendIds, $pevUniqueClientIdsCameThisMonth);
                $client_retention_rate = count(array_unique($thisMonthPmClientIds->toArray())) ? ((count($actualRetentionClientThisMonth) + count($pevUniqueClientIdsCameThisMonth))/count(array_unique($thisMonthPmClientIds->toArray())))*100 : 0;
                $obtainedIncentive[] = Incentive::progressiveStore(7, $user->id, $client_retention_rate, $now);
                // End

                if (in_array(0, $obtainedIncentive)) {
                    $achieved_regular_incentive = 0;
                } else {
                    $achieved_regular_incentive = (($totalEarnedPoints - $totalLostPoints) / 100) * (array_sum($obtainedIncentive) / count($obtainedIncentive));
                }

                // Achieved regular bonus
                $incentiveType = IncentiveType::find(1); // Regular incentive type
                AchievedIncentive::create([
                    'date' => $now,
                    'user_id' => $user->id,
                    'incentive_type_id' => 1,
                    'acquired_points' => $totalEarnedPoints - $totalLostPoints,
                    'incentive_point' => $achieved_regular_incentive,
                    'cash_value' => $incentiveType->cash_value,
                    'total_cash_amount' => $incentiveType->cash_value * $achieved_regular_incentive,
                    'created_at' => $now,
                    'updated_at' => $now
                ]);
                $totalCashValue = $incentiveType->cash_value * $achieved_regular_incentive;

                // Upsale/Cross sale amount
                $upsale_amount = ProjectMilestone::select('project_milestones.*')
                ->join('projects','projects.id','project_milestones.project_id')
                ->join('deals','deals.id','projects.deal_id')
                ->where('deals.project_type','fixed')
                ->where('projects.pm_id', $user->id)
                ->where('project_milestones.added_by', $user->id)
                ->where('project_milestones.status','!=','canceled')
                ->whereBetween('project_milestones.created_at', [$startDate, $endDate])
                ->sum('project_milestones.cost');
                $achieved_upsale_incentive = ($upsale_amount / 100) * Incentive::progressiveStore(8, $user->id, $upsale_amount, $now);
                // End

                // Achieved upsale/cross bonus
                $incentiveType = IncentiveType::find(2); // Upsale/Cross sale incentive type
                AchievedIncentive::create([
                    'date' => $now,
                    'user_id' => $user->id,
                    'incentive_type_id' => 2,
                    'acquired_points' => $upsale_amount,
                    'incentive_point' => $achieved_upsale_incentive,
                    'cash_value' => $incentiveType->cash_value,
                    'total_cash_amount' => $incentiveType->cash_value * $achieved_upsale_incentive,
                    'created_at' => $now,
                    'updated_at' => $now
                ]);
                $totalCashValue += $incentiveType->cash_value * $achieved_upsale_incentive;
                
                // Bonus points based on released amount
                $total_previous_assigned_amount = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where('projects.pm_id', $user->id)
                ->whereBetween('project_milestones.created_at', [Carbon::now()->subMonths(2)->startOfMonth(), Carbon::now()->subMonths(2)->endOfMonth()])
                ->where('projects.project_status','Accepted')
                ->sum('cost');
                
                $released_amount_this_month = DB::table('users')
                ->join('projects', 'users.id', '=', 'projects.pm_id')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->join('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                //->whereNotNull('project_milestones.invoice_id')
                ->whereBetween('payments.paid_on', [$startDate, $endDate])
                ->where('payments.added_by', $user->id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');

                $remain_unreleased_amount_last_months = DB::table('projects')
                ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->leftJoin('payments', 'project_milestones.invoice_id', '=', 'payments.invoice_id')
                ->where('project_milestones.created_at', '<', $startDate)
                ->where(function ($q1) use ($startDate) {
                    $q1->whereNull('payments.paid_on')
                        ->orWhere('payments.paid_on', '>', $startDate);
                })
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.pm_id', $user->id)
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');   

                $assigned_amount_this_month = Project::join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
                ->where('projects.pm_id', $user->id)
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
                ->where('payments.added_by', $user->id)
                ->whereNot('project_milestones.status', 'canceled')
                ->where('projects.project_status','Accepted')
                ->sum('project_milestones.cost');
                
                if($total_previous_assigned_amount >= 6000){
                    $acquired_bonus_points = Incentive::progressiveStore(9, $user->id, $released_amount_this_month, $now);
                }else{
                    $released_percent_this_month = $remain_unreleased_amount_last_months + $assigned_amount_this_month ? number_format((($released_amount_this_month)/($remain_unreleased_amount_last_months + $assigned_amount_this_month)) * 100, 2) : 0;
                    $acquired_bonus_points = Incentive::progressiveStore(11, $user->id, $released_percent_this_month, $now);
                }

                // Bonus points based on unreleased amount
                $this_month_released_percent = $assigned_amount_this_month ? round(($released_amount_this_month_assigned / $assigned_amount_this_month) * 100, 2) : 0;
                $previous_months_released_percent = $remain_unreleased_amount_last_months ? round((($released_amount_this_month - $released_amount_this_month_assigned) / $remain_unreleased_amount_last_months) * 100, 2) : 0;
                $achieved_bonus_incentive = 0;
                $total_unreleased_amount_till_now = $remain_unreleased_amount_last_months + $assigned_amount_this_month - $released_amount_this_month;
                $lower_limit = 0;
                $upper_limit = 0;
                foreach(IncentiveCriteria::with('incentiveFactors')->find(10)->incentiveFactors as $factor){
                    $total_unreleased_amount_standard = round(($remain_unreleased_amount_last_months - (($remain_unreleased_amount_last_months / 100)*$factor->lower_limit)) + ($assigned_amount_this_month - (($assigned_amount_this_month / 100)*$factor->upper_limit)), 2);
                    $upper_limit = $total_unreleased_amount_standard;
                    if($lower_limit < $total_unreleased_amount_till_now && $upper_limit >= $total_unreleased_amount_till_now){
                        $achieved_bonus_incentive = ($acquired_bonus_points / 100) * $factor->incentive_amount;
                        ProgressiveIncentive::create([
                            'date' => $now,
                            'pm_id' => $user->id,
                            'incentive_criteria_id' => $factor->incentive_criteria_id,
                            'incentive_factor_id' => $factor->id,
                            'acquired_value' => $total_unreleased_amount_till_now,
                            'incentive_amount_type' => $factor->incentive_amount_type,
                            'incentive_amount' => $factor->incentive_amount,
                            'created_at' => $now,
                            'updated_at' => $now
                        ]);
                        break;
                    }
                    $lower_limit = $upper_limit;
                }
                // End

                // Achieved upsale/cross bonus
                $incentiveType = IncentiveType::find(3); // Bonus point incentive type
                AchievedIncentive::create([
                    'date' => $now,
                    'user_id' => $user->id,
                    'incentive_type_id' => 3,
                    'acquired_points' => $acquired_bonus_points,
                    'incentive_point' => $achieved_bonus_incentive,
                    'cash_value' => $incentiveType->cash_value,
                    'total_cash_amount' => $incentiveType->cash_value * $achieved_bonus_incentive,
                    'created_at' => $now,
                    'updated_at' => $now
                ]);
                $totalCashValue += $incentiveType->cash_value * $achieved_bonus_incentive;

                // Incentive Payment details
                IncentivePayment::create([
                    'date' => $now,
                    'user_id' => $user->id,
                    'total_incentive_amount' => $totalCashValue,
                    'held_amount' => ($totalCashValue/100)*20,
                    'payable_amount' => ($totalCashValue/100)*80,
                    'paid_amount' => ($totalCashValue/100)*80,
                    'status' => 1,
                    'created_at' => $now,
                    'updated_at' => $now
                ]);

                foreach($cashPoints as $cashPoint){
                    $cashPoint->total_points_redeem = $cashPoint->points;
                    $cashPoint->save();
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            throw $th;
            DB::rollBack();
        }
    }
}
