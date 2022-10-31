<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>

<?php
$cancel_project= App\Models\Project::where('status','canceled')->count();
 ?>
<div class="row">
    @if (in_array('projects', $modules) && in_array('total_project', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="totalProjectsCount">
                <x-cards.widget :title="__('modules.dashboard.totalProjects')" :value="$totalProject"
                    icon="layer-group" />
            </a>
        </div>
    @endif

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="totalAcceptedProjectsCount">
                <x-cards.widget :title="__('Total Accepted Project')" :value="$totalAcceptedProject"
                    icon="layer-group" />
            </a>
        </div>


    @if (in_array('projects', $modules) && in_array('total_overdue_project', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="overDue">
                <x-cards.widget :title="__('modules.tickets.overDueProjects')" :value="$totalOverdueProject"
                    icon="layer-group" />
            </a>
        </div>
    @endif

        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="cancel">
                <x-cards.widget :title="__('Total Canceled Project')" :value="$totalCanceledProject"
                    icon="layer-group" />
            </a>
        </div>



    @if (in_array('timelogs', $modules) && in_array('total_hours_logged', $activeWidgets))
        <div class="col-xl-3 col-lg-6 col-md-6 mb-3">
            <a href="{{ route('time-log-report.index') . '?project=required' }}">
                <x-cards.widget :title="__('modules.dashboard.totalHoursLogged')" :value="$totalHoursLogged"
                    icon="clock" />
            </a>
        </div>
    @endif

</div>

<div class="row">
    @if (in_array('projects', $modules) && in_array('status_wise_project', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.statusWiseProject')">
                <x-pie-chart id="task-chart" :labels="$statusWiseProject['labels']"
                    :values="$statusWiseProject['values']" :colors="$statusWiseProject['colors']" height="250" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('projects', $modules) && in_array('pending_milestone', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.pendingMilestone')" padding="false" otherClasses="h-200">
                <x-table class="border-0 pb-3 admin-dash-table table-hover">

                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>@lang('modules.projects.milestoneTitle')</th>
                        <th>@lang('modules.projects.milestoneCost')</th>
                        <th>@lang('app.project')</th>
                    </x-slot>

                    @forelse($pendingMilestone as $key=>$item)
                        <tr id="row-{{ $item->id }}">
                            <td class="pl-20">{{ $key + 1 }}</td>
                            <td>
                                <a href="javascript:;" class="milestone-detail text-darkest-grey f-w-500"
                                    data-milestone-id="{{ $item->id }}">{{ ucfirst($item->milestone_title) }}</a>
                            </td>
                            <td>
                                @if (!is_null($item->currency_id))
                                    {{ $item->currency->currency_symbol . $item->cost }}
                                @else
                                    {{ $item->cost }}
                                @endif
                            </td>
                            <td>
                                <a href="{{ route('projects.show', [$item->project_id]) }}"
                                    class="text-darkest-grey">{{ $item->project->project_name }}</a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="shadow-none">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    @endif

</div>

<script>
    $('body').on('click', '.milestone-detail', function() {
        var id = $(this).data('milestone-id');
        var url = "{{ route('milestones.show', ':id') }}";
        url = url.replace(':id', id);
        $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_XL, url);
    });

    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-project-dashboard') }}",
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

    $('#overDue').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;
        //console.log(url);

        string = `?status=overdue&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });
    $('#cancel').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = `{{ route('projects.index') }}`;

        string = `?status=canceled&deadLineStartDate=${startDate}&deadLineEndDate=${endDate}`;
        url += string;

        window.location.href = url;
    });

    $('#totalProjectsCount').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });
    $('#totalAcceptedProjectsCount').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('projects.index') }}`;

        string = `?project_status=Accepted&start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    function getDateRange() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var data = [];
        data['startDate'] = startDate;
        data['endDate'] = endDate;

        return data;
    }
</script>
