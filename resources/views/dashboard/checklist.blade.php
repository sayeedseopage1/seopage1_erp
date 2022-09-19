@extends('layouts.app')

@section('content')

    <!-- CONTENT WRAPPER START -->
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 text-center mt-4">
                <h2 class="heading-h2">@lang('app.welcome') {{ user()->name }}</h2>
                <p>@lang('modules.checklist.checklistInfo')</p>
            </div>

            <div class="col-md-12 mt-4">

                <x-cards.data title="To Do List">

                    <x-cards.onboarding-item :title="__('modules.checklist.installation')"
                        :summary="__('modules.checklist.installationInfo')" completed="true" />

                    <x-cards.onboarding-item :title="__('modules.checklist.accountSetup')"
                        :summary="__('modules.checklist.accountSetupInfo')" completed="true" />

                    <x-cards.onboarding-item :title="__('modules.checklist.companyLogo')"
                        :summary="__('modules.checklist.companyLogoInfo')" :completed="global_setting()->logo"
                        :link="route('theme-settings.index')" />

                    <x-cards.onboarding-item :title="__('modules.checklist.emailSetup')"
                        :summary="__('modules.checklist.configureEmailSetting')" :completed="smtp_setting()->mail_from_email != 'from@email.com'"
                        :link="route('notifications.index')" />

                    <x-cards.onboarding-item :title="__('modules.checklist.crontSetup')"
                        :summary="__('modules.checklist.cronSetupInfo')" :completed="global_setting()->last_cron_run"
                        :link="route('app-settings.index')" />

                    <x-cards.onboarding-item :title="__('modules.checklist.favicon')"
                        :summary="__('modules.checklist.faviconInfo')" :completed="global_setting()->favicon"
                        :link="route('theme-settings.index')" />

                    <x-cards.onboarding-item :title="__('modules.checklist.profileImage')"
                        :summary="__('modules.checklist.profileImageInfo')" :completed="user()->image"
                        :link="route('profile-settings.index')" />

                </x-cards.data>
            </div>
        </div>
    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')

@endpush
