<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="mollie">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.mollieStatus')" fieldName="mollie_status"
                fieldId="mollie_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->mollie_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->mollie_status == 'deactive') d-none @endif" id="mollie_details">
        <div class="col-lg-12">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.payments.mollieKey')"
                fieldName="mollie_api_key" fieldId="mollie_api_key" :fieldValue="$credentials->mollie_api_key"
                fieldRequired="true"></x-forms.text>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_mollie_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
