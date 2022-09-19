<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="{{ asset('vendor/css/all.min.css') }}">

    <!-- Template CSS -->
    <link type="text/css" rel="stylesheet" media="all" href="{{ asset('css/main.css') }}">

    <title>@lang($pageTitle)</title>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ global_setting()->favicon_url }}">
    <meta name="theme-color" content="#ffffff">

    @isset($activeSettingMenu)
        <style>
            .preloader-container {
                margin-left: 510px;
                width: calc(100% - 510px)
            }
        </style>
    @endisset

    <style>
        :root {
            --fc-border-color: #E8EEF3;
            --fc-button-text-color: #99A5B5;
            --fc-button-border-color: #99A5B5;
            --fc-button-bg-color: #ffffff;
            --fc-button-active-bg-color: #171f29;
            --fc-today-bg-color: #f2f4f7;
        }
        .fc a[data-navlink] {
            color: #99a5b5;
        }

    </style>

    <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
    <script src="{{ asset('vendor/jquery/modernizr.min.js') }}"></script>

    {{-- Timepicker --}}
    <script src="{{ asset('vendor/jquery/bootstrap-timepicker.min.js') }}"></script>
</head>


<body id="body">

    <!-- BODY WRAPPER START -->
    <div class="body-wrapper clearfix">

        <!-- SETTINGS START -->
        <div class="w-100 d-flex ">

            <x-setting-card>
                <x-slot name="header">
                    <div class="s-b-n-header" id="tabs">
                        <h2 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                            @lang($pageTitle)</h2>
                    </div>
                </x-slot>

                <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
                    <div class="row">

                        @forelse($allConsents as $allConsent)

                        <div class="col-lg-12">
                            <div class="form-group my-3">
                                <h4>{{ $allConsent->name }}</h4>
                                <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.gdpr.enableGdpr')</label>
                                <div class="d-flex">
                                    <x-forms.radio fieldId="yes1" :fieldLabel="__('app.yes')" fieldName="enable_gdpr"
                                        fieldValue="1" checked="">
                                    </x-forms.radio>
                                    <x-forms.radio fieldId="no1" :fieldLabel="__('app.no')" fieldValue="0"
                                        fieldName="enable_gdpr" checked="">
                                    </x-forms.radio>
                                </div>
                            </div>
                        </div>
                        @empty
                            <p class="text-center">
                                <x-cards.no-record icon="list" :message="__('messages.noConsentFound')" />
                            </p>
                        @endforelse

                    </div>

                </div>

                <x-slot name="action">
                    <!-- Buttons Start -->
                    <div class="w-100 border-top-grey">
                        <div class="settings-btns py-3 d-none d-lg-flex d-md-flex justify-content-end px-4">
                            <x-forms.button-cancel :link="url()->previous()" class="border-0 mr-3">@lang('app.cancel')
                            </x-forms.button-cancel>

                            <x-forms.button-primary id="save-form" icon="check">@lang('app.save')</x-forms.button-primary>
                        </div>
                        <div class="d-block d-lg-none d-md-none p-4">
                            <div class="d-flex w-100">
                                <x-forms.button-primary class="mr-3 w-100" icon="check">@lang('app.save')
                                </x-forms.button-primary>
                            </div>
                            <x-forms.button-cancel :link="url()->previous()" class="w-100 mt-3">@lang('app.cancel')
                            </x-forms.button-cancel>
                        </div>
                    </div>
                    <!-- Buttons End -->
                </x-slot>

            </x-setting-card>

        </div>
        <!-- SETTINGS END -->

    </div>
    <!-- BODY WRAPPER END -->

    <!-- Global Required Javascript -->
    <script src="{{ asset('js/main.js') }}"></script>

</body>

</html>

