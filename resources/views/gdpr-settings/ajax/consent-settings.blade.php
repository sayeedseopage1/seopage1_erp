<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <div class="row">

        <div class="col-lg-6">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableConsentForCustomers')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes1" :fieldLabel="__('app.yes')" fieldName="consent_customer"
                        fieldValue="1" checked="true" :checked="$gdprSetting->consent_customer == 1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no1" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="consent_customer" :checked="$gdprSetting->consent_customer == 0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableConsentForLeads')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes2" :fieldLabel="__('app.yes')" fieldName="consent_leads"
                        fieldValue="1" checked="true" :checked="$gdprSetting->consent_leads==1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no2" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="consent_leads" :checked="$gdprSetting->consent_leads==0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group my-3">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.gdpr.publicPageConsentInformationBlock')" fieldName="consent_block"
                    fieldId="consent_block" :fieldPlaceholder="__('placeholders.sampleText')"
                    :fieldValue="$gdprSetting->consent_block">
                </x-forms.textarea>
            </div>
        </div>

    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-consent-data" icon="check">@lang('app.save')</x-forms.button-primary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->
