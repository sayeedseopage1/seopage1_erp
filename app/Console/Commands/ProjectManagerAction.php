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
        $projects_tasks = Project::where('status','in progress')->get();
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
                $helper = new HelperPendingActionController();


                $helper->SubmitFirstTask($project);

            }


            } 
           
            
            
          

        }
        $projects = Project::where('status','in progress')->get();
        foreach ($projects as $project) {
            $pm_project= PMProject::where('project_id',$project->id)->orderBy('id','desc')->first();
            $creation_date= $pm_project->created_at;
            $task_submission_date= Carbon::parse($pm_project->created_at)->addDay(5);
            $milestone_submission_date= Carbon::parse($pm_project->created_at)->addDay(7);
            $task = Task::where('project_id',$project->id)->where('subtask_id',null)->whereIn('board_column_id',[9,4])->count();
           $milestones= ProjectMilestone::where('project_id',$project->id)->where('status','complete')->count();
            $current_date= Carbon::now();
          
            if($current_date == $milestone_submission_date) {
                // dd("true");
                 if($milestones == 0)
             {
                 $helper = new HelperPendingActionController();
 
 
                 $helper->CompleteFirstMilestone($project);
 
             }
 
 
             }
            
            
          

        }
       
        $this->info('Pending action created');
    }
}
