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
          <tbody>
            <tr>
              <td>1</td>
              <td>Frontend Design</td>
              <td class="text-right">
                <button type="button" class="btn-secondary rounded f-14 p-2 delete-category" data-cat-id="1">
            <svg class="svg-inline--fa fa-trash fa-w-14 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
              <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg><!-- <i class="fa fa-trash mr-1"></i> Font Awesome fontawesome.com -->
        Delete
</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Backend Design</td>
              <td class="text-right">
                <button type="button" class="btn-secondary rounded f-14 p-2 delete-category" data-cat-id="1">
            <svg class="svg-inline--fa fa-trash fa-w-14 mr-1" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="trash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
              <path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg><!-- <i class="fa fa-trash mr-1"></i> Font Awesome fontawesome.com -->
        Delete
</button></td>
            </tr>
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
          <button type="Submit" class="btn btn-primary add_niche" >Save</button>

      </div>
      </form>

    </div>
  </div>
</div>
<script type="text/javascript">



</script>
