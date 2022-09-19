<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="square">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.squareStatus')" fieldName="square_status"
                fieldId="square_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->square_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->square_status == 'deactive') d-none @endif" id="square_details">
        <div class="col-lg-6">
            <x-forms.select fieldId="square_environment" :fieldLabel="__('app.selectEnvironment')" fieldName="square_environment" fieldRequired="true">
                <option value="sandbox" @if ($credentials->square_environment == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="production" @if ($credentials->square_environment == 'production') selected @endif>@lang('app.production')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-6">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.squareApplicationId')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="square_application_id" id="square_application_id" class="form-control height-35 f-14"
                    value="{{ $credentials->square_application_id }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>

        <div class="col-lg-6">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.squareAccessToken')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="square_access_token" id="square_access_token" class="form-control height-35 f-14"
                    value="{{ $credentials->square_access_token }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>

        <div class="col-lg-6">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.squareLocationId')"
                fieldName="square_location_id" fieldId="square_location_id" :fieldValue="$credentials->square_location_id"
                fieldRequired="true"></x-forms.text>
        </div>
        <div class="col-lg-12">
            <x-forms.label fieldId="" :fieldLabel="__('app.webhook')">
            </x-forms.label>
            <p class="text-bold"><span id="webhook-link-text">{{ route('square.webhook') }}</span>
                <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                    data-clipboard-target="#webhook-link-text">
                    <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
            </p>
            <p class="text-primary">(@lang('messages.addSquareWebhookUrl'))</p>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_square_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
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
