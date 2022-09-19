@extends('layouts.app')
@push('styles')
    <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    <style>
        .filter-box {
            z-index: 2;
        }
        .fc-h-event .fc-event-title-container {
            cursor: default;
        }

    </style>
@endpush

@section('filter-section')

    <x-filters.filter-box>

        <!-- CLIENT START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status d-flex align-items-center"">
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
                        <select class="form-control select-picker" name="project_id" id="project_id" data-live-search="true" data-container="body"
                            data-size="8">
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
                        <select class="form-control select-picker" name="status" id="status" data-live-search="true" data-container="body"
                            data-size="8">
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
                        <select class="form-control select-picker" name="invoice_generate" id="invoice_generate" data-container="body"
                            data-live-search="true" data-size="8">
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

            </div>

            <div class="btn-group" role="group">
                <a href="{{ route('timelogs.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.timeLogs')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('timelog-calendar.index') }}" class="btn btn-secondary f-14 btn-active"
                    data-toggle="tooltip" data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>

                <a href="{{ route('timelogs.by_employee') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.employee') @lang('app.menu.timeLogs')"><i class="side-icon bi bi-person"></i></a>

            </div>
        </div>

        <x-cards.data>
            <div id="calendar"></div>
        </x-cards.data>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
    <script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>

    <script>
        $('#project_id, #employee, #search-text-field, #status, #invoice_generate').on('change keyup',
            function() {
                if ($('#status').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#employee').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#project_id').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#invoice_generate').val() != "all") {
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

        $('#reset-filters-2').click(function() {
            $('#filter-form')[0].reset();

            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            loadData();
        });

        var initialLocaleCode = '{{ user()->locale }}';
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: initialLocaleCode,
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            // initialDate: '2020-09-12',
            navLinks: true, // can click day/week names to navigate views
            selectable: false,
            selectMirror: true,
            editable: false,
            dayMaxEvents: true, // allow "more" link when too many events
            // events: "{{ route('task-calendar.index') }}"
            events: {
                url: "{{ route('timelog-calendar.index') }}",
                extraParams: function() {
                    var projectID = $('#project_id').val();
                    var employee = $('#employee').val();
                    var approved = $('#status').val();
                    var invoice = $('#invoice_generate').val();
                    var searchText = $('#search-text-field').val();

                    return {
                        projectID: projectID,
                        employee: employee,
                        approved: approved,
                        invoice: invoice,
                        searchText: searchText
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

    </script>
@endpush
