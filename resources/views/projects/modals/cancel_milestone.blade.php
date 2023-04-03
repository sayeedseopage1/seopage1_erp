{{--lost modal --}}
<div class="modal fade" id="cancel-milestone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Cancel Milestone</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form class="" action="{{route('cancel-milestone')}}" method="post">
          @csrf
          {{-- <input type="hidden" name='milestone_id' id="milestone_id" value="{{$item->id}}"> --}}

        
        <div class="modal-body">
          <div class="col-md-12">
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Please Describe the reason<span style="color:red;">*</span></label>
  {{--            <textarea name="comments" class="form-control" id="comment2" rows="3" required></textarea>--}}
                <textarea name="comments" id="comment2" class="form-control"></textarea>
                <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                <script>
                    CKEDITOR.replace('comments');
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
          <button type="button" class="btn btn-secondary close-button" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" id="cancelMilestone">Cancel Milestone</button>
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
      $('#cancelMilestone').click(function(e){
          e.preventDefault();
          // alert('ok');
          var comments = CKEDITOR.instances.comment2.getData();
          var data= {
            '_token': "{{ csrf_token() }}",
            'comments': comments,
            'id': milestone_id.value,
        }
        
          console.log(data);
          $.ajaxSetup({
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              }
          });
          $.ajax({
              type: "POST",
              url: "{{route('deal-stage-update-lost')}}",
              data: data,
              dataType: "json",
              success: function (response) {
                  // console.log(response.status)
                  if (response.status == 400) {
                      $('#errorMsg').html("");
                      $("#updateLost").text("Update");
                      $("#updateLost").attr("disabled", false);
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
      $("#updateLost").on('click',function() {
          $("#updateLost").attr("disabled", true);
          $("#updateLost").text("Processing ...");
      })
  </script>
  