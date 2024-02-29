@php
    $project = App\Models\Project::where('id',$projectId)->first();
    $today = \Carbon\Carbon::now();
    $twoDaysAgo = $today->subDays(2);
    $milestones = App\Models\ProjectMilestone::where('project_id', $project->id)
    ->where(function ($query) use ($twoDaysAgo) {
        $query->where('created_at', '>=', $twoDaysAgo)
              ->where('created_at', '<=', now());
    })
    ->get();
    $deliverables = '';
    foreach ($milestones as $item) {
        $deliverables = App\Models\ProjectDeliverable::where('milestone_id',$item->id)->get();
    }
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Project Deadline Extension Form</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="current_deadline">Current Deadline</label>
                    <input type="text" class="form-control height-35 f-14" id="current_deadline" name="current_deadline" value="{{\Carbon\Carbon::parse($project->deadline)->format('Y-m-d')}}" readonly>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="new_deadline">New Deadline <span class="text-danger">*</span></label>
                    <input type="date" class="form-control height-35 f-14" id="new_deadline" name="new_deadline">
                    <span id="new_deadline_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-8">
                <label for="">Explain why you need more time to complete this project? <span class="text-danger">*</span></label>
                @if ($milestones->isNotEmpty())
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension1" value="Client Ordered New Things">
                    <label class="form-check-label ml-2 mt-1" for="extension1">Client Ordered New Things</label>
                </div>
                    <div class="ml-5 mt-2" id="clientOrderNewThingBox" style="display: none">
                        <div class="form-group">
                            <label for="milestone_id">Select Milestone</label>
                            <select class="form-control height-35 f-14" id="milestone_id" name="milestone_id">
                              <option>--</option>
                              @foreach ($milestones as $item)
                                    <option value="{{ $item->id }}">{{ $item->milestone_title }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="form-group">
                            @if ($deliverables->isNotEmpty())
                            <label for="deliverable_id">Select Deliverable</label>
                            <select class="form-control height-35 f-14" id="deliverable_id" name="deliverable_id">
                            <option>--</option>
                                @foreach ($deliverables as $deliverable)
                                    <option value="{{ $deliverable->id }}">{{ $deliverable->title }}</option>
                                @endforeach
                            </select>
                            @else
                            <a target="_blank" href="{{ route('projects.show',$project->id). '?tab=deliverables'}}" class="btn btn-primary">Add Deliverables</a>
                            @endif 
                        </div>
                    </div>
                @endif
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension2" value="Client Was Unavailable">
                    <label class="form-check-label ml-2 mt-1" for="extension2">Client Was Unavailable</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension3" value="Couldn't Complete On Time">
                    <label class="form-check-label ml-2 mt-1" for="extension3">Couldn't Complete On Time</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension4" value="Upsale/Cross sale">
                    <label class="form-check-label ml-2 mt-1" for="extension4">Upsale/Cross sale</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension5" value="Others">
                    <label class="form-check-label ml-2 mt-1" for="extension5">Others</label>
                </div>
                <span id="extension_error" class="text-danger"></span>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="description">Description <span class="text-danger">*</span></label>
                    <textarea name="description" id="description" class="form-control"></textarea>
                    <span id="description_error" class="text-danger"></span>
                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('description');
                    </script>
                </div>
            </div>
        </div>
        <button type="button" id="submitBtn" class="btn btn-primary">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>


<script>
    $(document).ready(function() {
      $('input[name="extension"]').change(function() {
        if ($(this).val() === "Client Ordered New Things") {
          $('#clientOrderNewThingBox').show();
        } else {
          $('#clientOrderNewThingBox').hide();
        }
      });
    });
</script>

<script>
    $('#submitBtn').click(function(e){
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var description = CKEDITOR.instances.description.getData();
        var extension = $('input[name="extension"]:checked').val();
        var data= {
            '_token': "{{ csrf_token() }}",
            'old_deadline': document.getElementById("current_deadline").value,
            'new_deadline': document.getElementById("new_deadline").value,
            @if ($milestones->isNotEmpty())
            'milestone_id': document.getElementById("milestone_id").value,
                @if ($deliverables->isNotEmpty())
                'deliverable_id': document.getElementById("deliverable_id").value,
                @endif
            @endif
            'description': description,
            'extension': extension,
            'project_id': {{$project->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-project-deadline-exp')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Project Deadline Extension Submit Successfully');
                window.location.reload();
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.new_deadline){
                    $('#new_deadline_error').text(error.responseJSON.errors.new_deadline);
                }else{
                    $('#new_deadline_error').text('');
                }
                if(error.responseJSON.errors.extension){
                    $('#extension_error').text(error.responseJSON.errors.extension);
                }else{
                    $('#extension_error').text('');
                }
                if(error.responseJSON.errors.description){
                    $('#description_error').text(error.responseJSON.errors.description);
                }else{
                    $('#description_error').text('');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });
    });
</script>
