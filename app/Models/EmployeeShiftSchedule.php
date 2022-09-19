<?php

namespace App\Models;

use App\Observers\EmployeeShiftScheduleObserver;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
* App\Models\EmployeeShiftSchedule
*
*
 * @property string|null $color
* @property-read \App\Models\EmployeeShift $shift
*
*/

class EmployeeShiftSchedule extends BaseModel
{
    use HasFactory;

    protected $dates = ['date', 'shift_start_time', 'shift_end_time'];

    protected $guarded = ['id'];

    protected $with = ['shift'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(EmployeeShift::class, 'employee_shift_id');
    }

    public function requestChange(): HasOne
    {
        return $this->hasOne(EmployeeShiftChangeRequest::class, 'shift_schedule_id');
    }

    public function pendingRequestChange(): HasOne
    {
        return $this->hasOne(EmployeeShiftChangeRequest::class, 'shift_schedule_id')->where('status', 'waiting');
    }

}
