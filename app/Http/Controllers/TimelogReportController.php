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

    public function index(TimeLogReportDataTable $dataTable ,  Request $request)
    {
        if (!request()->ajax()) {
            $this->fromDate = now($this->global->timezone)->startOfMonth();
            $this->toDate = now($this->global->timezone);

            $this->employees = User::allEmployees();
            $this->projects = Project::allProjects();
            $this->tasks = Task::all();
        }

        
        $this->users = DB::table('users')->select('id', 'name')->whereIn('role_id', [5, 9, 10])->get();
        foreach ($this->users as $key => $value) {
            $value->tasks = DB::table('project_time_logs')->select([
                'project_time_logs.id',
                'projects.project_name', 
                'pm.name as project_manager', 
                'client.name as client',
                DB::raw('COUNT(project_time_logs.id) as time_logs_count'),
                DB::raw('sum(project_time_logs.total_minutes) as total_minutes'),
            ])
            ->join('projects', 'project_time_logs.project_id', '=', 'projects.id')
            ->join('users as pm', 'projects.pm_id', '=', 'pm.id')
            ->join('users as client', 'projects.client_id', '=', 'client.id')
            ->where('project_time_logs.user_id', $value->id)
            ->groupBy('project_time_logs.project_id')
            ->get();
        }


        //return response()->json($users);

        //dd($users);
        // return view('admin.reports.time-log.index', $this->data);
        return $dataTable->render('reports.timelogs.index', $this->data);
    }
    // public function getTimeLog($type)
    
    public function getTimeLog($type)
    {

        $users = DB::table('users')->select(['id'])->whereIn('role_id', [5, 9, 10])->get()->toArray();
        $filtered_array = array_filter($users, function($item) {
            return isset($item->id);
        });
        $id_array = array_map(function($item) {
            return $item->id;
        }, $filtered_array);
        if ($type == 'employees') {
            $data = DB::table('project_time_logs')->select([
                'employee.id as employee_id',
                'employee.name as employee_name',
                'employee.image as employee_image',
                'employee_designations.name as employee_designation',
                 
                'projects.client_id',
                'client.name as client_name',
                'client.image as client_image',
                'deals.profile_link as client_from',
                'pm.id as pm_id',
                'pm.image as pm_image',
                'pm.name as pm_name', 
                'pm_roles.display_name as pm_roles',
                'projects.id as project_id',
                'projects.project_name',
                'projects.status as project_status',
                'tasks.id as task_id',
                'tasks.heading as task_name',
                'tasks.id as task_id',
                'tasks.start_date as task_start',
                'tasks.due_date as task_end',
                DB::raw('COUNT(project_time_logs.id) as number_of_session'),
                DB::raw('sum(project_time_logs.total_minutes) as total_minutes'),
            ])
            ->join('projects', 'project_time_logs.project_id', '=', 'projects.id')
            
            
            ->join('users as pm', 'projects.pm_id', '=', 'pm.id')
            ->join('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
            ->join('employee_details as pm_emp_details', 'pm.id', '=', 'pm_emp_details.user_id')
            ->join('designations as pm_employee_designations', 'pm_emp_details.designation_id', '=', 'pm_employee_designations.id')
            
            ->join('users as client', 'projects.client_id', '=', 'client.id')
            ->join('deals', 'client.id', '=', 'deals.client_id')
            
            ->join('users as employee', 'project_time_logs.user_id', '=', 'employee.id')
            ->join('employee_details', 'employee.id', '=', 'employee_details.user_id')
            ->join('designations as employee_designations', 'employee_details.designation_id', '=', 'employee_designations.id')
            
            
            ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
            ->whereIn('project_time_logs.user_id', $id_array)
            ->groupBy('project_time_logs.user_id', 'employee.id')
            ->groupBy('project_time_logs.project_id')
        //     ->groupBy('projects.client_id')
            //->where('projects.status','=','in progress')
           
            ->orderBy('project_time_logs.task_id' , 'desc')
            ->get();
           // dd($data);
        } else if($type == 'tasks') {
            $data = ProjectTimeLog::select([
                'tasks.id as task_id',
                'tasks.heading as task_name',   
                'projects.client_id',
                'client.name as client_name',
                'client.image as client_image',
                'deals.profile_link as client_from',
                
                'projects.id as project_id',
                'projects.project_name',
                'projects.status as project_status',

                'pm.id as pm_id',
                'pm.name as pm_name',
                'pm.image as pm_image',
                'pm_roles.display_name as pm_roles',
                
                'employee.id as employee_id',
                'employee.name as employee_name',
                'employee.image as employee_image',
                'emp_roles.display_name as employee_roles',
                'project_time_logs.start_time',
                'project_time_logs.end_time',
                'project_time_logs.total_minutes as total_minutes'
            ])  
            ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
            ->join('projects', 'project_time_logs.project_id', 'projects.id')
            
            ->join('users as pm', 'projects.pm_id', 'pm.id')
            ->join('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
            
            ->join('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->join('roles as emp_roles', 'employee.role_id', 'emp_roles.id')
            
            ->join('users as client', 'projects.client_id', 'client.id')
            ->join('deals', 'client.id', '=', 'deals.client_id')
            ->where('projects.status','in progress')
            ->orderBy('project_time_logs.task_id' , 'desc')
           
            ->get();
        } else if($type == 'projects') {
            $data = ProjectTimeLog::select([
                'projects.id as project_id',
                'projects.project_name',   
                'projects.client_id',
                'projects.status as project_status',
                
                'client.name as client_name',
                'client.image as client_image',
                'deals.profile_link as client_from',


                'pm.id as pm_id',
                'pm.name as pm_name',
                'pm.image as pm_image',
                'pm_roles.display_name as pm_roles',
                
                'employee.id as employee_id',
                'employee.name as employee_name',
                'employee.image as employee_image',
                'emp_roles.display_name as employee_roles',
                'project_time_logs.start_time',
                'project_time_logs.end_time',
                DB::raw('COUNT(project_time_logs.id) as number_of_session'),
                DB::raw('SUM(project_time_logs.total_minutes) as total_minutes'),

               // 'project_time_logs.total_minutes as total_minutes'
            ])  
            ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
            ->join('projects', 'project_time_logs.project_id', 'projects.id')
            
            ->join('users as pm', 'projects.pm_id', 'pm.id')
            ->join('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
            
            ->join('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->join('roles as emp_roles', 'employee.role_id', 'emp_roles.id')
            
            ->join('users as client', 'projects.client_id', 'client.id')
            ->join('deals', 'client.id', '=', 'deals.client_id')

            ->groupBy('project_time_logs.project_id')
            ->groupBy('project_time_logs.user_id')
            ->where('projects.status','in progress')
            //->groupBy('project_time_logs.total_minutes')
            ->orderBy('project_time_logs.project_id' , 'desc')
           

            ->get();
            //dd($data);
        }

        return response()->json($data);
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

    public function show($project_id ,$employee_id)
    {
        $data = ProjectTimeLog::select([
            'tasks.id as task_id',
            'tasks.heading as task_name',
            'project_time_logs.id as time_log_id',
            'project_time_logs.start_time',
            'project_time_logs.end_time',
            'project_time_logs.total_minutes',
            \DB::raw('(select sum(total_minutes) from project_time_logs where project_id = 405) as project_total_time_log')
        ])
        ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
        ->where([
            'project_time_logs.user_id' => $employee_id,
            'project_time_logs.project_id' => $project_id
        ])->get();

        return response()->json($data);
    }
}
