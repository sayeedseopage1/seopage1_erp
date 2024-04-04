<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EmployeeEvaluation;
use App\Models\EmployeeEvaluationTask;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use App\Models\ProjectTimeLog;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskRevision;
use App\Models\TaskSubmission;
use App\Models\TaskUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use Carbon\Carbon;

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

        $evaluationQuery = EmployeeEvaluation::select('employee_evaluations.*','added_by.id as added_by_id','added_by.name as added_by_name')
                    ->selectRaw('MIN(sub_tasks.created_at) as first_task_assign_on')
                    ->selectRaw('MIN(project_time_logs.created_at) as started_working_on')
                    ->selectRaw('COUNT(DISTINCT task_users.id) as total_task_assigned')
                    ->selectRaw('COUNT(DISTINCT task_submissions.user_id) as total_task_submit')

                    ->leftJoin('sub_tasks', 'employee_evaluations.user_id', '=', 'sub_tasks.assigned_to')
                    ->leftJoin('users as added_by', 'sub_tasks.added_by', '=', 'added_by.id')
                    ->leftJoin('project_time_logs', 'employee_evaluations.user_id', '=', 'project_time_logs.user_id')
                    ->leftJoin('task_users', 'employee_evaluations.user_id', '=', 'task_users.user_id')
                    ->leftJoin('task_submissions', function($join) {
                        $join->on('employee_evaluations.user_id', '=', 'task_submissions.user_id')
                             ->whereNotNull('task_submissions.text');
                    })
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
                        });
                    }
                    $employeeEvaluations = $evaluationQuery
                        ->paginate($limit);

                    foreach($employeeEvaluations as $data){
                        $taskUser = TaskUser::where('user_id',$data->user_id)->first();
                        if($taskUser !=null){
                        $total_hours = ProjectTimeLog::where('user_id', $data->user_id)->sum('total_hours');
                        $total_min = ProjectTimeLog::where('user_id', $data->user_id)->sum('total_minutes');
                        $revision = TaskRevision::where('task_id', $taskUser->task_id)->count('task_id');
                        $data->total_hours = $total_hours;
                        $data->total_minutes = $total_min;
                        $data->total_revision = $revision;
                        }
                    }
            
        return response()->json([
            'data' => $employeeEvaluations,
            'status' => 200
        ]);
    }

    public function getEmployeeTask($id)
    {
        $data = EmployeeEvaluationTask::where('user_id',$id)->get();

        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function storeEmployeeTaskEvaluation(Request $request)
    {
        $evaluation_task = EmployeeEvaluationTask::where('id',$request->evaluation_id)->first();
        $evaluation_task->qw_first_chance = $request->qw_first_chance;
        $evaluation_task->qw_first_revision = $request->qw_first_revision;
        $evaluation_task->qw_second_revision = $request->qw_second_revision;
        $evaluation_task->speed_of_work = $request->speed_of_work;
        $evaluation_task->understand_instruction = $request->understand_instruction;
        $evaluation_task->communication = $request->communication;
        $evaluation_task->professionalism = $request->professionalism;
        $evaluation_task->identiey_issues = $request->identiey_issues;
        $evaluation_task->dedication = $request->dedication;
        $evaluation_task->obedience = $request->obedience;
        $evaluation_task->lead_dev_id = Auth::user()->id;
        $evaluation_task->lead_dev_cmnt = $request->lead_dev_cmnt;

        $total_ratings = array_sum([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction,$request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $number_of_ratings = count([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction,$request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $average_rating = $number_of_ratings > 0 ? $total_ratings / $number_of_ratings : 0;
        $evaluation_task->avg_rating = $average_rating;
        $evaluation_task->save();

        if($request->confirm_submission == 'lead_dev_submitted')
        {
            $employee_evaluation = EmployeeEvaluation::where('user_id',$evaluation_task->user_id)->first();
            $employee_evaluation->ld_submission_status = 1;
            $employee_evaluation->save();

            $actions = PendingAction::where('code','NDPE')->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $authorize_by= User::where('id',$action->authorized_by)->first();
                $dev= User::where('id',$employee_evaluation->user_id)->first();
                    
                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading= 'New dedeloper <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> evaluations were successfully submitted!';
                $past_action->message = 'Lead dedeloper <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has evaluated New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>!';
                $past_action->timeframe = $action->timeframe;
                $past_action->authorization_for = $action->authorization_for;
                $past_action->authorized_by = $action->authorized_by;
                $past_action->authorized_at = $action->authorized_at;
                $past_action->expired_status = $action->expired_status;
                $past_action->past_status = $action->past_status;
                $past_action->task_id = $action->task_id;
                $past_action->developer_id = $action->developer_id;
                $past_action->client_id = $action->client_id;
                $button = [
                    [
                        'button_name' => 'Evaluate',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['modal_type' => 'new_dev_evaluation', 'user_id' => $dev->id]),
                    ],
                ];
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }
            
            $helper = new HelperPendingActionController();
            $helper->leadDevSubmittedNewDevEvaluation($evaluation_task->id);
        }

        return response()->json(['status'=>200]);
    }
    public function editEmployeeTaskEvaluation($id)
    {
        $evaluation = EmployeeEvaluationTask::where('id',$id)->first(); 

        return response()->json([
            'data' => $evaluation,
            'status' => 200
        ]);
    }
    public function updateEmployeeTaskEvaluation(Request $request)
    {
        $evaluation_task = EmployeeEvaluationTask::where('id',$request->evaluation_id)->first();
        $evaluation_task->qw_first_chance = $request->qw_first_chance;
        $evaluation_task->qw_first_revision = $request->qw_first_revision;
        $evaluation_task->qw_second_revision = $request->qw_second_revision;
        $evaluation_task->speed_of_work = $request->speed_of_work;
        $evaluation_task->understand_instruction = $request->understand_instruction;
        $evaluation_task->communication = $request->communication;
        $evaluation_task->professionalism = $request->professionalism;
        $evaluation_task->identiey_issues = $request->identiey_issues;
        $evaluation_task->dedication = $request->dedication;
        $evaluation_task->obedience = $request->obedience;
        $evaluation_task->lead_dev_cmnt = $request->lead_dev_cmnt;
        
        $total_ratings = array_sum([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction,$request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $number_of_ratings = count([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction,$request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $average_rating = $number_of_ratings > 0 ? $total_ratings / $number_of_ratings : 0;
        $evaluation_task->avg_rating = $average_rating;
        $evaluation_task->save();

        return response()->json(['status'=>200]);
    }

}
