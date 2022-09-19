<?php

namespace App\Listeners;

use App\Events\TicketEvent;
use App\Notifications\NewTicket;
use App\Notifications\TicketAgent;
use App\Models\User;
use Illuminate\Support\Facades\Notification;

class TicketListener
{

    /**
     * Handle the event.
     *
     * @param  TicketEvent $event
     * @return void
     */

    public function handle(TicketEvent $event)
    {
        if ($event->notificationName == 'NewTicket') {
            Notification::send(User::allAdmins(), new NewTicket($event->ticket));
        }
        elseif ($event->notificationName == 'TicketAgent') {
            Notification::send($event->ticket->agent, new TicketAgent($event->ticket));
        }
    }

}
