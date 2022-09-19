<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.clients.addShippingAddress')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="addShippingAddress">
        <div class="row">
            <div class="col-lg-12">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.clients.shippingAddress')" fieldName="shipping_address"
                    fieldId="shipping_address" fieldPlaceholder="e.g. Rocket Road"
                    fieldValue="">
                </x-forms.textarea>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-shipping-address" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('#save-shipping-address').click(function() {

        var url = "{{ route('invoices.add_shipping_address', $clientId) }}";

        $.easyAjax({
            url: url,
            container: '#addShippingAddress',
            type: "POST",
            file: true,
            disableButton: true,
            buttonSelector: "#save-shipping-address",
            data: $('#addShippingAddress').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    $(MODAL_LG).modal('hide');
                }
            }
        })
    });
    init(MODAL_LG);

</script>
