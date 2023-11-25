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
        $projects = Project::where('status','in progress')->get();
        foreach ($projects as $project) {
            $pm_project= PMProject::where('project_id',$project->id)->orderBy('id','desc')->first();
            $creation_date= $pm_project->created_at;
            $task_submission_date= Carbon::parse($pm_project->created_at)->addDay(5);
            $task = Task::where('project_id',$project->id)->first();
            if($task != null)
            {
                $task_submission = TaskRevision::where('task_id',$task->id)->count();
            }

            dd($creation_date, $task_submission_date);

        }
        $this->info('Pending action expired');
    }
}
