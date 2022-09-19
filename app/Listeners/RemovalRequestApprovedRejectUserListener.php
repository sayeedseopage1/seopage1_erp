<?php

namespace App\Listeners;

use App\Events\RemovalRequestApprovedRejectUserEvent;
use App\Notifications\RemovalRequestApprovedRejectUser;
use Illuminate\Support\Facades\Notification;

class RemovalRequestApprovedRejectUserListener
{

    /**
     * Handle the event.
     *
     * @param  RemovalRequestApprovedRejectUserEvent $event
     * @return void
     */

    public function handle(RemovalRequestApprovedRejectUserEvent $event)
    {
        Notification::send($event->removal->user, new RemovalRequestApprovedRejectUser($event->removal->status));
    }

}
