<?php

namespace App\Traits;

use Carbon\Carbon;
use App\Models\Task;
use App\Helper\Reply;
use Nette\Utils\DateTime;
use App\Models\TaskHistory;
use App\Models\TaskRevision;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Models\TaskRevisionDispute;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Validator;

trait LeadDashboard
{

    public function leadDashboard()
    {
        return view('dashboard.employee.lead', $this->data);
    }
    public function leadDashboardApi()
    {
        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date'   => 'date|after:start_date',
        ]);

        ini_set('max_execution_time', 180);
        if ($validator->fails()) {
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $LeadDevId = auth()->id();
            $tableType = request('start_date');

            if (request('start_date') && request('end_date')) {
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            } else {
                $startDate = Carbon::now()->endOfMonth()->format('Y-m-d');
                $endDate = Carbon::now()->endOfDay()->format('Y-m-d');
            }

            $this->username_lead = auth()->user()->name;

            // Retrieve task history within the specified date range and for the given lead developer
            $taskHistoryWithDateAndId = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
                ->where('user_id', $LeadDevId);

            // Retrieve tasks assigned to the lead developer, excluding subtasks
            $taskWithId = Task::whereRelation('taskUsers', 'user_id', $LeadDevId)
                ->whereNull('subtask_id');

            // Clone the tasks query for filtering by creation date
            $taskWithStartEndDateWithId = clone $taskWithId;
            $taskWithStartEndDateWithId->whereBetween('created_at', [$startDate, $endDate]);


            $leadDashboardApi = [];

            $leadDevNumberOfApprovedTaskByClientInFirstAttempt = clone $taskHistoryWithDateAndId;

            $this->number_of_approved_tasks_on_1st_attempt_by_client = $this->leadDevNumberOfApprovedTaskByClientInFirstAttempt($leadDevNumberOfApprovedTaskByClientInFirstAttempt);

            $leadDashboardApi += [
                'number_of_approved_tasks_on_1st_attempt_by_client' => $this->number_of_approved_tasks_on_1st_attempt_by_client,
            ];

            $leadDevAvgNumberOfAttemptsNeededForApprovalByClient = clone $taskHistoryWithDateAndId;
            [
                $this->avg_number_of_attempts_needed_for_approval_by_client,
                $this->total_number_of_attempts_needed_for_approval_by_client,
            ] = $this->leadDevAvgNumberOfAttemptsNeededForApprovalByClient($leadDevAvgNumberOfAttemptsNeededForApprovalByClient);

            $leadDashboardApi += [
                'avg_number_of_attempts_needed_for_approval_by_client'   => $this->avg_number_of_attempts_needed_for_approval_by_client,
                'total_number_of_attempts_needed_for_approval_by_client' => $this->total_number_of_attempts_needed_for_approval_by_client,
            ];

            $leadNumberOfTasksReceived = clone $taskWithStartEndDateWithId;
            $this->number_of_tasks_received_lead_data_count = $this->leadNumberOfTasksReceived($leadNumberOfTasksReceived);

            $leadDashboardApi += [
                'number_of_tasks_received_lead_data_count' => $this->number_of_tasks_received_lead_data_count,
            ];

            $leadNumberOfSubmittedTasks = clone $taskHistoryWithDateAndId;

            $this->submit_number_of_tasks_in_this_month_lead = $this->leadNumberOfSubmittedTasks($leadNumberOfSubmittedTasks, $startDate, $endDate);


            $leadDashboardApi += [
                'submit_number_of_tasks_in_this_month_lead' => $this->submit_number_of_tasks_in_this_month_lead,
            ];

            $leadNumberOfApprovedTasksOn1stAttemptByProjectManager = clone $taskHistoryWithDateAndId;
            [
                $this->average_submission_approval_by_pm_lead,
                $this->submission_approval_by_pm_lead,
                $this->first_attempt_approve_task_in_this_month_lead,
            ] = $this->leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager($leadNumberOfApprovedTasksOn1stAttemptByProjectManager);

            $leadDashboardApi += [
                'average_submission_approval_by_pm_lead'        => $this->average_submission_approval_by_pm_lead,
                'submission_approval_by_pm_lead'                => $this->submission_approval_by_pm_lead,
                'first_attempt_approve_task_in_this_month_lead' => $this->first_attempt_approve_task_in_this_month_lead,
            ];


            $leadAverageTaskSubmissionTime = clone $taskHistoryWithDateAndId;
            $this->average_submission_day_in_this_month_lead = $this->leadAverageTaskSubmissionTime($leadAverageTaskSubmissionTime);

            $leadDashboardApi += [
                'average_submission_day_in_this_month_lead' => $this->average_submission_day_in_this_month_lead,
            ];

            //-----------Percentage of tasks where deadline was missed -----------------//

            $leadPercentageOfTasksWhereDeadlineWasMissed = clone $taskHistoryWithDateAndId;
            $this->percentage_of_tasks_deadline_lead = $this->leadPercentageOfTasksWhereDeadlineWasMissed($leadPercentageOfTasksWhereDeadlineWasMissed);

            $leadDashboardApi += [
                'percentage_of_tasks_deadline_lead' => $this->percentage_of_tasks_deadline_lead,
            ];


            $leadNumberOfApproval = clone $taskHistoryWithDateAndId;
            [
                $this->number_of_approval,
                $this->auto_approved_tasks,
                $this->manually_approved_tasks,
            ] = $this->leadNumberOfApproval($leadNumberOfApproval, $LeadDevId);

            $leadDashboardApi += [
                'number_of_approval'      => $this->number_of_approval,
                'auto_approved_tasks'     => $this->auto_approved_tasks,
                'manually_approved_tasks' => $this->manually_approved_tasks,
            ];

            $disputes_involved_in_lead_dev_without_date = TaskRevisionDispute::with(
                'task:id,created_at,due_date,heading,board_column_id,project_id',
                'task.project:id,pm_id,client_id',
                'task.project.client:id,name',
                'task.project.pm:id,name',
                'disputeWinner',
                'raisedAgainst',
                'raisedBy'
            )->where(function ($query) use ($LeadDevId) {
                $query->where('raised_by', $LeadDevId)
                    ->orWhere('raised_against', $LeadDevId);
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

            $this->disputes_lead_developer_involved = $this->leadNumberOfDisputesInvolvedIn($leadNumberOfDisputesInvolvedIn);

            $leadDashboardApi += [
                'disputes_lead_developer_involved' => $this->disputes_lead_developer_involved,
            ];



            $leadNoOfDisputesFiledLoseOverall = clone $disputes_involved_in_lead_dev_without_date;
            [
                $this->number_of_dispute_filed_own_overall_lead,
                $this->number_of_dispute_lose_own_overall_lead,
            ] = $this->leadNoOfDisputesFiledLoseOverall($leadNoOfDisputesFiledLoseOverall, $LeadDevId);

            $leadDashboardApi += [
                'number_of_dispute_filed_own_overall_lead' => $this->number_of_dispute_filed_own_overall_lead,
                'number_of_dispute_lose_own_overall_lead'  => $this->number_of_dispute_lose_own_overall_lead,
            ];


            $leadNoOfDisputesFiledLose = clone $disputes_involved_in_lead_dev_with_date;
            [
                $this->number_of_dispute_filed_own_lead,
                $this->number_of_dispute_lose_own_lead,
            ] = $this->leadNoOfDisputesFiledLose($leadNoOfDisputesFiledLose, $LeadDevId);

            $leadDashboardApi += [
                'number_of_dispute_filed_own_lead' => $this->number_of_dispute_filed_own_lead,
                'number_of_dispute_lose_own_lead'  => $this->number_of_dispute_lose_own_lead,
            ];



            $leadAverageNumberOfInProgressTasks = clone $taskWithId;
            [
                $this->avg_number_of_in_progress_task,
                $this->total_number_in_task_lead_from_in_pro,
                $this->average_in_progress_date_range_lead,
            ] = $this->leadAverageNumberOfInProgressTasks($leadAverageNumberOfInProgressTasks);

            $leadDashboardApi += [
                'avg_number_of_in_progress_task'        => $this->avg_number_of_in_progress_task,
                'total_number_in_task_lead_from_in_pro' => $this->total_number_in_task_lead_from_in_pro,
                'average_in_progress_date_range_lead'   => $this->average_in_progress_date_range_lead,
            ];


            $leadHoursSpentInRevisions = clone $taskHistoryWithDateAndId;
            [
                $this->logged_hours_for_all_submitted,
                $this->logged_hours_in_tasks_with_revisions,
                $this->spent_revision_developer_lead,
                $this->spent_revision_developer_lead_count,
            ] = $this->leadHoursSpentInRevisions($leadHoursSpentInRevisions);

            $leadDashboardApi += [
                'logged_hours_for_all_submitted'       => $this->logged_hours_for_all_submitted,
                'logged_hours_in_tasks_with_revisions' => $this->logged_hours_in_tasks_with_revisions,
                'spent_revision_developer_lead'        => $this->spent_revision_developer_lead,
                'spent_revision_developer_lead_count'  => $this->spent_revision_developer_lead_count,
            ];


            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision = clone $taskHistoryWithDateAndId;
            [
                $this->percentage_number_task_cross_estimate_time_lead,
                $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
            ] = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision);

            $leadDashboardApi += [
                'percentage_number_task_cross_estimate_time_lead'                         => $this->percentage_number_task_cross_estimate_time_lead,
                'percentage_of_tasks_where_given_estimated_time_was_missed_with_revision' => $this->percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
            ];

            $leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions = clone $taskHistoryWithDateAndId;
            $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision = $this->leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions($leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions);

            $leadDashboardApi += [
                'percentage_of_tasks_where_given_estimated_time_was_missed_without_revision' => $this->percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
            ];



            $leadPercentageOfTasksWithRevisions = clone $taskHistoryWithDateAndId;
            [
                $this->lead_task_with_revision_total,
                $this->lead_task_with_revision,
                $this->percentage_of_tasks_with_revision_lead,
            ] = $this->leadPercentageOfTasksWithRevisions($leadPercentageOfTasksWithRevisions);

            $leadDashboardApi += [
                'lead_task_with_revision_total'          => $this->lead_task_with_revision_total,
                'lead_task_with_revision'                => $this->lead_task_with_revision,
                'percentage_of_tasks_with_revision_lead' => $this->percentage_of_tasks_with_revision_lead,
            ];



            $leadAverageTaskHoldTime = clone $taskWithStartEndDateWithId;

            $this->average_average_task_hold_time_lead = $this->leadAverageTaskHoldTime($leadAverageTaskHoldTime, $startDate, $endDate);

            $leadDashboardApi += [
                'average_average_task_hold_time_lead' => $this->average_average_task_hold_time_lead,
            ];

            // $leadCurrentAndPastLimitedTask = clone $taskWithStartEndDateWithId;
            // [
            //     $this->tasks,
            //     $this->past_tasks
            // ] = $this->leadCurrentAndPastLimitedTask($leadCurrentAndPastLimitedTask);

            // $leadDashboardApi += [
            //     'tasks'      => $this->tasks,
            //     'past_tasks' => $this->past_tasks,
            // ];

            return response([
                'data' => $leadDashboardApi,
            ], 200);
        }
    }


    public function tableListApi()
    {

        $tableType = [
            'leadNumberOfTasksReceived',
            'leadNumberOfSubmittedTasks',
            'leadDevNumberOfApprovedTaskByClientInFirstAttempt',
            'leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager',
            'leadDevAvgNumberOfAttemptsNeededForApprovalByClient',
            'leadPercentageOfTasksWithRevisions',
            'leadAverageTaskSubmissionTime',
            'leadAverageNumberOfInProgressTasks',
            'leadAverageTaskHoldTime',
            'leadPercentageOfTasksWhereDeadlineWasMissed',
            'leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision',
            'leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions',
            'leadNoOfDisputesFiledLoseOverall',
            'leadNoOfDisputesFiledLose',
            'leadNumberOfDisputesInvolvedIn',
            'leadHoursSpentInRevisions',
            'leadNumberOfApproval',
            'leadCurrentAndPastLimitedTask',
        ];

        $validator = Validator::make(request()->all(), [
            'start_date' => 'date',
            'end_date'   => 'date|after:start_date',
            'table_type' => ['string', 'required', Rule::in($tableType)],
        ]);

        if ($validator->fails()) {
            return Reply::error(__('validation_failed'), $validator->errors());
        } else {
            $LeadDevId = auth()->id();
            $tableType = request('table_type');

            if (request('start_date') && request('end_date')) {
                $startDate = Carbon::parse(request('start_date'))->format('Y-m-d');
                $endDate = Carbon::parse(request('end_date'))->format('Y-m-d');
            }

            if (
                !($tableType == 'leadNoOfDisputesFiledLoseOverall') ||
                !($tableType == 'leadNumberOfDisputesInvolvedIn') ||
                !($tableType == 'leadNoOfDisputesFiledLose')
            ) {
                // Retrieve task history within the specified date range and for the given lead developer
                $taskHistoryWithDateAndId = TaskHistory::whereBetween('created_at', [$startDate, $endDate])
                    ->where('user_id', $LeadDevId);

                // Retrieve tasks assigned to the lead developer, excluding subtasks
                $taskWithId = Task::whereRelation('taskUsers', 'user_id', $LeadDevId)
                    ->whereNull('subtask_id');

                // Clone the tasks query for filtering by creation date
                $taskWithStartEndDateWithId = clone $taskWithId;
                $taskWithStartEndDateWithId->whereBetween('created_at', [$startDate, $endDate]);
            }

            if (
                $tableType == 'leadNoOfDisputesFiledLoseOverall' ||
                $tableType == 'leadNumberOfDisputesInvolvedIn' ||
                $tableType == 'leadNoOfDisputesFiledLose'
            ) {
                // Disputes Query
                $disputes_involved_in_lead_dev_without_date = TaskRevisionDispute::with(
                    'task:id,created_at,due_date,heading,board_column_id,project_id',
                    'task.project:id,pm_id,client_id',
                    'task.project.client:id,name',
                    'task.project.pm:id,name',
                    'disputeWinner',
                    'raisedAgainst',
                    'raisedBy'
                )->where(function ($query) use ($LeadDevId) {
                    $query->where('raised_by', $LeadDevId)
                        ->orWhere('raised_against', $LeadDevId);
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
                // Disputes Query
            }

            if ($tableType == 'leadNumberOfTasksReceived') {
                $number_of_tasks_received_lead_data = $taskWithStartEndDateWithId
                    ->without(['submissions'])
                    ->with([
                        'project.pm'     => function ($pm) {
                            $pm->without(['role', 'clientDetails', 'session', 'employeeDetail'])
                                ->select('id', 'name');
                        },
                        'project.client' => function ($client) {
                            $client->without(['role', 'clientDetails', 'session', 'employeeDetail'])
                                ->select('id', 'name');
                        },
                        'project:id,pm_id,client_id',
                        'stat:id,label_color,column_name',
                        'oldestSubTask'
                    ])
                    ->select('id', 'heading', 'project_id', 'created_at', 'status', 'start_date', 'board_column_id')
                    ->get();

                return response([
                    'data' => [
                        'number_of_tasks_received_lead'      => $number_of_tasks_received_lead_data->count(),
                        'number_of_tasks_received_lead_data' => $number_of_tasks_received_lead_data,
                    ]
                ], 200);
            }

            if ($tableType == 'leadNumberOfSubmittedTasks') {
                $taskHistoryWithDateAndId = $taskHistoryWithDateAndId->where('board_column_id', 6)
                    ->groupBy('task_id')
                    ->select('id', 'task_id', 'created_at', 'board_column_id')
                    ->get();

                $taskId = [];
                foreach ($taskHistoryWithDateAndId as $task) {
                    if ($task->created_at >= $startDate && $task->created_at <= $endDate) {
                        array_push($taskId, $task->task_id);
                    }
                }


                $submit_number_of_tasks_lead_dev_data = Task::with(
                    'stat:id,label_color,column_name',
                    'oldestSubTask',
                    'project:id,pm_id,client_id',
                    'project.client:id,name',
                    'project.pm:id,name',
                )->select('id', 'created_at', 'start_date', 'due_date', 'heading', 'board_column_id', 'project_id')->find($taskId);

                return response([
                    'data' => [
                        'submit_number_of_tasks_in_this_month_lead'      => $submit_number_of_tasks_lead_dev_data->count(),
                        'submit_number_of_tasks_in_this_month_lead_data' => $submit_number_of_tasks_lead_dev_data,
                    ]
                ], 200);
            }

            if ($tableType == 'leadDevNumberOfApprovedTaskByClientInFirstAttempt') {
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

                return response([
                    'data' => [
                        'number_of_approved_tasks_on_1st_attempt_by_client'      => $number_of_approved_tasks_on_1st_attempt_by_client_data->count(),
                        'number_of_approved_tasks_on_1st_attempt_by_client_data' => $number_of_approved_tasks_on_1st_attempt_by_client_data,
                    ]
                ], 200);
            }
            if ($tableType == 'leadNumberOfApprovedTasksOn1stAttemptAndAvgByProjectManager') {
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

                return response([
                    'data' => [
                        'average_submission_approval_by_pm_lead'             => $average_number_of_attempts_needed ?? 0,
                        'submission_approval_by_pm_lead'                     => $number_of_approved_tasks_by_project_manager_date->count(),
                        'submission_approval_by_pm_lead_date'                => $number_of_approved_tasks_by_project_manager_date,
                        'first_attempt_approve_task_in_this_month_lead'      => $number_of_approved_tasks_on_1st_attempt_by_project_manager_date->count(),
                        'first_attempt_approve_task_in_this_month_lead_date' => $number_of_approved_tasks_on_1st_attempt_by_project_manager_date,
                    ]
                ], 200);
            }
            if ($tableType == 'leadDevAvgNumberOfAttemptsNeededForApprovalByClient') {
                // Step 1: Get task IDs that are not subtasks
                $taskHistoryTaskIds = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->groupBy('task_id')->get()->pluck('task_id')->toArray();

                // Step 2: Get task IDs of completed tasks with revision disputes
                $completedTasksId = TaskHistory::with('revisions.taskRevisionDispute')
                    ->whereIn('task_id', $taskHistoryTaskIds)
                    ->where('board_column_id', 4)
                    ->groupBy('task_id')
                    ->get();

                $task_ids = [];
                $only_responsible_revisions_count = 0;

                // Step 3: Calculate responsible revisions count
                foreach ($completedTasksId as $taskHistory) {
                    if ($taskHistory->revisions) {
                        foreach ($taskHistory->revisions as $revision) {
                            if (($revision->dispute_between == "PLR") && ($revision->final_responsible_person == "LD")) {
                                $only_responsible_revisions_count++;
                            } elseif ($revision?->taskRevisionDispute?->raised_against_percent && ($revision?->taskRevisionDispute->raised_against_percent < 50)) {
                                $only_responsible_revisions_count++;
                            }
                        }
                    }
                    $task_ids[] = $taskHistory->task_id;
                }

                // Step 4: Retrieve the required task information
                $number_of_attempts_needed_for_approval_by_client = Task::with(
                    'taskType:id,task_id,task_type,page_type',
                    'project.pm:id,name',
                    'project.client:id,name',
                    'project:id,pm_id,client_id',
                    'stat:id,label_color,column_name',
                    'latestTaskApprove:id,task_id,created_at',
                    'latestTaskSubmission:id,task_id,created_at',
                    'taskUser'
                )->find($task_ids);

                // Step 5: Calculate the total number of attempts
                $total_attempts = $only_responsible_revisions_count + $number_of_attempts_needed_for_approval_by_client->count();

                // Step 6: Calculate the average number of attempts needed for approval
                $avg_no_attempts = 0;
                if ($total_attempts) {
                    $avg_no_attempts = round($total_attempts / $number_of_attempts_needed_for_approval_by_client->count(), 2);
                }

                return response([
                    'data' => [
                        'avg_number_of_attempts_needed_for_approval_by_client'   => $avg_no_attempts,
                        'total_number_of_attempts_needed_for_approval_by_client' => $total_attempts,
                        'number_of_attempts_needed_for_approval_by_client'       => $number_of_attempts_needed_for_approval_by_client,
                    ]
                ], 200);
            }
            if ($tableType == 'leadPercentageOfTasksWithRevisions') {
                $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->get()->pluck('task_id')->toArray();


                $allTask = Task::with(
                    'project.client:id,name',
                    'project:id,pm_id,client_id',
                    'revisions:id,task_id,final_responsible_person,dispute_between',
                    'revisions.taskRevisionDispute:id,revision_id,task_id,raised_against_percent',
                )->whereHas('history', function (Builder $query) {
                    $query->where('board_column_id', 6);
                })->whereIn('id', $task_id)->where('board_column_id', 4);

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

                return response([
                    'data' => [
                        'lead_task_with_revision_total'                 => $total_revisions_count,
                        'lead_task_with_revision'                       => $number_of_tasks_with_revision_completed_model->count(),
                        'percentage_of_tasks_with_revision_lead'        => $percentage_of_tasks_with_revision,
                        'number_of_tasks_with_revision_completed_model' => $number_of_tasks_with_revision_completed_model,
                    ]
                ], 200);
            }
            if ($tableType == 'leadAverageTaskSubmissionTime') {

                $taskIds = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->where('board_column_id', 6)
                    ->pluck('task_id')
                    ->toArray();

                $tasks = Task::has('firstHistoryForDevReview')
                    ->with('firstHistoryForDevReview')
                    ->select('id', 'created_at', 'heading', 'board_column_id', 'project_id')
                    ->find($taskIds);

                $totalDays = 0;
                $taskCount = $tasks->count();

                foreach ($tasks as $task) {
                    $diffInMinutes = $task->firstHistoryForDevReview->created_at->diffInMinutes($task->created_at);
                    $diffInDays = round($diffInMinutes / 1440, 2);
                    $totalDays += $diffInDays;
                }

                $averageTaskSubmissionTime = $taskCount > 0 ? round($totalDays / $taskCount, 2) : 0;

                return response([
                    'data' => [
                        'average_submission_day_in_this_month_lead'      => $averageTaskSubmissionTime,
                        'average_submission_day_in_this_month_lead_data' => $tasks
                    ]
                ], 200);
            }
            if ($tableType == 'leadAverageNumberOfInProgressTasks') {
                $total_task_found = $taskWithId->count();
                $total_task_found_with_in_pro = $taskWithId->whereIn('board_column_id', [3, 2]);
                $total_task_found_with_in_pro = $total_task_found_with_in_pro->count();
                $number_of_in_progress_task_data = $taskWithId->select('id', DB::raw("DATE_FORMAT(created_at, '%b-%d-%Y') as created_at_raw"))
                    ->get()->groupBy('created_at_raw');

                $avg_number_of_in_progress_task = 0;
                if ($total_task_found_with_in_pro) {
                    $avg_number_of_in_progress_task = round($total_task_found / $total_task_found_with_in_pro, 2);
                }

                return response([
                    'data' => [
                        'avg_number_of_in_progress_task'        => $avg_number_of_in_progress_task,
                        'total_number_in_task_lead_from_in_pro' => $total_task_found,
                        'average_in_progress_date_range_lead'   => $total_task_found_with_in_pro,
                        'number_of_in_progress_task_data'       => $number_of_in_progress_task_data,
                    ]
                ], 200);
            }
            if ($tableType == 'leadAverageTaskHoldTime') {
                $tasks = $taskWithStartEndDateWithId
                    ->with(
                        'project.pm:id,name',
                        'project.client:id,name',
                        'project:id,pm_id,client_id',
                        'oldestSubTask'
                    )
                    ->has('oldestSubTask')
                    ->get();

                $totalTimeMinutesList = [];

                foreach ($tasks as $task) {
                    $assignDate = $task->oldestSubTask;

                    if ($assignDate) {
                        $startDateTime = new DateTime($task->created_at);
                        $endDateTime = new DateTime($assignDate->created_at);

                        if ($endDateTime > $startDateTime) {
                            $totalTimeSeconds = 0;
                            $currentDate = clone $startDateTime;

                            while ($currentDate < $endDateTime) {
                                $currentTime = $currentDate->format('H:i:s');

                                if (($currentTime >= '18:00:00' && $currentTime < '08:00:00') || ($currentDate->format('l') === 'Sunday')) {
                                    $currentDate->modify('+1 day')->setTime(8, 0, 0);
                                } else {
                                    if ($currentDate->format('Y-m-d') === $endDateTime->format('Y-m-d')) {
                                        $endTime = $endDateTime->format('H:i:s');
                                        $timeDifference = strtotime($endTime) - strtotime($currentTime);
                                    } else {
                                        $timeDifference = strtotime('18:00:00') - strtotime($currentTime);
                                    }

                                    $totalTimeSeconds += $timeDifference;
                                    $currentDate->modify('+1 day')->setTime(8, 0, 0);
                                }
                            }

                            $totalTimeMinutes = $totalTimeSeconds / 60;
                            $totalTimeMinutesList[] = $totalTimeMinutes;
                        }
                    }
                }

                $totalMinutes = array_sum($totalTimeMinutesList);
                $taskCount = count($totalTimeMinutesList);

                if ($taskCount > 0) {
                    $averageMinutes = $totalMinutes / $taskCount;
                    $days = floor($averageMinutes / 1440);
                    $hours = floor(($averageMinutes - ($days * 1440)) / 60);
                    $minutes = $averageMinutes - ($days * 1440) - ($hours * 60);
                } else {
                    $days = $hours = $minutes = 0;
                }

                $averageHoldTimeFormatted = sprintf('%d days, %02d hours, %02d minutes', $days, $hours, $minutes);

                return response([
                    'data' => [
                        'average_average_task_hold_time_lead'      => $averageHoldTimeFormatted,
                        'average_average_task_hold_time_lead_data' => $tasks
                    ]
                ], 200);
            }
            if ($tableType == 'leadPercentageOfTasksWhereDeadlineWasMissed') {
                $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->get()->pluck('task_id')->toArray();

                $completed_tasks_by_lead_developer = Task::with(
                    'firstHistoryForDevReview',
                    'project.pm:id,name',
                    'project.client:id,name',
                    'project:id,pm_id,client_id',
                )->where('board_column_id', 4)
                    ->find($task_id);

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

                return response([
                    'data' => [
                        'percentage_of_tasks_deadline_lead'      => $percentage_of_tasks_where_deadline_was_missed,
                        'percentage_of_tasks_deadline_lead_data' => $percentage_of_tasks_where_deadline_was_missed_data
                    ]
                ], 200);
            }
            if ($tableType == 'leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision') {
                $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->get()->pluck('task_id')->toArray();

                $completed_tasks_by_lead_developer = Task::with(
                    'taskSubTasks.timeLogged',
                    'project.pm:id,name',
                    'project.client:id,name',
                    'project:id,pm_id,client_id',
                    'timeLogged',
                )->where('board_column_id', 4)
                    ->withSum('timeLogged', 'total_minutes')->find($task_id);

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

                return response([
                    'data' => [
                        'percentage_number_task_cross_estimate_time_lead'                              => $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
                        'percentage_of_tasks_where_given_estimated_time_was_missed_with_revision'      => count($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data),
                        'percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data' => $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_data
                    ]
                ], 200);
            }
            if ($tableType == 'leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions') {
                $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->get()->pluck('task_id')->toArray();

                $completed_tasks_by_lead_developer = Task::with(
                    'taskSubTasks.timeLoggedWithoutRevision',
                    'project.pm:id,name',
                    'project.client:id,name',
                    'project:id,pm_id,client_id',
                    'timeLogged'
                )->where('board_column_id', 4)
                    ->withSum('timeLoggedWithoutRevision', 'total_minutes')->find($task_id);

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

                return response([
                    'data' => [
                        'percentage_of_tasks_where_given_estimated_time_was_missed_without_revision'      => $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision,
                        'percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data' => $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data
                    ]
                ], 200);
            }
            if ($tableType == 'leadNoOfDisputesFiledLoseOverall') {
                $disputes_filed_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
                    ->where('raised_by', '=', $LeadDevId)->get();

                $disputes_lost_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
                    ->where('winner', '!=', $LeadDevId)->get();

                return response([
                    'data' => [
                        'number_of_dispute_filed_own_overall_lead'      => $disputes_filed_by_lead_dev_overall_data->count(),
                        'number_of_dispute_filed_own_overall_lead_data' => $disputes_filed_by_lead_dev_overall_data,
                        'number_of_dispute_lose_own_overall_lead'       => $disputes_lost_by_lead_dev_overall_data->count(),
                        'number_of_dispute_lose_own_overall_lead_data'  => $disputes_lost_by_lead_dev_overall_data
                    ]
                ], 200);
            }
            if ($tableType == 'leadNoOfDisputesFiledLose') {
                $disputes_filed_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
                    ->where('raised_by', '=', $LeadDevId)
                    ->get();

                $disputes_lost_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
                    ->where('winner', '!=', $LeadDevId)
                    ->get();

                return response([
                    'data' => [
                        'number_of_dispute_filed_own_lead'      => $disputes_filed_by_lead_dev_data->count(),
                        'number_of_dispute_filed_own_lead_data' => $disputes_filed_by_lead_dev_data,
                        'number_of_dispute_lose_own_lead'       => $disputes_lost_by_lead_dev_data->count(),
                        'number_of_dispute_lose_own_lead_data'  => $disputes_lost_by_lead_dev_data
                    ]
                ], 200);
            }
            if ($tableType == 'leadNumberOfDisputesInvolvedIn') {
                return response([
                    'data' => [
                        'disputes_lead_developer_involved'      => $disputes_involved_in_lead_dev_with_date->count(),
                        'disputes_lead_developer_involved_date' => $disputes_involved_in_lead_dev_with_date->get()
                    ]
                ], 200);
            }
            if ($tableType == 'leadHoursSpentInRevisions') {
                $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
                    $q->whereNull('subtask_id');
                })->get()->pluck('task_id')->toArray();

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
                        'taskSubTasks.revisions'           => function ($query) {
                            $query->withSum('timeLogs', 'total_minutes');
                        },
                        'taskUser',
                    ])
                    ->where('board_column_id', 4)
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

                return response([
                    'data' => [
                        'logged_hours_for_all_submitted'           => $logged_hours_for_all_submitted,
                        'logged_hours_in_tasks_with_revisions'     => $logged_hours_in_tasks_with_revisions,
                        'spent_revision_developer_lead'            => $parent_task_wise_total_hours_spent_in_revisions ?? 0,
                        'spent_revision_developer_lead_count'      => $parent_task_wise_total_hours_spent_in_revisions_data->count(),
                        'spent_revision_developer_lead_count_data' => $parent_task_wise_total_hours_spent_in_revisions_data,
                    ]
                ], 200);
            }
            if ($tableType == 'leadNumberOfApproval') {
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

                    $approve = $task->TaskApproves()->whereDate('created_at', $approveDate)->where('user_id', $LeadDevId)->first();

                    if ($approve != null) {
                        array_push($manually_approved_tasks_data, $task);
                        array_push($manually_approved_tasks_array, $task->id);
                    } else {
                        array_push($auto_approved_tasks_data, $task);
                    }
                }

                return response([
                    'data' => [
                        'number_of_approval'            => $number_of_approval_data->count(),
                        'number_of_approval_data'       => $number_of_approval_data,
                        'auto_approved_tasks'           => count($auto_approved_tasks_data),
                        'auto_approved_tasks_data'      => $auto_approved_tasks_data,
                        'manually_approved_tasks'       => count($manually_approved_tasks_data),
                        'manually_approved_tasks_data'  => $manually_approved_tasks_data,
                        'manually_approved_tasks_array' => $manually_approved_tasks_array
                    ]
                ], 200);
            }
            if ($tableType == 'leadCurrentAndPastLimitedTask') {
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
                return response([
                    'data' => [
                        'tasks'      => $tasks,
                        'past_tasks' => $past_tasks,
                    ]
                ], 200);
            }
        }
    }

    private function leadNumberOfTasksReceived($taskWithStartEndDateWithId)
    {

        $number_of_tasks_received_lead_data = $taskWithStartEndDateWithId
            ->select('id', 'heading', 'project_id', 'created_at', 'status', 'start_date', 'board_column_id')
            ->get();
        return $number_of_tasks_received_lead_data->count();
    }

    private function leadNumberOfSubmittedTasks($taskHistoryWithDateAndId, $startDate, $endDate)
    {

        $taskHistoryWithDateAndId = $taskHistoryWithDateAndId->where('board_column_id', 6)
            ->groupBy('task_id')
            ->select('id', 'task_id', 'created_at', 'board_column_id')
            ->get();

        $taskId = [];
        foreach ($taskHistoryWithDateAndId as $task) {
            if ($task->created_at >= $startDate && $task->created_at <= $endDate) {
                array_push($taskId, $task->task_id);
            }
        }


        $submit_number_of_tasks_lead_dev_data = Task::with(
            'stat:id,label_color,column_name',
            'oldestSubTask',
            'project:id,pm_id,client_id',
            'project.client:id,name',
            'project.pm:id,name',
        )->select('id', 'created_at', 'start_date', 'due_date', 'heading', 'board_column_id', 'project_id')->find($taskId);

        return $submit_number_of_tasks_lead_dev_data->count();
    }

    private function leadDevNumberOfApprovedTaskByClientInFirstAttempt($taskHistoryWithDateAndId)
    {

        // Step 1: Get task IDs that are not subtasks and have board_column_id = 6
        $taskIds = $taskHistoryWithDateAndId->whereHas('task', function ($query) {
            $query->whereNull('subtask_id');
        })->where('board_column_id', 6)->get()->pluck('task_id')->toArray();

        // Step 2: Retrieve the required task information
        $numberOfApprovedTasks = Task::with(
            'stat:id,label_color,column_name',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'latestTaskSubmission:id,task_id,created_at',
            'latestTaskApprove:id,task_id,created_at',
            'revisions.taskRevisionDispute'
        )->select('id', 'created_at', 'due_date', 'heading', 'board_column_id', 'project_id')->whereIn('id', $taskIds);

        // Step 3: Clone the query to find tasks with revisions
        $tasksWithRevisions = (clone $numberOfApprovedTasks)->has('revisions')->get();

        $taskIdArray = [];
        $taskIdClientArray = [];

        // Step 4: Process tasks with revisions
        foreach ($tasksWithRevisions as $taskWithRevision) {
            $totalRevisionsCount = 0;
            $isResponsibleCount = 0;
            $totalClientCount = 0;
            $clientCount = 0;

            foreach ($taskWithRevision->revisions as $revision) {
                if ($revision->final_responsible_person == 'PM' && $revision->dispute_between == 'PLR') {
                    $isResponsibleCount++;
                } elseif (
                    ($revision->dispute_between == 'PLR') &&
                    $revision->taskRevisionDispute?->raised_against_percent &&
                    ($revision->taskRevisionDispute?->raised_against_percent > 50)
                ) {
                    $isResponsibleCount++;
                }
                if ($revision->dispute_between == 'PLR') {
                    $totalRevisionsCount++;
                }
                if (!$revision->final_responsible_person) {
                    $totalRevisionsCount--;
                }
            }

            if ($isResponsibleCount != $totalRevisionsCount) {
                array_push($taskIdArray, $taskWithRevision->id);
            }
            if ($clientCount != $totalClientCount) {
                array_push($taskIdClientArray, $taskWithRevision->id);
            }
        }

        // Step 5: Get the count of tasks approved on the first attempt by the client
        $numberOfApprovedTasksOn1stAttemptByClientCount = $numberOfApprovedTasks->doesntHave('revisions')->orWhereIn('id', $taskIdArray)->count();

        return $numberOfApprovedTasksOn1stAttemptByClientCount;
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
            $number_of_approved_tasks_on_1st_attempt_by_project_manager_date->count(),
        ];
    }

    private function leadDevAvgNumberOfAttemptsNeededForApprovalByClient($taskHistoryWithDateAndId)
    {
        // Step 1: Get task IDs that are not subtasks
        $taskHistoryTaskIds = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->groupBy('task_id')->get()->pluck('task_id')->toArray();

        // Step 2: Get task IDs of completed tasks with revision disputes
        $completedTasksId = TaskHistory::with('revisions.taskRevisionDispute')
            ->whereIn('task_id', $taskHistoryTaskIds)
            ->where('board_column_id', 4)
            ->groupBy('task_id')
            ->get();

        $task_ids = [];
        $only_responsible_revisions_count = 0;

        // Step 3: Calculate responsible revisions count
        foreach ($completedTasksId as $taskHistory) {
            if ($taskHistory->revisions) {
                foreach ($taskHistory->revisions as $revision) {
                    if (($revision->dispute_between == "PLR") && ($revision->final_responsible_person == "LD")) {
                        $only_responsible_revisions_count++;
                    } elseif ($revision?->taskRevisionDispute?->raised_against_percent && ($revision?->taskRevisionDispute->raised_against_percent < 50)) {
                        $only_responsible_revisions_count++;
                    }
                }
            }
            $task_ids[] = $taskHistory->task_id;
        }

        // Step 4: Retrieve the required task information
        $number_of_attempts_needed_for_approval_by_client = Task::with(
            'taskType:id,task_id,task_type,page_type',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'stat:id,label_color,column_name',
            'latestTaskApprove:id,task_id,created_at',
            'latestTaskSubmission:id,task_id,created_at',
            'taskUser'
        )->find($task_ids);

        // Step 5: Calculate the total number of attempts
        $total_attempts = $only_responsible_revisions_count + $number_of_attempts_needed_for_approval_by_client->count();

        // Step 6: Calculate the average number of attempts needed for approval
        $avg_no_attempts = 0;
        if ($total_attempts) {
            $avg_no_attempts = round($total_attempts / $number_of_attempts_needed_for_approval_by_client->count(), 2);
        }

        return [
            $avg_no_attempts,
            $total_attempts
        ];
    }

    private function leadPercentageOfTasksWithRevisions($taskHistoryWithDateAndId)
    {

        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->get()->pluck('task_id')->toArray();

        $allTask = Task::with(
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'revisions:id,task_id,final_responsible_person,dispute_between',
            'revisions.taskRevisionDispute:id,revision_id,task_id,raised_against_percent',
        )->whereHas('history', function (Builder $query) {
            $query->where('board_column_id', 6);
        })->whereIn('id', $task_id)->where('board_column_id', 4);

        $number_of_tasks_completed_model = clone $allTask;
        $number_of_tasks_with_revision_completed_model = clone $allTask;

        $number_of_tasks_completed_model = $number_of_tasks_completed_model
            ->select('id', 'created_at', 'heading', 'board_column_id', 'project_id')
            ->get();

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
            ])
            ->whereHas('revisions', function (Builder $query) {
                $query->where('final_responsible_person', '=', 'LD')
                    ->where('dispute_between', 'PLR')
                    ->orWhere(function ($q) {
                        $q->has('taskRevisionDispute')
                            ->whereRelation('taskRevisionDispute', 'raised_against_percent', '<', 50);
                    });
            })
            ->get();

        $total_revisions_count = $number_of_tasks_with_revision_completed_model->sum('revisions_count') ?? 0;
        $task_with_revisions = $number_of_tasks_with_revision_completed_model->count();

        $percentage_of_tasks_with_revision = 0;
        if ($number_of_tasks_completed_model->count()) {
            $percentage_of_tasks_with_revision = round(($task_with_revisions / $number_of_tasks_completed_model->count()) * 100, 2);
        }

        return [
            $total_revisions_count,
            $task_with_revisions,
            $percentage_of_tasks_with_revision,
        ];
    }

    private function leadAverageTaskSubmissionTime($taskHistoryWithDateAndId)
    {

        $taskIds = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->where('board_column_id', 6)
            ->pluck('task_id')
            ->toArray();

        $tasks = Task::has('firstHistoryForDevReview')
            ->with('firstHistoryForDevReview')
            ->select('id', 'created_at', 'heading', 'board_column_id', 'project_id')
            ->find($taskIds);

        $totalDays = 0;
        $taskCount = $tasks->count();

        foreach ($tasks as $task) {
            $diffInMinutes = $task->firstHistoryForDevReview->created_at->diffInMinutes($task->created_at);
            $diffInDays = round($diffInMinutes / 1440, 2);
            $totalDays += $diffInDays;
        }

        $averageTaskSubmissionTime = $taskCount > 0 ? round($totalDays / $taskCount, 2) : 0;

        return $averageTaskSubmissionTime;
    }
    private function leadAverageNumberOfInProgressTasks($taskWithId)
    {

        $total_task_found = $taskWithId->count();
        $total_task_found_with_in_pro = $taskWithId->whereIn('board_column_id', [3, 2]);
        $total_task_found_with_in_pro = $total_task_found_with_in_pro->count();

        $avg_number_of_in_progress_task = 0;
        if ($total_task_found_with_in_pro) {
            $avg_number_of_in_progress_task = round($total_task_found / $total_task_found_with_in_pro, 2);
        }

        return [
            $avg_number_of_in_progress_task,
            $total_task_found,
            $total_task_found_with_in_pro,
        ];
    }

    private function leadAverageTaskHoldTime($taskWithStartEndDateWithId, $startDate, $endDate)
    {

        $tasks = $taskWithStartEndDateWithId
            ->with(
                'project.pm:id,name',
                'project.client:id,name',
                'project:id,pm_id,client_id',
                'oldestSubTask'
            )
            ->has('oldestSubTask')
            ->get();

        $totalTimeMinutesList = [];

        foreach ($tasks as $task) {
            $assignDate = $task->oldestSubTask;

            if ($assignDate) {
                $startDateTime = new DateTime($task->created_at);
                $endDateTime = new DateTime($assignDate->created_at);

                if ($endDateTime > $startDateTime) {
                    $totalTimeSeconds = 0;
                    $currentDate = clone $startDateTime;

                    while ($currentDate < $endDateTime) {
                        $currentTime = $currentDate->format('H:i:s');

                        if (($currentTime >= '18:00:00' && $currentTime < '08:00:00') || ($currentDate->format('l') === 'Sunday')) {
                            $currentDate->modify('+1 day')->setTime(8, 0, 0);
                        } else {
                            if ($currentDate->format('Y-m-d') === $endDateTime->format('Y-m-d')) {
                                $endTime = $endDateTime->format('H:i:s');
                                $timeDifference = strtotime($endTime) - strtotime($currentTime);
                            } else {
                                $timeDifference = strtotime('18:00:00') - strtotime($currentTime);
                            }

                            $totalTimeSeconds += $timeDifference;
                            $currentDate->modify('+1 day')->setTime(8, 0, 0);
                        }
                    }

                    $totalTimeMinutes = $totalTimeSeconds / 60;
                    $totalTimeMinutesList[] = $totalTimeMinutes;
                }
            }
        }

        $totalMinutes = array_sum($totalTimeMinutesList);
        $taskCount = count($totalTimeMinutesList);

        if ($taskCount > 0) {
            $averageMinutes = $totalMinutes / $taskCount;
            $days = floor($averageMinutes / 1440);
            $hours = floor(($averageMinutes - ($days * 1440)) / 60);
            $minutes = $averageMinutes - ($days * 1440) - ($hours * 60);
        } else {
            $days = $hours = $minutes = 0;
        }

        $averageHoldTimeFormatted = sprintf('%d days, %02d hours, %02d minutes', $days, $hours, $minutes);

        return $averageHoldTimeFormatted;
        // --------------------------------------------------------------------
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
                if ($i2->c2 != null) {
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
                $start = null;
            }

            $tasks[$t1][] = [
                "sub_task_id" => $s1,
                "created_at"  => $start,
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
                if (($created_at_timestamp != null) && ($created_at_timestamp > strtotime($latest_date))) {
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
                "task_id"    => $task_id,
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
            if ($end->c1 != null && $task['created_at'] != "") {
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
                array_push($final, null);
            }
        }
        $ind = 0;
        foreach ($final as $i1) {
            if ($i1 != null) {
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
        $taskHistoryTaskIds = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->groupBy('task_id')
            ->pluck('task_id')
            ->toArray();


        $completedTasks = Task::with(
            'firstHistoryForDevReview',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id'
        )->where('board_column_id', 4)
            ->find($taskHistoryTaskIds);

        $missedDeadlineCount = 0;

        foreach ($completedTasks as $task) {
            if (!Carbon::parse($task->due_date)->greaterThanOrEqualTo(Carbon::parse($task->firstHistoryForDevReview->created_at)->toDateString())) {
                $missedDeadlineCount++;
            }
        }

        $totalCompletedTasks = $completedTasks->count();
        $percentageOfTasksWhereDeadlineWasMissed = $totalCompletedTasks > 0 ? round(($missedDeadlineCount / $totalCompletedTasks) * 100, 2) : 0;

        return $percentageOfTasksWhereDeadlineWasMissed;
    }
    private function leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithRevision($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->get()->pluck('task_id')->toArray();

        $completed_tasks_by_lead_developer = Task::with(
            'taskSubTasks.timeLogged',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'timeLogged',
        )->where('board_column_id', 4)
            ->withSum('timeLogged', 'total_minutes')->find($task_id);

        $number_task_exceeding_estimate = 0;
        foreach ($completed_tasks_by_lead_developer as $task) {
            $total_sub_task_log_time = $task->taskSubTasks->sum('total_log_time_in_min');
            $total_task_log_time = $total_sub_task_log_time + $task->time_logged_sum_total_minutes;
            if ($total_task_log_time > $task->total_estimate_minutes) {
                $number_task_exceeding_estimate++;
            }
        }

        $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = 0;
        if ($completed_tasks_by_lead_developer->count()) {
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision = round(
                ($number_task_exceeding_estimate / $completed_tasks_by_lead_developer->count()) * 100,
                2
            );
        }

        return [
            $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision,
            $number_task_exceeding_estimate
        ];
    }
    private function leadPercentageOfTasksWhereGivenEstimatedTimeWasMissedWithoutRevisions($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->get()->pluck('task_id')->toArray();

        $completed_tasks_by_lead_developer = Task::with(
            'taskSubTasks.timeLoggedWithoutRevision',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'timeLogged'
        )->where('board_column_id', 4)
            ->withSum('timeLoggedWithoutRevision', 'total_minutes')->find($task_id);

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


        return $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision;
    }

    private function leadNoOfDisputesFiledLoseOverall($disputes_involved_in_lead_dev_without_date, $LeadDevId)
    {
        $disputes_filed_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
            ->where('raised_by', '=', $LeadDevId)
            ->get();

        $disputes_lost_by_lead_dev_overall_data = $disputes_involved_in_lead_dev_without_date
            ->where('winner', '!=', $LeadDevId)
            ->get();

        return [
            $disputes_filed_by_lead_dev_overall_data->count(),
            $disputes_lost_by_lead_dev_overall_data->count(),
        ];
    }
    private function leadNoOfDisputesFiledLose($disputes_involved_in_lead_dev_with_date, $LeadDevId)
    {
        $disputes_filed_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
            ->where('raised_by', '=', $LeadDevId)
            ->get();

        $disputes_lost_by_lead_dev_data = $disputes_involved_in_lead_dev_with_date
            ->where('winner', '!=', $LeadDevId)
            ->get();

        return [
            $disputes_filed_by_lead_dev_data->count(),
            $disputes_lost_by_lead_dev_data->count(),
        ];
    }
    private function leadNumberOfDisputesInvolvedIn($disputes_involved_in_lead_dev_with_date)
    {
        return $disputes_involved_in_lead_dev_with_date->count();
    }

    private function leadHoursSpentInRevisions($taskHistoryWithDateAndId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNull('subtask_id');
        })->get()->pluck('task_id')->toArray();

        $tasks = Task::has('revisions')
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
                'taskSubTasks.revisions'           => function ($query) {
                    $query->withSum('timeLogs', 'total_minutes');
                },
                'taskUser',
            ])
            ->where('board_column_id', 4)
            ->withSum('timeLoggedOnlyRevision', 'total_minutes')
            ->find($task_id);

        $total_minutes_spent_in_revisions = 0;
        $logged_minutes_for_all_submissions = 0;
        $logged_minutes_in_tasks_with_revisions = 0;

        foreach ($tasks as $task) {
            $subTasks = $task->taskSubTasks;
            $total_minutes_spent_in_revisions += $subTasks->sum('total_log_time_only_revision_in_min') + $task->time_logged_only_revision_sum_total_minutes;
            $logged_minutes_for_all_submissions += $subTasks->sum('total_submissions_log_time_in_min');
            $logged_minutes_in_tasks_with_revisions += $subTasks->sum('total_log_time_in_min');
        }

        $logged_hours_for_all_submissions = intdiv($logged_minutes_for_all_submissions, 60) . ' Hours, ' . ($logged_minutes_for_all_submissions % 60) . ' Minutes';
        $logged_hours_in_tasks_with_revisions = intdiv($logged_minutes_in_tasks_with_revisions, 60) . ' Hours, ' . ($logged_minutes_in_tasks_with_revisions % 60) . ' Minutes';
        $total_hours_spent_in_revisions = intdiv($total_minutes_spent_in_revisions, 60) . ' Hours, ' . ($total_minutes_spent_in_revisions % 60) . ' Minutes';

        return [
            $logged_hours_for_all_submissions,
            $logged_hours_in_tasks_with_revisions,
            $total_hours_spent_in_revisions,
            $tasks->count(),
        ];
    }
    private function leadNumberOfApproval($taskHistoryWithDateAndId, $LeadDevId)
    {
        $task_id = $taskHistoryWithDateAndId->whereHas('task', function ($q) {
            $q->whereNotNull('subtask_id');
        })->where('board_column_id', 8)
            ->groupBy('task_id')
            ->select('task_id')
            ->get()->pluck('task_id')->toArray();

        $tasks = Task::with(
            'TaskApproves',
            'firstHistoryForLeadDevApproval',
            'project.pm:id,name',
            'project.client:id,name',
            'project:id,pm_id,client_id',
            'oldestSubTask',
            'latestTaskApprove:id,task_id,created_at'
        )->has('firstHistoryForLeadDevApproval')->find($task_id);

        $manually_approved_tasks_count = 0;

        foreach ($tasks as $task) {
            $approveDate = date('Y-m-d', strtotime($task->firstHistoryForLeadDevApproval->created_at));

            $approve = $task->TaskApproves()->whereDate('created_at', $approveDate)->where('user_id', $LeadDevId)->first();

            if ($approve != null) {
                $manually_approved_tasks_count++;
            }
        }

        $auto_approved_tasks_count = $tasks->count() - $manually_approved_tasks_count;

        return [
            $tasks->count(),
            $auto_approved_tasks_count,
            $manually_approved_tasks_count
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
