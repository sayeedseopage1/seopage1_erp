<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<style>
    .card-img {
        width: 120px;
        height: 120px;
    }

    .card-img img {
        width: 120px;
        height: 120px;
        object-fit: cover;
    }

</style>
@php

$showFullProfile = false;

if ($viewPermission == 'all'
    || ($viewPermission == 'added' && $employee->employeeDetail->added_by == user()->id)
    || ($viewPermission == 'owned' && $employee->employeeDetail->user_id == user()->id)
    || ($viewPermission == 'both' && ($employee->employeeDetail->user_id == user()->id || $employee->employeeDetail->added_by == user()->id))
) {
    $showFullProfile = true;
}

@endphp

@php
$editEmployeePermission = user()->permission('edit_employees');
@endphp

<div class="d-lg-flex">

    <div class="project-left w-100 py-0 py-lg-5 py-md-0">
        <!-- ROW START -->
        <div class="row">
            <!--  USER CARDS START -->
            @if(Auth::user()->role_id == 1 && $employee->role_id == 4)
            <?php
            $project_counts= App\Models\PMAssign::where('pm_id',$employee->id)->first();
            if ($project_counts->project_count != 0) {
              $project_release_count= App\Models\Project::where('pm_id',$employee->id)->where('due',0)->count();
              //dd($project_release_count);
              if ($project_release_count != 0) {
                $total_release_percentage= ($project_counts->project_count /$project_release_count)* 100;
              }else {
                $total_release_percentage=0;
              }

              $project_cancelation=  App\Models\Project::where('pm_id',$employee->id)->where('status','canceled')->count();
              if ($project_cancelation != 0) {
                  $percentage_of_project_cancelation= ($project_cancelation/$project_counts->project_count)*100;
              }else {
                $percentage_of_project_cancelation= 0;
              }

              $projects_on_hold= App\Models\Project::where('pm_id',$employee->id)->where('status','on hold')->count();
              if ($projects_on_hold != 0) {
                $projects_on_hold_percentage= ($projects_on_hold/$project_counts->project_count)*100;
              }else {
                $projects_on_hold_percentage= 0;
              }

            }else {
                $total_release_percentage=0;
                $percentage_of_project_cancelation= 0;
                $projects_on_hold_percentage= 0;
            }
            if ($project_counts->amount != 0) {

              $project_cancelation_rate=  App\Models\Project::where('pm_id',$employee->id)->where('status','canceled')->sum('project_budget');
              $percentage_of_project_cancelation_rate= ($project_cancelation_rate/$project_counts->amount)*100;
            }else {

              $percentage_of_project_cancelation_rate= 0;
            }
            //dd($project_counts);
             ?>

            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Number of projects')" :value="$project_counts->project_count"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Total project value')" :value="$project_counts->amount"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Total released amount')" :value="$project_counts->release_amount"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('% of Project Got Completion')" :value="$total_release_percentage .'%'"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('% of Project Got Canceled')" :value="$percentage_of_project_cancelation . '%'"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('No. of Upsells')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Value of Upsells')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('No. of Cross-sells')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Value of Cross-sells')" :value="0"
                        icon="layer-group" />

            </div>


            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Avg. Project Completion Time')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                    <x-cards.widget :title="__('Avg. Payment Rel. Time')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('Neg. FB After Submission')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                    <x-cards.widget :title="__('% of Projects Compl. on Time')" :value="0"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3" style="color:blue;">

                    <x-cards.widget :title="__('% of Projects Cancl. Rate')" :value="$percentage_of_project_cancelation_rate . '%'"
                        icon="layer-group" />

            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 mb-3">

                    <x-cards.widget :title="__('% of Projects Gone On-Hold')" :value="$projects_on_hold_percentage .'%'"
                        icon="layer-group" />

            </div>




            @endif
            <div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4 mb-md-0">
                <div class="row">
                    <div class="col-xl-6 col-md-6 mb-4 mb-lg-0">

                        <x-cards.user :image="$employee->image_url">
                            <div class="row">
                                <div class="col-10">
                                    <h4 class="card-title f-15 f-w-500 text-darkest-grey mb-0">
                                        {{ ucfirst($employee->salutation) . ' ' . mb_ucwords($employee->name) }}
                                        @isset($employee->country)
                                            <x-flag :iso="$employee->country->iso" />
                                        @endisset
                                    </h4>
                                </div>
                                @if ($editEmployeePermission == 'all' || ($editEmployeePermission == 'added' && $employee->employeeDetail->added_by == user()->id))
                                    <div class="col-2 text-right">
                                        <div class="dropdown">
                                            <button class="btn f-14 px-0 py-0 text-dark-grey dropdown-toggle"
                                                type="button" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i class="fa fa-ellipsis-h"></i>
                                            </button>

                                            <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                                aria-labelledby="dropdownMenuLink" tabindex="0">
                                                <a class="dropdown-item openRightModal"
                                                    href="{{ route('employees.edit', $employee->id) }}">@lang('app.edit')</a>
                                            </div>
                                        </div>
                                    </div>
                                @endif

                            </div>

                            <p class="f-13 font-weight-normal text-dark-grey mb-0">
                                {{ !is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->designation) ? mb_ucwords($employee->employeeDetail->designation->name) : '' }}
                                &bull;
                                {{ isset($employee->employeeDetail) && !is_null($employee->employeeDetail->department) && !is_null($employee->employeeDetail->department) ? mb_ucwords($employee->employeeDetail->department->team_name) : '' }}
                            </p>

                            @if ($employee->status == 'active')
                                <p class="card-text f-12 text-lightest">@lang('app.lastLogin')

                                    @if (!is_null($employee->last_login))
                                        {{ $employee->last_login->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                                    @else
                                        --
                                    @endif
                                </p>

                            @else
                                <p class="card-text f-12 text-lightest">
                                    <x-status :value="__('app.inactive')" color="red" />
                                </p>
                            @endif

                            @if ($showFullProfile)
                                <div class="card-footer bg-white border-top-grey pl-0">
                                    <div class="d-flex flex-wrap justify-content-between">
                                        <span>
                                            <label class="f-11 text-dark-grey mb-12 text-capitalize"
                                                for="usr">@lang('app.open') @lang('app.menu.tasks')</label>
                                            <p class="mb-0 f-18 f-w-500">{{ $employee->open_tasks_count }}</p>
                                        </span>
                                        <span>
                                            <label class="f-11 text-dark-grey mb-12 text-capitalize"
                                                for="usr">@lang('app.menu.projects')</label>
                                            <p class="mb-0 f-18 f-w-500">{{ $employee->member_count }}</p>
                                        </span>
                                        <span>
                                            <label class="f-11 text-dark-grey mb-12 text-capitalize"
                                                for="usr">@lang('modules.employees.hoursLogged')</label>
                                            <p class="mb-0 f-18 f-w-500">{{ $hoursLogged }}</p>
                                        </span>
                                        <span>
                                            <label class="f-11 text-dark-grey mb-12 text-capitalize"
                                                for="usr">@lang('app.menu.tickets')</label>
                                            <p class="mb-0 f-18 f-w-500">{{ $employee->agents_count }}</p>
                                        </span>
                                    </div>
                                </div>
                            @endif
                        </x-cards.user>

                        @if ($employee->employeeDetail->about_me != '')
                            <x-cards.data :title="__('app.about')" class="mt-4">
                                <div>{{ $employee->employeeDetail->about_me }}</div>
                            </x-cards.data>
                        @endif


                        <x-cards.data :title="__('modules.client.profileInfo')" class=" mt-4">
                            <x-cards.data-row :label="__('modules.employees.employeeId')"
                                :value="(!is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->employee_id)) ? mb_ucwords($employee->employeeDetail->employee_id) : '--'" />

                            <x-cards.data-row :label="__('modules.employees.fullName')"
                                :value="mb_ucwords($employee->name)" />

                            <x-cards.data-row :label="__('app.email')" :value="$employee->email" />

                            <x-cards.data-row :label="__('app.designation')"
                                :value="(!is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->designation)) ? mb_ucwords($employee->employeeDetail->designation->name) : '--'" />

                            <x-cards.data-row :label="__('app.department')"
                                :value="(isset($employee->employeeDetail) && !is_null($employee->employeeDetail->department) && !is_null($employee->employeeDetail->department)) ? mb_ucwords($employee->employeeDetail->department->team_name) : '--'" />


                            <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                    @lang('modules.employees.gender')</p>
                                <p class="mb-0 text-dark-grey f-14 w-70">
                                    <x-gender :gender='$employee->gender' />
                                </p>
                            </div>

                            <x-cards.data-row :label="__('modules.employees.joiningDate')"
                            :value="(!is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->joining_date)) ? $employee->employeeDetail->joining_date->format(global_setting()->date_format) : '--'" />

                            @php
                                $currentyearJoiningDate = \Carbon\Carbon::parse(now(global_setting()->timezone)->year.'-'.$employee->employeeDetail->joining_date->format('m-d'));
                                if ($currentyearJoiningDate->copy()->endOfDay()->isPast()) {
                                    $currentyearJoiningDate = $currentyearJoiningDate->addYear();
                                }
                                $diffInHoursJoiningDate = now(global_setting()->timezone)->floatDiffInHours($currentyearJoiningDate, false);
                            @endphp

                            <x-cards.data-row :label="__('modules.employees.workAnniversary')" :value="(!is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->joining_date)) ? (($diffInHoursJoiningDate > -23 && $diffInHoursJoiningDate <= 0) ? __('app.today') : $currentyearJoiningDate->longRelativeToNowDiffForHumans()) : '--'" />

                            <x-cards.data-row :label="__('modules.employees.dateOfBirth')"
                            :value="(!is_null($employee->employeeDetail) && !is_null($employee->employeeDetail->date_of_birth)) ? $employee->employeeDetail->date_of_birth->format('d F') : '--'" />

                            @if ($showFullProfile)
                                <x-cards.data-row :label="__('app.mobile')"
                                :value="(!is_null($employee->country_id) ? '+'.$employee->country->phonecode.'-' : '--'). $employee->mobile ?? '--'" />

                                <x-cards.data-row :label="__('modules.employees.slackUsername')"
                                    :value="(isset($employee->employeeDetail) && !is_null($employee->employeeDetail->slack_username)) ? '@'.$employee->employeeDetail->slack_username : '--'" />

                                <x-cards.data-row :label="__('modules.employees.hourlyRate')"
                                    :value="(!is_null($employee->employeeDetail)) ? global_setting()->currency->currency_symbol.$employee->employeeDetail->hourly_rate : '--'" />

                                <x-cards.data-row :label="__('app.address')"
                                    :value="$employee->employeeDetail->address ?? '--'" />

                                <x-cards.data-row :label="__('app.skills')"
                                    :value="$employee->skills() ? implode(', ', $employee->skills()) : '--'" />

                                <x-cards.data-row :label="__('app.language')"
                                    :value="$employeeLanguage->language_name ?? '--'" />

                                {{-- Custom fields data --}}
                                @if (isset($fields))
                                    @foreach ($fields as $field)
                                        @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                                            <x-cards.data-row :label="$field->label"
                                                :value="$employee->employeeDetail->custom_fields_data['field_'.$field->id] ?? '--'" />
                                        @elseif($field->type == 'textarea')
                                            <x-cards.data-row :label="$field->label" html="true"
                                                :value="$employee->employeeDetail->custom_fields_data['field_'.$field->id] ?? '--'" />
                                        @elseif($field->type == 'radio')
                                            <x-cards.data-row :label="$field->label"
                                                :value="(!is_null($employee->employeeDetail->custom_fields_data['field_' . $field->id]) ? $employee->employeeDetail->custom_fields_data['field_' . $field->id] : '--')" />
                                        @elseif($field->type == 'checkbox')
                                            <x-cards.data-row :label="$field->label"
                                                :value="(!is_null($employee->employeeDetail->custom_fields_data['field_' . $field->id]) ? $employee->employeeDetail->custom_fields_data['field_' . $field->id] : '--')" />
                                        @elseif($field->type == 'select')
                                            <x-cards.data-row :label="$field->label"
                                                :value="(!is_null($employee->employeeDetail->custom_fields_data['field_' . $field->id]) && $employee->employeeDetail->custom_fields_data['field_' . $field->id] != '' ? $field->values[$employee->employeeDetail->custom_fields_data['field_' . $field->id]] : '--')" />
                                        @elseif($field->type == 'date')
                                            <x-cards.data-row :label="$field->label"
                                                :value="(!is_null($employee->employeeDetail->custom_fields_data['field_' . $field->id]) && $employee->employeeDetail->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($employee->employeeDetail->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                                        @endif
                                    @endforeach
                                @endif

                            @endif

                        </x-cards.data>


                    </div>


                        <div class="col-xl-6 col-lg-6 col-md-6">
                            <x-cards.data class="mb-4">
                                <div class="d-flex justify-content-between">
                                        <div class="col-6">
                                            <p class="f-14 text-dark-grey">@lang('modules.employees.reportingTo')</p>
                                            @if ($employee->employeeDetail->reportingTo)
                                                <x-employee :user="$employee->employeeDetail->reportingTo" />
                                            @else
                                            --
                                            @endif
                                        </div>

                                    @if ($employee->reportingTeam)
                                        <div class="col-6">
                                            <p class="f-14 text-dark-grey">@lang('modules.employees.reportingTeam')</p>
                                            @if (count($employee->reportingTeam) > 0)
                                                @if (count($employee->reportingTeam) > 1)
                                                    @foreach ($employee->reportingTeam as $item)
                                                        <div class="taskEmployeeImg rounded-circle mr-1">
                                                            <a href="{{ route('employees.show', $item->user->id) }}">
                                                                <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($item->user->name) }}"
                                                                    src="{{ $item->user->image_url }}">
                                                            </a>
                                                        </div>
                                                    @endforeach
                                                @else
                                                    @foreach ($employee->reportingTeam as $item)
                                                        <x-employee :user="$item->user" />
                                                    @endforeach
                                                @endif

                                            @else
                                                --
                                            @endif
                                        </div>
                                    @endif
                                </div>
                            </x-cards.data>

                            @if ($showFullProfile)
                                <div class="row">
                                    @if (in_array('attendance', user_modules()))
                                        <div class="col-xl-6 col-sm-12 mb-4">
                                            <x-cards.widget :title="__('modules.dashboard.lateAttendanceMark')"
                                                :value="$lateAttendance" :info="__('modules.dashboard.thisMonth')"
                                                icon="map-marker-alt" />
                                        </div>
                                    @endif
                                    @if (in_array('leaves', user_modules()))
                                        <div class="col-xl-6 col-sm-12 mb-4">
                                            <x-cards.widget :title="__('modules.dashboard.leavesTaken')" :value="$leavesTaken"
                                                :info="__('modules.dashboard.thisMonth')" icon="sign-out-alt" />
                                        </div>
                                    @endif
                                </div>
                                <div class="row">
                                    @if (in_array('tasks', user_modules()))
                                        <div class="col-md-12 mb-4">
                                            <x-cards.data :title="__('app.menu.tasks')" padding="false">
                                                <x-pie-chart id="task-chart" :labels="$taskChart['labels']"
                                                    :values="$taskChart['values']" :colors="$taskChart['colors']" height="250"
                                                    width="300" />
                                            </x-cards.data>
                                        </div>
                                    @endif
                                    @if (in_array('tickets', user_modules()))
                                        <div class="col-md-12 mb-4">
                                            <x-cards.data :title="__('app.menu.tickets')" padding="false">
                                                <x-pie-chart id="ticket-chart" :labels="$ticketChart['labels']"
                                                    :values="$ticketChart['values']" :colors="$ticketChart['colors']"
                                                    height="250" width="300" />
                                            </x-cards.data>
                                        </div>
                                    @endif
                                </div>
                            @endif

                        </div>
                </div>
            </div>
            <!--  USER CARDS END -->

            <!--  WIDGETS START -->

            <!--  WIDGETS END -->

        </div>
        <!-- ROW END -->
    </div>

    @if ($showFullProfile)

        <!-- PROJECT RIGHT START -->
        <div class="project-right my-4 my-lg-0">
            <div class="bg-white">
                <!-- ACTIVITY HEADING START -->
                <div class="p-activity-heading d-flex align-items-center justify-content-between b-shadow-4 p-20">
                    <p class="mb-0 f-18 f-w-500">@lang('modules.employees.activity')</p>
                </div>
                <!-- ACTIVITY HEADING END -->
                <!-- ACTIVITY DETAIL START -->
                <div class="p-activity-detail cal-info b-shadow-4" data-menu-vertical="1" data-menu-scroll="1"
                    data-menu-dropdown-timeout="500" id="projectActivityDetail">

                    @forelse($activities as $key=>$activity)
                        <div class="card border-0 b-shadow-4 p-20 rounded-0">
                            <div class="card-horizontal">
                                <div class="card-header m-0 p-0 bg-white rounded">
                                    <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')"
                                        :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')" />
                                </div>
                                <div class="card-body border-0 p-0 ml-3">
                                    <h4 class="card-title f-14 font-weight-normal text-capitalize">{!! __($activity->activity) !!}
                                    </h4>
                                    <p class="card-text f-12 text-dark-grey">
                                        {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                    </p>
                                </div>
                            </div>
                        </div><!-- card end -->
                    @empty
                        <div class="card border-0 p-20 rounded-0">
                            <div class="card-horizontal">

                                <div class="card-body border-0 p-0 ml-3">
                                    <h4 class="card-title f-14 font-weight-normal">
                                        @lang('messages.noActivityByThisUser')</h4>
                                    <p class="card-text f-12 text-dark-grey"></p>
                                </div>
                            </div>
                        </div><!-- card end -->
                    @endforelse


                </div>
                <!-- ACTIVITY DETAIL END -->
            </div>
        </div>
        <!-- PROJECT RIGHT END -->

    @endif
</div>
