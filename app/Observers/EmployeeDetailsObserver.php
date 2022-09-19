<?php

namespace App\Observers;

use App\Models\EmployeeLeaveQuota;
use App\Models\LeaveType;
use App\Models\EmployeeDetails;

class EmployeeDetailsObserver
{

    public function saving(EmployeeDetails $detail)
    {
        if (!isRunningInConsoleOrSeeding() && auth()->check()) {
            $detail->last_updated_by = user()->id;
        }
    }

    public function creating(EmployeeDetails $detail)
    {
        if (!isRunningInConsoleOrSeeding() && auth()->check()) {
            $detail->added_by = user()->id;
        }
    }

    public function created(EmployeeDetails $detail)
    {
        $leaveTypes = LeaveType::get();
        
        foreach ($leaveTypes as $key => $value) {
            EmployeeLeaveQuota::create(
                [
                    'user_id' => $detail->user_id,
                    'leave_type_id' => $value->id,
                    'no_of_leaves' => $value->no_of_leaves
                ]
            );
        }
    }

}
