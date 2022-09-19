@extends('layouts.app')

@push('styles')
    <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    <style>
        .filter-box {
            z-index: 2;
        }

    </style>
@endpush

@section('filter-section')

    <x-filters.filter-box>

        <!-- EMPLOYEE FILTER START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="employee_id" id="employee_id" data-live-search="true"
                    data-size="8">
                    @if ($employees->count() > 1)
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($employees as $employee)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                            value="{{ $employee->id }}">{{ ucfirst($employee->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- EMPLOYEE FILTER END -->

        <!-- LEAVE TYPE FILTER START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.leaves.leaveType')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="leave_type" id="leave_type" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($leaveTypes as $leaveType)
                        <option value="{{ $leaveType->id }}">{{ mb_ucwords($leaveType->type_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- LEAVE TYPE FILTER END -->

        <!-- LEAVE STATUS FILTER END -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.status')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="status" id="status" data-live-search="true" data-size="8">
                    <option value="all">@lang('app.all')</option>
                    <option value="approved">@lang('app.approved')</option>
                    <option value="pending">@lang('app.pending')</option>
                    <option value="rejected">@lang('app.rejected')</option>
                </select>
            </div>
        </div>
        <!-- LEAVE STATUS FILTER END -->


        <!-- SEARCH BY LEAVE START -->
        <div class="leave-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
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
        <!-- SEARCH BY LEAVE END -->

        <!-- RESET START -->
        <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
            <x-forms.button-secondary class="btn-xs d-none" id="reset-filters" icon="times-circle">
                @lang('app.clearFilters')
            </x-forms.button-secondary>
        </div>
        <!-- RESET END -->

        <!-- MORE FILTERS END -->
    </x-filters.filter-box>

@endsection

@php
$addLeavePermission = user()->permission('add_leave');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addLeavePermission == 'all' || $addLeavePermission == 'added')
                    <x-forms.link-primary :link="route('leaves.create')"
                        data-redirect-url="{{ route('leaves.calendar') }}"
                        class="mr-3 openRightModal float-left" icon="plus">
                        @lang('modules.leaves.addLeave')
                    </x-forms.link-primary>
                @endif
            </div>

            <div class="btn-group" role="group" aria-label="Basic example">
                <a href="{{ route('leaves.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.leaves.tableView')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('leaves.calendar') }}" class="btn btn-secondary f-14 btn-active"
                    data-toggle="tooltip" data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>

                <a href="{{ route('leaves.personal') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.leaves.myLeaves')"><i class="side-icon bi bi-person"></i></a>
            </div>
        </div>

        <!-- leave table Box Start -->
        <div class="d-flex flex-column w-tables rounded mt-3 bg-white">
            <x-cards.data>
                <div id="calendar"></div>
            </x-cards.data>
        </div>
        <!-- leave table End -->

    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    <script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
    <script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>

    <script>
        $('#search-text-field, #employee_id, #leave_type, #status').on('change keyup',
            function() {
                if ($('#employee_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#leave_type_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#status').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#search-text-field').val() != "") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else {
                    $('#reset-filters').addClass('d-none');
                    loadData();
                }
            });

        $('#reset-filters').click(function() {
            $('#filter-form')[0].reset();

            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            loadData();
        });

        var initialLocaleCode = '{{ user()->locale }}';
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: initialLocaleCode,
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            navLinks: true, // can click day/week names to navigate views
            selectable: false,
            selectMirror: true,
            eventClick: function(arg) {
                getEventDetail(arg.event.id);
            },
            editable: false,
            dayMaxEvents: true, // allow "more" link when too many events
            events: {
                url: "{{ route('leaves.calendar') }}",
                extraParams: function() {
                    var employeeId = $('#employee_id').val();
                    var leaveTypeId = $('#leave_type').val();
                    var status = $('#status').val();
                    var searchText = $('#search-text-field').val();

                    return {
                        employeeId: employeeId,
                        leaveTypeId: leaveTypeId,
                        status: status,
                        searchText: searchText,
                    };
                }
            },
            eventTimeFormat: {
                hour: global_setting.time_format == 'H:i' ? '2-digit' : 'numeric',
                minute: '2-digit',
                meridiem: global_setting.time_format == 'H:i' ? false : true
            }
        });

        calendar.render();

        function loadData() {
            calendar.refetchEvents();
            calendar.destroy();
            calendar.render();
        }

        // show leave detail in right modal
        var getEventDetail = function(id) {
            openTaskDetail();
            var url = "{{ route('leaves.show', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                blockUI: true,
                container: RIGHT_MODAL,
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $(RIGHT_MODAL_CONTENT).html(response.html);
                        $(RIGHT_MODAL_TITLE).html(response.title);
                    }
                },
                error: function(request, status, error) {
                    if (request.status == 403) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">403 | Permission Denied</div>'
                        );
                    } else if (request.status == 404) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">404 | Not Found</div>'
                        );
                    } else if (request.status == 500) {
                        $(RIGHT_MODAL_CONTENT).html(
                            '<div class="align-content-between d-flex justify-content-center mt-105 f-21">500 | Something Went Wrong</div>'
                        );
                    }
                }
            });
        }
    </script>
@endpush
