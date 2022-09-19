@php
$manageShiftPermission = user()->permission('manage_employee_shifts');
@endphp
<div class="table-responsive">
    <x-table class="table-bordered">
        <x-slot name="thead">
            <th>@lang('app.name')</th>
            <th>@lang('app.time')</th>
            <th>@lang('app.others')</th>
            @if ($manageShiftPermission == 'all')
                <th>&nbsp;</th>
                <th class="text-right pr-20">@lang('app.action')</th>
            @endif
        </x-slot>

        @forelse($employeeShifts as $shift)
            <tr class="row{{ $shift->id }}">
                <td>
                    <span class="badge badge-info f-12 p-1" style="background-color: {{ $shift->color }}">
                        {{ $shift->shift_name }}</span>
                </td>
                <td>
                    <div class="f-11">@lang('modules.employees.startTime'):
                        {{ \Carbon\Carbon::createFromFormat('H:i:s', $shift->office_start_time)->format(global_setting()->time_format) }}
                    </div>
                    <div class="f-11">
                        @lang('modules.attendance.halfDay'):
                        {{ $shift->halfday_mark_time? \Carbon\Carbon::createFromFormat('H:i:s', $shift->halfday_mark_time)->format(global_setting()->time_format): '' }}
                    </div>
                    <div class="f-11">
                        @lang('modules.employees.endTime'):
                        {{ \Carbon\Carbon::createFromFormat('H:i:s', $shift->office_end_time)->format(global_setting()->time_format) }}
                    </div>
                </td>
                <td>
                    <div class="f-11">
                        @lang('modules.attendance.lateMark'): {{ $shift->late_mark_duration }}
                    </div>
                    <div class="f-11">
                        @lang('modules.attendance.checkininday'): {{ $shift->clockin_in_day }}
                    </div>
                    <div class="f-11">
                        @lang('modules.attendance.officeOpenDays'):

                        @foreach (json_decode($shift->office_open_days) as $item)
                            {{ $weekMap[$item] }}
                        @endforeach
                    </div>
                </td>
                @if ($manageShiftPermission == 'all')
                    <td>
                        <x-forms.radio fieldId="shift_{{ $shift->id }}" class="set_default_shift"
                            data-shift-id="{{ $shift->id }}" :fieldLabel="__('app.default')" fieldName="set_default_shift"
                            fieldValue="{{ $shift->id }}" :checked="$shift->id == attendance_setting()->default_employee_shift ? 'checked' : ''">
                        </x-forms.radio>
                    </td>
                    <td class="text-right pr-20">
                        <div class="task_view mb-1">
                            <a href="javascript:;" data-shift-id="{{ $shift->id }}"
                                class="edit-shift task_view_more d-flex align-items-center justify-content-center" data-toggle="tooltip"
                                data-original-title="@lang('app.edit')"> <i
                                    class="fa fa-edit icons"></i>
                            </a>
                        </div>
                        @if ($shift->id != attendance_setting()->default_employee_shift)
                            <div class="task_view mt-1 mt-lg-0 mt-md-0">
                                <a href="javascript:;" data-shift-id="{{ $shift->id }}"
                                    class="delete-shift task_view_more d-flex align-items-center justify-content-center dropdown-toggle" data-toggle="tooltip"
                                    data-original-title="@lang('app.delete')">
                                    <i class="fa fa-trash icons"></i>
                                </a>
                            </div>
                        @endif
                    </td>
                @endif
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    <x-cards.no-record icon="user" :message="__('messages.noAgentAdded')" />
                </td>
            </tr>
        @endforelse
    </x-table>
</div>

<script>
    $('body').on('click', '#addEmployeeShift', function() {
        var url = "{{ route('employee-shifts.create') }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    $('body').on('click', '.edit-shift', function() {
        var shiftID = $(this).data('shift-id');
        var url = "{{ route('employee-shifts.edit', ':id') }}";
        url = url.replace(':id', shiftID);
        
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

    /* delete shift */
    $('body').on('click', '.delete-shift', function() {
        var id = $(this).data('shift-id');
        
        Swal.fire({
            title: "@lang('messages.sweetAlertTitle')",
            text: "@lang('messages.removeShiftText')",
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
                var url = "{{ route('employee-shifts.destroy', ':id') }}";
                url = url.replace(':id', id);

                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    type: 'POST',
                    url: url,
                    blockUI: true,
                    data: {
                        '_token': token,
                        '_method': 'DELETE'
                    },
                    success: function(response) {
                        if (response.status == "success") {
                            $('.row' + id).fadeOut(100);
                        }
                    }
                });
            }
        });
    });

    $('body').on('click', '.set_default_shift', function() {
        var shiftID = $(this).data('shift-id');
        var token = "{{ csrf_token() }}";

        $.easyAjax({
            url: "{{ route('employee-shifts.set_default') }}",
            type: "POST",
            data: {
                shiftID: shiftID,
                _token: token
            },
            blockUI: true,
            container: '#editSettings',
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        });
    });
    
</script>
