@extends('layouts.app')

@section('filter-section')

    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="input-group input-daterange">
                <input type="text"
                    class="position-relative text-dark date-range-field form-control border-0 p-0 text-left f-14 f-w-500"
                    id="start-date" placeholder="@lang('app.startDate')"
                    value="{{ $startDate->format(global_setting()->date_format) }}">
                <div class="input-group-addon datePickerInput d-flex align-items-center pr-3">@lang('app.to')</div>
                <input type="text" class="date-range-field1 text-dark form-control border-0 p-0 text-left f-14 f-w-500"
                    id="end-date" placeholder="@lang('app.endDate')" value="{{ $endDate->format(global_setting()->date_format) }}">
            </div>
        </div>
        <!-- DATE END -->

        <!-- CLIENT START -->
        <div class="select-box d-flex  py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="employee" id="employee" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($employees as $employee)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                            value="{{ $employee->id }}">{{ ucfirst($employee->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <!-- CLIENT END -->

        <!-- SEARCH BY TASK START -->
        <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
            <form class="w-100 mr-1 mr-lg-0 mr-md-1 ml-md-1 ml-0 ml-lg-0">
                <div class="input-group bg-grey rounded">
                    <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                    </div>
                    <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search-text-field"
                        placeholder="@lang('app.startTyping')">
                </div>
            </form>
        </div>
        <!-- SEARCH BY TASK END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

        <!-- MORE FILTERS START -->
        <x-filters.more-filter-box>
            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.project')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="project_id" id="project_id" data-live-search="true"
                            data-size="8" data-container="body">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($projects as $project)
                                <option value="{{ $project->id }}">{{ mb_ucwords($project->project_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.status')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="status" id="status" data-live-search="true"
                            data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            <option value="1">@lang('app.approved')</option>
                            <option value="0">@lang('app.pending')</option>
                            <option value="2">@lang('app.active')</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.invoiceGenerate')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" name="invoice_generate" id="invoice_generate"
                            data-container="body" data-live-search="true" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            <option value="1">@lang('app.yes')</option>
                            <option value="0">@lang('app.no')</option>
                        </select>
                    </div>
                </div>
            </div>


        </x-filters.more-filter-box>
        <!-- MORE FILTERS END -->
    </x-filters.filter-box>

@endsection

@php
$addTimelogPermission = user()->permission('add_timelogs');
@endphp


@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex my-3">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addTimelogPermission == 'all' || $addTimelogPermission == 'added')
                    <x-forms.link-primary :link="route('timelogs.create')" class="mr-3 openRightModal float-left"
                        icon="plus">
                        @lang('modules.timeLogs.logTime')
                    </x-forms.link-primary>
                @endif

                <x-forms.button-secondary class="mr-3 export-excel float-left" icon="file-export">
                    @lang('app.exportExcel')
                </x-forms.button-secondary>

            </div>

            <div class="btn-group" role="group">
                <a href="{{ route('timelogs.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.timeLogs')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('timelog-calendar.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>

                <a href="{{ route('timelogs.by_employee') }}" class="btn btn-secondary f-14 btn-active"
                    data-toggle="tooltip" data-original-title="@lang('app.employee') @lang('app.menu.timeLogs')"><i
                        class="side-icon bi bi-person"></i></i></a>

            </div>
        </div>
        <!-- Add Task Export Buttons End -->

        <div class="row mt-5" id="member-list">

        </div>

    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')

    <script>
        const dp1 = datepicker('.date-range-field', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $startDate) }}"),
            onSelect: (instance, date) => {
                $('#reset-filters').removeClass('d-none');
                dp2.setMin(date);
                showTable();
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('.date-range-field1', {
            position: 'bl',
            dateSelected: new Date("{{ str_replace('-', '/', $endDate) }}"),
            onSelect: (instance, date) => {
                $('#reset-filters').removeClass('d-none');
                dp1.setMax(date);
                showTable();
            },
            ...datepickerConfig
        });

        function showTable() {
            var startDate = $('#start-date').val();

            if (startDate == '') {
                startDate = null;
            }

            var endDate = $('#end-date').val();

            if (endDate == '') {
                endDate = null;
            }

            var projectID = $('#project_id').val();
            var employee = $('#employee').val();

            var token = "{{ csrf_token() }}";
            var url = "{{ route('timelogs.employee_data') }}";

            $.easyAjax({
                type: 'POST',
                url: url,
                data: {
                    '_token': token,
                    startDate: startDate,
                    endDate: endDate,
                    projectID: projectID,
                    employee: employee
                },
                success: function(response) {
                    $('#member-list').html(response.html);
                }
            });
        }

        $('#project_id, #employee, #search-text-field, #status, #invoice_generate').on('change keyup',
            function() {
                if ($('#status').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#employee').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#project_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    showTable();
                } else if ($('#invoice_generate').val() != "all") {
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


        $('body').on('click', '.show-user-timelogs', function() {
            $('.show-user-timelogs').removeClass('hide');
            $('.hide-user-timelogs').addClass('hide');

            var employee = $(this).data('user-id');
            var startDate = $('#start-date').val();

            if (startDate == '') {
                startDate = null;
            }

            var endDate = $('#end-date').val();

            if (endDate == '') {
                endDate = null;
            }

            var projectID = $('#project_id').val();

            var token = "{{ csrf_token() }}";
            var url = "{{ route('timelogs.user_time_logs') }}";

            $.easyAjax({
                type: 'POST',
                url: url,
                blockUI: true,
                container: '.timelog-user-' + employee + ' .card-body',
                data: {
                    '_token': token,
                    startDate: startDate,
                    endDate: endDate,
                    projectID: projectID,
                    employee: employee,
                },
                success: function(response) {
                    $('.user-timelogs').remove();
                    $('.timelog-user-' + employee + ' .card-body').append(response.html);
                    $('.timelog-user-' + employee).find('.hide-user-timelogs').removeClass('d-none');
                    $('.timelog-user-' + employee).find('.show-user-timelogs').addClass('d-none');
                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });

        });

        $('body').on('click', '.hide-user-timelogs', function() {
            var employee = $(this).data('user-id');
            $('.user-timelogs').remove();
            $('.timelog-user-' + employee).find('.show-user-timelogs').removeClass('d-none');
            $(this).addClass('d-none');

        });

        $('body').on('click', '.delete-table-row', function() {
            var id = $(this).data('time-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
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
                    var url = "{{ route('timelogs.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        blockUI: true,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                showTable();
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.approve-timelog', function() {
            var id = $(this).data('time-id');
            var url = "{{ route('timelogs.approve_timelog', ':id') }}";
            url = url.replace(':id', id);
            var token = '{{ csrf_token() }}';
            $.easyAjax({
                url: url,
                type: "POST",
                data: {
                    id: id,
                    _token: token
                },
                success: function(data) {
                    showTable();
                }
            })

        });

        $('.export-excel').click(function() {
            var startDate = $('#start-date').val();

            if (startDate == '') {
                startDate = null;
            }

            var endDate = $('#end-date').val();

            if (endDate == '') {
                endDate = null;
            }

            var projectID = $('#project_id').val();
            var employee = $('#employee').val();

            var token = "{{ csrf_token() }}";
            var url = "{{ route('timelogs.export') }}";

            window.location = url + '?startDate=' + encodeURIComponent(startDate) + '&endDate=' + encodeURIComponent(endDate) + '&projectID=' + projectID + '&employee=' + employee;
        });

        showTable();
    </script>
@endpush
