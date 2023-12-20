<?php

namespace App\Http\Controllers;

use App\DataTables\TimeLogReportDataTable;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\TaskboardColumn;
use App\Models\Task;
use App\Models\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\DeveloperStopTimer;
use App\Models\Role;

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
       
       // dd($type);
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
                DB::raw('(SELECT UUID()) as uuid'),
                'project_time_logs.id as log_id',
                'project_time_logs.task_id as taskId',
                'employee.id as employee_id',
                'employee.name as employee_name',
                'employee.image as employee_image',
                'employee_designations.name as employee_designation',

                'projects.client_id',
                'client.name as client_name',
                'client.image as client_image',


                'pm.id as pm_id',
                'pm.image as pm_image',
                'pm.name as pm_name',
                'pm_roles.display_name as pm_roles',

                'projects.id as project_id',
                'projects.project_name',
                'projects.status as project_status',

                'project_time_logs.start_time as time_log_start_time',
                'project_time_logs.end_time as time_log_end_time',
                DB::raw('(SELECT COUNT(project_time_logs.id) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as total_minutes'),
            ])
                ->leftJoin('projects', 'project_time_logs.project_id', '=', 'projects.id')


                ->leftJoin('users as pm', 'projects.pm_id', '=', 'pm.id')
                ->leftJoin('roles as pm_roles', 'pm.role_id', 'pm_roles.id')
                ->leftJoin('employee_details as pm_emp_details', 'pm.id', '=', 'pm_emp_details.user_id')
                ->leftJoin('designations as pm_employee_designations', 'pm_emp_details.designation_id', '=', 'pm_employee_designations.id')

                ->leftJoin('users as client', 'projects.client_id', '=', 'client.id')
                ->leftJoin('deals', 'client.id', '=', 'deals.client_id')

                ->leftJoin('users as employee', 'project_time_logs.user_id', '=', 'employee.id')
                ->leftJoin('employee_details', 'employee.id', '=', 'employee_details.user_id')
                ->leftJoin('designations as employee_designations', 'employee_details.designation_id', '=', 'employee_designations.id')



                ->whereIn('project_time_logs.user_id', $id_array)
             //   ->where('total_minutes', '>', 0)
                ->groupBy('project_time_logs.user_id', 'employee.id');


            if (is_null($project_id)) {
                $data = $data->groupBy('project_time_logs.project_id');
            } else {
                $data = $data->groupBy('project_time_logs.' . $project_id);
            }



            if ($status != 'canceled') {
                if (!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate) {

                    $data = $data->whereDate('project_time_logs.start_time', '=', Carbon::parse($startDate)->format('Y-m-d'));
                } else {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('project_time_logs.end_time', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }
            } 
            
            else {
                if (!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate) {

                    $data = $data->whereDate('projects.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));
                } else {
                    if (!is_null($startDate)) {
                        $data = $data->whereDate('projects.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                    }
                    if (!is_null($endDate)) {
                        $data = $data->whereDate('projects.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                    }
                }
            }
           if (!is_null($pmId)) {
                $data = $data->where('projects.pm_id' , $pmId)->orderBy('projects.pm_id' , 'desc');
            }
            if (!is_null($employeeId)) {
                $data = $data->where('project_time_logs.user_id' , $employeeId)->orderBy('project_time_logs.user_id' , 'desc');
            }
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id', $clientId);
            }

            // if (!is_null($status)) {
            //     $data = $data->where('projects.status', $status);
            // }
            /*$total_rows = $data->get()->count();

            $data = $data->orderBy('project_time_logs.task_id' , 'desc')
            ->offset($offset)
            ->limit($perPage)*/
           // $data = $data->orderBy('project_time_logs.task_id', 'desc')->get();
            if(Auth::user()->role_id == 1 || Auth::user()->role_id == 4 || Auth::user()->role_id == 8 || Auth::user()->role_id == 6)
        {
            // $data = $data->groupBy('project_time_logs.task_id','project_time_logs.created_at')
         // ->orderBy('project_time_logs.id', 'desc')
         $data = $data->orderBy('project_time_logs.task_id', 'desc')
          ->get();


        }else {
        //    / $data = $data->groupBy('project_time_logs.task_id','project_time_logs.created_at')
            $data = $data->orderBy('project_time_logs.task_id', 'desc')
            ->where('project_time_logs.user_id',Auth::id())
         // ->orderBy('project_time_logs.id', 'desc')
          ->get();
        }

      //dd($data);

      foreach ($data as $item) {
        $timer= ProjectTimeLog::where('user_id',$item->employee_id)
        ->where('start_time','!=', null)->where('end_time',null)
        ->orderBy('id','desc')->first();
        if($item->project_id == null)
        {
            $ppTask = Task::where('id',$item->taskId)->first();
            $ppClient = User::where('id',$ppTask->client_id)->first();
            $ppPm = User::where('id',$ppTask->added_by)->first();
            $ppPmRole = Role::where('id',$ppPm->role_id)->first();
            // dd($ppTask); 
            if($ppClient != null){
                $item->client_id = $ppClient->id;
                $item->client_name = $ppClient->name;
                $item->client_image = $ppClient->image;
            }else{
                $item->client_name = $ppTask->client_name;
            } 
            $item->is_independent = $ppTask->independent_task_status;
            $item->pm_id = $ppPm->id;
            $item->pm_name = $ppPm->name;
            $item->pm_image = $ppPm->image;
            $item->pm_roles = $ppPmRole->display_name;
            $item->project_id = $ppTask->id;
            $item->project_name = $ppTask->heading;
        }


         if($timer != null )
         {
            // dd($timer);

             $current_time= Carbon::now();
             $minutesDifference = $current_time->diffInMinutes($timer->start_time);



             $item->total_minutes = $item->total_minutes + $minutesDifference;
             $item->number_of_session = $item->number_of_session + 1;


         }

     }
        //timelog end


        }else if($type == 'tasks') {
            $data = ProjectTimeLog::select([
                DB::raw('(SELECT UUID()) as uuid'),
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

            ->leftJoin('users as pm', 'projects.pm_id', 'pm.id')
            ->leftJoin('roles as pm_roles', 'pm.role_id', 'pm_roles.id')

            ->leftJoin('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->leftJoin('roles as emp_roles', 'employee.role_id', 'emp_roles.id')

            ->leftJoin('users as client', 'projects.client_id', 'client.id')
            ->leftJoin('deals', 'client.id', '=', 'deals.client_id')

           	//->where('projects.status',$status)
           // ->where('total_minutes', '>', 0)
          //  ->where('project_time_logs.end_time','!=',null);
           // ->orderBy('project_time_logs.task_id' , 'desc');
                ;
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
                $data = $data->where('project_time_logs.user_id', $employeeId);
            }
            if (!is_null($clientId)) {
                //$data = $data->where('projects.client_id' , $clientId)->orderBy('projects.client_id' , 'desc');
                $data = $data->where('projects.client_id' , $clientId);
            }
            if (!is_null($status)) {
                $data = $data->where('projects.status', $status);
            }

            /*if (!is_null($startDate)) {
                $data = $data->where('project_time_logs.start_time', '>=', Carbon::parse($startDate)->format('Y-m-d'));

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
        if(Auth::user()->role_id == 1 || Auth::user()->role_id == 4 || Auth::user()->role_id == 8 || Auth::user()->role_id == 6)
        {
            $data = $data->groupBy('tasks.id','project_time_logs.created_at')
         // ->orderBy('project_time_logs.id', 'desc')
          ->get();
        //   foreach ($data as $item) {
        //     if ($item->end_time == null) {
        //         $data->end_time = 'N\A';
        //     }

         // }


        }else {
            $data = $data->groupBy('tasks.id','project_time_logs.created_at')
            ->where('project_time_logs.user_id',Auth::id())
         // ->orderBy('project_time_logs.id', 'desc')
          ->get();
        //   foreach ($data as $item) {
        //     if ($item->end_time == null) {
        //         $data->end_time = 'N\A';
        //     }

        //   }
        }

        foreach ($data as $item) {
            $timer= ProjectTimeLog::where('project_id',$item->project_id)->where('user_id',$item->employee_id)->orderBy('id','desc')->first();
           // dd($timer);
             if($timer->end_time == null)
             {
               //  dd($data);

                 $current_time= Carbon::now();
                 $minutesDifference = $current_time->diffInMinutes($timer->start_time);


                 $item->total_minutes = $item->total_minutes + $minutesDifference;
                 $item->number_of_session = $item->number_of_session + 1;


             }

         }
        // dd($data);

        }
        else if($type == 'projects') {
        //    dd("projects");
            $data = ProjectTimeLog::select([
                DB::raw('(SELECT UUID()) as uuid'),
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
            ->leftJoin('tasks', 'project_time_logs.task_id', 'tasks.id')
            ->leftJoin('projects', 'project_time_logs.project_id', 'projects.id')

            ->leftJoin('users as pm', 'projects.pm_id', 'pm.id')
            ->leftJoin('roles as pm_roles', 'pm.role_id', 'pm_roles.id')

            ->leftJoin('users as employee', 'project_time_logs.user_id', 'employee.id')
            ->leftJoin('roles as emp_roles', 'employee.role_id', 'emp_roles.id')

            ->leftJoin('users as client', 'projects.client_id', 'client.id')
            ->leftJoin('deals', 'client.id', '=', 'deals.client_id');

            if (is_null($project_id)) {
                $data = $data->groupBy('project_time_logs.project_id');
            } else {
                $data = $data->where('projects.id', $project_id);

            }
            $data = $data->groupBy('project_time_logs.project_id')
            //->where('projects.status', $status)
          //  ->where('total_minutes', '>', 0)
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
            if (!is_null($status)) {
                $data = $data->where('projects.status', $status);
            }
            /*$total_rows = $data->get()->count();
            $data = $data->orderBy('project_time_logs.project_id' , 'desc')
            ->offset($offset)
            ->limit($perPage)*/
            if(Auth::user()->role_id == 1 || Auth::user()->role_id == 4 || Auth::user()->role_id == 8 || Auth::user()->role_id == 6)
            {
                $data = $data->get();
            }
           else {
            $data = $data->where('project_time_logs.user_id',Auth::id())->get();
           }


           foreach ($data as $item) {
           $timer= ProjectTimeLog::where('project_id',$item->project_id)->where('user_id',$item->employee_id)->orderBy('id','desc')->first();
          // dd($timer);
            if($timer->end_time == null)
            {
              //  dd($data);

                $current_time= Carbon::now();
                $minutesDifference = $current_time->diffInMinutes($timer->start_time);


                $item->total_minutes = $item->total_minutes + $minutesDifference;
                $item->number_of_session = $item->number_of_session + 1;


            }

        }
        }

       // dd($data);
    //    $data = ProjectTimelog::select('project_time_logs.project_id','projects.project_name','projects.client_id',
    //    'client.name as client_name','client.image as client_image','projects.pm_id','projects.status as project_status',
    //    'pm.name as pm_name','pm.image as pm_image','pm_roles.name as pm_role'
    //    )
    //    ->leftJoin('projects','projects.id','project_time_logs.project_id')
    //    ->leftJoin('users as client','client.id','projects.client_id')
    //    ->leftJoin('users as pm','pm.id','projects.pm_id')
    //    ->leftJoin('roles as pm_roles','pm_roles.id','pm.role_id')
    //    ->where('project_time_logs.created_at','>=',$request->start_date)

    //    ->groupBy('project_time_logs.project_id')
    //    ->get();

   // dd($data);


        return response()->json([
            //'total_rows' => $total_rows,
            'data' => $data
        ]);
    }
    public function timelog_history(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page_row', 10);
        $offset = ($page - 1) * $perPage;
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $employeeId = $request->input('employee_id', null);
       // dd($employeeId);
      //  $pmId = $request->input('pm_id', null);
     //   $clientId = $request->input('client_id', null);
     //   $status = $request->input('status', null);
     //   $project_id = $request->input('project_id', null);


        $users = DB::table('users')->select(['id'])->whereIn('role_id', [5, 9, 10])->get()->toArray();
        $filtered_array = array_filter($users, function($item) {
            return isset($item->id);
        });

        $id_array = array_map(function($item) {
            return $item->id;
        }, $filtered_array);

        $data = ProjectTimeLog::select([
            'employee.id as employee_id',
            'employee.name as employee_name',
            'employee.image as employee_image',
            'emp_roles.display_name as employee_roles',
            'project_time_logs.start_time',
            'project_time_logs.end_time',
            DB::raw('(SELECT COUNT(developer_stop_timers.id) FROM developer_stop_timers WHERE  employee.id = developer_stop_timers.user_id AND DATE(developer_stop_timers.date) >= "'.$startDate.'" AND DATE(developer_stop_timers.date) <= "'.$endDate.'") as missed_hours_count'),
            // DB::raw('(SELECT COUNT(project_time_logs.id) FROM project_time_logs WHERE employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'" GROUP BY DATE(project_time_logs.created_at)) as missed_hours_count'),
            DB::raw('(SELECT SUM(total_minutes) FROM project_time_logs WHERE employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as total_minutes'),
        ])
        ->leftJoin('users as employee', 'project_time_logs.user_id', 'employee.id')
        ->leftjoin('roles as emp_roles', 'employee.role_id', 'emp_roles.id')
        ->leftJoin('developer_stop_timers','developer_stop_timers.user_id','employee.id')

        //->where('total_minutes', '>', 0);
       // ->orderBy('project_time_logs.user_id' , 'desc')

        // if (is_null($employeeId)) {
        //    // dd("false");
        //     $data = $data->groupBy('project_time_logs.user_id')->get();
        // } else {
        //   //  dd("true");
        //     $data = $data
        //     ->where('project_time_logs.user_id', $employeeId)->get();


        // }
        ;
        if (!is_null($employeeId)) {
            $filteredData = $data->where('project_time_logs.user_id', $employeeId);
        } else {
            $filteredData = $data;
        }
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

        $data = $filteredData->groupBy('project_time_logs.user_id')->get();
       // dd($data);





        // Calculate the ideal tracked hours
        $startDate = Carbon::createFromFormat('Y-m-d', $startDate);
        $endDate = Carbon::createFromFormat('Y-m-d', $endDate);
        $currentDate = $startDate->copy();
        $idealTrackedMinutes = 0;

        while ($currentDate->lte($endDate)) {
            if ($currentDate->isWeekday()) {
                // Monday to Friday (weekdays)
                $idealTrackedMinutes += (7 * 60 ); // Convert 7 hours 15 minutes to minutes
            } elseif ($currentDate->isSaturday()) {
                // Saturday
                $idealTrackedMinutes += (4 * 60 + 30); // Convert 4 hours 30 minutes to minutes
            }
            // Sunday is skipped as it's 0 hours

            // Move to the next day
            $currentDate->addDay();
        }


        // Convert the result into a collection
        $data = collect($data);



        $data->ideal_tracked_minutes = $idealTrackedMinutes;
    //    / dd($data);
        foreach ($data as $item) {
            $timer= ProjectTimeLog::where('user_id',$item->employee_id)
            ->where('start_time','!=', null)->where('end_time',null)
            ->orderBy('id','desc')->first();



             if($timer != null )
             {
               //  dd($data);

                 $current_time= Carbon::now();
                 $minutesDifference = $current_time->diffInMinutes($timer->start_time);
                // / dd($minutesDifference);


                 $item->total_minutes = $item->total_minutes + $minutesDifference;
                //  $item->number_of_session = $item->number_of_session + 1;


             }

         }

       // dd($data);

        // Calculate the `missed_hours` and `missed_hours_count` attributes for each item in $data
        $data = $data->map(function ($item) use ($idealTrackedMinutes) {
            $item->ideal_minutes = $idealTrackedMinutes;
            $item->missed_hours = max($idealTrackedMinutes - $item->total_minutes, 0);
            return $item;

        });
    // dd($data);





        //$data->missed_hours_count = $missedNumber;
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
      //  dd($request);
        $data = ProjectTimeLog::select([
            'tasks.id as task_id',
            'tasks.heading as task_name',
           'taskboard_columns.column_name as tasks_status',
            'taskboard_columns.label_color as tasks_color_code',
            'project_time_logs.id as time_log_id',
            'project_time_logs.start_time',
            'project_time_logs.end_time',
            'project_time_logs.total_minutes',
             DB::raw('(select sum(total_minutes) from project_time_logs where user_id = '.$employee_id.') as project_total_time_log')
        ])

        ->leftJoin('projects','project_time_logs.project_id','projects.id')
        ->join('tasks', 'project_time_logs.task_id', 'tasks.id')

        ->join('taskboard_columns', 'tasks.board_column_id', 'taskboard_columns.id')
        ->where([
            'project_time_logs.user_id' => $employee_id,
          //  'project_time_logs.project_id' => $project_id

        ]);


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
        foreach ($data as $item) {
            $timer= ProjectTimeLog::where('user_id',$employee_id)
            ->where('start_time','!=', null)->where('end_time',null)
            ->orderBy('id','desc')->first();


             if($timer != null )
             {
                // dd($timer);

                 $current_time= Carbon::now();
                 $minutesDifference = $current_time->diffInMinutes($timer->start_time);



                 $item->total_minutes = $item->total_minutes + $minutesDifference;
               //  $item->number_of_session = $item->number_of_session + 1;


             }

         }

        return response()->json($data);
    }

    public function board_column_json()
    {
        $data = TaskboardColumn::select(['id', 'column_name'])->get();
        return response()->json($data);
    }
    public function DeveloperTaskHistory(Request $request,$id)
    {
       // dd($request);
        $task_history = DeveloperStopTimer::select(
            'developer_stop_timers.*',
            'projects.project_name',
            'tasks.heading AS original_task_heading',
            'forget_tasks.heading AS forget_task_heading','projects.client_id'
        )
        ->leftJoin('projects', 'projects.id', '=', 'developer_stop_timers.project_id')
        ->leftJoin('tasks', 'tasks.id', '=', 'developer_stop_timers.task_id')
        ->leftJoin('tasks AS forget_tasks', 'forget_tasks.id', '=', 'developer_stop_timers.forgot_to_track_task_id')
        ->where('user_id', $id)
        ;
        if(!is_null($request->start_date) && !is_null($request->end_date) && $request->start_date == $request->end_date) {
            $task_history = $task_history->where('developer_stop_timers.date', Carbon::parse($request->start_date)->format('Y-m-d'));
        } else {
            if(!is_null($request->start_date)) {

                $task_history = $task_history->where('developer_stop_timers.date', '>=', Carbon::parse($request->start_date)->format('Y-m-d'));
            }
            if(!is_null($request->end_date)) {
                $task_history = $task_history->where('developer_stop_timers.date', '<=', Carbon::parse($request->end_date)->format('Y-m-d'));
            }
        }
        $task_history= $task_history->get();
        return response()->json($task_history);


    }
}
