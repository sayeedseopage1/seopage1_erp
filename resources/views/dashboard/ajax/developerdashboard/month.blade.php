<div>
    <div class="row">
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#number_of_task_received{{ $number_of_tasks_received }}">
                                {{ $number_of_tasks_received }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.number_of_task_received')
                    </div>
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
                                data-target="#submit_number_of_tasks_in_this_month{{ $submit_number_of_tasks_in_this_month }}">

                                {{ $submit_number_of_tasks_in_this_month }}

                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.number_of_task_submitted')

                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Lead
                        Developer</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#first_attempt_approve_task{{ $first_attempt_approve_task_in_this_month_count }}">
                                {{ $first_attempt_approve_task_in_this_month_count }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_data')
                    </div>
                </div>
            </div>
        </div>
    </div>
    {{-- <div class="row mt-3"> --}}
        {{-- <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received Secondary Pages
                    </h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#number_of_task_received_secondary_pages{{ $number_of_tasks_received_secondary_page }}">
                                {{ $number_of_tasks_received_secondary_page }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.number_of_task_received_secondary_pages')
                    </div>
                </div>
            </div>
        </div> --}}
        {{-- <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received Others</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#number_of_task_received_others_pages{{ $number_of_task_others_page_in_this_month }}">
                            {{ $number_of_task_others_page_in_this_month }}
                        </a>
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.number_of_task_received_others_pages')
                </div>
            </div>
        </div>
    </div> --}}
        {{-- <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of Submit Task for Primary Page
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#submit_number_of_tasks_in_this_month_primary_page{{ $submit_number_of_tasks_primary_page_in_this_month }}">

                            {{ $submit_number_of_tasks_primary_page_in_this_month }}

                        </a>
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.number_of_task_submitted_primary_page')

                </div>
            </div>

        </div>
    </div> --}}
    {{-- </div>
    <div class="row mt-3"> --}}
        {{-- <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of Submit Task for Secondary Page
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#submit_number_of_tasks_in_this_month_secondary_page{{ $submit_number_of_tasks_secondary_page_in_this_month }}">

                            {{ $submit_number_of_tasks_secondary_page_in_this_month }}

                        </a>
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.number_of_task_submitted_secondary_page')
                </div>
            </div>

        </div>
    </div> --}}
        {{-- <div class="col-md-4">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of Submit Task for Others</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal"
                            data-target="#submit_number_of_tasks_in_this_month_other_page{{ $submit_number_of_tasks_others_page_in_this_month }}">

                            {{ $submit_number_of_tasks_others_page_in_this_month }}

                        </a>
                    </p>
                    @include('dashboard.ajax.developerdashboard.modals.number_of_task_submitted_other_page')
                </div>
            </div>

        </div>
    </div> --}}
        {{-- <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received Primary Pages</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#number_of_task_received_primary_pages{{ $number_of_tasks_received_primary_page }}">
                                {{ $number_of_tasks_received_primary_page }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.number_of_task_received_primary_pages')
                    </div>
                </div>
            </div>
        </div> --}}

    {{-- </div> --}}
    {{-- <div class="row mt-3">
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Approved Task By Lead Developer in First
                        Attempt for Primary Page</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#first_attempt_approve_task_primary_page{{ $first_attempt_approve_task_primary_page_in_this_month }}">
                                {{ $first_attempt_approve_task_primary_page_in_this_month }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_data_primary_page')
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Approved Task By Lead Developer in First
                        Attempt for Secondry Page</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#first_attempt_approve_task_secondary_page{{ $first_attempt_approve_task_secondary_page_in_this_month }}">
                                {{ $first_attempt_approve_task_secondary_page_in_this_month }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_data_secondary_page')
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Approved Task By Lead Developer in First
                        Attempt for Others</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#first_attempt_approve_task_others_page{{ $first_attempt_approve_task_secondary_page_in_this_month }}">
                                {{ $first_attempt_approve_task_secondary_page_in_this_month }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_data_others_page')
                    </div>
                </div>
            </div>
        </div>
    </div> --}}
    <div class="row mt-3">
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                        Number of approved tasks on 1st attempt by Client
                    </h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#first_attempt_approve_task_client{{ $approved_task_by_client_in_first_attempt }}">
                                {{ count($approved_task_by_client_in_first_attempt_data) }}
                            </a>

                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.first_attempt_approve_task_client_data')

                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-4">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Lead
                        Developer</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#avg_task_approval_lead_developer{{ count($avg_no_of_submission_needed_for_app_by_lead_dev) }}">

                                {{ round($average_submission_approval_in_this_month, 2) }}

                            </a>

                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.avg_task_approval_lead_developer')

                    </div>
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
                                data-target="#avg_task_approval_client{{ count($average_number_of_attempts_needed_for_approval_by_client_data) }}">
                                {{ $average_number_of_attempts_needed_for_approval_by_client }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.avg_task_approval_client')

                    </div>
                </div>

            </div>
        </div>

    </div>
    <div class="row mt-3">
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#percentage_task_with_revision{{ count($percentage_of_tasks_with_revision_data) }}">
                                {{ round($percentage_of_tasks_with_revision, 2) }}%
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.percentage_task_with_revision')

                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                        Total number of revisions
                    </h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#total_no_of_revision{{ $number_of_total_revision }}">
                                {{ $number_of_total_revision }}
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.total_num_of_revision')

                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-6">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. logged time for complete tasks (In Hours)
                    </h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            Avg. Logged Time For Complete Tasks With Revisions (In Hours):
                            <a href="#" data-toggle="modal"
                                data-target="#avg_logged_time_complete_task{{ count($average_submission_time_in_this_month_data) }}">
                                {{ $average_submission_time_in_this_month }} Hours
                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.avg_logged_time_complete_task')
                        </p>
                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            Avg. Logged Time For Complete Tasks Without Revisions (In Hours):
                            <a href="#" data-toggle="modal"
                                data-target="#avg_logged_time_complete_task_without_revision{{ count($avg_logged_time_complete_task_without_revision_data) }}">
                                {{ $avg_logged_time_complete_task_without_revision }} Hours
                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.avg_logged_time_complete_task_without_revision')
                        </p>

                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> Average task submission time (In days)</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#avg_task_submission_time_in_days{{ $submit_number_of_tasks_in_this_month }}">

                                {{ $average_submission_day_in_this_month }} Days

                            </a>

                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.avg_task_submission_time_in_days')

                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#avg_num_in_progress{{ count($average_in_progress_date_range_date) }}">

                                {{ $average_in_progress_date_range }}

                            </a>

                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.avg_num_in_progress')

                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                        Percentage of Task Where Given Estimated Time was Missed (for first submission)
                    </h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#deadline_was_missed{{ count($percentage_of_tasks_where_given_estimated_time_was_missed_without_revision_data) }}">
                                {{ $percentage_of_tasks_where_given_estimated_time_was_missed_without_revision }}%
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.percentage_task_deadline_missed')
                    </div>
                </div>

            </div>
        </div>
        <div class="col-md-3">
            <div
                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                        Percentage of Task Where Given Estimated Time was Missed (for first submission plus revisions)
                    </h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#estimated_time_was_missed{{ $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision_total_missed }}">
                                {{ $percentage_of_tasks_where_given_estimated_time_was_missed_with_revision }}%
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.estimated_time_was_missed')

                    </div>
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
                        Percentage of Tasks Where the Deadline Was Missed
                    </h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal"
                                data-target="#where_the_deadline_was_missed{{ $number_of_tasks_where_deadline_missed_submitted_tasks }}">
                                {{ round($percentage_of_tasks_deadline, 2) }}%
                            </a>
                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.where_the_deadline_was_missed')
                    </div>
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
                                data-target="#hours_spent_in_revision_modal{{ $hours_spent_revision_developer_count }}">
                                {{ $hours_spent_revision_developer }}

                            </a>

                        </p>
                        @include('dashboard.ajax.developerdashboard.modals.hours_spent_in_revision_modal')

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

                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes filed:

                            <a href="#" data-toggle="modal"
                                data-target="#dispute_file_own{{ count($number_of_dispute_filed_own_data) }}">
                                {{ $number_of_dispute_filed_own }}
                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.dispute_file_own')

                        </p>
                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes (Overall):
                            <a href="#" data-toggle="modal"
                                data-target="#disput_file_all_data{{ $number_of_dispute_filed_overall }}">
                                {{ $number_of_dispute_filed_overall }}
                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.dispute_file_all_data')
                        </p>

                    </div>
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

                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes lost(Raised By Developer):
                            <a href="#" data-toggle="modal"
                                data-target="#no_of_dispute_lost{{ count($number_of_dispute_lost_data) }}">

                                {{ $number_of_dispute_lost }}

                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost')

                        </p>
                        <p class="mb-0 f-18 font-weight-bold mr-5">
                            No. of disputes lost(Overall):
                            <a href="#" data-toggle="modal"
                                data-target="#no_of_dispute_lost_overall{{ $number_of_dispute_lost_overall }}">
                                {{ $number_of_dispute_lost_overall }}
                            </a>
                            @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost_overall')
                        </p>

                    </div>
                </div>

            </div>
        </div>

    </div>
    <div class="row mt-3">

        <div class="col-sm-6 col-lg-6">
            <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
                <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>Date</th>
                        <th>Task Name</th>
                        <th>Client Name</th>
                        <th>Submittion date</th>
                        <th>Current Status</th>

                    </x-slot>

                    @forelse($tasks as $task)
                        <tr>
                            <td class="pl-20">{{ $loop->index + 1 }}</td>
                            <td>
                                {{ $task->created_at }}
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
                                    {{ $task?->latestTaskSubmission?->created_at }}
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

        <div class="col-sm-6 col-lg-6">
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
                                {{ $task->created_at }}
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

    </div>
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
