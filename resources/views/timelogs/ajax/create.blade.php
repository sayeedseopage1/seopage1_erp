<div class="row">
    <div class="col-sm-12">
        <x-form id="save-timelog-data-form">

            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.timeLog') @lang('app.details')</h4>
                <div class="row p-20">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 col-lg-4">
                                <x-forms.select fieldId="project_id2" fieldName="project_id"
                                    :fieldLabel="__('app.project')" search="true">
                                    <option value="">--</option>
                                    @foreach ($projects as $project)
                                        <option {{ request()->default_project == $project->id ? 'selected' : '' }}
                                            value="{{ $project->id }}">
                                            {{ $project->project_name }}
                                        </option>
                                    @endforeach
                                </x-forms.select>
                            </div>

                            <div class="col-md-6 col-lg-4">
                                <x-forms.select fieldId="task_id2" fieldName="task_id" :fieldLabel="__('app.task')"
                                    fieldRequired="true" search="true">
                                    <option value="">--</option>
                                    @foreach ($tasks as $field)
                                        <option value="{{ $field->id }}">
                                            {{ $field->heading }}
                                        </option>
                                    @endforeach
                                </x-forms.select>
                            </div>


                            @if ($addTimelogPermission == 'all')
                                <div class="col-md-6 col-lg-4">
                                    <x-forms.label class="mt-3" fieldId="user_id2"
                                        :fieldLabel="__('app.employee')" fieldRequired="true">
                                    </x-forms.label>
                                    <x-forms.input-group>
                                        <select class="form-control select-picker" name="user_id" id="user_id2"
                                            data-live-search="true" data-size="8">
                                            <option value="">--</option>
                                        </select>
                                    </x-forms.input-group>
                                </div>
                            @else
                                <input type="hidden" name="user_id" value="{{ user()->id }}">
                                <div class="col-md-6 col-lg-4">
                                    <x-forms.label class="mt-3" fieldId="user_id2" fieldLabel="&nbsp;" />
                                    <x-employee :user="user()" />
                                </div>
                            @endif


                        </div>

                        <div class="row">
                            <div class="col-md-3 col-lg-3">
                                <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                                    :fieldLabel="__('modules.timeLogs.startDate')" fieldName="start_date"
                                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                                    :fieldPlaceholder="__('placeholders.date')" />
                            </div>

                            <div class="col-md-3 col-lg-3">
                                <div class="bootstrap-timepicker timepicker">
                                    <x-forms.text :fieldLabel="__('modules.timeLogs.startTime')"
                                        :fieldPlaceholder="__('placeholders.hours')" fieldName="start_time"
                                        fieldId="start_time" fieldRequired="true" />
                                </div>
                            </div>

                            <div class="col-md-3 col-lg-3">
                                <x-forms.datepicker fieldId="end_date" fieldRequired="true"
                                    :fieldLabel="__('modules.timeLogs.endDate')" fieldName="end_date"
                                    :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                                    :fieldPlaceholder="__('placeholders.date')" />
                            </div>

                            <div class="col-md-3 col-lg-3">
                                <div class="bootstrap-timepicker timepicker">
                                    <x-forms.text :fieldLabel="__('modules.timeLogs.endTime')"
                                        :fieldPlaceholder="__('placeholders.hours')" fieldName="end_time"
                                        fieldId="end_time" fieldRequired="true" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <x-forms.text :fieldLabel="__('modules.timeLogs.memo')" fieldName="memo" fieldRequired="true"
                            fieldId="memo" :fieldPlaceholder="__('placeholders.timelog.memo')" />
                    </div>

                    <div class="col-md-6">
                        <x-forms.label fieldId="total_time" class="my-3"
                            :fieldLabel="__('modules.timeLogs.totalHours')" />
                        <p id="total_time" class="f-w-500 text-primary f-21">0 @lang('app.hrs')</p>
                    </div>

                    @if (isset($fields) && count($fields) > 0)
                        @foreach ($fields as $field)
                            <div class="col-md-4">
                                @if ($field->type == 'text')
                                    <x-forms.text fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.text>
                                @elseif($field->type == 'password')
                                    <x-forms.password
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.password>
                                @elseif($field->type == 'number')
                                    <x-forms.number
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldPlaceholder="$field->label"
                                        :fieldRequired="($field->required === 'yes') ? true : false">
                                    </x-forms.number>
                                @elseif($field->type == 'textarea')
                                    <x-forms.textarea :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldPlaceholder="$field->label">
                                    </x-forms.textarea>
                                @elseif($field->type == 'radio')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        <div class="d-flex">
                                            @foreach ($field->values as $key => $value)
                                                <x-forms.radio fieldId="optionsRadios{{ $key . $field->id }}"
                                                    :fieldLabel="$value"
                                                    fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                                    :fieldValue="$value" :checked="($key == 0) ? true : false" />
                                            @endforeach
                                        </div>
                                    </div>
                                @elseif($field->type == 'select')
                                    <div class="form-group">

                                        <x-forms.select
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        search="true">
                                            <option value="">--</option>
                                            @foreach($field->values as $field)
                                                <option value="{{ $field }}">{{ $field }}</option>
                                            @endforeach
                                        </x-forms.select>
                                    </div>
                                @elseif($field->type == 'date')
                                    <x-forms.datepicker custom="true"
                                        fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldRequired="($field->required === 'yes') ? true : false"
                                        :fieldLabel="$field->label"
                                        fieldName="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                        :fieldValue="now()->timezone(global_setting()->timezone)->format(global_setting()->date_format)"
                                        :fieldPlaceholder="$field->label" />
                                @elseif($field->type == 'checkbox')
                                    <div class="form-group my-3">
                                        <x-forms.label
                                            fieldId="custom_fields_data[{{ $field->name . '_' . $field->id }}]"
                                            :fieldLabel="$field->label"
                                            :fieldRequired="($field->required === 'yes') ? true : false">
                                        </x-forms.label>
                                        <div class="d-flex checkbox-{{$field->id}}">
                                            <input type="hidden" name="custom_fields_data[{{$field->name.'_'.$field->id}}]" id="{{$field->name.'_'.$field->id}}">

                                            @foreach ($field->values as $key => $value)
                                                <x-forms.checkbox fieldId="optionsRadios{{ $key . $field->id }}"
                                                    :fieldLabel="$value"
                                                    fieldName="$field->name.'_'.$field->id.'[]'"
                                                    :fieldValue="$value"
                                                    onchange="checkboxChange('checkbox-{{$field->id}}', '{{$field->name.'_'.$field->id}}')"
                                                    :fieldRequired="($field->required === 'yes') ? true : false" />
                                            @endforeach
                                        </div>
                                    </div>
                                @endif

                            </div>
                        @endforeach
                    @endif
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-timelog-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('timelogs.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {
        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        const dp1 = datepicker('#start_date', {
            position: 'bl',
            onSelect: (instance, date) => {
                if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
                    .getTime()) {
                    dp2.setDate(date, true)
                }
                if (typeof dp2.dateSelected === 'undefined') {
                    dp2.setDate(date, true)
                }
                dp2.setMin(date);
                calculateTime();
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#end_date', {
            position: 'bl',
            onSelect: (instance, date) => {
                dp1.setMax(date);
                calculateTime();
            },
            ...datepickerConfig
        });

        $('#start_time, #end_time').timepicker({
            @if (global_setting()->time_format == 'H:i')
                showMeridian: false,
            @endif
        }).on('hide.timepicker', function(e) {
            calculateTime();
        });

        $('#project_id2').change(function() {
            var id = $(this).val();
            if (id == '') {
                id = 0;
            }
            var url = "{{ route('tasks.project_tasks', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-timelog-data-form',
                blockUI: true,
                redirect: true,
                success: function(data) {
                    $('#task_id2').html(data.data);
                    $('#task_id2').selectpicker('refresh');
                }
            })
        });

        $('#task_id2').change(function() {
            var id = $(this).val();
            if (id == '') {
                id = 0;
            }
            var url = "{{ route('tasks.members', ':id') }}";
            url = url.replace(':id', id);
            $.easyAjax({
                url: url,
                type: "GET",
                container: '#save-timelog-data-form',
                blockUI: true,
                redirect: true,
                success: function(data) {
                    $('#user_id2').html(data.data);
                    $('#user_id2').selectpicker('refresh');
                }
            })
        });

        $('#save-timelog-form').click(function() {
            const url = "{{ route('timelogs.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-timelog-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-timelog-form",
                data: $('#save-timelog-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if ($(RIGHT_MODAL).hasClass('in')) {
                            document.getElementById('close-task-detail').click();
                            window.LaravelDataTables["timelogs-table"].draw();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    }
                }
            });
        });

        function calculateTime() {
            var format = '{{ global_setting()->moment_format }}';
            var startDate = $('#start_date').val();
            var endDate = $('#end_date').val();
            var startTime = $("#start_time").val();
            var endTime = $("#end_time").val();

            startDate = moment(startDate, format).format('YYYY-MM-DD');
            endDate = moment(endDate, format).format('YYYY-MM-DD');

            var timeStart = new Date(startDate + " " + startTime);
            var timeEnd = new Date(endDate + " " + endTime);

            var diff = (timeEnd - timeStart) / 60000; //dividing by seconds and milliseconds

            var minutes = diff % 60;
            var hours = (diff - minutes) / 60;

            if (hours < 0 || minutes < 0) {
                Swal.fire({
                    icon: 'warning',
                    text: "@lang('messages.totalTimeZero')",

                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                });
                $("#start_time").val(startTime);
                $('#end_time').val(endTime);

                return false;
                var numberOfDaysToAdd = 1;
                timeEnd.setDate(timeEnd.getDate() + numberOfDaysToAdd);
                var dd = timeEnd.getDate();

                if (dd < 10) {
                    dd = "0" + dd;
                }

                var mm = timeEnd.getMonth() + 1;

                if (mm < 10) {
                    mm = "0" + mm;
                }

                var y = timeEnd.getFullYear();

                $('#end_date').val(mm + '/' + dd + '/' + y);
                calculateTime();
            } else {
                $('#total_time').html(hours + "Hrs " + minutes + "Mins");
            }

        }

        init(RIGHT_MODAL);
    });

    function checkboxChange(parentClass, id){
        var checkedData = '';
        $('.'+parentClass).find("input[type= 'checkbox']:checked").each(function () {
            checkedData = (checkedData !== '') ? checkedData+', '+$(this).val() : $(this).val();
        });
        $('#'+id).val(checkedData);
    }
</script>
