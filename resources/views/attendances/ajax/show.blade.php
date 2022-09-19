@php
$editAttendancePermission = user()->permission('edit_attendance');
$deleteAttendancePermission = user()->permission('delete_attendance');
@endphp

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.menu.attendance') @lang('app.details')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body bg-grey">
    <div class="row">
        <div class="col-md-12 mb-4">
            <x-cards.user :image="$attendance->user->image_url">
                <div class="row">
                    <div class="col-12">
                        <h4 class="card-title f-15 f-w-500 text-darkest-grey mb-0">
                            <a href="{{ route('employees.show', [$attendance->user->id]) }}"
                                class="text-darkest-grey">{{ ucfirst($attendance->user->name) }}</a>

                            @isset($attendance->user->country)
                                <x-flag :iso="$attendance->user->country->iso" />
                            @endisset
                        </h4>
                        <p class="mb-0 f-13 text-dark-grey">
                            {{ (!is_null($attendance->user->employeeDetail) && !is_null($attendance->user->employeeDetail->designation)) ? mb_ucwords($attendance->user->employeeDetail->designation->name) : ' ' }}
                        </p>
                    </div>
                </div>
            </x-cards.user>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <x-cards.data :title="__('app.date').' - '.$attendanceDate->format(global_setting()->date_format)">
                <div class="punch-status">
                    <div class="border rounded p-3 mb-3 bg-light">
                        <h6 class="f-13">@lang('modules.attendance.clock_in')</h6>
                        <p class="mb-0">{{ $startTime->format(global_setting()->time_format) }}</p>
                    </div>
                    <div class="punch-info">
                        <div class="punch-hours f-13">
                            <span>{{ $totalTime }}</span>
                        </div>
                    </div>
                    <div class="border rounded p-3 bg-light">
                        <h6 class="f-13">@lang('modules.attendance.clock_out')</h6>
                        <p class="mb-0">{{ $endTime != '' ? $endTime->format(global_setting()->time_format) : '' }}
                            @if (isset($notClockedOut))
                                (@lang('modules.attendance.notClockOut'))
                            @endif
                        </p>
                    </div>

                </div>
            </x-cards.data>
        </div>
        <div class="col-md-6">
            <x-cards.data :title="__('modules.employees.activity')">
                <div class="recent-activity">

                    @foreach ($attendanceActivity->reverse() as $item)

                        <div class="row res-activity-box" id="timelogBox{{ $item->aId }}">
                            <ul class="res-activity-list col-md-9">
                                <li>
                                    <p class="mb-0">@lang('modules.attendance.clock_in')
                                        @if (!is_null($item->employee_shift_id))
                                            <span class="badge badge-info ml-2" style="background-color: {{ $item->shift->color }}">{{ $item->shift->shift_name }}</span>
                                        @endif</p>
                                    <p class="res-activity-time">
                                        <i class="fa fa-clock"></i>
                                        {{ $item->clock_in_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}

                                        @if ($item->work_from_type != '')
                                            @if ($item->work_from_type == 'other')
                                                <i class="fa fa-map-marker-alt ml-2"></i>
                                                {{ $item->location }} ({{$item->working_from}})
                                            @else
                                                <i class="fa fa-map-marker-alt ml-2"></i>
                                                {{ $item->location }} ({{$item->work_from_type}})
                                            @endif
                                        @endif

                                        @if ($item->late == 'yes')
                                            <i class="fa fa-exclamation-triangle ml-2"></i>
                                            @lang('modules.attendance.late')
                                        @endif

                                        @if ($item->half_day == 'yes')
                                            <i class="fa fa-sign-out-alt ml-2"></i>
                                            @lang('modules.attendance.halfDay')
                                        @endif

                                        @if ($item->latitude != '' && $item->longitude != '')
                                        <a href="https://www.google.com/maps/{{ '@'.$item->latitude }},{{ $item->longitude }},17z" target="_blank">
                                            <i class="fa fa-map-marked-alt ml-2"></i> @lang('modules.attendance.showOnMap')</a>
                                        @endif
                                    </p>
                                </li>
                                <li>
                                    <p class="mb-0">@lang('modules.attendance.clock_out')</p>
                                    <p class="res-activity-time">
                                        <i class="fa fa-clock"></i>
                                        @if (!is_null($item->clock_out_time))
                                            {{ $item->clock_out_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                                        @else
                                            @lang('modules.attendance.notClockOut')
                                        @endif
                                    </p>
                                </li>
                            </ul>

                            <div class="col-md-3 text-right">
                                <div class="dropdown ml-auto comment-action">


                                    @if ($editAttendancePermission == 'all'
                                        || ($editAttendancePermission == 'added' && $item->added_by == user()->id)
                                        || ($editAttendancePermission == 'owned' && $attendance->user->id == user()->id)
                                        || ($editAttendancePermission == 'both' && ($item->added_by == user()->id || $attendance->user->id == user()->id))
                                        || $deleteAttendancePermission == 'all'
                                        || ($deleteAttendancePermission == 'added' && $item->added_by == user()->id)
                                        || ($deleteAttendancePermission == 'owned' && $attendance->user->id == user()->id)
                                        || ($deleteAttendancePermission == 'both' && ($item->added_by == user()->id || $attendance->user->id == user()->id))
                                    )
                                    <button
                                        class="btn btn-lg f-14 py-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if ($editAttendancePermission == 'all'
                                            || ($editAttendancePermission == 'added' && $item->added_by == user()->id)
                                            || ($editAttendancePermission == 'owned' && $attendance->user->id == user()->id)
                                            || ($editAttendancePermission == 'both' && ($item->added_by == user()->id || $attendance->user->id == user()->id))
                                            )
                                            <a class="dropdown-item d-block text-dark-grey f-13 py-3 px-3"
                                                href="javascript:;" onclick="editAttendance({{ $item->aId }})"
                                                data-attendance-id="{{ $item->aId }}">@lang('app.edit')</a>
                                        @endif

                                        @if ($deleteAttendancePermission == 'all'
                                            || ($deleteAttendancePermission == 'added' && $item->added_by == user()->id)
                                            || ($deleteAttendancePermission == 'owned' && $attendance->user->id == user()->id)
                                            || ($deleteAttendancePermission == 'both' && ($item->added_by == user()->id || $attendance->user->id == user()->id))
                                            )
                                            <a class="cursor-pointer dropdown-item d-block text-dark-grey f-13 pb-3 px-3"
                                                onclick="deleteAttendance({{ $item->aId }})"
                                                data-attendance-id="{{ $item->aId }}"
                                                href="javascript:;">@lang('app.delete')</a>
                                        @endif
                                    </div>
                                    @endif
                                </div>

                            </div>
                        </div>
                    @endforeach

                </div>
            </x-cards.data>
        </div>
    </div>

</div>
<script>
    function deleteAttendance(id) {
        var url = "{{ route('attendances.destroy', ':id') }}";
        url = url.replace(':id', id);
        var token = "{{ csrf_token() }}";

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
                    type: 'POST',
                    url: url,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            showTable();
                            $(MODAL_XL).modal('hide');
                        }
                    }
                });
            }
        });

    }

</script>
