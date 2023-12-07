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



class ProjectManagerAction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'project_manager_action:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Project Manager Action';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $month = '2023-12-07';
        $projects_tasks = Project::where('status', 'in progress')->whereDate('created_at','>=',$month)->get();
        foreach ($projects_tasks as $project) {
            $pm_project= PMProject::where('project_id',$project->id)->orderBy('id','desc')->first();
            $creation_date= $pm_project->created_at;
            $task_submission_date= Carbon::parse($pm_project->created_at)->addDay(5);
            $milestone_submission_date= Carbon::parse($pm_project->created_at)->addDay(7);
            $task = Task::where('project_id', $project->id)
            ->where('subtask_id', null)
            ->whereIn('board_column_id', [9, 4])
            ->count();
           $milestones= ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
            $current_date= Carbon::now();
            if($current_date == $task_submission_date) {
               // dd("true");
                if($task == 0)
            {
                $pending_action = PendingAction::where('code','SFT')->where('project_id',$project->id)->where('past_status',0)->count();
                if($pending_action == 0)
                {
                $helper = new HelperPendingActionController();


                $helper->SubmitFirstTask($project);

            }
        }


            } 
           
            
            
          

        }
        $month = '2023-12-07';
        $projects =  Project::where('status', 'in progress')->whereDate('created_at','>=',$month)->get();
        foreach ($projects as $project) {
            $pm_project= PMProject::where('project_id',$project->id)->orderBy('id','desc')->first();
            $creation_date= $pm_project->created_at;
            $task_submission_date= Carbon::parse($pm_project->created_at)->addDay(5);
            $milestone_submission_date= Carbon::parse($pm_project->created_at)->addDay(7);
            $task = Task::where('project_id',$project->id)->where('subtask_id',null)->whereIn('board_column_id',[9,4])->count();
           $milestones= ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
            $current_date= Carbon::now();
          
            if($current_date >= $milestone_submission_date) {
                // dd("true");
                 if($milestones == 0)
             {
                 $pending_action = PendingAction::where('code','CFM')->where('project_id',$project->id)->where('past_status',0)->count();
                 if($pending_action == 0)
                 {
                    $helper = new HelperPendingActionController();
 
 
                    $helper->CompleteFirstMilestone($project);

                 }
               
 
             }
 
 
             }
            
            
          

        }
     //
      $deadline_projects= Project::where('status','in progress')->get();
      foreach ($deadline_projects as $project) {
        //$pro = Project::where('id', 324)->first();
        $current_date = Carbon::now();
        $deadline = $project->deadline;
        $difference_in_hours = $current_date->diffInHours($deadline);
        
        if ($current_date > $deadline) {
            // Deadline is in the past
            $difference_in_hours = -$difference_in_hours;
        }
        // if($difference_in_hours > 0 && $difference_in_hours <= 48)
        if( $difference_in_hours <= 48)
        {
            $pending_action = PendingAction::where('code','PDA')->where('project_id',$project->id)->where('past_status',0)->count();
            if($pending_action == 0)
            {
                $helper = new HelperPendingActionController();
 
 
                $helper->ProjectDeadline($project, $difference_in_hours);

            }
           


        }
      }
    //   $project_deadlines= PendingAction::where('code','PDA')->where('past_status',0)->get();
    //   foreach($project_deadlines as $action)
    //   {
    //     $oneHourAgo = Carbon::now()->subHour();

    //     PendingAction::where('id', $action->id)
    //     ->where('created_at', '<', $oneHourAgo)
    //     ->update(['created_at' => Carbon::now()]);
    
    // PendingAction::where('id', $action->id)
    //     ->update(['timeframe' => $action->timeframe - 1]);
    //   }
       
        $this->info('Pending action created');
    }
}
