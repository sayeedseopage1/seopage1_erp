<?php

namespace App\Observers;

use App\Events\TaskNoteEvent;
use App\Models\Task;
use App\Models\TaskNote;

class TaskNoteObserver
{

    public function saving(TaskNote $note)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $note->last_updated_by = user()->id;
        }
    }

    public function creating(TaskNote $note)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $note->added_by = user()->id;
        }
    }

    public function created(TaskNote $note)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $task = Task::with(['project'])->findOrFail($note->task_id);

            if ($task->project_id != null) {
                if ($task->project->client_id != null && $task->project->allow_client_notification == 'enable') {
                    event(new TaskNoteEvent($task, $note->created_at, $task->project->client, 'client'));
                }

                event(new TaskNoteEvent($task, $note->created_at, $task->project->membersMany));
            }
            else {
                event(new TaskNoteEvent($task, $note->created_at, $task->users));
            }
        }
    }

}
