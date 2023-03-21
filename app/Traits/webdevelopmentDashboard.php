<?php

namespace App\Traits;

use App\Models\DashboardWidget;
use App\Models\Project;
use App\Models\ProjectMilestone;
use App\Models\ProjectStatusSetting;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\PMAssign;
use App\Models\Lead;
use App\Models\Deal;
use App\Models\Task;
use App\Models\ClientDetails;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\DealStage;
use App\Models\SalesCount;
use App\Models\TaskUser;
use App\Models\User;


/**
 *
 */
trait webdevelopmentDashboard
{

    /**
     *
     * @return void
     */
    public function webdevelopmentDashboard()
    {
        abort_403(!($this->viewProjectDashboard == 'all'));

        $this->pageTitle = 'Web Development Dashboard';

        $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth()->subMonths(1)->addDays(20);
        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone)->startOfMonth()->addDays(19);

        $startDate = $this->startDate->toDateString();
        $endDate = $this->endDate->toDateString();
        $this->totalProject = Project::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        //$this->totalCanceledProject  = Project::where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->new_leads = Lead::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->new_deals = Lead::where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->new_qualified_sales = Project::where('project_status','Accepted')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->new_clients = ClientDetails::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->payment_release = PMAssign::select('release_amount')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->sum('release_amount');
        $this->project_budget = Project::select('project_budget')->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->sum('project_budget');
        $this->payment_due= $this->project_budget - $this->payment_release;
        $this->on_going_project = Project::where('status','in progress')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->under_review = Project::where('status','under review')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->on_hold = Project::where('status','on hold')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->canceled = Project::where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();

