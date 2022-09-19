<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.edit') @lang('modules.lead.leadSource')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="editLeadSource" method="PUT" class="ajax-form">
            <div class="form-body">
                <div class="row">
                    <div class="col-lg-12">
                        <x-forms.text fieldId="type" :fieldLabel="__('modules.lead.leadSource')"
                            fieldName="type" :fieldValue="$source->type" fieldRequired="true">
                        </x-forms.text>
                    </div>
                </div>
            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-source" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    // save channel
    $('#save-source').click(function() {
        $.easyAjax({
            url: "{{route('lead-source-settings.update', $source->id)}}",
            container: '#editLeadSource',
            type: "PUT",
            blockUI: true,
            disableButton: true,
            buttonSelector: "#save-source",
            data: $('#editLeadSource').serialize(),
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    });
</script>
