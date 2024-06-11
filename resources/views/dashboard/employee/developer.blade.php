@extends('layouts.app')
@push('datatable-styles')
    @include('sections.daterange_css')
@endpush
@push('styles')
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
        <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    @endif
    <style>
        .h-200 {
            max-height: 340px;
            overflow-y: auto;
        }

        .dashboard-settings {
            width: 600px;
        }

        @media (max-width: 768px) {
            .dashboard-settings {
                width: 300px;
            }
        }

        .fc-list-event-graphic {
            display: none;
        }

        .fc .fc-list-event:hover td {
            background-color: #fff !important;
            color: #000 !important;
        }

        .left-3 {
            margin-right: -22px;
        }

        .clockin-right {
            margin-right: -10px;
        }

        .week-pagination li {
            margin-right: 5px;
            z-index: 1;
        }

        .week-pagination li a {
            border-radius: 50%;
            padding: 2px 6px !important;
            font-size: 11px !important;
        }

        .week-pagination li.page-item:first-child .page-link {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
        }

        .week-pagination li.page-item:last-child .page-link {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
        }

        .hide-calender .table-condensed thead tr:nth-child(2),
        .hide-calender .table-condensed tbody {
            /*            display: none*/
        }

        .hide-calender.daterangepicker {
            width: 320px;
        }

        .hide-calender.monthselect {
            width: 100% !important;
        }

        .line-height-30 {
            line-height: 30px;
        }

        .history-color {
            color:
                /* Your color value here */
            ;
        }
    </style>
