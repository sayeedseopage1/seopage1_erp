<?php

namespace App\Http\Controllers;

use App\DataTables\TimeLogsDataTable;
use App\Exports\EmployeeTimelogs;
use App\Helper\Reply;
use App\Http\Requests\TimeLogs\StartTimer;
use App\Http\Requests\TimeLogs\StoreTimeLog;
use App\Http\Requests\TimeLogs\UpdateTimeLog;
use App\Models\DailySubmission;
use App\Models\Project;
use App\Models\ProjectTimeLog;
use App\Models\ProjectTimeLogBreak;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\User;
use App\Models\EmployeeEvaluation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Auth;
use App\Models\DeveloperStopTimer;
use App\Models\EmployeeEvaluationTask;
use App\Models\TaskRevision;
use App\Models\PendingAction;
use App\Models\PendingActionPast;

class TimelogController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.timeLogs';
        $this->middleware(function ($request, $next) {
            abort_403(!in_array('timelogs', $this->user->modules));
            return $next($request);
        });
    }

    public function index(TimeLogsDataTable $dataTable)
    {
        $viewPermission = $this->viewTimelogPermission;
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        if (!request()->ajax()) {
            $this->employees = User::allEmployees(null, true, ($viewPermission == 'all' ? 'all' : null));
            $this->projects = Project::allProjects();
        }

        return $dataTable->render('timelogs.index', $this->data);

    }

    public function applyQuickAction(Request $request)
    {
        switch ($request->action_type) {
        case 'delete':
            $this->deleteRecords($request);
                return Reply::success(__('messages.deleteSuccess'));
        case 'change-status':
            $this->changeStatus($request);
                return Reply::success(__('messages.statusUpdatedSuccessfully'));
        default:
                return Reply::error(__('messages.selectAction'));
        }
    }

    protected function deleteRecords($request)
    {
        abort_403(user()->permission('delete_timelogs') !== 'all');
        ProjectTimeLog::whereIn('id', explode(',', $request->row_ids))->delete();
    }

    protected function changeStatus($request)
    {
        abort_403(user()->permission('edit_timelogs') !== 'all');
        ProjectTimeLog::whereIn('id', explode(',', $request->row_ids))->update(
            [
                'approved' => $request->status,
                'approved_by' => (($request->status == 1) ? user()->id : null)
            ]
        );
    }

    public function create()
    {
        $this->pageTitle = __('modules.timeLogs.logTime');
        $this->addTimelogPermission = user()->permission('add_timelogs');
        session(['add_timelogs_permission' => $this->addTimelogPermission]);
        abort_403(!in_array($this->addTimelogPermission, ['all', 'added']));

        if (request()->has('default_assign') && request('default_assign') != '') {
            $assignId = request('default_assign');
            $this->projects = $projects = Project::whereHas('members', function ($query) use ($assignId) {
                $query->where('user_id', $assignId);
            })
            ->orWhere('projects.public', 1)
            ->orderBy('project_name', 'asc')->get();
        }
        elseif (request()->has('default_project') && request('default_project') != '') {
            $defaultProject = request('default_project');
            $this->projects = $projects = Project::where('id', $defaultProject)
                ->get();
        }
        else {
            $this->projects = Project::allProjects();
        }

        $this->tasks = Task::timelogTasks(request('default_project'));

        $timeLog = new ProjectTimeLog();

        if (!empty($timeLog->getCustomFieldGroupsWithFields())) {
            $this->fields = $timeLog->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('timelogs.ajax.create', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'timelogs.ajax.create';
        return view('timelogs.create', $this->data);

    }

    public function store(StoreTimeLog $request)
    {
    //  dd($request);
        $startDateTime = Carbon::createFromFormat($this->global->date_format, $request->start_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->start_time)->format('H:i:s');
        $startDateTime = Carbon::parse($startDateTime, $this->global->timezone)->setTimezone('UTC');

        $endDateTime = Carbon::createFromFormat($this->global->date_format, $request->end_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->end_time)->format('H:i:s');
        $endDateTime = Carbon::parse($endDateTime, $this->global->timezone)->setTimezone('UTC');

        $timeLog = new ProjectTimeLog();

        if ($request->has('project_id')) {
            $timeLog->project_id = $request->project_id;
        }

        $timeLog->task_id = $request->task_id;
        $timeLog->user_id = $request->user_id;
        $userID = $request->user_id;

        $activeTimer = ProjectTimeLog::with('user')
            ->where(function ($query) use ($startDateTime, $endDateTime) {
                $query->where(
                        function ($q1) use ($startDateTime, $endDateTime) {
                            $q1->where('end_time', '>', $startDateTime->format('Y-m-d H:i:s'));
                            $q1->where('end_time', '<', $endDateTime->format('Y-m-d H:i:s'));
                        }
                    )
                    ->orWhere(
                    function ($q1) use ($startDateTime) {
                        $q1->whereDate('start_time', $startDateTime->format('Y-m-d'));
                        $q1->whereNull('end_time');
                    }
                );
            })
            ->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->where('user_id', $userID)
            ->first();

        if (is_null($activeTimer)) {
            $timeLog->start_time = $startDateTime;
            $timeLog->end_time = $endDateTime;
            $timeLog->total_hours = (int)$timeLog->end_time->diff($timeLog->start_time)->format('%d') * 24 + (int)$timeLog->end_time->diff($timeLog->start_time)->format('%H');
            $timeLog->total_minutes = ((int)$timeLog->total_hours * 60) + (int)($timeLog->end_time->diff($timeLog->start_time)->format('%i'));
            $timeLog->hourly_rate = 0;
            $timeLog->memo = $request->memo;
            $timeLog->edited_by_user = user()->id;
            $timeLog->save();

            if ($request->get('custom_fields_data')) {
                $timeLog->updateCustomFieldData($request->get('custom_fields_data'));
            }

            return Reply::successWithData(__('messages.timeLogAdded'), ['redirectUrl' => route('timelogs.index')]);
        }

        return Reply::error(__('messages.timelogAlreadyExist'));
    }

    public function destroy($id)
    {
        $timelog = ProjectTimeLog::findOrFail($id);
        $deleteTimelogPermission = user()->permission('delete_timelogs');
        abort_403(!($deleteTimelogPermission == 'all' || ($deleteTimelogPermission == 'added' && $timelog->added_by == user()->id)));

        ProjectTimeLog::destroy($id);
        return Reply::success(__('messages.timeLogDeleted'));
    }

    public function edit($id)
    {
        $this->pageTitle = __('modules.timeLogs.logTime');
        $editTimelogPermission = $this->editTimelogPermission = user()->permission('edit_timelogs');
        $timeLog = $this->timeLog = ProjectTimeLog::with('user', 'project', 'task')->findOrFail($id)->withCustomFields();
        abort_403(!(
            $editTimelogPermission == 'all'
        || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
        || ($editTimelogPermission == 'owned'
            && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
            )
        || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
        ));

        if (!is_null($this->timeLog->task_id) && !is_null($this->timeLog->project_id)) {
            $this->tasks = Task::timelogTasks($this->timeLog->project_id);
            $this->employees = $this->timeLog->task->users;
        }
        else if (!is_null($this->timeLog->project_id)) {
            $this->tasks = Task::timelogTasks($this->timeLog->project_id);
            $this->employees = $this->timeLog->project->membersMany;
        }
        else {
            $this->tasks = Task::timelogTasks();
            $this->employees = $this->timeLog->task->users;
        }

        $this->projects = Project::allProjects();

        if (!empty($this->timeLog->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->timeLog->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('timelogs.ajax.edit', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'timelogs.ajax.edit';
        return view('timelogs.create', $this->data);

    }

    public function update(UpdateTimeLog $request, $id)
    {
        $timeLog = ProjectTimeLog::findOrFail($id);

        $startDateTime = Carbon::createFromFormat($this->global->date_format, $request->start_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->start_time)->format('H:i:s');
        $startDateTime = Carbon::parse($startDateTime, $this->global->timezone)->setTimezone('UTC');

        $endDateTime = Carbon::createFromFormat($this->global->date_format, $request->end_date, $this->global->timezone)->format('Y-m-d') . ' ' . Carbon::createFromFormat($this->global->time_format, $request->end_time)->format('H:i:s');
        $endDateTime = Carbon::parse($endDateTime, $this->global->timezone)->setTimezone('UTC');


        if ($request->has('project_id')) {
            $timeLog->project_id = $request->project_id;
        }

        $timeLog->task_id = $request->task_id;

        if ($request->has('user_id')) {
            $userID = $request->user_id;
        }
        else {
            $userID = $timeLog->user_id;
        }

        $activeTimer = ProjectTimeLog::with('user')
            ->where(function ($query) use ($startDateTime, $endDateTime) {
                $query->where(
                        function ($q1) use ($startDateTime, $endDateTime) {
                            $q1->where('end_time', '>', $startDateTime->format('Y-m-d H:i:s'));
                            $q1->where('end_time', '<', $endDateTime->format('Y-m-d H:i:s'));
                        }
                    )
                    ->orWhere(
                        function ($q1) use ($startDateTime) {
                            $q1->whereDate('start_time', $startDateTime->format('Y-m-d'));
                            $q1->whereNull('end_time');
                        }
                    );
            })
            ->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->where('user_id', $userID)
            ->where('project_time_logs.id', '!=', $id)
            ->select('project_time_logs.*')
            ->first();

        if (is_null($activeTimer)) {
            $timeLog->start_time = $startDateTime->format('Y-m-d H:i:s');
            $timeLog->end_time = $endDateTime->format('Y-m-d H:i:s');
            $timeLog->total_hours = (int)$endDateTime->diff($timeLog->start_time)->format('%d') * 24 + (int)$endDateTime->diff($timeLog->start_time)->format('%H');
            $timeLog->total_minutes = ((int)$timeLog->total_hours * 60) + (int)($endDateTime->diff($timeLog->start_time)->format('%i'));

            $timeLog->memo = $request->memo;
            $timeLog->user_id = $userID;
            $timeLog->edited_by_user = user()->id;
            $timeLog->save();

            // To add custom fields data
            if ($request->get('custom_fields_data')) {
                $timeLog->updateCustomFieldData($request->get('custom_fields_data'));
            }

            return Reply::successWithData(__('messages.timeLogUpdated'), ['redirectUrl' => route('timelogs.index')]);
        }

        return Reply::error(__('messages.timelogAlreadyExist'));
    }

    public function show($id)
    {
        $this->pageTitle = __('app.menu.timeLogs');
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $this->timeLog = ProjectTimeLog::with('user', 'user.employeeDetail', 'project', 'task', 'breaks', 'activeBreak')->findOrFail($id)->withCustomFields();

        abort_403(!(
            $this->viewTimelogPermission == 'all'
        || ($this->viewTimelogPermission == 'added' && $this->timeLog->added_by == user()->id)
        || ($this->viewTimelogPermission == 'owned'
            && (($this->timeLog->project && $this->timeLog->project->client_id == user()->id) || $this->timeLog->user_id == user()->id)
            )
        || ($this->viewTimelogPermission == 'both' && (($this->timeLog->project && $this->timeLog->project->client_id == user()->id) || $this->timeLog->user_id == user()->id || $this->timeLog->added_by == user()->id))
        ));

        if (!empty($this->timeLog->getCustomFieldGroupsWithFields())) {
            $this->fields = $this->timeLog->getCustomFieldGroupsWithFields()->fields;
        }

        if (request()->ajax()) {
            $html = view('timelogs.ajax.show', $this->data)->render();
            return Reply::dataOnly(['status' => 'success', 'html' => $html, 'title' => $this->pageTitle]);
        }

        $this->view = 'timelogs.ajax.show';
        return view('timelogs.create', $this->data);

    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function showTimer()
    {
        $this->addTimelogPermission = user()->permission('add_timelogs');
        abort_403(!in_array($this->addTimelogPermission, ['all', 'added', 'owned', 'both']));

        $activeTimer = ProjectTimeLog::with('user')
            ->whereNull('end_time')
            ->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->where('user_id', $this->user->id)->first();

        if (is_null($activeTimer)) {
            $this->tasks = Task::join('task_users', 'task_users.task_id', '=', 'tasks.id')
                ->with('project')
                ->pending()
                ->where('task_users.user_id', '=', $this->user->id)
                ->select('tasks.*')
                ->get();

            return view('timelogs.ajax.timer', $this->data);

        } else {
            return $this->showActiveTimer();
        }
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function startTimer(Request $request)
    {
    // DB::beginTransaction();
     $userID = Auth::id(); // Replace with the actual user ID

    //  $yesterdayDate = ProjectTimeLog::where('user_id', $userID)
    //  ->orderBy('id', 'desc')
    //  ->select('created_at')
    //  ->first();
    //  $today_timelog_count = ProjectTimeLog::where('user_id', $userID)

    //  ->whereDate('created_at',Carbon::today())
    //  ->count();
     //dd($today_timelog_count);




 // Check if the query returned any result
    //     if(Auth::user()->role_id == 5 || Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
    //     {

    //         if ($yesterdayDate && $today_timelog_count < 1  ) {
    //             // $yesterdayDate is an object, so you need to access the "created_at" property
    //             $carbonDate = Carbon::createFromFormat('Y-m-d H:i:s', $yesterdayDate->created_at);

    //             // Get the day of the month
    //             $day = $carbonDate->format('l');
    //             $totalMinutes = DB::table('project_time_logs')
    //             ->where('user_id', $userID)
    //             ->whereDate('created_at', $yesterdayDate->created_at)
    //             ->sum('total_minutes');
    //          //   dd($totalMinutes);
    //          $acknowledgement = DeveloperStopTimer::where('user_id', Auth::user()->id)
    //          ->where(function ($query) use ($yesterdayDate) {
    //              $query->whereDate('created_at', $yesterdayDate->created_at)
    //                    ->orWhereDate('created_at', Carbon::today());
    //          })
    //          ->first();
    //         //    $daily_submission = DailySubmission::where('user_id',Auth::user()->id)->where('task_id',$request->task_id)->whereDate('created_at',$yesterdayDate->created_at)->orWhereDate('created_at',Carbon::today())->first();
    //            $daily_submission = DailySubmission::where('user_id', Auth::user()->id)
    // ->where(function ($query) use ($yesterdayDate) {
    //     $query->whereDate('created_at', Carbon::today())

    //     ->orWhereDate('created_at', $yesterdayDate->created_at);

    // })
    // ->first();
    // //dd($daily_submission);
    //           if($acknowledgement == null)
    //           {
    //             $acknowledgement_submitted = false;
    //           }else
    //           {
    //             $acknowledgement_submitted = true;

    //           }
    //           if($daily_submission  == null)
    //           {
    //             $daily_submission_submitted = false;
    //           }else
    //           {
    //             $daily_submission_submitted = true;

    //           }

    //        // dd()
    //        //dd($acknowledgement);
    //        //dd($day != 'Saturday' && $totalMinutes < 435 && $acknowledgement == null);
    //       // $date= $acknowledgement->created_at;
    //         // TODO: NEED to check $totalMinutes

    //         if($day != 'Saturday' && $totalMinutes < 420 && $acknowledgement == null )
    //         {
    //           // dd("regular day");

    //             return response()->json([
    //                 'date'=> $yesterdayDate->created_at,
    //                 'acknowledgement_submitted' => $acknowledgement_submitted ,

    //                 'error' => 'Developer did not submit the acknowledgement form'
    //             ], 400);

    //         }elseif($day == 'Saturday' && $totalMinutes < 270 && $acknowledgement == null )
    //         {
    //           // dd("regular day");

    //           // dd("Saturday");
    //            return response()->json([
    //                 'date'=> $yesterdayDate->created_at,
    //                 'acknowledgement_submitted' => $acknowledgement_submitted ,

    //                'error' => 'Developer did not submit the acknowledgement form'
    //            ], 400);


    //         }elseif($day != 'Saturday' && $totalMinutes < 420 && $daily_submission == null )
    //         {
    //           // dd("regular day");

    //           // dd("Saturday");
    //            return response()->json([
    //                 'date'=> $yesterdayDate->created_at,

    //                 'daily_submission_submitted' =>$daily_submission_submitted,
    //                'error' => 'Developer did not submit the daily submission data'
    //            ], 400);


    //         }elseif($day == 'Saturday' && $totalMinutes < 270 && $daily_submission == null )
    //         {
    //           // dd("regular day");

    //           // dd("Saturday");
    //            return response()->json([
    //                 'date'=> $yesterdayDate->created_at,

    //                 'daily_submission_submitted' =>$daily_submission_submitted,
    //                'error' => 'Developer did not submit the daily submission data'
    //            ], 400);


    //         }


    //         else
    //         {
    //            $task_status= Task::find($request->task_id);
    //            $task_status->task_status="in progress";
    //            $task_status->board_column_id= 3;
    //            $task_status->save();
    //            $task_board_column= TaskboardColumn::where('id',$task_status->board_column_id)->first();
    //            //  dd($task_status);
    //              $timeLog = new ProjectTimeLog();


    //                $activeTimer = ProjectTimeLog::with('user')
    //                    ->whereNull('end_time')
    //                    ->join('users', 'users.id', '=', 'project_time_logs.user_id')
    //                    ->where('user_id', $this->user->id)->first();
    //                if (is_null($activeTimer)) {
    //                    $taskId = $request->task_id;

    //                    if ($request->has('create_task')) {
    //                        $task = new Task();
    //                        $task->heading = $request->memo;
    //                        $task->board_column_id = $this->global->default_task_status;
    //                        $task->is_private = $request->has('is_private') && $request->is_private == 'true' ? 1 : 0;
    //                        $task->start_date = Carbon::now($this->global->timezone)->format('Y-m-d');
    //                        $task->due_date = Carbon::now($this->global->timezone)->format('Y-m-d');

    //                        if ($request->project_id != '') {
    //                            $task->project_id = $request->project_id;
    //                        }

    //                        $task->save();
    //                        $taskId = $task->id;
    //                    }

    //                    if ($request->project_id != '') {
    //                        $timeLog->project_id = $request->project_id;
    //                    }

    //                    $timeLog->task_id = $taskId;

    //                    $timeLog->user_id = $this->user->id;
    //                    $timeLog->start_time = now();
    //                    $timeLog->hourly_rate = 0;
    //                    $timeLog->memo = $task_status->heading;
    //                    $task_revision = TaskRevision::where('task_id',$request->task_id)->first();
    //                 //  /  dd($task_revision);
    //                     if($task_revision != null)
    //                     {

    //                         $timeLog->revision_id = $task_revision->id;
    //                         $timeLog->revision_status = 1;


    //                     }
    //                    $timeLog->save();

    //                    if ($request->project_id != '') {
    //                        //$this->logProjectActivity($request->project_id, 'modules.tasks.timerStartedBy');
    //                        $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedProject');
    //                    }
    //                    else {
    //                        $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedTask');
    //                    }

    //                    $this->logTaskActivity($timeLog->task_id, user()->id, 'timerStartedBy');

    //                    return response()->json([
    //                        'status' => 'success',
    //                        'message' => 'task timer started',
    //                        'id' => $timeLog->id,
    //                        'task_status'=> $task_board_column,
    //                    ]);
    //                }

    //                return response()->json([
    //                    'status' => 'error',
    //                    'message' => 'timer already running',

    //                ]);

    //         }


    //         } else {
    //            $task_status= Task::find($request->task_id);
    //            $task_status->task_status="in progress";
    //            $task_status->board_column_id= 3;
    //            $task_status->save();
    //            $task_board_column= TaskboardColumn::where('id',$task_status->board_column_id)->first();
    //            //  dd($task_status);
    //              $timeLog = new ProjectTimeLog();
    //                $activeTimer = ProjectTimeLog::with('user')
    //                    ->whereNull('end_time')
    //                    ->join('users', 'users.id', '=', 'project_time_logs.user_id')
    //                    ->where('user_id', $this->user->id)->first();
    //                if (is_null($activeTimer)) {
    //                    $taskId = $request->task_id;
    //                    if ($request->has('create_task')) {
    //                        $task = new Task();
    //                        $task->heading = $request->memo;
    //                        $task->board_column_id = $this->global->default_task_status;
    //                        $task->is_private = $request->has('is_private') && $request->is_private == 'true' ? 1 : 0;
    //                        $task->start_date = Carbon::now($this->global->timezone)->format('Y-m-d');
    //                        $task->due_date = Carbon::now($this->global->timezone)->format('Y-m-d');

    //                        if ($request->project_id != '') {
    //                            $task->project_id = $request->project_id;
    //                        }

    //                        $task->save();
    //                        $taskId = $task->id;
    //                    }

    //                    if ($request->project_id != '') {
    //                        $timeLog->project_id = $request->project_id;
    //                    }

    //                    $timeLog->task_id = $taskId;

    //                    $timeLog->user_id = $this->user->id;
    //                    $timeLog->start_time = now();
    //                    $timeLog->hourly_rate = 0;
    //                    $timeLog->memo = $task_status->heading;
    //                    $task_revision = TaskRevision::where('task_id',$request->task_id)->first();
    //                    //  /  dd($task_revision);
    //                        if($task_revision != null)
    //                        {

    //                            $timeLog->revision_id = $task_revision->id;
    //                            $timeLog->revision_status = 1;


    //                        }
    //                    $timeLog->save();

    //                    if ($request->project_id != '') {
    //                        //$this->logProjectActivity($request->project_id, 'modules.tasks.timerStartedBy');
    //                        $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedProject');
    //                    }
    //                    else {
    //                        $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedTask');
    //                    }

    //                    $this->logTaskActivity($timeLog->task_id, user()->id, 'timerStartedBy');

    //                    return response()->json([
    //                        'status' => 'success',
    //                        'message' => 'task timer started',
    //                        'id' => $timeLog->id,
    //                        'task_status'=> $task_board_column,
    //                    ]);
    //                }

    //                return response()->json([
    //                    'status' => 'error',
    //                    'message' => 'timer already running',

    //                ]);

    //         }

    //     } else
    //     {
    //        //
    //     }
        $task_status= Task::find($request->task_id);
        $task_status->task_status="in progress";
        $task_status->board_column_id= 3;
        $task_status->save();
        $actions = PendingAction::where('code','NTA')->where('past_status',0)->where('task_id',$task_status->id)->get();
        if($actions != null)
        {
        foreach ($actions as $key => $action) {
                $project= Project::where('id',$task_status->project_id)->first();
                $client= User::where('id',$project->client_id)->first();
                $project_manager= User::where('id',$project->pm_id)->first();
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
                $past_action->message = 'New task <a href="'.route('tasks.show',$task_status->id).'">'.$task_status->heading.'</a> assigned for client <a>'.$client->name.'</a> (PM <a href="'.route('employees.show',$project_manager->id).'">'.$project_manager->name.'</a>) has been started by developer <a href="'.route('employees.show',Auth::user()->id).'">'.Auth::user()->name.'</a>!';
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
        $task_board_column= TaskboardColumn::where('id',$task_status->board_column_id)->first();
        //  dd($task_status);
          $timeLog = new ProjectTimeLog();

            $activeTimer = ProjectTimeLog::with('user')
                ->whereNull('end_time')
                ->join('users', 'users.id', '=', 'project_time_logs.user_id')
                ->where('user_id', $this->user->id)->first();
            if (is_null($activeTimer)) {
                $taskId = $request->task_id;

                if ($request->has('create_task')) {
                    $task = new Task();
                    $task->heading = $request->memo;
                    $task->board_column_id = $this->global->default_task_status;
                    $task->is_private = $request->has('is_private') && $request->is_private == 'true' ? 1 : 0;
                    $task->start_date = Carbon::now($this->global->timezone)->format('Y-m-d');
                    $task->due_date = Carbon::now($this->global->timezone)->format('Y-m-d');

                    if ($request->project_id != '') {
                        $task->project_id = $request->project_id;
                    }

                    $task->save();
                    $taskId = $task->id;
                }

                if ($request->project_id != '') {
                    $timeLog->project_id = $request->project_id;
                }

                $timeLog->task_id = $taskId;

                $timeLog->user_id = $this->user->id;
                $timeLog->start_time = now();
                $timeLog->hourly_rate = 0;
                $timeLog->memo = $task_status->heading;
                $task_revision = TaskRevision::where('task_id',$request->task_id)->first();
                //  /  dd($task_revision);
                    if($task_revision != null)
                    {

                        $timeLog->revision_id = $task_revision->id;
                        $timeLog->revision_status = 1;


                    }
                $timeLog->save();

                if ($request->project_id != '') {
                    //$this->logProjectActivity($request->project_id, 'modules.tasks.timerStartedBy');
                    $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedProject');
                }
                else {
                    $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedTask');
                }

                $this->logTaskActivity($timeLog->task_id, user()->id, 'timerStartedBy');

                return response()->json([
                    'status' => 'success',
                    'message' => 'task timer started',
                    'id' => $timeLog->id,
                    'task_status'=> $task_board_column,
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'timer already running',

            ]);


  // dd($timeLog);



    }


    public function stopTimer(Request $request)
    {
    // dd($request->all());
     if(Auth::user()->role_id == 1)
     {
        $timeId = $request->timeId;
     //   dd( $timeId);
        $timeLog = ProjectTimeLog::find($timeId);
       // dd($timeLog);
        $timeLog->end_time = Carbon::now();
        $timeLog->save();
     //   dd($timeLog);

        $timeLog->total_hours = (int)$timeLog->end_time->diff($timeLog->start_time)->format('%d') * 24 + (int)$timeLog->end_time->diff($timeLog->start_time)->format('%H');
        $timeLog->total_minutes = ((int)$timeLog->total_hours * 60) + (int)($timeLog->end_time->diff($timeLog->start_time)->format('%i'));
        $timeLog->edited_by_user = $this->user->id;
        $timeLog->save();

        /**EMPLOYEE EVALUATION START */
        $taskFind = Task::where('id',$request->task_id)->where('u_id',null)->where('independent_task_status',1)->first(); //Find SubTask
        if($taskFind != null){
            $evaluation = EmployeeEvaluationTask::where('task_id',$taskFind->id)->first();
            if($evaluation !=null)
            {
                if($evaluation !=null)
                {
                    $evaluation->total_hours = $timeLog->total_hours;
                    $evaluation->total_min = $timeLog->total_minutes;
                    $evaluation->save();
                }
            }
        }

        /**EMPLOYEE EVALUATION END */

        $html = $this->showActiveTimer()->render();
        return Reply::successWithData(__('messages.timerStoppedSuccessfully'), ['html' => $html, 'activeTimerCount' => $this->activeTimerCount]);


     }else
     {
        $timeId = $request->id;
        //dd( $timeId);
        $timeLog = ProjectTimeLog::find($timeId);
       // dd($timeLog);
        $editTimelogPermission = user()->permission('edit_timelogs');
        $activeTimelogPermission = user()->permission('manage_active_timelogs');

        abort_403(!(
            $editTimelogPermission == 'all'
        || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
        || ($editTimelogPermission == 'owned'
            && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
            )
        || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
        ));

        $timeLog->end_time = Carbon::now();
        $timeLog->save();
     //   dd($timeLog);

        $timeLog->total_hours = (int)$timeLog->end_time->diff($timeLog->start_time)->format('%d') * 24 + (int)$timeLog->end_time->diff($timeLog->start_time)->format('%H');
        $timeLog->total_minutes = ((int)$timeLog->total_hours * 60) + (int)($timeLog->end_time->diff($timeLog->start_time)->format('%i'));
        $timeLog->edited_by_user = $this->user->id;
        $timeLog->save();

        /**EMPLOYEE EVALUATION START */
        $taskFind = Task::where('id',$request->task_id)->where('u_id',null)->where('independent_task_status',1)->first(); //Find SubTask
        if($taskFind != null){
            $evaluation = EmployeeEvaluationTask::where('task_id',$taskFind->id)->first();
            if($evaluation !=null)
            {
                if($evaluation->total_min !=null)
                {
                    $evaluation->total_hours = $evaluation->total_hours + $timeLog->total_hours;
                    $evaluation->total_min = $evaluation->total_min + $timeLog->total_minutes;
                    $evaluation->save();
                }else{
                    $evaluation->total_hours = $timeLog->total_hours;
                    $evaluation->total_min = $timeLog->total_minutes;
                    $evaluation->save();
                }
            }
        }

        /**EMPLOYEE EVALUATION END */

        // Stop breaktime if active
        /** @phpstan-ignore-next-line */
        if (!is_null($timeLog->activeBreak)) {
            /** @phpstan-ignore-next-line */
            $activeBreak = $timeLog->activeBreak;
            $activeBreak->end_time = $timeLog->end_time;
            $activeBreak->save();
        }

        if (!is_null($timeLog->project_id)) {
            $this->logProjectActivity($timeLog->project_id, 'modules.tasks.timerStoppedBy');
        }

        if (!is_null($timeLog->task_id)) {
            $this->logTaskActivity($timeLog->task_id, user()->id, 'timerStoppedBy');
        }

        $this->logUserActivity($this->user->id, 'modules.tasks.timerStoppedBy');

        /** @phpstan-ignore-next-line */

        $html = $this->showActiveTimer()->render();

        $this->activeTimerCount = ProjectTimeLog::whereNull('end_time')
            ->join('users', 'users.id', '=', 'project_time_logs.user_id')
            ->select('project_time_logs.id');

        if ($this->viewTimelogPermission != 'all' && manage_active_timelogs() != 'all') {
                $this->activeTimerCount->where('project_time_logs.user_id', $this->user->id);
        }

        $this->activeTimerCount = $this->activeTimerCount->count();
        // /dd("sjdnkasdnas");
        return response()->json([
            'html' => $html,
            'activeTimerCount'=> $this->activeTimerCount,
            'status' => 200,
            'message'=> 'Timer Stopped Successfully',
        ]);

     }
    //  /  DB::beginTransaction();


       // return Reply::successWithData(__('messages.timerStoppedSuccessfully'), ['html' => $html, 'activeTimerCount' => $this->activeTimerCount]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function showActiveTimer()
    {
        $this->activeTimers = ProjectTimeLog::with('task', 'task.project', 'user', 'project', 'activeBreak')->whereNull('end_time');
        $this->myActiveTimer = ProjectTimeLog::with('task', 'task.project', 'user', 'project', 'breaks', 'activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')->first();

        $this->viewTimelogPermission = user()->permission('view_timelogs');
        $activeTimelogPermission = user()->permission('manage_active_timelogs');

        abort_403($this->viewTimelogPermission == 'none' || in_array('client', user_roles()));

        if ($activeTimelogPermission != 'all') {
            if ($this->viewTimelogPermission == 'owned') {
                $this->activeTimers->where('user_id', user()->id);
            }

            if ($this->viewTimelogPermission == 'added') {
                $this->activeTimers->where('added_by', user()->id);
            }

            if ($this->viewTimelogPermission == 'both') {
                $this->activeTimers->where(function ($q) {
                    $q->where('user_id', '=', user()->id);

                    $q->orWhere('added_by', '=', user()->id);
                });
            }
        }

        $this->activeTimers = $this->activeTimers->get();

        $this->tasks = Task::join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->with('project')
            ->pending()
            ->where('task_users.user_id', '=', $this->user->id)
            ->select('tasks.*')
            ->get();

        return view('timelogs.ajax.active_timer', $this->data);
    }

    public function byEmployee()
    {
        $viewPermission = $this->viewTimelogPermission;
        abort_403(!in_array($viewPermission, ['all', 'added', 'owned', 'both']));

        $this->employees = User::allEmployees(null, true);
        $this->projects = Project::allProjects();
        $this->timeLogProjects = $this->projects;
        $this->tasks = Task::all();
        $this->timeLogTasks = $this->tasks;

        $this->activeTimers = $this->activeTimerCount;

        $this->startDate = now()->startOfMonth();
        $this->endDate = now();
        return view('timelogs.by_employee', $this->data);
    }

    public function employeeData(Request $request)
    {
        $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->toDateString();
        $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->toDateString();
        $employee = $request->employee;
        $projectId = $request->projectID;
        $this->viewTimelogPermission = user()->permission('view_timelogs');

        $this->employees = User::join('employee_details', 'users.id', '=', 'employee_details.user_id')
            ->leftJoin('project_time_logs', 'project_time_logs.user_id', '=', 'users.id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id');

        $where = '';

        if ($projectId != 'all') {
            $where .= ' and project_time_logs.project_id="' . $projectId . '" ';
        }

        $this->employees = $this->employees->select(
            'users.name',
            'users.image',
            'users.id',
            'designations.name as designation_name',
            DB::raw(
                "(SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.user_id = users.id and DATE(project_time_logs.start_time) >= '" . $startDate . "' and DATE(project_time_logs.start_time) <= '" . $endDate . "' '" . $where . "' GROUP BY project_time_logs.user_id) as total_minutes"
            ),
            DB::raw(
                "(SELECT SUM(project_time_log_breaks.total_minutes) FROM project_time_log_breaks INNER JOIN project_time_logs ON project_time_log_breaks.project_time_log_id = project_time_logs.id WHERE project_time_logs.user_id = users.id and DATE(project_time_logs.start_time) >= '" . $startDate . "' and DATE(project_time_logs.start_time) <= '" . $endDate . "' '" . $where . "' GROUP BY project_time_logs.user_id) as total_break_minutes"
            ),
            DB::raw(
                "(SELECT SUM(project_time_logs.earnings) FROM project_time_logs WHERE project_time_logs.user_id = users.id and DATE(project_time_logs.start_time) >= '" . $startDate . "' and DATE(project_time_logs.start_time) <= '" . $endDate . "' '" . $where . "' GROUP BY project_time_logs.user_id) as earnings"
            )
        );

        if (!is_null($employee) && $employee !== 'all') {
            $this->employees = $this->employees->where('project_time_logs.user_id', $employee);
        }

        if (!is_null($projectId) && $projectId !== 'all') {
            $this->employees = $this->employees->where('project_time_logs.project_id', '=', $projectId);
        }

        if ($this->viewTimelogPermission == 'owned') {
            $this->employees = $this->employees->where('project_time_logs.user_id', user()->id);
        }

        if ($this->viewTimelogPermission == 'added') {
            $this->employees = $this->employees->where('project_time_logs.added_by', user()->id);
        }

        if ($this->viewTimelogPermission == 'both') {
            $this->employees = $this->employees->where(function ($q) {
                $q->where('project_time_logs.added_by', user()->id)
                    ->orWhere('project_time_logs.user_id', '=', user()->id);
            });
        }

        $this->employees = $this->employees->groupBy('project_time_logs.user_id')
            ->orderBy('users.name')
            ->get();
        $html = view('timelogs.ajax.member-list', $this->data)->render();
        return Reply::dataOnly(['html' => $html]);
    }

    public function userTimelogs(Request $request)
    {
        $startDate = Carbon::createFromFormat($this->global->date_format, $request->startDate)->startOfDay()->toDateTimeString();
        $endDate = Carbon::createFromFormat($this->global->date_format, $request->endDate)->endOfDay()->toDateTimeString();
        $employee = $request->employee;
        $projectId = $request->projectID;

        $this->timelogs = ProjectTimeLog::with('project', 'task')->select('*')
            ->whereBetween('start_time', [$startDate, $endDate])
            ->whereNotNull('end_time')
            ->where('user_id', $employee);

        if ($projectId != 'all') {
            $this->timelogs = $this->timelogs->where('project_id', $projectId);
        }

        $this->timelogs = $this->timelogs->orderBy('end_time', 'desc')
            ->get();

        $html = view('timelogs.ajax.user-timelogs', $this->data)->render();
        return Reply::dataOnly(['html' => $html]);
    }

    public function approveTimelog(Request $request)
    {
        ProjectTimeLog::where('id', $request->id)->update(
            [
                'approved' => 1,
                'approved_by' => user()->id
            ]
        );
        return Reply::dataOnly(['status' => 'success']);
    }

    public function export()
    {
        return Excel::download(new EmployeeTimelogs, 'timelogs.xlsx');
    }

    public function pauseTimer(Request $request)
    {
        $timeId = $request->timeId;
        $timeLog = ProjectTimeLog::findOrFail($timeId);
        $editTimelogPermission = user()->permission('edit_timelogs');
        $activeTimelogPermission = user()->permission('manage_active_timelogs');

        abort_403(!(
            $editTimelogPermission == 'all'
        || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
        || ($editTimelogPermission == 'owned'
            && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
            )
        || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
        ));

        $timeLogBreak = new ProjectTimeLogBreak();
        $timeLogBreak->project_time_log_id = $timeLog->id;
        $timeLogBreak->start_time = now();
        $timeLogBreak->total_minutes = 0;
        $timeLogBreak->save();

        if (!is_null($timeLog->project_id)) {
            //$this->logProjectActivity($timeLog->project_id, 'modules.tasks.timerPausedBy');
        }

        if (!is_null($timeLog->task_id)) {
            $this->logTaskActivity($timeLog->task_id, user()->id, 'timerPausedBy');
        }

        $this->logUserActivity($this->user->id, 'modules.tasks.timerPausedBy');

        /** @phpstan-ignore-next-line */
        $html = $this->showActiveTimer()->render();

        return Reply::successWithData(__('messages.timerPausedSuccessfully'), ['html' => $html]);
    }

    public function resumeTimer(Request $request)
    {
        $timeId = $request->timeId;
        $timeLogBreak = ProjectTimeLogBreak::findOrfail($timeId);
        $timeLog = ProjectTimeLog::findOrFail($timeLogBreak->project_time_log_id);
        $editTimelogPermission = user()->permission('edit_timelogs');

        abort_403(!(
            $editTimelogPermission == 'all'
        || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
        || ($editTimelogPermission == 'owned'
            && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
            )
        || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
        ));

        $endTime = now();
        $timeLogBreak->end_time = $endTime;

        $timeLogBreak->total_hours = (int)$endTime->diff($timeLogBreak->start_time)->format('%d') * 24 + (int)$endTime->diff($timeLogBreak->start_time)->format('%H');

        $timeLogBreak->total_minutes = ((int)$timeLogBreak->total_hours * 60) + (int)($endTime->diff($timeLogBreak->start_time)->format('%i'));
        $timeLogBreak->save();

        $this->logUserActivity($this->user->id, 'modules.tasks.timerStartedBy');

        /** @phpstan-ignore-next-line */
        $html = $this->showActiveTimer()->render();

        return Reply::successWithData(__('messages.timerStartedSuccessfully'), ['html' => $html]);
    }

}
