<?php

namespace App\Traits;

use App\Helper\Reply;
use App\Http\Requests\ClockIn\ClockInRequest;
use App\Models\Attendance;
use App\Models\AttendanceSetting;
use App\Models\CompanyAddress;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\EmployeeShiftSchedule;
use App\Models\Event;
use App\Models\Holiday;
use App\Models\Lead;
use App\Models\LeadAgent;
use App\Models\Leave;
use App\Models\Notice;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\Ticket;
use App\Models\TicketAgentGroups;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use DateTime;

/**
 *
 */
trait EmployeeDashboard
{

    /**
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function employeeDashboard()
    {
        // dd(request()->all());
      $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();

      $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
      //dd($this->startDate, $this->endDate);
      $startDate = $this->startDate->toDateString();
      $endDate = $this->endDate->toDateString();
        $completedTaskColumn = TaskboardColumn::completeColumn();
        $showClockIn = AttendanceSetting::first();

        $this->attendanceSettings = $this->attendanceShift($showClockIn);

        $startTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_start_time;
        $endTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_end_time;
        $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $this->global->timezone);
        $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $this->global->timezone);

        $officeStartTime = $officeStartTime->setTimezone('UTC');
        $officeEndTime = $officeEndTime->setTimezone('UTC');

        if ($officeStartTime->gt($officeEndTime)) {
            $officeEndTime->addDay();
        }

        $this->cannotLogin = false;

        if ($showClockIn->employee_clock_in_out == 'yes') {
            if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                $this->cannotLogin = true;
            }

            if ($this->cannotLogin == true && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                $this->cannotLogin = false;
            }
        } else {
            $this->cannotLogin = true;
        }

        $this->viewEventPermission = user()->permission('view_events');
        $this->viewNoticePermission = user()->permission('view_notice');
        $this->editTimelogPermission = user()->permission('edit_timelogs');

        // Getting Attendance setting data

        if (request('start') && request('end') && !is_null($this->viewEventPermission) && $this->viewEventPermission != 'none') {
            $eventData = array();

            $events = Event::with('attendee', 'attendee.user');

            if ($this->viewEventPermission == 'added') {
                $events->where('events.added_by', $this->user->id);
            }
            elseif ($this->viewEventPermission == 'owned' || $this->viewEventPermission == 'both') {
                $events->where('events.added_by', $this->user->id)
                    ->orWhere(function ($q) {
                        $q->whereHas('attendee.user', function ($query) {
                            $query->where('user_id', $this->user->id);
                        });
                    });
            }

            $events = $events->get();

            foreach ($events as $key => $event) {
                $eventData[] = [
                    'id' => $event->id,
                    'title' => ucfirst($event->event_name),
                    'start' => $event->start_date_time,
                    'end' => $event->end_date_time,
                    'extendedProps' => ['bg_color' => $event->label_color, 'color' => '#fff'],
                ];
            }

            return $eventData;
        }

        $this->totalProjects = Project::select('projects.id')
            ->join('project_members', 'project_members.project_id', '=', 'projects.id');
        $this->totalProjects = $this->totalProjects->where('project_members.user_id', '=', $this->user->id);

        $this->totalProjects = $this->totalProjects->groupBy('projects.id');
        $this->totalProjects = count($this->totalProjects->get());

        $this->counts = DB::table('users')
            ->select(
                DB::raw('(select IFNULL(sum(project_time_logs.total_minutes),0) from `project_time_logs` where user_id = ' . $this->user->id . ') as totalHoursLogged '),
                DB::raw('(select count(tasks.id) from `tasks` inner join task_users on task_users.task_id=tasks.id where tasks.board_column_id=' . $completedTaskColumn->id . ' and task_users.user_id = ' . $this->user->id . ') as totalCompletedTasks')
            )
            ->first();

        if (!is_null($this->viewNoticePermission) && $this->viewNoticePermission != 'none') {
            if ($this->viewNoticePermission == 'added') {
                $this->notices = Notice::latest()->where('added_by', $this->user->id)
                    ->select('id', 'heading', 'created_at')
                    ->limit(10)
                    ->get();
            }
            elseif ($this->viewNoticePermission == 'owned') {
                $this->notices = Notice::latest()
                    ->select('id', 'heading', 'created_at')
                    ->where(['to' => 'employee', 'department_id' => null])
                    ->orWhere(['department_id' => $this->user->employeeDetails->department_id])
                    ->limit(10)
                    ->get();
            }
            elseif ($this->viewNoticePermission == 'both') {
                $this->notices = Notice::latest()
                    ->select('id', 'heading', 'created_at')
                    ->where('added_by', $this->user->id)
                    ->orWhere(function ($q) {
                        $q->where(['to' => 'employee', 'department_id' => null])
                            ->orWhere(['department_id' => $this->user->employeeDetails->department_id]);
                    })
                    ->limit(10)
                    ->get();
            }
            elseif ($this->viewNoticePermission == 'all') {
                $this->notices = Notice::latest()
                    ->select('id', 'heading', 'created_at')
                    ->limit(10)
                    ->get();
            }
        }

        $checkTicketAgent = TicketAgentGroups::select('id')->where('agent_id', user()->id)->first();

        if (!is_null($checkTicketAgent)) {
            $this->totalOpenTickets = Ticket::with('agent')->whereHas('agent', function ($q) {
                $q->where('id', user()->id);
            })->where('status', 'open')->count();
        }

        $tasks = $this->pendingTasks = Task::with('activeProject', 'boardColumn', 'labels')
            ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->where('task_users.user_id', $this->user->id)
            ->where('tasks.board_column_id', '<>', $completedTaskColumn->id)
            ->select('tasks.*')
            ->groupBy('tasks.id')
            ->orderBy('tasks.id', 'desc')
            ->get();

        $this->inProcessTasks = $tasks->count();

        $this->dueTasks = $tasks->filter(function ($item) {
            return !is_null($item->due_date) && $item->due_date->endOfDay()->isPast();
        })->count();

        $projects = Project::with('members')
            ->leftJoin('project_members', 'project_members.project_id', 'projects.id')
            ->leftJoin('users', 'project_members.user_id', 'users.id')
            ->selectRaw('projects.status, project_members.user_id, projects.deadline as due_date, projects.id')
            ->where('project_members.user_id', $this->user->id)
            ->where('projects.status', '<>', 'finished')
            ->where('projects.status', '<>', 'canceled')
            ->groupBy('projects.id')
            ->get();

        $projects = $projects->whereNotNull('projects.deadline');

        $this->dueProjects = $projects->filter(function ($value, $key) {
            return now()->gt($value->due_date);
        })->count();

        // Getting Current Clock-in if exist
        $this->currentClockIn = Attendance::where(DB::raw('DATE(clock_in_time)'), now()->format('Y-m-d'))
            ->select('id', 'clock_in_time', 'clock_out_time')
            ->where('user_id', $this->user->id)
            ->whereNull('clock_out_time')
            ->first();

        $currentDate = now(global_setting()->timezone)->format('Y-m-d');

        $this->checkTodayLeave = Leave::where('status', 'approved')
            ->select('id')
            ->where('leave_date', now(global_setting()->timezone)->toDateString())
            ->where('user_id', user()->id)
            ->where('duration', '<>', 'half day')
            ->first();

        // Check Holiday by date
        $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();
        $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')
            ->first();

        $currentDay = now()->format('m-d');

        $this->upcomingBirthdays = EmployeeDetails::whereHas('user', function ($query) {
                return $query->where('status', 'active');
        })
            ->with('user')
            ->select('*', 'date_of_birth', DB::raw('MONTH(date_of_birth) months'), DB::raw('DAY(date_of_birth) as day'))
            ->whereNotNull('date_of_birth')
            ->where(function ($query) use($currentDay){
                $query->whereRaw('DATE_FORMAT(`date_of_birth`, "%m-%d") >= "'.$currentDay.'"')->orderBy('date_of_birth');
            })
            ->limit('5')
            ->orderBy('months')
            ->orderBy('day')
            ->get()->values()->all();

        $this->leave = Leave::with('user', 'type')->where('status', 'approved')
            ->where('leave_date', today(global_setting()->timezone)->toDateString())
            ->get();

        $this->workFromHome = Attendance::with('user')
            ->select('id', 'user_id')
            ->where('work_from_type', 'home')
            ->where(DB::raw('DATE(attendances.clock_in_time)'), now()->toDateString())
            ->groupBy('user_id')
            ->get();

        $this->leadAgent = LeadAgent::where('user_id', $this->user->id)->first();

        if(!is_null($this->leadAgent)){
            $this->lead = Lead::with('leadAgent')->whereHas('leadAgent', function ($q) {
                $q->where('user_id', $this->user->id);
            })->get();

            $this->totalLead = $this->lead->filter(function ($value) {
                return $value->client_id == null;
            })->count();

            $this->convertedLead = $this->lead->filter(function ($value) {
                return $value->client_id != null;
            })->count();
        }

        $now = now(global_setting()->timezone);
        $this->weekStartDate = $now->copy()->startOfWeek($showClockIn->week_start_from);
        $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
        $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6)); // Get All Dates from start to end date

        $this->employeeShifts = EmployeeShiftSchedule::where('user_id', user()->id)
            ->whereBetween(DB::raw('DATE(`date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
            ->select(DB::raw('DATE_FORMAT(date, "%Y-%m-%d") as dates'), 'employee_shift_schedules.*')
            ->with('shift', 'user', 'requestChange')
            ->get();
        $this->employeeShiftDates = $this->employeeShifts->pluck('dates')->toArray();

        $currentWeekDates = [];
        $weekShifts = [];

        $weekHolidays = Holiday::whereBetween(DB::raw('DATE(`date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
        ->select(DB::raw('DATE_FORMAT(`date`, "%Y-%m-%d") as hdate'), 'occassion')
        ->get();

        $holidayDates = $weekHolidays->pluck('hdate')->toArray();

        $weekLeaves = Leave::with('type')
            ->select(DB::raw('DATE_FORMAT(`leave_date`, "%Y-%m-%d") as ldate'), 'leaves.*')
            ->where('user_id', user()->id)
            ->whereBetween(DB::raw('DATE(`leave_date`)'), [$this->weekStartDate->format('Y-m-d'), $this->weekEndDate->format('Y-m-d')])
            ->where('status', 'approved')
            ->where('duration', '<>', 'half day')
            ->get();

        $leaveDates = $weekLeaves->pluck('ldate')->toArray();

        // phpcs:ignore
        for ($i = $this->weekStartDate->copy(); $i < $this->weekEndDate->copy(); $i->addDay()){
            $date = Carbon::parse($i);
            array_push($currentWeekDates, $date);

            if (in_array($date->toDateString(), $holidayDates)) {
                foreach ($weekHolidays as $holiday) {
                    if ($holiday->hdate == $date->toDateString()) {
                        $leave = '<i class="fa fa-star text-warning"></i> '. $holiday->occassion;
                    }
                }

                array_push($weekShifts, $leave);

            } elseif (in_array($date->toDateString(), $leaveDates)) {
                foreach ($weekLeaves as $leav) {
                    if ($leav->ldate == $date->toDateString()) {
                        $leave = __('app.onLeave') . ': <span class="badge badge-success" style="background-color:' . $leav->type->color . '">' . $leav->type->type_name . '</span>';
                    }
                }

                array_push($weekShifts, $leave);

            } elseif (in_array($date->toDateString(), $this->employeeShiftDates)) {
                foreach ($this->employeeShifts as $shift) {
                    if ($shift->dates == $date->toDateString()) {
                        $shiftSchedule = $shift;
                    }
                }

                array_push($weekShifts, $shiftSchedule);

            } else {
                array_push($weekShifts, '--');
            }

        }


        $this->currentWeekDates = $currentWeekDates;
        $this->weekShifts = $weekShifts;
        $this->showClockIn = $showClockIn->show_clock_in_button;
        $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
        $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs(now()->toDateString(), user()->id);
        $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak(now()->toDateString(), user()->id);

        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);


          $this->no_of_inprogress= Project::where('pm_id',Auth::id())->where('status','in progress')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
          $this->no_of_canceled= Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
          $this->total_project_value= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('project_budget');
          //$this->total_released_amount= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('milestone_paid');
          //dd($this->total_released_amount);
          $this->total_released_amount= Project::
                          where('pm_id',Auth::id())
                          ->where(DB::raw('DATE(updated_at)'), '>=', $startDate)
                          ->where(DB::raw('DATE(updated_at)'), '<=', $endDate)
                          ->sum('milestone_paid');



        $this->total_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->total_completed_project=Project::where('pm_id',Auth::id())->where('status','finished')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->total_canceled_project=Project::where('pm_id',Auth::id())->where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->total_completed_project_on_time=Project::where('pm_id',Auth::id())->where('status','finished')->whereDate('payment_release_date','>=','deadline')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->total_onhold_project=Project::where('pm_id',Auth::id())->where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        //dd($total_completed_project_on_time);
        if ($this->total_projects > 0) {
        $this->percentage_of_complete_project_count= $this->total_completed_project/$this->total_projects*100;
        $this->percentage_of_canceled_project_count= $this->total_canceled_project/$this->total_projects*100;

        $this->percentage_of_onhold_project_count= $this->total_onhold_project/$this->total_projects*100;
      }else {
        $this->percentage_of_complete_project_count = 0;
        $this->percentage_of_canceled_project_count = 0;

        $this->percentage_of_onhold_project_count= 0;
      }
      if ($this->total_completed_project > 0) {
          $this->percentage_of_completed_ontime_project_count= $this->total_completed_project_on_time/$this->total_completed_project*100;
      }
      else {
          $this->percentage_of_completed_ontime_project_count= 0;
      }


        $this->avg_project_completion_time= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->avg('project_completion_days');
        $this->pm_projects= Project::where('pm_id',Auth::id())->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();
        $this->tasks= Task::where('added_by',Auth::id())->orderBy('id','desc')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->get();

        $this->view = 'dashboard.ajax.project-manager';
        $this->sales_view = 'dashboard.ajax.sales_executive';
      

        if (request()->ajax()) {
            $html = view($this->view,$this->data)->render();
            $html2 = view($this->sales_view,$this->data)->render();

            return Reply::dataOnly(['status' => 'success', 'html' => $html,'html2'=> $html2, 'title' => $this->pageTitle]);
        }else {
            return view('dashboard.employee.index', $this->data);
        }
        //dd($this->view);
        //dd($this->no_of_inprogress,$this->no_of_canceled, $this->total_project_value, $this->total_released_amount );




    }

    public function clockInModal()
    {
        $showClockIn = AttendanceSetting::first();

        $this->attendanceSettings = $this->attendanceShift($showClockIn);


        $startTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_start_time;
        $endTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_end_time;
        $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $this->global->timezone);
        $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $this->global->timezone);
        $officeStartTime = $officeStartTime->setTimezone('UTC');
        $officeEndTime = $officeEndTime->setTimezone('UTC');

        if ($officeStartTime->gt($officeEndTime)) {
            $officeEndTime->addDay();
        }

        $this->cannotLogin = false;

        if ($showClockIn->employee_clock_in_out == 'yes') {
            if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                $this->cannotLogin = true;
            }

            if (isset($this->cannotLogin) && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                $this->cannotLogin = false;
            }
        } else {
            $this->cannotLogin = true;
        }


        $this->shiftAssigned = $this->attendanceSettings;

        $this->attendanceSettings = attendance_setting();
        $this->location = CompanyAddress::all();

        return view('dashboard.employee.clock_in_modal', $this->data);
    }

    public function storeClockIn(ClockInRequest $request)
    {
        
        $now = now();
       // dd($now);

        $showClockIn = AttendanceSetting::first();

        $this->attendanceSettings = $this->attendanceShift($showClockIn);

        $startTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_start_time;
        $endTimestamp = now()->format('Y-m-d') . ' ' . $this->attendanceSettings->office_end_time;
        $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $startTimestamp, $this->global->timezone);
        $officeEndTime = Carbon::createFromFormat('Y-m-d H:i:s', $endTimestamp, $this->global->timezone);
        $officeStartTime = $officeStartTime->setTimezone('UTC');
        $officeEndTime = $officeEndTime->setTimezone('UTC');

        if ($officeStartTime->gt($officeEndTime)) {
            $officeEndTime->addDay();
        }

        $this->cannotLogin = false;
        $clockInCount = Attendance::getTotalUserClockInWithTime($officeStartTime, $officeEndTime, $this->user->id);

        if ($showClockIn->employee_clock_in_out == 'yes') {
            if (!now()->between($officeStartTime, $officeEndTime) && $showClockIn->show_clock_in_button == 'no') {
                $this->cannotLogin = true;
            }

            if ($this->cannotLogin == true && now()->betweenIncluded($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay())) {
                $this->cannotLogin = false;
                $clockInCount = Attendance::getTotalUserClockInWithTime($officeStartTime->copy()->subDay(), $officeEndTime->copy()->subDay(), $this->user->id);
            }
        } else {
            $this->cannotLogin = true;
        }

        if ($this->cannotLogin == true) {
            abort(403, __('messages.permissionDenied'));
        }

        // Check user by ip
        if (attendance_setting()->ip_check == 'yes') {
            $ips = (array)json_decode(attendance_setting()->ip_address);

            if (!in_array($request->ip(), $ips)) {
                return Reply::error(__('messages.notAnAuthorisedDevice'));
            }
        }

        // Check user by location
        if (attendance_setting()->radius_check == 'yes') {
            $checkRadius  = $this->isWithinRadius($request);

            if (!$checkRadius) {
                return Reply::error(__('messages.notAnValidLocation'));
            }
        }

        // Check maximum attendance in a day
        if ($clockInCount < $this->attendanceSettings->clockin_in_day) {

            // Set TimeZone And Convert into timestamp
            $currentTimestamp = $now->setTimezone('UTC');
            $currentTimestamp = $currentTimestamp->timestamp;;

            // Set TimeZone And Convert into timestamp in halfday time
            if ($this->attendanceSettings->halfday_mark_time) {
                $halfDayTimestamp = $now->format('Y-m-d') . ' ' . $this->attendanceSettings->halfday_mark_time;
                $halfDayTimestamp = Carbon::createFromFormat('Y-m-d H:i:s', $halfDayTimestamp, $this->global->timezone);
                $halfDayTimestamp = $halfDayTimestamp->setTimezone('UTC');
                $halfDayTimestamp = $halfDayTimestamp->timestamp;
            }


            $timestamp = $now->format('Y-m-d') . ' ' . $this->attendanceSettings->office_start_time;
            $officeStartTime = Carbon::createFromFormat('Y-m-d H:i:s', $timestamp, $this->global->timezone);
            $officeStartTime = $officeStartTime->setTimezone('UTC');


            $lateTime = $officeStartTime->addMinutes($this->attendanceSettings->late_mark_duration);

            $checkTodayAttendance = Attendance::where('user_id', $this->user->id)
                ->where(DB::raw('DATE(attendances.clock_in_time)'), '=', $now->format('Y-m-d'))->first();

            $attendance = new Attendance();
            $attendance->user_id = $this->user->id;
            $attendance->clock_in_time = $now->setTimezone('Asia/dhaka');;
           // dd($now);
            $attendance->clock_in_ip = request()->ip();

            $attendance->working_from = $request->working_from;
            $attendance->location_id = $request->location;
            $attendance->work_from_type = $request->work_from_type;

            if ($now->gt($lateTime) && is_null($checkTodayAttendance)) {
                $attendance->late = 'yes';
            }

            $attendance->half_day = 'no'; // default halfday

            // Check day's first record and half day time
            if (
                !is_null($this->attendanceSettings->halfday_mark_time)
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

            $attendance->employee_shift_id = $this->attendanceSettings->id;

            $attendance->shift_start_time = $attendance->clock_in_time->toDateString() . ' ' .$this->attendanceSettings->office_start_time;

            if (Carbon::parse($this->attendanceSettings->office_start_time)->gt(Carbon::parse($this->attendanceSettings->office_end_time))) {
                $attendance->shift_end_time = $attendance->clock_in_time->addDay()->toDateString() . ' ' .$this->attendanceSettings->office_end_time;

            } else {
                $attendance->shift_end_time = $attendance->clock_in_time->toDateString() . ' ' .$this->attendanceSettings->office_end_time;
            }

            $attendance->save();

            return Reply::successWithData(__('messages.attendanceSaveSuccess'), ['time' => $now->format('h:i A'), 'ip' => $attendance->clock_in_ip, 'working_from' => $attendance->working_from]);
        }

        return Reply::error(__('messages.maxColckIn'));
    }

    public function updateClockIn(Request $request)
    {
        $now = now();
        $attendance = Attendance::findOrFail($request->id);
        $this->attendanceSettings = attendance_setting();

        if ($this->attendanceSettings->ip_check == 'yes') {
            $ips = (array)json_decode($this->attendanceSettings->ip_address);

            if (!in_array($request->ip(), $ips)) {
                return Reply::error(__('messages.notAnAuthorisedDevice'));
            }
        }

        if ($this->attendanceSettings->radius_check == 'yes') {
            $checkRadius  = $this->isWithinRadius($request);

            if (!$checkRadius) {
                return Reply::error(__('messages.notAnValidLocation'));
            }
        }

        $attendance->clock_out_time = $now;
        $attendance->clock_out_ip = request()->ip();
        $attendance->save();

        return Reply::success(__('messages.attendanceSaveSuccess'));
    }

    /**
     * Calculate distance between two geo coordinates using Haversine formula and then compare
     * it with $radius.
     *
     * If distance is less than the radius means two points are close enough hence return true.
     * Else return false.
     *
     * @param Request $request
     *
     * @return boolean
     */
    private function isWithinRadius($request)
    {
        $radius = attendance_setting()->radius;
        $currentLatitude = $request->currentLatitude;
        $currentLongitude = $request->currentLongitude;

        $latFrom = deg2rad($this->global->latitude);
        $latTo = deg2rad($currentLatitude);

        $lonFrom = deg2rad($this->global->longitude);
        $lonTo = deg2rad($currentLongitude);

        $theta = $lonFrom - $lonTo;

        $dist = sin($latFrom) * sin($latTo) + cos($latFrom) * cos($latTo) * cos($theta);
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $distance = $dist * 60 * 1.1515 * 1609.344;
        return $distance <= $radius;
    }

    public function attendanceShift($defaultAttendanceSettings)
    {
        $checkPreviousDayShift = EmployeeShiftSchedule::where('user_id', user()->id)
            ->where('date', now(global_setting()->timezone)->subDay()->toDateString())
            ->first();

        $checkTodayShift = EmployeeShiftSchedule::where('user_id', user()->id)
            ->where('date', now(global_setting()->timezone)->toDateString())
            ->first();

        $backDayFromDefault = Carbon::parse(now(global_setting()->timezone)->subDay()->format('Y-m-d') . ' ' . $defaultAttendanceSettings->office_start_time);

        $backDayToDefault = Carbon::parse(now(global_setting()->timezone)->subDay()->format('Y-m-d') . ' ' . $defaultAttendanceSettings->office_end_time);

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

}
