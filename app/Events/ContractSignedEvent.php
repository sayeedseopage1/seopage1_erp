<?php

namespace App\Events;

use App\Models\Contract;
use App\Models\ContractSign;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ContractSignedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $contract;
    public $contractSign;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Contract $contract, ContractSign $contractSign)
    {
        $this->contract = $contract;
        $this->contractSign = $contractSign;
    }

}
