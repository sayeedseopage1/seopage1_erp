<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingParentTasks;
use App\Models\TaskFile;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Helper\Files;
use App\Models\EmployeeEvaluationTask;
use App\Models\PendingParentTaskConversation;
use App\Models\SubTask;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use App\Notifications\ApproveIndependentTasksNotification;
use App\Notifications\IndependentTasksNotification;
use Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Notification;
use App\Models\WorkingEnvironment;


class IndependentTaskController extends AccountBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Auth::user()->role_id == 6 || Auth::user()->role_id == 13){
            abort(403);
        }
        $this->pageTitle = 'Independent Task';
        return view('independent-task.index',$this->data);
    }


    public function independentTaskGet(){

        $pendingParentTask = DB::table('pending_parent_tasks')
                            ->leftJoin('users as user', 'pending_parent_tasks.user_id', '=', 'user.id')
                            ->leftJoin('roles as userRole', 'user.role_id', '=', 'userRole.id')
                            ->leftJoin('users as addedBy', 'pending_parent_tasks.added_by', '=', 'addedBy.id')
                            ->leftJoin('roles as addedByRole', 'addedBy.role_id', '=', 'addedByRole.id')
                            ->leftJoin('users as authorizeBy', 'pending_parent_tasks.authorize_by', '=', 'authorizeBy.id')
                            ->leftJoin('users as client', 'pending_parent_tasks.client_id', '=', 'client.id')
                            ->select('pending_parent_tasks.login_url','pending_parent_tasks.reference_site','pending_parent_tasks.password','pending_parent_tasks.user_name',

                            'pending_parent_tasks.id','pending_parent_tasks.heading','pending_parent_tasks.description','pending_parent_tasks.start_date','pending_parent_tasks.due_date','pending_parent_tasks.category_id','pending_parent_tasks.board_column_id','pending_parent_tasks.need_authorization','pending_parent_tasks.approval_status','user.id as assign_to_id','user.name as assign_to_name','user.image as assign_to_avator','userRole.name as assign_to_designation','pending_parent_tasks.u_id','pending_parent_tasks.independent_task_status','addedBy.id as assign_by_id','addedBy.name as assign_by_name','addedBy.image as assign_by_avator','addedByRole.name as assign_by_designation','authorizeBy.id as authorize_by_id','authorizeBy.name as authorize_by_name','authorizeBy.image as authorize_by_avator','client.id as existing_client_id','client.name as existing_client_name','pending_parent_tasks.client_name as new_client','pending_parent_tasks.comment','pending_parent_tasks.created_at as creation_date')
                            ->where('pending_parent_tasks.independent_task_status', '1')
                            ->get();

        return response()->json([
            'pendingParentTask'=> $pendingParentTask,
            'status'=>200
        ]);
    }

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
        // dd($request->all());
        $ppTask = new PendingParentTasks();
        $ppTask->heading = $request->heading;
        $ppTask->description = $request->description;
        $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $ppTask->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $ppTask->due_date = $dueDate;
        $ppTask->category_id = $request->category_id;
        $ppTask->priority = $request->priority;
        $ppTask->board_column_id = $request->board_column_id;
        $ppTask->user_id = $request->user_id;
        $ppTask->added_by = Auth::user()->id;
        $ppTask->u_id = $request->id;
        $ppTask->login_url = $request->login_url;
        $ppTask->user_name = $request->user_name;
        $ppTask->password = $request->password;
        $ppTask->reference_site = $request->reference_site;
        $ppTask->independent_task_status = $request->isIndependent;
        $ppTask->save();

        if ($request->hasFile('file')) {
            $files = $request->file('file');
            $destinationPath = storage_path('app/public/');
            $file_name = [];

            foreach ($files as $file) {
                $ppTaskFile = new TaskFile();
                $ppTaskFile->task_id = $ppTask->id;
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                array_push($file_name, $filename);
                $ppTaskFile->user_id = $ppTask->user_id;
                $ppTaskFile->filename = $filename;
                $ppTaskFile->hashname = $filename;
                $ppTaskFile->size = $file->getSize();
                $ppTaskFile->save();

                Storage::disk('s3')->put('/' . $filename, file_get_contents($file));

                $this->logTaskActivity($ppTask->id, $ppTask->user_id, 'fileActivity', $ppTask->board_column_id);
            }
        }

        if(Auth::user()->role_id == 8 && $request->user_id !=null){
            $evaluation = EmployeeEvaluationTask::where('user_id',$request->user_id)->first();
            if($evaluation->managements_decision == 'One more week'){
                $helper = new HelperPendingActionController();
                $helper->evaluationAuthTeamLead($evaluation->id);
            }
        }


        $users = User::where('role_id',1)->orWhere('role_id',8)->get();
            foreach($users as $user)
                {
                    Notification::send($user, new IndependentTasksNotification($ppTask));
                }

        return response()->json([
            'status'=>'success'
        ],200);
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
        if($request->approval_status == 1){
            $pendingParentTasks = PendingParentTasks::find($id);
            $pendingParentTasks->start_date = $request->start_date;
            $pendingParentTasks->due_date = $request->due_date;
            $pendingParentTasks->approval_status = $request->approval_status;
            $pendingParentTasks->comment = $request->comment;
            $pendingParentTasks->authorize_by = Auth::user()->id;
            if($request->client_id){
                $pendingParentTasks->client_id = $request->client_id;
            }else{
                $pendingParentTasks->client_name = $request->client;
            }
            $pendingParentTasks->save();
            // dd($pendingParentTasks);

            $independent_task = new Task();
            $independent_task->heading = $pendingParentTasks->heading;
            $independent_task->description = $pendingParentTasks->description;
            $independent_task->start_date = $pendingParentTasks->start_date;
            $independent_task->due_date = $pendingParentTasks->due_date;
            $independent_task->task_category_id = $pendingParentTasks->category_id;
            $independent_task->priority = $pendingParentTasks->priority;
            $independent_task->board_column_id = $pendingParentTasks->board_column_id;
            $independent_task->added_by = $pendingParentTasks->added_by;
            $independent_task->pp_task_id = $pendingParentTasks->id;
            $independent_task->u_id = $pendingParentTasks->u_id;
            $independent_task->independent_task_status = $pendingParentTasks->independent_task_status;
            if($pendingParentTasks->client_id !=null){
                $independent_task->client_id = $pendingParentTasks->client_id;
            }else{
                $independent_task->client_name = $pendingParentTasks->client_name;
            }
            $independent_task->created_by = $pendingParentTasks->added_by;
            $independent_task->added_by = $pendingParentTasks->added_by;
            $independent_task->save();

            if ($request->hasFile('file')) {
                $files = $request->file('file');
                $destinationPath = storage_path('app/public/');
                $file_name = [];

                foreach ($files as $file) {
                    $ppTaskFile = TaskFile::where('task_id',$pendingParentTasks->id);
                    $ppTaskFile->task_id = $independent_task->id;
                    $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                    array_push($file_name, $filename);
                    $ppTaskFile->user_id = $independent_task->user_id;;
                    $ppTaskFile->filename = $filename;
                    $ppTaskFile->hashname = $filename;
                    $ppTaskFile->size = $file->getSize();
                    $ppTaskFile->save();

                    Storage::disk('s3')->put('/' . $filename, file_get_contents($file));

                    $this->logTaskActivity($independent_task->id, $independent_task->user_id, 'fileActivity', $independent_task->board_column_id);
                }
            }

            $task_user = new TaskUser();
            $task_user->task_id = $independent_task->id;
            $task_user->user_id = $pendingParentTasks->user_id;
            $task_user->save();


            $user = User::where('id',$pendingParentTasks->user_id)->first();

            Notification::send($user, new ApproveIndependentTasksNotification($pendingParentTasks));


        }else{
            $pendingParentTasks = PendingParentTasks::find($id);
            $pendingParentTasks->start_date = $request->start_date;
            $pendingParentTasks->due_date = $request->due_date;
            $pendingParentTasks->approval_status = $request->approval_status;
            $pendingParentTasks->comment = $request->comment;
            $pendingParentTasks->authorize_by = Auth::user()->id;
            if($request->client_id){
                $pendingParentTasks->client_id = $request->client_id;
            }else{
                $pendingParentTasks->client_name = $request->client;
            }
            $pendingParentTasks->save();
        }


        return response()->json([
            'status'=>'success'
        ],200);
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

    public function independentTaskShow(){
        $this->pageTitle = 'Single Independent Task';
        return view('independent-task.show',$this->data);
    }


    public function get_independent_task_conversation_question(Request $request, $id){
        $conversations = DB::table('pending_parent_task_conversations')
                        ->leftJoin('users as createdBy','pending_parent_task_conversations.created_by','createdBy.id')
                        ->leftJoin('users as repliedBy','pending_parent_task_conversations.replied_by','repliedBy.id')
                        ->select('pending_parent_task_conversations.*','createdBy.id as created_by_id','createdBy.name as created_by_name','repliedBy.id as replied_by_id','repliedBy.name as replied_by_name')
                        ->where('pending_parent_task_id',$id)
                        ->get();

        return response()->json([
            'data'=> $conversations,
            'status'=>200
        ],200);
    }

    public function add_independent_task_conversation_question(Request $request){
        $conversation = new PendingParentTaskConversation();
        $conversation-> question = $request->question;
        $conversation-> pending_parent_task_id = $request->pending_parent_task_id;
        $conversation-> created_by = Auth::id();
        $conversation-> created_date = Carbon::now();

        $conversation->save();

        $data = PendingParentTaskConversation::where('pending_parent_task_conversations.pending_parent_task_id', $request->pending_parent_task_id)
                ->select([
                    "pending_parent_task_conversations.*",
                    'created_by_user.id as created_by_id',
                    'created_by_user.name as created_by_name',
                    'replied_by_user.id as replied_by_id',
                    'replied_by_user.name as replied_by_name',

                ])
                ->leftJoin('users as created_by_user', 'created_by_user.id', 'pending_parent_task_conversations.created_by')
                ->leftJoin('users as replied_by_user', 'replied_by_user.id', 'pending_parent_task_conversations.replied_by')

                ->get();

        return response()->json([
            'data'=> $data,
            'status'=>200
        ],200);

    }

    // update independent task update status
    public function updateIndependentTaskHasUpdateStatus(Request $request){
        // received all conversation on $request->data variable
        $conversations = $request->data;

        // update each conversation "has_update" & "seen" status
        foreach ($conversations as $conversation) {
            $query =  PendingParentTaskConversation::find($conversation["id"]);
            $query->has_update = false;
            $query->seen = true;
            $query->seen_date = Carbon::now();
            $query->save();
        }

        // response success message
        return response()->json([
            'message' => 'Conversion Status Successfully Updated.'
        ], 200);
    }

    public function update_independent_task_conversation_question_by_answer(Request $request){
        $data = $request->data;
        $pending_parent_task_id = $data[0]["pending_parent_task_id"];

        foreach ($data as $key => $value) {
            # code...
            $conversation = PendingParentTaskConversation::find($value["id"]);
            $conversation-> answer = $value["answer"];
            $conversation-> replied_by = Auth::id();
            $conversation-> replied_date = Carbon::now();
            $conversation->has_update = true;
            $conversation->save();
        }

        $conversations =  PendingParentTaskConversation::where('pending_parent_task_conversations.pending_parent_task_id', $pending_parent_task_id)
                                                ->select([
                                                    "pending_parent_task_conversations.*",
                                                    'created_by_user.id as created_by_id',
                                                    'created_by_user.name as created_by_name',
                                                    'replied_by_user.id as replied_by_id',
                                                    'replied_by_user.name as replied_by_name',

                                                ])
                                                ->leftJoin('users as created_by_user', 'created_by_user.id', 'pending_parent_task_conversations.created_by')
                                                ->leftJoin('users as replied_by_user', 'replied_by_user.id', 'pending_parent_task_conversations.replied_by')

                                                ->get();


        return response()->json([
            'data'=> $conversations,
            'status'=>200
        ],200);
    }


    public function independentTaskAll(Request $request){
       // dd($request);
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $assignee_to = $request->input('assignee_to', null);
        $assignee_by = $request->input('assignee_by', null);


        $clientId = $request->input('client_name', null);
      //  $projectId = $request->input('project_id', null);
        $status = $request->input('status', null);
      //  $date_filter_by = $request->input('date_filter_by', null);
        $tasks = DB::table('tasks')
                            ->leftJoin('users as assignedBy','tasks.added_by','assignedBy.id')
                            ->leftJoin('task_users','tasks.id','task_users.task_id')
                            ->leftJoin('users as assignedTo','task_users.user_id','assignedTo.id')
                            ->leftJoin('users as client','tasks.client_id','client.id')
                            ->leftJoin('taskboard_columns','tasks.board_column_id','taskboard_columns.id')
                            ->leftJoin('pending_parent_tasks','tasks.pp_task_id','pending_parent_tasks.id')
                            ->select('tasks.id','tasks.u_id','tasks.heading','tasks.description','tasks.start_date','tasks.due_date','taskboard_columns.id as board_column_id','taskboard_columns.column_name as board_column_name','taskboard_columns.label_color as board_column_label_color','assignedBy.id as assigned_by_id','assignedBy.name as assigned_by_name','assignedBy.image as assigned_by_avator','assignedTo.id as assigned_to_id','assignedTo.name as assigned_to_name','assignedTo.image as assigned_to_avator','client.id as existing_client_id','client.name as existing_client_name','client.image as existing_client_avator','tasks.client_name as new_client','pending_parent_tasks.created_at as creation_date',
                            DB::raw('(SELECT COUNT(sub_tasks.id) FROM sub_tasks WHERE sub_tasks.task_id = tasks.id) as subtasks_count'),
                            )
                            ->where('tasks.independent_task_status',1)
                            ->whereNull('tasks.subtask_id');
                          //  ->get();

                            if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                            {


                                $tasks = $tasks->whereDate('tasks.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'));

                            }else
                            {
                                if (!is_null($startDate)) {
                                    $tasks = $tasks->whereDate('tasks.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                                }
                                if (!is_null($endDate)) {
                                    $tasks = $tasks->whereDate('tasks.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                                }

                            }

                            if (!is_null($assignee_to)) {
                                $tasks = $tasks->where('task_users.user_id', $assignee_to);
                            }
                            if (!is_null($assignee_by)) {
                                $tasks = $tasks->where('tasks.added_by', $assignee_by);
                            }
                            // if (!is_null($pmId)) {
                            //     $tasks = $tasks->where('projects.pm_id', $pmId);
                            // }
                            if (!is_null($clientId)) {
                                $tasks = $tasks->where('tasks.client_name', $clientId)->orWhere('client.name',$clientId);
                            }

                            if(!is_null($status))
                            {
                                if($status == 11)
                                {
                                    $tasks = $tasks;

                                }elseif ($status== 10) {
                                    $tasks = $tasks->where('tasks.board_column_id','!=',4);
                                }elseif ($status == 1) {
                                    $tasks = $tasks->where('tasks.board_column_id',1);
                                }elseif ($status == 2) {
                                    $tasks = $tasks->where('tasks.board_column_id',2);
                                }elseif ($status == 3) {
                                    $tasks = $tasks->where('tasks.board_column_id',3);
                                }elseif ($status == 4) {
                                    $tasks = $tasks->where('tasks.board_column_id',4);
                                }elseif ($status == 6) {
                                    $tasks = $tasks->where('tasks.board_column_id',6);
                                }elseif ($status == 7) {
                                    $tasks = $tasks->where('tasks.board_column_id',7);
                                }elseif ($status == 8) {
                                    $tasks = $tasks->where('tasks.board_column_id',8);
                                }
                                elseif($status == 9) {
                                    $tasks = $tasks->where('tasks.board_column_id',9);
                                }

                            }
                            if(Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
                            {
                                $tasks = $tasks->where('task_users.user_id',Auth::id())->orderBy('tasks.created_at', 'desc')->get();

                            }else {
                                $tasks = $tasks->orderBy('tasks.created_at', 'desc')->get();
                            }

        return response()->json([
            'data'=>$tasks,
            'status'=>200
        ]);
    }

    public function clients()
    {
        $clients = Task::where('tasks.client_id','!=',null)->orWhere('tasks.client_name','!=',null)
        ->select(['tasks.client_name','tasks.client_id','client.id','client.name'])
        ->leftJoin('users as client','client.id','tasks.client_id')
        ->groupBy('tasks.client_name','tasks.client_id')
        ->get();
        return response()->json([
            'data'=>$clients,
            'status'=>200
        ]);
    }

    // GET All INDEPENDENT SUB TASKS
    public function independentAllSubTask(Request $request){

        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $assignee_to = $request->input('assignee_to', null);
        $assignee_by = $request->input('assignee_by', null);


        $clientId = $request->input('client_name', null);
      //  $projectId = $request->input('project_id', null);
        $status = $request->input('status', null);

        $sub_task = DB::table('sub_tasks')
            ->select('tasks.id','tasks.u_id','sub_tasks.title as heading','sub_tasks.description','sub_tasks.start_date','sub_tasks.due_date','taskboard_columns.id as board_column_id','taskboard_columns.column_name as board_column_name','taskboard_columns.label_color as board_column_label_color','assignedBy.id as assigned_by_id','assignedBy.name as assigned_by_name','assignedBy.image as assigned_by_avator','assignedTo.id as assigned_to_id','assignedTo.name as assigned_to_name','assignedTo.image as assigned_to_avator','client.id as existing_client_id','client.name as existing_client_name','client.image as existing_client_avator','tasks.client_name as new_client','pending_parent_tasks.created_at as creation_date',
            DB::raw('(SELECT (tasks.id) FROM tasks WHERE sub_tasks.task_id = tasks.id) as task_id'),
            DB::raw('(SELECT (tasks.heading) FROM tasks WHERE sub_tasks.task_id = tasks.id) as task_heading')
            )
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->leftJoin('users as assignedBy','sub_tasks.added_by','assignedBy.id')
            ->leftJoin('task_users','tasks.id','task_users.task_id')
            ->leftJoin('users as assignedTo','sub_tasks.assigned_to','assignedTo.id')
            ->leftJoin('users as client','tasks.client_id','client.id')
            ->leftJoin('taskboard_columns','tasks.board_column_id','taskboard_columns.id')
            ->leftJoin('pending_parent_tasks','tasks.pp_task_id','pending_parent_tasks.id')
            ->where('tasks.independent_task_status',1);
            // ->get();

            if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
            {
                $sub_task = $sub_task->whereDate('sub_tasks.created_at', '=', Carbon::parse($startDate)->format('Y-m-d'));

            }else
            {
                if (!is_null($startDate)) {
                    $sub_task = $sub_task->whereDate('sub_tasks.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                }
                if (!is_null($endDate)) {
                    $sub_task = $sub_task->whereDate('sub_tasks.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                }

            }

            if (!is_null($assignee_to)) {
                $sub_task = $sub_task->where('task_users.user_id', $assignee_to);
            }
            if (!is_null($assignee_by)) {
                $sub_task = $sub_task->where('sub_tasks.added_by', $assignee_by);
            }
            if (!is_null($clientId)) {
                $sub_task = $sub_task->where('tasks.client_name', $clientId)->orWhere('client.name',$clientId);
            }

            if(!is_null($status))
            {
                if($status == 11)
                {
                    $sub_task = $sub_task;

                }elseif ($status== 10) {
                    $sub_task = $sub_task->where('tasks.board_column_id','!=',4);
                }elseif ($status == 1) {
                    $sub_task = $sub_task->where('tasks.board_column_id',1);
                }elseif ($status == 2) {
                    $sub_task = $sub_task->where('tasks.board_column_id',2);
                }elseif ($status == 3) {
                    $sub_task = $sub_task->where('tasks.board_column_id',3);
                }elseif ($status == 4) {
                    $sub_task = $sub_task->where('tasks.board_column_id',4);
                }elseif ($status == 6) {
                    $sub_task = $sub_task->where('tasks.board_column_id',6);
                }elseif ($status == 7) {
                    $sub_task = $sub_task->where('tasks.board_column_id',7);
                }elseif ($status == 8) {
                    $sub_task = $sub_task->where('tasks.board_column_id',8);
                }
                elseif($status == 9) {
                    $sub_task = $sub_task->where('tasks.board_column_id',9);
                }

            }
            if(Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
            {
                $sub_task = $sub_task->where('task_users.user_id',Auth::id())->orderBy('sub_tasks.created_at', 'desc')->get();
            }
            else {
                $sub_task = $sub_task->orderBy('sub_tasks.created_at', 'desc')->get();
            }

        return response()->json([
            'data'=>$sub_task,
            'status'=>200
        ]);
    }


    // GET INDEPENDENT SUB TASKS BY TASK ID
    public function independentSubTask($task_id){
        $sub_task = DB::table('sub_tasks')
            ->select('tasks.id','tasks.u_id','sub_tasks.title as heading','sub_tasks.description','sub_tasks.start_date','sub_tasks.due_date','taskboard_columns.id as board_column_id','taskboard_columns.column_name as board_column_name','taskboard_columns.label_color as board_column_label_color','assignedBy.id as assigned_by_id','assignedBy.name as assigned_by_name','assignedBy.image as assigned_by_avator','assignedTo.id as assigned_to_id','assignedTo.name as assigned_to_name','assignedTo.image as assigned_to_avator','client.id as existing_client_id','client.name as existing_client_name','client.image as existing_client_avator','tasks.client_name as new_client','pending_parent_tasks.created_at as creation_date')
            ->leftJoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->leftJoin('users as assignedBy','sub_tasks.added_by','assignedBy.id')
            ->leftJoin('task_users','tasks.id','task_users.task_id')
            ->leftJoin('users as assignedTo','sub_tasks.assigned_to','assignedTo.id')
            ->leftJoin('users as client','tasks.client_id','client.id')
            ->leftJoin('taskboard_columns','tasks.board_column_id','taskboard_columns.id')
            ->leftJoin('pending_parent_tasks','tasks.pp_task_id','pending_parent_tasks.id')
            ->where('tasks.independent_task_status',1)
            ->where('sub_tasks.task_id',$task_id)
            ->get();

        return response()->json([
            'data'=>$sub_task,
            'status'=>200
        ]);
    }

}
