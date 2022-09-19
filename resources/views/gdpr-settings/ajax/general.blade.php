<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <div class="row">
        <div class="col-lg-4">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableGdpr')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes1" :fieldLabel="__('app.yes')" fieldName="enable_gdpr"
                        fieldValue="1" :checked="$gdprSetting->enable_gdpr == 1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no1" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="enable_gdpr" :checked="$gdprSetting->enable_gdpr == 0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.showGdprLinkInNavigation')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes2" :fieldLabel="__('app.yes')" fieldName="show_customer_area"
                        fieldValue="1" :checked="$gdprSetting->show_customer_area==1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no2" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="show_customer_area" :checked="$gdprSetting->show_customer_area==0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.showGdprLinkInFooter')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes3" :fieldLabel="__('app.yes')" fieldName="show_customer_footer"
                        fieldValue="1" :checked="$gdprSetting->show_customer_footer==1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no3" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="show_customer_footer" :checked="$gdprSetting->show_customer_footer==0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
        <div class="col-md-12">
            <div class="form-group my-3">
                <x-forms.textarea class="mr-0 mr-lg-2 mr-md-2"
                    :fieldLabel="__('modules.gdpr.gdprTopInformationBlock')" fieldName="top_information_block"
                    fieldId="top_information_block" :fieldPlaceholder="__('placeholders.sampleText')"
                    :fieldValue="$gdprSetting->top_information_block">
                </x-forms.textarea>
            </div>
        </div>
    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
         <x-forms.button-primary id="save-general-data" icon="check">@lang('app.save')</x-forms.button-primary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->

