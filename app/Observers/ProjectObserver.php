<?php

namespace App\Observers;

use App\Events\NewProjectEvent;
use App\Models\Notification;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\UniversalSearch;
use Illuminate\Support\Facades\DB;

class ProjectObserver
{

    public function saving(Project $project)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $project->last_updated_by = user()->id;
        }

        if (request()->has('added_by')) {
            $project->added_by = request('added_by');
        }
    }

    public function creating(Project $project)
    {
        $project->hash = \Illuminate\Support\Str::random(32);

        if (!isRunningInConsoleOrSeeding() && user()) {
            $project->added_by = user()->id;
        }
    }

    public function created(Project $project)
    {
        if (!$project->public && !empty(request()->user_id)) {
            $project->membersMany()->attach(request()->user_id);
        }

        if (!isRunningInConsoleOrSeeding()) {

            // Send notification to client
            if (!empty(request()->client_id)) {
                event(new NewProjectEvent($project));
            }
        }
    }

    public function updating(Project $project)
    {
        if (request()->public && !empty(request()->user_id)) {
            $project->membersMany()->detach(request()->member_id);
        }
    }

    public function updated(Project $project)
    {
        if (request()->private && !empty(request()->user_id)) {
            $project->membersMany()->attach(request()->user_id);
        }

        if (!isRunningInConsoleOrSeeding()) {

            // Send notification to client
            if (!empty(request()->client_id)) {
                event(new NewProjectEvent($project));
            }

            if ($project->isDirty('project_short_code')) {
                // phpcs:ignore
                DB::statement("UPDATE tasks SET task_short_code = CONCAT( '$project->project_short_code', '-', id ) WHERE project_id = '".$project->id."'; ");
            }

        }
    }

    public function deleting(Project $project)
    {
        $universalSearches = UniversalSearch::where('searchable_id', $project->id)->where('module_type', 'project')->get();

        if ($universalSearches) {
            foreach ($universalSearches as $universalSearch) {
                UniversalSearch::destroy($universalSearch->id);
            }
        }

        $tasks = $project->tasks()->get();

        $notifyData = ['App\Notifications\TaskCompleted','App\Notifications\SubTaskCompleted','App\Notifications\SubTaskCreated','App\Notifications\TaskComment','App\Notifications\TaskCompletedClient','App\Notifications\TaskCommentClient','App\Notifications\TaskNote','App\Notifications\TaskNoteClient','App\Notifications\TaskReminder','App\Notifications\TaskUpdated','App\Notifications\TaskUpdatedClient','App\Notifications\NewTask'];

        foreach($tasks as $task){
            Notification::whereIn('type', $notifyData)
                ->whereNull('read_at')
                ->where(function ($q) use ($task) {
                    $q->where('data', 'like', '{"id":'.$task->id.',%');
                    $q->orWhere('data', 'like', '%,"task_id":'.$task->id.',%');
                })->delete();
        }

        $notifyData = ['App\Notifications\NewProject', 'App\Notifications\NewProjectMember', 'App\Notifications\ProjectReminder','App\Notifications\NewRating'];

        if($notifyData)
        {
            Notification::whereIn('type', $notifyData)
                ->whereNull('read_at')
                ->where(function ($q) use ($project) {
                    $q->where('data', 'like', '{"id":'.$project->id.',%');
                    $q->orWhere('data', 'like', '%"project_id":'.$project->id.',%');
                })->delete();
        }
    }

    public function deleted(Project $project)
    {
        $project->tasks()->delete();
    }

    public function restored(Project $project)
    {
        $project->tasks()->restore();
    }

}
