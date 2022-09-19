<?php

namespace App\Listeners;

use App\Events\RemovalRequestAdminLeadEvent;
use App\Notifications\RemovalRequestAdminNotification;
use App\Models\User;
use Illuminate\Support\Facades\Notification;

class RemovalRequestAdminLeadListener
{

    /**
     * Handle the event.
     *
     * @param  RemovalRequestAdminLeadEvent $event
     * @return void
     */
    // phpcs:ignore
    public function handle(RemovalRequestAdminLeadEvent $event)
    {
        Notification::send(User::allAdmins(), new RemovalRequestAdminNotification());
    }

}
