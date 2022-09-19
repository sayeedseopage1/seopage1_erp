<div class="col-xl-8 col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    @include('sections.password-autocomplete-hide')

    <div class="row">
        <div class="col-lg-12">
            <x-forms.checkbox :fieldLabel="__('app.status')" fieldName="status" fieldId="pusher_status"
                fieldValue="active" fieldRequired="true" :checked="$pusherSettings->status == 1" />
        </div>

        <div class="col-lg-12 pusher_details @if ($pusherSettings->status == 0) d-none @endif">
            <div class="row mt-3">

                <div class="col-lg-6 col-md-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.pusher.appId')" fieldRequired="true"
                        :fieldPlaceholder="__('placeholders.id')" fieldName="pusher_app_id" fieldId="pusher_app_id"
                        :fieldValue="$pusherSettings->pusher_app_id" />
                </div>

                <div class="col-lg-6 col-md-6">
                    <x-forms.label class="mt-3" fieldId="pusher_app_key" fieldRequired="true"
                        :fieldLabel="__('app.pusher.appKey')">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="password" name="pusher_app_key" id="pusher_app_key" autocomplete="off"
                            class="form-control height-35 f-14" value="{{ $pusherSettings->pusher_app_key }}">
                        <x-slot name="append">
                            <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                    class="fa fa-eye"></i></button>
                        </x-slot>
                    </x-forms.input-group>
                </div>

                <div class="col-lg-6 col-md-6">
                    <x-forms.label class="mt-3" fieldId="pusher_app_secret" fieldRequired="true"
                        :fieldLabel="__('app.pusher.appSecret')">
                    </x-forms.label>
                    <x-forms.input-group>
                        <input type="password" name="pusher_app_secret" id="pusher_app_secret" autocomplete="off"
                            class="form-control height-35 f-14" value="{{ $pusherSettings->pusher_app_secret }}">
                        <x-slot name="append">
                            <button type="button" data-toggle="tooltip" data-original-title="@lang('app.viewPassword')"
                                class="btn btn-outline-secondary border-grey height-35 toggle-password"><i
                                    class="fa fa-eye"></i></button>
                        </x-slot>
                    </x-forms.input-group>
                </div>

                <div class="col-lg-6 col-md-6">
                    <x-forms.text class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.pusher.appCluster')"
                        fieldRequired="true" :fieldPlaceholder="__('placeholders.cluster')" fieldName="pusher_cluster"
                        fieldId="pusher_cluster" :fieldValue="$pusherSettings->pusher_cluster" />
                </div>

                <div class="col-lg-6 col-md-6">
                    <x-forms.select fieldId="force_tls" :fieldLabel="__('app.pusher.forceTLS')" fieldName="force_tls">
                        <option value="0" @if ($pusherSettings->force_tls == '0') selected @endif>@lang('app.false')</option>
                        <option value="1" @if ($pusherSettings->force_tls == '1') selected @endif>@lang('app.true')</option>
                    </x-forms.select>
                </div>

            </div>
        </div>

    </div>
</div>
<div class="col-xl-4 col-lg-12 col-md-12 ntfcn-tab-content-right border-left-grey p-4">
    <h4 class="f-16 text-capitalize f-w-500 text-dark-grey">@lang("modules.pusher.notificationTitle")</h4>
    <div class="mb-3 d-flex">
        <x-forms.checkbox :checked="$pusherSettings->taskboard" :fieldLabel="__('modules.tasks.taskBoard')"
            fieldName="taskboard" fieldId="taskboard_broadcast" fieldValue="1" />
    </div>
    <div class="mb-3 d-flex">
        <x-forms.checkbox :checked="$pusherSettings->messages" :fieldLabel="__('app.menu.messages')"
            fieldName="messages" fieldId="messages_broadcast" fieldValue="1" />
    </div>
</div>

<!-- Buttons Start -->
<div class="w-100 border-top-grey set-btns">
    <x-setting-form-actions>
        <x-forms.button-primary id="save-pusher-form" icon="check">@lang('app.save')</x-forms.button-primary>
    </x-setting-form-actions>
</div>
<!-- Buttons End -->

<script>
    $('body').on('click', '#save-pusher-form', function() {
        var url = "{{ route('pusher-settings.update', $pusherSettings->id) }}";

        $.easyAjax({
            url: url,
            type: "POST",
            container: "#editSettings",
            blockUI: true,
            data: $('#editSettings').serialize(),
        })
    });

    // show/hide pusher detail
</script>
