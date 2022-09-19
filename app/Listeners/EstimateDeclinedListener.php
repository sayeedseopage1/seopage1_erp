<?php

namespace App\Listeners;

use App\Events\EstimateDeclinedEvent;
use App\Notifications\EstimateDeclined;
use App\Models\User;
use Illuminate\Support\Facades\Notification;

class EstimateDeclinedListener
{

    /**
     * Handle the event.
     *
     * @param  EstimateDeclinedEvent  $event
     * @return void
     */

    public function handle(EstimateDeclinedEvent $event)
    {
        Notification::send(User::allAdmins(), new EstimateDeclined($event->estimate));
    }

}
