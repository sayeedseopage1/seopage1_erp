<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('modules.paystack.details')
    </h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
    <div class="modal-body">
        <div class="portlet-body">
            <x-form id="paystackDetails" method="POST" class="ajax-form" action="{{ route('paystack_public', [$id]) }}">
                <input type="hidden" name="type" value="{{ $type }}">
                <div class="form-body">
                    <div class="row" >
                        <div class="col-lg-12 col-md-12">
                            <x-forms.text :fieldLabel="__('modules.paystack.client_name')" fieldName="name"
                                fieldId="name" :fieldPlaceholder="__('modules.paystack.client_name')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <x-forms.email :fieldLabel="__('modules.paystack.client_email')" fieldName="email"
                                fieldId="email" :fieldPlaceholder="__('modules.paystack.client_email')" fieldValue="" :fieldRequired="true" />
                        </div>
                    </div>
                </div>
            </x-form>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <x-forms.button-primary id="save-paystack-detail" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>


<script>


    $('#save-paystack-detail').click( function () {

        var url = "{{ route('paystack_public', $id)}}";
        $.easyAjax({
            container: '#paystackDetails',
            buttonSelector: "#save-paystack-detail",
            disableButton: true,
            blockUI: true,
            type:'POST',
            url:url,
            data: $('#paystackDetails').serialize()
        })
    })
</script>
