<?php

namespace App\Listeners;

use App\Events\NewChatEvent;
use App\Models\User;
use App\Notifications\NewChat;
use Illuminate\Support\Facades\Notification;

class NewChatListener
{

    /**
     * Handle the event.
     *
     * @param  NewChatEvent $event
     * @return void
     */

    public function handle(NewChatEvent $event)
    {
        $notifyUser = User::withoutGlobalScope('active')->findOrFail($event->userChat->user_id);
        Notification::send($notifyUser, new NewChat($event->userChat));
    }

}
