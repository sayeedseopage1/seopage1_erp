<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="razorpay">
    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.razorpayStatus')" fieldName="razorpay_status"
                fieldId="razorpay_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->razorpay_status == 'active'" />
        </div>
    </div>



    <div class="row @if ($credentials->razorpay_status == 'inactive') d-none @endif" id="razorpay_details">

        <div class="col-lg-12">
            <x-forms.select fieldId="razorpay_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="razorpay_mode">
                <option value="test" @if ($credentials->razorpay_mode == 'test') selected @endif>@lang('app.test')</option>
                <option value="live" @if ($credentials->razorpay_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-12">
            <div id="test_razorpay_details" class="row @if ($credentials->razorpay_mode ==
                'live') d-none @endif">
                <div class="col-lg-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.test').' '.__('app.razorpayKey')" fieldName="test_razorpay_key"
                        fieldId="test_razorpay_key" :fieldValue="$credentials->test_razorpay_key"
                        :fieldPlaceholder="__('placeholders.paymentGateway.testRazorpayKey')" fieldRequired="true"></x-forms.text>
                </div>
                <div class="col-lg-6">
                    <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.test').' '.__('app.razorpaySecret')" fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>

                        <input type="password" name="test_razorpay_secret" id="test_razorpay_secret" class="form-control height-35 f-14"
                            value="{{ $credentials->test_razorpay_secret }}">
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
            <div id="live_razorpay_details" class="row @if ($credentials->razorpay_mode ==
                'test') d-none @endif">
                <div class="col-lg-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.live').' '.__('app.razorpayKey')" fieldName="live_razorpay_key"
                        fieldId="live_razorpay_key" :fieldValue="$credentials->live_razorpay_key"
                        :fieldPlaceholder="__('placeholders.paymentGateway.liveRazorpayKey')" fieldRequired="true"></x-forms.text>
                </div>
                <div class="col-lg-6">
                    <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('app.live').' '.__('app.razorpaySecret')" fieldRequired="true">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="password" name="live_razorpay_secret" id="live_razorpay_secret" class="form-control height-35 f-14"
                            value="{{ $credentials->live_razorpay_secret }}">
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
            <x-forms.label fieldId="" :fieldLabel="__('app.webhook')">
            </x-forms.label>
            <p class="text-bold"><span id="webhook-link-text">{{ route('razorpay.webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addRazorpayWebhookUrl'))</p>
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
