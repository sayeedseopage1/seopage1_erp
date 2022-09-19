<div class="col-lg-12 col-md-12 ntfcn-tab-content-left w-100 p-4 ">
    @method('PUT')
    <div class="row">

        <div class="col-lg-12">
            <div class="row mt-3">

                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.allowShiftChange')" fieldName="allow_shift_change"
                        fieldId="allow_shift_change" fieldValue="yes" fieldRequired="true" :checked="$attendanceSetting->allow_shift_change" />
                </div>

                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.saveCurrentLocation')" fieldName="save_current_location"
                        fieldId="save_current_location" fieldValue="yes" fieldRequired="true" :checked="$attendanceSetting->save_current_location" />
                </div>

                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.allowSelfClock')" fieldName="employee_clock_in_out"
                        fieldId="employee_clock_in_out" fieldValue="yes" fieldRequired="true" :checked="$attendanceSetting->employee_clock_in_out == 'yes'" />
                </div>

                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.autoClockIn')" fieldName="auto_clock_in"
                        fieldId="auto_clock_in" fieldValue="yes" :checked="$attendanceSetting->auto_clock_in == 'yes'" />
                </div>

                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.checkForRadius')" fieldName="radius_check" fieldId="radius_check" fieldValue="yes"
                        fieldRequired="true" :checked="$attendanceSetting->radius_check == 'yes'" />
                </div>

                <div class="col-lg-12 @if ($attendanceSetting->radius_check == 'no') d-none @endif " id="radiusBox">
                    <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.attendance.radius')" fieldName="radius" fieldId="radius"
                        :fieldValue="$attendanceSetting->radius" />
                </div>


                <div class="col-lg-12 mb-2">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.showClockIn')" fieldName="show_clock_in_button"
                        fieldId="show_clock_in_button" fieldValue="yes" fieldRequired="flase"  :checked="$attendanceSetting->show_clock_in_button == 'yes'"/>
                </div>

                <div class="col-lg-12 mb-1">
                    <x-forms.checkbox :fieldLabel="__('modules.attendance.checkForIp')" fieldName="ip_check" fieldId="ip_check" fieldValue="yes"
                        fieldRequired="true" :checked="$attendanceSetting->ip_check == 'yes'" />
                </div>

                <div class="col-lg-12 @if ($attendanceSetting->ip_check == 'no') d-none @endif " id="ipBox">
                    <div id="addMoreBox1" class="row">
                        @forelse($ipAddresses as $index => $ipAddress)
                            <div class="col-md-5">
                                <div class="form-group" id="occasionBox">
                                    <input class="form-control height-35 f-14" type="text" value="{{ $ipAddress }}"
                                        name="ip[{{ $index }}]"
                                        placeholder="{{ __('modules.attendance.ipAddress') }}" />
                                    <div id="errorOccasion"></div>
                                </div>
                            </div>
                        @empty
                            <div class="col-md-5">
                                <div class="form-group" id="occasionBox">
                                    <x-forms.text fieldLabel="" :fieldPlaceholder="__('modules.attendance.ipAddress')" fieldName="ip[0]" fieldId="ip[0]" />
                                    <div id="errorOccasion"></div>
                                </div>
                            </div>
                        @endforelse
                        <div class="col-md-1"></div>
                    </div>
                    <div id="insertBefore"></div>
                    <div class="clearfix"></div>
                    <a href="javascript:;" id="plusButton" class="text-capitalize"><i class="f-12 mr-2 fa fa-plus"></i>
                        @lang('app.add') @lang('modules.attendance.ipAddress') </a>
                </div>

            </div>
        </div>

        <div class="col-lg-4">
            <x-forms.select :fieldLabel="__('modules.attendance.weekStartFrom')" fieldName="week_start_from" fieldId="week_start_from"
                fieldRequired="true">
                <option value="0" {{ $attendanceSetting->week_start_from == '0' ? 'selected' : '' }}>
                    @lang('app.sunday')</option>
                <option value="1" {{ $attendanceSetting->week_start_from == '1' ? 'selected' : '' }}>
                    @lang('app.monday')</option>
                <option value="2" {{ $attendanceSetting->week_start_from == '2' ? 'selected' : '' }}>
                    @lang('app.tuesday')</option>
                <option value="3" {{ $attendanceSetting->week_start_from == '3' ? 'selected' : '' }}>
                    @lang('app.wednesday')</option>
                <option value="4" {{ $attendanceSetting->week_start_from == '4' ? 'selected' : '' }}>
                    @lang('app.thursday')</option>
                <option value="5" {{ $attendanceSetting->week_start_from == '5' ? 'selected' : '' }}>
                    @lang('app.friday')</option>
                <option value="6" {{ $attendanceSetting->week_start_from == '6' ? 'selected' : '' }}>
                    @lang('app.saturday')</option>
            </x-forms.select>
        </div>


        <div class="col-lg-4">
            <x-forms.toggle-switch class="mr-0 mr-lg-12" :checked="$attendanceSetting->alert_after_status" :fieldLabel="__('modules.attendance.attendanceReminderStatus')"
                fieldName="alert_after_status" fieldId="alert_after_status" />
        </div>

        <div class="col-lg-4 alert_after_box @if ($attendanceSetting->alert_after_status == 0) d-none @endif">
            <x-forms.number class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('modules.attendance.ReminderAfterMinutes')" fieldName="alert_after"
                fieldId="alert_after" :fieldValue="$attendanceSetting->alert_after" fieldRequired="true" />
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
    $('#ipBox').on('click', '.delete-ip-field', function() {
        var ipIndex = $(this).data('ip-index');
        $('#addMoreBox' + ipIndex).remove();
    });
    var $insertBefore = $('#insertBefore');
    var $i = {{ count($ipAddresses) }};

    $('#save-form').click(function() {
        $.easyAjax({
            url: "{{ route('attendance-settings.update', ['1']) }}",
            container: '#editSettings',
            disableButton: true,
            blockUI: true,
            buttonSelector: "#save-form",
            type: "POST",
            redirect: true,
            data: $('#editSettings').serialize()
        })
    });

    $('#employee_clock_in_out').click(function() {
        if ($(this).prop("checked") == true) {
            $('#radius_check').removeAttr("disabled");
            $('#ip_check').removeAttr("disabled");
        } else if ($(this).prop("checked") == false) {
            if ($('#radius_check').prop("checked") == true) {
                $('#radius_check').trigger('click');
            }
            if ($('#ip_check').prop("checked") == true) {
                $('#ip_check').trigger('click');
            }

            $('#radius_check').attr("disabled", 'disabled');
            $('#ip_check').attr("disabled", 'disabled');
        }
    });

    $('#radius_check').click(function() {
        $('#radiusBox').toggleClass('d-none');
    });

    $('#ip_check').click(function() {
        $('#ipBox').toggleClass('d-none');
    });

    // Add More Inputs
    $('#plusButton').click(function() {
        $i = $i + 1;
        var indexs = $i + 1;
        $(`<div id="addMoreBox${indexs}" class="row clearfix"><div class="col-md-5"><div class="form-group"><input class="form-control height-35 f-14" name="ip[${$i}]" type="text" value="" placeholder="@lang('modules.attendance.ipAddress')"/></div></div><div class="col-md-1"><div class="task_view mt-1"> <a href="javascript:;" data-ip-index="${indexs}" class="delete-ip-field task_view_more d-flex align-items-center justify-content-center dropdown-toggle" > <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')</a> </div></div></div>`)
            .insertBefore($insertBefore);
    });

    // Remove fields
    function removeBox(index) {
        $('#addMoreBox' + index).remove();
    }


    $('#alert_after_status').click(function() {
        $('.alert_after_box').toggleClass('d-none');
    })
</script>
