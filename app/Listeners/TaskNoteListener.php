<?php

namespace App\Listeners;

use App\Events\TaskNoteEvent;
use App\Notifications\TaskNote;
use App\Notifications\TaskNoteClient;
use Illuminate\Support\Facades\Notification;

class TaskNoteListener
{

    /**
     * @param TaskNoteEvent $event
     */

    public function handle(TaskNoteEvent $event)
    {
        if($event->client == 'client'){
            Notification::send($event->notifyUser, new TaskNoteClient($event->task, $event->created_at));
        }
        else{
            Notification::send($event->notifyUser, new TaskNote($event->task, $event->created_at));
        }
    }

}
