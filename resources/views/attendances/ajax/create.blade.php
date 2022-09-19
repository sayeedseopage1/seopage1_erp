<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-datepicker3.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-attendance-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.menu.attendance') @lang('app.details')</h4>
                <div class="row p-20">

                    <div class="col-lg-3 col-md-6">
                        <x-forms.select fieldId="department_id" :fieldLabel="__('app.department')"
                            fieldName="department_id" search="true">
                            <option value="0">--</option>
                            @foreach ($departments as $team)
                                <option value="{{ $team->id }}">{{ mb_ucwords($team->team_name) }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-md-9">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectEmployee" :fieldLabel="__('app.menu.employees')"
                                fieldRequired="true">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                    id="selectEmployee" data-live-search="true" data-size="8">
                                    @foreach ($employees as $item)
                                        <option
                                            data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}</span>"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>

                </div>
                <div class="row px-4 pb-4">

                    <div class="col-lg-3 col-md-6">
                        <x-forms.select fieldId="location" :fieldLabel="__('app.location')" fieldName="location"
                        search="true">
                            @foreach ($location as $locations)
                                <option @if ($locations->is_default == 1) selected @endif value="{{ $locations->id }}">
                                    {{ mb_ucwords($locations->location) }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="mark_attendance_by_month" :fieldLabel="__('modules.attendance.markAttendance'). ' ' . __('app.by')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="mark_attendance_by_month" :fieldLabel="__('app.month')" fieldName="mark_attendance_by"
                                    fieldValue="month" checked="true">
                                </x-forms.radio>
                                <x-forms.radio fieldId="mark_attendance_by_dates" :fieldLabel="__('app.date')" fieldValue="date"
                                    fieldName="mark_attendance_by"></x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 attendance_by_month">
                        <x-forms.select fieldId="year" :fieldLabel="__('app.year')" fieldName="year" search="true"
                            fieldRequired="true">
                            <option value="">--</option>
                            @for ($i = $year; $i >= $year - 4; $i--)
                                <option @if ($i == $year) selected @endif
                                    value="{{ $i }}">{{ $i }}</option>
                            @endfor
                        </x-forms.select>
                    </div>

                    <div class="col-lg-3 col-md-6 attendance_by_month">
                        <x-forms.select fieldId="month" :fieldLabel="__('app.month')" fieldName="month" search="true"
                            fieldRequired="true">
                            <option value="">--</option>
                            <option @if ($month == '01') selected @endif
                                value="01">
                                @lang('app.january')</option>
                            <option @if ($month == '02') selected @endif
                                value="02">
                                @lang('app.february')</option>
                            <option @if ($month == '03') selected @endif
                                value="03">
                                @lang('app.march')</option>
                            <option @if ($month == '04') selected @endif
                                value="04">
                                @lang('app.april')</option>
                            <option @if ($month == '05') selected @endif
                                value="05">
                                @lang('app.may')</option>
                            <option @if ($month == '06') selected @endif
                                value="06">
                                @lang('app.june')</option>
                            <option @if ($month == '07') selected @endif
                                value="07">
                                @lang('app.july')</option>
                            <option @if ($month == '08') selected @endif
                                value="08">
                                @lang('app.august')</option>
                            <option @if ($month == '09') selected @endif
                                value="09">
                                @lang('app.september')</option>
                            <option @if ($month == '10') selected @endif
                                value="10">
                                @lang('app.october')</option>
                            <option @if ($month == '11') selected @endif
                                value="11">
                                @lang('app.november')</option>
                            <option @if ($month == '12') selected @endif
                                value="12">
                                @lang('app.december')</option>
                        </x-forms.select>
                    </div>

                    <div class="col-lg-4 col-md-6 d-none multi_date_div">
                        <x-forms.text :fieldLabel="__('messages.selectMultipleDates')" fieldName="multi_date"
                            fieldId="multi_date" :fieldPlaceholder="__('messages.selectMultipleDates')"
                            :fieldValue="Carbon\Carbon::today()->format(global_setting()->date_format)" />
                    </div>

                </div>
                <div class="row px-4">
                    <div class="col-lg-4 col-md-6 col-xl-3">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.attendance.clock_in')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_in_time"
                                fieldId="start_time" fieldRequired="true"
                                :fieldValue="\Carbon\Carbon::createFromFormat('H:i:s', attendance_setting()->shift->office_start_time)->format(global_setting()->time_format)" />
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-xl-3">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.attendance.clock_out')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="clock_out_time"
                                fieldId="end_time"
                                :fieldValue="\Carbon\Carbon::createFromFormat('H:i:s', attendance_setting()->shift->office_end_time)->format(global_setting()->time_format)" />
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-xl-3">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="late_yes" :fieldLabel="__('modules.attendance.late')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="late_yes" :fieldLabel="__('app.yes')" fieldName="late"
                                    fieldValue="yes">
                                </x-forms.radio>
                                <x-forms.radio fieldId="late_no" :fieldLabel="__('app.no')" fieldValue="no"
                                    fieldName="late" checked="true"></x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6 col-xl-3">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="half_day_yes" :fieldLabel="__('modules.attendance.halfDay')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="half_day_yes" :fieldLabel="__('app.yes')" fieldName="half_day"
                                    fieldValue="yes">
                                </x-forms.radio>
                                <x-forms.radio fieldId="half_day_no" :fieldLabel="__('app.no')" fieldValue="no"
                                    fieldName="half_day" checked="true"></x-forms.radio>
                            </div>
                        </div>
                    </div>


                </div>

                <div class="row p-20">
                    <div class="col-lg-3 col-md-3">
                        <x-forms.select fieldId="work_from_type" :fieldLabel="__('modules.attendance.working_from')" fieldName="work_from_type" fieldRequired="true"
                            search="true" >
                                <option value="office">@lang('modules.attendance.office')</option>
                                <option value="home">@lang('modules.attendance.home')</option>
                                <option value="other">@lang('modules.attendance.other')</option>
                        </x-forms.select>
                    </div>

                    <div class="col-lg-3 col-md-6" id="other_place" style="display:none">
                        <x-forms.text fieldId="working_from" :fieldLabel="__('modules.attendance.otherPlace')" fieldName="working_from" fieldRequired="true" >
                        </x-forms.text>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary class="mr-3" id="save-attendance-form" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('attendances.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-datepicker.min.js') }}"></script>
