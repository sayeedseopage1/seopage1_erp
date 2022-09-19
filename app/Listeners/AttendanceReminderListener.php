<?php

namespace App\Listeners;

use App\Events\AttendanceReminderEvent;
use App\Notifications\AttendanceReminder;
use Illuminate\Support\Facades\Notification;

class AttendanceReminderListener
{

    /**
     * Handle the event.
     * @param AttendanceReminderEvent $event
     * @return void
     */
    public function handle(AttendanceReminderEvent $event)
    {
        Notification::send($event->notifyUser, new AttendanceReminder());
    }

}
