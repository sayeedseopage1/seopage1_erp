@push('styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
@endpush
<div class="modal fade" id="deliverablesaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Deliverables</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
<?php
$currencies= App\Models\Currency::all();

 ?>

      <div class="modal-body">

        <ul id="saveform_errList">

        </ul>
        <div class="row">


            <div class="col-md-6">

              <div class="form-group">
              <label for="exampleFormControlInput1">Title <span style="color:red;">*</span></label>
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
                <label for="exampleFormControlTextarea1">Milestone Summary</label>
                <textarea  name="summary" id="summary" class="ckeditor form-control summary" rows="3" ></textarea>
              </div>

            </div>



        </div>





      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary add_milestone" >Add Deliverables</button>

      </div>

    </div>
  </div>
</div>
<script type="text/javascript">



</script>
