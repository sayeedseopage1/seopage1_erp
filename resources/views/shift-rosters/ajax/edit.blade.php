<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('app.update') @lang('modules.attendance.shift')
    </h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="attendance-container">
        <input type="hidden" name="shift_date" value="{{ $date }}">
        <input type="hidden" name="user_id" value="{{ $employee->id }}">
        @if (!is_null($shiftSchedule))
            @method('PUT')
        @endif
        <div class="row">
            <div class="col-sm-12">
                <h3 class="heading-h3 mb-3">@lang('app.date'):
                    {{ \Carbon\Carbon::parse($date)->format(global_setting()->date_format) }}
                    ({{ \Carbon\Carbon::parse($date)->format('l') }})</h3>
            </div>
            <div class="col-sm-12">
                <x-employee :user="$employee" />
            </div>

            @if (!is_null($shiftSchedule) && !is_null($shiftSchedule->pendingRequestChange))
                <div class="col-sm-12 mt-3">
                    <p class="mb-1">@lang('modules.attendance.requestFor')</p>
                    <span class="badge badge-info" style="background-color: {{ $shiftSchedule->pendingRequestChange->shift->color }}">{{ $shiftSchedule->pendingRequestChange->shift->shift_name }}</span>
                </div> 
                <div class="col-sm-12 mt-3">
                    <p class="mb-1">@lang('app.reason')</p>
                    <p>{{ $shiftSchedule->pendingRequestChange->reason ?? '--' }}</p>
                </div>  
            @else
                <div class="col-sm-12">
                    <x-forms.select fieldName="employee_shift_id" fieldId="employee_shift_id" :fieldLabel="__('modules.attendance.shift')">
                        @foreach ($employeeShifts as $item)
                            <option
                                {{ !is_null($shiftSchedule) && $shiftSchedule->employee_shift_id == $item->id ? 'selected' : '' }}
                                value="{{ $item->id }}">{{ $item->shift_name.' ['.$item->office_start_time.' - '.$item->office_end_time.']' }}</option>
                        @endforeach
                    </x-forms.select>
                </div>
                <div class="col-sm-12">
                    <x-forms.textarea fieldName="remarks" fieldId="remarks" :fieldLabel="__('app.remark')" :fieldValue="!is_null($shiftSchedule) ? $shiftSchedule->remarks : ''" />
                </div>
            @endif
        </div>
    </x-form>
</div>

<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    @if (!is_null($shiftSchedule))
        @if (!is_null($shiftSchedule->pendingRequestChange))
            <x-forms.button-secondary class="mr-3 decline-request" icon="times" data-request-id="{{ $shiftSchedule->pendingRequestChange->id }}">@lang('app.decline')</x-forms.button-secondary>
            <x-forms.button-primary icon="check" class="approve-request" icon="check" data-request-id="{{ $shiftSchedule->pendingRequestChange->id }}">@lang('app.approve')</x-forms.button-primary>        
        @else
            <x-forms.button-secondary id="delete-shift" class="mr-3" icon="trash">@lang('app.delete')</x-forms.button-secondary>
            <x-forms.button-primary id="save-shift" icon="check">@lang('app.save')</x-forms.button-primary>
        @endif
    @else
        <x-forms.button-primary id="save-shift" icon="check">@lang('app.save')</x-forms.button-primary>
    @endif

</div>

<script>
    $(document).ready(function() {
        $('#save-shift').click(function() {
            @if (!is_null($shiftSchedule))
                var url = "{{ route('shifts.update', $shiftSchedule->id) }}";
            @else
                var url = "{{ route('shifts.store') }}";
            @endif
            $.easyAjax({
                url: url,
                type: "POST",
                container: '#attendance-container',
                blockUI: true,
                disableButton: true,
                buttonSelector: "#save-shift",
                data: $('#attendance-container').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if (typeof loadData !== 'undefined' && typeof loadData === 'function') {
                            loadData();
                        } else {
                            showTable();
                        }
                        $(MODAL_DEFAULT).hide();
                    }
                }
            })
        });

        $('#delete-shift').click(function() {
            @if (!is_null($shiftSchedule))
                var url = "{{ route('shifts.destroy', $shiftSchedule->id) }}";
            @else
                var url = "{{ route('shifts.store') }}";
            @endif

            var formData = $('#attendance-container').serialize();
            formData = formData.replace('&_method=PUT', '&_method=DELETE');

            $.easyAjax({
                url: url,
                type: "POST",
                container: '#attendance-container',
                blockUI: true,
                disableButton: true,
                buttonSelector: "#delete-shift",
                data: formData,
                success: function(response) {
                    if (response.status == 'success') {
                        if (typeof loadData !== 'undefined' && typeof loadData === 'function') {
                            loadData();
                        } else {
                            showTable();
                        }
                        $(MODAL_DEFAULT).hide();
                    }
                }
            })
        });

        init(MODAL_DEFAULT);
    });
</script>
