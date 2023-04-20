@extends('layouts.app')

@section('content')
    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                @method('PUT')
                <div class="row">
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.accountSettings.companyName')"
                            fieldPlaceholder="e.g. Acme Corporation" fieldRequired="true" fieldName="company_name"
                            fieldId="company_name" :fieldValue="global_setting()->company_name" />
                    </div>
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.accountSettings.companyEmail')"
                            :fieldPlaceholder="__('placeholders.email')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.accountSettings.companyPhone')"
                            fieldPlaceholder="e.g. +19876543" fieldRequired="true" fieldName="company_phone"
                            fieldId="company_phone" :fieldValue="global_setting()->company_phone" />
                    </div>
                    <div class="col-lg-6">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.accountSettings.companyWebsite')"
                            fieldPlaceholder="e.g. https://www.spacex.com/" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
                    </div>
                </div>

            </div>

           
            <div class="settings-btns py-3 d-flex justify-content-start px-4">
                <button type="button" class="btn-primary rounded f-14 p-2 mr-3" id="save-form">
                        <svg class="svg-inline--fa fa-check fa-w-16 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <i class="fa fa-check mr-1"></i> Font Awesome fontawesome.com -->
                    Save
            </button>
          
                       
              <a href="{{url()->previous()}}" class="btn-cancel rounded f-14 p-2 border-0">
                Cancel
            </a>
            </div>

        </x-setting-card>
    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
   
    <script>
        $('#save-form').click(function() {
            var url = "{{ route('company-settings.update', ['1']) }}";

            $.easyAjax({
                url: url,
                container: '#editSettings',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-form",
                data: $('#editSettings').serialize(),
            })
        });
    </script>
@endpush
