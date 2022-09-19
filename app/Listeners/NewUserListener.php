<?php

namespace App\Listeners;

use App\Events\NewUserEvent;
use App\Notifications\NewUser;
use Illuminate\Support\Facades\Notification;

class NewUserListener
{

    /**
     * Handle the event.
     *
     * @param  NewUserEvent  $event
     * @return void
     */

    public function handle(NewUserEvent $event)
    {
        Notification::send($event->user, new NewUser($event->password));
    }

}
