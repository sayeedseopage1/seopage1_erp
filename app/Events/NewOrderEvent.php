<?php

namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public $order;
    public $notifyUser;

    public function __construct(Order $order, $notifyUser)
    {
        $this->order = $order;
        $this->notifyUser = $notifyUser;
    }

}
