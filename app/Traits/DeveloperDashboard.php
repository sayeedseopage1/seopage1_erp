<?php

namespace App\Traits;

use \Carbon\Carbon;
use App\Models\Role;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\TaskType;
use Carbon\CarbonPeriod;
use App\Models\TaskHistory;
use App\Models\TaskRevision;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;

use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use Illuminate\Support\Facades\Auth;

trait DeveloperDashboard
{
    public function DeveloperDashboard()
    {
        $this->viewEventPermission = user()->permission('view_events');
        $this->viewNoticePermission = user()->permission('view_notice');
        $this->editTimelogPermission = user()->permission('edit_timelogs');
        $currentDate = now(global_setting()->timezone)->format('Y-m-d');
        $this->checkTodayLeave = Leave::where('status', 'approved')
            ->select('id')
            ->where('leave_date', now(global_setting()->timezone)->toDateString())
            ->where('user_id', user()->id)
            ->where('duration', '<>', 'half day')
            ->first();
        $this->checkTodayHoliday = Holiday::where('date', $currentDate)->first();
        $this->myActiveTimer = ProjectTimeLog::with('task', 'user', 'project', 'breaks', 'activeBreak')
            ->where('user_id', user()->id)
            ->whereNull('end_time')
            ->first();

        $this->widgets = DashboardWidget::where('dashboard_type', 'private-dashboard')->get();
        $this->activeWidgets = $this->widgets->filter(function ($value, $key) {
            return $value->status == '1';
        })->pluck('widget_name')->toArray();


        $now = now(global_setting()->timezone);
        $showClockIn = AttendanceSetting::first();

        $this->attendanceSettings = $this->attendanceShift($showClockIn);
        $currentWeekDates = [];
        $weekShifts = [];
        $this->currentWeekDates = $currentWeekDates;
        $this->weekShifts = $weekShifts;
        $this->showClockIn = $showClockIn->show_clock_in_button;
        $this->weekStartDate = $now->copy()->startOfWeek($showClockIn->week_start_from);
        $this->weekEndDate = $this->weekStartDate->copy()->addDays(7);
        $this->weekPeriod = CarbonPeriod::create($this->weekStartDate, $this->weekStartDate->copy()->addDays(6));
        $this->event_filter = explode(',', user()->employeeDetails->calendar_view);
        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);
        $this->dateWiseTimelogs = ProjectTimeLog::dateWiseTimelogs(now()->toDateString(), user()->id);
        $this->dateWiseTimelogBreak = ProjectTimeLogBreak::dateWiseTimelogBreak(now()->toDateString(), user()->id);

        $this->weekWiseTimelogs = ProjectTimeLog::weekWiseTimelogs($this->weekStartDate->copy()->toDateString(), $this->weekEndDate->copy()->toDateString(), user()->id);
        $this->weekWiseTimelogBreak = ProjectTimeLogBreak::weekWiseTimelogBreak($this->weekStartDate->toDateString(), $this->weekEndDate->toDateString(), user()->id);

        if (request()->ajax()) {
            // /   dd(request('startDate'),request('endDate'),request('user_id'));

            $devId = request('user_id');
            // $this->username = DB::table('users')->where('id',$devId)->value('name');
            $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            $endDate1 = request('endDate');
            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);
            $user_role = DB::table('users')->select('role_id')->where('id', $devId)->first();
            //  dd($startDate, $endDate);



            $this->username = DB::table('users')->where('id', $devId)->value('name');
            $this->developer_task_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at', )
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();

