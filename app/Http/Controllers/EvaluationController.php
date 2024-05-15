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
use App\Models\TaskboardColumn;
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
        $data = EmployeeEvaluationTask::select('employee_evaluation_tasks.*','taskboard_columns.id as task_board_column_id','taskboard_columns.column_name as task_board_column_name','taskboard_columns.slug as task_board_column_slug','taskboard_columns.label_color as task_board_column_color','taskboard_columns.priority as task_board_column_priority')
            ->leftJoin('tasks','employee_evaluation_tasks.task_id','tasks.id')
            ->leftJoin('taskboard_columns','tasks.board_column_id','taskboard_columns.id')
            ->where('user_id',$id)
            ->get();

        return response()->json([
            'data' => $data,
            'status' => 200
        ]);
    }

    public function storeEmployeeTaskEvaluation(Request $request)
    {
        // dd($request->all());
        $evaluation_task = EmployeeEvaluationTask::where('id',$request->evaluation_id)->first();
        $evaluation_task->qw_first_chance = $request->qw_first_chance;
        $evaluation_task->qw_first_revision = $request->qw_first_revision;
        $evaluation_task->qw_second_revision = $request->qw_second_revision;
        $evaluation_task->speed_of_work = $request->speed_of_work;
        $evaluation_task->understand_instruction = $request->understand_instruction;
        $evaluation_task->lead_dev_id = Auth::user()->id;
        $evaluation_task->lead_dev_cmnt = $request->lead_dev_cmnt;

        $total_ratings = array_sum([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction
        ]);
        $number_of_ratings = count([
            $request->qw_first_chance,$request->qw_first_revision,$request->qw_second_revision,$request->speed_of_work,$request->understand_instruction
        ]);
        $average_rating = $number_of_ratings > 0 ? $total_ratings / $number_of_ratings : 0;
        $evaluation_task->avg_rating = $average_rating;
        $evaluation_task->save();
        return response()->json(['status'=>200]);
    }
    public function storeSubmissionEvaluation(Request $request)
    {
        // dd($request->all());
        // DB::beginTransaction();
        $task_sum = EmployeeEvaluationTask::where('user_id',$request->user_id)->sum('avg_rating');
        $task_count = EmployeeEvaluationTask::where('user_id',$request->user_id)->count('avg_rating');
        $avg_rating = $task_count > 0 ? $task_sum / $task_count : 0;

        $employee_evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
        $employee_evaluation->ld_submission_status = 1;
        $employee_evaluation->lead_dev_id = Auth::user()->id;
        $employee_evaluation->communication = $request->communication;
        $employee_evaluation->professionalism = $request->professionalism;
        $employee_evaluation->identiey_issues = $request->identiey_issues;
        $employee_evaluation->dedication = $request->dedication;
        $employee_evaluation->obedience = $request->obedience;
        $total_ratings = array_sum([
            $request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $number_of_ratings = count([
            $request->communication,$request->professionalism,$request->identiey_issues,$request->dedication,$request->obedience
        ]);
        $average_rating = $number_of_ratings > 0 ? $total_ratings / $number_of_ratings : 0;
        $employee_evaluation->lead_dev_avg_rating = ($average_rating + $avg_rating) / 2;
        $employee_evaluation->save();

        $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
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
            $past_action->heading= 'New dedeloper '.$dev->name.' evaluations were successfully submitted!';
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
                    'button_name' => 'See Evaluations',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('employee-evaluation.index'),
                    'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                ],
            ];
            $past_action->button = json_encode($button);
            $past_action->save();
            }
        }
        
        $helper = new HelperPendingActionController();
        $helper->leadDevSubmittedNewDevEvaluation($evaluation_task->id);

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

    public function storeTeamLeadCmnt(Request $request)
    {
        // dd($request->all());
        // DB::beginTransaction();
        $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
        $evaluation->team_lead_cmnt = $request->team_lead_cmnt;
        $evaluation->team_lead_status = 1;
        $evaluation->team_lead_id = Auth::user()->id;
        $evaluation->team_lead_cmnt_at = Carbon::now();
        $evaluation->save();

        $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
        $actions = PendingAction::where('code','LDSEND')->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
        if($actions != null)
        {
            foreach ($actions as $key => $action) {
            $action->authorized_by= Auth::id();
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();
            $lead_dev = User::where('id',$evaluation->lead_dev_id)->first();
            $teamLead= User::where('id',$evaluation->team_lead_id)->first();
            $dev= User::where('id',$evaluation->user_id)->first();
                
            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            $past_action->heading= 'Team Leader '.$teamLead->name.' has reviewed Lead Developer '.$lead_dev->name.' Evaluations on New Developer '.$dev->name.'!';
            $past_action->message = 'Team Leader <a href="'.route('employees.show',$teamLead->id).'">'.$teamLead->name.'</a> has reviewed Lead Developer <a href="'.route('employees.show',$lead_dev->id).'">'.$lead_dev->name.'</a> Evaluations on New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>!';
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
                    'button_name' => 'See Evaluations',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('employee-evaluation.index'),
                    'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                ],
            ];
            $past_action->button = json_encode($button);
            $past_action->save();
            }

        }
        
        $helper = new HelperPendingActionController();
        $helper->teamLeadSubmittedNewDevEvaluation($evaluation_task->id);

        return response()->json(['status'=>200]);
    }
    public function storeAuthorization(Request $request)
    {
        // DB::beginTransaction();
        if($request->status == 'authorize')
        {
            $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
            $evaluation->managements_cmnt = $request->managements_cmnt;
            $evaluation->managements_decision = 'Accepted';
            $evaluation->accept_rejected = Carbon::now();
            $evaluation->managements_id = Auth::user()->id;
            $evaluation->managements_name = Auth::user()->name;
            $evaluation->managements_auth_at = Carbon::now();
            $evaluation->employee_status = 1;
            $evaluation->save();

            $user= User::find($request->user_id);
            $user->role_id= 5;
            $user->save();

            $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
            $actions = PendingAction::where('code','TLSDE')->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $authorize_by= User::where('id',$action->authorized_by)->first();
                $teamLead= User::where('id',$evaluation->team_lead_id)->first();
                $dev= User::where('id',$evaluation->user_id)->first();
                    
                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading= 'New Developer '.$dev->name.' was authorize for real work by Top Management '.$authorize_by->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
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
                        'button_name' => 'See Evaluations',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                    ],
                ];
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }

            $helper = new HelperPendingActionController();
            $helper->evaluationAuthForAdmin($evaluation_task->id);

            return response()->json([
                'message' => 'Top management authorized successfully',
                'status' =>200
            ]);
        }elseif($request->status == 'reject'){
            $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
            $evaluation->managements_cmnt = $request->managements_cmnt;
            $evaluation->managements_decision = 'Rejected';
            $evaluation->accept_rejected = Carbon::now();
            $evaluation->managements_id = Auth::user()->id;
            $evaluation->managements_name = Auth::user()->name;
            $evaluation->managements_auth_at = Carbon::now();
            $evaluation->employee_status = 3;
            $evaluation->save();

            $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
            $actions = PendingAction::where('code','TLSDE')->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $authorize_by= User::where('id',$action->authorized_by)->first();
                $teamLead= User::where('id',$evaluation->team_lead_id)->first();
                $dev= User::where('id',$evaluation->user_id)->first();
                    
                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading= 'New Developer '.$dev->name.' was rejected for real work by Top Management '.$authorize_by->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has rejected New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
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
                        'button_name' => 'See Evaluations',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                    ],
                ];
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }
            $helper = new HelperPendingActionController();
            $helper->evaluationRejectForAdmin($evaluation_task->id);

            return response()->json([
                'message' => 'Top management reject successfully',
                'status' =>200
            ]);

        }else{
            $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
            $evaluation->managements_cmnt = $request->managements_cmnt;
            $evaluation->managements_decision = 'One more week';
            $evaluation->accept_rejected = Carbon::now();
            $evaluation->managements_id = Auth::user()->id;
            $evaluation->managements_name = Auth::user()->name;
            $evaluation->managements_auth_at = Carbon::now();
            $evaluation->employee_status = 2;
            $evaluation->save();

            $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
            $actions = PendingAction::where('code','TLSDE')->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $authorize_by= User::where('id',$action->authorized_by)->first();
                $teamLead= User::where('id',$evaluation->team_lead_id)->first();
                $dev= User::where('id',$evaluation->user_id)->first();
                    
                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                $past_action->heading= 'Top Management '.$authorize_by->name.' has extended the trial period for New Developer '.$dev->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has extended the trial period for one more week for New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> from ';
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
                        'button_name' => 'See Evaluations',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id, 'show' => 'all']),
                    ],
                ];
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }
            $helper = new HelperPendingActionController();
            $helper->evaluationExtendForAdmin($evaluation_task->id);

            return response()->json([
                'message' => 'Top management extend successfully',
                'status' =>200
            ]);
        }
    }
    public function storeAcknowledged(Request $request)
    {
        $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
        if($request->acknowledged == 'lead_dev'){
            $evaluation->lead_dev_acknowledged = 1;
        }else{
            $evaluation->team_lead_acknowledged = 1;
        }
        $evaluation->save();

        $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
        $actions = PendingAction::where('task_id',$evaluation_task->task_id)->whereIn('code', ['EAFA', 'ERFA', 'EEFA'])->where('past_status',0)->get();
        if($actions != null)
        {
            foreach ($actions as $key => $action) {
            $action->authorized_by= Auth::id();
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();
            $authorize_by= User::where('id',$action->authorized_by)->first();
            $top_management= User::where('id',$evaluation->managements_id)->first();
            $dev= User::where('id',$evaluation->user_id)->first();
                
            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            if($evaluation->employee_status == 1)
            {
                $past_action->heading= 'New Developer '.$dev->name.' was authorize for real work by Top Management '.$authorize_by->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
            }elseif($evaluation->employee_status == 2)
            {
                $past_action->heading= 'Top Management '.$top_management->name.' has extended the trial period for New Developer '.$dev->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has extended the trial period one more week for New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> from ';
            }else{
                $past_action->heading= 'New Developer '.$dev->name.' was rejected for real work by Top Management '.$top_management->name.'!';
                $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
            }
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
                    'button_name' => 'View Details',
                    'button_color' => 'primary',
                    'button_type' => 'redirect_url',
                    'button_url' => route('employee-evaluation.index'),
                    'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                ],
            ];
            $past_action->button = json_encode($button);
            $past_action->save();
            }
        }
    }
    public function getEmployeeUser($id)
    {
        $evaluationUser = EmployeeEvaluation::select('employee_evaluations.*','employee_evaluation_tasks.lead_dev_id','users.id as assign_by_id','users.name as assign_by_name','users.image as assign_by_img')
                        ->leftJoin('employee_evaluation_tasks','employee_evaluations.user_id','employee_evaluation_tasks.user_id')
                        ->leftJoin('users','employee_evaluation_tasks.lead_dev_id','users.id')
                        ->where('employee_evaluations.user_id',$id)
                        ->first();

        return response()->json([
            'data' => $evaluationUser,
            'status' => 200
        ]);
    }
    public function employeeTaskRevision($id)
    {
        $revision = TaskRevision::where('task_id',$id);
        return response()->json([
            'status' => 200,
            'data' => $revision
            ]);
    }

}
