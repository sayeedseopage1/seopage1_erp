@php
    $websiteType = App\Models\ProjectWebsiteType::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit Website Type</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Chose Website Type</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a cms name" name="website_type" id="website_type2" value="{{$websiteType->website_type}}">
                    <span id="website_type_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="update_website_type">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#update_website_type').click(function(e){
        e.preventDefault();
        $('#update_website_type').attr("disabled", true);
        $('#update_website_type').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'website_type': document.getElementById("website_type2").value,
            'id': {{$websiteType->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update-website-type')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Submit Successfully');
                window.location.reload();
                $('#update_website_type').attr("disabled", false);
                $('#update_website_type').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.website_type){
                    $('#website_type_error').text(error.responseJSON.errors.website_type);
                }else{
                    $('#website_type_error').text('');
                }
                $('#update_website_type').attr("disabled", false);
                $('#update_website_type').html("Submit");
            }
        });
    });
</script>
