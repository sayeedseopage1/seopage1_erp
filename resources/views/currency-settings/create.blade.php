@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang('modules.currencySettings.addNewCurrency')</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                @method('POST')
                <div class="row">

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.currencySettings.currencyName')"
                            :fieldPlaceholder="__('placeholders.currency.currencyName')" fieldName="currency_name"
                            fieldId="currency_name" fieldRequired="true"></x-forms.text>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.currencySettings.currencySymbol')"
                            :fieldPlaceholder="__('placeholders.currency.currencySymbol')" fieldName="currency_symbol"
                            fieldId="currency_symbol" fieldRequired="true"></x-forms.text>
                    </div>

                    <div class="col-lg-4">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.currencySettings.currencyCode')"
                            :fieldPlaceholder="__('placeholders.currency.currencyCode')" fieldName="currency_code"
                            fieldId="currency_code" fieldRequired="true"></x-forms.text>
                    </div>

                    <div class="col-lg-4">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12 w-100"
                                for="usr">@lang('modules.currencySettings.isCryptoCurrency')</label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="crypto_currency_yes" :fieldLabel="__('app.yes')"
                                    fieldName="is_cryptocurrency" fieldValue="yes">
                                </x-forms.radio>
                                <x-forms.radio fieldId="crypto_currency_no" :fieldLabel="__('app.no')" fieldValue="no"
                                    fieldName="is_cryptocurrency" checked>
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 crypto-currency" style="display: none">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.currencySettings.usdPrice')"
                            :fieldPlaceholder="__('placeholders.price')" fieldName="usd_price" fieldId="usd_price" fieldRequired="true">
                        </x-forms.text>
                    </div>

                    <div class="col-lg-4 regular-currency">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.currencySettings.exchangeRate')"
                            :fieldPlaceholder="__('placeholders.price')" fieldName="exchange_rate" fieldId="exchange_rate" fieldRequired="true">
                        </x-forms.text>

                        <a href="javascript:;" id="fetch-exchange-rate" icon="key"><i icon="key"></i>
                            @lang('modules.currencySettings.fetchLatestExchangeRate')</a>
                    </div>

                </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </x-setting-form-actions>
                    <div class="d-flex d-lg-none d-md-none p-4">
                        <div class="d-flex w-100">
                            <x-forms.button-primary class="mr-3 w-100" icon="check">@lang('app.save')
                            </x-forms.button-primary>
                        </div>
                        <x-forms.button-cancel :link="url()->previous()" class="w-100">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </div>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>
        // Toggle between Usd Price field
        $("input[name=is_cryptocurrency]").click(function() {
            if ($(this).val() == 'yes') {
                $('.regular-currency').hide();
                $('.crypto-currency').show();
            } else {
                $('.crypto-currency').hide();
                $('.regular-currency').show();
            }
        })

        // Save form data
        $('#save-form').click(function() {
            $.easyAjax({
                url: "{{ route('currency-settings.store') }}",
                container: '#editSettings',
                type: "POST",
                blockUI: true,
                redirect: true,
                buttonSelector: "#save-form",
                data: $('#editSettings').serialize()
            })
        });

        $('#fetch-exchange-rate').click(function() {

            let currencyConverterKey = '{{ global_setting()->currency_converter_key }}';

            if (currencyConverterKey == "") {
                addCurrencyExchangeKey();
                return false;
            }

            let currencyCode = $('#currency_code').val();
            let url = "{{ route('currency_settings.exchange_rate', '#cc') }}";
            url = url.replace('#cc', currencyCode);

            $.easyAjax({
                url: url,
                type: "GET",
                data: {
                    currencyCode: currencyCode
                },
                disableButton: true,
                blockUI: true,
                success: function(response) {
                    $('#exchange_rate').val(response);
                }
            })
        });

        function addCurrencyExchangeKey() {
            const url = "{{ route('currency_settings.exchange_key') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        }
    </script>
@endpush
