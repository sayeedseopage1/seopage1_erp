<div class="modal fade" id="editwebsitethememodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Edit Website Theme</h5>
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
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Chose Website Theme Name</label>
                                <input type="text" class="form-control height-35 f-14" placeholder="Enter a theme name" name="theme_name2" id="theme_name2">
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Chose Website Theme URL</label>
                                <input type="url" class="form-control height-35 f-14" placeholder="Enter a theme url" name="theme_url2" id="theme_url2">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="update_website_theme">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $(document).on('click', '.update_website_theme_form', function() {
        let id = $(this).data('id');
        let theme_name = $(this).data('name');
        let theme_url = $(this).data('url');

        $('#id').val(id);
        $('#theme_name2').val(theme_name);
        $('#theme_url2').val(theme_url);
    });

    $(document).on('click', '#update_website_theme', function(e) {
        e.preventDefault();
        $('#update_website_theme').attr("disabled", true);
        $('#update_website_theme').html("Processing...");
        let id = $('#id').val();
        let theme_name = $('#theme_name2').val();
        let theme_url = $('#theme_url2').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/projects/update-website-theme/'+id,
            method: 'put',
            data: {
                id: id,
                theme_name: theme_name,
                theme_url: theme_url,
            },
            success: function(res) {
                if (res.status == 200) {
                    $('#update_website_theme').attr("disabled", false);
                    $('#update_website_theme').html("Submit");
                    window.location.reload();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Website Theme Update Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            },
            error: function(err) {
                $('#update_website_theme').attr("disabled", false);
                $('#update_website_theme').html("Submit");
            }
        });
    });
</script>
