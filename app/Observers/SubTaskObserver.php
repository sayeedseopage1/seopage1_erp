<?php

namespace App\Observers;

use App\Events\SubTaskCompletedEvent;
use App\Models\Notification;
use App\Models\SubTask;

class SubTaskObserver
{

    public function saving(SubTask $task)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $task->last_updated_by = user()->id;
        }
    }

    public function creating(SubTask $task)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $task->added_by = user()->id;
        }
    }

    public function created(SubTask $subTask)
    {
        if (!isRunningInConsoleOrSeeding()) {
            event(new SubTaskCompletedEvent($subTask, 'created'));
        }
    }

    public function updated(SubTask $subTask)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($subTask->isDirty('status') && $subTask->status == 'complete') {
                event(new SubTaskCompletedEvent($subTask, 'completed'));
            }
        }
    }

    public function deleting(SubTask $subTask)
    {
        $notifyData = ['App\Notifications\SubTaskCompleted','App\Notifications\SubTaskCreated'
        ];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":'.$subTask->id.',%')
            ->delete();
    }

}
