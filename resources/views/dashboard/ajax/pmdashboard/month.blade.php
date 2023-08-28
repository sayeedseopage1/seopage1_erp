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
                                @lang('Released amount for this Cycle') </span>
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of clients</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyNewClient{{ count($no_of_new_clients_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ count($no_of_new_clients_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('New client')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.number_of_first_client.monthly_new_client')
                    <a href="#" data-toggle="modal" data-target="#monthlyExistingClient{{ count($no_of_existing_clients_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ count($no_of_existing_clients_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Existing client for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.number_of_first_client.monthly_existing_client')
                    

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
                    <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectForThisCycle{{ count($no_of_100_finished_project_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ count($no_of_100_finished_project_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.progress_projects.monthly_progress_projects_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectInThisCycle{{ count($no_of_100_finished_project_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ count($no_of_100_finished_project_previous_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects in this cycle')
                            </span>
                        </p>
                    </a>
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
                    <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectForThisCycleValue{{ count($no_of_100_finished_project_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($value_of_100_finished_project_this_cycle,2) }}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.progress_projects_value.monthly_progress_projects_for_this_cycle_value')
                    <a href="#" data-toggle="modal" data-target="#monthlyProgressProjectInThisCycleValue{{ count($no_of_100_finished_project_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($value_of_100_finished_project_previous_cycle,2) }}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('100% in progress projects in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.progress_projects_value.monthly_progress_projects_in_this_cycle_value')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionProgressForThisCycleCount{{ count($no_of_100_finished_project_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($project_completion_rate_count_this_cycle_100_in_progress, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate for this Cycle') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.projects_completion_progress_rate_count.monthly_project_complection_rate_for_this_cycle_count')
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionProgressInThisCycleCount{{ count($no_of_100_finished_project_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($project_completion_rate_count_previous_cycle_100_in_progress, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate in this Cycle') </span>
                        </p>
                    </a>
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
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateForThisValue{{ count($no_of_100_finished_project_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($project_completion_rate_count_this_cycle_value_100_in_progress, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate for this Cycle') </span>
                        </p>
                    </a>
                    @include('dashboard.employee.projects_completion_progress_rate_value.monthly_project_complection_rate_for_this_cycle_value')
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateInThisValue{{ count($no_of_100_finished_project_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($project_completion_rate_count_previous_cycle_value_100_in_progress, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate in this Cycle') </span>
                        </p>
                    </a>
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of fully completed/Finished projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyFinishedProjectCycle{{ count($no_of_finished_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($value_of_finished_projects_this_cycle, 2) }}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Completed/Finished projects for cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.value_of_fully_completed_project.monthly_finished_project_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyTotalFinishedProjectCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{ round($value_of_finished_projects_previous_cycle, 2) }}$ <span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total completed/Finished projects in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.value_of_fully_completed_project.monthly_total_finished_project_cycle')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateForThisCycle{{ count($no_of_finished_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($project_completion_rate_count_this_cycle,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.project_completion_rate_count.monthly_project_completion_rate_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyProjectComplectionRateInThisCycle{{ count($no_of_finished_projects_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{round($project_completion_rate_count_previous_cycle,2)}}%<span class="f-12 font-weight-normal text-lightest">
                                @lang('Project completion rate in this cycle')
                            </span>
                        </p>
                    </a>
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
                                @lang('Completed/Finished projects for cycle')
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

<div class="row mt-3">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0"
            style="height: 100%;">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone Assigned</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneAssignForThisClient{{ count($total_milestone_assigned_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{count($total_milestone_assigned_this_cycle)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned for this cycle (Count)')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_milestone_assign.monthly_milestone_assign_for_this_client')
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneAssignInThisClient{{ count($total_milestone_assigned_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{round($total_milestone_assigned_this_cycle_value,2)}}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone assigned in this cycle (Value)')
                            </span>
                        </p>
                    </a>
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
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneCompletedForThisCycle{{ count($total_milestone_completed_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{count($total_milestone_completed_this_cycle)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completed for this cycle (Count)')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_complete_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneCompletedInThisCycle{{ count($total_milestone_completed_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{count($total_milestone_completed_previous_cycle)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completed in this cycle (Count)')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_complete_in_this_cycle')
                    <a href="#" class="mt-3" data-toggle="modal" data-target="#monthlyMilestoneReleasedForThisCycle{{ count($total_milestone_completed_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($total_released_amount_this_cycle,2)}}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone released for this cycle (Value)')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_released_for_this_cycle')
                    <a href="#" class="mt-3" data-toggle="modal" data-target="#monthlyMilestoneReleasedInThisCycle{{ count($total_milestone_completed_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{round($total_released_amount_previous_cycle,2)}}$<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone released in this cycle (Value) ')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_milestone_complete.monthly_milestone_released_in_this_cycle')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageForThisCycle{{ count($total_milestone_completed_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($milestone_completion_rate_count_this_cycle,2)}}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.milestone_complete_rate_count.monthly_milestone_completion_percentage_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageCount{{ count($total_milestone_completed_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{round($milestone_completion_rate_count_previous_cycle,2)}}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage in this cycle')
                            </span>
                        </p>
                    </a>
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
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageforValue{{ count($total_milestone_completed_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($milestone_completion_rate_value_this_cycle,2)}}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.milestone_complete_rate_value.monthly_milestone_completion_percentage_for_this_cycle_value')
                    <a href="#" data-toggle="modal" data-target="#monthlyMilestoneComplectionPercentageInValue{{ count($total_milestone_completed_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{round($milestone_completion_rate_value_previous_cycle,2)}}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Milestone completion percentage in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.milestone_complete_rate_value.monthly_milestone_completion_percentage_in_this_cycle_value')
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
                    <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlytaskAssignedForThisCycle{{ count($total_tasks_assigned_this_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $total_tasks_assigned_this_cycle }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Task assigned for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_task_assigned.monthly_task_assigned_for_this_cycle')
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
                    <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlyTaskCompletedForThisCycle{{ count($total_tasks_completed_this_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$total_tasks_completed_this_cycle}}<span class="f-12 font-weight-normal text-lightest">
                                @lang('Tasks completed for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_task_completed.monthly_task_completed_for_this_cycle')
                    <a href="#" data-toggle="modal" data-toggle="modal" data-target="#monthlyTaskCompletedInThisCycle{{ count($total_tasks_completed_previous_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{$total_tasks_completed_previous_cycle}}<span class="f-12 font-weight-normal text-lightest">
                                @lang('Tasks completed in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.total_task_completed.monthly_task_completed_in_this_cycle')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyTaskComplection{{ count($total_tasks_completed_this_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($tasks_completion_rate_this_cycle, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Task completion rate for cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.task_complection_rate.monthly_task_complection_rate_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlyTaskComplectionRateInCycle{{ count($total_tasks_completed_previous_cycle_get) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($tasks_completion_rate_previous_cycle, 2) }}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Task completion rate in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.task_complection_rate.monthly_task_complection_rate_in_this_cycle')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyAverageComplectionDays{{ count($average_project_completion_rate) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($average_completion_days,2)}} days<span class="f-12 font-weight-normal text-lightest">
                                @lang('Average project compeltion time for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.average_project.monthly_average_project_completion_time')
                    <a href="#" data-toggle="modal" data-target="#monthlyAverageComplectionInThisDays{{ count($average_project_completion_rate_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($average_completion_days_previous_cycle,2)}} days<span class="f-12 font-weight-normal text-lightest">
                                @lang('Average project compeltion time in this cycle')
                            </span>
                        </p>
                    </a>
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of upsale/cross sales</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" onclick="event.preventDefault()">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                        {{ count($no_of_new_deals_added_previous) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of New deals added')
                            </span>
                        </p>
                    </a>
                    <a href="#" data-toggle="modal" data-target="#monthlyNumberOfMilestoneAdd{{ count($no_of_new_milestones_added_on_old_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{count($no_of_new_milestones_added_on_old_projects)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of new milestones added on old projects')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.upsale_cross_sales.monthly_number_of_milestone_add')
                    <a href="#" data-toggle="modal" data-target="#monthlyNumberOfOldProject{{ count($no_of_new_milestones_added_on_old_projects_id) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 mt-3">
                            {{count($no_of_new_milestones_added_on_old_projects_id)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Number of old projects where there is upsales/cross sales')
                            </span>
                        </p>
                    </a>
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
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of upsale/crosssale</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyValueOfUpsale{{ count($no_of_new_milestones_added_on_old_projects) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($no_of_new_milestones_added_on_old_projects_value,2)}}$<span
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
        <div
            class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled projects</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlytotalCanceledProjectForThisCycle{{ count($cancelled_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            {{ count($cancelled_projects_this_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Cancelled Project for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.canceled_project.monthly_total_canceled_project_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#monthlytotalCanceledProjectInThisCycle{{ count($cancelled_projects_previous_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-danger d-grid mr-5">
                            {{ count($cancelled_projects_previous_cycle) }}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Cancelled Project in this cycle')
                            </span>
                        </p>
                    </a>
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
                    <a href="#" data-toggle="modal" data-target="#MonthlytotalDelayProject{{count($no_of_delayed_projects_this_cycle)}}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{count($no_of_delayed_projects_this_cycle)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Delayed Project in this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.delayed_project.monthly_total_delayed_project_for_this_cycle')
                    <a href="#" data-toggle="modal" data-target="#MonthlytotalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{count($no_of_delayed_projects)}}<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Total Delayed Project for this cycle')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.delayed_project.monthly_total_delayed_project_in_this_cycle')
                   
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
                    <a href="#"  data-toggle="modal" data-target="#MonthlytotalDelayProject{{count($no_of_delayed_projects_this_cycle)}}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($delayed_projects_percentage_this_cycle,2)}}%<span
                                class="f-12 font-weight-normal text-lightest">
                                @lang('Current')
                            </span>
                        </p>
                    </a>
                    <a href="#"  data-toggle="modal" data-target="#MonthlytotalDelayProjectInthisCycle{{count($no_of_delayed_projects)}}">
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Delayed completed</h5>
                <div class="d-flex flex-wrap">
                    <a href="#" data-toggle="modal" data-target="#monthlyTotalCompleteDelayProject{{count($no_of_delayed_projects_finished)}}">
                        <p class="mb-0 f-21 font-weight-bold text-success d-grid mr-5">
                            {{count($no_of_delayed_projects_finished)}}<span class="f-12 font-weight-normal text-lightest">
                                @lang('Total Completed Delayed Project')
                            </span>
                        </p>
                    </a>
                    @include('dashboard.employee.delayed_completed.monthly_total_completed_delayed_project')
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
                    <a href="#" data-toggle="modal" data-target="#monthlyCancelationRateData{{ count($cancelled_projects_this_cycle) }}">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{round($project_cancelation_rate,2)}}%
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
