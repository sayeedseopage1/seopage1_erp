@php
    $pde = App\Models\ProjectDeadlineExtension::find($id);
    $project = App\Models\Project::where('id',$pde->project_id)->first();
    $pm = App\Models\User::where('id',$project->pm_id)->first();
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Project Deadline Authorization Form</h5>
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
                    <label for="current_deadline">Explanation why <span class="text-warning">{{$pm->name}}</span> needs more time to complete this project?</label>
                    <p>{!! $pde->description!!}</p>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="admin_comment">Comment on Authorization from <span class="text-warning">{{Auth::user()->name}}</span></label>
                    <textarea name="admin_comment" id="admin_comment" class="form-control"></textarea>
                    <span id="admin_comment_error" class="text-danger"></span>
                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
                    <script>
                        CKEDITOR.replace('admin_comment');
                    </script>
                </div>
            </div>
        </div>
        <button type="button" id="acceptBtn" class="btn btn-primary" value="accept">Accept</button>
        <button type="button" id="denyBtn" class="btn btn-danger" value="deny">Deny</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#acceptBtn').click(function(e){
        e.preventDefault();
        $('#acceptBtn').attr("disabled", true);
        $('#acceptBtn').html("Processing...");
        var admin_comment = CKEDITOR.instances.admin_comment.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'type': $('#acceptBtn').val(),
            'old_deadline': document.getElementById("current_deadline").value,
            'new_deadline': document.getElementById("new_deadline").value,
            'admin_comment': admin_comment,
            'pde_id': {{$pde->id}},
            'project_id': {{$pde->project_id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-pde-authorization')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Authorized Successfully');
                window.location.reload();
                $('#acceptBtn').attr("disabled", false);
                $('#acceptBtn').html("Authorize");
            },
            error: function(error) {
                if(error.responseJSON.errors.new_deadline){
                    $('#new_deadline_error').text(error.responseJSON.errors.new_deadline);
                }else{
                    $('#new_deadline_error').text('');
                }
                $('#acceptBtn').attr("disabled", false);
                $('#acceptBtn').html("Authorize");
            }
        });
    });
    $('#denyBtn').click(function(e){
        e.preventDefault();
        $('#denyBtn').attr("disabled", true);
        $('#denyBtn').html("Processing...");
        var admin_comment = CKEDITOR.instances.admin_comment.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'type': $('#denyBtn').val(),
            'new_deadline': document.getElementById("new_deadline").value,
            'admin_comment': admin_comment,
            'pde_id': {{$pde->id}},
            'project_id': {{$pde->project_id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('store-pde-authorization')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Deny Successfully');
                window.location.reload();
                $('#denyBtn').attr("disabled", false);
                $('#denyBtn').html("Authorize");
            },
            error: function(error) {
                if(error.responseJSON.errors.new_deadline){
                    $('#new_deadline_error').text(error.responseJSON.errors.new_deadline);
                }else{
                    $('#new_deadline_error').text('');
                }
                $('#denyBtn').attr("disabled", false);
                $('#denyBtn').html("Authorize");
            }
        });
    });
</script>