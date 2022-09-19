@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu"/>

        <x-setting-card>

            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <x-form id="updateSettings" class="ajax-form">
                    @include('sections.password-autocomplete-hide')

                    <div class="row">

                        <div class="col-lg-12">
                            <x-forms.select fieldId="storage" :fieldLabel="__('app.storageSetting.selectStorage')"
                                            fieldName="storage">
                                <option value="local"
                                        @if (isset($localCredentials) && $localCredentials->status == 'enabled') selected @endif>@lang('app.storageSetting.local')</option>
                                <option value="aws_s3"
                                        @if (isset($awsCredentials) && $awsCredentials->status == 'enabled') selected @endif>@lang('app.storageSetting.aws')</option>
                            </x-forms.select>
                        </div>

                        <div class="col-lg-12 aws-form">
                            <div class="row">
                                <div class="col-lg-6">
                                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2 field"
                                                  :fieldLabel="__('app.storageSetting.awsKey')"
                                                  fieldName="aws_key"
                                                  fieldId="aws_key" :fieldValue="$key"
                                                  :fieldPlaceholder="__('placeholders.storageSetting.awsKey')"
                                                  :fieldRequired="true">
                                    </x-forms.text>
                                </div>

                                <div class="col-lg-6">
                                    <x-forms.label class="mt-3 field" fieldId="password"
                                                   :fieldLabel="__('app.storageSetting.awsSecret')"
                                                   :fieldRequired="true">
                                    </x-forms.label>

                                    <x-forms.input-group>

                                        <input type="password" name="aws_secret" id="aws_secret"
                                               class="form-control height-35 f-14 field" value="{{ $secret }}">
                                        <x-slot name="preappend">
                                            <button type="button" data-toggle="tooltip"
                                                    data-original-title="{{ __('messages.viewKey') }}"
                                                    class="btn btn-outline-secondary border-grey height-35 toggle-password">
                                                <i
                                                    class="fa fa-eye"></i></button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>

                                <div class="col-lg-6">
                                    <x-forms.select fieldId="aws_region"
                                                    :fieldLabel="__('app.storageSetting.awsRegion')"
                                                    class="field"
                                                    fieldName="aws_region" search="true">
                                        @foreach ($awsRegions as $key => $data)
                                            <option @if(isset($region) && $region == $key) selected @endif
                                            value="{{$key}}">{{ $data }}</option>
                                        @endforeach
                                    </x-forms.select>
                                </div>

                                <div class="col-lg-6">
                                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2 field"
                                                  :fieldLabel="__('app.storageSetting.awsBucket')"
                                                  fieldName="aws_bucket" fieldId="aws_bucket" :fieldValue="$bucket"
                                                  :fieldPlaceholder="__('placeholders.storageSetting.awsBucket')"
                                                  :fieldRequired="true">
                                    </x-forms.text>
                                </div>
                            </div>
                        </div>
                    </div>
                </x-form>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">

                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-secondary id="test-aws" icon="location-arrow" class="aws-form mr-3">
                            @lang('app.testAws')
                        </x-forms.button-secondary>

                        @if($localFilesCount>0)
                            <x-forms.button-secondary id="local-to-aws" icon="location-arrow" class="aws-form">
                                @lang('app.moveAws')
                            </x-forms.button-secondary>
                        @endif
                    </x-setting-form-actions>

                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script>

        let CHANGE_DETECTED = false;
        $('.field').each(function () {
            let elem = $(this);
            CHANGE_DETECTED = false

            // Look for changes in the value
            elem.bind("change keyup paste", function (event) {
                CHANGE_DETECTED = true;
            });
        });
        $(function () {
            const type = $('#storage').val();
            toggleAwsLocal(type);
        });

        function toggleAwsLocal(type) {
            if (type === 'aws_s3') {
                $('.aws-form').css('display', 'block');
            } else if (type === 'local') {
                $('.aws-form').css('display', 'none');
            }
        }

        $('#storage').on('change', function (event) {
            event.preventDefault();
            const type = $(this).val();
            if (type === 'aws_s3') {
                CHANGE_DETECTED = true;
            }
            toggleAwsLocal(type);
        });

        $('body').on('click', '#test-aws', function () {
            // Save the AWS credentials when changed detected for test button click
            if (CHANGE_DETECTED) {
                submitForm();
            }
            const url = "{{ route('storage-settings.aws_test_modal') }}";

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });


        $('#save-form').click(function () {
            submitForm();
        });

        function submitForm() {
            CHANGE_DETECTED = false;
            const data = ($('#editSettings').serialize()).replace("_method=PUT", "_method=POST");
            $.easyAjax({
                url: "{{ route('storage-settings.store') }}",
                container: '#editSettings',
                type: "POST",
                data: data,
            })
        }

        $('body').on('click', '#local-to-aws', function () {
            if (CHANGE_DETECTED) {
                submitForm();
            }
            const url = "{{ route('storage-settings.aws_local_to_aws_modal') }}";

            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    </script>
@endpush
