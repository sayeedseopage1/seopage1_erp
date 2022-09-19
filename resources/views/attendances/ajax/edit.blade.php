@php
$editAttendancePermission = user()->permission('add_attendance');
$deleteAttendancePermission = user()->permission('delete_attendance');
@endphp

<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">
        @if ($type == 'edit')
            @lang('app.menu.attendance') @lang('app.details')
        @else
            @lang('app.mark')  @lang('app.menu.attendance')
        @endif
    </h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="row">
        <div class="col-md-12 mb-4">
            <x-employee :user="$attendanceUser" />
        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">

            <h5 class="f-w-500 f-15 d-flex justify-content-between">{{ __('app.date').' - '.\Carbon\Carbon::parse($date)->format(global_setting()->date_format) }} <span class="badge badge-info f-14" style="background-color: {{ $attendanceSettings->color }}">{{ $attendanceSettings->shift_name }}</span></h5>

            @if ($total_clock_in < $maxAttendanceInDay || $type == 'edit')
                <x-form id="attendance-container">
                    <input type="hidden" name="attendance_date" value="{{ $date }}">
                    <input type="hidden" name="user_id" value="{{ $userid }}">
                    @if ($type == 'edit')
                        @method('PUT')
                    @endif

                    <div class="row">

                        <div class="col-lg-4 col-md-6">
                            <div class="bootstrap-timepicker timepicker">
                                <x-forms.text class="a-timepicker" :fieldLabel="__('modules.attendance.clock_in')"
                                    :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_in_time"
                                    fieldId="clock-in-time" fieldRequired="true"
                                    :fieldValue="(!is_null($row->clock_in_time)) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $row->clock_in_time)->timezone(global_setting()->timezone)->format(global_setting()->time_format) : ''" />
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                            <x-forms.text class="a-timepicker" :fieldLabel="__('modules.attendance.clock_in_ip')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_in_ip"
                                fieldId="clock-in-ip" :fieldValue="$row->clock_in_ip ?? request()->ip()" />
                        </div>

                        @if ($row->total_clock_in == 0)
                            <div class="col-lg-4 col-md-6">
                                <x-forms.toggle-switch class="mr-0 mr-lg-2 mr-md-2" :checked="($row->late == 'yes')"
                                    :fieldLabel="__('modules.attendance.late')" fieldName="late" fieldId="lateday" />
                            </div>
                        @elseif ($row->late == 'yes')
                            <div class="col-lg-2 col-md-6 mt-5">
                                <span class="badge badge-secondary">@lang('modules.attendance.late')</span>
                            </div>
                        @endif

                    </div>

                    <div class="row">

                        <div class="col-lg-4 col-md-6">
                            <div class="bootstrap-timepicker timepicker">
                                <x-forms.text :fieldLabel="__('modules.attendance.clock_out')"
                                    :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_out_time"
                                    fieldId="clock-out"
                                    :fieldValue="(!is_null($row->clock_out_time)) ? \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $row->clock_out_time)->timezone(global_setting()->timezone)->format(global_setting()->time_format) : ''" />
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-4">
                            <x-forms.text :fieldLabel="__('modules.attendance.clock_out_ip')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_out_ip"
                                :fieldId="'clock-out-ip-'.$row->id"
                                :fieldValue="$row->clock_out_ip ?? request()->ip()" />
                        </div>

                        @if ($row->total_clock_in == 0)
                            <div class="col-lg-2 col-md-6">
                                <x-forms.toggle-switch class="mr-0 mr-lg-2 mr-md-2" :checked="($row->half_day == 'yes')"
                                    :fieldLabel="__('modules.attendance.halfDay')" fieldName="halfday"
                                    fieldId="halfday" />
                            </div>
                        @elseif ($row->half_day == 'yes')
                            <div class="col-lg-2 col-md-6 mt-5">
                                <span class="badge badge-secondary">@lang('app.halfday')</span>
                            </div>
                        @endif

                    </div>

                    <div class="row">

                        <div class="col-lg-4 col-md-6">
                            <x-forms.select fieldId="location" :fieldLabel="__('app.location')" fieldName="location"
                            search="true">
                                @foreach ($location as $locations)
                                    <option @if (($row->location_id == $locations->id) || (is_null($row->location_id) && $locations->is_default == 1)) selected @endif value="{{ $locations->id }}">
                                        {{ mb_ucwords($locations->location) }}</option>
                                @endforeach
                            </x-forms.select>
                        </div>

                        <div class="col-lg-4 col-md-6">
                            <x-forms.select fieldId="work_from_type" :fieldLabel="__('modules.attendance.working_from')" fieldName="work_from_type" fieldRequired="true"
                            search="true" >
                                <option @if ($row->work_from_type == 'office') selected @endif value="office">@lang('modules.attendance.office')</option>
                                <option @if ($row->work_from_type == 'home') selected @endif value="home">@lang('modules.attendance.home')</option>
                                <option @if ($row->work_from_type == 'other') selected @endif value="other">@lang('modules.attendance.other')</option>
                            </x-forms.select>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-lg-4 col-md-6"  id="otherPlace" style="display:none">
                            <x-forms.text fieldId="working_from" :fieldLabel="__('modules.attendance.otherPlace')" fieldName="working_from" fieldRequired="true" >
                            </x-forms.text>
                        </div>
                    </div>
                </x-form>
            @else
                <div class="alert alert-info">@lang('modules.attendance.maxColckIn')</div>
            @endif
        </div>
    </div>

</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
    <x-forms.button-primary id="save-attendance" icon="check">@lang('app.save')</x-forms.button-primary>
</div>

<script>
    $('.select-picker').selectpicker();

    $(document).ready(function() {
        $('#clock-in-time').timepicker({
            @if(global_setting()->time_format == 'H:i')
            showMeridian: false,
            @endif
            minuteStep: 1
        });
        $('#clock-out').timepicker({
            @if(global_setting()->time_format == 'H:i')
            showMeridian: false,
            @endif
            minuteStep: 1,
            defaultTime: false
        });

        $('#work_from_type').change(function(){
            ($(this).val() == 'other') ? $('#otherPlace').show() : $('#otherPlace').hide();
        });

        $('#save-attendance').click(function () {
            @if($type == 'edit')
                var url = "{{route('attendances.update', $row->id)}}";
            @else
                var url = "{{route('attendances.store')}}";
            @endif
            $.easyAjax({
                url: url,
                type: "POST",
                container: '#attendance-container',
                blockUI: true,
                disableButton: true,
                buttonSelector: "#save-attendance",
                data: $('#attendance-container').serialize(),
                success: function (response) {
                    if(response.status == 'success'){
                        showTable();
                        $(MODAL_XL).modal('hide');
                        $(MODAL_LG).modal('hide');
                    }
                }
            })
        });
    });


</script>
