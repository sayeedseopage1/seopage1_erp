<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('modules.attendance.requestChange')
    </h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="attendance-container" method="PUT">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="heading-h3 mb-3">@lang('app.date'):
                    {{ $shift->date->format(global_setting()->date_format) }}
                    ({{ $shift->date->format('l') }})</h3>
            </div>
            <div class="col-sm-12">
                <x-employee :user="$shift->user" />
            </div>
            <div class="col-sm-12 mt-3">
                <span class="badge badge-info f-14" style="background-color: {{ $shift->shift->color }}">{{ $shift->shift->shift_name }}</span>
            </div>

            @if (!is_null($shift->requestChange) && $shift->requestChange->status == 'waiting')
                <div class="col-sm-12 mt-3">
                    <p class="mb-1">@lang('modules.attendance.requestFor')</p>
                    <span class="badge badge-info" style="background-color: {{ $shift->requestChange->shift->color }}">{{ $shift->requestChange->shift->shift_name }}</span>
                </div>                
                <div class="col-sm-12 mt-3">
                    <p class="mb-1">@lang('app.reason')</p>
                    <p>{{ $shift->requestChange->reason ?? '--' }}</p>
                </div>                
            @else
                <div class="col-sm-12">
                    <x-forms.select fieldName="employee_shift_id" fieldId="employee_shift_id" :fieldLabel="__('modules.attendance.requestFor')">
                        @foreach ($employeeShifts as $item)
                            @if ($shift->employee_shift_id != $item->id)
                                <option value="{{ $item->id }}">{{ $item->shift_name .' ['.$item->office_start_time.' - '.$item->office_end_time.']' }}</option>
                            @endif
                        @endforeach
                    </x-forms.select>
                </div>
                <div class="col-sm-12">
                    <x-forms.textarea fieldName="reason" fieldId="reason" :fieldLabel="__('app.reason')" fieldRequired="true" />
                </div>
            @endif
        </div>
    </x-form>
</div>

<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    @if (!is_null($shift->requestChange) && $shift->requestChange->status == 'waiting')
        <x-forms.button-primary id="delete-shift" data-change-id="{{ $shift->requestChange->id }}" icon="times">@lang('app.delete') @lang('modules.attendance.requestChange')</x-forms.button-primary>
    @else
        <x-forms.button-primary id="save-shift" icon="check">@lang('app.save')</x-forms.button-primary>
    @endif
</div>

<script>
    $(document).ready(function() {
        $('#save-shift').click(function() {
            var url = "{{ route('shifts-change.update', $shift->id) }}";
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
                        window.location.reload();
                    }
                }
            })
        });

        $('#delete-shift').click(function() {
            var changeId = $(this).data('change-id');
            var url = "{{ route('shifts-change.destroy', ':id') }}";
            url = url.replace(':id', changeId);
            var formData = $('#attendance-container').serialize();
            formData = formData.replace('&_method=PUT', '&_method=DELETE');

            $.easyAjax({
                url: url,
                type: "POST",
                container: '#attendance-container',
                blockUI: true,
                disableButton: true,
                buttonSelector: "#save-shift",
                data: formData,
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        init(MODAL_DEFAULT);
    });
</script>
