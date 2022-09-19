<?php

namespace App\Listeners;

use App\Events\DiscussionEvent;
use App\Notifications\NewDiscussion;
use Illuminate\Support\Facades\Notification;

class DiscussionListener
{

    /**
     * Handle the event.
     *
     * @param  DiscussionEvent $event
     * @return void
     */

    public function handle(DiscussionEvent $event)
    {
        Notification::send($event->discussion->project->membersMany, new NewDiscussion($event->discussion));
    }

}
