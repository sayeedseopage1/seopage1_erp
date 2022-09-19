@extends('layouts.app')

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

            <div class="col-lg-8 col-md-8 ntfcn-tab-content-left w-100 p-4">
                <div class="row">
                    <div class="col-lg-12">
                        <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="status" fieldId="google_status"
                            fieldValue="active" fieldRequired="true" :checked="$setting->google_calendar_status == 'active'" />
                    </div>
                </div>
                <div class="row google_details mt-3 @if ($setting->google_calendar_status == 'inactive') d-none @endif">
                    <div class="col-lg-12 col-md-12">
                        <x-forms.text
                            :fieldLabel="__('modules.googleCalendar.clientId')"
                            :fieldPlaceholder="__('placeholders.id')" fieldName="google_client_id" fieldId="google_client_id"
                            :fieldValue="$setting->google_client_id"
                            fieldRequired="true" />
                    </div>

                    <div class="col-lg-12">
                        <x-forms.label class="mt-3" fieldId="password" :fieldLabel="__('modules.googleCalendar.clientSecret')"
                            fieldRequired="true">
                        </x-forms.label>
                        <x-forms.input-group>
                            <input type="password" name="google_client_secret" id="google_client_secret"
                                class="form-control height-35 f-14" value="{{ $setting->google_client_secret }}">
                            <x-slot name="preappend">
                                <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                                    class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                        class="fa fa-eye"></i></button>
                            </x-slot>
                        </x-forms.input-group>
                    </div>

                    <div class="col-lg-12 mt-4">
                        <x-forms.label fieldId="" for="mail_from_name" :fieldLabel="__('messages.googleCalendar.AuthorizedredirectURI')" :popover="__('messages.googleCalendar.AuthorizedredirectURIInfoMessage')">
                        </x-forms.label>
                        <p class="text-bold"><span id="google-calendar-link-text">{{ route('googleAuth') }}</span>
                            <a href="javascript:;" class="btn-copy btn-secondary f-12 rounded p-1 py-2 ml-1"
                                data-clipboard-target="#google-calendar-link-text">
                                <i class="fa fa-copy mx-1"></i>@lang('app.copy')</a>
                        </p>
                        <p class="text-primary">(@lang('messages.googleCalendar.addGoogleCalendarUrl'))</p>
                    </div>

                </div>
            </div>

            <div class="col-xl-4 col-lg-12 col-md-12 ntfcn-tab-content-right border-left-grey p-4">
                <h4 class="f-16 text-capitalize f-w-500 text-dark-grey">@lang("messages.googleCalendar.notificationTitle")</h4>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->lead_status == '1'"
                            :fieldLabel="__('app.menu.leads')"
                            fieldName="lead_status" fieldId="lead_status" :fieldValue="$module->lead_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->leave_status == '1'"
                            :fieldLabel="__('app.menu.leaves')"
                            fieldName="leave_status" fieldId="leave_status" :fieldValue="$module->leave_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->invoice_status == '1'"
                            :fieldLabel="__('app.menu.invoices')"
                            fieldName="invoice_status" fieldId="invoice_status" :fieldValue="$module->invoice_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->contract_status == '1'"
                            :fieldLabel="__('app.menu.contracts')"
                            fieldName="contract_status" fieldId="contract_status" :fieldValue="$module->contract_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->task_status == '1'"
                            :fieldLabel="__('app.menu.tasks')"
                            fieldName="task_status" fieldId="task_status" :fieldValue="$module->task_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->event_status == '1'"
                            :fieldLabel="__('app.menu.Events')"
                            fieldName="event_status" fieldId="event_status" :fieldValue="$module->event_status" />
                    </div>
                    <div class="mb-3 d-flex">
                        <x-forms.checkbox :checked="$module->holiday_status == '1'"
                            :fieldLabel="__('app.menu.holiday')"
                            fieldName="holiday_status" fieldId="holiday_status" :fieldValue="$module->holiday_status" />
                    </div>
            </div>

            <x-slot name="action">
                <!-- Buttons Start -->
                <div class="w-100 border-top-grey">
                    <x-setting-form-actions>
                        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
                        </x-forms.button-primary>

                        @if (($setting->google_calendar_status == 'active' && !empty($setting->google_client_id) && !empty($setting->google_client_secret)) && $setting->google_calendar_verification_status == 'non_verified' && empty($setting->token) && empty($setting->name) && empty($setting->google_id))
                            <x-forms.button-secondary class="mr-3" id="verify-google-calendar">
                                @lang('app.verify')
                            </x-forms.button-secondary>
                        @endif

                        @if (($setting->google_calendar_status == 'active' && !empty($setting->google_client_id) && !empty($setting->google_client_secret)) && $setting->google_calendar_verification_status == 'verified' && !empty($setting->token) && !empty($setting->name) && !empty($setting->google_id))
                            <x-forms.button-secondary id="disable-google-calendar" class="mr-3">
                                @lang('app.disable')
                            </x-forms.button-secondary>
                        @endif

                        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
                        </x-forms.button-cancel>
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

        $('#save-form').click(function() {
            $.easyAjax({
                url: "{{ route('google-calendar-settings.store') }}",
                container: '#editSettings',
                blockUI: true,
                type: "POST",
                file: true,
                data: $('#editSettings').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                       window.location.reload();
                    }
                }
            })
        });

        // Show/hide google calendar details
        $(document).on('change', '#google_status', function() {
            $('.google_details').toggleClass('d-none');
        });

        // Show/hide google calendar details
        $(document).on('change', '.form-check-input', function() {
            $(this).is(':checked') ? $(this).val('1') : $(this).val('0');
        });

        $(document).on('click', '#verify-google-calendar', function() {
            window.location.href = "{{ route('googleAuth') }}";
        });

        // Show/hide google calendar details
        $(document).on('click', '#disable-google-calendar', function() {
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.googleCalendar.confirmRemove')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.googleCalendar.yesRemove')",
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
                    var url = "{{ route('googleAuth.destroy') }}";
                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                location.reload();
                            }
                        }
                    });
                }
            });
        });

    </script>
@endpush
