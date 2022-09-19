<?php

namespace App\Events;

use App\Models\ProjectTimeLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TimelogEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $timelog;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ProjectTimeLog $timelog)
    {
        $this->timelog = $timelog;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return ['timelog-channel'];
    }

    public function broadcastAs()
    {
        return 'timelog-saved';
    }

}
