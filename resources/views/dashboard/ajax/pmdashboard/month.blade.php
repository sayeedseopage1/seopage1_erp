@php
    $pm_core_metrics = \App\Models\PmCoreMetric::orderBy('id','DESC')->first();
@endphp
<div class="row">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyReleasedAmountCycle{{ count($total_released_amount_this_cycle_get) }}"> {{ round($total_released_amount_this_cycle, 2) }} ($) / {{ $pm_core_metrics->released_amount_for_cycle ?? ''}} ($)</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Released amount for this Cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#released_amount_for_cycle"></i>
                            @include('dashboard.card-data-modal.released_amount_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.total_released_amount.monthly_released_amount_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalReleasedAmount{{ count($total_released_amount_previous_cycle_get) }}" style="color: green"> {{ round($total_released_amount_previous_cycle, 2) }} ($) / {{ $pm_core_metrics->total_released_amount ?? ''}} ($)</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total released amount')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_released_amount_modal"></i>
                            @include('dashboard.card-data-modal.total_released_amount')
                        </span>
                    </p>
                    @include('dashboard.employee.total_released_amount.monthly_total_released_amount')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyAverageComplectionDays{{ count($average_project_completion_rate) }}">
                            @if($average_completion_days == 0)
                            N\A /{{ $pm_core_metrics->avg_project_completion_time_for_cycle ?? ''}} days
                            @else
                            {{round($average_completion_days,2)}} days / {{ $pm_core_metrics->avg_project_completion_time_for_cycle ?? ''}}  days

                            @endif
                           </a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Average project compeltion time for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#average_project_completion_time_for_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.average_project_completion_time_for_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.average_project.monthly_average_project_completion_time')

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyAverageComplectionInThisDays{{ count($average_project_completion_rate_previous_cycle) }}" style="color: green">
                            @if($average_completion_days_previous_cycle == 0)
                            N\A / {{ $pm_core_metrics->avg_project_completion_time_in_cycle ?? ''}} days
                            @else
                            {{round($average_completion_days_previous_cycle,2)}} days / {{ $pm_core_metrics->avg_project_completion_time_in_cycle ?? ''}} days
                            @endif
                           </a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Average project compeltion time in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#average_project_completion_time_in_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.average_project_completion_time_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.average_project.monthly_average_project_completion_time_in_this_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionProgressForThisCycleCount{{ count($no_of_100_and_finish_this_cycle) }}">{{ round($project_completion_rate_count_this_cycle_100_in_progress, 2) }}% / {{ $pm_core_metrics->progress_project_count ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project completion rate for this Cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_completion_rate_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.projects_completion_progress_rate_count.monthly_project_complection_rate_for_this_cycle_count')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionProgressInThisCycleCount{{ count($no_of_100_and_finish_previous_cycle) }}">{{ round($project_completion_rate_count_previous_cycle_100_in_progress, 2) }}% / {{ $pm_core_metrics->progress_project_count_2 ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project completion rate in this Cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_completion_rate_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.projects_completion_progress_rate_count.monthly_project_complection_rate_in_this_cycle_count')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateForThisValue{{ count($no_of_100_and_finish_this_cycle) }}">{{ round($project_completion_rate_count_this_cycle_value_100_in_progress, 2) }}% / {{ $pm_core_metrics->progress_project_value ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project completion rate for this Cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_for_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.project_completion_rate_for_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.projects_completion_progress_rate_value.monthly_project_complection_rate_for_this_cycle_value')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateInThisValue{{ count($no_of_100_and_finish_previous_cycle) }}" style="color: green">{{ round($project_completion_rate_count_previous_cycle_value_100_in_progress, 2) }}% / {{ $pm_core_metrics->progress_project_value_2 ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project completion rate in this Cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_completion_rate_in_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.project_completion_rate_in_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.projects_completion_progress_rate_value.monthly_project_complection_rate_in_this_cycle_value')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateForThisCycle{{ count($no_of_finished_projects_this_cycle) }}"> {{round($project_completion_rate_count_this_cycle,2)}}% / {{ $pm_core_metrics->project_completion_rate_for_this_cycle_count ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project Completion rate for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_complection_rate_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_complection_rate_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.project_completion_rate_count.monthly_project_completion_rate_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateInThisCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{round($project_completion_rate_count_previous_cycle,2)}}% / {{ $pm_core_metrics->project_completion_rate_in_this_cycle_count ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Project Completion rate in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_complection_rate_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_complection_rate_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.project_completion_rate_count.monthly_project_completion_rate_in_this_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#projectProgressForCycle{{ count($no_of_finished_projects_this_cycle) }}"> {{round($project_completion_rate_count_this_cycle_value,2)}}% / {{ $pm_core_metrics->project_completion_rate_for_this_cycle_value ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('100% in progress projects for cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#in_progress_project_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.in_progress_project_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.project_completion_rate_value.project_progress_for_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#completedProjectForCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{round($project_completion_rate_count_previous_cycle_value,2)}}% / {{ $pm_core_metrics->project_completion_rate_in_this_cycle_value ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Completed/Finished projects for cycle')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyNoOfNewDealsAdded{{ count($no_of_new_deals_added_previous) }}">{{ count($no_of_new_deals_added_previous) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Number of New deals added')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#number_of_new_deals_added_modal"></i>
                            @include('dashboard.card-data-modal.number_of_new_deals_added')
                        </span>
                    </p>
                    @include('dashboard.employee.upsale_cross_sales.monthly_no_of_new_deals_added')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyNumberOfMilestoneAdd{{ count($no_of_new_milestones_added_on_old_projects) }}">{{count($no_of_new_milestones_added_on_old_projects)}} </a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Number of new milestones added on old projects')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#number_Of_new_milestones_added_on_old_projects_added_modal"></i>
                            @include('dashboard.card-data-modal.number_Of_new_milestones_added_on_old_projects_added')
                        </span>
                    </p>
                    @include('dashboard.employee.upsale_cross_sales.monthly_number_of_milestone_add')

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 mt-3">
                        <a href="#" data-toggle="modal" data-target="#monthlyNumberOfOldProject{{ count($no_of_new_milestones_added_on_old_projects_id) }}">{{count($no_of_new_milestones_added_on_old_projects_id)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Number of old projects where there is upsales/cross sales')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#old_projects_upsales_cross_sales_modal"></i>
                            @include('dashboard.card-data-modal.old_projects_upsales_cross_sales')
                        </span>
                    </p>
                    @include('dashboard.employee.upsale_cross_sales.monthly_number_of_old_project')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyValueOfUpsale{{ count($no_of_new_milestones_added_on_old_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($no_of_new_milestones_added_on_old_projects_value,2)}}$ / {{ $pm_core_metrics->value_of_upsale ?? ''}} usd<span
                                class="f-12 font-weight-normal text-lightest"></span>
                        </p>
                    </a>
                     @include('dashboard.employee.upsale_cross_sales.monthly_value_of_upsale')
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
                        <a href="#"  data-toggle="modal" data-target="#monthlyCurrent{{count($no_of_delayed_projects_this_cycle)}}">{{round($delayed_projects_percentage_this_cycle,2)}}% > {{ $pm_core_metrics->current ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Current')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#current_modal"></i>
                            @include('dashboard.card-data-modal.current')
                        </span>
                    </p>
                    @include('dashboard.employee.delayed_project_percentage.monthly_currect')
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#"  data-toggle="modal" data-target="#monthlyCurrect{{count($no_of_delayed_projects)}}">{{round($delayed_projects_percentage_previous_cycle,2)}}% > {{ $pm_core_metrics->current_plus_old_ones ?? ''}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Current plus old ones')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#current_plus_old_ones_modal"></i>
                            @include('dashboard.card-data-modal.current_plus_old_ones')
                        </span>
                    </p>
                    @include('dashboard.employee.delayed_project_percentage.monthly_currect_plus_old_ones')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0 h-100">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Cancelation rate
                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#cancelation_rate_modal"></i>
                        @include('dashboard.card-data-modal.cancelation_rate')
                </h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyCancelationRateData{{ count($cancelled_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($project_cancelation_rate,2)}}% > {{ $pm_core_metrics->cancelation_rate ?? ''}}%
                        </p>
                    </a>
                    @include('dashboard.employee.cancelation_rate.monthly_cancelation_rate')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyCausedByMe{{count($caused_by_me_for_previous_cycle)}}">{{ count($caused_by_me_for_previous_cycle) }} > {{ $pm_core_metrics->number_of_revisions_for_cycle ?? ''}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Caused by me')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_me_modal"></i>
                            @include('dashboard.card-data-modal.caused_by_me')
                        </span>
                    </p>
                    <!-- @include('dashboard.employee.number_of_revision_for_cycle.monthly_caused_by_me') -->

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyCausedByOther{{count($caused_by_other_for_previous_cycle)}}" style="color: green">{{ count($caused_by_other_for_previous_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Caused By others')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_others_modal"></i>
                            @include('dashboard.card-data-modal.caused_by_others')
                        </span>
                    </p>
                    <!-- @include('dashboard.employee.number_of_revision_for_cycle.monthly_caused_by_other') -->

                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyDisputeForCycle{{count($dispute_for_previous_cycle)}}" style="color: red">{{ count($dispute_for_previous_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Disputed')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#disputed_modal"></i>
                            @include('dashboard.card-data-modal.disputed')
                        </span>
                    </p>
                    <!-- @include('dashboard.employee.number_of_revision_for_cycle.monthly_dispute') -->
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
                        <a href="#" onclick="event.preventDefault()">0 > {{ $pm_core_metrics->number_of_revisions_in_cycle ?? ''}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Caused by me')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_me_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.caused_by_me_in_cycle')
                        </span>
                    </p>
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" onclick="event.preventDefault()" style="color: green">0</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Caused By others')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#caused_by_others_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.caused_by_others_in_cycle')
                        </span>
                    </p>
                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                        <a href="#" onclick="event.preventDefault()" style="color: red">0</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Disputed')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#disputed_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.disputed_in_cycle')
                        </span>
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
    <div class="col-md-12">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Payment Rel. Count per day
                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#avg_payment_modal"></i>
                        @include('dashboard.card-data-modal.avg_payment')
                </h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyAvgPayment{{ count($total_milestone_completed_this_current_month) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($avg_payment_release_per_day,2)}} per day / {{ $pm_core_metrics->avg_payment_per_day ?? ''}} per day
                        </p>
                    </a>
                    @include('dashboard.employee.avg_payment.monthly_average_payment_per_day')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_no_of_projects" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of projects</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectModal{{ count($no_of_projects) }}">{{ count($no_of_projects) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total assigned projects number')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#totalAssignedProjectModal"></i>
                            @include('dashboard.card-data-modal.total_assigned_projects_number')
                        </span>
                    </p>
                    @include('dashboard.employee.no_of_project.monthly_total_assign_project_number')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectAcceptModal{{ count($no_of_accepted_projects) }}" style="color: green">{{ count($no_of_accepted_projects) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Accepted projects')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#acceptProject"></i>
                            @include('dashboard.card-data-modal.accepted_project')
                        </span>
                    </p>
                    @include('dashboard.employee.no_of_project.monthly_accept_project_modal')

                    <p class="mb-0 f-21 font-weight-bold  d-grid">
                        <a href="#" data-toggle="modal" data-target="#monthlyRejectedProjectModal{{ count($no_of_rejected_projects) }}" style="color: red">{{ count($no_of_rejected_projects) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Rejected projects')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#rejectedProject"></i>
                            @include('dashboard.card-data-modal.rejected_project')
                        </span>
                    </p>
                    @include('dashboard.employee.no_of_project.monthly_rejected_project_modal')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalProjectModal{{ count($no_of_projects) }}">{{ round($total_project_value, 2) }} ($)</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total assigned projects value')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_assigned_project"></i>
                            @include('dashboard.card-data-modal.total_assign_project_value_modal')
                        </span>
                    </p>
                    @include('dashboard.employee.total_project_value.monthly_total_assign_project_value')


                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProjectAcceptValueModal{{ count($no_of_accepted_projects) }}" style="color: green"> {{ round($accepted_project_value, 2) }} ($)</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Accepted projects value')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#accept_project_value"></i>
                            @include('dashboard.card-data-modal.accept_project_value')
                        </span>
                    </p>
                    @include('dashboard.employee.total_project_value.monthly_accept_project_modal')

                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyRejectedProjectValueModal{{ count($no_of_rejected_projects) }}" style="color: red"> {{ round($rejected_project_value, 2) }} ($)</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Rejected projects value')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#rejected_project_value"></i>
                            @include('dashboard.card-data-modal.rejected_project_value')
                        </span>
                    </p>
                    @include('dashboard.employee.total_project_value.monthly_rejected_project_modal')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_no_of_client" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of clients</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyNewClient{{ count($no_of_new_clients_this_cycle) }}"> {{ count($no_of_new_clients_this_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('New client')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#new_client_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.new_client_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.number_of_first_client.monthly_new_client')
                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyExistingClient{{ count($no_of_existing_clients_this_cycle) }}" style="color: green"> {{ count($no_of_existing_clients_this_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Existing client for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#existing_client_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.existing_client_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.number_of_first_client.monthly_existing_client')
                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalClient{{ count($total_client_monthly) }}" style="color: green"> {{ count($total_client_monthly) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total Client')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_client_cycle_modal"></i>
                            @include('dashboard.card-data-modal.total_client_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.number_of_first_client.monthly_total_client')


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
                        <a href="#" data-toggle="modal" data-target="#monthlyTaskComplection{{ count($total_tasks_completed_this_cycle_get) }}"> {{ round($tasks_completion_rate_this_cycle, 2) }}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Task completion rate for cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_completion_rate_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.task_completion_rate_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.task_complection_rate.monthly_task_complection_rate_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTaskComplectionRateInCycle{{ count($total_tasks_completed_previous_cycle_get) }}"> {{ round($tasks_completion_rate_previous_cycle, 2) }}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Task completion rate in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_completion_rate_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.task_completion_rate_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.task_complection_rate.monthly_task_complection_rate_in_this_cycle')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_no_of_progress_project" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of 100% in progress projects</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectForThisCycle{{ count($no_of_100_and_finish_this_cycle) }}"> {{ count($no_of_100_and_finish_this_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('100% in progress projects for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_progress_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.progress_projects.monthly_progress_projects_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectInThisCycle{{ count($no_of_100_and_finish_previous_cycle) }}"> {{ count($no_of_100_and_finish_previous_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('100% in progress projects in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.project_progress_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.progress_projects.monthly_progress_projects_in_this_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectForThisCycleValue{{ count($no_of_100_and_finish_this_cycle) }}"> {{ round($value_of_100_and_finish_this_cycle,2) }}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('100% in progress projects for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_for_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.project_progress_for_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.progress_projects_value.monthly_progress_projects_for_this_cycle_value')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectInThisCycleValue{{ count($no_of_100_and_finish_previous_cycle) }}"> {{ round($value_of_100_and_finish_previous_cycle,2) }}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('100% in progress projects in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#project_progress_in_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.project_progress_in_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.progress_projects_value.monthly_progress_projects_in_this_cycle_value')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_no_of_fully_completed" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of fully completed/Finished projects
                </h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyCompleteProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">{{ count($no_of_finished_projects_this_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Completed/Finished projects for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#finished_projects_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.finished_projects_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.number_of_fully_completed_project.monthly_complete_project_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalCompleteProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{ count($no_of_finished_projects_previous_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total completed/Finished projects in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#finished_projects_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.finished_projects_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.number_of_fully_completed_project.monthly_total_complete_project_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyFinishedProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">{{ round($value_of_finished_projects_this_cycle, 2) }}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Completed/Finished projects for cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#completed_projects_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.completed_projects_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.value_of_fully_completed_project.monthly_finished_project_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalFinishedProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">{{ round($value_of_finished_projects_previous_cycle, 2) }}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total completed/Finished projects in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#completed_projects_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.completed_projects_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.value_of_fully_completed_project.monthly_total_finished_project_cycle')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>


</div>

<div class="row mt-3" id="m_total_milestone_assigned" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone Assigned</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneAssignForThisClient{{ count($total_milestone_assigned_this_cycle) }}"> {{count($total_milestone_assigned_this_cycle)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone assigned for this cycle (Count)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_assigned_for_this_cycle_count_modal"></i>
                            @include('dashboard.card-data-modal.milestone_assigned_for_this_cycle_count')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_assign.monthly_milestone_assign_for_this_client')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneAssignInThisClient{{ count($total_milestone_assigned_this_cycle) }}">{{round($total_milestone_assigned_this_cycle_value,2)}}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone assigned for this cycle (Value)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_assigned_for_this_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.milestone_assigned_for_this_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_assign.monthly_milestone_assign_in_this_client')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneCompletedForThisCycle{{ count($total_milestone_completed_this_cycle) }}">{{count($total_milestone_completed_this_cycle)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completed for this cycle (Count)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completed_for_this_cycle_count_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completed_for_cycle_count')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_complete_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneCompletedInThisCycle{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{count($total_milestone_completed_previous_cycle)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completed in this cycle (Count)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completed_in_this_cycle_count_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completed_in_this_cycle_count')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_complete_in_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" class="mt-3" data-toggle="modal" data-target="#monthlyMilestoneReleasedForThisCycle{{ count($total_milestone_completed_this_cycle) }}">{{round($total_released_amount_this_cycle,2)}}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone released for this cycle (Value)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_released_for_this_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.milestone_released_for_this_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_released_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" class="mt-3" data-toggle="modal" data-target="#monthlyMilestoneReleasedInThisCycle{{ count($total_milestone_completed_previous_cycle) }}">{{round($total_released_amount_previous_cycle,2)}}$</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone released in this cycle (Value)')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_released_in_this_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.milestone_released_in_this_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_released_in_this_cycle')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_milestone_completion_rate" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completion Rate (Count)</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageForThisCycle{{ count($total_milestone_completed_this_cycle) }}">{{round($milestone_completion_rate_count_this_cycle,2)}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completion percentage for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completion_percentage_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.milestone_complete_rate_count.monthly_milestone_completion_percentage_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageCount{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{round($milestone_completion_rate_count_previous_cycle,2)}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completion percentage in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_in_cycle_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completion_percentage_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.milestone_complete_rate_count.monthly_milestone_completion_percentage_in_this_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageforValue{{ count($total_milestone_completed_this_cycle) }}">{{round($milestone_completion_rate_value_this_cycle,2)}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completion percentage for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_for_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completion_percentage_for_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.milestone_complete_rate_value.monthly_milestone_completion_percentage_for_this_cycle_value')

                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageInValue{{ count($total_milestone_completed_previous_cycle) }}" style="color: green">{{round($milestone_completion_rate_value_previous_cycle,2)}}%</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Milestone completion percentage in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#milestone_completion_percentage_in_cycle_value_modal"></i>
                            @include('dashboard.card-data-modal.milestone_completion_percentage_in_cycle_value')
                        </span>
                    </p>
                    @include('dashboard.employee.milestone_complete_rate_value.monthly_milestone_completion_percentage_in_this_cycle_value')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_total_task_assigned" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total tasks assigned</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlytaskAssignedForThisCycle{{ count($total_tasks_assigned_this_cycle_get) }}"> {{ $total_tasks_assigned_this_cycle }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Task assigned for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#task_assigned_for_cycle_modal"></i>
                            @include('dashboard.card-data-modal.task_assigned_for_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.total_task_assigned.monthly_task_assigned_for_this_cycle')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total tasks completed</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlyTaskCompletedForThisCycle{{ count($total_tasks_completed_this_cycle_get) }}"> {{$total_tasks_completed_this_cycle}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Tasks completed for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#tasks_completed_for_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.tasks_completed_for_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.total_task_completed.monthly_task_completed_for_this_cycle')
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlyTaskCompletedInThisCycle{{ count($total_tasks_completed_previous_cycle_get) }}">{{$total_tasks_completed_previous_cycle}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Tasks completed in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#tasks_completed_in_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.tasks_completed_in_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.total_task_completed.monthly_task_completed_in_this_cycle')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3" id="m_cancled_projects" style="display: none">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled projects</h5>
                <div class="d-flex flex-wrap">

                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlytotalCanceledProjectForThisCycle{{ count($cancelled_projects_this_cycle) }}">{{ count($cancelled_projects_this_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total cancelled project for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_cancelled_project_for_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.total_cancelled_project_for_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.canceled_project.monthly_total_canceled_project_for_this_cycle')

                    <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlytotalCanceledProjectInThisCycle{{ count($cancelled_projects_previous_cycle) }}" style="color: green">{{ count($cancelled_projects_previous_cycle) }}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total cancelled project in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_cancelled_project_in_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.total_cancelled_project_in_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.canceled_project.monthly_total_canceled_project_in_this_cycle')
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
                        <a href="#" data-toggle="modal" data-target="#MonthlytotalDelayProject{{count($no_of_delayed_projects_this_cycle)}}">{{count($no_of_delayed_projects_this_cycle)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total Delayed Project for this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_delayed_project_for_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.total_delayed_project_for_this_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.delayed_project.monthly_total_delayed_project_for_this_cycle')
                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#MonthlytotalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}" style="color: green">{{count($no_of_delayed_projects)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total Delayed Project in this cycle')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_delayed_project_in_this_cycle_modal"></i>
                            @include('dashboard.card-data-modal.total_delayed_project_in_cycle')
                        </span>
                    </p>
                    @include('dashboard.employee.delayed_project.monthly_total_delayed_project_in_this_cycle')

                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3" id="m_delayed_completed" style="display: none">
    <div class="col-md-12">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed completed</h5>
                <div class="d-flex flex-wrap">
                    <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                        <a href="#" data-toggle="modal" data-target="#monthlyTotalCompleteDelayProject{{count($no_of_delayed_projects_finished)}}">{{count($no_of_delayed_projects_finished)}}</a>
                        <span class="f-12 font-weight-normal text-lightest">
                            @lang('Total Completed Delayed Project')
                            <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#total_completed_delayed_project_modal"></i>
                            @include('dashboard.card-data-modal.total_completed_delayed_project')
                        </span>
                    </p>
                    @include('dashboard.employee.delayed_completed.monthly_total_completed_delayed_project')
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="d-flex justify-content-center">
    <button type="button" class="btn btn-primary mt-3" id="monthViewMoreBtn">View More..</button>
</div>

<script>
    $('#monthViewMoreBtn').click(function(){
    $('#m_no_of_projects, #m_no_of_client, #m_no_of_progress_project, #m_no_of_fully_completed, #m_total_milestone_assigned, #m_milestone_completion_rate, #m_total_task_assigned, #m_cancled_projects, #m_delayed_completed').toggle();
    if ($(this).text() == 'View More..') {
        $(this).text('View Less..');
    }else{
        $(this).text('View More..');
    }
});
</script>
