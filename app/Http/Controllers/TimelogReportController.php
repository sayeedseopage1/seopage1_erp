<?php

namespace App\Http\Controllers;

use App\DataTables\TimeLogReportDataTable;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\TaskboardColumn;
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
    

    public function getTimeLog(Request $request, $type)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page_row', 10);
        $offset = ($page - 1) * $perPage;
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $employeeId = $request->input('employee_id', null);
        $pmId = $request->input('pm_id', null);
        $clientId = $request->input('client_id', null);
        $status = $request->input('status', null);
        $project_id = $request->input('project_id', null);


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
                'projects.start_date as project_start_date',
                'projects.deadline as project_end_date',

                'tasks.id as task_id',
                'tasks.heading as task_name',
                'tasks.id as task_id',
                'tasks.start_date as task_start',
                'tasks.due_date as task_end',
                'project_time_logs.start_time as time_log_start_time',
                'project_time_logs.start_time as time_log_end_time',
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
            ->where('projects.status', $status)
            ->groupBy('project_time_logs.user_id', 'employee.id');
            if (is_null($project_id)) {
                $data = $data->groupBy('project_time_logs.project_id');
            } else {
                $data = $data->groupBy('project_time_logs.'.$project_id);

            }
            

            
            if($status != 'canceled') {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                {
                   
                    $data = $data->whereDate('project_time_logs.start_time', '=', Carbon::parse($startDate)->format('Y-m-d'));
                }else 
                {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('project_time_logs.end_time', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }
            } else {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
            {
               
                $data = $data->whereDate('projects.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));
            }else 
            {
                if (!is_null($startDate)) {
                    $data = $data->whereDate('projects.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                }
                if (!is_null($endDate)) {
                    $data = $data->whereDate('projects.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                }
            }

            }
            /*if (!is_null($pmId)) {
                $data = $data->where('projects.pm_id' , $pmId)->orderBy('projects.pm_id' , 'desc');
            } 
            if (!is_null($employeeId)) {
                $data = $data->where('project_time_logs.user_id' , $employeeId)->orderBy('project_time_logs.user_id' , 'desc');
            }*/
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id' , $clientId);
            }
            /*$total_rows = $data->get()->count();

            $data = $data->orderBy('project_time_logs.task_id' , 'desc')
            ->offset($offset)
            ->limit($perPage)*/
            $data = $data->orderBy('project_time_logs.task_id' , 'desc')->get();
            
      
        }else if($type == 'tasks') {
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
                'projects.start_date as project_start_date',
                'projects.deadline as project_end_date',

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
                'project_time_logs.total_minutes as total_minutes',
             // DB::raw('(SELECT COUNT(project_time_logs.id) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
               //DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as total_minutes'),
            ])  

           ->join('tasks', 'project_time_logs.task_id', 'tasks.id')

            ->leftJoin('projects', 'project_time_logs.project_id', 'projects.id')
            
            ->join('users as pm', 'projects.pm_id', 'pm.id')
            ->join('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
            
            ->leftJoin('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->join('roles as emp_roles', 'employee.role_id', 'emp_roles.id')
            
            ->join('users as client', 'projects.client_id', 'client.id')
            ->join('deals', 'client.id', '=', 'deals.client_id')

           	->where('projects.status',$status)
            ->where('total_minutes', '>', 0)
            ->where('project_time_logs.end_time','!=',null);
           // ->orderBy('project_time_logs.task_id' , 'desc');

            if($status != 'canceled') {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                {
                   

                    $data = $data->whereDate('project_time_logs.start_time', '=', Carbon::parse($startDate)->format('Y-m-d'));

                }else 
                {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('project_time_logs.end_time', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }
            } else {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
            {
               

                $data = $data->whereDate('projects.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));

            }else 
            {
                if (!is_null($startDate)) {
                    $data = $data->whereDate('projects.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                }
                if (!is_null($endDate)) {
                    $data = $data->whereDate('projects.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                }

            }
            }
            if (!is_null($pmId)) {
                $data = $data->where('projects.pm_id' , $pmId);
            }
            if (!is_null($employeeId)) {
                $data = $data->where('project_time_logs.user_id' , $employeeId);
            }
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id' , $clientId);
            }
            
            /*if (!is_null($startDate)) {
                $data = $data->where('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));

            }
            }
            if (!is_null($pmId)) {
                //$data = $data->where('projects.pm_id' , $pmId)->orderBy('projects.pm_id' , 'desc');
                $data = $data->where('projects.pm_id' , $pmId);
            }
            if (!is_null($employeeId)) {
                //$data = $data->where('project_time_logs.user_id' , $employeeId)->orderBy('project_time_logs.user_id' , 'desc');
                $data = $data->where('project_time_logs.user_id' , $employeeId);
            }
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id' , $clientId);
            }
            /*$total_rows = $data->get()->count();
            $data = $data->orderBy('project_time_logs.task_id' , 'desc')
            ->offset($offset)
            ->limit($perPage)*/

          $data = $data->groupBy('tasks.id','project_time_logs.created_at')
         // ->orderBy('project_time_logs.id', 'desc')
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
                'projects.start_date as project_start_date',
                'projects.deadline as project_end_date',
 
                DB::raw('(SELECT COUNT(project_time_logs.id) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as total_minutes'),

               // 'project_time_logs.total_minutes as total_minutes'
            ])  
            ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
            ->leftJoin('projects', 'project_time_logs.project_id', 'projects.id')
            
            ->join('users as pm', 'projects.pm_id', 'pm.id')
            ->join('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
            
            ->leftJoin('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->join('roles as emp_roles', 'employee.role_id', 'emp_roles.id')
            
            ->join('users as client', 'projects.client_id', 'client.id')
            ->join('deals', 'client.id', '=', 'deals.client_id');

            if (is_null($project_id)) {
                $data = $data->groupBy('project_time_logs.project_id');
            } else {
                $data = $data->where('projects.id', $project_id);

            }
            $data = $data->groupBy('project_time_logs.user_id')
            ->where('projects.status', $status)
            ->where('total_minutes', '>', 0)
            ->orderBy('project_time_logs.project_id' , 'desc');

            if($status != 'canceled') {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                {
                   
                    $data = $data->whereDate('project_time_logs.start_time', '=', Carbon::parse($startDate)->format('Y-m-d'));
                }else 
                {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('project_time_logs.end_time', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }
            } else {
                if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                {
                
                    $data = $data->whereDate('projects.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));
                }else 
                {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('projects.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('projects.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }

            }
            if (!is_null($pmId)) {
                $data = $data->where('projects.pm_id' , $pmId);
            }
            if (!is_null($employeeId)) {
                $data = $data->where('project_time_logs.user_id' , $employeeId);
            }
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id' , $clientId);
            }
            /*$total_rows = $data->get()->count();
            $data = $data->orderBy('project_time_logs.project_id' , 'desc')
            ->offset($offset)
            ->limit($perPage)*/
            $data = $data->get();
           // dd($data);
        }
        

        return response()->json([
            //'total_rows' => $total_rows,
            'data' => $data
        ]);
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


    public function show(Request $request, $project_id ,$employee_id)
    {        
        $data = ProjectTimeLog::select([
            'tasks.id as task_id',
            'tasks.heading as task_name',
           'taskboard_columns.column_name as tasks_status',
            'taskboard_columns.label_color as tasks_color_code',
            'project_time_logs.id as time_log_id',
            'project_time_logs.start_time',
            'project_time_logs.end_time',
            'project_time_logs.total_minutes',
            \DB::raw('(select sum(total_minutes) from project_time_logs where project_id = '.$project_id.') as project_total_time_log')
        ])
       
        ->join('projects','project_time_logs.project_id','projects.id')
        ->join('tasks', 'project_time_logs.task_id', 'tasks.id')
        
        ->join('taskboard_columns', 'tasks.board_column_id', 'taskboard_columns.id')
        ->where([
            'project_time_logs.user_id' => $employee_id,
            'project_time_logs.project_id' => $project_id

        ])->where('project_time_logs.end_time','!=',null);

        
        if(!is_null($request->start_date) && !is_null($request->end_date) && $request->start_date == $request->end_date) {
            $data = $data->whereDate('project_time_logs.start_time', Carbon::parse($request->start_date)->format('Y-m-d'));
        } else {
            if(!is_null($request->start_date)) {
            
                $data = $data->where('project_time_logs.start_time', '>=', Carbon::parse($request->start_date)->format('Y-m-d H:i:s'));
            }
            if(!is_null($request->end_date)) {
                $data = $data->where('project_time_logs.end_time', '<=', Carbon::parse($request->end_date)->format('Y-m-d H:i:s'));
            }
        }
        
        $data = $data->get();

        return response()->json($data);
    }

    public function board_column_json()
    {
        $data = TaskboardColumn::select(['id', 'column_name'])->get();
        return response()->json($data);
    }
}
