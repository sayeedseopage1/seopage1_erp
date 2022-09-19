<?php

namespace App\Observers;

use App\Events\NewUserEvent;
use App\Models\TicketAgentGroups;
use App\Models\User;

class UserObserver
{

    public function saving(User $user)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($user->isDirty('status') && $user->status == 'deactive') {
                // Remove as ticket agent
                TicketAgentGroups::whereAgentId($user->id)->delete();
            }
        }
    }

    public function created(User $user)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $sendMail = true;

            if (request()->has('sendMail') && request()->sendMail == 'no') {
                $sendMail = false;
            }

            if ($sendMail && request()->password != '' && auth()->check() && request()->email != '') {
                event(new NewUserEvent($user, request()->password));
            }
        }
    }

}
