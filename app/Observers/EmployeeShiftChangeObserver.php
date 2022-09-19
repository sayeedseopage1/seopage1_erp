<?php

namespace App\Observers;

use App\Events\EmployeeShiftChangeEvent;
use App\Models\EmployeeShiftChangeRequest;
use App\Models\EmployeeShiftSchedule;

class EmployeeShiftChangeObserver
{

    public function created(EmployeeShiftChangeRequest $changeRequest)
    {
        if (!isRunningInConsoleOrSeeding()) {
            event(new EmployeeShiftChangeEvent($changeRequest));
        }
    }

    public function updated(EmployeeShiftChangeRequest $changeRequest)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if ($changeRequest->isDirty('status')) {

                if ($changeRequest->status == 'accepted') {
                    EmployeeShiftSchedule::where('id', $changeRequest->shift_schedule_id)->update(['employee_shift_id' => $changeRequest->employee_shift_id]);
                }
                
                event(new EmployeeShiftChangeEvent($changeRequest, 'statusChange'));
            }
        }
    }

}
