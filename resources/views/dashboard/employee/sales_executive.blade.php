@extends('layouts.app')
@push('datatable-styles')
    @include('sections.daterange_css')
@endpush
@push('styles')
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
        <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    @endif
    <style>
        .h-200 {
            max-height: 340px;
            overflow-y: auto;
        }

        .dashboard-settings {
            width: 600px;
        }

        @media (max-width: 768px) {
            .dashboard-settings {
                width: 300px;
            }
        }

        .fc-list-event-graphic{
            display: none;
        }

        .fc .fc-list-event:hover td{
            background-color: #fff !important;
            color:#000 !important;
        }
        .left-3{
            margin-right: -22px;
        }
        .clockin-right{
            margin-right: -10px;
        }

        .week-pagination li {
            margin-right: 5px;
            z-index: 1;
        }
        .week-pagination li a {
            border-radius: 50%;
            padding: 2px 6px !important;
            font-size: 11px !important;
        }

        .week-pagination li.page-item:first-child .page-link {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
        }

        .week-pagination li.page-item:last-child .page-link {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
        }
        .hide-calender .table-condensed thead tr:nth-child(2),
        .hide-calender .table-condensed tbody {
/*            display: none*/
        }
        .hide-calender.daterangepicker {
            width: 320px;
        }
        .hide-calender.monthselect {
            width: 100% !important;
        }
        .line-height-30 {
            line-height: 30px;
        }
    </style>