            $this->number_of_tasks_received = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
            $this->number_of_tasks_received_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                    //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_submissions', 'task_submissions.task_id', 'tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->number_of_tasks_received_data as $row) {
                $row->revision_count = TaskRevision::where('task_id', $row->id)->where('final_responsible_person', '!=', null)->count();
            }
            //    dd( $this->number_of_tasks_received, count( $this->number_of_tasks_received));

            $this->number_of_tasks_received_primary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Primary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();

            $this->number_of_tasks_received_secondary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Secondary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();


            $this->submit_number_of_tasks_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                //  ->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('task_submissions.task_id')
                ->count();
            $this->submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                    //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                //->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->submit_number_of_tasks_in_this_month_data as $row) {
                $row->revision_count = TaskRevision::where('task_id', $row->id)->where('final_responsible_person', '!=', null)->count();
            }


            $this->submit_number_of_tasks_primary_page_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->where('task_types.page_type', '=', 'Primary Page Development')
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();


            $this->submit_number_of_tasks_secondary_page_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->where('task_types.page_type', '=', 'Secondary Page Development')
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();


            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//

            $first_attempt_approve_task_data_client = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'tasks.updated_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('tasks.board_column_id', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->whereNotExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('task_revisions')
                        ->whereRaw('task_revisions.task_id = tasks.id');
                })
                ->groupBy('tasks.id')
                ->orderBy('tasks.updated_at', 'desc')
                ->get();

            // dd($first_attempt_approve_task);
            $first_attempt_approve_task_primary_page_client = 0;
            foreach ($first_attempt_approve_task_data_client as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type != null && $type->page_type == 'Primary Page Development') {
                    $first_attempt_approve_task_primary_page_client++;

                }

            }
            $first_attempt_approve_task_secondary_page_client = 0;
            foreach ($first_attempt_approve_task_data_client as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type != null && $type->page_type == 'Secondary Page Development') {
                    $first_attempt_approve_task_secondary_page_client++;

                }

            }

            $this->first_attempt_approve_task_in_this_month_client_data
                = $first_attempt_approve_task_data_client;
            //dd($this->first_attempt_approve_task_in_this_month_client_data);


            //  $this->first_attempt_approve_task_in_this_month_client = $first_attempt_approve_task;
            // dd($first_attempt_approve_task);
            $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page_client;
            $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page_client;




            //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//


            $first_attempt_approve_task = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_history.board_column_id', 8)
                ->where('task_history.created_at', '>=', $startDate)
                ->where('task_history.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->whereNotExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('task_history as th')
                        ->whereRaw('th.task_id = tasks.id')
                        ->where('th.board_column_id', 1)
                        ->where('th.created_at', '<', DB::raw('task_history.created_at'));
                })
                ->groupBy('tasks.id')
                ->orderBy('task_history.created_at', 'desc')
                ->get();

            // dd($first_attempt_approve_task);
            $first_attempt_approve_task_primary_page = 0;
            foreach ($first_attempt_approve_task as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type->page_type == 'Primary Page Development') {
                    $first_attempt_approve_task_primary_page++;

                }

            }
            $first_attempt_approve_task_secondary_page = 0;
            foreach ($first_attempt_approve_task as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type->page_type == 'Secondary Page Development') {
                    $first_attempt_approve_task_secondary_page++;

                }

            }
            //dd($first_attempt_approve_task_primary_page,$first_attempt_approve_task_secondary_page);



            $this->first_attempt_approve_task_in_this_month = $first_attempt_approve_task;
            $this->first_attempt_approve_task_primary_page_in_this_month = $first_attempt_approve_task_primary_page;
            $this->first_attempt_approve_task_secondary_page_in_this_month = $first_attempt_approve_task_secondary_page;






            // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->select('tasks.id')
                ->where('task_history.created_at', '>=', $startDate)
                ->where('task_history.created_at', '<', $endDate)
                ->where('task_history.board_column_id', 8)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            //  dd($number_of_tasks_approved);

            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {

                $min_approve_date = DB::table('task_history')
                    ->select('task_history.created_at')
                    ->where('task_history.task_id', $task->id)
                    ->where('task_history.board_column_id', 8)
                    ->orderBy('task_history.created_at', 'asc')
                    ->first();
                //  if($min_approve_date == null)
                //  {
                //     dd($task->id);
                //  }


                $number_of_tasks = DB::table('task_submissions')
                    ->select('task_submissions.submission_no')
                    ->where('task_submissions.task_id', $task->id)
                    ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();

                //dd($number_of_tasks);
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month = ($count_submission_per_approval / $total_approval) + 1;
            } else {
                $this->average_submission_aproval_in_this_month = 0;
            }

            //---------------- Avg number of attempts needed for approval by lead developer table view ------------------------------//



            $this->avg_no_of_submission_needed_for_app_by_lead_dev = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_submissions.submission_no', 1)
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->get();
            foreach ($this->avg_no_of_submission_needed_for_app_by_lead_dev as $revision) {
                $revision->revision_count = TaskHistory::where('task_id', $revision->id)->where('board_column_id', 1)->whereDate('created_at', '<=', $revision->task_approval_date)->count();
            }
            // DB::raw('(SELECT COUNT(*) FROM task_revisions WHERE task_revisions.task_id = tasks.id AND task_revisions.created_at <= task_history.created_at) AS revision_count')



            $this->no_of_tasks_revision_given_by_lead_dev = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_submissions.submission_no', 1)
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->where('task_history.board_column_id', 1)

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->count();



            // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {
                $number_of_tasks = DB::table('task_submissions')
                    ->select('task_submissions.submission_no')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();
                if ($number_of_tasks != null) {
                    $max_submission = $number_of_tasks->submission_no;

                    $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                    $total_approval++;

                }


            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month_client = ($count_submission_per_approval / $total_approval) + 1;
            } else {
                $this->average_submission_aproval_in_this_month_client = 0;
            }
            // dd($this->average_submission_aproval_in_this_month_client);

            $this->no_of_tasks_revision_given_by_client = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_revisions', 'tasks.id', '=', 'task_revisions.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')

                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->where('task_revisions.revision_status', 'Client Revision')

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->count();



            //---------------------------------Percentage of Revision----------------------------------------------------//

            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $assign_task_count_for_revision = 0;
            $number_of_total_revision_for_this_month = 0;
            foreach ($total_task_assigned as $task) {

                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                    ->where('task_id', $current_task_id)
                    ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                            ->orWhere('raised_against', $devId);

                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                            ->orWhere('raised_against_percent', '>', 0);
                    })

                    ->count();

                if ($disput_responsible_for_revision > 0) {
                    $disput_responsible_for_revision = 1;
                } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                    ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'D')
                    ->count();

                if ($responsible_for_revision > 0) {
                    $responsible_for_revision = 1;
                }  // one task for count one revision

                $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

                $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

                //count of assign tasks
                $assign_task_count_for_revision++;
            }

            $percentage_of_tasks_with_revision = 0;
            if ($assign_task_count_for_revision > 0) {
                $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
            }
            $this->percentage_of_tasks_with_revision = $percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision = $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;


            //in this month

            $submit_number_of_tasks_in_this_month_count = $this->submit_number_of_tasks_in_this_month;

            $log_time_minute_total_in_this_month = 0;
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->get();

            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');
                $log_time_minute_total_in_this_month = $log_time_minute_total_in_this_month + $log_time_per_task;

            }

            $average_submission_time_in_this_month = 0;

            if ($submit_number_of_tasks_in_this_month_count > 0) {
                $average_submission_time_in_this_month = $log_time_minute_total_in_this_month / $submit_number_of_tasks_in_this_month_count;
                $average_submission_time_in_this_month = $average_submission_time_in_this_month / 60;

            }

            $this->average_submission_time_in_this_month = $average_submission_time_in_this_month;




            //in this month

            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
                ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->get();

            $sum_of_total_duration = 0;
            $count_of_submission_task = 0;
            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                $sum_of_total_duration = $sum_of_total_duration + $task->total_duration;
                $count_of_submission_task++;
            }

            $average_submission_day_in_this_month = 0;

            if ($count_of_submission_task > 0) {
                $average_submission_day_in_this_month = $sum_of_total_duration / $count_of_submission_task;
            }

            $this->average_submission_day_in_this_month = $average_submission_day_in_this_month;


            //-----------Percentage of tasks where deadline was missed -----------------//

            $currentDate = Carbon::now()->format('Y-m-d');

            $number_of_tasks_received_for_deadline = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();

            $number_of_tasks_received_for_deadline_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_of_tasks_cross_deadline = 0;
            $percentage_of_tasks_deadline = 0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');

                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');

                if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                    $number_of_tasks_cross_deadline++;


                } else if ($dueDate < $currentDate && $task->board_column_id != 4) {

                    $number_of_tasks_cross_deadline++;

                }
            }

            $this->number_of_tasks_cross_deadline = $number_of_tasks_cross_deadline;



            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_of_tasks_deadline = ($number_of_tasks_cross_deadline / $number_of_tasks_received_for_deadline) * 100;
            }

            $this->percentage_of_tasks_deadline = $percentage_of_tasks_deadline;

            //Percentage of tasks where given estimated time was missed
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $number_task_cross_estimate_time = 0;
            $percentage_number_task_cross_estimate_time = 0;
            foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', '=', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
                if ($log_time_per_task > $estimate_minutes_task) {
                    $number_task_cross_estimate_time++;
                }

            }
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
            }

            $this->percentage_number_task_cross_estimate_time = $percentage_number_task_cross_estimate_time;
            $this->number_task_cross_estimate_time = $number_task_cross_estimate_time;
            $this->number_of_tasks_received_for_missed_estimate_data = $number_of_tasks_received_for_missed_estimate_data;


            //Number of disputes filed

            $this->number_of_dispute_filed_own = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);

                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Number of disputes lost
            $this->number_of_dispute_lost_own = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);

                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_lost_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            //Hours spent in revisions

            $spent_revision_developer = DB::table('project_time_logs')
                ->where('user_id', $devId)
                ->where('revision_status', 1)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('total_minutes');

            $this->spent_revision_developer = $spent_revision_developer / 60;


            // Average number of in-progress tasks

            $total_in_progress_date_range = DB::table('progress_tasks')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->groupBy('user_id')
                ->sum('count_progress_task');

            $startDateString = request('startDate');
            $endDateString = request('endDate');

            $startDate4 = Carbon::parse($startDateString);
            $endDate4 = Carbon::parse($endDateString);

            $differenceInDays = (int) $endDate4->diffInDays($startDate4);

            $differenceInDays = $differenceInDays + 1;
            $this->average_in_progress_date_range = $total_in_progress_date_range / $differenceInDays;


            $this->tasks = Task::select(
                'tasks.id',
                'tasks.heading',
                'projects.project_name',
                'projects.id as ProjectId',
                'client.name as clientName',
                'client.id as client_id',
                'tasks.client_name as task_client_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name',
                'taskboard_columns.label_color',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.created_at as created_at',
                'task_submissions.created_at as submission_date'
            )
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->join('taskboard_columns', 'taskboard_columns.id', 'tasks.board_column_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_users', 'task_users.task_id', 'tasks.id')

                ->leftJoin('task_submissions', function ($join) {
                    $join->on('task_submissions.task_id', '=', 'tasks.id')
                        ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                        ->orderBy('task_submissions.created_at', 'desc');
                })
                ->where('task_users.user_id', $devId)
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->groupBy('tasks.id')
                ->orderBy('tasks.created_at', 'desc')->get();
            $this->past_tasks = Task::select(
                'tasks.id',
                'tasks.heading',
                'projects.project_name',
                'projects.id as ProjectId',
                'client.name as clientName',
                'client.id as client_id',
                'tasks.client_name as task_client_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name',
                'taskboard_columns.label_color',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.created_at as created_at',
                'task_submissions.created_at as submission_date'
            )
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->join('taskboard_columns', 'taskboard_columns.id', 'tasks.board_column_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_users', 'task_users.task_id', 'tasks.id')

                ->leftJoin('task_submissions', function ($join) {
                    $join->on('task_submissions.task_id', '=', 'tasks.id')
                        ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                        ->orderBy('task_submissions.created_at', 'desc');
                })
                ->where('task_users.user_id', $devId)
                ->whereNotIn('tasks.board_column_id', [2, 3])
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->groupBy('tasks.id')
                ->orderBy('tasks.created_at', 'desc')->get();

            //------------Average number of attempts needed for approval(in cycle) Client Data------------//

            $this->average_number_of_tasks_approved_client_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color',
                    'tasks.updated_at as task_complete_date'
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->average_number_of_tasks_approved_client_data as $revision) {
                $revision->revision_count = TaskHistory::where('task_id', $revision->id)->where('board_column_id', 1)->whereDate('created_at', '<=', $revision->task_complete_date)->count();
            }

            $this->no_of_tasks_revision_given_by_client = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_revisions', 'tasks.id', '=', 'task_revisions.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')

                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->where('task_revisions.revision_status', 'Client Revision')

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->count();
            //---------------------------------Percentage of Revision Data----------------------------------------------------//
            $revision_task_id_store = [];
            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('task_revisions', 'task_revisions.task_id', 'tasks.id')
                ->select('tasks.id')
                ->where('task_revisions.created_at', '>=', $startDate)
                ->where('task_revisions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();

            $assign_task_count_for_revision = 0;
            $number_of_total_revision_for_this_month = 0;
            foreach ($total_task_assigned as $task) {

                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                    ->where('task_id', $current_task_id)
                    ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                            ->orWhere('raised_against', $devId);

                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                            ->orWhere('raised_against_percent', '>', 0);
                    })

                    ->count();

                if ($disput_responsible_for_revision > 0) {
                    $revision_task_id_store[] = $task->id;

                    $disput_responsible_for_revision = 1;
                } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                    ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'D')
                    ->count();

                if ($responsible_for_revision > 0) {

                    $revision_task_id_store[] = $task->id;
                    $responsible_for_revision = 1;
                }  // one task for count one revision

                $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

                $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

                //count of assign tasks
                $assign_task_count_for_revision++;
            }

            $percentage_of_tasks_with_revision = 0;
            if ($assign_task_count_for_revision > 0) {
                $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
            }
            $this->percentage_of_tasks_with_revision = $percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision = $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;


            $revision_task_data = [];

            foreach ($revision_task_id_store as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $revision_task_data[] = $task_data;
            }


            $this->revision_task_data = $revision_task_data;

            //-----------Percentage of tasks where deadline was missed table-----------------//
            $deadline_missed_task_id = [];
            $currentDate = Carbon::now()->format('Y-m-d');
            $number_of_tasks_received_for_deadline_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_of_tasks_cross_deadline = 0;
            $percentage_of_tasks_deadline = 0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');

                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');

                if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                    $number_of_tasks_cross_deadline++;
                    $deadline_missed_task_id[] = $task->id;
                } else if ($dueDate < $currentDate && $task->board_column_id != 4) {

                    $number_of_tasks_cross_deadline++;
                    $deadline_missed_task_id[] = $task->id;
                }
            }

            $deadline_missed_task_data = [];

            foreach ($deadline_missed_task_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $deadline_missed_task_data[] = $task_data;
            }


            $this->deadline_missed_task_data = $deadline_missed_task_data;

            //Percentage of tasks where given estimated time was missed table
            $estimate_time_missed_id_store = [];
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_task_cross_estimate_time = 0;
            $percentage_number_task_cross_estimate_time = 0;
            foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', '=', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
                if ($log_time_per_task > $estimate_minutes_task) {
                    $number_task_cross_estimate_time++;
                    $estimate_time_missed_id_store[] = $task->id;
                }
            }
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
                $estimate_time_missed_id_store[] = $task->id;
            }

            $estimate_missed_task_data = [];

            foreach ($estimate_time_missed_id_store as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $estimate_missed_task_data[] = $task_data;
            }


            $this->estimate_missed_task_data = $estimate_missed_task_data;


            //----------Number of disputes filed  own table--------//

            $number_of_dispute_filed_own_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();


            $number_of_dispute_filed_own_data = [];

            foreach ($number_of_dispute_filed_own_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $number_of_dispute_filed_own_data[] = $task_data;

            }

            $this->number_of_dispute_filed_own_data = $number_of_dispute_filed_own_data;

            //---------dispute filed all data---------//


            $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_filed_all_data = [];

            foreach ($number_of_dispute_filed_all_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $number_of_dispute_filed_all_data[] = $task_data;
            }


            $this->number_of_dispute_filed_all_data = $number_of_dispute_filed_all_data;

            //----------------Hours spent in revisions data--------------------//

            $spent_revision_developer_data_id = DB::table('project_time_logs')
                ->select('task_id')
                ->where('user_id', $devId)
                ->where('revision_status', 1)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $spent_revision_developer_data = [];

            foreach ($spent_revision_developer_data_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $spent_revision_developer_data[] = $task_data;
            }

            $this->spent_revision_developer_data = $spent_revision_developer_data;
            // Average number of in-progress tasks table

            $this->total_in_progress_date_range_table = DB::table('progress_tasks')
                ->select('count_progress_task', 'created_at')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            // --------------Average number of attempts needed for approval(in cycle) Client table-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->select('tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('tasks.board_column_id', '=', 4)
                ->where(
                    'tasks.updated_at',
                    '>=',
                    $startDate
                )
                ->where(
                    'tasks.updated_at',
                    '<',
                    $endDate
                )
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->distinct('tasks.id')
                ->get();

            $average_attempts_approve_client_data_lead = [];

            foreach ($number_of_tasks_approved as $task) {
                //$task= Task::where('id',$task)->select('id')
                $approve_task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->join(
                        'task_submissions',
                        'task_submissions.task_id',
                        '=',
                        'tasks.id'
                    )
                    ->join(
                        'task_users',
                        'tasks.id',
                        '=',
                        'task_users.task_id'
                    )
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where(
                        'tasks.id',
                        $task->id
                    )
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_attempts_approve_client_data_lead[] = $approve_task_data;
            }

            $this->average_attempts_approve_client_data_lead = $average_attempts_approve_client_data_lead;




            $html = view('dashboard.ajax.developerdashboard.month', $this->data)->render();


            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
            ]);

        } else {
            $devId = Auth::id();
            // $this->username = DB::table('users')->where('id',$devId)->value('name');
            $startDate = Carbon::now()->startOfMonth();

            $endDate1 = Carbon::now()->endOfMonth();

            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');
            //  dd($startDate, $endDate);

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);
            $user_role = DB::table('users')->select('role_id')->where('id', $devId)->first();



            $this->username = DB::table('users')->where('id', $devId)->value('name');
            $this->developer_task_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at', )
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();

            $this->number_of_tasks_received = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();
            $this->number_of_tasks_received_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                    //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_submissions', 'task_submissions.task_id', 'tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->number_of_tasks_received_data as $row) {
                $row->revision_count = TaskRevision::where('task_id', $row->id)->where('final_responsible_person', '!=', null)->count();
            }

            //    dd( $this->number_of_tasks_received, count( $this->number_of_tasks_received));
            $this->number_of_tasks_received_primary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Primary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();

            $this->number_of_tasks_received_secondary_page = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_types.page_type', '=', 'Secondary Page Development')
                ->where('task_users.user_id', $devId)
                ->count();

            $this->submit_number_of_tasks_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                // ->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();
            $this->submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'
                    //DB::raw('(SELECT COUNT(task_revisions.id) FROM task_revisions WHERE projects.id = project_time_logs.project_id AND employee.id = project_time_logs.user_id AND DATE(project_time_logs.start_time) >= "'.$startDate.'" AND DATE(project_time_logs.end_time) <= "'.$endDate.'") as number_of_session'),
                )
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                //  ->whereNotIn('tasks.board_column_id',[1,2,3])
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->submit_number_of_tasks_in_this_month_data as $row) {
                $row->revision_count = TaskRevision::where('task_id', $row->id)->where('final_responsible_person', '!=', null)->count();
            }

            $this->submit_number_of_tasks_primary_page_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->where('task_types.page_type', '=', 'Primary Page Development')
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();



            $this->submit_number_of_tasks_secondary_page_in_this_month = DB::table('task_submissions')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->join('task_types', 'task_submissions.task_id', '=', 'task_types.task_id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->where('task_types.page_type', '=', 'Secondary Page Development')
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->count();


            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//


            $first_attempt_approve_task_data_client = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'tasks.updated_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('tasks.board_column_id', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->whereNotExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('task_revisions')
                        ->whereRaw('task_revisions.task_id = tasks.id');
                })
                ->groupBy('tasks.id')
                ->orderBy('tasks.updated_at', 'desc')
                ->get();

            // dd($first_attempt_approve_task);
            $first_attempt_approve_task_primary_page_client = 0;
            foreach ($first_attempt_approve_task_data_client as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type != null && $type->page_type == 'Primary Page Development') {
                    $first_attempt_approve_task_primary_page_client++;

                }

            }
            $first_attempt_approve_task_secondary_page_client = 0;
            foreach ($first_attempt_approve_task_data_client as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type != null && $type->page_type == 'Secondary Page Development') {
                    $first_attempt_approve_task_secondary_page_client++;

                }

            }

            $this->first_attempt_approve_task_in_this_month_client_data
                = $first_attempt_approve_task_data_client;
            //dd($this->first_attempt_approve_task_in_this_month_client_data);


            //  $this->first_attempt_approve_task_in_this_month_client = $first_attempt_approve_task;
            // dd($first_attempt_approve_task);
            $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page_client;
            $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page_client;



            //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//


            $first_attempt_approve_task = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_history.board_column_id', 8)
                ->where('task_history.created_at', '>=', $startDate)
                ->where('task_history.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->whereNotExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('task_history as th')
                        ->whereRaw('th.task_id = tasks.id')
                        ->where('th.board_column_id', 1)
                        ->where('th.created_at', '<', DB::raw('task_history.created_at'));
                })
                ->groupBy('tasks.id')
                ->orderBy('task_history.created_at', 'desc')
                ->get();

            //dd($first_attempt_approve_task);

            $first_attempt_approve_task_primary_page = 0;
            foreach ($first_attempt_approve_task as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type->page_type == 'Primary Page Development') {
                    $first_attempt_approve_task_primary_page++;

                }

            }
            $first_attempt_approve_task_secondary_page = 0;
            foreach ($first_attempt_approve_task as $item) {
                $type = TaskType::where('task_id', $item->id)->first();
                if ($type->page_type == 'Secondary Page Development') {
                    $first_attempt_approve_task_secondary_page++;

                }

            }

            $this->first_attempt_approve_task_in_this_month = $first_attempt_approve_task;
            $this->first_attempt_approve_task_primary_page_in_this_month = $first_attempt_approve_task_primary_page;
            $this->first_attempt_approve_task_secondary_page_in_this_month = $first_attempt_approve_task_secondary_page;






            // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->select('tasks.id')
                ->where('task_history.created_at', '>=', $startDate)
                ->where('task_history.created_at', '<', $endDate)
                ->where('task_history.board_column_id', 8)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            //  dd($number_of_tasks_approved);

            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {

                $min_approve_date = DB::table('task_history')
                    ->select('task_history.created_at')
                    ->where('task_history.task_id', $task->id)
                    ->where('task_history.board_column_id', 8)
                    ->orderBy('task_history.created_at', 'asc')
                    ->first();
                //  if($min_approve_date == null)
                //  {
                //     dd($task->id);
                //  }


                $number_of_tasks = DB::table('task_submissions')
                    ->select('task_submissions.submission_no')
                    ->where('task_submissions.task_id', $task->id)
                    ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();

                //dd($number_of_tasks);
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month = ($count_submission_per_approval / $total_approval) + 1;
            } else {
                $this->average_submission_aproval_in_this_month = 0;
            }

            //---------------- Avg number of attempts needed for approval by lead developer table view------------------------------//



            $this->avg_no_of_submission_needed_for_app_by_lead_dev = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_submissions.submission_no', 1)
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->get();
            foreach ($this->avg_no_of_submission_needed_for_app_by_lead_dev as $revision) {
                $revision->revision_count = TaskHistory::where('task_id', $revision->id)->where('board_column_id', 1)->whereDate('created_at', '<=', $revision->task_approval_date)->count();
            }
            $this->no_of_tasks_revision_given_by_lead_dev = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'tasks.client_name',
                    'tasks.due_date',
                    'tasks.created_at as task_creation_date',
                    'task_history.created_at as task_approval_date',
                    'client.name as clientName',
                    'client.id as clientId',
                    'cl.name as cl_name',
                    'cl.id as cl_id',
                    DB::raw('MIN(task_submissions.created_at) as task_submission_date'),
                    'taskboard_columns.column_name',
                    'taskboard_columns.label_color as label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('projects', 'tasks.project_id', '=', 'projects.id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->leftJoin('users as client', 'client.id', '=', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', '=', 'tasks.client_id')
                ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
                ->where('task_submissions.submission_no', 1)
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->where('task_history.board_column_id', 1)

                ->groupBy('tasks.id')
                ->orderBy('task_submissions.created_at', 'desc')
                ->count();


            // dd($this->avg_no_of_submission_needed_for_app_by_lead_dev);


            // --------------Average number of attempts needed for approval(in cycle) Client-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $first_attempt_approve_task = 0;
            $count_submission_per_approval = 0;
            $total_approval = 0;
            foreach ($number_of_tasks_approved as $task) {



                $number_of_tasks = DB::table('task_submissions')
                    ->select('task_submissions.submission_no')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->orderBy('task_submissions.id', 'DESC')
                    ->first();
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month_client = ($count_submission_per_approval / $total_approval) + 1;
            } else {
                $this->average_submission_aproval_in_this_month_client = 0;
            }
            // dd($this->average_submission_aproval_in_this_month);



            //---------------------------------Percentage of Revision----------------------------------------------------//

            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $assign_task_count_for_revision = 0;
            $number_of_total_revision_for_this_month = 0;
            foreach ($total_task_assigned as $task) {

                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                    ->where('task_id', $current_task_id)
                    ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                            ->orWhere('raised_against', $devId);

                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                            ->orWhere('raised_against_percent', '>', 0);
                    })

                    ->count();

                if ($disput_responsible_for_revision > 0) {
                    $disput_responsible_for_revision = 1;
                } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                    ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'D')
                    ->count();

                if ($responsible_for_revision > 0) {
                    $responsible_for_revision = 1;
                }  // one task for count one revision

                $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

                $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

                //count of assign tasks
                $assign_task_count_for_revision++;
            }

            $percentage_of_tasks_with_revision = 0;
            if ($assign_task_count_for_revision > 0) {
                $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
            }
            $this->percentage_of_tasks_with_revision = $percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision = $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;



            //in this month

            $submit_number_of_tasks_in_this_month_count = $this->submit_number_of_tasks_in_this_month;

            $log_time_minute_total_in_this_month = 0;
            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->distinct('tasks.id')
                ->get();

            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');
                $log_time_minute_total_in_this_month = $log_time_minute_total_in_this_month + $log_time_per_task;

            }

            $average_submission_time_in_this_month = 0;

            if ($submit_number_of_tasks_in_this_month_count > 0) {
                $average_submission_time_in_this_month = $log_time_minute_total_in_this_month / $submit_number_of_tasks_in_this_month_count;
                $average_submission_time_in_this_month = $average_submission_time_in_this_month / 60;

            }

            $this->average_submission_time_in_this_month = $average_submission_time_in_this_month;




            //in this month

            $submit_number_of_tasks_in_this_month_data = DB::table('task_submissions')
                ->select('tasks.id', 'tasks.created_at', 'task_submissions.created_at')
                ->selectRaw('DATEDIFF(task_submissions.created_at, tasks.created_at) AS total_duration')
                ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                ->where('task_submissions.created_at', '>=', $startDate)
                ->where('task_submissions.created_at', '<', $endDate)
                ->where('task_submissions.user_id', $devId)
                ->where('task_submissions.submission_no', '=', 1)
                ->distinct('task_submissions.created_at')
                ->get();

            $sum_of_total_duration = 0;
            $count_of_submission_task = 0;
            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
                $sum_of_total_duration = $sum_of_total_duration + $task->total_duration;
                $count_of_submission_task++;
            }

            $average_submission_day_in_this_month = 0;

            if ($count_of_submission_task > 0) {
                $average_submission_day_in_this_month = $sum_of_total_duration / $count_of_submission_task;
            }

            $this->average_submission_day_in_this_month = $average_submission_day_in_this_month;


            //-----------Percentage of tasks where deadline was missed -----------------//

            $currentDate = Carbon::now()->format('Y-m-d');

            $number_of_tasks_received_for_deadline = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();

            $number_of_tasks_received_for_deadline_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_of_tasks_cross_deadline = 0;
            $percentage_of_tasks_deadline = 0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');

                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');

                if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                    $number_of_tasks_cross_deadline++;


                } else if ($dueDate < $currentDate && $task->board_column_id != 4) {

                    $number_of_tasks_cross_deadline++;

                }
            }

            $this->number_of_tasks_cross_deadline = $number_of_tasks_cross_deadline;



            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_of_tasks_deadline = ($number_of_tasks_cross_deadline / $number_of_tasks_received_for_deadline) * 100;
            }

            $this->percentage_of_tasks_deadline = $percentage_of_tasks_deadline;

            //Percentage of tasks where given estimated time was missed
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $number_task_cross_estimate_time = 0;
            $percentage_number_task_cross_estimate_time = 0;
            foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', '=', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
                if ($log_time_per_task > $estimate_minutes_task) {
                    $number_task_cross_estimate_time++;
                }

            }
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
            }

            $this->percentage_number_task_cross_estimate_time = $percentage_number_task_cross_estimate_time;
            $this->number_task_cross_estimate_time = $number_task_cross_estimate_time;
            $this->number_of_tasks_received_for_missed_estimate_data = $number_of_tasks_received_for_missed_estimate_data;


            //Number of disputes filed

            $this->number_of_dispute_filed_own = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);

                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Number of disputes lost
            $this->number_of_dispute_lost_own = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);

                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_lost_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            //Hours spent in revisions

            $spent_revision_developer = DB::table('project_time_logs')
                ->where('user_id', $devId)
                ->where('revision_status', 1)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->sum('total_minutes');

            $this->spent_revision_developer = $spent_revision_developer / 60;


            // Average number of in-progress tasks

            $total_in_progress_date_range = DB::table('progress_tasks')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->groupBy('user_id')
                ->sum('count_progress_task');

            $startDateString = request('startDate');
            $endDateString = request('endDate');

            $startDate4 = Carbon::parse($startDateString);
            $endDate4 = Carbon::parse($endDateString);

            $differenceInDays = (int) $endDate4->diffInDays($startDate4);

            $differenceInDays = $differenceInDays + 1;
            $this->average_in_progress_date_range = $total_in_progress_date_range / $differenceInDays;
            $this->tasks = Task::select(
                'tasks.id',
                'tasks.heading',
                'projects.project_name',
                'projects.id as ProjectId',
                'client.name as clientName',
                'client.id as client_id',
                'tasks.client_name as task_client_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name',
                'taskboard_columns.label_color',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.created_at as created_at',
                'task_submissions.created_at as submission_date'
            )
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->join('taskboard_columns', 'taskboard_columns.id', 'tasks.board_column_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_users', 'task_users.task_id', 'tasks.id')

                ->leftJoin('task_submissions', function ($join) {
                    $join->on('task_submissions.task_id', '=', 'tasks.id')
                        ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                        ->orderBy('task_submissions.created_at', 'desc');
                })
                ->where('task_users.user_id', $devId)
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->groupBy('tasks.id')
                ->orderBy('tasks.created_at', 'desc')->get();
            $this->past_tasks = Task::select(
                'tasks.id',
                'tasks.heading',
                'projects.project_name',
                'projects.id as ProjectId',
                'client.name as clientName',
                'client.id as client_id',
                'tasks.client_name as task_client_name',
                'tasks.board_column_id',
                'taskboard_columns.column_name',
                'taskboard_columns.label_color',
                'cl.id as cl_id',
                'cl.name as cl_name',
                'tasks.created_at as created_at',
                'task_submissions.created_at as submission_date'
            )
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->join('taskboard_columns', 'taskboard_columns.id', 'tasks.board_column_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->leftJoin('task_users', 'task_users.task_id', 'tasks.id')

                ->leftJoin('task_submissions', function ($join) {
                    $join->on('task_submissions.task_id', '=', 'tasks.id')
                        ->whereRaw('task_submissions.created_at = (SELECT MAX(created_at) FROM task_submissions WHERE task_id = tasks.id)')
                        ->orderBy('task_submissions.created_at', 'desc');
                })
                ->where('task_users.user_id', $devId)
                ->whereNotIn('tasks.board_column_id', [2, 3])
                ->whereBetween('tasks.created_at', [$startDate, $endDate])
                ->groupBy('tasks.id')
                ->orderBy('tasks.created_at', 'desc')->get();
            //  dd($this->tasks);
            $this->number_of_tasks_approved_client_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color'

                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            //------------Average number of attempts needed for approval(in cycle) Client Data------------//

            $this->average_number_of_tasks_approved_client_data = DB::table('tasks')
                ->select(
                    'tasks.id',
                    'tasks.heading',
                    'client.id as clientId',
                    'client.name as clientName',
                    'tasks.created_at as assign_date',
                    'task_submissions.created_at as submission_date',
                    'tasks.due_date',
                    'tasks.client_name as client_name',
                    'cl.id as cl_id',
                    'cl.name as cl_name',
                    'tasks.board_column_id',
                    'taskboard_columns.column_name as column_name',
                    'taskboard_columns.label_color',
                    'tasks.updated_at as task_complete_date',
                )
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_submissions', 'tasks.id', '=', 'task_submissions.task_id')
                ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                ->leftJoin('users as client', 'client.id', 'projects.client_id')
                ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                ->where('tasks.board_column_id', '=', 4)
                ->where('tasks.updated_at', '>=', $startDate)
                ->where('tasks.updated_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();
            foreach ($this->average_number_of_tasks_approved_client_data as $revision) {
                $revision->revision_count = TaskHistory::where('task_id', $revision->id)->where('board_column_id', 1)->whereDate('created_at', '<=', $revision->task_complete_date)->count();
            }

            //---------------------------------Percentage of Revision Data----------------------------------------------------//
            $revision_task_id_store = [];
            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->leftJoin('task_revisions', 'task_revisions.task_id', 'tasks.id')
                ->select('tasks.id')
                ->where('task_revisions.created_at', '>=', $startDate)
                ->where('task_revisions.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->groupBy('tasks.id')
                ->get();

            $assign_task_count_for_revision = 0;
            $number_of_total_revision_for_this_month = 0;
            foreach ($total_task_assigned as $task) {

                $current_task_id = $task->id;
                $disput_responsible_for_revision = DB::table('task_revision_disputes')
                    ->where('task_id', $current_task_id)
                    ->where(function ($query) use ($current_task_id, $devId) {
                        $query->where('raised_by', $devId)
                            ->orWhere('raised_against', $devId);

                    })
                    ->where(function ($query) {
                        $query->where('raised_by_percent', '>', 0)
                            ->orWhere('raised_against_percent', '>', 0);
                    })

                    ->count();

                if ($disput_responsible_for_revision > 0) {
                    $revision_task_id_store[] = $task->id;

                    $disput_responsible_for_revision = 1;
                } // one task for count one revision
                $responsible_for_revision = DB::table('task_revisions')
                    ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'D')
                    ->count();

                if ($responsible_for_revision > 0) {

                    $revision_task_id_store[] = $task->id;
                    $responsible_for_revision = 1;
                }  // one task for count one revision

                $total_revision_dispute_without_dispute = $disput_responsible_for_revision + $responsible_for_revision;

                $number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month + $total_revision_dispute_without_dispute;

                //count of assign tasks
                $assign_task_count_for_revision++;
            }

            $percentage_of_tasks_with_revision = 0;
            if ($assign_task_count_for_revision > 0) {
                $percentage_of_tasks_with_revision = ($number_of_total_revision_for_this_month / $assign_task_count_for_revision) * 100;
            }
            $this->percentage_of_tasks_with_revision = $percentage_of_tasks_with_revision;
            $this->assign_task_count_for_revision = $assign_task_count_for_revision;
            $this->number_of_total_revision_for_this_month = $number_of_total_revision_for_this_month;


            $revision_task_data = [];

            foreach ($revision_task_id_store as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $revision_task_data[] = $task_data;
            }


            $this->revision_task_data = $revision_task_data;

            //---------------------------Percentage of tasks with revision sayeed code --------------------------//
            //   $total_tasks_with_revisions = DB::table('tasks')
            //   ->Join('task_history','task_history.task_id','tasks.id')



            //-----------Percentage of tasks where deadline was missed table-----------------//
            $deadline_missed_task_id = [];
            $currentDate = Carbon::now()->format('Y-m-d');
            $number_of_tasks_received_for_deadline_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_of_tasks_cross_deadline = 0;
            $percentage_of_tasks_deadline = 0;
            foreach ($number_of_tasks_received_for_deadline_data as $task) {
                $dueDate = Carbon::parse($task->due_date)->format('Y-m-d');

                $updatedAt = Carbon::parse($task->updated_at)->format('Y-m-d');

                if ($dueDate < $updatedAt && $task->board_column_id == 4) {

                    $number_of_tasks_cross_deadline++;
                    $deadline_missed_task_id[] = $task->id;
                } else if ($dueDate < $currentDate && $task->board_column_id != 4) {

                    $number_of_tasks_cross_deadline++;
                    $deadline_missed_task_id[] = $task->id;
                }
            }

            $deadline_missed_task_data = [];

            foreach ($deadline_missed_task_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftJoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();


                $deadline_missed_task_data[] = $task_data;
            }


            $this->deadline_missed_task_data = $deadline_missed_task_data;



            //Percentage of tasks where given estimated time was missed table
            $estimate_time_missed_id_store = [];
            $number_of_tasks_received_for_missed_estimate_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.*')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $number_task_cross_estimate_time = 0;
            $percentage_number_task_cross_estimate_time = 0;
            foreach ($number_of_tasks_received_for_missed_estimate_data as $task) {

                $log_time_per_task = DB::table('project_time_logs')
                    ->where('task_id', $task->id)
                    ->where('revision_status', '=', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $estimate_minutes_task = $task->estimate_hours * 60 + $task->estimate_minutes;
                if ($log_time_per_task > $estimate_minutes_task) {
                    $number_task_cross_estimate_time++;
                    $estimate_time_missed_id_store[] = $task->id;
                }
            }
            if ($number_of_tasks_received_for_deadline > 0) {
                $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
                $estimate_time_missed_id_store[] = $task->id;
            }

            $estimate_missed_task_data = [];

            foreach ($estimate_time_missed_id_store as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $estimate_missed_task_data[] = $task_data;
            }



            $this->estimate_missed_task_data = $estimate_missed_task_data;
            // dd(  $this->estimate_missed_task_data,$estimate_missed_task_data);


            //----------Number of disputes filed  own table--------//

            $number_of_dispute_filed_own_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();



            $number_of_dispute_filed_own_data = [];

            foreach ($number_of_dispute_filed_own_id as $task) {
                //$task= Task::where('id',$task)->select('id')

                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();
                //    dd($task_data);

                $number_of_dispute_filed_own_data[] = $task_data;
            }
            //   dd($number_of_dispute_filed_own_data);

            $this->number_of_dispute_filed_own_data = $number_of_dispute_filed_own_data;


            //---------dispute filed all data---------//


            $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();
            //  dd($number_of_dispute_filed_all_id );

            $number_of_dispute_filed_all_data = [];

            foreach ($number_of_dispute_filed_all_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $number_of_dispute_filed_all_data[] = $task_data;
            }


            $this->number_of_dispute_filed_all_data = $number_of_dispute_filed_all_data;

            //----------------Hours spent in revisions data--------------------//

            $spent_revision_developer_data_id = DB::table('project_time_logs')
                ->select('task_id')
                ->where('user_id', $devId)
                ->where('revision_status', 1)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $spent_revision_developer_data = [];

            foreach ($spent_revision_developer_data_id as $task) {
                //$task= Task::where('id',$task)->select('id')
                $task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->leftjoin('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->task_id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $spent_revision_developer_data[] = $task_data;
            }

            $this->spent_revision_developer_data = $spent_revision_developer_data;
            // Average number of in-progress tasks table

            $this->total_in_progress_date_range_table = DB::table('progress_tasks')
                ->select('count_progress_task', 'created_at')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();
            // --------------Average number of attempts needed for approval(in cycle) Client table-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->select('tasks.id')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('tasks.board_column_id', '=', 4)
                ->where(
                    'tasks.updated_at',
                    '>=',
                    $startDate
                )
                ->where(
                    'tasks.updated_at',
                    '<',
                    $endDate
                )
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->distinct('tasks.id')
                ->get();

            $average_attempts_approve_client_data_lead = [];

            foreach ($number_of_tasks_approved as $task) {
                //$task= Task::where('id',$task)->select('id')
                $approve_task_data = DB::table('tasks')
                    ->select(
                        'tasks.id',
                        'tasks.heading',
                        'client.id as clientId',
                        'client.name as clientName',
                        'tasks.created_at as assign_date',
                        'task_submissions.created_at as submission_date',
                        'tasks.due_date',
                        'tasks.client_name as client_name',
                        'cl.id as cl_id',
                        'cl.name as cl_name',
                        'tasks.board_column_id',
                        'taskboard_columns.column_name as column_name',
                        'taskboard_columns.label_color'
                    )
                    ->join(
                        'task_submissions',
                        'task_submissions.task_id',
                        '=',
                        'tasks.id'
                    )
                    ->join(
                        'task_users',
                        'tasks.id',
                        '=',
                        'task_users.task_id'
                    )
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where(
                        'tasks.id',
                        $task->id
                    )
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_attempts_approve_client_data_lead[] = $approve_task_data;
            }

            $this->average_attempts_approve_client_data_lead = $average_attempts_approve_client_data_lead;


            return view('dashboard.employee.developer', $this->data);
        }
    }
}