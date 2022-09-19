<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="stripe">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.stripeStatus')" fieldName="stripe_status"
                fieldId="stripe_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->stripe_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->stripe_status == 'deactive') d-none @endif" id="stripe_details">

        <div class="col-lg-12">
            <x-forms.select fieldId="stripe_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="stripe_mode">
                <option value="test" @if ($credentials->stripe_mode == 'test') selected @endif>@lang('app.test')</option>
                <option value="live" @if ($credentials->stripe_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-12">
            <div id="test_stripe_details" class="row @if ($credentials->stripe_mode ==
                'live') d-none @endif">
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.test').' '.__('app.stripePublishableKey')"
                            fieldName="test_stripe_client_id" fieldId="test_stripe_client_id" :fieldValue="$credentials->test_stripe_client_id"
                            :fieldPlaceholder="__('placeholders.paymentGateway.testStripePublishableKey')" fieldRequired="true"></x-forms.text>
                    </div>
                    <div class="col-lg-6">
                        <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.test').' '.__('app.stripeSecret')" fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>

                            <input type="password" name="test_stripe_secret" id="test_stripe_secret" class="form-control height-35 f-14"
                                value="{{ $credentials->test_stripe_secret }}" autocomplete="off">
                            <x-slot name="preappend">
                                <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                                    class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                        class="fa fa-eye"></i></button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>
                    <div class="col-lg-12">
                        <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.test').' '.__('app.stripeWebhookSecret')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <input type="password" name="test_stripe_webhook_secret" id="test_stripe_webhook_secret"
                                class="form-control height-35 f-14" value="{{ $credentials->test_stripe_webhook_secret }}" autocomplete="off">
                            <x-slot name="preappend">
                                <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                                    class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                        class="fa fa-eye"></i></button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>
            </div>
        </div>

        <div class="col-lg-12">
            <div id="live_stripe_details" class="row @if ($credentials->stripe_mode ==
                'test') d-none @endif">
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.live').' '.__('app.stripePublishableKey')"
                            fieldName="live_stripe_client_id" fieldId="live_stripe_client_id" :fieldValue="$credentials->live_stripe_client_id"
                            :fieldPlaceholder="__('placeholders.paymentGateway.liveStripePublishableKey')" fieldRequired="true"></x-forms.text>
                    </div>
                    <div class="col-lg-6">
                        <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.live').' '.__('app.stripeSecret')" fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>

                            <input type="password" name="live_stripe_secret" id="live_stripe_secret" class="form-control height-35 f-14"
                                value="{{ $credentials->live_stripe_secret }}" autocomplete="off">
                            <x-slot name="preappend">
                                <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                                    class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                        class="fa fa-eye"></i></button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>
                    <div class="col-lg-12">
                        <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.live').' '.__('app.stripeWebhookSecret')">
                        </x-forms.label>
                        <x-forms.input-group>
                            <input type="password" name="live_stripe_webhook_secret" id="live_stripe_webhook_secret"
                                class="form-control height-35 f-14" value="{{ $credentials->live_stripe_webhook_secret }}" autocomplete="off">
                            <x-slot name="preappend">
                                <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                                    class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                        class="fa fa-eye"></i></button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>
            </div>
        </div>

        <div class="col-lg-12">
            <x-forms.label fieldId="" for="mail_from_name" :fieldLabel="__('app.webhook')" class="mt-3">
            </x-forms.label>
            <p class="text-bold">
                <span id="webhook-link-text">{{ route('verify_webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addStripeWebhookUrl'))</p>
        </div>

    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_stripe_data">@lang('app.save')
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
