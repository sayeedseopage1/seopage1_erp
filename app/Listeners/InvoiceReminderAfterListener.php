<?php

namespace App\Listeners;

use App\Events\InvoiceReminderAfterEvent;
use App\Notifications\InvoiceReminderAfter;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Notification;

class InvoiceReminderAfterListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */

    public function handle(InvoiceReminderAfterEvent $event)
    {
        Notification::send($event->notifyUser, new InvoiceReminderAfter($event));
    }

}
