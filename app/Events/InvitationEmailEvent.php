<?php

namespace App\Events;

use App\Models\UserInvitation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InvitationEmailEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $invite;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(UserInvitation $invite)
    {
        $this->invite = $invite;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [];
    }

}
