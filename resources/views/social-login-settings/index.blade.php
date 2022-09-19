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

            <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-20">
                @method('PUT')
                @include('sections.password-autocomplete-hide')
                <div class="row">

                    {{-- GOOGLE CREDENTIALS --}}
                    <div class="col-md-12">
                        <h4 class="mb-3 f-21 font-weight-normal text-capitalize">
                            <i class="fab fa-google"></i> @lang('app.socialAuthSettings.google')
                        </h4>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="google_status" fieldId="googleButton"
                            fieldValue="enable" fieldRequired="true" :checked="$credentials->google_status == 'enable'" />
                    </div>

                    <div class="col-lg-12 googleSection @if ($credentials->google_status !== 'enable') d-none @endif">
                        <div class="row">
                            <div class="col-lg-6">
                                <x-forms.text :fieldLabel="__('app.socialAuthSettings.googleClientId')"
                                    fieldName="google_client_id" fieldRequired="true" fieldId="google_client_id"
                                    :fieldValue="$credentials->google_client_id"></x-forms.text>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <x-forms.label class="mt-3" fieldId="password" fieldRequired="true"
                                        :fieldLabel="__('app.socialAuthSettings.googleSecret')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <input type="password" name="google_secret_id" id="google_secret_id"
                                            class="form-control height-35 f-14"
                                            value="{{ $credentials->google_secret_id }}">

                                        <x-slot name="preappend">
                                            <button type="button" data-toggle="tooltip"
                                                data-original-title="{{ __('messages.viewKey') }}"
                                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                                    class="fa fa-eye"></i></button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <label for="mail_from_name">@lang('app.callback')</label>
                                    <p class="text-bold"><span
                                            id="google_webhook_link">{{ route('social_login_callback', 'google') }}</span>
                                        <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                                            data-clipboard-target="#google_webhook_link">
                                            <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
                                    </p>
                                    <p class="text-primary">(@lang('messages.addGoogleCallback'))</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- GOOGLE CREDENTIALS --}}

                    {{-- FACEBOOK CREDENTIALS --}}
                    <div class="col-md-12 mt-5">
                        <h4 class="mb-3 f-21 font-weight-normal text-capitalize">
                            <i class="fab fa-facebook"></i> @lang('app.socialAuthSettings.facebook')
                        </h4>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="facebook_status"
                            fieldId="facebookButton" fieldValue="enable" fieldRequired="true"
                            :checked="$credentials->facebook_status == 'enable'" />
                    </div>

                    <div class="col-lg-12 facebookSection @if ($credentials->facebook_status !== 'enable') d-none @endif">
                        <div class="row">
                            <div class="col-lg-6">
                                <x-forms.text :fieldLabel="__('app.socialAuthSettings.facebookClientId')"
                                    fieldName="facebook_client_id" fieldId="facebook_client_id" fieldRequired="true"
                                    :fieldValue="$credentials->facebook_client_id"></x-forms.text>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <x-forms.label class="mt-3" fieldId="password" fieldRequired="true"
                                        :fieldLabel="__('app.socialAuthSettings.facebookSecret')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <input type="password" name="facebook_secret_id" id="facebook_secret_id"
                                            class="form-control height-35 f-14"
                                            value="{{ $credentials->facebook_secret_id }}">

                                        <x-slot name="preappend">
                                            <button type="button" data-toggle="tooltip"
                                                data-original-title="{{ __('messages.viewKey') }}"
                                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                                    class="fa fa-eye"></i></button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <label for="mail_from_name">@lang('app.callback')</label>
                                    <p class="text-bold"><span
                                            id="facebook_webhook_link">{{ route('social_login_callback', 'facebook') }}</span>
                                        <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                                            data-clipboard-target="#facebook_webhook_link">
                                            <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
                                    </p>
                                    <p class="text-primary">(@lang('messages.addFacebookCallback'))</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- FACEBOOK CREDENTIALS --}}

                    {{-- LINKEDIN CREDENTIALS --}}
                    <div class="col-md-12 mt-5">
                        <h4 class="mb-3 f-21 font-weight-normal text-capitalize">
                            <i class="fab fa-linkedin"></i> @lang('app.socialAuthSettings.linkedin')
                        </h4>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="linkedin_status"
                            fieldId="linkedinButton" fieldValue="enable" fieldRequired="true"
                            :checked="$credentials->linkedin_status == 'enable'" />
                    </div>

                    <div class="col-lg-12 linkedinSection @if ($credentials->linkedin_status !== 'enable') d-none @endif">
                        <div class="row">
                            <div class="col-lg-6">
                                <x-forms.text :fieldLabel="__('app.socialAuthSettings.linkedinClientId')"
                                    fieldName="linkedin_client_id" fieldId="linkedin_client_id" fieldRequired="true"
                                    :fieldValue="$credentials->linkedin_client_id"></x-forms.text>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <x-forms.label class="mt-3" fieldId="password" fieldRequired="true"
                                        :fieldLabel="__('app.socialAuthSettings.linkedinSecret')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <input type="password" name="linkedin_secret_id" id="linkedin_secret_id"
                                            class="form-control height-35 f-14"
                                            value="{{ $credentials->linkedin_secret_id }}">
                                        <x-slot name="preappend">
                                            <button type="button" data-toggle="tooltip"
                                                data-original-title="{{ __('messages.viewKey') }}"
                                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                                    class="fa fa-eye"></i></button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <label for="mail_from_name">@lang('app.callback')</label>
                                    <p class="text-bold"><span
                                            id="linkdin_webhook_url">{{ route('social_login_callback', 'linkedin') }}</span>
                                        <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                                            data-clipboard-target="#linkdin_webhook_url">
                                            <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
                                    </p>
                                    <p class="text-primary">(@lang('messages.addLinkedinCallback'))</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- LINKEDIN CREDENTIALS --}}

                    {{-- TWITTER CREDENTIALS --}}
                    <div class="col-md-12 mt-5">
                        <h4 class="mb-3 f-21 font-weight-normal text-capitalize">
                            <i class="fab fa-twitter"></i> @lang('app.socialAuthSettings.twitter')
                        </h4>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="twitter_status" fieldId="twitterButton"
                            fieldValue="enable" fieldRequired="true" :checked="$credentials->twitter_status == 'enable'" />
                    </div>

                    <div class="col-lg-12 twitterSection @if ($credentials->twitter_status !== 'enable') d-none @endif">
                        <div class="row">
                            <div class="col-lg-6">
                                <x-forms.text :fieldLabel="__('app.socialAuthSettings.twitterClientId')"
                                    fieldName="twitter_client_id" fieldRequired="true" fieldId="twitter_client_id"
                                    :fieldValue="$credentials->twitter_client_id">
                                </x-forms.text>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <x-forms.label class="mt-3" fieldId="password" fieldRequired="true"
                                        :fieldLabel="__('app.socialAuthSettings.twitterSecret')">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <input type="password" name="twitter_secret_id" id="twitter_secret_id"
                                            class="form-control height-35 f-14"
                                            value="{{ $credentials->twitter_secret_id }}">
                                        <x-slot name="preappend">
                                            <button type="button" data-toggle="tooltip"
                                                data-original-title="{{ __('messages.viewKey') }}"
                                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                                    class="fa fa-eye"></i></button>
                                        </x-slot>
                                    </x-forms.input-group>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group my-3">
                                    <label for="mail_from_name">@lang('app.callback')</label>
                                    <p class="text-bold"><span
                                            id="twitter_webhook_url">{{ route('social_login_callback', 'twitter') }}</span>
                                        <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                                            data-clipboard-target="#twitter_webhook_url">
                                            <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
                                    </p>
                                    <p class="text-primary">(@lang('messages.addTwitterCallback'))</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- TWITTER CREDENTIALS --}}

                </div> {{-- end of form row --}}
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </x-setting-form-actions>
                    {{-- <div class="d-block d-lg-none d-md-none p-4">
                        <div class="d-flex w-100">
                            <x-forms.button-primary class="mr-3 w-100" icon="check">@lang('app.save')
                            </x-forms.button-primary>
                        </div>
                        <x-forms.button-cancel :link="url()->previous()" class="w-100 mt-3">@lang('app.cancel')
                        </x-forms.button-cancel>
                    </div> --}}
                </div>
                <!-- Buttons End -->
            </x-slot>

        </x-setting-card>

    </div>
    <!-- SETTINGS END -->
@endsection

@push('scripts')
    <script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>

    <script>
        var clipboard = new ClipboardJS('.btn-copy');

        clipboard.on('success', function(e) {
            Swal.fire({
                icon: 'success',
                text: '@lang("app.webhookUrlCopied")',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
            })
        });


        // show/hide google details section
        $('#googleButton').on('change', function() {
            $('.googleSection').toggleClass('d-none');
        });

        // show/hide facebook details section
        $('#facebookButton').on('change', function() {
            $('.facebookSection').toggleClass('d-none');
        });

        // show/hide twitter details section
        $('#twitterButton').on('change', function() {
            $('.twitterSection').toggleClass('d-none');
        });

        // show/hide linkedin details section
        $('#linkedinButton').on('change', function() {
            $('.linkedinSection').toggleClass('d-none');
        });

        $('#save-form').click(function() {
            var url = "{{ route('social-auth-settings.update', $credentials->id) }}";
            $.easyAjax({
                url: url,
                type: "POST",
                redirect: true,
                disableButton: true,
                blockUI: true,
                container: '#editSettings',
                data: $('#editSettings').serialize()
            })
        });
    </script>
@endpush
