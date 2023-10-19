<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingParentTasks;
use App\Models\TaskFile;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Helper\Files;
use App\Models\PendingParentTaskConversation;
use App\Models\Task;
use App\Models\TaskUser;
use App\Models\User;
use App\Notifications\ApproveIndependentTasksNotification;
use App\Notifications\IndependentTasksNotification;
use Auth;
use Illuminate\Support\Facades\DB;

use Notification;


class IndependentTaskController extends AccountBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
                            ->select('pending_parent_tasks.id','pending_parent_tasks.heading','pending_parent_tasks.description','pending_parent_tasks.start_date','pending_parent_tasks.due_date','pending_parent_tasks.category_id','pending_parent_tasks.board_column_id','pending_parent_tasks.need_authorization','pending_parent_tasks.approval_status','user.id as assign_to_id','user.name as assign_to_name','user.image as assign_to_avator','userRole.name as assign_to_designation','pending_parent_tasks.u_id','pending_parent_tasks.independent_task_status','addedBy.id as assign_by_id','addedBy.name as assign_by_name','addedBy.image as assign_by_avator','addedByRole.name as assign_by_designation','authorizeBy.id as authorize_by_id','authorizeBy.name as authorize_by_name','authorizeBy.image as authorize_by_avator','client.id as existing_client_id','client.name as existing_client_name','pending_parent_tasks.client_name as new_client','pending_parent_tasks.comment','pending_parent_tasks.created_at as creation_date')
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
        $ppTask->independent_task_status = $request->isIndependent;
        $ppTask->save();

        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new TaskFile();
                $file->task_id = $ppTask->id;

                $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $ppTask->id);

                $file->user_id = $ppTask->user_id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                $this->logTaskActivity($ppTask->id, $ppTask->user_id, 'fileActivity', $ppTask->board_column_id);
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
            $independent_task->save();


            if ($request->hasFile('file')) {

                foreach ($request->file as $fileData) {
                    $file = TaskFile::where('task_id',$pendingParentTasks->id);
                    $file->task_id = $independent_task->id;

                    $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $independent_task->id);

                    $file->user_id = $independent_task->user_id;
                    $file->filename = $fileData->getClientOriginalName();
                    $file->hashname = $filename;
                    $file->size = $fileData->getSize();
                    $file->save();

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


    public function independentTaskAll(){
        $allIndependentTasks = DB::table('tasks')
                            ->leftJoin('users as assignedBy','tasks.added_by','assignedBy.id')
                            ->leftJoin('task_users','tasks.id','task_users.task_id')
                            ->leftJoin('users as assignedTo','task_users.user_id','assignedTo.id')
                            ->leftJoin('users as client','tasks.client_id','client.id')
                            ->leftJoin('taskboard_columns','tasks.board_column_id','taskboard_columns.id')
                            ->leftJoin('pending_parent_tasks','tasks.pp_task_id','pending_parent_tasks.id')
                            ->select('tasks.id','tasks.u_id','tasks.heading','tasks.description','tasks.start_date','tasks.due_date','taskboard_columns.id as board_column_id','taskboard_columns.column_name as board_column_name','taskboard_columns.label_color as board_column_label_color','assignedBy.id as assigned_by_id','assignedBy.name as assigned_by_name','assignedBy.image as assigned_by_avator','assignedTo.id as assigned_to_id','assignedTo.name as assigned_to_name','assignedTo.image as assigned_to_avator','client.id as existing_client_id','client.name as existing_client_name','client.image as existing_client_avator','tasks.client_name as new_client','pending_parent_tasks.created_at as creation_date')
                            ->where('tasks.independent_task_status',1)
                            ->get();
        return response()->json([
            'data'=>$allIndependentTasks,
            'status'=>200
        ]);
    }


}
