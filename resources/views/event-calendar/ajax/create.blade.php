<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-event-data-form">
            @include('sections.password-autocomplete-hide')
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('modules.events.addEvent')</h4>
                <div class="row p-20">

                    <div class="col-lg-4 col-md-6">
                        <x-forms.text :fieldLabel="__('modules.events.eventName')" fieldName="event_name"
                            fieldRequired="true" fieldId="event_name" fieldPlaceholder="" />
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="colorselector" fieldRequired="true"
                                :fieldLabel="__('modules.tasks.labelColor')">
                            </x-forms.label>
                            <x-forms.input-group id="colorpicker">
                                <input type="text" class="form-control height-35 f-14"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="label_color"
                                    id="colorselector">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-6">
                        <x-forms.text :fieldLabel="__('modules.events.where')" fieldName="where" fieldRequired="true"
                            fieldId="where" fieldPlaceholder="" />
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('app.description')">
                            </x-forms.label>
                            <div id="description"></div>
                            <textarea name="description" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                            :fieldLabel="__('modules.events.startOnDate')" fieldName="start_date"
                            :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.events.startOnTime')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="start_time" fieldId="start_time"
                                fieldRequired="true" />
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <x-forms.datepicker fieldId="end_date" fieldRequired="true"
                            :fieldLabel="__('modules.events.endOnDate')" fieldName="end_date"
                            :fieldValue="\Carbon\Carbon::now(global_setting()->timezone)->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.events.endOnTime')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="end_time" fieldId="end_time"
                                fieldRequired="true" />
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee" fieldRequired="true"
                                :fieldLabel="__('app.select').' '.__('app.employee')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                    id="selectAssignee" data-live-search="true" data-size="8">
                                    @foreach ($employees as $emp)
                                        <option
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $emp->image_url }}' ></div> {{ ucfirst($emp->name) }} {{ (user() && user()->id == $emp->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}"
                                            value="{{ $emp->id }}">{{ mb_ucwords($emp->name) }} </option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="selectAssignee" fieldRequired="true"
                                :fieldLabel="__('app.select').' '.__('app.client')">
                            </x-forms.label>
                            <x-forms.input-group>
                                <select class="form-control multiple-users" multiple name="user_id[]"
                                    id="selectAssignee2" data-live-search="true" data-size="8">
                                    @foreach ($clients as $emp)
                                        <option
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $emp->image_url }}' ></div> {{ ucfirst($emp->name) }}"
                                            value="{{ $emp->id }}">{{ mb_ucwords($emp->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>


                    <div class="col-lg-12 my-3">
                        <x-forms.checkbox :fieldLabel="__('modules.events.repeat')" fieldName="repeat"
                            fieldId="repeat-event" fieldValue="yes" fieldRequired="true" />
                    </div>

                    <div class="col-lg-12 repeat-event-div d-none">
                        <div class="row">
                            <div class="col-lg-4">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.events.repeatEvery')" fieldName="repeat_count"
                                    fieldId="repeat_count" fieldValue="" fieldRequired="true" />
                            </div>
                            <div class="col-md-4 mt-2">
                                <x-forms.select fieldId="repeat_type" fieldLabel="" fieldName="repeat_type"
                                    search="true">
                                    <option value="day">@lang('app.day')</option>
                                    <option value="week">@lang('app.week')</option>
                                    <option value="month">@lang('app.month')</option>
                                    <option value="year">@lang('app.year')</option>
                                </x-forms.select>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <x-forms.text :fieldLabel="__('modules.events.cycles')" fieldName="repeat_cycles"
                                    fieldRequired="true" fieldId="repeat_cycles" fieldPlaceholder="" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12 my-3">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.reminder')" fieldName="send_reminder"
                            fieldId="send_reminder" fieldValue="yes" fieldRequired="true" />
                    </div>

                    <div class="col-lg-12 send_reminder_div d-none">
                        <div class="row">
                            <div class="col-lg-4">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.events.remindBefore')" fieldName="remind_time"
                                    fieldId="remind_time" fieldValue="" fieldRequired="true" />
                            </div>
                            <div class="col-md-4 mt-2">
                                <x-forms.select fieldId="remind_type" fieldLabel="" fieldName="remind_type"
                                    search="true">
                                    <option value="day">@lang('app.day')</option>
                                    <option value="hour">@lang('app.hour')</option>
                                    <option value="minute">@lang('app.minute')</option>
                                </x-forms.select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('modules.events.eventLink')" fieldName="event_link"
                            fieldId="event_link" fieldPlaceholder="https://www.example.com/" />
                    </div>

                    <div class="col-lg-12">
                        <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2" :fieldLabel="__('app.add') . ' ' .__('app.file')"
                            fieldName="file" fieldId="file-upload-dropzone" />
                            <input type="hidden" name="eventId" id="eventId">
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-event-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('tasks.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>
        </x-form>

    </div>
</div>

<script src="{{ asset('vendor/jquery/bootstrap-colorpicker.js') }}"></script>

<script>
    $(document).ready(function() {

        Dropzone.autoDiscover = false;
        //Dropzone class
        eventDropzone = new Dropzone("div#file-upload-dropzone", {
            dictDefaultMessage: "{{ __('app.dragDrop') }}",
            url: "{{ route('event-files.store') }}",
            headers: {
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            paramName: "file",
            maxFilesize: DROPZONE_MAX_FILESIZE,
            maxFiles: 10,
            autoProcessQueue: false,
            uploadMultiple: true,
            addRemoveLinks: true,
            parallelUploads: 10,
            acceptedFiles: 'image/*',
            init: function() {
                eventDropzone = this;
            }
        });
        eventDropzone.on('sending', function(file, xhr, formData) {
            var eventID = $('#eventId').val();
            formData.append('eventId', eventID);
            $.easyBlockUI();
        });
        eventDropzone.on('uploadprogress', function() {
            $.easyBlockUI();
        });
        eventDropzone.on('completemultiple', function() {
            window.location.href = '{{ route("events.index") }}';
        });

        $('#repeat-event').change(function() {
            $('.repeat-event-div').toggleClass('d-none');
        })
        $('#send_reminder').change(function() {
            $('.send_reminder_div').toggleClass('d-none');
        })

        $('#start_time, #end_time').timepicker({
            @if (global_setting()->time_format == 'H:i')
                showMeridian: false,
            @endif
        });

        $('#colorpicker').colorpicker({
            "color": "#ff0000"
        });

        $("#selectAssignee, #selectAssignee2").selectpicker({
            actionsBox: true,
            selectAllText: "{{ __('modules.permission.selectAll') }}",
            deselectAllText: "{{ __('modules.permission.deselectAll') }}",
            multipleSeparator: " ",
            selectedTextFormat: "count > 8",
            countSelectedText: function(selected, total) {
                return selected + " {{ __('app.membersSelected') }} ";
            }
        });

        quillImageLoad('#description');

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
            },
            ...datepickerConfig
        });

        const dp2 = datepicker('#end_date', {
            position: 'bl',
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        $('#save-event-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('events.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-event-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#save-event-form",
                data: $('#save-event-data-form').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        if (eventDropzone.getQueuedFiles().length > 0) {
                        eventId = response.eventId
                        $('#eventId').val(eventId);
                        console.log(eventDropzone.processQueue());
                        eventDropzone.processQueue();
                        }
                        if ($(MODAL_XL).hasClass('show')) {
                            $(MODAL_XL).hide();
                            window.location.reload();
                        } else {
                            window.location.href = response.redirectUrl;
                        }
                    }
                }
            });
        });

        init(RIGHT_MODAL);
    });
</script>
