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
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->count();

                $tasks_revisions= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->count();
                $project_timelogs= ProjectTimelog::leftJoin('projects','projects.id','project_time_logs.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('project_time_logs.revision_status',1)
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->sum('total_minutes');
                $sales_issues= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revision.is_accept',1)
                ->where('task_revisions.dispute_between','SPR')
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revision.dispute_created',1)
              
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->count();
                $total_disputes_not_solved= TaskRevision::leftJoin('projects','projects.id','task_revisions.project_id')
                ->leftJoin('task_revision_disputes','task_revision_disputes.revision_id','task_revisions.id')
                ->where('projects.pm_id',$pm->project_manager_id)
                ->where('task_revision_disputes.status',0)
              
                ->whereBetween('projects.created_at', [$startDate, $endDate])
                ->count();
            $pm->total_projects = $total_projects;
            $pm->total_project_value= $total_project_value;
            $pm->total_tasks= $total_tasks;
            $pm->total_revisions= $tasks_revisions;
            $pm->minutes_spent= $project_timelogs;
            $pm->sales_issues= $sales_issues;
            $pm->total_disputes_not_solved= $total_disputes_not_solved;
            }
        
            dd($users); 
           
           
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
