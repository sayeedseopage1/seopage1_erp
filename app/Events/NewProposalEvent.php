<?php

namespace App\Events;

use App\Models\Invoice;
use App\Models\Proposal;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewProposalEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $proposal;
    public $notifyUser;
    public $type;

    public function __construct(Proposal $proposal, $type)
    {
        $this->proposal = $proposal;
        $this->type = $type;
    }

}
