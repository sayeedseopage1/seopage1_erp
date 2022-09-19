<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <x-form id="save-currency-format-form">
        <div class="row">
            <div class="col-lg-6">
                <x-forms.select fieldId="currency_position"
                                :fieldLabel="__('modules.currencySettings.currencyPosition')"
                                fieldName="currency_position"
                                :popover="__('messages.currency.currencyPosition')">
                    <option
                        @if ($currencyFormatSetting->currency_position == 'left') selected @endif
                    value="left">@lang('modules.currencySettings.left')</option>
                    <option @if ($currencyFormatSetting->currency_position == 'right') selected
                            @endif value="right">@lang('modules.currencySettings.right')</option>
                    <option @if ($currencyFormatSetting->currency_position == 'left_with_space') selected
                            @endif value="left_with_space">@lang('modules.currencySettings.leftWithSpace')</option>
                    <option @if ($currencyFormatSetting->currency_position == 'right_with_space') selected
                            @endif value="right_with_space">@lang('modules.currencySettings.rightWithSpace')</option>
                </x-forms.select>
            </div>
            <div class="col-lg-6">
                <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                              :fieldLabel="__('modules.currencySettings.thousandSeparator')"
                              :fieldPlaceholder="__('placeholders.currency.thousandSeparator')"
                              fieldName="thousand_separator" fieldId="thousand_separator"
                              :popover="__('messages.currency.thousandSeparator')"
                              :fieldValue="$currencyFormatSetting->thousand_separator"></x-forms.text>
            </div>
            <div class="col-lg-6">
                <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.currencySettings.decimalSeparator')"
                              :fieldPlaceholder="__('placeholders.currency.decimalSeparator')"
                              fieldName="decimal_separator" fieldId="decimal_separator"
                              :popover="__('messages.currency.decimalSeparator')"
                              :fieldValue="$currencyFormatSetting->decimal_separator"></x-forms.text>
            </div>
            <div class="col-lg-6">
                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('modules.accountSettings.numberOfdecimals')" fieldName="no_of_decimal"
                                fieldId="no_of_decimal" :popover="__('messages.currency.numberOfdecimals')"
                                :fieldValue="$currencyFormatSetting->no_of_decimal"/>
            </div>
        </div>
    </x-form>
</div>

<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 pt-3 px-4 border-top-grey">
    <p>@lang('modules.currencySettings.sample') - <span id="formatted_currency">{{ $defaultFormattedCurrency }}</span>
    </p>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-currency-format" icon="check">@lang('app.save')</x-forms.button-primary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->
