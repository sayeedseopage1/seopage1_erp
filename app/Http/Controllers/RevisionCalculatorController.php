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

            $users= DB::table('users as pm')->select(['pm.id as project_manager_id', 'pm.name as project_manager_name'])
            ->where('pm.role_id',4)->get();
           
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
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $developer_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
              
                ->where('task_revisions.final_responsible_person','D')
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
              
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revisions.dispute_created',1)
                ->where('task_revision_disputes.status',0)
              
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();

            $pm->total_projects = $total_projects;
            $pm->total_project_value= $total_project_value;
            $pm->total_tasks= $total_tasks;
            $pm->total_revisions= $tasks_revisions;
            $pm->minutes_spent= $project_timelogs;
            $pm->sales_issues= $sales_issues;
            $pm->pm_issues= $pm_issues;
            $pm->client_issues= $client_issues;
            $pm->lead_developer_issues= $lead_developer_issues;
            $pm->developer_issues= $developer_issues;
            $pm->total_disputes_not_solved= $total_disputes_not_solved;
            $pm->total_disputes= $total_disputes;
            }
            return response()->json($users, 200);
        
          
           
           
        }


    }

    
    public function AssignProjects(Request $request, $id)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        // $id= 209; 
        // $startDate = '2023-09-1 00:00:00';
        // $endDate = '2023-09-30 00:00:00';
          
    //     if ($startDate && $endDate) { 

    //     $total_projects = Project::select('projects.id as projectId','projects.project_name','projects.project_budget','clients.name','clients.id as clientId',
    //     'p_m_projects.created_at as project_creation_date'
    //     )
    //     ->join('p_m_projects','p_m_projects.project_id','projects.id')
    //     ->join('users as clients','clients.id','projects.client_id')
    //     ->where('projects.pm_id',$id)
    //     ->whereBetween('p_m_projects.created_at', [$startDate, $endDate])
    //     ->where('projects.project_status','Accepted')
    //     ->get();
       
    //     foreach($total_projects as $project)
    //     {
    //         $total_tasks = Task::select('tasks.*')
            
    //         ->where('tasks.project_id',$project->projectId)
    //         ->where('tasks.added_by',$id)
           
    //         ->count();
    //         $tasks_lists = Task::select('tasks.*','tasks.heading','tasks.id as taskId')
           
    //         ->where('tasks.project_id',$project->projectId)
    //         ->where('tasks.added_by',$id)
           
    //         ->get();
    //         foreach($tasks_lists as $task)
    //         {
    //             $revision_count= TaskRevision::where('task_id',$task->id)->count();
    //             $sales_issues= TaskRevision::where('task_id',$task->id)
              
              
    //             ->where('task_revisions.final_responsible_person','S')
              
    //             ->count();
    //             $pm_issues= TaskRevision::where('task_id',$task->id)
               
              
    //             ->where('task_revisions.final_responsible_person','PM')
              
    //             ->count();
    //             $client_issues= TaskRevision::where('task_id',$task->id)
                
              
    //             ->where('task_revisions.final_responsible_person','C')
              
    //             ->count();
    //             $lead_developer_issues= TaskRevision::where('task_id',$task->id)
               
              
    //             ->where('task_revisions.final_responsible_person','LD')
               
    //             ->count();
    //             $developer_issues= TaskRevision::where('task_id',$task->id)
              
              
    //             ->where('task_revisions.final_responsible_person','D')
               
    //             ->count();
    //             $total_disputes= TaskRevision::where('task_id',$task->id)
            
    //             ->where('task_revisions.dispute_created',1)
              
             
    //             ->count();
                
    //             $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
    //             ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
    //             ->where('task_revisions.task_id',$task->id)
    //             ->where('task_revisions.dispute_created',1)
    //             ->where('task_revision_disputes.status',0)
              
             
    //             ->count();

    //             $task->revision_count= $revision_count;
    //             $task->sales_issues= $sales_issues;
    //             $task->pm_issues= $pm_issues;
    //             $task->client_issues= $client_issues;
    //             $task->lead_developer_issues= $lead_developer_issues;
    //             $task->developer_issues= $developer_issues;
    //             $task->total_disputes_not_solved= $total_disputes_not_solved;
    //             $task->total_disputes= $total_disputes;
    //         }
    //         $total_time_spent_on_revision= ProjectTimelog::where('project_id',$project->projectId)
    //         ->where('revision_status',1)
    //         ->sum('total_minutes');
    //     $project->total_tasks = $total_tasks;
    //     $project->tasks_lists = $tasks_lists;
    //     $project->total_time_spent_on_revision = $total_time_spent_on_revision;
    //     }
    //     dd($total_projects);
    //     return response()->json($total_projects, 200);
    // }
       
    if ($startDate && $endDate) { 

        $total_projects = Task::select('tasks.id','tasks.heading as task_title','projects.id as projectId',
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
        ->whereBetween('p_m_projects.created_at', [$startDate, $endDate])
        ->where('projects.project_status','Accepted')
        ->get();
        return response()->json($total_projects, 200);
       
       
        // foreach($total_projects as $project)
        // {
        //     $total_tasks = Task::select('tasks.*')
            
        //     ->where('tasks.project_id',$project->projectId)
        //     ->where('tasks.added_by',$id)
           
        //     ->count();
        //     $tasks_lists = Task::select('tasks.*','tasks.heading','tasks.id as taskId')
           
        //     ->where('tasks.project_id',$project->projectId)
        //     ->where('tasks.added_by',$id)
           
        //     ->get();
        //     foreach($tasks_lists as $task)
        //     {
        //         $revision_count= TaskRevision::where('task_id',$task->id)->count();
        //         $sales_issues= TaskRevision::where('task_id',$task->id)
              
              
        //         ->where('task_revisions.final_responsible_person','S')
              
        //         ->count();
        //         $pm_issues= TaskRevision::where('task_id',$task->id)
               
              
        //         ->where('task_revisions.final_responsible_person','PM')
              
        //         ->count();
        //         $client_issues= TaskRevision::where('task_id',$task->id)
                
              
        //         ->where('task_revisions.final_responsible_person','C')
              
        //         ->count();
        //         $lead_developer_issues= TaskRevision::where('task_id',$task->id)
               
              
        //         ->where('task_revisions.final_responsible_person','LD')
               
        //         ->count();
        //         $developer_issues= TaskRevision::where('task_id',$task->id)
              
              
        //         ->where('task_revisions.final_responsible_person','D')
               
        //         ->count();
        //         $total_disputes= TaskRevision::where('task_id',$task->id)
            
        //         ->where('task_revisions.dispute_created',1)
              
             
        //         ->count();
                
        //         $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
        //         ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
        //         ->where('task_revisions.task_id',$task->id)
        //         ->where('task_revisions.dispute_created',1)
        //         ->where('task_revision_disputes.status',0)
              
             
        //         ->count();

        //         $task->revision_count= $revision_count;
        //         $task->sales_issues= $sales_issues;
        //         $task->pm_issues= $pm_issues;
        //         $task->client_issues= $client_issues;
        //         $task->lead_developer_issues= $lead_developer_issues;
        //         $task->developer_issues= $developer_issues;
        //         $task->total_disputes_not_solved= $total_disputes_not_solved;
        //         $task->total_disputes= $total_disputes;
        //     }
        //     $total_time_spent_on_revision= ProjectTimelog::where('project_id',$project->projectId)
        //     ->where('revision_status',1)
        //     ->sum('total_minutes');
        // $project->total_tasks = $total_tasks;
        // $project->tasks_lists = $tasks_lists;
        // $project->total_time_spent_on_revision = $total_time_spent_on_revision;
        // }
      //  dd($total_projects);
       // return response()->json($total_projects, 200);
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

    //         $total_tasks = Task::select('tasks.id','tasks.project_id','tasks.heading as task_title','clients.name as clientName','projects.client_id'
    //         ,'projects.project_budget'
    //         )
    //         ->leftJoin('projects','projects.id','tasks.project_id')
    //         ->join('users as clients','clients.id','projects.client_id')
    //         ->where('tasks.added_by',$id)
    //         ->whereBetween('projects.created_at', [$startDate, $endDate])
    //         ->get();
    //    // dd($total_tasks);
        
    //     foreach($total_tasks as $task)
    //     {

    //             $revision_count= TaskRevision::where('task_id',$task->id)->count();
               
    //             $sales_issues= TaskRevision::where('task_id',$task->id)
              
              
    //             ->where('task_revisions.final_responsible_person','S')
              
    //             ->count();
    //             $pm_issues= TaskRevision::where('task_id',$task->id)
               
              
    //             ->where('task_revisions.final_responsible_person','PM')
              
    //             ->count();
    //             $client_issues= TaskRevision::where('task_id',$task->id)
                
              
    //             ->where('task_revisions.final_responsible_person','C')
              
    //             ->count();
    //             $lead_developer_issues= TaskRevision::where('task_id',$task->id)
               
              
    //             ->where('task_revisions.final_responsible_person','LD')
               
    //             ->count();
    //             $developer_issues= TaskRevision::where('task_id',$task->id)
              
              
    //             ->where('task_revisions.final_responsible_person','D')
               
    //             ->count();
    //             $total_disputes= TaskRevision::where('task_id',$task->id)
            
    //             ->where('task_revisions.dispute_created',1)
              
             
    //             ->count();
                
    //             $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
    //             ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
    //             ->where('task_revisions.task_id',$task->id)
    //             ->where('task_revisions.dispute_created',1)
    //             ->where('task_revision_disputes.status',0)
              
             
    //             ->count();

    //             $task->revision_count= $revision_count;
    //             $task->sales_issues= $sales_issues;
    //             $task->pm_issues= $pm_issues;
    //             $task->client_issues= $client_issues;
    //             $task->lead_developer_issues= $lead_developer_issues;
    //             $task->developer_issues= $developer_issues;
    //             $task->total_disputes_not_solved= $total_disputes_not_solved;
    //             $task->total_disputes= $total_disputes;
            
    //         $total_time_spent_on_revision= ProjectTimelog::where('task_id',$task->id)
    //         ->where('revision_status',1)
    //         ->sum('total_minutes');
      
      
    //     $task->total_time_spent_on_revision = $total_time_spent_on_revision;
    //     }
       // dd($total_tasks);
       
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
       ->whereBetween('p_m_projects.created_at', [$startDate, $endDate])
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
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['pm_issues'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','PM')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['client_issues'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','C')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['lead_developer_issues'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','LD')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['developer_issues'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','D')
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['total_disputes'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.dispute_created',1)
            ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
            ->count();
            $data['total_disputes_not_solved'] = TaskRevision::select('task_revisions.id')
          
            ->leftJoin('projects','projects.id','task_revisions.project_id')          
            ->where('projects.pm_id',$id)
            ->where('task_revisions.dispute_created',1)
            ->where('task_revisions.dispute_status',0)
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

            $data['sales_issues'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
            'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
            'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
            'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
            DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
            )
          
            ->leftJoin('projects','projects.id','task_revisions.project_id') 
            ->join('users as pm','pm.id','projects.pm_id') 
            ->join('users as clients','clients.id','projects.client_id')  
            ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')   
            ->join('tasks','tasks.id','task_revisions.task_id')
            ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
            ->where('projects.pm_id',$id)
            ->where('task_revisions.final_responsible_person','S')
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

        $data['pm_issues'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')    
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
        ->where('projects.pm_id',$id)
        ->where('task_revisions.final_responsible_person','PM')
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

        $data['client_issues'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')   
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
        ->where('projects.pm_id',$id)
        ->where('task_revisions.final_responsible_person','C')
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();
      
   // dd($data);
    
   
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

        $data['lead_dev__issues'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')    
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
        ->where('projects.pm_id',$id)
        ->where('task_revisions.final_responsible_person','LD')
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

        $data['dev__issues'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by') 
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
        ->where('projects.pm_id',$id)
        ->where('task_revisions.final_responsible_person','D')
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

        $data['total_disputes'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')  
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')  
        ->where('projects.pm_id',$id)
        ->where('task_revisions.dispute_created',1)
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

        $data['dispute_not_resolved'] = TaskRevision::select('task_revisions.id','pm.id as project_manager_id','pm.name as project_manager_name','projects.project_name','projects.id as ProjectId',
        'clients.id as clientId','clients.name as client_name','tasks.heading as task_title','revision_added_by.id as revision_raised_by_id','revision_added_by.name as revision_raised_by_name',
        'task_revisions.revision_acknowledgement as reason_for_revision','task_revisions.dispute_created','task_revision_disputes.status','task_revision_disputes.winner',
        'task_revision_disputes.raised_by_percent','task_revision_disputes.raised_against_percent',
        DB::raw('(SELECT COUNT(task_dispute_questions.id) FROM task_dispute_questions WHERE task_dispute_questions.dispute_id = task_revision_disputes.id AND DATE(task_dispute_questions.created_at) >= "'.$startDate.'" AND DATE(task_dispute_questions.created_at) <= "'.$endDate.'") as disputes_comments'),
        )
      
        ->leftJoin('projects','projects.id','task_revisions.project_id') 
        ->join('users as pm','pm.id','projects.pm_id') 
        ->join('users as clients','clients.id','projects.client_id')  
        ->leftJoin('users as revision_added_by','revision_added_by.id','task_revisions.added_by')    
        ->join('tasks','tasks.id','task_revisions.task_id')
        ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')      
        ->where('projects.pm_id',$id)
        ->where('task_revisions.dispute_created',1)
        ->where('task_revisions.dispute_status',0)                                                                     
        ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
        ->get();
      
   // dd($data);
    
   
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
