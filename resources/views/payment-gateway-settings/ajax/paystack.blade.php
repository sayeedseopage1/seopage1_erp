<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="paystack">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.paystackStatus')" fieldName="paystack_status"
                fieldId="paystack_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->paystack_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->paystack_status == 'deactive') d-none @endif" id="paystack_details">
        <div class="col-lg-12">
            <x-forms.select fieldId="paystack_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="paystack_mode">
                <option value="sandbox" @if ($credentials->paystack_mode == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="live" @if ($credentials->paystack_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-6 paystack_live {{$credentials->paystack_mode == 'live' ? '' : 'd-none'}}">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.paystackKey')"
                fieldName="paystack_key" fieldId="paystack_key" :fieldValue="$credentials->paystack_key"
                :fieldPlaceholder="__('placeholders.paymentGateway.paystackKey')" fieldRequired="true"></x-forms.text>
        </div>
        <div class="col-lg-6 paystack_live {{$credentials->paystack_mode == 'live' ? '' : 'd-none'}}"">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.PaystackSecretKey')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="paystack_secret" id="paystack_secret" class="form-control height-35 f-14"
                    value="{{ $credentials->paystack_secret }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>
        <div class="col-lg-12 paystack_live {{$credentials->paystack_mode == 'live' ? '' : 'd-none'}}"">
            <x-forms.text class="" :fieldLabel="__('modules.payments.paystackMerchantEmail')"
                fieldName="paystack_merchant_email" fieldId="paystack_merchant_email" :fieldValue="$credentials->paystack_merchant_email"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-6 paystack_sandbox {{$credentials->paystack_mode == 'sandbox' ? '' : 'd-none'}}"">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.test') . ' ' . __('modules.payments.paystackKey')"
                fieldName="test_paystack_key" fieldId="test_paystack_key" :fieldValue="$credentials->test_paystack_key"
                :fieldPlaceholder="__('placeholders.paymentGateway.paystackKey')" fieldRequired="true"></x-forms.text>
        </div>
        <div class="col-lg-6 paystack_sandbox {{$credentials->paystack_mode == 'sandbox' ? '' : 'd-none'}}"">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.test') . ' ' . __('modules.payments.PaystackSecretKey')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="test_paystack_secret" id="test_paystack_secret" class="form-control height-35 f-14"
                    value="{{ $credentials->test_paystack_secret }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>
        <div class="col-lg-12 paystack_sandbox {{$credentials->paystack_mode == 'sandbox' ? '' : 'd-none'}}"">
            <x-forms.text class="" :fieldLabel="__('app.test') . ' ' . __('modules.payments.paystackMerchantEmail')"
                fieldName="test_paystack_merchant_email" fieldId="test_paystack_merchant_email" :fieldValue="$credentials->test_paystack_merchant_email"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-12">
            <x-forms.label fieldId="" for="mail_from_name" :fieldLabel="__('app.webhook')" class="mt-3">
            </x-forms.label>
            <p class="text-bold">
                <span id="webhook-link-text">{{ route('paystack.webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addPaystackWebhookUrl'))</p>
        </div>

    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_paystack_data">@lang('app.save')
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
        $('body').on('change', '#paystack_mode', function () {
            if ($(this).val() == 'live') {
                $('.paystack_live').removeClass('d-none');
                $('.paystack_sandbox').addClass('d-none');
            } else {
                $('.paystack_live').addClass('d-none');
                $('.paystack_sandbox').removeClass('d-none');
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
