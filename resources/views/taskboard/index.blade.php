@extends('layouts.app')

@push('styles')
    <!-- Drag and Drop CSS -->
    <link rel='stylesheet' href="{{ asset('vendor/css/dragula.css') }}" type='text/css' />
    <link rel='stylesheet' href="{{ asset('vendor/css/drag.css') }}" type='text/css' />
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
    <style>
        #colorpicker .form-group {
            width: 87%;
        }

        .b-p-tasks {
            min-height: 100px;
        }

    </style>

@endpush

@php
$addTaskPermission = user()->permission('add_tasks');
$viewUnassignedTasksPermission = user()->permission('view_unassigned_tasks');
@endphp

@section('filter-section')

    <x-filters.filter-box>
        <!-- DATE START -->
        <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="input-group input-daterange">
                <input type="text"
                    class="position-relative text-dark date-range-field form-control border-0 p-0 text-left f-14 f-w-500"
                    id="start-date" placeholder="@lang('app.startDate')">
                <div class="input-group-addon datePickerInput d-flex align-items-center pr-3">@lang('app.to')</div>
                <input type="text" class="date-range-field1 text-dark form-control border-0 p-0 text-left f-14 f-w-500"
                    id="end-date" placeholder="@lang('app.endDate')">
            </div>
        </div>
        <!-- DATE END -->

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
                            @if ($viewUnassignedTasksPermission == 'all')
                                <option value="unassigned">@lang('modules.tasks.unassigned')</option>
                            @endif
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

    <!-- CONTENT WRAPPER START -->
    <div class="w-task-board-box px-4 py-2 bg-white">
        <!-- Add Task Export Buttons Start -->
        <div class="d-lg-flex d-md-flex d-block my-3">

            <x-alert type="warning" icon="info" class="d-lg-none">@lang('messages.dragDropScreenInfo')</x-alert>

            <div id="table-actions" class="flex-grow-1 align-items-center mb-2 mb-lg-0 mb-md-0">
                @if ($addTaskPermission == 'all' || $addTaskPermission == 'added')
                    <x-forms.link-primary :link="route('tasks.create')" class="mr-lg-3 mr-1 openRightModal float-left" icon="plus" data-redirect-url="{{ url()->full() }}">
                        @lang('app.add')
                        @lang('app.task')
                    </x-forms.link-primary>
                @endif

              {{--  @if (user()->permission('add_status') == 'all')
                    <x-forms.button-secondary icon="plus" class="mr-lg-3 mr-1 float-left" id="add-column">
                        @lang('modules.tasks.addBoardColumn')
                    </x-forms.button-secondary>
                @endif --}}


                <x-forms.button-secondary id="filter-my-task" icon="user">
                    @lang('modules.tasks.myTask')
                </x-forms.button-primary>

            </div>

            <div class="btn-group" role="group">
                <a href="{{ route('tasks.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.tasks')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('taskboards.index') }}" class="btn btn-secondary f-14 btn-active" data-toggle="tooltip"
                    data-original-title="@lang('modules.tasks.taskBoard')"><i class="side-icon bi bi-kanban"></i></a>

                <a href="{{ route('task-calendar.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.menu.calendar')"><i class="side-icon bi bi-calendar"></i></a>
            </div>
        </div>

        <div class="w-task-board-panel d-flex" id="taskboard-columns">

        </div>
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')
    <script src="{{ asset('vendor/jquery/dragula.js') }}"></script>

    <script>
        const dp1 = datepicker('.date-range-field', {
            position: 'bl',
            onSelect: (instance, date) => {
                $('#reset-filters').removeClass('d-none');
                dp2.setMin(date);
                loadData();
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('.date-range-field1', {
            position: 'bl',
            onSelect: (instance, date) => {
                $('#reset-filters').removeClass('d-none');
                dp1.setMax(date);
                loadData();
            },
            ...datepickerConfig
        });

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


        function loadData() {
            var startDate = $('#start-date').val();

            if (startDate == '') {
                startDate = null;
            }

            var endDate = $('#end-date').val();

            if (endDate == '') {
                endDate = null;
            }

            var projectID = $('#project_id').val();
            var clientID = $('#clientID').val();
            var assignedBY = $('#assignedBY').val();
            var assignedTo = $('#assignedTo').val();
            var categoryId = $('#category_id').val();
            var labelId = $('#label').val();
            var searchText = $('#search-text-field').val();
            var billable = $('#billable_task').val();

            var url = "{{ route('taskboards.index') }}?startDate=" + encodeURIComponent(startDate) + '&endDate=' +
                encodeURIComponent(endDate) + '&clientID=' + clientID + '&assignedBY=' + assignedBY + '&assignedTo=' +
                assignedTo + '&projectID=' + projectID + '&category_id=' + categoryId + '&label_id=' + labelId +
                '&searchText=' + searchText + '&billable=' + billable;

            $.easyAjax({
                url: url,
                container: '#taskboard-columns',
                type: "GET",
                success: function(response) {
                    $('#taskboard-columns').html(response.view);
                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });
        }

        $('body').on('click', '.load-more-tasks', function() {
            var columnId = $(this).data('column-id');
            var totalTasks = $(this).data('total-tasks');
            var currentTotalTasks = $('#drag-container-' + columnId + ' .task-card').length;

            var startDate = $('#start-date').val();

            if (startDate == '') {
                startDate = null;
            }

            var endDate = $('#end-date').val();

            if (endDate == '') {
                endDate = null;
            }

            var projectID = $('#project_id').val();
            var clientID = $('#clientID').val();
            var assignedBY = $('#assignedBY').val();
            var assignedTo = $('#assignedTo').val();
            var categoryId = $('#category_id').val();
            var labelId = $('#label').val();
            var searchText = $('#search-text-field').val();

            var url = "{{ route('taskboards.load_more') }}?startDate=" + encodeURIComponent(startDate) +
                '&endDate=' +
                encodeURIComponent(endDate) + '&clientID=' + clientID + '&assignedBY=' + assignedBY +
                '&assignedTo=' +
                assignedTo + '&projectID=' + projectID + '&category_id=' + categoryId + '&label_id=' + labelId +
                '&searchText=' + searchText + '&columnId=' + columnId + '&currentTotalTasks=' + currentTotalTasks +
                '&totalTasks=' + totalTasks;

            $.easyAjax({
                url: url,
                container: '#drag-container-' + columnId,
                blockUI: true,
                type: "GET",
                success: function(response) {
                    $('#drag-container-' + columnId).append(response.view);
                    if (response.load_more == 'show') {
                        $('#drag-container-' + columnId).closest('.b-p-body').find('.load-more-tasks');

                    } else {
                        $('#drag-container-' + columnId).closest('.b-p-body').find('.load-more-tasks')
                            .remove();
                    }

                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });
                }
            });

        });

        var elem = document.getElementById("fullscreen");

        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
                elem.classList.add("full");
            } else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }

        $('#add-column').click(function() {
            const url = "{{ route('taskboards.create') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.edit-column', function() {
            var id = $(this).data('column-id');
            var url = "{{ route('taskboards.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('click', '.delete-column', function() {
            var id = $(this).data('column-id');
            var url = "{{ route('taskboards.destroy', ':id') }}";
            url = url.replace(':id', id);

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
                    $.easyAjax({
                        url: url,
                        type: 'POST',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == 'success') {
                                window.location.reload();
                            }
                        }
                    });
                }
            });

        });


        $('#filter-my-task').click(function () {
            $('.filter-box #assignedTo').val('{{ user()->id }}');
            $('.filter-box .select-picker').selectpicker("refresh");
            $('#reset-filters').removeClass('d-none');
            loadData();
        });


        $('body').on('click', '.collapse-column', function() {
            var boardColumnId = $(this).data('column-id');
            var type = $(this).data('type');

            $.easyAjax({
                url: "{{ route('taskboards.collapse_column') }}",
                type: 'POST',
                container: '#taskboard-columns',
                blockUI: true,
                data: {
                    boardColumnId: boardColumnId,
                    type: type,
                    '_token': '{{ csrf_token() }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        loadData();
                    }
                }
            });
        });

        //pusher
        if ((pusher_setting.status === 1 && pusher_setting.taskboard === 1) || (pusher_setting.status == "1" && pusher_setting.taskboard == "1")) {

            var channel = pusher.subscribe('task-updated-channel');
                channel.bind('task-updated', function (data) {
                loadData()
            });
        }

        loadData();
    </script>
@endpush
