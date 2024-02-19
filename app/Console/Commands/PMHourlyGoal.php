<?php

namespace App\Console\Commands;

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
use App\Models\ProjectTimeLog;

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
        $goals = ProjectPmGoal::where('goal_status', 0)
                ->where('description', null)
                ->whereIn('goal_code', ['HTA', '3HT','4HT','5HT', '6HT', '7HT', '8HT', '10HT', '10HTW', '12HT', '12HTW','15HT', '15HTW', '18HT', '18HTW'])
                ->get();

                foreach($goals as $goal){
                    $current_date = Carbon::now();
                    if($goal->extended_goal_end_day == null){
                        $end_date = $goal->goal_end_date;
                    }else{
                        $end_date = $goal->extended_goal_end_day;
                    }
                    if($goal->goal_code == 'HTA')
                    {
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 60){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '1 hours has been tracked out of 30 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '1 hours has not been tracked out of 30 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }

                    }elseif($goal->goal_code == '3HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 180){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '3 hours has been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '3 hours has not been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '4HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 300){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '4 hours has been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '4 hour has not been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '5HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 300){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '5 hours has been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '5 hour has not been tracked out of 60 hours';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '6HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 360){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '6 hour has been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '6 hour has not been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '7HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 420){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '7 hour has been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '7 hour has not been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '8HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $goal->goal_start_date)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 480){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '8 hour has been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '8 hour has not been tracked out of 5 days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '10HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(6);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 600){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '10 hours has been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '10 hours has not been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '10HTW'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 600){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '10 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '10 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '12HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 720){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '12 hours has been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '12 hours has not been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '12HTW'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 720){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '12 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '12 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '15HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 900){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '15 hours has been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '15 hours has not been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '15HTW'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 900){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '15 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '15 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '18HT'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 1080){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '18 hours has been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '18 hours has not been tracked out of between 6th and 12th days';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }elseif($goal->goal_code == '18HTW'){
                        $goal_update = ProjectPmGoal::where('id',$goal->id)->first();
                        $startDate = Carbon::parse($goal->goal_start_date)->addDay(12);
                        $project_timelog = ProjectTimeLog::where('project_id',$goal_update->project_id)
                        ->where('updated_at', '>=', $startDate)
                        ->where('updated_at', '<', $end_date)
                        ->sum('total_minutes');

                        if($project_timelog >= 1080){
                            $goal_update->goal_status = 1;
                            $goal_update->description = '18 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }else{
                            $goal_update->description = '18 hours has been tracked 1 weekly';
                            $goal_update->updated_at= Carbon::now();
                            $goal_update->save();
                        }
                    }
                }

        $this->info('PM Hourly Goal Check Successfully');
    }
}