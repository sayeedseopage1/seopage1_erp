<?php

namespace App\Listeners;

use App\Events\EmployeeShiftScheduleEvent;
use App\Notifications\ShiftScheduled;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class EmployeeShiftScheduleListener
{

    /**
     * Handle the event.
     *
     * @param  \App\Events\EmployeeShiftScheduleEvent  $event
     * @return void
     */
    public function handle(EmployeeShiftScheduleEvent $event)
    {
        Notification::send($event->employeeShiftSchedule->user, new ShiftScheduled($event->employeeShiftSchedule));
    }

}
