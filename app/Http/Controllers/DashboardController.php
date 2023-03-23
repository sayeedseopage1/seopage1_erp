<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\AttendanceSetting;
use App\Models\DashboardWidget;
use App\Models\EmployeeDetails;
use App\Models\Event;
use App\Models\Holiday;
use App\Models\Leave;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\Ticket;
use App\Models\PMAssign;
use App\Models\Project;
use App\Traits\ClientDashboard;
use App\Traits\ClientPanelDashboard;
use App\Traits\CurrencyExchange;
use App\Traits\EmployeeDashboard;
use App\Traits\FinanceDashboard;
use App\Traits\HRDashboard;
use App\Traits\OverviewDashboard;
use App\Traits\ProjectDashboard;
use App\Traits\TicketDashboard;
use App\Traits\webdevelopmentDashboard;
use App\Traits\LeadDashboard;
use App\Traits\DeveloperDashboard;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Froiden\Envato\Traits\AppBoot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends AccountBaseController
{
    use AppBoot, CurrencyExchange, OverviewDashboard, EmployeeDashboard, ProjectDashboard, ClientDashboard, HRDashboard,webdevelopmentDashboard, TicketDashboard, FinanceDashboard, ClientPanelDashboard, LeadDashboard, DeveloperDashboard;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.dashboard';
        $this->middleware(function ($request, $next) {
            $this->viewOverviewDashboard = user()->permission('view_overview_dashboard');
            $this->viewProjectDashboard = user()->permission('view_project_dashboard');
            $this->viewClientDashboard = user()->permission('view_client_dashboard');
            $this->viewHRDashboard = user()->permission('view_hr_dashboard');
            $this->viewTicketDashboard = user()->permission('view_ticket_dashboard');
            $this->viewFinanceDashboard = user()->permission('view_finance_dashboard');
            return $next($request);
        });

    }

    /**
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response|mixed|void
     */
    public function index()
    {
        $this->isCheckScript();
        if (in_array('Lead Developer', user_roles())) {
            return $this->LeadDashboard();
        }
        if (in_array('Developer', user_roles())) {
            return $this->DeveloperDashboard();
        }
        if (in_array('employee', user_roles())) {
            return $this->employeeDashboard();
        }

        if (in_array('client', user_roles())) {
            return $this->clientPanelDashboard();
        }

    }

    public function widget(Request $request, $dashboardType)
    {
        $data = $request->all();
        unset($data['_token']);
        DashboardWidget::where('status', 1)->where('dashboard_type', $dashboardType)->update(['status' => 0]);

        foreach ($data as $key => $widget) {
            DashboardWidget::where('widget_name', $key)->where('dashboard_type', $dashboardType)->update(['status' => 1]);
        }

        return Reply::success(__('messages.updatedSuccessfully'));
    }

    public function checklist()
    {
        if (in_array('admin', user_roles())) {
            $this->isCheckScript();
            return view('dashboard.checklist', $this->data);
        }
    }

    /**
     * @return array|\Illuminate\Http\Response
     */
    public function memberDashboard()
    {
        abort_403 (!in_array('employee', user_roles()));
        return $this->employeeDashboard();
    }

    public function advancedDashboard()
    {

        if (in_array('admin', user_roles()) || $this->sidebarUserPermissions['view_overview_dashboard'] == 4
        || $this->sidebarUserPermissions['view_project_dashboard'] == 4
        || $this->sidebarUserPermissions['view_client_dashboard'] == 4
        || $this->sidebarUserPermissions['view_hr_dashboard'] == 4
        || $this->sidebarUserPermissions['view_ticket_dashboard'] == 4
        || $this->sidebarUserPermissions['view_finance_dashboard'] == 4)


         {

            $tab = request('tab');

            switch ($tab) {
            case 'project':
                $this->projectDashboard();
                break;
            case 'client':
                $this->clientDashboard();
                break;
            case 'hr':
                $this->hrDashboard();
                break;
            case 'ticket':
                $this->ticketDashboard();
                break;
            case 'finance':
                $this->financeDashboard();
                break;
                case 'web-development':
                    $this->webdevelopmentDashboard();
                    break;
            default:
                if (in_array('admin', user_roles()) || $this->sidebarUserPermissions['view_overview_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'overview' : $tab;
                    $this->overviewDashboard();

                } elseif ($this->sidebarUserPermissions['view_project_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'project' : $tab;
                    $this->projectDashboard();

                } elseif ($this->sidebarUserPermissions['view_client_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'client' : $tab;
                    $this->clientDashboard();

                } elseif ($this->sidebarUserPermissions['view_hr_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'hr' : $tab;
                    $this->hrDashboard();

                } elseif ($this->sidebarUserPermissions['view_finance_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'finance' : $tab;
                    $this->ticketDashboard();

                } else if ($this->sidebarUserPermissions['view_ticket_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'finance' : $tab;
                    $this->financeDashboard();
                }else if ($this->sidebarUserPermissions['view_ticket_dashboard'] == 4) {
                    $this->activeTab = ($tab == '') ? 'web-development' : $tab;
                    $this->webdevelopmentDashboard();
                  }
                break;
            }

            if (request()->ajax()) {
                $html = view($this->view, $this->data)->render();
                return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
            }

            if (!isset($this->activeTab)) {
                $this->activeTab = ($tab == '') ? 'overview' : $tab;
            }

            return view('dashboard.admin', $this->data);
        }
    }

    public function accountUnverified()
    {
        return view('dashboard.unverified', $this->data);
    }

    public function weekTimelog()
    {
        $now = now(global_setting()->timezone);
        $attndcSetting = AttendanceSetting::first();
        $this->timelogDate = $timelogDate = Carbon::parse(request()->date);
        $this->weekStartDate = $now->copy()->startOfWeek($attndcSetting->week_start_from);
        $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
        $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6)); // Get All Dates from start to end date

        $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs($timelogDate->toDateString(), user()->id);
        $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak($timelogDate->toDateString(), user()->id);

        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);

        $html = view('dashboard.employee.week_timelog', $this->data)->render();
        return Reply::dataOnly(['html' => $html]);
    }

    public function privateCalendar()
    {
        if(request()->filter)
        {
            $employee_details = EmployeeDetails::where('user_id', user()->id)->first();
            $employee_details->calendar_view = (request()->filter != false) ? request()->filter : null;
            $employee_details->save();
            session()->forget('user');
        }

        $startDate = Carbon::parse(request('start'));
        $endDate = Carbon::parse(request('end'));

        // get calendar view current logined user
        $calendar_filter_array = explode(',', user()->employeeDetails->calendar_view);

        $eventData = array();

        if(in_array('events', $calendar_filter_array))
        {
            // Events
            $model = Event::with('attendee', 'attendee.user');

            $model->where(function ($query) {
                $query->whereHas('attendee', function ($query) {
                    $query->where('user_id', user()->id);
                });
                $query->orWhere('added_by', user()->id);
            });

            $model->whereBetween('start_date_time', [$startDate->toDateString(), $endDate->toDateString()]);

            $events = $model->get();


            foreach ($events as $key => $event)
            {
                $eventData[] = [
                    'id' => $event->id,
                    'title' => ucfirst($event->event_name),
                    'start' => $event->start_date_time,
                    'end' => $event->end_date_time,
                    'event_type' => 'event',
                    'extendedProps' => ['bg_color' => $event->label_color, 'color' => '#fff','icon' => 'fa-calendar']
                ];
            }
        }

        if(in_array('holiday', $calendar_filter_array))
        {
            // holiday
            $holidays = Holiday::whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])->get();

            foreach ($holidays as $key => $holiday)
            {
                $eventData[] = [
                    'id' => $holiday->id,
                    'title' => ucfirst($holiday->occassion),
                    'start' => $holiday->date,
                    'end' => $holiday->date,
                    'event_type' => 'holiday',
                    'extendedProps' => ['bg_color' => '#1d82f5', 'color' => '#fff','icon' => 'fa-star']
                ];
            }
        }

        if(in_array('task', $calendar_filter_array))
        {
            // tasks
            $completedTaskColumn = TaskboardColumn::completeColumn();
            $tasks = Task::with('boardColumn')
                ->where('board_column_id', '<>', $completedTaskColumn->id)
                ->whereHas('users', function ($query) {
                    $query->where('user_id', user()->id);
                })
                ->where(function ($q) use ($startDate, $endDate) {
                    $q->whereBetween(DB::raw('DATE(tasks.`due_date`)'), [$startDate->toDateString(), $endDate->toDateString()]);

                    $q->orWhereBetween(DB::raw('DATE(tasks.`start_date`)'), [$startDate->toDateString(), $endDate->toDateString()]);
                })->get();

            foreach ($tasks as $key => $task)
            {
                $eventData[] = [
                    'id' => $task->id,
                    'title' => ucfirst($task->heading),
                    'start' => $task->start_date,
                    'end' => $task->due_date ? $task->due_date : $task->start_date,
                    'event_type' => 'task',
                    'extendedProps' => ['bg_color' => $task->boardColumn->label_color, 'color' => '#fff','icon' => 'fa-list']
                ];
            }
        }

        if(in_array('tickets', $calendar_filter_array))
        {
            // tickets
            $tickets = Ticket::where('user_id', user()->id)
            ->whereBetween(DB::raw('DATE(tickets.`updated_at`)'), [$startDate->toDateString(), $endDate->toDateString()])->get();

            foreach ($tickets as $key => $ticket)
            {
                $eventData[] = [
                    'id' => $ticket->id,
                    'title' => ucfirst($ticket->subject),
                    'start' => $ticket->updated_at,
                    'end' => $ticket->updated_at,
                    'event_type' => 'ticket',
                    'extendedProps' => ['bg_color' => '#1d82f5', 'color' => '#fff','icon' => 'fa-ticket-alt']
                ];
            }
        }

        if(in_array('leaves', $calendar_filter_array))
        {
            // approved leaves of all emoloyees with employee name
            $leaves = Leave::join('leave_types', 'leave_types.id', 'leaves.leave_type_id')
                ->where('leaves.status', 'approved')
                ->select('leaves.id', 'leaves.leave_date', 'leaves.status', 'leave_types.type_name', 'leave_types.color', 'leaves.leave_date', 'leaves.duration', 'leaves.status', 'leaves.user_id')
                ->with('user')
                ->whereBetween(DB::raw('DATE(leaves.`leave_date`)'), [$startDate->toDateString(), $endDate->toDateString()])
                ->get();

            $duration = '';

            foreach ($leaves as $key => $leave)
            {
                $duration = ($leave->duration == 'half day') ? '( '. __('app.halfday') .' )' : '';

                $eventData[] = [
                    'id' => $leave->id,
                    'title' => $duration.' '.ucfirst($leave->user->name),
                    'start' => $leave->leave_date->toDateString(),
                    'end' => $leave->leave_date->toDateString(),
                    'event_type' => 'leave',
                    /** @phpstan-ignore-next-line */
                    'extendedProps' => ['name' => 'Leave : '.ucfirst($leave->user->name),'bg_color' => $leave->color, 'color' => '#fff','icon' => 'fa-plane-departure']
                ];
            }
        }

        return $eventData;
    }

    public function projectManageDetalsOnAdvanceDashboard(Request $request)
    {
        $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate);
        $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate);

        $project_counts= PMAssign::where('pm_id',$request->pm_id)->whereBetween('created_at', [$startDate, $endDate])->first();
        if (!is_null($project_counts) && $project_counts->project_count != 0) {
            $project_release_count= Project::where('pm_id',$request->pm_id)->where('due',0)->whereBetween('created_at', [$startDate, $endDate])->count();
            if ($project_release_count != 0) {
                $total_release_percentage= ($project_release_count / $project_counts->project_count)* 100;
            }else {
                $total_release_percentage=0;
            }

            $project_cancelation=  Project::where('pm_id',$request->pm_id)->where('status','canceled')->whereBetween('created_at', [$startDate, $endDate])->count();
            if ($project_cancelation != 0) {
                $percentage_of_project_cancelation = ($project_cancelation / $project_counts->project_count)*100;
            }else {
                $percentage_of_project_cancelation= 0;
            }

            $projects_on_hold= Project::where('pm_id',$request->pm_id)->where('status','on hold')->whereBetween('created_at', [$startDate, $endDate])->count();
            if ($projects_on_hold != 0) {
                $projects_on_hold_percentage= ($project_counts->project_count / $projects_on_hold)*100;
            }else {
                $projects_on_hold_percentage= 0;
            }

        }else {
            $total_release_percentage=0;
            $percentage_of_project_cancelation= 0;
            $projects_on_hold_percentage= 0;
        }
        if (!is_null($project_counts) && $project_counts->amount != 0) {

            $project_cancelation_rate=  Project::where('pm_id',$request->pm_id)->where('status','canceled')->whereBetween('created_at', [$startDate, $endDate])->sum('project_budget');
            $percentage_of_project_cancelation_rate= ($project_cancelation_rate/$project_counts->amount)*100;
        }else {

            $percentage_of_project_cancelation_rate= 0;
        }

        $html = view('dashboard.ajax.projectManageDetalsOnAdvanceDashboard', [
            'pm_id' => $request->pm_id,
            'project_counts' => $project_counts,
            'total_release_percentage' => $total_release_percentage,
            'percentage_of_project_cancelation' => $percentage_of_project_cancelation,
            'percentage_of_project_cancelation_rate' => $percentage_of_project_cancelation_rate,
            'projects_on_hold_percentage' => $projects_on_hold_percentage,
        ])->render();

        return response()->json([
            'status' => 'success',
            'html' => $html
        ]);
    }
}
