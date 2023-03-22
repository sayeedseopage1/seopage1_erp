
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>

<style media="screen">
  .note-editor ol, .note-editor li{
    list-style: inital;
  }
</style>
<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="markcomplete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-m">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Submit Task</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="{{route('task-status-change')}}" method="post" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$task->id}}">
        <input type="hidden" name="user_id" value="{{Auth::user()->id}}">

      <div class="modal-body">






      {{--  <div class="container" id="submission_type_table">
      	<div class="row flex-column">



        <div class="mb-3">
        Submit Links
        </div>


      	</div>
      </div> --}}

      <!-- <div class="" id="submission_type_link">
                <x-forms.text :fieldLabel="__('Include Links You have Worked On')" fieldName="submission"
                    fieldId="website_link" :fieldPlaceholder="__('Website/Github Link')" fieldRequired="true" />
            </div> -->

            <div class="mb-3">
            Submit Links What You've Done
            </div>

              <div id="row">
                <div class="input-group mr-3 mt-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-danger"
                      id="DeleteRow" type="button">
                      <i class="bi bi-trash"></i>

                    </button>
                  </div>
                  <input type="text"
                    class="form-control height-35 f-14 m-input" name="link[]" required>

                </div>
              </div>

              <div class="mt-3" id="newinput"></div>
              <button id="rowAdder" type="button"
                class="btn btn-dark mt-3">
                <span class="bi bi-plus-square-dotted">
                </span>
              </button>






            <div class="row mt-3 ml-1 mr-1">



            <div class="mb-3 mt-3">
                Describe What You've Done
            </div>
            <div class="">
                <textarea id="text" name="text" required></textarea>


            </div>

            </div>






    			{{--	<div id="row2">
    						<div class="input-group m-3">
    							<div class="input-group-prepend">
    								<button class="btn btn-danger"
    									id="DeleteRow2" type="button">
    									<i class="bi bi-trash"></i>

    								</button>
    							</div>
    							<input type="file"
    								class="form-control m-input" name="file[]" id="attach">

    						</div>
    					</div>

    					<div id="newinput2"></div>
    					<button id="rowAdder2" type="button"
    						class="btn btn-dark">
    						<span class="bi bi-plus-square-dotted">
    						</span>
    					</button>
    			 --}}





      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Submit</button>

      </div>
        </form>
    </div>
  </div>
</div>
<script type="text/javascript">
$("#submission_type").change(function() {
  if ($(this).val() == "table") {
    $('#submission_type_table').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#submission_type_table').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
  if ($(this).val() == "link") {
    $('#submission_type_link').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#submission_type_link').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
  if ($(this).val() == "text") {
    $('#submission_type_text').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#submission_type_text').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
  if ($(this).val() == "list") {
    $('#submission_type_list').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#submission_type_list').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
  if ($(this).val() == "attach") {
    $('#submission_type_attachment').show();
    $('#otherField').attr('required', '');
    $('#otherField').attr('data-error', 'This field is required.');
  } else {
    $('#submission_type_attachment').hide();
    $('#otherField').removeAttr('required');
    $('#otherField').removeAttr('data-error');
  }
});
$("#submission_type").trigger("change");

$(document).ready(function() {
  $('#table').summernote({
    toolbar: [

  ['table', ['table']],

],
  }

);
});
$(document).ready(function() {
  $('#text').summernote();
});
//$('#whatsapp').summernote();
$(document).ready(function() {
  $('#list').summernote({
    toolbar: [
       // [groupName, [list of button]]

       ['para', ['ul','ol','paragraph']],
       ['height', ['height']]
     ],

  }

)


;
});



// $("#seeAnotherFieldGroup").change(function() {
//   if ($(this).val() == "yes") {
//     $('#otherFieldGroupDiv').show();
//     $('#otherField1').attr('required', '');
//     $('#otherField1').attr('data-error', 'This field is required.');
//     $('#otherField2').attr('required', '');
//     $('#otherField2').attr('data-error', 'This field is required.');
//   } else {
//     $('#otherFieldGroupDiv').hide();
//     $('#otherField1').removeAttr('required');
//     $('#otherField1').removeAttr('data-error');
//     $('#otherField2').removeAttr('required');
//     $('#otherField2').removeAttr('data-error');
//   }
// });
// $("#seeAnotherFieldGroup").trigger("change");

</script>
<script type="text/javascript">

  $("#rowAdder").click(function () {
    newRowAdd =
    '<div id="row"> <div class="input-group mr-3 mt-3">' +
    '<div class="input-group-prepend">' +
    '<button class="btn btn-danger" id="DeleteRow" type="button">' +
    '<i class="bi bi-trash"></i> </button> </div>' +
    '<input type="text" name="link[]" class="form-control m-input"> </div> </div>';

    $('#newinput').append(newRowAdd);
  });

  $("body").on("click", "#DeleteRow", function () {
    $(this).parents("#row").remove();
  })
</script>
<script type="text/javascript">

  $("#rowAdder2").click(function () {
    newRowAdd =
    '<div id="row"> <div class="input-group m-3">' +
    '<div class="input-group-prepend">' +
    '<button class="btn btn-danger" id="DeleteRow" type="button">' +
    '<i class="bi bi-trash"></i> </button> </div>' +
    '<input type="file" id="attach" name="file[]" class="form-control m-input"> </div> </div>';

    $('#newinput2').append(newRowAdd);
  });

  $("body").on("click", "#DeleteRow2", function () {
    $(this).parents("#row2").remove();
  })
</script>
