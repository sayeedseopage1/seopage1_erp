<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Role;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\Project;
use App\Models\SubTask;
use App\Models\TaskUser;
use Carbon\CarbonPeriod;
use Nette\Utils\DateTime;
use App\Models\TaskRevision;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use Illuminate\Support\Facades\Auth;

trait LeadDashboard
{
    public function LeadDashboard()
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

            ini_set('max_execution_time', 180);

            $devId = request('user_id');
            $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            $endDate1 = request('endDate');
            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);

            $this->username_lead = DB::table('users')->where('id', $devId)->value('name');

            [
                $this->number_of_tasks_received_lead,
                $this->number_of_tasks_received_lead_data
            ] = $this->leadNumberOfTasksReceived(startDate: $startDate, endDate: $endDate, devId: $devId);

            [
                $this->submit_number_of_tasks_in_this_month_lead,
                $this->submit_number_of_tasks_in_this_month_lead_data
            ] = $this->leadNumberOfSubmittedTasks($startDate, $endDate, $devId);

            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//

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
            foreach ($number_of_tasks_approved as $task) {



                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task++;
                }
            }

            $this->first_attempt_approve_task_in_this_month_client_lead = $first_attempt_approve_task;



            //-----------------------------number of tasks approved in first attempt(in cycle) PM-----------------------//

            [
                $this->first_attempt_approve_task_in_this_month_lead,
                $this->first_attempt_approve_task_in_this_month_lead_data
            ] = $this->leadNumberOfApprovedTasksOn1stAttemptByProjectManager($startDate, $endDate, $devId);



            // --------------Average number of attempts needed for approval(in cycle) Project Manager-----------------------------//

            [
                $this->average_submission_aproval_in_this_month_lead,
                $this->average_submission_aproval_in_this_month_lead_data,
            ] = $this->leadAvgNumberOfAttemptsNeededForApprovalByProjectManager($startDate, $endDate, $devId);


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
                $this->average_submission_aproval_in_this_month_client_lead = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month_client_lead = 0;
            }


            //---------------------------------Percentage of Revision----------------------------------------------------//

            [$this->number_of_total_revision_for_this_month_lead, $this->number_of_total_revision_for_this_month_lead_data] = $this->leadTotalNumberOfRevisions($startDate, $endDate, $devId);

            //------------------------------average Submission Time(Day)----------------------------------------------//
            //in this month

            [$this->average_submission_day_in_this_month_lead, $this->average_submit_data_lead] = $this->leadAverageTaskSubmissionTime($startDate, $endDate, $devId);

            //-----------Percentage of tasks where deadline was missed -----------------//

            [$this->percentage_of_tasks_deadline_lead, $this->estimate_missed_task_data_lead] = $this->leadPercentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId);

            //Number of Approval
            [$this->number_of_approval, $this->auto_approved_tasks, $this->manually_approved_tasks] = $this->leadNumberOfApproval($startDate, $endDate, $devId);

            //Number of disputes filed

            $this->number_of_dispute_filed_own_lead = $this->leadNoOfDisputesFiled($startDate, $endDate, $devId);
            $this->disputes_lead_developer_involved = $this->leadNumberofDisputesInvolvedIn($startDate, $endDate, $devId);

            $this->number_of_dispute_filed_all_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Number of disputes lost
            $this->number_of_dispute_lost_own_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_lost_all_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

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
            $this->average_in_progress_date_range_lead = $total_in_progress_date_range / $differenceInDays;

            //Spent time in revision

            $total_task_assigned = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->select('tasks.id')
                ->where('tasks.created_at', '>=', $startDate)
                ->where('tasks.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $total_spent_revision_developer = 0;
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
                    $get_sub_task = DB::table('sub_tasks')
                        ->select('id')
                        ->where('task_id', $current_task_id)
                        ->get();

                    if ($get_sub_task->count() == 0) {

                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');

                        $total_spent_revision_developer += $spent_revision_developer;

                    } else {

                        foreach ($get_sub_task as $subtask) {
                            $get_task = DB::table('tasks')
                                ->select('id')
                                ->where('subtask_id', $subtask->id)
                                ->first();
                            $spent_revision_developer = DB::table('project_time_logs')
                                ->where('task_id', $get_task->id)
                                ->where('revision_status', 1)
                                ->where('created_at', '>=', $startDate)
                                ->where('created_at', '<', $endDate)
                                ->groupBy('task_id')
                                ->sum('total_minutes');

                            $total_spent_revision_developer += $spent_revision_developer;
                        }


                    }

                }

                $responsible_for_revision = DB::table('task_revisions')
                    ->where('task_id', $current_task_id)
                    ->where('final_responsible_person', 'LD')
                    ->count();

                if ($responsible_for_revision > 0) {
                    $get_sub_task = DB::table('sub_tasks')
                        ->select('id')
                        ->where('task_id', $current_task_id)
                        ->get();

                    if ($get_sub_task->count() == 0) {

                        $spent_revision_developer = DB::table('project_time_logs')
                            ->where('task_id', $task->id)
                            ->where('revision_status', 1)
                            ->where('created_at', '>=', $startDate)
                            ->where('created_at', '<', $endDate)
                            ->groupBy('task_id')
                            ->sum('total_minutes');

                        $total_spent_revision_developer += $spent_revision_developer;
                    } else {

                        foreach ($get_sub_task as $subtask) {
                            $get_task = DB::table('tasks')
                                ->select('id')
                                ->where('subtask_id', $subtask->id)
                                ->first();
                            $spent_revision_developer = DB::table('project_time_logs')
                                ->where('task_id', $get_task->id)
                                ->where('revision_status', 1)
                                ->where('created_at', '>=', $startDate)
                                ->where('created_at', '<', $endDate)
                                ->groupBy('task_id')
                                ->sum('total_minutes');

                            $total_spent_revision_developer += $spent_revision_developer;
                        }
                    }

                }

            }

            $this->spent_revision_developer_lead = $total_spent_revision_developer / 60;

            //Percentage of tasks where given estimated time was missed//

            [$this->percentage_number_task_cross_estimate_time_lead, $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId);
            [$this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data] = $this->leadPercentageofTasksWhereGivenEstimatedTimewasMissedWithoutRevisions($startDate, $endDate, $devId);

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

            //-----------------------------number of tasks approved in first attempt(in cycle) PM table-----------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();
            $first_attempt_approve_task = 0;
            $task_id_store = [];
            foreach ($number_of_tasks_approved as $task) {

                $min_approve_date = DB::table('task_approves')
                    ->select('task_approves.created_at')
                    ->where('task_approves.task_id', $task->id)
                    ->orderBy('task_approves.created_at', 'asc')
                    ->first();

                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->where('task_submissions.created_at', '<', $min_approve_date->created_at)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task++;
                    $task_id_store[] = $task->id;
                }
            }

            $first_attempt_approve_task_pm_data_lead = [];

            foreach ($task_id_store as $task) {
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
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $first_attempt_approve_task_pm_data_lead[] = $approve_task_data;
            }


            $this->first_attempt_approve_task_pm_data_lead = $first_attempt_approve_task_pm_data_lead;

            //-----------------------------number of tasks approved in first attempt(in cycle) Client table-----------------------//

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
            $task_id_store = [];
            foreach ($number_of_tasks_approved as $task) {
                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $task_id_store[] = $task->id;
                    $first_attempt_approve_task++;

                }
            }

            $first_attempt_approve_task_data_client_lead = [];

            foreach ($task_id_store as $task) {
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
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where(
                        'tasks.id',
                        $task
                    )
                    //->groupBy('tasks.id', $task)
                    ->first();

                $first_attempt_approve_task_data_client_lead[] = $approve_task_data;
            }


            $this->first_attempt_approve_task_data_client_lead = $first_attempt_approve_task_data_client_lead;
            // ----------Average number of attempts needed for approval(in cycle) Project Manager  table-----------------------------//

            $number_of_tasks_approved = DB::table('tasks')
                ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                ->join('task_approves', 'tasks.id', '=', 'task_approves.task_id')
                ->select('tasks.id')
                ->where('task_approves.created_at', '>=', $startDate)
                ->where('task_approves.created_at', '<', $endDate)
                ->where('task_users.user_id', $devId)
                ->get();

            $average_attempts_approve_pm_data_lead = [];

            foreach ($task_id_store as $task) {
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
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where(
                        'tasks.id',
                        $task
                    )
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_attempts_approve_pm_data_lead[] = $approve_task_data;
            }

            $this->average_attempts_approve_pm_data_lead = $average_attempts_approve_pm_data_lead;
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
            //---------------------------------Percentage of Revision table----------------------------------------------------//

            [
                $this->lead_task_with_revision,
                $this->lead_task_with_revision_data,
                $this->lead_task,
                $this->percentage_of_tasks_with_revision_lead,
            ] = $this->leadPercentageOftaskswithrevisions($startDate, $endDate, $devId);

            //------------------------------average Submission Time(Day) table----------------------------------------------//

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
                ->distinct('tasks.id')
                ->get();

            $average_submit_data_lead = [];

            foreach ($submit_number_of_tasks_in_this_month_data as $task) {
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
                    ->join('task_submissions', 'task_submissions.task_id', '=', 'tasks.id')
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where('tasks.id', $task->id)
                    //->groupBy('tasks.id', $task)
                    ->first();

                $average_submit_data_lead[] = $approve_task_data;
            }

            $this->average_submit_data_lead = $average_submit_data_lead;
            //Number of disputes filed all table


            $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_filed_all_data_lead = [];

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

                $number_of_dispute_filed_all_data_lead[] = $task_data;
            }


            $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;

            //-------------------Number of disputes filed all table-----------------//


            $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_filed_all_data_lead = [];

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

                $number_of_dispute_filed_all_data_lead[] = $task_data;
            }


            $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;
            //-------------------Average Task Hold Time-----------------//
            $this->average_average_task_hold_time_lead = $this->leadAverageTaskHoldTime($startDate, $endDate, $devId);
            //------------ Number of disputes lost own table-----------------//
            $number_of_dispute_lost_own_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();


            $number_of_dispute_lost_own_data = [];

            foreach ($number_of_dispute_lost_own_id as $task) {
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

                $number_of_dispute_lost_own_data[] = $task_data;
            }


            $this->number_of_dispute_lost_own_data_lead = $number_of_dispute_lost_own_data;
            //----------------- Number of disputes lost all table----------------------//

            $number_of_dispute_lost_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_lost_all_data = [];

            foreach ($number_of_dispute_lost_all_id as $task) {
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

                $number_of_dispute_lost_all_data[] = $task_data;
            }


            $this->number_of_dispute_lost_all_data_lead = $number_of_dispute_lost_all_data;
            //----------------Average number of in-progress tasks table-------------------//

            $this->total_in_progress_date_range_table_lead = DB::table('progress_tasks')
                ->select('count_progress_task', 'created_at')
                ->where('user_id', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            //---------------Hours spent in revisions data-----------------//

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

            $this->spent_revision_developer_data_lead = $spent_revision_developer_data;

            //-------------Percentage of tasks where given estimated time was missed table----------------//
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
            // if ($number_of_tasks_received_for_deadline > 0) {
            //     $percentage_number_task_cross_estimate_time = ($number_task_cross_estimate_time / $number_of_tasks_received_for_deadline) * 100;
            //     $estimate_time_missed_id_store[] = $task->id;
            // }

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
                    ->first();

                $estimate_missed_task_data[] = $task_data;
            }


            $this->estimate_missed_task_data_lead = $estimate_missed_task_data;


            $html = view('dashboard.ajax.leaddeveloper.month', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
            ]);

        } else {
            $devId = Auth::id();
            $startDate = Carbon::now()->startOfMonth();

            $endDate1 = Carbon::now()->endOfMonth();

            $endDate = Carbon::parse($endDate1)->addDays(1)->format('Y-m-d');

            $this->startDate1 = Carbon::parse($startDate);
            $this->endDate1 = Carbon::parse($endDate1);



            $this->username_lead = DB::table('users')->where('id', $devId)->value('name');

            [
                $this->number_of_tasks_received_lead,
                $this->number_of_tasks_received_lead_data
            ] = $this->leadNumberOfTasksReceived(startDate: $startDate, endDate: $endDate, devId: $devId);

            [
                $this->submit_number_of_tasks_in_this_month_lead,
                $this->submit_number_of_tasks_in_this_month_lead_data
            ] = $this->leadNumberOfSubmittedTasks($startDate, $endDate, $devId);


            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//

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
            foreach ($number_of_tasks_approved as $task) {
                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $first_attempt_approve_task++;
                }
            }

            $this->first_attempt_approve_task_in_this_month_client_lead = $first_attempt_approve_task;

            //-----------------------------number of tasks approved in first attempt(in cycle) PM-----------------------//

            [
                $this->first_attempt_approve_task_in_this_month_lead,
                $this->first_attempt_approve_task_in_this_month_lead_data
            ] = $this->leadNumberOfApprovedTasksOn1stAttemptByProjectManager($startDate, $endDate, $devId);


            // --------------Average number of attempts needed for approval(in cycle) Project Manager-----------------------------//

            [
                $this->average_submission_aproval_in_this_month_lead,
                $this->average_submission_aproval_in_this_month_lead_data,
            ] = $this->leadAvgNumberOfAttemptsNeededForApprovalByProjectManager($startDate, $endDate, $devId);

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
                $this->average_submission_aproval_in_this_month_client_lead = $count_submission_per_approval / $total_approval;
            } else {
                $this->average_submission_aproval_in_this_month_client_lead = 0;
            }



            //---------------------------------Percentage of Revision----------------------------------------------------//

            [$this->number_of_total_revision_for_this_month_lead, $this->number_of_total_revision_for_this_month_lead_data] = $this->leadTotalNumberOfRevisions($startDate, $endDate, $devId);

            //------------------------------average Submission Time(Day)----------------------------------------------//
            //in this month

            [$this->average_submission_day_in_this_month_lead, $this->average_submit_data_lead] = $this->leadAverageTaskSubmissionTime($startDate, $endDate, $devId);

            //-----------Percentage of tasks where deadline was missed -----------------//

            [$this->percentage_of_tasks_deadline_lead, $this->estimate_missed_task_data_lead] = $this->leadPercentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId);

            //Number of Approval
            [$this->number_of_approval, $this->auto_approved_tasks, $this->manually_approved_tasks] = $this->leadNumberOfApproval($startDate, $endDate, $devId);

            //Number of disputes filed

            $this->number_of_dispute_filed_own_lead = $this->leadNoOfDisputesFiled($startDate, $endDate, $devId);
            $this->disputes_lead_developer_involved = $this->leadNumberofDisputesInvolvedIn($startDate, $endDate, $devId);

            $this->number_of_dispute_filed_all_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Number of disputes lost
            $this->number_of_dispute_lost_own_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            $this->number_of_dispute_lost_all_lead = DB::table('task_revision_disputes')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->count();

            // Average number of in-progress tasks

            [$this->average_in_progress_date_range_lead, $this->total_in_progress_date_range_table_lead] = $this->leadAverageNumberOfInProgressTasks($startDate, $endDate, $devId);

            $this->spent_revision_developer_lead = $this->leadHoursSpentInRevisions($startDate, $endDate, $devId);

            //Percentage of tasks where given estimated time was missed//

            [$this->percentage_number_task_cross_estimate_time_lead, $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId);
            [$this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data] = $this->leadPercentageofTasksWhereGivenEstimatedTimewasMissedWithoutRevisions($startDate, $endDate, $devId);


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

            //-----------------------------number of tasks approved in first attempt(in cycle) PM table-----------------------//

            //-----------------------------number of tasks approved in first attempt(in cycle) Client table-----------------------//

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
            $task_id_store = [];
            foreach ($number_of_tasks_approved as $task) {
                $number_of_tasks = DB::table('task_submissions')
                    ->join('tasks', 'task_submissions.task_id', '=', 'tasks.id')
                    ->where('task_submissions.task_id', $task->id)
                    ->distinct('task_submissions.created_at')
                    ->count();
                if ($number_of_tasks == 1) {
                    $task_id_store[] = $task->id;
                    $first_attempt_approve_task++;

                }
            }

            $first_attempt_approve_task_data_client_lead = [];

            foreach ($task_id_store as $task) {
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
                    ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
                    ->join('taskboard_columns', 'taskboard_columns.id', '=', 'tasks.board_column_id')
                    ->leftJoin('projects', 'projects.id', 'tasks.project_id')
                    ->leftJoin('users as client', 'client.id', 'projects.client_id')
                    ->leftJoin('users as cl', 'cl.id', 'tasks.client_id')
                    ->where(
                        'tasks.id',
                        $task
                    )
                    //->groupBy('tasks.id', $task)
                    ->first();

                $first_attempt_approve_task_data_client_lead[] = $approve_task_data;
            }


            $this->first_attempt_approve_task_data_client_lead = $first_attempt_approve_task_data_client_lead;

            // ----------Average number of attempts needed for approval(in cycle) Project Manager  table-----------------------------//

            // --------------Average number of attempts needed for approval(in cycle) Client table-----------------------------//

            //---------------------------------Percentage of Revision table----------------------------------------------------//



            [
                $this->lead_task_with_revision,
                $this->lead_task_with_revision_data,
                $this->lead_task,
                $this->percentage_of_tasks_with_revision_lead,
            ] = $this->leadPercentageOftaskswithrevisions($startDate, $endDate, $devId);


            //------------------------------average Submission Time(Day) table----------------------------------------------//

            //in this month



            //Number of disputes filed all table


            $number_of_dispute_filed_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_filed_all_data_lead = [];

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

                $number_of_dispute_filed_all_data_lead[] = $task_data;
            }


            $this->number_of_dispute_filed_all_data_lead = $number_of_dispute_filed_all_data_lead;
            //-------------------Average Task Hold Time-----------------//
            $this->average_average_task_hold_time_lead = $this->leadAverageTaskHoldTime($startDate, $endDate, $devId);
            //------------ Number of disputes lost own table-----------------//
            $number_of_dispute_lost_own_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();


            $number_of_dispute_lost_own_data = [];

            foreach ($number_of_dispute_lost_own_id as $task) {
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

                $number_of_dispute_lost_own_data[] = $task_data;
            }


            $this->number_of_dispute_lost_own_data_lead = $number_of_dispute_lost_own_data;
            //----------------- Number of disputes lost all table----------------------//

            $number_of_dispute_lost_all_id = DB::table('task_revision_disputes')
                ->select('task_id')
                ->where(function ($query) use ($devId) {
                    $query->where('raised_by', $devId)
                        ->orWhere('raised_against', $devId);
                })
                ->where('winner', '!=', $devId)
                ->where('created_at', '>=', $startDate)
                ->where('created_at', '<', $endDate)
                ->get();

            $number_of_dispute_lost_all_data = [];

            foreach ($number_of_dispute_lost_all_id as $task) {
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

                $number_of_dispute_lost_all_data[] = $task_data;
            }


            $this->number_of_dispute_lost_all_data_lead = $number_of_dispute_lost_all_data;
            //----------------Average number of in-progress tasks table-------------------//

            //---------------Hours spent in revisions data-----------------//

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

            $this->spent_revision_developer_data_lead = $spent_revision_developer_data;

            //-------------Percentage of tasks where given estimated time was missed table----------------//

            return view('dashboard.employee.lead', $this->data);
        }
    }

    private function leadNumberOfTasksReceived($startDate, $endDate, $devId)
    {
        $tasks = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->whereDate('tasks.created_at', '>=', $startDate)
            ->whereDate('tasks.created_at', '<', $endDate)
            ->whereNull('tasks.subtask_id')
            ->where('task_users.user_id', $devId)
            ->select('tasks.id', 'tasks.created_at')
            ->get();

        $number_of_tasks_received = $tasks->count();

        $test = [];
        foreach ($tasks as $i1) {
            array_push($test, $i1->id);
        }

        $number_of_tasks_received_lead_data = Task::with('firstTimeLog', 'project.pm', 'project.client', 'firstSubTask')->find($test);

        return [
            $number_of_tasks_received,
            $number_of_tasks_received_lead_data,
        ];
    }

    private function leadNumberOfSubmittedTasks($startDate, $endDate, $devId)
    {
        $number_of_tasks = DB::table('task_history')
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->where('board_column_id', 6)
            ->where('user_id', $devId)
            ->whereDate('created_at', '>=', $startDate)
            ->whereDate('created_at', '<', $endDate)
            ->groupBy('task_id')
            ->get();

        $tasks_submitted = [];

        foreach ($number_of_tasks as $i1) {
            $min_sub = DB::table('task_history')
                ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->first();
            if ($min_sub->min_created_at >= $startDate && $min_sub->min_created_at < $endDate) {
                array_push($tasks_submitted, $i1->task_id);
            }
        }


        $submit_number_of_tasks_in_this_month_lead_data = Task::with('firstTimeLog', 'project.pm', 'project.client', 'firstSubTask')->find($tasks_submitted);
        $number_of_tasks_submitted = count($tasks_submitted);

        return [
            $number_of_tasks_submitted,
            $submit_number_of_tasks_in_this_month_lead_data
        ];
    }

    private function leadNumberOfApprovedTasksOn1stAttemptByProjectManager($startDate, $endDate, $devId)
    {
        $number_of_approved_tasks_on_1st_attempt_by_project_manager = 0;
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);
        $test = [];
        foreach ($completed_tasks_by_lead_developer as $i1) {
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
                $number_of_approved_tasks_on_1st_attempt_by_project_manager++;
                array_push($test, $i1);
            }
        }

        $number_of_approved_tasks_on_1st_attempt_by_project_manager_date = Task::with('firstTimeLog', 'latestTaskApprove', 'project.pm', 'project.client', 'firstSubTask', 'latestTaskSubmission')->find($test);

        return [
            $number_of_approved_tasks_on_1st_attempt_by_project_manager,
            $number_of_approved_tasks_on_1st_attempt_by_project_manager_date
        ];
    }

    private function leadAvgNumberOfAttemptsNeededForApprovalByProjectManager($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);

        $number_of_attempts_needed = 0;
        $test = array();
        foreach ($completed_tasks_by_lead_developer as $i1) {
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
            // dd($submit_number);
            array_push($test, $i1);
        }
        $average_number_of_attempts_needed = 0;
        if (count($completed_tasks_by_lead_developer) > 0) {
            $average_number_of_attempts_needed = ($number_of_attempts_needed / count($completed_tasks_by_lead_developer));
        }
        $average_number_of_attempts_needed_data = Task::with('firstTimeLog', 'latestTaskApprove', 'revisions', 'project.client', 'firstSubTask', 'latestTaskSubmission')->find($test);
        // dd(
        //     $average_number_of_attempts_needed,
        //     $average_number_of_attempts_needed_data
        // );

        return [
            $average_number_of_attempts_needed,
            $average_number_of_attempts_needed_data
        ];
    }

    private function leadPercentageOftaskswithrevisions($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);
        $task_with_revision = 0;
        $test = [];
        $test_revision = [];
        foreach ($completed_tasks_by_lead_developer as $i1) {
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

            // array_push($test,$approved->earliest_created_at);

            $revision = DB::table('task_history')
                ->where('created_at', '>', $submitted->earliest_created_at)
                ->where('created_at', '<', $approved->earliest_created_at)
                ->where('board_column_id', 1)
                ->where('task_id', $i1)
                ->groupBy('task_id')
                ->count();

            // dd($revision);
            if ($revision > 0) {
                $task_with_revision++;
                array_push($test_revision, $i1);
            }
            array_push($test, $i1);
        }
        $percentage_of_parent_tasks_with_revision = 0;
        if (count($completed_tasks_by_lead_developer) > 0) {
            $percentage_of_parent_tasks_with_revision = ($task_with_revision / count($completed_tasks_by_lead_developer)) * 100;
        }

        $lead_task_with_revisions_count = count($test_revision);
        $lead_task_count = count($test);
        $lead_task_with_revisions_data = Task::with('firstTimeLog', 'latestTaskApprove', 'revisions', 'project.client', 'firstSubTask', 'latestTaskSubmission')->find($test_revision);

        return [
            $lead_task_with_revisions_count,
            $lead_task_with_revisions_data,
            $lead_task_count,
            $percentage_of_parent_tasks_with_revision,
        ];
    }
    private function leadTotalNumberOfRevisions($startDate, $endDate, $devId)
    {
        $total_revision = 0;
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);
        $test = array();
        foreach ($completed_tasks_by_lead_developer as $i1) {
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

        $number_of_total_revision_for_this_month_lead_data = DB::table('tasks')
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
            ->whereIn('tasks.id', $test)
            ->groupBy('tasks.id')
            ->get();

        return [$total_revision, $number_of_total_revision_for_this_month_lead_data];
    }
    private function leadAverageTaskSubmissionTime($startDate, $endDate, $devId)
    {
        $submission_date = DB::table('task_history')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('user_id', $devId)
            ->where('board_column_id', 6)
            ->select('task_id', DB::raw('MIN(created_at) as min_created_at'))
            ->groupBy('task_id')
            ->get();

        $test = array();
        $days = [];
        foreach ($submission_date as $item) {
            $assign_date = DB::table('tasks')
                ->where('id', $item->task_id)
                ->value('created_at'); // Use value() instead of first() to directly get the value

            if ($item->min_created_at != NULL && $assign_date != NULL) {
                $i1_new = Carbon::parse($assign_date);
                $submission_date_new = Carbon::parse($item->min_created_at);
                $diffInMinutes = $submission_date_new->diffInMinutes($i1_new);
                $diffInDays = $diffInMinutes / 1440;
                array_push($test, $item->task_id);
                array_push($days, $diffInDays);
            } else {
                // array_push($test, array($i1->id => NULL));
                array_push($days, NULL);
            }
        }

        // dd($test);
        $av = 0;
        foreach ($days as $i1) {
            if ($i1 != NULL) {
                $av += $i1;
            }
        }
        $average_task_submission_time = $av / count($test);

        $average_submit_data_lead = DB::table('tasks')
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
            ->whereIn('tasks.id', $test)
            ->groupBy('tasks.id')
            ->get();

        // dd(
        //     $average_task_submission_time,
        //     $test
        // );
        return [$average_task_submission_time, $average_submit_data_lead];
    }
    private function leadAverageNumberOfInProgressTasks($startDate, $endDate, $devId)
    {
        $countToday = DB::table('tasks')
            ->join('task_users', 'task_users.task_id', '=', 'tasks.id')
            ->select('tasks.id')
            ->whereIn('tasks.board_column_id', [3, 2])
            ->where('task_users.user_id', $devId)
            ->get();

        $in_progress_tasks = [];

        foreach ($countToday as $task) {
            array_push($in_progress_tasks, $task->id);
        }
        $number_of_in_progress_task = count($in_progress_tasks);

        $total_in_progress_date_range_table_lead = DB::table('tasks')
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
            ->whereIn('tasks.id', $in_progress_tasks)
            ->groupBy('tasks.id')
            ->get();
        foreach ($total_in_progress_date_range_table_lead as $row) {
            $row->revision_count = TaskRevision::where('task_id', $row->id)->where('final_responsible_person', '!=', null)->count();
        }
        // dd(
        //     $number_of_in_progress_task,
        //     $total_in_progress_date_range_table_lead,
        //     $in_progress_tasks
        // );
        return [$number_of_in_progress_task, $total_in_progress_date_range_table_lead];
    }

    private function leadAverageTaskHoldTime($startDate, $endDate, $devId)
    {
        $assign_phase = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->whereDate('tasks.created_at', '>=', $startDate)
            ->whereDate('tasks.created_at', '<', $endDate)
            ->whereNull('tasks.subtask_id')
            ->where('task_users.user_id', $devId)
            ->select('tasks.id', 'tasks.created_at')
            ->groupBy('tasks.id')
            ->get();

        // dd($assign_phase);

        $time = 0;
        $task = [];

        foreach ($assign_phase as $i1) {
            // dd($i1);
            $assign_date = DB::table('sub_tasks')
                ->where('sub_tasks.task_id', '=', $i1->id)
                ->select('sub_tasks.id', 'sub_tasks.created_at')
                ->groupBy('sub_tasks.task_id')
                ->first();
            // dd($assign_date);

            if ($assign_date != NULL) {
                $startDateTime = new DateTime($i1->created_at);
                $endDateTime = new DateTime($assign_date->created_at);

                // Ensure the end date is greater than the start date
                if ($endDateTime <= $startDateTime) {
                    // Handle invalid date range
                    echo "Invalid date range!";
                } else {
                    // Initialize the total time difference
                    $totalTimeSeconds = 0;

                    // Iterate over each day between start and end
                    $currentDate = clone $startDateTime;
                    if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                        $timeDifference = $currentDate->diff($endDateTime);
                        $totalTimeSeconds += $timeDifference->s + ($timeDifference->i * 60) + ($timeDifference->h * 3600);
                        $currentDate = $endDateTime;
                    }
                    while ($currentDate < $endDateTime) {
                        // Check if the current date falls within an exclusion period
                        $currentTime = $currentDate->format('H:i:s');
                        //    dd($currentTime);
                        if (($currentTime >= '18:00:00' && $currentTime < '8:00:00') || ($currentDate->format('l')) == 'Sunday') {
                            // Exclude time during the specified periods
                            $currentDate->modify('+1 day');  // Move to the next day
                            $currentDate->setTime(8, 0, 0);  // Set the time to '8:00:00'
                            // dd($currentDate);
                        } else {

                            if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                                $tt = $currentDate->format('H:i:s');
                                $ee = $endDateTime->format('H:i:s');
                                $mn = max($tt, $ee);
                                $timeDifference = strtotime($mn) - strtotime('8:00:00');
                            } else {
                                $tt = $currentDate->format('H:i:s');
                                $timeDifference = strtotime('18:00:00') - strtotime($tt);
                            }

                            // Accumulate the total time in seconds
                            $currentDate->modify('+1 day');  // Move to the next day
                            $currentDate->setTime(8, 0, 0);  // Set the time to '8:00:00'
                            $totalTimeSeconds += $timeDifference;

                            //    $currentDate = $nextDay;
                        }
                    }

                    // Convert total time from seconds to minutes
                    $totalTimeMinutes = $totalTimeSeconds / 60;
                    array_push($task, $totalTimeMinutes);
                    //    array_push($task,$i1->id,$i1->created_at, $assign_date->created_at,$totalTimeMinutes);
                }

            }
        }

        //    dd($task);
        $average_hold_time = 0;
        $total = 0;
        foreach ($task as $i1) {
            $average_hold_time += $i1;
            $total++;
        }



        $subtask = DB::table('tasks')
            ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
            ->whereDate('tasks.created_at', '>=', $startDate)
            ->whereDate('tasks.created_at', '<', $endDate)
            ->whereNotNull('tasks.subtask_id')
            ->select('tasks.id')
            ->groupBy('tasks.id')
            ->get();

        $task = [];
        $sixc = [];
        $ec = [];
        $time = 0;

        foreach ($subtask as $i1) {
            $total = 0;

            $where_board_column_id_six = DB::table('task_history')
                ->whereDate('task_history.created_at', '>=', $startDate)
                ->whereDate('task_history.created_at', '<', $endDate)
                ->where('board_column_id', 6)
                ->where('task_id', $i1->id)
                ->groupBy('created_at')
                ->select(
                    'task_id',
                    'created_at as c1',
                    DB::raw("(SELECT MIN(created_at) FROM task_history WHERE
        created_at > c1 AND
        board_column_id IN (8, 1) AND
        task_id = $i1->id) as c2")
                )
                ->get();

            foreach ($where_board_column_id_six as $i2) {
                if ($i2->c2 != NULL) {
                    $startDateTime = new DateTime($i2->c1);
                    $endDateTime = new DateTime($i2->c2);

                    // Ensure the end date is greater than the start date
                    if ($endDateTime <= $startDateTime) {
                        // Handle invalid date range
                        echo "Invalid date range!";
                    } else {
                        // Initialize the total time difference
                        $totalTimeSeconds = 0;

                        // Iterate over each day between start and end
                        $currentDate = clone $startDateTime;
                        if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                            $timeDifference = $currentDate->diff($endDateTime);
                            $totalTimeSeconds += $timeDifference->s + ($timeDifference->i * 60) + ($timeDifference->h * 3600);
                            $currentDate = $endDateTime;
                        }
                        while ($currentDate < $endDateTime) {
                            $currentTime = $currentDate->format('H:i:s');

                            if (($currentTime >= '18:00:00' && $currentTime < '8:00:00') || ($currentDate->format('l')) == 'Sunday') {
                                $currentDate->modify('+1 day');
                                $currentDate->setTime(8, 0, 0);
                                // dd($currentDate);
                            } else {

                                if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                                    $tt = $currentDate->format('H:i:s');
                                    $ee = $endDateTime->format('H:i:s');
                                    $mn = max($tt, $ee);
                                    $timeDifference = strtotime($mn) - strtotime('8:00:00');
                                } else {
                                    $tt = $currentDate->format('H:i:s');
                                    $timeDifference = strtotime('18:00:00') - strtotime($tt);
                                }

                                $currentDate->modify('+1 day');
                                $currentDate->setTime(8, 0, 0);
                                $totalTimeSeconds += $timeDifference;

                                //    $currentDate = $nextDay;
                            }
                        }

                        // Convert total time from seconds to minutes
                        $totalTimeMinutes = $totalTimeSeconds / 60;
                        array_push($task, $i2->task_id);
                        //    array_push($task,$i1->id,$i1->created_at, $assign_date->created_at,$totalTimeMinutes);
                    }
                }
            }

        }

        //    dd($task);
        foreach ($task as $i1) {
            $average_hold_time += $i1;
            $total++;
        }


        //    dd($subtask);

        $total_task = DB::table('tasks')
            ->whereDate('tasks.created_at', '>=', $startDate)
            ->whereDate('tasks.created_at', '<', $endDate)
            ->whereNotNull('tasks.subtask_id')
            // ->where('tasks.id', 4067)
            ->select(
                DB::raw("(SELECT task_id FROM sub_tasks WHERE
        tasks.subtask_id = sub_tasks.id) as t1"),
                'tasks.id as s1',
                DB::raw("(SELECT MAX(task_history.created_at) FROM task_history WHERE
        task_history.task_id = s1 AND
        task_history.board_column_id = 6) as start")
            )
            ->orderBy('tasks.id')
            ->get();

        // dd($total_task);

        $tasks = [];

        foreach ($total_task as $task) {
            $t1 = $task->t1;
            $s1 = $task->s1;
            if ($task->start) {
                $start = date("Y-m-d H:i:s", strtotime($task->start));
            } else {
                $start = NULL;
            }

            $tasks[$t1][] = [
                "sub_task_id" => $s1,
                "created_at" => $start,
            ];
        }

        // dd($tasks);

        // Function to find the latest date and sub_task_id for a task based on subtasks
        function findLatestDateAndSubTaskForTask($task)
        {
            // Initialize variables to track the latest date and sub_task_id
            $latest_date = "";
            $latest_sub_task_id = null;

            // Loop through subtasks
            foreach ($task as $subtask) {
                // $created_at_timestamp = strtotime($subtask['created_at']);
                if ($subtask['created_at'] != "") {
                    $created_at_timestamp = strtotime($subtask['created_at']);
                } else {
                    $created_at_timestamp = "";
                }

                // Check if the current subtask has a later date than the current latest date
                if (($created_at_timestamp != NULL) && ($created_at_timestamp > strtotime($latest_date))) {
                    $latest_date = $subtask['created_at'];
                    $latest_sub_task_id = $subtask['sub_task_id'];
                }
            }

            return array("latest_date" => $latest_date, "latest_sub_task_id" => $latest_sub_task_id);
        }

        $all_task = [];
        foreach ($tasks as $task_id => $subtasks) {
            $result = findLatestDateAndSubTaskForTask($subtasks);
            $latest_date = $result['latest_date'];
            $latest_sub_task_id = $result['latest_sub_task_id'];
            // echo "For task $task_id, the latest sub_task_id is $latest_sub_task_id with the latest date: $latest_date <br>";
            // array_push($all_task,$latest_date);
            $all_task[] = [
                "task_id" => $task_id,
                "subtask_id" => $latest_sub_task_id,
                "created_at" => $latest_date,
            ];
        }

        // dd($all_task);
        $final = [];
        foreach ($all_task as $task) {
            // array_push($final,$task['task_id']);
            $end = DB::table('task_history')
                ->select(
                    DB::raw("(SELECT MIN(created_at) FROM task_history WHERE
            task_history.task_id = " . $task['task_id'] . " AND
            board_column_id = 6 AND
            " . (!empty($task['created_at']) ? " created_at >= '
            " . $task['created_at'] . "'" : "FALSE") . ") as c1")
                )
                ->first();

            // Access $end->c1 for the minimum created_at value
            // dd($task['task_id'],$task['subtask_id'],$end);
            if ($end->c1 != NULL && $task['created_at'] != "") {
                $startDateTime = new DateTime($task['created_at']);
                $endDateTime = new DateTime($end->c1);


                // Ensure the end date is greater than the start date
                if ($endDateTime < $startDateTime) {
                    // Handle invalid date range
                    echo "Invalid date range!";
                    //    array_push($final,$task['task_id'],$task['subtask_id'],$startDateTime,$endDateTime);
                } else {
                    // Initialize the total time difference
                    $totalTimeSeconds = 0;

                    // Iterate over each day between start and end
                    $currentDate = clone $startDateTime;
                    if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                        $timeDifference = $currentDate->diff($endDateTime);
                        $totalTimeSeconds += $timeDifference->s + ($timeDifference->i * 60) + ($timeDifference->h * 3600);
                        $currentDate = $endDateTime;
                    }
                    while ($currentDate < $endDateTime) {
                        $currentTime = $currentDate->format('H:i:s');

                        if (($currentTime >= '18:00:00' && $currentTime < '8:00:00') || ($currentDate->format('l')) == 'Sunday') {
                            $currentDate->modify('+1 day');
                            $currentDate->setTime(8, 0, 0);
                            // dd($currentDate);
                        } else {

                            if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                                $tt = $currentDate->format('H:i:s');
                                $ee = $endDateTime->format('H:i:s');
                                $mn = max($tt, $ee);
                                $timeDifference = strtotime($mn) - strtotime('8:00:00');
                            } else {
                                $tt = $currentDate->format('H:i:s');
                                $timeDifference = strtotime('18:00:00') - strtotime($tt);
                            }

                            $currentDate->modify('+1 day');
                            $currentDate->setTime(8, 0, 0);
                            $totalTimeSeconds += $timeDifference;

                            //    $currentDate = $nextDay;
                        }
                    }

                    $totalTimeMinutes = $totalTimeSeconds;
                    $days = floor($totalTimeSeconds / (24 * 3600));
                    $hours = floor(($totalTimeSeconds % (24 * 3600)) / 3600);
                    $minutes = floor(($totalTimeSeconds % 3600) / 60);
                    $seconds = $totalTimeSeconds % 60;

                    // Combine into a single variable with a formatted string
                    $totalDuration = sprintf('%d days, %02d hours, %02d minutes, %02d seconds', $days, $hours, $minutes, $seconds);
                    array_push($final, $totalTimeSeconds);
                    //    array_push($task,$i1->id,$i1->created_at, $assign_date->created_at,$totalTimeMinutes);
                    // array_push($final,$totalTimeSeconds);
                }
            } else {
                array_push($final, NULL);
            }
        }
        // dd($final);
        $ind = 0;
        foreach ($final as $i1) {
            if ($i1 != NULL) {
                $average_hold_time += $i1;
                $ind++;
                $total++;
            }
        }
        // dd(count($task));
