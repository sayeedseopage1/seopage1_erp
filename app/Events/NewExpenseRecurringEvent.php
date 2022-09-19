<?php

namespace App\Events;

use App\Models\ExpenseRecurring;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewExpenseRecurringEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $expense;
    public $status;

    public function __construct(ExpenseRecurring $expense, $status)
    {
        $this->expense = $expense;
        $this->status = $status;
    }

}
