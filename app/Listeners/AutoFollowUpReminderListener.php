<?php

namespace App\Listeners;

use App\Events\AutoFollowUpReminderEvent;
use App\Notifications\AutoFollowUpReminder;
use Illuminate\Support\Facades\Notification;

class AutoFollowUpReminderListener
{

    /**
     * Handle the event.
     *
     * @param AutoFollowUpReminderEvent $event
     * @return void
     */

    public function handle(AutoFollowUpReminderEvent $event)
    {
        $notifyUser = ($event->followup->lead && $event->followup->lead->leadAgent && $event->followup->lead->leadAgent->user) ? $event->followup->lead->leadAgent->user : ($event->followup->lead->added_by ? $event->followup->lead->addedBy() : $event->followup->addedBy());

        if($notifyUser) {
            Notification::send($notifyUser, new AutoFollowUpReminder($event->followup));
        }

    }

}
