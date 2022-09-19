<link rel="stylesheet" href="{{ asset('vendor/css/bootstrap-colorpicker.css') }}" />
<link rel="stylesheet" href="{{ asset('vendor/css/dropzone.min.css') }}">

<div class="row">
    <div class="col-sm-12">
        <x-form id="save-event-data-form" method="put">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    {{ $event->event_name }}
                </h4>
                <div class="row p-20">

                    <div class="col-lg-4 col-md-4">
                        <x-forms.text :fieldLabel="__('modules.events.eventName')" fieldName="event_name"
                            fieldRequired="true" fieldId="event_name" fieldPlaceholder=""
                            :fieldValue="$event->event_name" />
                    </div>

                    <div class="col-md-4">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="colorselector" fieldRequired="true"
                                :fieldLabel="__('modules.tasks.labelColor')">
                            </x-forms.label>
                            <x-forms.input-group id="colorpicker">
                                <input type="text" class="form-control height-35 f-14"
                                    placeholder="{{ __('placeholders.colorPicker') }}" name="label_color"
                                    id="colorselector" :fieldValue="$event->label_color">

                                <x-slot name="append">
                                    <span class="input-group-text height-35 colorpicker-input-addon"><i></i></span>
                                </x-slot>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-4 col-md-4">
                        <x-forms.text :fieldLabel="__('modules.events.where')" fieldName="where" fieldRequired="true"
                            fieldId="where" fieldPlaceholder="" :fieldValue="$event->where" />
                    </div>

                    <div class="col-md-12">
                        <div class="form-group my-3">
                            <x-forms.label fieldId="description" :fieldLabel="__('app.description')">
                            </x-forms.label>
                            <div id="description"> {!! $event->description !!} </div>
                            <textarea name="description" id="description-text" class="d-none"></textarea>
                        </div>
                    </div>

                    <div class="col-md-3 col-lg-3">
                        <x-forms.datepicker fieldId="start_date" fieldRequired="true"
                            :fieldLabel="__('modules.events.startOnDate')" fieldName="start_date"
                            :fieldValue="$event->start_date_time->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-3 col-lg-3">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.events.startOnTime')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="start_time" fieldId="start_time"
                                fieldRequired="true"
                                :fieldValue="$event->start_date_time->format(global_setting()->time_format)" />
                        </div>
                    </div>

                    <div class="col-md-3 col-lg-3">
                        <x-forms.datepicker fieldId="end_date" fieldRequired="true"
                            :fieldLabel="__('modules.events.endOnDate')" fieldName="end_date"
                            :fieldValue="$event->end_date_time->format(global_setting()->date_format)"
                            :fieldPlaceholder="__('placeholders.date')" />
                    </div>

                    <div class="col-md-3 col-lg-3">
                        <div class="bootstrap-timepicker timepicker">
                            <x-forms.text :fieldLabel="__('modules.events.endOnTime')"
                                :fieldPlaceholder="__('placeholders.hours')" fieldName="end_time" fieldId="end_time"
                                fieldRequired="true"
                                :fieldValue="$event->end_date_time->format(global_setting()->time_format)" />
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
                                        <option @if (in_array($emp->id, $attendeeArray)) selected @endif
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $emp->image_url }}' ></div> {{ ucfirst($emp->name) }} {{ (user() && user()->id == $emp->id) ? '<span class="ml-2 badge badge-secondary">' . __('app.itsYou') . '</span>' : '' }}</span>"
                                            value="{{ $emp->id }}">{{ mb_ucwords($emp->name) }}</option>
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
                                        <option @if (in_array($emp->id, $attendeeArray)) selected @endif
                                            data-content="<div class='d-inline-block mr-1'><img class='taskEmployeeImg rounded-circle' src='{{ $emp->image_url }}' ></div> {{ ucfirst($emp->name) }}"
                                            value="{{ $emp->id }}">{{ mb_ucwords($emp->name) }}</option>
                                    @endforeach
                                </select>
                            </x-forms.input-group>
                        </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('modules.events.repeat')" fieldName="repeat"
                            fieldId="repeat-event" fieldValue="yes" fieldRequired="true"
                            :checked="$event->repeat == 'yes'" />
                    </div>

                    <div class="col-lg-12 repeat-event-div @if ($event->repeat == 'no') d-none @endif">
                        <div class="row">
                            <div class="col-lg-4">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.events.repeatEvery')" fieldName="repeat_count"
                                    fieldId="repeat_count" :fieldValue="$event->repeat_every"
                                    fieldRequired="true" />
                            </div>
                            <div class="col-md-4 mt-2">
                                <x-forms.select fieldId="repeat_type" fieldLabel="" fieldName="repeat_type"
                                    search="true">
                                    <option @if ($event->repeat_type == 'day') selected @endif value="day">@lang('app.day')</option>
                                    <option @if ($event->repeat_type == 'week') selected @endif value="week">@lang('app.week')</option>
                                    <option @if ($event->repeat_type == 'month') selected @endif value="month">@lang('app.month')</option>
                                    <option @if ($event->repeat_type == 'year') selected @endif value="year">@lang('app.year')</option>
                                </x-forms.select>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <x-forms.text :fieldLabel="__('modules.events.cycles')" fieldName="repeat_cycles"
                                    fieldRequired="true" fieldId="repeat_cycles" fieldPlaceholder=""
                                    :fieldValue="$event->repeat_cycles" />
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                        <x-forms.checkbox :fieldLabel="__('modules.tasks.reminder')" fieldName="send_reminder"
                            fieldId="send_reminder" fieldValue="yes" fieldRequired="true"
                            :checked="$event->send_reminder == 'yes'" />
                    </div>

                    <div class="col-lg-12 send_reminder_div @if ($event->send_reminder == 'no') d-none @endif">
                        <div class="row">
                            <div class="col-lg-4">
                                <x-forms.number class="mr-0 mr-lg-2 mr-md-2"
                                    :fieldLabel="__('modules.events.remindBefore')" fieldName="remind_time"
                                    fieldId="remind_time" :fieldValue="$event->remind_time" fieldRequired="true" />
                            </div>
                            <div class="col-md-4 mt-2">
                                <x-forms.select fieldId="remind_type" fieldLabel="" fieldName="remind_type"
                                    search="true">
                                    <option @if ($event->remind_type == 'day') selected @endif value="day">@lang('app.day')</option>
                                    <option @if ($event->remind_type == 'hour') selected @endif value="hour">@lang('app.hour')</option>
                                    <option @if ($event->remind_type == 'minute') selected @endif value="minute">@lang('app.minute')
                                    </option>
                                </x-forms.select>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <x-forms.text :fieldLabel="__('modules.events.eventLink')" fieldName="event_link"
                            fieldId="event_link" :fieldValue="$event->event_link" fieldPlaceholder="https://www.example.com/" />
                    </div>
                        <div class="col-md-12 mt-3">
                            <a class="f-15 f-w-500" href="javascript:;" id="add-file"><i
                                    class="icons icon-plus font-weight-bold mr-1"></i>@lang('modules.events.uploadFile')</a>
                        </div>
                        <div class="row col-md-12 d-none" id="event-file">
                            <div class="col-md-12 ">
                                <x-forms.file-multiple class="mr-0 mr-lg-2 mr-md-2"
                                :fieldLabel="__('app.add') . ' ' .__('app.file')" fieldName="file"
                                fieldId="file-upload-dropzone" />

                                <div class="w-100 justify-content-end d-flex mt-2">
                                    <button id="cancel-file" type="button"
                                        class="btn btn-secondary border-grey rounded f-14">@lang('app.cancel')</button>
                                </div>
                            </div>
                        </div>
                    <div class="col-sm-12">
                        <div div class="d-flex flex-wrap mt-3" id="event-file-list">
                            @forelse($event->files as $file)
                                <x-file-card :fileName="$file->filename" :dateAdded="$file->created_at->diffForHumans()">
                                    @if ($file->icon == 'images')
                                        <img src="{{ $file->file_url }}">
                                    @else
                                        <i class="fa {{ $file->icon }} text-lightest"></i>
                                    @endif
                                        <x-slot name="action">
                                            <div class="dropdown ml-auto file-action">
                                                <button class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle"
                                                    type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i class="fa fa-ellipsis-h"></i>
                                                </button>

                                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                                        @if ($file->icon = 'images')
                                                            <a class="cursor-pointer d-block text-dark-grey f-13 pt-3 px-3 " target="_blank"
                                                                href="{{ $file->file_url }}">@lang('app.view')</a>
                                                        @endif
                                                        <a class="cursor-pointer d-block text-dark-grey f-13 py-3 px-3 "
                                                            href="{{ route('event-files.download', md5($file->id)) }}">@lang('app.download')</a>

                                                        <a class="cursor-pointer d-block text-dark-grey f-13 pb-3 px-3 delete-file"
                                                            data-row-id="{{ $file->id }}" href="javascript:;">@lang('app.delete')</a>
                                                </div>
                                            </div>
                                        </x-slot>

                                </x-file-card>
                            @empty
                            <div class="col-md-12" id="no-files">
                                <x-cards.no-record :message="__('messages.noFileUploaded')" icon="file" />
                            </div>
                            @endforelse
                        </div>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-event-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('events.index')" class="border-0">@lang('app.cancel')
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
                acceptedFiles: DROPZONE_FILE_ALLOW,
                init: function() {
                    eventDropzone = this;
                }
            });
            eventDropzone.on('sending', function(file, xhr, formData) {
                var ids = "{{ $event->id }}";
                // alert($ids);
                formData.append('eventId', ids);
                $.easyBlockUI();
            });
            eventDropzone.on('uploadprogress', function() {
                $.easyBlockUI();
            });
            eventDropzone.on('completemultiple', function() {
                var msgs = "@lang('messages.taskCreatedSuccessfully')";
                window.location.href = "{{ route('events.index') }}"
            });

            $('#add-file').click(function() {
            $(this).addClass('d-none');
            $('#event-file').removeClass('d-none');
            $('#no-files').addClass('d-none');
            });

            $('#cancel-file').click(function() {
                $('#event-file').toggleClass('d-none');
                $('#add-file').toggleClass('d-none');
                $('#no-files').toggleClass('d-none');
            });


            $('body').on('click', '.delete-file', function() {
                var id = $(this).data('row-id');
                Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
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
                        var url = "{{ route('event-files.destroy', ':id') }}";
                        url = url.replace(':id', id);

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
                                    $('#event-file-list').html(response.view);
                                }
                            }
                        });
                    }
                });
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
            "color": "{{ $event->label_color }}"
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
            dateSelected: new Date("{{ str_replace('-', '/', $event->start_date_time) }}"),
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
            dateSelected: new Date("{{ str_replace('-', '/', $event->end_date_time) }}"),
            onSelect: (instance, date) => {
                dp1.setMax(date);
            },
            ...datepickerConfig
        });

        $('#save-event-form').click(function() {
            var note = document.getElementById('description').children[0].innerHTML;
            document.getElementById('description-text').value = note;

            const url = "{{ route('events.update', $event->id) }}";

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
                        if(eventDropzone.getQueuedFiles().length > 0) {
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
