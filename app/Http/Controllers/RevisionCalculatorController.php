<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\TaskRevision;
use App\Models\Task;
use App\Models\Project;
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
                $total_tasks = Task::select('tasks.*')
                ->leftJoin('projects','projects.id','tasks.project_id')
                ->where('tasks.added_by',$pm->project_manager_id)
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->count();

                $tasks_revisions= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->whereBetween('task_revisions.created_at', [$startDate, $endDate])
                ->count();
            $pm->total_projects = $total_projects;
            $pm->total_project_value= $total_project_value;
            $pm->total_tasks= $total_tasks;
            $pm->total_revisions= $tasks_revisions;
            }
        
            dd($users); 
           
            $projects = DB::table('users as pm')->select([
                //'projects.id',
                'pm.id as project_manager_id',
                'pm.name as project_manager_name',
                DB::raw('(SELECT COUNT(projects.id) FROM projects WHERE projects.pm_id = pm.id AND DATE(projects.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as project_count'),
                DB::raw('(SELECT SUM(projects.project_budget) FROM projects WHERE projects.pm_id = pm.id AND DATE(projects.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as total_project_value'),
                DB::raw('(SELECT COUNT(tasks.id) FROM tasks WHERE tasks.added_by = pm.id AND DATE(tasks.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as total_tasks'),
                //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE task_revisions.project_id = projects.id AND DATE(task_revisions.created_at) BETWEEN "'.$startDate.'" AND "'.$endDate.'") as total_task_revisions'),
            ])
            ->leftJoin('projects', 'projects.pm_id', 'pm.id')
            ->leftJoin('tasks', 'tasks.project_id', 'projects.id')
            
            ->where('pm.role_id', 4)
            ->where('projects.project_status', 'Accepted')
            ->take(10)->get();
            foreach ($projects as $project) {
                $project->total_task_revisions= TaskRevision::
                select('task_revisions.id')
                
                ->where('task_revisions.project_id','projects.id')
               
                ->count();
            }
        
            dd($projects);
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
