<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingParentTasks;
use App\Models\TaskFile;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Helper\Files;
use App\Models\User;
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
                            ->select('pending_parent_tasks.id','pending_parent_tasks.heading','pending_parent_tasks.description','pending_parent_tasks.start_date','pending_parent_tasks.due_date','pending_parent_tasks.category_id','pending_parent_tasks.board_column_id','pending_parent_tasks.need_authorization','pending_parent_tasks.approval_status','user.id as assign_to_id','user.name as assign_to_name','user.image as assign_to_avator','userRole.name as assign_to_designation','pending_parent_tasks.u_id','pending_parent_tasks.independent_task_status','addedBy.id as assign_by_id','addedBy.name as assign_by_name','addedBy.image as assign_by_avator','addedByRole.name as assign_by_designation','pending_parent_tasks.created_at as creation_date')
                            ->where('pending_parent_tasks.independent_task_status', '1')
                            ->get();


        return response()->json([
            'pendingParentTask'=> $pendingParentTask,
            'status'=>200
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

     public function independentTaskGet(){

        $pending_parent_task = DB::table('pending_parent_tasks')
                            ->leftJoin('users as user', 'pending_parent_tasks.user_id', '=', 'user.id')
                            ->leftJoin('roles as userRole', 'user.role_id', '=', 'userRole.id')
                            ->leftJoin('users as addedBy', 'pending_parent_tasks.added_by', '=', 'addedBy.id')
                            ->leftJoin('roles as addedByRole', 'addedBy.role_id', '=', 'addedByRole.id')
                            ->select('pending_parent_tasks.id','pending_parent_tasks.heading','pending_parent_tasks.description','pending_parent_tasks.start_date','pending_parent_tasks.due_date','pending_parent_tasks.category_id','pending_parent_tasks.board_column_id','pending_parent_tasks.need_authorization','pending_parent_tasks.approval_status','user.id as assign_to_id','user.name as assign_to_name','user.image as assign_to_avator','userRole.name as assign_to_designation','pending_parent_tasks.u_id','pending_parent_tasks.independent_task_status','addedBy.id as assign_by_id','addedBy.name as assign_by_name','addedBy.image as assign_by_avator','addedByRole.name as assign_by_designation','pending_parent_tasks.created_at as creation_date')
                            ->where('pending_parent_tasks.independent_task_status', '1')
                            ->get();


        return response()->json([
            'pendingParentTask'=> $pending_parent_task,
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


        // $users = User::where('role_id',1)->orWhere('role_id',8)->get();
        //     foreach($users as $user)
        //         {
        //             Notification::send($user, new IndependentTasksNotification($ppTask));
        //         }

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
        $pendingParentTasks = PendingParentTasks::select('id','heading','description','start_date','due_date','category_id','board_column_id','user_id','added_by','u_id','independent_task_status')->where('id',$id)->first();

        return response()->json([
            'pendingParentTasks'=>$pendingParentTasks,
            'status'=>200
        ]);
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
        $pendingParentTasks = PendingParentTasks::find($id);
        $pendingParentTasks->heading = $request->heading;
        $pendingParentTasks->description = $request->description;
        $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $pendingParentTasks->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $pendingParentTasks->due_date = $dueDate;
        $pendingParentTasks->category_id = $request->category_id;
        $pendingParentTasks->priority = $request->priority;
        $pendingParentTasks->board_column_id = $request->board_column_id;
        $pendingParentTasks->user_id = $request->user_id;
        $pendingParentTasks->added_by = Auth::user()->id;
        $pendingParentTasks->u_id = $request->id;
        $pendingParentTasks->independent_task_status = $request->isIndependent;
        $pendingParentTasks->save();

        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = TaskFile::where('task_id',$pendingParentTasks->id)->first();
                $file->task_id = $pendingParentTasks->id;

                $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $pendingParentTasks->id);

                $file->user_id = $pendingParentTasks->user_id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                $this->logTaskActivity($pendingParentTasks->id, $pendingParentTasks->user_id, 'fileActivity', $pendingParentTasks->board_column_id);
            }
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
}
