<?php

namespace App\Events;

use App\Models\SubTask;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SubTaskCompletedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $subTask;
    public $status;

    public function __construct(SubTask $subTask, $status)
    {
        $this->subTask = $subTask;
        $this->status = $status;
    }

}
