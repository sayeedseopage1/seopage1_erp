<?php

namespace App\Http\Controllers;

use App\Exports\ShiftScheduleExport;
use App\Helper\Reply;
use App\Http\Requests\EmployeeShift\StoreBulkShift;
use App\Mail\BulkShiftEmail;
use App\Models\AttendanceSetting;
use App\Models\EmployeeShift;
use App\Models\EmployeeShiftChangeRequest;
use App\Models\EmployeeShiftSchedule;
use App\Models\Holiday;
use App\Models\Team;
use App\Models\User;
use App\Notifications\BulkShiftNotification;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Calculation\Statistical\Distributions\F;

class EmployeeShiftScheduleController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.shiftRoster';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('attendance', $this->user->modules));
            return $next($request);
        });
    }

    public function index(Request $request)
    {
        $this->viewShiftPermission = user()->permission('view_shift_roster');
        $this->manageEmployeeShifts = user()->permission('manage_employee_shifts');

        abort_403(!(in_array($this->viewShiftPermission, ['all', 'owned'])));

        if (request()->ajax()) {
            if (request()->view_type == 'week') {
                return $this->weekSummaryData($request);
            }

            return $this->summaryData($request);
        }

        $this->employeeShiftChangeRequest = EmployeeShiftChangeRequest::selectRaw('count(employee_shift_change_requests.id) as request_count')->where('employee_shift_change_requests.status', 'waiting')->first();

        if ($this->viewShiftPermission == 'owned') {
            $this->employees = User::where('id', user()->id)->get();

        } else {
            $this->employees = User::allEmployees(null, true);
        }

        $now = now();
        $this->year = $now->format('Y');
        $this->month = $now->format('m');
        $this->departments = Team::all();

        return view('shift-rosters.index', $this->data);
    }

    public function summaryData($request)
    {
        $this->attendanceSetting = AttendanceSetting::with('shift')->first()->shift;
        $this->employeeShifts = EmployeeShift::all();

        $this->year = $request->change_year ? $request->change_year : $request->year;
        $this->month = $request->change_month ? $request->change_month : $request->month;

        $employees = User::with(
            ['shifts' => function ($query) {
                $query->whereRaw('MONTH(employee_shift_schedules.date) = ?', [$this->month])
                    ->whereRaw('YEAR(employee_shift_schedules.date) = ?', [$this->year]);
            },
            'leaves' => function ($query) {
                $query->whereRaw('MONTH(leaves.leave_date) = ?', [$this->month])
                    ->whereRaw('YEAR(leaves.leave_date) = ?', [$this->year])
                    ->where('status', 'approved');
            }, 'shifts.shift']
        )->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'employee_details.department_id', 'users.image')
            ->where('roles.name', '<>', 'client')->groupBy('users.id');

        if ($request->department != 'all') {
            $employees = $employees->where('employee_details.department_id', $request->department);
        }


        if ($request->userId != 'all') {
            $employees = $employees->where('users.id', $request->userId);
        }

        $employees = $employees->get();

        $this->holidays = Holiday::whereRaw('MONTH(holidays.date) = ?', [$this->month])->whereRaw('YEAR(holidays.date) = ?', [$this->year])->get();

        $final = [];
        $holidayOccasions = [];
        $shiftColorCode = [];

        $this->daysInMonth = Carbon::parse('01-' . $this->month . '-' . $this->year)->daysInMonth;
        $now = now()->timezone($this->global->timezone);
        $requestedDate = Carbon::parse(Carbon::parse('01-' . $this->month . '-' . $this->year))->endOfMonth();

        foreach ($employees as $employee) {

            $dataBeforeJoin = null;

            $dataTillToday = array_fill(1, $requestedDate->copy()->format('d'), 'EMPTY');

            if (!$requestedDate->isPast()) {
                $dataFromTomorrow = array_fill($now->copy()->addDay()->format('d'), ((int)$this->daysInMonth - (int)$now->copy()->format('d')), 'EMPTY');
                $shiftColorCode = array_fill(1, ((int)$this->daysInMonth), $this->attendanceSetting->color);
            }
            else if ($requestedDate->isPast() && ((int)$this->daysInMonth - (int)$now->copy()->format('d')) < 0) {
                $dataFromTomorrow = array_fill($now->copy()->addDay()->format('d'), 0, 'EMPTY');
                $shiftColorCode = array_fill(1, ((int)$this->daysInMonth), $this->attendanceSetting->color);
            }
            else {
                $dataFromTomorrow = array_fill($now->copy()->addDay()->format('d'), ((int)$this->daysInMonth - (int)$now->copy()->format('d')), 'EMPTY');
                $shiftColorCode = array_fill(1, ((int)$this->daysInMonth), $this->attendanceSetting->color);
            }

            $final[$employee->id . '#' . $employee->name] = array_replace($dataTillToday, $dataFromTomorrow);

            foreach ($employee->shifts as $shift) {
                $final[$employee->id . '#' . $employee->name][Carbon::parse($shift->date)->timezone($this->global->timezone)->day] = '<button type="button" class="change-shift badge badge-info f-10 p-1" style="background-color: '. $shift->shift->color .'" data-user-id="'.$shift->user_id.'" data-attendance-date="'.$shift->date->day.'"  data-toggle="tooltip" data-original-title="'.$shift->shift->shift_name.'">'. $shift->shift->shift_short_code.'</button>';
                $shiftColorCode[Carbon::parse($shift->date)->timezone($this->global->timezone)->day] = $shift->color;
            }

            $emplolyeeName = view('components.employee', [
                'user' => $employee
            ]);

            $final[$employee->id . '#' . $employee->name][] = $emplolyeeName;

            if ($employee->employeeDetail->joining_date->greaterThan(Carbon::parse(Carbon::parse('01-' . $this->month . '-' . $this->year)))) {
                if($request->month == $employee->employeeDetail->joining_date->format('m') && $this->year == $employee->employeeDetail->joining_date->format('Y')){
                    if($employee->employeeDetail->joining_date->format('d') == '01'){
                        $dataBeforeJoin = array_fill(1, $employee->employeeDetail->joining_date->format('d'), '-');
                        $shiftColorCode = array_fill(1, $employee->employeeDetail->joining_date->format('d'), '');
                    }
                    else{
                        $dataBeforeJoin = array_fill(1, $employee->employeeDetail->joining_date->subDay()->format('d'), '-');
                    }
                }

                if(($request->month < $employee->employeeDetail->joining_date->format('m') && $this->year == $employee->employeeDetail->joining_date->format('Y')) || $this->year < $employee->employeeDetail->joining_date->format('Y'))
                {
                    $dataBeforeJoin = array_fill(1, $this->daysInMonth, '-');
                }
            }

            if (!is_null($dataBeforeJoin)) {
                $final[$employee->id . '#' . $employee->name] = array_replace($final[$employee->id . '#' . $employee->name], $dataBeforeJoin);
            }

            foreach ($employee->leaves as $leave) {
                if ($leave->duration != 'half day') {
                    $final[$employee->id . '#' . $employee->name][$leave->leave_date->day] = 'Leave';
                    $shiftColorCode[$leave->leave_date->day] = '';
                }
            }

            foreach ($this->holidays as $holiday) {
                if ($final[$employee->id . '#' . $employee->name][$holiday->date->day] == 'Absent' || $final[$employee->id . '#' . $employee->name][$holiday->date->day] == 'EMPTY') {
                    $final[$employee->id . '#' . $employee->name][$holiday->date->day] = 'Holiday';
                    $holidayOccasions[$holiday->date->day] = $holiday->occassion;
                    $shiftColorCode[$holiday->date->day] = '';
                }
            }
        }

        $this->employeeAttendence = $final;
        $this->holidayOccasions = $holidayOccasions;
        $this->shiftColorCode = $shiftColorCode;
        $this->weekMap = [
            0 => __('app.su'),
            1 => __('app.mo'),
            2 => __('app.tu'),
            3 => __('app.we'),
            4 => __('app.th'),
            5 => __('app.fr'),
            6 => __('app.sa'),
        ];

        $view = view('shift-rosters.ajax.summary_data', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'data' => $view]);
    }

    public function weekSummaryData($request)
    {
        $this->attendanceSetting = AttendanceSetting::with('shift')->first()->shift;
        $this->employeeShifts = EmployeeShift::all();

        $now = Carbon::parse($request->week_start_date, global_setting()->timezone);
        $this->weekStartDate = $now->copy()->startOfWeek(attendance_setting()->week_start_from);
        $this->weekEndDate = $this->weekStartDate->copy()->addDays(6);
        $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6)); // Get All Dates from start to end date

        $employees = User::with(
            ['shifts' => function ($query) {
                $query->wherebetween('employee_shift_schedules.date', [$this->weekStartDate->toDateString(), $this->weekEndDate->toDateString()]);
            },
            'leaves' => function ($query) {
                $query->wherebetween('leaves.leave_date', [$this->weekStartDate->toDateString(), $this->weekEndDate->toDateString()])
                    ->where('status', 'approved');
            }, 'shifts.shift', 'leaves.type']
        )->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->leftJoin('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'employee_details.department_id', 'users.image')
            ->where('roles.name', '<>', 'client')->groupBy('users.id');

        if ($request->department != 'all') {
            $employees = $employees->where('employee_details.department_id', $request->department);
        }


        if ($request->userId != 'all') {
            $employees = $employees->where('users.id', $request->userId);
        }

        $employees = $employees->get();

        $this->holidays = Holiday::whereBetween('holidays.date', [$this->weekStartDate->toDateString(), $this->weekEndDate->toDateString()])->get();

        $final = [];
        $holidayOccasions = [];
        $leaveType = [];
        $shiftColorCode = [];

        $this->daysInMonth = 7; // Week total days
        $now = now()->timezone($this->global->timezone);
        $requestedDate = $this->weekEndDate;

        foreach ($employees as $employee) {

            $dataBeforeJoin = null;

            foreach ($this->weekPeriod->toArray() as $date) {
                $final[$employee->id . '#' . $employee->name][$date->toDateString()] = 'EMPTY';
            }

            foreach ($employee->shifts as $shift) {
                $final[$employee->id . '#' . $employee->name][Carbon::parse($shift->date)->timezone($this->global->timezone)->toDateString()] = '<button type="button" class="change-shift-week badge badge-info f-12 py-3 w-100" style="background-color: '. $shift->shift->color .'" data-user-id="'.$shift->user_id.'" data-attendance-date="'.$shift->date->toDateString().'"><div>'. $shift->shift->shift_name.'<div><div class="mt-2 f-10">'. $shift->shift->office_start_time .' - '.$shift->shift->office_end_time .'</div></button>';
                $shiftColorCode[Carbon::parse($shift->date)->timezone($this->global->timezone)->day] = $shift->color;
            }

            $emplolyeeName = view('components.employee', [
                'user' => $employee
            ]);

            $final[$employee->id . '#' . $employee->name][] = $emplolyeeName;

            $joiningDate = Carbon::createFromFormat('Y-m-d', $employee->employeeDetail->joining_date->toDateString(), global_setting()->timezone)->startOfDay();

            if ($joiningDate->greaterThan($this->weekEndDate)) {
                foreach ($this->weekPeriod->toArray() as $date) {
                    $final[$employee->id . '#' . $employee->name][$date->toDateString()] = '-';
                }
            } elseif ($joiningDate->greaterThan($this->weekStartDate) && $joiningDate->lessThan($this->weekEndDate)) {
                foreach ($this->weekPeriod->toArray() as $date) {
                    if ($date->lessThan($joiningDate)) {
                        $final[$employee->id . '#' . $employee->name][$date->toDateString()] = '-';
                    }
                }
            }

            foreach ($employee->leaves as $leave) {
                if ($leave->duration != 'half day') {
                    $final[$employee->id . '#' . $employee->name][$leave->leave_date->toDateString()] = 'Leave';
                    $shiftColorCode[$leave->leave_date->day] = '';
                    $leaveType[$leave->leave_date->toDateString()] = $leave->type->type_name;
                }
            }

            foreach ($this->holidays as $holiday) {
                if ($final[$employee->id . '#' . $employee->name][$holiday->date->toDateString()] == 'Absent' || $final[$employee->id . '#' . $employee->name][$holiday->date->toDateString()] == 'EMPTY') {
                    $final[$employee->id . '#' . $employee->name][$holiday->date->toDateString()] = 'Holiday';
                    $holidayOccasions[$holiday->date->toDateString()] = $holiday->occassion;
                    $shiftColorCode[$holiday->date->toDateString()] = '';
                }
            }

        }

        $this->employeeAttendence = $final;
        $this->holidayOccasions = $holidayOccasions;
        $this->leaveType = $leaveType;
        $this->shiftColorCode = $shiftColorCode;
        $this->weekMap = [
            0 => __('app.su'),
            1 => __('app.mo'),
            2 => __('app.tu'),
            3 => __('app.we'),
            4 => __('app.th'),
            5 => __('app.fr'),
            6 => __('app.sa'),
        ];

        $view = view('shift-rosters.ajax.week_summary_data', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'data' => $view]);
    }

    public function mark(Request $request, $userid, $day, $month, $year)
    {
        $manageEmployeeShifts = user()->permission('manage_employee_shifts');

        abort_403(!(in_array($manageEmployeeShifts, ['all'])));

        $this->date = Carbon::createFromFormat('d-m-Y', $day . '-' . $month . '-' . $year)->format('Y-m-d');
        $this->employee = User::findOrFail($userid);
        $this->shiftSchedule = EmployeeShiftSchedule::with('pendingRequestChange')->where('user_id', $userid)->where('date', $this->date)->first();
        $this->employeeShifts = EmployeeShift::all();
        return view('shift-rosters.ajax.edit', $this->data);
    }

    public function store(Request $request)
    {
        EmployeeShiftSchedule::firstOrCreate([
            'user_id' => $request->user_id,
            'date' => $request->shift_date,
            'employee_shift_id' => $request->employee_shift_id
        ]);

        return Reply::success(__('messages.employeeShiftAdded'));
    }

    public function update(Request $request, $id)
    {
        $shift = EmployeeShiftSchedule::findOrFail($id);
        $shift->employee_shift_id = $request->employee_shift_id;
        $shift->save();

        return Reply::success(__('messages.employeeShiftAdded'));
    }

    public function destroy($id)
    {
        EmployeeShiftSchedule::destroy($id);
        return Reply::success(__('messages.deleteSuccess'));
    }

    public function exportAllShift($year, $month, $id, $department)
    {
        $startDate = Carbon::createFromFormat('d-m-Y', '01-' . $month . '-' . $year)->startOfMonth()->startOfDay();
        $endDate = $startDate->copy()->endOfMonth()->endOfDay();

        $date = $endDate->lessThan(Carbon::now()) ? $endDate : now();
        return Excel::download(new ShiftScheduleExport($year, $month, $id, $department, $startDate, $endDate), 'Attendance_From_'.$startDate->format('d-m-Y').'_To_'.$date->format('d-m-Y').'.xlsx');
    }

    public function employeeShiftCalendar(Request $request)
    {
        if (request('start') && request('end')) {
            $model = EmployeeShiftSchedule::with('shift')->where('user_id', $request->employeeId);

            $events = $model->get();

            $eventData = array();

            foreach ($events as $key => $event) {
                $eventData[] = [
                    'id' => $event->id,
                    'userId' => $event->user_id,
                    'day' => $event->date->day,
                    'month' => $event->date->month,
                    'year' => $event->date->year,
                    'title' => ucfirst($event->shift->shift_name),
                    'start' => Carbon::parse($event->date->toDateString().' '.$event->shift->office_start_time),
                    'end' => Carbon::parse($event->date->toDateString().' '.$event->shift->office_end_time),
                    'extendedProps' => ['bg_color' => $event->shift->color, 'color' => '#fff']
                ];
            }

            return $eventData;

        }
    }

    public function create()
    {
        $this->employees = User::allEmployees(null, true, 'all');
        $this->departments = Team::all();
        $this->employeeShifts = EmployeeShift::all();
        $this->pageTitle = __('modules.attendance.bulkShiftAssign');
        $this->year = now()->format('Y');
        $this->month = now()->format('m');

        if (request()->ajax()) {
            $html = view('shift-rosters.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'shift-rosters.ajax.create';

        return view('attendances.create', $this->data);

    }

    public function bulkShift(StoreBulkShift $request)
    {
        $employees = $request->user_id;
        $employeeData = User::with('employeeDetail')->whereIn('id', $employees)->get();

        $date = Carbon::createFromFormat('d-m-Y', '01-' . $request->month . '-' . $request->year)->format('Y-m-d');

        if ($request->assign_shift_by == 'month') {
            $startDate = Carbon::createFromFormat('d-m-Y', '01-' . $request->month . '-' . $request->year)->startOfMonth();
            $endDate = $startDate->copy()->endOfMonth();

            $period = CarbonPeriod::create($startDate, $endDate);

            $holidays = Holiday::getHolidayByDates($startDate->format('Y-m-d'), $endDate->format('Y-m-d'))->pluck('holiday_date')->toArray();

        } else {
            $dates = explode(',', $request->multi_date);
            $period = [];
            $holidays = [];

            foreach($dates as $dateData)
            {
                array_push($period, Carbon::parse($dateData));
                $isHoliday = Holiday::checkHolidayByDate(Carbon::parse($dateData)->format('Y-m-d'));

                if (!is_null($isHoliday)) {
                    $holidays[] = $isHoliday->date->format('Y-m-d');
                }
            }
        }

        $insertData = [];
        $dateRange = [];

        foreach ($period as $date) {
            $dateRange[] = $date->format('Y-m-d');
        }

        EmployeeShiftSchedule::whereIn('user_id', $employees)
            ->whereIn('date', $dateRange)
            ->delete();

        foreach ($employees as $key => $userId) {
            $userData = $employeeData->filter(function ($value) use($userId) {
                return $value->id == $userId;
            })->first();

            foreach ($period as $date) {

                if ($date->greaterThanOrEqualTo($userData->employeeDetail->joining_date) && !in_array($date->format('Y-m-d'), $holidays)) {

                    $insertData[] = [
                        'user_id' => $userId,
                        'date' => $date->format('Y-m-d'),
                        'employee_shift_id' => $request->shift,
                        'added_by' => user()->id,
                        'last_updated_by' => user()->id
                    ];
                }
            }

        }

        EmployeeShiftSchedule::insert($insertData);

        if ($request->send_email && count($insertData) > 0) {
            foreach ($employees as $key => $userId) {
                $userData = $employeeData->filter(function ($value) use($userId) {
                    return $value->id == $userId;
                })->first();

                if (smtp_setting()->mail_connection == 'sync') {
                    Mail::to($userData->email)->send(new BulkShiftEmail($dateRange, $userId));

                } else {
                    Mail::to($userData->email)->queue(new BulkShiftEmail($dateRange, $userId));
                }
            }
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            $redirectUrl = route('shifts.index');
        }

        return Reply::redirect($redirectUrl, __('messages.employeeShiftAdded'));
    }

}
