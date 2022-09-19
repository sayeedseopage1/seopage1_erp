<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />

<div class="modal-header">
    <h5 class="modal-title">@lang('app.addNew') @lang('modules.leaves.leaveType')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="createLeave" method="POST" class="ajax-form">

            <input type="hidden" value="true" name="page_reload" id="page_reload">

            <div class="row">

                <div class="col-lg-6">
                    <x-forms.text :fieldLabel="__('modules.leaves.leaveType')"
                        :fieldPlaceholder="__('placeholders.leaveType')" fieldName="type_name" fieldId="type_name"
                        fieldValue="" :fieldRequired="true" />
                </div>

                <div class="col-lg-6">
                    <x-forms.select fieldId="paid" fieldLabel="Leave Paid Status" fieldName="paid" search="true">
                        <option value="1">@lang('app.paid')</option>
                        <option value="0">@lang('app.unpaid')</option>
                    </x-forms.select>
                </div>

                <div class="col-lg-6">
                    <x-forms.number :fieldLabel="__('modules.leaves.noOfLeaves')"
                        fieldName="leave_number" fieldId="leave_number" fieldValue="0" fieldRequired="true" minValue="0" />
                </div>


                <div class="col-lg-6">
                    <x-forms.number :fieldLabel="__('modules.leaves.monthLimit')"
                        fieldName="monthly_limit" fieldId="monthly_limit" fieldValue="0"
                        fieldRequired="true" :fieldHelp="__('modules.leaves.monthLimitInfo')" minValue="0" />
                </div>

                <div class="col-lg-6">
                    <div class="form-group my-3">
                        <x-forms.label fieldId="colorselector" fieldRequired="true"
                            :fieldLabel="__('modules.sticky.colors')">
                        </x-forms.label>
                        <x-forms.input-group id="colorpicker">
                            <input type="text" class="form-control height-35 f-14"
                                placeholder="{{ __('placeholders.colorPicker') }}" name="color" id="colorselector">

                            <x-slot name="append">
                                <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                            </x-slot>
                        </x-forms.input-group>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="form-group">
                        <div class="d-flex mt-5">
                            <x-forms.checkbox :fieldLabel="__('app.toAllEmployee')"
                                fieldName="all_employees" fieldId="all_employees" fieldValue="" fieldRequired="true" />
                        </div>
                    </div>
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
        "color": "#16813D"
    });

    $('#save-leave-setting').click(function() {
        $.easyAjax({
            container: '#createLeave',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-leave-setting",
            url: "{{ route('leaveType.store') }}",
            data: $('#createLeave').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    if (response.page_reload == 'true') {
                        window.location.reload();
                    } else {
                        $('#leave_type_id').html(response.data);
                        $('#leave_type_id').selectpicker('refresh');
                        $(MODAL_LG).modal('hide');
                    }
                }
            }
        })
    });
</script>
