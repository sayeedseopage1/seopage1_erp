@php
    $websitePlugin = App\Models\ProjectWebsitePlugin::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit Website Plugin</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Plugin Name</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a theme name" name="plugin_name" id="plugin_name2" value="{{$websitePlugin->plugin_name}}">
                    <span id="plugin_name_error" class="text-danger"></span>
                </div>
            </div>
            <div class="col-md-12">
                <div class="form-group">
                    <label for="current_deadline">Plugin Url</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a theme url" name="plugin_url" id="plugin_url2" value="{{$websitePlugin->plugin_url}}">
                    <span id="plugin_url_error" class="text-danger"></span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="update_website_plugin">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#update_website_plugin').click(function(e){
        e.preventDefault();
        $('#update_website_plugin').attr("disabled", true);
        $('#update_website_plugin').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'plugin_name': document.getElementById("plugin_name2").value,
            'plugin_url': document.getElementById("plugin_url2").value,
            'id': {{$websitePlugin->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update-website-plugin')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Submit Successfully');
                window.location.reload();
                $('#update_website_plugin').attr("disabled", false);
                $('#update_website_plugin').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.plugin_name){
                    $('#plugin_name_error').text(error.responseJSON.errors.plugin_name);
                }else{
                    $('#plugin_name_error').text('');
                }
                if(error.responseJSON.errors.plugin_url){
                    $('#plugin_url_error').text(error.responseJSON.errors.plugin_url);
                }else{
                    $('#plugin_url_error').text('');
                }
                $('#update_website_plugin').attr("disabled", false);
                $('#update_website_plugin').html("Submit");
            }
        });
    });
</script>
