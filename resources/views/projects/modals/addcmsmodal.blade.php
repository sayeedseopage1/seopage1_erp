<div class="modal fade" id="addcmsmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">CMS</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="POST"  autocomplete="off" id="cmsForm">
                @csrf
                <div class="modal-body">
                    <div class="form-group">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="cms_name">Cms Name
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" class="form-control height-35 f-14 error" placeholder="Type cms name" name="cms_name" id="cms_name" autocomplete="off" aria-invalid="true">
                        <label id="cms_nameError" class="text-danger" for="cms_name"></label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add_cms">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $('#add_cms').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#add_cms').attr("disabled", true);
        $('#add_cms').html("Processing...");
        var data = {
            '_token': "{{ csrf_token() }}",
            'cms_name': document.getElementById("cms_name").value,
        };
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('add-cms')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.message);
                if (response.status == 200){
                    window.location.reload();
                    $('#addcmsmodal').modal('hide');
                    $('#addcmsmodal').find('input').val("");
                    $('#add_cms').attr("disabled", false);
                    $('#add_cms').html("Save");
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Cms Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            },
            error: function(error) {
                if(error.responseJSON.errors.cms_name){
                    $('#cms_nameError').text(error.responseJSON.errors.cms_name);
                }else{
                    $('#cms_nameError').text('');
                }
                $('#add_cms').attr("disabled", false);
                $('#add_cms').html("Save");
            }
        });
    });
</script>
