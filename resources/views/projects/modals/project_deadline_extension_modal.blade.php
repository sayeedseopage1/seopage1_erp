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
                    <input type="text" class="form-control height-35 f-14" id="current_deadline" name="current_deadline" value="{{$project->deadline}}" readonly>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="new_deadline">New Deadline</label>
                    <input type="date" class="form-control height-35 f-14" id="new_deadline" name="new_deadline">
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-md-6">
                <label for="">Explain why you need more time to complete this project?</label>
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
                    <input class="form-check-input" type="radio" name="extension" id="extension2" value="option2">
                    <label class="form-check-label ml-2 mt-1" for="extension2">Client Was Unavailable</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension3" value="option2">
                    <label class="form-check-label ml-2 mt-1" for="extension3">Couldn't Complete On Time</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="extension" id="extension4" value="option2">
                    <label class="form-check-label ml-2 mt-1" for="extension4">Others</label>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" class="form-control"></textarea>
                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('description');
                    </script>
                </div>
            </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
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

{{-- <script>
    // save leave
    $('#save-leave').click(function() {
        let url = '{{ route("leaves.leave_action") }}';
        let action = '{{ $leaveAction }}';
        let leaveId = '{{ $leaveID }}';
        let userId = $('.leave-action-reject').data('user-id');
        let reason = $('#reason').val();

        $.easyAjax({
            url: url,
            type: "POST",
            blockUI: true,
            data: { 'action': action, 'leaveId': leaveId, '_token': '{{ csrf_token() }}', 'reason': reason, 'userId': userId },
            success: function(response) {
                if (response.status == "success") {
                    window.location.reload();
                }
            }
        })
    });
</script> --}}
