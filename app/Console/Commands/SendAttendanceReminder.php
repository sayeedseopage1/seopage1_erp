<?php

namespace App\Console\Commands;

use App\Events\AttendanceReminderEvent;
use App\Models\AttendanceSetting;
use App\Models\Holiday;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SendAttendanceReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-attendance-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'send attendance reminder to the employee';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $today = now()->format('Y-m-d');
        $attendanceSetting = AttendanceSetting::first();

        if ($attendanceSetting->alert_after_status == 1 && !is_null($attendanceSetting->alert_after) && $attendanceSetting->alert_after != 0) {
            $holiday = Holiday::checkHolidayByDate($today);

            if (!is_null($attendanceSetting->office_start_time)) {

                $startDateTime = Carbon::parse($today . ' ' . $attendanceSetting->office_start_time);
                $currentDateTime = now()->addMinutes($attendanceSetting->alert_after);

                if ($currentDateTime->greaterThan($startDateTime)) {
                    if (is_null($holiday)) {
                        $usersData = User::with('employeeDetail')->leftJoin(
                            'attendances',
                            function ($join) use ($today) {
                                $join->on('users.id', '=', 'attendances.user_id')
                                    ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $today);
                            }
                        )
                            ->join('role_user', 'role_user.user_id', '=', 'users.id')
                            ->join('roles', 'roles.id', '=', 'role_user.role_id')
                            ->join('employee_details', 'employee_details.user_id', '=', 'users.id')
                            ->where('roles.name', '<>', 'client')
                            ->select(
                                'users.id',
                                'users.name',
                                'attendances.clock_in_time',
                                'employee_details.attendance_reminder',
                                DB::raw('@attendance_date as atte_date'),
                                'attendances.id as attendance_id'
                            )
                            ->whereNull('attendances.clock_in_time')
                            ->where(function ($query) use ($today) {
                                $query->where('employee_details.attendance_reminder', '!=', $today)
                                    ->orWhereNull('employee_details.attendance_reminder');
                            })
                            ->groupBy('users.id')
                            ->get();

                        foreach ($usersData as $userData) {
                            event(new AttendanceReminderEvent($userData));
                            $userData->employeeDetail->attendance_reminder = $today;
                            $userData->employeeDetail->save();
                        }
                    }
                }
            }
        }
    }

}
