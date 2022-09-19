<?php

namespace App\Traits;

use App\Models\DashboardWidget;
use App\Models\Designation;
use App\Models\EmployeeDetails;
use App\Models\Leave;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

/**
 *
 */
trait HRDashboard
{
    use CurrencyExchange;

    /**
     *
     * @return void
     */
    public function hrDashboard()
    {
        abort_403(!($this->viewHRDashboard == 'all'));

        $this->pageTitle = 'app.hrDashboard';
        $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
        $startDate = $this->startDate->toDateString();
        $endDate = $this->endDate->toDateString();

        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-hr-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->totalLeavesApproved = Leave::whereBetween(DB::raw('DATE(`leave_date`)'), [$startDate, $endDate])->where('status', 'approved')->count();
        $this->totalEmployee = User::allEmployees(null, true)->count();
        $this->totalNewEmployee = EmployeeDetails::whereBetween(DB::raw('DATE(`joining_date`)'), [$startDate, $endDate])->count();
        $this->totalEmployeeExits = EmployeeDetails::whereBetween(DB::raw('DATE(`last_date`)'), [$startDate, $endDate])->count();

        $attandance = EmployeeDetails::join('users', 'users.id', 'employee_details.user_id')
            ->join('attendances', 'attendances.user_id', 'users.id')
            ->whereBetween(DB::raw('DATE(attendances.`clock_in_time`)'), [$startDate, $endDate])
            ->select(DB::raw('count(users.id) as employeeCount'), DB::raw('DATE(attendances.clock_in_time) as date'))
            ->groupBy('date')
            ->get();

        if ($attandance->count() > 0) {
            try {
                $this->averageAttendance = number_format(((array_sum(array_column($attandance->toArray(), 'employeeCount')) / $attandance->count()) * 100) / $this->totalEmployee, 2) . '%';
            } catch (Exception $e) {
                $this->averageAttendance = '0%';
            }

        } else {
            $this->averageAttendance = '0%';
        }

        $this->departmentWiseChart = $this->departmentWiseChart();
        $this->designationWiseChart = $this->designationWiseChart();
        $this->genderWiseChart = $this->genderWiseChart();
        $this->roleWiseChart = $this->roleWiseChart();

        $this->leavesTaken = User::with('employeeDetail', 'employeeDetail.designation')
            ->join('leaves', 'leaves.user_id', 'users.id')
            ->whereBetween(DB::raw('DATE(leaves.`leave_date`)'), [$startDate, $endDate])
            ->where('leaves.status', 'approved')
            ->select(DB::raw('count(leaves.id) as employeeLeaveCount'), 'users.*')
            ->groupBy('users.id')
            ->orderBy('employeeLeaveCount', 'DESC')
            ->get();

        $fromMonthDay = carbon::parse($startDate)->format('m-d');
        $tillMonthDay = carbon::parse($endDate)->format('m-d');

        $this->birthdays = EmployeeDetails::with('user')
            ->select('*', 'date_of_birth', DB::raw('MONTH(date_of_birth) months'))
            ->whereNotNull('date_of_birth')
            ->where(function ($query) use($fromMonthDay, $tillMonthDay){
                    $query->whereRaw('DATE_FORMAT(`date_of_birth`, "%m-%d") BETWEEN "'.$fromMonthDay.'" AND "'.$tillMonthDay.'"');
            })
            ->orderBy('months')
            ->get();

        $this->lateAttendanceMarks = User::with('employeeDetail', 'employeeDetail.designation')
            ->without(['role', 'clientDetails'])
            ->join('attendances', 'attendances.user_id', 'users.id')
            ->whereBetween(DB::raw('DATE(attendances.`clock_in_time`)'), [$startDate, $endDate])
            ->where('late', 'yes')
            ->select(DB::raw('count(DISTINCT DATE(attendances.clock_in_time) ) as employeeLateCount'), 'users.*')
            ->groupBy('users.id')
            ->orderBy('employeeLateCount', 'DESC')
            ->get();

        $this->counts = DB::table('users')
            ->select(
                DB::raw('(select count(distinct(attendances.user_id)) from `attendances` inner join users as atd_user on atd_user.id=attendances.user_id inner join role_user on role_user.user_id=atd_user.id inner join roles on roles.id=role_user.role_id WHERE roles.name = "employee" and attendances.clock_in_time >= "'.today(global_setting()->timezone)->setTimezone('UTC')->toDateTimeString().'" and atd_user.status = "active") as totalTodayAttendance'),
                DB::raw('(select count(users.id) from `users` inner join role_user on role_user.user_id=users.id inner join roles on roles.id=role_user.role_id WHERE roles.name = "employee" and users.status = "active") as totalEmployees')
            )
            ->first();

        $this->view = 'dashboard.ajax.hr';
    }

    public function departmentWiseChart()
    {
        $departments = Team::withCount(['teamMembers' => function($query) {
            $query->join('users', 'users.id', '=', 'employee_details.user_id');
            $query->where('users.status', '=', 'active');
        }])->get();
        $data['labels'] = $departments->pluck('team_name')->toArray();

        foreach ($data['labels'] as $key => $value) {
            $data['colors'][] = '#' . substr(md5($value), 0, 6);
        }

        $data['values'] = $departments->pluck('team_members_count')->toArray();

        return $data;
    }

    public function designationWiseChart()
    {
        $departments = Designation::withCount(['members' => function($query) {
            $query->join('users', 'users.id', '=', 'employee_details.user_id');
            $query->where('users.status', '=', 'active');
        }])->get();

        $data['labels'] = $departments->pluck('name')->toArray();

        foreach ($data['labels'] as $key => $value) {
            $data['colors'][] = '#' . substr(md5($value), 0, 6);
        }

        $data['values'] = $departments->pluck('members_count')->toArray();

        return $data;
    }

    public function genderWiseChart()
    {

        $genderWiseEmployee = EmployeeDetails::join('users', 'users.id', 'employee_details.user_id')
            ->select(DB::raw('count(employee_details.id) as totalEmployee'), 'users.gender')
            ->whereNotNull('users.gender')
            ->where('users.status', '=', 'active')
            ->groupBy('users.gender')
            ->orderBy('users.gender', 'ASC')
            ->get();

        $labels = $genderWiseEmployee->pluck('gender')->toArray();

        $data['labels'] = [];

        foreach ($labels as $key => $value) {
            $data['labels'][] = __('app.' . $value);
        }

        $data['values'] = $genderWiseEmployee->pluck('totalEmployee')->toArray();
        $data['colors'] = ['#1d82f5', '#FCBD01', '#D30000'];
        return $data;
    }

    public function roleWiseChart()
    {
        $roleWiseChart = Role::withCount(['users' => function($query) {
            $query->where('users.status', '=', 'active');
        }])
            ->where('name', '<>', 'client')
            ->orderBy('id', 'asc')
            ->get();

        foreach ($roleWiseChart as $key => $value) {
            if ($value->name == 'admin' || $value->name == 'employee') {
                $data['labels'][] = __('app.' . $value->name);
                $data['colors'][] = '#' . substr(md5($value->name), 0, 6);
            }
            else {
                $data['labels'][] = $value->display_name;
                $data['colors'][] = '#' . substr(md5($value), 0, 6);
            }
        }

        $data['values'] = $roleWiseChart->pluck('users_count')->toArray();
        return $data;
    }

}
