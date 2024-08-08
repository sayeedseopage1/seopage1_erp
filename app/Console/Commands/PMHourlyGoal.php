<?php

namespace App\Console\Commands;

use App\Listeners\PmGoalEventListener;
use Illuminate\Console\Command;
use App\Models\ProjectPmGoal;
use App\Models\ProjectTimeLog;
use Carbon\Carbon;
use DateTime;

class PMHourlyGoal extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pm_hourly_goal_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pm Hourly Goal Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // not finished hourly projects in pm goals
        ProjectPmGoal::select('project_id')->where([
            'project_type' => 'hourly',
            'expired_status' => 0,
        ])->groupBy('project_id')->get()->map(function ($item) {

            // dd($item->project_id);
            $logMinutes = 0;
            ProjectTimeLog::where('project_id', $item->project_id)->whereNotNull('start_time')->whereNull('end_time')
                ->get()->map(function ($logItem) use (&$logMinutes) {
                    // dd($logItem);

                    $datetime1 = Carbon::parse($logItem->start_time);
                    $datetime2 = Carbon::now();
                    // dump($datetime1, $datetime2);
                    $logMinutes += $datetime1->diffInMinutes($datetime2);
                    // dd($logMinutes);
                });
            if ($logMinutes > 0) {
                $totalMinutes = ProjectTimeLog::where('project_id', $item->project_id)->sum('total_minutes');
                // dd($logMinutes, $totalMinutes);
                (new PmGoalEventListener())->hourlyGoalCompletion(null, ['projectId' => $item->project_id, 'totalMinute' => $logMinutes + $totalMinutes]);
            }
        });

        $this->info('PM Hourly Goal Check Successfully');
    }
}
