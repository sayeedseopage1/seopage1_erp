<?php

namespace App\Listeners;

use Illuminate\Auth\Events\Login;

class LogSuccessfulLogin
{

    /**
     * Handle the event.
     *
     * @param  Login  $event
     * @return void
     */

    public function handle(Login $event)
    {
        $user = $event->user;
        $user->last_login = now(); /* @phpstan-ignore-line */
        $user->save();
    }

}
