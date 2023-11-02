{{--lost modal --}}
<div class="modal fade" id="dm-lostmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Lost</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage-update-lost')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$deal->id}}">
      <div class="modal-body">
        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Comments<span style="color:red;">*</span></label>
              <textarea name="comments" id="dmComment" class="form-control"></textarea>
             <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
              <script>
                  CKEDITOR.replace('dmComment');
              </script>
              <label id="commentsError" class="error text-danger"></label>
          </div>
        </div>
      </div>
          <br>
          <ul id="errorMsg">

          </ul>
          <br>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" id="dmUpdateLost">Update</button>
      </div>
    </form>
    </div>
  </div>
</div>
{{--<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>--}}
<script>
// $(document).ready(function() {
//   $('#comment2').summernote();
// });

</script>
<script>
    $('#dmUpdateLost').click(function(e){
        e.preventDefault();
        // alert('ok');
        var comments = CKEDITOR.instances.dmComment.getData();
        // console.log(comments);
        var data= {
            '_token': "{{ csrf_token() }}",
            'comments': comments,
            'id': '{{$deal->id}}',
        }
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('digital-marketing-deal-update-lost')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.status)
                if (response.status == 400) {
                    $('#errorMsg').html("");
                    $("#dmUpdateLost").text("Update");
                    $("#dmUpdateLost").attr("disabled", false);
                    toastr.error('This filed is required!');
                }else{
                    if (response.status == 'success') {
                        $("#lostmodal").modal("hide");
                        window.location.reload();
                    }
                }
            },
        });
    });

</script>
<script>
    $("#dmUpdateLost").on('click',function() {
        $("#dmUpdateLost").attr("disabled", true);
        $("#dmUpdateLost").text("Processing ...");
    })
</script>
