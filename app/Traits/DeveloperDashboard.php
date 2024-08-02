<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Leave;
use App\Models\Holiday;
use Carbon\CarbonPeriod;
use App\Models\TaskHistory;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use App\Models\TaskRevisionDispute;
use Illuminate\Database\Eloquent\Builder;

trait DeveloperDashboard
{
    public function developerDashboard()
    {
        $this->viewEventPermission = user()->permission('view_events');
        $this->viewNoticePermission = user()->permission('view_notice');
        $this->editTimelogPermission = user()->permission('edit_timelogs');

        $currentDate = now(global_setting()->timezone)->format('Y-m-d');
        $this->checkTodayLeave = Leave::where('status', 'approved')
            ->where('leave_date', now(global_setting()->timezone)->toDateString())
            ->where('user_id', user()->id)
            ->where('duration', '<>', 'half day')
            ->select('id')
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
            $endDate = Carbon::parse(request('endDate'))->endOfDay()->format('Y-m-d');


            $tasksUserInDate = Task::whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId);

            $this->username = auth()->user()->name;

            $taskHistoryWithDate = TaskHistory::whereBetween('created_at', [$startDate, $endDate])->whereRelation('task', 'subtask_id', '!=', null);

            $taskHistoryWithDateClone = clone $taskHistoryWithDate;

            $taskHistoryWithDateAndId = $taskHistoryWithDateClone->where('user_id', $devId);


            $numberOfTasksReceived = clone $tasksUserInDate;
            [
                $this->number_of_tasks_received_data,
                $this->number_of_tasks_received,
                $this->number_of_tasks_received_primary_page_data,
                $this->number_of_tasks_received_primary_page,
                $this->number_of_tasks_received_secondary_page_data,
                $this->number_of_tasks_received_secondary_page,
                $this->number_of_task_others_page_in_this_month_data,
                $this->number_of_task_others_page_in_this_month,
            ] = $this->numberOfTasksReceived($numberOfTasksReceived);

            $averageNumberOfAttemptsNeededForApprovalByClient = clone $tasksUserInDate;
            [
                $this->average_number_of_attempts_needed_for_approval_by_client,
                $this->average_number_of_attempts_needed_for_approval_by_client_data
            ] = $this->averageNumberOfAttemptsNeededForApprovalByClient($averageNumberOfAttemptsNeededForApprovalByClient);

            $numberOfSubmittedTasks = clone $taskHistoryWithDateAndId;
            [
                $this->submit_number_of_tasks_in_this_month_data,
                $this->submit_number_of_tasks_in_this_month,
                $this->submit_number_of_tasks_primary_page_in_this_month_data,
                $this->submit_number_of_tasks_primary_page_in_this_month,
                $this->submit_number_of_tasks_secondary_page_in_this_month_data,
                $this->submit_number_of_tasks_secondary_page_in_this_month,
                $this->submit_number_of_tasks_others_page_in_this_month_data,
                $this->submit_number_of_tasks_others_page_in_this_month,
            ] = $this->numberOfSubmittedTasks($numberOfSubmittedTasks, $startDate, $endDate);


            $numberOfApprovedTasksOn1stAttemptByLeadDeveloper = clone $taskHistoryWithDate;
            [
                $this->first_attempt_approve_task_in_this_month,
                $this->first_attempt_approve_task_in_this_month_count,
                $this->first_attempt_approve_task_primary_page_in_this_month_data,
                $this->first_attempt_approve_task_primary_page_in_this_month,
                $this->first_attempt_approve_task_secondary_page_in_this_month_data,
                $this->first_attempt_approve_task_secondary_page_in_this_month,
                $this->first_attempt_approve_task_others_page_in_this_month_data,
                $this->first_attempt_approve_task_others_page_in_this_month,
            ] = $this->numberOfApprovedTasksOn1stAttemptByLeadDeveloper($numberOfApprovedTasksOn1stAttemptByLeadDeveloper, $devId);

            [
                $this->approved_task_by_client_in_first_attempt_data,
                $this->approved_task_by_client_in_first_attempt,
                $this->approved_task_by_client_in_first_attempt_primary_page_data,
                $this->approved_task_by_client_in_first_attempt_primary_page,
                $this->approved_task_by_client_in_first_attempt_secondary_page_data,
                $this->approved_task_by_client_in_first_attempt_secondary_page,
                $this->approved_task_by_client_in_first_attempt_other_data,
                $this->approved_task_by_client_in_first_attempt_other,
            ] = $this->approvedTaskByClientInFirstAttempt($startDate, $endDate, $devId);

            $avgNumberOfAttemptsNeededForApprovalByLeadDeveloper = clone $tasksUserInDate;
            [
                $this->average_submission_approval_in_this_month,
                $this->avg_no_of_submission_needed_for_app_by_lead_dev
            ] = $this->avgNumberOfAttemptsNeededForApprovalByLeadDeveloper($avgNumberOfAttemptsNeededForApprovalByLeadDeveloper);

            $avgLoggedTimeForCompleteTasks = clone $tasksUserInDate;
            [
                $this->average_submission_time_in_this_month,
                $this->average_submission_time_in_this_month_total_time,
                $this->average_submission_time_in_this_month_data,
                $this->avg_logged_time_complete_task_without_revision,
                $this->avg_logged_time_complete_task_without_revision_total_time,
                $this->avg_logged_time_complete_task_without_revision_data,
            ] = $this->avgLoggedTimeForCompleteTasks($avgLoggedTimeForCompleteTasks);

            $averageTaskSubmissionTime = clone $tasksUserInDate;
            [
                $this->average_submission_day_in_this_month_data,
                $this->average_submission_day_in_this_month,
                $this->average_submission_day_in_this_month_max,
                $this->average_submission_day_in_this_month_min,
                $this->all_time_task_id,
            ] = $this->averageTaskSubmissionTime($averageTaskSubmissionTime);

