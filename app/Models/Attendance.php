<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Lead;
use Illuminate\Support\Facades\DB;
use App\Observers\AttendanceObserver;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Attendance
 *
 * @property int $id
 * @property int $user_id
 * @property int $lateCount
 * @property \Illuminate\Support\Carbon $clock_in_time
 * @property \Illuminate\Support\Carbon|null $clock_out_time
 * @property string $clock_in_ip
 * @property string $clock_out_ip
 * @property string $working_from
 * @property string $late
 * @property string $half_day
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $added_by
 * @property int|null $last_updated_by
 * @property-read mixed $clock_in_date
 * @property-read mixed $icon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereAddedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockInIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockInTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockOutIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereClockOutTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereHalfDay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLastUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereWorkingFrom($value)
 * @mixin \Eloquent
 * @property string|null $latitude
 * @property string|null $longitude
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attendance whereLongitude($value)
 */
class Attendance extends BaseModel
{
    protected $dates   = ['clock_in_time', 'clock_out_time', 'shift_end_time', 'shift_start_time'];
    protected $appends = ['clock_in_date'];
    protected $guarded = ['id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id')->withoutGlobalScopes(['active']);
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(CompanyAddress::class, 'location_id');
    }

    public function shift(): BelongsTo
    {
        return $this->belongsTo(EmployeeShift::class, 'employee_shift_id');
    }

    public function getClockInDateAttribute()
    {
        $global = global_setting();
        return $this->clock_in_time->timezone($global->timezone)->toDateString();
    }

    public static function attendanceByDate($date)
    {
        DB::statement('SET @attendance_date = ' . $date);

        return User::withoutGlobalScope('active')
            ->leftJoin(
                'attendances',
                function ($join) use ($date) {
                    $join->on('users.id', '=', 'attendances.user_id')
                        ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $date)
                        ->whereNull('attendances.clock_out_time');
                }
            )
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'designations.id', '=', 'employee_details.designation_id')
            ->where('roles.name', '<>', 'client')
            ->select(
                DB::raw("( select count('atd.id') from attendances as atd where atd.user_id = users.id and DATE(atd.clock_in_time)  =  '" . $date . "' and DATE(atd.clock_out_time)  =  '" . $date . "' ) as total_clock_in"),
                DB::raw("( select count('atdn.id') from attendances as atdn where atdn.user_id = users.id and DATE(atdn.clock_in_time)  =  '" . $date . "' ) as clock_in"),
                'users.id',
                'users.name',
                'attendances.clock_in_ip',
                'attendances.clock_in_time',
                'attendances.clock_out_time',
                'attendances.late',
                'attendances.half_day',
                'attendances.working_from',
                'designations.name as designation_name',
                'users.image',
                DB::raw('@attendance_date as atte_date'),
                'attendances.id as attendance_id'
            )
            ->groupBy('users.id')
            ->orderBy('users.name', 'asc');
    }

    public static function attendanceByUserDate($userid, $date)
    {
        DB::statement('SET @attendance_date = ' . $date);

        return User::withoutGlobalScope('active')
            ->leftJoin(
                'attendances',
                function ($join) use ($date) {
                    $join->on('users.id', '=', 'attendances.user_id')
                        ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $date);
                }
            )
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'designations.id', '=', 'employee_details.designation_id')
            ->where('roles.name', '<>', 'client')
            ->select(
                DB::raw("( select count('atd.id') from attendances as atd where atd.user_id = users.id and DATE(atd.clock_in_time)  =  '" . $date . "' and DATE(atd.clock_out_time)  =  '" . $date . "' ) as total_clock_in"),
                DB::raw("( select count('atdn.id') from attendances as atdn where atdn.user_id = users.id and DATE(atdn.clock_in_time)  =  '" . $date . "' ) as clock_in"),
                'users.id',
                'users.name',
                'attendances.clock_in_ip',
                'attendances.clock_in_time',
                'attendances.clock_out_time',
                'attendances.late',
                'attendances.half_day',
                'attendances.working_from',
                'designations.name as designation_name',
                'users.image',
                DB::raw('@attendance_date as atte_date'),
                'attendances.id as attendance_id'
            )
            ->where('users.id', $userid)->first();
    }

    public static function attendanceDate($date)
    {
        return User::with([
            'attendance' => function ($q) use ($date) {
                $q->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $date);
            }
        ])
            ->withoutGlobalScope('active')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'designations.id', '=', 'employee_details.designation_id')
            ->where('roles.name', '<>', 'client')
            ->select(
                'users.id',
                'users.name',
                'users.image',
                'designations.name as designation_name'
            )
            ->groupBy('users.id')
            ->orderBy('users.name', 'asc');
    }

    public static function attendanceHolidayByDate($date)
    {
        $holidays = Holiday::all();
        $user     = User::leftJoin(
            'attendances',
            function ($join) use ($date) {
                $join->on('users.id', '=', 'attendances.user_id')
                    ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $date);
            }
        )
            ->withoutGlobalScope('active')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'designations.id', '=', 'employee_details.designation_id')

            ->where('roles.name', '<>', 'client')
            ->select(
                'users.id',
                'users.name',
                'attendances.clock_in_ip',
                'attendances.clock_in_time',
                'attendances.clock_out_time',
                'attendances.late',
                'attendances.half_day',
                'attendances.working_from',
                'users.image',
                'designations.name as job_title',
                'attendances.id as attendance_id'
            )
            ->groupBy('users.id')
            ->orderBy('users.name', 'asc')
            ->union($holidays)
            ->get();
        return $user;
    }

    public static function userAttendanceByDate($startDate, $endDate, $userId)
    {
        return Attendance::with('shift')
            ->join('users', 'users.id', '=', 'attendances.user_id')
            ->leftJoin('company_addresses', 'company_addresses.id', '=', 'attendances.location_id')
            ->where(DB::raw('DATE(attendances.clock_in_time)'), '>=', $startDate)
            ->where(DB::raw('DATE(attendances.clock_in_time)'), '<=', $endDate)
            ->where('attendances.user_id', '=', $userId)
            ->orderBy('aId', 'desc')
            ->select('attendances.*', 'users.*', 'attendances.id as aId', 'company_addresses.location')
            ->get();
    }

    public static function countDaysPresentByUser($startDate, $endDate, $userId)
    {
        $totalPresent = DB::select('SELECT count(DISTINCT DATE(attendances.clock_in_time) ) as presentCount from attendances where DATE(attendances.clock_in_time) >= "' . $startDate . '" and DATE(attendances.clock_in_time) <= "' . $endDate . '" and user_id="' . $userId . '" ');
        return $totalPresent[0]->presentCount;
    }

    public static function countDaysLateByUser($startDate, $endDate, $userId)
    {
        $totalLate = Attendance::whereBetween(DB::raw('DATE(attendances.`clock_in_time`)'), [$startDate->toDateString(), $endDate->toDateString()])
            ->where('late', 'yes')
            ->where('user_id', $userId)
            ->select(DB::raw('count(DISTINCT DATE(attendances.clock_in_time) ) as lateCount'))
            ->first();

        return $totalLate->lateCount;
    }

    public static function countHalfDaysByUser($startDate, $endDate, $userId)
    {
        $halfDay1 = Attendance::whereBetween(DB::raw('DATE(attendances.`clock_in_time`)'), [$startDate, $endDate])
            ->where('user_id', $userId)
            ->where('half_day', 'yes')
            ->count();
        $halfDay2 = Leave::where('user_id', $userId)
            ->where('leave_date', '>=', $startDate)
            ->where('leave_date', '<=', $endDate)
            ->where('status', 'approved')
            ->where('duration', 'half day')
            ->select('leave_date', 'reason', 'duration')
            ->count();
        return $halfDay1 + $halfDay2;
    }

    // Get User Clock-ins by date
    public static function getTotalUserClockIn($date, $userId)
    {
        return Attendance::where(DB::raw('DATE(attendances.clock_in_time)'), $date)
            ->where('user_id', $userId)
            ->count();
    }

    public static function getTotalUserClockInWithTime($startTime, $endTime, $userId)
    {
        return Attendance::whereBetween('clock_in_time', [$startTime, $endTime])
            ->where('user_id', $userId)
            ->count();
    }

    // Attendance by User and date
    public static function attendanceByUserAndDate($date, $userId)
    {
        return Attendance::where('user_id', $userId)
            ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $date)->get();
    }

    public function totalTime($startDate, $endDate, $userId, $format = null)
    {
        $attendanceActivity = Attendance::userAttendanceByDate($startDate->format('Y-m-d'), $endDate->format('Y-m-d'), $userId);

        $attendanceActivity = $attendanceActivity->reverse()->values();

        $settingStartTime = Carbon::createFromFormat('H:i:s', attendance_setting()->shift->office_start_time, global_setting()->timezone);
        $defaultEndTime   = $settingEndTime = Carbon::createFromFormat('H:i:s', attendance_setting()->shift->office_end_time, global_setting()->timezone);

        if ($settingStartTime->gt($settingEndTime)) {
            $settingEndTime->addDay();
        }

        if ($settingEndTime->greaterThan(now()->timezone(global_setting()->timezone))) {
            $defaultEndTime = now()->timezone(global_setting()->timezone);
        }

        $totalTime = 0;

        foreach ($attendanceActivity as $key => $activity) {
            if ($key == 0) {
                $firstClockIn = $activity;
                $startTime    = Carbon::parse($firstClockIn->clock_in_time)->timezone(global_setting()->timezone);
            }

            $lastClockOut = $activity;

            if (!is_null($lastClockOut->clock_out_time)) {
                $endTime = Carbon::parse($lastClockOut->clock_out_time)->timezone(global_setting()->timezone);

            } elseif (
                ($lastClockOut->clock_in_time->timezone(global_setting()->timezone)->format('Y-m-d') != now()->timezone(global_setting()->timezone)->format('Y-m-d'))
                && is_null($lastClockOut->clock_out_time)
                && isset($startTime)
            ) {
                $endTime = Carbon::parse($startTime->format('Y-m-d') . ' ' . attendance_setting()->shift->office_end_time, global_setting()->timezone);

                if ($startTime->gt($endTime)) {
                    $endTime->addDay();
                }

            } else {
                $endTime = $defaultEndTime;
            }

            $totalTime = $totalTime + $endTime->timezone(global_setting()->timezone)->diffInMinutes($activity->clock_in_time->timezone(global_setting()->timezone), true);
        }

        if ($format == 'H:i') {
            return intdiv($totalTime, 60) . ':' . ($totalTime % 60);
        }

        if ($format == 'm') {
            return $totalTime;
            // return ((intdiv($totalTime, 60) * 60) + (($totalTime % 60) > 0 ? ($totalTime % 60) : 0));
        }

        $ressultTotalTime = intdiv($totalTime, 60) . ' ' . __('app.hrs') . ' ';

        if (($totalTime % 60) > 0) {
            $ressultTotalTime .= ($totalTime % 60) . ' ' . __('app.mins');
        }

        return $ressultTotalTime;
    }
    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class, 'added_by', 'user_id');
    }
}
