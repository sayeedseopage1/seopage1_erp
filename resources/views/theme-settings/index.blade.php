@extends('layouts.app')

@push('styles')
    <style>
        .form_custom_label {
            justify-content: left;
        }

        .ace_gutter {
            z-index: 1 !important;
        }

    </style>
    <link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
    <link rel="stylesheet" href="{{ asset('vendor/css/image-picker.min.css') }}">
@endpush

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card method="POST">
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                        @lang($pageTitle)</h2>
                </div>
            </x-slot>

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <x-forms.label fieldId="sidebar_logo_style"
                                :fieldLabel="__('modules.themeSettings.sidebarBrandingStyle')" fieldRequired="true">
                            </x-forms.label>
                            <select name="sidebar_logo_style" class="image-picker show-labels show-html">
                                <option data-img-src="{{ asset('img/square-logo-header.png') }}" @if (global_setting()->sidebar_logo_style == 'square') selected @endif
                                    value="square">@lang('modules.invoiceSettings.template') 1
                                </option>
                                <option data-img-src="{{ asset('img/full-logo-header.png') }}" @if (global_setting()->sidebar_logo_style == 'full') selected @endif
                                    value="full">@lang('modules.invoiceSettings.template') 2
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-6 mr-5">
                        <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.accountSettings.appName')"
                            fieldPlaceholder="e.g. Acme Corporation" fieldRequired="true" fieldName="app_name"
                            fieldId="app_name" :fieldValue="global_setting()->app_name" />
                    </div>

                    <div class="col-lg-6">
                        <x-forms.file allowedFileExtensions="png jpg jpeg svg" class="mr-0 mr-lg-2 mr-md-2 cropper"
                            :fieldLabel="__('modules.accountSettings.darkCompanyLogo')" :fieldValue="global_setting()->dark_logo_url"
                            fieldName="logo" fieldId="logo" :popover="__('messages.fileFormat.ImageFile')" />
                    </div>
                    <div class="col-lg-6">
                        <x-forms.file allowedFileExtensions="png jpg jpeg svg" class="mr-0 mr-lg-2 mr-md-2 cropper"
                            :fieldLabel="__('modules.accountSettings.lightCompanyLogo')"
                            :fieldValue="global_setting()->light_logo_url" fieldName="light_logo" fieldId="light_logo"
                            :popover="__('messages.fileFormat.ImageFile')" />
                    </div>
                    <div class="col-lg-6">
                        <x-forms.file allowedFileExtensions="png jpg jpeg svg" class="mr-0 mr-lg-2 mr-md-2 cropper"
                            :fieldLabel="__('modules.themeSettings.loginScreenBackground')"
                            :fieldValue="global_setting()->login_background_url" fieldName="login_background"
                            fieldId="login_background" :popover="__('modules.themeSettings.loginBackgroundSize')"
                            :popover="__('messages.fileFormat.ImageFile')" />
                    </div>
                    <div class="col-lg-6">
                        <x-forms.file allowedFileExtensions="png jpg jpeg" class="mr-0 mr-lg-2 mr-md-2"
                            :fieldLabel="__('modules.accountSettings.faviconImage')"
                            :popover="__('modules.themeSettings.faviconSize')" :fieldValue="global_setting()->favicon_url"
                            fieldName="favicon" fieldId="favicon"
                            :popover="__('messages.fileFormat.ImageFile')" />
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="logo_background_color" fieldRequired="true"
                                :fieldLabel="__('modules.themeSettings.loginLogoBackgroundColor')">
                            </x-forms.label>
                            <x-forms.input-group class="color-picker">
                                <input type="text" class="form-control height-35 f-14"
                                    value="{{ global_setting()->logo_background_color }}" id="logo_background_color"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="logo_background_color">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="auth_theme" :fieldLabel="__('modules.themeSettings.authTheme')"
                                :popover="__('modules.themeSettings.authThemeInfo')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="auth_theme_dark_4" :fieldLabel="__('modules.themeSettings.dark')"
                                    fieldName="auth_theme" fieldValue="dark" class="auth_theme"
                                    :checked="(global_setting()->auth_theme == 'dark')">
                                </x-forms.radio>

                                <x-forms.radio fieldId="auth_theme_light_4" :fieldLabel="__('modules.themeSettings.light')"
                                    fieldValue="light" fieldName="auth_theme" class="auth_theme"
                                    :checked="(global_setting()->auth_theme == 'light')">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-12 mt-3">
                        <x-alert type="info" icon="info-circle">@lang('messages.darkThemeRestrictionInfo')</x-alert>
                    </div>

                    <div class="col-lg-12">
                        <h4>@lang('modules.themeSettings.adminPanelTheme')</h4>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="colorselector" fieldRequired="true"
                                :fieldLabel="__('modules.themeSettings.headerColor')">
                            </x-forms.label>
                            <x-forms.input-group class="color-picker">
                                <input type="text" class="form-control height-35 f-14 header_color"
                                    value="{{ $adminTheme->header_color }}"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="primary_color[]">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="late_yes" :fieldLabel="__('modules.themeSettings.sidebarTheme')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="sidebar_dark_1" :fieldLabel="__('modules.themeSettings.dark')"
                                    fieldName="theme_settings[1][sidebar_theme]" fieldValue="dark" class="sidebar_theme"
                                    :checked="($adminTheme->sidebar_theme == 'dark')">
                                </x-forms.radio>
                                <x-forms.radio fieldId="sidebar_light_1" :fieldLabel="__('modules.themeSettings.light')"
                                    fieldValue="light" :checked="($adminTheme->sidebar_theme == 'light')"
                                    class="sidebar_theme" fieldName="theme_settings[1][sidebar_theme]"></x-forms.radio>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-12 mt-3">
                        <h4>@lang('modules.themeSettings.employeePanelTheme')</h4>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="colorselector" fieldRequired="true"
                                :fieldLabel="__('modules.themeSettings.headerColor')">
                            </x-forms.label>
                            <x-forms.input-group class="color-picker">
                                <input type="text" class="form-control height-35 f-14 header_color"
                                    value="{{ $employeeTheme->header_color }}"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="primary_color[]">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="late_yes" :fieldLabel="__('modules.themeSettings.sidebarTheme')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="sidebar_dark_3" :fieldLabel="__('modules.themeSettings.dark')"
                                    fieldName="theme_settings[3][sidebar_theme]" class="sidebar_theme" fieldValue="dark"
                                    :checked="($employeeTheme->sidebar_theme == 'dark')">
                                </x-forms.radio>
                                <x-forms.radio fieldId="sidebar_light_3" class="sidebar_theme"
                                    :fieldLabel="__('modules.themeSettings.light')" fieldValue="light"
                                    :checked="($employeeTheme->sidebar_theme == 'light')"
                                    fieldName="theme_settings[3][sidebar_theme]"></x-forms.radio>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-12 mt-3">
                        <h4>@lang('modules.themeSettings.clientPanelTheme')</h4>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="colorselector" fieldRequired="true"
                                :fieldLabel="__('modules.themeSettings.headerColor')">
                            </x-forms.label>
                            <x-forms.input-group class="color-picker">
                                <input type="text" class="form-control height-35 f-14 header_color"
                                    value="{{ $clientTheme->header_color }}"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="primary_color[]">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="late_yes" :fieldLabel="__('modules.themeSettings.sidebarTheme')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="sidebar_dark_4" :fieldLabel="__('modules.themeSettings.dark')"
                                    fieldName="theme_settings[4][sidebar_theme]" fieldValue="dark" class="sidebar_theme"
                                    :checked="($clientTheme->sidebar_theme == 'dark')">
                                </x-forms.radio>
                                <x-forms.radio fieldId="sidebar_light_4" :fieldLabel="__('modules.themeSettings.light')"
                                    fieldValue="light" fieldName="theme_settings[4][sidebar_theme]" class="sidebar_theme"
                                    :checked="($clientTheme->sidebar_theme == 'light')">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-secondary id="reset-colors" icon="undo">
                            @lang('modules.themeSettings.useDefaultTheme')
                        </x-forms.button-secondary>

                    </x-setting-form-actions>
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>
    <script src="{{ asset('vendor/jquery/image-picker.min.js') }}"></script>

    @if (!user()->dark_theme)
        <script>
            $('.sidebar_theme .custom-control-input').on('change', function(e) {
                $('aside').removeAttr('class');
                $('aside').addClass('sidebar-' + e.target.value);
            });
        </script>
    @endif

    <script>
        $('.color-picker').colorpicker();
        $('.image-picker').imagepicker();

        $('.header_color').on('change', function(e) {
            document.documentElement.style.setProperty('--header_color', e.target.value);
        });

        $('#reset-colors').click(function() {
            $('.header_color').val('#1d82f5');
            $('.sidebar_theme .custom-control-input').val('dark');
            $('.auth_theme .custom-control-input').val('light');
            $('#logo_background_color').val('#FFFFFF');

            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.themeChangesReset')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('modules.themeSettings.useDefaultTheme')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    $.easyAjax({
                        url: "{{ route('theme-settings.store') }}",
                        container: '#editSettings',
                        blockUI: true,
                        type: "POST",
                        data: $('#editSettings').serialize()
                    });
                }
            });


        });

        $('#save-form').click(function() {
            $.easyAjax({
                url: "{{ route('theme-settings.store') }}",
                container: '#editSettings',
                blockUI: true,
                type: "POST",
                file: true,
                data: $('#editSettings').serialize()
            })
        });

        $('.cropper').on('dropify.fileReady', function(e) {
            var inputId = $(this).find('input').attr('id');
            var url = "{{ route('cropper', ':element') }}";
            url = url.replace(':element', inputId);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

    </script>
@endpush
