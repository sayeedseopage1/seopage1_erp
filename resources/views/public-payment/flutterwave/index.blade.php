<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @lang('modules.flutterwave.details')
    </h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
    <div class="modal-body">
        <div class="portlet-body">
            <x-form id="flutterwaveDetails" method="POST" class="ajax-form" action="{{ route('flutterwave_public', [$id]) }}">
                <input type="hidden" name="type" value="{{ $type }}">
                <div class="form-body">
                    <div class="row" >
                        <div class="col-lg-12 col-md-12">
                            <x-forms.text :fieldLabel="__('modules.flutterwave.client_name')" fieldName="name"
                                fieldId="name" :fieldPlaceholder="__('modules.flutterwave.client_name')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <x-forms.email :fieldLabel="__('modules.flutterwave.client_email')" fieldName="email"
                                fieldId="email" :fieldPlaceholder="__('modules.flutterwave.client_email')" fieldValue="" :fieldRequired="true" />
                        </div>
                        <div class="col-lg-12 col-md-12">
                            <x-forms.tel :fieldLabel="__('modules.flutterwave.client_phone')" fieldName="phone"
                                fieldId="phone" :fieldPlaceholder="__('modules.flutterwave.client_phone')" fieldValue="" />
                        </div>
                    </div>
                </div>
            </x-form>
        </div>
    </div>
    <div class="modal-footer">
        <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
        <x-forms.button-primary id="save-flutterwave-detail" icon="check">@lang('app.save')</x-forms.button-primary>
    </div>


<script>


    $('#save-flutterwave-detail').click( function () {

        var url = "{{ route('flutterwave_public', $id)}}";
        $.easyAjax({
            container: '#flutterwaveDetails',
            buttonSelector: "#save-flutterwave-detail",
            disableButton: true,
            blockUI: true,
            type:'POST',
            url:url,
            data: $('#flutterwaveDetails').serialize()
        })
    })
</script>