@endpush
@section('content')
<div class="px-4 py-2 border-top-0">
    <!-- WELOCOME START -->
    @if (!is_null($checkTodayLeave))
        <div class="row pt-4">
            <div class="col-md-12">
                <x-alert type="info" icon="info-circle">
                    <a href="{{ route('leaves.show', $checkTodayLeave->id) }}" class="openRightModal text-dark-grey">
                        <u>@lang('messages.youAreOnLeave')</u>
                    </a>
                </x-alert>
            </div>
        </div>
    @elseif (!is_null($checkTodayHoliday))
        <div class="row pt-4">
            <div class="col-md-12">
                <x-alert type="info" icon="info-circle">
                    <a href="{{ route('holidays.show', $checkTodayHoliday->id) }}" class="openRightModal text-dark-grey">
                        <u>@lang('messages.holidayToday')</u>
                    </a>
                </x-alert>
            </div>
        </div>
    @endif
    <div class="emp-dash-detail">
        @if(count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
            @if(Auth::user()->role_id == 7)
                <div class="row">
                    @if (in_array('profile', $activeWidgets))
                    <!-- EMP DASHBOARD INFO START -->
                    <div class="col-md-12">
                        <div class="card border-0 b-shadow-4 mb-3 e-d-info">
                            <div class="card-horizontal align-items-center">
                                <div class="card-img">
                                    <img class="" src=" {{ $user->image_url }}" alt="Card image">
                                </div>
                                <div class="card-body border-0 pl-0">
                                    <h4 class="card-title f-18 f-w-500 mb-0">{{ mb_ucwords($user->name) }}</h4>
                                    <p class="f-14 font-weight-normal text-dark-grey mb-2">{{ $user->employeeDetails->designation->name ?? '--' }}</p>
                                    <p class="card-text f-12 text-lightest"> @lang('app.employeeId') : {{ mb_strtoupper($user->employeeDetails->employee_id) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- EMP DASHBOARD INFO END -->
                    @endif
                </div>
            @endif
        @endif
    </div>
	<div class="row d-flex justify-content-between mb-3">
		<div class="col-md-6">
			<h4 class="bg-white rounded b-shadow-4 mb-4 mb-md-0 mb-lg-0 d-inline-block" style="padding: 7px;">Core Metrics For Bidders :-</h4>
		</div>
		<div class="col-md-6">
			<div class="d-flex border-right-grey border-right-grey-sm-0 mb-3 ml-auto justify-content-end">
				<p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
				<div class="select-status d-flex">
					<input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
						id="datatableRange2" placeholder="@lang('placeholders.dateRange')">
				</div>
			</div>
		</div>
	</div>
    <div id="generalHtml">
	<div class="row">
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#num_of_lead">
								00
							</a>
						</p>
                        @include('dashboard.ajax.salesexecutive.modals.num_of_lead_modal')
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads that got converted to deals</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#no_of_lead_that_got_converted_to_deals">
								00
							</a>
						</p>
                        @include('dashboard.ajax.salesexecutive.modals.no_of_lead_that_got_converted_to_deals_modal')
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of leads that got converted to won deals</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average bidding amount (For leads)</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average bidding delay time</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Bidding frequency</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Country wise bidding breakdown</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
	</div>
	<div class="row d-flex justify-content-between mb-3">
		<div class="col-md-6">
			<h4 class="bg-white rounded b-shadow-4 mb-4 mb-md-0 mb-lg-0 d-inline-block" style="padding: 7px;">Core Metrics For Closers :-</h4>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of won deals</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Value of won deals</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Country wise won deals</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average deal amount</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Project completion/Won deal ratio</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled project count/won deal ration</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
		<div class="col-md-4 mb-3">
			<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
				<div class="d-block text-capitalize">
					<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rejected project count/won deal ratio</h5>
					<div class="d-flex flex-wrap">
						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
							<a href="#" data-toggle="modal" data-target="#">
								00
							</a>
						</p>
					</div>
				</div>
				<div class="d-block">
					<i class="fa fa-list text-lightest f-27"></i>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
@endsection
@push('scripts')
@if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
    <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
    <script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
    <script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>
    <script>

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
            initialView: 'listWeek',
            selectMirror: true,
            select: function(arg) {
                addEventModal(arg.start, arg.end, arg.allDay);
                calendar.unselect()
            },
            eventClick: function(arg) {
                getEventDetail(arg.event.id,arg.event.extendedProps.event_type);
            },
            editable: false,
            dayMaxEvents: true, // allow "more" link when too many events
            events: {
                url: "{{ route('dashboard.private_calendar') }}",
            },
            eventDidMount: function(info) {
                    $(info.el).css('background-color', info.event.extendedProps.bg_color);
                    $(info.el).css('color', info.event.extendedProps.color);
                    $(info.el).find('td.fc-list-event-title').prepend('<i class="fa '+info.event.extendedProps.icon+'"></i>&nbsp;&nbsp;');
                    // tooltip for leaves
                    if(info.event.extendedProps.event_type == 'leave'){
                        $(info.el).find('td.fc-list-event-title > a').css('cursor','default'); // list view cursor for leave
                        $(info.el).css('cursor','default')
                        $(info.el).tooltip({
                            title: info.event.extendedProps.name,
                            container: 'body',
                            delay: { "show": 50, "hide": 50 }
                        });
                }
            },
            eventTimeFormat: { // like '14:30:00'
                hour: global_setting.time_format == 'H:i' ? '2-digit' : 'numeric',
                minute: '2-digit',
                meridiem: global_setting.time_format == 'H:i' ? false : true
            }
        });

        calendar.render();

        // Task Detail show in sidebar
        var getEventDetail = function(id,type) {
            if(type == 'ticket')
            {
                var url = "{{ route('tickets.show', ':id') }}";
                    url = url.replace(':id', id);
                    window.location = url;
                    return true;
            }

            if(type == 'leave')
            {
                return true;
            }

            openTaskDetail();

            switch (type) {
                case 'task':
                    var url = "{{ route('tasks.show', ':id') }}";
                    break;
                case 'event':
                    var url = "{{ route('events.show', ':id') }}";
                    break;
                case 'holiday':
                    var url = "{{ route('holidays.show', ':id') }}";
                    break;
                case 'leave':
                    var url = "{{ route('leaves.show', ':id') }}";
                    break;
                default:
                    return 0;
                    break;
            }

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

        };

        // calendar filter
        var hideDropdown = false;

        $('#event-btn').click(function(){
            if(hideDropdown == true)
            {
                $('#cal-drop').hide();
                hideDropdown = false;
            }
            else
            {
                $('#cal-drop').toggle();
                hideDropdown = true;
            }
        });


        $(document).mouseup(e => {

            const $menu = $('.calendar-action');

            if (!$menu.is(e.target) && $menu.has(e.target).length === 0)
            {
                hideDropdown = false;
                $('#cal-drop').hide();
            }
        });


        $('.cal-filter').on('click', function() {

            var filter = [];

            $('.filter-check:checked').each(function() {
                filter.push($(this).val());
            });

            if(filter.length < 1){
                filter.push('None');
            }

            calendar.removeAllEventSources();
            calendar.addEventSource({
                url: "{{ route('dashboard.private_calendar') }}",
                extraParams: {
                    filter: filter
                }
            });

            filter = null;
        });
    </script>
    <script>
        $(document).ready(function() {
            var todayDate = moment();
            var monthDate = moment();
            
            $('.todayDate').text(todayDate.format('dddd LL'));

            var todayOnlyDate = moment(todayDate).format('DD');
            if (todayOnlyDate > 21) {
                $('.monthDate').text('21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
            } else {
                $('.monthDate').text('21st ' + moment(monthDate).subtract(1, 'month').format('MMMM, YYYY')+' to 20th '+moment(monthDate).startOf('month').add(20, 'day').format('MMMM, YYYY'));
            }

            $('.fc-prev-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    if(todayOnlyDate > 21) {
                        monthDate = moment(monthDate).subtract(1, 'month');
                    } else {
                        monthDate = moment(monthDate).subtract(2, 'month');
                    }
                    $(this).next().text('21st ' + moment(monthDate).format('MMMM, YYYY')+ ' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                    date = monthDate
                } else {
                    todayDate = moment(todayDate).subtract(1, 'days');
                    $(this).next().text(todayDate.format('dddd LL'));
                    date = todayDate
                }

                getData(mode, $(this), date);
            });

            $('.fc-next-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    monthDate = moment(monthDate).add(1, 'month');
                    $(this).prev().text('21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                    date = monthDate
                } else {
                    todayDate = moment(todayDate).add(1, 'days');
                    $(this).prev().prev().text(todayDate.format('dddd LL'));
                    date = todayDate
                }
                
                getData(mode, $(this), date);
            });

            $('.fc-today-button').click(function() {
                todayDate = moment();
            })
        });

        function getData(mode, disableButton, date) {
            $.easyAjax({
                url: this.href,
                type: "GET",
                disableButton: true,
                buttonSelector: disableButton,
                data: {
                    mode: mode,
                    startDate: date.format('YYYY-MM-DD'),
                },
                success: function(resp) {
                    $('#'+mode+'Html').html(resp.html);
                }
            })
        }

        @php
            $startDate = \Carbon\Carbon::now()->startOfMonth();
            $endDate = \Carbon\Carbon::now();
        @endphp
        $(function() {
            var format = '{{ global_setting()->moment_format }}';
            var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
            var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
            var picker = $('#datatableRange2');
            var start = moment(startDate, format);
            var end = moment(endDate, format);

            function cb(start, end) {
                $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                    ' @lang("app.to") ' + end.format( '{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange2').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig,
                opens: 'left',
                parentEl: '.dashboard-header'
            }, cb);

            $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                showTable();
            });

            function showTable() {
                var dateRangePicker = $('#datatableRange2').data('daterangepicker');
                var startDate = $('#datatableRange').val();
                var user_id = {{Auth::user()->id}};
                if (startDate == '') {
                    startDate = null;
                    endDate = null;
                } else {
                    startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                    endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                }

                const requestUrl = this.href;


                $.easyAjax({
                    url: requestUrl,
                    blockUI: true,
                    data: {
                        startDate: startDate,
                        endDate: endDate,
                        user_id: user_id,
                    },
                    blockUI: true,
                    success: function(resp) {
                        if (resp.status == "success") {
                            $('#generalHtml').html(resp.html)
                        }
                    }
                });
            }
        });
    </script>
@endif
@endpush

