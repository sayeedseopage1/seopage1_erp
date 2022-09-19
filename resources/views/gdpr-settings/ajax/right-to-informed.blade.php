<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <div class="row">

        <div class="col-lg-12">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableTNCToCustomersFooter')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes1" :fieldLabel="__('app.yes')" fieldName="terms_customer_footer"
                        fieldValue="1" checked="true" :checked="$gdprSetting->terms_customer_footer == 1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no1" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="terms_customer_footer" :checked="$gdprSetting->terms_customer_footer == 0">
                    </x-forms.radio>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <div class="form-group my-3">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.gdpr.termsAndCondition')" fieldName="terms"
                    fieldId="terms" :fieldPlaceholder="__('placeholders.sampleText')"
                    :fieldValue="$gdprSetting->terms">
                </x-forms.textarea>
            </div>
        </div>

        <div class="col-md-12">
            <div class="form-group my-3">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.gdpr.privacyAndPolicy')" fieldName="policy"
                    fieldId="policy" :fieldPlaceholder="__('placeholders.sampleText')"
                    :fieldValue="$gdprSetting->policy">
                </x-forms.textarea>
            </div>
        </div>

    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey ntfcn-tab-content-left">
        <x-setting-form-actions>
            <x-forms.button-primary id="save-right-to-informed-data" icon="check">@lang('app.save')</x-forms.button-primary>
        </x-setting-form-actions>
    </div>
</div>
<!-- Buttons End -->
