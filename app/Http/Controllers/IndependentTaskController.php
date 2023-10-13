<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PendingParentTasks;
use App\Models\TaskFile;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Helper\Files;
use Auth;

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
        $this->pendingParentTask = PendingParentTasks::where('independent_task_status','1')->get();
        return view('independent-task.index',$this->data);
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
        $pendingParentTasks = new PendingParentTasks();
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
                $file = new TaskFile();
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
