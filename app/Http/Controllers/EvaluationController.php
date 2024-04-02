<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EmployeeEvaluation;
use App\Models\ProjectTimeLog;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskRevision;
use App\Models\TaskSubmission;
use App\Models\TaskUser;
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
    public function getAllEvaluation(Request $request)
    {
        $startDate = $request->start_date ?? null;
        $endDate = $request->end_date ?? null;
        $limit = $request->limit ??  10;

        $evaluationQuery = EmployeeEvaluation::select('employee_evaluations.*')
                    ->selectRaw('MIN(sub_tasks.created_at) as first_task_assign_on')
                    ->selectRaw('MIN(project_time_logs.created_at) as started_working_on')
                    ->selectRaw('COUNT(DISTINCT task_users.id) as total_task_assigned')
                    ->selectRaw('COUNT(DISTINCT task_submissions.id) as total_task_submit')

                    ->leftJoin('sub_tasks', 'employee_evaluations.user_id', '=', 'sub_tasks.assigned_to')
                    ->leftJoin('project_time_logs', 'employee_evaluations.user_id', '=', 'project_time_logs.user_id')
                    ->leftJoin('task_users', 'employee_evaluations.user_id', '=', 'task_users.user_id')
                    ->leftJoin('task_submissions', 'employee_evaluations.user_id', '=', 'task_submissions.user_id')
                    ->whereNotNull('task_submissions.link')
                    ->groupBy('employee_evaluations.id');

                    if ($startDate !== null && $endDate !== null) {
                        $evaluationQuery->where(function ($query) use ($startDate, $endDate) {
                            $query->whereBetween(DB::raw('DATE(employee_evaluations.`created_at`)'), [$startDate, $endDate]);
                            $query->orWhereBetween(DB::raw('DATE(employee_evaluations.`updated_at`)'), [$startDate, $endDate]);
                        });
                    }
                    if ($request->search != '') {
                        $evaluationQuery->where(function ($query) {
                            $query->where('employee_evaluations.user_name', 'like', '%' . request('search') . '%')
                            ->orWhere('employee_evaluations.join_date', 'like', '%' . request('search') . '%')
            
                            ->orWhere('employee_evaluations.accept_rejected', 'like', '%' . request('search') . '%');
                            // ->orWhere('leads.project_id', 'like', '%' . request('search') . '%')
                            // ->orWhere('leads.actual_value', 'like', '%' . request('search') . '%')
                            // ->orWhere('users.name', 'like', '%' . request('search') . '%');
                        });
                    }
                    $employeeEvaluations = $evaluationQuery
                        ->paginate($limit);

                    foreach($employeeEvaluations as $data){
                        $total_hours = ProjectTimeLog::where('user_id', $data->user_id)->sum('total_hours');
                        $total_min = ProjectTimeLog::where('user_id', $data->user_id)->sum('total_minutes');
                        $data->total_hours = $total_hours;
                        $data->total_minutes = $total_min;
                    }
            
        return response()->json([
            'data' => $employeeEvaluations,
            'status' => 200
        ]);
    }

}