// dd($average_hold_time/$ind);
        if ($total > 0) {
            $average_hold_time = $average_hold_time / $total;
        }
        // dd($average_hold_time);
        $days = floor($average_hold_time / (24 * 3600));
        $hours = floor(($average_hold_time % (24 * 3600)) / 3600);
        $minutes = floor(($average_hold_time % 3600) / 60);
        $seconds = $average_hold_time % 60;

        // Combine into a single variable with a formatted string
        $average_hold_time_formatted = sprintf('%d days, %02d hours, %02d minutes, %02d seconds', $days, $hours, $minutes, $seconds);
        // dd($totalDuration);
        return $average_hold_time_formatted;
    }

    private function leadPercentageOfTasksWhereDeadlineWasMissed($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);

        $count_of_tasks_where_deadline_was_missed = 0;
        $test = [];

        foreach ($completed_tasks_by_lead_developer as $task) {
            $first_submission = DB::table('task_history')
                ->select('created_at')
                ->where('board_column_id', '=', 6)
                ->where('task_id', '=', $task)
                ->first();

            $submit_date = date('Y-m-d', strtotime($first_submission->created_at));

            $due = DB::table('tasks')
                ->select('due_date')
                ->where('id', '=', $task)
                ->first();

            $due = date('Y-m-d', strtotime($due->due_date));
            // dd($submit_date, $due);

            if ($submit_date > $due) {
                $count_of_tasks_where_deadline_was_missed++;
                array_push($test, $task);
            }
        }
        $percentage_of_tasks_where_deadline_was_missed = 0;
        if (count($completed_tasks_by_lead_developer) > 0) {
            $percentage_of_tasks_where_deadline_was_missed = ($count_of_tasks_where_deadline_was_missed / count($completed_tasks_by_lead_developer)) * 100;
        }

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
            ->whereIn('tasks.id', $test)
            ->groupBy('tasks.id')
            ->get();
        return [$percentage_of_tasks_where_deadline_was_missed, $task_data];
    }
    private function leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);
        $test = [];
        $number_task_cross_estimate_time_with_revision = 0;
        foreach ($completed_tasks_by_lead_developer as $i1) {
            $estimated_time = DB::table('tasks')
                ->select('estimate_hours', 'estimate_minutes')
                ->where('id', $i1)
                ->first();

            $estimated_time = $estimated_time->estimate_hours * 60 + $estimated_time->estimate_minutes;

            $subtask = DB::table('sub_tasks')
                ->join('tasks', 'sub_tasks.id', '=', 'tasks.subtask_id')
                ->select('tasks.id')
                ->where('sub_tasks.task_id', $i1)
                ->get();

            // dd($subtask);
            $taken_time = 0;
            foreach ($subtask as $i2) {
                $time = DB::table('project_time_logs')
                    ->where('task_id', $i2->id)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $taken_time += $time;
            }
            if ($taken_time > $estimated_time) {
                $number_task_cross_estimate_time_with_revision++;
                array_push($test, $i1);
            }
            // array_push($test,$taken_time);
        }
        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = 0;
        if (count($completed_tasks_by_lead_developer) > 0) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = ($number_task_cross_estimate_time_with_revision / count($completed_tasks_by_lead_developer)) * 100;
        }

        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data = DB::table('tasks')
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
            ->whereIn('tasks.id', $test)
            ->groupBy('tasks.id')
            ->get();

        // dd(
        //     $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
        //     $test
        // );
        return [$percentage_of_tasks_where_given_estimated_time_was_missed_with_revision, $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data];
    }
    private function leadPercentageofTasksWhereGivenEstimatedTimewasMissedWithoutRevisions($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);

        $test = [];
        $number_task_cross_estimate_time_without_revision = 0;
        foreach ($completed_tasks_by_lead_developer as $i1) {
            $estimated_time = DB::table('tasks')
                ->select('estimate_hours', 'estimate_minutes')
                ->where('id', $i1)
                ->first();

            $estimated_time = $estimated_time->estimate_hours * 60 + $estimated_time->estimate_minutes;
            // dd($estimated_time);

            $subtask = DB::table('sub_tasks')
                ->join('tasks', 'sub_tasks.id', '=', 'tasks.subtask_id')
                ->select('tasks.id')
                ->where('sub_tasks.task_id', $i1)
                ->get();

            // dd($subtask);
            $taken_time = 0;
            foreach ($subtask as $i2) {
                $time = DB::table('project_time_logs')
                    ->where('task_id', $i2->id)
                    ->where('revision_status', 0)
                    ->groupBy('task_id')
                    ->sum('total_minutes');
                $taken_time += $time;
            }
            if ($taken_time > $estimated_time) {
                $number_task_cross_estimate_time_without_revision++;
                array_push($test, $i1);
            }
            // array_push($test,$taken_time);
        }
        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = 0;
        if (count($completed_tasks_by_lead_developer) > 0) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = ($number_task_cross_estimate_time_without_revision / count($completed_tasks_by_lead_developer)) * 100;
        }
        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data = DB::table('tasks')
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
            ->whereIn('tasks.id', $test)
            ->groupBy('tasks.id')
            ->get();
        // dd(
        //     $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
        //     $test
        // );
        return [$percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data];
    }
    private function leadNoOfDisputesFiled($startDate, $endDate, $devId)
    {
        $test = [];

        $disputes_filed_by_lead_developer = DB::table('task_revision_disputes')
            ->select('task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_by', $devId)
            // ->where('task_id',4305)
            ->get();
        $number_of_disputes_filed_lead_developer = count($disputes_filed_by_lead_developer);

        // dd($number_of_disputes_filed) ;
        $number_of_disputes_lost_by_lead_developer = 0;
        $number_of_disputes_win_by_lead_developer = 0;

        foreach ($disputes_filed_by_lead_developer as $i1) {
            array_push($test, $i1->task_id);
            if ($i1->winner != NULL) {
                // array_push($test,$i1->winner);
                if ($i1->winner != $devId) {
                    $number_of_disputes_lost_by_lead_developer++;
                } else {
                    $number_of_disputes_win_by_lead_developer++;
                }
            } else {
                if ($i1->raised_by_percent != NULL && $i1->raised_against_percent != NULL) {
                    if ($i1->raised_by_percent > $i1->raised_against_percent) {
                        // array_push($test,$i1->raised_against_percent);
                        if ($i1->raised_against != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                        }
                    } else {
                        // array_push($test,$i1->raised_by_percent);
                        if ($i1->raised_by != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                        }
                    }
                } else {
                    array_push($test, NULL);
                }
            }
        }

        $disputes_raised_by_lead_developer_not_resolved_yet = ($number_of_disputes_filed_lead_developer - ($number_of_disputes_win_by_lead_developer + $number_of_disputes_lost_by_lead_developer));

        // dd(
        // $number_of_disputes_filed_lead_developer,
        // $number_of_disputes_win_by_lead_developer,
        // $number_of_disputes_lost_by_lead_developer,
        // $disputes_raised_by_lead_developer_not_resolved_yet
        // );
        return $number_of_disputes_filed_lead_developer;
    }
    private function leadNumberofDisputesInvolvedIn($startDate, $endDate, $devId)
    {
        $test = [];

        $disputes_lead_developer_involved = DB::table('task_revision_disputes')
            ->select('id', 'task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where(function ($query) use ($devId) {
                $query->where('raised_by', $devId)
                    ->orWhere('raised_against', $devId);
            })
            ->get();

        $disputes_raised_by_lead_developer = DB::table('task_revision_disputes')
            ->select('id', 'task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_by', $devId)
            ->get();

        $disputes_raised_against_lead_developer = DB::table('task_revision_disputes')
            ->select('id', 'task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_against', $devId)
            ->get();

        $number_of_disputes_lead_developer_involved = count($disputes_lead_developer_involved);

        // dd($number_of_disputes_filed) ;
        $number_of_disputes_lost_by_lead_developer = 0;
        $disputes_lost_by_lead_developer = [];
        $number_of_disputes_win_by_lead_developer = 0;
        $disputes_win_by_lead_developer = [];

        foreach ($disputes_lead_developer_involved as $i1) {
            array_push($test, $i1->task_id);
            if ($i1->winner != NULL) {
                // array_push($test,$i1->winner);
                if ($i1->winner != $devId) {
                    $number_of_disputes_lost_by_lead_developer++;
                    array_push($disputes_lost_by_lead_developer, $i1->task_id);
                } else {
                    $number_of_disputes_win_by_lead_developer++;
                    array_push($disputes_win_by_lead_developer, $i1->task_id);
                }
            } else {
                if ($i1->raised_by_percent != NULL && $i1->raised_against_percent != NULL) {
                    if ($i1->raised_by_percent > $i1->raised_against_percent) {
                        // array_push($test,$i1->raised_against_percent);
                        if ($i1->raised_against != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                            array_push($disputes_lost_by_lead_developer, $i1->task_id);
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                            array_push($disputes_win_by_lead_developer, $i1->task_id);
                        }
                    } else {
                        // array_push($test,$i1->raised_by_percent);
                        if ($i1->raised_by != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                            array_push($disputes_lost_by_lead_developer, $i1->task_id);
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                            array_push($disputes_win_by_lead_developer, $i1->task_id);
                        }
                    }
                } else {
                    array_push($test, NULL);
                }
            }
        }

        $disputes_lead_developer_involved_not_resolved_yet = (count($disputes_lead_developer_involved) - ($number_of_disputes_win_by_lead_developer + $number_of_disputes_lost_by_lead_developer));

        // dd(
        //     count($disputes_lead_developer_involved),
        //     $disputes_lead_developer_involved,
        //     count($disputes_raised_by_lead_developer),
        //     $disputes_raised_by_lead_developer,
        //     count($disputes_raised_against_lead_developer),
        //     $disputes_raised_against_lead_developer,
        //     $number_of_disputes_win_by_lead_developer,
        //     $disputes_win_by_lead_developer,
        //     $number_of_disputes_lost_by_lead_developer,
        //     $disputes_lost_by_lead_developer,
        //     $disputes_lead_developer_involved_not_resolved_yet
        // );

        return count($disputes_lead_developer_involved);
    }

    private function leadNumberOfDisputesLost($startDate, $endDate, $devId)
    {
        $test = [];

        $disputes_filed_by_lead_developer = DB::table('task_revision_disputes')
            ->select('task_id', 'winner', 'raised_by_percent', 'raised_against_percent', 'raised_by', 'raised_against')
            ->where('created_at', '>=', $startDate)
            ->where('created_at', '<', $endDate)
            ->where('raised_by', $devId)
            // ->where('task_id',4305)
            ->get();
        $number_of_disputes_filed_lead_developer = count($$disputes_filed_by_lead_developer);

        // dd($number_of_disputes_filed) ;
        $number_of_disputes_lost_by_lead_developer = 0;
        $number_of_disputes_win_by_lead_developer = 0;

        foreach ($$disputes_filed_by_lead_developer as $i1) {
            array_push($test, $i1->task_id);
            if ($i1->winner != NULL) {
                // array_push($test,$i1->winner);
                if ($i1->winner != $devId) {
                    $number_of_disputes_lost_by_lead_developer++;
                } else {
                    $number_of_disputes_win_by_lead_developer++;
                }
            } else {
                if ($i1->raised_by_percent != NULL && $i1->raised_against_percent != NULL) {
                    if ($i1->raised_by_percent > $i1->raised_against_percent) {
                        // array_push($test,$i1->raised_against_percent);
                        if ($i1->raised_against != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                        }
                    } else {
                        // array_push($test,$i1->raised_by_percent);
                        if ($i1->raised_by != $devId) {
                            $number_of_disputes_lost_by_lead_developer++;
                        } else {
                            $number_of_disputes_win_by_lead_developer++;
                        }
                    }
                } else {
                    array_push($test, NULL);
                }
            }
        }

        $disputes_raised_by_lead_developer_not_resolved_yet = ($number_of_disputes_filed_lead_developer - ($number_of_disputes_win_by_lead_developer + $number_of_disputes_lost_by_lead_developer));

        // dd(
        //     $number_of_disputes_filed_lead_developer,
        //     $number_of_disputes_win_by_lead_developer,
        //     $number_of_disputes_lost_by_lead_developer,
        //     $disputes_raised_by_lead_developer_not_resolved_yet
        // );
        return [$number_of_disputes_lost_by_lead_developer, $number_of_disputes_lost_by_lead_developer];
    }
    private function leadHoursSpentInRevisions($startDate, $endDate, $devId)
    {
        $number_of_tasks_completed = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->select('task_history.task_id', 'task_history.created_at')
            ->where('task_history.created_at', '>=', $startDate)
            ->where('task_history.created_at', '<', $endDate)
            ->where('task_history.board_column_id', '=', 4)
            ->whereNull('tasks.subtask_id') // This line changed
            // ->where('user_id', $devId)
            ->distinct('task_history.task_id') // This line changed
            ->get();


        // dd($number_of_tasks_completed);

        $completed_tasks_by_lead_developer = [];

        foreach ($number_of_tasks_completed as $i1) {
            $complete = DB::table('task_history')
                ->where('board_column_id', 6)
                ->where('user_id', $devId)
                ->where('task_id', $i1->task_id)
                ->count();
            // dd($complete);
            if ($complete > 0) {
                array_push($completed_tasks_by_lead_developer, $i1->task_id);
            }
        }
        // dd($completed_tasks_by_lead_developer);
        $parent_tasks_lists_where_total_hours_spent_in_revisions = array();
        $parent_taskwise_total_hours_spent_in_revisions = 0;
        foreach ($completed_tasks_by_lead_developer as $i1) {

            $subtask = DB::table('sub_tasks')
                ->join('tasks', 'sub_tasks.id', '=', 'tasks.subtask_id')
                ->select('tasks.id')
                ->where('sub_tasks.task_id', $i1)
                ->get();

            // dd($subtask);
            $taken_time = 0;
            $subtask_time = array();

            foreach ($subtask as $i2) {
                $time = DB::table('project_time_logs')
                    ->where('task_id', $i2->id)
                    ->where('revision_status', 1)
                    ->groupBy('task_id')
                    ->sum('total_minutes');

                $taken_time += $time;
                $time = $time / 60;
                if ($time > 0) {
                    $subtask_time[$i2->id] = $time;
                }
            }

            $taken_time_hours = $taken_time / 60;

            if ($taken_time_hours > 0) {
                $parent_tasks_lists_where_total_hours_spent_in_revisions[] = array(
                    'parent_task_id' => $i1,
                    'parent_task_total_hours_spent_in_revision' => $taken_time_hours,
                    'subtask_total_hours_spent_in_revision' => $subtask_time
                );
            }

            $parent_taskwise_total_hours_spent_in_revisions += $taken_time_hours;
        }

        // dd(
        //     $parent_taskwise_total_hours_spent_in_revisions,
        //     $parent_tasks_lists_where_total_hours_spent_in_revisions
        // );

        return $parent_taskwise_total_hours_spent_in_revisions;
    }
    private function leadNumberOfApproval($startDate, $endDate, $devId)
    {
        $total_task = DB::table('task_history')
            ->join('tasks', 'tasks.id', '=', 'task_history.task_id')
            ->whereDate('task_history.created_at', '>=', $startDate)
            ->whereDate('task_history.created_at', '<', $endDate)
            // ->where('tasks.added_by', $devId)
            ->whereNotNull('tasks.subtask_id')
            // ->where('task_history.user_id', $devId)
            ->where('task_history.board_column_id', 8)
            ->select('task_history.task_id', 'task_history.created_at', 'tasks.added_by', 'task_history.user_id')
            ->groupBy('tasks.id')
            ->whereColumn('task_history.created_at', '=', DB::raw('(SELECT MIN(created_at) FROM task_history WHERE task_id = tasks.id AND board_column_id = 8)'))
            ->get();

        $number_of_approval = count($total_task);

        $auto_approved_tasks = 0;
        $manually_approved_tasks = 0;
        $manually_approved_tasks_data = [];
        $auto_approved_tasks_data = [];
        $id = [];
        foreach ($total_task as $i1) {
            $approveDate = date('Y-m-d', strtotime($i1->created_at));

            $approve = DB::table('task_approves')
                ->where('task_approves.task_id', $i1->task_id)
                ->whereDate('task_approves.created_at', $approveDate)
                ->where(function ($query) {
                    $query->where('task_approves.user_id', 2380)
                        ->orWhere('task_approves.user_id', 2252);
                })
                // ->where('task_approves.user_id',$devId)
                ->first();

            if ($approve != NULL) {
                $manually_approved_tasks++;
                array_push($manually_approved_tasks_data, $i1->task_id);
            } else {
                $auto_approved_tasks++;
                array_push($auto_approved_tasks_data, $i1->task_id);
            }
        }

        // dd(
        //     $number_of_approval,
        //     $manually_approved_tasks,
        //     $manually_approved_tasks_data,
        //     $auto_approved_tasks,
        //     $auto_approved_tasks_data
        // );

        return [$number_of_approval, $auto_approved_tasks, $manually_approved_tasks];
    }
}
