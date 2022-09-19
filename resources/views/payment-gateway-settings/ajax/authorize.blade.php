<div class="col-xl-12 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
    @include('sections.password-autocomplete-hide')
    <input type="hidden" name="payment_method" value="authorize">

    <div class="row">
        <div class="col-lg-12 mb-3">
            <x-forms.checkbox :fieldLabel="__('modules.payments.authorizeStatus')" fieldName="authorize_status"
                fieldId="authorize_status" fieldValue="active" fieldRequired="true"
                :checked="$credentials->authorize_status == 'active'" />
        </div>
    </div>
    <div class="row @if ($credentials->authorize_status == 'deactive') d-none @endif" id="authorize_details">
        <div class="col-lg-12">
            <x-forms.select fieldId="authorize_environment" :fieldLabel="__('app.selectEnvironment')" fieldName="authorize_environment" fieldRequired="true">
                <option value="sandbox" @if ($credentials->authorize_environment == 'sandbox') selected @endif>@lang('app.sandbox')</option>
                <option value="live" @if ($credentials->authorize_environment == 'live') selected @endif>@lang('app.live')</option>
            </x-forms.select>
        </div>


        <div class="col-lg-6">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.authorizeApiLoginId')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="authorize_api_login_id" id="authorize_api_login_id" class="form-control height-35 f-14"
                    value="{{ $credentials->authorize_api_login_id }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>

        <div class="col-lg-6">
            <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.payments.authorizeTransactionKey')" fieldRequired="true">
            </x-forms.label>
            <x-forms.input-group>
                <input type="password" name="authorize_transaction_key" id="authorize_transaction_key" class="form-control height-35 f-14"
                    value="{{ $credentials->authorize_transaction_key }}" autocomplete="off">
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="{{ __('messages.viewKey') }}"
                        class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <div class="d-flex">
            <x-forms.button-primary class="mr-3 w-100" icon="check" id="save_authorize_data">@lang('app.save')
            </x-forms.button-primary>
        </div>
        <x-forms.button-cancel :link="url()->previous()" class="">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
