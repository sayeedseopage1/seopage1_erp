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
                        <input type="text" class="form-control height-35 f-14 error search-cms" placeholder="Type cms name" name="cms_name" id="cms_name" autocomplete="off" aria-invalid="true">
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
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.2/bootstrap3-typeahead.min.js"></script>
<script>
    var path = "{{ route('check-cms') }}";
    $('input.search-cms').typeahead({
        source: function(cms_name, process){
            return $.get(path, {cms_name: cms_name}, function(data){
                return process(data)
            })
        }
    });

    $('#add_cms').click(function(e){
        e.preventDefault();
        $('#add_cms').attr("disabled", true).html("Processing...");
        var data = {
            '_token': "{{ csrf_token() }}",
            'cms_name': $('#cms_name').val(),
        };

        $.ajax({
            type: "POST",
            url: "{{ route('add-cms') }}",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == 200){
                    window.location.reload();
                }
            },
            error: function(error) {
                if(error.responseJSON.errors.cms_name){
                    $('#cms_nameError').text(error.responseJSON.errors.cms_name);
                } else {
                    $('#cms_nameError').text('');
                }
            },
            complete: function() {
                $('#add_cms').attr("disabled", false).html("Save");
            }
        });
    });
</script>
