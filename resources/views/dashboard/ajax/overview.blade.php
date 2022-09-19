<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>

<div class="row">
    @if (in_array('clients', $modules) && in_array('total_clients', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('clients.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalClients')" :value="$counts->totalClients"
                    icon="users">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('total_employees', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('employees.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalEmployees')" :value="$counts->totalEmployees"
                    icon="user">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('projects', $modules) && in_array('total_projects', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('projects.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalProjects')" :value="$counts->totalProjects"
                    icon="layer-group">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('invoices', $modules) && in_array('total_unpaid_invoices', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('invoices.index') . '?status=pending' }}">
                <x-cards.widget :title="__('modules.dashboard.totalUnpaidInvoices')"
                    :value="$counts->totalUnpaidInvoices" icon="file-invoice">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('timelogs', $modules) && in_array('total_hours_logged', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6">
            <a href="{{ route('time-log-report.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalHoursLogged')" :value="$counts->totalHoursLogged"
                    icon="clock">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('tasks', $modules) && in_array('total_pending_tasks', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6">
            <a href="{{ route('tasks.index') }}?status=pending_task&type=public">
                <x-cards.widget :title="__('modules.dashboard.totalPendingTasks')" :value="$counts->totalPendingTasks"
                    icon="tasks" :info="__('modules.dashboard.privateTaskInfo')">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('attendance', $modules) && in_array('total_today_attendance', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6">
            <a href="{{ route('attendances.index') }}">
                <x-cards.widget :title="__('modules.dashboard.totalTodayAttendance')"
                    :value="$counts->totalTodayAttendance.'/'.$counts->totalEmployees" icon="calendar-check">
                </x-cards.widget>
            </a>
        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('total_unresolved_tickets', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6">
            <a href="{{ route('tickets.index') . '?status=open' }}">
                <x-cards.widget :title="__('modules.tickets.totalUnresolvedTickets')"
                    :value="floor($counts->totalOpenTickets)" icon="ticket-alt">
                </x-cards.widget>
            </a>
        </div>
    @endif

</div>

<div class="row">
    @if (in_array('payments', $modules) && in_array('recent_earnings', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('app.earnings').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'">
                <x-bar-chart id="task-chart1" :chartData="$earningChartData" height="300"></x-bar-chart>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('timelogs', $modules) && in_array('timelogs', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('app.menu.timeLogs').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'">
                <x-line-chart id="task-chart2" :chartData="$timlogChartData" height="300"></x-line-chart>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('leaves', $modules) && in_array('settings_leaves', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.leaves.pendingLeaves').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($leaves as $item)
                        <tr>
                            <td class="pl-20">
                                <x-employee :user="$item->user" />
                            </td>
                            <td class="text-darkest-grey">{{ $item->leave_date->format(global_setting()->date_format) }}</td>
                            <td class="f-14">
                                <x-status :style="'color:'.$item->type->color" :value="$item->type->type_name"></x-status>
                            </td>
                            <td align="right" class="pr-20">
                                <div class="task_view">
                                    <a href="{{ route('leaves.show', [$item->id]) }}"
                                        class="taskView openRightModal">@lang('app.view')</a>
                                    <div class="dropdown">
                                        <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle"
                                            type="link" id="dropdownMenuLink" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="icon-options-vertical icons"></i>
                                        </a>
                                        <!-- Dropdown - User Information -->
                                        <div class="dropdown-menu dropdown-menu-right"
                                            aria-labelledby="dropdownMenuLink" tabindex="0">
                                            <a class="dropdown-item leave-action" data-leave-id='{{ $item->id }}'
                                                data-leave-action="approved" href="javascript:;">
                                                <i class="fa fa-check mr-2"></i>
                                                {{ __('app.approve') }}
                                            </a>
                                            <a data-leave-id='{{ $item->id }}' data-leave-action="rejected"
                                                class="dropdown-item leave-action-reject" href="javascript:;">
                                                <i class="fa fa-times mr-2"></i>
                                                {{ __('app.reject') }}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="shadow-none">
                                <x-cards.no-record icon="calendar" :message="__('messages.noRecordFound')"></x-cards.no-record>
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('new_tickets', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.openTickets').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($newTickets as $item)
                        <tr>
                            <td class="pl-20">
                                <div class="avatar-img rounded">
                                    <img src="{{ $item->requester->image_url }}"
                                        alt="{{ $item->requester->name }}" title="{{ $item->requester->name }}">
                                </div>
                            </td>
                            <td><a href="{{ route('tickets.show', $item->id) }}"
                                    class="text-darkest-grey">{{ ucfirst($item->subject) }}</a>
                                <br />
                                <span class="f-10 text-lightest mt-1">{{ $item->requester->name }}</span>
                            </td>
                            <td class="text-darkest-grey" width="15%">{{ $item->updated_at->format(global_setting()->date_format) }}</td>
                            <td class="f-14" width="20%">
                                @php
                                    if ($item->priority == 'low') {
                                        $priority = 'dark-green';
                                    } elseif ($item->priority == 'medium') {
                                        $priority = 'blue';
                                    } elseif ($item->priority == 'high') {
                                        $priority = 'yellow';
                                    } elseif ($item->priority == 'urgent') {
                                        $priority = 'red';
                                    }
                                @endphp
                                <x-status :color="$priority" :value="__('app.' . $item->priority)" />
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="shadow-none">
                                <x-cards.no-record icon="ticket-alt" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('tasks', $modules) && in_array('overdue_tasks', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.totalPendingTasks').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($pendingTasks as $task)
                        <tr>
                            <td class="pl-20">
                                <h5 class="f-13 text-darkest-grey"><a href="{{ route('tasks.show', [$task->id]) }}"
                                        class="openRightModal">{{ $task->heading }}</a></h5>
                                <div class="text-muted">{{ $task->project->project_name ?? '' }}</div>
                            </td>
                            <td>
                                @foreach ($task->users as $item)
                                    <div class="taskEmployeeImg rounded-circle mr-1">
                                        <a href="{{ route('employees.show', $item->id) }}">
                                            <img data-toggle="tooltip"
                                                data-original-title="{{ mb_ucwords($item->name) }}"
                                                src="{{ $item->image_url }}">
                                        </a>
                                    </div>
                                @endforeach
                            </td>
                            <td width="15%">@if(!is_null($task->due_date)) {{ $task->due_date->format(global_setting()->date_format) }} @else -- @endif</td>
                            <td class="f-14" width="20%">
                                <x-status :style="'color:'.$task->boardColumn->label_color"
                                    :value="($task->boardColumn->slug == 'completed' || $task->boardColumn->slug == 'incomplete' ? __('app.' . $task->boardColumn->slug) : $task->boardColumn->column_name)" />
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="4" class="shadow-none">
                                <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('leads', $modules) && in_array('pending_follow_up', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.pendingFollowUp').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($pendingLeadFollowUps as $item)
                        <tr>
                            <td class="pl-20">
                                <h5 class="f-13 text-darkest-grey"><a
                                        href="{{ route('leads.show', [$item->id]) }}">{{ $item->client_name }}</a>
                                </h5>
                                <div class="text-muted">{{ $item->company_name }}</div>
                            </td>
                            <td>
                                {{ \Carbon\Carbon::parse($item->follow_up_date_past)->timezone(global_setting()->timezone)->format(global_setting()->date_format) }}
                            </td>
                            <td>
                                @if ($item->agent_id)
                                    <x-employee :user="$item->leadAgent->user" />
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3" class="shadow-none">
                                <x-cards.no-record icon="users" :message="__('messages.noRecordFound')"></x-cards.no-record>
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

    @if (in_array('projects', $modules) && in_array('project_activity_timeline', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.projectActivityTimeline').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false"
                otherClasses="h-200 p-activity-detail cal-info">
                @forelse($projectActivities as $key=>$activity)
                    <div class="card border-0 b-shadow-4 p-20 rounded-0">
                        <div class="card-horizontal">
                            <div class="card-header m-0 p-0 bg-white rounded">
                                <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')"
                                    :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')">
                                </x-date-badge>
                            </div>
                            <div class="card-body border-0 p-0 ml-3">
                                <h4 class="card-title f-14 font-weight-normal text-capitalize mb-0">
                                    {!! __($activity->activity) !!}
                                </h4>
                                <p class="card-text f-12 text-dark-grey">
                                    <a href="{{ route('projects.show', $activity->project_id) }}"
                                        class="text-lightest font-weight-normal text-capitalize f-12">{{ mb_ucwords($activity->project->project_name) }}
                                    </a>
                                    <br>
                                    {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                </p>
                            </div>
                        </div>
                    </div><!-- card end -->
                @empty
                    <div class="card border-0 p-20 rounded-0">
                        <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                    </div><!-- card end -->
                @endforelse
            </x-cards.data>
        </div>
    @endif

    @if (in_array('employees', $modules) && in_array('user_activity_timeline', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.userActivityTimeline').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('app.from').' '.$startDate->format(global_setting()->date_format).' '.__('app.to').' '.$endDate->format(global_setting()->date_format).'\' data-trigger=\'hover\'></i>'" padding="false"
                otherClasses="h-200 p-activity-detail cal-info">
                @forelse($userActivities as $key=>$activity)
                    <div class="card border-0 b-shadow-4 p-20 rounded-0">
                        <div class="card-horizontal">
                            <div class="card-header m-0 p-0 bg-white rounded">
                                <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')"
                                    :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')">
                                </x-date-badge>
                            </div>
                            <div class="card-body border-0 p-0 ml-3">
                                <h4 class="card-title f-14 font-weight-normal text-capitalize mb-0">
                                    {!! __($activity->activity) !!}
                                </h4>
                                <p class="card-text f-12 text-dark-grey">
                                    <a href="{{ route('employees.show', $activity->user_id) }}"
                                        class="text-lightest font-weight-normal text-capitalize f-12">{{ mb_ucwords($activity->user->name) }}
                                    </a>
                                    <br>
                                    {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                </p>
                            </div>
                        </div>
                    </div><!-- card end -->
                @empty
                    <div class="card border-0 p-20 rounded-0">
                        <x-cards.no-record icon="users" :message="__('messages.noRecordFound')" />
                    </div><!-- card end -->
                @endforelse
            </x-cards.data>
        </div>
    @endif
</div>

<script>
    $('body').on('click', '.leave-action', function() {
        const action = $(this).data('leave-action');
        const leaveId = $(this).data('leave-id');
        const url = "{{ route('leaves.leave_action') }}";
        const actionItem = $(this);

        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.changeLeaveStatusConfirmation')",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "@lang('messages.confirm')",
            cancelButtonText: "@lang('app.cancel')",
            customClass: {
                confirmButton: 'btn btn-primary mr-3',
                cancelButton: 'btn btn-secondary'
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
            buttonsStyling: false
        }).then((result) => {
            if (result.isConfirmed) {
                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
                    data: {
                        'action': action,
                        'leaveId': leaveId,
                        '_token': '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        if (response.status === 'success') {
                            actionItem.closest('tr').remove();
                        }
                    }
                });
            }
        });

    });

    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-dashboard') }}",
            container: '#dashboardWidgetForm',
            blockUI: true,
            type: "POST",
            redirect: true,
            data: $('#dashboardWidgetForm').serialize(),
            success: function() {
                window.location.reload();
            }
        })
    });
</script>
