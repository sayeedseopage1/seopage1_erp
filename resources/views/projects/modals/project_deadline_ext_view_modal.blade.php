@php
    $pde = App\Models\ProjectDeadlineExtension::find($id);
    $project = App\Models\Project::where('id',$pde->project_id)->first();
    $pm = App\Models\User::where('id',$project->pm_id)->first();
    $approved_by = App\Models\User::where('id',$pde->approved_by)->first();
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Project Deadline Authorization View</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label for="current_deadline">Current Deadline</label>
                <input type="text" class="form-control height-35 f-14" id="current_deadline" name="current_deadline" value="{{$pde->old_deadline}}" readonly>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="new_deadline">New Deadline <span class="text-danger">*</span></label>
                <input type="date" class="form-control height-35 f-14" id="new_deadline" name="new_deadline" value="{{$pde->new_deadline}}" readonly>
                <span id="new_deadline_error" class="text-danger"></span>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label class="f-18">Explanation why <span class="text-warning">{{$pm->name}}</span> needs more time to complete this project?</label>
                <p>{!! $pde->description!!}</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label class="f-18">Comment on Authorization from <span class="text-warning">{{Auth::user()->name}}</span></label>
                <p>{!! $pde->admin_comment !!}</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label class="f-18">This request was accepted and authorized by <span class="text-warning">{{$approved_by->name}}</span> on DateTime ({{Carbon\Carbon::parse($pde->approved_on)->format('M d, Y \a\t h:i a')}})</label>
            </div>
        </div>
    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>