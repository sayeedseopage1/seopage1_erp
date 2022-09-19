<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewUserRegistrationViaInviteEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $user;
    public $new_user;

    public function __construct(User $user, $newUser)
    {
        $this->user = $user;
        $this->new_user = $newUser;
    }

}
