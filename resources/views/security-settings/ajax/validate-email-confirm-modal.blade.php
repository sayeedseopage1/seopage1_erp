<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.authenticationRequired')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="reset-password-form" class="ajax-form" method="POST">
        <div class="row">
            <div class="col-lg-12">
                <x-alert type="info" icon="info-circle">
                    @lang('messages.codeSent')
                </x-alert>
                <x-forms.label class="mt-3" fieldId="password"
                    :fieldLabel="__('app.twoFactorCodeEmail')">
                </x-forms.label>
                <x-forms.input-group>
                    <input type="number" name="code" id="code" autocomplete="off" class="form-control height-50 f-14">
                </x-forms.input-group>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="submit-login" icon="check">@lang('modules.twofactor.validate2FA')</x-forms.button-primary>
</div>

<script>
    $('#submit-login').click(function() {

        var url = "{{ route('two-fa-settings.email_confirm') }}";
        $.easyAjax({
            url: url,
            container: '#reset-password-form',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#submit-login",
            type: "POST",
            data: $('#reset-password-form').serialize(),
            success: function(response) {
                if (response.status == 'success') {
                    window.location.reload();
                }
            }
        })
    });
</script>
