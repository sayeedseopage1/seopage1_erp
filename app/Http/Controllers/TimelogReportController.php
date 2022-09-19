<?php

namespace App\Http\Controllers;

use App\DataTables\TimeLogReportDataTable;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TimelogReportController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.timeLogReport';
        $this->pageIcon = 'ti-pie-chart';
    }

    public function index(TimeLogReportDataTable $dataTable)
    {
        if (!request()->ajax()) {
            $this->fromDate = now($this->global->timezone)->startOfMonth();
            $this->toDate = now($this->global->timezone);

            $this->employees = User::allEmployees();
            $this->projects = Project::allProjects();
            $this->tasks = Task::all();
        }

        // return view('admin.reports.time-log.index', $this->data);
        return $dataTable->render('reports.timelogs.index', $this->data);
    }

    public function timelogChartData(Request $request)
    {
        $projectId = $request->projectId;
        $employee = $request->employee;
        $taskId = $request->taskId;
        $approved = $request->approved;
        $invoice = $request->invoice;

        $startDate = now($this->global->timezone)->startOfMonth()->toDateString();
        $endDate = now($this->global->timezone)->toDateString();

        if ($request->startDate !== null && $request->startDate != 'null' && $request->startDate != '') {
            $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        }

        if ($request->endDate !== null && $request->endDate != 'null' && $request->endDate != '') {
            $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        }

        $timelogs = ProjectTimeLog::whereDate('start_time', '>=', $startDate)
            ->whereDate('end_time', '<=', $endDate);

        if (!is_null($employee) && $employee !== 'all') {
            $timelogs = $timelogs->where('project_time_logs.user_id', $employee);
        }

        if (!is_null($projectId) && $projectId !== 'all') {
            $timelogs = $timelogs->where('project_time_logs.project_id', '=', $projectId);
        }

        if (!is_null($taskId) && $taskId !== 'all') {
            $timelogs = $timelogs->where('project_time_logs.task_id', '=', $taskId);
        }

        if (!is_null($approved) && $approved !== 'all') {
            if ($approved == 2) {
                $timelogs = $timelogs->whereNull('project_time_logs.end_time');
            }
            else {
                $timelogs = $timelogs->where('project_time_logs.approved', '=', $approved);
            }
        }

        if (!is_null($invoice) && $invoice !== 'all') {
            if ($invoice == 0) {
                $timelogs = $timelogs->where('project_time_logs.invoice_id', '=', null);

            }else if ($invoice == 1) {
                $timelogs = $timelogs->where('project_time_logs.invoice_id', '!=', null);
            }
        }

        $timelogs = $timelogs->groupBy('date')
            ->orderBy('start_time', 'ASC')
            ->get([
                DB::raw('DATE_FORMAT(start_time,\'%d-%M-%y\') as date'),
                DB::raw('FLOOR(sum(total_minutes/60)) as total_hours')
            ]);
        $data['labels'] = $timelogs->pluck('date')->toArray();
        $data['values'] = $timelogs->pluck('total_hours')->toArray();
        $data['colors'] = [$this->appTheme->header_color];
        $data['name'] = __('modules.dashboard.totalHoursLogged');

        $this->chartData = $data;
        $html = view('reports.timelogs.chart', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
    }

}
