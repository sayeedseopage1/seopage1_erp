<div class="modal fade" id="editnichemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Edit Niche Category</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post"  autocomplete="off" id="updateCategoryForm">
                @csrf
                <input type="hidden" id="id">
                <div class="modal-body">
                    <div class="row border-top-grey">
                        <div class="col-sm-6">
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Category Name
                                    <sup class="f-14 mr-1">*</sup>
                                </label>
                                <input type="text" class="form-control height-35 f-14" placeholder="Enter a category name" name="category_name2" id="category_name2">
                                <span id="category_nameError" class="text-danger mt-2"></span>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            @php
                                $categories = \App\Models\ProjectNiche::whereNull('parent_category_id')->get();
                            @endphp
                            <div class="form-group my-3">
                                <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Select Parent Category</label>
                                <select name="parent_category_id" id="parent_category_id" class="form-control height-35 f-14">
                                    <option value="" selected>--</option>
                                    @foreach($categories as $category)
                                        <option value="{{$category->id}}">{{$category->category_name}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="update_niche">Submit</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    $(document).on('click', '.update_category_form', function() {
        let id = $(this).data('id');
        let category_name = $(this).data('name');
        let parent_category_id = $('#parent_category_id').val();

        $('#id').val(id);
        $('#category_name2').val(category_name);

        $('#editnichemodal').modal('show');
    });

    $(document).on('click', '#update_niche', function(e) {
        e.preventDefault();
        $('#update_niche').attr("disabled", true);
        $('#update_niche').html("Processing...");
        let id = $('#id').val();
        let category_name = $('#category_name2').val();
        let parent_category_id = $('#parent_category_id').val();

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({
            url: '/projects/update-category/' + id,
            method: 'get',
            data: {
                id: id,
                category_name: category_name,
                parent_category_id: parent_category_id // Add parent_category_id to the data object
            },
            success: function(res) {
                if (res.status == 200) {
                    $('#editnichemodal').modal('hide');
                    $('#update_niche').attr("disabled", false);
                    $('#update_niche').html("Submit");
                    window.location.reload();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category Update Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            },
            error: function(err) {
                $('#update_niche').attr("disabled", false);
                $('#update_niche').html("Submit");
            }
        });
    });
</script>
