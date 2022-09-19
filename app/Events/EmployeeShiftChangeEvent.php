<?php

namespace App\Events;

use App\Models\EmployeeShiftChangeRequest;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmployeeShiftChangeEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $changeRequest;
    public $statusChange;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(EmployeeShiftChangeRequest $changeRequest, $status = null)
    {
        $this->changeRequest = $changeRequest;
        $this->statusChange = $status;
    }

}
