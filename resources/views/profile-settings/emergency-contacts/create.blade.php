<div class="modal-header">
    <h5 class="modal-title">@lang('modules.emergencyContact.addNewEmergencyContact')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<div class="modal-body">
    <div class="portlet-body">
        <x-form id="save-emergency-contact-form">
            <div class="add-client bg-white rounded">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-sm-12">
                        <input type="hidden" name="user_id" value="{{ $userId }}">

                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <x-forms.text fieldId="name" :fieldLabel="__('app.name')"
                                    fieldName="name" fieldRequired="true" :fieldPlaceholder="__('placeholders.name')">
                                </x-forms.text>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <x-forms.text fieldId="email" :fieldLabel="__('app.email')"
                                    fieldName="email" :fieldPlaceholder="__('placeholders.email')">
                                </x-forms.text>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <x-forms.tel fieldId="mobile" :fieldLabel="__('app.mobile')" fieldName="mobile"
                                    fieldPlaceholder="e.g. 987654321" fieldRequired="true"></x-forms.tel>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <x-forms.text :fieldLabel="__('app.relationship')" fieldName="relationship"
                                    fieldId="relationship" :fieldPlaceholder="__('placeholders.relationship')" fieldRequired="true" />
                            </div>
                            <div class="col-md-12 col-sm-12">
                                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.address')"
                                    fieldName="address" fieldId="address" :fieldPlaceholder="__('placeholders.address')">
                                </x-forms.textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </x-form>

    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-contact" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('#save-contact').click(function() {
        var url = "{{ route('emergency-contacts.store') }}";

        $.easyAjax({
            url: url,
            container: '#save-emergency-contact-form',
            type: "POST",
            disableButton: true,
            buttonSelector: "#save-contact",
            data: $('#save-emergency-contact-form').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $('#example tbody').html(response.html);
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });
</script>
