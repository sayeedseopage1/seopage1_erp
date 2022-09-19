<div class="modal-header">
    <h5 class="modal-title">Verify google recaptcha V3</h5>
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
</div>

<div class="modal-body">
    <div class="portlet-body" id="portlet-body" data-error="false">
        <x-alert type="info" icon="info-circle">
            Please wait...! Key has been verifying.
        </x-alert>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-method" icon="check" data-sitekey="{{$key}}"
        data-callback='saveForm'
        data-error-callback='errorMsg'
        class="g-recaptcha">@lang('app.save')</x-forms.button-primary>
</div>

 <script src="https://www.google.com/recaptcha/api.js"></script>

 <script>
     $('#save-method').hide();

    setTimeout(() => {
        if($('#portlet-body').data('error') !== true)
        {
            let msg = `<x-alert type="success" icon="info-circle">
            Key has been verified. Click on save button to save key.
            </x-alert>`;
            $('#portlet-body').html(msg);
            $('#save-method').show();
        }
     }, 2000);

 </script>

