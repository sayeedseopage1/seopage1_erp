@php
    $projectCms = App\Models\ProjectCms::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit CMS</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">CMS Name</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a cms name" name="cms_name" id="cms_name2" value="{{$projectCms->cms_name}}">
                    <span id="cms_name_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="update_cms">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#update_cms').click(function(e){
        e.preventDefault();
        $('#update_cms').attr("disabled", true);
        $('#update_cms').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'cms_name': document.getElementById("cms_name2").value,
            'cms_id': {{$projectCms->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update-cms')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Submit Successfully');
                window.location.reload();
                $('#update_cms').attr("disabled", false);
                $('#update_cms').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.cms_name){
                    $('#cms_name_error').text(error.responseJSON.errors.cms_name);
                }else{
                    $('#cms_name_error').text('');
                }
                $('#update_cms').attr("disabled", false);
                $('#update_cms').html("Submit");
            }
        });
    });
</script>
