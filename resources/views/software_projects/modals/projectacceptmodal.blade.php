
<div class="modal fade" id="projectreviewmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Project Acceptance Form</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <form class="" action="{{route('project-accept')}}" method="post">
        @csrf
        <input type="hidden" name="project_id" value="{{$project->id}}">


      <div class="modal-body">


                            <div class="row">
                              <div class="col-md-12">
                                  <x-cards.data>
                                      <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                                          <div class="col">
                                              <h6><strong>Challenge Title:</strong> {{$project->project_challenge }}</h6>
                                              <br>
                                              <h6><strong>Challenge Details:</strong> {{$project->project_challenge }}</h6>
                                              <p>{!!$project->comments !!}</p>

                                          </div>

                                      </div>
                                  </x-cards.data>
                              </div>
                              <div class="col-md-12 mt-3">
                                <div class="form-group">
                                  <label for="exampleFormControlTextarea1"><h4>We Are Accepting The Project After Analyzing the Challenges.
                                      <span style="color:red;">*</span></h5></label>
                        <textarea name="admin_comment" class="form-control"  rows="6" required placeholder="Write the reason you are accepting the project."></textarea>
                                </div>
                              </div>



                            </div>







      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-danger" >Confirm Accept</a>

      </div>
        </form>

    </div>
  </div>
</div>
