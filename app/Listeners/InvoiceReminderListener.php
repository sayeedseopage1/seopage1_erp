<?php

namespace App\Listeners;

use App\Events\InvoiceReminderEvent;
use App\Notifications\InvoiceReminder;
use Illuminate\Support\Facades\Notification;

class InvoiceReminderListener
{

    /**
     * Handle the event.
     *
     * @param InvoiceReminderEvent $event
     * @return void
     */

    public function handle(InvoiceReminderEvent $event)
    {
        Notification::send($event->notifyUser, new InvoiceReminder($event));
    }

}
