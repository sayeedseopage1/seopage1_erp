<div class="modal fade" id="nicheaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog d-flex justify-content-center align-items-center modal-lg">
    <div class="modal-content">
      <div class="modal-header">
       <h5 class="modal-title" id="modelHeading">Niche Category</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

      <form class="" action="#" method="get">


      <div class="modal-body">
        <ul id="saveform_errList">

        </ul>



        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th class="text-right">Action</th>
            </tr>

          </thead>
          <tbody id="niche_value">
          

          </tbody>

        </table>
        <form method="POST"  autocomplete="off">
          @csrf


    <div class="row border-top-grey ">
            <div class="col-sm-12">
                <div class="form-group my-3">
    <label class="f-14 text-dark-grey mb-12" data-label="true" for="category_name">Category Name
            <sup class="f-14 mr-1">*</sup>

    </label>

    <input type="text" class="form-control height-35 f-14 category_name" placeholder="Enter a category name" value="" name="category_name" id="category_name">

    </div>
            </div>

        </div>
</form>






      </div>
      <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary add_niche" >Save</button>

      </div>
      </form>

    </div>
  </div>
</div>
