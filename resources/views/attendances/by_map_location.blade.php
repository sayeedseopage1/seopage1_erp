@extends('layouts.app')

@push('styles')
    <style>
        #attendance-data {
            height: 500px;
        }
    </style>
@endpush

@section('filter-section')

    <x-filters.filter-box>

        <div class="select-box d-flex py-2 pr-2 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
            <div class="select-status">
                <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                    id="attendance_date" placeholder="@lang('placeholders.date')"
                    value="{{ now(global_setting()->timezone)->format(global_setting()->date_format) }}">
            </div>
        </div>

        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.employee')</p>
            <div class="select-status d-flex align-self-center">
                <select class="form-control select-picker" name="user_id" id="user_id" data-live-search="true" data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($employees as $item)
                        <option @if (request('employee_id') == $item->id)
                            selected
                    @endif
                    data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle'
                            src='{{ $item->image_url }}'></div> {{ ucfirst($item->name) }}"
                    value="{{ $item->id }}">{{ ucfirst($item->name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.department')</p>
            <div class="select-status d-flex align-self-center">
                <select class="form-control select-picker" name="department" id="department" data-live-search="true"
                    data-size="8">
                    <option value="all">@lang('app.all')</option>
                    @foreach ($departments as $department)
                        <option value="{{ $department->id }}">{{ ucfirst($department->team_name) }}</option>
                    @endforeach
                </select>
            </div>
        </div>

        <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
            <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('modules.attendance.late')</p>
            <div class="select-status d-flex align-self-center">
                <select class="form-control select-picker" name="late" id="late">
                    <option value="all">@lang('app.all')</option>
                    <option @if (request('late') == 'yes')
                        selected
                        @endif value="yes">@lang('app.yes')</option>
                    <option value="no">@lang('app.no')</option>
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

@section('content')
    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper px-4">

        <div class="d-flex justify-content-end">

            <div class="btn-group" role="group">
                <a href="{{ route('attendances.index') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('app.summary')"><i class="side-icon bi bi-list-ul"></i></a>

                <a href="{{ route('attendances.by_member') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.attendance.attendanceByMember')"><i
                        class="side-icon bi bi-person"></i></a>

                <a href="{{ route('attendances.by_hour') }}" class="btn btn-secondary f-14" data-toggle="tooltip"
                    data-original-title="@lang('modules.attendance.attendanceByHour')"><i class="fa fa-clock"></i></a>

                @if (attendance_setting()->save_current_location)
                    <a href="{{ route('attendances.by_map_location') }}" class="btn btn-secondary f-14 btn-active"
                        data-toggle="tooltip" data-original-title="@lang('modules.attendance.attendanceByLocation')"><i
                            class="fa fa-map-marked-alt"></i></a>
                @endif

            </div>
        </div>

        <!-- Task Box Start -->
        <x-cards.data class="mt-3">

            <div class="row">
                <div class="col-sm-12 my-2"><h4><i
                    class="fa fa-map-marked-alt"></i> @lang('modules.attendance.attendanceByLocation')</h4></div>
                <div class="col-md-12" id="attendance-data"></div>
            </div>
        </x-cards.data>
        <!-- Task Box End -->
    </div>
    <!-- CONTENT WRAPPER END -->

@endsection

@push('scripts')

    <script src="https://maps.googleapis.com/maps/api/js?key={{ global_setting()->google_map_key }}&callback=showTable"
        async>
    </script>
    <script>
        $('#user_id, #department, #late').on('change', function() {
            if ($('#user_id').val() != "all") {
                $('#reset-filters').removeClass('d-none');
                showTable();
            } else if ($('#department').val() != "all") {
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

        function showTable(loading = true) {

            var attendance_date = $('#attendance_date').val();

            var userId = $('#user_id').val();
            var department = $('#department').val();
            var late = $('#late').val();

            //refresh counts
            var url = "{{ route('attendances.by_map_location') }}";

            var token = "{{ csrf_token() }}";

            $.easyAjax({
                data: {
                    '_token': token,
                    attendance_date: attendance_date,
                    department: department,
                    late: late,
                    userId: userId
                },
                url: url,
                blockUI: loading,
                container: '.content-wrapper',
                success: function(response) {
                    $('#attendance-data').html(response.data);
                }
            });

        }

        $('#attendance-data').on('click', '.view-attendance', function() {
            var attendanceID = $(this).data('attendance-id');
            var url = "{{ route('attendances.show', ':attendanceID') }}";
            url = url.replace(':attendanceID', attendanceID);

            $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_XL, url);
        });

        const dp1 = datepicker('#attendance_date', {
            position: 'bl',
            onSelect: (instance, date) => {
                showTable();
                dp2.setMin(date);
            },
            ...datepickerConfig
        });
    </script>

@endpush
