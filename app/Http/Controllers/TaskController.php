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
use App\Models\PMProject;
use App\Models\PmTaskGuideline;
use App\Models\PMTaskGuidelineAuthorization;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\ProjectMilestone;
use App\Models\ProjectTimeLogBreak;
use App\Models\Role;
use App\Models\SubTask;
use App\Models\SubTaskFile;
use App\Models\Task;
use App\Models\TaskboardColumn;
use App\Models\TaskCategory;
use App\Models\TaskLabel;
use App\Models\TaskLabelList;
use App\Models\TaskReply;
use App\Models\TaskRevision;
use App\Models\TaskUser;
use App\Models\User;
use App\Models\WorkingEnvironment;
use App\Notifications\PmTaskGuidelineNotification;
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
use Str;
use Toastr;
use Auth;
use App\Models\ProjectDeliverable;
use function _PHPStan_7d6f0f6a4\React\Promise\all;
use function Clue\StreamFilter\fun;
use function PHPUnit\Framework\isNull;
use App\Models\TaskComment;
use App\Models\AuthorizationAction;
use App\Models\Deal;
use App\Models\DeveloperReportIssue;
use App\Models\TaskNote;
use App\Models\TaskNoteFile;

use App\Models\ProjectTimeLog;
use App\Models\TaskHistory;
use App\Models\DeveloperStopTimer;
use App\Models\TaskDisputeQuestion;
use App\Models\TaskRevisionDispute;
use App\Models\TaskType;
use App\Models\DailySubmission;
use App\Models\PendingParentTaskConversation;
use App\Models\PendingParentTasks;
use App\Notifications\PendingParentTasksNotification;

