<?php

namespace App\Traits;

use App\Models\DashboardWidget;
use App\Models\Lead;
use App\Models\Leave;
use App\Models\Payment;
use App\Models\ProjectActivity;
use App\Models\ProjectTimeLog;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\Ticket;
use App\Models\UserActivity;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;



/**
 *
 */
trait OverviewDashboard
{

    /**
     *
     * @return void
     */
    public function overviewDashboard()
    {
        abort_403(!($this->viewOverviewDashboard == 'all'));

        $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();
        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);
        $startDate = $this->startDate->toDateString();
        $endDate = $this->endDate->toDateString();

        $taskBoardColumn = TaskboardColumn::all();

        $completedTaskColumn = $taskBoardColumn->filter(function ($value, $key) {
            return $value->slug == 'completed';
        })->first();

        $this->counts = DB::table('users')
            ->select(
                DB::raw('(select count(users.id) from `users` inner join role_user on role_user.user_id=users.id inner join roles on roles.id=role_user.role_id WHERE roles.name = "client") as totalClients'),
                DB::raw('(select count(users.id) from `users` inner join role_user on role_user.user_id=users.id inner join roles on roles.id=role_user.role_id WHERE roles.name = "employee" and users.status = "active") as totalEmployees'),
                DB::raw('(select count(projects.id) from `projects`) as totalProjects'),
                DB::raw('(select count(invoices.id) from `invoices` where status = "unpaid" or status = "partial") as totalUnpaidInvoices'),
                DB::raw('(select sum(project_time_logs.total_minutes) from `project_time_logs` where approved = "1") as totalHoursLogged'),
                DB::raw('(select sum(project_time_log_breaks.total_minutes) from `project_time_log_breaks`  ) as totalBreakMinutes'),
                DB::raw('(select count(tasks.id) from `tasks` where tasks.board_column_id=' . $completedTaskColumn->id . ' and is_private = "0") as totalCompletedTasks'),
                DB::raw('(select count(tasks.id) from `tasks` where tasks.board_column_id != ' . $completedTaskColumn->id . ' and is_private = "0") as totalPendingTasks'),
                DB::raw('(select count(distinct(attendances.user_id)) from `attendances` inner join users as atd_user on atd_user.id=attendances.user_id inner join role_user on role_user.user_id=atd_user.id inner join roles on roles.id=role_user.role_id WHERE roles.name = "employee" and attendances.clock_in_time >= "'.today(global_setting()->timezone)->setTimezone('UTC')->toDateTimeString().'" and atd_user.status = "active") as totalTodayAttendance'),
                DB::raw('(select count(tickets.id) from `tickets` where (status="open") and deleted_at IS NULL) as totalOpenTickets'),
                DB::raw('(select count(tickets.id) from `tickets` where (status="resolved" or status="closed") and deleted_at IS NULL) as totalResolvedTickets')
            )
            ->first();

        $timeLog = intdiv(($this->counts->totalHoursLogged - $this->counts->totalBreakMinutes), 60) . ' ' . __('app.hrs') . ' ';

        if ((($this->counts->totalHoursLogged - $this->counts->totalBreakMinutes) % 60) > 0) {
            $timeLog .= (($this->counts->totalHoursLogged - $this->counts->totalBreakMinutes) % 60) . ' ' . __('app.mins');
        }

        $this->counts->totalHoursLogged = $timeLog;
        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->earningChartData = $this->earningChart($startDate, $endDate);
        $this->timlogChartData = $this->timelogChart($startDate, $endDate);
      

        $this->leaves = Leave::with('user', 'type')
            ->where('status', 'pending')
            ->whereBetween('leave_date', [$startDate, $endDate])
            ->get();

        $this->newTickets = Ticket::with('requester')->where('status', 'open')
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->orderBy('updated_at', 'desc')->get();

        $this->pendingTasks = Task::with('project', 'users', 'boardColumn')
            ->where('tasks.board_column_id', '<>', $completedTaskColumn->id)
            ->where('tasks.is_private', 0)
            ->orderBy('due_date', 'desc')
            ->whereBetween('due_date', [$startDate, $endDate])
            ->limit(15)
            ->get();

        $currentDate = now()->timezone($this->global->timezone)->toDateTimeString();


