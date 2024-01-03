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
      
        $goals= ProjectPmGoal::where('goal_status',0)->where('description',null)->get();
      //  dd($goals);
        foreach ($goals as $goal) {
            $current_date = Carbon::now();
            if($goal->extended_goal_end_day == null)
            {
                $end_date = $goal->goal_end_date;
            }else 
            {
                $end_date = $goal->extended_goal_end_day;
            }
            if($goal->goal_code == 'DCS' && $current_date > $end_date)
            {
               // DB::beginTransaction();
                $goal_update= ProjectPmGoal::where('id',$goal->id)->first();
                $deliverable_sign= ContractSign::where('project_id',$goal->project_id)->first();
               // dd($deliverable_sign);
                $task_count= Task::where('project_id',$goal->project_id)->count();
                $deliverables_count = ProjectDeliverable::where('project_id',$goal->project_id)->count();
              //  dd($deliverables_count -$task_count);
                // $goal_count= ProjectPmGoal::where('project_id',$goal->project_id)->count();
                // $goal_met_count= ProjectPmGoal::where('project_id',$goal->project_id)->count();
                if($deliverable_sign == null && $deliverables_count > 0 &&  $task_count > 0)
                {
                    $goal_update->description = 'Deliverables is not signed and tasks has been created properly';
                }elseif($deliverable_sign == null && $deliverables_count > 0  && $task_count < 1)
                {
                    $goal_update->description = 'Deliverables is not signed and tasks has not been created properly';

                }elseif($deliverable_sign != null && $deliverables_count > 0 &&  $task_count > 0)
                {
                    $goal_update->description = 'Deliverables is signed and tasks has been created properly';

                }elseif($deliverable_sign != null && $deliverables_count > 0 && $task_count < 1)
                {
                    $goal_update->description = 'Deliverables is signed and tasks has not been created properly';

                }else 
                {
                    $goal_update->description = 'Deliverables is not signed and tasks has not been created properly';
                }
                $goal_update->updated_at = Carbon::now();
                $goal_update->save();
              //  dd($goal_update);


            }
        }
        

        //$daily_bonus= User::where('id',Auth::id())->first();
        //dd($daily_bonus->packages->price);
        //dd($sponsor_bonus['royality_bonus']);

        

        $this->info('PM Goal Check Successfully');
    }
}
