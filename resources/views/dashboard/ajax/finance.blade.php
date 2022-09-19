<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>

<div class="row">
    <div class="col-md-12">
        <x-alert type="secondary" icon="info-circle">
            @lang('messages.earningChartNote') ({{ global_setting()->currency->currency_code }})
        </x-alert>
    </div>
</div>

<div class="row">
    @if (in_array('invoices', $modules) && (in_array('total_paid_invoices', $activeWidgets) || in_array('total_unpaid_invoices', $activeWidgets)))
        <div class="col-xl-4 col-lg-6 col-md-6">
            <div
                class="bg-white p-3 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-13 f-w-500 mb-20 text-darkest-grey">@lang('app.menu.invoices')</h5>
                    <div class="d-flex">
                        @if (in_array('total_paid_invoices', $activeWidgets))
                            <a href="javascript:;" id="totalPaidInvoices">
                                <p class="mb-0 f-15 font-weight-bold text-blue d-grid mr-5">
                                    {{ $totalPaidInvoice }}<span class="f-12 font-weight-normal text-lightest">
                                        @lang('modules.dashboard.totalPaidInvoices') </span>
                                </p>
                            </a>
                        @endif

                        @if (in_array('total_unpaid_invoices', $activeWidgets))
                            <a href="javascript:;" id="totalPendingInvoices">
                                <p class="mb-0 f-15 font-weight-bold text-red d-grid">
                                    {{ $totalUnPaidInvoice }}<span
                                        class="f-12 font-weight-normal text-lightest">@lang('modules.dashboard.totalUnpaidInvoices')</span>
                                </p>
                            </a>
                        @endif
                    </div>
                </div>
                <div class="d-block">
                    <i class="fa fa-file-invoice text-lightest f-18"></i>
                </div>
            </div>
        </div>
    @endif

    @if (in_array('invoices', $modules) && (in_array('total_expenses', $activeWidgets) || in_array('total_earnings', $activeWidgets)))
        <div class="col-xl-4 col-lg-6 col-md-6">
            <div
                class="bg-white p-3 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                <div class="d-block text-capitalize">
                    <h5 class="f-13 f-w-500 mb-20 text-darkest-grey">@lang('app.menu.finance')</h5>
                    <a href="javascript:;" id="totalEarnings">
                        <div class="d-flex">
                            @if (in_array('total_expenses', $activeWidgets))
                                <p class="mb-0 f-15 font-weight-bold text-blue d-grid mr-5">
                                    {{ currency_formatter($totalExpenses) }}<span
                                        class="f-12 font-weight-normal text-lightest">
                                        @lang('modules.dashboard.totalExpenses') </span>
                                </p>
                            @endif

                            @if (in_array('total_earnings', $activeWidgets))
                                <p class="mb-0 f-15 font-weight-bold text-dark-green d-grid">
                                    {{ currency_formatter($totalEarnings) }}<span
                                        class="f-12 font-weight-normal text-lightest">@lang('modules.dashboard.totalEarnings')</span>
                                </p>
                            @endif
                        </div>
                    </a>
                </div>
                <div class="d-block">
                    <i class="fa fa-coins text-lightest f-18"></i>
                </div>
            </div>
        </div>
    @endif

    @if (in_array('invoices', $modules) && in_array('total_pending_amount', $activeWidgets))
        <div class="col-xl-4 col-lg-6 col-md-6">
            <a href="javascript:;" id="totalPendingAmount">
                <x-cards.widget :title="__('modules.dashboard.totalPendingAmount')"
                    :value="currency_formatter($totalPendingAmount)" icon="coins" />
            </a>
        </div>
    @endif

</div>

<div class="row">
    @if (in_array('invoices', $modules) && in_array('invoice_overview', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-4">
            <x-cards.data
                :title="__('modules.dashboard.invoiceOverview').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.invoicesWidgetMessage').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart1" :labels="$invoiceOverviewChartData['labels']"
                    :values="$invoiceOverviewChartData['values']" :colors="$invoiceOverviewChartData['colors']"
                    height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('estimates', $modules) && in_array('estimate_overview', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-4">
            <x-cards.data
                :title="__('modules.dashboard.estimateOverview').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.estimatesWidgetMessage').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart2" :labels="$estimateOverviewChartData['labels']"
                    :values="$estimateOverviewChartData['values']" :colors="$estimateOverviewChartData['colors']"
                    height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('leads', $modules) && in_array('proposal_overview', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-4">
            <x-cards.data
                :title="__('modules.dashboard.proposalOverview').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.proposalsWidgetMessage').'\' data-trigger=\'hover\'></i>'">
                <x-pie-chart id="task-chart3" :labels="$proposalOverviewChartData['labels']"
                    :values="$proposalOverviewChartData['values']" :colors="$proposalOverviewChartData['colors']"
                    height="300" width="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('payments', $modules) && in_array('earnings_by_client', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-4">
            <x-cards.data
                :title="__('modules.dashboard.clientWiseEarnings').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.earningChartNote').'\' data-trigger=\'hover\'></i>'">
                <x-bar-chart id="task-chart4" :chartData="$clientEarningChart" height="300" />
            </x-cards.data>
        </div>
    @endif

    @if (in_array('payments', $modules) && in_array('projects', $modules) && in_array('earnings_by_projects', $activeWidgets))
        <div class="col-sm-12 col-lg-6 mt-4">
            <x-cards.data
                :title="__('modules.dashboard.earningsByProjects').' <i class=\'fa fa-question-circle\' data-toggle=\'popover\' data-placement=\'top\' data-content=\''.__('messages.earningChartNote').'\' data-trigger=\'hover\'></i>'">
                <x-bar-chart id="task-chart5" :chartData="$projectEarningChartData" height="300" />
            </x-cards.data>
        </div>
    @endif

</div>

<script>
    $('#save-dashboard-widget').click(function() {
        $.easyAjax({
            url: "{{ route('dashboard.widget', 'admin-finance-dashboard') }}",
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

    $('#totalPendingAmount').click(function() {
        var dateRange = $('#datatableRange2').data('daterangepicker');
        var startDate = dateRange.startDate.format('{{ global_setting()->moment_date_format }}');
        var endDate = dateRange.endDate.format('{{ global_setting()->moment_date_format }}');

        startDate = encodeURIComponent(startDate);
        endDate = encodeURIComponent(endDate);

        var url = "{{ route('invoices.index') }}";
        string = `?status=pending&start=${startDate}&end=${endDate}`;
        url += string;
        window.location.href = url;
    });

    $('#totalEarnings').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('income-expense-report.index') }}`;

        string = `?start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    $('#totalPaidInvoices').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('invoices.index') . '?status=paid' }}`;

        string = `&start=${dateRange.startDate}&end=${dateRange.endDate}`;
        url += string;

        window.location.href = url;
    });

    $('#totalPendingInvoices').click(function() {
        var dateRange = getDateRange();
        var url = `{{ route('invoices.index') . '?status=pending' }}`;

        string = `&start=${dateRange.startDate}&end=${dateRange.endDate}`;
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
