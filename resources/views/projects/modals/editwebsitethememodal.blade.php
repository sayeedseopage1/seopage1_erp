@php
    $websiteTheme = App\Models\ProjectWebsiteTheme::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit Website Theme</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Theme Name</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a theme name" name="theme_name" id="theme_name2" value="{{$websiteTheme->theme_name}}">
                    <span id="theme_name_error" class="text-danger"></span>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Theme Url</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a theme url" name="theme_url" id="theme_url2" value="{{$websiteTheme->theme_url}}">
                    <span id="theme_url_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="update_website_theme">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#update_website_theme').click(function(e){
        e.preventDefault();
        $('#update_website_theme').attr("disabled", true);
        $('#update_website_theme').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'theme_name': document.getElementById("theme_name2").value,
            'theme_url': document.getElementById("theme_url2").value,
            'id': {{$websiteTheme->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update-website-theme')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Submit Successfully');
                window.location.reload();
                $('#update_website_theme').attr("disabled", false);
                $('#update_website_theme').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.theme_name){
                    $('#theme_name_error').text(error.responseJSON.errors.theme_name);
                }else{
                    $('#theme_name_error').text('');
                }
                if(error.responseJSON.errors.theme_url){
                    $('#theme_url_error').text(error.responseJSON.errors.theme_url);
                }else{
                    $('#theme_url_error').text('');
                }
                $('#update_website_theme').attr("disabled", false);
                $('#update_website_theme').html("Submit");
            }
        });
    });
</script>
