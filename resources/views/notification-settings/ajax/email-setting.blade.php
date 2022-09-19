<div class="col-xl-8 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">

    <div class="row">
        <div class="col-sm-12" id="alert">
            @if ($smtpSetting->mail_driver == 'smtp')
                @if ($smtpSetting->verified)
                    <x-alert type="success" icon="info-circle">
                        @lang('messages.smtpSuccess')
                    </x-alert>
                @else
                    <x-alert type="danger" icon="info-circle">
                        @lang('messages.smtpError')
                    </x-alert>
                @endif
            @endif
        </div>
    </div>

    <div class="row">
        @include('sections.password-autocomplete-hide')

        <div class="col-lg-6 col-md-6 ">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.emailSettings.mailFrom')"
                          fieldRequired="true" :fieldPlaceholder="__('placeholders.name')" fieldName="mail_from_name"
                          fieldId="mail_from_name" :fieldValue="$smtpSetting->mail_from_name"/>
        </div>

        <div class="col-lg-6 col-md-6 ">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.emailSettings.mailFromEmail')"
                          fieldRequired="true" :fieldPlaceholder="__('placeholders.email')" fieldName="mail_from_email"
                          fieldId="mail_from_email" :fieldValue="$smtpSetting->mail_from_email"/>
        </div>

        <div class="col-lg-6 col-md-6 ">
            <x-forms.select fieldId="mail_connection" :fieldLabel="__('modules.emailSettings.mailConnection')"
                            fieldName="mail_connection" :popover="__('modules.emailSettings.mailConnectionInfo')">
                <option @if ($smtpSetting->mail_connection == 'sync') selected @endif value="sync">
                    No
                </option>
                <option @if ($smtpSetting->mail_connection == 'database') selected @endif value="database">
                    Yes
                </option>
            </x-forms.select>
        </div>

        <div class="col-lg-6 col-md-6 form-group my-3">
            <label class="f-14 text-dark-grey mb-12 w-100" for="usr">@lang('modules.emailSettings.mailDriver')</label>
            <div class="d-flex">
                <x-forms.radio fieldId="mail_driver-mail" fieldLabel="Mail" fieldName="mail_driver" fieldValue="mail"
                               checked="true" :checked="($smtpSetting->mail_driver == 'mail') ? 'checked' : ''">
                </x-forms.radio>
                <x-forms.radio fieldId="mail_driver-smtp" fieldLabel="SMTP" fieldValue="smtp" fieldName="mail_driver"
                               :checked="($smtpSetting->mail_driver == 'smtp') ? 'checked' : ''">
                </x-forms.radio>
            </div>

        </div>
        <div class="col-lg-12 mail_div">
            <x-alert type="info" icon="info-circle">
                {!!  __('messages.mailSettingSelectMessage') !!}
            </x-alert>
        </div>
        <div class="col-lg-12 col-md-6 smtp_div">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.emailSettings.mailHost')"
                          fieldRequired="true" fieldPlaceholder="" fieldName="mail_host" fieldId="mail_host"
                          :fieldValue="$smtpSetting->mail_host"/>
        </div>

        <div class="col-lg-6 col-md-6 smtp_div">
            <x-forms.text :fieldLabel="__('modules.emailSettings.mailPort')" fieldRequired="true" fieldPlaceholder=""
                          fieldName="mail_port" fieldId="mail_port" :fieldValue="$smtpSetting->mail_port"/>
        </div>

        <div class="col-lg-6 col-md-6 smtp_div">
            <x-forms.select fieldId="mail_encryption" :fieldLabel="__('modules.emailSettings.mailEncryption')"
                            fieldName="mail_encryption">
                <option @if ($smtpSetting->mail_encryption == 'tls') selected @endif>
                    tls
                </option>
                <option @if ($smtpSetting->mail_encryption == 'ssl') selected @endif>
                    ssl
                </option>
                <option value="null" @if ($smtpSetting->mail_encryption == null) selected @endif>
                    none
                </option>
            </x-forms.select>
        </div>

        <div class="col-lg-6 col-md-6 smtp_div">
            <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.emailSettings.mailUsername')"
                          fieldRequired="true" :fieldPlaceholder="__('placeholders.email')" fieldName="mail_username"
                          fieldId="mail_username" :fieldValue="$smtpSetting->mail_username"/>
        </div>

        <div class="col-lg-6 col-md-6 smtp_div">
            <x-forms.label class="mt-3" fieldId="mail_password"
                           :fieldLabel="__('modules.emailSettings.mailPassword')"/>
            <x-forms.input-group>
                <input type="password" name="mail_password" id="mail_password"
                       value="{{ $smtpSetting->mail_password }}"
                       placeholder="@lang('modules.emailSettings.mailPassword')" class="form-control height-35 f-14"/>
                <x-slot name="preappend">
                    <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                            class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                            class="fa fa-eye"></i></button>
                </x-slot>
            </x-forms.input-group>
        </div>

    </div>
</div>
<div class="col-xl-4 col-lg-12 col-md-12 ntfcn-tab-content-right border-left-grey p-4">
    <h4 class="f-16 text-capitalize f-w-500 text-dark-grey">@lang("modules.emailSettings.notificationTitle")</h4>
    @foreach ($emailSettings as $emailSetting)
        <div class="mb-3 d-flex">
            <x-forms.checkbox :checked="$emailSetting->send_email == 'yes'"
                              :fieldLabel="__('modules.emailNotification.'.str_slug($emailSetting->setting_name))"
                              fieldName="send_email[]" :fieldId="'send_email_'.$emailSetting->id"
                              :fieldValue="$emailSetting->id"/>
        </div>
    @endforeach
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey set-btns">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-email-form" class="mr-3" icon="check">@lang('app.save')
        </x-forms.button-primary>

        <x-forms.button-secondary id="send-test-email" icon="location-arrow">
            @lang('modules.emailSettings.sendTestEmail')</x-forms.button-secondary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->

<script>
    $('body').on('click', 'input[name=mail_driver]', function () {
        const driver = $(this).val();
        if (driver === 'mail') {
            $('.smtp_div,#alert').hide();
            $('.mail_div').show();
        } else {
            $('.smtp_div,#alert').show();
            $('.mail_div').hide();
        }
    });

    $('body').on('click', '#save-email-form', function () {
        const url = "{{ route('smtp-settings.update', $smtpSetting->id) }}";

        $.easyAjax({
            url: url,
            type: "POST",
            container: '#editSettings',
            blockUI: true,
            messagePosition: "inline",
            data: $('#editSettings').serialize(),
            success: function (response) {
                if (response.status == 'error') {
                    $('#alert').prepend(
                        '<div class="alert alert-danger">{{ __('messages.smtpError') }}</div>'
                    )
                } else {
                    $('#alert').show();
                }
            }
        })
    });

    $('body').on('click', '#send-test-email', function () {
        const url = "{{ route('smtp_settings.show_send_test_mail_modal') }}";
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });
</script>
<script>
    @if ($smtpSetting->mail_driver == 'mail')
    $('.smtp_div').hide();
    @else
    $('.mail_div').hide();
    @endif
</script>