        $this->pendingLeadFollowUps = Lead::with('followup', 'leadAgent', 'leadAgent.user', 'leadAgent.user.employeeDetail', 'leadAgent.user.employeeDetail.designation')
            ->selectRaw('leads.id,leads.company_name, leads.client_name, leads.agent_id, ( select lead_follow_up.next_follow_up_date from lead_follow_up where lead_follow_up.lead_id = leads.id and DATE(lead_follow_up.next_follow_up_date) < "'.$currentDate.'" ORDER BY lead_follow_up.created_at DESC Limit 1) as follow_up_date_past,
            ( select lead_follow.next_follow_up_date from lead_follow_up as lead_follow where lead_follow.lead_id = leads.id and DATE(lead_follow.next_follow_up_date) > "'.$currentDate.'" ORDER BY lead_follow.created_at DESC Limit 1) as follow_up_date_next'
        )
            ->where('leads.next_follow_up', 'yes')
            ->whereNull('leads.client_id')
            ->groupBy('leads.id')
            ->get();

        $this->pendingLeadFollowUps = $this->pendingLeadFollowUps->filter(function ($value, $key) {
            return $value->follow_up_date_past != null && $value->follow_up_date_next == null;
        });

        $this->projectActivities = ProjectActivity::with('project')
            ->join('projects', 'projects.id', '=', 'project_activity.project_id')
            ->whereNull('projects.deleted_at')
            ->select('project_activity.*')
            ->limit(15)
            ->whereBetween('project_activity.created_at', [$startDate, $endDate])
            ->orderBy('project_activity.id', 'desc')
            ->groupBy('project_activity.id')
            ->get();

        $this->userActivities = UserActivity::with('user')->limit(15)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->orderBy('id', 'desc')->get();

        $this->view = 'dashboard.ajax.overview';
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function earningChart($startDate, $endDate)
    {
        $payments = Payment::join('currencies', 'currencies.id', '=', 'payments.currency_id')->where('status', 'complete');

        $payments = $payments->whereBetween('payments.paid_on', [Carbon::parse($startDate)->startOfDay(), Carbon::parse($endDate)->endOfDay()]);

        $payments = $payments->orderBy('paid_on', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(paid_on,"%d-%M-%y") as date'),
                DB::raw('YEAR(paid_on) year, MONTH(paid_on) month'),
                DB::raw('amount as total'),
                'currencies.id as currency_id',
                'currencies.exchange_rate'
            ]);

        $incomes = [];

        foreach ($payments as $invoice) {
            if (!isset($incomes[$invoice->date])) {
                $incomes[$invoice->date] = 0;
            }

            if ($invoice->currency_id != $this->global->currency->id && $invoice->exchange_rate != 0) {
                $incomes[$invoice->date] += floor($invoice->total / $invoice->exchange_rate);

            } else {
                $incomes[$invoice->date] += round($invoice->total, 2);
            }
        }

        $dates = array_keys($incomes);
        $graphData = [];

        foreach ($dates as $date) {
            $graphData[] = [
                'date' => $date,
                'total' => isset($incomes[$date]) ? round($incomes[$date], 2) : 0,
            ];
        }

        usort($graphData, function ($a, $b) {
            $t1 = strtotime($a['date']);
            $t2 = strtotime($b['date']);
            return $t1 - $t2;
        });

        // return $graphData;
        $graphData = collect($graphData);

        $data['labels'] = $graphData->pluck('date');
        $data['values'] = $graphData->pluck('total')->toArray();
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('app.earnings');

        return $data;
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function timelogChart($startDate, $endDate)
    {
        $timelogs = ProjectTimeLog::whereBetween('start_time', [$startDate, $endDate]);
        $timelogs = $timelogs->where('project_time_logs.approved', 1);
        $timelogs = $timelogs->groupBy('date')
            ->orderBy('start_time', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(start_time,\'%d-%M-%y\') as date'),
                DB::raw('FLOOR(sum(total_minutes/60)) as total_hours')
            ]);
        $data['labels'] = $timelogs->pluck('date');
        $data['values'] = $timelogs->pluck('total_hours')->toArray();
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('modules.dashboard.totalHoursLogged');
        return $data;
    }


}
