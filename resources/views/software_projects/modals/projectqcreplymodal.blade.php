
<div class="modal fade" id="ProjectqcrevisionSubmissionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Project Q&C Form Correction</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <?php
      $project_qc= App\Models\QCSubmission::where('milestone_id',$item->id)->orderBy('id','desc')->first();
       ?>




      <div class="modal-body bg-additional-grey">


                                <div class="card bg-white border-0 b-shadow-4">

                        <div class="card-body ">
                          <h6 class="text-center">Top Management Reply</h6>

                          <p class="text-center">{{$project_qc->admin_comment}}</p>


                          <br>


                          </div>
                          </div>



      </div>
      <div class="modal-footer">


            <a href="/projects/q&c/{{$project_qc->project_id}}/{{$project_qc->milestone_id}}" class="btn btn-primary">Submit Form Again</a>

            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

      </div>


    </div>
  </div>
</div>
