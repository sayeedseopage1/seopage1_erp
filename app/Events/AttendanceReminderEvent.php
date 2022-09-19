<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AttendanceReminderEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notifyUser;

    public function __construct($notifyUser)
    {
        $this->notifyUser = $notifyUser;
    }

}