            $percentageOfTasksWhereDeadlineWasMissed = clone $tasksUserInDate;
            [
                $this->number_of_tasks_where_deadline_missed_submitted_tasks,
                $this->percentage_of_tasks_deadline,
                $this->deadline_missed_task_data
            ] = $this->percentageOfTasksWhereDeadlineWasMissed($percentageOfTasksWhereDeadlineWasMissed);

            $disputes_lead_dev_without_date = TaskRevisionDispute::with(
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'disputeWinner',
                'raisedAgainst',
                'raisedBy'
            )->where('raised_by', auth()->id())
                ->select(
                    'id',
                    'task_id',
                    'winner',
                    'raised_by_percent',
                    'raised_against_percent',
                    'raised_by',
                    'raised_against',
                    'created_at'
                );

            $disputesLeadDevWithoutDate = clone $disputes_lead_dev_without_date;
            $disputesLeadDevWithDate = clone $disputes_lead_dev_without_date->whereBetween('created_at', [$startDate, $endDate]);

            $numberOfDisputesFiledAnsLost = clone $disputesLeadDevWithDate;
            [
                $this->number_of_dispute_filed_own,
                $this->number_of_dispute_filed_own_data,
                $this->number_of_dispute_lost,
                $this->number_of_dispute_lost_data,
            ] = $this->numberOfDisputesFiledAnsLost($numberOfDisputesFiledAnsLost);

            $numberOfDisputesFiledAnsLostOverall = clone $disputesLeadDevWithoutDate;
            [
                $this->number_of_dispute_filed_overall,
                $this->number_of_dispute_filed_overall_data,
                $this->number_of_dispute_lost_overall,
                $this->number_of_dispute_lost_overall_data,
            ] = $this->numberOfDisputesFiledAnsLostOverall($numberOfDisputesFiledAnsLostOverall);

            $hoursSpentInRevisions = clone $tasksUserInDate;
            [
                $this->hours_spent_revision_developer,
                $this->hours_spent_revision_developer_data,
                $this->hours_spent_revision_developer_count,
            ] = $this->hoursSpentInRevisions($hoursSpentInRevisions);


            [
                $this->average_in_progress_date_range_date,
                $this->all_in_progress_date_range,
                $this->average_in_progress_date_range,
            ] = $this->averageNumberOfInProgressTasks($devId);

            $currentAndPastLimitedTask = clone $tasksUserInDate;
            [
                $this->tasks,
                $this->past_tasks,
            ] = $this->currentAndPastLimitedTask($currentAndPastLimitedTask);

            $totalNumberOfRevisions = clone $tasksUserInDate;
            [
                $this->number_of_total_revision,
                $this->number_of_total_revision_data
            ] = $this->totalNumberOfRevisions($totalNumberOfRevisions);

