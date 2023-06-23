<div class="modal fade" id="addwebsitethememodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Add Website Theme</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="POST"  autocomplete="off" id="webForm">
                @csrf
                <div class="modal-body">
                    <div class="form-group">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="theme_name">Chose Website Theme Name
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" class="form-control height-35 f-14 error" placeholder="Type website theme name" name="theme_name" id="theme_name" autocomplete="off" aria-invalid="true">
                        <label id="theme_nameError" class="text-danger" for="theme_name"></label>
                    </div>
                    <div class="form-group">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="theme_url">Chose Website Theme URL
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="url" class="form-control height-35 f-14 error" placeholder="Type website theme url" name="theme_url" id="theme_url" autocomplete="off" aria-invalid="true">
                        <label id="theme_urlError" class="text-danger" for="theme_url"></label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add_theme_name">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#add_theme_name').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#add_theme_name').attr("disabled", true);
        $('#add_theme_name').html("Processing...");
        var data = {
            '_token': "{{ csrf_token() }}",
            'theme_name': document.getElementById("theme_name").value,
            'theme_url': document.getElementById("theme_url").value,
        };
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('add-website-theme')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 200){
                    window.location.reload();
                    $('#add_theme_name').attr("disabled", false);
                    $('#add_theme_name').html("Save");
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Website Theme Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            },
            error: function(error) {
                if(error.responseJSON.errors.theme_name){
                    $('#theme_nameError').text(error.responseJSON.errors.theme_name);
                }else{
                    $('#theme_nameError').text('');
                }
                if(error.responseJSON.errors.theme_url){
                    $('#theme_urlError').text(error.responseJSON.errors.theme_url);
                }else{
                    $('#theme_urlError').text('');
                }
                $('#add_theme_name').attr("disabled", false);
                $('#add_theme_name').html("Save");
            }
        });
    });
</script>
