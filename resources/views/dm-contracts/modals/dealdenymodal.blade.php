<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<div class="modal fade" id="dealdenymodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Deal Deny</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deny-deal')}}" method="post">
        @csrf


        <input type="hidden" name="id" value="{{$deal_id->id}}">

      <div class="modal-body">
        <h3>Are you sure you want to deny the deal?</h3>

                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="exampleFormControlTextarea1"><h4>Explain Your Reason <span style="color:red;">*</span></h5></label>
                                  <textarea name="reason" class="form-control" id="reason" rows="3" required></textarea>
                                </div>
                              </div>



                            </div>







      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-danger" >Confirm Deny</button>

      </div>
        </form>
    </div>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script>
$(document).ready(function() {
  $('#reason').summernote();
});
</script>
