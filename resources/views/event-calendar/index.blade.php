@extends('layouts.app')
@push('styles')
    <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
@endpush

@section('filter-section')

    <x-filters.filter-box>

        @if (!in_array('client', user_roles()))
            <!-- EMPLOYEE START -->
            <div class="select-box d-flex py-2 pr-2 border-right-grey border-right-grey-sm-0">
                <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
                <div class="select-status">
                    <select class="form-control select-picker" name="employee" id="employee" data-live-search="true"
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
        @endif

        <!-- CLIENT START -->
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.client')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="client" id="client" data-live-search="true" data-size="8">
                    @if (count($clients) <= 1)
                        <option value="all">@lang('app.all')</option>
                    @endif
                    @foreach ($clients as $client)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $client->image_url }}' ></div> {{ ucfirst($client->name) }}"
                            value="{{ $client->id }}">{{ $client->name }}</option>
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
    </x-filters.filter-box>

@endsection

@php
$addEventsPermission = user()->permission('add_events');
@endphp

@section('content')
    <div class="content-wrapper">
        <!-- Add Task Export Buttons Start -->
        <div class="d-flex my-3">
            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addEventsPermission == 'all' || $addEventsPermission == 'added')
                    <x-forms.link-primary :link="route('events.create')" class="mr-3 openRightModal float-left" icon="plus">
                        @lang('modules.events.addEvent')
                    </x-forms.link-primary>
                @endif
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
        $('#employee, #client, #search-text-field').on('change keyup',
            function() {
                if ($('#client').val() != "all") {
                    $('#reset-filters').removeClass('d-none');
                    loadData();
                } else if ($('#employee').val() != "all") {
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

        var initialLocaleCode = '{{ user()->locale }}';
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
            locale: initialLocaleCode,
            timeZone: '{{ global_setting()->timezone }}',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
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
            events: {
                url: "{{ route('events.index') }}",
                extraParams: function() {
                    var searchText = $('#search-text-field').val();
                    var clientId = $('#client').val();
                    var employeeId = $('#employee').val();

                    return {
                        searchText: searchText,
                        clientId: clientId,
                        employeeId: employeeId
                    };
                }
            },
            eventDidMount: function(info) {
                $(info.el).css('background-color', info.event.extendedProps.bg_color);
                $(info.el).css('color', info.event.extendedProps.color);
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

        // show event detail in sidebar
        var getEventDetail = function(id) {
            openTaskDetail();
            var url = "{{ route('events.show', ':id') }}";
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
