<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    @method('PUT')
    <div class="row">

        <div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4">
            @method('PUT')
            <div class="row">
                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :popover="__('modules.accountSettings.sendReminderInfo')"
                        :fieldLabel="__('modules.accountSettings.sendReminder')" fieldName="send_reminder"
                        fieldId="send_reminder" fieldValue="active" fieldRequired="true"
                        :checked="$projectSetting->send_reminder == 'yes'" />
                </div>
            </div>

            <div id="send_reminder_div" class="row @if ($projectSetting->send_reminder == 'no') d-none @endif">

                <div class="col-lg-6">
                    <div class="form-group my-3">
                        <label class="f-14 text-dark-grey mb-12 w-100"
                            for="usr">@lang('modules.projectSettings.sendNotificationsTo')</label>
                        <div class="d-block d-lg-flex d-md-flex">
                            <x-forms.radio fieldId="send_reminder_admin" :fieldLabel="__('modules.messages.admins')"
                                fieldName="remind_to" fieldValue="admins" checked="true">
                            </x-forms.radio>

                            <x-forms.radio fieldId="send_reminder_member" :fieldLabel="__('modules.messages.members')"
                                fieldName="remind_to" fieldValue="members"
                                :checked="(in_array('members', $projectSetting->remind_to)) ? 'checked' : ''">
                            </x-forms.radio>

                            <x-forms.radio fieldId="send_reminder_all" :fieldLabel="__('app.all')" fieldName="remind_to"
                                fieldValue="all"
                                :checked="(in_array('members', $projectSetting->remind_to) && in_array('admins', $projectSetting->remind_to)) ? 'checked' : ''">
                            </x-forms.radio>
                        </div>
                    </div>
                </div>

                <div class="col-lg-4">
                    <x-forms.label class="mt-3" fieldId="remind_time" fieldRequired="true"
                        :fieldLabel="__('modules.events.remindBefore')">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="number" value="{{ $projectSetting->remind_time }}" name="remind_time"
                            id="remind_time" class="form-control height-35 f-14" min="0">
                        <x-slot name="append">
                            <span
                                class="input-group-text height-35 bg-white border-grey">{{ $projectSetting->remind_type }}</span>
                        </x-slot>
                    </x-forms.input-group>
                    <input type="hidden" name="remind_type" value="{{ $projectSetting->remind_type }}">
                </div>


            </div>
        </div>
    </div>
</div>
<!-- Buttons Start -->
<div class="w-100 border-top-grey">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-form" class="mr-3" icon="check">@lang('app.save')
        </x-forms.button-primary>

        <x-forms.button-cancel :link="url()->previous()" class="border-0">@lang('app.cancel')
        </x-forms.button-cancel>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->

<script>
    $('#send_reminder').on('change', function() {
        $('#send_reminder_div').toggleClass('d-none');
    });

    $('#save-form').click(function() {
        var url = "{{ route('project-settings.update', ['1']) }}";
        $.easyAjax({
            url: url,
            container: '#editSettings',
            type: "POST",
            redirect: true,
            disableButton: true,
            blockUI: true,
            data: $('#editSettings').serialize(),
            buttonSelector: "#save-form",
        })
    });
</script>
