<?php

namespace App\Listeners;

use App\Events\TaskCommentEvent;
use App\Notifications\TaskComment;
use App\Notifications\TaskCommentClient;
use Illuminate\Support\Facades\Notification;

class TaskCommentListener
{

    /**
     * Handle the event.
     *
     * @param  TaskCommentEvent $event
     * @return void
     */

    public function handle(TaskCommentEvent $event)
    {
        if($event->client == 'client'){
            Notification::send($event->notifyUser, new TaskCommentClient($event->task, $event->comment));
        }
        else{
            Notification::send($event->notifyUser, new TaskComment($event->task, $event->comment));
        }
    }

}
