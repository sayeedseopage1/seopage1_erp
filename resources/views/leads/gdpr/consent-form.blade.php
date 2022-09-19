<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.view') @lang('modules.gdpr.consent')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>

<div class="modal-body">
    <x-form id="saveLeadConsentForm" method="POST" class="form-horizontal">
        <input type="hidden" name="consent_id" value="{{ $consentId }}">
        <input type="hidden" name="status" value="@if($consent->lead && $consent->lead->status == 'agree') disagree @else agree @endif">
        <div class="row">
            <div class="col-md-12">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.gdpr.additionalDescription')"
                    fieldName="additional_description" fieldRequired="true" fieldId="additional_description"
                    :fieldPlaceholder="__('placeholders.gdpr.additionDescription')">
                </x-forms.textarea>
            </div>

            @if(($consent->lead && $consent->lead->status == 'disagree') || !$consent->lead)
                <div class="col-md-12">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.gdpr.purposeDescription')"
                        fieldName="consent_description" fieldRequired="true" fieldId="consent_description"
                        :fieldPlaceholder="__('placeholders.milestone.consent_description')" :fieldValue="$consent->description">
                    </x-forms.textarea>
                </div>
            @endif

        </div>
    </x-form>
</div>

<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>

    @if ($consent->lead && $consent->lead->status == 'agree')
        <x-forms.button-primary data-status="optOut" id="save-consent" icon="check">@lang('modules.gdpr.optOut')</x-forms.button-primary>
    @else
        <x-forms.button-primary data-status="optIn" id="save-consent" icon="check">@lang('modules.gdpr.optIn')</x-forms.button-primary>
    @endif

</div>

<script>
    $(document).on('click', '#save-consent', function(){
        $.easyAjax({
            url: "{{route('leads.save_lead_consent', $leadId)}}",
            container: '#saveLeadConsentForm',
            type: "POST",
            data: $('#saveLeadConsentForm').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    location.reload();
                }
            }
        })
    });
</script>
