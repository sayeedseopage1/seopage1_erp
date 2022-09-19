<?php

namespace App\Listeners;

use App\Events\InvoicePaymentReceivedEvent;
use App\Notifications\InvoicePaymentReceived;
use App\Models\User;
use Illuminate\Support\Facades\Notification;

class InvoicePaymentReceivedListener
{

    /**
     * Handle the event.
     *
     * @param  InvoicePaymentReceivedEvent  $event
     * @return void
     */

    public function handle(InvoicePaymentReceivedEvent $event)
    {
        Notification::send(User::allAdmins(), new InvoicePaymentReceived($event->payment));
    }

}
