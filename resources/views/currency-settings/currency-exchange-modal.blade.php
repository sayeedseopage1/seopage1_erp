<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.accountSettings.currencyConverterKey')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <x-form id="createCurrencyKey">
        <div class="row">
            @include('sections.password-autocomplete-hide')

            <div class="col-sm-12">
                <div class="alert alert-info ">
                    <i class="fa fa-info-circle"></i> @lang('messages.currencyConvertApiKeyUrl') <a href="https://www.currencyconverterapi.com" target="_blank"> https://www.currencyconverterapi.com</a>
                </div>
            </div>

            <div class="col-sm-12 col-lg-6">
                <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.accountSettings.currencyConverterKey')"
                    fieldRequired="true">
                </x-forms.label>
                <x-forms.input-group>
                    <input type="password" name="currency_converter_key" id="currency_converter_key" class="form-control height-35 f-14" value="{{ !is_null(global_setting()->currency_converter_key) ? global_setting()->currency_converter_key : '' }}">

                    <x-slot name="preappend">
                        <button type="button" data-toggle="tooltip"
                            data-original-title="{{ __('messages.viewKey') }}"
                            class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                class="fa fa-eye"></i></button>
                    </x-slot>
                </x-forms.input-group>
            </div>

            <div class="col-sm-12 col-lg-6">
                <x-forms.select fieldId="country" fieldLabel="Version" fieldName="currency_key_version">
                    <option {{ (global_setting()->currency_key_version == 'free' ? 'selected' : '')  }} value="free">Free</option>
                    <option {{ (global_setting()->currency_key_version == 'api' ? 'selected' : '')  }} value="paid">Paid</option>
                </x-forms.select>
            </div>

        </div>
    </x-form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.cancel')</x-forms.button-cancel>
    <x-forms.button-primary id="save-currency" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('#save-currency').click(function () {
        $.easyAjax({
            url: "{{route('currency_settings.exchange_key_store')}}",
            container: '#createCurrencyKey',
            type: "POST",
            data: $('#createCurrencyKey').serialize(),
            success: function (response) {
                $(MODAL_LG).modal('hide');
            }
        });
    });
    init(MODAL_LG);
</script>
