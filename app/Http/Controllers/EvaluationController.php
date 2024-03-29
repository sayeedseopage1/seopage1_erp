<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EvaluationController extends AccountBaseController
{
    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'Employee Evaluation';
        $this->activeSettingMenu = 'employee-evaluation';

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('employee-evaluation.index', $this->data);
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
    public function getAllEvaluation()
    {                                                  
        $data = Task::select(
                'tasks.*',
                'users.name as employee_name',
                'users.created_at as joining_date',
                'tasks.created_at as first_task_assigned',
                'project_time_logs.start_time as started_working_on',
                DB::raw('COUNT(task_users.user_id) as total_task_assigned'),
                DB::raw('COUNT(task_submissions.user_id) as total_task_submitted'),
                DB::raw('SUM(project_time_logs.total_hours) as total_task_hours'),
                DB::raw('SUM(project_time_logs.total_minutes) as total_task_minutes'),
                DB::raw('COUNT(task_revisions.task_id) as total_task_revision')
            )
            ->leftJoin('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->leftJoin('users', 'task_users.user_id', '=', 'users.id')
            ->leftJoin('project_time_logs', 'tasks.id', '=', 'project_time_logs.task_id')
            ->leftJoin('task_submissions', 'users.id', '=', 'task_submissions.user_id')
            ->leftJoin('task_revisions', 'tasks.id', '=', 'task_revisions.task_id')
            ->where('users.role_id', 14) 
            ->whereNull('tasks.u_id') 
            ->where('tasks.independent_task_status', 1) 
            ->groupBy('tasks.id') 
            ->get();

        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }

}
