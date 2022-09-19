<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
<div class="modal-header">
    <h5 class="modal-title">@lang('modules.statusFields.createStatus')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<x-form id="createStatus" method="POST" class="ajax-form">
    <div class="modal-body">
        <div class="portlet-body">
            <div class="row">

                <div class="col-sm-12">
                    <x-forms.text :fieldLabel="__('app.name')" fieldName="name" fieldId="name" fieldRequired="true" />
                </div>

                <div class="col-sm-6">
                    <div id="colorpicker" class="input-group">
                        <div class="form-group my-3 text-left">
                            <x-forms.label fieldId="statusColorSelector" :fieldLabel="__('modules.tasks.labelColor')"
                                fieldRequired="true">
                            </x-forms.label>
                            <x-forms.input-group>
                                <input type="text" name="status_color" id="statusColorSelector" value="#16813D"
                                    class="form-control height-35 f-15 light_text">
                                <x-slot name="append">
                                    <span class="input-group-text colorpicker-input-addon height-35"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="form-group my-3">
                        <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('app.status')</label>
                        <div class="d-flex">
                            <x-forms.radio fieldId="status-active" :fieldLabel="__('app.active')"
                                fieldValue="active" fieldName="status" checked>
                            </x-forms.radio>
                            <x-forms.radio fieldId="status-inactive" :fieldLabel="__('app.inactive')" fieldValue="inactive" fieldName="status">
                            </x-forms.radio>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
        <x-forms.button-primary id="save-status-setting" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>
</x-form>


<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>
<script>
    $('#colorpicker').colorpicker({"color": "#16813D"});

    $('#save-status-setting').click(function() {
        $.easyAjax({
            container: '#createStatus',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-status-setting",
            url: "{{ route('project-settings.store') }}",
            data: $('#createStatus').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
