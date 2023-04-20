@extends('layouts.app')

@section('content')
    <!-- SETTINGS START -->
    <style>
        .settings-box {
	
	margin-left: 0px;
}
    </style>
    

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
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('The Bidder')"
                            fieldPlaceholder="Bidder percentage" fieldRequired="true" fieldName="company_name"
                            fieldId="company_name" :fieldValue="global_setting()->company_name" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Qualifying')"
                            :fieldPlaceholder="__('Qualifying Percentage')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Requirements Defined')"
                            :fieldPlaceholder="__('Requirements Defined Percentage')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>

                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Proposal Made')"
                            :fieldPlaceholder="__('Proposal Made Percentage')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Negotiation started')"
                            :fieldPlaceholder="__('Qualifying Percentage')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Qualifying')"
                            :fieldPlaceholder="__('Negotiation started percentage')" fieldRequired="true" fieldName="company_email"
                            fieldId="company_email" :fieldValue="global_setting()->company_email" />

                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('Sharing milestone breakdown')"
                            fieldPlaceholder="Sharing milestone breakdown percentage" fieldRequired="true" fieldName="company_phone"
                            fieldId="company_phone" :fieldValue="global_setting()->company_phone" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('Closing the deal')"
                            fieldPlaceholder="Closing the deal percentage" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('Sharing the contact form and filling out the form for project manage')"
                            fieldPlaceholder="Sharing the contact form and filling out the form for project manage percentage" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.accountSettings.companyWebsite')"
                            fieldPlaceholder="e.g. https://www.spacex.com/" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.accountSettings.companyWebsite')"
                            fieldPlaceholder="e.g. https://www.spacex.com/" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
                    </div>
                    <div class="col-lg-2">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.accountSettings.companyWebsite')"
                            fieldPlaceholder="e.g. https://www.spacex.com/" fieldRequired="false" fieldName="website"
                            fieldId="website" :fieldValue="global_setting()->website" />
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
                        </x-settingsform-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>
   
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCl9wZfCCqZ9BtkD_ItVG8dAWT9BTMVB0&callback=initMap&libraries=places&v=weekly"
        async>
    </script>
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
