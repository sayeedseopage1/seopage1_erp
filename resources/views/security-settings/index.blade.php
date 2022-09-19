@extends('layouts.app')

@section('content')

    <!-- SETTINGS START -->
    <div class="w-100 d-flex ">

        <x-setting-sidebar :activeMenu="$activeSettingMenu" />

        <x-setting-card>
            <x-slot name="header">
                <div class="s-b-n-header" id="tabs">
                    <nav class="tabs px-4 border-bottom-grey">
                        <div class="nav" id="nav-tab" role="tablist">

                            <a class="nav-item nav-link f-15 active 2fa" data-toggle="tab"
                                href="{{ route('security-settings.index') }}" role="tab" aria-controls="nav-2fa"
                                aria-selected="true">@lang('app.menu.twoFactorAuthentication') <i
                                    class="fa fa-circle ml-1 {{ ($user->two_fa_verify_via != '' && ($user->two_factor_confirmed || $user->two_factor_email_confirmed)) ? 'text-light-green' : 'text-red' }}"></i></a>

                            @if (user()->permission('manage_security_setting') == 'all')
                                <a class="nav-item nav-link f-15 recaptcha" data-toggle="tab"
                                    href="{{ route('security-settings.index') }}?tab=recaptcha" role="tab"
                                    aria-controls="nav-recaptcha"
                                    aria-selected="false">@lang('modules.accountSettings.googleRecaptcha') <i
                                        class="fa fa-circle ml-1 {{ $setting->google_recaptcha_status == 'active' ? 'text-light-green' : 'text-red' }}"></i></a>
                            @endif

                        </div>
                    </nav>
                </div>
            </x-slot>

            {{-- Include tabs here --}}
            @include($view)

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->

@endsection

@push('scripts')
    <script>
        /* Manage menu active class */
        $('.nav-item').removeClass('active');
        const activeTab = "{{ $activeTab }}";
        $('.' + activeTab).addClass('active');

        $("body").on("click", "#editSettings .nav a", function(event) {
            event.preventDefault();

            $('.nav-item').removeClass('active');
            $(this).addClass('active');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#nav-tabContent",
                historyPush: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#nav-tabContent').html(response.html);
                        init('.settings-box');
                        init('#nav-tabContent');
                    }
                }
            });
        });
    </script>
@endpush
