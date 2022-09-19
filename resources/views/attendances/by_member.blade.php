@extends('layouts.app')

@push('styles')
    <style>
        .attendance-total {
            width: 10%;
        }

    </style>
@endpush

@section('filter-section')

    <x-filters.filter-box>
        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="user_id" id="user_id" data-live-search="true" data-size="8">
                    @foreach ($employees as $item)
                        <option
                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}"
                            value="{{ $item->id }}">{{ ucfirst($item->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="select-box d-flex py-2 px-lg-3 px-md-3 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.month')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="month" id="month" data-live-search="true" data-size="8">
                    <option @if ($month == '01') selected @endif value="01">
                        @lang('app.january')</option>
                    <option @if ($month == '02') selected @endif value="02">
                        @lang('app.february')</option>
                    <option @if ($month == '03') selected @endif value="03">
                        @lang('app.march')</option>
                    <option @if ($month == '04') selected @endif value="04">
                        @lang('app.april')</option>
                    <option @if ($month == '05') selected @endif value="05">
                        @lang('app.may')</option>
                    <option @if ($month == '06') selected @endif value="06">
                        @lang('app.june')</option>
                    <option @if ($month == '07') selected @endif value="07">
                        @lang('app.july')</option>
                    <option @if ($month == '08') selected @endif value="08">
                        @lang('app.august')</option>
                    <option @if ($month == '09') selected @endif value="09">
                        @lang('app.september')</option>
                    <option @if ($month == '10') selected @endif value="10">
                        @lang('app.october')</option>
                    <option @if ($month == '11') selected @endif value="11">
                        @lang('app.november')</option>
                    <option @if ($month == '12') selected @endif value="12">
                        @lang('app.december')</option>
                </select>
            </div>
        </div>

        <div class="select-box d-flex py-2 px-lg-3 px-md-3 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.year')</p>
            <div class="select-status">
                <select class="form-control select-picker" name="year" id="year" data-live-search="true" data-size="8">
                    @for ($i = $year; $i >= $year - 4; $i--)
                        <option @if ($i == $year) selected @endif value="{{ $i }}">{{ $i }}</option>
                    @endfor
                </select>
            </div>
        </div>


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
$addAttendancePermission = user()->permission('add_attendance');
@endphp

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper px-4">

        <div class="d-flex">

            <div id="table-actions" class="flex-grow-1 align-items-center">
                @if ($addAttendancePermission == 'all' || $addAttendancePermission == 'added')
                    <x-forms.link-primary :link="route('attendances.create')"
                        data-redirect-url="{{ route('attendances.by_member') }}" class="mr-3 openRightModal float-left"
                        icon="plus">
                        @lang('modules.attendance.markAttendance')
                    </x-forms.link-primary>

                @endif
                    <x-forms.button-secondary id="export-bymember" class="mr-3 mb-2 mb-lg-0" icon="file-export">
                        @lang('app.exportExcel')
                    </x-forms.button-secondary>

                @if ($addAttendancePermission == 'all' || $addAttendancePermission == 'added')
                    <x-forms.link-secondary :link="route('attendances.import')" class="mr-3 openRightModal float-left"
                        icon="file-upload">
                        @lang('app.importExcel')
                    </x-forms.link-secondary>
                @endif
            </div>

            <div class="btn-group" role="group">
                <a href="{{ route('attendances.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.summary')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('attendances.by_member') }}" class="btn btn-secondary f-14 btn-active"
                    data-toggle="tooltip" data-original-title="@lang('modules.attendance.attendanceByMember')"><i
                        class="side-icon bi bi-person"></i></a>

                <a href="{{ route('attendances.by_hour') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.attendance.attendanceByHour')"><i class="fa fa-clock"></i></a>

                @if (attendance_setting()->save_current_location)
                    <a href="{{ route('attendances.by_map_location') }}" class="btn btn-secondary f-14"
                        data-toggle="tooltip" data-original-title="@lang('modules.attendance.attendanceByLocation')"><i
                            class="fa fa-map-marked-alt"></i></a>
                @endif

            </div>
        </div>


        <div class="row my-3">

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12 mb-4 mb-lg-0 mb-md-0">
                <x-cards.widget :title="__('modules.attendance.totalWorkingDays')" value="0" icon="calendar"
                    widgetId="totalWorkingDays" />
            </div>

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.attendance.daysPresent')" value="0" icon="calendar"
                    widgetId="daysPresent" />
            </div>

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.attendance.late')" value="0" icon="calendar" widgetId="daysLate" />
            </div>

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.attendance.halfDay')" value="0" icon="calendar" widgetId="halfDays" />
            </div>

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.attendance.absent')" value="0" icon="calendar" widgetId="absentDays" />
            </div>

            <div class="col-lg-4 col-xl-2 col-md-6 col-sm-12">
                <x-cards.widget :title="__('modules.attendance.holidays')" value="0" icon="calendar"
                    widgetId="holidayDays" />
            </div>
        </div>

        <!-- Task Box Start -->
        <x-cards.data class="mt-2">
            <div class="row">
                <div class="col-md-12">

                    <table class="table table-bordered table-responsive-sm table-hover">
                        <thead class="thead-light">
                            <tr>
                                <th>@lang('app.date')</th>
                                <th>@lang('app.status')</th>
                                <th>@lang('modules.attendance.clock_in')</th>
                                <th>@lang('modules.attendance.clock_out')</th>
                                <th>@lang('app.total')</th>
                                <th class="text-right pr-20">@lang('app.others')</th>
                            </tr>
                        </thead>
                        <tbody id="attendance-data">
                        </tbody>
                    </table>

                </div>
            </div>
        </x-cards.data>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')

    <script>
        $('#user_id, #department, #month, #year, #late')
            .on('change',
                function() {
                    if ($('#user_id').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        showTable();
                    } else if ($('#department').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        showTable();
                    } else if ($('#month').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        showTable();
                    } else if ($('#year').val() != "all") {
                        $('#reset-filters').removeClass('d-none');
                        showTable();
                    } else if ($('#late').val() != "all") {
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

        function showTable() {
            var year = $('#year').val();
            var month = $('#month').val();
            var userId = $('#user_id').val();
            var department = $('#department').val();
            var late = $('#late').val();

            // Refresh counts
            var url = "{{ route('attendances.employee_data') }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                type: 'POST',
                data: {
                    '_token': token,
                    year: year,
                    month: month,
                    department: department,
                    late: late,
                    userId: userId
                },
                url: url,
                blockUI: true,
                container: '.content-wrapper',
                success: function(response) {
                    $('#attendance-data').html(response.data);
                    $('#daysPresent').html(response.daysPresent);
                    $('#daysLate').html(response.daysLate);
                    $('#halfDays').html(response.halfDays);
                    $('#totalWorkingDays').html(response.totalWorkingDays);
                    $('#absentDays').html(response.absentDays);
                    $('#holidayDays').html(response.holidays);
                }
            });
        }

        $('#export-bymember').click(function() {
            var year = $('#year').val();
            var month = $('#month').val();

            var userId = $('#user_id').val();

            var url = "{{ route('attendances.export_attendance', [':year', ':month', ':userId']) }}";
            url = url.replace(':year', year).replace(':month', month).replace(':userId', userId);
            window.location.href=url;
        });

        $('#attendance-data').on('click', '.view-attendance', function() {
            var attendanceID = $(this).data('attendance-id');
            var url = "{{ route('attendances.show', ':attendanceID') }}";
            url = url.replace(':attendanceID', attendanceID);

            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });

        $('#attendance-data').on('click', '.edit-attendance', function(event) {
            var attendanceDate = $(this).data('attendance-date');
            var userData = $(this).closest('tr').children('td:first');
            var userID = $(this).data('user-id');
            var year = $('#year').val();
            var month = $('#month').val();

            var url = "{{ route('attendances.mark', [':userid', ':day', ':month', ':year']) }}";
            url = url.replace(':userid', userID);
            url = url.replace(':day', attendanceDate);
            url = url.replace(':month', month);
            url = url.replace(':year', year);

            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });

        function editAttendance(id) {
            var url = "{{ route('attendances.edit', [':id']) }}";
            url = url.replace(':id', id);

            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        }

        showTable();
    </script>

@endpush
