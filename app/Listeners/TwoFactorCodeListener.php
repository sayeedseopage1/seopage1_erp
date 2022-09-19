<?php

namespace App\Listeners;

use App\Events\TwoFactorCodeEvent;
use App\Notifications\TwoFactorCode;

class TwoFactorCodeListener
{

    /**
     * Handle the event.
     *
     * @param  \App\Events\TwoFactorCodeEvent  $event
     * @return void
     */
    public function handle(TwoFactorCodeEvent $event)
    {
        $event->user->notify(new TwoFactorCode());
    }

}
