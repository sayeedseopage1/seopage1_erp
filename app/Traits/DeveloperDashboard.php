<?php

namespace App\Traits;

use \Carbon\Carbon;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\TaskType;
use Carbon\CarbonPeriod;
use App\Models\TaskHistory;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

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
            $devId = request('user_id');
            $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            $endDate1 = request('endDate');
            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);

            $tasksUserInDate = Task::whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId);

            $this->username = DB::table('users')->where('id', $devId)->value('name');
            $this->developer_task_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at', )
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();

            [
                $this->number_of_tasks_received_data,
                $this->number_of_tasks_received,
                $this->number_of_tasks_received_primary_page_data,
                $this->number_of_tasks_received_primary_page,
                $this->number_of_tasks_received_secondary_page_data,
                $this->number_of_tasks_received_secondary_page,
                $this->number_of_task_others_page_in_this_month_data,
                $this->number_of_task_others_page_in_this_month,
            ] = $this->numberOfTasksReceived($tasksUserInDate);

            [
                $this->submit_number_of_tasks_in_this_month_data,
                $this->submit_number_of_tasks_in_this_month,
                $this->submit_number_of_tasks_primary_page_in_this_month_data,
                $this->submit_number_of_tasks_primary_page_in_this_month,
                $this->submit_number_of_tasks_secondary_page_in_this_month_data,
                $this->submit_number_of_tasks_secondary_page_in_this_month,
                $this->submit_number_of_tasks_others_page_in_this_month_data,
                $this->submit_number_of_tasks_others_page_in_this_month,
            ] = $this->numberOfSubmittedTasks($startDate, $endDate, $devId);

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

            $this->first_attempt_approve_task_in_this_month_client_data = $first_attempt_approve_task_data_client;
            $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page_client;
            $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page_client;




            //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//


            [
                $this->first_attempt_approve_task_in_this_month,
                $this->first_attempt_approve_task_in_this_month_count,
                $this->first_attempt_approve_task_primary_page_in_this_month_data,
                $this->first_attempt_approve_task_primary_page_in_this_month,
                $this->first_attempt_approve_task_secondary_page_in_this_month_data,
                $this->first_attempt_approve_task_secondary_page_in_this_month,
                $this->first_attempt_approve_task_others_page_in_this_month_data,
                $this->first_attempt_approve_task_others_page_in_this_month,
            ] = $this->numberOfApprovedTaskson1stAttemptByLeadDeveloper($startDate, $endDate, $devId);

            [
                $this->average_submission_aproval_in_this_month,
                $this->avg_no_of_submission_needed_for_app_by_lead_dev
            ] = $this->AvgNumberOfAttemptsNeededForApprovalByLeadDeveloper($startDate, $endDate, $devId);


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


            [
                $this->average_submission_time_in_this_month,
                $this->average_submission_time_in_this_month_total_time,
                $this->average_submission_time_in_this_month_data,
                $this->avg_logged_time_complete_task_without_revision,
                $this->avg_logged_time_complete_task_without_revision_total_time,
                $this->avg_logged_time_complete_task_without_revision_data,
            ] = $this->avgLoggedTimeForCompleteTasks($startDate, $endDate, $devId);


            [
                $this->average_submission_day_in_this_month_data,
                $this->average_submission_day_in_this_month,
                $this->average_submission_day_in_this_month_max,
                $this->average_submission_day_in_this_month_min,
                $this->all_time_task_id,
            ] = $this->averageTaskSubmissionTime($startDate, $endDate, $devId);




            [
                $this->number_of_tasks_where_deadline_missed_submitted_tasks,
                $this->percentage_of_tasks_deadline,
                $this->deadline_missed_task_data
            ] = $this->percentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId);


            [
                $this->number_of_dispute_filed_own,
                $this->number_of_dispute_filed_own_data
            ] = $this->numberOfDisputesFiled($startDate, $endDate, $devId);

            $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();


            [
                $this->number_of_dispute_lost_own,
                $this->number_of_dispute_lost_all,
                $this->number_of_dispute_lost_data
            ] = $this->numberOfDisputesLost($startDate, $endDate, $devId);


            [
                $this->hours_spent_task_withrev_developer,
                $this->hours_spent_task_developer,
                $this->hours_spent_revision_developer,
                $this->hours_spent_revision_developer_data,
                $this->hours_spent_revision_developer_count,
            ] = $this->hoursSpentInRevisions($startDate, $endDate, $devId);


            [
                $this->average_in_progress_date_range_date,
                $this->average_in_progress_date_range,
            ] = $this->averageNumberOfInProgressTasks($devId);


            // Average number of in-progress tasks
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


            [
                $this->number_of_total_revision_for_this_month,
                $this->revision_task_data
            ] = $this->totalNumberOfRevisions($startDate, $endDate, $devId);

            [
                $this->percentage_of_tasks_with_revision,
                $this->percentage_of_tasks_with_revision_data
            ] = $this->percentageOfTasksWithRevisions($startDate, $endDate, $devId);

            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_missed,
            ] = $this->PercentageOfTasksWhereGivenEstimatedTimeWasMissedwithoutRevision($startDate, $endDate, $devId);
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_missed,
            ] = $this->PercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId);


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

            $this->total_in_progress_date_range_table = DB::table('progress_tasks')
                ->select('count_progress_task', 'created_at')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $html = view('dashboard.ajax.developerdashboard.month', $this->data)->render();
            // return view('dashboard.ajax.developerdashboard.month', $this->data);

            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
            ]);

        } else {
            $devId = Auth::id();
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth()->addDays(1);

            // $startDate = Carbon::parse('2024-03-01')->startOfMonth();
            // $endDate = Carbon::parse('2024-03-31')->endOfMonth()->addDays(1);


            $tasksUserInDate = Task::whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId);



            $this->username = DB::table('users')->where('id', $devId)->value('name');
            $this->developer_task_data = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_types', 'tasks.id', '=', 'task_types.task_id')
                ->select('tasks.id', 'tasks.heading', 'task_types.task_type', 'task_types.page_type', 'task_types.page_name', 'task_types.task_type_other', 'tasks.created_at', )
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->count();



            [
                $this->number_of_tasks_received_data,
                $this->number_of_tasks_received,
                $this->number_of_tasks_received_primary_page_data,
                $this->number_of_tasks_received_primary_page,
                $this->number_of_tasks_received_secondary_page_data,
                $this->number_of_tasks_received_secondary_page,
                $this->number_of_task_others_page_in_this_month_data,
                $this->number_of_task_others_page_in_this_month,
            ] = $this->numberOfTasksReceived($tasksUserInDate);

            [
                $this->submit_number_of_tasks_in_this_month_data,
                $this->submit_number_of_tasks_in_this_month,
                $this->submit_number_of_tasks_primary_page_in_this_month_data,
                $this->submit_number_of_tasks_primary_page_in_this_month,
                $this->submit_number_of_tasks_secondary_page_in_this_month_data,
                $this->submit_number_of_tasks_secondary_page_in_this_month,
                $this->submit_number_of_tasks_others_page_in_this_month_data,
                $this->submit_number_of_tasks_others_page_in_this_month,
            ] = $this->numberOfSubmittedTasks($startDate, $endDate, $devId);

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

            $this->first_attempt_approve_task_in_this_month_client_data = $first_attempt_approve_task_data_client;
            $this->first_attempt_approve_task_primary_page_in_this_month_client = $first_attempt_approve_task_primary_page_client;
            $this->first_attempt_approve_task_secondary_page_in_this_month_client = $first_attempt_approve_task_secondary_page_client;



            //-----------------------------number of tasks approved in first attempt(in cycle) Lead Developer-----------------------//


            [
                $this->first_attempt_approve_task_in_this_month,
                $this->first_attempt_approve_task_in_this_month_count,
                $this->first_attempt_approve_task_primary_page_in_this_month_data,
                $this->first_attempt_approve_task_primary_page_in_this_month,
                $this->first_attempt_approve_task_secondary_page_in_this_month_data,
                $this->first_attempt_approve_task_secondary_page_in_this_month,
                $this->first_attempt_approve_task_others_page_in_this_month_data,
                $this->first_attempt_approve_task_others_page_in_this_month,
            ] = $this->numberOfApprovedTaskson1stAttemptByLeadDeveloper($startDate, $endDate, $devId);

            [
                $this->approved_task_by_client_in_first_attempt_data,
                $this->approved_task_by_client_in_first_attempt,
                $this->approved_task_by_client_in_first_attempt_primary_page_data,
                $this->approved_task_by_client_in_first_attempt_primary_page,
                $this->approved_task_by_client_in_first_attempt_secondary_page_data,
                $this->approved_task_by_client_in_first_attempt_secondary_page,
                $this->approved_task_by_client_in_first_attempt_other_data,
                $this->approved_task_by_client_in_first_attempt_other,
            ] = $this->approvedTaskByClientinFirstAttempt($startDate);


            // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//

            [
                $this->average_submission_aproval_in_this_month,
                $this->avg_no_of_submission_needed_for_app_by_lead_dev
            ] = $this->AvgNumberOfAttemptsNeededForApprovalByLeadDeveloper($startDate, $endDate, $devId);

            //---------------- Avg number of attempts needed for approval by lead developer table view------------------------------//

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
                $max_submission = $number_of_tasks->submission_no;
                $count_submission_per_approval = $count_submission_per_approval + $max_submission;
                $total_approval++;
            }
            if ($total_approval > 0) {
                $this->average_submission_aproval_in_this_month_client = ($count_submission_per_approval / $total_approval) + 1;
            } else {
                $this->average_submission_aproval_in_this_month_client = 0;
            }

            [
                $this->average_submission_time_in_this_month,
                $this->average_submission_time_in_this_month_total_time,
                $this->average_submission_time_in_this_month_data,
                $this->avg_logged_time_complete_task_without_revision,
                $this->avg_logged_time_complete_task_without_revision_total_time,
                $this->avg_logged_time_complete_task_without_revision_data,
            ] = $this->avgLoggedTimeForCompleteTasks($startDate, $endDate, $devId);


            [
                $this->average_submission_day_in_this_month_data,
                $this->average_submission_day_in_this_month,
                $this->average_submission_day_in_this_month_max,
                $this->average_submission_day_in_this_month_min,
                $this->all_time_task_id,
            ] = $this->averageTaskSubmissionTime($startDate, $endDate, $devId);

            [
                $this->number_of_tasks_where_deadline_missed_submitted_tasks,
                $this->percentage_of_tasks_deadline,
                $this->deadline_missed_task_data
            ] = $this->percentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId);


            [
                $this->number_of_dispute_filed_own,
                $this->number_of_dispute_filed_own_data
            ] = $this->numberOfDisputesFiled($startDate, $endDate, $devId);

            $this->number_of_dispute_filed_all = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Number of disputes lost
            [
                $this->number_of_dispute_lost_own,
                $this->number_of_dispute_lost_all,
                $this->number_of_dispute_lost_data
            ] = $this->numberOfDisputesLost($startDate, $endDate, $devId);


            [
                $this->hours_spent_task_withrev_developer,
                $this->hours_spent_task_developer,
                $this->hours_spent_revision_developer,
                $this->hours_spent_revision_developer_data,
                $this->hours_spent_revision_developer_count,
            ] = $this->hoursSpentInRevisions($startDate, $endDate, $devId);


            [
                $this->average_in_progress_date_range_date,
                $this->average_in_progress_date_range,
            ] = $this->averageNumberOfInProgressTasks($devId);

            $this->total_in_progress_date_range_table = DB::table('progress_tasks')
                ->select('count_progress_task', 'created_at')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

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

            [
                $this->number_of_total_revision_for_this_month,
                $this->revision_task_data
            ] = $this->totalNumberOfRevisions($startDate, $endDate, $devId);

            [
                $this->percentage_of_tasks_with_revision,
                $this->percentage_of_tasks_with_revision_data
            ] = $this->percentageOfTasksWithRevisions($startDate, $endDate, $devId);


            //-------------------------- Percentage of tasks with revision sayeed code --------------------------//


            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_missed,
            ] = $this->PercentageOfTasksWhereGivenEstimatedTimeWasMissedwithoutRevision($startDate, $endDate, $devId);
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_missed,
            ] = $this->PercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId);


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

            return view('dashboard.employee.developer', $this->data);
        }
    }

    private function numberOfTasksReceived($tasksUserInDate)
    {
        $tasksUserInDate->with('taskType:id,task_id,task_type', 'stat:id,label_color,column_name', 'project:id,pm_id,client_id', 'project.pm:id,name', 'project.client:id,name')
            ->whereNotNull('subtask_id')->select('id', 'created_at', 'heading', 'board_column_id', 'project_id');

        $received_primary = clone $tasksUserInDate;
        $received_secondary = clone $tasksUserInDate;
        $received_others = clone $tasksUserInDate;

        $number_of_tasks_received_data = $tasksUserInDate->get();
        $number_of_tasks_received = $tasksUserInDate->count();

        $number_of_tasks_received_primary_data = $received_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
        $number_of_tasks_received_primary = $received_primary->count();

        $number_of_tasks_received_secondary_data = $received_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
        $number_of_tasks_received_secondary = $received_secondary->count();

        $number_of_tasks_received_others_date = $received_others->whereNotIn('id', array_merge($number_of_tasks_received_primary_data->pluck('id')->toArray(), $number_of_tasks_received_secondary_data->pluck('id')->toArray()))->get();
        $number_of_tasks_received_others = $received_others->count();

        return [
            $number_of_tasks_received_data,
            $number_of_tasks_received,
            $number_of_tasks_received_primary_data,
            $number_of_tasks_received_primary,
            $number_of_tasks_received_secondary_data,
            $number_of_tasks_received_secondary,
            $number_of_tasks_received_others_date,
            $number_of_tasks_received_others,
        ];
    }

    private function numberOfSubmittedTasks($startDate, $endDate, $devId)
    {
        $number_of_tasks = DB::table('task_history')
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->where('board_column_id', 6)
            ->where('user_id', $devId)
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<', $endDate)
            ->groupBy('task_id')
            ->get();

        $task = [];

        foreach ($number_of_tasks as $i1) {
            $min_sub = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->first();
            if ($min_sub->min_created_at >= $startDate && $min_sub->min_created_at < $endDate) {
                array_push($task, $i1->task_id);
            }
        }
        $number_of_tasks_submitted = count($task);

        $test = array();
        $number_of_tasks_submitted_primary = 0;
        $number_of_tasks_submitted_secondary = 0;
        $number_of_tasks_submitted_others = 0;
        foreach ($task as $i1) {
            $type = DB::table('task_types')
                ->where('task_id', $i1)
                ->select('page_type_name', 'page_type', 'task_type') // Attempt to select all potential columns at once
                ->first();

            // Check which column has a non-null value in the priority order
            if (!is_null($type)) {
                if (!is_null($type->page_type_name)) {
                    $taskType = $type->page_type_name;
                } elseif (!is_null($type->page_type)) {
                    $taskType = $type->page_type;
                } elseif (!is_null($type->task_type)) {
                    $taskType = $type->task_type;
                } else {
                    // Handle the case where none of the expected columns have a value
                    $taskType = null; // or some default value
                }
            } else {
                // Handle the case where no record was found
                $taskType = null; // or some default value
            }

            array_push($test, $i1);
            if ($taskType == "Primary Page Development") {
                $number_of_tasks_submitted_primary++;
            } elseif ($taskType == "Secondary Page Development") {
                $number_of_tasks_submitted_secondary++;
            } else {
                $number_of_tasks_submitted_others++;
            }
        }

        $task = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'submissions')->whereIn('id', $test);

        $task_primary = clone $task;
        $task_secondary = clone $task;
        $task_others = clone $task;

        $submit_number_of_tasks_in_this_month_data = $task->get();
        $number_of_tasks_submitted = $task->count();

        $number_of_tasks_submitted_primary_data = $task_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
        $number_of_tasks_submitted_primary = $task_primary->count();

        $number_of_tasks_submitted_secondary_data = $task_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
        $number_of_tasks_submitted_secondary = $task_secondary->count();

        $number_of_tasks_submitted_others_data = $task_others->whereNotIn('id', array_merge($number_of_tasks_submitted_primary_data->pluck('id')->toArray(), $number_of_tasks_submitted_secondary_data->pluck('id')->toArray()))->get();
        $number_of_tasks_submitted_others = $task_others->count();

        return [
            $submit_number_of_tasks_in_this_month_data,
            $number_of_tasks_submitted,
            $number_of_tasks_submitted_primary_data,
            $number_of_tasks_submitted_primary,
            $number_of_tasks_submitted_secondary_data,
            $number_of_tasks_submitted_secondary,
            $number_of_tasks_submitted_others_data,
            $number_of_tasks_submitted_others,
        ];
    }

    private function numberOfApprovedTaskson1stAttemptByLeadDeveloper($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNotNull('tasks.subtask_id') // This line changed
            ->distinct('task_history.task_id') // This line changed
            ->get();

        $completed_tasks_by_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            if ($complete > 0) {
                array_push($completed_tasks_by_developer, $i1->task_id);
            }
        }
        $number_of_approved_tasks_on_1st_attempts = 0;
        $test = [];
        foreach ($completed_tasks_by_developer as $i1) {
            $submitted = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->where('board_column_id', 6)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $approved = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->whereIn('board_column_id', [8, 4])
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $revision = DB::table('task_history')
                ->where('created_at', '>', $submitted->earliest_created_at)
                ->where('created_at', '<', $approved->earliest_created_at)
                ->where('board_column_id', 1)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->count();

            if ($revision == 0) {
                array_push($test, $i1);
            }
        }


        $number_of_tasks_approved_1st_time_primary = 0;
        $number_of_tasks_approved_1st_time_secondary = 0;
        $number_of_tasks_approved_1st_time_others = 0;

        $final_test = array();

        foreach (array_unique($test) as $i1) {
            $type = DB::table('task_types')
                ->where('task_id', $i1)
                ->select('page_type_name', 'page_type', 'task_type')
                ->first();

            // Check which column has a non-null value in the priority order
            if (!is_null($type)) {
                if (!is_null($type->page_type_name)) {
                    $taskType = $type->page_type_name;
                } elseif (!is_null($type->page_type)) {
                    $taskType = $type->page_type;
                } elseif (!is_null($type->task_type)) {
                    $taskType = $type->task_type;
                } else {
                    // Handle the case where none of the expected columns have a value
                    $taskType = null; // or some default value
                }
            } else {
                // Handle the case where no record was found
                $taskType = null; // or some default value
            }

            array_push($final_test, $i1);
            if ($taskType == "Primary Page Development") {
                $number_of_tasks_approved_1st_time_primary++;
            } elseif ($taskType == "Secondary Page Development") {
                $number_of_tasks_approved_1st_time_secondary++;
            } else {
                $number_of_tasks_approved_1st_time_others++;
            }
        }

        $task = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'latestTaskSubmission', 'latestTaskApprove', 'taskUser')->whereIn('id', $test);

        $approved_1st_time_in_this_month = clone $task;
        $approved_1st_time_primary = clone $task;
        $approved_1st_time_secondary = clone $task;
        $approved_1st_time_others = clone $task;

        $number_of_tasks_approved_1st_time_in_this_month_data = $approved_1st_time_in_this_month->get();
        $number_of_tasks_approved_1st_time_in_this_month = $approved_1st_time_in_this_month->count();
        $number_of_tasks_approved_1st_time_primary_data = $approved_1st_time_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
        $number_of_tasks_approved_1st_time_primary = $approved_1st_time_primary->count();
        $number_of_tasks_approved_1st_time_secondary_data = $approved_1st_time_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
        $number_of_tasks_approved_1st_time_secondary = $approved_1st_time_secondary->count();
        $number_of_tasks_approved_1st_time_others_data = $approved_1st_time_others->whereNotIn('id', array_merge($approved_1st_time_secondary->pluck('id')->toArray(), $approved_1st_time_primary->pluck('id')->toArray()))->get();
        $number_of_tasks_approved_1st_time_others = $approved_1st_time_others->count();


        return [
            $number_of_tasks_approved_1st_time_in_this_month_data,
            $number_of_tasks_approved_1st_time_in_this_month,
            $number_of_tasks_approved_1st_time_primary_data,
            $number_of_tasks_approved_1st_time_primary,
            $number_of_tasks_approved_1st_time_secondary_data,
            $number_of_tasks_approved_1st_time_secondary,
            $number_of_tasks_approved_1st_time_others_data,
            $number_of_tasks_approved_1st_time_others,
        ];
    }

    private function approvedTaskByClientinFirstAttempt($tasksUserInDate)
    {

        $devId = Auth::id();
        $startDate = Carbon::parse('2024-01-01')->startOfMonth();
        $endDate = Carbon::parse('2024-06-31')->endOfMonth()->addDays(1);


        $tasksUserInDate = Task::whereBetween('created_at', [$startDate, $endDate])
            ->whereRelation('taskUsers', 'user_id', $devId);
        // Subtask link, Task type, client, project manager, lead developer, created on, Submitted on, Approved on (By client)
        $tasksUserInDate = $tasksUserInDate->with(
            'taskType:id,task_id,task_type,page_type',
            'project:id,pm_id,client_id',
            'project.pm:id,name',
            'project.client:id,name',
            'revisions'
        )
            ->where('board_column_id', 4)
            ->whereDoesntHave('revisions', function (Builder $query) {
                $query->where('dispute_between', 'like', 'LDR')
                    ->orWhere('is_accept', '!=', '1')
                    ->orWhereNotIn('final_responsible_person', ['D', null])
                    ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
            })
            ->select('id', 'created_at', 'heading', 'board_column_id', 'project_id');

        $approved_primary = clone $tasksUserInDate;
        $approved_secondary = clone $tasksUserInDate;
        $approved_others = clone $tasksUserInDate;
        

        $number_of_tasks_approved_data = $tasksUserInDate->whereRelation('revisions', 'id', '=', 1770)->get();
        $number_of_tasks_approved = $tasksUserInDate->count();

        $number_of_tasks_approved_primary_data = $approved_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
        $number_of_tasks_approved_primary = $approved_primary->count();

        $number_of_tasks_approved_secondary_data = $approved_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
        $number_of_tasks_approved_secondary = $approved_secondary->count();

        $number_of_tasks_approved_others_date = $approved_others->whereNotIn('id', array_merge($number_of_tasks_approved_primary_data->pluck('id')->toArray(), $number_of_tasks_approved_secondary_data->pluck('id')->toArray()))->get();
        $number_of_tasks_approved_others = $approved_others->count();

        dd(
            $number_of_tasks_approved_data,
            $number_of_tasks_approved,
            $number_of_tasks_approved_primary_data,
            $number_of_tasks_approved_primary,
            $number_of_tasks_approved_secondary_data,
            $number_of_tasks_approved_secondary,
            $number_of_tasks_approved_others_date,
            $number_of_tasks_approved_others,
        );

        return [
            $number_of_tasks_approved_data,
            $number_of_tasks_approved,
            $number_of_tasks_approved_primary_data,
            $number_of_tasks_approved_primary,
            $number_of_tasks_approved_secondary_data,
            $number_of_tasks_approved_secondary,
            $number_of_tasks_approved_others_date,
            $number_of_tasks_approved_others,
        ];
    }

    private function AvgNumberOfAttemptsNeededForApprovalByLeadDeveloper($startDate, $endDate, $devId)
    {
        $number_of_attempts_needed = 0;
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNotNull('tasks.subtask_id') // This line changed
            ->distinct('task_history.task_id') // This line changed
            ->get();



        $completed_tasks_by_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            if ($complete > 0) {
                array_push($completed_tasks_by_developer, $i1->task_id);
            }
        }
        foreach ($completed_tasks_by_developer as $i1) {
            $submitted = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->where('board_column_id', 6)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $approved = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->whereIn('board_column_id', [8, 4])
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $submit_number = DB::table('task_history')
                ->where('created_at', '>=', $submitted->earliest_created_at)
                ->where('created_at', '<', $approved->earliest_created_at)
                ->where('board_column_id', 6)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->count();

            $number_of_attempts_needed += $submit_number;
        }
        $average_number_of_attempts_needed = 0;
        if (count($completed_tasks_by_developer) > 0) {
            $average_number_of_attempts_needed = ($number_of_attempts_needed / count($completed_tasks_by_developer));
        }

        $avg_no_of_submission_needed_for_app_by_lead_dev = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'revisions', 'firstTaskSubmission')->whereIn('id', $completed_tasks_by_developer)->get();

        return [
            $average_number_of_attempts_needed,
            $avg_no_of_submission_needed_for_app_by_lead_dev,
        ];
    }

    private function percentageOfTasksWithRevisions($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNotNull('tasks.subtask_id') // This line changed
            ->distinct('task_history.task_id') // This line changed
            ->get();

        $completed_tasks_by_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            if ($complete > 0) {
                array_push($completed_tasks_by_developer, $i1->task_id);
            }
        }

        $task_with_revision = 0;
        $test = [];
        $task_id = [];
        foreach ($completed_tasks_by_developer as $i1) {
            $submitted = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->where('board_column_id', 6)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $approved = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->whereIN('board_column_id', [8, 4])
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();
            $revision = DB::table('task_history')
                ->where('created_at', '>', $submitted->earliest_created_at)
                ->where('created_at', '<', $approved->earliest_created_at)
                ->where('board_column_id', 1)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->count();

            if ($revision > 0) {
                $task_with_revision++;
                array_push($task_id, $i1);
            }
            array_push($test, $revision);
        }
        $percentage_of_tasks_with_revision = 0;
        if (count($completed_tasks_by_developer) > 0) {
            $percentage_of_tasks_with_revision = ($task_with_revision / count($completed_tasks_by_developer)) * 100;
        }

        $percentage_of_tasks_with_revision_data = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'revisions', 'firstTaskSubmission')->whereIn('id', $task_id)->get();

        return [$percentage_of_tasks_with_revision, $percentage_of_tasks_with_revision_data];
    }

    private function totalNumberOfRevisions($startDate, $endDate, $devId)
    {

        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNotNull('tasks.subtask_id')
            ->distinct('task_history.task_id')
            ->get();


        $completed_tasks_by_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            if ($complete > 0) {
                array_push($completed_tasks_by_developer, $i1->task_id);
            }
        }

        $total_revision = 0;
        $test = array();
        foreach ($completed_tasks_by_developer as $i1) {
            $submitted = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->where('board_column_id', 6)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $approved = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as earliest_created_at'))
                ->whereIn('board_column_id', [8, 4])
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->first();

            $revision = DB::table('task_history')
                ->where('created_at', '>', $submitted->earliest_created_at)
                ->where('created_at', '<', $approved->earliest_created_at)
                ->where('board_column_id', 1)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->count();

            $total_revision += $revision;
            if ($revision > 0) {
                array_push($test, $i1);
            }
        }

        $revision_task_data = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'revisions.user', 'revisions.taskRevisionDispute.taskDisputeQuestions', 'revisions.taskRevisionDispute.disputeWinner', 'revisions.taskRevisionDispute.raisedBy')->whereIn('id', $test)->get();
        return [
            $total_revision,
            $revision_task_data
        ];
    }

    private function averageTaskSubmissionTime($startDate, $endDate, $devId)
    {

        $number_of_tasks = DB::table('task_history')
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->where('board_column_id', 6)
            ->where('user_id', $devId)
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<', $endDate)
            ->groupBy('task_id')
            ->get();

        $tasks = [];

        foreach ($number_of_tasks as $i1) {
            $min_sub = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->first();
            if ($min_sub->min_created_at >= $startDate && $min_sub->min_created_at < $endDate) {
                array_push($tasks, $i1->task_id);
            }
        }
        $test = array();
        $time = 0;
        $all_time_task_id = [];
        foreach ($tasks as $task) {

            $task_id = $task;


            $assign_date = DB::table('tasks')
                ->where('id', $task_id)
                ->value('created_at');

            if ($assign_date !== null) {
                $submission_record = DB::table('task_history')
                    ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
                    ->where('board_column_id', 6)
                    ->where('task_id', $task_id)
                    ->first();

                // Ensure that $submission_record and its min_created_at property are not null
                if ($submission_record !== null && isset($submission_record->min_created_at)) {
                    // Parse the dates with Carbon
                    $assign_date_new = Carbon::parse($assign_date);
                    $submission_date_new = Carbon::parse($submission_record->min_created_at);

                    // Calculate the difference in minutes, then convert to days
                    $diffInMinutes = $submission_date_new->diffInMinutes($assign_date_new);
                    $diffInDays = $diffInMinutes / 1440;
                    $all_time_task_id[$task_id] = $diffInDays;
                    $time += $diffInDays;
                } else {
                    // array_push($test, null);
                }
            } else {
                // array_push($test, null);
            }
            array_push($test, $task_id);
        }

        $average_task_submission_time = 0;
        if (count($tasks) > 0) {
            $average_task_submission_time = $time / count($tasks);
        }
        $average_task_submission_time_data = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'revisions', 'firstTaskSubmission')->whereIn('id', $test)->get();
        return [
            $average_task_submission_time_data,
            $average_task_submission_time,
            $all_time_task_id ? max($all_time_task_id) : 0,
            $all_time_task_id ? min($all_time_task_id) : 0,
            $all_time_task_id,
        ];
    }

    private function averageNumberOfInProgressTasks($devId)
    {
        $countToday = DB::table('tasks')
            ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->select('tasks.id')
            ->whereIn('tasks.board_column_id', [3, 2])
            ->where('task_users.user_id', $devId)
            ->get();

        $in_progress_tasks = [];

        foreach ($countToday as $task) {
            array_push($in_progress_tasks, $task->id); // Access id property from each task
        }
        $number_of_in_progress_tasks = count($in_progress_tasks);

        $number_of_in_progress_tasks_data = Task::whereIn('id', $in_progress_tasks)->get()->groupBy('created_at');
        return [
            $number_of_in_progress_tasks_data,
            $number_of_in_progress_tasks
        ];

    }

    public function percentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId)
    {
        $due_date = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id', 'tasks.due_date')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();
        $number_of_tasks_where_deadline_missed = 0;
        $test = [];

        foreach ($due_date as $task) {
            $first_submission = DB::table('task_history')
                ->select('created_at')
                ->where('board_column_id', '=', 6)
                ->where('task_id', '=', $task->id)
                ->first();

            $submit_date = date('Y-m-d', strtotime($first_submission?->created_at));
            $due = date('Y-m-d', strtotime($task->due_date));

            if ($submit_date > $due) {
                $number_of_tasks_where_deadline_missed++;
                array_push($test, $task->id);
            }
        }

        $percentage_of_tasks_where_deadline_missed = 0;
        if (count($due_date) > 0) {
            $percentage_of_tasks_where_deadline_missed = ($number_of_tasks_where_deadline_missed / count($due_date)) * 100;
        }
        $number_of_tasks_where_deadline_missed_submitted_tasks = count($due_date);

        $number_of_tasks_where_deadline_missed_data = Task::with('taskType', 'stat', 'project.pm', 'project.client', 'revisions', 'firstTaskSubmission')->whereIn('id', $test)->get();

        return [$number_of_tasks_where_deadline_missed_submitted_tasks, $number_of_tasks_where_deadline_missed, $number_of_tasks_where_deadline_missed_data];
    }

    private function PercentageOfTasksWhereGivenEstimatedTimeWasMissedwithoutRevision($startDate, $endDate, $devId)
    {
        $number_of_tasks = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id', 'tasks.estimate_hours', 'tasks.estimate_minutes')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();

        $number_task_cross_estimate_time = 0;
        $test = [];

        foreach ($number_of_tasks as $task) {

            $taken_time = DB::table('project_time_logs')
                ->where('task_id', $task->id)
                ->where('revision_status', '=', 0)
                ->groupBy('task_id')
                ->sum('total_minutes');

            $estimated_time = $task->estimate_hours * 60 + $task->estimate_minutes;
            if ($taken_time > $estimated_time) {
                $number_task_cross_estimate_time++;
                array_push($test, $task->id);
            }

        }
        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = 0;
        if (count($number_of_tasks) > 0) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = ($number_task_cross_estimate_time / count($number_of_tasks)) * 100;
        }

        $number_of_tasks_data = Task::with('taskType', 'timeLogged', 'project.pm', 'project.client')->whereIn('id', $test)->get();
        return [
            round($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, 2),
            $number_of_tasks_data,
            count($number_of_tasks),
            $number_task_cross_estimate_time,
        ];
    }

    private function PercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId)
    {
        $total_number_of_tasks = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->select('tasks.id', 'tasks.estimate_hours', 'tasks.estimate_minutes')
            ->where('tasks.created_at', '>=', $startDate)
            ->where('tasks.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->get();

        $number_task_cross_estimate_time = 0;
        $test = [];

        foreach ($total_number_of_tasks as $task) {
            $taken_time = DB::table('project_time_logs')
                ->where('task_id', $task->id)
                ->groupBy('task_id')
                ->sum('total_minutes');

            $estimated_time = $task->estimate_hours * 60 + $task->estimate_minutes;
            if ($taken_time > $estimated_time) {
                $number_task_cross_estimate_time++;
                array_push($test, $task->id);
            }

        }
        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = 0;
        if (count($total_number_of_tasks) > 0) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = ($number_task_cross_estimate_time / count($total_number_of_tasks)) * 100;
        }

        $number_of_tasks_data = Task::with('taskType', 'timeLogged', 'project.pm', 'project.client')->whereIn('id', $test)->get();

        return [
            round($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision, 2),
            $number_of_tasks_data,
            count($total_number_of_tasks),
            $number_task_cross_estimate_time,
        ];
    }

    private function numberOfDisputesFiled($startDate, $endDate, $devId)
    {
        $test = [];
        $task = [];

        $disputes_filed = DB::table('task_revision_disputes')
            ->select('task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_by', $devId)
            ->get();

        $number_of_disputes_filed = count($disputes_filed);

        foreach ($disputes_filed as $i1) {

            array_push($task, $i1->task_id);

            if ($i1->winner != NULL) {
                array_push($test, $i1->winner);
            } else {
                if ($i1->raised_by_percent != NULL && $i1->raised_against_percent != NULL) {
                    if ($i1->raised_by_percent > $i1->raised_against_percent) {
                        array_push($test, $i1->raised_against);
                    } else {
                        array_push($test, $i1->raised_by);
                    }
                } else {
                    array_push($test, NULL);
                }
            }
        }

        $task_data = Task::with('project.pm', 'project.client', 'taskRevisionDispute.disputeWinner', 'taskRevisionDispute.raisedBy')->whereIn('id', $task)->get();
        return [
            $number_of_disputes_filed,
            $task_data
        ];
    }

    private function numberOfDisputesLost($startDate, $endDate, $devId)
    {
        $test = [];
        $task = [];

        $disputes_filed = DB::table('task_revision_disputes')
            ->select('task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_by', $devId)
            ->get();

        $number_of_disputes_filed = count($disputes_filed);

        $number_of_disputes_lost = 0;
        foreach ($disputes_filed as $i1) {
            if ($i1->winner != NULL) {
                array_push($test, $i1->winner);
                if ($i1->winner != $devId) {
                    array_push($task, $i1->task_id);
                    $number_of_disputes_lost++;
                }
            } else {
                if ($i1->raised_by_percent != NULL && $i1->raised_against_percent != NULL) {
                    if ($i1->raised_by_percent > $i1->raised_against_percent) {
                        array_push($test, $i1->raised_against);
                        if ($i1->raised_against != $devId) {
                            $number_of_disputes_lost++;
                        }
                    } else {
                        array_push($test, $i1->raised_by);
                        if ($i1->raised_by != $devId) {
                            $number_of_disputes_lost++;
                        }
                    }
                } else {
                    array_push($test, NULL);
                }
            }
        }


        $task_data = Task::with('project.pm', 'project.client', 'taskRevisionDispute.disputeWinner', 'taskRevisionDispute.raisedBy')->whereIn('id', $task)->get();

        return [
            $number_of_disputes_lost,
            $number_of_disputes_filed,
            $task_data
        ];
    }

    private function hoursSpentInRevisions($startDate, $endDate, $devId)
    {
        $taskwise_revision_time = DB::table('project_time_logs')
            ->where('user_id', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('revision_status', '!=', 0)
            ->select('task_id', 'revision_status', DB::raw('SUM(total_minutes) as total_minutes'))
            ->groupBy('task_id')
            ->get();
        $taskwise_revision_time_task = DB::table('project_time_logs')
            ->where('user_id', $devId)
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('revision_status', '=', 0)
            ->select('task_id', 'revision_status', DB::raw('SUM(total_minutes) as total_minutes'))
            ->groupBy('task_id')
            ->get();

        $time = [];
        $time_task = [];
        $total_revision_time = 0;
        $total_revision_time_task = 0;
        $task = [];
        foreach ($taskwise_revision_time as $i1) {
            $totalTimeSeconds = $i1->total_minutes * 60;
            $days = floor($totalTimeSeconds / (24 * 3600));
            $hours = floor(($totalTimeSeconds % (24 * 3600)) / 3600);
            $minutes = floor(($totalTimeSeconds % 3600) / 60);
            $seconds = $totalTimeSeconds % 60;

            $totalDuration = sprintf('%d days, %02d hours, %02d minutes, %02d seconds', $days, $hours, $minutes, $seconds);
            array_push($time, $totalDuration);
            $total_revision_time += $i1->total_minutes;
            array_push($task, $i1->task_id);
        }
        foreach ($taskwise_revision_time_task as $i1) {
            $totalTimeSecondsTask = $i1->total_minutes * 60;
            $daysTask = floor($totalTimeSecondsTask / (24 * 3600));
            $hoursTask = floor(($totalTimeSecondsTask % (24 * 3600)) / 3600);
            $minutesTask = floor(($totalTimeSecondsTask % 3600) / 60);
            $secondsTask = $totalTimeSecondsTask % 60;

            $totalDurationTask = sprintf('%d days, %02d hours, %02d minutes, %02d seconds', $daysTask, $hoursTask, $minutesTask, $secondsTask);
            array_push($time_task, $totalDurationTask);
            $total_revision_time_task += $i1->total_minutes;
            // array_push($task_revison, $i1->task_id);
        }
        $totalTimeSeconds = $total_revision_time * 60;
        $totalHours = floor($totalTimeSeconds / 3600);
        $total_revision_time = sprintf('%d hours', $totalHours);

        $totalTimeSecondsTask = $total_revision_time_task * 60;
        $totalHoursTask = floor($totalTimeSecondsTask / 3600);
        $total_revision_time_task = sprintf('%d hours', $totalHoursTask);
        $total_revision_time_task_with_rev = sprintf('%d hours', $totalHours + $totalHoursTask);
        $task_data = Task::with('project.pm', 'project.client', 'revisions.timeLogs', 'firstTaskSubmission.timeLogs')->find($task);

        return [
            $total_revision_time_task_with_rev,
            $total_revision_time_task,
            $total_revision_time,
            $task_data,
            count($task_data),
        ];
    }

    public function avgLoggedTimeForCompleteTasks($startDate, $endDate, $devId)
    {
        $number_of_tasks = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->join('task_history', 'tasks.id', '=', 'task_history.task_id')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_users.user_id', $devId)
            ->where('tasks.subtask_id', '!=', NULL)
            ->where('task_history.board_column_id', '=', 4)
            ->select('tasks.id', 'task_users.user_id')
            ->get();


        $test = array();
        $time_array = [];
        foreach ($number_of_tasks as $i1) {
            $time_logged = DB::table('project_time_logs')
                ->where('task_id', '=', $i1->id)
                // ->where('revision_status', '=', 0)
                ->sum('total_minutes');
            array_push($time_array, $time_logged);
            array_push($test, $i1->id);
        }

        $average_logged_time_for_complete_tasks_with_revision = 0;
        foreach ($time_array as $i1) {
            $average_logged_time_for_complete_tasks_with_revision += $i1;
        }
        $average_logged_time_for_complete_tasks_with_revision_total_time = $average_logged_time_for_complete_tasks_with_revision;
        if (count($number_of_tasks) > 0) {
            $average_logged_time_for_complete_tasks_with_revision = $average_logged_time_for_complete_tasks_with_revision / count($number_of_tasks);
        }

        $test1 = array();
        $time_array1 = [];
        foreach ($number_of_tasks as $i1) {
            $time_logged = DB::table('project_time_logs')
                ->where('task_id', '=', $i1->id)
                ->where('revision_status', '=', 0)
                ->sum('total_minutes');
            array_push($time_array1, $time_logged);
            array_push($test1, $i1->id);
        }

        $average_logged_time_for_complete_tasks_without_revision = 0;
        foreach ($time_array1 as $i1) {
            $average_logged_time_for_complete_tasks_without_revision += $i1;
        }
        $average_logged_time_for_complete_tasks_without_revision_total_time = $average_logged_time_for_complete_tasks_without_revision;
        if (count($number_of_tasks) > 0) {
            $average_logged_time_for_complete_tasks_without_revision = $average_logged_time_for_complete_tasks_without_revision / count($number_of_tasks);
        }

        $tasks_with_revision_task_data = Task::with('project.pm', 'project.client', 'revisions.timeLogs', 'firstTaskSubmission.timeLogs')->find($test);

        $tasks_without_revision_task_data = Task::with('project.pm', 'project.client', 'revisions.timeLogs', 'timeLogged')->find($test1);

        return [
            $average_logged_time_for_complete_tasks_with_revision,
            $average_logged_time_for_complete_tasks_with_revision_total_time,
            $tasks_with_revision_task_data,
            $average_logged_time_for_complete_tasks_without_revision,
            $average_logged_time_for_complete_tasks_without_revision_total_time,
            $tasks_without_revision_task_data,
        ];
    }
}
