<?php

namespace App\Observers;

use App\Events\InvitationEmailEvent;
use App\Models\UserInvitation;

class UserInvitationObserver
{

    public function created(UserInvitation $invite)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($invite->invitation_type == 'email') {
                event(new InvitationEmailEvent($invite));
            }
        }
    }

}
