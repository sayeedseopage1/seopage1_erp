<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('email.testMail.testMail')</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="testEmail">
        <div class="row">
            <div class="col-sm-12">
                <x-forms.email fieldId="test_email" :fieldLabel="__('email.testMail.mailAddress')"
                               fieldName="test_email"
                               fieldRequired="true" :fieldPlaceholder="__('placeholders.email')"
                               fieldValue="{{user()->email}}">
                </x-forms.email>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="send-test-email-btn" icon="check">@lang('app.send')</x-forms.button-primary>
</div>

<script>
    $('body').on('click', '#send-test-email-btn', function () {
        $.easyAjax({
            url: "{{route('smtp_settings.send_test_mail')}}",
            type: "GET",
            messagePosition: "inline",
            container: "#testEmail",
            blockUI: true,
            data: $('#testEmail').serialize(),
        })
    });
</script>
