<?php

namespace App\Console\Commands;

use App\Models\ProjectMilestone;
use Illuminate\Console\Command;
use App\Models\PMProject;
use App\Models\ProjectRequestTimeExtension;

use App\Models\User;
use App\Models\Project;
use DateTime;
use Carbon\Carbon;
use Notification;

class CompletedProjectCheck extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'completed_project_check:daily';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Project Completion check Daily';


    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $projects= Project::select('projects.*')
        ->join('deals','deals.id','projects.deal_id')
        ->where('deals.project_type','fixed')
        
        ->where('status','in progress')
        ->get();
  
          //$daily_bonus= User::where('id',Auth::id())->first();
          //dd($daily_bonus->packages->price);
          //dd($sponsor_bonus['royality_bonus']);
  
          foreach ($projects as $project) {
            $total_milestones= ProjectMilestone::where('project_id',$project->id)->count();
            $completed_milestones= ProjectMilestone::select('project_milestones.*')
            ->leftJoin('invoices','invoices.milestone_id','project_milestones.id')
            ->where('invoices.status','paid')->where('project_milestones.project_id',$project->id)->count();
            $canceled_milestones=ProjectMilestone::where('status','canceled')->where('project_id',$project->id)->count();

            if($project->due < 3 && $canceled_milestones == 0)
            {
                $update_project = Project::where('id',$project->id)->first();
                $update_project->status = 'finished';
                $update_project->save();
            }elseif($project->due < 3 && $canceled_milestones != 0)
            {
                $update_project = Project::where('id',$project->id)->first();
                $update_project->status = 'partially finished';
                $update_project->save();

            }
           
            if ($total_milestones == $completed_milestones && $canceled_milestones == 0 && $project->due < 3) {
                $update_project = Project::where('id',$project->id)->first();
                $update_project->status = 'finished';
                $update_project->save();
            }elseif($total_milestones == ($completed_milestones+ $canceled_milestones) && $canceled_milestones != 0 && $project->due < 3)
            {
                $update_project = Project::where('id',$project->id)->first();
                $update_project->status = 'partially finished';
                $update_project->save();

            }

  
            
                 
  
  
          }
  
          $this->info('Project marks as completed');
    }
}
