<?php

namespace App\Events;

use App\Models\Lead;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LeadEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $task;
    public $notifyUser;
    public $notificationName;
    /**
     * @var Lead
     */
    public $lead;

    public function __construct(Lead $lead, $notifyUser, $notificationName)
    {
        $this->lead = $lead;
        $this->notifyUser = $notifyUser;
        $this->notificationName = $notificationName;
    }

}
