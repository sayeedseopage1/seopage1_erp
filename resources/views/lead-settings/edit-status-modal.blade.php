<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />

<style>
    #colorpicker .form-group {
        width: 87%;
    }
</style>


<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.edit') @lang('modules.lead.leadStatus')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span>
    </button>
</div>

<div class="modal-body">
    <div class="portlet-body">
        <x-form id="editStatus" method="PUT" class="ajax-form">
            <div class="form-body">
                <div class="row">
                    <div class="col-sm-4 col-md-12 col-lg-6">
                        <x-forms.text fieldId="type" :fieldLabel="__('modules.lead.leadStatus')"
                            fieldName="type" fieldRequired="true" :fieldPlaceholder="__('placeholders.status')" :fieldValue="$status->type">
                        </x-forms.text>
                    </div>
                    <div class="col-sm-4 col-md-12 col-lg-6">
                        <div id="colorpicker" class="input-group">
                            <div class="form-group my-3 text-left">
                                <x-forms.label fieldId="colorselector" :fieldLabel="__('modules.tasks.labelColor')"
                                    fieldRequired="true">
                                </x-forms.label>
                                <x-forms.input-group>
                                    <input type="text" name="label_color" id="colorselector" value="{{ $status->label_color }}"
                                        class="form-control height-35 f-15 light_text">
                                    <x-slot name="append">
                                        <span class="input-group-text colorpicker-input-addon height-35"><i></i></span>
                                    </x-slot>
                                </x-forms.input-group>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 col-md-6">
                        <div class="my-3">
                            <label for="user_id" id="agentLabel"> @lang('modules.tasks.position') </label>
                            <select class="form-control select-picker" id="priority" data-live-search="true"
                                name="priority">
                                @for($i=1; $i<= $maxPriority; $i++)
                                    <option @if($i == $status->priority) selected @endif>{{ $i }}</option>
                                @endfor
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </x-form>
    </div>
</div>

<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-status" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>

<script>

    $('#colorpicker').colorpicker({"color": "{{ $status->label_color }}"});

    $(".select-picker").selectpicker();

    // save status
    $('#save-status').click(function() {
        $.easyAjax({
            url: "{{route('lead-status-settings.update', $status->id)}}",
            container: '#editStatus',
            type: "PUT",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#save-status",
            data: $('#editStatus').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    });

</script>
