<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AttendanceSetting
 *
 * @property int $id
 * @property string $office_start_time
 * @property string $office_end_time
 * @property string|null $halfday_mark_time
 * @property int $late_mark_duration
 * @property int $clockin_in_day
 * @property string $employee_clock_in_out
 * @property string $office_open_days
 * @property string|null $ip_address
 * @property int|null $radius
 * @property string $radius_check
 * @property string $ip_check
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $icon
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting query()
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereClockinInDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereEmployeeClockInOut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereHalfdayMarkTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereIpCheck($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereLateMarkDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeOpenDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereOfficeStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereRadius($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereRadiusCheck($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int|null $alert_after
 * @property int $alert_after_status
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereAlertAfter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereAlertAfterStatus($value)
 * @property int $save_current_location
 * @method static \Illuminate\Database\Eloquent\Builder|AttendanceSetting whereSaveCurrentLocation($value)
 */
class AttendanceSetting extends BaseModel
{
    const DAYS = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const WEEKDAYS = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    public function shift(): BelongsTo
    {
        return $this->belongsTo(EmployeeShift::class, 'default_employee_shift');
    }

}
