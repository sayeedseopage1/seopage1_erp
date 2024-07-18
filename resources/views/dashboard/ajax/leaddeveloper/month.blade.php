<div class="row">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#number_of_task_received{{ $number_of_tasks_received_lead }}">
                            {{ $number_of_tasks_received_lead }}
                        </a>
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.number_of_task_received')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of submitted tasks</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#submit_number_of_tasks_in_this_month_lead{{ $submit_number_of_tasks_in_this_month_lead }}">
                            {{ $submit_number_of_tasks_in_this_month_lead }}
                        </a>
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.number_of_task_submitted')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Project
                    Manager</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#first_attempt_approve_task_in_this_month_lead{{ count($first_attempt_approve_task_in_this_month_lead_data) }}">
                            {{ $first_attempt_approve_task_in_this_month_lead }}
                        </a>
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.first_attempt_approve_task_in_this_month_lead')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    Number of Approved Task By Client in First Attempt
                </h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#num_of_approved_task_attempt_by_client{{ $number_of_approved_tasks_on_1st_attempt_by_client }}">
                            {{ $number_of_approved_tasks_on_1st_attempt_by_client }}
                        </a>

                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.num_of_approved_task_attempt_by_client')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Project
                    Manager</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#average_submission_aproval_in_this_month_lead{{ $submission_approval_by_pm_lead }}">
                            {{ $average_submission_approval_by_pm_lead }}
                        </a>
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.average_submission_aproval_in_this_month_lead')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    Avg number of attempts needed for approval by Client
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_num_of_approval_by_client{{ $total_number_of_attempts_needed_for_approval_by_client }}">

                            {{ $avg_number_of_attempts_needed_for_approval_by_client }}

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_num_of_approval_by_client')

                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#percentage_of_task_with_revision{{ $lead_task_with_revision }}">

                            {{ round($percentage_of_tasks_with_revision_lead, 2) }}%

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_of_task_with_revision')
                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    Total number of revisions
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#total_num_of_revision{{ $lead_task_with_revision_total }}">

                            {{ $lead_task_with_revision_total }}

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.total_num_of_revision')
                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> Average task submission time (In days)</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_task_submission_in_day{{ count($average_task_submit_data) }}">

                            {{ $average_submission_day_in_this_month_lead }} Days

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_task_submission_in_day')

                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#avg_num_in_progress_task{{ $average_in_progress_date_range_lead }}">

                            {{ $avg_number_of_in_progress_task }}

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.avg_num_in_progress_task')

                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Task Hold Time</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#average_average_task_hold_time{{ count($average_average_task_hold_time_lead_data) }}">
                            {{ $average_average_task_hold_time_lead }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.average_average_task_hold_time_lead')
                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    Percentage of tasks where deadline was missed
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#percentage_of_tasks_deadline_missed{{ count($estimate_missed_task_data_lead) }}">

                            {{ round($percentage_of_tasks_deadline_lead, 2) }}%

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_of_tasks_deadline_missed')

                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-8">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated time
                    was missed</h5>
                <div class="d-flex flex-wrap">

                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        Percentage of Tasks Where Given Estimated Time was Missed With Revisions
                        <a href="#" data-toggle="modal"
                            data-target="#percentage_task_estimate_time_missed{{ $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision }}">
                            {{ round($percentage_number_task_cross_estimate_time_lead, 2) }}%

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_task_estimate_time_missed')
                    </h6>
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        Percentage of Tasks Where Given Estimated Time was Missed Without Revisions
                        <a href="#" data-toggle="modal"
                            data-target="#percentage_task_estimate_time_missed_without_revisions{{ count($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data) }}">
                            {{ round($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision, 2) }}%

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.percentage_task_estimate_time_missed_without_revisions')
                    </h6>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of Approval</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-target="#number_of_approval{{ count($number_of_approval_data) }}"
                            data-toggle="modal">
                            {{ $number_of_approval }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.number_of_approval')
                    </p>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    Auto Approval
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-target="#auto_approved_tasks{{ $auto_approved_tasks }}"
                            data-toggle="modal">
                            {{ $auto_approved_tasks }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.auto_approved_tasks')
                    </p>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Manual Approval</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#"
                            data-target="#manually_approved_tasks{{ count($manually_approved_tasks_data) }}"
                            data-toggle="modal">{{ $manually_approved_tasks }}</a>
                        @include('dashboard.ajax.leaddeveloper.modals.manually_approved_tasks')
                    </p>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-5">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of disputes filed</h5>
                <div class="d-flex flex-wrap">
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes filed:
                        <a href="#"
                            data-target="#number_of_disputes_filed{{ $number_of_dispute_filed_own_lead }}"
                            data-toggle="modal">
                            {{ $number_of_dispute_filed_own_lead }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.number_of_disputes_filed')
                    </h6>
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes filed (Overall):
                        <a href="#" data-toggle="modal"
                            data-target="#no_of_dispute_overall{{ $number_of_dispute_filed_own_overall_lead }}">
                            {{ $number_of_dispute_filed_own_overall_lead }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_overall')
                    </h6>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-7">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                    No. of disputes lost
                </h5>
                <div class="d-flex flex-wrap">

                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        Number of Disputes Lost (Raised By Lead Developer):
                        <a href="#" data-toggle="modal"
                            data-target="#no_of_dispute_lost{{ $number_of_dispute_lose_own_lead }}">
                            {{ $number_of_dispute_lose_own_lead }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_lost')

                    </h6>
                    <h6 class="mb-0 f-18 font-weight-bold mr-5">
                        No. of disputes lost(Overall):
                        <a href="#" data-toggle="modal"
                            data-target="#no_of_dispute_lost_overall{{ $number_of_dispute_lose_own_overall_lead }}">
                            {{ $number_of_dispute_lose_own_overall_lead }}
                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.no_of_dispute_lost_overall')

                    </h6>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of Disputes Involved In</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#number_of_disputes_involved_in{{ $disputes_lead_developer_involved }}">
                            {{ $disputes_lead_developer_involved }}

                        </a>
                        @include('dashboard.ajax.leaddeveloper.modals.number_of_disputes_involved_in')
                    </p>

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Hours spent in revisions</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#hours_spent_in_revision{{ $spent_revision_developer_lead_count }}">
                            {{ $spent_revision_developer_lead }}
                        </a>
                    </p>
                    @include('dashboard.ajax.leaddeveloper.modals.hours_spent_in_revision')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>

</div>
<div class="row my-5">

    <div class="col-sm-6 col-lg-6 p-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Creation Date</th>
                    <th>Task Name</th>
                    <th>Client Name</th>
                    <th>Submittion date</th>
                    <th>Current Status</th>
                </x-slot>

                @forelse($tasks as $task)
                    <tr>
                        <td class="pl-20">{{ $loop->index + 1 }}</td>
                        <td>
                            {{ $task->created_at->format('d-m-Y g:i A') }}
                        </td>
                        <td>
                            <a href="{{ route('tasks.show', $task->id) }}"> {{ $task->heading }}</a>
                        </td>
                        <td>
                            @if ($task?->project?->client)
                                <a href="{{ route('clients.show', $task->project->client->id) }}">
                                    {{ $task->project->client->name }}</a>
                            @endif
                        </td>

                        <td>
                            @if ($task->board_column_id == 2 || $task->board_column_id == 1 || $task->board_column_id == 3)
                                N\A
                            @else
                                {{ $task?->latestTaskSubmission?->created_at->format('d-m-Y g:i A') }}
                            @endif

                        </td>
                        <td>
                            <span style="color: {{ $task->stat->label_color }}">
                                {{ $task->stat->column_name }}</span>
                        </td>
                    </tr>
                @empty

                    <tr>
                        <td colspan="10" class="shadow-none">
                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                        </td>
                    </tr>
                @endforelse

            </x-table>
        </x-cards.data>
    </div>

    <div class="col-sm-6 col-lg-6 p-3">
        <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
            <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                <x-slot name="thead">
                    <th class="pl-20">#</th>
                    <th>Creation Date</th>
                    <th>task Name</th>
                    <th>Client Name</th>
                    <th>Current Status</th>

                </x-slot>

                @forelse($past_tasks as $task)
                    <tr>
                        <td class="pl-20">{{ $loop->index + 1 }}</td>
                        <td>
                            {{ $task->created_at->format('d-m-Y g:i A') }}
                        </td>
                        <td>
                            <a href="{{ route('tasks.show', $task->id) }}"> {{ $task->heading }}</a>
                        </td>
                        <td>
                            @if ($task?->project?->client)
                                <a href="{{ route('clients.show', $task->project->client->id) }}">
                                    {{ $task->project->client->name }}</a>
                            @endif
                        </td>

                        <td>
                            <span style="color: {{ $task->stat->label_color }}">
                                {{ $task->stat->column_name }}</span>
                        </td>
                    </tr>
                @empty

                    <tr>
                        <td colspan="10" class="shadow-none">
                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                        </td>
                    </tr>
                @endforelse

            </x-table>
        </x-cards.data>
    </div>
    <script>
        $(document).ready(function() {
            // Enable Bootstrap popovers
            $('[data-toggle="popover"]').popover();

            // Handle click on task status element
            $('.task-status').on('click', function() {
                var taskId = $(this).data('task-id');
                var url = '{{ route('task_history_dashboard', ':taskId') }}'.replace(':taskId', taskId);

                // Reference 'this' to use inside the AJAX success function
                var self = $(this);

                // Make an AJAX request to fetch task history data
                $.ajax({
                    url: url,
                    type: 'GET',
                    success: function(data) {
                        console.log(data);
                        // Format the task history data for display in the popover
                        var popoverContent = '<ul >';
                        $.each(data, function(index, history) {

                            // popoverContent += '<li class="history_color">' + history.column_name + ' (' + history?.created_on + ')</li>';
                            popoverContent +=
                                `<li> ${history.column_name} (${history.created_on}) </li>`;


                        });
                        popoverContent += '</ul>';

                        // Open a Bootstrap popover and display the task history data
                        self.popover({
                            content: popoverContent,
                            html: true,
                            title: 'Task History',
                            placement: 'auto',
                            trigger: 'manual' // Set trigger to 'manual' to control popover manually
                        }).popover('show');
                    },
                    error: function(xhr, status, error) {
                        console.error('Error fetching task history:', error);
                    }
                });
            });
        });
    </script>
