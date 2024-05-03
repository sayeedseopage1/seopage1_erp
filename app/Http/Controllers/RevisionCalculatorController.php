<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\TaskRevision;
use App\Models\Task;
use App\Models\Project;
use App\Models\ProjectTimelog;
use DB;
use Auth;

class RevisionCalculatorController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Revision Calculator';
        $this->activeSettingMenu = 'revision_calculator';
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {



        return view('revision-calculator.index',$this->data);
    }
    public function getData(Request $request)
    {
        //dd($request->all());
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
       // dd($startDate, $$endDate);

        // Check if $startDate and $endDate are not null and valid dates
        if ($startDate && $endDate) {
            if(Auth::user()->role_id == 4)
            {
                $users= DB::table('users as pm')->select(['pm.id as project_manager_id', 'pm.name as project_manager_name'])
                ->where('pm.id',Auth::id())->get();

            }else
            {
                $users= DB::table('users as pm')->select(['pm.id as project_manager_id', 'pm.name as project_manager_name'])
                ->where('pm.role_id',4)->get();
            }


            foreach($users as $pm)
            {
                $total_projects = Project::where('pm_id',$pm->project_manager_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_status','Accepted')
                ->count();
                $total_project_value = Project::where('pm_id',$pm->project_manager_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_status','Accepted')
                ->sum('project_budget');
                $total_tasks = Task::select('tasks.id')

                ->where('tasks.added_by',$pm->project_manager_id)

                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->count();
               // dd($total_tasks);

                $tasks_revisions= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_between','!=','')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $project_timelogs= ProjectTimelog::leftJoin('projects','projects.id','project_time_logs.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('project_time_logs.revision_status',1)
                ->whereBetween('project_time_logs.created_at', [$startDate, $endDate])
                ->sum('total_minutes');
                $sales_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','S')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $pm_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','PM')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $client_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','C')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $lead_developer_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','LD')
                ->where('task_revisions.dispute_between','!=','')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $developer_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','D')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $pending_issues = TaskRevision::leftJoin('projects', 'projects.id', 'task_revisions.project_id')
                ->where('projects.pm_id', $pm->project_manager_id)
                ->where('task_revisions.approval_status', 'pending')
                ->where('task_revisions.sale_accept', 0)
                ->where('task_revisions.sale_deny', 0)
                ->where('task_revisions.acknowledgement_id', '!=', null)
                ->where(function($query) {
                    $query->where('task_revisions.sale_person', '!=', null)
                        ->orWhere('task_revisions.is_deniable', '!=', 0);
                })
                ->where(function($query) {
                    $query->where('task_revisions.sale_accept', '!=', 1)
                        ->orWhere('task_revisions.sale_deny', '!=', 1);
                })
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
                ->where('task_revisions.dispute_status',0)

                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
                ->where('task_revision_disputes.status',0)

                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $developer_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','LDR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $lead_developer_dev_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','LDR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $lead_developer_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','PLR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $project_manager_lead_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','PLR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $project_manager_client_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','CPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $project_manager_sales_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','SPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $client_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','CPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $project_manager_sales_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','SPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');


            $pm->total_projects = $total_projects;
            $pm->total_project_value= $total_project_value;
            $pm->total_tasks= $total_tasks;
            $pm->total_revisions= $tasks_revisions;
            $pm->minutes_spent= $project_timelogs;
            $pm->sales_issues= $sales_issues+($project_manager_sales_percentage/100);
            $pm->pm_issues= $pm_issues + (($project_manager_lead_percentage+$project_manager_sales_percentage+$project_manager_client_percentage )/100);
            $pm->client_issues= $client_issues +($client_percentage/100);
            $pm->lead_developer_issues= $lead_developer_issues + (($lead_developer_dev_percentage+$lead_developer_percentage) /100);
            $pm->developer_issues= $developer_issues + ($developer_percentage/100) ;
            $pm->pending_issues= $pending_issues;
            $pm->total_disputes_not_solved= $total_disputes_not_solved;
            $pm->total_disputes= $total_disputes;
            }
            return response()->json($users, 200);




        }


    }

    public function exportRevisionCalculatorData(Request $request)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);

        if ($startDate && $endDate) {
            if(Auth::user()->role_id == 4)
            {
                $users= DB::table('users as pm')->select(['pm.id as project_manager_id', 'pm.name as project_manager_name'])
                ->where('pm.id',Auth::id())->get();

            }else
            {
                $users= DB::table('users as pm')->select(['pm.id as project_manager_id', 'pm.name as project_manager_name'])
                ->where('pm.role_id',4)->get();
            }


            foreach($users as $pm)
            {
                $total_projects = Project::where('pm_id',$pm->project_manager_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_status','Accepted')
                ->count();
                $total_project_value = Project::where('pm_id',$pm->project_manager_id)
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('project_status','Accepted')
                ->sum('project_budget');
                $total_tasks = Task::select('tasks.id')

                ->where('tasks.added_by',$pm->project_manager_id)

                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->count();
               // dd($total_tasks);

                $tasks_revisions= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_between','!=','')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $project_timelogs= ProjectTimelog::leftJoin('projects','projects.id','project_time_logs.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('project_time_logs.revision_status',1)
                ->whereBetween('project_time_logs.created_at', [$startDate, $endDate])
                ->sum('total_minutes');
                $sales_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','S')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $pm_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','PM')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $client_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','C')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $lead_developer_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','LD')
                ->where('task_revisions.dispute_between','!=','')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $developer_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.final_responsible_person','D')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $pending_issues = TaskRevision::leftJoin('projects', 'projects.id', 'task_revisions.project_id')
                ->where('projects.pm_id', $pm->project_manager_id)
                ->where('task_revisions.approval_status', 'pending')
                ->where('task_revisions.sale_accept', 0)
                ->where('task_revisions.sale_deny', 0)
                ->where('task_revisions.acknowledgement_id', '!=', null)
                ->where(function($query) {
                    $query->where('task_revisions.sale_person', '!=', null)
                        ->orWhere('task_revisions.is_deniable', '!=', 0);
                })
                ->where(function($query) {
                    $query->where('task_revisions.sale_accept', '!=', 1)
                        ->orWhere('task_revisions.sale_deny', '!=', 1);
                })
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
                ->where('task_revisions.dispute_status',0)

                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
                ->where('task_revision_disputes.status',0)

                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $developer_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','LDR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $lead_developer_dev_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','LDR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $lead_developer_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','PLR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $project_manager_lead_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','PLR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $project_manager_client_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','CPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');
                $project_manager_sales_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','SPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $client_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','CPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_by_percent');
                $project_manager_sales_percentage=TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)

                ->where('task_revisions.dispute_between','SPR')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->sum('task_revisions.raised_against_percent');


            $pm->total_projects = $total_projects;
            $pm->total_project_value= $total_project_value;
            $pm->total_tasks= $total_tasks;
            $pm->total_revisions= $tasks_revisions;
            $pm->minutes_spent= $project_timelogs;
            $pm->sales_issues= $sales_issues+($project_manager_sales_percentage/100);
            $pm->pm_issues= $pm_issues + (($project_manager_lead_percentage+$project_manager_sales_percentage+$project_manager_client_percentage )/100);
            $pm->client_issues= $client_issues +($client_percentage/100);
            $pm->lead_developer_issues= $lead_developer_issues + (($lead_developer_dev_percentage+$lead_developer_percentage) /100);
            $pm->developer_issues= $developer_issues + ($developer_percentage/100) ;
            $pm->pending_issues= $pending_issues;
            $pm->total_disputes_not_solved= $total_disputes_not_solved;
            $pm->total_disputes= $total_disputes;
            }

            return response()->json([
                'data' => $users,
                'status' => 200
            ]);
        }
    }


    public function AssignProjects(Request $request, $id)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);

    if ($startDate && $endDate) {

        $total_projects = Task::select('tasks.id','tasks.heading as task_title','projects.id as projectId',
        'projects.project_name','projects.project_budget','clients.name as client_name','clients.id as clientId',
        'p_m_projects.created_at as project_creation_date',
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.dispute_between IS NOT NULL AND DATE(p_m_projects.created_at) >= "'.$startDate.'" AND DATE(p_m_projects.created_at) <= "'.$endDate.'") as total_revisions'),



        DB::raw('(SELECT COUNT(tasks.id) FROM tasks WHERE tasks.added_by = "'.$id.'" AND tasks.project_id = projects.id AND DATE(tasks.created_at) >= "'.$startDate.'" AND DATE(tasks.created_at) <= "'.$endDate.'") as total_tasks'),
        DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.project_id = projects.id AND project_time_logs.revision_status = 1 AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'"), 0) as total_time_spent'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "S" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as sales_issues'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "PM" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as pm_issues'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "C" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as client_issues'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "LD" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as lead_developer_issues'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "D" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as developer_issues'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.dispute_created = 1 AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as total_disputes'),
        DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.dispute_created = 1 AND task_revisions.dispute_status = 0 AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as disputes_not_solved'),

        )
        ->join('projects','projects.id','tasks.project_id')
        ->join('p_m_projects','p_m_projects.project_id','projects.id')
        ->join('users as clients','clients.id','projects.client_id')
        ->where('tasks.added_by',$id)
        ->whereBetween('projects.created_at', [$startDate, $endDate])
        ->where('projects.project_status','Accepted')
        ->get();
        return response()->json($total_projects, 200);


    }
}
    public function TotalTasks(Request $request, $id)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        // $id= 209;
        // $startDate = '2023-09-01 00:00:00';
        // $endDate = '2023-09-30 00:00:00';

        if ($startDate && $endDate) {



       $total_tasks = Task::select('tasks.id','tasks.heading as task_title','projects.id as projectId',
       'projects.project_name','projects.project_budget','clients.name as client_name','clients.id as clientId',
       'p_m_projects.created_at as project_creation_date',
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND DATE(p_m_projects.created_at) >= "'.$startDate.'" AND DATE(p_m_projects.created_at) <= "'.$endDate.'") as total_revisions'),
       DB::raw('(SELECT COUNT(tasks.id) FROM tasks WHERE tasks.added_by = "'.$id.'" AND tasks.project_id = projects.id AND DATE(tasks.created_at) >= "'.$startDate.'" AND DATE(tasks.created_at) <= "'.$endDate.'") as total_tasks'),
       DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.project_id = projects.id AND project_time_logs.revision_status = 1 AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'"), 0) as total_time_spent'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "S" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as sales_issues'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "PM" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as pm_issues'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "C" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as client_issues'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "LD" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as lead_developer_issues'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.final_responsible_person = "D" AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as developer_issues'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.dispute_created = 1 AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as total_disputes'),
       DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND task_revisions.dispute_created = 1 AND task_revisions.dispute_status = 0 AND DATE(task_revisions.created_at) >= "'.$startDate.'" AND DATE(task_revisions.created_at) <= "'.$endDate.'") as disputes_not_solved'),

       )
       ->join('projects','projects.id','tasks.project_id')
       ->join('p_m_projects','p_m_projects.project_id','projects.id')
       ->join('users as clients','clients.id','projects.client_id')
       ->where('tasks.added_by',$id)
       ->whereBetween('tasks.created_at', [$startDate, $endDate])
       ->where('projects.project_status','Accepted')
       ->get();
       return response()->json($total_tasks, 200);

    }

    }
    public function TotalRevisions(Request $request, $id)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        //   $id= 209;
        // $startDate = '2023-09-01 00:00:00';
        // $endDate = '2023-09-20 00:00:00';

        if ($startDate && $endDate) {

            $data['sales_issues'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','S')
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['pm_issues'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','PM')
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['client_issues'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','C')
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['lead_developer_issues'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','LD')
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['developer_issues'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','D')
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['total_disputes'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.dispute_created',1)
            ->where('task_revisions.dispute_status',0)
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['total_disputes_not_solved'] = TaskRevision::select('task_revisions.id')

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->where('projects.pm_id',$id)
            ->where('task_revisions.dispute_created',1)
            ->where('task_revisions.dispute_status',0)
            ->where('task_revisions.dispute_between','!=','')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
       // dd($total_tasks);


       // dd($data);
        return response()->json($data, 200);
    }




    }
    public function SalesIssue(Request $request, $id)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        // $id= 209;
        // $startDate = '2023-09-01 00:00:00';
        // $endDate = '2023-09-20 00:00:00';

        if ($startDate && $endDate) {

            $data['sales_issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
            'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
            'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
            'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
            'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
            'dispute_raised_against.name as dispute_raised_against_name','sales.id as sales_id','sales.name as sales_name','tasks.id as taskId','task_revisions.final_responsible_person',
            'task_revisions.raised_by_percent as raised_by_p','task_revisions.raised_against_percent as raised_against_p',
            DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
            )

            ->leftJoin('projects','projects.id','task_revisions.project_id')
            ->leftJoin('deals','deals.id','projects.deal_id')
            ->join('users as pm','pm.id','projects.pm_id')
            ->join('users as clients','clients.id','projects.client_id')

            ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
            ->join('tasks','tasks.id','task_revisions.task_id')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->leftJoin('users as developer','developer.id','task_users.user_id')
            ->leftJoin('users as sales','sales.id','deals.added_by')
            ->leftJoin('project_members','project_members.project_id','projects.id')
            ->leftJoin('users as lead_developer', function($join) {
                $join->on('lead_developer.id', '=', 'project_members.lead_developer_id')
                     ->orderBy('lead_developer.id', 'desc');
            })
            ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
            ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
            ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')
            ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')


            ->where('task_revisions.final_responsible_person','S')

            ->orWhere(function ($query) use ($id) {
                $query->where('task_revisions.dispute_between', 'SPR')

                    ->where('task_revisions.raised_against_percent', '!=', null)
                    ->where('projects.pm_id',$id);
            })
            ->where('projects.pm_id',$id)


            // ->orWhere('task_revisions.dispute_between','SPR')
            ->groupBy('task_revisions.id')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->get();

       // dd($data);


       // dd($data);
        return response()->json($data, 200);
    }

    }
public function PMIssue(Request $request, $id)
{
    $startDate = $request->input('start_date', null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['pm_issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','sales.id as sales_id','sales.name as sales_name','tasks.id as taskId','task_revisions.final_responsible_person',
        'task_revisions.raised_by_percent as raised_by_p','task_revisions.raised_against_percent as raised_against_p',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->leftJoin('deals','deals.id','projects.deal_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('users as sales','sales.id','deals.added_by')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer', function($join) {
            $join->on('lead_developer.id', '=', 'project_members.lead_developer_id')
                 ->orderBy('lead_developer.id', 'desc');
        })
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')
        ->where('projects.pm_id',$id)
        ->where('task_revisions.final_responsible_person','PM')
        ->orWhere(function ($query) use ($id) {
            $query->where('task_revisions.dispute_between', 'SPR')
                ->where('task_revisions.raised_by_percent', '!=', null)
                ->where('projects.pm_id',$id);
        })
        ->orWhere(function ($query)  use ($id) {
            $query->where('task_revisions.dispute_between', 'PLR')
                ->where('task_revisions.raised_by_percent', '!=', null)
                ->where('projects.pm_id',$id);
        })
        ->orWhere(function ($query)  use ($id) {
            $query->where('task_revisions.dispute_between', 'CPR')
                ->where('task_revisions.raised_by_percent', '!=', null)
                ->where('projects.pm_id',$id);
        })

        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   // dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function ClientIssue(Request $request, $id)
{
    $startDate = $request->input('start_date', null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['client_issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        'task_revisions.raised_by_percent as raised_by_p','task_revisions.raised_against_percent as raised_against_p',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer', function($join) {
            $join->on('lead_developer.id', '=', 'project_members.lead_developer_id')
                 ->orderBy('lead_developer.id', 'desc');
        })
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.final_responsible_person','C')
        ->where('projects.pm_id',$id)

        ->orWhere(function ($query)  use ($id) {
            $query->where('task_revisions.dispute_between', 'CPR')
                ->where('task_revisions.raised_against_percent', '!=', null)
                ->where('projects.pm_id',$id);
        })

        // ->where('task_revisions.dispute_between','CPR')
        // ->orWhereNotNull('task_revisions.raised_against_percent')
        // ->orWhere('task_revisions.dispute_between','CPR')
        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   //dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function LeadDevIssue(Request $request, $id)
{
    $startDate = $request->input('start_date', null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['lead_dev__issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        'task_revisions.raised_by_percent as raised_by_p','task_revisions.raised_against_percent as raised_against_p',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer', function($join) {
            $join->on('lead_developer.id', '=', 'project_members.lead_developer_id')
                 ->orderBy('lead_developer.id', 'desc');
        })
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.dispute_between','!=','')
        ->where('task_revisions.final_responsible_person','LD')

        ->orWhere(function ($query) {
            $query->where('task_revisions.dispute_between', 'PLR')
                ->where('task_revisions.raised_against_percent', '!=', null);
        })
        ->orWhere(function ($query) {
            $query->where('task_revisions.dispute_between', 'LDR')
                ->where('task_revisions.raised_by_percent', '!=', null);
        })
        // ->orWhere('task_revisions.dispute_between','PLR')
        // ->orWhere('task_revisions.dispute_between','LDR')
        //->where('task_revisions.dispute_between','LDR')
        // ->orWhereNotNull('task_revisions.raised_by_percent')
        ->where('projects.pm_id',$id)
        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   // dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function DevIssue(Request $request, $id)
{
    $startDate = $request->input('start_date', null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['dev__issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        'task_revisions.raised_by_percent as raised_by_p','task_revisions.raised_against_percent as raised_against_p',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer', function($join) {
            $join->on('lead_developer.id', '=', 'project_members.lead_developer_id')
                 ->orderBy('lead_developer.id', 'desc');
        })
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.final_responsible_person','D')

        ->orWhere(function ($query) {
            $query->where('task_revisions.dispute_between', 'LDR')
                ->where('task_revisions.raised_against_percent', '!=', null);
        })

        // ->orWhereNull('task_revisions.raised_against_percent')
        //  ->where('task_revisions.dispute_between','LDR')
        //  ->orWhereNotNull('task_revisions.raised_against_percent')
        ->where('projects.pm_id',$id)
        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   // dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function TotalDispute(Request $request, $id)
{
    $startDate = $request->input('start_date', null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['total_disputes'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.deny_reason','task_revisions.sale_comment','task_revision_disputes.created_at as dispute_creation_date','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer','lead_developer.id','project_members.lead_developer_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.dispute_created',1)
        ->where('task_revisions.dispute_status',0)
        ->where('projects.pm_id',$id)
        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   // dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function DisputeNotResolve(Request $request, $id)
{
    $startDate = $request->input('start_date' , null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['dispute_not_resolved'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.deny_reason','task_revisions.sale_comment','task_revision_disputes.created_at as dispute_creation_date','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer','lead_developer.id','project_members.lead_developer_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.dispute_created',1)
        ->where('task_revisions.dispute_status',0)
        ->where('projects.pm_id',$id)
        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

   // dd($data);


   // dd($data);
    return response()->json($data, 200);
}

}
public function PendingIssues(Request $request, $id)
{

    $startDate = $request->input('start_date' , null);
    $endDate = $request->input('end_date', null);
    // $id= 209;
    // $startDate = '2023-09-01 00:00:00';
    // $endDate = '2023-09-20 00:00:00';

    if ($startDate && $endDate) {

        $data['pending_issues'] = TaskRevision::select('task_revisions.task_id as taskId','task_revisions.id','task_revisions.deny_reason','task_revisions.sale_comment','task_revision_disputes.created_at as dispute_creation_date','task_revisions.dispute_between','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner','winners.name as winner_name',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent','developer.id as assign_to','developer.name as developer_name',
        'lead_developer.id as lead_developer_id','lead_developer.name as lead_developer_name','dispute_raised_by.id as dispute_raised_by_id','dispute_raised_by.name as dispute_raised_by_name','dispute_raised_against.id as dispute_raised_against_id',
        'dispute_raised_against.name as dispute_raised_against_name','task_revisions.final_responsible_person',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )

        ->leftJoin('projects','projects.id','task_revisions.project_id')
        ->join('users as pm','pm.id','projects.pm_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_users','task_users.task_id','tasks.id')
        ->leftJoin('users as developer','developer.id','task_users.user_id')
        ->leftJoin('project_members','project_members.project_id','projects.id')
        ->leftJoin('users as lead_developer','lead_developer.id','project_members.lead_developer_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        ->leftJoin('users as winners','winners.id','task_revision_disputes.winner')
        ->leftJoin('users as dispute_raised_by','dispute_raised_by.id','task_revision_disputes.raised_by')
        ->leftJoin('users as dispute_raised_against','dispute_raised_against.id','task_revision_disputes.raised_against')

        ->where('task_revisions.approval_status','pending')
        ->where('task_revisions.sale_accept', 0)
        ->where('task_revisions.sale_deny', 0)

        ->where('task_revisions.acknowledgement_id','!=',null)
        ->where(function($query) {
            $query->where('task_revisions.sale_person', '!=', null)
                ->orWhere('task_revisions.is_deniable', '!=', 0);
        })
        ->where('projects.pm_id',$id)

        ->groupBy('task_revisions.id')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();

    // dd($data);
        return response()->json($data, 200);
    }

}




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
