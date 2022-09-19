<?php

namespace App\Models;

use App\Observers\EmployeeShiftChangeObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeShiftChangeRequest extends BaseModel
{
    use HasFactory;

    protected $guarded = ['id'];

    public function shiftSchedule(): BelongsTo
    {
        return $this->belongsTo(EmployeeShiftSchedule::class, 'shift_schedule_id');
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(EmployeeShift::class, 'employee_shift_id');
    }

}
