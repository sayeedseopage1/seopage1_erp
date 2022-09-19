<?php

namespace App\Mail;

use App\Models\EmployeeShiftSchedule;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class BulkShiftEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $dateRange;
    public $userId;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($dateRange, $userId)
    {
        $this->dateRange = $dateRange;
        $this->userId = $userId;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $employeeShifts = EmployeeShiftSchedule::with('shift')
            ->whereIn('date', $this->dateRange)
            ->where('user_id', $this->userId)->get();

        return $this->subject(__('email.shiftScheduled.subject'))
            ->markdown('mail.bulk-shift-email', ['employeeShifts' => $employeeShifts]);
    }

}
