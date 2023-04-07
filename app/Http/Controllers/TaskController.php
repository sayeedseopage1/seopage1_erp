<?php

namespace App\Http\Controllers;

use App\DataTables\TasksDataTable;
use App\Events\TaskReminderEvent;
use App\Helper\Reply;
use App\Http\Requests\Tasks\StoreTask;
use App\Http\Requests\Tasks\UpdateTask;
use App\Models\BaseModel;
use App\Models\EmployeeDetails;
use App\Models\Pinned;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectMilestone;
use App\Models\ProjectTimeLogBreak;
use App\Models\SubTask;
use App\Models\SubTaskFile;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskCategory;
use App\Models\TaskLabel;
use App\Models\TaskLabelList;
use App\Models\TaskReply;
use App\Models\TaskUser;
use App\Models\User;
use App\Traits\ProjectProgress;
use Carbon\Carbon;
use GrahamCampbell\GitLab\Facades\GitLab;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Helper\Files;
use App\Models\TaskFile;
use App\Models\TaskSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Modules\Gitlab\Entities\GitlabEmployee;
use Modules\Gitlab\Entities\GitlabProject;
use Modules\Gitlab\Entities\GitlabSetting;
use Modules\Gitlab\Entities\GitlabTask;
use Redirect;
use App\Models\TaskApprove;
use App\Models\TaskTimeExtension;
use App\Models\TaskSubmission;
use Illuminate\Support\Facades\Storage;
use App\Notifications\TaskSubmitNotification;
use App\Notifications\TaskRevisionNotification;
use App\Notifications\TaskApproveNotification;
use Notification;
use Toastr;
use Auth;
use App\Models\ProjectDeliverable;
use function PHPUnit\Framework\isNull;
use App\Models\TaskComment;
use Toaster;

use function Symfony\Component\Cache\Traits\select;

use Validator;


class TaskController extends AccountBaseController
{
    use ProjectProgress;

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.tasks';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('tasks', $this->user->modules));
            return $next($request);
        });
    }

    public function index(TasksDataTable $dataTable)
    {
        $viewPermission = user()->permission('view_tasks');
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->projects = Project::allProjects();
            $this->clients = User::allClients();
            $this->employees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
            $this->taskBoardStatus = TaskboardColumn::all();
            $this->taskCategories = TaskCategory::all();
            $this->taskLabels = TaskLabelList::all();
            $this->milestones = ProjectMilestone::all();
        }

        return $dataTable->render('tasks.index', $this->data);
    }


    public function TaskReview(Request $request)
    {
        $validator = Validator::make($request->input(), [
            'link' => 'required|array',
            'link.*' => 'required|url|min:1',
            'text' => 'required',
        ], [
            'link.url' => 'Invalid url!',
            'link.*.required' => 'This field is required',
            'text.required' => 'Please describe what you\'ve done !',
        ]);

        $link = [];
        foreach ($validator->errors()->toArray() as $key => $value) {
            if (strpos($key, 'link.') !== false) {
                $exp= explode('.', $key);
                $link[$exp[1]] = $value[0];
            }
        }

        $errors = $validator->errors()->toArray();
        $errors = array_merge($errors, ['link' => $link]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $errors
            ], 422);
        }

        $order= TaskSubmission::orderBy('id','desc')->where('user_id',$request->user_id)->where('task_id',$request->id)->first();

        if ($request->text != null) {
            $task_submit= new TaskSubmission();
            $task_submit->task_id= $request->id;
            $task_submit->user_id= $request->user_id;

            //$task_submit->table=$request->table;
            //$task_submit->list=$request->list;
            $task_submit->text=$request->text;
            if ($order == null) {
                $task_submit->submission_no= 1;
            }else {
                $task_submit->submission_no= $order->submission_no+1;
            }
            $task_submit->save();
        }

        if ($request->link != null) {
            // code...
            foreach ($request->link as $lin) {
                $task_submit= new TaskSubmission();
                $task_submit->task_id= $request->id;
                $task_submit->user_id= $request->user_id;

                $task_submit->link=$lin;
                if ($order == null) {
                    $task_submit->submission_no= 1;
                }else {
                    $task_submit->submission_no= $order->submission_no+1;
                }


                $task_submit->save();

            }
        }

        if($request->file('file') != null)
        {


            foreach ($request->file('file') as $att) {
                $task_submit= new TaskSubmission();




                $filename=null;
                if ($att) {
                    $filename = time() . $att->getClientOriginalName();

                    Storage::disk('public')->putFileAs(
                        'TaskSubmission/',
                        $att,
                        $filename
                    );

                }
                $task_submit->attach= $filename;
                $task_submit->task_id= $request->id;
                $task_submit->user_id= $request->user_id;
                if ($order == null) {
                    $task_submit->submission_no= 1;
                }else {
                    $task_submit->submission_no= $order->submission_no+1;
                }


                $task_submit->save();

            }
        }



        $task= Task::find($request->id);
        $task->board_column_id= 6;
        $task->task_status="submitted";
        $task->save();
        $task_id= Task::where('id',$task->id)->first();

        $user= User::where('id',$task->added_by)->first();
        $sender= User::where('id',$request->user_id)->first();



        Notification::send($user, new TaskSubmitNotification($task_id,$sender));

        Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
