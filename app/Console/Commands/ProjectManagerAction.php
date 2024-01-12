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
use App\Models\PendingActionPast;
use App\Models\ProjectDeliverable;



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
            $task_submission_date= Carbon::parse($pm_project->created_at)->addDay(4);

            $task = Task::where('project_id', $project->id)
            ->where('subtask_id', null)
            ->whereIn('board_column_id', [9, 4])
            ->count();

            $current_date= Carbon::now();
            if($current_date > $task_submission_date) {
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
      //  dd("djasnd");
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
     $month = '2023-12-07';
   //  $projects =  Project::where('status', 'in progress')->whereDate('created_at','>=',$month)->get();
      $deadline_projects= Project::where('status', 'in progress')->whereDate('created_at','>=',$month)->get();
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
      $p_actions = PendingAction::where('code','CT')->where('past_status',0)->get();
      foreach($p_actions as $p_action)
      {
        $project= Project::where('id',$p_action->project_id)->first();
        $task_count= Task::where('project_id',$project->id)->count();
        if($task_count > 0)
        {
            $project_manager= User::where('id',$project->pm_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $authorize_by= User::where('id',$p_action->authorization_for)->first();

            $action= PendingAction::where('id',$p_action->id)->first();
            $action->authorized_by= $authorize_by->id;
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();



            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            $past_action->heading = $action->heading;
            $past_action->message = 'All the tasks for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> were created by the PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>!';
          //  $past_action->button = $action->button;
            $past_action->timeframe = $action->timeframe;
            $past_action->authorization_for = $action->authorization_for;
            $past_action->authorized_by = $action->authorized_by;
            $past_action->authorized_at = $action->authorized_at;
            $past_action->expired_status = $action->expired_status;
            $past_action->past_status = $action->past_status;
            $past_action->project_id = $action->project_id;
            $past_action->task_id = $action->task_id;
            $past_action->client_id = $action->client_id;
           // $past_action->deliverable_id = $action->deliverable_id;
            $past_action->save();


        }

      }
      $pen_actions = PendingAction::where('code','DCA')->where('past_status',0)->get();
      foreach($pen_actions as $p_action)
      {
        $project= Project::where('id',$p_action->project_id)->first();
        $deliverable_count= ProjectDeliverable::where('project_id',$project->id)->count();
        if($deliverable_count > 0)
        {
            $project_manager= User::where('id',$project->pm_id)->first();
            $client= User::where('id',$project->client_id)->first();
            $authorize_by= User::where('id',$p_action->authorization_for)->first();

            $action= PendingAction::where('id',$p_action->id)->first();
            $action->authorized_by= $authorize_by->id;
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();



            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            $past_action->heading = $action->heading;
            $past_action->message = 'Deliverables for project <a href="'.route('projects.show',$project->id).'">'.$project->project_name.'</a> from the client <a href="'.route('clients.show',$client->id).'">'.$client->name.'</a> was created by <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>!';
          //  $past_action->button = $action->button;
            $past_action->timeframe = $action->timeframe;
            $past_action->authorization_for = $action->authorization_for;
            $past_action->authorized_by = $action->authorized_by;
            $past_action->authorized_at = $action->authorized_at;
            $past_action->expired_status = $action->expired_status;
            $past_action->past_status = $action->past_status;
            $past_action->project_id = $action->project_id;
            $past_action->task_id = $action->task_id;
            $past_action->client_id = $action->client_id;
           // $past_action->deliverable_id = $action->deliverable_id;
            $past_action->save();


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
