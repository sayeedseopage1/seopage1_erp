<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\NewOrderEvent;
use App\Notifications\NewOrder;
use Illuminate\Support\Facades\Notification;

class NewOrderListener
{

    /**
     * Handle the event.
     *
     * @param  NewOrderEvent  $event
     * @return void
     */

    public function handle(NewOrderEvent $event)
    {
        Notification::send($event->notifyUser, new NewOrder($event->order));
        Notification::send(User::allAdmins(), new NewOrder($event->order));
    }

}
