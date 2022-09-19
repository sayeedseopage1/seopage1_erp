<div class="modal-header">
    <h5 class="modal-title">@lang('app.edit') @lang('app.menu.consent')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="updateConsent" method="POST" class="form-horizontal">
            @method('put')
            <div class="row">

                <div class="col-lg-12">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.name')" :fieldPlaceholder="__('placeholders.consent')" fieldName="name" fieldId="name" :fieldValue="$consent->name" fieldRequired="true"/>
                </div>

                <div class="col-md-12">
                    <div class="form-group my-3">
                        <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('app.description')" fieldName="description"
                            fieldId="description" :fieldPlaceholder="__('placeholders.consentDescription')"
                            :fieldValue="$consent->description" fieldRequired="true">
                        </x-forms.textarea>
                    </div>
                </div>

            </div>
        </x-form>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-consent" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $('#save-consent').click(function () {
        $.easyAjax({
            container: '#updateConsent',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-consent",
            url: "{{ route('gdpr.update_consent', $consent->id) }}",
            data: $('#updateConsent').serialize(),
            success: function (response) {
                if (response.status == 'success') {
                    showTable();
                    $(MODAL_LG).hide();
                }
            }
        })
    });

</script>

