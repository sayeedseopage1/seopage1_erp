@php
    $pde = App\Models\ProjectDeadlineExtension::find($id);
    $project = App\Models\Project::where('id',$pde->project_id)->first();
    $pm = App\Models\User::where('id',$project->pm_id)->first();
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
                    <input type="text" class="form-control height-35 f-14" id="current_deadline" name="current_deadline" value="{{$pde->old_deadline}}" readonly>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="new_deadline">New Deadline <span class="text-danger">*</span></label>
                    <input type="date" class="form-control height-35 f-14" id="new_deadline" name="new_deadline" value="{{$pde->new_deadline}}">
                    <span id="new_deadline_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Explanation why <span class="text-success">{{$pm->name}}</span> needs more time to complete this project?</label>
                    <p>{!! $pde->description!!}</p>
                </div>
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
