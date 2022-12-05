@push('datatable-styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
@endpush
<div class="modal fade" data-id="id" id="dealstmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  id="exampleModalLabel">Convert Lead to Deal (Contact Made)</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage')}}" method="post">
        @csrf
        <input type="hidden"  name="id"  id="mydata">


      <div class="modal-body">

                                  <div class="row">
                                    <div class="col-md-12">

                                          <label for="input-state-2" class="form-label"><strong>Status <span style="color:red;">*<span></strong></label>

                                                <input readonly class="form-control height-35 f-14" value="Contact Made"  name="deal_stage"  placeholder="Contract Made" required></input>




                                    </div>
                                    <div class="col-md-12 mt-3">
                                      <label for="Client Username"><strong>Client Username</strong></label>

                                            <input class="form-control height-35 f-14"  name="client_username"  placeholder="Enter Client Username" required></input>


                                    </div>
                                    <div class="col-md-12 mt-3">
                                      <label for="Client Username"><strong>Client Profile Link</strong></label>

                                            <input class="form-control height-35 f-14"  name="profile_link"  placeholder="Enter Profile Link" required></input>
                                    </div>
                                    <div class="col-md-12 mt-3">
                                      <label for="Client Username"><strong>Client Message Thread Link</strong></label>

                                            <input class="form-control height-35 f-14"  name="message_link"  placeholder="Enter Message Thread Link" required></input>
                                    </div>
                                    <!-- <div class="col-md-12 mt-3">
                                      <label for="floatingTextarea"><strong>Client Message Thread Link</strong></label>

                                              <textarea id="message" class="form-control"  name="message_link"  placeholder="Client Message Thread Link" required></textarea>
                                    </div> -->
                                    <div class="col-md-12 mt-3">
                                      <label for="floatingTextarea"><strong>Comments</strong></label>

                                            <textarea id="comments" class="form-control"  name="comments"  placeholder="Leave a comment here" required></textarea>


                                    </div>


                                  </div>









            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" >Convert</button>

            </div>
              </form>

    </div>
  </div>
</div>
@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script>
$(document).ready(function() {
  $('#comments').summernote();
  $('#message').summernote();
});
</script>
@endpush
