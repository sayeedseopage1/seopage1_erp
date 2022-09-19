<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-datepicker3.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-attendance-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.add') @lang('app.menu.shiftRoster')</h4>
                <div class="row p-20">

                    <div class="col-md-12">
                        <x-alert type="info" icon="info-circle">@lang('messages.existingShiftOverride')</x-alert>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.select fieldId="department_id" :fieldLabel="__('app.department')" fieldName="department_id"
                            search="true">
                            <option value="0">--</option>
                            @foreach ($departments as $team)
                                <option value="{{ $team->id }}">{{ mb_ucwords($team->team_name) }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-md-9">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectEmployee" :fieldLabel="__('app.menu.employees')" fieldRequired="true">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]" id="selectEmployee"
                                    data-live-search="true" data-size="8">
                                    @foreach ($employees as $item)
                                        <option
                                            data-content="<span class='badge badge-pill badge-light border'><div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $item->image_url }}' ></div> {{ ucfirst($item->name) }}{{ (user() && user()->id == $item->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}</span>"
                                            value="{{ $item->id }}">{{ mb_ucwords($item->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>
                </div>
                <div class="row px-4 pb-4">

                    <div class="col-lg-3 col-md-6">
                        <x-forms.select fieldId="shift" :fieldLabel="__('modules.attendance.shift')" fieldName="shift" search="true">
                            @foreach ($employeeShifts as $item)
                                <option value="{{ $item->id }}">
                                    {{ mb_ucwords($item->shift_name) .' ['.$item->office_start_time.' - '.$item->office_end_time.']' }}</option>
                            @endforeach
                        </x-forms.select>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="mark_attendance_by_month" :fieldLabel="__('modules.attendance.assignShift') . ' ' . __('app.by')">
                            </x-forms.label>
                            <div class="d-flex">
                                <x-forms.radio fieldId="mark_attendance_by_dates" :fieldLabel="__('app.date')" fieldValue="date"
                                    fieldName="assign_shift_by" checked="true"></x-forms.radio>
                                <x-forms.radio fieldId="mark_attendance_by_month" :fieldLabel="__('app.month')"
                                    fieldName="assign_shift_by" fieldValue="month">
                                </x-forms.radio>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6 attendance_by_month d-none">
                        <x-forms.select fieldId="year" :fieldLabel="__('app.year')" fieldName="year" search="true"
                            fieldRequired="true">
                            <option value="">--</option>
                            @for ($i = $year+1; $i >= $year - 4; $i--)
                                <option @if ($i == $year) selected @endif value="{{ $i }}">
                                    {{ $i }}</option>
                            @endfor
                        </x-forms.select>
                    </div>

                    <div class="col-lg-3 col-md-6 attendance_by_month d-none">
                        <x-forms.select fieldId="month" :fieldLabel="__('app.month')" fieldName="month" search="true"
                            fieldRequired="true">
                            <option value="">--</option>
                            <option @if ($month == '01') selected @endif value="01">
                                @lang('app.january')</option>
                            <option @if ($month == '02') selected @endif value="02">
                                @lang('app.february')</option>
                            <option @if ($month == '03') selected @endif value="03">
                                @lang('app.march')</option>
                            <option @if ($month == '04') selected @endif value="04">
                                @lang('app.april')</option>
                            <option @if ($month == '05') selected @endif value="05">
                                @lang('app.may')</option>
                            <option @if ($month == '06') selected @endif value="06">
                                @lang('app.june')</option>
                            <option @if ($month == '07') selected @endif value="07">
                                @lang('app.july')</option>
                            <option @if ($month == '08') selected @endif value="08">
                                @lang('app.august')</option>
                            <option @if ($month == '09') selected @endif value="09">
                                @lang('app.september')</option>
                            <option @if ($month == '10') selected @endif value="10">
                                @lang('app.october')</option>
                            <option @if ($month == '11') selected @endif value="11">
                                @lang('app.november')</option>
                            <option @if ($month == '12') selected @endif value="12">
                                @lang('app.december')</option>
                        </x-forms.select>
                    </div>

                    <div class="col-md-6 multi_date_div">
                        <x-forms.text :fieldLabel="__('messages.selectMultipleDates')" fieldName="multi_date" fieldId="multi_date" :fieldPlaceholder="__('messages.selectMultipleDates')"
                            :fieldValue="Carbon\Carbon::today()->format(global_setting()->date_format)" />
                    </div>

                    <div class="col-md-4 mt-3">
                        <x-forms.checkbox :fieldLabel="__('modules.attendance.sendEmail')" fieldName="send_email" fieldId="sendEmail" />
                    </div>

                </div>


                <x-form-actions>
                    <x-forms.button-primary class="mr-3" id="save-attendance-form" icon="check">
                        @lang('app.save')
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
            multidate: true,
            todayHighlight: true,
            format: 'yyyy-mm-d'
        });

        $('#multi_date').datepicker('clearDates').datepicker({
            multidate: true,
            todayHighlight: true,
            format: 'yyyy-mm-d'
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

            const url = "{{ route('shifts.bulk_shift') }}";

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

        $("input[name=assign_shift_by]").click(function() {
            $(this).val() == 'date' ? $('.multi_date_div').removeClass('d-none') : $(
                '.multi_date_div').addClass('d-none');
            $(this).val() == 'date' ? $('.attendance_by_month').addClass('d-none') : $(
                '.attendance_by_month').removeClass('d-none');
        })

        init(RIGHT_MODAL);
    });
</script>
