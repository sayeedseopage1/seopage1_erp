<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.add') @lang('app.shippingAddress')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">

    <x-form id="shipping-address-form">
        <div class="row justify-content-between">
            <div class="col-md-12">
                <div class="form-group my-3">
                    <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                        :fieldLabel="__('app.shippingAddress')" fieldName="shipping_address"
                        fieldId="shipping_address" fieldPlaceholder="e.g. Rocket Road"
                        fieldValue="" fieldRequired="true">
                    </x-forms.textarea>
                </div>
            </div>
        </div>
    </x-form>

</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-shipping-address" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>

    $('#save-shipping-address').click(function() {
        let clientId = '{{ $clientId }}';

        let url = "{{ route('invoices.add_shipping_address', [':id']) }}";
        url = url.replace(':id', clientId);

        $.easyAjax({
            url: url,
            container: '#shipping-address-form',
            type: "POST",
            data: $('#shipping-address-form').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });

</script>