//return back();
        return Redirect::back()->with('messages.taskSubmitNotification');

    }
    public function TaskApprove(Request $request)
    {
      $task_status= Task::find($request->task_id);
      $task_status->status= "completed";
      $task_status->task_status="approved";
      $task_status->board_column_id=4;
      $task_status->save();
      $task= new TaskApprove();
      $task->user_id= $request->user_id;
      $task->task_id= $request->task_id;
      $task->rating= $request->rating;
      $task->rating2= $request->rating2;
      $task->rating3= $request->rating3;
      $task->comments= $request->comments;
      $task->save();
      $task_submission= TaskSubmission::where('task_id',$task_status->id)->first();
      $sender= User::where('id',Auth::id())->first();
      $user= User::where('id',$task_submission->user_id)->first();
      Notification::send($user, new TaskApproveNotification($task_status,$sender));
      Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      //return back();
      return Redirect::back()->with('messages.taskSubmitNotification');

    }
    public function TaskRevision(Request $request)
    {
      $task_status= Task::find($request->task_id);
      $task_status->status= "incomplete";
      $task_status->task_status="revision";
      $task_status->board_column_id=1;
      $task_status->save();
      $task= new TaskComment();
      $task->user_id= Auth::id();
      $task->task_id= $request->task_id;

      $task->comment= $request->comments;
      $task->added_by= Auth::id();
      $task->last_updated_by= Auth::id();
      $task->save();
      $task_submission= TaskSubmission::where('task_id',$task_status->id)->first();
      $sender= User::where('id',$request->user_id)->first();
      $user= User::where('id',$task_submission->user_id)->first();
      Notification::send($user, new TaskRevisionNotification($task_status,$sender));
      Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
      //return back();
      return Redirect::back()->with('messages.taskSubmitNotification');
    }
    public function TaskExtension(Request $request)
    {
      $date= date('Y-m-d', strtotime($request->due_date));


      $task= new TaskTimeExtension();
      $task->user_id=$request->user_id;
      $task->task_id=$request->task_id;
      $task->due_date=$date;
      $task->description=$request->description;
      $task->save();

      return Redirect::back()->with('messages.taskUpdatedSuccessfully');
    }
    public function TaskExtensionApprove(Request $request)
    {
      $task_e= TaskTimeExtension::find($request->id);
      //dd($task);
      $task_e->updated_by=$request->added_by;
      $task_e->due_date= $request->due_date;

      $task_e->status="approved";

      $task_e->save();
      $task=Task::find($request->task_id);
      $task->original_due_date= $task->due_date;
      $task->due_date=$task_e->due_date;
      $task->save();

      return Redirect::back()->with('messages.taskUpdatedSuccessfully');
    }

    /**
     * XXXXXXXXXXX
     *
     * @return array
     */
    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeBulkStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_tasks') != 'all');

        Task::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    protected function changeBulkStatus($request)
    {
        abort_403(user()->permission('edit_tasks') != 'all');

        Task::whereIn('id', explode(',', $request->row_ids))->update(['board_column_id' => $request->status]);
    }

    public function changeStatus(Request $request)
    {
        $taskId = $request->taskId;
        $status = $request->status;
        $task = Task::with('project', 'users')->findOrFail($taskId);
        $taskUsers = $task->users->pluck('id')->toArray();

        $this->editPermission = user()->permission('edit_tasks');
        $this->changeStatusPermission = user()->permission('change_status');
        abort_403(!(
            $this->changeStatusPermission == 'all'
            || ($this->changeStatusPermission == 'added' && $task->added_by == user()->id)
            || ($this->changeStatusPermission == 'owned' && in_array(user()->id, $taskUsers))
            || ($this->changeStatusPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
            || ($task->project && $task->project->project_admin == user()->id)
        ));

        $taskBoardColumn = TaskboardColumn::where('slug', $status)->first();
        $task->board_column_id = $taskBoardColumn->id;

        if ($taskBoardColumn->slug == 'completed') {
            $task->completed_on = now()->format('Y-m-d');
            $task->save();
        }
        else {
            $task->completed_on = null;
        }

        $task->save();

        if ($task->project_id != null) {

            if ($task->project->calculate_task_progress == 'true') {
                // Calculate project progress if enabled
                $this->calculateProjectProgress($task->project_id);
            }
        }

        return Reply::success(__('messages.taskUpdatedSuccessfully'));

    }

    public function destroy(Request $request, $id)
    {
        $task = Task::with('project')->findOrFail($id);

        $this->deletePermission = user()->permission('delete_tasks');

        $taskUsers = $task->users->pluck('id')->toArray();

        abort_403(!($this->deletePermission == 'all'
            || ($this->deletePermission == 'owned' && in_array(user()->id, $taskUsers))
            || ($task->project && ($task->project->project_admin == user()->id))
            || ($this->deletePermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
            || ($this->deletePermission == 'owned' && (in_array('client', user_roles()) && $task->project && ($task->project->client_id == user()->id)))
            || ($this->deletePermission == 'both' && (in_array('client', user_roles()) && ($task->project && ($task->project->client_id == user()->id)) || $task->added_by == user()->id))
        ));

        // If it is recurring and allowed by user to delete all its recurring tasks
        if ($request->has('recurring') && $request->recurring == 'yes') {
            Task::where('recurring_task_id', $id)->delete();
        }

        // Delete current task
        $task->delete();

        return Reply::success(__('messages.taskDeletedSuccessfully'));
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
        $this->addPermission = user()->permission('add_tasks');
        $this->projectShortCode = '';
        $this->project = request('task_project_id') ? Project::with('membersMany')->findOrFail(request('task_project_id')) : null;

        if (is_null($this->project) || ($this->project->project_admin != user()->id)) {
            abort_403(!in_array($this->addPermission, ['all', 'added']));
        }

        $this->task = (request()['duplicate_task']) ? Task::with('users', 'label', 'project')->findOrFail(request()['duplicate_task'])->withCustomFields() : null;
        $this->selectedLabel = TaskLabel::where('task_id', request()['duplicate_task'])->get()->pluck('label_id')->toArray();
        $this->projectMember = TaskUser::where('task_id', request()['duplicate_task'])->get()->pluck('user_id')->toArray();
        $this->pageTitle = __('app.add') . ' ' . __('app.task');
        $this->projects = Project::allProjects();

        if (request('task_project_id')) {
            $project = Project::find(request('task_project_id'));
            $this->projectShortCode = $project->project_short_code;
            $this->milestones = ProjectMilestone::where('project_id', request('task_project_id'))->get();
        }
        else {
            if ($this->task && $this->task->project) {
                $this->milestones = $this->task->project->milestones;
            }
            else {
                $this->milestones = collect([]);
            }
        }

        $this->columnId = request('column_id');
        $this->categories = TaskCategory::all();
        $this->taskLabels = TaskLabelList::where('project_id', null)->get();
        $this->taskboardColumns = TaskboardColumn::orderBy('priority', 'asc')->get();
        $completedTaskColumn = TaskboardColumn::where('slug', '=', 'completed')->first();

        if (request()->has('default_assign') && request('default_assign') != '') {
            $this->defaultAssignee = request('default_assign');
        }

        $this->allTasks = $completedTaskColumn ? Task::where('board_column_id', '<>', $completedTaskColumn->id)->whereNotNull('due_date')->get() : [];

        if (!is_null($this->project)) {
            if ($this->project->public) {
                $this->employees = User::allEmployees(null, true, ($this->addPermission == 'all' ? 'all' : null));

            }
            else {

                $this->employees = $this->project->membersMany;
            }
        }
        else if (!is_null($this->task) && !is_null($this->task->project_id)) {

            if ($this->task->project->public) {
                $this->employees = User::allEmployees(null, true, ($this->addPermission == 'all' ? 'all' : null));
            }
            else {

                $this->employees = $this->task->project->membersMany;
            }
        }
        else {

            $this->employees = User::allEmployees(null, true, ($this->addPermission == 'all' ? 'all' : null));
        }

        $task = new Task();

        if (!empty($task->getCustomFieldGroupsWithFields())) {
            $this->fields = $task->getCustomFieldGroupsWithFields()->fields;
        }


        if (request()->ajax()) {
            $html = view('tasks.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'tasks.ajax.create';
        return view('tasks.create', $this->data);

    }

    // @codingStandardsIgnoreLine
    public function store(StoreTask $request)
    {
        $project_id = Project::where('id',$request->project_id)->first();
        $task_estimation_hours= Task::where('project_id',$project_id->id)->sum('estimate_hours');
        $task_estimation_minutes= Task::where('project_id',$project_id->id)->sum('estimate_minutes');
        $toal_task_estimation_minutes= $task_estimation_hours*60 + $task_estimation_minutes;
        $left_minutes= ($project_id->hours_allocated-$request->estimate_hours)*60 - ($toal_task_estimation_minutes+$request->estimate_minutes);

        $left_in_hours = round($left_minutes/60,0);
        $left_in_minutes= $left_minutes%60;
        //dd($left_minutes);
        if($left_minutes < 1)
        {
           
           // Toastr::error('Estimate hours cannot exceed from project allocation hours!!!', 'Failed', ["positionClass" => "toast-top-right"]);
           // return redirect()->back()->withErrors(['error' => 'Estimate hours cannot exceed from project allocation hours!!!']);
        }
       // dd($request);
        $project = request('project_id') ? Project::findOrFail(request('project_id')) : null;

        if (is_null($project) || ($project->project_admin != user()->id)) {
            $this->addPermission = user()->permission('add_tasks');
            abort_403(!in_array($this->addPermission, ['all', 'added']));
        }

        DB::beginTransaction();
        $ganttTaskArray = [];
        $gantTaskLinkArray = [];
        $taskBoardColumn = TaskboardColumn::where('slug', 'incomplete')->first();
        $task = new Task();
        $task->heading = $request->heading;

        $task->description = str_replace('<p><br></p>', '', trim($request->description));

        $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $task->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $task->due_date = $dueDate;
        $task->project_id = $request->project_id;
        $task->task_category_id = $request->category_id;
        $task->priority = $request->priority;
        $task->board_column_id = $taskBoardColumn->id;

        if ($request->has('dependent') && $request->has('dependent_task_id') && $request->dependent_task_id != '') {
            $dependentTask = Task::findOrFail($request->dependent_task_id);

            // if (!is_null($dependentTask->due_date) && !is_null($dueDate) && $dependentTask->due_date->greaterThan($dueDate)) {
            //     /* @phpstan-ignore-line */
            //     return Reply::error(__('messages.taskDependentDate'));
            // }

            $task->dependent_task_id = $request->dependent_task_id;
        }

        $task->is_private = $request->has('is_private') ? 1 : 0;
        $task->billable = $request->has('billable') && $request->billable ? 1 : 0;
        $task->estimate_hours = $request->estimate_hours;
        $task->estimate_minutes = $request->estimate_minutes;
        $task->deliverable_id= $request->deliverable_id;

        if ($request->board_column_id) {
            $task->board_column_id = $request->board_column_id;
        }

        if ($request->milestone_id != '') {
            $task->milestone_id = $request->milestone_id;
        }

        // Add repeated task
        $task->repeat = $request->repeat ? 1 : 0;

        if ($request->has('repeat')) {
            $task->repeat_count = $request->repeat_count;
            $task->repeat_type = $request->repeat_type;
            $task->repeat_cycles = $request->repeat_cycles;
        }
        $task->task_status= "pending";

        $task->save();

        $task->task_short_code = ($project) ? $project->project_short_code . '-' . $task->id : null;
        $task->saveQuietly();

        // save labels
        $task->labels()->sync($request->task_labels);
        // dd($request->taskId);
        if (!is_null($request->taskId)) {

            $taskExists = TaskFile::where('task_id', $request->taskId)->get();

            if ($taskExists) {
                foreach ($taskExists as $taskExist) {
                    $file = new TaskFile();
                    $file->user_id = $taskExist->user_id;
                    $file->task_id = $task->id;

                    if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $task->id))) {
                        File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $task->id), 0775, true);
                    }

                    $fileName = Files::generateNewFileName($taskExist->filename);
                    copy(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $taskExist->task_id . '/' . $taskExist->hashname), public_path(Files::UPLOAD_FOLDER.'/task-files/' . $task->id . '/' . $fileName));

                    $file->filename = $taskExist->filename;
                    $file->hashname = $fileName;
                    $file->size = $taskExist->size;
                    $file->save();

                    $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
                }
            }


            $subTask = SubTask::with(['files'])->where('task_id', $request->taskId)->get();
            //dd($subTask);

            if ($subTask) {
                foreach ($subTask as $subTasks) {
                    $subTaskData = new SubTask();
                    $subTaskData->title = $subTasks->title;
                    $subTaskData->task_id = $task->id;
                    $subTaskData->description = str_replace('<p><br></p>', '', trim($subTasks->description));

                    if ($subTasks->start_date != '' && $subTasks->due_date != '') {
                        $subTaskData->start_date = $subTasks->start_date;
                        $subTaskData->due_date = $subTasks->due_date;
                    }

                    $subTaskData->assigned_to = $subTasks->assigned_to;

                    $subTaskData->save();

                    if ($subTasks->files) {
                        foreach ($subTasks->files as $fileData) {
                            $file = new SubTaskFile();
                            $file->user_id = $fileData->user_id;
                            $file->sub_task_id = $subTaskData->id;

                            $fileName = Files::generateNewFileName($fileData->filename);

                            if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id))) {
                                File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id), 0775, true);
                            }

                            copy(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $fileData->sub_task_id . '/' . $fileData->hashname), public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id . '/' . $fileName));

                            $file->filename = $fileData->filename;
                            $file->hashname = $fileName;
                            $file->size = $fileData->size;
                            $file->save();
                        }
                    }
                }
            }
        }

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $task->updateCustomFieldData($request->get('custom_fields_data'));
        }

        // For gantt chart
        if ($request->page_name && !is_null($task->due_date) && $request->page_name == 'ganttChart') {
            $parentGanttId = $request->parent_gantt_id;

            /* @phpstan-ignore-next-line */
            $taskDuration = $task->due_date->diffInDays($task->start_date);
            /* @phpstan-ignore-line */
            $taskDuration = $taskDuration + 1;

            $ganttTaskArray[] = [
                'id' => $task->id,
                'text' => $task->heading,
                'start_date' => $task->start_date->format('Y-m-d'), /* @phpstan-ignore-line */
                'duration' => $taskDuration,
                'parent' => $parentGanttId,
                'taskid' => $task->id
            ];

            $gantTaskLinkArray[] = [
                'id' => 'link_' . $task->id,
                'source' => $task->dependent_task_id != '' ? $task->dependent_task_id : $parentGanttId,
                'target' => $task->id,
                'type' => $task->dependent_task_id != '' ? 0 : 1
            ];
        }


        DB::commit();

        if (request()->add_more == 'true') {
            unset($request->project_id);
            $html = $this->create();
            return Reply::successWithData(__('messages.taskCreatedSuccessfully'), ['html' => $html, 'add_more' => true, 'taskID' => $task->id]);
        }

        if ($request->page_name && $request->page_name == 'ganttChart') {

            return Reply::successWithData(
                'messages.taskCreatedSuccessfully',
                [
                    'tasks' => $ganttTaskArray,
                    'links' => $gantTaskLinkArray
                ]
            );
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            //$redirectUrl = url('/account/projects/418?tab=tasks');
            $redirectUrl = route('projects.show', $request->project_id).'?tab=tasks';
        }

        return Reply::successWithData(__('messages.taskCreatedSuccessfully'), ['redirectUrl' => $redirectUrl, 'taskID' => $task->id]);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\View\Factory|\Illuminate\Contracts\View\View|\Illuminate\Http\Response
     */
    public function edit($id)
    {
        $editTaskPermission = user()->permission('edit_tasks');
        $this->task = Task::with('users', 'label', 'project')->findOrFail($id)->withCustomFields();
        $this->taskUsers = $taskUsers = $this->task->users->pluck('id')->toArray();
        abort_403(!($editTaskPermission == 'all'
            || ($editTaskPermission == 'owned' && in_array(user()->id, $taskUsers))
            || ($editTaskPermission == 'added' && $this->task->added_by == user()->id)
            || ($this->task->project && ($this->task->project->project_admin == user()->id))
            || ($editTaskPermission == 'both' && (in_array(user()->id, $taskUsers) || $this->task->added_by == user()->id))
            || ($editTaskPermission == 'owned' && (in_array('client', user_roles()) && $this->task->project && ($this->task->project->client_id == user()->id)))
            || ($editTaskPermission == 'both' && (in_array('client', user_roles()) && ($this->task->project && ($this->task->project->client_id == user()->id)) || $this->task->added_by == user()->id))
        ));

        if (!empty($this->task->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->task->getCustomFieldGroupsWithFields()->fields;
        }

        $this->pageTitle = __('app.update') . ' ' . __('app.task');
        $this->labelIds = $this->task->label->pluck('label_id')->toArray();
        $this->projects = Project::allProjects();
        $this->categories = TaskCategory::all();
        $projectId = $this->task->project_id;
        $this->taskLabels = TaskLabelList::where('project_id', $projectId)->orWhere('project_id', null)->get();
        $this->taskboardColumns = TaskboardColumn::orderBy('priority', 'asc')->get();
        $this->changeStatusPermission = user()->permission('change_status');
        $completedTaskColumn = TaskboardColumn::where('slug', '=', 'completed')->first();

        if ($completedTaskColumn) {
            $this->allTasks = Task::where('board_column_id', '<>', $completedTaskColumn->id)->whereNotNull('due_date')->where('id', '!=', $id)->get();
        }
        else {
            $this->allTasks = [];
        }

        if ($this->task->project_id) {
            if ($this->task->project->public) {
                $this->employees = User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null));

            }
            else {
                $this->employees = $this->task->project->membersMany;
            }
        }
        else {
            if ($editTaskPermission == 'added' || $editTaskPermission == 'owned') {
                $this->employees = ((count($this->task->users) > 0) ? $this->task->users : User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null)));

            }
            else {
                $this->employees = User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null));
            }
        }


        $uniqueId = $this->task->task_short_code;
        // check if unuqueId contains -
        if (strpos($uniqueId, '-') !== false) {
            $uniqueId = explode('-', $uniqueId, 2);
            $this->projectUniId = $uniqueId[0];
            $this->taskUniId = $uniqueId[1];
        }
        else {
            $this->projectUniId = ($this->task->project_id != null) ? $this->task->project->project_short_code : null;
            $this->taskUniId = $uniqueId;
        }

        if (request()->ajax()) {
            $html = view('tasks.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'tasks.ajax.edit';
        return view('tasks.create', $this->data);

    }

    public function update(UpdateTask $request, $id)
    {
      //  dd($request);
        $task = Task::with('users', 'label', 'project')->findOrFail($id)->withCustomFields();
        $editTaskPermission = user()->permission('edit_tasks');
        $taskUsers = $task->users->pluck('id')->toArray();

        abort_403(!($editTaskPermission == 'all'
        || ($editTaskPermission == 'owned' && in_array(user()->id, $taskUsers))
        || ($editTaskPermission == 'added' && $task->added_by == user()->id)
        || ($task->project && ($task->project->project_admin == user()->id))
        || ($editTaskPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id))
        || ($editTaskPermission == 'owned' && (in_array('client', user_roles()) && $task->project && ($task->project->client_id == user()->id)))
        || ($editTaskPermission == 'both' && (in_array('client', user_roles()) && ($task->project && ($task->project->client_id == user()->id)) || $task->added_by == user()->id))
        ));

        $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $task->heading = $request->heading;

        $task->description = str_replace('<p><br></p>', '', trim($request->description));
        $task->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $task->due_date = $dueDate;
        $task->task_category_id = $request->category_id;
        $task->priority = $request->priority;
        $task->deliverable_id= $request->deliverable_id;

        if ($request->has('board_column_id')) {
            $task->board_column_id = $request->board_column_id;

            $taskBoardColumn = TaskboardColumn::findOrFail($request->board_column_id);

            if ($taskBoardColumn->slug == 'completed') {
                $task->completed_on = now()->format('Y-m-d');
            }
            else {
                $task->completed_on = null;
            }
        }

        $task->dependent_task_id = $request->has('dependent') && $request->has('dependent_task_id') && $request->dependent_task_id != '' ? $request->dependent_task_id : null;
        $task->is_private = $request->has('is_private') ? 1 : 0;
        $task->billable = $request->has('billable') && $request->billable ? 1 : 0;
        $task->estimate_hours = $request->estimate_hours;
        $task->estimate_minutes = $request->estimate_minutes;

        if ($request->project_id != '') {
            $task->project_id = $request->project_id;
        }
        else {
            $task->project_id = null;
        }

        $task->milestone_id = $request->milestone_id;

        if ($request->has('dependent') && $request->has('dependent_task_id') && $request->dependent_task_id != '') {
            $dependentTask = Task::findOrFail($request->dependent_task_id);

            // if (!is_null($dependentTask->due_date) && !is_null($dueDate) && $dependentTask->due_date->greaterThan($dueDate)) {
            //     return Reply::error(__('messages.taskDependentDate'));
            // }

            $task->dependent_task_id = $request->dependent_task_id;
        }

        // Add repeated task
        $task->repeat = $request->repeat ? 1 : 0;

        if ($request->has('repeat')) {
            $task->repeat_count = $request->repeat_count;
            $task->repeat_type = $request->repeat_type;
            $task->repeat_cycles = $request->repeat_cycles;
        }

        $task->save();
        $task->load('project');

        $project = $task->project;

        $task->task_short_code = (!is_null($task->project_id) ? $project->project_short_code . '-' . $task->id : null);
        $task->saveQuietly();

        // save labels
        $task->labels()->sync($request->task_labels);

        // To add custom fields data
        if ($request->get('custom_fields_data')) {
            $task->updateCustomFieldData($request->get('custom_fields_data'));
        }

        // Sync task users
        $task->users()->sync($request->user_id);

        return Reply::successWithData(__('messages.taskUpdatedSuccessfully'), ['redirectUrl' => route('tasks.show', $id)]);
    }

    public function show($id)
    {
        $viewTaskFilePermission = user()->permission('view_task_files');
        $viewSubTaskPermission = user()->permission('view_sub_tasks');
        $this->viewTaskCommentPermission = user()->permission('view_task_comments');
        $this->viewTaskNotePermission = user()->permission('view_task_notes');
        $this->viewUnassignedTasksPermission = user()->permission('view_unassigned_tasks');
        $this->replys =DB::table('task_replies')
            ->join('users','task_replies.user_id','=','users.id')
            ->select('task_replies.*','users.name','users.image','users.updated_at')
            ->get();
//        dd($this->replys);

//         $this->details = EmployeeDetails::where('add');
//         dd($details);




        $this->task = Task::with(['boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user', 'approvedTimeLogs.activeBreak', 'comments', 'comments.user', 'subtasks.files', 'userActiveTimer',
            'files' => function ($q) use ($viewTaskFilePermission) {
                if ($viewTaskFilePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'subtasks' => function ($q) use ($viewSubTaskPermission) {
                if ($viewSubTaskPermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            }])
            ->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
            ->findOrFail($id)->withCustomFields();

        $this->taskUsers = $taskUsers = $this->task->users->pluck('id')->toArray();

        $this->taskSettings = TaskSetting::first();

        $viewTaskPermission = user()->permission('view_tasks');
        abort_403(!(
            $viewTaskPermission == 'all'
            || ($viewTaskPermission == 'added' && $this->task->added_by == user()->id)
            || ($viewTaskPermission == 'owned' && in_array(user()->id, $taskUsers))
            || ($viewTaskPermission == 'both' && (in_array(user()->id, $taskUsers) || $this->task->added_by == user()->id))

            || ($viewTaskPermission == 'owned' && in_array('client', user_roles()) && $this->task->project_id && $this->task->project->client_id == user()->id)
            || ($viewTaskPermission == 'both' && in_array('client', user_roles()) && $this->task->project_id && $this->task->project->client_id == user()->id)
            || ($this->viewUnassignedTasksPermission == 'all' && in_array('employee', user_roles()))
            || ($this->task->project_id && $this->task->project->project_admin == user()->id)
        ));

        if (!$this->task->project_id || ($this->task->project_id && $this->task->project->project_admin != user()->id)) {
            abort_403($this->viewUnassignedTasksPermission == 'none' && count($taskUsers) == 0);
        }

        $this->pageTitle = __('app.task') . ' # ' . $this->task->id;

        if (!empty($this->task->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->task->getCustomFieldGroupsWithFields()->fields;
        }

        $this->employees = User::join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('project_time_logs', 'project_time_logs.user_id', '=', 'users.id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id');


        $this->employees = $this->employees->select(
            'users.name',
            'users.image',
            'users.id',
            'designations.name as designation_name'
        );

        $this->employees = $this->employees->where('project_time_logs.task_id', '=', $id);

        $this->employees = $this->employees->groupBy('project_time_logs.user_id')
            ->orderBy('users.name')
            ->get();

        $this->breakMinutes = ProjectTimeLogBreak::taskBreakMinutes($this->task->id);

        // Add Gitlab task details if available
        if(module_enabled('Gitlab')){
            if (in_array('gitlab', user_modules()) && !is_null($this->task->project_id)) {
                /** @phpstan-ignore-next-line */
                $this->gitlabSettings = GitlabSetting::where('user_id', user()->id)->first();

                if (!$this->gitlabSettings) {
                    /** @phpstan-ignore-next-line */
                    $this->gitlabSettings = GitlabSetting::whereNull('user_id')->first();
                }

                if ($this->gitlabSettings) {
                    /** @phpstan-ignore-next-line */
                    Config::set('gitlab.connections.main.token', $this->gitlabSettings->personal_access_token);
                    /** @phpstan-ignore-next-line */
                    Config::set('gitlab.connections.main.url', $this->gitlabSettings->gitlab_url);

                    /** @phpstan-ignore-next-line */
                    $gitlabProject = GitlabProject::where('project_id', $this->task->project_id)->first();
                    /** @phpstan-ignore-next-line */
                    $gitlabTask = GitlabTask::where('task_id', $id)->first();

                    if ($gitlabTask) {
                        /** @phpstan-ignore-next-line */
                        $gitlabIssue = GitLab::issues()->all(intval($gitlabProject->gitlab_project_id), ['iids' => [intval($gitlabTask->gitlab_task_iid)]]);
                        $this->gitlabIssue = $gitlabIssue[0];
                    }
                }
            }
        }

        $this->comments = TaskComment::with('user')->where('task_id', $id)->orderBy('id', 'desc')->get();
        //dd($this->comments);
        $this->task= Task::where('id',$id)->first();
        $project= Project::where('id',$this->task->project_id)->first();
        $task_member= TaskUser::where('task_id',$id)->first();
        $sender= User::where('id',Auth::id())->first();
        $users= User::where('id',$this->task->added_by)->orWhere('id',$task_member->user_id)->orWhere('id',$project->pm_id)->get();

        $this->replys =DB::table('task_replies')
        ->join('users','task_replies.user_id','=','users.id')
        ->select('task_replies.*','users.name','users.image','users.updated_at')
        ->get();

        $tab = request('view');
        
        switch ($tab) {
        case 'file':
            $this->tab = 'tasks.ajax.files';
                break;
        case 'comments':
            abort_403($this->viewTaskCommentPermission == 'none');
            $this->tab = 'tasks.ajax.comments';
                break;
        case 'notes':
            abort_403($this->viewTaskNotePermission == 'none');
            $this->tab = 'tasks.ajax.notes';
                break;
        case 'history':
            $this->tab = 'tasks.ajax.history';
                break;
        case 'deliverables':
            $this->tab = 'tasks.ajax.deliverables';
                break;
        case 'time_logs':
            $this->tab = 'tasks.ajax.timelogs';
                break;
        default:
            // if($this->taskSettings->files == 'yes' && in_array('client', user_roles())){
            //     $this->tab = 'tasks.ajax.files';
            // }
            if($this->taskSettings->sub_task == 'yes' && in_array('client', user_roles()))
            {
                $this->tab = 'tasks.ajax.sub_tasks';
            }
            elseif($this->taskSettings->comments == 'yes' && in_array('client', user_roles()))
            {
                abort_403($this->viewTaskCommentPermission == 'none');
                $this->tab = 'tasks.ajax.comments';
            }
            elseif($this->taskSettings->time_logs == 'yes' && in_array('client', user_roles()))
            {
                abort_403($this->viewTaskNotePermission == 'none');
                $this->tab = 'tasks.ajax.timelogs';
            }
            elseif($this->taskSettings->notes == 'yes' && in_array('client', user_roles()))
            {
                abort_403($this->viewTaskNotePermission == 'none');
                $this->tab = 'tasks.ajax.notes';
            }
            elseif($this->taskSettings->history == 'yes' && in_array('client', user_roles()))
            {
                abort_403($this->viewTaskNotePermission == 'none');
                $this->tab = 'tasks.ajax.history';
            }
            elseif(!in_array('client', user_roles()))
            {
                $this->tab = 'tasks.ajax.sub_tasks';
            }
            break;
        }

        if (request()->ajax()) {
            if (request('json') == true) {
                $html = view($this->tab, $this->data)->render();
                return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
            }

            $html = view('tasks.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }


        $this->view = 'tasks.ajax.show';
        return view('tasks.create', $this->data);

    }

    public function storePin(Request $request)
    {
        $pinned = new Pinned();
        $pinned->task_id = $request->task_id;
        $pinned->project_id = $request->project_id;
        $pinned->save();

        return Reply::success(__('messages.pinnedSuccess'));
    }

    public function destroyPin(Request $request, $id)
    {
        if ($request->type == 'task') {
            Pinned::where('task_id', $id)->where('user_id', user()->id)->delete();
        }
        else {
            Pinned::where('project_id', $id)->where('user_id', user()->id)->delete();
        }

        return Reply::success(__('messages.pinnedRemovedSuccess'));
    }

    public function checkTask($taskID)
    {
        $task = Task::findOrFail($taskID);
        $subTask = SubTask::where(['task_id' => $taskID, 'status' => 'incomplete'])->count();

        return Reply::dataOnly(['taskCount' => $subTask, 'lastStatus' => $task->boardColumn->slug]);
    }

    public function updateTaskDuration(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->start_date = Carbon::createFromFormat('d/m/Y', $request->start_date)->format('Y-m-d');
        $task->due_date = (!is_null($task->due_date)) ? Carbon::createFromFormat('d/m/Y', $request->end_date)->addDay()->format('Y-m-d') : null;
        $task->save();

        return Reply::success('messages.taskUpdatedSuccessfully');
    }

    public function projectTasks($id)
    {
        $tasks = Task::projectLogTimeTasks($id);
        $options = BaseModel::options($tasks, null, 'heading');

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

    public function members($id)
    {

        $options = '<option value="">--</option>';

        $members = Task::with('activeUsers')->findOrFail($id);

        foreach ($members->activeUsers as $item) {
            $options .= '<option  data-content="<div class=\'d-inline-block mr-1\'><img class=\'taskEmployeeImg rounded-circle\' src=' . $item->image_url . ' ></div>  ' . $item->name . '" value="' . $item->id . '"> ' . $item->name . ' </option>';
        }

        return Reply::dataOnly(['status' => 'success', 'data' => $options]);
    }

    public function reminder()
    {
        $taskID = request()->id;
        $task = Task::with('users')->findOrFail($taskID);

        // Send  reminder notification to user
        event(new TaskReminderEvent($task));

        return Reply::success('messages.reminderMailSuccess');
    }
    public function get_deliverable($id)
    {
        $deliverable= ProjectDeliverable::where('milestone_id',$id)->first();
        return response()->json($deliverable);
    }
    public function show_subtask(TasksDataTable $dataTable, $id, $tableView = null)
    {
        if (in_array(user()->role_id, [1, 4, 6])) {
            if (request()->ajax() && $tableView ==  'tableView') {
                $task = Task::findOrFail($id);
                $project = $task->project;
                $variable = Subtask::where('task_id',$task->id)->first();
                // $tasks = Task::where('subtask_id',$variable->id)->get();
                $tasks = $task->subtasks;


                $totalHours = 0;
                // $totalHours = $task->estimate_hours;
                // $totalMinutes = $task->estimate_minutes;
                $totalMinutes = 0;
                
                foreach($task->subtasks as $value) {
                    $countTask = Task::where('subtask_id', $value->id)->first();
                    $totalHours = $totalHours + $countTask->estimate_hours;
                    $totalMinutes = $totalMinutes + $countTask->estimate_minutes;
                }

                if ($totalMinutes >= 60) {
                    $hours = intval(floor($totalMinutes / 60));
                    $minutes = $totalMinutes % 60;
                    $totalHours = $totalHours + $hours;
                    $totalMinutes = $minutes;
                }

                $project = $task->project;
                $html = view('tasks.ajax.showSubTask', compact('project', 'tasks', 'task'), [
                    'estimate_hours' => $totalHours,
                    'estimate_minutes' => $totalMinutes
                ])->render();
                

                return Reply::dataOnly([
                    'status' => 'success',
                    'data' => $html
                ]);
            } else {
                return redirect()->route('tasks.index');
            }
        }
    }


    public function searchSubTask(Request $request){
//        dd($request->all());
        $subTask = SubTask::where('title','like','%'.$request->search_string.'%')->where('task_id', $request->id)->orderBy('task_id','desc');
//        dd($subTask->get());
        if ($subTask->count() >=1){
//            $task = $request->id;
//            $tasks = $task->subtasks;
        //    /$taskBoardStatus = TaskboardColumn::all();
//            $project = $task->project;
            $html = view('tasks.ajax.showSubTask',compact( 'subTask'))->render();
            dd($html);
            return Reply::dataOnly([
                'status' => 'success',
                'data' => $html,

            ]);
        }else{
            return response()->json([
                'status'=>'400',
            ]);
        }
    }


}
