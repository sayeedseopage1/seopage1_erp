<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('modules.stripeCustomerAddress.details')
    </h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
    <div class="modal-body">
        <div class="portlet-body">
            <x-form id="stripeAddress" method="POST" class="ajax-form" action="{{ route('stripe', [$invoiceID]) }}">
                <div class="form-body">
                    <div class="row" id="addressDetail">
                        <div class="col-lg-12 col-md-12">
                            <x-forms.text :fieldLabel="__('modules.stripeCustomerAddress.name')" fieldName="clientName"
                                fieldId="clientName" :fieldPlaceholder="__('modules.stripeCustomerAddress.name')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <x-forms.text :fieldLabel="__('modules.stripeCustomerAddress.city')" fieldName="city"
                                fieldId="city" :fieldPlaceholder="__('modules.stripeCustomerAddress.city')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <x-forms.text :fieldLabel="__('modules.stripeCustomerAddress.state')" fieldName="state"
                                fieldId="state" :fieldPlaceholder="__('modules.stripeCustomerAddress.state')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <x-forms.select fieldId="country" :fieldLabel="__('modules.stripeCustomerAddress.country')"
                            fieldName="country" search="true" :fieldRequired="true" >
                                @foreach($countries as $country)
                                    <option value="{{ $country->iso }}">{{ $country->nicename }}</option>
                                @endforeach
                            </x-forms.select>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.stripeCustomerAddress.line1')" fieldName="line1" fieldId="line1" :fieldPlaceholder="__('modules.stripeCustomerAddress.line1')" fieldValue="" :fieldRequired="true">
                                </x-forms.textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <span> @lang('messages.stripeAddressDetailNote') </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="row" id="stripe-modal"></div>
                    </div>
                </div>
            </x-form>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <x-forms.button-primary id="save-stripe-detail" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>

<script src="https://js.stripe.com/v3/"></script>

<script>

    $(".select-picker").selectpicker();

    $('#save-stripe-detail').click( function () {

        let invoice_id = '{{$invoiceID}}';

        let url = "{{ route('invoices.save_stripe_detail')}}";

        $.easyAjax({
            container: '#stripeAddress',
            buttonSelector: "#save-stripe-detail",
            disableButton: true,
            blockUI: true,
            type:'POST',
            url:url,
            data: $('#stripeAddress').serialize()+'&invoice_id='+invoice_id,
            success: function(res) {
                $('#addressDetail').hide();
                $('.modal-footer').hide();
                $('#modelHeading').html('@lang('app.cardDetails')');
                $('#stripe-modal').html(res.view);
            }
        })
    })
</script>
