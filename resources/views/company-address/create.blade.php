<div class="modal-header">
    <h5 class="modal-title">@lang('app.addNew') @lang('app.address')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>
<x-form id="createAddress" method="POST" class="ajax-form">
    <div class="modal-body">
        <div class="portlet-body">
            <div class="row">

                <div class="col-sm-12">
                    <x-forms.text :fieldLabel="__('app.location')" :fieldPlaceholder="__('placeholders.city')"
                        fieldName="location" fieldId="location" fieldRequired="true" />
                </div>

                <div class="col-sm-12">
                    <x-forms.textarea :fieldLabel="__('app.address')" :fieldPlaceholder="__('placeholders.address')"
                        fieldName="address" fieldId="address" :fieldRequired="true" />
                </div>

                <div class="col-sm-12 col-md-6">
                    <x-forms.text :fieldLabel="__('modules.invoices.taxName')" fieldPlaceholder="" fieldName="tax_name"
                        fieldId="tax_name" />
                </div>

                <div class="col-sm-12 col-md-6">
                    <x-forms.text :fieldLabel="__('modules.invoices.tax')"
                        :fieldPlaceholder="__('placeholders.invoices.gstNumber')" fieldName="tax_number"
                        fieldId="tax_number" />
                </div>

            </div>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
        <x-forms.button-primary id="save-address-setting" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>
</x-form>

<script>
    $('#save-address-setting').click(function() {
        $.easyAjax({
            container: '#createAddress',
            type: "POST",
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-address-setting",
            url: "{{ route('business-address.store') }}",
            data: $('#createAddress').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
