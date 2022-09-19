<?php

namespace App\Observers;

use App\Models\Attendance;

class AttendanceObserver
{

    public function saving(Attendance $attendance)
    {
        if (user()) {
            $attendance->last_updated_by = user()->id;
        }
    }

    public function creating(Attendance $attendance)
    {
        if (user()) {
            $attendance->added_by = user()->id;
        }
    }

}