            $percentageOfTasksWithRevisions = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_with_revision,
                $this->percentage_of_tasks_with_revision_data,
                $this->percentage_of_tasks_with_revision_count,
                $this->percentage_of_tasks_with_revision_primary_count,
                $this->percentage_of_tasks_with_revision_secondary_count,
                $this->percentage_of_tasks_with_revision_other_count,
            ] = $this->percentageOfTasksWithRevisions($percentageOfTasksWithRevisions);

            $percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_missed,
            ] = $this->percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision($percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision);

            $percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_missed,
            ] = $this->percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision);


            $html = view('dashboard.ajax.developerdashboard.month', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success',
                'html'   => $html,
            ]);
        } else {
            $devId = auth()->id();
            // $devId = 224;

            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth()->addDays(1);
            // $startDate = Carbon::parse('2024-05-01')->startOfMonth();
            // $endDate = Carbon::parse('2024-05-31')->endOfMonth();

            $tasksUserInDate = Task::whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId);


            $this->username = auth()->user()->name;

            $taskHistoryWithDate = TaskHistory::whereBetween('created_at', [$startDate, $endDate])->whereRelation('task', 'subtask_id', '!=', null);

            $taskHistoryWithDateClone = clone $taskHistoryWithDate;

            $taskHistoryWithDateAndId = $taskHistoryWithDateClone->where('user_id', $devId);

            $numberOfTasksReceived = clone $tasksUserInDate;
            [
                $this->number_of_tasks_received_data,
                $this->number_of_tasks_received,
                $this->number_of_tasks_received_primary_page_data,
                $this->number_of_tasks_received_primary_page,
                $this->number_of_tasks_received_secondary_page_data,
                $this->number_of_tasks_received_secondary_page,
                $this->number_of_task_others_page_in_this_month_data,
                $this->number_of_task_others_page_in_this_month,
            ] = $this->numberOfTasksReceived($numberOfTasksReceived);

            $averageNumberOfAttemptsNeededForApprovalByClient = clone $tasksUserInDate;
            [
                $this->average_number_of_attempts_needed_for_approval_by_client,
                $this->average_number_of_attempts_needed_for_approval_by_client_data
            ] = $this->averageNumberOfAttemptsNeededForApprovalByClient($averageNumberOfAttemptsNeededForApprovalByClient);

            $numberOfSubmittedTasks = clone $taskHistoryWithDateAndId;
            [
                $this->submit_number_of_tasks_in_this_month_data,
                $this->submit_number_of_tasks_in_this_month,
                $this->submit_number_of_tasks_primary_page_in_this_month_data,
                $this->submit_number_of_tasks_primary_page_in_this_month,
                $this->submit_number_of_tasks_secondary_page_in_this_month_data,
                $this->submit_number_of_tasks_secondary_page_in_this_month,
                $this->submit_number_of_tasks_others_page_in_this_month_data,
                $this->submit_number_of_tasks_others_page_in_this_month,
            ] = $this->numberOfSubmittedTasks($numberOfSubmittedTasks, $startDate, $endDate);

            //-----------------------------number of tasks approved in first attempt(in cycle) Client-----------------------//

            $numberOfApprovedTasksOn1stAttemptByLeadDeveloper = clone $taskHistoryWithDate;
            [
                $this->first_attempt_approve_task_in_this_month,
                $this->first_attempt_approve_task_in_this_month_count,
                $this->first_attempt_approve_task_primary_page_in_this_month_data,
                $this->first_attempt_approve_task_primary_page_in_this_month,
                $this->first_attempt_approve_task_secondary_page_in_this_month_data,
                $this->first_attempt_approve_task_secondary_page_in_this_month,
                $this->first_attempt_approve_task_others_page_in_this_month_data,
                $this->first_attempt_approve_task_others_page_in_this_month,
            ] = $this->numberOfApprovedTasksOn1stAttemptByLeadDeveloper($numberOfApprovedTasksOn1stAttemptByLeadDeveloper, $devId);

            [
                $this->approved_task_by_client_in_first_attempt_data,
                $this->approved_task_by_client_in_first_attempt,
                $this->approved_task_by_client_in_first_attempt_primary_page_data,
                $this->approved_task_by_client_in_first_attempt_primary_page,
                $this->approved_task_by_client_in_first_attempt_secondary_page_data,
                $this->approved_task_by_client_in_first_attempt_secondary_page,
                $this->approved_task_by_client_in_first_attempt_other_data,
                $this->approved_task_by_client_in_first_attempt_other,
            ] = $this->approvedTaskByClientInFirstAttempt($startDate, $endDate, $devId);


            // --------------Average number of attempts needed for approval(in cycle) lead developer-----------------------------//

            $avgNumberOfAttemptsNeededForApprovalByLeadDeveloper = clone $tasksUserInDate;
            [
                $this->average_submission_approval_in_this_month,
                $this->avg_no_of_submission_needed_for_app_by_lead_dev
            ] = $this->avgNumberOfAttemptsNeededForApprovalByLeadDeveloper($avgNumberOfAttemptsNeededForApprovalByLeadDeveloper);

            //---------------- Avg number of attempts needed for approval by lead developer table view------------------------------//

            $avgLoggedTimeForCompleteTasks = clone $tasksUserInDate;
            [
                $this->average_submission_time_in_this_month,
                $this->average_submission_time_in_this_month_total_time,
                $this->average_submission_time_in_this_month_data,
                $this->avg_logged_time_complete_task_without_revision,
                $this->avg_logged_time_complete_task_without_revision_total_time,
                $this->avg_logged_time_complete_task_without_revision_data,
            ] = $this->avgLoggedTimeForCompleteTasks($avgLoggedTimeForCompleteTasks);


            $averageTaskSubmissionTime = clone $tasksUserInDate;
            [
                $this->average_submission_day_in_this_month_data,
                $this->average_submission_day_in_this_month,
                $this->average_submission_day_in_this_month_max,
                $this->average_submission_day_in_this_month_min,
                $this->all_time_task_id,
            ] = $this->averageTaskSubmissionTime($averageTaskSubmissionTime);


            $percentageOfTasksWhereDeadlineWasMissed = clone $tasksUserInDate;
            [
                $this->number_of_tasks_where_deadline_missed_submitted_tasks,
                $this->percentage_of_tasks_deadline,
                $this->deadline_missed_task_data
            ] = $this->percentageOfTasksWhereDeadlineWasMissed($percentageOfTasksWhereDeadlineWasMissed);


            $disputes_lead_dev_without_date = TaskRevisionDispute::with(
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'disputeWinner',
                'raisedAgainst',
                'raisedBy'
            )->where('raised_by', auth()->id())
                ->select(
                    'id',
                    'task_id',
                    'winner',
                    'raised_by_percent',
                    'raised_against_percent',
                    'raised_by',
                    'raised_against',
                    'created_at'
                );

            $disputesLeadDevWithoutDate = clone $disputes_lead_dev_without_date;
            $disputesLeadDevWithDate = clone $disputes_lead_dev_without_date->whereBetween('created_at', [$startDate, $endDate]);



            $numberOfDisputesFiledAnsLost = clone $disputesLeadDevWithDate;
            [
                $this->number_of_dispute_filed_own,
                $this->number_of_dispute_filed_own_data,
                $this->number_of_dispute_lost,
                $this->number_of_dispute_lost_data,
            ] = $this->numberOfDisputesFiledAnsLost($numberOfDisputesFiledAnsLost);

            $numberOfDisputesFiledAnsLostOverall = clone $disputesLeadDevWithoutDate;
            [
                $this->number_of_dispute_filed_overall,
                $this->number_of_dispute_filed_overall_data,
                $this->number_of_dispute_lost_overall,
                $this->number_of_dispute_lost_overall_data,
            ] = $this->numberOfDisputesFiledAnsLostOverall($numberOfDisputesFiledAnsLostOverall);

            $hoursSpentInRevisions = clone $tasksUserInDate;
            [
                $this->hours_spent_revision_developer,
                $this->hours_spent_revision_developer_data,
                $this->hours_spent_revision_developer_count,
            ] = $this->hoursSpentInRevisions($hoursSpentInRevisions);


            [
                $this->average_in_progress_date_range_date,
                $this->all_in_progress_date_range,
                $this->average_in_progress_date_range,
            ] = $this->averageNumberOfInProgressTasks($devId);

            $currentAndPastLimitedTask = clone $tasksUserInDate;
            [
                $this->tasks,
                $this->past_tasks,
            ] = $this->currentAndPastLimitedTask($currentAndPastLimitedTask);

            $totalNumberOfRevisions = clone $tasksUserInDate;
            [
                $this->number_of_total_revision,
                $this->number_of_total_revision_data
            ] = $this->totalNumberOfRevisions($totalNumberOfRevisions);

            $percentageOfTasksWithRevisions = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_with_revision,
                $this->percentage_of_tasks_with_revision_data,
                $this->percentage_of_tasks_with_revision_count,
                $this->percentage_of_tasks_with_revision_primary_count,
                $this->percentage_of_tasks_with_revision_secondary_count,
                $this->percentage_of_tasks_with_revision_other_count,
            ] = $this->percentageOfTasksWithRevisions($percentageOfTasksWithRevisions);


            //-------------------------- Percentage of tasks with revision sayeed code --------------------------//

            $percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_total_missed,
            ] = $this->percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision($percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision);


            $percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision = clone $tasksUserInDate;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_submitted,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_missed,
            ] = $this->percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision);

            return view('dashboard.employee.developer', $this->data);
        }
    }

    private function currentAndPastLimitedTask($tasksUserInDate)
    {
        $tasksUserInDate = $tasksUserInDate
            ->with(
                'stat:id,label_color,column_name',
                'project.client:id,name'
            )
            ->orderByDesc('created_at')->select('id', 'board_column_id', 'project_id', 'heading', 'created_at');
        $current_tasks = clone $tasksUserInDate;
        $past_tasks = clone $tasksUserInDate;

        $current_tasks = $current_tasks->limit(200)->get();
        $past_tasks = $past_tasks->with('latestTaskSubmission')
            ->whereNotIn('board_column_id', [2, 3])
            ->limit(200)->get();
        return [
            $current_tasks,
            $past_tasks
        ];
    }

    private function numberOfTasksReceived($tasksUserInDate)
    {
        $tasksUserInDate->with(
            'taskType:id,task_id,task_type,page_type,task_type_other',
            'stat:id,label_color,column_name',
            'project:id,pm_id,client_id',
            'project.pm:id,name',
            'project.client:id,name'
        )->whereNotNull('subtask_id')->select('id', 'created_at', 'heading', 'board_column_id', 'due_date', 'project_id');

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

    private function numberOfSubmittedTasks($taskHistoryWithDateAndId, $startDate, $endDate)
    {
        $taskHistoryWithDateAndId = $taskHistoryWithDateAndId->where('board_column_id', 6)
            ->groupBy('task_id')
            ->get()
            ->pluck('task_id')->toArray();

        $taskFirstSubmitted = TaskHistory::where('board_column_id', 6)
            ->whereIn('task_id', $taskHistoryWithDateAndId)
            ->groupBy('task_id')
            ->select('id', 'task_id', 'created_at', 'board_column_id')
            ->get();

        $taskId = [];
        foreach ($taskFirstSubmitted as $task) {
            if ($task->created_at >= $startDate && $task->created_at <= $endDate) {
                array_push($taskId, $task->task_id);
            }
        }
        $tasksUserInDate = Task::with(
            'taskType:id,task_id,task_type,page_type,task_type_other',
            'stat:id,label_color,column_name',
            'project:id,pm_id,client_id',
            'project.client:id,name',
            'historyForReviews',
            'lastHistoryForDevReview',
        )->whereIn('id', $taskId)
            ->select('id', 'created_at', 'heading', 'board_column_id', 'start_date', 'project_id');

        if ($tasksUserInDate->count()) {
            $task_primary = clone $tasksUserInDate;
            $task_secondary = clone $tasksUserInDate;
            $task_others = clone $tasksUserInDate;

            $submit_number_of_tasks_in_this_month_data = $tasksUserInDate->get();
            $number_of_tasks_submitted = $tasksUserInDate->count();

            $number_of_tasks_submitted_primary_data = $task_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
            $number_of_tasks_submitted_primary = $task_primary->count();

            $number_of_tasks_submitted_secondary_data = $task_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
            $number_of_tasks_submitted_secondary = $task_secondary->count();

            $number_of_tasks_submitted_others_data = $task_others->whereNotIn('id', array_merge($number_of_tasks_submitted_primary_data->pluck('id')->toArray(), $number_of_tasks_submitted_secondary_data->pluck('id')->toArray()))->get();
            $number_of_tasks_submitted_others = $task_others->count();
        }

        return [
            $submit_number_of_tasks_in_this_month_data ?? [],
            $number_of_tasks_submitted ?? 0,
            $number_of_tasks_submitted_primary_data ?? [],
            $number_of_tasks_submitted_primary ?? 0,
            $number_of_tasks_submitted_secondary_data ?? [],
            $number_of_tasks_submitted_secondary ?? 0,
            $number_of_tasks_submitted_others_data ?? [],
            $number_of_tasks_submitted_others ?? 0,
        ];
    }

    private function numberOfApprovedTasksOn1stAttemptByLeadDeveloper($taskHistoryWithDate, $devId)
    {
        $taskHistoryBoardColumnCompleted = $taskHistoryWithDate->where('board_column_id', 4)
            ->groupBy('task_id')
            ->get()
            ->pluck('task_id')
            ->toArray();

        $taskHistoryBoardColumnReview = TaskHistory::whereIn('task_id', $taskHistoryBoardColumnCompleted)
            ->join('tasks', 'task_history.task_id', '=', 'tasks.id')
            ->where('task_history.board_column_id', 6)
            ->where('task_history.user_id', $devId)
            ->groupBy('task_history.task_id')
            ->select('task_history.task_id')
            ->addSelect(DB::raw('(SELECT created_at FROM task_history WHERE (task_history.task_id = tasks.id AND task_history.board_column_id = 6) ORDER BY created_at ASC LIMIT 1) as first_submitted_created_at'))
            ->addSelect(DB::raw('(SELECT created_at FROM task_history WHERE (task_history.task_id = tasks.id AND (task_history.board_column_id = 4 OR task_history.board_column_id = 8 )) ORDER BY created_at ASC LIMIT 1) as first_approved_created_at'))
            ->addSelect(DB::raw('(SELECT created_at FROM task_history WHERE (task_history.task_id = tasks.id AND task_history.board_column_id = 1 ) ORDER BY created_at ASC LIMIT 1) as first_revision_created_at'))
            ->get();

        $approved_1st_time_by_lead_dev_id = [];
        foreach ($taskHistoryBoardColumnReview as $taskHistory) {
            if (
                !($taskHistory->first_revision_created_at > $taskHistory->first_submitted_created_at &&
                    $taskHistory->first_revision_created_at < $taskHistory->first_approved_created_at)
            ) {
                $approved_1st_time_by_lead_dev_id[] = $taskHistory->task_id;
            }
        }
        $approved_1st_time_by_lead_dev = Task::with(
            'taskType:id,task_id,task_type,page_type,task_type_other',
            'project:id,pm_id,client_id',
            'project.client:id,name',
            'latestTaskSubmission:id,task_id,created_at',
            'latestTaskApprove:id,task_id,created_at',
            'createBy:id,name'
        )->whereIn('id', $approved_1st_time_by_lead_dev_id)
            ->select('id', 'created_at', 'created_by', 'heading', 'board_column_id', 'start_date', 'project_id');

        if ($approved_1st_time_by_lead_dev->count()) {
            $approved_1st_time_primary = clone $approved_1st_time_by_lead_dev;
            $approved_1st_time_secondary = clone $approved_1st_time_by_lead_dev;
            $approved_1st_time_others = clone $approved_1st_time_by_lead_dev;

            $number_of_tasks_approved_1st_time_in_by_lead_dev_data = $approved_1st_time_by_lead_dev->get();
            $number_of_tasks_approved_1st_time_in_by_lead_dev = $approved_1st_time_by_lead_dev->count();
            $number_of_tasks_approved_1st_time_primary_data = $approved_1st_time_primary->whereRelation('taskType', 'page_type', '=', 'Primary Page Development')->get();
            $number_of_tasks_approved_1st_time_primary = $approved_1st_time_primary->count();
            $number_of_tasks_approved_1st_time_secondary_data = $approved_1st_time_secondary->whereRelation('taskType', 'page_type', '=', 'Secondary Page Development')->get();
            $number_of_tasks_approved_1st_time_secondary = $approved_1st_time_secondary->count();
            $number_of_tasks_approved_1st_time_others_data = $approved_1st_time_others->whereNotIn('id', array_merge($approved_1st_time_secondary->pluck('id')->toArray(), $approved_1st_time_primary->pluck('id')->toArray()))->get();
            $number_of_tasks_approved_1st_time_others = $approved_1st_time_others->count();
        }


        return [
            $number_of_tasks_approved_1st_time_in_by_lead_dev_data ?? [],
            $number_of_tasks_approved_1st_time_in_by_lead_dev ?? 0,
            $number_of_tasks_approved_1st_time_primary_data ?? [],
            $number_of_tasks_approved_1st_time_primary ?? 0,
            $number_of_tasks_approved_1st_time_secondary_data ?? [],
            $number_of_tasks_approved_1st_time_secondary ?? 0,
            $number_of_tasks_approved_1st_time_others_data ?? [],
            $number_of_tasks_approved_1st_time_others ?? 0,
        ];
    }

    private function approvedTaskByClientInFirstAttempt($startDate, $endDate, $devId)
    {
        $tasksUserInDate = Task::with(
            'taskType:id,task_id,task_type',
            'project:id,pm_id,client_id',
            'project.pm:id,name',
            'project.client:id,name',
            // 'revisions',
            // 'revisions.taskRevisionDispute',
            'latestTaskSubmission',
            'latestTaskApprove',
            'createBy',
        )->withCount(['revisions'])
            ->whereBetween('created_at', [$startDate, $endDate])
            ->whereRelation('taskUsers', 'user_id', $devId)
            ->doesntHave('revisions')
            ->select('id', 'created_at', 'created_by', 'heading', 'board_column_id', 'project_id');

        $approved_primary = clone $tasksUserInDate;
        $approved_secondary = clone $tasksUserInDate;
        $approved_others = clone $tasksUserInDate;


        $number_of_tasks_approved_data = $tasksUserInDate->orWhere(function ($query) use ($startDate, $endDate, $devId) {
            $query->whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId)
                ->whereHas('revisions', function (Builder $query) {
                    $query->where('is_accept', 0)
                        ->where('final_responsible_person', '!=', 'D')
                        ->where('dispute_between', 'LDR')
                        ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
                });
        })->get();
        $number_of_tasks_approved = $tasksUserInDate->count();

        $number_of_tasks_approved_primary_data = $approved_primary->whereRelation('taskType', 'page_type', 'Primary Page Development')->orWhere(function ($query) use ($startDate, $endDate, $devId) {
            $query->whereBetween('created_at', [$startDate, $endDate])
                ->whereRelation('taskUsers', 'user_id', $devId)
                ->whereRelation('taskType', 'page_type', 'Primary Page Development')
                ->whereHas('revisions', function (Builder $query) {
                    $query->where('is_accept', 0)
                        ->where('final_responsible_person', '!=', 'D')
                        ->where('dispute_between', 'LDR')
                        ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
                });
        })->get();
        $number_of_tasks_approved_primary = $approved_primary->count();


        $number_of_tasks_approved_secondary_data = $approved_secondary->whereRelation('taskType', 'page_type', 'Secondary Page Development')
            ->orWhere(function ($query) use ($startDate, $endDate, $devId) {
                $query->whereBetween('created_at', [$startDate, $endDate])
                    ->whereRelation('taskUsers', 'user_id', $devId)
                    ->whereRelation('taskType', 'page_type', 'Secondary Page Development')
                    ->whereHas('revisions', function (Builder $query) {
                        $query->where('is_accept', 0)
                            ->where('final_responsible_person', '!=', 'D')
                            ->where('dispute_between', 'LDR')
                            ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
                    });
            })->get();
        $number_of_tasks_approved_secondary = $approved_secondary->count();

        $number_of_tasks_approved_others_date = $approved_others->whereNotIn('id', array_merge($number_of_tasks_approved_primary_data->pluck('id')->toArray(), $number_of_tasks_approved_secondary_data->pluck('id')->toArray()))
            ->orWhere(function ($query) use ($startDate, $endDate, $devId, $number_of_tasks_approved_primary_data, $number_of_tasks_approved_secondary_data) {
                $query->whereBetween('created_at', [$startDate, $endDate])
                    ->whereRelation('taskUsers', 'user_id', $devId)
                    ->whereNotIn('id', array_merge($number_of_tasks_approved_primary_data->pluck('id')->toArray(), $number_of_tasks_approved_secondary_data->pluck('id')->toArray()))
                    ->whereHas('revisions', function (Builder $query) {
                        $query->where('is_accept', 0)
                            ->where('final_responsible_person', '!=', 'D')
                            ->where('dispute_between', 'LDR')
                            ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
                    });
            })->get();
        $number_of_tasks_approved_others = $approved_others->count();


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

    private function avgNumberOfAttemptsNeededForApprovalByLeadDeveloper($tasksUserInDate)
    {
        $avg_no_of_submission_needed_for_app_by_lead_dev = $tasksUserInDate->with(
            'firstHistoryForDevDoing',
            'firstHistoryForLeadDevApproval',
            'taskType',
            'stat:id,label_color,column_name',
            'project.pm',
            'project.client',
            'revisions',
            'firstTaskSubmission'
        )->has('firstHistoryForLeadDevApproval')
            ->where('board_column_id', 4)
            ->whereNotNull('subtask_id')->get();

        $total_attempt_count = 0;
        foreach ($avg_no_of_submission_needed_for_app_by_lead_dev as $sub_task_completed) {
            $total_attempt_count += TaskHistory::whereBetween('created_at', [$sub_task_completed->firstHistoryForDevDoing?->created_at, $sub_task_completed->firstHistoryForLeadDevApproval?->created_at])
                ->where('board_column_id', 6)
                ->where('task_id', $sub_task_completed->id)
                ->count();
        }

        if ($avg_no_of_submission_needed_for_app_by_lead_dev->count()) {
            $average_number_of_attempts_needed = round($total_attempt_count / $avg_no_of_submission_needed_for_app_by_lead_dev->count(), 2);
        }

        return [
            $average_number_of_attempts_needed ?? 0,
            $avg_no_of_submission_needed_for_app_by_lead_dev,
        ];
    }


    private function averageNumberOfAttemptsNeededForApprovalByClient($tasksUserInDate)
    {

        $average_number_of_attempts_needed_for_approval_by_client_data = $tasksUserInDate->with(
            'taskType',
            'project:id,pm_id,client_id',
            'project.pm:id,name',
            'project.client:id,name',
            'revisions',
            'revisions.taskRevisionDispute',
            'createBy',
            'latestTaskApprove',
            'latestTaskSubmission',
        )->withCount([
                    'revisions as revisions_for_responsible' => function ($q) {
                        $q->where('is_accept', 1)
                            ->where('final_responsible_person', '=', 'D')
                            ->Where('dispute_between', 'LDR')
                            ->orWhereRelation('taskRevisionDispute', 'raised_against_percent', '>', 50);
                    }
                ])
            ->whereNotNull('subtask_id')
            ->where('board_column_id', 4)->get();

        $total_attempts = $tasksUserInDate->count() + $tasksUserInDate->get()->sum('revisions_for_responsible');

        if ($tasksUserInDate->count()) {
            $average_number_of_attempts_needed_for_approval_by_client = round($total_attempts / $tasksUserInDate->count(), 2);
        }

        return [
            $average_number_of_attempts_needed_for_approval_by_client ?? 0,
            $average_number_of_attempts_needed_for_approval_by_client_data
        ];
    }

    private function percentageOfTasksWithRevisions($tasksUserInDate)
    {
        $all_tasks_with_revision = $tasksUserInDate->with(
            'taskType',
            'stat:id,label_color,column_name',
            'project:id,pm_id,client_id',
            'project.pm:id,name',
            'project.client:id,name',
            'revisions',
            'firstTaskSubmission'
        )->whereIn('board_column_id', [6, 4])
            ->whereNotNull('subtask_id');

        $percentage_of_tasks_with_revision_data = clone $all_tasks_with_revision;
        $tasks_with_revision_data = clone $all_tasks_with_revision;

        $tasks_with_revision_data = $tasks_with_revision_data->has('revisions')->withCount([
            'taskType as primary_task_type_page_count'   => function ($q) {
                $q->where('page_type', '=', 'Primary Page Development');
            },
            'taskType as secondary_task_type_page_count' => function ($q) {
                $q->where('page_type', '=', 'Secondary Page Development');
            },
            'taskType as other_task_type_page_count'     => function ($q) {
                $q->where('task_type', '=', 'Others');
            },
        ])->get();

        $primary_task_type_page_count = $tasks_with_revision_data->sum('primary_task_type_page_count');
        $secondary_task_type_page_count = $tasks_with_revision_data->sum('secondary_task_type_page_count');
        $other_task_type_page_count = $tasks_with_revision_data->sum('other_task_type_page_count');

        $tasks_with_revision_data_count = $tasks_with_revision_data->count();

        if ($tasks_with_revision_data->count()) {
            $percentage_of_tasks_with_revision = round(($tasks_with_revision_data->count() / $percentage_of_tasks_with_revision_data->get()->count()) * 100, 2);
        }

        return [
            $percentage_of_tasks_with_revision ?? 0,
            $tasks_with_revision_data,
            $tasks_with_revision_data_count,
            $primary_task_type_page_count,
            $secondary_task_type_page_count,
            $other_task_type_page_count,
        ];
    }

    private function totalNumberOfRevisions($tasksUserInDate)
    {
        $revision_task_data = $tasksUserInDate->with(
            'taskType',
            'stat:id,label_color,column_name',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions.user',
            'revisions.taskRevisionDispute.taskDisputeQuestions',
            'revisions.taskRevisionDispute.winner',
            'revisions.taskRevisionDispute.raisedBy'
        )->whereIn('board_column_id', [6, 4])
            ->whereNotNull('subtask_id')
            ->has('revisions')->withCount('revisions')->get();
        $total_revision = $revision_task_data->sum('revisions_count');

        return [
            $total_revision,
            $revision_task_data
        ];
    }

    private function averageTaskSubmissionTime($tasksUserInDate)
    {
        $average_task_submission_time_data = $tasksUserInDate->with(
            'taskType',
            'stat:id,label_color,column_name',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions',
            'firstHistoryForDevReview'
        )->where('board_column_id', 4)
            ->whereNotNull('subtask_id')->get();

        $all_task_sub_time_in_days = [];
        $total_days = 0;
        foreach ($average_task_submission_time_data as $task_list) {
            $diffInTwoDateInMin = $task_list->firstHistoryForDevReview?->created_at->diffInMinutes($task_list->created_at);
            $diffInMinToDays = round($diffInTwoDateInMin / 1440, 2);
            $all_task_sub_time_in_days[$task_list->id] = $diffInMinToDays;
            $total_days += $diffInMinToDays;
        }


        $average_task_submission_time = 0;
        if ($average_task_submission_time_data->count()) {
            $average_task_submission_time = round($total_days / $average_task_submission_time_data->count(), 2);
        }

        return [
            $average_task_submission_time_data,
            $average_task_submission_time,
            $all_task_sub_time_in_days ? max($all_task_sub_time_in_days) : 0,
            $all_task_sub_time_in_days ? min($all_task_sub_time_in_days) : 0,
            $all_task_sub_time_in_days,
        ];
    }

    private function averageNumberOfInProgressTasks($devId)
    {
        $task = Task::whereRelation('taskUsers', 'user_id', $devId);
        $all_task = clone $task;
        $in_progress_task = clone $task;

        $all_task = $all_task->get();
        $in_progress_task = $in_progress_task->whereIn('tasks.board_column_id', [3, 2])->get();

        $number_of_in_progress_tasks = $in_progress_task->count();
        if ($number_of_in_progress_tasks) {
            $avg_of_in_progress_tasks = round($all_task->count() / $number_of_in_progress_tasks, 2);
        }

        $number_of_in_progress_tasks_data = $in_progress_task->groupBy('created_at');

        return [
            $number_of_in_progress_tasks_data,
            $number_of_in_progress_tasks,
            $avg_of_in_progress_tasks ?? 0,
        ];
    }

    public function percentageOfTasksWhereDeadlineWasMissed($tasksUserInDate)
    {
        $all_completed_task = $tasksUserInDate->with('firstHistoryForDevReview')
            ->where('board_column_id', 4)
            ->whereNotNull('subtask_id')
            ->get();

        $test_id_where_deadline_missed = [];

        foreach ($all_completed_task as $task) {
            if (!Carbon::parse($task->due_date)->greaterThanOrEqualTo(Carbon::parse($task->firstHistoryForDevReview->created_at)->toDateString())) {
                array_push($test_id_where_deadline_missed, $task->id);
            }
        }

        $percentage_of_tasks_where_deadline_missed = 0;
        if (count($test_id_where_deadline_missed)) {
            $percentage_of_tasks_where_deadline_missed = round((count($test_id_where_deadline_missed) / $all_completed_task->count()) * 100, 2);
        }

        $number_of_tasks_where_deadline_missed_data = $tasksUserInDate->with(
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
        )->whereIn('id', $test_id_where_deadline_missed)->get();
        return [
            $number_of_tasks_where_deadline_missed_data->count() ?? 0,
            $percentage_of_tasks_where_deadline_missed ?? 0,
            $number_of_tasks_where_deadline_missed_data ?? []
        ];
    }

    private function percentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevision($tasksUserInDate)
    {
        $number_of_tasks = $tasksUserInDate->withSum('timeLoggedWithoutRevision', 'total_minutes')->get();

        $task_ids = [];
        foreach ($number_of_tasks as $task) {
            if ($task->time_logged_without_revision_sum_total_minutes > $task->total_estimate_minutes) {
                array_push($task_ids, $task->id);
            }
        }
        $number_task_cross_estimate_time = count($task_ids);
        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = 0;
        if ($number_of_tasks->count()) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = round(($number_task_cross_estimate_time / $number_of_tasks->count()) * 100, 2);
        }

        $number_of_tasks_data = $tasksUserInDate->with(
            'taskType',
            'timeLogged',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
        )->whereIn('id', $task_ids)->get();

        return [
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
            $number_of_tasks_data,
            $number_of_tasks->count(),
            $number_task_cross_estimate_time,
        ];
    }

    private function percentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($tasksUserInDate)
    {
        $number_of_tasks = $tasksUserInDate->withSum('timeLogged', 'total_minutes')->get();

        $task_ids = [];
        foreach ($number_of_tasks as $task) {
            if ($task->time_logged_sum_total_minutes > $task->total_estimate_minutes) {
                array_push($task_ids, $task->id);
            }
        }

        $number_task_cross_estimate_time = count($task_ids);
        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = 0;
        if ($number_of_tasks->count()) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = round(($number_task_cross_estimate_time / $number_of_tasks->count()) * 100, 2);
        }

        $number_of_tasks_data = $tasksUserInDate->with(
            'taskType',
            'timeLogged',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
        )->whereIn('id', $task_ids)->get();

        return [
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
            $number_of_tasks_data,
            $number_of_tasks_data->count(),
            $number_task_cross_estimate_time,
        ];
    }

    private function numberOfDisputesFiledAnsLost($disputes_lead_dev_with_date)
    {
        $disputes_filed_data = $disputes_lead_dev_with_date->get();

        $disputes_filed_but_lost_data = $disputes_lead_dev_with_date->where('winner', '!=', auth()->id())->get();

        return [
            $disputes_filed_data->count(),
            $disputes_filed_data,
            $disputes_filed_but_lost_data->count(),
            $disputes_filed_but_lost_data,
        ];
    }

    private function numberOfDisputesFiledAnsLostOverall($disputesLeadDevWithoutDate)
    {
        $overall_disputes_filed_data = $disputesLeadDevWithoutDate->get();

        $overall_disputes_filed_but_lost_data = $disputesLeadDevWithoutDate->where('winner', '!=', auth()->id())->get();

        return [
            $overall_disputes_filed_data->count(),
            $overall_disputes_filed_data,
            $overall_disputes_filed_but_lost_data->count(),
            $overall_disputes_filed_but_lost_data,
        ];
    }

    private function hoursSpentInRevisions($tasksUserInDate)
    {
        $task_with_revision_time = $tasksUserInDate->with(
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions.timeLogs',
            'firstTaskSubmission.timeLogs',
            'taskUser'
        )->has('timeLoggedOnlyRevision')->withSum('timeLoggedOnlyRevision', 'total_minutes')->get();

        $total_revision_time_in_mins = $task_with_revision_time->sum('time_logged_only_revision_sum_total_minutes');

        $total_revision_time_in_hours = intdiv($total_revision_time_in_mins, 60) . ' hours ' . ($total_revision_time_in_mins % 60) . ' Minutes';

        return [
            $total_revision_time_in_hours,
            $task_with_revision_time,
            $task_with_revision_time->count(),
        ];
    }

    private function avgLoggedTimeForCompleteTasks($tasksUserInDate)
    {

        $tasksUserInDate->with(
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions.timeLogs',
            'firstTaskSubmission.timeLogs',
            'timeLogged'
        )->where('board_column_id', 4)
            ->whereNotNull('subtask_id');

        $number_of_tasks = clone $tasksUserInDate;
        $number_of_tasks_without_revision = clone $tasksUserInDate;


        $number_of_tasks = $number_of_tasks->withSum('timeLogged', 'total_minutes')->get();
        $number_of_tasks_logged_total_mins = $number_of_tasks->sum('time_logged_sum_total_minutes');
        $number_of_tasks_logged_total_hours = intdiv($number_of_tasks_logged_total_mins, 60) . ' hours ' . ($number_of_tasks_logged_total_mins % 60) . ' Minutes';


        $avg_logged_time_for_complete_tasks_with_revision_hours = 0;
        if ($number_of_tasks->count()) {
            $avg_tasks_with_revision_mins = round($number_of_tasks_logged_total_mins / $number_of_tasks->count(), 2);
            $avg_logged_time_for_complete_tasks_with_revision_hours = intdiv($avg_tasks_with_revision_mins, 60) . ' hours ' . ($avg_tasks_with_revision_mins % 60) . ' Minutes';
        }

        //  number of tasks without revision

        $number_of_tasks_without_revision = $number_of_tasks_without_revision->has('timeLoggedWithoutRevision')->withSum('timeLoggedWithoutRevision', 'total_minutes')->get();

        $number_of_tasks_without_revision_logged_total_mins = $number_of_tasks_without_revision->sum('time_logged_without_revision_sum_total_minutes');
        $number_of_tasks_without_revision_logged_total_hours = intdiv($number_of_tasks_without_revision_logged_total_mins, 60) . ' hours ' . ($number_of_tasks_without_revision_logged_total_mins % 60) . ' Minutes';

        $avg_logged_time_for_complete_tasks_without_revision_hours = 0;
        if ($number_of_tasks_without_revision->count()) {
            $avg_tasks_without_revision_mins = round($number_of_tasks_without_revision_logged_total_mins / $number_of_tasks_without_revision->count(), 2);
            $avg_logged_time_for_complete_tasks_without_revision_hours = intdiv($avg_tasks_without_revision_mins, 60) . ' hours ' . ($avg_tasks_without_revision_mins % 60) . ' Minutes';
        }


        return [
            $avg_logged_time_for_complete_tasks_with_revision_hours,
            $number_of_tasks_logged_total_hours,
            $number_of_tasks,
            $avg_logged_time_for_complete_tasks_without_revision_hours,
            $number_of_tasks_without_revision_logged_total_hours,
            $number_of_tasks_without_revision,
        ];
    }
}
