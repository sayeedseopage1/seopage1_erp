<?php

namespace App\Observers;

use App\Events\TaskCommentEvent;
use App\Models\Task;
use App\Models\TaskComment;

class TaskCommentObserver
{

    public function saving(TaskComment $comment)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $comment->last_updated_by = user()->id;
        }
    }

    public function creating(TaskComment $comment)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $comment->added_by = user()->id;
        }
    }

    public function created(TaskComment $comment)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $task = Task::with(['project'])->findOrFail($comment->task_id);

            if ($task->project_id != null) {
                if ($task->project->client_id != null && $task->project->allow_client_notification == 'enable') {
                    event(new TaskCommentEvent($task, $comment, $task->project->client, 'client'));
                }
            }

            event(new TaskCommentEvent($task, $comment, $task->users));
        }
    }

}
