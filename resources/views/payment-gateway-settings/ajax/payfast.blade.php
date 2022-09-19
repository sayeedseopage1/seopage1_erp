<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="payfast">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.payfastStatus')" fieldName="payfast_status"
                fieldId="payfast_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->payfast_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->payfast_status == 'deactive') d-none @endif" id="payfast_details">
        <div class="col-lg-6">
            <x-forms.select fieldId="payfast_mode" :fieldLabel="__('app.selectEnvironment')" fieldName="payfast_mode" fieldRequired="true">
                <option value="sandbox" @if ($credentials->payfast_mode == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="live" @if ($credentials->payfast_mode == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>

        <div class="col-lg-6">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.merchantId')"
                fieldName="payfast_merchant_id" fieldId="payfast_merchant_id" :fieldValue="$credentials->payfast_merchant_id"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-6">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.merchantKey')"
                fieldName="payfast_merchant_key" fieldId="payfast_merchant_key" :fieldValue="$credentials->payfast_merchant_key"
                fieldRequired="true"></x-forms.text>
        </div>

        <div class="col-lg-6">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.merchantPassphrase')"
                fieldName="payfast_passphrase" fieldId="payfast_passphrase" :fieldValue="$credentials->payfast_passphrase"
                fieldRequired="true"></x-forms.text>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_payfast_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
