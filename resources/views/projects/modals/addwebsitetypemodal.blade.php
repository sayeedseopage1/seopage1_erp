<div class="modal fade" id="addwebsitetypemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modelHeading">Add Website Type</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="POST"  autocomplete="off" id="webForm">
                @csrf
                <div class="modal-body">
                    <div class="form-group">
                        <label class="f-14 text-dark-grey mb-12" data-label="true" for="website_type">Chose Website Type
                            <sup class="f-14 mr-1">*</sup>
                        </label>
                        <input type="text" class="form-control height-35 f-14 error search-website-type" placeholder="Type website type" name="website_type" id="website_type" autocomplete="off" aria-invalid="true">
                        <label id="website_typeError" class="text-danger" for="website_type"></label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" id="add_website_type">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js"></script>
<script>
    var path = "{{ route('check-website-type') }}";
    $('input.search-website-type').typeahead({
        source: function(website_type, process){
            return $.get(path, {website_type: website_type}, function(data){
                return process(data)
            })
        }
    });
    $('#add_website_type').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#add_website_type').attr("disabled", true);
        $('#add_website_type').html("Processing...");
        var data = {
            '_token': "{{ csrf_token() }}",
            'website_type': document.getElementById("website_type").value,
        };
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('add-website-type')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.message);
                if (response.status == 200){
                    window.location.reload();
                    $('#add_website_type').attr("disabled", false);
                    $('#add_website_type').html("Save");
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Website Type Added Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            },
            error: function(error) {
                if(error.responseJSON.errors.website_type){
                    $('#website_typeError').text(error.responseJSON.errors.website_type);
                }else{
                    $('#website_typeError').text('');
                }
                $('#add_website_type').attr("disabled", false);
                $('#add_website_type').html("Save");
            }
        });
    });
</script>
