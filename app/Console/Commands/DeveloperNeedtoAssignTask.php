<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\PendingAction;
use DB;
use App\Models\Project;
use App\Models\User;
use App\Models\Task;
use App\Models\PMProject;
use Carbon\Carbon;
use App\Models\TaskSubmission;
use App\Models\TaskRevision;
use App\Models\ProjectMilestone;
use App\Http\Controllers\HelperPendingActionController;
use App\Models\ProjectSubmission;

class DeveloperNeedtoAssignTask extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lead_developer_action:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Lead Developer Pending action';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $month = '2023-12-01';
        $projects_tasks = Project::where('status', 'finished')->whereDate('created_at','>=',$month)->get();
        //dd(count($projects_tasks));

        foreach ($projects_tasks as $project) {
            $project_submission = ProjectSubmission::where('project_id', $project->id)->first();
        
            if ($project_submission != null) {
                $creation_date = $project_submission->created_at;
                $project_submission_date = Carbon::parse($project_submission->created_at)->addDay(14);
        
                $current_date = Carbon::now();
        
                if ($current_date >= $project_submission_date && $project_submission->dummy_link != null) {
                    $pending_action = PendingAction::where('code','STR')->where('project_id',$project->id)->where('past_status',0)->count();
                    if($pending_action == 0)
                    {
                        $helper = new HelperPendingActionController();
                        $helper->RemovalofStagingSite($project, $project_submission);

                    }
                   
                }
            }
        }
        $developers= User::where('role_id',5)->where('activation_status',1)->get();
        foreach ($developers as $developer) {
            $estimate_hours= Task::leftJoin('task_users','tasks.id','task_users.task_id')->whereIn('tasks.board_column_id',[2,3])
            ->where('task_users.user_id',$developer->id)->sum('tasks.estimate_hours');
            $estimate_minutes= Task::leftJoin('task_users','tasks.id','task_users.task_id')->whereIn('tasks.board_column_id',[2,3])
            ->where('task_users.user_id',$developer->id)->sum('tasks.estimate_minutes');
            $estimate_total_minutes = $estimate_hours*60 + $estimate_minutes;
            $logged_minutes= Task::leftJoin('task_users','tasks.id','task_users.task_id')
            ->leftJoin('project_time_logs','project_time_logs.task_id','tasks.id')
            ->whereIn('tasks.board_column_id',[2,3])
            ->where('project_time_logs.user_id',$developer->id)
            ->where('task_users.user_id',$developer->id)->sum('project_time_logs.total_minutes');
          //  dd($developer,$logged_minutes,$estimate_total_minutes);
          if($estimate_total_minutes != 0)
          {

         
            if ($logged_minutes/$estimate_total_minutes*100 >= 80) {
                $pending_action= PendingAction::where('developer_id',$developer->id)->where('past_status',0)->count();
                if($pending_action == 0)
                {
                    $helper = new HelperPendingActionController();
                    $helper->NeedtoTaskAssign($developer);

                }
             
                
            }
        }
        }
        $actions= PendingAction::where('code','TSA')->where('past_status',0)->get();
        foreach ($actions as $action) {
           $creation_date = Carbon::parse($action->created_at)->addHours(21);
          //  dd($developer,$logged_minutes,$estimate_total_minutes);
          $current_date = Carbon::now();
          if($current_date >= $creation_date )
          {
            $update_action= PendingAction::find($action->id);
            $update_action->heading = 'New Submission Expiry Warning!';
            $update_action->created_at = Carbon::now();
            $update_action->updated_at = Carbon::now();
           // $update_action->timeframe = 48;
            $update_action->save();

         
           
        }
        }
        $actions= PendingAction::where('code','TDQ')->where('past_status',0)->get();
        foreach ($actions as $action) {
            $creation_date = Carbon::parse($action->created_at)->addHours(46);
           //  dd($developer,$logged_minutes,$estimate_total_minutes);
           $current_date = Carbon::now();
           if($current_date >= $creation_date )
           {
             $update_action= PendingAction::find($action->id);
             $update_action->created_at = Carbon::now();
             $update_action->updated_at = Carbon::now();
             //$update_action->timeframe = 2;
             $update_action->save();
 
          
            
         }
         }
         $deadline_tasks = Task::whereIn('board_column_id', [2, 3])
    ->whereNotNull('due_date')
    ->get();

      foreach ($deadline_tasks as $project) {
        $pro = Project::where('id', $project->project_id)->first();
        $current_date = Carbon::now();
        $deadline = $project->due_date;
        $difference_in_hours = $current_date->diffInHours($deadline);
        
        if ($current_date > $deadline) {
            // Deadline is in the past
            $difference_in_hours = -$difference_in_hours;
        }
       // dd($difference_in_hours)
      //  if($difference_in_hours > 0 && $difference_in_hours <= 18)
       if($difference_in_hours <= 18)
        {
            $pending_action = PendingAction::where('code','DTDA')->where('task_id',$project->id)->where('past_status',0)->count();
            if($pending_action == 0 && $pro->status == 'in progress')
            {
                $helper = new HelperPendingActionController();
 
 
                $helper->TaskDeadline($project, $difference_in_hours);

            }
           


        }
      }
    
       


        
        $this->info('Pending action created');
        
    }
}
