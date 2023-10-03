@php
    $pm_core_metrics = \App\Models\PmCoreMetric::orderBy('id','DESC')->first();
@endphp
<div id="monthHtml">
    <div class="row">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#releasedAmountCycle{{ count($total_released_amount_this_cycle_get) }}"> {{ round($total_released_amount_this_cycle, 2) }}$ ({{ $pm_core_metrics->released_amount_for_cycle ?? '' }}$)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Released amount for this Cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#released_amount_for_cycle"></i>
                                @include('dashboard.card-data-modal.released_amount_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.total_released_amount.released_amount_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalReleasedAmount{{ count($total_released_amount_previous_cycle_get) }}" style="color: green"> {{ round($total_released_amount_previous_cycle, 2) }}$ ({{ $pm_core_metrics->total_released_amount ?? ''}}$)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total released amount')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_released_amount_modal"></i>
                                @include('dashboard.card-data-modal.total_released_amount')
                            </span>
                        </p>
                        @include('dashboard.employee.total_released_amount.total_released_amount')
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
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#averageComplectionDays{{ count($average_project_completion_rate) }}">
                                @if($average_completion_days == 0)
                                NA ({{ $pm_core_metrics->avg_project_completion_time_for_cycle ?? ''}} days)
                                @else

                                {{round($average_completion_days,2)}} days ({{ $pm_core_metrics->avg_project_completion_time_for_cycle ?? ''}}  days)
                                @endif
                            </a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Average project completion time for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#average_project_completion_time_for_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.average_project_completion_time_for_this_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.average_project.average_project_completion_time')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#averageComplectionInThisDays{{ count($average_project_completion_rate_previous_cycle) }}" style="color: green">
                                @if($average_completion_days_previous_cycle == 0)

                                NA ({{ $pm_core_metrics->avg_project_completion_time_in_cycle ?? ''}} days)
                                @else
                                {{round($average_completion_days_previous_cycle,2)}} days ({{ $pm_core_metrics->avg_project_completion_time_in_cycle ?? ''}} days)

                                @endif
                                </a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Average project completion time in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#average_project_completion_time_in_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.average_project_completion_time_in_cycle')
                            </span>
                        </p>
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project Completion Rate (100% in progress projects Count)</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionProgressForThisCycleCount{{ count($no_of_100_and_finish_this_cycle) }}">  {{ round($project_completion_rate_count_this_cycle_100_in_progress, 2) }}% ({{ $pm_core_metrics->progress_project_count ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate for this Cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_completion_rate_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.projects_completion_progress_rate_count.project_complection_rate_for_this_cycle_count')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionProgressInThisCycleCount{{ count($no_of_100_and_finish_previous_cycle) }}" style="color: green">{{ round($project_completion_rate_count_previous_cycle_100_in_progress, 2) }}% ({{ $pm_core_metrics->progress_project_count_2 ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate in this Cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_completion_rate_in_cycle')
                            </span>
                        </p>
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
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionRateForThisValue{{ count($no_of_100_and_finish_this_cycle) }}">{{ round($project_completion_rate_count_this_cycle_value_100_in_progress, 2) }}% ({{ $pm_core_metrics->progress_project_value ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate for this Cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_for_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.project_completion_rate_for_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.projects_completion_progress_rate_value.project_complection_rate_for_this_cycle_value')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionRateInThisValue{{ count($no_of_100_and_finish_previous_cycle) }}" style="color: green">{{ round($project_completion_rate_count_previous_cycle_value_100_in_progress, 2) }}% ({{ $pm_core_metrics->progress_project_value_2 ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate in this Cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_in_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.project_completion_rate_in_cycle_value')
                            </span>
                        </p>
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion rate (Count)</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionRateForThisCycle{{ count($no_of_finished_projects_this_cycle) }}"> {{round($project_completion_rate_count_this_cycle,2)}}% ({{ $pm_core_metrics->project_completion_rate_for_this_cycle_count ?? ''}}%) </a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project Completion rate for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_complection_rate_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_complection_rate_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.project_completion_rate_count.project_completion_rate_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectComplectionRateInThisCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{round($project_completion_rate_count_previous_cycle,2)}}% ({{ $pm_core_metrics->project_completion_rate_in_this_cycle_count ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Project Completion rate in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_complection_rate_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_complection_rate_in_cycle')
                            </span>
                        </p>
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

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectProgressForCycle{{ count($no_of_finished_projects_this_cycle) }}"> {{round($project_completion_rate_count_this_cycle_value,2)}}% ({{ $pm_core_metrics->project_completion_rate_for_this_cycle_value ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#in_progress_project_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.in_progress_project_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.project_completion_rate_value.project_progress_for_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#completedProjectForCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{round($project_completion_rate_count_previous_cycle_value,2)}}% ({{ $pm_core_metrics->project_completion_rate_in_this_cycle_value ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects In cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#completed_or_finished_project_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.completed_or_finished_project_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.project_completion_rate_value.completed_project_for_cycle')
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
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#noOfNewDealsAdded{{ count($no_of_new_deals_added) }}"> {{ count($no_of_new_deals_added) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Number of New deals added')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#number_of_new_deals_added_modal"></i>
                                @include('dashboard.card-data-modal.number_of_new_deals_added')
                            </span>
                        </p>
                        @include('dashboard.employee.upsale_cross_sales.no_of_new_deals_added')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#numberOfMilestoneAdd{{ count($no_of_new_milestones_added_on_old_projects) }}">{{count($no_of_new_milestones_added_on_old_projects)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Number of new milestones added on old projects')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#number_Of_new_milestones_added_on_old_projects_added_modal"></i>
                                @include('dashboard.card-data-modal.number_Of_new_milestones_added_on_old_projects_added')
                            </span>
                        </p>
                        @include('dashboard.employee.upsale_cross_sales.number_of_milestone_add')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 mt-3">
                            <a href="#" data-toggle="modal" data-target="#numberOfOldProject{{ count($no_of_new_milestones_added_on_old_projects_id) }}">{{count($no_of_new_milestones_added_on_old_projects_id)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Number of old projects where there is upsales/cross sales')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#old_projects_upsales_cross_sales_modal"></i>
                                @include('dashboard.card-data-modal.old_projects_upsales_cross_sales')
                            </span>
                        </p>
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of upsale/crosssale
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#value_of_upsale_crosssale_modal"></i>
                            @include('dashboard.card-data-modal.value_of_upsale_crosssale')
                    </h5>
                    <div class="d-flex flex-wrap">
                        <a href="#" data-toggle="modal" data-target="#valueOfUpsale{{ count($no_of_new_milestones_added_on_old_projects) }}">
                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                {{round($no_of_new_milestones_added_on_old_projects_value,2)}}$ ({{ $pm_core_metrics->value_of_upsale ?? ''}} usd)<span
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
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed projects percentage</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalDelayProjectForthisCycle{{count($no_of_delayed_projects_this_cycle)}}">{{round($delayed_projects_percentage_this_cycle,2)}}%  (<span class="f-15">Equals or less than</span> {{ $pm_core_metrics->current ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Current')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#current_modal"></i>
                                @include('dashboard.card-data-modal.current')
                            </span>
                        </p>
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}">{{round($delayed_projects_percentage_previous_cycle,2)}}% (<span class="f-15">Equals or less than</span> {{ $pm_core_metrics->current_plus_old_ones ?? ''}}%)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Current plus old ones')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#current_plus_old_ones_modal"></i>
                                @include('dashboard.card-data-modal.current_plus_old_ones')
                            </span>
                        </p>
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Cancelation rate
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#cancelation_rate_modal"></i>
                            @include('dashboard.card-data-modal.cancelation_rate')
                    </h5>
                    <div class="d-flex flex-wrap">
                        <a href="#" data-toggle="modal" data-target="#cancelationRateData{{ count($cancelled_projects_this_cycle) }}">
                            <p class="mb-0 f-21 font-weight-bold text-blue mr-5">
                                {{round($project_cancelation_rate,2)}}% (<span class="f-15">Equals Or Less Than</span> {{ $pm_core_metrics->cancelation_rate ?? ''}}%)
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
    </div>
    <div class="row mt-3">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of revisions for cycle</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#causedByMe{{count($caused_by_me_for_cycle)}}">{{ count($caused_by_me_for_cycle) }}  (<span class="f-15">Equals or less than</span> {{ $pm_core_metrics->number_of_revisions_for_cycle ?? ''}})</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Caused by me')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_me_modal"></i>
                                @include('dashboard.card-data-modal.caused_by_me')
                            </span>
                        </p>
                         @include('dashboard.employee.number_of_revision_for_cycle.caused_by_me')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#causedByOther{{count($caused_by_other_for_cycle)}}" style="color: green">{{ count($caused_by_me_for_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Caused By others')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_others_modal"></i>
                                @include('dashboard.card-data-modal.caused_by_others')
                            </span>
                        </p>
                         @include('dashboard.employee.number_of_revision_for_cycle.caused_by_other')

                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#disputeForCycle{{count($dispute_for_cycle)}}" style="color: red">{{ count($dispute_for_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Disputed')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#disputed_modal"></i>
                                @include('dashboard.card-data-modal.disputed')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_revision_for_cycle.dispute')
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of revisions in cycle</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#causedByMeInCycle{{count($caused_by_me_in_cycle)}}">{{ count($caused_by_me_in_cycle) }} (<span class="f-15">Equals or less than</span> {{ $pm_core_metrics->number_of_revisions_in_cycle ?? ''}})</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Caused by me')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_me_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.caused_by_me_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_revision_for_cycle.caused_by_me_in_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#causedByOtherInCycle{{count($caused_by_other_in_cycle)}}" style="color: green">{{ count($caused_by_other_in_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Caused By others')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_others_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.caused_by_others_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_revision_for_cycle.caused_by_other_in_cycle')
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#disputInCycle{{count($dispute_in_cycle)}}" style="color: red">{{ count($dispute_in_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Disputed')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#disputed_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.disputed_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_revision_for_cycle.dispute_in_cycle')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3">
        <div class="col-md-12">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Payment Rel. Count per day
                        <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#avg_payment_modal"></i>
                            @include('dashboard.card-data-modal.avg_payment')
                    </h5>
                    <div class="d-flex flex-wrap">
                        <a href="#" data-toggle="modal" data-target="#avgPayment{{ count($total_milestone_completed_this_current_month) }}">
                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                {{round($avg_payment_release_per_day,2)}} per day ({{ $pm_core_metrics->avg_payment_per_day ?? ''}} per day)
                            </p>
                        </a>
                        @include('dashboard.employee.avg_payment.average_payment_per_day')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="nop" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of projects</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectModal{{ count($no_of_projects) }}">{{ count($no_of_projects) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total assigned projects number')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#totalAssignedProjectModal"></i>
                                @include('dashboard.card-data-modal.total_assigned_projects_number')
                            </span>
                        </p>
                        @include('dashboard.employee.no_of_project.total_assign_project_number')
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectAcceptModal{{ count($no_of_accepted_projects) }}" style="color: green">{{ count($no_of_accepted_projects) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Accepted projects')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#acceptProject"></i>
                                @include('dashboard.card-data-modal.accepted_project')
                            </span>
                        </p>
                        @include('dashboard.employee.no_of_project.accept_project_modal')

                        <p class="mb-0 f-21 font-weight-bold  d-grid">
                            <a href="#" data-toggle="modal" data-target="#rejectedProjectModal{{ count($no_of_rejected_projects) }}" style="color: red">{{ count($no_of_rejected_projects) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Rejected projects')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#rejectedProject"></i>
                                @include('dashboard.card-data-modal.rejected_project')
                            </span>
                        </p>
                        @include('dashboard.employee.no_of_project.rejected_project_modal')
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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Project Value</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalAssignProjectValue{{ count($no_of_projects) }}">{{ round($total_project_value,2) }} ($)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total assigned projects value')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_assigned_project"></i>
                                @include('dashboard.card-data-modal.total_assign_project_value_modal')
                            </span>
                        </p>
                        @include('dashboard.employee.total_project_value.total_assign_project_value')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#projectAcceptValueModal{{ count($no_of_accepted_projects) }}" style="color: green"> {{ round($accepted_project_value, 2) }} ($)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Accepted projects value')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#accept_project_value"></i>
                                @include('dashboard.card-data-modal.accept_project_value')
                            </span>
                        </p>
                        @include('dashboard.employee.total_project_value.accept_project_modal')


                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#rejectedProjectValueModal{{ count($no_of_rejected_projects) }}" style="color: red">{{ round($rejected_project_value, 2) }} ($)</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Rejected projects value')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#rejected_project_value"></i>
                                @include('dashboard.card-data-modal.rejected_project_value')
                            </span>
                        </p>
                        @include('dashboard.employee.total_project_value.rejected_project_modal')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="noc" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                style="height: 100%;">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of clients</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#newClient{{ count($no_of_new_clients_this_cycle) }}"> {{ count($no_of_new_clients_this_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('New client for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#new_client_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.new_client_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_first_client.new_client')
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#existingClient{{ count($no_of_existing_clients_this_cycle) }}" style="color: green"> {{ count($no_of_existing_clients_this_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Existing client for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#existing_client_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.existing_client_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_first_client.existing_client')
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalClient{{ count($total_client) }}" style="color: green"> {{ count($total_client) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Client')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_client_cycle_modal"></i>
                                @include('dashboard.card-data-modal.total_client_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_first_client.total_client')


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
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task completion rate</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#taskComplectionRateForCycle{{ count($total_tasks_completed_this_cycle_get) }}"> {{ round($tasks_completion_rate_this_cycle, 2) }}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Task completion rate for cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_completion_rate_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.task_completion_rate_for_cycle')
                            </span>
                        </p>
                         @include('dashboard.employee.task_complection_rate.task_complection_rate_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#taskComplectionRateInCycle{{ count($total_tasks_completed_previous_cycle_get) }}"> {{ round($tasks_completion_rate_previous_cycle, 2) }}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Task completion rate in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_completion_rate_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.task_completion_rate_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.task_complection_rate.task_complection_rate_in_this_cycle')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="noipp" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                style="height: 100%;">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of 100% in progress projects</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#progressProjectForThisCycle{{ count($no_of_100_and_finish_this_cycle) }}"> {{ count($no_of_100_and_finish_this_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_progress_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.progress_projects.progress_projects_for_this_cycle')
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#progressProjectInThisCycle{{ count($no_of_100_and_finish_previous_cycle) }}"> {{ count($no_of_100_and_finish_previous_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.project_progress_in_cycle')
                            </span>
                        </p>
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

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#progressProjectForThisCycleValue{{ count($no_of_100_and_finish_this_cycle) }}"> {{ round($value_of_100_and_finish_this_cycle,2) }}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_for_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.project_progress_for_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.progress_projects_value.progress_projects_for_this_cycle_value')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#progressProjectInThisCycleValue{{ count($no_of_100_and_finish_previous_cycle) }}"> {{ round($value_of_100_and_finish_previous_cycle,2) }}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_in_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.project_progress_in_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.progress_projects_value.progress_projects_in_this_cycle_value')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>

    </div>

    <div class="row mt-3" id="nofcfp" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of fully completed/Finished projects</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#completeProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">{{ count($no_of_finished_projects_this_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#finished_projects_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.finished_projects_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.number_of_fully_completed_project.complete_project_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalCompleteProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{ count($no_of_finished_projects_previous_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total completed/Finished projects in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#finished_projects_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.finished_projects_in_cycle')
                            </span>
                        </p>
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

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#finishedProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">{{ round($value_of_finished_projects_this_cycle, 2) }}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#completed_projects_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.completed_projects_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.value_of_fully_completed_project.finished_project_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalFinishedProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{ round($value_of_finished_projects_previous_cycle, 2) }}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total completed/Finished projects in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#completed_projects_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.completed_projects_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.value_of_fully_completed_project.total_finished_project_cycle')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" id="tma" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                style="height: 100%;">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone Assigned</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneAssignForThisClient{{ count($total_milestone_assigned_this_cycle) }}">{{count($total_milestone_assigned_this_cycle)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned for this cycle (Count)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_assigned_for_this_cycle_count_modal"></i>
                                @include('dashboard.card-data-modal.milestone_assigned_for_this_cycle_count')
                            </span>
                        </p>

                        @include('dashboard.employee.total_milestone_assign.milestone_assign_for_this_client')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneAssignInThisClient{{ count($total_milestone_assigned_this_cycle) }}">{{round($total_milestone_assigned_this_cycle_value,2)}}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned for this cycle (Value)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_assigned_for_this_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.milestone_assigned_for_this_cycle_value')
                            </span>
                        </p>
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
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneCompletedForThisClient{{ count($total_milestone_completed_this_cycle) }}">{{count($total_milestone_completed_this_cycle)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completed for this cycle (Count)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completed_for_this_cycle_count_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completed_for_cycle_count')
                            </span>
                        </p>
                        @include('dashboard.employee.total_milestone_complete.milestone_completed_for_this_client')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneCompletedInThisClient{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{count($total_milestone_completed_previous_cycle)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completed in this cycle (Count)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completed_in_this_cycle_count_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completed_in_this_cycle_count')
                            </span>
                        </p>
                        @include('dashboard.employee.total_milestone_complete.milestone_completed_in_this_client')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" class="mt-3" data-toggle="modal" data-target="#milestoneReleasedForThisCyclet{{ count($total_milestone_completed_this_cycle) }}">{{round($total_released_amount_this_cycle,2)}}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone released for this cycle (Value)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_released_for_this_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.milestone_released_for_this_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.total_milestone_complete.milestone_released_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" class="mt-3" data-toggle="modal" data-target="#milestoneReleasedInThisCyclet{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{round($total_released_amount_previous_cycle,2)}}$</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone released in this cycle (Value)')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_released_in_this_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.milestone_released_in_this_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.total_milestone_complete.milestone_released_in_this_cycle')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="mcr_count" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
                style="height: 100%;">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completion Rate (Count)</h5>
                    <div class="d-flex flex-wrap">

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageForThisCycle{{ count($total_milestone_completed_this_cycle) }}">{{round($milestone_completion_rate_count_this_cycle,2)}}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completion_percentage_for_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.milestone_complete_rate_count.milestone_completion_percentage_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageCount{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{round($milestone_completion_rate_count_previous_cycle,2)}}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_in_cycle_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completion_percentage_in_cycle')
                            </span>
                        </p>
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

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#milestoneComplectionPercentageforValue{{ count($total_milestone_completed_this_cycle) }}">{{round($milestone_completion_rate_value_this_cycle,2)}}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_for_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completion_percentage_for_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.milestone_complete_rate_value.milestone_completion_percentage_for_this_cycle_value')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-toggle="modal" data-target="#milestoneComplectionPercentageInValue{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{round($milestone_completion_rate_value_previous_cycle,2)}}%</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_in_cycle_value_modal"></i>
                                @include('dashboard.card-data-modal.milestone_completion_percentage_in_cycle_value')
                            </span>
                        </p>
                        @include('dashboard.employee.milestone_complete_rate_value.milestone_completion_percentage_in_this_cycle_value')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="tta" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total tasks assigned</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskAssignedForThisCycle{{ count($total_tasks_assigned_this_cycle_get) }}"> {{ $total_tasks_assigned_this_cycle }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Task assigned for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_assigned_for_cycle_modal"></i>
                                @include('dashboard.card-data-modal.task_assigned_for_cycle')
                            </span>
                        </p>
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

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskCompletedForThisCycle{{ count($total_tasks_completed_this_cycle_get) }}"> {{$total_tasks_completed_this_cycle}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Tasks completed for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#tasks_completed_for_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.tasks_completed_for_this_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.total_task_completed.task_completed_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-toggle="modal" data-target="#taskCompletedInThisCycle{{ count($total_tasks_completed_previous_cycle_get) }}">{{$total_tasks_completed_previous_cycle}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Tasks completed in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#tasks_completed_in_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.tasks_completed_in_this_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.total_task_completed.task_completed_in_this_cycle')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-3" id="cp" style="display: none">
        <div class="col-md-6">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled projects</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalCanceledProjectForThisCycle{{ count($cancelled_projects_this_cycle) }}">{{ count($cancelled_projects_this_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total cancelled project for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_cancelled_project_for_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.total_cancelled_project_for_this_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.canceled_project.total_canceled_project_for_this_cycle')

                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalCanceledProjectInThisCycle{{ count($cancelled_projects_previous_cycle) }}" style="color: green">{{ count($cancelled_projects_previous_cycle) }}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total cancelled project in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_cancelled_project_in_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.total_cancelled_project_in_this_cycle')
                            </span>
                        </p>
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
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalDelayProjectForthisCycle{{count($no_of_delayed_projects_this_cycle)}}">{{count($no_of_delayed_projects_this_cycle)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Delayed Project for this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_delayed_project_for_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.total_delayed_project_for_this_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.delayed_project.total_delayed_project')
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}" style="color: green">{{count($no_of_delayed_projects)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Delayed Project in this cycle')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_delayed_project_in_this_cycle_modal"></i>
                                @include('dashboard.card-data-modal.total_delayed_project_in_cycle')
                            </span>
                        </p>
                        @include('dashboard.employee.delayed_project.total_delayed_project_in_this_cycle')
                    </div>

                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-3" id="dc" style="display: none">
        <div class="col-md-12">
            <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed completed</h5>
                    <div class="d-flex flex-wrap">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            <a href="#" data-toggle="modal" data-target="#totalCompleteDelayProject{{count($no_of_delayed_projects_finished )}}">{{count($no_of_delayed_projects_finished)}}</a>
                            <span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Completed Delayed Project')
                                <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_completed_delayed_project_modal"></i>
                                @include('dashboard.card-data-modal.total_completed_delayed_project')
                            </span>
                        </p>
                        @include('dashboard.employee.delayed_completed.total_completed_delayed_project')
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-list text-lightest f-27"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary mt-3 btn-lg" id="adminPMViewMore" style="padding: 18px; width:15%; font-size:25px;">View More</button>
    </div>
</div>
<script>
    $('#adminPMViewMore').click(function(){
        $('#nop, #noc, #noipp, #nofcfp, tma, #mcr_count, #tta, #cp, #dc').toggle();
        if ($(this).text() == 'View More') {
            $(this).text('View Less');
        }else{
            $(this).text('View More');
        }
    });
</script>
