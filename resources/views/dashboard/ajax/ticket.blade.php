<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>


<div class="row">
    @if (in_array('tickets', $modules) && in_array('total_tickets', $activeWidgets))
        <div class="col-lg-6 col-md-6 mb-3">

                <div
                    class="bg-white p-3 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">@lang('app.menu.tickets')</h5>
                        <div class="d-flex">
                            <a href="javascript:;"  class="totalTicketCount" data-status="open"><p class="mb-0 f-15 font-weight-bold text-blue d-grid mr-5">
                                {{ $totalUnresolvedTickets }}<span class="f-12 font-weight-normal text-lightest">
                                    @lang('modules.dashboard.totalUnresolvedTickets')
                                    <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="@lang('messages.unresolveTicketInfo')" data-html="true" data-trigger="hover"></i>
                                </span>
                            </p></a>
                            <a href="javascript:;" class="totalTicketCount" data-status="resolved"><p class="mb-0 f-15 font-weight-bold text-dark-green d-grid">
                                {{ $totalResolvedTickets }}<span
                                    class="f-12 font-weight-normal text-lightest">@lang('modules.dashboard.totalResolvedTickets')
                                    <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="@lang('messages.resolveTicketInfo')" data-html="true" data-trigger="hover"></i>
                                </span>
                            </p></a>
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-ticket-alt text-lightest f-18"></i>
                    </div>
                </div>

        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('total_unassigned_ticket', $activeWidgets))
        <div class="col-lg-6 col-md-6 mb-3">
            <a href="javascript:;" id="totalUnassignedTicket">
                <x-cards.widget :title="__('modules.dashboard.totalUnassignedTicket')" :value="$totalUnassignedTicket"
                    :info="__('messages.unassignTicketInfo')" icon="ticket-alt" />
            </a>
        </div>
    @endif

</div>

<div class="row">
    @if (in_array('tickets', $modules) && in_array('type_wise_ticket', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.typeWiseTicket')">
                <x-pie-chart id="task-chart1" :labels="$ticketTypeChart['labels']" :values="$ticketTypeChart['values']"
                    :colors="$ticketTypeChart['colors']" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('status_wise_ticket', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.statusWiseTicket')">
                <x-pie-chart id="task-chart2" :labels="$ticketStatusChart['labels']"
                    :values="$ticketStatusChart['values']" :colors="$ticketStatusChart['colors']" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('channel_wise_ticket', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.channelWiseTicket')">
                <x-pie-chart id="task-chart3" :labels="$ticketChannelChart['labels']"
                    :values="$ticketChannelChart['values']" :colors="$ticketChannelChart['colors']" height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('tickets', $modules) && in_array('new_tickets', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-3">
            <x-cards.data :title="__('modules.dashboard.openTickets')" padding="false" otherClasses="h-200">
                <x-table>
                    @forelse ($newTickets as $item)
                        <tr>
                            <td class="pl-20">
                                <div class="avatar-img rounded">
                                    <img src="{{ $item->requester->image_url }}" alt="{{ $item->requester->name }}"
                                        title="{{ $item->requester->name }}">
                                </div>
                            </td>
                            <td width="50%"><a href="{{ route('tickets.show', $item->id) }}"
                                    class="text-darkest-grey">{{ ucfirst($item->subject) }}</a>
                                <br />
                                <span class="f-10 text-lightest mt-1">{{ $item->requester->name }}</span>
                            </td>
                            <td class="text-darkest-grey">{{ $item->updated_at->format(global_setting()->date_format) }}</td>
                            <td class="f-14">
                                @php
                                    if ($item->priority == 'low') {
                                        $priority = 'dark-green';
                                    }
                                    elseif ($item->priority == 'medium') {
                                        $priority = 'blue';
                                    }
                                    elseif ($item->priority == 'high') {
                                        $priority = 'yellow';
                                    }
                                    elseif ($item->priority == 'urgent') {
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

</div>

<script>
    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-ticket-dashboard') }}",
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

    $('#totalUnassignedTicket').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        var url = `{{ route('tickets.index') }}`;

        string = `?ticketStatus=unassigned&startDate=${startDate}&endDate=${endDate}`;
        url += string;

        window.location.href = url;
    });

    $('.totalTicketCount').click(function() {
        var status = $(this).data('status');
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        var url = `{{ route('tickets.index') }}`;

        string = `?ticketStatus=${status}&startDate=${startDate}&endDate=${endDate}`;
        url += string;

        window.location.href = url;
    });
</script>
