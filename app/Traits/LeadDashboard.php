<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Task;
use App\Helper\Reply;
use App\Models\Leave;
use App\Models\Holiday;
use App\Models\RoleUser;
use Carbon\CarbonPeriod;
use Nette\Utils\DateTime;
use App\Models\TaskHistory;
use App\Models\TaskRevision;
use App\Models\ProjectTimeLog;
use App\Models\DashboardWidget;
use App\Models\AttendanceSetting;
use Illuminate\Support\Facades\DB;
use App\Models\ProjectTimeLogBreak;
use App\Models\TaskRevisionDispute;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Builder;

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

            $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            $endDate = Carbon::parse(request('endDate'))->addDays(1)->format('Y-m-d');

            $this->username_lead = auth()->user()->name;

            $taskWithId = Task::whereRelation('taskUsers', 'user_id', auth()->id())->whereNull('subtask_id');

            $taskWithStartEndDateWithId = clone $taskWithId;

            $taskWithStartEndDateWithId = $taskWithStartEndDateWithId->whereBetween('created_at', [$startDate, $endDate]);

            $taskWithStartEndDateWithIdWithConfirm = clone $taskWithStartEndDateWithId;

            $taskWithStartEndDateWithIdWithConfirm->where('board_column_id', 4);

            $leadDevNumberOfApprovedTaskByClientInFirstAttempt = clone $taskWithStartEndDateWithIdWithConfirm;

            [
                $this->number_of_approved_tasks_on_1st_attempt_by_client,
                $this->number_of_approved_tasks_on_1st_attempt_by_client_data,
            ] = $this->leadDevNumberOfApprovedTaskByClientInFirstAttempt($leadDevNumberOfApprovedTaskByClientInFirstAttempt);

            $leadDevAvgNumberOfAttemptsNeededForApprovalByClient = clone $taskWithStartEndDateWithIdWithConfirm;
            [
                $this->avg_number_of_attempts_needed_for_approval_by_client,
                $this->total_number_of_attempts_needed_for_approval_by_client,
                $this->total_number_of_attempts_needed_for_approval_by_client_data,
            ] = $this->leadDevAvgNumberOfAttemptsNeededForApprovalByClient($leadDevAvgNumberOfAttemptsNeededForApprovalByClient);

            $leadNumberOfTasksReceived = clone $taskWithStartEndDateWithId;
            [
                $this->number_of_tasks_received_lead,
                $this->number_of_tasks_received_lead_data
            ] = $this->leadNumberOfTasksReceived($leadNumberOfTasksReceived);


            $leadNumberOfSubmittedTasks = clone $taskWithStartEndDateWithId;
            [
                $this->submit_number_of_tasks_in_this_month_lead,
                $this->submit_number_of_tasks_in_this_month_lead_data
            ] = $this->leadNumberOfSubmittedTasks($leadNumberOfSubmittedTasks);


            $leadNumberOfApprovedTasksOn1stAttemptByProjectManager = clone $taskWithStartEndDateWithId;
            [
                $this->average_submission_approval_by_pm_lead,
                $this->submission_approval_by_pm_lead,
                $this->submission_approval_by_pm_lead_data,
                $this->first_attempt_approve_task_in_this_month_lead,
                $this->first_attempt_approve_task_in_this_month_lead_data
            ] = $this->leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager($leadNumberOfApprovedTasksOn1stAttemptByProjectManager);


            $leadAverageTaskSubmissionTime = clone $taskWithStartEndDateWithId;

            [
                $this->average_submission_day_in_this_month_lead,
                $this->average_task_submit_data
            ] = $this->leadAverageTaskSubmissionTime($leadAverageTaskSubmissionTime);

            //-----------Percentage of tasks where deadline was missed -----------------//

            $leadPercentageOfTasksWhereDeadlineWasMissed = clone $taskWithStartEndDateWithIdWithConfirm;
            [
                $this->percentage_of_tasks_deadline_lead,
                $this->estimate_missed_task_data_lead
            ] = $this->leadPercentageOfTasksWhereDeadlineWasMissed($leadPercentageOfTasksWhereDeadlineWasMissed);

            $leadNumberOfApproval = clone $taskWithStartEndDateWithId;
            [
                $this->number_of_approval,
                $this->number_of_approval_data,
                $this->auto_approved_tasks,
                $this->auto_approved_tasks_data,
                $this->manually_approved_tasks,
                $this->manually_approved_tasks_data,
                $this->manually_approved_task_ids
            ] = $this->leadNumberOfApproval($leadNumberOfApproval);


            $disputes_involved_in_lead_dev_without_date = TaskRevisionDispute::with(
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'disputeWinner',
                'raisedAgainst',
                'raisedBy'
            )->where(function ($query) {
                $query->where('raised_by', auth()->id())
                    ->orWhere('raised_against', auth()->id());
            })->select(
                    'id',
                    'task_id',
                    'winner',
                    'raised_by_percent',
                    'raised_against_percent',
                    'raised_by',
                    'raised_against',
                    'created_at'
                );

            $disputes_involved_in_lead_dev_with_date = clone $disputes_involved_in_lead_dev_without_date;

            $disputes_involved_in_lead_dev_with_date = $disputes_involved_in_lead_dev_with_date->whereBetween('created_at', [$startDate, $endDate]);


            $leadNumberOfDisputesInvolvedIn = clone $disputes_involved_in_lead_dev_with_date;
            [
                $this->disputes_lead_developer_involved,
                $this->disputes_lead_developer_involved_data
            ] = $this->leadNumberOfDisputesInvolvedIn($leadNumberOfDisputesInvolvedIn);

            $leadNoOfDisputesFiledLoseOverall = clone $disputes_involved_in_lead_dev_without_date;
            [
                $this->number_of_dispute_filed_own_overall_lead,
                $this->number_of_dispute_filed_own_overall_lead_data,
                $this->number_of_dispute_lose_own_overall_lead,
                $this->number_of_dispute_lose_own_overall_lead_data
            ] = $this->leadNoOfDisputesFiledLoseOverall($leadNoOfDisputesFiledLoseOverall);

            $leadNoOfDisputesFiledLose = clone $disputes_involved_in_lead_dev_with_date;
            [
                $this->number_of_dispute_filed_own_lead,
                $this->number_of_dispute_filed_own_lead_data,
                $this->number_of_dispute_lose_own_lead,
                $this->number_of_dispute_lose_own_lead_data
            ] = $this->leadNoOfDisputesFiledLose($leadNoOfDisputesFiledLose);


            $leadAverageNumberOfInProgressTasks = clone $taskWithId;

            [
                $this->avg_number_of_in_progress_task,
                $this->total_number_in_task_lead_from_in_pro,
                $this->average_in_progress_date_range_lead,
                $this->total_in_progress_date_range_table_lead
            ] = $this->leadAverageNumberOfInProgressTasks($leadAverageNumberOfInProgressTasks);

            $leadHoursSpentInRevisions = clone $taskWithStartEndDateWithId;
            [
                $this->logged_hours_for_all_submitted,
                $this->logged_hours_in_tasks_with_revisions,
                $this->spent_revision_developer_lead,
                $this->spent_revision_developer_lead_count,
                $this->spent_revision_developer_lead_data,
            ] = $this->leadHoursSpentInRevisions($leadHoursSpentInRevisions);


            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision = clone $taskWithStartEndDateWithId;
            [
                $this->percentage_number_task_cross_estimate_time_lead,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data
            ] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision);

            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions = clone $taskWithStartEndDateWithId;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data
            ] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions);


            $leadPercentageOfTasksWithRevisions = clone $taskWithStartEndDateWithId;
            [
                $this->lead_task_with_revision_total,
                $this->lead_task_with_revision,
                $this->lead_task_with_revision_data,
                $this->percentage_of_tasks_with_revision_lead,
            ] = $this->leadPercentageOfTasksWithRevisions($leadPercentageOfTasksWithRevisions);

            $leadAverageTaskHoldTime = clone $taskWithStartEndDateWithId;
            [
                $this->average_average_task_hold_time_lead,
                $this->average_average_task_hold_time_lead_data
            ] = $this->leadAverageTaskHoldTime($leadAverageTaskHoldTime, $startDate, $endDate);

            $leadCurrentAndPastLimitedTask = clone $taskWithStartEndDateWithId;
            [
                $this->tasks,
                $this->past_tasks
            ] = $this->leadCurrentAndPastLimitedTask($leadCurrentAndPastLimitedTask);

            $html = view('dashboard.ajax.leaddeveloper.month', $this->data)->render();

            return Reply::dataOnly([
                'status' => 'success',
                'html' => $html,
            ]);
        } else {

            // $devId = Auth::id();

            // $startDate = Carbon::parse(request('startDate'))->format('Y-m-d');
            // $endDate = Carbon::parse(request('endDate'))->format('Y-m-d');



            $startDate = Carbon::parse('2024-05-01')->startOfMonth();
            $endDate = Carbon::parse('2024-05-31')->endOfMonth()->addDays(1);

            $this->username_lead = auth()->user()->name;

            $taskHistoryWithDateAndId = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
                ->where('user_id', auth()->id());

            $taskWithId = Task::whereRelation('taskUsers', 'user_id', auth()->id())->whereNull('subtask_id');

            $taskWithStartEndDateWithId = clone $taskWithId;

            $taskWithStartEndDateWithId = $taskWithStartEndDateWithId->whereBetween('created_at', [$startDate, $endDate]);

            $taskWithStartEndDateWithIdWithConfirm = clone $taskWithStartEndDateWithId;

            $taskWithStartEndDateWithIdWithConfirm->where('board_column_id', 4);


            $leadDevNumberOfApprovedTaskByClientInFirstAttempt = clone $taskHistoryWithDateAndId;

            [
                $this->number_of_approved_tasks_on_1st_attempt_by_client,
                $this->number_of_approved_tasks_on_1st_attempt_by_client_data,
            ] = $this->leadDevNumberOfApprovedTaskByClientInFirstAttempt($leadDevNumberOfApprovedTaskByClientInFirstAttempt);

            $leadDevAvgNumberOfAttemptsNeededForApprovalByClient = clone $taskHistoryWithDateAndId;
            [
                $this->avg_number_of_attempts_needed_for_approval_by_client,
                $this->total_number_of_attempts_needed_for_approval_by_client,
                $this->total_number_of_attempts_needed_for_approval_by_client_data,
            ] = $this->leadDevAvgNumberOfAttemptsNeededForApprovalByClient($leadDevAvgNumberOfAttemptsNeededForApprovalByClient);

            $leadNumberOfTasksReceived = clone $taskWithStartEndDateWithId;
            [
                $this->number_of_tasks_received_lead,
                $this->number_of_tasks_received_lead_data
            ] = $this->leadNumberOfTasksReceived($leadNumberOfTasksReceived);


            $leadNumberOfSubmittedTasks = clone $taskHistoryWithDateAndId;
            [
                $this->submit_number_of_tasks_in_this_month_lead,
                $this->submit_number_of_tasks_in_this_month_lead_data
            ] = $this->leadNumberOfSubmittedTasks($leadNumberOfSubmittedTasks);


            $leadNumberOfApprovedTasksOn1stAttemptByProjectManager = clone $taskHistoryWithDateAndId;
            [
                $this->average_submission_approval_by_pm_lead,
                $this->submission_approval_by_pm_lead,
                $this->submission_approval_by_pm_lead_data,
                $this->first_attempt_approve_task_in_this_month_lead,
                $this->first_attempt_approve_task_in_this_month_lead_data
            ] = $this->leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager($leadNumberOfApprovedTasksOn1stAttemptByProjectManager);


            $leadAverageTaskSubmissionTime = clone $taskHistoryWithDateAndId;

            [
                $this->average_submission_day_in_this_month_lead,
                $this->average_task_submit_data
            ] = $this->leadAverageTaskSubmissionTime($leadAverageTaskSubmissionTime);

            //-----------Percentage of tasks where deadline was missed -----------------//

            $leadPercentageOfTasksWhereDeadlineWasMissed = clone $taskHistoryWithDateAndId;
            [
                $this->percentage_of_tasks_deadline_lead,
                $this->estimate_missed_task_data_lead
            ] = $this->leadPercentageOfTasksWhereDeadlineWasMissed($leadPercentageOfTasksWhereDeadlineWasMissed);

            $leadNumberOfApproval = clone $taskHistoryWithDateAndId;
            [
                $this->number_of_approval,
                $this->number_of_approval_data,
                $this->auto_approved_tasks,
                $this->auto_approved_tasks_data,
                $this->manually_approved_tasks,
                $this->manually_approved_tasks_data,
                $this->manually_approved_task_ids
            ] = $this->leadNumberOfApproval($leadNumberOfApproval);


            $disputes_involved_in_lead_dev_without_date = TaskRevisionDispute::with(
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'disputeWinner',
                'raisedAgainst',
                'raisedBy'
            )->where(function ($query) {
                $query->where('raised_by', auth()->id())
                    ->orWhere('raised_against', auth()->id());
            })->select(
                    'id',
                    'task_id',
                    'winner',
                    'raised_by_percent',
                    'raised_against_percent',
                    'raised_by',
                    'raised_against',
                    'created_at'
                );

            $disputes_involved_in_lead_dev_with_date = clone $disputes_involved_in_lead_dev_without_date;

            $disputes_involved_in_lead_dev_with_date = $disputes_involved_in_lead_dev_with_date->whereBetween('created_at', [$startDate, $endDate]);


            $leadNumberOfDisputesInvolvedIn = clone $disputes_involved_in_lead_dev_with_date;
            [
                $this->disputes_lead_developer_involved,
                $this->disputes_lead_developer_involved_data
            ] = $this->leadNumberOfDisputesInvolvedIn($leadNumberOfDisputesInvolvedIn);

            $leadNoOfDisputesFiledLoseOverall = clone $disputes_involved_in_lead_dev_without_date;
            [
                $this->number_of_dispute_filed_own_overall_lead,
                $this->number_of_dispute_filed_own_overall_lead_data,
                $this->number_of_dispute_lose_own_overall_lead,
                $this->number_of_dispute_lose_own_overall_lead_data
            ] = $this->leadNoOfDisputesFiledLoseOverall($leadNoOfDisputesFiledLoseOverall);

            $leadNoOfDisputesFiledLose = clone $disputes_involved_in_lead_dev_with_date;
            [
                $this->number_of_dispute_filed_own_lead,
                $this->number_of_dispute_filed_own_lead_data,
                $this->number_of_dispute_lose_own_lead,
                $this->number_of_dispute_lose_own_lead_data
            ] = $this->leadNoOfDisputesFiledLose($leadNoOfDisputesFiledLose);


            $leadAverageNumberOfInProgressTasks = clone $taskWithId;

            [
                $this->avg_number_of_in_progress_task,
                $this->total_number_in_task_lead_from_in_pro,
                $this->average_in_progress_date_range_lead,
                $this->total_in_progress_date_range_table_lead
            ] = $this->leadAverageNumberOfInProgressTasks($leadAverageNumberOfInProgressTasks);

            $leadHoursSpentInRevisions = clone $taskHistoryWithDateAndId;
            [
                $this->logged_hours_for_all_submitted,
                $this->logged_hours_in_tasks_with_revisions,
                $this->spent_revision_developer_lead,
                $this->spent_revision_developer_lead_count,
                $this->spent_revision_developer_lead_data,
            ] = $this->leadHoursSpentInRevisions($leadHoursSpentInRevisions);


            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision = clone $taskHistoryWithDateAndId;
            [
                $this->percentage_number_task_cross_estimate_time_lead,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data
            ] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision);

            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions = clone $taskHistoryWithDateAndId;
            [
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data
            ] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions);


            $leadPercentageOfTasksWithRevisions = clone $taskHistoryWithDateAndId;
            [
                $this->lead_task_with_revision_total,
                $this->lead_task_with_revision,
                $this->lead_task_with_revision_data,
                $this->percentage_of_tasks_with_revision_lead,
            ] = $this->leadPercentageOfTasksWithRevisions($leadPercentageOfTasksWithRevisions);

            $leadAverageTaskHoldTime = clone $taskWithStartEndDateWithId;
            [
                $this->average_average_task_hold_time_lead,
                $this->average_average_task_hold_time_lead_data
            ] = $this->leadAverageTaskHoldTime($leadAverageTaskHoldTime, $startDate, $endDate);

            $leadCurrentAndPastLimitedTask = clone $taskWithStartEndDateWithId;
            [
                $this->tasks,
                $this->past_tasks
            ] = $this->leadCurrentAndPastLimitedTask($leadCurrentAndPastLimitedTask);

            return view('dashboard.employee.lead', $this->data);
        }
    }

    private function leadNumberOfTasksReceived($taskWithStartEndDateWithId)
    {
        $number_of_tasks_received_lead_data = $taskWithStartEndDateWithId
            ->select('id', 'heading', 'project_id', 'created_at', 'status', 'start_date', 'board_column_id')
            ->with(
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'stat:id,label_color,column_name',
                'oldestSubTask'
            )->get();
        return [
            $number_of_tasks_received_lead_data->count(),
            $number_of_tasks_received_lead_data,
        ];
    }

    private function leadNumberOfSubmittedTasks($taskWithStartEndDateWithId)
    {
        $submit_number_of_tasks_lead_dev_data = $taskWithStartEndDateWithId
            ->whereHas('task', function ($q) {
                $q->whereNull('subtask_id');
            })
            ->where('board_column_id', 6)
            ->with(
                'task.stat:id,label_color,column_name',
                'task.oldestSubTask',
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
            )
            ->select('id', 'task_id', 'created_at', 'board_column_id')
            ->groupBy('task_id')
            ->get();

        return [
            $submit_number_of_tasks_lead_dev_data->count(),
            $submit_number_of_tasks_lead_dev_data,
        ];
    }

    private function leadDevNumberOfApprovedTaskByClientInFirstAttempt($taskHistoryWithDateAndId)
    {

        $task_ids = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 6)->get()->pluck('task_id')->toArray();


        $number_of_approved_tasks = Task::with(
            'stat:id,label_color,column_name',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'latestTaskSubmission:id,task_id,created_at',
            'latestTaskApprove:id,task_id,created_at',
            'revisions.taskRevisionDispute',
        )->select('id', 'created_at', 'due_date', 'heading', 'board_column_id', 'project_id')->whereIn('id', $task_ids);

        $task_with_revisions = clone $number_of_approved_tasks;

        $task_with_revisions = $task_with_revisions->has('revisions')->get();
        $task_id_array = [];
        $task_id_client_array = [];
        foreach ($task_with_revisions as $task_with_revision) {
            $totalRevisionsCount = 0;
            $isResponsibleCount = 0;
            $totalClientCount = 0;
            $clientCount = 0;
            foreach ($task_with_revision->revisions as $revision) {
                if ($revision->final_responsible_person == 'PM' && $revision->dispute_between == 'PLR') {

                    $isResponsibleCount++;

                } elseif (
                    ($revision->dispute_between == 'PLR') &&
                    $revision?->taskRevisionDispute?->raised_against_percent &&
                    ($revision?->taskRevisionDispute?->raised_against_percent > 50)
                ) {
                    $isResponsibleCount++;
                }
                // elseif ($revision->final_responsible_person == 'C' && $revision->dispute_between == 'CPR') {
                //     $clientCount++;
                // }
                if ($revision->dispute_between == 'PLR') {
                    $totalRevisionsCount++;
                }
                // if ($revision->dispute_between == 'CPR') {
                //     $totalClientCount++;
                // }
                if (!$revision->final_responsible_person) {
                    $totalRevisionsCount--;
                }
            }
            if ($isResponsibleCount != $totalRevisionsCount) {
                array_push($task_id_array, $task_with_revision->id);
            }
            if ($clientCount != $totalClientCount) {
                array_push($task_id_client_array, $task_with_revision->id);
            }
        }

        $number_of_approved_tasks_on_1st_attempt_by_client_data = $number_of_approved_tasks->doesntHave('revisions')->orWhereIn('id', $task_id_array)->get();

        return [
            $number_of_approved_tasks_on_1st_attempt_by_client_data->count(),
            $number_of_approved_tasks_on_1st_attempt_by_client_data
        ];
    }

    private function leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager($taskHistoryWithDateAndId)
    {
        $number_of_approved_tasks_by_project_manager_date = $taskHistoryWithDateAndId
            ->with(
                'task.stat:id,label_color,column_name',
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'task.latestTaskSubmission:id,task_id,created_at',
                'task.latestTaskApprove:id,task_id,created_at',
            )->whereHas('task', function ($q) {
                $q->whereNull('subtask_id');
            })->where('board_column_id', 6)
            ->whereRelation('task', 'board_column_id', 4)
            ->groupBy('task_id')
            ->select('id', 'task_id', 'user_id', 'created_at', 'board_column_id', DB::raw('COUNT(*) as total_submitted'))
            ->get();

        // Dispute
        $dispute_win_lead_dev = 0;
        $task_revisions = TaskRevision::with('taskRevisionDispute')->whereIn('task_id', $number_of_approved_tasks_by_project_manager_date->pluck('task_id')->toArray())
            ->Where('dispute_between', 'PLR')
            ->get();

        foreach ($task_revisions as $task_revision) {
            if ($task_revision->final_responsible_person == 'FM') {
                $dispute_win_lead_dev++;
            } elseif ($task_revision?->taskRevisionDispute?->raised_against_percent && ($task_revision?->taskRevisionDispute?->raised_against_percent < 50)) {
                $dispute_win_lead_dev++;
            }
        }
        // Dispute

        $number_of_approved_tasks_on_1st_attempt_by_project_manager_date = clone $taskHistoryWithDateAndId;

        $total_attempts = $number_of_approved_tasks_by_project_manager_date->sum('total_submitted') - $dispute_win_lead_dev;
        if ($total_attempts) {
            $average_number_of_attempts_needed = round($total_attempts / $number_of_approved_tasks_by_project_manager_date->count(), 2);
        }

        $number_of_approved_tasks_on_1st_attempt_by_project_manager_date = $number_of_approved_tasks_on_1st_attempt_by_project_manager_date->doesntHave('revision')->get();

        return [
            $average_number_of_attempts_needed ?? 0,
            $number_of_approved_tasks_by_project_manager_date->count(),
            $number_of_approved_tasks_by_project_manager_date,
            $number_of_approved_tasks_on_1st_attempt_by_project_manager_date->count(),
            $number_of_approved_tasks_on_1st_attempt_by_project_manager_date,
        ];
    }

    private function leadDevAvgNumberOfAttemptsNeededForApprovalByClient($taskHistoryWithDateAndId)
    {
        $task_ids = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)
            ->get()->pluck('task_id')->toArray();

        $number_of_attempts_needed_for_approval_by_client = Task::doesntHave('revisions')
            ->orWhere(function ($query) use ($task_ids) {
                $query->whereIn('id', $task_ids)
                    ->whereHas('revisions', function (Builder $query) {
                        $query->where('final_responsible_person', '=', 'LD')
                            // ->where('is_accept', 0)
                            ->where('dispute_between', 'PLR')
                            ->orWhere(function ($q) {
                                $q->has('taskRevisionDispute')
                                    ->whereRelation('taskRevisionDispute', 'raised_against_percent', '<', 50);
                            });
                    });
            })
            ->withCount([
                'revisions as only_responsible_revisions_count' => function ($query) {
                    $query->where('final_responsible_person', '=', 'LD')
                        // ->where('is_accept', 0)
                        ->where('dispute_between', 'PLR')
                        ->orWhere(function ($q) {
                            $q->has('taskRevisionDispute')
                                ->whereRelation('taskRevisionDispute', 'raised_against_percent', '<', 50);
                        });
                }
            ])
            ->with(
                'taskType:id,task_id,task_type,page_type',
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'stat:id,label_color,column_name',
                'latestTaskApprove:id,task_id,created_at',
                'latestTaskSubmission:id,task_id,created_at',
                'taskUser'
            )->find($task_ids);

        $total_attempts = $number_of_attempts_needed_for_approval_by_client->sum('only_responsible_revisions_count') + $number_of_attempts_needed_for_approval_by_client->count();
        $avg_no_attempts = 0;
        if ($total_attempts) {
            $avg_no_attempts = round($total_attempts / $number_of_attempts_needed_for_approval_by_client->count(), 2);
        }

        return [
            $avg_no_attempts,
            $total_attempts,
            $number_of_attempts_needed_for_approval_by_client,
        ];
    }

    private function leadPercentageOfTasksWithRevisions($taskHistoryWithDateAndId)
    {

        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)
            ->get()->pluck('task_id')->toArray();


        $allTask = Task::with(
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions:id,task_id,final_responsible_person,dispute_between',
            'revisions.taskRevisionDispute:id,revision_id,task_id,raised_against_percent',
        )->whereHas('history', function (Builder $query) {
            $query->where('board_column_id', 6);
        })->whereIn('id', $task_id);

        $number_of_tasks_completed_model = clone $allTask;
        $number_of_tasks_with_revision_completed_model = clone $allTask;

        $number_of_tasks_completed_model = $number_of_tasks_completed_model->select('id', 'created_at', 'heading', 'board_column_id', 'project_id')->get();

        $number_of_tasks_with_revision_completed_model = $number_of_tasks_with_revision_completed_model
            ->withCount([
                'revisions' => function ($query) {
                    $query->where('final_responsible_person', '=', 'LD')
                        ->where('dispute_between', 'PLR')
                        ->orWhere(function ($q) {
                            $q->has('taskRevisionDispute')
                                ->whereRelation('taskRevisionDispute', 'raised_against_percent', '<', 50);
                        });
                }
            ])->whereHas('revisions', function (Builder $query) {
                $query->where('final_responsible_person', '=', 'LD')
                    ->where('dispute_between', 'PLR')
                    ->orWhere(function ($q) {
                        $q->has('taskRevisionDispute')
                            ->whereRelation('taskRevisionDispute', 'raised_against_percent', '<', 50);
                    });
            })->get();

        $total_revisions_count = $number_of_tasks_with_revision_completed_model->sum('revisions_count') ?? 0;
        $task_with_revisions = $number_of_tasks_with_revision_completed_model->count();

        $percentage_of_tasks_with_revision = 0;
        if ($number_of_tasks_completed_model->count()) {
            $percentage_of_tasks_with_revision = round(($task_with_revisions / $number_of_tasks_completed_model->count()) * 100, 2);
        }

        return [
            $total_revisions_count,
            $number_of_tasks_with_revision_completed_model->count(),
            $number_of_tasks_with_revision_completed_model,
            $percentage_of_tasks_with_revision,
        ];
    }

    private function leadAverageTaskSubmissionTime($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 6)
            ->get()->pluck('task_id')->toArray();

        $average_task_submission_time_data = Task::has('firstHistoryForDevReview')
            ->with(
                'firstHistoryForDevReview',
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'historyForReviews:id,task_id,created_at'
            )->select('id', 'created_at', 'heading', 'board_column_id', 'project_id')->find($task_id);


        $days = [];
        $total_days = 0;
        foreach ($average_task_submission_time_data as $task) {

            $diffInMinutes = $task->firstHistoryForDevReview->created_at->diffInMinutes($task->created_at);

            $diffInDays = round($diffInMinutes / 1440, 2);
            $total_days += $diffInDays;
            array_push($days, $diffInDays);
        }

        $average_task_submission_time = 0;
        if ($total_days) {
            $average_task_submission_time = round($total_days / $average_task_submission_time_data->count());
        }

        return [
            $average_task_submission_time,
            $average_task_submission_time_data
        ];
    }
    private function leadAverageNumberOfInProgressTasks($taskWithId)
    {

        $total_task_found = $taskWithId->count();
        $total_task_found_with_in_pro = $taskWithId->whereIn('board_column_id', [3, 2]);
        $total_task_found_with_in_pro = $total_task_found_with_in_pro->count();
        $number_of_in_progress_task_data = $taskWithId->select('id', DB::raw("DATE_FORMAT(created_at, '%b-%d-%Y') as created_at_raw"))
            ->get()->groupBy('created_at_raw');

        $avg_number_of_in_progress_task = 0;
        if ($total_task_found_with_in_pro) {
            $avg_number_of_in_progress_task = round($total_task_found / $total_task_found_with_in_pro, 2);
        }

        return [
            $avg_number_of_in_progress_task,
            $total_task_found,
            $total_task_found_with_in_pro,
            $number_of_in_progress_task_data,
        ];
    }

    private function leadAverageTaskHoldTime($taskWithStartEndDateWithId, $startDate, $endDate)
    {

        // $startDate = Carbon::parse('2024-05-01')->startOfMonth();
        // $endDate = Carbon::parse('2024-05-31')->endOfMonth()->addDays(1);

        // $assign_phase = DB::table('tasks')
        //     ->join('task_users', 'tasks.id', '=', 'task_users.task_id')
        //     ->whereDate('tasks.created_at', '>=', $startDate)
        //     ->whereDate('tasks.created_at', '<', $endDate)
        //     ->whereNull('tasks.subtask_id')
        //     ->where('task_users.user_id', $devId)
        //     ->select('tasks.id', 'tasks.created_at')
        //     ->groupBy('tasks.id')
        //     ->get();

        $average_hold_time_formatted_data = $taskWithStartEndDateWithId
            ->with(
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'oldestSubTask',
            )
            ->has('oldestSubTask')
            ->get();

        $time = 0;
        $task = [];

        foreach ($average_hold_time_formatted_data as $i1) {
            // dd($i1);
            // $assign_date = DB::table('sub_tasks')
            //     ->where('sub_tasks.task_id', '=', $i1->id)
            //     ->select('sub_tasks.id', 'sub_tasks.created_at')
            //     ->groupBy('sub_tasks.task_id')
            //     ->first();
            // dd($assign_date);

            $assign_date = $i1->oldestSubTask;

            if ($assign_date != NULL) {
                $startDateTime = new DateTime($i1->created_at);
                $endDateTime = new DateTime($assign_date->created_at);
                // dump($startDateTime . '_' . $endDateTime);
                // dump($i1->created_at, $assign_date->created_at, $startDateTime, $endDateTime);
                // dump($startDateTime, $endDateTime);
                // Ensure the end date is greater than the start date
                if ($endDateTime <= $startDateTime) {
                    // Handle invalid date range
                    echo "Invalid date range!";
                } else {
                    // Initialize the total time difference
                    $totalTimeSeconds = 0;

                    // Iterate over each day between start and end
                    $currentDate = clone $startDateTime;
                    // dd($currentDate->format('Y-m-d'), $endDateTime->format('Y-m-d'));
                    // dump($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d'), $currentDate->format('Y-m-d'), $endDateTime->format('Y-m-d'));
                    if ($currentDate->format('Y-m-d') == $endDateTime->format('Y-m-d')) {
                        // dd($currentDate, $endDateTime ,$currentDate->diff($endDateTime));
                        $timeDifference = $currentDate->diff($endDateTime);
                        // dump($timeDifference);
                        $totalTimeSeconds += $timeDifference->s + ($timeDifference->i * 60) + ($timeDifference->h * 3600);
                        $currentDate = $endDateTime;
                    } else {
                        // dump($currentDate < $endDateTime, $currentDate, $endDateTime, $assign_date->task_id);
                        // dd($currentDate , $endDateTime, $currentDate < $endDateTime);
                        while ($currentDate < $endDateTime) {
                            // Check if the current date falls within an exclusion period

                            $currentTime = $currentDate->format('H:i:s');
                            // dump($currentTime, ($currentTime >= '18:00:00' && $currentTime < '8:00:00') || (($currentDate->format('l')) == 'Sunday'));
                            if (($currentTime >= '18:00:00' && $currentTime < '8:00:00') || (($currentDate->format('l')) == 'Sunday')) {
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
                    }

                    // Convert total time from seconds to minutes
                    $totalTimeMinutes = $totalTimeSeconds / 60;
                    array_push($task, $totalTimeMinutes);
                    //    array_push($task,$i1->id,$i1->created_at, $assign_date->created_at,$totalTimeMinutes);
                }
            }
        }

        $average_hold_time = 0;
        $total = 0;
        foreach ($task as $i1) {
            $average_hold_time += $i1;
            $total++;
        }
        if ($average_hold_time) {
            $avg_minutes = $average_hold_time / $total;

            $days = floor($avg_minutes / 1440);
            $hours = floor(($avg_minutes - $days * 1440) / 60);
            $minutes = $avg_minutes - ($days * 1440) - ($hours * 60);
        } else {
            $days = 0;
            $hours = 0;
            $minutes = 0;
        }

        $average_hold_time_formatted = sprintf('%d days, %02d hours, %02d minutes', $days, $hours, $minutes);

        return [
            $average_hold_time_formatted,
            $average_hold_time_formatted_data
        ];

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
        $taskId = [];
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
            $taskId[] = $task_id;
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
        $ind = 0;
        foreach ($final as $i1) {
            if ($i1 != NULL) {
                $average_hold_time += $i1;
                $ind++;
                $total++;
            }
        }
        dd($ind, $average_hold_time, $final, $total);
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

        $average_hold_time_formatted_data = Task::with('project.pm', 'project.client', 'oldestSubTask')->find($taskId);
        // dd($totalDuration);
        return [
            $average_hold_time_formatted,
            $average_hold_time_formatted_data
        ];
    }

    private function leadPercentageOfTasksWhereDeadlineWasMissed($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)->get()->pluck('task_id')->toArray();

        $completed_tasks_by_lead_developer = Task::with(
            'firstHistoryForDevReview',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
        )->find($task_id);

        $percentage_of_tasks_where_deadline_was_missed_data = [];

        foreach ($completed_tasks_by_lead_developer as $task) {
            if (!Carbon::parse($task->due_date)->greaterThanOrEqualTo(Carbon::parse($task->firstHistoryForDevReview->created_at)->toDateString())) {
                array_push($percentage_of_tasks_where_deadline_was_missed_data, $task);
            }
        }

        $percentage_of_tasks_where_deadline_was_missed = 0;
        if (count($percentage_of_tasks_where_deadline_was_missed_data)) {
            $percentage_of_tasks_where_deadline_was_missed = round((count($percentage_of_tasks_where_deadline_was_missed_data) / $completed_tasks_by_lead_developer->count()) * 100, 2);
        }

        return [
            $percentage_of_tasks_where_deadline_was_missed,
            $percentage_of_tasks_where_deadline_was_missed_data
        ];
    }
    private function leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($taskHistoryWithDateAndId)
    {

        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)->get()->pluck('task_id')->toArray();

        $completed_tasks_by_lead_developer = Task::with(
            'taskSubTasks.timeLogged',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'timeLogged',
        )->withSum('timeLogged', 'total_minutes')->find($task_id);

        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data = [];
        foreach ($completed_tasks_by_lead_developer as $task) {
            $total_sub_task_log_time = $task->taskSubTasks->sum('total_log_time_in_min');
            $total_task_log_time = $total_sub_task_log_time + $task->time_logged_sum_total_minutes;
            if ($total_task_log_time > $task->total_estimate_minutes) {
                array_push($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data, $task);
            }
        }

        $number_task_cross_estimate_time = count($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data);
        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = 0;
        if ($completed_tasks_by_lead_developer->count()) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = round(($number_task_cross_estimate_time / $completed_tasks_by_lead_developer->count()) * 100, 2);
        }

        return [
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
            count($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data),
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data
        ];
    }
    private function leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions($taskHistoryWithDateAndId)
    {

        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)->get()->pluck('task_id')->toArray();

        $completed_tasks_by_lead_developer = Task::with(
            'taskSubTasks.timeLoggedWithoutRevision',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'timeLogged'
        )->withSum('timeLoggedWithoutRevision', 'total_minutes')->find($task_id);

        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data = [];
        foreach ($completed_tasks_by_lead_developer as $task) {
            $total_sub_task_log_time = $task->taskSubTasks->sum('total_log_time_without_revision_in_min');
            $total_task_log_time = $total_sub_task_log_time + $task->time_logged_without_revision_sum_total_minutes;
            if ($total_task_log_time > ($task->estimate_hours * 60 + $task->total_estimate_minutes)) {
                array_push($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data, $task);
            }
        }

        $number_task_cross_estimate_time = count($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data);
        $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = 0;
        if ($completed_tasks_by_lead_developer->count()) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = round(($number_task_cross_estimate_time / $completed_tasks_by_lead_developer->count()) * 100, 2);
        }


        return [
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
            $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data
        ];
    }

    private function leadNoOfDisputesFiledLoseOverall($disputes_involved_in_lead_dev_without_date)
    {
        $disputes_filed_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
            ->where('raised_by', '=', auth()->id())
            ->get();

        $disputes_lost_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
            ->where('winner', '!=', auth()->id())
            ->get();

        return [
            $disputes_filed_by_lead_dev_overall_data->count(),
            $disputes_filed_by_lead_dev_overall_data,
            $disputes_lost_by_lead_dev_overall_data->count(),
            $disputes_lost_by_lead_dev_overall_data
        ];
    }
    private function leadNoOfDisputesFiledLose($disputes_involved_in_lead_dev_with_date)
    {
        $disputes_filed_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
            ->where('raised_by', '=', auth()->id())
            ->get();

        $disputes_lost_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
            ->where('winner', '!=', auth()->id())
            ->get();

        return [
            $disputes_filed_by_lead_dev_data->count(),
            $disputes_filed_by_lead_dev_data,
            $disputes_lost_by_lead_dev_data->count(),
            $disputes_lost_by_lead_dev_data
        ];
    }
    private function leadNumberOfDisputesInvolvedIn($number_of_disputes_involved_in_lead_dev)
    {
        return [
            $number_of_disputes_involved_in_lead_dev->count(),
            $number_of_disputes_involved_in_lead_dev->get()
        ];
    }

    private function leadHoursSpentInRevisions($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 4)->get()->pluck('task_id')->toArray();

        $parent_task_wise_total_hours_spent_in_revisions_data = Task::has('revisions')
            ->with([
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'taskSubTasks.timeLoggedOnlyRevision',
                'taskSubTasks.submissions.timeLogs',
                'taskSubTasks.timeLogged',
                'taskSubTasks.firstTaskSubmission' => function ($query) {
                    $query->withSum('timeLogs', 'total_minutes');
                },
                'taskSubTasks.revisions' => function ($query) {
                    $query->withSum('timeLogs', 'total_minutes');
                },
                'taskUser',
            ])
            ->withSum('timeLoggedOnlyRevision', 'total_minutes')
            ->find($task_id);

        $parent_task_wise_total_mins_spent_in_revisions = 0;
        $logged_min_for_all_submitted = 0;
        $logged_min_in_tasks_with_revisions = 0;
        foreach ($parent_task_wise_total_hours_spent_in_revisions_data as $task) {
            $subTask = clone $task->taskSubTasks;
            $total_sub_task_log_time = $subTask->sum('total_log_time_only_revision_in_min');
            $parent_task_wise_total_mins_spent_in_revisions += $total_sub_task_log_time + $task->time_logged_only_revision_sum_total_minutes;
            $logged_min_for_all_submitted += $subTask->sum('total_submissions_log_time_in_min');
            $logged_min_in_tasks_with_revisions += $subTask->sum('total_log_time_in_min');
        }


        $logged_hours_for_all_submitted = intdiv($logged_min_for_all_submitted, 60) . ' Hours, ' . ($logged_min_for_all_submitted % 60) . ' Minutes';
        $logged_hours_in_tasks_with_revisions = intdiv($logged_min_in_tasks_with_revisions, 60) . ' Hours, ' . ($logged_min_in_tasks_with_revisions % 60) . ' Minutes';
        $parent_task_wise_total_hours_spent_in_revisions = intdiv($parent_task_wise_total_mins_spent_in_revisions, 60) . ' Hours, ' . ($parent_task_wise_total_mins_spent_in_revisions % 60) . ' Minutes';

        return [
            $logged_hours_for_all_submitted,
            $logged_hours_in_tasks_with_revisions,
            $parent_task_wise_total_hours_spent_in_revisions ?? 0,
            $parent_task_wise_total_hours_spent_in_revisions_data->count(),
            $parent_task_wise_total_hours_spent_in_revisions_data
        ];
    }
    private function leadNumberOfApproval($taskHistoryWithDateAndId)
    {

        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNotNull('subtask_id');
        })->where('board_column_id', 8)
            ->groupBy('task_id')
            ->select('task_id')
            ->get()->pluck('task_id')->toArray();

        $number_of_approval_data = Task::with(
            'TaskApproves',
            'firstHistoryForLeadDevApproval',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'oldestSubTask',
            'latestTaskApprove:id,task_id,created_at',
        )->has('firstHistoryForLeadDevApproval')->find($task_id);

        $manually_approved_tasks_data = [];
        $manually_approved_tasks_array = [];
        $auto_approved_tasks_data = [];
        foreach ($number_of_approval_data as $task) {

            $approveDate = date('Y-m-d', strtotime($task->firstHistoryForLeadDevApproval->created_at));

            $approve = $task->TaskApproves()->whereDate('created_at', $approveDate)->where('user_id', auth()->id())->first();

            if ($approve != NULL) {
                array_push($manually_approved_tasks_data, $task);
                array_push($manually_approved_tasks_array, $task->id);
            } else {
                array_push($auto_approved_tasks_data, $task);
            }
        }

        return [
            $number_of_approval_data->count(),
            $number_of_approval_data,
            count($auto_approved_tasks_data),
            $auto_approved_tasks_data,
            count($manually_approved_tasks_data),
            $manually_approved_tasks_data,
            $manually_approved_tasks_array
        ];
    }

    private function leadCurrentAndPastLimitedTask($taskWithStartEndDateWithId)
    {
        $tasks = $taskWithStartEndDateWithId->with(
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'latestTaskSubmission',
            'stat:id,label_color,column_name',
        )->orderBy('created_at', 'desc')
            ->limit(200)->get();

        $past_tasks = $taskWithStartEndDateWithId
            ->whereNotIn('board_column_id', [2, 3])
            ->limit(200)->get();

        return [
            $tasks,
            $past_tasks,
        ];
    }
}
