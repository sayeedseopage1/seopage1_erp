<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\ContractSignedEvent;
use App\Notifications\ContractSigned;
use Illuminate\Support\Facades\Notification;

class ContractSignedListener
{

    /**
     * Handle the event.
     *
     * @param  \App\Events\ContractSignedEvent  $event
     * @return void
     */
    public function handle(ContractSignedEvent $event)
    {
        Notification::send(User::allAdmins(), new ContractSigned($event->contract, $event->contractSign));
    }

}
