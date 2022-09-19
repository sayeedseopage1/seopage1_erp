<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TimelogCalendarController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.timeLogs';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('timelogs', $this->user->modules));
            return $next($request);
        });
    }

    /**
     * @param Request $request
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View
     */
    public function index(Request $request)
    {
        $viewPermission = $this->viewTimelogPermission;
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));
        
        if (request('start') && request('end')) {
            $viewTimelogPermission = user()->permission('view_timelogs');
            $startDate = Carbon::parse(request('start'))->startOfDay()->toDateTimeString();
            $endDate = Carbon::parse(request('end'))->endOfDay()->toDateTimeString();

            $projectId = $request->projectID;
            $employee = $request->employee;
            $approved = $request->approved;
            $invoice = $request->invoice;

            $timelogs = ProjectTimeLog::select(
                DB::raw('sum(total_minutes) as total_minutes'),
                DB::raw("DATE_FORMAT(start_time,'%Y-%m-%d') as start")
            )
                ->where('approved', 1)
                ->whereNotNull('end_time')
                ->whereBetween('start_time', [$startDate, $endDate]);

            if (!is_null($employee) && $employee !== 'all') {
                $timelogs = $timelogs->where('project_time_logs.user_id', $employee);
            }

            if (!is_null($projectId) && $projectId !== 'all') {
                $timelogs = $timelogs->where('project_time_logs.project_id', '=', $projectId);
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
                }
                else if ($invoice == 1) {
                    $timelogs = $timelogs->where('project_time_logs.invoice_id', '!=', null);
                }
            }

            if ($viewTimelogPermission == 'added') {
                $timelogs = $timelogs->where('project_time_logs.added_by', user()->id);
            }

            if ($viewTimelogPermission == 'owned') {
                $timelogs = $timelogs->where(function ($q) {
                    $q->where('project_time_logs.user_id', '=', user()->id);
    
                    if (in_array('client', user_roles())) {
                        $q->orWhere('projects.client_id', '=', user()->id);
                    }
                });
            }

            if ($viewTimelogPermission == 'both') {
                $timelogs = $timelogs->where(function ($q) {
                    $q->where('project_time_logs.user_id', '=', user()->id);

                    $q->orWhere('project_time_logs.added_by', '=', user()->id);

                    if (in_array('client', user_roles())) {
                        $q->orWhere('projects.client_id', '=', user()->id);
                    }
                });
            }

            $timelogs = $timelogs->groupBy('start')
                ->get();

            $calendarData = array();

            foreach ($timelogs as $key => $value) {
                $calendarData[] = [
                    'id' => $key + 1,
                    'title' => $value->hours,
                    'start' => $value->start
                ];
            }

            return $calendarData;
        }

        if (!request()->ajax()) {
            $this->employees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
            $this->projects = Project::allProjects();
        }

        return view('timelogs.calendar', $this->data);
    }

}