@endpush
@section('content')
    <div class="px-4 py-2 border-top-0">
        <!-- WELOCOME START -->
        @if (!is_null($checkTodayLeave))
            <div class="row pt-4">
                <div class="col-md-12">
                    <x-alert type="info" icon="info-circle">
                        <a href="{{ route('leaves.show', $checkTodayLeave->id) }}" class="openRightModal text-dark-grey">
                            <u>@lang('messages.youAreOnLeave')</u>
                        </a>
                    </x-alert>
                </div>
            </div>
        @elseif (!is_null($checkTodayHoliday))
            <div class="row pt-4">
                <div class="col-md-12">
                    <x-alert type="info" icon="info-circle">
                        <a href="{{ route('holidays.show', $checkTodayHoliday->id) }}"
                            class="openRightModal text-dark-grey">
                            <u>@lang('messages.holidayToday')</u>
                        </a>
                    </x-alert>
                </div>
            </div>
        @endif

        <div class="d-lg-flex d-md-flex d-block py-4">
            <!-- WELOCOME NAME START -->
            <div>
                <h4 class=" mb-0 f-21 text-capitalize font-weight-bold">@lang('app.welcome')
                    {{ $user->name }}</h4>
            </div>
            <!-- WELOCOME NAME END -->
            <!-- CLOCK IN CLOCK OUT START -->
            @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 7)
                <div class="align-items-center border-left-grey border-left-grey-sm-0 h-100 pl-4 ml-5">
                    <div class="col-auto">
                        <label class="sr-only" for="inlineFormInputGroup"></label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text"> <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i>
                                </div>
                            </div>
                            <input id="datatableRange2" type="text"
                                class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                                placeholder="Start Date And End Date">
                        </div>
                    </div>
                </div>
            @endif
            <!-- CLOCK IN CLOCK OUT END -->
            <!-- User check in checkout button -->
            @if (Auth::user()->role_id != 14)
                <div id="employee-check-in-out-button"
                    class="ml-auto d-flex clock-in-out mb-3 mb-lg-0 mb-md-0 m mt-4 mt-lg-0 mt-md-0 justify-content-between">
                </div>
            @endif
        </div>
        <div class="emp-dash-detail">
            @if (count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
                @if (Auth::user()->role_id != 4 && Auth::user()->role_id != 7)
                    <div class="row">
                        @if (in_array('profile', $activeWidgets))
                            <!-- EMP DASHBOARD INFO START -->
                            <div class="col-md-12">
                                <div class="card border-0 b-shadow-4 mb-3 e-d-info">
                                    <div class="card-horizontal align-items-center">
                                        <div class="card-img">
                                            <img class="" src=" {{ $user->image_url }}" alt="Card image">
                                        </div>
                                        <div class="card-body border-0 pl-0">
                                            <h4 class="card-title f-18 f-w-500 mb-0">{{ mb_ucwords($user->name) }}</h4>
                                            <p class="f-14 font-weight-normal text-dark-grey mb-2">
                                                {{ $user->employeeDetails->designation->name ?? '--' }}</p>
                                            <p class="card-text f-12 text-lightest"> @lang('app.employeeId') :
                                                {{ mb_strtoupper($user->employeeDetails->employee_id) }}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <!-- EMP DASHBOARD INFO END -->
                        @endif

                    </div>
                @endif
            @endif

        </div>
        <div class="select-box d-flex border-right-grey border-right-grey-sm-0 mb-3 ml-auto">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input id="datatableRange2" type="text"
                    class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 mb-3">
                <div class="bg-white p-20 rounded b-shadow-4 mb-4 mb-md-0 mb-lg-0 pb-">
                    <p class="text-danger" style="font-family: 'Times New Roman', Times, serif; font-size: 25px;">
                        <marquee>These data are not dynamic fully, please ignore them. We are currently working on it.
                        </marquee>
                    </p>
                </div>
            </div>
        </div>

        <div id="generalHtml">
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
                    </div>
                    <div class="col-md-4">
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
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4">
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
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-4">
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
                    </div>
                    <div class="col-md-4">
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
                    </div>
                    <div class="col-md-4">
                        <div
                            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by
                                    Lead Developer</h5>
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
                <div class="row mt-3">
                    <div class="col-md-4">
                        <div
                            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by
                                    Client</h5>
                                <div class="d-flex flex-wrap">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#first_attempt_approve_task_client{{ count($first_attempt_approve_task_in_this_month_client_data) }}">
                                            {{ count($first_attempt_approve_task_in_this_month_client_data) }}
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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval
                                    by Lead Developer</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#avg_task_approval_lead_developer{{ count($avg_no_of_submission_needed_for_app_by_lead_dev) }}">

                                            {{ round($average_submission_aproval_in_this_month, 2) }}

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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval
                                    by Client</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#avg_task_approval_client{{ count($average_number_of_tasks_approved_client_data) }}">
                                            {{ round($average_submission_aproval_in_this_month_client, 2) }}
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
                                            data-target="#percentage_task_with_revision{{ count($revision_task_data) }}">
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
                                            data-target="#total_no_of_revision{{ count($revision_task_data) }}">
                                            {{ round($number_of_total_revision_for_this_month, 2) }}%
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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. logged time for complete tasks (In
                                    Hours)</h5>
                                <div class="d-flex flex-wrap">
                                    <p class="mb-0 f-18 font-weight-bold mr-5">
                                        Avg. Logged Time For Complete Tasks With Revisions (In Hours):
                                        <a href="#" data-toggle="modal"
                                            data-target="#avg_logged_time_complete_task{{ $submit_number_of_tasks_in_this_month }}">
                                            {{ round($average_submission_time_in_this_month, 2) }} Hours
                                        </a>
                                        @include('dashboard.ajax.developerdashboard.modals.avg_logged_time_complete_task')
                                    </p>
                                    <p class="mb-0 f-18 font-weight-bold mr-5">
                                        Avg. Logged Time For Complete Tasks Without Revisions (In Hours):
                                        <a href="#" data-toggle="modal"
                                            data-target="#avg_logged_time_complete_task_without_revision{{ $submit_number_of_tasks_in_this_month }}">
                                            {{ round($avg_logged_time_complete_task_without_revision, 2) }} Hours
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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average task submission time (In days)
                                </h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#avg_task_submission_time_in_days{{ $submit_number_of_tasks_in_this_month }}">

                                            {{ round($average_submission_day_in_this_month, 2) }} Days

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
                                            data-target="#avg_num_in_progress{{ count($total_in_progress_date_range_table) }}">

                                            {{ round($average_in_progress_date_range, 2) }}

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
                                    Percentage of tasks where deadline was missed
                                </h5>
                                <div class="d-flex flex-wrap">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#deadline_was_missed{{ count($deadline_missed_task_data) }}">
                                            {{ round($percentage_of_tasks_deadline, 2) }}%
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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated
                                    time was missed</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#estimated_time_was_missed{{ count($estimate_missed_task_data) }}">
                                            {{ round($percentage_of_tasks_where_given_estimated_time_was_missed_with_revision, 2) }}%
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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rejection rate</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal" data-target="#">Under Development</a>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-4">
                        <div
                            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                                    Cancelation rate
                                </h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal" data-target="#">Under Development</a>

                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-4">
                        <div
                            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                            <div class="d-block text-capitalize">
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rate of reassign</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal" data-target="#">Under Development</a>

                                    </p>

                                </div>
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
                                            data-target="#disput_file_all_data{{ count($number_of_dispute_filed_all_data) }}">
                                            {{ $number_of_dispute_filed_all }}
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
                                    Number of disputes lost
                                </h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-18 font-weight-bold mr-5">
                                        No. of disputes lost(Raised By Developer):
                                        <a href="#" data-toggle="modal"
                                            data-target="#no_of_dispute_lost{{ count($number_of_dispute_filed_own_data) }}">

                                            {{ $number_of_dispute_lost_own }}

                                        </a>
                                        @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost')

                                    </p>
                                    <p class="mb-0 f-18 font-weight-bold mr-5">
                                        No. of disputes lost(Overall):
                                        <a href="#" data-toggle="modal"
                                            data-target="#no_of_dispute_lost_overall{{ count($number_of_dispute_filed_all_data) }}">

                                            {{ $number_of_dispute_lost_all }}

                                        </a>
                                        @include('dashboard.ajax.developerdashboard.modals.no_of_dispute_lost_overall')

                                    </p>

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
                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Hours spent in revisions</h5>
                                <div class="d-flex flex-wrap">

                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        <a href="#" data-toggle="modal"
                                            data-target="#hours_spent_in_revision_modal{{ count($spent_revision_developer_data) }}">

                                            {{ $spent_revision_developer }}

                                        </a>

                                    </p>
                                    @include('dashboard.ajax.developerdashboard.modals.hours_spent_in_revision_modal')

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
                                            {{ $task->created_at }}
                                        </td>
                                        <td>
                                            <a href="{{ route('tasks.show', $task->id) }}"> {{ $task->heading }}</a>

                                        </td>
                                        <td>
                                            @if ($task->ProjectId != null)
                                                <a
                                                    href="{{ $task->client_id ? route('clients.show', $task->client_id) : '#' }}">{{ $task->clientName }}</a>
                                            @elseif($task->task_client_name != null)
                                                {{ $task->task_client_name }}
                                            @else
                                                {{ $task->cl_name }}
                                            @endif

                                        </td>

                                        <td>
                                            @if ($task->board_column_id == 2 || $task->board_column_id == 1 || $task->board_column_id == 3)
                                                N\A
                                            @else
                                                {{ $task->submission_date }}
                                            @endif

                                        </td>
                                        <td>
                                            <span class="task-status" data-task-id="{{ $task->id }}"
                                                style="color: {{ $task->label_color }}; cursor:pointer">
                                                {{ $task->column_name }}
                                            </span>

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
                                            @if ($task->ProjectId != null)
                                                <a
                                                    href="{{ $task->client_id ? route('clients.show', $task->client_id) : '#' }}">{{ $task->clientName }}</a>
                                            @elseif($task->task_client_name != null)
                                                {{ $task->task_client_name }}
                                            @else
                                                {{ $task->cl_name }}
                                            @endif

                                        </td>

                                        <td>
                                            <span class="task-status" data-task-id="{{ $task->id }}"
                                                style="color: {{ $task->label_color }}; cursor:pointer">
                                                {{ $task->column_name }}
                                            </span>

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
                    <!-- CARD BODY START -->

                </div>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-7">
                        <!-- EMP DASHBOARD EVENTS START -->
                        @if (Auth::user()->role_id != 4 && Auth::user()->role_id != 7)
                            @if (in_array('my_calender', $activeWidgets))
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <x-cards.data :title="__('app.menu.myCalendar')">
                                            <div id="calendar"></div>
                                            <x-slot name="action">
                                                <div class="dropdown ml-auto calendar-action">
                                                    <button id="event-btn"
                                                        class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle cal-event"
                                                        type="button" aria-haspopup="true" aria-expanded="false">
                                                        <i class="fa fa-ellipsis-h"></i>
                                                    </button>

                                                    <div id="cal-drop"
                                                        class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-2">
                                                        @if (in_array('tasks', user_modules()))
                                                            <div class="custom-control custom-checkbox cal-filter">
                                                                <input id="customCheck1" type="checkbox" value="task"
                                                                    class="form-check-input filter-check"
                                                                    name="calendar[]"
                                                                    @if (in_array('task', $event_filter)) checked @endif>
                                                                <label
                                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                                    for="customCheck1">@lang('app.menu.tasks')</label>
                                                            </div>
                                                        @endif
                                                        @if (in_array('events', user_modules()))
                                                            <div class="custom-control custom-checkbox cal-filter">
                                                                <input id="customCheck2" type="checkbox" value="events"
                                                                    class="form-check-input filter-check"
                                                                    name="calendar[]"
                                                                    @if (in_array('events', $event_filter)) checked @endif>
                                                                <label
                                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                                    for="customCheck2">@lang('app.menu.Events')</label>
                                                            </div>
                                                        @endif
                                                        @if (in_array('holidays', user_modules()))
                                                            <div class="custom-control custom-checkbox cal-filter">
                                                                <input id="customCheck3" type="checkbox" value="holiday"
                                                                    class="form-check-input filter-check"
                                                                    name="calendar[]"
                                                                    @if (in_array('holiday', $event_filter)) checked @endif>
                                                                <label
                                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                                    for="customCheck3">@lang('app.menu.holiday')</label>
                                                            </div>
                                                        @endif
                                                        @if (in_array('tickets', user_modules()))
                                                            <div class="custom-control custom-checkbox cal-filter">
                                                                <input id="customCheck4" type="checkbox" value="tickets"
                                                                    class="form-check-input filter-check"
                                                                    name="calendar[]"
                                                                    @if (in_array('tickets', $event_filter)) checked @endif>
                                                                <label
                                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                                    for="customCheck4">@lang('app.menu.tickets')</label>
                                                            </div>
                                                        @endif
                                                        @if (in_array('leaves', user_modules()))
                                                            <div class="custom-control custom-checkbox cal-filter">
                                                                <input id="customCheck5" type="checkbox" value="leaves"
                                                                    class="form-check-input filter-check"
                                                                    name="calendar[]"
                                                                    @if (in_array('leaves', $event_filter)) checked @endif>
                                                                <label
                                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                                    for="customCheck5">@lang('app.menu.leaves')</label>
                                                            </div>
                                                        @endif
                                                    </div>
                                                </div>
                                            </x-slot>
                                        </x-cards.data>
                                    </div>
                                </div>
                            @endif
                        @endif
                        <!-- EMP DASHBOARD EVENTS END -->
                    </div>
                    <div class="col-md-5">
                        @if (in_array('notices', $activeWidgets))
                            @isset($notices)
                                <!-- EMP DASHBOARD NOTICE START -->
                                <div class="col-md-12">
                                    <div class="mb-3 b-shadow-4 rounded bg-white pb-2">
                                        <!-- NOTICE HEADING START -->
                                        <div class="d-flex align-items-center b-shadow-4 p-20">
                                            <p class="mb-0 f-18 f-w-500"> @lang('app.menu.notices') </p>
                                        </div>
                                        <!-- NOTICE HEADING END -->
                                        <!-- NOTICE DETAIL START -->
                                        <div id="empDashNotice" class="b-shadow-4 cal-info scroll ps" data-menu-vertical="1"
                                            data-menu-scroll="1" data-menu-dropdown-timeout="500" style="overflow: hidden;">

                                            @foreach ($notices as $notice)
                                                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                                                    <div class="card-horizontal">
                                                        <div class="card-header m-0 p-0 bg-white rounded">
                                                            <x-date-badge :month="$notice->created_at->format('M')" :date="$notice->created_at
                                                                ->timezone(global_setting()->timezone)
                                                                ->format('d')" />
                                                        </div>
                                                        <div class="card-body border-0 p-0 ml-3">
                                                            <h4
                                                                class="card-title f-14 font-weight-normal text-capitalize mb-0">
                                                                <a href="{{ route('notices.show', $notice->id) }}"
                                                                    class="openRightModal text-darkest-grey">{{ $notice->heading }}</a>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div><!-- card end -->
                                            @endforeach

                                            <div class="ps__rail-x" style="left: 0px; top: 0px;">
                                                <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                            </div>
                                            <div class="ps__rail-y" style="top: 0px; left: 0px;">
                                                <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                            </div>
                                        </div>
                                        <!-- NOTICE DETAIL END -->
                                    </div>
                                </div>
                                <!-- EMP DASHBOARD NOTICE END -->
                            @endisset
                        @endif
                        @if (!is_null($myActiveTimer))
                            <div id="myActiveTimerSection" class="col-sm-12">
                                <x-cards.data :title="__('modules.timeLogs.myActiveTimer')">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format('M d, Y' . ' - ' . global_setting()->time_format) }}
                                            <p class="text-primary my-2">
                                                @php
                                                    $endTime = now();
                                                    $totalHours =
                                                        $endTime->diff($myActiveTimer->start_time)->format('%d') * 24 +
                                                        $endTime->diff($myActiveTimer->start_time)->format('%H');
                                                    $totalMinutes =
                                                        $totalHours * 60 +
                                                        $endTime->diff($myActiveTimer->start_time)->format('%i');

                                                    $totalMinutes =
                                                        $totalMinutes - $myActiveTimer->breaks->sum('total_minutes');

                                                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                    if ($totalMinutes % 60 > 0) {
                                                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                    }
                                                @endphp

                                                <strong>@lang('modules.timeLogs.totalHours'):</strong> {{ $timeLog }}
                                            </p>

                                            <ul class="list-group">
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                                    <span><i class="fa fa-clock"></i>
                                                        @lang('modules.timeLogs.startTime')</span>
                                                    {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                                </li>
                                                <li
                                                    class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                                    <span><i class="fa fa-briefcase"></i> @lang('app.task')</span>
                                                    <a href="{{ route('tasks.show', $myActiveTimer->task->id) }}"
                                                        class="text-dark-grey">{{ $myActiveTimer->task->heading }}</a>
                                                </li>
                                                @foreach ($myActiveTimer->breaks as $item)
                                                    <li
                                                        class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                                        @if (!is_null($item->end_time))
                                                            @php
                                                                $endTime = $item->end_time;
                                                                $totalHours =
                                                                    $endTime->diff($item->start_time)->format('%d') *
                                                                        24 +
                                                                    $endTime->diff($item->start_time)->format('%H');
                                                                $totalMinutes =
                                                                    $totalHours * 60 +
                                                                    $endTime->diff($item->start_time)->format('%i');

                                                                $timeLog =
                                                                    intdiv($totalMinutes, 60) .
                                                                    ' ' .
                                                                    __('app.hrs') .
                                                                    ' ';

                                                                if ($totalMinutes % 60 > 0) {
                                                                    $timeLog .=
                                                                        $totalMinutes % 60 . ' ' . __('app.mins');
                                                                }
                                                            @endphp
                                                            <span><i class="fa fa-mug-hot"></i>
                                                                @lang('modules.timeLogs.break')
                                                                ({{ $timeLog }})
                                                            </span>
                                                            {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) . ' - ' . $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                                        @else
                                                            <span><i class="fa fa-mug-hot"></i>
                                                                @lang('modules.timeLogs.break')</span>
                                                            {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                                        @endif
                                                    </li>
                                                @endforeach
                                            </ul>

                                        </div>
                                        {{--  <div class="col-sm-12 pt-3 text-right">
                                            @if ($editTimelogPermission == 'all' || ($editTimelogPermission == 'added' && $myActiveTimer->added_by == user()->id) || ($editTimelogPermission == 'owned' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id)) || ($editTimelogPermission == 'both' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id || $myActiveTimer->added_by == user()->id)))
                                                @if (is_null($myActiveTimer->activeBreak))
                                                    <x-forms.button-secondary icon="pause-circle"
                                                        data-time-id="{{ $myActiveTimer->id }}" id="pause-timer-btn">
                                                        @lang('modules.timeLogs.pauseTimer')</x-forms.button-secondary>
                                                    <x-forms.button-primary class="ml-3 stop-active-timer"
                                                        data-time-id="{{ $myActiveTimer->id }}" icon="stop-circle">
                                                        @lang('modules.timeLogs.stopTimer')</x-forms.button-primary>
                                                @else
                                                    <x-forms.button-primary id="resume-timer-btn" icon="play-circle"
                                                        data-time-id="{{ $myActiveTimer->activeBreak->id }}">
                                                        @lang('modules.timeLogs.resumeTimer')</x-forms.button-primary>
                                                @endif
                                            @endif
                                        </div> --}}
                                    </div>
                                </x-cards.data>
                            </div>
                        @endif
                        @if (in_array('week_timelog', $activeWidgets))
                            <div class="col">
                                <div
                                    class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mt-3">
                                    <div class="d-block text-capitalize w-100">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">@lang('modules.dashboard.weekTimelog') <span
                                                class="badge badge-secondary ml-1 f-10">{{ minute_to_hour($weekWiseTimelogs - $weekWiseTimelogBreak) . ' ' . __('modules.timeLogs.thisWeek') }}</span>
                                        </h5>

                                        <div id="weekly-timelogs">
                                            <nav class="mb-3">
                                                <ul class="pagination pagination-sm week-pagination">
                                                    @foreach ($weekPeriod->toArray() as $date)
                                                        <li @class([
                                                            'page-item',
                                                            'week-timelog-day',
                                                            'active' =>
                                                                now(global_setting()->timezone)->toDateString() ==
                                                                $date->toDateString(),
                                                        ]) data-toggle="tooltip"
                                                            data-original-title="{{ $date->format(global_setting()->date_format) }}"
                                                            data-date="{{ $date->toDateString() }}">
                                                            <a class="page-link"
                                                                href="javascript:;">{{ $date->isoFormat('dd') }}</a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </nav>
                                            <div class="progress" style="height: 7px;">
                                                @php
                                                    $totalDayMinutes = $dateWiseTimelogs->sum('total_minutes');
                                                    $totalDayBreakMinutes = $dateWiseTimelogBreak->sum('total_minutes');
                                                    $totalDayMinutesPercent =
                                                        $totalDayMinutes > 0
                                                            ? floatval(
                                                                (floatval($totalDayMinutes - $totalDayBreakMinutes) /
                                                                    $totalDayMinutes) *
                                                                    100,
                                                            )
                                                            : 0;
                                                @endphp
                                                <div class="progress-bar bg-primary" role="progressbar"
                                                    style="width: {{ $totalDayMinutesPercent }}%"
                                                    aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0"
                                                    aria-valuemax="100" data-toggle="tooltip"
                                                    data-original-title="{{ minute_to_hour($totalDayMinutes - $totalDayBreakMinutes) }}">
                                                </div>

                                                <div class="progress-bar bg-secondary" role="progressbar"
                                                    style="width: {{ 100 - $totalDayMinutesPercent }}%"
                                                    aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0"
                                                    aria-valuemax="100" data-toggle="tooltip"
                                                    data-original-title="{{ minute_to_hour($totalDayBreakMinutes) }}">
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-between mt-1 text-dark-grey f-12">
                                                <small>@lang('app.duration'):
                                                    {{ minute_to_hour($dateWiseTimelogs->sum('total_minutes') - $dateWiseTimelogBreak->sum('total_minutes')) }}</small>
                                                <small>@lang('modules.timeLogs.break'):
                                                    {{ minute_to_hour($dateWiseTimelogBreak->sum('total_minutes')) }}</small>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection
