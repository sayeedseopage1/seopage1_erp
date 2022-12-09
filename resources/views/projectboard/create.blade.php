<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.tasks.addBoardColumn')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="createTaskBoardColumn">
        <div class="row">
            <div class="col-md-6">
                <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.tasks.columnName')"
                    fieldName="column_name" fieldId="column_name" :placeholder="__('placeholders.columnName')"
                    fieldRequired="true" />
            </div>

            <div class="col-md-6">
                <div class="form-group my-3">
                    <x-forms.label fieldId="colorselector" fieldRequired="true"
                        :fieldLabel="__('modules.tasks.labelColor')">
                    </x-forms.label>
                    <x-forms.input-group id="colorpicker">
                        <input type="text" class="form-control height-35 f-14"
                            placeholder="{{ __('placeholders.colorPicker') }}" name="label_color" id="colorselector">

                        <x-slot name="append">
                            <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                        </x-slot>
                    </x-forms.input-group>
                </div>
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-board-column" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>
<script>
    $('#colorpicker').colorpicker({
        "color": "#ff0000"
    });

    $('#save-board-column').click(function() {
        var url = "{{ route('taskboards.store') }}";
        $.easyAjax({
            url: url,
            container: '#createTaskBoardColumn',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-board-column",
            type: "POST",
            data: $('#createTaskBoardColumn').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

</script>
