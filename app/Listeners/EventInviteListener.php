<?php

namespace App\Listeners;

use App\Events\EventInviteEvent;
use App\Notifications\EventInvite;
use Illuminate\Support\Facades\Notification;

class EventInviteListener
{

    /**
     * Handle the event.
     *
     * @param  EventInviteEvent $event
     * @return void
     */

    public function handle(EventInviteEvent $event)
    {
        Notification::send($event->notifyUser, new EventInvite($event->event));
    }

}
