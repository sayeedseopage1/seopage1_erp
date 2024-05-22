<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use App\Models\CashPoint;
use App\Models\TaskRevision;
use Illuminate\Console\Command;

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
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();
        $users = User::where('role_id',4)->get();
        
        foreach($users as $user){
            $cashPoints = CashPoint::whereNotNull('factor_id')->get();
            $totalEarnedPoints = $cashPoints->sum('total_points_earn');
            $totalLostPoints = $cashPoints->sum('total_points_lost');
            $availablePoints = $totalEarnedPoints - $totalLostPoints;
            
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

            $revision_percent = number_format(( $pm_revisions / $total_tasks ) * 100, 2);
            
            // Goal achieve rate
            $projects = Project::select(['id','project_name','pm_id','status','project_status'])
            ->where([['pm_id', $user->id],['status', 'in progress'],['project_status', 'Accepted']])
            ->withCount(['pmGoals as total_goals' => function($pmGoal){
                return $pmGoal->where('goal_status', 0)->where('goal_end_date', '<=', now());
            }])
            ->withCount(['pmGoals as total_goals_met' => function($pmGoal){
                return $pmGoal->where('goal_status', 1);
            }])
            ->get();

            $goal_achieved_percent = $projects->sum('total_goals') ? number_format(($projects->sum('total_goals_met') / $projects->sum('total_goals')) * 100, 2) : 0; 

            // Negative vs poisitive point
            $total_points = $totalEarnedPoints + $totalLostPoints;
            $negative_point_rete = $total_points ? number_format(($totalLostPoints / $total_points) * 100, 2) : 0;

            // Percentage of delayed project
            $delayed_project_percentage = Project::selectRaw('FORMAT((SUM(CASE WHEN p_m_projects.delayed_status = 1 THEN 1 ELSE 0 END) / SUM(CASE WHEN p_m_projects.delayed_status = NULL THEN 0 ELSE 1 END)) * 100, 2) as delayed_project_percentage')
            ->join('p_m_projects', 'p_m_projects.project_id', '=', 'projects.id')
            ->where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
            ->first()->delayed_project_percentage;
            
            // Milestone cancelation rate
            $milestone_cancelation_rate = Project::selectRaw('FORMAT((SUM(CASE WHEN project_milestones.status = "canceled" THEN 1 ELSE 0 END) / SUM(CASE WHEN project_milestones.status = "complete" THEN 1 ELSE 0 END)) * 100, 2) as milestone_cancelation_rate')
            ->join('project_milestones', 'projects.id', '=', 'project_milestones.project_id')
            ->where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])
            ->whereBetween('project_milestones.created_at', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
            ->first()->milestone_cancelation_rate;

            // Project dateline miss rate
            $projects = Project::where([['projects.pm_id', $user->id],['projects.status', 'in progress'],['projects.project_status', 'Accepted']])->get();
            $deadline_miss_rate = number_format(($projects->where('deadline', '<', now())->count() / $projects->count()) * 100, 2);
            
            // Client retention rate 
            $pm_created_clients = Project::where('added_by', $user->id)->where('created_at', '>=', Carbon::now()->startOfMonth())->pluck('client_id');
            $pm_assigned_clients = Project::where('pm_id', $user->id)->whereIn('client_id', $pm_created_clients)->where('created_at', '>=', Carbon::now()->startOfMonth())->pluck('client_id')->toArray();
            $retension_this_month = count(array_keys(array_filter(array_count_values($pm_assigned_clients), fn($count) => $count > 1)));
            $client_retention_rate = number_format(((Project::whereIn('client_id', $pm_created_clients)->where('pm_id', $user->id)->where('created_at', '<=', Carbon::now()->startOfMonth())->pluck('client_id')->count() + $retension_this_month) / $pm_created_clients->count())*100, 2);
            dd($client_retention_rate);
        }
    }
}
