<div class="row">
    <div class="col-md-6">
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectModal{{ count($no_of_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ count($no_of_projects) }}<span class="f-12 font-weight-normal text-lightest">
                                @lang('Total assigned projects number') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.no_of_project.monthly_total_assign_project_number')



                    <a href="#" data-toggle="modal" data-target="#monthlyProjectAcceptModal{{ count($no_of_accepted_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ count($no_of_accepted_projects) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Accepted projects') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.no_of_project.monthly_accept_project_modal')

                    <a href="#" data-toggle="modal" data-target="#monthlyRejectedProjectModal{{ count($no_of_rejected_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid">
                            {{ count($no_of_rejected_projects) }}<span
                                class="f-12 font-weight-normal text-lightest">@lang('Rejected projects')</span>
                        </p>
                    </a>
                    @include('dashboard.employee.no_of_project.monthly_rejected_project_modal')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyTotalProjectModal{{ count($no_of_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_project_value, 2) }} ($)<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total assigned projects value') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_project_value.monthly_total_assign_project_value')

                    <a href="#" data-toggle="modal" data-target="#monthlyProjectAcceptValueModal{{ count($no_of_accepted_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($accepted_project_value, 2) }} ($)<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Accepted projects value') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_project_value.monthly_accept_project_modal')

                    <a href="#" data-toggle="modal" data-target="#monthlyRejectedProjectValueModal{{ count($no_of_rejected_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            {{ round($rejected_project_value, 2) }} ($)<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Rejected projects value') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_project_value.monthly_rejected_project_modal')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyReleasedAmountCycle{{ count($total_released_amount_this_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_released_amount_this_cycle, 2) }} ($)<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Released amount in this Cycle') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_released_amount.monthly_released_amount_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyTotalReleasedAmount{{ count($total_released_amount_previous_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($total_released_amount_previous_cycle, 2) }} ($)<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total released amount') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_released_amount.monthly_total_released_amount')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of 100% in progress projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ count($no_of_100_finished_project_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects in this cycle')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ count($no_of_100_finished_project_previous_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for this cycle')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of fully completed/Finished projects
                </h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyCompleteProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ count($no_of_finished_projects_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.number_of_fully_completed_project.monthly_complete_project_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyTotalCompleteProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ count($no_of_finished_projects_previous_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total completed/Finished projects in this cycle')
                            </span>
                        </p>
                    </a>
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion rate (Count)</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0%<span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for cycle')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
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
</div>
<div class="row mt-3">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of fully completed/Finished projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($value_of_finished_projects_this_cycle, 2) }} <span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($value_of_finished_projects_previous_cycle, 2) }} <span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total completed/Finished projects in this cycle')
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion rate (Value)</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0%<span class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for cycle')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
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
    <div class="col-md-12">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of First time clients</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($month_avg_project_completion_time, 2) }} Days<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion rate')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($month_avg_project_completion_time, 2) }} Days<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Complete milestones for cycle')
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone completion rate</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestones ccompleted')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestones ccompleted')
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Complete milestones for cycle</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestones ccompleted')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestones ccompleted')
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task completion rate</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($month_total_canceled_project, 2) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Task completion rate for cycle')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average project completion time</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0 days<span class="f-12 font-weight-normal text-lightest">
                                @lang('Average Project Completion Time')
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of upsale/cross sales</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($month_percentage_of_onhold_project_count, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of New deals added')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($month_percentage_of_onhold_project_count, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of new milestones added on old projects')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 mt-3">
                            {{ round($month_percentage_of_onhold_project_count, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of old projects where there is upsales/cross sales')
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of upsale/crosssale</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $month_project_deadline->count() }}<span
                                class="f-12 font-weight-normal text-lightest"></span>
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            {{ $month_project_deadline->count() }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Cancelled Project')
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $month_milestoe_to_be_completed }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Delayed Project')
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed projects percentage</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $month_tasks_under_review }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Current')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $month_tasks_under_review }}<span
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
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ $month_tasks_deadline }}<span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Completed Delayed Project')
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of revisions for cycle</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Caused by me')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Caused By others')
                            </span>
                        </p>
                    </a>
                    <a href="#">
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
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Caused by me')
                            </span>
                        </p>
                    </a>
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Caused By others')
                            </span>
                        </p>
                    </a>
                    <a href="#">
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Cancelation rate</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Payment Rel. Count per day</h5>
                <div class="d-flex flex-wrap">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0
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
