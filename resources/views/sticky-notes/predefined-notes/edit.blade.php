@php
    $predefinedNote = App\Models\PredefinedNote::find($id);
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">Edit Predefined Note</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body">
    <form>
        <div class="form-group">
            <label for="note_text">Note
                <span class="text-danger">*</span>
            </label>
            <textarea class="form-control" style="overflow-y: scroll; height:200px" id="noteText" name="noteText" rows="8" required>{{ $predefinedNote->note_text }}</textarea>
            <span class="text-danger" id="note_text_error"></span>
        </div>
        <button type="submit" id="update-note" class="btn btn-primary rounded f-14 p-2">Update</button>
    </form>
</div>
<script>
    $(document).ready(function() {        
        $('#update-note').click(function(e){
            e.preventDefault();
            $('#update-note').attr("disabled", true);
            $('#update-note').html("Processing...");

            var data= {
                '_token': "{{ csrf_token() }}",
                'note_text': document.getElementById("noteText").value,
                'id': "{{ $predefinedNote->id }}",
            }
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('predefined-notes.update')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response.status==200) {
                        toastr.success('Note Updated Successfully');
                        window.location.reload();
                        $('#update-note').attr("disabled", false);
                        $('#update-note').html("Submit");
                    }
                },
                error: function(error) {
                    if(error.responseJSON.errors.noteText){
                        $('#note_text_error').text(error.responseJSON.errors.noteText);
                    }else{
                        $('#note_text_error').text('');
                    }
                    $('#update-note').attr("disabled", false);
                    $('#update-note').html("Submit");
                }
            });
        });
    });
</script>