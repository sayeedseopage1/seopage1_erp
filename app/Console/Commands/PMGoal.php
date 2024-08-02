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

            $goal_check = ProjectPmGoal::where('id',$item->id)->first();
            /** WHEN GOAL DEADLINE EXPIRE IN NEXT 24 HOURS */
            $currentTime = Carbon::now();
            
            $goal_end_date = Carbon::parse($goal_check->goal_end_date)->subDays(1);
            if($goal_check->goal_end_date >= $currentTime && $goal_end_date <=$currentTime){
                $difference_in_hours = $currentTime->diffInHours($goal_end_date);
                $difference_in_hours += 1;
                if( $difference_in_hours <= 24)
                {
                    if($goal_check->mail_status == 0){
                        $helper = new HelperPendingActionController();
                        $helper->PmGoalBeforeExpireCheck($goal_check, $difference_in_hours);
                        $user  = User::where('id',$goal_check->pm_id)->first();
                        Notification::send($user, new PmGoalBeforeExpireNotification($goal_check));
                    }
                }
            }
            /**WHEN GOAL DEADLINE OVER*/
            $current_date = now();
            $goal_end_date = Carbon::parse($goal_check->goal_end_date)->addHours(24);
            if($goal_check->goal_status ==0 && $goal_check->goal_end_date <= $current_date){
                if($goal_check->mail_status == 1 || $goal_check->mail_status == 0){
                    $helper = new HelperPendingActionController();
                    $helper->PmGoalDeadlineCheck(ProjectPmGoal::where('id',$item->id)->first());
                    $user = User::where('id',$goal_check->pm_id)->get();
                    Notification::send($user, new PmGoalMissNotification($goal_check));
                }
            }
        });

        $this->info('PM Goal Check Successfully');
    }
}
