<?php

namespace App\Http\Controllers;

// use DB;
use Auth;
use Validator;
use App\Models\EmployeeEvaluation;
use App\Models\EmployeeEvaluationTask;
use Notification;
use Carbon\Carbon;
use App\Models\Role;
use App\Models\Task;
use App\Models\User;
use App\Helper\Files;
use App\Helper\Reply;
use App\Models\Project;
use App\Models\SubTask;
use App\Models\TaskFile;
use App\Models\TaskType;
use App\Models\TaskUser;
use Illuminate\Http\Request;
use App\Models\PendingAction;
use App\Models\GraphicTaskFile;
use App\Models\PendingActionPast;
use App\Models\GraphicWorkDetails;
use Illuminate\Support\Facades\DB;
use App\Models\AuthorizationAction;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\SubTask\StoreSubTask;
use App\Models\EvaluationHistory;
use App\Notifications\PrimaryPageNotification;

class SubTaskController extends AccountBaseController
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->subTask = SubTask::with(['files'])->findOrFail($id);
        return view('tasks.sub_tasks.edit', $this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->subTask = SubTask::with(['files'])->findOrFail($id);
        return view('tasks.sub_tasks.detail', $this->data);
    }

    /**
     * @param StoreSubTask $request
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function store(Request $request)
    {
        // dd($request);
        try {
            //  DB::beginTransaction();
            $setting = global_setting();
            $task = Task::find(request()->task_id);

            $startDate = $task->start_date->format($setting->date_format);
            $dueDate = !is_null($task->due_date) ? $task->due_date->format($setting->date_format) : '';
            if($task->independent_task_status != null)
            {
                $task_title = Task::where('project_id', $task->project_id)
                ->where('heading', $request->title)
                ->first();

                if ($task_title !== null) {
                    return response()->json(['title' => ['Task title should be unique on this project']], 422);
                }
            }else
            {
                $task_title = Task::where('id', $task->id)
                ->where('heading', $request->title)
                ->first();

                if ($task_title !== null) {
                    return response()->json(['title' => ['Task title should be unique on this project']], 422);
                }
            }

            if($task->independent_task_status == 1){
                $rules = [
                    'title' => 'required',
                    'description' => 'required',
                    'user_id' => 'required',
                ];
            }else
            {
                $rules = [
                    'title' => 'required',
                    'estimate_hours' => 'required',
                    'estimate_minutes' => 'required',
                    'description' => 'required',
                    'user_id' => 'required',
                ];

            }

            DB::beginTransaction();
            $validator = Validator::make($request->all(), $rules);
            if ($request->start_date == "Invalid Date" ) {
                return response($validator->errors(), 422);
            };
            if ($request->end_date == "Invalid Date") {
                return response($validator->errors(), 422);
            };


            $dueDateRule = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:' . $startDate;

            !is_null($task->due_date) ? $dueDateRule . '|before_or_equal:' . $task->due_date : $dueDateRule;

            if ($task->due_date) {
                $dueDate = $task->due_date->format($setting->date_format);
                $dueDateRule .= '|before_or_equal:' . $dueDate;
            }

            $rules['start_date'] = $dueDateRule;
            $rules['due_date'] = !is_null(request()->start_date) ? ($dueDateRule . '|after_or_equal:' . Carbon::createFromFormat($setting->date_format, request()->start_date)->format($setting->date_format)) : $dueDateRule;

            if ($validator->fails()) {
                return response($validator->errors(), 422);
            }

            $check_estimation = Task::where('id', $request->task_id)->first();
            $parent_task_minutes = $check_estimation->estimate_hours * 60;
            $total_parent_tasks_minutes= $parent_task_minutes + $check_estimation->estimate_minutes;
            $sub_tasks_hours= Subtask::join('tasks','tasks.subtask_id','sub_tasks.id')->where('sub_tasks.task_id',$request->task_id)
                ->sum('tasks.estimate_hours');
            $sub_tasks_minutes= Subtask::join('tasks','tasks.subtask_id','sub_tasks.id')->where('sub_tasks.task_id',$request->task_id)
                ->sum('tasks.estimate_minutes');

            $total_subtasks_minutes = $sub_tasks_hours * 60 + $sub_tasks_minutes;

            $hours = $request->estimate_hours * 60;
            $minutes = $request->estimate_minutes;
            $total_minutes = $hours + $minutes;
        //  dd($total_parent_tasks_minutes,$total_subtasks_minutes,$total_minutes);
            if($task->independent_task_status != 1)
            {
                if (($total_parent_tasks_minutes - $total_subtasks_minutes) - $total_minutes < 0) {
                    return response()->json([
                        "message" => "The given data was invalid.",
                        "errors" => [
                            "hours" => [
                                "Estimate hours cannot exceed from project allocation hours !"
                            ]
                        ]
                    ], 422);
                }
                if($total_minutes < 1)
                {
                    return response()->json([
                        "message" => "The given data was invalid.",
                        "errors" => [
                            "hours" => [
                                "Estimate hours and minutes cannot be 0 !"
                            ]
                        ]
                    ], 422);
                }
            }

            // $this->addPermission = user()->permission('add_sub_tasks');
            $task = Task::findOrFail($request->task_id);
            $taskUsers = $task->users->pluck('id')->toArray();

            // abort_403(!($this->addPermission == 'all'
            //     || ($this->addPermission == 'added' && $task->added_by == user()->id)
            //     || ($this->addPermission == 'owned' && in_array(user()->id, $taskUsers))
            //     || ($this->addPermission == 'added' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
            // ));

            $subTask = new SubTask();
            $subTask->title = $request->title;
            $subTask->task_id = $request->task_id;
            $subTask->description = str_replace('<p><br></p>', '', trim($request->description));

            if ($request->start_date != '' && $request->due_date != '') {
                $subTask->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
                $subTask->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
            }

            $subTask->assigned_to = $request->user_id ? $request->user_id : null;

            $subTask->save();
            $actions = PendingAction::where('code','NTTA')->where('developer_id',$request->user_id)->where('past_status',0)->get();
            if($actions != null)
            {
                foreach ($actions as $key => $action) {

                    $action->authorized_by= Auth::id();
                    $action->authorized_at= Carbon::now();
                    $action->past_status = 1;
                    $action->save();
                
                    $authorize_by= User::where('id',$action->authorized_by)->first();
                
                    $past_action= new PendingActionPast();
                    $past_action->item_name = $action->item_name;
                    $past_action->code = $action->code;
                    $past_action->serial = $action->serial;
                    $past_action->action_id = $action->id;
                    $past_action->heading = $action->heading;
                    $past_action->message = $action->message . ' assigned by <a href="'.route('employees.show',$authorize_by->id).'">'.$authorize_by->name.'</a>';
                //  $past_action->button = $action->button;
                    $past_action->timeframe = $action->timeframe;
                    $past_action->authorization_for = $action->authorization_for;
                    $past_action->authorized_by = $action->authorized_by;
                    $past_action->authorized_at = $action->authorized_at;
                    $past_action->expired_status = $action->expired_status;
                    $past_action->past_status = $action->past_status;
                    $past_action->project_id = $action->project_id;
                    $past_action->developer_id = $action->developer_id;
                    $past_action->client_id = $action->client_id;
                //  $past_action->milestone_id = $action->milestone_id;
                    $past_action->save();
                }
            }

            $parent_task_count= Subtask::where('task_id',$subTask->task_id)->count();
        //  dd($parent_task_count);
            if($parent_task_count > 0)
            {
                $update_parent_task= Task::where('id',$subTask->task_id)->first();
                $update_parent_task->board_column_id = 3;
                $update_parent_task->save();
            // dd($update_parent_task);

                //need pending action 
                $actions = PendingAction::where('code','NTA')->where('past_status',0)->where('task_id',$update_parent_task->id)->get();
                if($actions != null)
                {
                    foreach ($actions as $key => $action) {
                        $project= Project::where('id',$update_parent_task->project_id)->first();
                        $pm= User::where('id',$project->pm_id)->first();
                        $role= Role::where('id',$pm->role_id)->first();
                        $client= User::where('id',$project->client_id)->first();
                        $action->authorized_by= Auth::id();
                        $action->authorized_at= Carbon::now();
                        $action->past_status = 1;
                        $action->save();
                        // $project_manager= User::where('id',$project->pm_id)->first();
                        // $client= User::where('id',$project->client_id)->first();
                        $authorize_by= User::where('id',$action->authorized_by)->first();

                        $past_action= new PendingActionPast();
                        $past_action->item_name = $action->item_name;
                        $past_action->code = $action->code;
                        $past_action->serial = $action->serial;
                        $past_action->action_id = $action->id;
                        $past_action->heading = $action->heading;
                        $past_action->message =  'New task <a href="'.route('tasks.show',$task->id).'">'.$update_parent_task->name.'</a> assigned from '.$role->name.' <a href="'.route('employees.show',$pm->id).'">'.$pm->name.'</a> for client <a href="'.route('employees.show',$client->id).'">'.$client->name.'</a> has been broken into subtasks and assigned to developers!';
                    //   $past_action->button = $action->button;
                        $past_action->timeframe = $action->timeframe;
                        $past_action->authorization_for = $action->authorization_for;
                        $past_action->authorized_by = $action->authorized_by;
                        $past_action->authorized_at = $action->authorized_at;
                        $past_action->expired_status = $action->expired_status;
                        $past_action->past_status = $action->past_status;
                        $past_action->project_id = $action->project_id;
                        $past_action->task_id = $action->task_id;
                        $past_action->client_id = $action->client_id;
                        $past_action->milestone_id = $action->milestone_id;
                        $past_action->save();
                        // dd($past_action);
                    }
                }
                //need pending action
            }

            $task_id = Task::where('id', $request->task_id)->first();
            $task_s = new Task();
            if($task->independent_task_status == 1)
            {
                $task_s->independent_task_status = 1;
            }
            $task_s->task_short_code = $task_id->task_short_code . '-' . $subTask->id;
            $task_s->heading = $subTask->title;
            $task_s->description = str_replace('<p><br></p>', '', trim($request->description));
            if ($request->start_date != '' && $request->due_date != '') {
                $task_s->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
                $task_s->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
            }
            $task_s->project_id = $task_id->project_id;
            $task_s->task_category_id = $request->task_category_id;

            $task_s->priority = $request->priority;
            $task_s->is_private = $request->has('is_private') ? 1 : 0;
            $task_s->billable = $request->has('billable') && $request->billable ? 1 : 0;
            $task_s->estimate_hours = $request->estimate_hours;
            $task_s->estimate_minutes = $request->estimate_minutes;
            $task_s->repeat = $request->repeat ? 1 : 0;
            $task_s->milestone_id = $request->milestone_id;
            $total_hours = $request->estimate_hours * 60;
            $total_minutes = $request->estimate_minutes;
            $total_in_minutes = $total_hours + $total_minutes;
            $task_s->estimate_time_left_minutes = $total_in_minutes;

            if ($request->has('repeat')) {
                $task_s->repeat_count = $request->repeat_count;
                $task_s->repeat_type = $request->repeat_type;
                $task_s->repeat_cycles = $request->repeat_cycles;
            }

            $task_s->board_column_id = 2;
            $task_s->task_status = "pending";
            $task_s->dependent_task_id = $request->task_id;
            $task_s->subtask_id = $subTask->id;

            $task_s->added_by = Auth::id();
            $task_s->created_by= Auth::id();
            $task_s->pp_task_id = $task_id->pp_task_id;
            if($task->independent_task_status == 1)
            {
                $task_s->independent_task_status = 1;
                $task_s->client_id = $task->client_id;
                $task_s->client_name = $task->client_name;
            }

            // Create UI Work Sub-Task Details
            if($request->category_id == 5){
                $task_s->cms = $request->cms??null;
                $task_s->theme_name = $request->theme_name??null;
                $task_s->theme_template_library_link = $request->theme_template_library_link??null;
            }
            $task_s->save();

            // Create Graphic Work Sub-Task Details
            if($request->category_id == 7){
                $graphicWorkDetails = GraphicWorkDetails::create([
                    'task_id' => $task_s->id,
                    'type_of_graphic_work_id' => $request->type_of_graphic_work_id,
                    'type_of_logo' => $request->type_of_logo ?? null,
                    'brand_name' => $request->brand_name ?? null,
                    'number_of_versions' => $request->number_of_versions ?? null,
                    'file_types_needed' => $request->file_types_needed ?? null,
                    'design_instruction' => $request->design_instruction ?? null,
                    'reference' => $request->reference ?? null,
                    'font_name' => $request->font_name ?? null,
                    'font_url' => $request->font_url ?? null,
                    'primary_color' => $request->primary_color ?? null,
                    'primary_color_description' => $request->primary_color_description ?? null,
                    'secondary_colors' => $request->secondary_colors ?? null,
                    'workable_url' => $request->workable_url ?? null,
                    'file_extensions' => $request->file_extensions ?? null
                ]);

                // attach_text_files
                if ($request->hasFile('attach_text_files')) {
                    $files = $request->file('attach_text_files');
                    foreach ($files as $file) {
                        $graphicTaskFile = new GraphicTaskFile();
                        $graphicTaskFile->task_id = $task_s->id;
                        $graphicTaskFile->graphic_work_detail_id = $graphicWorkDetails->id;
                        $graphicTaskFile->file_type = 1;
                        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                        $graphicTaskFile->user_id = $this->user->id;
                        $graphicTaskFile->filename = $filename;
                        $graphicTaskFile->hashname = $filename;
                        $graphicTaskFile->size = $file->getSize();
                        $graphicTaskFile->save();
                        Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                    }
                }

                // workable_image_files
                if ($request->hasFile('workable_image_files')) {
                    $files = $request->file('workable_image_files');
                    foreach ($files as $file) {
                        $graphicTaskFile = new GraphicTaskFile();
                        $graphicTaskFile->task_id = $task_s->id;
                        $graphicTaskFile->graphic_work_detail_id = $graphicWorkDetails->id;
                        $graphicTaskFile->file_type = 2;
                        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                        $graphicTaskFile->user_id = $this->user->id;
                        $graphicTaskFile->filename = $filename;
                        $graphicTaskFile->hashname = $filename;
                        $graphicTaskFile->size = $file->getSize();
                        $graphicTaskFile->save();
                        Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                    }
                }

                // workable_image_or_video_files
                if ($request->hasFile('workable_image_or_video_files')) {
                    $files = $request->file('workable_image_or_video_files');
                    foreach ($files as $file) {
                        $graphicTaskFile = new GraphicTaskFile();
                        $graphicTaskFile->task_id = $task_s->id;
                        $graphicTaskFile->graphic_work_detail_id = $graphicWorkDetails->id;
                        $graphicTaskFile->file_type = 3;
                        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                        $graphicTaskFile->user_id = $this->user->id;
                        $graphicTaskFile->filename = $filename;
                        $graphicTaskFile->hashname = $filename;
                        $graphicTaskFile->size = $file->getSize();
                        $graphicTaskFile->save();
                        Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                    }
                }

                // brand_guideline_files
                if ($request->hasFile('brand_guideline_files')) {
                    $files = $request->file('brand_guideline_files');
                    foreach ($files as $file) {
                        $graphicTaskFile = new GraphicTaskFile();
                        $graphicTaskFile->task_id = $task_s->id;
                        $graphicTaskFile->graphic_work_detail_id = $graphicWorkDetails->id;
                        $graphicTaskFile->file_type = 4;
                        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                        $graphicTaskFile->user_id = $this->user->id;
                        $graphicTaskFile->filename = $filename;
                        $graphicTaskFile->hashname = $filename;
                        $graphicTaskFile->size = $file->getSize();
                        $graphicTaskFile->save();
                        Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                    }
                }

                // reference_files
                if ($request->hasFile('reference_files')) {
                    $files = $request->file('reference_files');
                    foreach ($files as $file) {
                        $graphicTaskFile = new GraphicTaskFile();
                        $graphicTaskFile->task_id = $task_s->id;
                        $graphicTaskFile->graphic_work_detail_id = $graphicWorkDetails->id;
                        $graphicTaskFile->file_type = 5;
                        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                        $graphicTaskFile->user_id = $this->user->id;
                        $graphicTaskFile->filename = $filename;
                        $graphicTaskFile->hashname = $filename;
                        $graphicTaskFile->size = $file->getSize();
                        $graphicTaskFile->save();
                        Storage::disk('s3')->put('/' . $filename, file_get_contents($file));
                    }
                }
            }

            $task_type = new TaskType();
            $task_type->task_id= $task_s->id;
            $task_type->page_type= $request->page_type;
            $task_type->task_type= $request->task_type;
            if($request->page_type == 'Primary Page Development')
            {
                $task_type->authorization_status= 0;
                $helper = new HelperPendingActionController();
                $helper->PrimaryPageAuthorization($task_s);
            }
            $task_type->page_name= $request->page_name;
            $task_type->page_url= $request->page_url;
            $task_type->task_type_other= $request->task_type_other;
            $task_type->page_type_name= $request->page_type_name;
            $task_type->existing_design_link = $request->existing_design_link;
            $task_type->number_of_pages= $request->number_of_pages;
            $task_type->save();

            $topManagement = User::where('role_id', 1)->get();

            // foreach ($topManagement as $user) {
            //     Notification::send($user, new PrimaryPageNotification($task_type));
            // }


            // $task_user= new TaskUser();
            // $task_user->task_id= $request->task_id;
            // $task_user->user_id= $request->user_id ? $request->user_id : null;
            //
            // $task_user->save();

            $hours_s = $request->estimate_hours * 60;
            $minutes_s = $request->estimate_minutes;
            $total_minutes_s = $hours_s + $minutes_s;


            $parent_task = Task::where('id', $subTask->task_id)->first();
            $parent_task_update = Task::find($parent_task->id);
            $parent_task_update->estimate_time_left_minutes = $parent_task->estimate_time_left_minutes - $total_minutes_s;
            $parent_task_update->save();


            if ($request->hasFile('file')) {
                $files = $request->file('file');
                $destinationPath = storage_path('app/public/');
                $file_name = [];

                foreach ($files as $file) {
                    $taskFile = new TaskFile();
                    $taskFile->task_id = $task_s->id;
                    $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                    array_push($file_name, $filename);
                    $taskFile->user_id = $this->user->id;
                    $taskFile->filename = $filename;
                    $taskFile->hashname = $filename;
                    $taskFile->size = $file->getSize();
                    $taskFile->save();

                    Storage::disk('s3')->put('/' . $filename, file_get_contents($file));

                    $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
                }
            }
            // /dd($parent_task, $subTask,$file);
            $helper = new HelperPendingActionController();


            $helper->NewTaskAssign($task_s);
            // $actions = PendingAction::where('serial','NTTAx'.$request->user_id)->where('past_status',0)->get();
            // dd($actions);
            if($task->project_id != null){
                $assigned_to = User::find($subTask->assigned_to);
                $text = 'Subtask ' .$subTask->title. ' has been created against task ' . $parent_task->heading . ' and assigned to ' . $assigned_to->name;
                $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
                $this->logProjectActivity($task->project_id, $link);
            }
            
            /**EMPLOYEE EVALUATION START */
            $taskFind = Task::where('subtask_id',$subTask->id)->where('u_id',null)->where('independent_task_status',1)->first(); //Find SubTask
            if($taskFind != null){
                $task_user = User::where('id', $subTask->assigned_to)->first();
                if($task_user->role_id == 14){
                    $evaluation = EmployeeEvaluation::where('user_id', $subTask->assigned_to)->first();
                    if ($evaluation->start_date == null) {
                        $evaluation->start_date = Carbon::now();
                        $emp_start_task = $evaluation->start_date;

                        $exp_date = Carbon::parse($emp_start_task)->addMinutes(15);
                        $countSundays = 0;
                        $currentDate = $emp_start_task->copy(); 
                        while ($currentDate->lte($exp_date)) {
                            if ($currentDate->dayOfWeek === Carbon::SUNDAY) {
                                $countSundays++;
                            }
                            $currentDate->addDay(); 
                        }
                        
                        $evaluation->exp_date = Carbon::parse($emp_start_task)->addMinutes(15 + $countSundays);
                        
                        $evaluation->save();
                    }
                    $evaluation_history = EvaluationHistory::where('user_id', $subTask->assigned_to)->count();
                    $evaluation_task = new EmployeeEvaluationTask();
                    $evaluation_task->user_id = $subTask->assigned_to;
                    $evaluation_task->task_id = $taskFind->id;
                    $evaluation_task->task_name = $taskFind->heading;
                    $evaluation_task->assign_date = $taskFind->created_at;
                    $evaluation_task->round = $evaluation_history + 1;
                    $evaluation_task->save();
                }
            }
            /**EMPLOYEE EVALUATION END */

            $task = $subTask->task;
            $this->logTaskActivity($task->id, $this->user->id, 'subTaskCreateActivity', $task->board_column_id, $subTask->id);

            DB::commit();

            return Reply::successWithData(__('messages.subTaskAdded'), [
                'subTaskID' => $subTask->id,
                'sub_task' => [
                    'id' => $task_s->id,
                    'title' => \Str::limit($task_s->heading, 30, '...'),
                    'subtask_id' => $subTask->id
                ]
            ]);
        } catch (\Throwable $th) {
            throw $th;
            DB::rollBack();
            return response()->json([
                'status' => 400,
                'message' => 'Something went wrong!',
    
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $subTask = SubTask::findOrFail($id);
        SubTask::destroy($id);

        $this->task = Task::with(['subtasks', 'subtasks.files'])->findOrFail($subTask->task_id);
        $view = view('tasks.sub_tasks.show', $this->data)->render();

        return Reply::successWithData(__('messages.subTaskDeleted'), ['view' => $view]);
    }

    public function changeStatus(Request $request)
    {
        $subTask = SubTask::findOrFail($request->subTaskId);
        $subTask->status = $request->status;
        $subTask->save();

        $this->task = Task::with(['subtasks', 'subtasks.files'])->findOrFail($subTask->task_id);
        $this->logTaskActivity($this->task->id, user()->id, 'subTaskUpdateActivity', $this->task->board_column_id, $subTask->id);

        $view = view('tasks.sub_tasks.show', $this->data)->render();


        return Reply::successWithData('messages.subTaskUpdatedSuccessfully', ['view' => $view]);
    }

    /**
     * @param StoreSubTask $request
     * @param int $id
     * @return array
     * @throws \Froiden\RestAPI\Exceptions\RelatedResourceNotFoundException
     */
    public function update(Request $request, $id)
    {

       // DB::beginTransaction();
        $setting = global_setting();
        $task = Task::find($id);
        $startDate = $task->start_date->format($setting->date_format);
        $dueDate = !is_null($task->due_date) ? $task->due_date->format($setting->date_format) : '';
        $rules = [
            'title' => 'required',
            'estimate_hours' => 'required',
            'estimate_minutes' => 'required',
            'description' => 'required',
            'user_id' => 'required',

        ];

        $dueDateRule = 'required|date_format:"' . $setting->date_format . '"|after_or_equal:' . $startDate;

        !is_null($task->due_date) ? $dueDateRule . '|before_or_equal:' . $task->due_date : $dueDateRule;

        if ($task->due_date) {

            $dueDate = $task->due_date->format($setting->date_format);
            $dueDateRule .= '|before_or_equal:' . $dueDate;
        }

        $rules['start_date'] = $dueDateRule;

        $rules['due_date'] = !is_null(request()->start_date) ? ($dueDateRule . '|after_or_equal:' . Carbon::createFromFormat($setting->date_format, request()->start_date)->format($setting->date_format)) : $dueDateRule;

        $validator = Validator::make($request->all(), $rules);


        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }

    //     $check_estimation = Task::where('id', $request->task_id)->first();
    //     $parent_task_minutes = $check_estimation->estimate_hours * 60;
    //     $total_parent_tasks_minutes= $parent_task_minutes + $check_estimation->estimate_minutes;
    //     $sub_tasks_hours= Subtask::join('tasks','tasks.subtask_id','sub_tasks.id')->where('sub_tasks.task_id',$request->task_id)
    //         ->sum('tasks.estimate_hours');
    //     $sub_tasks_minutes= Subtask::join('tasks','tasks.subtask_id','sub_tasks.id')->where('sub_tasks.task_id',$request->task_id)
    //         ->sum('tasks.estimate_minutes');

    //     $total_subtasks_minutes = $sub_tasks_hours * 60 + $sub_tasks_minutes;

    //     $hours = $request->estimate_hours * 60;
    //     $minutes = $request->estimate_minutes;
    //     $total_minutes = $hours + $minutes;
    // //  dd($total_parent_tasks_minutes,$total_subtasks_minutes,$total_minutes);
    //     if($task->independent_task_status != 1)
    //     {
    //         if (($total_parent_tasks_minutes - $total_subtasks_minutes) - $total_minutes < 0) {
    //             return response()->json([
    //                 "message" => "The given data was invalid.",
    //                 "errors" => [
    //                     "hours" => [
    //                         "Estimate hours cannot exceed from project allocation hours !"
    //                     ]
    //                 ]
    //             ], 422);
    //         }
    //         if($total_minutes < 1)
    //         {
    //             return response()->json([
    //                 "message" => "The given data was invalid.",
    //                 "errors" => [
    //                     "hours" => [
    //                         "Estimate hours and minutes cannot be 0 !"
    //                     ]
    //                 ]
    //             ], 422);
    //         }
    //     }

        $subTask = SubTask::findOrFail($request->subTaskID);
        $subTask->title = $request->title;
        $subTask->description = str_replace('<p><br></p>', '', trim($request->description));

        if ($request->start_date != '') {
            $subTask->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        }

        if ($request->due_date != '') {
            $subTask->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        }

        $subTask->assigned_to = $request->user_id ? $request->user_id : null;

        $subTask->save();

        $task_s = Task::find($id);
        $task_s->task_short_code = $task->task_short_code . '-' . $subTask->id;
        $task_s->heading = $subTask->title;
        $task_s->description = str_replace('<p><br></p>', '', trim($request->description));
        if ($request->start_date != '' && $request->due_date != '') {
            $task_s->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
            $task_s->due_date = Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        }
        $task_s->project_id = $task->project_id;
        $task_s->task_category_id = $request->task_category_id;

        $task_s->priority = $request->priority;
        $task_s->is_private = $request->has('is_private') ? 1 : 0;
        $task_s->billable = $request->has('billable') && $request->billable ? 1 : 0;
        $task_s->estimate_hours = $request->estimate_hours;
        $task_s->estimate_minutes = $request->estimate_minutes;
        $task_s->repeat = $request->repeat ? 1 : 0;
        $task_s->milestone_id = $request->milestone_id;
        $total_hours = $request->estimate_hours * 60;
        $total_minutes = $request->estimate_minutes;
        $total_in_minutes = $total_hours + $total_minutes;
        $task_s->estimate_time_left_minutes = $total_in_minutes;

        if ($request->has('repeat')) {
            $task_s->repeat_count = $request->repeat_count;
            $task_s->repeat_type = $request->repeat_type;
            $task_s->repeat_cycles = $request->repeat_cycles;
        }


        $task_s->board_column_id = 2;
        $task_s->task_status = "pending";
        $task_s->dependent_task_id = $request->task_id;
        $task_s->subtask_id = $subTask->id;
        $task_s->save();

        // Update Graphic Work Details for sub-task
        if($request->category_id == 7){
            $graphicWorkDetails = GraphicWorkDetails::updateOrCreate([
                'task_id' => $task_s->id
            ],[
                'type_of_graphic_work_id' => $request->type_of_graphic_work_id,
                'type_of_logo' => $request->type_of_logo ?? null,
                'brand_name' => $request->brand_name ?? null,
                'number_of_versions' => $request->number_of_versions ?? null,
                'file_types_needed' => $request->file_types_needed ?? null,
                'design_instruction' => $request->design_instruction ?? null,
                'reference' => $request->reference ?? null,
                'font_name' => $request->font_name ?? null,
                'font_url' => $request->font_url ?? null,
                'primary_color' => $request->primary_color ?? null,
                'primary_color_description' => $request->primary_color_description ?? null,
                'secondary_colors' => $request->secondary_colors ?? null,
                'workable_url' => $request->workable_url ?? null,
                'file_extensions' => $request->file_extensions ?? null
            ]);
        }

        $task_user= TaskUser::where('task_id',$task_s->id)->first();
        $task_user->user_id= $request->user_id;
        $task_user->save();

        if ($request->hasFile('file')) {
            $files = $request->file('file');
            $destinationPath = storage_path('app/public/');
            $file_name = [];

            foreach ($files as $file) {
                $taskFile = new TaskFile();
                $taskFile->task_id = $id;
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                array_push($file_name, $filename);
                $taskFile->user_id = $this->user->id;
                $taskFile->filename = $filename;
                $taskFile->hashname = $filename;
                $taskFile->size = $file->getSize();
                $taskFile->save();

                Storage::disk('s3')->put('/' . $filename, file_get_contents($file));

                $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
            }
        }
        //$task = $subTask->task;
        $this->logTaskActivity($task->id, $this->user->id, 'subTaskUpdateActivity', $task->board_column_id, $subTask->id);

        $this->task = Task::with(['subtasks', 'subtasks.files'])->findOrFail($subTask->task_id);
        //$view = view('tasks.sub_tasks.show', $this->data)->render();

        return Reply::successWithData(__('messages.subTaskUpdated'), [
            'status' => 'success',
            'message' => 'Data has been updated successfully',
            'sub_task' => [
                'id' => $id,
                'title' => $request->title,
                'subtask_id' => $subTask->id
            ]
        ]);
    }
}



