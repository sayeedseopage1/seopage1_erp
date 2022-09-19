<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InvoiceReminderEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $notifyUser;
    public $invoice;
    public $invoice_setting;

    public function __construct($invoice, $notifyUser, $invoice_setting)
    {
        $this->invoice = $invoice;
        $this->notifyUser = $notifyUser;
        $this->invoice_setting = $invoice_setting;
    }

}
