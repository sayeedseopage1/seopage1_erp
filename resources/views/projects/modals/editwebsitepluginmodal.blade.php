<div class="modal fade" id="editwebsitepluginmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Edit Website Plugin</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post"  autocomplete="off">
                @csrf
                @method('PUT')
                <input type="hidden" id="id">
                <div class="modal-body">
                    <div class="row border-top-grey">
                        <div class="col-sm-12">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Plugin Name</label>
                                <input type="text" class="form-control height-35 f-14" placeholder="Enter a plugin" name="plugin_name2" id="plugin_name2">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Plugin URL</label>
                                <input type="url" class="form-control height-35 f-14" placeholder="Enter a theme url" name="plugin_url2" id="plugin_url2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="update_website_plugin">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $(document).on('click', '.update_website_plugin_form', function() {
        let id = $(this).data('id');
        let plugin_name = $(this).data('name');
        let plugin_url = $(this).data('url');

        $('#id').val(id);
        $('#plugin_name2').val(plugin_name);
        $('#plugin_url2').val(plugin_url);
    });

    $(document).on('click', '#update_website_plugin', function(e) {
        e.preventDefault();
        $('#update_website_plugin').attr("disabled", true);
        $('#update_website_plugin').html("Processing...");
        let id = $('#id').val();
        let plugin_name = $('#plugin_name2').val();
        let plugin_url = $('#plugin_url2').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/projects/update-website-plugin/'+id,
            method: 'put',
            data: {
                id: id,
                plugin_name: plugin_name,
                plugin_url: plugin_url,
            },
            success: function(res) {
                if (res.status == 200) {
                    $('#update_website_plugin').attr("disabled", false);
                    $('#update_website_plugin').html("Submit");
                    window.location.reload();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Website Plugin Update Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            },
            error: function(err) {
                $('#update_website_plugin').attr("disabled", false);
                $('#update_website_plugin').html("Submit");
            }
        });
    });
</script>
