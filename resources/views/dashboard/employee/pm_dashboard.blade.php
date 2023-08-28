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
    </style>
@endpush
@section('content')
    @php
        $project = \App\Models\Project::orderBy('id', 'DESC')->first();
        // dd($project);
    @endphp
    <div class="px-4 py-2 border-top-0">
        <!-- WELOCOME START -->


        <div class="d-lg-flex d-md-flex d-block py-4">
            <!-- WELOCOME NAME START -->
            <div>
                <h4 class=" mb-0 f-21 text-capitalize font-weight-bold">@lang('app.welcome')
                    {{ $user->name }}</h4>
            </div>
            <!-- WELOCOME NAME END -->
        </div>

        <div class="row my-2 text-center mx-auto">
            <div class="col-sm-12 pb-3">
                <div class="fc fc-media-screen fc-direction-ltr fc-theme-standard fc-liquid-hack text-center">
                    <div class="fc-toolbar-chunk">
                        <div class="fc-button-group">
                            <button date-mode="month" class="fc-prev-button fc-button fc-button-primary" type="button"
                                aria-label="prev">
                                <span class="fc-icon fc-icon-chevron-left"></span>
                            </button>
                            <h2 class="fc-toolbar-title mx-3 monthDate"></h2>
                            <button date-mode="month" class="fc-next-button fc-button fc-button-primary" type="button"
                                aria-label="next">
                                <span class="fc-icon fc-icon-chevron-right"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="monthHtml">
            <div class="row">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#projectModal{{ count($no_of_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ count($no_of_projects) }}<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Total assigned projects number') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.no_of_project.total_assign_project_number')

                                <a href="#" data-toggle="modal" data-target="#projectAcceptModal{{ count($no_of_accepted_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ count($no_of_accepted_projects) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Accepted projects') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.no_of_project.accept_project_modal')


                                <a href="#" data-toggle="modal" data-target="#rejectedProjectModal{{ count($no_of_rejected_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid">
                                        {{ count($no_of_rejected_projects) }}<span
                                            class="f-12 font-weight-normal text-lightest">@lang('Rejected projects')</span>
                                    </p>
                                </a>
                                @include('dashboard.employee.no_of_project.rejected_project_modal')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Project Value</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#totalAssignProjectValue{{ count($no_of_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($total_project_value,2) }} ($)<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total assigned projects value') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_project_value.total_assign_project_value')

                                <a href="#" data-toggle="modal" data-target="#projectAcceptValueModal{{ count($no_of_accepted_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($accepted_project_value, 2) }} ($)<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Accepted projects value') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_project_value.accept_project_modal')

                                <a href="#" data-toggle="modal" data-target="#rejectedProjectValueModal{{ count($no_of_rejected_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                                        {{ round($rejected_project_value, 2) }} ($)<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Rejected projects value') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_project_value.rejected_project_modal')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#releasedAmountCycle{{ count($total_released_amount_this_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($total_released_amount_this_cycle, 2) }} ($)<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Released amount for this Cycle') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_released_amount.released_amount_cycle')
                                <a href="#" data-toggle="modal" data-target="#totalReleasedAmount{{ count($total_released_amount_previous_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($total_released_amount_previous_cycle, 2) }} ($)<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total released amount') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_released_amount.total_released_amount')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of clients</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#newClient{{ count($no_of_new_clients_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ count($no_of_new_clients_this_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('New client for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.number_of_first_client.new_client')
                                <a href="#" data-toggle="modal" data-target="#existingClient{{ count($no_of_existing_clients_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ count($no_of_existing_clients_this_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Existing client for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.number_of_first_client.existing_client')
                                

                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of 100% in progress projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#progressProjectForThisCycle{{ count($no_of_100_finished_project_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ count($no_of_100_finished_project_this_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('100% in progress projects for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.progress_projects.progress_projects_for_this_cycle')
                                <a href="#" data-toggle="modal" data-target="#progressProjectInThisCycle{{ count($no_of_100_finished_project_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ count($no_of_100_finished_project_previous_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('100% in progress projects in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.progress_projects.progress_projects_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of 100% in progress projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#progressProjectForThisCycleValue{{ count($no_of_100_finished_project_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($value_of_100_finished_project_this_cycle,2) }}$<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('100% in progress projects for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.progress_projects_value.progress_projects_for_this_cycle_value')
                                <a href="#" data-toggle="modal" data-target="#progressProjectInThisCycleValue{{ count($no_of_100_finished_project_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($value_of_100_finished_project_previous_cycle,2) }}$<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('100% in progress projects in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.progress_projects_value.progress_projects_in_this_cycle_value')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>

            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project Completion Rate (100% in progress projects Count)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#projectComplectionProgressForThisCycleCount{{ count($no_of_100_finished_project_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($project_completion_rate_count_this_cycle_value_100_in_progress, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Project completion rate for this Cycle') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.projects_completion_progress_rate_count.project_complection_rate_for_this_cycle_count')
                                <a href="#" data-toggle="modal" data-target="#projectComplectionProgressInThisCycleCount{{ count($no_of_100_finished_project_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($project_completion_rate_count_previous_cycle_value_100_in_progress, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Project completion rate in this Cycle') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.projects_completion_progress_rate_count.project_complection_rate_in_this_cycle_count')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project Completion Rate (100% in progress projects Value)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#projectComplectionRateForThisValue{{ count($no_of_100_finished_project_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($project_completion_rate_count_this_cycle_value_100_in_progress, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Project completion rate for this Cycle') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.projects_completion_progress_rate_value.project_complection_rate_for_this_cycle_value')
                                <a href="#" data-toggle="modal" data-target="#projectComplectionRateInThisValue{{ count($no_of_100_finished_project_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($project_completion_rate_count_previous_cycle_value_100_in_progress, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Project completion rate in this Cycle') </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.projects_completion_progress_rate_value.project_complection_rate_in_this_cycle_value')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of fully completed/Finished projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#completeProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ count($no_of_finished_projects_this_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Completed/Finished projects for this cycle')
                                        </span>
                                    </p>
                                </a>

                                @include('dashboard.employee.number_of_fully_completed_project.complete_project_cycle')

                                <a href="#" data-toggle="modal" data-target="#totalCompleteProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ count($no_of_finished_projects_previous_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total completed/Finished projects in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.number_of_fully_completed_project.total_complete_project_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of fully completed/Finished projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#finishedProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($value_of_finished_projects_this_cycle, 2) }}$ <span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Completed/Finished projects for cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.value_of_fully_completed_project.finished_project_cycle')
                                <a href="#" data-toggle="modal" data-target="#totalFinishedProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{ round($value_of_finished_projects_previous_cycle, 2) }}$ <span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total completed/Finished projects in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.value_of_fully_completed_project.total_finished_project_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>

                <div class="row mt-3">
                    
                    
                
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion rate (Count)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#projectComplectionRateForThisCycle{{ count($no_of_finished_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($project_completion_rate_count_this_cycle,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Project Completion rate for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.project_completion_rate_count.project_completion_rate_for_this_cycle')
                                <a href="#" data-toggle="modal" data-target="#projectComplectionRateInThisCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($project_completion_rate_count_previous_cycle,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Project Completion rate in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.project_completion_rate_count.project_completion_rate_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion rate (Value)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#projectProgressForCycle{{ count($no_of_finished_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($project_completion_rate_count_this_cycle_value,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                            @lang('100% in progress projects for cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.project_completion_rate_value.project_progress_for_cycle')
                                <a href="#" data-toggle="modal" data-target="#completedProjectForCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($project_completion_rate_count_previous_cycle_value,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Completed/Finished projects In cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.project_completion_rate_value.completed_project_for_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
                {{-- <div class="col-md-3">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Of Projects Got Canceled</h5>
                            <div class="d-flex">
                                <a href="#">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($month_total_canceled_project,2) }}<span class="f-12 font-weight-normal text-lightest">
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div> --}}
           
           
            
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone Assigned</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#milestoneAssignForThisClient{{ count($total_milestone_assigned_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{count($total_milestone_assigned_this_cycle)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone assigned for this cycle (Count)')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_assign.milestone_assign_for_this_client')
                                <a href="#" data-toggle="modal" data-target="#milestoneAssignInThisClient{{ count($total_milestone_assigned_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($total_milestone_assigned_this_cycle_value,2)}}$<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone assigned in this cycle (Value)')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_assign.milestone_assign_in_this_client')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone Completed</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#milestoneCompletedForThisClient{{ count($total_milestone_completed_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{count($total_milestone_completed_this_cycle)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completed for this cycle (Count)')
                                    </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_complete.milestone_completed_for_this_client')

                                <a href="#" data-toggle="modal" data-target="#milestoneCompletedInThisClient{{ count($total_milestone_completed_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{count($total_milestone_completed_previous_cycle)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completed in this cycle (Count)')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_complete.milestone_completed_in_this_client')
                                <a href="#" class="mt-3" data-toggle="modal" data-target="#milestoneReleasedForThisCyclet{{ count($total_milestone_completed_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($total_released_amount_this_cycle,2)}}$<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone released for this cycle (Value)')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_complete.milestone_released_for_this_cycle')

                                <a href="#" class="mt-3" data-toggle="modal" data-target="#milestoneReleasedInThisCyclet{{ count($total_milestone_completed_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($total_released_amount_previous_cycle,2)}}$<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone released in this cycle (Value) ')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_milestone_complete.milestone_released_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completion Rate (Count)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageForThisCycle{{ count($total_milestone_completed_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($milestone_completion_rate_count_this_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completion percentage for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.milestone_complete_rate_count.milestone_completion_percentage_for_this_cycle')
                                <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageCount{{ count($total_milestone_completed_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($milestone_completion_rate_count_previous_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completion percentage in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.milestone_complete_rate_count.milestone_completion_percentage_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completion Rate (Value)</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageforValue{{ count($total_milestone_completed_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($milestone_completion_rate_value_this_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completion percentage for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.milestone_complete_rate_value.milestone_completion_percentage_for_this_cycle_value')
                                <a href="#" data-toggle="modal" data-toggle="modal" data-target="#milestoneComplectionPercentageInValue{{ count($total_milestone_completed_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{round($milestone_completion_rate_value_previous_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Milestone completion percentage in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.milestone_complete_rate_value.milestone_completion_percentage_in_this_cycle_value')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total tasks assigned</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskAssignedForThisCycle{{ count($total_tasks_assigned_this_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ $total_tasks_assigned_this_cycle }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Task assigned for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_task_assigned.task_assigned_for_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total tasks completed</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskCompletedForThisCycle{{ count($total_tasks_completed_this_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{$total_tasks_completed_this_cycle}}<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Tasks completed for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_task_completed.task_completed_for_this_cycle')
                                <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskCompletedInThisCycle{{ count($total_tasks_completed_previous_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{$total_tasks_completed_previous_cycle}}<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Tasks completed in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.total_task_completed.task_completed_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task completion rate</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#taskComplectionRateForCycle{{ count($total_tasks_completed_this_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($tasks_completion_rate_this_cycle, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Task completion rate for cycle')
                                        </span>
                                    </p>
                                </a>
                                 @include('dashboard.employee.task_complection_rate.task_complection_rate_for_this_cycle')
                                 <a href="#" data-toggle="modal" data-target="#taskComplectionRateInCycle{{ count($total_tasks_completed_previous_cycle_get) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{ round($tasks_completion_rate_previous_cycle, 2) }}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Task completion rate in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.task_complection_rate.task_complection_rate_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average project completion time</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#averageComplectionDays{{ count($average_project_completion_rate) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($average_completion_days,2)}} days<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Average project completion time for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.average_project.average_project_completion_time')
                                <a href="#" data-toggle="modal" data-target="#averageComplectionInThisDays{{ count($average_project_completion_rate_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($average_completion_days_previous_cycle,2)}} days<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Average project completion time in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.average_project.average_project_completion_time_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
            <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of upsale/cross sales</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                    {{ count($no_of_new_deals_added) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Number of New deals added')
                                        </span>
                                    </p>
                                </a>

                                <a href="#" data-toggle="modal" data-target="#numberOfMilestoneAdd{{ count($no_of_new_milestones_added_on_old_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{count($no_of_new_milestones_added_on_old_projects)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Number of new milestones added on old projects')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.upsale_cross_sales.number_of_milestone_add')
                                <a href="#" data-toggle="modal" data-target="#numberOfOldProject{{ count($no_of_new_milestones_added_on_old_projects_id) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 mt-3">
                                        {{count($no_of_new_milestones_added_on_old_projects_id)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Number of old projects where there is upsales/cross sales')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.upsale_cross_sales.number_of_old_project')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                        style="height: 100%;">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of upsale/crosssale</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#valueOfUpsale{{ count($no_of_new_milestones_added_on_old_projects) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($no_of_new_milestones_added_on_old_projects_value,2)}}$<span
                                            class="f-12 font-weight-normal text-lightest"></span>
                                    </p>
                                </a>
                                @include('dashboard.employee.upsale_cross_sales.value_of_upsale')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#totalCanceledProjectForThisCycle{{ count($cancelled_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                                        {{ count($cancelled_projects_this_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total cancelled project for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.canceled_project.total_canceled_project_for_this_cycle')
                                <a href="#" data-toggle="modal" data-target="#totalCanceledProjectInThisCycle{{ count($cancelled_projects_previous_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                                        {{ count($cancelled_projects_previous_cycle) }}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total cancelled project in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.canceled_project.total_canceled_project_in_this_cycle')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed projects</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#totalDelayProjectForthisCycle{{count($no_of_delayed_projects_this_cycle)}}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{count($no_of_delayed_projects_this_cycle)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total Delayed Project for this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.delayed_project.total_delayed_project')
                                <a href="#" data-toggle="modal" data-target="#totalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{count($no_of_delayed_projects)}}<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Total Delayed Project in this cycle')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.delayed_project.total_delayed_project_in_this_cycle')
                            </div>

                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed projects percentage</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#totalDelayProjectForthisCycle{{count($no_of_delayed_projects_this_cycle)}}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($delayed_projects_percentage_this_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Current')
                                        </span>
                                    </p>
                                </a>
                                <a href="#" data-toggle="modal" data-target="#totalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($delayed_projects_percentage_previous_cycle,2)}}%<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Current plus old ones')
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed completed</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#totalCompleteDelayProject{{count($no_of_delayed_projects_finished)}}">
                                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                                        {{count($no_of_delayed_projects_finished)}}<span class="f-12 font-weight-normal text-lightest">
                                            @lang('Total Completed Delayed Project')
                                        </span>
                                    </p>
                                </a>
                                @include('dashboard.employee.delayed_completed.total_completed_delayed_project')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of revisions for cycle</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Caused by me')
                                        </span>
                                    </p>
                                </a>
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Caused By others')
                                        </span>
                                    </p>
                                </a>
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Disputed')
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of revisions in cycle</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Caused by me')
                                        </span>
                                    </p>
                                </a>
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Caused By others')
                                        </span>
                                    </p>
                                </a>
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                                        0<span
                                            class="f-12 font-weight-normal text-lightest">
                                            @lang('Disputed')
                                        </span>
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
            <div class="col-md-6">
                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Cancelation rate</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" data-toggle="modal" data-target="#cancelationRateData{{ count($cancelled_projects_this_cycle) }}">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($project_cancelation_rate,2)}}%
                                    </p>
                                </a>
                                @include('dashboard.employee.cancelation_rate.cancelation_rate')
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div
                        class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                        <div class="d-block text-capitalize">
                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Payment Rel. Count per day</h5>
                            <div class="d-flex flex-wrap">
                                <a href="#" onclick="event.preventDefault()">
                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                        {{round($avg_payment_release_per_day,2)}} per day
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="d-block">
                            <i class="fa fa-list text-lightest f-27"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection
@push('scripts')
    <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
    <script type="text/javascript">
        @php
            $startDate = \Carbon\Carbon::now()
                ->startOfMonth()
                ->subMonths(1)
                ->addDays(15);
            $endDate = \Carbon\Carbon::now()
                ->startOfMonth()
                ->addDays(15);
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
        });
    </script>
    <script type="text/javascript">
        $(".dashboard-header").on("click", ".ajax-tab", function(event) {
            event.preventDefault();


            var dateRangePicker = $('#datatableRange2').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            const requestUrl = this.href;
            //alert(requestUrl);

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard",
                historyPush: true,
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#emp-dashboard').html(response.html);
                        init('#emp-dashboard');
                    }
                }
            });
            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard2",
                historyPush: true,
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#emp-dashboard2').html(response.html);
                        init('#emp-dashboard2');
                    }
                }
            });
        });

        function showTable() {
            var dateRangePicker = $('#datatableRange2').data('daterangepicker');
            var startDate = $('#datatableRange').val();
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
                container: "#emp-dashboard",
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {

                    if (response.status == "success") {

                        $('#emp-dashboard').html(response.html);

                        init('#emp-dashboard');
                    }
                }
            });
            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard2",
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {

                    if (response.status == "success") {

                        $('#emp-dashboard2').html(response.html2);

                        init('#emp-dashboard2');

                    }
                }
            });
        }
    </script>
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
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
    @endif

    <script>
        $('#save-dashboard-widget').click(function() {
            $.easyAjax({
                url: "{{ route('dashboard.widget', 'private-dashboard') }}",
                container: '#privateDashboardWidgetForm',
                blockUI: true,
                type: "POST",
                redirect: true,
                data: $('#privateDashboardWidgetForm').serialize(),
                success: function() {
                    window.location.reload();
                }
            })
        });

        $('#clock-in').click(function() {
            const url = "{{ route('attendances.clock_in_modal') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('.request-shift-change').click(function() {
            var id = $(this).data('shift-schedule-id');
            var url = "{{ route('shifts-change.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_DEFAULT, url);
        });

        $('#view-shifts').click(function() {
            const url = "{{ route('employee-shifts.index') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /** clock timer start here */
        function currentTime() {
            let date = new Date(); // today
            date = moment.tz(date, "{{ global_setting()->timezone }}");

            let hour = date.hour();
            let min = date.minutes();
            let sec = date.seconds();
            let midday = "AM";
            midday = (hour >= 12) ? "PM" : "AM";
            @if (global_setting()->time_format == 'h:i A')
                hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour); /* assigning hour in 12-hour format */
            @endif
            hour = updateTime(hour);
            min = updateTime(min);
            document.getElementById("clock").innerText = `${hour} : ${min} ${midday}`
            const time = setTimeout(function() {
                currentTime()
            }, 1000);
        }

        /* appending 0 before time elements if less than 10 */
        function updateTime(timer) {
            if (timer < 10) {
                return "0" + timer;
            } else {
                return timer;
            }
        }



        $('.keep-open .dropdown-menu').on({
            "click": function(e) {
                e.stopPropagation();
            }
        });

        $('#weekly-timelogs').on('click', '.week-timelog-day', function() {
            var date = $(this).data('date');

            $.easyAjax({
                url: "{{ route('dashboard.week_timelog') }}",
                container: '#weekly-timelogs',
                blockUI: true,
                type: "POST",
                redirect: true,
                data: {
                    'date': date,
                    '_token': "{{ csrf_token() }}"
                },
                success: function(response) {
                    $('#weekly-timelogs').html(response.html)
                }
            })
        });
    </script>
    <script>
        $(document).ready(function() {
            var todayDate = moment();
            var monthDate = moment();
            $('.todayDate').text(todayDate.format('dddd LL'));



            var todayOnlyDate = moment(todayDate).format('DD');

            if (todayOnlyDate > 15) {
                $('.monthDate').text('' + moment(monthDate).format('MMMM, YYYY') + ' - ' + moment(
                    monthDate).add(1, 'month').format('MMMM, YYYY'));
            } else {
                $('.monthDate').text('' + moment(monthDate).subtract(1, 'month').format('MMMM, YYYY') +
                    ' - ' + moment(monthDate).startOf('month').add(16, 'day').format('MMMM, YYYY'));
            }

            $('.fc-prev-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    if (todayOnlyDate > 15) {
                        monthDate = moment(monthDate).subtract(1, 'month');
                    } else {
                        monthDate = moment(monthDate).subtract(2, 'month');
                    }
                    $(this).next().text('' + moment(monthDate).format('MMMM, YYYY') + ' - ' +
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
                var date;
                if (mode == 'month') {
                    monthDate = moment(monthDate).add(1, 'month');
                    $(this).prev().text('' + moment(monthDate).format('MMMM, YYYY') + ' - ' +
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
                        mode: 'general'
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
    </script>

    @if (attendance_setting()->radius_check == 'yes' || attendance_setting()->save_current_location)
        <script>
            var currentLatitude = document.getElementById("current-latitude");
            var currentLongitude = document.getElementById("current-longitude");
            var x = document.getElementById("current-latitude");

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    // x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

            function showPosition(position) {
                currentLatitude.value = position.coords.latitude;
                currentLongitude.value = position.coords.longitude;
            }
            getLocation();
        </script>
    @endif
@endpush
