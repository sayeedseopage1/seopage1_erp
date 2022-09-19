<?php

namespace App\Events;

use App\Models\LeadFollowUp;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AutoFollowUpReminderEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $followup;

    public function __construct(LeadFollowUp $followup)
    {
        $this->followup = $followup;
    }

}
