<link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">

@php
    $manageEmployeeShiftPermission = user()->permission('manage_employee_shifts');
@endphp

@if ($manageEmployeeShiftPermission != 'all')
    <style>
        .fc-event{
            cursor: default;
        }
    </style>

@endif

<x-cards.data class="mt-4">
    <div id="calendar"></div>
</x-cards.data>

<script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
<script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>

<script>
    var initialLocaleCode = '{{ user()->locale }}';
    var calendarEl = document.getElementById('calendar');
    var global_settings = @json(global_setting());
    var manageShiftPermission = "{{ $manageEmployeeShiftPermission }}";

    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: initialLocaleCode,
        timeZone: '{{ global_setting()->timezone }}',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        navLinks: true, // can click day/week names to navigate views
        selectable: (manageShiftPermission == 'all'),
        selectMirror: true,
        select: function(arg) {
            getEventDetail("{{ $employee->id }}", arg.start.getDate(), arg.start.getMonth()+1, arg.start.getFullYear());
            calendar.unselect()
        },
        eventClick: function(arg) {
            
            getEventDetail(arg.event.extendedProps.userId, arg.event.extendedProps.day, arg.event
                .extendedProps.month, arg.event.extendedProps.year);
        },
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: {
            url: "{{ route('shifts.employee_shift_calendar') }}",
            extraParams: function() {
                var employeeId = "{{ $employee->id }}";

                return {
                    employeeId: employeeId
                };
            }
        },
        eventDidMount: function(info) {
            $(info.el).css('background-color', info.event.extendedProps.bg_color);
            $(info.el).css('color', info.event.extendedProps.color);
        },
        eventTimeFormat: {
            hour: global_settings.time_format == 'H:i' ? '2-digit' : 'numeric',
            minute: '2-digit',
            meridiem: global_settings.time_format == 'H:i' ? false : true
        }
    });

    calendar.render();

    function loadData() {
        calendar.refetchEvents();
        calendar.destroy();
        calendar
            .render();
    }

    // show event detail in sidebar
    var getEventDetail = function(userId, day, month, year) {
        if (manageShiftPermission != 'all') {
            return false;
        }

        var url = "{{ route('shifts.mark', [':userid', ':day', ':month', ':year']) }}";
        url = url.replace(':userid', userId);
        url = url.replace(':day', day);
        url = url.replace(':month', month);
        url = url.replace(':year', year);

        $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_DEFAULT, url);

    }
</script>
