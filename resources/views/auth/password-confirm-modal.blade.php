<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('app.authenticationRequired')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="reset-password-form" action="{{ route('password.confirm') }}" class="ajax-form" method="POST">
        <div class="row">
            <div class="col-lg-12">
                <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.profile.yourPassword')">
                </x-forms.label>
                <x-forms.input-group>

                    <input type="password" name="password" id="password" autocomplete="off"
                        placeholder="@lang('placeholders.renterPassword')" class="form-control height-50 f-14">
                    <x-slot name="append">
                        <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                            class="btn btn-outline-secondary border-grey height-50 toggle-password"><i
                                class="fa fa-eye"></i></button>
                    </x-slot>
                </x-forms.input-group>
            </div>
        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="submit-login" icon="check">@lang('app.confirmPassword')</x-forms.button-primary>
</div>

<script>
    $('#submit-login').click(function() {

        var url = "{{ route('password.confirm') }}";
        $.easyAjax({
            url: url,
            container: '#reset-password-form',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#submit-login",
            type: "POST",
            data: $('#reset-password-form').serialize(),
            success: function(response) {
                changeFortifySettings();
            }
        })
    });

    function changeFortifySettings() {

        let method = '{{ $method }}';
        let status = '{{ $status }}';
        let url = "{{ route('two-fa-settings.update', '1') }}";
        let token = "{{ csrf_token() }}";

        $.easyAjax({
            url: url,
            type: "POST",
            blockUI: true,
            container: '#reset-password-form',
            data: {
                '_token': token,
                '_method': 'put',
                'method': method,
                'status': status
            },
            success: function(response) {
                if (method == 'google_authenticator') {
                    changeFortifyStatus(status);
                } else {
                    window.location.reload();
                }
            }
        });
    }

    function changeFortifyStatus(type) {
        let url = "{{ route('two-factor.enable') }}";
        let method =  (type) == 'disable' ? 'DELETE' : 'POST';
        let token = "{{ csrf_token() }}";

        $.easyAjax({
            url: url,
            type: "POST",
            blockUI: true,
            container: '#reset-password-form',
            data: {
                '_token': token,
                '_method': method
            },
            success: function(response) {
                window.location.reload();
            }
        });
    }

</script>
