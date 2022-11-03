
<div class="modal fade" id="milestoneaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Milestone</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>



        <input type="hidden" class="project_id" name="project_id" value="{{$project_id->id}}">


      <div class="modal-body">

        <ul id="saveform_errList">

        </ul>
        <div class="row">


            <div class="col-md-6">

              <div class="form-group">
              <label for="exampleFormControlInput1">Milestone Title <span style="color:red;">*</span></label>
              <input type="text" name="title" class="form-control title" id="exampleFormControlInput1"  placeholder="Milestone Name">
              </div>

            </div>
            <div class="col-md-6">
              <div class="form-group">
              <label for="exampleFormControlInput1">Milestone Cost <span style="color:red;">*</span></label>
              <input type="text" name="cost" class="form-control cost" id="exampleFormControlInput1"  placeholder="Milestone Cost">
              </div>

            </div>


            <div class="col-md-12">
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Milestone Summary <span style="color:red;">*</span></label>
                <textarea name="summary" class="form-control summary" id="summary" rows="3" ></textarea>
              </div>

            </div>



        </div>





      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary add_milestone" >Create Milestone</button>

      </div>

    </div>
  </div>
</div>
