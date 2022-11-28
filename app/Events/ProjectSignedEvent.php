<?php

namespace App\Events;

use App\Models\Project;
use App\Models\ContractSign;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ProjectSignedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $project;
    public $contractSign;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Project $project, ContractSign $contractSign)
    {
        $this->project = $project;
        $this->contractSign = $contractSign;
    }

}