<script>
    $(document).ready(function() {
        $("#selectEmployee").selectpicker({
            actionsBox: true,
            selectAllText: "{{ __('modules.permission.selectAll') }}",
            deselectAllText: "{{ __('modules.permission.deselectAll') }}",
            multipleSeparator: " ",
            selectedTextFormat: "count > 8",
            countSelectedText: function(selected, total) {
                return selected + " {{ __('app.membersSelected') }} ";
            }
        });

        $('#multi_date').datepicker({
            linkedCalendars: false,
            multidate: true,
            todayHighlight: true,
            format: 'yyyy-mm-d'
        });

        $('input[type=radio][name=mark_attendance_by]').change(function() {
            if(this.value=='date') {
                $('#multi_date').datepicker('clearDates').datepicker({
                    linkedCalendars: false,
                    multidate: true,
                    todayHighlight: true,
                    format: 'yyyy-mm-d'
                });
            }

        });

        $('#work_from_type').change(function(){
            ($(this).val() == 'other') ? $('#other_place').show() : $('#other_place').hide();
        });

        $('#start_time, #end_time').timepicker({
            showMeridian: (global_setting.time_format == 'H:i' ? false : true)
        });

        $('#department_id').change(function() {
            var id = $(this).val();
            var url = "{{ route('employees.by_department', ':id') }}";
            url = url.replace(':id', id);

            $.easyAjax({
                url: url,
                container: '#save-attendance-data-form',
                type: "GET",
                blockUI: true,
                data: $('#save-attendance-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        $('#selectEmployee').html(response.data);
                        $('#selectEmployee').selectpicker('refresh');
                    }
                }
            });
        });

        $('#save-attendance-form').click(function() {

            const url = "{{ route('attendances.bulk_mark') }}";

            $.easyAjax({
                url: url,
                container: '#save-attendance-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-attendance-form",
                data: $('#save-attendance-data-form').serialize()
            });
        });

        $("input[name=mark_attendance_by]").click(function() {
            $(this).val() == 'date' ? $('.multi_date_div').removeClass('d-none') : $(
                '.multi_date_div').addClass('d-none');
            $(this).val() == 'date' ? $('.attendance_by_month').addClass('d-none') : $(
                '.attendance_by_month').removeClass('d-none');
        })

        init(RIGHT_MODAL);
    });
</script>
