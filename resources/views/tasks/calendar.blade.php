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
        <!-- STATUS START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.status')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="status" id="status">
                    <option value="not finished">@lang('modules.tasks.hideCompletedTask')</option>
                    <option value="all">@lang('app.all')</option>
                    @foreach ($taskBoardStatus as $status)
                        <option value="{{ $status->id }}">{{ $status->slug == 'completed' || $status->slug == 'incomplete' ? __('app.' . $status->slug) : mb_ucwords($status->column_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- STATUS END -->

        <!-- PROJECT START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.project')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="project_id" id="project_id" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($projects as $project)
                        <option value="{{ $project->id }}">{{ mb_ucwords($project->project_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>
        <!-- PROJECT END -->


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
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.client')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="clientID" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($clients as $client)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                                    value="{{ $client->id }}">{{ mb_ucwords($client->name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>
            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('modules.tasks.assignTo')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="assignedTo" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($employees as $employee)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                                    value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('modules.tasks.assignBy')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="assignedBY" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($employees as $employee)
                                <option
                                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $employee->image_url }}' ></div> {{ ucfirst($employee->name) }}"
                                    value="{{ $employee->id }}">{{ mb_ucwords($employee->name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.label')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="label" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($taskLabels as $label)
                                <option
                                    data-content="<span class='badge b-all' style='background:{{ $label->label_color }};'>{{ $label->label_name }}</span> "
                                    value="{{ $label->id }}">{{ $label->label_name }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize"
                    for="usr">@lang('modules.taskCategory.taskCategory')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="category_id" data-live-search="true" data-container="body" data-size="8">
                            <option value="all">@lang('app.all')</option>
                            @foreach ($taskCategories as $categ)
                                <option value="{{ $categ->id }}">{{ mb_ucwords($categ->category_name) }}</option>
                            @endforeach
                        </select>
                    </div>
                </div>
            </div>

            <div class="more-filter-items">
                <label class="f-14 text-dark-grey mb-12 text-capitalize" for="usr">@lang('app.billableTask')</label>
                <div class="select-filter mb-4">
                    <div class="select-others">
                        <select class="form-control select-picker" id="billable_task" data-live-search="true" data-container="body" data-size="8">
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
    $addTaskPermission = user()->permission('add_tasks');
@endphp

@section('content')
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex my-3">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addTaskPermission == 'all' || $addTaskPermission == 'added')
                    <x-forms.link-primary :link="route('tasks.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('app.add')
                        @lang('app.task')
                    </x-forms.link-primary>
                @endif
            </div>

            <div class="btn-group" role="group" >
                <a href="{{ route('tasks.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.tasks')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('taskboards.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.tasks.taskBoard')"><i class="side-icon bi bi-kanban"></i></a>

                <a href="{{ route('task-calendar.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>
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
        $('#billable_task, #status, #search-text-field, #clientID, #category_id, #assignedBY, #assignedTo, #label, #project_id')
            .on('change keyup',
                function() {
                    if ($('#status').val() != "not finished") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#project_id').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#clientID').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#category_id').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#assignedBY').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#assignedTo').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#label').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        loadData();
                    } else if ($('#billable_task').val() != "all") {
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

            $('.filter-box #status').val('not finished');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            loadData();
        });

        $('#reset-filters-2').click(function() {
            $('#filter-form')[0].reset();

            $('.filter-box #status').val('not finished');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').addClass('d-none');
            loadData();
        });

        var initialLocaleCode = '{{ user()->locale }}';
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: initialLocaleCode,
            initialView: 'listWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            // initialDate: '2020-09-12',
            navLinks: true, // can click day/week names to navigate views
            selectable: false,
            selectMirror: true,
            select: function(arg) {
                addEventModal(arg.start, arg.end, arg.allDay);
                calendar.unselect()
            },
            eventClick: function(arg) {
                getEventDetail(arg.event.id);
            },
            editable: false,
            dayMaxEvents: true, // allow "more" link when too many events
            // events: "{{ route('task-calendar.index') }}"
            events: {
                url: "{{ route('task-calendar.index') }}",
                extraParams: function() {
                    var projectID = $('#project_id').val();
                    var clientID = $('#clientID').val();
                    var assignedBY = $('#assignedBY').val();
                    var assignedTo = $('#assignedTo').val();
                    var categoryId = $('#category_id').val();
                    var labelId = $('#label').val();
                    var searchText = $('#search-text-field').val();
                    var status = $('#status').val();
                    var billable = $('#billable_task').val();

                    return {
                        projectID: projectID,
                        assignedBY: assignedBY,
                        assignedTo: assignedTo,
                        categoryId: categoryId,
                        labelId: labelId,
                        status: status,
                        billable: billable,
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


        // Task Detail show in sidebar
        var getEventDetail = function(id) {
            openTaskDetail();
            var url = "{{ route('tasks.show', ':id') }}";
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
