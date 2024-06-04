@php
    $category = App\Models\ProjectNiche::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit Category</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form action="">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="category_name">Category Name</label>
                    <input type="text" class="form-control height-35 f-14" placeholder="Enter a category name" name="category_name" id="category_name2" value="{{$category->category_name}}">
                    <span id="category_name_error" class="text-danger"></span>
                </div>
            </div>
            <div class="col-md-6">
                @php
                    $categories = \App\Models\ProjectNiche::whereNull('parent_category_id')->get();
                @endphp
                <div class="form-group">
                    <label class="f-14 text-dark-grey" data-label="true" for="category_name">Select Parent Category</label>
                    <select name="parent_category_id" id="parent_category_id2" class="form-control height-35 f-14">
                        <option value="" selected>--</option>
                        @foreach($categories as $item)
                            <option value="{{$item->id}}" {{ $item->id == $category->parent_category_id ? 'selected' : '' }}>
                                {{$item->category_name}}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary mt-3" id="update_niche">Submit</button>
    </form>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0 mr-3">@lang('app.close')</x-forms.button-cancel>
</div>
<script>
    $('#update_niche').click(function(e){
        e.preventDefault();
        $('#update_niche').attr("disabled", true);
        $('#update_niche').html("Processing...");
        var data= {
            '_token': "{{ csrf_token() }}",
            'category_name': document.getElementById("category_name2").value,
            'parent_category_id': document.getElementById("parent_category_id2").value,
            'id': {{$category->id}},
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('update-niche-category')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                toastr.success('Submit Successfully');
                window.location.reload();
                $('#update_niche').attr("disabled", false);
                $('#update_niche').html("Submit");
            },
            error: function(error) {
                if(error.responseJSON.errors.category_name){
                    $('#category_name_error').text(error.responseJSON.errors.category_name);
                }else{
                    $('#category_name_error').text('');
                }
                $('#update_niche').attr("disabled", false);
                $('#update_niche').html("Submit");
            }
        });
    });
</script>