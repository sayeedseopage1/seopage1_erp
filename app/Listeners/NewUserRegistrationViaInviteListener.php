<?php

namespace App\Listeners;

use App\Events\NewUserRegistrationViaInviteEvent;
use App\Notifications\NewUserViaLink;
use Illuminate\Support\Facades\Notification;

class NewUserRegistrationViaInviteListener
{

    public function handle(NewUserRegistrationViaInviteEvent $event)
    {
        Notification::send($event->user, new NewUserViaLink($event->new_user));
    }

}
