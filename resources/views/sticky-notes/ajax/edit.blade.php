<div class="row">
    <div class="col-sm-12">
        <x-form id="save-notice-data-form" method="PUT">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.note') @lang('app.details')</h4>

                <div class="row p-20">
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="colour">Colors
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" name="colour" id="colour" class="form-control height-35 f-14" value="{{$stickyNote->colour}}" readonly>
                    </div>
                    @if(Auth::user()->role_id == 4)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" name="note_type" id="note_type" class="form-control height-35 f-14" value="{{$stickyNote->note_type}}" readonly>
                    </div>
                    @if($stickyNote->client_id)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" name="client_id" id="client_id" class="form-control height-35 f-14" value="{{$stickyNote->client->name}}" readonly>
                    </div>
                    @endif
                    @if($stickyNote->project_id)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_id">Projects
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" name="project_id" id="project_id" class="form-control height-35 f-14" value="{{$stickyNote->project->project_name}}" readonly>
                    </div>
                    @endif
                    @if($stickyNote->milestone_id)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_id">Milestones</label>
                        <input type="text" name="milestone_id" class="form-control height-35 f-14" id="milestone_id" value="{{$stickyNote->milestone->milestone_title}}" readonly>
                    </div>
                    @endif
                    @if($stickyNote->task_id)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="task_id">Tasks</label>
                        <input type="text" name="task_id" id="task_id" class="form-control height-35 f-14" value="{{$stickyNote->task->heading}}" readonly>
                    </div>
                    @endif
                    @endif
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="reminder_time">When should the system remind you about this note?
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        @php
                            $reminderTimeDiff = \Carbon\Carbon::parse($stickyNote->reminder_time)->diffInHours(\Carbon\Carbon::parse($stickyNote->created_at));
                            $stickyNote->reminder_time = $reminderTimeDiff;
                        @endphp
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="reminder_time" id="reminder_time" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @for ($i = 1; $i <= 120; $i++)
                                    <option value="{{ $i }}" {{ $i == $stickyNote->reminder_time ? 'selected' : '' }}>In {{ $i }} hour{{ $i > 1 ? 's' : '' }}</option>
                                @endfor
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-12 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="notetext">Note
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <textarea class="form-control" name="notetext" id="notetext" rows="10">{{$stickyNote->note_text}}</textarea>
                        <label id="notetext_error" class="text-danger" for="notetext"></label>
                    </div>

                </div>

                <x-form-actions>
                    <x-forms.button-primary id="save-notice" class="mr-3" icon="check">@lang('app.save')
                    </x-forms.button-primary>
                    <x-forms.button-cancel :link="route('sticky-notes.index')" class="border-0">@lang('app.cancel')
                    </x-forms.button-cancel>
                </x-form-actions>
            </div>
        </x-form>

    </div>
</div>

<script>
    $(document).ready(function() {
        $('#save-notice').click(function(e){
            e.preventDefault();
            $('#save-notice').attr("disabled", true);
            $('#save-notice').html("Processing...");

            var data= {
                '_token': "{{ csrf_token() }}",
                'reminder_time': document.getElementById("reminder_time").value,
                'notetext': document.getElementById("notetext").value,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "PUT",
                url: "{{ route('sticky-notes.update', $stickyNote->id) }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response.status==200) {
                        $(location).prop('href', '{{route("sticky-notes.index")}}');
                        toastr.success('Note Updated Successfully');
                        $('#save-notice').attr("disabled", false);
                        $('#save-notice').html("Submit");
                    }
                },
                error: function(error) {
                    if(error.responseJSON.errors.reminder_time){
                        $('#reminder_time_error').text(error.responseJSON.errors.reminder_time);
                    }else{
                        $('#reminder_time_error').text('');
                    }
                    if(error.responseJSON.errors.notetext){
                        $('#notetext_error').text(error.responseJSON.errors.notetext);
                    }else{
                        $('#notetext_error').text('');
                    }
                    $('#save-notice').attr("disabled", false);
                    $('#save-notice').html("Submit");
                }
            });
        });
    });
</script>