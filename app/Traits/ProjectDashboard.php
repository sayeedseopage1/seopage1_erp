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

/**
 *
 */
trait ProjectDashboard
{

    /**
     *
     * @return void
     */
    public function projectDashboard()
    {
        abort_403(!($this->viewProjectDashboard == 'all'));

        $this->pageTitle = 'app.projectDashboard';

        $this->startDate  = (request('startDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('startDate')) : now($this->global->timezone)->startOfMonth();

        $this->endDate = (request('endDate') != '') ? Carbon::createFromFormat($this->global->date_format, request('endDate')) : now($this->global->timezone);

        $startDate = $this->startDate->toDateString();
        $endDate = $this->endDate->toDateString();

        $this->totalProject = Project::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
        //$this->totalCanceledProject  = Project::where('status','canceled')->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();

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


        $this->widgets = DashboardWidget::where('dashboard_type', 'admin-project-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();

        $this->pendingMilestone = ProjectMilestone::whereBetween(DB::raw('DATE(project_milestones.`created_at`)'), [$startDate, $endDate])
            ->with('project', 'currency')
            ->get();

        $this->statusWiseProject = $this->statusChartData($startDate, $endDate);

        $this->view = 'dashboard.ajax.project';
    }

    public function statusChartData($startDate, $endDate)
    {
        $labels = ProjectStatusSetting::all()->where('status', 'active')->pluck('status_name');
        $data['labels'] = ProjectStatusSetting::all()->where('status', 'active')->pluck('status_name');
        $data['colors'] = ProjectStatusSetting::all()->where('status', 'active')->pluck('color');
        $data['values'] = [];

        foreach ($labels as $label) {
            $data['values'][] = Project::whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->where('status', $label)->count();
        }

        return $data;
    }

}