use function Symfony\Component\Cache\Traits\role;
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

        $this->role = [
            3 => 'C',
            4 => 'PM',
            5 => "D",
            6 => "LD",
            7 => "S",
            8 => "S",
            9 => "UD",
            "null" => "C"
        ];
    }

    public function index()
    {

        return view('tasks.index', $this->data);


      //  return $dataTable->render('tasks.index', $this->data);
    }
    public function get_tasks(Request $request)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $assignee_to = $request->input('assignee_to', null);
        $assignee_by = $request->input('assignee_by', null);

        $pmId = $request->input('pm_id', null);
        $clientId = $request->input('client_id', null);
        $projectId = $request->input('project_id', null);
        $status = $request->input('status', null);
        $date_filter_by = $request->input('date_filter_by', null);



        $tasks = Task::select(
            'tasks.*', 'tasks.heading as task_name', 'projects.project_name', 'projects.id as project_id',
            'client.id as client_id', 'client.name as client_name', 'client.image as client_avatar',
            'tasks.estimate_minutes', 'tasks.estimate_hours', 'assigned_to.id as assigned_to_id',
            'assigned_to.name as assigned_to_name', 'assigned_to.image as assigned_to_avatar',
            'added_by.name as added_by_name', 'added_by.image as added_by_avatar','project_milestones.milestone_title',
            'pm_id.id as project_manager_id',
            'pm_id.name as pm_id_name', 'pm_id.image as pm_id_avatar',
            'project_deliverables.title as deliverable_title','task_approves.created_at as task_approval_date',
            'taskboard_columns.column_name','taskboard_columns.label_color','project_time_logs.created_at as task_start_date',
            'tasks.created_at as creation_date','tasks.updated_at as completion_date',
            'project_time_logs.start_time','project_time_logs.end_time',
            'task_category.category_name',

            DB::raw('(SELECT COUNT(sub_tasks.id) FROM sub_tasks WHERE sub_tasks.task_id = tasks.id AND DATE(sub_tasks.created_at) >= "'.$startDate.'" AND DATE(sub_tasks.created_at) <= "'.$endDate.'") as subtasks_count')

        )
            ->where('tasks.subtask_id', null)
            ->join('projects', 'projects.id', 'tasks.project_id')
            ->join('users as client', 'client.id', 'projects.client_id')
            ->join('task_users', 'task_users.task_id', 'tasks.id')
            ->join('users as assigned_to', 'assigned_to.id', 'task_users.user_id')
            ->join('users as added_by', 'added_by.id', 'tasks.added_by')
            ->join('users as pm_id', 'pm_id.id', 'projects.pm_id')
            ->join('project_milestones','project_milestones.id','tasks.milestone_id')
            ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
            ->leftJoin('task_category','task_category.id','tasks.task_category_id')
            ->leftJoin('project_time_logs','project_time_logs.task_id','tasks.id')
            ->leftJoin('project_deliverables','project_deliverables.milestone_id','project_milestones.id')
            ->leftJoin('task_approves','task_approves.task_id','tasks.id')
            ->groupBy('tasks.id')
           // ->leftJoin('task_approves','task_approves.task_id','tasks.id')
            ;
            //->orderBy('id', 'desc');
            // ->get();
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
            if (!is_null($projectId)) {
                $tasks = $tasks->where('tasks.project_id', $projectId);
            }
            if (!is_null($assignee_to)) {
                $tasks = $tasks->where('task_users.user_id', $assignee_to);
            }
            if (!is_null($assignee_by)) {
                $tasks = $tasks->where('tasks.added_by', $assignee_by);
            }
            if (!is_null($pmId)) {
                $tasks = $tasks->where('projects.pm_id', $pmId);
            }
            if (!is_null($clientId)) {
                $tasks = $tasks->where('projects.client_id', $clientId);
            }
            if (!is_null($date_filter_by)) {
                if($date_filter_by == 'Created Date')
                {
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



                }elseif($date_filter_by == 'Due Date')
                {
                    if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                    {


                        $tasks = $tasks->whereDate('tasks.due_date', '=', Carbon::parse($startDate)->format('Y-m-d'));


                    }else
                    {
                        if (!is_null($startDate)) {
                            $tasks = $tasks->whereDate('tasks.due_date', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                        }
                        if (!is_null($endDate)) {
                            $tasks = $tasks->whereDate('tasks.due_date', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                        }

                    }

                }else
                {
                    if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                    {


                        $tasks = $tasks->whereDate('tasks.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));


                    }else
                    {
                        if (!is_null($startDate)) {
                            $tasks = $tasks->whereDate('tasks.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                        }
                        if (!is_null($endDate)) {
                            $tasks = $tasks->whereDate('tasks.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                        }

                    }

                }

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

           foreach ($tasks as $task) {
            $task->files= TaskFile::where('task_id',$task->id)->get();
            $subtasks_hours_logged = Subtask::select('tasks.*')

            ->where('sub_tasks.task_id', $task->id)
                ->join('tasks', 'tasks.subtask_id', 'sub_tasks.id')
                ->leftJoin('project_time_logs', 'project_time_logs.task_id', 'tasks.id')
                ->sum('project_time_logs.total_minutes');
                $subtasks_completed_count = Subtask::select('tasks.*')

                ->where('sub_tasks.task_id', $task->id)
                    ->join('tasks', 'tasks.subtask_id', 'sub_tasks.id')

                    ->whereIn('tasks.board_column_id',['4','8','7'])
                    ->count();
                    $subtasks_timer_active = Subtask::select('tasks.*')

                    ->where('sub_tasks.task_id', $task->id)
                        ->join('tasks', 'tasks.subtask_id', 'sub_tasks.id')
                        ->leftJoin('project_time_logs', 'project_time_logs.task_id', 'tasks.id')
                        ->where('project_time_logs.start_time','!=',null)

                        ->where('project_time_logs.end_time',null)
                        ->count();
            $task_hours_logged= Task::select('tasks.*')->leftJoin('project_time_logs', 'project_time_logs.task_id', 'tasks.id')
            ->where('task_id',$task->id)
            ->sum('project_time_logs.total_minutes');
            $subtasks_reports_count = Subtask::select('sub_tasks.*','developer_report_issues.id as report_issues')

                    ->where('sub_tasks.task_id', $task->id)
                        ->join('tasks', 'tasks.subtask_id', 'sub_tasks.id')

                        ->leftJoin('developer_report_issues as report_issues', 'report_issues.task_id', 'tasks.id')

                        ->count('report_issues.id');
                        $tasks_reports_count = Task::select('tasks.*','developer_report_issues.id as report_issues')

                        ->where('tasks.id', $task->id)

                            ->leftJoin('developer_report_issues as report_issues', 'report_issues.task_id', 'tasks.id')

                            ->count('report_issues.id');


            $task->subtasks_hours_logged = $subtasks_hours_logged+ $task_hours_logged;
            $task->subtasks_completed_count = $subtasks_completed_count;
            $task->subtasks_timer_active = $subtasks_timer_active;

            $task->subtasks_reports_count = $subtasks_reports_count+$tasks_reports_count;

        }
    //    dd($tasks);

                return response()->json([
                    'status' => 200,
                    'tasks'=> $tasks,

                ]);




    }
    public function get_task_subtask($id)
    {
        $tasks = Subtask::select(
            'tasks.*', 'tasks.heading as task_name', 'projects.project_name', 'projects.id as project_id',
            'client.id as client_id', 'client.name as client_name', 'client.image as client_avatar',
            'tasks.estimate_minutes', 'tasks.estimate_hours', 'assigned_to.id as assigned_to_id',
            'pm_id.id as project_manager_id',
            'pm_id.name as pm_id_name', 'pm_id.image as pm_id_avatar',
            'assigned_to.name as assigned_to_name', 'assigned_to.image as assigned_to_avatar',
            'added_by.name as added_by_name', 'added_by.image as added_by_avatar','project_milestones.milestone_title',
            'project_deliverables.title as deliverable_title','task_approves.created_at as task_approval_date',
            'taskboard_columns.column_name','taskboard_columns.label_color','project_time_logs.created_at as task_start_date',
            'tasks.created_at as creation_date','tasks.updated_at as completion_date',
            'project_time_logs.start_time','project_time_logs.end_time',



            DB::raw('(SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE task_id = tasks.id) as subtasks_hours_logged'),
            DB::raw('(SELECT COUNT(developer_report_issues.id) FROM developer_report_issues WHERE developer_report_issues.task_id = tasks.id) as subtasks_reports_count')
        )
            ->where('sub_tasks.task_id', $id)
            ->join('tasks','tasks.subtask_id','sub_tasks.id')
            ->join('projects', 'projects.id', 'tasks.project_id')
            ->join('users as client', 'client.id', 'projects.client_id')
            ->join('task_users', 'task_users.task_id', 'tasks.id')
            ->join('users as assigned_to', 'assigned_to.id', 'task_users.user_id')
            ->join('users as added_by', 'added_by.id', 'tasks.added_by')
            ->join('users as pm_id', 'pm_id.id', 'projects.pm_id')


            ->join('project_milestones','project_milestones.id','tasks.milestone_id')
            ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
            ->leftJoin('project_time_logs','project_time_logs.task_id','tasks.id')
            ->leftJoin('project_deliverables','project_deliverables.milestone_id','project_milestones.id')
            ->leftJoin('task_approves','task_approves.task_id','tasks.id')

        ->groupBy('tasks.id')
            ->orderBy('id', 'desc')
            ->get();

            return response()->json([
                'status' => 200,
                'tasks'=> $tasks,

            ]);
    }
    public function get_subtasks(Request $request)
    {
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $assignee_to = $request->input('assignee_to', null);
        $assignee_by = $request->input('assignee_by', null);

        $pmId = $request->input('pm_id', null);
        $clientId = $request->input('client_id', null);
        $status = $request->input('status', null);
        $date_filter_by = $request->input('date_filter_by', null);
        $projectId = $request->input('project_id', null);



        $tasks = SubTask::select(
            'tasks.*', 'tasks.heading as task_name', 'projects.project_name', 'projects.id as project_id',
            'client.id as client_id', 'client.name as client_name', 'client.image as client_avatar',
            'tasks.estimate_minutes', 'tasks.estimate_hours', 'assigned_to.id as assigned_to_id',
            'assigned_to.name as assigned_to_name', 'assigned_to.image as assigned_to_avatar',
            'added_by.name as added_by_name', 'added_by.image as added_by_avatar','project_milestones.milestone_title',
            'pm_id.id as project_manager_id',
            'pm_id.name as pm_id_name', 'pm_id.image as pm_id_avatar',
            'project_deliverables.title as deliverable_title','task_approves.created_at as task_approval_date',
            'taskboard_columns.column_name','taskboard_columns.label_color','project_time_logs.created_at as task_start_date',
            'tasks.created_at as creation_date','tasks.updated_at as completion_date',
            'task_category.category_name',
            'task_files.filename',


            DB::raw('(SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE task_id = tasks.id) as subtasks_hours_logged'),
            DB::raw('(SELECT COUNT(developer_report_issues.id) FROM developer_report_issues WHERE developer_report_issues.task_id = tasks.id) as subtasks_reports_count')

        )
            ->where('tasks.subtask_id','!=', null)
            ->join('tasks', 'tasks.subtask_id', 'sub_tasks.id')
            ->join('projects', 'projects.id', 'tasks.project_id')
            ->join('users as client', 'client.id', 'projects.client_id')
            ->join('task_users', 'task_users.task_id', 'tasks.id')
            ->join('users as assigned_to', 'assigned_to.id', 'task_users.user_id')
            ->join('users as added_by', 'added_by.id', 'tasks.added_by')
            ->join('users as pm_id', 'pm_id.id', 'projects.pm_id')


            ->join('project_milestones','project_milestones.id','tasks.milestone_id')
            ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
            ->leftJoin('task_category','task_category.id','tasks.task_category_id')
            ->leftJoin('project_time_logs','project_time_logs.task_id','tasks.id')
            ->leftJoin('project_deliverables','project_deliverables.milestone_id','project_milestones.id')
            ->leftJoin('task_approves','task_approves.task_id','tasks.id')
            ->leftJoin('task_files','task_files.task_id','tasks.id')


            ->groupBy('tasks.id')
           // ->leftJoin('task_approves','task_approves.task_id','tasks.id')
            ;
            //->orderBy('id', 'desc');
            // ->get();
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
            if (!is_null($projectId)) {
                $tasks = $tasks->where('tasks.project_id', $projectId);
            }
            if (!is_null($assignee_to)) {
                $tasks = $tasks->where('task_users.user_id', $assignee_to);
            }
            if (!is_null($assignee_by)) {
                $tasks = $tasks->where('tasks.added_by', $assignee_by);
            }
            if (!is_null($pmId)) {
                $tasks = $tasks->where('projects.pm_id', $pmId);
            }
            if (!is_null($clientId)) {
                $tasks = $tasks->where('projects.client_id', $clientId);
            }
            if (!is_null($date_filter_by)) {
                if($date_filter_by == 'Created Date')
                {
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



                }elseif($date_filter_by == 'Due Date')
                {
                    if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                    {


                        $tasks = $tasks->whereDate('tasks.due_date', '=', Carbon::parse($startDate)->format('Y-m-d'));


                    }else
                    {
                        if (!is_null($startDate)) {
                            $tasks = $tasks->whereDate('tasks.due_date', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                        }
                        if (!is_null($endDate)) {
                            $tasks = $tasks->whereDate('tasks.due_date', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                        }

                    }

                }else
                {
                    if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
                    {


                        $tasks = $tasks->whereDate('tasks.updated_at', '=', Carbon::parse($startDate)->format('Y-m-d'));


                    }else
                    {
                        if (!is_null($startDate)) {
                            $tasks = $tasks->whereDate('tasks.updated_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                        }
                        if (!is_null($endDate)) {
                            $tasks = $tasks->whereDate('tasks.updated_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                        }

                    }

                }

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
            if(Auth::user()->role_id == 5)
            {
                $tasks = $tasks->where('task_users.user_id',Auth::id())->orderBy('tasks.created_at', 'desc')->get();

            }else {
                $tasks = $tasks->orderBy('tasks.created_at', 'desc')->get();
            }



           // dd($tasks);



                return response()->json([
                    'status' => 200,
                    'tasks'=> $tasks,

                ]);




    }
    public function get_parent_tasks_report_issues($id)
    {
        $sub_tasks = Subtask::select(
            'developer_report_issues.*',
            'developer_report_issues.comment','person.id as responsible_person_id','person.name as responsible_person_name',
            'person.image as responsible_person_avatar','report_issue_added_by.id as report_issue_added_by','report_issue_added_by.name as report_issue_added_by',
            'report_issue_added_by.image as report_issue_added_by_avatar',  'developer_report_issues.previousNotedIssue',  'developer_report_issues.reason',

        )
            ->where('sub_tasks.task_id', $id)

            ->leftjoin('tasks','tasks.subtask_id','sub_tasks.id')
            ->leftJoin('developer_report_issues','developer_report_issues.task_id','tasks.id')


            ->join('users as person', 'person.id', 'developer_report_issues.person')
            ->join('users as report_issue_added_by', 'report_issue_added_by.id', 'developer_report_issues.added_by')



          //  ->groupBy('tasks.id')
            ->orderBy('id', 'desc')
            ->get();
            $tasks = Task::select(
                'developer_report_issues.*',
                'developer_report_issues.comment','person.id as responsible_person_id','person.name as responsible_person_name',
                'person.image as responsible_person_avatar','report_issue_added_by.id as report_issue_added_by','report_issue_added_by.name as report_issue_added_by',
                'report_issue_added_by.image as report_issue_added_by_avatar',  'developer_report_issues.previousNotedIssue',  'developer_report_issues.reason',

            )
                ->where('tasks.id', $id)
                ->where('subtask_id',null)


                ->leftJoin('developer_report_issues','developer_report_issues.task_id','tasks.id')


                ->join('users as person', 'person.id', 'developer_report_issues.person')
                ->join('users as report_issue_added_by', 'report_issue_added_by.id', 'developer_report_issues.added_by')



              //  ->groupBy('tasks.id')
                ->orderBy('id', 'desc')
                ->get();
                $mergedArray = $sub_tasks->merge($tasks);

            return response()->json([
                'status' => 200,
                'tasks'=> $mergedArray,

            ]);

    }
    public function get_sub_tasks_report_issues($id)
    {
        $tasks = Task::select(
            'developer_report_issues.*',
            'developer_report_issues.comment','person.id as responsible_person_id','person.name as responsible_person_name',
            'person.image as responsible_person_avatar','report_issue_added_by.id as report_issue_added_by','report_issue_added_by.name as report_issue_added_by',
            'report_issue_added_by.image as report_issue_added_by_avatar',  'developer_report_issues.previousNotedIssue',  'developer_report_issues.reason',

        )
            ->where('tasks.id', $id)

            ->leftJoin('developer_report_issues','developer_report_issues.task_id','tasks.id')


            ->join('users as person', 'person.id', 'developer_report_issues.person')
            ->join('users as report_issue_added_by', 'report_issue_added_by.id', 'developer_report_issues.added_by')



         //   ->groupBy('tasks.id')
            ->orderBy('id', 'desc')
            ->get();

            return response()->json([
                'status' => 200,
                'tasks'=> $tasks,

            ]);

    }

    public function resolve_report(Request $request)
    {
        $report = DeveloperReportIssue::find($request->report_id);
        $report->admin_comment = $request->admin_comment;

        $report->status = $request->status;
        $report->resolved_by= Auth::id();
        $report->save();
        return response()->json([
            'status' => 200,
            'reports'=> $report,

        ]);


    }


    public function TaskReview(Request $request)
    {
    // dd($request);
        $validator = Validator::make($request->input(), [
            'link' => 'required|array',
            'link.*' => 'required|url|min:1',
            'text' => 'required',
        ], [
            'link.url' => 'Invalid url!',
            'link.*.required' => 'This field is required',
            'text.required' => 'Please describe what you\'ve done !',
        ]);

    //    $link = [];
    //     foreach ($validator->errors()->toArray() as $key => $value) {
    //         if (strpos($key, 'link.') !== false) {
    //             $exp = explode('.', $key);
    //             $link[$exp[1]] = $value[0];
    //         }
    //     }

    //     $errors = $validator->errors()->toArray();
    //     $errors = array_merge($errors, ['link' => $link]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'errors' => $errors
    //         ], 422);
    //    }

        $order = TaskSubmission::orderBy('id', 'desc')->where('user_id', $request->user_id)->where('task_id', $request->task_id)->first();

        if ($request->text != null) {
            $task_submit = new TaskSubmission();
            $task_submit->task_id = $request->task_id;
            $task_submit->user_id = $request->user_id;

            //$task_submit->table=$request->table;
            //$task_submit->list=$request->list;
            $task_submit->text = $request->text;
            if ($order == null) {
                $task_submit->submission_no = 1;
            } else {
                $task_submit->submission_no = $order->submission_no + 1;
            }
            $task_submit->save();
        }

        if ($request->link != null) {

            foreach ( $request->link as $lin) {


                $task_submit = new TaskSubmission();
                $task_submit->task_id = $request->task_id;
                $task_submit->user_id = $request->user_id;

                $task_submit->link = $lin;
                if ($order == null) {
                    $task_submit->submission_no = 1;
                } else {
                    $task_submit->submission_no = $order->submission_no + 1;
                }

                $task_submit->save();
            }
        }
       // dd($task_submit);

        if ($request->file('file') != null) {
            foreach ($request->file('file') as $att) {
                $task_submit = new TaskSubmission();
                $filename = null;
                if ($att) {
                    $filename = time() . $att->getClientOriginalName();

                    Storage::disk('public')->putFileAs(
                        'TaskSubmission/',
                        $att,
                        $filename
                    );
                }
                $task_submit->attach = $filename;
                $task_submit->task_id = $request->task_id;
                $task_submit->user_id = $request->user_id;
                if ($order == null) {
                    $task_submit->submission_no = 1;
                } else {
                    $task_submit->submission_no = $order->submission_no + 1;
                }
                $task_submit->save();
            }
        }



        $task = Task::find($request->task_id);
        $task->board_column_id = 6;
        $task->task_status = "submitted";
        $task->save();
        $board_column = TaskBoardColumn::where('id',$task->board_column_id)->first();
     //   dd($task_submit,$task,$board_column);



        $task_id = Task::where('id', $task->id)->first();

        $user = User::where('id', $task->added_by)->first();
        $sender = User::where('id', $request->user_id)->first();

        $text = Auth::user()->name . ' mark task complete';
        $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
        $this->logProjectActivity($task->project->id, $link);

        $this->triggerPusher('notification-channel', 'notification', [
            'user_id' => $task->project->pm_id,
            'role_id' => 4,
            'title' => 'Task complete request',
            'body' => Auth::user()->name . ' mark task complete',
            'redirectUrl' => route('tasks.show', $task->id)
        ]);

        Notification::send($user, new TaskSubmitNotification($task_id, $sender));

        //Toastr::success('Submitted Successfully', 'Success', ["positionClass" => "toast-top-right"]);
        return response()->json([
            'status' => 200,
            'task_status'=> $board_column,
        ]);
    }



    public function TaskApprove(Request $request)
    {
      //  dd($request);
        $request->validate([
            'rating' => 'required',
            'rating2' => 'required',
            'rating3' => 'required',
            'comment' => 'required',
        ], [
            'rating.required' => 'This field is required!',
            'rating2.required' => 'This field is required!',
            'rating3.required' => 'This field is required!',
            'comment.required' => 'This field is required!',
        ]);
        // DB::beginTransaction();
       // dd($request->task_id);
        $task_status = Task::find($request->task_id);
        $task_status->status = "completed";
        $task_status->task_status = "approved";
        $task_status->board_column_id = 8;
        $task_status->save();
        $board_column = TaskBoardColumn::where('id',$task_status->board_column_id)->first();
        // dd($task_status);
        if (Auth::user()->role_id == 6) {
            $lead_dev_authorization = AuthorizationAction::where('task_id',$task_status->id)->where('type','task_submission_by_developer')->where('authorization_for',Auth::id())->first();
            //dd($lead_dev_authorization);
            if($lead_dev_authorization != null && $lead_dev_authorization->status == 0)
            {
                $lead_dev_authorization_update= AuthorizationAction::find($lead_dev_authorization->id);
                $lead_dev_authorization_update->status= '1';
                $lead_dev_authorization_update->authorization_by = Auth::id();
                $lead_dev_authorization_update->save();

            }
        }

        if(Auth::user()->role_id == 4)
        {
            $pm_authorization = AuthorizationAction::where('task_id',$task_status->id)->where('type','task_submission_by_lead_developer')->where('authorization_for',Auth::id())->first();
            //dd($lead_dev_authorization);
            if($pm_authorization != null && $pm_authorization->status == 0)
            {
                $lead_dev_authorization_update= AuthorizationAction::find($lead_dev_authorization->id);
                $lead_dev_authorization_update->status= '1';
                $lead_dev_authorization_update->authorization_by = Auth::id();
                $lead_dev_authorization_update->save();

            }

        }




        //    / dd( $lead_dev_authorization_update);

        $task = new TaskApprove();
        $task->user_id = $request->user_id;
        $task->task_id = $request->task_id;
        $task->rating = $request->rating;
        $task->rating2 = $request->rating2;
        $task->rating3 = $request->rating3;
        $task->comments = $request->comments;
        $task->save();
        //dd($task, $task_status);


        //authorizatoin action start here
        // $authorization_action = new AuthorizationAction();
        // $authorization_action->model_name = $task_status->getMorphClass();
        // $authorization_action->model_id = $task_status->id;
        // $authorization_action->type = 'task_approved_by_lead_develoer';
        // $authorization_action->deal_id = $task_status->project->deal_id;
        // $authorization_action->project_id = $task_status->project_id;
        // $authorization_action->link = route('tasks.show', $request->task_id);
        // $authorization_action->title = Auth::user()->name . ' approved this task';
        // $authorization_action->authorization_for = 1;
        // $authorization_action->save();
        //end authorization action here

        $text = Auth::user()->name . ' mark task completed';
        $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
        $this->logProjectActivity($task->task->project->id, $link);

        $this->triggerPusher('notification-channel', 'notification', [
            'user_id' => $task->user_id,
            'role_id' => User::find($request->user_id)->role_id,
            'title' => 'Task complete request approved',
            'body' => Auth::user()->name . ' mark task completed',
            'redirectUrl' => route('tasks.show', $task->id)
        ]);

        $task_submission = TaskSubmission::where('task_id', $task_status->id)->first();
        $sender = User::where('id', Auth::id())->first();
        $user = User::where('id', $task_submission->user_id)->first();
        Notification::send($user, new TaskApproveNotification($task_status, $sender));
        return response()->json([
            'status' => 200,
            'task_status'=> $board_column,
        ]);
    }
    public function CheckPmTaskGuideline($id)
    {
        $task_guideline= PmTaskGuideline::where('project_id',$id)->first();
        $task_count= Task::where('project_id',$id)->count();
        if($task_guideline == null && $task_count < 1)
        {
            return response()->json([
                'status' => 400,
                'message'=> 'Need to add pm task guidelines',
            ]);

        }else
        {
            return response()->json([
                'status' => 200,
                'message'=> 'Pm can add tasks',
            ]);


        }
    }

    public function TaskRevision(Request $request)
    {
    //    dd($request);
    //    DB::beginTransaction();

        $task_status = Task::find($request->task_id);
        $task_status->status = "incomplete";
        $task_status->task_status = "revision";
        $task_status->board_column_id = 1;
        $task_status->save();
        $board_column = TaskBoardColumn::where('id',$task_status->board_column_id)->first();


       if (Auth::user()->role_id == 6) {
        $lead_dev_authorization = AuthorizationAction::where('task_id',$task_status->id)->where('type','task_submission_by_developer')->where('authorization_for',Auth::id())->first();
        if($lead_dev_authorization != null && $lead_dev_authorization->status == '0')
        {
            $lead_dev_authorization_update= AuthorizationAction::find($lead_dev_authorization->id);
            $lead_dev_authorization_update->status= '1';
            $lead_dev_authorization_update->authorization_by = Auth::id();
            $lead_dev_authorization_update->save();

        }
       }
      if (Auth::user()->role_id == 4) {
            $pm_authorization = AuthorizationAction::where('task_id',$task_status->id)->where('type','task_submission_by_lead_developer')->where('authorization_for',Auth::id())->first();

            if($pm_authorization != null && $pm_authorization->status == '1')
            {
                $pm_authorization_update= AuthorizationAction::find($pm_authorization->id);
                $pm_authorization_update->status= '1';
                $pm_authorization->authorization_by = Auth::id();
                $pm_authorization->save();

            }
      }


        $task_revision = new TaskRevision();
        $task_revision->task_id = $request->task_id;
        if (Auth::user()->role_id == 6) {
            $task_revision->revision_status = 'Lead Developer Revision';
            $task_revision->lead_comment = $request->comment;
        }

        if(Auth::user()->role_id == 4){
            $task_revision->revision_status = 'Project Manager Revision';
            $task_revision->pm_comment = $request->comment;
        }
        $task_revision->revision_acknowledgement = $request->revision_acknowledgement;
        $task_revision->acknowledgement_id = $request->acknowledgement_id;

        $task_revision->project_id = $task_status->project_id;
        $task_revision->added_by = Auth::id();
        $taskRevisionCount = TaskRevision::where('task_id', $task_status->id)->count();
        $task_revision->revision_no = $taskRevisionCount + 1 ;
        $task_revision->is_deniable = $request->is_deniable;
        $task_revision->dispute_between = explode('x', $request->acknowledgement_id)[0];
        $task_revision->save();

        //dd($type);
        //authorizatoin action start here
        if (Auth::user()->role_id == 6) {
            $type = 'task_revision_by_lead_developer';
        } else {
            $type = 'task_revision_by_project_manager';
        }

        $task_user= TaskUser::where('task_id',$task_status->id)->first();
        $authorization_action = new AuthorizationAction();
        $authorization_action->model_name = $task_status->getMorphClass();
        $authorization_action->model_id = $task_status->id;
        $authorization_action->type = $type;
        $authorization_action->deal_id = $task_status->project->deal_id;
        $authorization_action->project_id = $task_status->project->id;
        $authorization_action->task_id = $task_status->id;
        $authorization_action->link = route('tasks.show', $request->task_id);
        $authorization_action->title = Auth::user()->name . ' send task revision request';
        $authorization_action->authorization_for = $task_user->user_id;
        $authorization_action->save();
        //end authorization action here

        $task_submission = TaskSubmission::where('task_id', $task_status->id)->first();

        $text = Auth::user()->name . ' send revision request';
        $link = '<a href="' . route('tasks.show', $task_status->id) . '">' . $text . '</a>';
        $this->logProjectActivity($task_status->project->id, $link);

        $task_user = TaskUser::where('task_id', $request->task_id)->first();
        $task_user_data = User::find($task_user->user_id);

        $this->triggerPusher('notification-channel', 'notification', [
            'user_id' => $task_user_data->id,
            'role_id' => $task_user_data->role_id,
            'title' => 'Revision request',
            'body' => Auth::user()->name . ' send revision request',
            'redirectUrl' => route('tasks.show', $task_status->id)
        ]);

        $user = User::where('id', $task_submission->user_id)->first();
        $sender = User::where('id', $request->user_id)->first();
        Notification::send($user, new TaskRevisionNotification($task_status, $sender));

        //Toastr::success('Task Revision Successfully', 'Success', ["positionClass" => "toast-top-right"]);
       // return redirect()->back();
       return response()->json([
        'status' => 200,
        'task_status'=> $board_column,
    ]);
    }



    public function TaskExtension(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->due_date));


        $task = new TaskTimeExtension();
        $task->user_id = $request->user_id;
        $task->task_id = $request->task_id;
        $task->due_date = $date;
        $task->description = $request->description;
        $task->save();

        // authorization action section
        $task_id = Task::find($request->task_id);
        $project_id = Project::find($task_id->project_id);

        if ($this->user->role_id == 6) {
            $type = 'task_time_extension_by_lead_developer';
            $authorization_for = $project_id->pm_id;
        } else {
            $type = 'task_time_extension_by_developer';
            $authorization_for = $task_id->added_by;
        }

        $authorization_action = new AuthorizationAction();
        $authorization_action->model_name = $task->getMorphClass();
        $authorization_action->model_id = $task->id;
        $authorization_action->type = $type;
        $authorization_action->deal_id = $project_id->deal_id;
        $authorization_action->project_id = $project_id->id;
        $authorization_action->link = route('tasks.show', $task_id->id);
        $authorization_action->title = Auth::user()->name . ' send task time extention';
        $authorization_action->authorization_for = $authorization_for;
        $authorization_action->save();
        //end authorization action

        return Redirect::back()->with('messages.taskUpdatedSuccessfully');
    }
    public function TaskExtensionApprove(Request $request)
    {
        $task_e = TaskTimeExtension::find($request->id);
        //dd($task);
        $task_e->updated_by = $request->added_by;
        $task_e->due_date = $request->due_date;

        $task_e->status = "approved";

        $task_e->save();
        $task = Task::find($request->task_id);
        $task->original_due_date = $task->due_date;
        $task->due_date = $task_e->due_date;
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
        abort_403(!($this->changeStatusPermission == 'all'
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
        } else {
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
        } else {
            if ($this->task && $this->task->project) {
                $this->milestones = $this->task->project->milestones;
            } else {
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
            } else {

                $this->employees = $this->project->membersMany;
            }
        } else if (!is_null($this->task) && !is_null($this->task->project_id)) {

            if ($this->task->project->public) {
                $this->employees = User::allEmployees(null, true, ($this->addPermission == 'all' ? 'all' : null));
            } else {

                $this->employees = $this->task->project->membersMany;
            }
        } else {

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
        $project_id = Project::where('id', $request->project_id)->first();
        $task_estimation_hours = Task::where('project_id', $project_id->id)->sum('estimate_hours');
        $task_estimation_minutes = Task::where('project_id', $project_id->id)->sum('estimate_minutes');
        $total_task_estimation_minutes = $task_estimation_hours * 60 + $task_estimation_minutes;
        $left_minutes = ($project_id->hours_allocated - $request->estimate_hours) * 60 - ($total_task_estimation_minutes + $request->estimate_minutes);

        $left_in_hours = round($left_minutes / 60, 0);
        $left_in_minutes = $left_minutes % 60;

        if ($left_minutes < 1) {
            // return response()->json([
            //     "message" => "The given data was invalid.",
            //     "errors" => [
            //         "estimate_hours" => [
            //             "Estimate hours cannot exceed from project allocation hours !"
            //         ]
            //     ]
            // ], 422);
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
        $task->board_column_id = 2;

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
        $task->deliverable_id = $request->deliverable_id;

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
        $task->task_status = "pending";
        $total_hours = $request->estimate_hours * 60;
        $total_minutes = $request->estimate_minutes;
        $total_in_minutes = $total_hours + $total_minutes;
        $task->estimate_time_left_minutes = $total_in_minutes;


        $task->save();

        $task->task_short_code = ($project) ? $project->project_short_code . '-' . $task->id : null;
        $task->saveQuietly();
        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new TaskFile();
                $file->task_id = $task->id;

                $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $task->id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
            }
        }

        // save labels
        // $task->labels()->sync($request->task_labels);
        // dd($request->taskId);
        // if (!is_null($request->taskId)) {

        //     $taskExists = TaskFile::where('task_id', $request->taskId)->get();

        //     if ($taskExists) {
        //         foreach ($taskExists as $taskExist) {
        //             $file = new TaskFile();
        //             $file->user_id = $taskExist->user_id;
        //             $file->task_id = $task->id;

        //             if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $task->id))) {
        //                 File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $task->id), 0775, true);
        //             }

        //             $fileName = Files::generateNewFileName($taskExist->filename);
        //             copy(public_path(Files::UPLOAD_FOLDER . '/task-files/' . $taskExist->task_id . '/' . $taskExist->hashname), public_path(Files::UPLOAD_FOLDER . '/task-files/' . $task->id . '/' . $fileName));

        //             $file->filename = $taskExist->filename;
        //             $file->hashname = $fileName;
        //             $file->size = $taskExist->size;
        //             $file->save();

        //             $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
        //         }
        //     }

        //     $subTask = SubTask::with(['files'])->where('task_id', $request->taskId)->get();

        //     if ($subTask) {
        //         foreach ($subTask as $subTasks) {
        //             $subTaskData = new SubTask();
        //             $subTaskData->title = $subTasks->title;
        //             $subTaskData->task_id = $task->id;
        //             $subTaskData->description = str_replace('<p><br></p>', '', trim($subTasks->description));

        //             if ($subTasks->start_date != '' && $subTasks->due_date != '') {
        //                 $subTaskData->start_date = $subTasks->start_date;
        //                 $subTaskData->due_date = $subTasks->due_date;
        //             }


        //             $subTaskData->assigned_to = $subTasks->assigned_to;

        //             $subTaskData->save();

        //             if ($subTasks->files) {
        //                 foreach ($subTasks->files as $fileData) {
        //                     $file = new SubTaskFile();
        //                     $file->user_id = $fileData->user_id;
        //                     $file->sub_task_id = $subTaskData->id;

        //                     $fileName = Files::generateNewFileName($fileData->filename);

        //                     if (!File::exists(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id))) {
        //                         File::makeDirectory(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id), 0775, true);
        //                     }

        //                     copy(public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $fileData->sub_task_id . '/' . $fileData->hashname), public_path(Files::UPLOAD_FOLDER . '/' . SubTaskFile::FILE_PATH . '/' . $subTaskData->id . '/' . $fileName));

        //                     $file->filename = $fileData->filename;
        //                     $file->hashname = $fileName;
        //                     $file->size = $fileData->size;
        //                     $file->save();
        //                 }
        //             }
        //         }
        //     }
        // }

        // To add custom fields data
        // if ($request->get('custom_fields_data')) {
        //     $task->updateCustomFieldData($request->get('custom_fields_data'));
        // }

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

        if (is_array($request->user_id)) {
            $assigned_to = User::find($request->user_id[0]);

            if ($assigned_to->role_id == 6) {
                //authorization action start

                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $task->getMorphClass();
                $authorization_action->model_id = $task->id;
                $authorization_action->type = 'task_assigned_on_lead_developer';
                $authorization_action->deal_id = $task->project->deal_id;
                $authorization_action->project_id = $task->project_id;
                $authorization_action->link = route('projects.show', $task->project->id) . '?tab=tasks';
                $authorization_action->title = Auth::user()->name . ' assigned task on you';
                $authorization_action->authorization_for = $assigned_to->id;
                $authorization_action->save();
                //authorization action end
            }
            $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet assigned new task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        } else {
            $assigned_to = User::find($request->user_id);
            if ($assigned_to->role_id == 6) {
                //authorization action start

                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $task->getMorphClass();
                $authorization_action->model_id = $task->id;
                $authorization_action->type = 'task_assigned_on_lead_developer';
                $authorization_action->deal_id = $task->project->deal_id;
                $authorization_action->project_id = $task->project_id;
                $authorization_action->link = route('projects.show', $task->project_id) . '?tab=tasks';
                $authorization_action->title = Auth::user()->name . ' assigned task on you';
                $authorization_action->authorization_for = $assigned_to->id;
                $authorization_action->save();
                //authorization action end
            }
            $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet assigned new task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        }

        $redirectUrl = urldecode($request->redirect_url);

        if ($redirectUrl == '') {
            //$redirectUrl = url('/account/projects/418?tab=tasks');
            $redirectUrl = route('projects.show', $request->project_id) . '?tab=tasks';
        }

        return Reply::successWithData(__('messages.taskCreatedSuccessfully'), ['redirectUrl' => $redirectUrl, 'taskID' => $task->id]);
    }
    public function StoreNewTask(Request $request)
    {
       //  dd($request->all());
    //    DB::beginTransaction();
        $setting = global_setting();
        $rules = [
            'heading' => 'required',
            'estimate_hours' => 'required',
            'estimate_minutes' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'milestone_id'=>'required',


        ];
        $validator = Validator::make($request->all(), $rules);



        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }
        $project_id = Project::where('id', $request->project_id)->first();
        $task_estimation_hours = Task::where('project_id', $project_id->id)->sum('estimate_hours');
        $task_estimation_minutes = Task::where('project_id', $project_id->id)->sum('estimate_minutes');
        $total_task_estimation_minutes = $task_estimation_hours * 60 + $task_estimation_minutes;
        $left_minutes = ($project_id->hours_allocated - $request->estimate_hours) * 60 - ($total_task_estimation_minutes + $request->estimate_minutes);

        $left_in_hours = round($left_minutes / 60, 0);
        $left_in_minutes = $left_minutes % 60;
        //dd($left_minutes);
        if ($left_minutes < 0) {
            return response()->json([
                "message" => "The given data was invalid.",
                "errors" => [
                    "hours" => [
                        "Estimate hours cannot exceed from project allocation hours !"
                    ]
                ]
            ], 422);
        }
       
       
        if ($request->estimate_hours == 0 && $request->estimate_minutes == 0) {
            return response()->json([
                "message" => "Wrong Input",
                "errors" => [
                    "hours" => [
                        "Estimate hours and minutes cannot be 0 !"
                    ]
                ]
            ], 422);
        }


 //dd($request);
        $project = request('project_id') ? Project::findOrFail(request('project_id')) : null;

        if (is_null($project) || ($project->project_admin != user()->id)) {
            $this->addPermission = user()->permission('add_tasks');
            abort_403(!in_array($this->addPermission, ['all', 'added']));
        }

        // DB::beginTransaction();
        $ganttTaskArray = [];
        $gantTaskLinkArray = [];
        $taskBoardColumn = TaskboardColumn::where('slug', 'incomplete')->first();
        if($request->need_authorization=="true" && $request->sub_acknowledgement !=null){
            $pending_parent_tasks = new PendingParentTasks();
            $pending_parent_tasks->heading = $request->heading;
            $pending_parent_tasks->description = $request->description;
            $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
            $pending_parent_tasks->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
            $pending_parent_tasks->due_date = $dueDate;
            $pending_parent_tasks->project_id = $request->project_id;
            $pending_parent_tasks->category_id = $request->category_id;
            $pending_parent_tasks->priority = $request->priority;
            $pending_parent_tasks->board_column_id = $request->board_column_id;
            $pending_parent_tasks->estimate_hours = $request->estimate_hours;
            $pending_parent_tasks->estimate_minutes = $request->estimate_minutes;
            $pending_parent_tasks->deliverable_id = $request->deliverable_id;
            $pending_parent_tasks->milestone_id = $request->milestone_id;
            $pending_parent_tasks->user_id = $request->user_id;
            $pending_parent_tasks->added_by = Auth::user()->id;
            $pending_parent_tasks->acknowledgement = $request->acknowledgement;
            $pending_parent_tasks->sub_acknowledgement = $request->sub_acknowledgement;
            $pending_parent_tasks->need_authorization = $request->need_authorization ? 1 : 0;
            $pending_parent_tasks->save();
            if ($request->hasFile('file')) {

                foreach ($request->file as $fileData) {
                    $file = new TaskFile();
                    $file->task_id = $pending_parent_tasks->id;

                    $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $pending_parent_tasks->id);

                    $file->user_id = $pending_parent_tasks->user_id;
                    $file->filename = $fileData->getClientOriginalName();
                    $file->hashname = $filename;
                    $file->size = $fileData->getSize();
                    $file->save();

                    $this->logTaskActivity($pending_parent_tasks->id, $pending_parent_tasks->user_id, 'fileActivity', $pending_parent_tasks->board_column_id);
                }
            }

            if (is_array($request->user_id)) {
                // $assigned_to = User::find($request->user_id[0]);

                // if ($assigned_to->role_id == 6) {
                //     $authorization_action = new AuthorizationAction();
                //     $authorization_action->model_name = $pending_parent_tasks->getMorphClass();
                //     $authorization_action->model_id = $pending_parent_tasks->id;
                //     $authorization_action->type = 'task_assigned_on_lead_developer';
                //     $authorization_action->deal_id = $pending_parent_tasks->project->deal_id;
                //     $authorization_action->project_id = $pending_parent_tasks->project_id;
                //     $authorization_action->link = route('projects.show', $pending_parent_tasks->project->id) . '?tab=tasks';
                //     $authorization_action->title = Auth::user()->name . ' assigned task on you';
                //     $authorization_action->authorization_for = $assigned_to->id;
                //     $authorization_action->save();
                //     //authorization action end
                // }
                // $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
                // $link = '<a href="' . route('tasks.show', $pending_parent_tasks->id) . '">' . $text . '</a>';
                // $this->logProjectActivity($project->id, $link);

                // $this->triggerPusher('notification-channel', 'notification', [
                //     'user_id' => $assigned_to->id,
                //     'role_id' => $assigned_to->role_id,
                //     'title' => 'You have new task',
                //     'body' => 'Project managet assigned new task on you',
                //     'redirectUrl' => route('tasks.show', $pending_parent_tasks->id)
                // ]);

            } else {
                // $assigned_to = User::find($request->user_id);
                // if ($assigned_to->role_id == 6) {

                //     $authorization_action = new AuthorizationAction();
                //     $authorization_action->model_name = $pending_parent_tasks->getMorphClass();
                //     $authorization_action->model_id = $pending_parent_tasks->id;
                //     $authorization_action->type = 'task_assigned_on_lead_developer';
                //     $authorization_action->deal_id = $pending_parent_tasks->project->deal_id;
                //     $authorization_action->project_id = $pending_parent_tasks->project_id;
                //     $authorization_action->link = route('projects.show', $pending_parent_tasks->project_id) . '?tab=tasks';
                //     $authorization_action->title = Auth::user()->name . ' assigned task on you';
                //     $authorization_action->authorization_for = $assigned_to->id;
                //     $authorization_action->save();
                //     //authorization action end
                // }
                // $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
                // $link = '<a href="' . route('tasks.show', $pending_parent_tasks->id) . '">' . $text . '</a>';
                // $this->logProjectActivity($project->id, $link);

                // $this->triggerPusher('notification-channel', 'notification', [
                //     'user_id' => $assigned_to->id,
                //     'role_id' => $assigned_to->role_id,
                //     'title' => 'You have new task',
                //     'body' => 'Project managet assigned new task on you',
                //     'redirectUrl' => route('tasks.show', $pending_parent_tasks->id)
                // ]);
            }
        $users = User::where('role_id',1)->orWhere('role_id',8)->get();
            foreach($users as $user)
            {
                Notification::send($user, new PendingParentTasksNotification($pending_parent_tasks));
            }


        }else{
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

        // if ($request->has('dependent') && $request->has('dependent_task_id') && $request->dependent_task_id != '') {
        //     $dependentTask = Task::findOrFail($request->dependent_task_id);

        //     // if (!is_null($dependentTask->due_date) && !is_null($dueDate) && $dependentTask->due_date->greaterThan($dueDate)) {
        //     //     /* @phpstan-ignore-line */
        //     //     return Reply::error(__('messages.taskDependentDate'));
        //     // }

        //     $task->dependent_task_id = $request->dependent_task_id;
        // }

        $task->is_private = $request->has('is_private') ? 1 : 0;
        $task->billable = $request->has('billable') && $request->billable ? 1 : 0;
        $task->estimate_hours = $request->estimate_hours;
        $task->estimate_minutes = $request->estimate_minutes;
        $task->deliverable_id = $request->deliverable_id;

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
        $task->task_status = "pending";
        $total_hours = $request->estimate_hours * 60;
        $total_minutes = $request->estimate_minutes;
        $total_in_minutes = $total_hours + $total_minutes;
        $task->estimate_time_left_minutes = $total_in_minutes;


        $task->save();


        $task->task_short_code = ($project) ? $project->project_short_code . '-' . $task->id : null;
        $task->saveQuietly();
        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new TaskFile();
                $file->task_id = $task->id;

                $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $task->id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
            }
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


        // DB::commit();

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

        if (is_array($request->user_id)) {
            $assigned_to = User::find($request->user_id[0]);

            if ($assigned_to->role_id == 6) {
                //authorization action start

                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $task->getMorphClass();
                $authorization_action->model_id = $task->id;
                $authorization_action->type = 'task_assigned_on_lead_developer';
                $authorization_action->deal_id = $task->project->deal_id;
                $authorization_action->project_id = $task->project_id;
                $authorization_action->link = route('projects.show', $task->project->id) . '?tab=tasks';
                $authorization_action->title = Auth::user()->name . ' assigned task on you';
                $authorization_action->authorization_for = $assigned_to->id;
                $authorization_action->save();
                //authorization action end
            }
            $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet assigned new task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        } else {
            $assigned_to = User::find($request->user_id);
            if ($assigned_to->role_id == 6) {
                //authorization action start

                $authorization_action = new AuthorizationAction();
                $authorization_action->model_name = $task->getMorphClass();
                $authorization_action->model_id = $task->id;
                $authorization_action->type = 'task_assigned_on_lead_developer';
                $authorization_action->deal_id = $task->project->deal_id;
                $authorization_action->project_id = $task->project_id;
                $authorization_action->link = route('projects.show', $task->project_id) . '?tab=tasks';
                $authorization_action->title = Auth::user()->name . ' assigned task on you';
                $authorization_action->authorization_for = $assigned_to->id;
                $authorization_action->save();
                //authorization action end
            }
            $text = Auth::user()->name . ' assigned new task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet assigned new task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        }
    }
        return response()->json([
            'status' => 200,
            'message'=> 'Task added successfully',

        ]);

        // $redirectUrl = urldecode($request->redirect_url);

        // if ($redirectUrl == '') {
        //     //$redirectUrl = url('/account/projects/418?tab=tasks');
        //     $redirectUrl = route('projects.show', $request->project_id) . '?tab=tasks';
        // }

        // return Reply::successWithData(__('messages.taskCreatedSuccessfully'), ['redirectUrl' => $redirectUrl, 'taskID' => $task->id]);
    }
    public function EditTask(Request $request)
    {
       // DB::beginTransaction();
        $setting = global_setting();
        $rules = [
            'heading' => 'required',
            'estimate_hours' => 'required',
            'estimate_minutes' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'milestone_id'=>'required',


        ];
        $validator = Validator::make($request->all(), $rules);



        if ($validator->fails()) {
            return response($validator->errors(), 422);
        }
        $project_id = Project::where('id', $request->project_id)->first();
        $task_id= Task::where('id',$request->task_id)->first();
        $task_estimation_hours = Task::where('project_id', $project_id->id)->sum('estimate_hours');
        $task_estimation_minutes = Task::where('project_id', $project_id->id)->sum('estimate_minutes');
        $total_task_estimation_minutes = $task_estimation_hours * 60 + $task_estimation_minutes;
      //  $left_minutes = ($project_id->hours_allocated+ $task_id->estimate_hours - $request->estimate_hours) * 60 - (($total_task_estimation_minutes  + $request->estimate_minutes);
        $left_minutes = ($project_id->hours_allocated - $task_id->estimate_hours + $request->estimate_hours) * 60 - (($total_task_estimation_minutes- $task_id->estimate_minutes  + $request->estimate_minutes));
        $left_in_hours = round($left_minutes / 60, 0);
        $left_in_minutes = $left_minutes % 60;
    //   / dd($left_minutes);
        // if ($left_minutes < 0) {
        //     return response()->json([
        //         "message" => "Something went wrong",
        //         "errors" => [
        //             "hours" => [
        //                 "Estimate hours cannot exceed from project allocation hours !"
        //             ]
        //         ]
        //     ], 422);
        // }
        // if ($request->estimate_hours == 0 && $request->estimate_minutes == 0) {
        //     return response()->json([
        //         "message" => "Wrong Input",
        //         "errors" => [
        //             "hours" => [
        //                 "Estimate hours and minutes cannot be 0 !"
        //             ]
        //         ]
        //     ], 422);
        // }


        // dd($request);
        $project = request('project_id') ? Project::findOrFail(request('project_id')) : null;

        if (is_null($project) || ($project->project_admin != user()->id)) {
            $this->addPermission = user()->permission('edit_tasks');
            abort_403(!in_array($this->addPermission, ['all', 'added']));
        }

        DB::beginTransaction();
        $ganttTaskArray = [];
        $gantTaskLinkArray = [];

        $task = Task::find($request->task_id);
        $task->heading = $request->heading;

        $task->description = str_replace('<p><br></p>', '', trim($request->description));

        $dueDate = ($request->has('without_duedate')) ? null : Carbon::createFromFormat($this->global->date_format, $request->due_date)->format('Y-m-d');
        $task->start_date = Carbon::createFromFormat($this->global->date_format, $request->start_date)->format('Y-m-d');
        $task->due_date = $dueDate;
        $task->project_id = $request->project_id;
        $task->task_category_id = $request->category_id;
        $task->priority = $request->priority;
        $task->board_column_id = $request->board_column_id;


        $task->is_private = $request->has('is_private') ? 1 : 0;
        $task->billable = $request->has('billable') && $request->billable ? 1 : 0;
        $task->estimate_hours = $request->estimate_hours;
        $task->estimate_minutes = $request->estimate_minutes;
        $task->deliverable_id = $request->deliverable_id;



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
        $task->task_status = "pending";
        $total_hours = $request->estimate_hours * 60;
        $total_minutes = $request->estimate_minutes;
        $total_in_minutes = $total_hours + $total_minutes;
        $task->estimate_time_left_minutes = $total_in_minutes;


        $task->save();

        $assignee = TaskUser::where('task_id',$task->id)->first();
        $assignee->user_id = $request->user_id;
        $assignee->save();


        if ($request->hasFile('file')) {

            foreach ($request->file as $fileData) {
                $file = new TaskFile();
                $file->task_id = $task->id;

                $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $task->id);

                $file->user_id = $this->user->id;
                $file->filename = $fileData->getClientOriginalName();
                $file->hashname = $filename;
                $file->size = $fileData->getSize();
                $file->save();

                $this->logTaskActivity($task->id, $this->user->id, 'fileActivity', $task->board_column_id);
            }
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



        if (is_array($request->user_id)) {
            $assigned_to = User::find($request->user_id[0]);


            $text = Auth::user()->name . ' assigned task updated by ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'Task Updated',
                'body' => 'Task Assignee updated the tasks',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        } else {
            $assigned_to = User::find($request->user_id);

            $text = Auth::user()->name . ' assigned task updated by' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'Task Updated',
                'body' => 'Task Assignee updated the tasks',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        }
        return response()->json([
            'status' => 200,
            'task'=> $task,
            'message'=> 'Task updated successfully',

        ]);


    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Contracts\Foundation\Application|
     * \Illuminate\Contracts\View\Factory|
     * \Illuminate\Contracts\View\View
     * \Illuminate\Http\Response
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
        } else {
            $this->allTasks = [];
        }

        if ($this->task->project_id) {
            if ($this->task->project->public) {
                $this->employees = User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null));
            } else {
                $this->employees = $this->task->project->membersMany;
            }
        } else {
            if ($editTaskPermission == 'added' || $editTaskPermission == 'owned') {
                $this->employees = ((count($this->task->users) > 0) ? $this->task->users : User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null)));
            } else {
                $this->employees = User::allEmployees(null, null, ($editTaskPermission == 'all' ? 'all' : null));
            }
        }


        $uniqueId = $this->task->task_short_code;
        // check if unuqueId contains -
        if (strpos($uniqueId, '-') !== false) {
            $uniqueId = explode('-', $uniqueId, 2);
            $this->projectUniId = $uniqueId[0];
            $this->taskUniId = $uniqueId[1];
        } else {
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
        $task->deliverable_id = $request->deliverable_id;

        if ($request->has('board_column_id')) {
            $task->board_column_id = $request->board_column_id;

            $taskBoardColumn = TaskboardColumn::findOrFail($request->board_column_id);

            if ($taskBoardColumn->slug == 'completed') {
                $task->completed_on = now()->format('Y-m-d');
            } else {
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
        } else {
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

        if (is_array($request->user_id)) {
            $assigned_to = User::find($request->user_id[0]);
            $text = Auth::user()->name . ' update task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet update task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        } else {
            $assigned_to = User::find($request->user_id);
            $text = Auth::user()->name . ' update task on ' . $assigned_to->name;
            $link = '<a href="' . route('tasks.show', $task->id) . '">' . $text . '</a>';
            $this->logProjectActivity($project->id, $link);

            $this->triggerPusher('notification-channel', 'notification', [
                'user_id' => $assigned_to->id,
                'role_id' => $assigned_to->role_id,
                'title' => 'You have new task',
                'body' => 'Project managet update task on you',
                'redirectUrl' => route('tasks.show', $task->id)
            ]);
        }

        // Sync task users
        $task->users()->sync($request->user_id);

        return Reply::successWithData(__('messages.taskUpdatedSuccessfully'), ['redirectUrl' => route('tasks.show', $id)]);
    }

    public function show(Request $request, $id)
    {
        $viewTaskFilePermission = user()->permission('view_task_files');
        $viewSubTaskPermission = user()->permission('view_sub_tasks');
        $this->viewTaskCommentPermission = user()->permission('view_task_comments');
        $this->viewTaskNotePermission = user()->permission('view_task_notes');
        $this->viewUnassignedTasksPermission = user()->permission('view_unassigned_tasks');
        $this->replys = DB::table('task_replies')
            ->join('users', 'task_replies.user_id', '=', 'users.id')
            ->select('task_replies.*', 'users.name', 'users.image', 'users.updated_at')
            ->get();
        //        dd($this->replys);

        //         $this->details = EmployeeDetails::where('add');
        //         dd($details);




        $this->task = Task::with([
            'boardColumn', 'project', 'users', 'label', 'approvedTimeLogs', 'approvedTimeLogs.user', 'approvedTimeLogs.activeBreak', 'comments', 'comments.user', 'subtasks.files', 'userActiveTimer',
            'files' => function ($q) use ($viewTaskFilePermission) {
                if ($viewTaskFilePermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            },
            'subtasks' => function ($q) use ($viewSubTaskPermission) {
                if ($viewSubTaskPermission == 'added') {
                    $q->where('added_by', user()->id);
                }
            }
        ])
            ->withCount('subtasks', 'files', 'comments', 'activeTimerAll')
            ->findOrFail($id)->withCustomFields();

        $this->taskUsers = $taskUsers = $this->task->users->pluck('id')->toArray();

        $this->taskSettings = TaskSetting::first();

        $viewTaskPermission = user()->permission('view_tasks');
        abort_403(!($viewTaskPermission == 'all'
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
        if (module_enabled('Gitlab')) {
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
        $this->task = Task::where('id', $id)->first();
        $project = Project::where('id', $this->task->project_id)->first();
        $task_member = TaskUser::where('task_id', $id)->first();
        $sender = User::where('id', Auth::id())->first();
        $users = User::where('id', $this->task->added_by)->orWhere('id', $task_member->user_id)->orWhere('id', $project->pm_id)->get();

        $this->replys = DB::table('task_replies')
            ->join('users', 'task_replies.user_id', '=', 'users.id')
            ->select('task_replies.*', 'users.name', 'users.image', 'users.updated_at')
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
                if ($this->taskSettings->sub_task == 'yes' && in_array('client', user_roles())) {
                    $this->tab = 'tasks.ajax.sub_tasks';
                } elseif ($this->taskSettings->comments == 'yes' && in_array('client', user_roles())) {
                    abort_403($this->viewTaskCommentPermission == 'none');
                    $this->tab = 'tasks.ajax.comments';
                } elseif ($this->taskSettings->time_logs == 'yes' && in_array('client', user_roles())) {
                    abort_403($this->viewTaskNotePermission == 'none');
                    $this->tab = 'tasks.ajax.timelogs';
                } elseif ($this->taskSettings->notes == 'yes' && in_array('client', user_roles())) {
                    abort_403($this->viewTaskNotePermission == 'none');
                    $this->tab = 'tasks.ajax.notes';
                } elseif ($this->taskSettings->history == 'yes' && in_array('client', user_roles())) {
                    abort_403($this->viewTaskNotePermission == 'none');
                    $this->tab = 'tasks.ajax.history';
                } elseif (!in_array('client', user_roles())) {
                    $this->tab = 'tasks.ajax.sub_tasks';
                }
                break;
        }

        if ($request->mode == 'react_json') {
            return response()->json($this->data);
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
        } else {
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
        $deliverable = ProjectDeliverable::where('milestone_id', $id)->first();
        return response()->json($deliverable);
    }
    public function show_subtask(TasksDataTable $dataTable, $id, $tableView = null)
    {
        if (in_array(user()->role_id, [1, 4, 6])) {
            if (request()->ajax() && $tableView ==  'tableView') {
                $task = Task::findOrFail($id);
                $project = $task->project;
                $variable = Subtask::where('task_id', $task->id)->first();
                // $tasks = Task::where('subtask_id',$variable->id)->get();
                $tasks = $task->subtasks;


                $totalHours = 0;
                // $totalHours = $task->estimate_hours;
                // $totalMinutes = $task->estimate_minutes;
                $totalMinutes = 0;

                foreach ($task->subtasks as $value) {
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


    public function searchSubTask(Request $request)
    {
        //        dd($request->all());
        $subTask = SubTask::where('title', 'like', '%' . $request->search_string . '%')->where('task_id', $request->id)->orderBy('task_id', 'desc');
        //        dd($subTask->get());
        if ($subTask->count() >= 1) {
            //            $task = $request->id;
            //            $tasks = $task->subtasks;
            //    /$taskBoardStatus = TaskboardColumn::all();
            //            $project = $task->project;
            $html = view('tasks.ajax.showSubTask', compact('subTask'))->render();
            //            dd($html);
            return Reply::dataOnly([
                'status' => 'success',
                'data' => $html,

            ]);
        } else {
            return response()->json([
                'status' => '400',
            ]);
        }
    }

    //    CLIENT APPROVAL SECTION
    public function clientApproval(Request $request)
    {
        // dd($request);
        $task_status = Task::find($request->task_id);
        $task_status->task_status = "submit task to client approval";
        $task_status->board_column_id = 9;
        $task_status->save();

        $subtasks = Subtask::where('task_id',$task_status->id)->get();
        foreach($subtasks as $subtask)
        {
            $task_id= Task::where('subtask_id',$subtask->id)->first();
            $task= Task::find($task_id->id);
            $task->task_status = "submit task to client approval";
            $task->board_column_id = 9;
            $task->save();

        }
        return response()->json([
            'status' => 200,
        ]);
    }

    //    CLIENT APPROVED TASK SECTION
    public function clientApprovedTask(Request $request)
    {
        // /dd($request);
        $task_status = Task::find($request->task_id);
        $task_status->status = "completed";
        $task_status->board_column_id = 4;
        $task_status->save();
        $parentTask = Subtask::where('task_id', $request->task_id)->get();
        foreach ($parentTask as $subtask) {
            $subTask = Task::where('subtask_id', $subtask->id)->first();
            $updateTask = Task::find($subTask->id);
            $updateTask->status = "completed";
            $updateTask->board_column_id = 4;
            $updateTask->save();
        }
        return response()->json([
            'status' => 200,
        ]);
    }





     /************* CLIENT HAS REVISION *************** */
    public function clientHasRevision(Request $request)
    {


        $dispute_between = explode('x', $request->acknowledgement_id)[0];

        $auth = Auth::user();


        // chagne board column status
        $task_status = Task::find($request->task_id);
        $task_status->task_status = "revision";
        $task_status->board_column_id = 1;
        $task_status->save();

        $sale = null;
        if($dispute_between == 'SPR'){
            // find sale person
            $project_deal_id = Project::find($task_status->project_id)->deal_id;
            $sale = Deal::find($project_deal_id)->added_by;
       }

        // store revision on revision table
        $task_revision = new TaskRevision(); // instance of TaskRevision

        $task_revision->pm_comment= $request->comment;
        $task_revision->revision_acknowledgement = $request->revision_acknowledgement;
        $task_revision->task_id = $request->task_id;
        $task_revision->is_deniable = $request->is_deniable;

        if($request->is_deniable == false && $auth->role_id != 1 ){
            $task_revision->final_responsible_person = $this->role[$auth->role_id];
        }


        // if ($task_status->subtask_id != null) {
        //     $task_revision->subtask_id = $task_status->subtask_id;
        // }
        $task_revision->revision_status = "Client Has Revision";

        $task_revision->project_id = $task_status->project_id;
        $task_revision->acknowledgement_id = $request->acknowledgement_id;
        $task_revision->additional_amount= $request->additional_amount;
        $task_revision->additional_status= $request->additional_status;
        $task_revision->additional_deny_comment=$request->additional_comment;
        $task_revision->sale_person = $sale;

        $task_revision->dispute_created = $request->dispute_create;
        $task_revision->dispute_between = $dispute_between;

        $task_revision->added_by = Auth::id();
        $taskRevisionFind = TaskRevision::where('task_id', $task_status->id)->orderBy('id', 'desc')->get();
        foreach ($taskRevisionFind as $taskRevision) {
            $taskRevision->revision_no = $taskRevision->revision_no + 1;
            $taskRevision->save();
        }
        // $parentTask = Subtask::where('task_id',$request->task_id)->get();
        // dd($parentTask);
        // foreach ($parentTask as $subtask){
        //     $subTask = Task::where('subtask_id',$subtask->id)->first();
        //     $updateTask = Task::find($subTask->id);
        //     $updateTask->status= "incomplete";
        //     $updateTask->task_status= "revision";
        //     $updateTask->board_column_id=1;
        //     $updateTask->save();
        // }
        // dd($task_revision);
        $task_revision->save();


        // CREATE DISPUTE
        if($request->dispute_create){
            $this->create_dispute($task_revision, $request);
        }

        return response()->json([
            'status' => 200,
        ]);
    }


    //ACCEPT AND CONTINUE BUTTON SECTION
    public function acceptContinue(Request $request)
    {
        $task_status = Task::find($request->task_id);
        $task_status->task_status = "in progress";
        $task_status->board_column_id = 3;
        $task_status->save();
      //  dd($request->revision_id);
        $subtasks = SubTask::where('task_id', $request->task_id)->get();
        if ($request->subTask != null){
           // $selected_subtasks = SubTask::whereIn('id', $request->subTask->subtask_id)->get();
           $selected_subtasks  = $request->subTask;
           // dd($selected_subtasks);
            foreach ($selected_subtasks as $key => $selected_subtask) {

                $find_task_id = Task::where('id', $selected_subtask['subtask_id'])->first();
                $sub_task_status = Task::find($find_task_id->id);
                $sub_task_status->task_status = "incomplete";
                $sub_task_status->board_column_id = 1;
                $sub_task_status->save();


                $tasks_accept = new TaskRevision();
                // $tasks_accept->subtask_id = $selected_subtask['subtask_id'];
                $tasks_accept->task_id = $selected_subtask['subtask_id'];
                $tasks_accept->added_by = $request->user_id;
                $tasks_accept->revision_acknowledgement = $request->revision_acknowledgement;
                $tasks_accept->revision_status = 'Lead Developer Revision';
                $tasks_accept->lead_comment = $selected_subtask['comment'];
                $tasks_accept->project_id = $request->project_id;
                $tasks_accept->is_deniable = $selected_subtask['is_deniable'];
                $tasks_accept->acknowledgement_id = $selected_subtask['acknowledgement_id'];
                $tasks_accept->dispute_between = $selected_subtask['acknowledgement_id'] ?  explode('x', $selected_subtask['acknowledgement_id'])[0] : '';
                $tasks_accept->save();

              //  dd($tasks_accept,$sub_task_status);
            }
        }

        if ($request->subTask== null) {

            $tasks_accept = TaskRevision::find($request->revision_id);
//        $tasks_accept->subtask_id = implode(",", $request->subTask);
            // $tasks_accept->revision_reason = $request->revision_acknowledgement;
//        $tasks_accept->comment = implode(",", $request->comment);
            $tasks_accept->lead_comment = $request->comment;
            $tasks_accept->approval_status = 'accepted';
            $tasks_accept->is_accept = true;
            $tasks_accept->final_responsible_person = $request->mode !== 'continue' ? $this->role[Auth::user()->role_id] : $this->role[User::find($tasks_accept->added_by)->role_id];

            $tasks_accept->save();
        }else{
            $subTaskArray = $request->subTask;
            $subTaskString = '';
            $subTaskCommentString= '';

            foreach ($subTaskArray as $subTask) {
                // Make sure $subTask is a string
                $subTaskString .= (string) $subTask['subtask_id'] . ',';
                $subTaskCommentString .= (string) $subTask['comment'] . ',';
            }
            $subTaskString = rtrim($subTaskString, ',');
            $subTaskCommentString = rtrim($subTaskCommentString, ',');
        //  /   dd($subTaskString);
            $tasks_accept = TaskRevision::find($request->revision_id);
            $tasks_accept->lead_comment = $request->comment;
            // $tasks_accept->subtask_id = $tasks_accept->subtask_id;
            // $tasks_accept->revision_reason = $request->revision_acknowledgement;
            $tasks_accept->approval_status = 'accepted';

            $tasks_accept->is_accept = true;
            $tasks_accept->final_responsible_person = $request->mode !== 'continue' ? $this->role[Auth::user()->role_id] : $this->role[User::find($tasks_accept->added_by)->role_id];
            $tasks_accept->save();
        }

        foreach ($subtasks as $subtask) {

            $find_task_id = Task::where('subtask_id', $subtask->id)->first();
            if ($find_task_id->board_column_id == 8) {
                $sub_task_status = Task::find($find_task_id->id);

                $sub_task_status->task_status = "completed";
                $sub_task_status->board_column_id = 4;
                $sub_task_status->save();
            }
        }
       // dd($tasks_accept,$sub_task_status);
        return response()->json([
            'status' => 200,
        ]);
    }



    // DENY AND CONTINUE BUTTON SECTION
    public function denyContinue(Request $request)
    {


    //    DB::beginTransaction();
        $task_status = Task::find($request->task_id);
        $task_status->task_status = "in progress";
        $task_status->board_column_id = 3;
        $task_status->save();
      //  dd($request->revision_id);
        $subtasks = SubTask::where('task_id', $request->task_id)->get();
        if ($request->subTask != null){
           // $selected_subtasks = SubTask::whereIn('id', $request->subTask->subtask_id)->get();
           $selected_subtasks  = $request->subTask;
           // dd($selected_subtasks);
            foreach ($selected_subtasks as $key => $selected_subtask) {
               // dd($selected_subtask);
                $find_task_id = Task::where('id', $selected_subtask['subtask_id'])->first();
                $sub_task_status = Task::find($find_task_id->id);
                $sub_task_status->task_status = "incomplete";
                $sub_task_status->board_column_id = 1;
                $sub_task_status->save();

                $tasks_accept = new TaskRevision();
                $tasks_accept->task_id = $selected_subtask['subtask_id'];
                $tasks_accept->added_by = $request->user_id;
                $tasks_accept->revision_acknowledgement = $request->revision_acknowledgement;
                $tasks_accept->revision_status = 'Lead Developer Revision';
                $tasks_accept->lead_comment = $selected_subtask['comment'];
                $tasks_accept->project_id = $request->project_id;
                $tasks_accept->is_deniable = $selected_subtask['is_deniable'];
                $tasks_accept->acknowledgement_id = $selected_subtask['acknowledgement_id'];
                $tasks_accept->dispute_between = $selected_subtask['acknowledgement_id'] ?  explode('x', $selected_subtask['acknowledgement_id'])[0] : '';
                $tasks_accept->save();
              //  dd($tasks_accept,$sub_task_status);
            }
        }

        if ($request->subTask== null) {
            $tasks_accept = TaskRevision::find($request->revision_id);
            $tasks_accept->lead_comment = $request->comment;
//        $tasks_accept->subtask_id = implode(",", $request->subTask);
            // $tasks_accept->revision_reason = $request->revision_acknowledgement;
//        $tasks_accept->comment = implode(",", $request->comment);

            $tasks_accept->deny_reason = $request ->deny_reason;
            $tasks_accept->is_deny = true;
            $tasks_accept->dispute_created = true;
            $tasks_accept->approval_status = 'accepted';
            $tasks_accept->save();
        }else{
            $subTaskArray = $request->subTask;
            $subTaskString = '';
            $subTaskCommentString= '';

            foreach ($subTaskArray as $subTask) {
                // Make sure $subTask is a string
                $subTaskString .= (string) $subTask['subtask_id'] . ',';
                $subTaskCommentString .= (string) $subTask['comment'] . ',';
            }
            $subTaskString = rtrim($subTaskString, ',');
            $subTaskCommentString = rtrim($subTaskCommentString, ',');
        //  /   dd($subTaskString);
            $tasks_accept = TaskRevision::find($request->revision_id);
            $tasks_accept->approval_status = 'accepted';
            $tasks_accept->is_deny = true;
            $tasks_accept->dispute_created = true;
            $tasks_accept->lead_comment = $request->comment;
            $tasks_accept->deny_reason = $request->deny_reason;
            $tasks_accept->save();
        }

        foreach ($subtasks as $subtask) {

            $find_task_id = Task::where('subtask_id', $subtask->id)->first();
            if ($find_task_id->board_column_id == 8) {
                $sub_task_status = Task::find($find_task_id->id);

                $sub_task_status->task_status = "completed";
                $sub_task_status->board_column_id = 4;
                $sub_task_status->save();
            }
        }


        // CREATE DISPUTE
        $this->create_dispute($tasks_accept);


       // dd($tasks_accept,$sub_task_status);
        return response()->json([
            'status' => 200,
        ]);
    }

    //        REVISION REASON SYSTEM
    public function revisionReason(Request $request)
    {
        // dd($request, 'sldkfs');
        //  DB::beginTransaction();
        $revision_reason = new TaskRevision();
        $revision_reason->task_id = $request->task_id;
        $revision_reason->revision_reason = $request->revision_reason;
        $revision_reason->save();
        return response()->json([
            'status' => 200,
        ]);
    }

    /*************** PM->LEAD->DEV *************************/

    public function accept_or_revision_by_developer(Request $request)
    {
        // dd("accept_or_revision_by_developer");
        //  DB::beginTransaction();


        $task_status = Task::find($request->task_id);
        $task_status->task_status = "in progress";
        $task_status->board_column_id = 3;
        $task_status->save();

        $tasks_accept = TaskRevision::find($request->revision_id);

        $added_by_role_id = User::find($tasks_accept->added_by)->role_id;

        if ($request->mode == 'deny') {
            $tasks_accept->is_deny=true;
            $tasks_accept->dispute_created = true;
            $tasks_accept->deny_reason = $request ->deny_reason;
        } elseif($request->mode == 'accept') {
            $tasks_accept->is_accept=true;
            $tasks_accept->final_responsible_person = $this->role[Auth::user()->role_id];
        }elseif($request->mode=='continue'){
            $tasks_accept->is_accept=true;
            $tasks_accept->final_responsible_person = $this->role[$added_by_role_id];
        }
        $tasks_accept->task_id = $task_status->id;
      //  $tasks_accept->subtask_id = $task_status->subtask_id;
     //   $tasks_accept->revision_acknowledgement = $request->revision_acknowledgement;
        $tasks_accept->dev_comment = $request->comment;

        $tasks_accept->approval_status ='accepted';
        $tasks_accept->save();
       // dd($tasks_accept);
       $board_column = TaskBoardColumn::where('id',$task_status->board_column_id)->first();


       if($tasks_accept-> dispute_created){
            $this->create_dispute($tasks_accept);
       }

        return response()->json([
            'status' => 200,
            'task_status'=> $board_column,
        ]);
    }

   //        TASK GUIDELINE SECTION
   public function viewTaskGuideline($project_id)
   {
       $this->pageTitle = 'Task Guideline';
       $this->project_id = $project_id;
       return view('task-guideline.index', $this->data);
   }
   public function editTaskGuideline($id)
   {
       $this->pageTitle = 'Task Guideline Edit';
       $this->pm_task_guideline = $id;
    //    return view('task-guideline.edit', $this->data);
   }

   public function storeTaskGuideline(Request $request)
   {
       $request->validate([
           'theme_details' => 'required',
           'design_details' => 'required',
           'color_schema' => 'required',
           'plugin_research' => 'required',
       ], [
           'theme_details.required' => 'This field is required!',
           'design_details.required' => 'This field is required!',
           'color_schema.required' => 'This field is required!',
           'plugin_research.required' => 'This field is required!',
       ]);
       $data = $request->all();
       $reference_links = json_encode($data['reference_link']);
       $colors = json_encode($data['color']);
       $color_descriptions = json_encode($data['color_description']);

       $pm_task_guideline = new PmTaskGuideline();
       $pm_task_guideline->project_id = $data['project_id'];
       $pm_task_guideline->theme_details = $data['theme_details'];
       $pm_task_guideline->theme_name = $data['theme_name'];
       $pm_task_guideline->theme_url = $data['theme_url'];
       $pm_task_guideline->color_schema = $data['color_schema'];
       $pm_task_guideline->design_details = $data['design_details'];
       $pm_task_guideline->primary_color = $data['primary_color'];
       $pm_task_guideline->primary_color_description = $data['primary_color_description'];
       $pm_task_guideline->design = $data['design'];
       $pm_task_guideline->xd_url = $data['xd_url'];
       $pm_task_guideline->drive_url = $data['drive_url'];
       $pm_task_guideline->reference_link = $reference_links;
       $pm_task_guideline->instruction = $data['instruction'];
       $pm_task_guideline->color = $colors;
       $pm_task_guideline->color_description = $color_descriptions;
       $pm_task_guideline->plugin_research = $data['plugin_research'];
       $pm_task_guideline->plugin_name = $data['plugin_name'];
       $pm_task_guideline->plugin_url = $data['plugin_url'];
       $pm_task_guideline->google_drive_link = $data['google_drive_link'];
       $pm_task_guideline->instruction_plugin = $data['instruction_plugin'];
       $pm_task_guideline->save();

       $pm_task_update = PmTaskGuideline::find($pm_task_guideline->id);

       if ($data['theme_details'] == 0 || $data['design_details'] == 0 || $data['color_schema'] == 0 || $data['plugin_research'] == 0) {
           $pm_task_update->status = 0;

       }elseif($data['theme_details'] == 2 || $data['design_details'] == 2 || $data['color_schema'] == 2 || $data['plugin_research'] == 2)
       {
        $pm_task_update->status = 0;

       }

       else {
           $pm_task_update->status = 1;
       }
       $pm_task_update->save();
       $pm_task_guideline_authorization= '';


       if ($data['theme_details'] == 0 || $data['design_details'] == 0 || $data['color_schema'] == 0 || $data['plugin_research'] == 0) {
           $name1 = 'Theme Details';
           $name2 = 'Design Details';
           $name3 = 'Color Schema';
           $name4 = 'Plugin Research';

           if($data['theme_details']==0){
               $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
               $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
               $pm_task_guideline_authorization->project_id = $data['project_id'];
               $pm_task_guideline_authorization->name = $name1;
               $pm_task_guideline_authorization->status = 0;
               $pm_task_guideline_authorization->save();
           }else
           {
            $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
            $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
            $pm_task_guideline_authorization->project_id = $data['project_id'];
            $pm_task_guideline_authorization->name = $name1;
            $pm_task_guideline_authorization->status = 1;
            $pm_task_guideline_authorization->save();


           }
           if($data['design_details']==0){
               $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
               $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
               $pm_task_guideline_authorization->project_id = $data['project_id'];
               $pm_task_guideline_authorization->name = $name2;
               $pm_task_guideline_authorization->status = 0;
               $pm_task_guideline_authorization->save();
           }else
           {
            $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
               $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
               $pm_task_guideline_authorization->project_id = $data['project_id'];
               $pm_task_guideline_authorization->name = $name2;
               $pm_task_guideline_authorization->status = 1;
               $pm_task_guideline_authorization->save();

           }
           if($data['color_schema']==0){
               $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
               $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
               $pm_task_guideline_authorization->project_id = $data['project_id'];
               $pm_task_guideline_authorization->name = $name3;
               $pm_task_guideline_authorization->status = 0;
               $pm_task_guideline_authorization->save();
           }else
           {
            $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
            $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
            $pm_task_guideline_authorization->project_id = $data['project_id'];
            $pm_task_guideline_authorization->name = $name3;
            $pm_task_guideline_authorization->status = 1;
            $pm_task_guideline_authorization->save();

           }
           if($data['plugin_research']==0){
               $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
               $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
               $pm_task_guideline_authorization->project_id = $data['project_id'];
               $pm_task_guideline_authorization->name = $name4;
               $pm_task_guideline_authorization->status = 0;
               $pm_task_guideline_authorization->save();
           }else
           {
            $pm_task_guideline_authorization = new PMTaskGuidelineAuthorization();
            $pm_task_guideline_authorization->task_guideline_id = $pm_task_guideline->id;
            $pm_task_guideline_authorization->project_id = $data['project_id'];
            $pm_task_guideline_authorization->name = $name4;
            $pm_task_guideline_authorization->status = 1;
            $pm_task_guideline_authorization->save();


           }

       }
       $users = User::where('role_id',1)->get();

       $task_guideline_count = PmTaskGuideline::where('project_id',$data['project_id'])->where('status',0)->count();
       if($pm_task_guideline_authorization != null && $task_guideline_count > 0)
       {
            foreach($users as $user){
                Notification::send($user, new PmTaskGuidelineNotification($pm_task_guideline_authorization));
            }
        }

       return response()->json(['status' => 200]);

   }

   public function updateTaskGuideline(Request $request, $id){

       $reference_links = json_encode($request->reference_link);
       $colors = json_encode($request->color);
       $color_descriptions = json_encode($request->color_description);

       $pm_task_guideline_update = PmTaskGuideline::find($id);
       if($request->theme_details==1){
           $pm_task_guideline_update->theme_details = $request->theme_details;
           $pm_task_guideline_update->theme_name = $request->theme_name;
           $pm_task_guideline_update->theme_url = $request->theme_url;
            $authorization_update = PMTaskGuidelineAuthorization::where('task_guideline_id',$pm_task_guideline_update->id)->where('name','Theme Details')->first();
            $authorization_update->status = 1;
            $authorization_update->save();

       }
       if($request->design_details==1){
           $pm_task_guideline_update->design_details = $request->design_details;
           $pm_task_guideline_update->design = $request->design;
           $pm_task_guideline_update->xd_url = $request->xd_url;
           $pm_task_guideline_update->drive_url = $request->drive_url;
           $pm_task_guideline_update->reference_link = $reference_links;
           $pm_task_guideline_update->instruction = $request->instruction;
           $authorization_update = PMTaskGuidelineAuthorization::where('task_guideline_id',$pm_task_guideline_update->id)->where('name','Design Details')->first();
           $authorization_update->status = 1;
           $authorization_update->save();

       }
       if($request->color_schema==1){
           $pm_task_guideline_update->color_schema = $request->color_schema;
           $pm_task_guideline_update->primary_color = $request->primary_color;
           $pm_task_guideline_update->primary_color_description = $request->primary_color_description;
           $pm_task_guideline_update->color = $colors;
           $pm_task_guideline_update->color_description = $color_descriptions;
           $authorization_update = PMTaskGuidelineAuthorization::where('task_guideline_id',$pm_task_guideline_update->id)->where('name','Color Schema')->first();
           $authorization_update->status = 1;
           $authorization_update->save();

       }
       if($request->plugin_research==1){
           $pm_task_guideline_update->plugin_research = $request->plugin_research;
           $pm_task_guideline_update->plugin_name = $request->plugin_name;
           $pm_task_guideline_update->plugin_url = $request->plugin_url;
           $pm_task_guideline_update->google_drive_link = $request->google_drive_link;
           $pm_task_guideline_update->instruction_plugin = $request->instruction_plugin;
           $authorization_update = PMTaskGuidelineAuthorization::where('task_guideline_id',$pm_task_guideline_update->id)->where('name','Plugin Research')->first();
            $authorization_update->status = 1;
            $authorization_update->save();

       }
       $authorization_count = PMTaskGuidelineAuthorization::where('project_id',$pm_task_guideline_update->project_id)->whereIn('status',[0,2])->count();
       if($authorization_count == 0)
       {
        $pm_task_guideline_update->status = 1;

       }else
       {
        $pm_task_guideline_update->status = 0;

       }

       $pm_task_guideline_update->save();
       return response()->json(['status'=>200]);
   }

   public function taskGuidelineApprovedAuthorization($id){
       $pm_task_guideline_authorization = PMTaskGuidelineAuthorization::find($id);

       if ($pm_task_guideline_authorization->status == 0) {
           $pm_task_guideline_authorization->status = 1;
       }
       $pm_task_guideline_authorization->save();

       $status_get = PMTaskGuidelineAuthorization::where('project_id', $pm_task_guideline_authorization->project_id)->where('status',0)->OrWhere('status',2)->count();
       if($status_get == 0){
           $pm_task_guideline = PmTaskGuideline::where('project_id',$pm_task_guideline_authorization->project_id)->first();
           $pm_task_guideline->status = 1;
           $pm_task_guideline->save();
       }


       return response()->json([
           'success' => 200,
           'count' => $status_get,
       ]);
   }
   public function taskGuidelineDenyAuthorization($id){
       $pm_task_guideline_authorization = PMTaskGuidelineAuthorization::find($id);
       if ($pm_task_guideline_authorization->status == 0) {
           $pm_task_guideline_authorization->status = 2;
       }
       $pm_task_guideline_authorization->save();
       $pm_task_guideline = PmTaskGuideline::where('project_id',$pm_task_guideline_authorization->project_id)->first();
       $pm_task_guideline->status = 0;
       $pm_task_guideline->save();
       $status_get = PMTaskGuidelineAuthorization::where('project_id', $pm_task_guideline_authorization->project_id)->where('status',0)->OrWhere('status',1)->count();
       return response()->json([
           'success' => 200,
           'count' => $status_get,
       ]);
   }

   public function viewWorkingEnvironment($project_id)
   {
       $this->pageTitle = 'Working Environment';
       $this->project_id = $project_id;
       return view('working-environment.index', $this->data);
   }
   public function storeWorkingEnvironment(Request $request)
   {
       $request->validate([
           'site_url' => 'required',
           'login_url' => 'required',
           'email' => 'required',
           'password' => 'required',
       ], [
           'site_url.required' => 'This field is required!',
           'login_url.required' => 'This field is required!',
           'email.required' => 'This field is required!',
           'password.required' => 'This field is required!',
       ]);

       $working_environment = new WorkingEnvironment();
       $working_environment->project_id = $request->project_id;
       $working_environment->site_url = $request->site_url;
       $working_environment->login_url = $request->login_url;
       $working_environment->email = $request->email;
       $working_environment->password = $request->password;
       $working_environment->frontend_password = $request->frontend_password;
       $working_environment->save();
       $task_id= Task::where('project_id',$working_environment->project_id)->first();
       return response()->json([
           'status'=>200,
           'redirect' => url('/account/tasks/'.$task_id->id),
       ]);
   }

    public function task_json(Request $request, $id)
    {
        if ($request->mode == 'basic') {
            $task = Task::with('users', 'createBy', 'boardColumn')->select([
                'tasks.*',
                'task_types.page_type',
                'task_types.page_name',
                'task_types.page_url',
                'task_types.task_type_other',
                'task_types.page_type_name',
                'task_types.existing_design_link',
                'task_types.number_of_pages',
                'sub_tasks.task_id as parent_task_id',
                //'tasks.title as parent_task_title',

                'projects.id as project_id',
                'projects.project_name',
                'projects.project_summary',
                'pm.id as project_manager_id',
                'pm.name as project_manager_name',
                'pm.image as project_manager_avatar',

                'clients.id as clientId','clients.name as client_name',
                'project_milestones.id as milestone_id',
                'project_milestones.milestone_title',
                'designations.name as pm_designation',

                DB::raw('IFNULL(sub_tasks.id, false) as has_subtask'),
            ])
                ->join('projects', 'tasks.project_id', 'projects.id')
                ->leftJoin('users as clients','clients.id','projects.client_id')
                ->leftJoin('users as pm','pm.id','projects.pm_id')
                ->leftJoin('sub_tasks', 'tasks.subtask_id', 'sub_tasks.id')
                ->leftJoin('task_types', 'task_types.task_id', 'tasks.id')
                ->join('project_milestones', 'tasks.milestone_id', 'project_milestones.id')
                ->leftJoin('employee_details', 'projects.pm_id', 'employee_details.user_id')
                ->leftJoin('designations', 'employee_details.designation_id', 'designations.id')
                ->where('tasks.id', $id)
                ->first();

            if($task->subtask_id == null)
            {
                $subtasks = Subtask::where('task_id', $task->id)->get();
                $subtasks_count = Subtask::where('task_id', $task->id)->count();
                $completed_subtask_count = 0;

                foreach ($subtasks as $subtask) {
                    // Increment the count if the subtask is completed (assuming board_column_id 8 indicates completion)
                    $completed_subtask_count += Task::where('subtask_id', $subtask->id)->where('board_column_id', 8)->count();
                }
                if ($subtasks_count == $completed_subtask_count || $subtasks_count == 0) {
                    $parent_task_action = "Lead Developer Can Complete Parent Task";
                }
                else
                {
                    $parent_task_action = "Lead Developer Can not Complete Parent Task";
                }
            }else
            {
                $parent_task_action = "No Subtask on this parent tasks";
            }

            $parent_task_heading= Task::where('id',$task->parent_task_id)->select('heading')->first();
          //  dd($task,$parent_task);
          $subtasks= SubTask::where('task_id',$task->id)->select('tasks.id as subtask_id','sub_tasks.title','taskboard_columns.*', "users.name as assigned_to_name", 'users.id as assigned_to_id')
          ->join('tasks','tasks.subtask_id','sub_tasks.id')
          ->join('taskboard_columns','taskboard_columns.id','tasks.board_column_id')
          ->join('users', 'users.id', 'sub_tasks.assigned_to')
          ->get();

          if($subtasks == null)
          {
            $subtasks = '';
          }
          $Sub_Tasks= $subtasks;
          $revisions= TaskRevision::where('task_id',$task->id)->get();
          if($revisions == null)
          {
            $revisions = '';
          }

         // dd($subtasks);
         $working_environment_check = WorkingEnvironment::where('project_id',$task->project_id)->count();
         $working_environment = WorkingEnvironment::where('project_id',$task->project_id)->first();
         $pm_task_guideline= PmTaskGuideline::where('project_id',$task->project_id)->first();

            $totalMinutes = $task->timeLogged->sum('total_minutes') - ProjectTimeLogBreak::taskBreakMinutes($task->id);
            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

            if ($totalMinutes % 60 > 0) {
                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
            }

            $task->parent_task_time_log = $timeLog;
            $task->task_category = $task->category;
           // dd($task);

                $task->subtask = Subtask::select([
                    'id', 'title'
                ])->where('task_id', $task->id)->get();
                //dd($task->subtask);


                $tas_id = Task::where('id', $task->id)->first();
                $subtasks = Subtask::where('task_id', $tas_id->id)->get();
                $subtask_count = Subtask::where('task_id', $tas_id->id)->count();
                // dd($subtasks);
                $time = 0;

                foreach ($subtasks as $subtask) {
                    $stask = Task::where('subtask_id', $subtask->id)->first();
                    $time += $stask->timeLogged->sum('total_minutes');
                }
                $timeL = intdiv($time, 60) . ' ' . __('app.hrs') . ' ';

                if ($time % 60 > 0) {
                    $timeL .= $time % 60 . ' ' . __('app.mins');
                }
                if ($subtasks != null) {
                    $timeLo = intdiv($time + $totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if ($time % 60 > 0) {
                        $timeLo .= ($time + $totalMinutes) % 60 . ' ' . __('app.mins');
                    }

                    $task->timeLog = $timeLo;
                    $task->sub_task_time_log = $timeL;
                }

            $task->running_timer = null;
            $running_timer = ProjectTimeLog::where([
                'task_id' => $id,
                'user_id' => $this->user->id,
                'end_time' => null
            ])->orderBy('id', 'desc')->first();

            if ($running_timer) {
                $time_log_data = [
                    'id' => $running_timer->id,
                    'status' => 'running',
                    'time' => strtotime($running_timer->start_time)
                ];

                $task->running_timer = $time_log_data;
            }
            return response()->json([
                'task' => $task,
                'parent_task_heading'=> $parent_task_heading,
                'parent_task_action'=> $parent_task_action,
                'subtasks'=> $subtasks,
                'Sub_Tasks'=>$Sub_Tasks,
                'working_environment' => $working_environment_check,
                'task_guideline'=> $pm_task_guideline,
                'working_environment_data'=> $working_environment,
                'revisions'=> $revisions,
            ]);
          //  return response()->json($task,$parent_task_heading);
        } elseif ($request->mode == 'sub_task') {
            $sub_tasks = SubTask::select(['id', 'title'])->where('task_id', $id)->get();
            $array = [];
            foreach ($sub_tasks as $value) {
                $task = Task::
                select('tasks.*','users.role_id')
                ->join('users','users.id','tasks.added_by')
                ->where('tasks.subtask_id', $value->id)
                ->first();
            //  /dd($task);

                array_push($array, [
                    'id' => $task->id,
                    'title' => $task->heading,
                    'added_by'=>$task->added_by,
                    'role_id'=>$task->role_id,
                    //'edit_url' => route('tasks.edit', $task->id),
                    //'show_url' => route('tasks.edit', $task->id),
                    'subtask_id' => $value->id,
                ]);
            }

            return response()->json($array);
        } elseif ($request->mode == 'category') {
            $data = TaskCategory::all();
            return response()->json($data);
        } elseif ($request->mode == 'employees') {
           // dd("snknaslkndas");
            $data = User::where('role_id', 5)->get()->map(function ($row) {

                $task_assign= Task::select('tasks.*')
                ->join('task_users','task_users.task_id','tasks.id')
                ->join('projects','projects.id','tasks.project_id')
                ->where('projects.status','in progress')
                ->where('task_users.user_id',$row->id)

                ->where('tasks.board_column_id',3)
                ->count();
                //dd($task_assign);
                if ($task_assign > 0) {
                    $developer_status = 1;
                }else
                {
                    $developer_status= 0;
                }
                return [
                    'id' => $row->id,
                    'name' => $row->name,
                    'image_url' => $row->image_url,
                    'gender' => $row->gender,
                    'developer_status' => $developer_status,
                ];
            });
            return response()->json($data);
        } elseif ($request->mode == 'estimation_time') {
            $task  = Task::find($id);
           // dd($task);
            $project = Project::find($task->project_id);
            // $task_estimation_hours = Task::where('project_id', $project->id)->sum('estimate_hours');
            // $task_estimation_minutes = Task::where('project_id', $project->id)->sum('estimate_minutes');
            $task_estimation_hours = SubTask::join('tasks','tasks.subtask_id','sub_tasks.id')

            // /->where('tasks.project_id', $project->id)
            ->where('sub_tasks.task_id',$task->id)
            ->sum('tasks.estimate_hours');

            $task_estimation_minutes = SubTask::join('tasks','tasks.subtask_id','sub_tasks.id')

           // ->where('tasks.project_id', $project->id)
            ->where('sub_tasks.task_id',$task->id)
            ->sum('tasks.estimate_minutes');
        //    / dd($task_estimation_hours,$task_estimation_minutes);
           // $task_estimation_minutes = SubTask::where('project_id', $project->id)->sum('estimate_minutes');
            $toal_task_estimation_minutes = ($task_estimation_hours * 60) + $task_estimation_minutes;
            //dd($toal_task_estimation_minutes ,(($task->estimate_hours * 60) + $task->estimate_minutes));

            $left_minutes = (($task->estimate_hours * 60) + $task->estimate_minutes)  - $toal_task_estimation_minutes;

          //  dd($left_minutes);

            $left_in_hours = round($left_minutes / 60, 0);
            $left_in_minutes = $left_minutes % 60;

            return response()->json([
                'hours_left' => $left_in_hours,
                'minutes_left' => $left_in_minutes
            ]);
        } elseif ($request->mode == 'sub_task_edit') {
            $task = Task::with('users', 'createBy', 'boardColumn', 'category', 'files')->select([
                'tasks.*',

                'sub_tasks.id as subtask_id',
                'sub_tasks.title as subtask_title',

                'projects.id as project_id',
                'projects.project_name',
                'projects.project_summary',

                'project_milestones.id as milestone_id',
                'project_milestones.milestone_title',

                DB::raw('IFNULL(sub_tasks.id, false) as has_subtask'),
            ])
                ->join('projects', 'tasks.project_id', 'projects.id')
                ->leftJoin('sub_tasks', 'tasks.id', 'sub_tasks.task_id')
                ->join('project_milestones', 'tasks.milestone_id', 'project_milestones.id')
                ->where('tasks.id', $id)
                ->first();


            $totalMinutes = $task->timeLogged->sum('total_minutes') - ProjectTimeLogBreak::taskBreakMinutes($task->id);
            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';
            // dd($task);
            $task->start_date = Carbon::parse($task->start_date)->format('Y-m-d H:i:s');
            $task->due_date = Carbon::parse($task->due_date)->format('Y-m-d H:i:s');

            if ($totalMinutes % 60 > 0) {
                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
            }

            $task->parent_task_time_log = $timeLog;
            $task->task_category = $task->category;


            if ($task->has_subtask != 0) {
                $task->subtask = Subtask::select([
                    'id', 'title'
                ])->where('task_id', $task->id)->get();


                $tas_id = Task::where('id', $task->id)->first();
                $subtasks = Subtask::where('task_id', $tas_id->id)->get();
                $subtask_count = Subtask::where('task_id', $tas_id->id)->count();
                // dd($subtasks);
                $time = 0;

                foreach ($subtasks as $subtask) {
                    $stask = Task::where('subtask_id', $subtask->id)->first();
                    $time += $stask->timeLogged->sum('total_minutes');
                }
                $timeL = intdiv($time, 60) . ' ' . __('app.hrs') . ' ';

                if ($time % 60 > 0) {
                    $timeL .= $time % 60 . ' ' . __('app.mins');
                }
                if ($subtasks != null) {
                    $timeLo = intdiv($time + $totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if ($time % 60 > 0) {
                        $timeLo .= ($time + $totalMinutes) % 60 . ' ' . __('app.mins');
                    }

                    $task->timeLog = $timeLo;
                    $task->sub_task_time_log = $timeL;
                }
            }
            return response()->json($task);
        } elseif ($request->mode == 'task_note') {
            $data = TaskNote::where('task_id', $id)->get()->map(function ($row) {
                return [
                    'id' => $row->id,
                    'note' => $row->note,
                    'title' => $row->title,
                ];
            });
            return response()->json($data);
        } elseif ($request->mode == 'task_note_edit') {
            $data = TaskNote::find($id);
            return response()->json($data);
        } elseif ($request->mode == 'task_note_file_delete') {
            $data = TaskNoteFile::find($id);
            if ($data) {
                if ($data->delete()) {
                    return response()->json([
                        'status' => 'success',
                        'message' => 'Task note file deleted successfully'
                    ]);
                } else {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Failed to delete task note file'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Task note file not found'
                ]);
            }
        } elseif ($request->mode == 'task_time_log') {
            $data = ProjectTimeLog::with('user')->where('task_id', $id)->get();
            $data->transform(function ($item) {
                $totalHours = floor($item->total_minutes / 60);
                $totalMinutes = $item->total_minutes % 60;

                $formattedTime = sprintf('%d Hrs %d Min', $totalHours, $totalMinutes);
                $item->hours_logged = $formattedTime;

                return $item;
            });

            return response()->json($data);
        } elseif ($request->mode == 'task_history') {
            $subtask_check = Task::where('id',$id)->first();
            if ($subtask_check->subtask_id != null) {
                $data = TaskHistory::with('user')->where('task_id', $id)->get();
                foreach ($data as $item) {
                    $item->lang = __('modules.tasks.' . $item->details) . ' ' . $item->user->name;
                    $created_at = $item->created_at;
                    $item->formatted_created_at = $created_at;
                }

                return response()->json($data);
            }else
            {
                $subtasks = SubTask::select('tasks.id')
                ->join('tasks','tasks.subtask_id','sub_tasks.id')

                ->where('sub_tasks.task_id',$id)->get();

                foreach($subtasks as $subtask)
                {
                    $data1 = TaskHistory::with('user')->where('task_id', $id)->get();
                    foreach ($data1 as $item1) {
                        $item1->lang = __('modules.tasks.' . $item1->details) . ' ' . $item1->user->name;
                        $created_at = $item1->created_at;
                        $item1->formatted_created_at = $created_at;
                    }

                    $data2 = TaskHistory::with('user')->where('task_id', $subtask->id)->get();
                foreach ($data2 as $item2) {
                    $item2->lang = __('modules.tasks.' . $item2->details) . ' ' . $item2->user->name;
                    $created_at = $item2->created_at;
                    $item2->formatted_created_at = $created_at;
                }
                $data = $data1->concat($data2);

                return response()->json($data);


                }
            }

        } elseif ($request->mode == 'task_approve') {
            $data = TaskApprove::where('task_id', $id)->latest()->first();

            if (!is_null($data)) {
                $data->deadline_meet = $data->rating;
                $data->submission_quality = $data->rating2;
                $data->req_fullfillment = $data->rating3;
                $data->overall_tasks = ($data->deadline_meet + $data->submission_quality + $data->req_fullfillment) / 3;
            }

            return response()->json($data);
        } elseif ($request->mode == 'task_comment') {
            $data = TaskComment::where('task_id', $id)->get();
            foreach ($data as $value) {
                $replies = TaskReply::where('comment_id', $value->id)->pluck('user_id');
                $value->total_replies = $replies->count();
                $value->last_updated_at = strtotime($value->created_at);
                $value->replies = User::whereIn('id', $replies)->get()->map(function ($row) {
                    return [
                        'id' => $row->id,
                        'image_url' => $row->image_url
                    ];
                });
            }
            return response()->json($data);
        } elseif ($request->mode == 'task_comment_file_delete') {
            $data = TaskComment::findOrfail($id);


            if ($data->files != null) {
                $files = json_decode($data->files);
                $file = [];
                foreach ($files as $item) {
                    if ($item != $request->query('files')) {
                        array_push($file, $item);
                    }
                }
                $data->files = $file;
                $data->save();
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully!!!'
            ]);
        } elseif ($request->mode == 'task_submission') {
            $data = TaskSubmission::with('user')->where('task_id', $id)->get();
            if ($data->count() > 0) {
                $file = [];
                $url = [];
                $description = [];
                foreach ($data as $item) {
                    if ($item->attach != null) {
                        array_push($file, $item->attach);
                    }
                    if ($item->link != null) {
                        array_push($url, $item->link);
                    }
                    if ($item->text != null) {
                        array_push($description, $item->text);
                    }
                }

                $user = $data->first()->user;
                $response = [
                    'file' => $file,
                    'url' => $url,
                    'description' => $description,
                    'user' => [
                        'id' => $user->id,
                        'name' =>  $user->name,
                        'image' => $user->image_url,
                    ]
                ];
                return response()->json($response);
            } else {
                return response()->json([]);
            }
        } elseif ($request->mode == 'task_submission_list') {

            $task_submission = TaskSubmission::with('user')->where('task_id', $id)->get();
            if ($task_submission != null) {
                $taskSubmissions = json_decode($task_submission, true);
                $groupedSubmissions = collect($taskSubmissions)->groupBy(function ($submission) {
                    return $submission['submission_no'] . '_' . $submission['task_id'];
                })->map(function ($group) {
                    return $group;
                })->toArray();


                function mergeArrays($arr1, $arr2)
                {
                    $merged = [];
                    foreach ($arr1 as $key => $value) {
                        if ($value !== null) {
                            $merged[$key] = $value;
                        } elseif (isset($arr2[$key])) {
                            $merged[$key] = $arr2[$key];
                        }
                    }

                    foreach ($arr2 as $key => $value) {
                        if ($value !== null && !isset($merged[$key])) {
                            $merged[$key] = $value;
                        }
                    }
                    return $merged;
                }


                $newArray = [];
                foreach ($groupedSubmissions as $group) {
                    if (count($group) > 1) {
                        $newArr = mergeArrays($group[0], $group[1]);
                        $newArray[] = $newArr;
                    } else {
                        $newArray[] = $group[0];
                    }
                }

                $new_array_with_link = [];

                foreach ($newArray as $value) {
                    $value['link'] = [$value['link']];
                    array_push($new_array_with_link, $value);
                }

                return response()->json($new_array_with_link);
            }
        } elseif ($request->mode == 'task_reply_comment') {
            $data = TaskReply::where('comment_id', $id)->get();
            return response()->json($data);
        } elseif ($request->mode == 'comment_store') {
            $data = new TaskComment();
            $data->comment = $request->comment;
            $data->user_id = $this->user->id;
            $data->task_id = $request->task_id;
            $data->added_by = $this->user->id;
            $data->last_updated_by = $this->user->id;

            $data->save();
            if ($request->hasFile('file')) {
                $files = $request->file('file');
                $destinationPath = storage_path('app/public');
                $file_name = [];
                foreach ($files as $file) {
                    $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                    array_push($file_name, $filename);
                    $file->move($destinationPath, $filename);
                }
                $data->files = $file_name;
                $data->save();
            }

            $data = TaskComment::find($data->id);
            $data->last_updated_at = $data->updated_at;
            return response()->json($data);
        } elseif ($request->mode == 'comment_reply_store') {
            $data = new TaskReply();
            $data->comment_id = $request->comment_id;
            $data->reply = $request->comment;
            $data->user_id = $this->user->id;
            $data->task_id = $request->task_id;
            $data->added_by = $this->user->id;
            $data->last_updated_by = $this->user->id;

            $data->save();
            if ($request->hasFile('file')) {
                $files = $request->file('file');
                $destinationPath = storage_path('app/public');
                $file_name = [];
                foreach ($files as $file) {
                    $filename = uniqid() . '.' . $file->getClientOriginalExtension();
                    array_push($file_name, $filename);
                    $file->move($destinationPath, $filename);
                }
                $data->files = $file_name;
                $data->save();
            }
            $data = TaskComment::find($data->id);
            return response()->json($data);
        } elseif ($request->mode == 'developer_first_task_check') {
            $user= Auth::user();
            if (Auth::user()->role_id == 5) {
                $data = ProjectTimeLog::where([
                    'project_id' => $request->project_id,
                   // 'task_id' => $id,
                    'user_id' => Auth::id()
                ])->first();
                return response()->json([
                    'is_first_task' => ($data) ? false : true,
                ]);

            }else
            {
                return response()->json([
                    'is_first_task' => false,
                ]);
            }


            //  dd($data);


        } else {
            abort(404);
        }
    }
    public function DeveloperTask($id)
    {
        // /$id = 225;
        $data = Task::select([

            'tasks.*',
            'tasks.id as task_id',
            'tasks.heading as task_name',
            'client.id as client_id','client.name as client_name'

        ])->join('projects', 'projects.id', '=', 'tasks.project_id',)
            ->join('users as client','client.id','projects.client_id')

            ->join('task_users as task_assign_on', 'task_assign_on.task_id', '=', 'tasks.id')->where('task_assign_on.user_id', $id)->where('projects.status', '=', 'in progress')->get();
        return response()->json($data);
    }
    public function DeveloperStopTask(Request $request)
    {
        $currentDateTime = Carbon::now();
        $desiredTime = Carbon::createFromTime(16, 45, 0); // 4:29 PM
        $current_day = Carbon::now();
        // dd($current_day->dayOfWeek);
         $dayOfWeek = $current_day->dayOfWeek;
         if ($dayOfWeek === Carbon::SATURDAY) {
             // It's Monday
             $desiredTime = Carbon::createFromTime(13, 00, 0);
         }
       // dd($desiredTime);


            // Current time is greater than 4:29 PM
            // Add your logic here
            $stop_time = new DeveloperStopTimer();
            $stop_time->reason_for_less_tracked_hours_a_day_task = $request->reason_for_less_tracked_hours_a_day_task;
            $stop_time->durations = $request->durations;
            $stop_time->comment= $request->comment;
            $stop_time->leave_period= $request->leave_period;
            $stop_time->child_reason = $request->child_reason;
            $stop_time->responsible_person= $request->responsible_person;
            $stop_time->related_to_any_project= $request->related_to_any_project;
            $stop_time->responsible_person_id = $request->responsible_person_id;
            $stop_time->project_id= $request->project_id;
            $stop_time->forgot_to_track_task_id = $request->forgot_to_track_task_id;
            $stop_time->task_id = $request->task_id;
            $stop_time->user_id = $request->user_id;
            $stop_time->transition_hours= $request->transition_hours;
            $stop_time->transition_minutes= $request->transition_minutes;
            $stop_time->date= $request->date;
            $stop_time->client= $request->client;
            $stop_time->save();
            $task= Task::where('id',$request->task_id)->first();
            if($task->subtask_id == null)
            {
                $subtasks = Subtask::where('task_id', $task->id)->get();
                $subtasks_count = Subtask::where('task_id', $task->id)->count();
                $completed_subtask_count = 0;

                foreach ($subtasks as $subtask) {
                    // Increment the count if the subtask is completed (assuming board_column_id 8 indicates completion)
                    $completed_subtask_count += Task::where('subtask_id', $subtask->id)->where('board_column_id', 8)->count();
                }
                if ($subtasks_count == $completed_subtask_count || $subtasks_count == 0) {
                    $parent_task_action = "Lead Developer Can Complete Parent Task";
                }
                else
                {
                    $parent_task_action = "Lead Developer Can not Complete Parent Task";
                }
            }else
            {
                $parent_task_action = "No Subtask on this parent tasks";
            }

            return response()->json([
                'stop_time' => $stop_time,

                'parent_task_action'=> $parent_task_action,
            ]);

    }
    public function DeveloperTrackedTime(Request $request,$id)
    {

        $userID = Auth::id(); // Replace with the actual user ID

        //$currentDate = Carbon::now()->toDateString();
        if($request->date != null)
        {

            $currentDate = $request->date;

        }else
        {
            $currentDate = Carbon::now()->toDateString();

        }


        $totalMinutes = DB::table('project_time_logs')
            ->where('user_id', $userID)
            ->whereDate('created_at', $currentDate)
            ->sum('total_minutes');
            $user_current_time_tracking= ProjectTimelog::where('user_id',$id)->orderBy('id','desc')->where('end_time',null)->first();
            if($user_current_time_tracking != null)
            {
                $startTime = Carbon::parse($user_current_time_tracking->start_time);
                $currentTime = Carbon::now();

                $minutesDifference = $currentTime->diffInMinutes($startTime);
            $tracked_times = $totalMinutes+ $minutesDifference;

            }else
            {
                $tracked_times = $totalMinutes;
            }
       // dd($tracked_times);

           // $target_time=  $dayOfWeek =
           $current_day = Carbon::now();
       // dd($current_day->dayOfWeek);
        $dayOfWeek = $current_day->dayOfWeek;
        if ($dayOfWeek === Carbon::SATURDAY) {
            // It's Monday
           $target_time = 270;
        } elseif ($dayOfWeek === Carbon::SUNDAY) {
            // It's Tuesday
            $target_time = 0;
        }else
        {
            $target_time = 420;
        }
        $current_time = Carbon::now();

            return response()->json([
                'tracked_times'=> $tracked_times,
                'target_time'=> $target_time,
                'current_time'=> $current_time,

            ]);


    }
    public function GetTaskSubmission($id)
    {
        //dd($id);

    //    / $matchingRows = TaskSubmission::whereColumn('task_id', '=', $id)->groupBy('submission_no')->get();

    $submissions = TaskSubmission::selectRaw('task_id, submission_no, user_id, text, GROUP_CONCAT(link) as links, GROUP_CONCAT(attach) as attaches, MAX(task_submissions.created_at) as submission_date, users.user_name, users.name, users.image, users.role_id')
    ->where('task_id', $id)
    ->join('users','users.id','task_submissions.user_id')
    ->groupBy('task_id', 'submission_no')
    ->havingRaw('COUNT(*) > 1')
    ->get();
    return response()->json($submissions);
   // dd($id,$matchingRows);
    }

    public function GetRevision($id)
    {
        $task_revision= TaskRevision::where('task_id',$id)->orderBy('id','desc')->where('approval_status','pending')->first();
       // dd($task_revision);
        return response()->json($task_revision);
    }
    public function GetTaskStatus($id)
    {
        $task= Task::where('id',$id)->first();
        $board_column = TaskBoardColumn::where('id',$task->board_column_id)->first();
        return response()->json($board_column);
    }
    public function DeveloperReportIssue(Request $request)
    {
       //dd($request);
      $report= new DeveloperReportIssue();
      $report->comment= $request->comment;
      $report->person= $request->person;
      $report->previousNotedIssue= $request->previousNotedIssue;
      $report->added_by= Auth::id();
      $report->task_id= $request->task_id;
      $report->reason= $request->reason;
      $report->save();
      return response()->json([
          'status' => 200,
          'report'=> $report,
      ]);

    }
    public function TaskTimeCheck($id)
    {
        $subtasks= Subtask::where('task_id',$id)->get();
        foreach ($subtasks as $subtask) {
            $task_id= Task::where('subtask_id',$subtask->id)->first();
            $task =ProjectTimelog::where('task_id',$task_id->id)->where('end_time',null)->first();
            if ($task != null) {

                return response()->json([
                    'status' => 400,
                    'task'=> $task,
                    'message'=> 'You cannot edit the task because timer is already running',
                ]);
            }else
            {
                return response()->json([
                    'status' => 200,

                ]);

            }


        }
        $task= ProjectTimeLOg::where('task_id',$id)->where('end_time',null)->first();
        if ($task != null) {
            return response()->json([
                'status' => 400,
                'task'=> $task,
                'message'=> 'You cannot edit the task because timer is already running',
            ]);
        }else
        {
            return response()->json([
                'status' => 200,

            ]);

        }
    }

    public function CHeckSubtasks($id)
    {

        $task= Task::where('id',$id)->first();
        //dd($task);

        $subtasks = Subtask::select('sub_tasks.*')
        ->join('tasks','tasks.subtask_id','sub_tasks.id')
        ->whereIn('tasks.board_column_id',[1,2,3,6])
        ->where('sub_tasks.task_id',$task->id)

        ->count();
        $subtasks_details = Subtask::select('tasks.id','tasks.heading','clients.name as client_name','clients.id as clientId')
        ->join('tasks','tasks.subtask_id','sub_tasks.id')
        ->join('projects','projects.id','tasks.project_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->whereIn('tasks.board_column_id',[1,2,3,6])
        ->where('sub_tasks.task_id',$task->id)

        ->get();
        if($subtasks > 0)
                {
                  //  dd("true");
                 return response()->json([
                     'message' => 'You cannot complete this task',
                     'status'=> true,
                     'subtasks'=> $subtasks_details,

                 ]);

                }else
                {
                  //  dd("false");
                 return response()->json([
                     'message' => 'You can complete this task',
                     'status'=> false,

                 ]);
                }

 //dd($subtasks);

        //dd($subtasks);
       // $subtask_count = 0;



    }
    public function get_tasks_project_deliverable($id)
    {

        $deliverables = ProjectDeliverable::where('project_id',$id)->count();
        if($deliverables < 1)
        {
            return response()->json([
                'message' => 'You cannot add task as project manager did not create any project deliverable yet',
                'status'=> 400,
            ]);
        }else {
            $project_assign_date = PMProject::where('project_id', $id)->value('created_at');
            $project= Project::where('id',$id)->first();

           // dd($hoursDifference);
            if($project->deliverable_authorization == 0 || $project->deliverable_authorization == '0')
            {

                return response()->json([
                    'message' => 'You can not create task as top management did not authorized the deliverable yet',
                    'status'=> 400,
                ]);

            }else {
                return response()->json([
                    'message' => 'You can create tasks',
                    'status'=> 200,
                ]);
            }

        }

    }


    /************* TASK DISPUTE *************** */

    // RE USEABLE MATHOD
    public function create_dispute($revision){

        // DB::beginTransaction();
        // dispute between
        $between = $revision->dispute_between;

        // get user by task id
        $task_user = TaskUser::where('task_id', $revision->task_id)->get()->first();
        $project_details = DB::table('projects')->where('id', $revision->project_id)->first();
        $deals = DB::table('deals')->where('id', $project_details->deal_id)->first();

        // added 5 day from created time
         $due_date = Carbon::now();
         $due_date->addDays(5);

        // create dispute
        $dispute = new TaskRevisionDispute();
        $dispute->task_id = $revision->task_id;
        $dispute->project_id= $revision->project_id;
        $dispute->revision_id = $revision->id;
        $dispute->raised_against= $revision->added_by;
        $dispute->raised_by = $task_user->user_id;
        $dispute->due_date = $due_date;

        if(!is_null($between)){
            if($between == 'CPR'){
                $dispute->raised_against= $project_details->client_id;
                $dispute->raised_by = $revision->added_by;
            }

            if($between == 'SPR'){
                $dispute->raised_against= $deals->added_by;
                $dispute->raised_by = $revision->added_by;
            }
        }

        $dispute->save();
        // dd($revision, $dispute);
    }


    // ADD DISPUTE QUESTION

    //

    // GET DISPUTE DATA

    public function get_dispute_data($filter){

        $logged_user = Auth::user();

        // filter data
        $start_date = $filter["start_date"] ?? NULL;
        $end_date = $filter["end_date"] ?? NULL;
        $task_id = $filter["task_id"] ?? NULL;
        $project_id = $filter["project_id"] ?? NULL;
        $dispute_id = $filter["dispute_id"] ?? NULL;
        $raised_by = $filter["raised_by"] ?? NULL;
        $raised_against =  $filter["raised_against"] ?? NULL;
        $client_id =   $filter["client_id"] ?? NULL;



        //get user
        function get_user($user_id, $is_client){
            $user = User::where( 'id', $user_id)->get()->first();
            $user_response = [
                "id" => $user->id,
                "name" => $user->name,
                "image" => $user->image,
                "role_id" => $user->role_id,
           ];

            if(!$is_client){
                $employee_details = [
                    "designation" => $user->employeeDetail ? $user->employeeDetail->designation->name : null,
                    "emplyee_id" => $user->employeeDetail ? $user->employeeDetail->employee_id : null,
                ];
                $user_response = array_merge($user_response, $employee_details);
            }

           return $user_response;
        }

        // get task details
        function get_task($task_id){

            $task = DB::table('tasks')
                ->where('tasks.id',$task_id)
                ->leftJoin('project_members', 'tasks.project_id', 'project_members.project_id')
                ->leftJoin('task_users', 'tasks.id', 'task_users.task_id')
                ->select(
                    'tasks.id as id',
                    'tasks.heading as title',
                    'tasks.subtask_id',
                    'project_members.lead_developer_id as lead_developer',
                    'task_users.user_id as task_user_id'
                )
                ->first();


            if($task->lead_developer){
                $task->lead_developer = get_user($task->lead_developer, false);
            }

            if($task->subtask_id){
                $subtask = DB::table('sub_tasks')
                    ->select('sub_tasks.task_id as parent_task_id')
                    ->where('id', $task->subtask_id)
                    ->first();

                  //  dd($subtask);

                if($task->task_user_id){
                    $task->developer = get_user($task->task_user_id, false);
                }

                $task->parent_task = get_task($subtask->parent_task_id);
            }

            return $task;
        }

        $disputes = DB::table('task_revision_disputes as disputes')
                  ->leftJoin('task_revisions as revision', 'disputes.revision_id', 'revision.id')
                  ->leftJoin('projects', 'disputes.project_id', 'projects.id')
                  ->leftJoin('deals', 'projects.deal_id', 'deals.id')
                  ->select(
                   'disputes.*',
                    'revision.*',
                    'disputes.id as id',
                    'disputes.created_at as dispute_created_at',
                    'disputes.updated_at as dispute_updated_at',
                    'revision.id as revision_id',
                    'revision.created_at as revision_created_at',
                    'revision.updated_at as revision_updated_at',
                    'projects.id as project_id',
                    'projects.project_name as project_name',
                    'projects.client_id as client_id',
                    'projects.pm_id as pm_id',
                    'projects.deal_id as project_deal_id',
                    'deals.added_by as deal_added_by'
                  )
                  ->where(function($query) use ($task_id, $project_id, $dispute_id, $raised_by, $raised_against, $client_id, $start_date, $end_date, $logged_user){
                        if($task_id) {
                            $query->where('disputes.task_id', $task_id);
                        }

                        if(collect([1,8])->contains($logged_user->role_id)){
                            if($raised_by){
                                $query->where('disputes.raised_by', $raised_by);
                            }

                            if($raised_against){
                                $query->where('disputes.raised_against', $raised_against);
                            }
                        }else{
                            $query->where('disputes.raised_against', $logged_user->id)
                                ->orWhere('disputes.raised_by', $logged_user->id);
                        }

                        if($client_id){
                            $query->where('projects.client_id', $client_id);
                        }

                        if($project_id){
                            $query->where('disputes.project_id', $project_id);
                        }

                        if($dispute_id){
                            $query->where('disputes.id', $dispute_id);
                        }

                        if($start_date){
                            $query->whereDate('disputes.created_at','>=', Carbon::create($start_date)->format('Y-m-d'));
                        }

                        if($end_date){
                            $query->whereDate('disputes.created_at','<=', Carbon::create($end_date)->format('Y-m-d'));
                        }
                  })
                 ->get();


                 $disputes->each(function ($dispute){
                    $dispute->raised_against = get_user($dispute->raised_against, false);
                    $dispute->raised_by = get_user($dispute->raised_by, false);
                    $conversation = DB::table('task_dispute_questions')->where('dispute_id', $dispute->id)->get();
                    $dispute->conversations = $conversation ?? [];
                    $dispute->task = get_task($dispute->task_id);
                    $dispute->client = get_user($dispute->client_id, true);
                    $dispute->project_manager = get_user($dispute->pm_id, false);
                    $dispute->sales_person = get_user($dispute->deal_added_by, false);
                    if($dispute->resolved_by){
                        $dispute->resolved_by = get_user($dispute->resolved_by, false);
                    }
                    if($dispute->winner){
                        $dispute->winner = get_user($dispute->winner, false);
                    }
                    if($dispute->authorized_by){
                        $dispute->authorized_by = get_user($dispute->authorized_by, false);
                    }
                });

             return response()->json($disputes, 200);
    }

    public function get_disputes(Request $request){

        $filter = [
            "start_date" => $request->start_date ?? NULL,
            "end_date" => $request->end_date ?? NULL,
            "task_id" => $request->task_id ?? NULL,
            "project_id" => $request->project_id ?? NULL,
            "dispute_id" => $request->dispute_id ?? NULL,
            "raised_by" => $request->dispute_rasied_by ?? NULL,
            "raised_against" => $request->dispute_raised_against ?? NULL,
            'client_id' => $request->client_id ?? NULL
        ];

        return $this->get_dispute_data($filter);

    }


    // ADD QUESTION FOR DISPUTE
    // * @params id is dispute id;
    public function store_dispute_question(Request $request){

        $questions = $request->questions;
        $dispute_id = $questions['0']['dispute_id'];

        foreach ($questions as $question) {

            $query = new TaskDisputeQuestion();
            $query->dispute_id = $question['dispute_id'];
            $query->raised_by = $question['raised_by'];
            $query->question = $question['question'];
            $query->question_for = $question['question_for'];
            $query->save();
       }

       $revision_dispute = TaskRevisionDispute::find($dispute_id);
       $revision_dispute->has_update = true;
       $revision_dispute->save();

       $response_data = TaskDisputeQuestion::where('dispute_id', $request->dispute_id)->get();

        return response()->json([
            'data' => $response_data,
            "message"=>"Question added successfully"
        ], 200);
    }

    // ADD ANSWER Of QUESTION FOR DISPUTE
    // * @params id is dispute id;
    public function update_dispute_question_with_answer(Request $request){
        $questions = $request->questions;

        $dispute_id = $questions['0']['dispute_id'];


        // UPDATE ALL QUESTION WITH ANSWER
        foreach ($questions as $question) {
            $id = $question['id'];
            $query = TaskDisputeQuestion::find($id);
            $query->dispute_id = $question['dispute_id'];
            $query->raised_by = $question['raised_by'];
            $query->question = $question['question'];
            $query->question_for = $question['question_for'];
            $query->replies = $question['replies'];
            $query->replied_by = $question['replied_by'];
            $query->replied_date = Carbon::now();
            $query->save();
       }


       $revision_dispute = TaskRevisionDispute::find($dispute_id);
       $revision_dispute->has_update = true;
       $revision_dispute->save();


       $response_data = TaskDisputeQuestion::where('dispute_id', $dispute_id)->get();

       // RETURN UPDATED QUESTION DATA
       return response()->json([
        'data' => $response_data,
        'message' => 'Answer successfully submitted!'
       ], 200);
     }

    // MAKE DISPUTE SUBMITTED ANSWER SEEN
    public function update_dispute_answer_read_status(Request $request){

        $questions = $request->questions;
        $dispute_id = $questions['0']['dispute_id'];

        $revision_dispute = TaskRevisionDispute::find($dispute_id);

        foreach ($questions as $question) {
            $id = $question['id'];
            $query = TaskDisputeQuestion::find($id);
            $query->replied_seen = true;
            $query->replied_date = Carbon::now();
            $query->save();

            $revision_dispute->has_update = true;
            $revision_dispute->save();
       }

       $response_data = TaskDisputeQuestion::where('dispute_id', $dispute_id)->get();

        // REUTRN UPDATED QUESTION DATA
        return response()->json([
            'data' => $response_data,
            'message' => 'successful!'
           ], 200);
    }

    //  SEND FOR AUTHORIZATION
    public function dispute_send_for_authorization(Request $request){
        $id = $request->dispute_id;
        if($request->authorized){
            $query = TaskRevisionDispute::find($id);
            $query->resolve_comment = $request->resolve_comment;
            $query->raised_against_percent = $request->raised_against_percent;
            $query->raised_by_percent = $request->raised_by_percent;
            $query->resolved_by = $request->resolve_by;
            $query->winner = $request->winner;
            $query->authorize_comment = $request->authorize_comment;
            $query->authorized_by = $request->authorized_by;
            $query->resolved_on = $query->resolved_on ?? Carbon::now();
            $query->authorize_on = Carbon::now();
            $query->status = true;
            $query->has_update = true;
            $query->save();


            // change status on revision table
            $revision = TaskRevision::find($query->revision_id);
            $revision-> dispute_status = true;
            if($query->winner){
                $responsible_person = $query->raised_against != $query->winner ? $query->raised_against : $query->raised_by;
                $responsible_person_role = User::find($responsible_person)->role_id;
                if($responsible_person_role == null)
                {
                    $revision-> final_responsible_person = 'C';

                }else
                {
                    $revision-> final_responsible_person = $this->role[$responsible_person_role];
                }

            }
            $revision->save();

            $filter = [
                "dispute_id" => $request->dispute_id ?? NULL,
            ];

            return  $this->get_dispute_data($filter);
        }else{
            $query = TaskRevisionDispute::find($id);
            $query->need_authrization = $request->need_authrization;
            $query->resolve_comment = $request->resolve_comment;
            $query->raised_against_percent = $request->raised_against_percent;
            $query->raised_by_percent = $request->raised_by_percent;
            $query->resolved_by = $request->resolve_by;
            $query->resolved_on = Carbon::now();
            $query->has_update = true;
            $query->save();

            $filter = [
                "dispute_id" => $request->dispute_id ?? NULL,
            ];

            return  $this->get_dispute_data($filter);
        }
    }

    /************* TASK GUIDELINE AUTHORIZATION *************** */
    public function taskGuidelineAuthorization($id){
        $pm_task_guideline = PmTaskGuideline::where('project_id',$id)->first();
        if($pm_task_guideline != null)
        {
            $pm_task_guideline_authorization = PMTaskGuidelineAuthorization::where('project_id',$pm_task_guideline->project_id)->get();
            $already_submitted = $pm_task_guideline ? true : false;

            if($already_submitted && $pm_task_guideline->status ==1){
               $is_allow = true;
            }else $is_allow = false;

            return response()->json([
                "theme_details" => $pm_task_guideline->theme_details,
                "pm_task_guideline_authorization" => $pm_task_guideline_authorization,
                "design_details" => $pm_task_guideline->design_details,
                "color_schema" => $pm_task_guideline->color_schema,
                "plugin_research" => $pm_task_guideline->plugin_research,
                "status_code" => 200,
                "is_allow" => $is_allow,
                "is_submitted_already" => $already_submitted,
                "message" => $already_submitted ? 'Please wait until tasks guideline is authorized' : ''
            ], 200);

        }else
        {
            return response()->json([
                "status_code" => 200,
                "is_allow" => true,
            ], 200);
        }

    }


    /************* END TASK DISPUTE *************** */



    // get task
    public function get_task_revision($filter) {

        $revision_id = $filter['revision_id'] ?? null;

        $author = Auth::user();


         //get user
         function get_user($user_id, $is_client){
            $user = User::where( 'id', $user_id)->get()->first();
            $user_response = [
                "id" => $user->id,
                "name" => $user->name,
                "image" => $user->image,
                "role_id" => $user->role_id,
           ];

            if(!$is_client){
                $employee_details = [
                    "designation" => $user->employeeDetail ? $user->employeeDetail->designation->name : null,
                    "emplyee_id" => $user->employeeDetail ? $user->employeeDetail->employee_id : null,
                ];
                $user_response = array_merge($user_response, $employee_details);
            }

           return $user_response;
        }

        // get task details
        function get_task($task_id){

            $task = DB::table('tasks')
                ->where('tasks.id',$task_id)
                ->leftJoin('project_members', 'tasks.project_id', 'project_members.project_id')
                ->leftJoin('task_users', 'tasks.id', 'task_users.task_id')
                ->select(
                    'tasks.id as id',
                    'tasks.heading as title',
                    'tasks.subtask_id',
                    'project_members.lead_developer_id as lead_developer',
                    'task_users.user_id as task_user_id'
                )
                ->first();


            if($task->lead_developer){
                $task->lead_developer = get_user($task->lead_developer, false);
            }

            if($task->subtask_id){
                $subtask = DB::table('sub_tasks')
                    ->select('sub_tasks.task_id as parent_task_id')
                    ->where('id', $task->subtask_id)
                    ->first();

                  //  dd($subtask);

                if($task->task_user_id){
                    $task->developer = get_user($task->task_user_id, false);
                }

                $task->parent_task = get_task($subtask->parent_task_id);
            }

            return $task;
        }


        $revisions = DB::table('task_revisions as revisions')
                    ->leftJoin('projects', 'revisions.project_id', 'projects.id')
                    ->leftJoin('deals', 'projects.deal_id', 'deals.id')
                    ->leftJoin('tasks', 'revisions.task_id', 'tasks.id')
                    ->leftJoin('task_users', 'tasks.id', 'task_users.task_id')
                    ->select(
                      'revisions.*',
                      'revisions.created_at as revision_created_at',
                      'revisions.updated_at as revision_updated_at',
                      'projects.id as project_id',
                      'projects.project_name as project_name',
                      'projects.client_id as client_id',
                      'projects.pm_id as pm_id',
                      'projects.deal_id as project_deal_id',
                      'projects.status as project_status',
                      'deals.added_by as deal_added_by',
                      'tasks.*',
                      'tasks.id as task_id',
                      'revisions.id as id',
                      'tasks.status as task_status',
                      'task_users.user_id as task_assign_to',
                    )
                    ->where(function($query) use ($author, $revision_id){
                        if($author->role_id != 1){
                           $query->where('task_users.user_id', $author->id)
                                ->orWhere('tasks.added_by', $author->id)
                                ->orWhere('revisions.added_by', $author->id)
                                ->orWhere('revisions.sale_person', $author->id);
                        }

                        if($revision_id){
                            $query->where('revisions.id', $revision_id);
                        }
                    })
                    ->get();



                    $revisions->each(function ($revision){
                        $revision->task_assign_to = get_user($revision->task_assign_to, false);
                        $revision->client = get_user($revision->client_id, true);
                        $revision->deal_added_by = get_user($revision->deal_added_by, false);
                        $revision->project_manager = get_user($revision->pm_id, false);
                        if($revision->sale_person){
                            $revision->sale_person = get_user($revision->sale_person, false);
                        }
                        $revision->added_by = get_user($revision->added_by, false);

                        if($revision->subtask_id){
                            $revision->lead_developer = $revision->added_by;
                            $revision->developer = $revision->task_assign_to;
                        }else{
                            $revision->lead_developer = $revision->task_assign_to;
                            $revision->developer = null;
                        }
                    });

        return response()->json($revisions, 200);
    }

    /************** GET TASKS REVISIONs ************* */
    public function task_revisions(Request $request){

        return $this-> get_task_revision(null);
    }


    /******************* SALES ACTION ON PM REVISION  *********************** */
    public function sales_response_on_pm_revision(Request $request){
        //  DB::beginTransaction();

        $revision = TaskRevision::find($request->revision_id);
        $revision->sale_deny = $request->action_type === 'deny';
        $revision->sale_accept = $request->action_type === 'accept';
        $revision->sale_comment = $request->sale_comment;
        $revision->final_responsible_person = $revision->sale_accept ? 'S' : null;
        $revision->dispute_created = $revision->sale_deny;

        $revision->save();

        if($revision->dispute_created){
           $this->create_dispute($revision);
        }

        return $this-> get_task_revision(["revision_id" => $revision->id]);  // get all new infomatin & return as response
    }
    /************* TASK TYPE *************** */

    public function getTasksType(){
        $tasksType = TaskType::all();
        $responseData = [];

        foreach($tasksType as $item){
            $task = Task::where('id', $item->task_id)->first();
            $sub_task = SubTask::where('id', $task->subtask_id)->first();
            $added_by = User::where('id', $sub_task->added_by)->first();
            $assigned_to = User::where('id', $sub_task->assigned_to)->first();
            $project = Project::where('id', $task->project_id)->first();
            $client = User::where('id', $project->client_id)->first();

            $responseData[] = [
                'id' => $item->id,
                'page_name' => $item->page_name,
                'page_url' => $item->page_url,
                'task_id' => $task->id,
                'task' => $task->heading,
                'sub_task_id' => $sub_task->id,
                'sub_task' => $sub_task->title,
                'added_by_id' => $added_by->id,
                'added_by_name' => $added_by->name,
                'added_by_image' => $added_by->image,
                'assigned_to_id' => $assigned_to->id,
                'assigned_to_name' => $assigned_to->name,
                'assigned_to_image' => $assigned_to->image,
                'project_id' => $project->id,
                'project_name' => $project->project_name,
                'client_id' => $client->id,
                'client_name' => $client->name,
                'client_image' => $client->image,
                'authorization_status' => $item->authorization_status,
            ];
        }
        return response()->json([
            'data' => $responseData,
            'status' => 200
        ]);
    }

  public function taskTypeAuthorization(Request $request, $id){

        if($request->status=='approved'){
            $taskType = TaskType::find($id);
            $taskType->authorization_status = 1;
            $taskType->comment = $request->comment;
            $taskType->save();
        }else{
            $taskType = TaskType::find($id);
            $taskType->authorization_status = 2;
            $taskType->comment = $request->comment;
            $taskType->save();
        }

        return response()->json([
            'authorization_status'=>$taskType->authorization_status,
            'status'=>200
        ]);
    }
    public function get_today_tasks(Request $request,$id)
    {
    //    / dd("smkdmaskdm");
        $startDate= Carbon::today()->format('Y-m-d');
        $endDate= Carbon::today()->format('Y-m-d');
    //    / dd($startDate, $endDate);
    $todayData = ProjectTimeLog::select('tasks.id','tasks.heading as task_title','task_types.page_url','projects.id as projectId',
        'projects.project_name','projects.project_budget','clients.name as client_name','clients.id as clientId',
        'developers.id as developer_id',

        DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.user_id = "'.$id.'" AND tasks.id= project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.Carbon::today().'" AND DATE(project_time_logs.end_time) <= "'.Carbon::today().'"), 0) as total_time_spent'),
        )
        ->join('tasks','tasks.id','project_time_logs.task_id')
        ->join('projects','projects.id','tasks.project_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->join('users as developers','developers.id','project_time_logs.user_id')
        ->leftJoin('task_types','task_types.task_id','tasks.id')
        ->leftJoin('daily_submissions','daily_submissions.task_id','tasks.id')
        ->where('project_time_logs.user_id',$id)

        ->whereDate('project_time_logs.created_at',Carbon::today())

        ->groupBy('tasks.id')
        ->get();
    if ($todayData->isEmpty()) {
        $yesterdayData = ProjectTimeLog::select('tasks.id','tasks.heading as task_title','task_types.page_url','projects.id as projectId',
        'projects.project_name','projects.project_budget','clients.name as client_name','clients.id as clientId',
        'developers.id as developer_id',

        DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.user_id = "'.$id.'" AND tasks.id= project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.Carbon::yesterday().'" AND DATE(project_time_logs.end_time) <= "'.Carbon::yesterday().'"), 0) as total_time_spent'),
        )
        ->join('tasks','tasks.id','project_time_logs.task_id')
        ->join('projects','projects.id','tasks.project_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->join('users as developers','developers.id','project_time_logs.user_id')
        ->leftJoin('task_types','task_types.task_id','tasks.id')
        ->leftJoin('daily_submissions','daily_submissions.task_id','tasks.id')
        ->where('project_time_logs.user_id',$id)

        ->whereDate('project_time_logs.created_at',Carbon::yesterday())

        ->groupBy('tasks.id')
        ->get();
     //   dd($yesterdayData);
        if($yesterdayData->isEmpty())
        {
          //  dd("nsnaslkdn");
            $user_data= User::where('id',$id)->first();
            $project_time_log_date = ProjectTimeLog::where('user_id',$id)->orderBy('id','desc')->first();
            $last_login= $project_time_log_date->updated_at;

// Check if the last login date is today's date

            $yesterdayData = ProjectTimeLog::select('tasks.id','tasks.heading as task_title','task_types.page_url','projects.id as projectId',
        'projects.project_name','projects.project_budget','clients.name as client_name','clients.id as clientId',
        'developers.id as developer_id',

        DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.user_id = "'.$id.'" AND tasks.id= project_time_logs.task_id AND DATE(project_time_logs.start_time) >= "'.$last_login.'" AND DATE(project_time_logs.end_time) <= "'.$last_login.'"), 0) as total_time_spent'),
        )
        ->join('tasks','tasks.id','project_time_logs.task_id')
        ->join('projects','projects.id','tasks.project_id')
        ->join('users as clients','clients.id','projects.client_id')
        ->join('users as developers','developers.id','project_time_logs.user_id')
        ->leftJoin('task_types','task_types.task_id','tasks.id')
        ->leftJoin('daily_submissions','daily_submissions.task_id','tasks.id')
        ->where('project_time_logs.user_id',$id)

        ->whereDate('project_time_logs.created_at',$last_login)

        ->groupBy('tasks.id')
        ->get();



        }
    }

    if($request->date_type == 'today')
    {
       // dd("today");
        $tasks = $todayData;
        $date= Carbon::now();
    }else
    {
     //   dd("last_day");
        $tasks = $yesterdayData;
        $date= Carbon::yesterday();

    }
        // $tasks = $yesterdayData;
    // } else {
    //     $tasks = $todayData;
    // }
        // /dd($tasks );
        return response()->json([
            'date'=> $date,
            'data' => $tasks,
            'status' => 200
        ]);
    }

    public function checkInProgressTask($id)
    {

    $tasks= Task::select('tasks.id')
    ->leftJoin('task_users','task_users.task_id','tasks.id')

    ->where('task_users.user_id',$id)
    ->where('tasks.board_column_id',2)

    ->get();
    foreach($tasks as $task)
    {
        $subtasks= Subtask::leftJoin('tasks as subtasks','subtasks.subtask_id','sub_tasks.id')
        ->where('sub_tasks.task_id',$task->id)
        ->where('subtasks.board_column_id','!=',8)
        ->count();
        $task->subtask_not_finish = $subtasks;
    }
    $countTasksWithSubtasksNotFinished = $tasks->filter(function ($task) {
        return $task->subtask_not_finish == 0;
    })->count();

    if($countTasksWithSubtasksNotFinished > 0)
    {
        return response()->json([
            'message'=>'You cannot create tasks as you have already 6 tasks need to submit',
            'status'=>400
        ]);

    }else
    {
        return response()->json([
            'message'=>'You can create task',
            'status'=>200
        ]);

    }

    }

    public function storeDailySubmission(Request $request)
    {


        $daily_submission= new DailySubmission();

        if ($request->file('file') != null) {
            foreach ($request->file('file') as $att) {
                $task_submit = new TaskSubmission();
                $filename = null;
                if ($att) {
                    $filename = time() . $att->getClientOriginalName();

                    Storage::disk('public')->putFileAs(
                        'DailySubmission/',
                        $att,
                        $filename
                    );
                }
                $daily_submission->attachments = $filename;


            }
        }
        $daily_submission->user_id =$request->user_id;
        $daily_submission->task_id =$request->task_id;
        $daily_submission->project_id =$request->project_id;
        $daily_submission->client_id =$request->client_id;
        $daily_submission->task_heading =$request->task_heading;
        $daily_submission->client_name =$request->client_name;
        $daily_submission->comment =$request->comment;
        $daily_submission->link_name =$request->link_name;
        $daily_submission->section_name =$request->section_name;
        $daily_submission->hours_spent =$request->hours_spent;
        $daily_submission->status =1;
        $daily_submission->report_date= $request->report_date;
        $daily_submission->mark_as_complete =$request->mark_as_complete;

        $daily_submission->save();
        return response()->json([
            'message'=>'Daily submission submitted successfully',
            'status'=>200,
            'submission_status'=>$daily_submission->status,
            'mark_as_complete'=>$daily_submission->mark_as_complete,

        ]);


    }
    public function getDailySubmission($id)
    {
        $daily_submissions = DailySubmission::select('daily_submissions.*','daily_submissions.created_at as submission_creation_date','users.id as developer_id',
        'users.name as developer_name','users.image as developer_avatar','working_environments.site_url as site_url','working_environments.frontend_password'
        )
        ->leftJoin('tasks','tasks.id','daily_submissions.task_id')
        ->leftJoin('working_environments','working_environments.project_id','tasks.project_id')
        ->leftJoin('users','users.id','daily_submissions.user_id')
        ->where('tasks.id',$id)
        ->get();
        return response()->json([
            'daily_submissions'=> $daily_submissions,
            'status'=>200,

        ]);

    }
    public function allDailySubmission(Request $request){
    // /   dd($request);
        $startDate = $request->input('start_date', null);
        $endDate = $request->input('end_date', null);
        $employeeId = $request->input('employee_id', null);
        $pmId = $request->input('pm_id', null);
        $clientId = $request->input('client_id', null);
        $status = $request->input('status', null);
        $projectId = $request->input('project_id', null);
    //    / dd($startDate,$endDate);
        $dailySubmission = DailySubmission::select(
            'employee.id as employee_id',
            'employee.name as employee_name',
            'employee.image as employee_image',
            'daily_submissions.report_date as report_date',
            'client.id as client_id',
            'client.name as client_name',
            'client.image as client_image',
            'projects.id as project_id',
            'projects.project_name as project_name',
            'tasks.id as task_id',
            'tasks.heading as task_name',
            'tasks.status as task_status',
            'pm.id as pm_id',
            'pm.name as pm_name',
            'pm.image as pm_image',
            'ld.id as ld_id',
            'ld.name as ld_name',
            'ld.image as ld_image',
            'task_types.id as page_type_id',
            'task_types.task_type as task_type',
            'task_types.page_type as page_type',
            'task_types.page_url as page_link',
            'daily_submissions.section_name as section',
            'daily_submissions.comment as comment',
            'daily_submissions.hours_spent as total_time_spent',
            'daily_submissions.attachments as attachments',
            'working_environments.site_url as site_url',
            'working_environments.frontend_password as frontend_password',
            'daily_submissions.created_at as report_submission_date',
            'taskboard_columns.column_name as status_name',
            'taskboard_columns.label_color as status_color'
           // DB::raw('COALESCE((SELECT SUM(project_time_logs.total_minutes) FROM project_time_logs WHERE project_time_logs.task_id = tasks.id  AND DATE(project_time_logs.start_time) >= daily_submissions.created_at AND DATE(project_time_logs.end_time) <= daily_submissions.created_at), 0) as total_time_spent'),
            )
            ->join('tasks','tasks.id','=','daily_submissions.task_id')
            ->join('task_types','tasks.id','=','task_types.task_id')
            ->join('users as employee','employee.id','=','daily_submissions.user_id')
            ->join('users as client','client.id','=','daily_submissions.client_id')
            ->join('projects','projects.id','=','daily_submissions.project_id')
            ->join('project_members','projects.id','=','project_members.project_id')
            ->leftJoin('users as pm','pm.id','=','projects.pm_id')
            ->leftJoin('users as ld','ld.id','=','tasks.added_by')
            ->leftJoin('taskboard_columns','taskboard_columns.id','tasks.board_column_id')

            ->leftJoin('working_environments','projects.id','=','working_environments.project_id')
            ->groupBy('daily_submissions.task_id')
            ;

            if(!is_null($startDate) && !is_null($endDate) &&  $startDate == $endDate)
            {


                $dailySubmission = $dailySubmission->whereDate('daily_submissions.report_date', '=', Carbon::parse($startDate)->format('Y-m-d'));

            }else
            {
                if (!is_null($startDate)) {
                    $dailySubmission = $dailySubmission->whereDate('daily_submissions.created_at', '>=', Carbon::parse($startDate)->format('Y-m-d'));
                }
                if (!is_null($endDate)) {
                    $dailySubmission = $dailySubmission->whereDate('daily_submissions.created_at', '<=', Carbon::parse($endDate)->format('Y-m-d'));
                }

            }
            if (!is_null($projectId)) {
                $dailySubmission = $dailySubmission->where('daily_submissions.project_id', $projectId);
            }
            if (!is_null($employeeId)) {
                $dailySubmission = $dailySubmission->where('daily_submissions.user_id', $employeeId);
            }
            // // if (!is_null($assignee_by)) {
            // //     $dailySubmission = $dailySubmission->where('tasks.added_by', $assignee_by);
            // // }
            if (!is_null($pmId)) {
                $dailySubmission = $dailySubmission->where('projects.pm_id', $pmId);
            }
            if (!is_null($clientId)) {
                $dailySubmission = $dailySubmission->where('projects.client_id', $clientId);
            }
            $dailySubmission = $dailySubmission->get();






            // foreach($dailySubmission as $item)
            // {
            //     $project_time_logs = ProjectTimeLog::where('task_id',$item->task_id)
            //     ->whereDate('created_at',$item->created_at)
            //     ->sum('total_minutes');
            // $item->total_time_spent = $project_time_logs;

            // }
        //    / dd($dailySubmission);

            return response()->json([
                'dailySubmission'=> $dailySubmission,
                'status'=>200,
            ]);

    }
    public function checkTaskTrackTime($id)
    {
        $project_time_logs = ProjectTimeLog::select('project_time_logs.*')
        ->join('tasks','tasks.id','project_time_logs.task_id')
        ->where('tasks.subtask_id','!=',null)
        ->where('project_time_logs.task_id',$id)
        ->sum('project_time_logs.total_minutes');
        if($project_time_logs > 0)
        {
            return response()->json([
                'message'=> 'Developer can complete this task',
                'status'=>200,

            ]);

        }else
        {
            return response()->json([
                'message'=> 'Developer cannot complete this task',
                'status'=>400,

            ]);

        }
    }

    public function DeveloperInprogressTask($id)
    {
        $tasks = Task::select('tasks.id')
            ->leftJoin('task_users','task_users.task_id','tasks.id')
            ->where('task_users.user_id',$id)
            ->where('tasks.board_column_id',3)
            ->count();
        if($tasks > 4)
        {
            return response()->json([
                'tasks'=> $tasks,
                'message'=> 'error',
                'status'=>400,

            ]);

        }else
        {
            return response()->json([
                'tasks'=> $tasks,
                'message'=> 'success',
                'status'=>200,

            ]);

        }

    }
    public function checkEditableTask($id)
    {
        $subtasks= Subtask::select('tasks.*')
        ->join('tasks','tasks.subtask_id','sub_tasks.id')
        ->where('sub_tasks.task_id',$id)
        ->get();
        foreach($subtasks as $task)
        {
            $task_hours_logged= Task::select('tasks.*')->leftJoin('project_time_logs', 'project_time_logs.task_id', 'tasks.id')
            ->where('task_id',$task->id)
            ->sum('project_time_logs.total_minutes');
        $task->hours_logged = $task_hours_logged;

        }
        return response()->json([
            'task'=> $subtasks,
            'status'=>200,

        ]);


    }
    public function checkEditableSubTask($id)
    {
        $subtasks= ProjectTimeLog::select('tasks.*')
        ->join('tasks','tasks.id','project_time_logs.task_id')
        ->where('tasks.id',$id)
        ->sum('project_time_logs.total_minutes');

        return response()->json([
            'task'=> $subtasks,
            'status'=>200,

        ]);


    }
    public function PrimaryPageAuthorization()
    {
        $task_types = TaskType::where('authorization_status',0)->count();
        return response()->json([
            'task_types'=> $task_types,
            'status'=>200,

        ]);

    }
    public function checkfirstTask($id)
    {
        $task_count= Task::where('project_id',$id)->count();
        $project= PMProject::where('project_id',$id)->first();
        $current_date= Carbon::now();
        $project_date= Carbon::parse($project->created_at);
        $daysDifference = $current_date->diffInDays($project_date);
        if($task_count == 0)
        {
            return response()->json([
                'message'=> 'You can create task',
                'status'=>200,

            ]);


        }elseif($daysDifference <= 5)
        {

            return response()->json([
                'message'=> 'You can create task',
                'status'=>200,

            ]);


        }else
        {
            return response()->json([
                'message'=> 'You cannot create task',
                'status'=>400,

            ]);


        }
    }

    public function PendingParentTasks(){
        $user = Auth::user();
        if($user->role_id==1 || $user->role_id==8){
            $pendingParentTasks = PendingParentTasks::select([
                'pending_parent_tasks.*',
                'projects.project_name',
                'client.id as client_id',
                'client.name as client_name',
                'client.image as client_avatar',
                'assignee_to.id as assignee_to_id',
                'assignee_to.name as assignee_to_name',
                'assignee_to.image as assignee_to_avatar',
                'assignee_by.id as assignee_by_id',
                'assignee_by.name as assignee_by_name',
                'assignee_by.image as assignee_by_avatar',
                'approved_by.name as approved_by_name',
                'approved_by.image as approved_by_avatar',

            ])
            ->leftJoin('projects','pending_parent_tasks.project_id','=','projects.id')
            ->leftJoin('users as client','projects.client_id','=','client.id')
            ->leftJoin('users as assignee_to','pending_parent_tasks.user_id','=','assignee_to.id')
            ->leftJoin('users as assignee_by','pending_parent_tasks.added_by','=','assignee_by.id')
            ->leftJoin('users as approved_by','pending_parent_tasks.authorize_by','=','approved_by.id')
            ->get();
        }else{
            $pendingParentTasks = PendingParentTasks::select([
                'pending_parent_tasks.*',
                'projects.project_name',
                'client.id as client_id',
                'client.name as client_name',
                'client.image as client_avatar',
                'assignee_to.id as assignee_to_id',
                'assignee_to.name as assignee_to_name',
                'assignee_to.image as assignee_to_avatar',
                'assignee_by.id as assignee_by_id',
                'assignee_by.name as assignee_by_name',
                'assignee_by.image as assignee_by_avatar',
                'approved_by.name as approved_by_name',
                'approved_by.image as approved_by_avatar',
            ])
            ->leftJoin('projects','pending_parent_tasks.project_id','=','projects.id')
            ->leftJoin('users as client','projects.client_id','=','client.id')
            ->leftJoin('users as assignee_to','pending_parent_tasks.user_id','=','assignee_to.id')
            ->leftJoin('users as assignee_by','pending_parent_tasks.added_by','=','assignee_by.id')
            ->leftJoin('users as approved_by','pending_parent_tasks.authorize_by','=','approved_by.id')
            ->where('pending_parent_tasks.added_by', $user->id)
            ->get();
        }

        $pendingParentTasks->each(function($pendingParentTask){
            $pendingParentTask->conversations = PendingParentTaskConversation::where('pending_parent_task_conversations.pending_parent_task_id', $pendingParentTask->id)
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
        });

        return response()->json([
            'data'=>$pendingParentTasks,
            'status'=>200
        ],200);
    }

    public function AuthPendingParentTasks(Request $request, $id){
        if($request->status){
            $pendingParentTasks = PendingParentTasks::where('id',$id)->first();
            $pendingParentTasks->approval_status =  $request->status;
            $pendingParentTasks->comment = $request->comment;
            $pendingParentTasks->authorize_by = Auth::user()->id;
            $pendingParentTasks->save();

            $task = new Task();
            $task->heading = $pendingParentTasks->heading;
            $task->description = $pendingParentTasks->description;
            $task->start_date = $pendingParentTasks->start_date;
            $task->due_date = $pendingParentTasks->due_date;
            $task->project_id = $pendingParentTasks->project_id;
            $task->task_category_id = $pendingParentTasks->category_id;
            $task->priority = $pendingParentTasks->priority;
            $task->board_column_id = $pendingParentTasks->board_column_id;
            $task->estimate_hours = $pendingParentTasks->estimate_hours;
            $task->estimate_minutes = $pendingParentTasks->estimate_minutes;
            $task->deliverable_id = $pendingParentTasks->deliverable_id;
            $task->milestone_id = $pendingParentTasks->milestone_id;
            // $task->user_id = $pendingParentTasks->user_id;
            $task->added_by = Auth::user()->id;
            $task->save();
            if ($request->hasFile('file')) {

                foreach ($request->file as $fileData) {
                    $file = TaskFile::where('task_id',$pendingParentTasks->id);
                    $file->task_id = $task->id;

                    $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $task->id);

                    $file->user_id = $task->user_id;
                    $file->filename = $fileData->getClientOriginalName();
                    $file->hashname = $filename;
                    $file->size = $fileData->getSize();
                    $file->save();

                    $this->logTaskActivity($task->id, $task->user_id, 'fileActivity', $task->board_column_id);
                }
            }

            $task_user = new TaskUser();
            $task_user->task_id = $task->id;
            $task_user->user_id = $pendingParentTasks->user_id;
            $task_user->save();

        }else{
            $pendingParentTasks = PendingParentTasks::where('id',$id)->first();
            $pendingParentTasks->approval_status =  $request->status;
            $pendingParentTasks->comment = $request->comment;
            $pendingParentTasks->authorize_by = Auth::user()->id;
            $pendingParentTasks->save();

            $task = new Task();
            $task->heading = $pendingParentTasks->heading;
            $task->description = $pendingParentTasks->description;
            $task->start_date = $pendingParentTasks->start_date;
            $task->due_date = $pendingParentTasks->due_date;
            $task->project_id = $pendingParentTasks->project_id;
            $task->task_category_id = $pendingParentTasks->category_id;
            $task->priority = $pendingParentTasks->priority;
            $task->board_column_id = $pendingParentTasks->board_column_id;
            $task->estimate_hours = $pendingParentTasks->estimate_hours;
            $task->estimate_minutes = $pendingParentTasks->estimate_minutes;
            $task->deliverable_id = $pendingParentTasks->deliverable_id;
            $task->milestone_id = $pendingParentTasks->milestone_id;
            // $task->user_id = $pendingParentTasks->user_id;
            $task->added_by = Auth::user()->id;
            $task->save();
            if ($request->hasFile('file')) {

                foreach ($request->file as $fileData) {
                    $file = TaskFile::where('task_id',$pendingParentTasks->id);
                    $file->task_id = $task->id;

                    $filename = Files::uploadLocalOrS3($fileData, TaskFile::FILE_PATH . '/' . $task->id);

                    $file->user_id = $task->user_id;
                    $file->filename = $fileData->getClientOriginalName();
                    $file->hashname = $filename;
                    $file->size = $fileData->getSize();
                    $file->save();

                    $this->logTaskActivity($task->id, $task->user_id, 'fileActivity', $task->board_column_id);
                }
            }
            $task_user = new TaskUser();
            $task_user->task_id = $task->id;
            $task_user->user_id = $pendingParentTasks->user_id;
            $task_user->save();
        }
        return response()->json(['status'=>200]);
    }


    // Parent task authorization conversations
    // add questions
    public function get_pending_parent_task_conversation_question(Request $request, $task_id){
        $conversations = PendingParentTaskConversation::where('pending_parent_task_id', $task_id)->get();
        return response()->json([
            'data'=> $conversations,
            'status'=>200
        ],200);
    }

    public function add_pending_parent_task_conversation_question(Request $request){
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

    public function update_pending_parent_task_conversation_question_by_answer(Request $request){
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
}
