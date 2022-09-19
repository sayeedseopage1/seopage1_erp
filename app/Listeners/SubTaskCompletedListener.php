<?php

namespace App\Listeners;

use App\Events\SubTaskCompletedEvent;
use App\Notifications\SubTaskAssigneeAdded;
use App\Notifications\SubTaskCompleted;
use App\Notifications\SubTaskCreated;
use Illuminate\Support\Facades\Notification;

class SubTaskCompletedListener
{

    /**
     * Handle the event.
     *
     * @param  SubTaskCompletedEvent  $event
     * @return void
     */

    public function handle(SubTaskCompletedEvent $event)
    {
        if ($event->status == 'completed') {
            Notification::send($event->subTask->task->users, new SubTaskCompleted($event->subTask));
        }

        elseif ($event->status == 'created') {
            Notification::send($event->subTask->task->users, new SubTaskCreated($event->subTask));
        }

        if($event->subTask->assigned_to && $event->subTask->isDirty('assigned_to')){
            Notification::send($event->subTask->assignedTo, new SubTaskAssigneeAdded($event->subTask));
        }

    }

}
