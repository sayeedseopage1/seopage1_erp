@extends('layouts.app')

@push('datatable-styles')
    <script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
    @include('sections.datatable_css')
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

        <!-- EXPENSE CATEGORY START -->
        <div class="select-box d-flex  py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.category')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="category" id="category_id" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}">{{ ucwords($category->category_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- EXPENSE CATEGORY END -->

        <!-- CLIENT START -->
        <div class="select-box d-flex  py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="employee" id="employee_id" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($employees as $employee)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                            value="{{ $employee->user_id }}">{{ ucfirst($employee->name) }}
                        </option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- CLIENT END -->

        <!-- PROJECT START -->
        <div class="select-box d-flex  py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.project')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="project_id" id="project_id" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($projects as $project)
                        <option value="{{ $project->id }}">{{ ucwords($project->project_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- PROJECT END -->

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
                <x-cards.widget :title="__('modules.dashboard.totalExpenses')" value="0" icon="coins"
                    widgetId="totalExpense" />
            </div>
        </div>

        <div class="row mb-4">
            <div class="col-lg-6">

                <div class="d-flex flex-column">
                    <!-- EXPENSE STATUS START -->
                    <x-cards.data id="e" :title="__($pageTitle)">
                    </x-cards.data>
                    <!-- EXPENSE STATUS END -->

                    <div id="table-actions" class="flex-grow-1 align-items-center mt-4">
                    </div>
                </div>
            </div>
             <div class="col-lg-6">
                <x-cards.data :title="__($categoryTitle)">
                    <div id="expense-chart-card"></div>
                </x-cards.data>
            </div>
        </div>

        <!-- Task Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-4 bg-white">
            {!! $dataTable->table(['class' => 'table table-hover border-0 w-100']) !!}
        </div>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    @include('sections.datatable_js')
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>

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
                showTable();
            });

            function barChart() {
                var startDate = $('#datatableRange2').val();

                if (startDate == '') {
                    startDate = null;
                    endDate = null;
                } else {
                    var dateRangePicker = $('#datatableRange2').data('daterangepicker');
                    startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                    endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                }

                var data = new Array();
                var projectID = $('#project_id').val();
                var employeeID = $('#employee_id').val();
                var categoryID = $('#category_id').val();
                var searchText = $('#search-text-field').val();

                var url = "{{ route('expense-report.chart') }}";

                $.easyAjax({
                    url: url,
                    container: '#e',
                    blockUI: true,
                    type: "POST",
                    data: {
                        startDate: startDate,
                        endDate: endDate,
                        categoryID: categoryID,
                        projectID: projectID,
                        employeeID: employeeID,
                        _token: '{{ csrf_token() }}'
                    },
                    success: function(response) {
                        $('#e .card-body').html(response.html);
                        $('#expense-chart-card').html(response.html2);
                        $('#totalExpense').html(response.totalExpenses);
                    }
                });
            }

            barChart();

            $('#expense-report-table').on('preXhr.dt', function(e, settings, data) {

                var dateRangePicker = $('#datatableRange2').data('daterangepicker');
                var startDate = $('#datatableRange2').val();

                if (startDate == '') {
                    startDate = null;
                    endDate = null;
                } else {
                    startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                    endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                }

                var projectID = $('#project_id').val();
                if (!projectID) {
                    projectID = 0;
                }
                var employeeID = $('#employee_id').val();
                var categoryID = $('#category_id').val();
                var searchText = $('#search-text-field').val();

                data['categoryID'] = categoryID;
                data['employeeID'] = employeeID;
                data['projectID'] = projectID;
                data['startDate'] = startDate;
                data['endDate'] = endDate;
                data['searchText'] = searchText;
            });

            const showTable = () => {
                window.LaravelDataTables["expense-report-table"].draw();
                barChart();
            }

            $('#search-text-field, #category_id, #employee_id, #project_id')
                .on('change keyup',
                    function() {
                        if ($('#project_id').val() != "all") {
                            $('#reset-filters').removeClass('d-none');
                            showTable();
                        } else if ($('#category_id').val() != "all") {
                            $('#reset-filters').removeClass('d-none');
                            showTable();
                        } else if ($('#project_id').val() != "all") {
                            $('#reset-filters').removeClass('d-none');
                            showTable();
                        } else if ($('#employee_id').val() != "all") {
                            $('#reset-filters').removeClass('d-none');
                            showTable();
                        } else if ($('#search-text-field').val() != "") {
                            $('#reset-filters').removeClass('d-none');
                            showTable();
                        } else {
                            $('#reset-filters').addClass('d-none');
                            showTable();
                        }
                    });

            $('#reset-filters').click(function() {
                $('#filter-form')[0].reset();

                $('.filter-box .select-picker').selectpicker("refresh");
                $('#reset-filters').addClass('d-none');
                showTable();
            });

            $('#reset-filters-2').click(function() {
                $('#filter-form')[0].reset();

                $('.filter-box .select-picker').selectpicker("refresh");
                $('#reset-filters').addClass('d-none');
                showTable();
            });

        });

    </script>
@endpush
