<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />

<div class="modal-header">
    <h5 class="modal-title">@lang('app.edit') @lang('modules.leaves.leaveType')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="editLeave" method="PUT" class="ajax-form">
            <div class="row">

                <div class="col-lg-6">
                    <x-forms.text :fieldLabel="__('modules.leaves.leaveType')"
                        :fieldPlaceholder="__('placeholders.leaveType')" fieldName="type_name" fieldId="type_name"
                        :fieldValue="$leaveType->type_name" fieldRequired="true" />
                </div>

                <div class="col-lg-6">
                    <x-forms.select fieldId="paid" fieldLabel="Leave Paid Status" fieldName="paid" search="true">
                        <option value="1" {{ $leaveType->paid == 1 ? 'selected' : '' }}>@lang('app.paid')</option>
                        <option value="0" {{ $leaveType->paid == 0 ? 'selected' : '' }}>@lang('app.unpaid')</option>
                    </x-forms.select>
                </div>

                <div class="col-lg-6">
                    <x-forms.number :fieldLabel="__('modules.leaves.noOfLeaves')"
                        fieldName="leave_number" fieldId="leave_number" :fieldValue="$leaveType->no_of_leaves"
                        fieldRequired="true" minValue="0" />
                </div>

                <div class="col-lg-6">
                    <x-forms.number :fieldLabel="__('modules.leaves.monthLimit')"
                        fieldName="monthly_limit" fieldId="monthly_limit" :fieldValue="$leaveType->monthly_limit"
                        fieldRequired="true" :fieldHelp="__('modules.leaves.monthLimitInfo')" minValue="0" />
                </div>

                <div class="col-lg-6">
                    <x-forms.label fieldId="colorselector" :fieldLabel="__('modules.sticky.colors')">
                    </x-forms.label>
                    <x-forms.input-group id="colorpicker">
                        <input type="text" class="form-control height-35 f-14"
                            placeholder="{{ __('placeholders.colorPicker') }}" name="color" id="colorselector">

                        <x-slot name="append">
                            <span class="input-group-text colorpicker-input-addon"><i></i></span>
                        </x-slot>
                    </x-forms.input-group>
                </div>
            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-leave-setting" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>
<script>
    $(".select-picker").selectpicker();

    $('#colorpicker').colorpicker({
        "color": "{{ $leaveType->color }}"
    });

    $('#save-leave-setting').click(function() {
        $.easyAjax({
            container: '#editLeave',
            type: "POST",
            disableButton: true,
            blockUI: true,
            url: "{{ route('leaveType.update', $leaveType->id) }}",
            data: $('#editLeave').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
