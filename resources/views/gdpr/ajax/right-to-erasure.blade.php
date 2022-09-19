<div class="col-lg-12 col-md-12 w-100 p-4">
    <div class="row">

         <div class="col-md-12">
            <div class="form-group my-3">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.gdpr.publicPageConsentInformationBlock')" fieldName="consent_block"
                    fieldId="consent_block" :fieldPlaceholder="__('placeholders.sampleText')"
                    fieldValue="">
                </x-forms.textarea>
            </div>
        </div>

    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <div class="settings-btns py-3 d-none d-lg-flex d-md-flex justify-content-end px-4">
        <x-forms.button-primary id="save-right-to-erasure-data" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>
</div>
<!-- Buttons End -->

<script>
    $(body).on('click', '#save-right-to-erasure-data', function() {
        $.easyAjax({
            url: "{{route('gdpr_settings.update_general')}}",
            container: '#editSettings',
            type: "POST",
            disableButton: true,
            buttonSelector: "#save-right-to-erasure-data",
            data: $('#editSettings').serialize(),
        })
    })
</script>