        $this->payment_in_progress = Project::where('status','payment in progress')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->new_task = Task::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])  ->count();
        $this->task_completed = Task::where('status','completed')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->task_under_review = Task::where('board_column_id',6)->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->task_due = Task::where('status','incomplete')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->task_overdue = Task::where('board_column_id',7)->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->new_milestone = ProjectMilestone::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->milestone_completed = ProjectMilestone::where('status','completed')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->milestone_incomplete = ProjectMilestone::where('status','incomplete')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->total_invoice = Invoice::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        $this->invoice_paid = Invoice::where('status','paid')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->invoice_unpaid = Invoice::where('status','unpaid')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();

        $hoursLogged = ProjectTimeLog::whereDate('start_time', '>=', $startDate)
            ->whereDate('end_time', '<=', $endDate)
            ->whereNotNull('project_id')
            ->where('approved', 1)
            ->sum('total_minutes');

        $breakMinutes = ProjectTimeLogBreak::join('project_time_logs', 'project_time_log_breaks.project_time_log_id', '=', 'project_time_logs.id')
            ->whereDate('project_time_logs.start_time', '>=', $startDate)
            ->whereDate('project_time_logs.end_time', '<=', $endDate)
            ->whereNotNull('project_time_logs.project_id')
            ->sum('project_time_log_breaks.total_minutes');

        $hoursLogged = $hoursLogged - $breakMinutes;

        $timeLog = intdiv($hoursLogged, 60) . ' ' . __('app.hrs') . ' ';

        if (($hoursLogged % 60) > 0) {
            $timeLog .= ($hoursLogged % 60) . ' ' . __('app.mins');
        }

        $this->totalHoursLogged = $timeLog;

        $this->totalOverdueProject = Project::whereNotNull('deadline')
            ->where(DB::raw('DATE(deadline)'), '>=', $startDate)
            ->where(DB::raw('DATE(deadline)'), '<=', $endDate)
            ->count();
        $this->totalCanceledProject= Project::
                where('status','canceled')
                ->where(DB::raw('DATE(updated_at)'), '>=', $startDate)
                ->where(DB::raw('DATE(updated_at)'), '<=', $endDate)
                ->count();
        $this->totalAcceptedProject= Project::
                        where('project_status','Accepted')
                        ->where(DB::raw('DATE(created_at)'), '>=', $startDate)
                        ->where(DB::raw('DATE(created_at)'), '<=', $endDate)
                        ->count();

        $this->projectassign = PMAssign::whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])
                        //  ->with('project_count')

                          ->get();
        $this->projects = Project::whereBetween(DB::raw('DATE(`start_date`)'), [$startDate, $endDate])
                                          //  ->with('project_count')

            ->get();
        $this->leads=Lead::whereBetween(DB::raw('DATE(`created_at`)'),[$startDate,$endDate])->get();
        $this->deals=Lead::where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'),[$startDate,$endDate])->get();
        $this->sales=SalesCount::whereBetween(DB::raw('DATE(`updated_at`)'),[$startDate,$endDate])->get();
        $this->developers=User::where('role_id',5)->get();
        $this->tasks=TaskUser::with('task')->first();
        $this->leads=Lead::whereBetween(DB::raw('DATE(`created_at`)'),[$startDate,$endDate])->get();
        $this->deals=Lead::where('deal_status',1)->whereBetween(DB::raw('DATE(`created_at`)'),[$startDate,$endDate])->get();
        $this->sales=SalesCount::whereBetween(DB::raw('DATE(`updated_at`)'),[$startDate,$endDate])->get();
        $this->developers=User::where('role_id',5)->get();
        $this->tasks=TaskUser::with('task')->first();

        $this->firstDayofPreviousMonth = Carbon::now()->startOfMonth()->subMonthsNoOverflow()->toDateString();
        $this->start_date= Carbon::parse($this->firstDayofPreviousMonth)->addDays(20);
        $this->end_date= Carbon::parse($this->start_date)->addDays(30);
        $this->payment_date= Carbon::parse($this->start_date)->addDays(40);
        $this->lastDayofPreviousMonth = Carbon::now()->subMonthsNoOverflow()->endOfMonth()->toDateString();
        $this->project_count_this_month= Project::whereBetween(DB::raw('DATE(`start_date`)'), [$this->start_date, $this->end_date])->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->project_amount_this_month= Project::whereBetween(DB::raw('DATE(`payment_release_date`)'), [$this->start_date, $this->end_date])->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->sum('project_budget');
        $this->finish_project_count_this_month= Project::where('status','finished')->whereBetween(DB::raw('DATE(`start_date`)'), [$this->start_date, $this->end_date])->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();
        $this->finish_project_amount_this_month= Project::where('status','finished')->whereBetween(DB::raw('DATE(`payment_release_date`)'), [$this->start_date, $this->payment_date])->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->sum('project_budget');
        $this->project_amount_this_previous= Project::wherenotBetween(DB::raw('DATE(`payment_release_date`)'), [$this->start_date->subMonths(1), $this->end_date->subMonths(1)])->whereBetween(DB::raw('DATE(`updated_at`)'), [$this->startDate->subMonths(1), $this->endDate->subMonths(1)])->sum('project_budget');
        if ($this->project_count_this_month == 0) {
            $this->percentage_of_project_complete_count = 0 . ('%');
        }else {
            $this->percentage_of_project_complete_count= round($this->finish_project_count_this_month/$this->project_count_this_month * 100, 2) . ('%');
        }
        if ($this->project_amount_this_month == 0) {
            $this->percentage_of_project_complete_amount =  0 . ('%');
            $this->percentage_of_project_complete_previous_amount = 0 . ('%');
        }else {
            $this->percentage_of_project_complete_amount= round($this->finish_project_amount_this_month/$this->project_amount_this_month*100,2) . ('%');
            $this->percentage_of_project_complete_previous_amount= round($this->project_amount_this_previous/$this->finish_project_amount_this_month*100,2) . ('%');
        }

    //  dd($firstDayofPreviousMonth,$lastDayofPreviousMonth,$start_date,$end_date,$payment_date,$project_count_this_month,$finish_project_count_this_month,$finish_project_amount_this_month, $project_amount_this_month );
    //dd($this->project_count_this_month,$this->finish_project_count_this_month,$this->finish_project_amount_this_month, $this->project_amount_this_month, $this->percentage_of_project_complete_count,$this->percentage_of_project_complete_amount,$this->project_amount_this_previous);





                           //dd($this->projectassign);

        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-project-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->pendingMilestone = ProjectMilestone::where('status','incomplete')->whereBetween(DB::raw('DATE(project_milestones.`updated_at`)'), [$startDate, $endDate])
            ->with('project', 'currency')
            ->get();

        $this->statusWiseProject = $this->statusChartData($startDate, $endDate);

        $this->view = 'dashboard.ajax.web-development';
    }



}
