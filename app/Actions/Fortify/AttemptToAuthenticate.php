<?php

namespace App\Actions\Fortify;

use App\Helper\Reply;
use App\Http\Requests\ClockIn\ClockInRequest;
use App\Models\Attendance;
use App\Models\AttendanceSetting;
use App\Models\EmployeeShiftSchedule;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\Setting;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Failed;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Fortify;
use Laravel\Fortify\LoginRateLimiter;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\DB;

class AttemptToAuthenticate
{
    /**
     * The guard implementation.
     *
     * @var \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected $guard;

    /**
     * The login rate limiter instance.
     *
     * @var \Laravel\Fortify\LoginRateLimiter
     */
    protected $limiter;

    /**
     * Create a new controller instance.
     *
     * @param  \Illuminate\Contracts\Auth\StatefulGuard  $guard
     * @param  \Laravel\Fortify\LoginRateLimiter  $limiter
     * @return void
     */
    public function __construct(StatefulGuard $guard, LoginRateLimiter $limiter)
    {
        $this->guard = $guard;
        $this->limiter = $limiter;
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  callable  $next
     * @return mixed
     */

    public function handle($request, $next)
    {
        $setting = Setting::first();
        $auth_user = User::where('email', $request->email)->first()->id;
        $attendanceSetting = AttendanceSetting::first();
        $sample = $this->checkAutoClockinConditions($auth_user);

        if ($attendanceSetting->auto_clock_in == 'yes' && $sample) {
            $this->storeClockIn( $request, $auth_user);
        }

        if ($setting->google_recaptcha_status == 'active')
        {
            $gRecaptchaResponseInput = 'g-recaptcha-response';
            $gRecaptchaResponse = $request->{$gRecaptchaResponseInput};

            $gRecaptchaResponse = $setting->google_recaptcha_v2_status == 'active' ? $gRecaptchaResponse : $request->g_recaptcha;

            if (is_null($gRecaptchaResponse) ) {
                return $this->googleRecaptchaMessage();
            }

            $secret = $setting->google_recaptcha_v2_status == 'active' ? $setting->google_recaptcha_v2_secret_key : Setting::first()->google_recaptcha_v3_secret_key;

            $validateRecaptcha = $this->validateGoogleRecaptcha($gRecaptchaResponse, $secret);

            if (!$validateRecaptcha) {
                return $this->googleRecaptchaMessage();
            }
        }

        if (Fortify::$authenticateUsingCallback) {
            return $this->handleUsingCustomCallback($request, $next);
        }

        if ($this->guard->attempt(
            $request->only(Fortify::username(), 'password'),
            $request->filled('remember'))
        ) {
            return $next($request);
        }

        $this->throwFailedAuthenticationException($request);
    }

    public function checkAutoClockinConditions($auth_user)
    {
        $setting = Setting::first();
        $showClockIn = AttendanceSetting::first();

        $attendanceSettings = $this->attendanceShift($showClockIn, $auth_user);

        $startTimestamp = now()->format('Y-m-d') . ' ' . $attendanceSettings->office_start_time;
        $endTimestamp = now()->format('Y-m-d') . ' ' . $attendanceSettings->office_end_time;
        $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $setting->timezone);
        $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $setting->timezone);
        $officeStartTime = $officeStartTime->setTimezone('UTC');
        $officeEndTime = $officeEndTime->setTimezone('UTC');

        if ($officeStartTime->gt($officeEndTime)) {
            $officeEndTime->addDay();
        }

        $cannotLogin = false;

        if ($showClockIn->employee_clock_in_out == 'yes') {
            if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                $cannotLogin = true;
            }

