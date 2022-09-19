<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="flutterwave">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.flutterwaveStatus')" fieldName="flutterwave_status"
                fieldId="flutterwave_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->flutterwave_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->flutterwave_status == 'deactive') d-none @endif" id="flutterwave_details">
        <div class="col-lg-12">
            <x-forms.select fieldId="flutterwave_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="flutterwave_mode">
                <option value="sandbox" @if ($credentials->flutterwave_mode == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="live" @if ($credentials->flutterwave_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-6 flutterwave_live {{$credentials->flutterwave_mode == 'live' ? '' : 'd-none'}}">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.flutterwaveKey')"
                fieldName="live_flutterwave_key" fieldId="live_flutterwave_key" :fieldValue="$credentials->live_flutterwave_key"
                :fieldPlaceholder="__('placeholders.paymentGateway.flutterwaveKey')" fieldRequired="true"></x-forms.text>
        </div>
        <div class="col-lg-6 flutterwave_live {{$credentials->flutterwave_mode == 'live' ? '' : 'd-none'}}">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.flutterwaveSecretKey')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="live_flutterwave_secret" id="live_flutterwave_secret" class="form-control height-35 f-14"
                    value="{{ $credentials->live_flutterwave_secret }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>
        <div class="col-lg-6 flutterwave_live {{$credentials->flutterwave_mode == 'live' ? '' : 'd-none'}}">
            <x-forms.text class="" :fieldLabel="__('modules.payments.flutterwaveSecretHash')"
                fieldName="live_flutterwave_hash" fieldId="live_flutterwave_hash" :fieldValue="$credentials->live_flutterwave_hash"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-6 flutterwave_sandbox {{$credentials->flutterwave_mode == 'sandbox' ? '' : 'd-none'}}">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.test') . ' ' . __('modules.payments.flutterwaveKey')"
                fieldName="test_flutterwave_key" fieldId="test_flutterwave_key" :fieldValue="$credentials->test_flutterwave_key"
                :fieldPlaceholder="__('placeholders.paymentGateway.flutterwaveKey')" fieldRequired="true"></x-forms.text>
        </div>
        <div class="col-lg-6 flutterwave_sandbox {{$credentials->flutterwave_mode == 'sandbox' ? '' : 'd-none'}}">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.test') . ' ' . __('modules.payments.flutterwaveSecretKey')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="test_flutterwave_secret" id="test_flutterwave_secret" class="form-control height-35 f-14"
                    value="{{ $credentials->test_flutterwave_secret }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>
        <div class="col-lg-6 flutterwave_sandbox {{$credentials->flutterwave_mode == 'sandbox' ? '' : 'd-none'}}">
            <x-forms.text class="" :fieldLabel="__('app.test') . ' ' . __('modules.payments.flutterwaveSecretHash')"
                fieldName="test_flutterwave_hash" fieldId="test_flutterwave_hash" :fieldValue="$credentials->test_flutterwave_hash"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-6">
            <x-forms.text class="" :fieldLabel="__('modules.payments.flutterwaveWebhookSecretHash')"
                fieldName="flutterwave_webhook_secret_hash" fieldId="flutterwave_webhook_secret_hash" :fieldValue="$credentials->flutterwave_webhook_secret_hash"></x-forms.text>
        </div>
        <div class="col-lg-12">
            <x-forms.label fieldId="" :fieldLabel="__('app.webhook')">
            </x-forms.label>
            <p class="text-bold"><span id="webhook-link-text">{{ route('flutterwave.webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addFlutterwaveWebhookUrl'))</p>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_flutterwave_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->
<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script>

    $(document).ready(function () {
        $('body').on('change', '#flutterwave_mode', function () {
            if ($(this).val() == 'live') {
                $('.flutterwave_live').removeClass('d-none');
                $('.flutterwave_sandbox').addClass('d-none');
            } else {
                $('.flutterwave_live').addClass('d-none');
                $('.flutterwave_sandbox').removeClass('d-none');
            }
        });
    });


    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function(e) {
        Swal.fire({
            icon: 'success',
            text: '@lang("app.webhookUrlCopied")',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
        })
    });
</script>