@push('scripts')
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
        <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
        <script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
        <script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>
        <script>
            var initialLocaleCode = '{{ user()->locale }}';
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                locale: initialLocaleCode,
                timeZone: '{{ global_setting()->timezone }}',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                navLinks: true, // can click day/week names to navigate views
                selectable: false,
                initialView: 'listWeek',
                selectMirror: true,
                select: function(arg) {
                    addEventModal(arg.start, arg.end, arg.allDay);
                    calendar.unselect()
                },
                eventClick: function(arg) {
                    getEventDetail(arg.event.id, arg.event.extendedProps.event_type);
                },
                editable: false,
                dayMaxEvents: true, // allow "more" link when too many events
                events: {
                    url: "{{ route('dashboard.private_calendar') }}",
                },
                eventDidMount: function(info) {
                    $(info.el).css('background-color', info.event.extendedProps.bg_color);
                    $(info.el).css('color', info.event.extendedProps.color);
                    $(info.el).find('td.fc-list-event-title').prepend('<i class="fa ' + info.event.extendedProps
                        .icon + '"></i>&nbsp;&nbsp;');
                    // tooltip for leaves
                    if (info.event.extendedProps.event_type == 'leave') {
                        $(info.el).find('td.fc-list-event-title > a').css('cursor',
                            'default'); // list view cursor for leave
                        $(info.el).css('cursor', 'default')
                        $(info.el).tooltip({
                            title: info.event.extendedProps.name,
                            container: 'body',
                            delay: {
                                "show": 50,
                                "hide": 50
                            }
                        });
                    }
                },
                eventTimeFormat: { // like '14:30:00'
                    hour: global_setting.time_format == 'H:i' ? '2-digit' : 'numeric',
                    minute: '2-digit',
                    meridiem: global_setting.time_format == 'H:i' ? false : true
                }
            });

            calendar.render();

            // Task Detail show in sidebar
            var getEventDetail = function(id, type) {
                if (type == 'ticket') {
                    var url = "{{ route('tickets.show', ':id') }}";
                    url = url.replace(':id', id);
                    window.location = url;
                    return true;
                }

                if (type == 'leave') {
                    return true;
                }

                openTaskDetail();

                switch (type) {
                    case 'task':
                        var url = "{{ route('tasks.show', ':id') }}";
                        break;
                    case 'event':
                        var url = "{{ route('events.show', ':id') }}";
                        break;
                    case 'holiday':
                        var url = "{{ route('holidays.show', ':id') }}";
                        break;
                    case 'leave':
                        var url = "{{ route('leaves.show', ':id') }}";
                        break;
                    default:
                        return 0;
                        break;
                }

                url = url.replace(':id', id);

                $.easyAjax({
                    url: url,
                    blockUI: true,
                    container: RIGHT_MODAL,
                    historyPush: true,
                    success: function(response) {
                        if (response.status == "success") {
                            $(RIGHT_MODAL_CONTENT).html(response.html);
                            $(RIGHT_MODAL_TITLE).html(response.title);
                        }
                    },
                    error: function(request, status, error) {
                        if (request.status == 403) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">403 | Permission Denied</div>'
                            );
                        } else if (request.status == 404) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">404 | Not Found</div>'
                            );
                        } else if (request.status == 500) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">500 | Something Went Wrong</div>'
                            );
                        }
                    }
                });

            };

            // calendar filter
            var hideDropdown = false;

            $('#event-btn').click(function() {
                if (hideDropdown == true) {
                    $('#cal-drop').hide();
                    hideDropdown = false;
                } else {
                    $('#cal-drop').toggle();
                    hideDropdown = true;
                }
            });


            $(document).mouseup(e => {

                const $menu = $('.calendar-action');

                if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
                    hideDropdown = false;
                    $('#cal-drop').hide();
                }
            });


            $('.cal-filter').on('click', function() {

                var filter = [];

                $('.filter-check:checked').each(function() {
                    filter.push($(this).val());
                });

                if (filter.length < 1) {
                    filter.push('None');
                }

                calendar.removeAllEventSources();
                calendar.addEventSource({
                    url: "{{ route('dashboard.private_calendar') }}",
                    extraParams: {
                        filter: filter
                    }
                });

                filter = null;
            });
        </script>
        <script>
            $(document).ready(function() {
                var todayDate = moment();
                var monthDate = moment();

                $('.todayDate').text(todayDate.format('dddd LL'));

                var todayOnlyDate = moment(todayDate).format('DD');
                if (todayOnlyDate > 21) {
                    var text = '21st ' + moment(monthDate).format('MMMM, YYYY') + ' to 20th ' + moment(monthDate).add(1,
                        'month').format('MMMM, YYYY');
                    $('.monthDate').text(text);
                    $('.monthDateOnHeading').text(text);
                } else {
                    $('.monthDate').text('21st ' + moment(monthDate).subtract(1, 'month').format('MMMM, YYYY') +
                        ' to 20th ' + moment(monthDate).startOf('month').add(20, 'day').format('MMMM, YYYY'));
                }

                $('.fc-prev-button').click(function() {
                    var mode = $(this).attr('date-mode');
                    if (mode == 'month') {
                        if (todayOnlyDate > 21) {
                            monthDate = moment(monthDate).subtract(1, 'month');
                        } else {
                            monthDate = moment(monthDate).subtract(2, 'month');
                        }
                        $(this).next().text('21st ' + moment(monthDate).format('MMMM, YYYY') + ' to 20th ' +
                            moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                        date = monthDate
                    } else {
                        todayDate = moment(todayDate).subtract(1, 'days');
                        $(this).next().text(todayDate.format('dddd LL'));
                        date = todayDate
                    }

                    getData(mode, $(this), date);
                });

                $('.fc-next-button').click(function() {
                    var mode = $(this).attr('date-mode');
                    if (mode == 'month') {
                        monthDate = moment(monthDate).add(1, 'month');
                        $(this).prev().text('21st ' + moment(monthDate).format('MMMM, YYYY') + ' to 20th ' +
                            moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                        date = monthDate
                    } else {
                        todayDate = moment(todayDate).add(1, 'days');
                        $(this).prev().prev().text(todayDate.format('dddd LL'));
                        date = todayDate
                    }

                    getData(mode, $(this), date);
                });

                $('.fc-today-button').click(function() {
                    todayDate = moment();
                })
            });

            function getData(mode, disableButton, date) {
                $.easyAjax({
                    url: this.href,
                    type: "GET",
                    disableButton: true,
                    buttonSelector: disableButton,
                    data: {
                        mode: mode,
                        startDate: date.format('YYYY-MM-DD'),
                    },
                    success: function(resp) {
                        $('#' + mode + 'Html').html(resp.html);
                    }
                })
            }

            @php
                $startDate = \Carbon\Carbon::now()->startOfMonth();
                $endDate = \Carbon\Carbon::now();
            @endphp
            $(function() {
                var format = '{{ global_setting()->moment_format }}';
                var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
                var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
                var picker = $('#datatableRange2');
                var start = moment(startDate, format);
                var end = moment(endDate, format);

                function cb(start, end) {
                    $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                        ' @lang('app.to') ' + end.format('{{ global_setting()->moment_date_format }}'));
                    $('#reset-filters').removeClass('d-none');
                }

                $('#datatableRange2').daterangepicker({
                    locale: daterangeLocale,
                    linkedCalendars: false,
                    startDate: start,
                    endDate: end,
                    ranges: daterangeConfig,
                    opens: 'left',
                    parentEl: '.dashboard-header'
                }, cb);

                $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                    showTable();
                });

                function showTable() {
                    var dateRangePicker = $('#datatableRange2').data('daterangepicker');
                    var startDate = $('#datatableRange').val();
                    var user_id = {{ Auth::user()->id }};
                    if (startDate == '') {
                        startDate = null;
                        endDate = null;
                    } else {
                        startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                        endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                    }

                    const requestUrl = this.href;


                    $.easyAjax({
                        url: requestUrl,
                        blockUI: true,
                        data: {
                            startDate: startDate,
                            endDate: endDate,
                            user_id: user_id,
                            // mode: 'general'
                        },
                        blockUI: true,
                        success: function(resp) {
                            if (resp.status == "success") {
                                $('#generalHtml').html(resp.html)
                            }
                        }
                    });
                }
            });
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
    @endif
@endpush
