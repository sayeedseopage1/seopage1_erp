<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Project;
use Illuminate\Console\Command;
use App\Helper\ProjectManagerPointLogic;

class CheckBillableHoursWeekly extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'check-billable-hours:weekly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Project manager get some point by calculating billable hours of hourly projects';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::where('role_id', 4)->get();

        $users->each(function($user) {
            $projects = Project::select('projects.id')->whereHas('deal', function($deal){
                    $deal->where('project_type', 'hourly');
                })->where('pm_id', $user->id)->whereHas('times', function($timeLogs){
                    $timeLogs->whereBetween('created_at', [Carbon::now()->subDays(200)->startOfDay(), Carbon::now()->endOfDay()]);
                })->withSum(['times' => function($timeLogs){
                    $timeLogs->whereBetween('created_at', [Carbon::now()->subDays(200)->startOfDay(), Carbon::now()->endOfDay()]);
                }], 'total_minutes')
                ->get();
            
            if($referenceProjectId = $projects->isNotEmpty() ? $projects->first()->id : null) {
                $activity = 'You crossed '.(int) ($projects->sum('times_sum_total_minutes') / 60).' hours '.($projects->sum('times_sum_total_minutes') % 60).' minutes billable for your hourly projects this week!';
                ProjectManagerPointLogic::distribute(17, $referenceProjectId, (int) $projects->sum('times_sum_total_minutes') / 60, null, $activity);
            }
        });
    }
}
