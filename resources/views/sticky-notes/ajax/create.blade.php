<div class="row">
    <div class="col-sm-12">
        <x-form id="save-notice-data-form">
            <div class="add-client bg-white rounded">
                <h4 class="mb-0 p-20 f-21 font-weight-normal text-capitalize border-bottom-grey">
                    @lang('app.note') @lang('app.details')</h4>

                <div class="row p-20">
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="colour">Colors
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="colour" id="colour" class="form-control select-picker" data-size="8" tabindex="null">
                                <option data-content="<i class='fa fa-circle mr-2 text-red'></i>" value="red"></option>
                                <option data-content="<i class='fa fa-circle mr-2 text-dark-green'></i>" value="green"></option>
                                <option selected="" data-content="<i class='fa fa-circle mr-2 text-blue'></i>" value="blue"></option>
                                <option data-content="<i class='fa fa-circle mr-2 text-yellow'></i>" value="yellow"></option>
                                <option data-content="<i class='fa fa-circle mr-2 text-dark-grey'></i>" value="purple"></option>
                            </select>
                            <label id="colour_error" class="text-danger" for="colour"></label>
                        </div>
                    </div>
                    {{-- For PM Only --}}
                    @if(Auth::user()->role_id == 4)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="note_type" id="note_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                <option value="Project">Project</option>
                                <option value="Non-Project">Non-Project</option>
                            </select>
                            <label id="note_type_error" class="text-danger" for="note_type"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="clientField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="client_id" id="client_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @foreach ($clients as $client)
                                <option value="{{ $client->id }}">{{ $client->name }}</option>
                                @endforeach
                            </select>
                            <label id="client_id_error" class="text-danger" for="client_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="projectField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_id">Projects
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="project_id" id="project_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="project_id_error" class="text-danger" for="project_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="milestoneField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_id">Milestones</label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="milestone_id" id="milestone_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="milestone_id_error" class="text-danger" for="milestone_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="taskField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="task_id">Tasks</label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="task_id" id="task_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="task_id_error" class="text-danger" for="task_id"></label>
                        </div>
                    </div>
                    @endif
                    {{-- For Lead Only --}}
                    @if(Auth::user()->role_id == 6)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="note_type" id="note_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                <option value="Task">Task</option>
                                <option value="Non-Task">Non-Task</option>
                            </select>
                            <label id="note_type_error" class="text-danger" for="note_type"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="clientField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="client_id" id="client_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                @foreach ($lead_dev_clients as $client)
                                <option value="{{ $client->id }}">{{ $client->name }}</option>
                                @endforeach
                            </select>
                            <label id="client_id_error" class="text-danger" for="client_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="taskField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="task_id">Tasks
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="task_id" id="task_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="task_id_error" class="text-danger" for="task_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="subtaskField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="subtask_id">Subtask
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="subtask_id" id="subtask_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="subtask_id_error" class="text-danger" for="subtask_id"></label>
                        </div>
                    </div>
                    @endif
                     {{-- For Developer Only --}}
                     @if(Auth::user()->role_id == 5)
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="note_type" id="note_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                                 <option value="Sub-Task">Sub-Task</option>
                                 <option value="Non-Subtask">Non-Subtask</option>
                             </select>
                             <label id="note_type_error" class="text-danger" for="note_type"></label>
                         </div>
                     </div>
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="clientField" style="display: none">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="client_id" id="client_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                                 @foreach ($dev_clients as $client)
                                 <option value="{{ $client->id }}">{{ $client->name }}</option>
                                 @endforeach
                             </select>
                             <label id="client_id_error" class="text-danger" for="client_id"></label>
                         </div>
                     </div>
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="subtaskField" style="display: none">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="subtask_id">Subtask
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="subtask_id" id="subtask_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                             </select>
                             <label id="subtask_id_error" class="text-danger" for="subtask_id"></label>
                         </div>
                     </div>
                     @endif
                     {{-- For Admin/Team lead Only --}}
                    @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="note_type" id="note_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                                <option value="Project">Project</option>
                                <option value="Deal">Deal</option>
                                <option value="Won Deal">Won Deal</option>
                            </select>
                            <label id="note_type_error" class="text-danger" for="note_type"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="clientField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="client_id" id="client_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="client_id_error" class="text-danger" for="client_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="projectField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_id">Projects
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="project_id" id="project_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="project_id_error" class="text-danger" for="project_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="milestoneField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="milestone_id">Milestones
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="milestone_id" id="milestone_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="milestone_id_error" class="text-danger" for="milestone_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="taskField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="task_id">Tasks
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="task_id" id="task_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="task_id_error" class="text-danger" for="task_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="dealField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="deal_id">Deal
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="deal_id" id="deal_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="deal_id_error" class="text-danger" for="deal_id"></label>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="wonDealField" style="display: none">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="won_deal_id">Won Deal
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <div class="dropdown bootstrap-select form-control select-picker">
                            <select name="won_deal_id" id="won_deal_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                <option value="">--</option>
                            </select>
                            <label id="won_deal_id_error" class="text-danger" for="won_deal_id"></label>
                        </div>
                    </div>
                    @endif
                     {{-- For Admin/Team lead Only --}}
                     @if(Auth::user()->role_id == 7)
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="note_type">Note Type
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="note_type" id="note_type" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                                 <option value="Deal">Deal</option>
                                 <option value="Won Deal">Won Deal</option>
                             </select>
                             <label id="note_type_error" class="text-danger" for="note_type"></label>
                         </div>
                     </div>
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="clientField" style="display: none">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="client_id">Clients
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="client_id" id="client_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                             </select>
                             <label id="client_id_error" class="text-danger" for="client_id"></label>
                         </div>
                     </div>
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="dealField" style="display: none">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="deal_id">Deal
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="deal_id" id="deal_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                             </select>
                             <label id="deal_id_error" class="text-danger" for="deal_id"></label>
                         </div>
                     </div>
                     <div class="col-sm-12 col-md-6 col-lg-3 mt-3" id="wonDealField" style="display: none">
                         <label class="f-14 text-dark-grey mb-12" data-label="true" for="won_deal_id">Won Deal
                             <sup class="f-14 mr-1">*</sup>
                         </label>
                         <div class="dropdown bootstrap-select form-control select-picker">
                             <select name="won_deal_id" id="won_deal_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                 <option value="">--</option>
                             </select>
                             <label id="won_deal_id_error" class="text-danger" for="won_deal_id"></label>
                         </div>
                     </div>
                     @endif

                    <div class="col-sm-12 col-md-6 col-lg-3 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="reminder_time">When should the system remind you about this note?
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

                    <div class="col-lg-12 mt-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="notetext">Note
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <textarea class="form-control" name="notetext" id="notetext" rows="10"></textarea>
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
        $('#note_type').change(function() {
            // ONLY FOR PROJECT MANAGER
            @if(Auth::user()->role_id == 4)
                if ($(this).val() == 'Project') {
                    $('#clientField').show();
                    $('#projectField').show();
                    $('#milestoneField').show();
                    $('#taskField').show();
                } else {
                    $('#clientField').hide();
                    $('#projectField').hide();
                    $('#milestoneField').hide();
                    $('#taskField').hide();
                }
            @endif
            // ONLY FOR lEAD MANAGER
            @if(Auth::user()->role_id == 6)
                if ($(this).val() == 'Task') {
                    $('#clientField').show();
                    $('#taskField').show();
                    $('#subtaskField').show();
                } else {
                    $('#clientField').hide();
                    $('#taskField').hide();
                    $('#subtaskField').hide();
                }
            @endif
            // ONLY FOR DEVELOPERS
            @if(Auth::user()->role_id == 5)
                if ($(this).val() == 'Sub-Task') {
                    $('#clientField').show();
                    $('#subtaskField').show();
                } else {
                    $('#clientField').hide();
                    $('#subtaskField').hide();
                }
            @endif
            // ONLY FOR ADMIN/Team lead
            @if (Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 7)
                const selectedValue = $(this).val();
                $('#clientField').hide();
                $('#projectField').hide();
                $('#milestoneField').hide();
                $('#taskField').hide();
                $('#dealField').hide();
                $('#wonDealField').hide();

                if (selectedValue == 'Project') {
                    $('#clientField').show();
                    $('#projectField').show();
                    $('#milestoneField').show();
                    $('#taskField').show();
                } else if (selectedValue == 'Deal') {
                    $('#clientField').show();
                    $('#dealField').show();
                } else if (selectedValue == 'Won Deal') {
                    $('#clientField').show();
                    $('#wonDealField').show();
                }
            @endif
        });
        // ONLY FOR PROJECTS DROPDOWN
        $('#client_id').change(function() {
            var client_id = $(this).val();
            @if(Auth::user()->role_id == 8 || Auth::user()->role_id == 1 || Auth::user()->role_id == 7)
            var note_type = $('#note_type').val();
            var data = {
                'client_id': client_id,
                'note_type': note_type
            }
            @else
            var data = {
                'client_id': client_id
            }
            @endif
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky_notes.client_project')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    @if (Auth::user()->role_id == 4)
                        $('#project_id').empty();
                        $('#project_id').append('<option value="">--</option>');
                        $.each(response, function(index, project) {
                            $('#project_id').append('<option value="' + project.id + '">' + project.project_name + '</option>');
                        });
                        $('#project_id').selectpicker('refresh');
                    @elseif (Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 7)
                        if(response.status == 'deal'){
                            $('#deal_id').empty();
                            $('#deal_id').append('<option value="">--</option>');
                            $.each(response.data, function(index, project) {
                                $('#deal_id').append('<option value="' + project.id + '">' + project.project_name + '</option>');
                            });
                            $('#deal_id').selectpicker('refresh');
                        }else if(response.status == 'won_deal'){
                            $('#won_deal_id').empty();
                            $('#won_deal_id').append('<option value="">--</option>');
                            $.each(response.data, function(index, project) {
                                $('#won_deal_id').append('<option value="' + project.id + '">' + project.project_name + '</option>');
                            });
                            $('#won_deal_id').selectpicker('refresh');
                        }else{
                            $('#project_id').empty();
                            $('#project_id').append('<option value="">--</option>');
                            $.each(response.data, function(index, project) {
                                $('#project_id').append('<option value="' + project.id + '">' + project.project_name + '</option>');
                            });
                            $('#project_id').selectpicker('refresh');
                        }

                    @elseif (Auth::user()->role_id == 6)
                        $('#task_id').empty();
                        $('#task_id').append('<option value="">--</option>');
                        $.each(response, function(index, task) {
                            $('#task_id').append('<option value="' + task.id + '">' + task.heading + '</option>');
                        });
                        $('#task_id').selectpicker('refresh');
                    @elseif (Auth::user()->role_id == 5)
                        $('#subtask_id').empty();
                        $('#subtask_id').append('<option value="">--</option>');
                        $.each(response, function(index, subtask) {
                            $('#subtask_id').append('<option value="' + subtask.id + '">' + subtask.title + '</option>');
                        });
                        $('#subtask_id').selectpicker('refresh');
                    @endif
                },
                error: function(error) {
                    // console.log(response);
                }
            });
        });
        // ONLY FOR MILESTONES DROPDOWN
        $('#project_id').change(function() {
            var project_id = $(this).val();
            var data = {
                'project_id': project_id
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky_notes.project_milestone')}}",
                data: data,
                dataType: "json",
                success: function(response) {
                    // Populate Milestones
                    $('#milestone_id').empty();
                    $('#milestone_id').append('<option value="">--</option>');
                    $.each(response.project_milestones, function(index, milestone) {
                        $('#milestone_id').append('<option value="' + milestone.id + '">' + milestone.milestone_title + '</option>');
                    });
                    $('#milestone_id').selectpicker('refresh');

                    // Populate Tasks
                    $('#task_id').empty();
                    $('#task_id').append('<option value="">--</option>');
                    $.each(response.project_tasks, function(index, task) {
                        $('#task_id').append('<option value="' + task.id + '">' + task.heading + '</option>');
                    });
                    $('#task_id').selectpicker('refresh');
                },
                error: function(error) {
                    // Handle error
                }
            });
        });
        // ONLY FOR TASKS DROPDOWN
        $('#milestone_id').change(function() {
            var milestone_id = $(this).val();
            var data = {
                'milestone_id': milestone_id
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky_notes.milestone_task')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#task_id').empty();
                    $('#task_id').append('<option value="">--</option>');
                    $.each(response, function(index, task) {
                        $('#task_id').append('<option value="' + task.id + '">' + task.heading + '</option>');
                    });
                    $('#task_id').selectpicker('refresh');
                },
                error: function(error) {
                    // console.log(response);
                }
            });
        });
        // ONLY FOR SUBTASKS DROPDOWN
        $('#task_id').change(function() {
            var task_id = $(this).val();
            var data = {
                'task_id': task_id
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky_notes.subtask')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('#subtask_id').empty();
                    $('#subtask_id').append('<option value="">--</option>');
                    $.each(response, function(index, subtask) {
                        $('#subtask_id').append('<option value="' + subtask.id + '">' + subtask.title + '</option>');
                    });
                    $('#subtask_id').selectpicker('refresh');
                },
                error: function(error) {
                    // console.log(response);
                }
            });
        });
        @if (Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 7)
        // ONLY FOR CLIENTS DROPDOWN
        $('#note_type').change(function() {
            var note_type = $(this).val();
            var data = {
                'note_type': note_type
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky_notes.clients')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    @if(Auth::user()->role_id == 8 || Auth::user()->role_id == 1 || Auth::user()->role_id == 7)
                        $('#client_id').empty();
                        $('#client_id').append('<option value="">--</option>');
                        $.each(response, function(index, data) {
                            $('#client_id').append('<option value="' + data.id + '">' + data.name + '</option>');
                        });
                        $('#client_id').selectpicker('refresh');

                    @elseif (Auth::user()->role_id == 6)
                        $('#task_id').empty();
                        $('#task_id').append('<option value="">--</option>');
                        $.each(response, function(index, task) {
                            $('#task_id').append('<option value="' + task.id + '">' + task.heading + '</option>');
                        });
                        $('#task_id').selectpicker('refresh');

                    @elseif (Auth::user()->role_id == 5)
                        $('#subtask_id').empty();
                        $('#subtask_id').append('<option value="">--</option>');
                        $.each(response, function(index, subtask) {
                            $('#subtask_id').append('<option value="' + subtask.id + '">' + subtask.title + '</option>');
                        });
                        $('#subtask_id').selectpicker('refresh');
                    @endif
                },
                error: function(error) {
                    // console.log(response);
                }
            });
        });
        @endif
    });
    $(document).ready(function() {        
        $('#save-notice').click(function(e){
            e.preventDefault();
            $('#save-notice').attr("disabled", true);
            $('#save-notice').html("Processing...");

            var data= {
                '_token': "{{ csrf_token() }}",
                'colour': document.getElementById("colour").value,
                'note_type': document.getElementById("note_type").value,
                'client_id': document.getElementById("client_id").value,
                @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 8 || Auth::user()->role_id == 1)
                'project_id': document.getElementById("project_id").value,
                'milestone_id': document.getElementById("milestone_id").value,
                'task_id': document.getElementById("task_id").value,
                @endif
                @if (Auth::user()->role_id == 6)
                'task_id': document.getElementById("task_id").value,
                'subtask_id': document.getElementById("subtask_id").value,
                @endif
                @if (Auth::user()->role_id == 5)
                'subtask_id': document.getElementById("subtask_id").value,
                @endif
                @if (Auth::user()->role_id == 8 || Auth::user()->role_id == 1 || Auth::user()->role_id == 7)
                'deal_id': document.getElementById("deal_id").value,
                'won_deal_id': document.getElementById("won_deal_id").value,
                @endif
                'reminder_time': document.getElementById("reminder_time").value,
                'notetext': document.getElementById("notetext").value,
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('sticky-notes.store')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response.status==200) {
                        $(location).prop('href', '{{route("sticky-notes.index")}}');
                        toastr.success('Note Added Successfully');
                        $('#save-notice').attr("disabled", false);
                        $('#save-notice').html("Submit");
                    }
                },
                error: function(error) {
                    if(error.responseJSON.errors.colour){
                        $('#colour_error').text(error.responseJSON.errors.colour);
                    }else{
                        $('#colour_error').text('');
                    }
                    if(error.responseJSON.errors.note_type){
                        $('#note_type_error').text(error.responseJSON.errors.note_type);
                    }else{
                        $('#note_type_error').text('');
                    }
                    if(error.responseJSON.errors.client_id){
                        $('#client_id_error').text(error.responseJSON.errors.client_id);
                    }else{
                        $('#client_id_error').text('');
                    }
                    if(error.responseJSON.errors.project_id){
                        $('#project_id_error').text(error.responseJSON.errors.project_id);
                    }else{
                        $('#project_id_error').text('');
                    }
                    if(error.responseJSON.errors.milestone_id){
                        $('#milestone_id_error').text(error.responseJSON.errors.milestone_id);
                    }else{
                        $('#milestone_id_error').text('');
                    }
                    if(error.responseJSON.errors.task_id){
                        $('#task_id_error').text(error.responseJSON.errors.task_id);
                    }else{
                        $('#task_id_error').text('');
                    }
                    if(error.responseJSON.errors.subtask_id){
                        $('#subtask_id_error').text(error.responseJSON.errors.subtask_id);
                    }else{
                        $('#subtask_id_error').text('');
                    }
                    if(error.responseJSON.errors.deal_id){
                        $('#deal_id_error').text(error.responseJSON.errors.deal_id);
                    }else{
                        $('#deal_id_error').text('');
                    }
                    if(error.responseJSON.errors.won_deal_id){
                        $('#won_deal_id_error').text(error.responseJSON.errors.won_deal_id);
                    }else{
                        $('#won_deal_id_error').text('');
                    }
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
