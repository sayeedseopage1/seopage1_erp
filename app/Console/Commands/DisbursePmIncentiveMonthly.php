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
            ->where([['pm_id', 209],['status', 'in progress'],['project_status', 'Accepted']])
            ->withCount(['pmGoals as total_goals' => function($pmGoal){
                return $pmGoal->where('goal_status', 0)->where('goal_end_date', '<=', now());
            }])
            ->withCount(['pmGoals as total_goals_met' => function($pmGoal){
                return $pmGoal->where('goal_status', 1);
            }])
            ->get();

            $goal_achieved_percent = ($projects->sum('total_goals_met') / $projects->sum('total_goals')) * 100;
        }
    }
}
