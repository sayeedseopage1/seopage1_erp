<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\EmployeeDetails;
use App\Models\EmployeeEvaluation;
use App\Models\EmployeeEvaluationTask;
use App\Models\EvaluationHistory;
use App\Models\PendingAction;
use App\Models\PendingActionPast;
use App\Models\PMAssign;
use App\Models\ProjectTimeLog;
use App\Models\RoleUser;
use App\Models\Role;
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

use function PHPSTORM_META\type;

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

        $evaluationQuery = EmployeeEvaluation::select('employee_evaluations.*','added_by.id as added_by_id','added_by.name as added_by_name','addedBy.id as addedById','addedBy.name as addedByName','tasks.id as task_id','roles.id as roleId','roles.name as role_name', 'tmLead.name as team_lead_name')
                    ->selectRaw('MIN(sub_tasks.created_at) as first_task_assign_on')
                    ->selectRaw('MIN(mainTask.created_at) as firstTaskAssignOn')
                    ->selectRaw('MIN(project_time_logs.created_at) as started_working_on')
                    ->selectRaw('COUNT(DISTINCT task_users.id) as total_task_assigned')
                    ->selectRaw('COUNT(DISTINCT employee_evaluation_tasks.submission_date) as total_task_submit')

                    ->leftJoin('employee_evaluation_tasks', 'employee_evaluations.user_id', '=', 'employee_evaluation_tasks.user_id')
                    ->leftJoin('sub_tasks', 'employee_evaluations.user_id', '=', 'sub_tasks.assigned_to')
                    ->leftJoin('tasks', 'sub_tasks.task_id', '=', 'tasks.id')
                    ->leftJoin('users as added_by', 'sub_tasks.added_by', '=', 'added_by.id')
                    //this is for pm evaluation only start
                    ->leftJoin('tasks as mainTask', 'employee_evaluation_tasks.task_id', '=', 'mainTask.id')
                    ->leftJoin('users as addedBy', 'mainTask.added_by', '=', 'addedBy.id')
                    //this is for pm evaluation only end
                    ->leftJoin('users', 'employee_evaluations.user_id', '=', 'users.id')
                    ->leftJoin('users as tmLead', 'employee_evaluations.team_lead_id', '=', 'tmLead.id')
                    ->leftJoin('roles', 'users.role_id', '=', 'roles.id')
                    ->leftJoin('project_time_logs', 'employee_evaluations.user_id', '=', 'project_time_logs.user_id')
                    ->leftJoin('task_users', 'employee_evaluations.user_id', '=', 'task_users.user_id')
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
                        $total_hours = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->sum('total_hours');
                        $total_min = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->sum('total_min');
                        $revision = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->latest()->value('revision_number');
                        $history = EvaluationHistory::where('user_id', $taskUser->user_id)->count();
                        $data->total_hours = $total_hours;
                        $data->total_minutes = $total_min;
                        $data->total_revision = $revision;
                        $data->round_requied = $history;
                        }
                    }
            
        return response()->json([
            'data' => $employeeEvaluations,
            'status' => 200
        ]);
    }


    public function getSingleEvaluation($user_id)
    {
        $evaluationQuery = EmployeeEvaluation::select('employee_evaluations.*', 'added_by.id as added_by_id', 'added_by.name as added_by_name','addedBy.id as addedById','addedBy.name as addedByName','tasks.id as task_id','roles.id as roleId', 'roles.name as role_name', 'tmLead.name as team_lead_name')
        ->selectRaw('MIN(sub_tasks.created_at) as first_task_assign_on')
        ->selectRaw('MIN(mainTask.created_at) as firstTaskAssignOn')
        ->selectRaw('MIN(project_time_logs.created_at) as started_working_on')
        ->selectRaw('COUNT(DISTINCT task_users.id) as total_task_assigned')
        ->selectRaw('COUNT(DISTINCT employee_evaluation_tasks.submission_date) as total_task_submit')

        ->leftJoin('employee_evaluation_tasks', 'employee_evaluations.user_id', '=', 'employee_evaluation_tasks.user_id')
        ->leftJoin('sub_tasks', 'employee_evaluations.user_id', '=', 'sub_tasks.assigned_to')
        ->leftJoin('tasks', 'sub_tasks.task_id', '=', 'tasks.id')
        ->leftJoin('users as added_by', 'sub_tasks.added_by', '=', 'added_by.id')
        //this is for pm evaluation only start
        ->leftJoin('tasks as mainTask', 'employee_evaluation_tasks.task_id', '=', 'mainTask.id')
        ->leftJoin('users as addedBy', 'mainTask.added_by', '=', 'addedBy.id')
        //this is for pm evaluation only end
        ->leftJoin('users', 'employee_evaluations.user_id', '=', 'users.id')
        ->leftJoin('users as tmLead', 'employee_evaluations.team_lead_id', '=', 'tmLead.id')
        ->leftJoin('roles', 'users.role_id', '=', 'roles.id')
        ->leftJoin('project_time_logs', 'employee_evaluations.user_id', '=', 'project_time_logs.user_id')
        ->leftJoin('task_users', 'employee_evaluations.user_id', '=', 'task_users.user_id')
        ->where('employee_evaluations.user_id', $user_id)
            ->groupBy('employee_evaluations.id');

        // Rest of your query

        $employeeEvaluations = $evaluationQuery->get();

        foreach ($employeeEvaluations as $data) {
            $taskUser = TaskUser::where('user_id', $data->user_id)->first();
            if ($taskUser != null) {
                $total_hours = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->sum('total_hours');
                $total_min = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->sum('total_min');
                $revision = EmployeeEvaluationTask::where('user_id', $taskUser->user_id)->sum('revision_number');
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
        $data = EmployeeEvaluationTask::select(
            'employee_evaluation_tasks.*',
            'taskboard_columns.id as task_board_column_id',
            'taskboard_columns.column_name as task_board_column_name',
            'taskboard_columns.slug as task_board_column_slug',
            'taskboard_columns.label_color as task_board_column_color',
            'taskboard_columns.priority as task_board_column_priority',
            'task_submissions.screen_record_link',
            'tasks.id as task_id',
            'users.id as added_by_id','users.name as added_by_name',
            'addedBy.id as addedById','addedBy.name as addedByName'
        )
        ->leftJoin('tasks', 'employee_evaluation_tasks.task_id', 'tasks.id')
        ->leftJoin('taskboard_columns', 'tasks.board_column_id', 'taskboard_columns.id')
        ->leftJoin('task_submissions', 'tasks.id', 'task_submissions.task_id')
        ->leftJoin('users', 'employee_evaluation_tasks.lead_dev_id', 'users.id')
        ->leftJoin('users as addedBy', 'employee_evaluation_tasks.team_lead_id', 'addedBy.id')
        ->where('employee_evaluation_tasks.user_id', $id)
        ->get();

        $groupedData = $data->groupBy('task_id')->map(function ($tasks) {
            $firstTask = $tasks->first();
            $firstTask->screen_record_links = $tasks->pluck('screen_record_link')->filter()->values()->toArray();
            unset($firstTask->screen_record_link);
            return $firstTask;
        })->values();

        return response()->json([
            'data' => $groupedData,
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
        if(Auth::user()->role_id == 8){
            $evaluation_task->team_lead_id = Auth::user()->id;
            $evaluation_task->team_lead_cmnt = $request->team_lead_cmnt;
        }else{
            $evaluation_task->lead_dev_id = Auth::user()->id;
            $evaluation_task->lead_dev_cmnt = $request->lead_dev_cmnt;
        }

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
        // DB::beginTransaction();
        $task_sum = EmployeeEvaluationTask::where('user_id',$request->user_id)->sum('avg_rating');
        $task_count = EmployeeEvaluationTask::where('user_id',$request->user_id)->count('avg_rating');
        $avg_rating = $task_count > 0 ? $task_sum / $task_count : 0;

        $employee_evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
        $employee_evaluation->communication = $request->communication;
        $employee_evaluation->professionalism = $request->professionalism;
        $employee_evaluation->identiey_issues = $request->identiey_issues;
        $employee_evaluation->dedication = $request->dedication;
        $employee_evaluation->obedience = $request->obedience;
        if($request->confirm_submission == 'team_lead_submitted'){
            $employee_evaluation->team_lead_id = Auth::user()->id;
            $employee_evaluation->team_lead_submission_status = 1;
            $employee_evaluation->team_lead_avg_rating = $avg_rating;
        }else{
            $employee_evaluation->ld_submission_status = 1;
            $employee_evaluation->lead_dev_id = Auth::user()->id;
            $employee_evaluation->lead_dev_avg_rating = $avg_rating;
        }
        $employee_evaluation->save();

        $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
        $actions = PendingAction::whereIn('code',['NDPE','NDPM','NLDE'])->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
        if($actions != null)
        {
            foreach ($actions as $key => $action) {
            $action->authorized_by= Auth::id();
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();
            $authorize_by= User::where('id',$action->authorized_by)->first();
            $dev = User::where('id',$employee_evaluation->user_id)->first();
                
            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            if($action->code == 'NDPM'){
                $past_action->heading= $action->heading;
                $past_action->message = 'New Project Manager <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'\'s </a> evaluations were successfully submitted!';
            }elseif($action->code == 'NLDE'){
                $past_action->heading= $action->heading;
                $past_action->message = 'New Lead Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'\'s</a> evaluations were successfully submitted!';
            }else{
                $past_action->heading= 'New dedeloper '.$dev->name.' evaluations were successfully submitted!';
                $past_action->message = 'Lead dedeloper <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has evaluated New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>!';
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
            if($action->code == 'NDPM'){
                $button = [
                    [
                        'button_name' => 'View Evaluation',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'pm']),
                    ],
                ];
            }elseif($action->code == 'NLDE'){
                $button = [
                    [
                        'button_name' => 'View Evaluation',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'ld']),
                    ],
                ];
            }else{
                $button = [
                    [
                        'button_name' => 'See Evaluations',
                        'button_color' => 'primary',
                        'button_type' => 'redirect_url',
                        'button_url' => route('employee-evaluation.index'),
                        'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                    ],
                ];
            }
            $past_action->button = json_encode($button);
            $past_action->save();
            }
        }
        if(Auth::user()->role_id == 8){
            $helper = new HelperPendingActionController();
            $helper->TeamLeadSubmittedNewPmEvaluation($evaluation_task->id);
        }else{
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
        if(Auth::user()->role_id == 8){
            $evaluation_task->team_lead_cmnt = $request->team_lead_cmnt;
        }else{
            $evaluation_task->lead_dev_cmnt = $request->lead_dev_cmnt;
        }
        
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
        // dd($request->all());
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

            if($request->role_id == 15){
                $user= User::find($request->user_id);
                $user->role_id= 4;
                $user->save();
            }elseif($request->role_id == 16){
                $user= User::find($request->user_id);
                $user->role_id= 6;
                $user->save();
            }elseif($request->role_id == 17){
                $user= User::find($request->user_id);
                $user->role_id= 7;
                $user->save();
            }else{
                $user= User::find($request->user_id);
                $user->role_id= 5;
                $user->save();
            }
            if($user->role_id == 4)
            {
                $pmassign= new PMAssign();
                $pmassign->pm_id= $request->user_id;
                $pmassign->project_count= 0;
                $pmassign->amount=0;
                $pmassign->save();


            }
            $changeEmployeeRolePermission = user()->permission('change_employee_role');

            abort_403($changeEmployeeRolePermission != 'all');

            $userId = $user->id;
            $roleId = $user->role_id;
            $employeeRole = Role::where('name', 'employee')->first();

            $user = User::withoutGlobalScopes(['active'])->findOrFail($userId);

            RoleUser::where('user_id', $user->id)->delete();
            $user->roles()->attach($employeeRole->id);

            if ($employeeRole->id != $roleId) {
                $user->roles()->attach($roleId);
            }

            $user->assignUserRolePermission($roleId);

            $userSession = new AppSettingController();
            $userSession->deleteSessions([$user->id]);

            if($request->role_id == 15){
                $employee_details = EmployeeDetails::where('user_id',$request->user_id)->first();
                $employee_details->designation_id = 22;
                $employee_details->save(); 
            }elseif($request->role_id == 16){
                $employee_details = EmployeeDetails::where('user_id',$request->user_id)->first();
                $employee_details->designation_id = 23;
                $employee_details->save(); 
            }elseif($request->role_id == 17){
                $employee_details = EmployeeDetails::where('user_id',$request->user_id)->first();
                $employee_details->designation_id = 19;
                $employee_details->save(); 
            }else{
                $employee_details = EmployeeDetails::where('user_id',$request->user_id)->first();
                $employee_details->designation_id = 26;
                $employee_details->save();   
            }

            $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
            $actions = PendingAction::whereIn('code',['TLSDE','TLSNPM','TLSNLD'])->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {
                $action->authorized_by= Auth::id();
                $action->authorized_at= Carbon::now();
                $action->past_status = 1;
                $action->save();
                $authorize_by= User::where('id',$action->authorized_by)->first();
                $dev= User::where('id',$evaluation->user_id)->first();
                    
                $past_action= new PendingActionPast();
                $past_action->item_name = $action->item_name;
                $past_action->code = $action->code;
                $past_action->serial = $action->serial;
                $past_action->action_id = $action->id;
                if($action->code == 'TLSNPM'){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'New Project Manager <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> was '. '<span class="text-success">Authorized</span>' .' for real work by Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                }elseif($action->code == 'TLSNLD'){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'New lead developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> was '. '<span class="text-success">Authorized</span>' .' for real work by Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>!';
                }else{
                    $past_action->heading= 'New Developer '.$dev->name.' was authorize for real work by Top Management '.$authorize_by->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
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
                if($action->code == 'TLSNPM'){
                    $button = [
                        [
                            'button_name' => 'View Evaluation',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'pm']),
                        ],
                    ];
                }elseif($action->code == 'TLSNLD'){
                    $button = [
                        [
                            'button_name' => 'View Evaluation',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'ld']),
                        ],
                    ];
                }else{
                    $button = [
                        [
                            'button_name' => 'See Evaluations',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                        ],
                    ];
                }
                
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }
            if($request->role_id == 15){
                $helper = new HelperPendingActionController();
                $helper->evaluationAuthTopManagement($evaluation_task->id);
            }else{
                $helper = new HelperPendingActionController();
                $helper->evaluationAuthForAdmin($evaluation_task->id);
            }

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
            $actions = PendingAction::whereIn('code',['TLSDE','TLSNPM','TLSNLD'])->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
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
                if($action->code == 'TLSNPM'){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'New Project Manager <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> was '. '<span class="text-danger">Rejected</span>' .' for real work by Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                }elseif($action->code == 'TLSNLD'){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'New lead developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> was '. '<span class="text-danger">Rejected</span>' .' for real work by Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>!';
                }else{
                    $past_action->heading= 'New Developer '.$dev->name.' was rejected for real work by Top Management '.$authorize_by->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has rejected New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
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
                if($action->code == 'TLSNPM'){
                    $button = [
                        [
                            'button_name' => 'View Evaluation',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'pm']),
                        ],
                    ];
                }elseif($action->code == 'TLSNLD'){
                    $button = [
                        [
                            'button_name' => 'View Evaluation',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all', 'type' => 'ld']),
                        ],
                    ];
                }else{
                    $button = [
                        [
                            'button_name' => 'See Evaluations',
                            'button_color' => 'primary',
                            'button_type' => 'redirect_url',
                            'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id,'show' => 'all']),
                        ],
                    ];
                }
                $past_action->button = json_encode($button);
                $past_action->save();
                }
            }
            if($request->role_id == 15){
                $helper = new HelperPendingActionController();
                $helper->evaluationRejectTopManagement($evaluation_task->id);
            }else{
                $helper = new HelperPendingActionController();
                $helper->evaluationRejectForAdmin($evaluation_task->id);
            }
            return response()->json([
                'message' => 'Top management reject successfully',
                'status' =>200
            ]);

        }else{
            DB::transaction(function () use ($request) 
            {
                // DB::beginTransaction();
                $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
                $old_exp_date = $evaluation->exp_date;
                $evaluation->managements_cmnt = $request->managements_cmnt;
                $evaluation->managements_decision = 'One more week';
                $evaluation->accept_rejected = Carbon::now();
                $evaluation->exp_date = Carbon::now()->addDays(7); 
                $evaluation->managements_id = Auth::user()->id;
                $evaluation->managements_name = Auth::user()->name;
                $evaluation->managements_auth_at = Carbon::now();
                $evaluation->employee_status = 2;
                $evaluation->save();

                $history = new EvaluationHistory();
                $history->user_id = $evaluation->user_id;  
                $history->parent_task_id = $request->task_id;  
                $history->user_name = $evaluation->user_name;  
                $history->start_date = $evaluation->start_date;  
                $history->exp_date = $old_exp_date;  
                $history->communication = $evaluation->communication;  
                $history->professionalism = $evaluation->professionalism;  
                $history->identiey_issues = $evaluation->identiey_issues;  
                $history->dedication = $evaluation->dedication;  
                $history->obedience = $evaluation->obedience;  
                $history->team_lead_cmnt = $evaluation->team_lead_cmnt;  
                $history->managements_cmnt = $evaluation->managements_cmnt;  
                $history->lead_dev_avg_rating = $evaluation->lead_dev_avg_rating;
                $history->team_lead_avg_rating = $evaluation->team_lead_avg_rating;
                $history->managements_decision = $evaluation->managements_decision;  
                $history->managements_id = $evaluation->managements_id;  
                $history->managements_name = $evaluation->managements_name;  
                $history->managements_auth_at = $evaluation->managements_auth_at;  
                $history->accept_rejected = $evaluation->accept_rejected;  
                $history->pending_action_sending_time = $evaluation->pending_action_sending_time;  
                $history->ld_submission_status = $evaluation->ld_submission_status;  
                $history->team_lead_submission_status = $evaluation->team_lead_submission_status;  
                $history->lead_dev_id = $evaluation->lead_dev_id;  
                $history->team_lead_id = $evaluation->team_lead_id;  
                $history->lead_dev_acknowledged = $evaluation->lead_dev_acknowledged;  
                $history->team_lead_acknowledged = $evaluation->team_lead_acknowledged;  
                $history->team_lead_cmnt_at = $evaluation->team_lead_cmnt_at;  
                $history->team_lead_status = $evaluation->team_lead_status;  
                $history->employee_status = $evaluation->employee_status;  
                $history->save();

                $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
                $actions = PendingAction::whereIn('code',['TLSDE','TLSNPM','TLSNLD'])->where('task_id',$evaluation_task->task_id)->where('past_status',0)->get();
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
                    if($action->code == 'TLSNPM'){
                        $past_action->heading= $action->heading;
                        $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has '. '<span class="text-primary">extended </span>' .' the trial period for new Project Manager <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>';
                    }elseif($action->code == 'TLSNLD'){
                        $past_action->heading= $action->heading;
                        $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has '. '<span class="text-primary">extended </span>' .' the trial period for New Lead Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>';
                    }else{
                        $past_action->heading= 'Top Management '.$authorize_by->name.' has extended the trial period for New Developer '.$dev->name.'!';
                        $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has extended the trial period for one more week for New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> from ';
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
                    if($action->code == 'TLSNPM'){
                        $button = [
                            [
                                'button_name' => 'View Evaluation',
                                'button_color' => 'primary',
                                'button_type' => 'redirect_url',
                                'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id, 'show' => 'all', 'type' => 'pm']),
                            ],
                        ];
                    }elseif($action->code == 'TLSNLD'){
                        $button = [
                            [
                                'button_name' => 'View Evaluation',
                                'button_color' => 'primary',
                                'button_type' => 'redirect_url',
                                'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id, 'show' => 'all', 'type' => 'ld']),
                            ],
                        ];
                    }else{
                        $button = [
                            [
                                'button_name' => 'See Evaluations',
                                'button_color' => 'primary',
                                'button_type' => 'redirect_url',
                                'button_url' => route('employee-evaluation.index'),
                                'button_url' => route('employee-evaluation.index', ['user_id' => $dev->id, 'show' => 'all']),
                            ],
                        ];
                    }
                    $past_action->button = json_encode($button);
                    $past_action->save();
                    }
                }
                $helper = new HelperPendingActionController();
                $helper->evaluationExtendForAdmin($evaluation_task->id);

                
                $evaluation->communication = null;
                $evaluation->professionalism = null;
                $evaluation->identiey_issues = null;
                $evaluation->dedication = null;
                $evaluation->obedience = null;
                $evaluation->lead_dev_avg_rating = null;
                $evaluation->team_lead_avg_rating = null;
                $evaluation->team_lead_cmnt = null;
                $evaluation->managements_cmnt = null;
                $evaluation->managements_decision = null;
                $evaluation->managements_id = null;
                $evaluation->managements_name = null;
                $evaluation->managements_auth_at = null;
                $evaluation->accept_rejected = null;
                $evaluation->pending_action_sending_time = null;
                $evaluation->ld_submission_status = 0;
                $evaluation->team_lead_submission_status = 0;
                $evaluation->lead_dev_id = null;
                $evaluation->team_lead_id = null;
                $evaluation->team_lead_cmnt_at = null;
                $evaluation->team_lead_status = 0;
                $evaluation->employee_status = 0; 
                $evaluation->save();
            });
            return response()->json([
                'message' => 'Top management extend successfully',
                'status' =>200
            ]);
        }
    }
    public function storeTeamLeadAcknowledged(Request $request)
    {
        // dd($request->all());
        // DB::beginTransaction();
        $evaluation = EmployeeEvaluation::where('user_id',$request->user_id)->first();
        if($request->acknowledged == 'team_lead'){
            $evaluation->team_lead_acknowledged = 1;
        }else{
            $evaluation->lead_dev_acknowledged = 1;
        }
        $evaluation->save();


        $evaluation_task = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
        $evaluation_history = EvaluationHistory::where('user_id', $request->user_id)->first();
        $actions = PendingAction::where('developer_id',$request->user_id)->whereIn('code', ['EAFA', 'ERFA', 'EEFA','EAFTM', 'ERFTM'])->where('past_status',0)->get();
        // dd($actions);
        if($actions != null)
        {
            foreach ($actions as $key => $action) {
            $action->authorized_by= Auth::id();
            $action->authorized_at= Carbon::now();
            $action->past_status = 1;
            $action->save();
            $authorize_by= User::where('id',$action->authorized_by)->first();
            $top_management= User::where('id',$evaluation->managements_id)->first();
            if($top_management == null)
            {
                $top_management = User::where('id', $evaluation_history->managements_id)->first();
            }
            $dev= User::where('id',$evaluation->user_id)->first();
                
            $past_action= new PendingActionPast();
            $past_action->item_name = $action->item_name;
            $past_action->code = $action->code;
            $past_action->serial = $action->serial;
            $past_action->action_id = $action->id;
            if($evaluation->employee_status == 1)
            {
                if($request->role_id == 15){
                    $past_action->heading= 'New PM '.$dev->name.' was authorize for real work by Top Management '.$authorize_by->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has authorized New PM <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
                }else{
                    $past_action->heading= 'New Developer '.$dev->name.' was authorize for real work by Top Management '.$authorize_by->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
                }
            }
            if($evaluation_history != null && $evaluation_history->employee_status == 2)
            {
                if($request->role_id == 15){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has extended the trial period for new Project Manager <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>!';
                }elseif($request->role_id == 16){
                    $past_action->heading= $action->heading;
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has extended the trial period for New Lead Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a>!';
                }else{
                    $past_action->heading= 'Top Management '.$top_management->name.' has extended & created a new task for the trial period for New Developer '.$dev->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has extended & created a new task for New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> from ';
                }
            }
            if ($evaluation->employee_status == 3) {
                if($request->role_id == 15){
                    $past_action->heading= 'New PM '.$dev->name.' was rejected for real work by Top Management '.$top_management->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has authorized New PM <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
                }else{
                    $past_action->heading= 'New Developer '.$dev->name.' was rejected for real work by Top Management '.$top_management->name.'!';
                    $past_action->message = 'Top Management <a href="'.route('employees.show',$top_management->id).'">'.$top_management->name.'</a> has authorized New Developer <a href="'.route('employees.show',$dev->id).'">'.$dev->name.'</a> for real work from ';
                }
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
        if(Auth::user()->role_id == 8){
            return response()->json([
                'url' => url('account/independent/tasks?status=one_more_week&user_id='.$evaluation->user_id),
                'status' => 200
            ]);
        }else{
            return response()->json([
                'url' => route('tasks.show', $actions[0]->task_id),
                'status' => 200
            ]);
        }
    }
    public function getEmployeeUser($id)
    {
        $evaluationUser = EmployeeEvaluation::select('employee_evaluations.*','employee_evaluation_tasks.lead_dev_id','users.id as added_by','users.name as added_by_name','users.image as added_by_img')
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
        $revision = TaskRevision::select('task_revisions.*', 'users.name as added_by_name')
        ->leftJoin('users', 'task_revisions.added_by','users.id')
        ->where('task_id',$id)
        ->get();
        
        return response()->json([
            'status' => 200,
            'data' => $revision
            ]);
    }

    public function totalRevision($id)
    {
        $tasks = Task::where('dependent_task_id', $id)->get()->pluck('id');
        $revisions = TaskRevision::whereIn('task_id', $tasks)->get();
        foreach($revisions as $revision)
        {
            $revision->task_heading = Task::where('id', $revision->task_id)->value('heading');
            $revision->added_by_name = User::where('id', $revision->added_by)->value('name');
        }
        return response()->json([
            'status' => 200,
            'data' => $revisions
        ]);
    }
    public function EmployeeEvaluationTask($id)
    {
        $tasks = EmployeeEvaluationTask::where('task_id', $id)->get();
        return response()->json([
            'status' => 200,
            'data' => $tasks
        ]);
    }
    public function EmployeeEvaluationHistory($id)
    {
        $history = EvaluationHistory::select('evaluation_histories.*', 'users.name as team_lead_name','role.role_id as roleId')
                ->leftJoin('users', 'evaluation_histories.team_lead_id', 'users.id')
                ->leftJoin('users as role', 'evaluation_histories.user_id', 'role.id')
                ->where('user_id', $id)
                ->get();
        return response()->json([
            'status' => 200,
            'data' => $history
        ]);
    }
    public function evaluationTotalTaskRevision($user_id, $round)
    {
        $evaluation_task = EmployeeEvaluationTask::where('user_id', $user_id)->where('round', $round)->get();
        $revision_count = TaskRevision::whereIn('task_id', $evaluation_task->pluck('task_id'))->count();
        $revisions = TaskRevision::whereIn('task_id', $evaluation_task->pluck('task_id'))->get();
        foreach($revisions as $revision)
        {
            $revision->task_heading = Task::where('id', $revision->task_id)->value('heading');
            $revision->added_by_name = User::where('id', $revision->added_by)->value('name');
        }
        return response()->json([
            'status' => 200,
            'revision_count' => $revision_count,
            'revisions' => $revisions
        ]);
    }

}
