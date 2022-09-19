<?php

namespace App\Observers;

use App\Models\EmployeeShift;
use App\Models\EmployeeShiftSchedule;
use Carbon\Carbon;

class EmployeeShiftObserver
{

    public function updating(EmployeeShift $employeeShift)
    {
        $existingSchedules = EmployeeShiftSchedule::where('employee_shift_id', $employeeShift->id)->whereDate('date', '>=', now()->subDay()->toDateString())->get();

        if ($existingSchedules) {
            foreach ($existingSchedules as $item) {
                $item->shift_start_time = $item->date->toDateString() . ' ' . Carbon::parse($employeeShift->office_start_time)->toTimeString();

                if (Carbon::parse($employeeShift->office_start_time)->gt(Carbon::parse($employeeShift->office_end_time))) {
                    $item->shift_end_time = $item->date->addDay()->toDateString() . ' ' . Carbon::parse($employeeShift->office_end_time)->toTimeString();
        
                } else {
                    $item->shift_end_time = $item->date->toDateString() . ' ' . Carbon::parse($employeeShift->office_end_time)->toTimeString();
                }

                $item->saveQuietly();
            }
        }
    }

}
