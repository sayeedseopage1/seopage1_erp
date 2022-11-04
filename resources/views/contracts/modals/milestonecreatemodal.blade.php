
<div class="modal fade" id="milestoneaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Milestone</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>






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
                <textarea id="summary" name="summary" class="form-control summary" rows="3" ></textarea>
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
<script type="text/javascript">


$(document).ready(function() {
  fetchmilestone();
  function fetchmilestone()
  {
    $.ajax({
      type: "GET",
      url: "/deals/milestone-get/{{$project_id->id}}",

      dataType: "json",
      success: function (response){
      //  console.log(response.milestones);
        let spans= '';
        response.milestones.forEach((item)=> {
          spans += `<span class="badge badge-info mr-2">${item.milestone_title}</span>`
        });

        document.querySelector('#milestone_value').innerHTML= spans;

      }
    });
  }



  $(document).on('click','.add_milestone',function(e){

  e.preventDefault();
  //console.log("test");
  var data= {
    'title': $('.title').val(),
    'cost': $('.cost').val(),
    'summary': $('.summary').val(),
    //'project_id': document.querySelector('.project_id').value,
    'project_id': document.getElementById("project_id").value,
  }
  //console.log(data);
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });
  $.ajax({
    type: "POST",
    url: "{{route('add-milestone')}}",
    data: data,
    dataType: "json",
    success: function (response){
      if (response.status == 400) {
        $('#saveform_errList').html("");
        $('#saveform_errList').addClass('alert alert-danger');
        $.each(response.errors, function (key, err_values){
          $('#saveform_errList').append('<li>'+err_values+'</li>');
        });
      }
      else {
          $('#saveform_errList').html("");
          $('#success_message').addClass('alert alert-success');
          $('#success_message').text(response.message);
          $('#milestoneaddmodal').modal('hide');
          $('#milestoneaddmodal').find('input').val("");
          document.querySelector('#summary').value= '';
            fetchmilestone();

      }
    }
  });
});

});
</script>
