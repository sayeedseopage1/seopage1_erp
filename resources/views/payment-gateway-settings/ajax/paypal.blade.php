<div class="col-xl-12 col-lg-12 col-md-12 w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="paypal">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.paypalStatus')" fieldName="paypal_status"
                fieldId="paypal_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->paypal_status == 'active'" />
        </div>
    </div>

    <div class="row @if ($credentials->paypal_status == 'deactive') d-none @endif" id="paypal_details">
        <div class="col-lg-12">
            <x-forms.select fieldId="paypal_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="paypal_mode">
                <option value="sandbox" @if ($credentials->paypal_mode == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="live" @if ($credentials->paypal_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-12">
            <div id="sandbox_paypal_details" class="row @if ($credentials->paypal_mode ==
                'live') d-none @endif">
                <div class="col-lg-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.sandboxPaypalClientId')"
                        fieldName="sandbox_paypal_client_id" fieldId="sandbox_paypal_client_id"
                        :fieldValue="$credentials->sandbox_paypal_client_id" fieldRequired="true"
                        :fieldPlaceholder="__('placeholders.paymentGateway.sandboxPaypalClientId')">
                    </x-forms.text>
                </div>
                <div class="col-lg-6">
                    <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.sandboxPaypalSecret')"
                        fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="password" name="sandbox_paypal_secret" id="sandbox_paypal_secret"
                            class="form-control height-35 f-14" value="{{ $credentials->sandbox_paypal_secret }}">
                        <x-slot name="preappend">
                            <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                    class="fa fa-eye"></i></button>
                        </x-slot>
                    </x-forms.input-group>
                </div>
            </div>
        </div>

        <div class="col-lg-12">
            <div id="live_paypal_details" class="row @if ($credentials->paypal_mode ==
                'sandbox') d-none @endif">
                <div class="col-lg-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.livePaypalClientId')"
                        fieldName="live_paypal_client_id" fieldId="live_paypal_client_id"
                        :fieldValue="$credentials->paypal_client_id" fieldRequired="true"
                        :fieldPlaceholder="__('placeholders.paymentGateway.livePaypalClientId')">
                    </x-forms.text>
                </div>
                <div class="col-lg-6">
                    <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.livePaypalSecret')"
                        fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="password" name="live_paypal_secret" id="live_paypal_secret"
                            class="form-control height-35 f-14" value="{{ $credentials->paypal_secret }}">
                        <x-slot name="preappend">
                            <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                    class="fa fa-eye"></i></button>
                        </x-slot>
                    </x-forms.input-group>
                </div>
            </div>
        </div>

        <div class="col-lg-12">
            <x-forms.label fieldId="" for="mail_from_name" :fieldLabel="__('app.webhook')">
            </x-forms.label>
            <p class="text-bold"><span id="webhook-link-text">{{ route('paypal.webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addPaypalWebhookUrl'))</p>
        </div>

    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="w-100 mr-3" icon="check" id="save_razorpay_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->

<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script>
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
