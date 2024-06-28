<?php

namespace App\Console\Commands;

use App\Http\Controllers\HelperPendingActionController;
use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use App\Models\ProjectPmGoal;
use Carbon\Carbon;
use App\Models\ContractSign;
use App\Models\ProjectDeliverable;
use DB;
use App\Models\Payment;
use App\Models\ProjectMilestone;
use App\Notifications\PmGoalBeforeExpireNotification;
use App\Notifications\PmGoalMissNotification;
use Notification;

class PMGoal extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pm_goal_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Pm Goal Check';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $time = time();
        ProjectPmGoal::where('goal_status',0)->each(function($item) use($time){
            if ($time > strtotime($item->goal_end_date)) {
                $goalCodes = ProjectPmGoal::$goalCodes[$item->project_type][$item->project_category];
                foreach ($goalCodes as $code) {
                    if ($code['code'] == $item->goal_code) {
                        $item->expired_meet_description = $code['expire'];
                        break;
                    }
                }
                $item->expired_status = 1;
                $item->save();
            }
        });

        $this->info('PM Goal Check Successfully');
    }
}
