@extends('layouts.app')

@push('datatable-styles')
    @include('sections.daterange_css')
    <script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
@endpush

@section('filter-section')


    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status d-flex">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    id="datatableRange2" placeholder="@lang('placeholders.dateRange')">
            </div>
        </div>
        <!-- DATE END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

    </x-filters.filter-box>

@endsection

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="row mb-4">
            <div class="col-lg-4">
                <x-cards.widget :title="__('modules.dashboard.totalEarnings')" value="0" icon="coins"
                    widgetId="totalEarning" />
            </div>
            <div class="col-lg-4">
                <x-cards.widget :title="__('modules.dashboard.totalExpenses')" value="0" icon="coins"
                    widgetId="totalExpense" />
            </div>
        </div>


        <!-- Add Task Export Buttons Start -->
        <div class="d-flex flex-column">
            <!-- TASK STATUS START -->
            <x-cards.data id="task-chart-card" :title="__($pageTitle)" padding="false">
            </x-cards.data>
            <!-- TASK STATUS END -->

            <div id="table-actions" class="flex-grow-1 align-items-center mt-4">
            </div>

        </div>

        <!-- Add Task Export Buttons End -->

    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.daterange_js')


    <script type="text/javascript">
        $(function() {

            var start = moment().clone().startOf('month');
            var end = moment();

            function cb(start, end) {
                $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                    ' @lang("app.to") ' + end.format(
                        '{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange2').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig
            }, cb);


            $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                pieChart();
            });


            $('#reset-filters').click(function() {
                $('#filter-form')[0].reset();

                $('.filter-box .select-picker').selectpicker("refresh");
                $('#reset-filters').addClass('d-none');
                pieChart();
            });

            function pieChart() {

                const dateRangePicker = $('#datatableRange2').data('daterangepicker');
                let startDate = $('#datatableRange2').val();

                let endDate;

                if (startDate == '') {
                    startDate = null;
                    endDate = null;
                } else {
                    startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                    endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                }

                var url = "{{ route('income-expense-report.index') }}";

                $.easyAjax({
                    url: url,
                    container: '#task-chart-card',
                    blockUI: true,
                    data: {
                        startDate: startDate,
                        endDate: endDate
                    },
                    success: function(response) {
                        $('#task-chart-card').html(response.html);
                        $('#totalEarning').html(response.totalEarning);
                        $('#totalExpense').html(response.totalExpense);
                    }
                });
            }

            @if (request('start') && request('end'))
                $('#datatableRange2').data('daterangepicker').setStartDate("{{ request('start') }}");
                $('#datatableRange2').data('daterangepicker').setEndDate("{{ request('end') }}");
            @endif


            pieChart();
        });
    </script>
@endpush
