<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    <div class="row">
        <div class="col-lg-4">
            <div class="form-group my-3">
                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableCustomerToExportData')</label>
                <div class="d-flex">
                    <x-forms.radio fieldId="yes1" :fieldLabel="__('app.yes')" fieldName="enable_export"
                        fieldValue="1" checked="true" :checked="$gdprSetting->enable_export == 1">
                    </x-forms.radio>
                    <x-forms.radio fieldId="no1" :fieldLabel="__('app.no')" fieldValue="0"
                        fieldName="enable_export" :checked="$gdprSetting->enable_export == 0">
                    </x-forms.radio>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-right-to-data-portability" icon="check">@lang('app.save')</x-forms.button-primary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->
