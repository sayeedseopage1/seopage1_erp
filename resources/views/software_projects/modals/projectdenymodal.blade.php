<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<div class="modal fade" id="projectdenymodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Project Deny</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('project-deny')}}" method="post">
        @csrf
        <input type="hidden" name="project_id" value="{{$project->id}}">


      <div class="modal-body">


                            <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="exampleFormControlTextarea1"><h4>We Are Denying The Project After Analyzing the Challenges.
                                      <span style="color:red;">*</span></h5></label>
                                  <textarea name="admin_comment" class="form-control"  rows="3" required placeholder="Write the reason you are denying the project."></textarea>
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
