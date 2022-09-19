<?php

namespace App\Listeners;

use App\Events\TaskEvent;
use App\Notifications\NewTask;
use App\Notifications\TaskUpdated;
use App\Notifications\NewClientTask;
use App\Notifications\TaskCompleted;
use App\Notifications\TaskUpdatedClient;
use App\Notifications\TaskCompletedClient;
use Illuminate\Support\Facades\Notification;

class TaskListener
{

    /**
     * Handle the event.
     *
     * @param  TaskEvent $event
     * @return void
     */

    public function handle(TaskEvent $event)
    {
        if (!$event->task->is_private) {
            if ($event->notificationName == 'NewClientTask') {
                Notification::send($event->notifyUser, new NewClientTask($event->task));
            }
            elseif ($event->notificationName == 'NewTask') {
                Notification::send($event->notifyUser, new NewTask($event->task));
            }
            elseif ($event->notificationName == 'TaskUpdated') {
                Notification::send($event->notifyUser, new TaskUpdated($event->task));
            }
            elseif ($event->notificationName == 'TaskCompleted') {
                Notification::send($event->notifyUser, new TaskCompleted($event->task));
            }
            elseif ($event->notificationName == 'TaskCompletedClient') {
                Notification::send($event->notifyUser, new TaskCompletedClient($event->task));
            }
            elseif ($event->notificationName == 'TaskUpdatedClient') {
                Notification::send($event->notifyUser, new TaskUpdatedClient($event->task));
            }
        }
    }

}
