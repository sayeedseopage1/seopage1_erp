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
    protected $description = 'Command description';

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
            
        }
    }
}