            if ($cannotLogin == true && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                $cannotLogin = false;
            }
        } else {
            $cannotLogin = true;
        }

        // Getting Current Clock-in if exist
        $currentClockIn = Attendance::where(DB::raw('DATE(clock_in_time)'), now()->format('Y-m-d'))
            ->where('user_id', $auth_user)->first();

        $currentDate = now(global_setting()->timezone)->format('Y-m-d');

        $checkTodayLeave = Leave::where('status', 'approved')
            ->where('leave_date', now(global_setting()->timezone)->toDateString())
            ->where('user_id', $auth_user)
            ->where('duration', '<>', 'half day')
            ->first();

        // Check Holiday by date
        $checkTodayHoliday = Holiday::where('date', $currentDate)->first();

        if ($cannotLogin == false && $currentClockIn == null && $checkTodayLeave == null && is_null($checkTodayHoliday)) {
            return true;
        }
        else{
            return false;
        }
    }

    public function storeClockIn($request, $auth_user)
    {
        $now = now();

        $showClockIn = AttendanceSetting::first();
        $setting = Setting::first();
        $attendanceSettings = $this->attendanceShift($showClockIn, $auth_user);

        $startTimestamp = now()->format('Y-m-d') . ' ' . $attendanceSettings->office_start_time;
        $endTimestamp = now()->format('Y-m-d') . ' ' . $attendanceSettings->office_end_time;
        $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $setting->timezone);
        $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $setting->timezone);
        $officeStartTime = $officeStartTime->setTimezone('UTC');
        $officeEndTime = $officeEndTime->setTimezone('UTC');

        if ($officeStartTime->gt($officeEndTime)) {
            $officeEndTime->addDay();
        }

        $cannotLogin = false;
        $clockInCount = Attendance::getTotalUserClockInWithTime($officeStartTime, $officeEndTime, $auth_user);

        if ($showClockIn->employee_clock_in_out == 'yes') {
            if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                $cannotLogin = true;
            }

            if ($cannotLogin == true && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                $cannotLogin = false;
                $clockInCount = Attendance::getTotalUserClockInWithTime($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay(), $auth_user);
            }
        } else {
            $cannotLogin = true;
        }

        if ($cannotLogin == true) {
            abort(403, __('messages.permissionDenied'));
        }

        // Check user by ip
        if (attendance_setting()->ip_check == 'yes') {
            $ips = (array)json_decode(attendance_setting()->ip_address);

            if (!in_array($request->ip(), $ips)) {
                return Reply::error(__('messages.notAnAuthorisedDevice'));
            }
        }

        // Check maximum attendance in a day
        if ($clockInCount < $attendanceSettings->clockin_in_day) {

            // Set TimeZone And Convert into timestamp
            $currentTimestamp = $now->setTimezone('UTC');
            $currentTimestamp = $currentTimestamp->timestamp;;

            // Set TimeZone And Convert into timestamp in halfday time
            if ($attendanceSettings->halfday_mark_time) {
                $halfDayTimestamp = $now->format('Y-m-d') . ' ' . $attendanceSettings->halfday_mark_time;
                $halfDayTimestamp = Carbon::createFromFormat('Y-m-d H:i:s', $halfDayTimestamp, $setting->timezone);
                $halfDayTimestamp = $halfDayTimestamp->setTimezone('UTC');
                $halfDayTimestamp = $halfDayTimestamp->timestamp;
            }


            $timestamp = $now->format('Y-m-d') . ' ' . $attendanceSettings->office_start_time;
            $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $setting->timezone);
            $officeStartTime = $officeStartTime->setTimezone('UTC');


            $lateTime = $officeStartTime->addMinutes($attendanceSettings->late_mark_duration);

            $checkTodayAttendance = Attendance::where('user_id', $auth_user)
                ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $now->format('Y-m-d'))->first();

            $attendance = new Attendance();
            $attendance->user_id = $auth_user;
            $attendance->clock_in_time = $now;
            $attendance->clock_in_ip = request()->ip();

            $attendance->working_from = '';
            $attendance->location_id = $request->location;

            if ($now->gt($lateTime) && is_null($checkTodayAttendance)) {
                $attendance->late = 'yes';
            }

            $attendance->half_day = 'no'; // default halfday

            // Check day's first record and half day time
            if (
                !is_null($attendanceSettings->halfday_mark_time)
                && is_null($checkTodayAttendance)
                && isset($halfDayTimestamp)
                && ($currentTimestamp > $halfDayTimestamp)
                && ($showClockIn->show_clock_in_button == 'no')
                ) {
                $attendance->half_day = 'yes';
            }

            $currentLatitude = $request->currentLatitude;
            $currentLongitude = $request->currentLongitude;

            if ($currentLatitude != '' && $currentLongitude != '') {
                $attendance->latitude = $currentLatitude;
                $attendance->longitude = $currentLongitude;
            }

            $attendance->employee_shift_id = $attendanceSettings->id;

            $attendance->shift_start_time = $attendance->clock_in_time->toDateString() . ' ' .$attendanceSettings->office_start_time;

            if (Carbon::parse($attendanceSettings->office_start_time)->gt(Carbon::parse($attendanceSettings->office_end_time))) {
                $attendance->shift_end_time = $attendance->clock_in_time->addDay()->toDateString() . ' ' .$attendanceSettings->office_end_time;

            } else {
                $attendance->shift_end_time = $attendance->clock_in_time->toDateString() . ' ' .$attendanceSettings->office_end_time;
            }

            $attendance->save();

            return Reply::successWithData(__('messages.attendanceSaveSuccess'), ['time' => $now->format('h:i A'), 'ip' => $attendance->clock_in_ip, 'working_from' => $attendance->working_from]);
        }

        return Reply::error(__('messages.maxColckIn'));
    }

    public function attendanceShift($defaultAttendanceSettings, $auth_user)
    {
        $setting = Setting::first();

        $checkPreviousDayShift = EmployeeShiftSchedule::where('user_id', $auth_user)
            ->where('date', now($setting->timezone)->subDay()->toDateString())
            ->first();

        $checkTodayShift = EmployeeShiftSchedule::where('user_id', $auth_user)
            ->where('date', now($setting->timezone)->toDateString())
            ->first();

        $backDayFromDefault = Carbon::parse(now($setting->timezone)->subDay()->format('Y-m-d') . ' ' . $defaultAttendanceSettings->office_start_time);

        $backDayToDefault = Carbon::parse(now($setting->timezone)->subDay()->format('Y-m-d') . ' ' . $defaultAttendanceSettings->office_end_time);

        if ($backDayFromDefault->gt($backDayToDefault)) {
            $backDayToDefault->addDay();
        }

        $nowTime = Carbon::createFromFormat('Y-m-d H:i:s', now(global_setting()->timezone)->toDateTimeString(), 'UTC');

        if ($checkPreviousDayShift && $nowTime->betweenIncluded($checkPreviousDayShift->shift_start_time, $checkPreviousDayShift->shift_end_time)) {
            $attendanceSettings = $checkPreviousDayShift;

        } else if ($nowTime->betweenIncluded($backDayFromDefault, $backDayToDefault)) {
            $attendanceSettings = $defaultAttendanceSettings;

        } else if ($checkTodayShift &&
            ($nowTime->betweenIncluded($checkTodayShift->shift_start_time, $checkTodayShift->shift_end_time) || $nowTime->gt($checkTodayShift->shift_end_time))
        ) {
            $attendanceSettings = $checkTodayShift;

        } else {
            $attendanceSettings = $defaultAttendanceSettings;
        }

        return $attendanceSettings->shift;

    }

    /**
     * Attempt to authenticate using a custom callback.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  callable  $next
     * @return mixed
     */
    protected function handleUsingCustomCallback($request, $next)
    {
        $user = call_user_func(Fortify::$authenticateUsingCallback, $request);

        if (! $user) {
            $this->fireFailedEvent($request);

            return $this->throwFailedAuthenticationException($request); /* @phpstan-ignore-line */
        }

        $this->guard->login($user, $request->filled('remember'));

        return $next($request);
    }

    /**
     * Throw a failed authentication validation exception.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function throwFailedAuthenticationException($request)
    {
        $this->limiter->increment($request);

        throw ValidationException::withMessages([
            Fortify::username() => [trans('auth.failed')],
        ]);
    }

    /**
     * Fire the failed authentication attempt event with the given arguments.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function fireFailedEvent($request)
    {
        event(new Failed(config('fortify.guard'), null, [
            Fortify::username() => $request->{Fortify::username()},
            'password' => $request->password,
        ]));
    }

    public function validateGoogleRecaptcha($googleRecaptchaResponse, $secret)
    {
        $client = new Client();

        $googleRecaptchaResponse = is_null($googleRecaptchaResponse) ? '' : $googleRecaptchaResponse;

        $response = $client->post('https://www.google.com/recaptcha/api/siteverify',
            [
                'form_params' => [
                    'secret' => $secret,
                    'response' => $googleRecaptchaResponse
                ]
            ]
        );
        $body = json_decode((string)$response->getBody());

        return $body->success;
    }

    public function googleRecaptchaMessage()
    {
        return Reply::error(__('auth.recaptchaFailed'));
    }

}
