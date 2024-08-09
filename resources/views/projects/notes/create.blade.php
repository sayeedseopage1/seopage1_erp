<div class="row">
    <div class="col-sm-12">
        <x-form id="save-project-note-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.project') @lang('app.note') @lang('app.details')</h4>

                <input type="hidden" id="project_id" name="project_id" value="{{ $project->id }}">
                <input type="hidden" id="client_id" name="client_id" value="{{ $project->client_id }}">

                <div class="row p-20">

                    <div class="col-md-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="title">Note Title
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                        
                            <input type="text" class="form-control height-35 f-14" placeholder="Enter note title" name="title" id="title" autocomplete="off">
                            <label class="text-danger" id="title_error"></label>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="" for="late_yes">Note Type
                            </label>
                            <div class="d-flex">
                                <div class="form-check-inline custom-control custom-radio mt-2 mr-3">
                                    <input type="radio" value="0" class="custom-control-input" id="public" name="type" checked="" autocomplete="off">
                                    <label class="custom-control-label pt-1 cursor-pointer" for="public">Public</label>
                                </div>
                                <div class="form-check-inline custom-control custom-radio mt-2 mr-3">
                                    <input type="radio" value="1" class="custom-control-input" id="private" name="type" autocomplete="off">
                                    <label class="custom-control-label pt-1 cursor-pointer" for="private">Private</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <div class="form-group my-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="set_reminder" value="1" id="set_reminder">
                                <label class="form-check-label mt-1 ml-2" for="set_reminder">Set Reminder</label>
                              </div>
                        </div>
                    </div>

                </div>


                <div class="row p-20 d-none" id="private-note-details">
                    <div class="col-md-6">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="">Select Option
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="select_item" id="select_item" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                <option value="Timebound reminder">Timebound reminder</option>
                                <option value="When a milestone is complete">When a milestone is complete</option>
                                <option value="When a task is approved by the client">When a task is approved by the client</option>
                                <option value="When 50% of the work will be done">When 50% of the work will be done</option>
                                <option value="When the project is complete">When the project is complete</option>
                                <option value="When the project deadline is 80% over">When the project deadline is 80% over</option>
                                <option value="When the project deadline is 90% over">When the project deadline is 90% over</option>
                                <option value="On the XXX day of the project">On the XXX day of the project</option>
                                <option value="When the deadline is over">When the deadline is over</option>
                            </select>
                            <label id="select_item_error" class="text-danger" for="select_item"></label>
                        </div>
                    </div>

                    <div class="col-md-6" id="reminder_time_container" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="reminder_time">Select Any
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="reminder_time" id="reminder_time" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @for ($i = 1; $i <= 120; $i++)
                                    <option value="{{ $i }}">In {{ $i }} hour{{ $i > 1 ? 's' : '' }}</option>
                                @endfor
                            </select>
                            <label id="reminder_time_error" class="text-danger" for="reminder_time"></label>
                        </div>
                    </div>

                    <div class="col-md-6" id="milestone_container" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone">Select Milestone
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="milestone" id="milestone" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @foreach ($milestones as $milestone)
                                    <option value="{{ $milestone->id }}">{{ $milestone->milestone_title }}</option>
                                @endforeach
                            </select>
                            <label id="milestone_error" class="text-danger" for="milestone"></label>
                        </div>
                    </div>

                    <div class="col-md-6" id="task_container" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="task">Select Task
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="task" id="task" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @foreach ($tasks as $task)
                                    <option value="{{ $task->id }}">{{ $task->heading }}</option>
                                @endforeach
                            </select>
                            <label id="task_error" class="text-danger" for="task"></label>
                        </div>
                    </div>

                    <div class="col-md-6" id="xxx_day_container" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_reminder_time">Select Any
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="project_reminder_time" id="project_reminder_time" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @for ($i = $daysRemaining; $i <= $deadline; $i++)
                                    <option value="{{ $i }}">In {{ $i }} hour{{ $i > 1 ? 's' : '' }}</option>
                                @endfor
                            </select>
                            <label id="project_reminder_time_error" class="text-danger" for="project_reminder_time"></label>
                        </div>
                    </div>
                </div>

                <div class="row p-20">
                    <div class="col-md-12 col-lg-12">
                        <div class="form-group my-3">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="details">Note Detail
                                <sup class="f-14 mr-1">*</sup>
                            </label>
                            <textarea class="form-control" name="details" id="details" rows="10"></textarea>
                            <label id="details_error" class="text-danger" for="details"></label>
                        </div>
                    </div>
                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-project-note-form" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('clients.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>

            </div>

        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {
        // $('#save-project-note-form').click(function() {


        //     const url = "{{ route('project-notes.store') }}";

        //     $.easyAjax({
        //         url: url,
        //         container: '#save-project-note-data-form',
        //         type: "POST",
        //         disableButton: true,
        //         blockUI: true,
        //         buttonSelector: "#save-project-note-form",
        //         data: $('#save-project-note-data-form').serialize(),
        //         success: function(response) {                    
        //             if (response.status == 'success') {
        //                 window.location.href = response.redirectUrl;
        //             } else if (response.status == 'fail') {
        //                 console.log(response.errors);
                        
        //             $.each(response.errors, function(field, message) {
        //                 $('#' + field + '_error').text(message[0]);
        //             });
        //         }
        //         }
        //     })
        // });

        $('#save-project-note-form').click(function(e){
            e.preventDefault();
            $('#save-project-note-form').attr("disabled", true);
            $('#save-project-note-form').html("Processing...");
            var type = $('input[name="type"]:checked').val();
            var data= {
                '_token': "{{ csrf_token() }}",
                'project_id': document.getElementById("project_id").value,
                'client_id': document.getElementById("client_id").value,
                'title': document.getElementById("title").value,
                'type': type,
                'set_reminder': document.getElementById("set_reminder").value,
                'select_item': document.getElementById("select_item").value,
                'reminder_time': document.getElementById("reminder_time").value,
                'milestone': document.getElementById("milestone").value,
                'task': document.getElementById("task").value,
                'project_reminder_time': document.getElementById("project_reminder_time").value,
                'details': document.getElementById("details").value,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('project-notes.store')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#store-lead').trigger("reset");
                    $('.error').html("");
                    $(location).prop('href', '{{url('/account/leads/')}}');
                    toastr.success('Lead Added Successfully');
                    $('#save-project-note-form').attr("disabled", false);
                    $('#save-project-note-form').html("Save");
                },
                error: function(error) {
                    if(error.responseJSON.errors.title){
                        $('#title_error').text(error.responseJSON.errors.title);
                    }else{
                        $('#title_error').text('');
                    }
                    if(error.responseJSON.errors.select_item){
                        $('#select_item_error').text(error.responseJSON.errors.select_item);
                    }else{
                        $('#select_item_error').text('');
                    }
                    if(error.responseJSON.errors.reminder_time){
                        $('#reminder_time_error').text(error.responseJSON.errors.reminder_time);
                    }else{
                        $('#reminder_time_error').text('');
                    }
                    if(error.responseJSON.errors.milestone){
                        $('#milestone_error').text(error.responseJSON.errors.milestone);
                    }else{
                        $('#milestone_error').text('');
                    }
                    if(error.responseJSON.errors.task){
                        $('#task_error').text(error.responseJSON.errors.task);
                    }else{
                        $('#task_error').text('');
                    }
                    if(error.responseJSON.errors.project_reminder_time){
                        $('#project_reminder_time_error').text(error.responseJSON.errors.project_reminder_time);
                    }else{
                        $('#project_reminder_time_error').text('');
                    }
                    if(error.responseJSON.errors.details){
                        $('#details_error').text(error.responseJSON.errors.details);
                    }else{
                        $('#details_error').text('');
                    }
                    $('#save-project-note-form').attr("disabled", false);
                    $('#save-project-note-form').html("Save");
                }
            });
        });

        $("input[name=set_reminder]").click(function() {
            if ($(this).is(':checked')) {
                $('#private-note-details').removeClass('d-none');
            } else {
                $('#private-note-details').addClass('d-none');
            }
        })

        $('#select_item').on('change', function () {
            var selectedValue = $(this).val();
            $('#reminder_time_container').hide();
            $('#milestone_container').hide();
            $('#task_container').hide();

            if (selectedValue === 'Timebound reminder') {
                $('#reminder_time_container').show();
            } else if (selectedValue === 'When a milestone is complete') {
                $('#milestone_container').show();
            } else if (selectedValue === 'When a task is approved by the client') {
                $('#task_container').show();
            } else if (selectedValue === 'On the XXX day of the project') {
                $('#xxx_day_container').show();
            }
        });

        init(RIGHT_MODAL);
    });
</script>
