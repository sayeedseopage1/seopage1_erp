<div class="modal fade" id="nicheaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
    <div class="modal-content">
      <div class="modal-header">
       <h5 class="modal-title" id="modelHeading">Niche Category</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form method="POST"  autocomplete="off" id="categoryForm">
          @csrf
          <div class="modal-body">
            <div class="row border-top-grey ">
                <div class="col-sm-6">
                    <div class="form-group my-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Category Name
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" class="form-control height-35 f-14 search-niche-category" placeholder="Enter a category name" name="category_name" id="category_name">
                        <span id="category_nameError" class="text-danger mt-2"></span>
                    </div>
                </div>
                <div class="col-sm-6">
                    @php
                        $categories = \App\Models\ProjectNiche::whereNull('parent_category_id')->get();
                    @endphp
                    <div class="form-group my-3">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Select Parent Category</label>
                        <select name="parent_category_id" id="parent_category" class="form-control height-35 f-14">
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
              <button type="button" class="btn btn-primary" id="add_niche">Save</button>
          </div>
      </form>
    </div>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js"></script>
<script>
    var path = "{{ route('check-niche-category') }}";
    $('input.search-niche-category').typeahead({
        source: function(category_name, process){
            return $.get(path, {category_name: category_name}, function(data){
                return process(data)
            })
        }
    });
    $(document).ready(function() {
        $('#parent_category').on('change', function() {
            var parentCategoryId = $(this).val();
            if (parentCategoryId) {
                $.ajax({
                    url: '/projects/get-sub-category/' + parentCategoryId,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        $('#sub_category').empty();
                        $('#sub_category').append('<option value="">--</option>');
                        $.each(data, function(index, subcategory) {
                            $('#sub_category').append('<option value="' +
                                subcategory.id + '">' + subcategory.category_name + '</option>');
                        });
                    }
                });
            } else {
                $('#sub_category').empty();
                $('#sub_category').append('<option value="">--</option>');
                $('#sub_sub_category').empty();
                $('#sub_sub_category').append('<option value="">--</option>');
            }
        });
    });
    $('#add_niche').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#add_niche').attr("disabled", true);
        $('#add_niche').html("Processing...");
        var data = {
            '_token': "{{ csrf_token() }}",
            'category_name': document.getElementById("category_name").value,
            'parent_category_id': document.getElementById("parent_category").value,
            // 'sub_category_id': document.getElementById("sub_category").value,
        };
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('add-niche')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.message);
                if (response.status == 200){
                    window.location.reload();
                    $('#nicheaddmodal').modal('hide');
                    $('#nicheaddmodal').find('input').val("");
                    $('#add_niche').attr("disabled", false);
                    $('#add_niche').html("Save");
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Category Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            },
            error: function(error) {
                // console.log(response);
                if(error.responseJSON.errors.category_name){
                    $('#category_nameError').text(error.responseJSON.errors.category_name);
                }else{
                    $('#category_nameError').text('');
                }
                $('#add_niche').attr("disabled", false);
                $('#add_niche').html("Save");
            }
        });
    });
</script>
