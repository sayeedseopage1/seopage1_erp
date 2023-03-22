<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="markcomplete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-m">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Submit Task</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form action="{{route('task-status-change')}}" method="post" enctype="multipart/form-data" id="taskChange">
        @csrf
        <input type="hidden" name="id" value="{{$task->id}}">
        <input type="hidden" name="user_id" value="{{Auth::user()->id}}">

      <div class="modal-body">
            <div class="mb-3">
            Submit Links What You've Done<sup class="f-14 mr-1 text-danger">*</sup>
                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Submit Links What You've Done" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                </svg>
            </div>
              <div id="row">
                <div class="input-group mr-3 mt-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-danger"
                      id="DeleteRow" type="button">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                    <input type="text" class="form-control m-input" name="link[]" id="link">
                    <label id="linkError" class="text-danger" for="link"></label>
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
                Describe What You've Done<sup class="f-14 mr-1 text-danger">*</sup>
                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Describe What You've Done" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                </svg>
            </div>
            <div class="">
                <textarea name="text" id="text" class="form-control"></textarea>
                <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                <script>
                    CKEDITOR.replace('text');
                </script>
                <label id="textError" class="text-danger" for="text"></label>
            </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" id="submitBtn">Submit</button>
      </div>
        </form>
    </div>
  </div>
</div>
<script>
    $('#submitBtn').click(function(e){
        // alert('ok');
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var text = CKEDITOR.instances.text.getData();
        var links = document.getElementsByName("link[]");
        var links_values = [];
        for (var i = 0; i < links.length; i++) {
            links_values.push(links[i].value);
        }
        // console.log(text);
        var data= {
            '_token': "{{ csrf_token() }}",
            'link': links_values,
            'text': text,
            'id': {{$task->id}},
            'user_id': {{Auth::user()->id}},
        }
        console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('task-status-change')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('#taskChange').trigger("reset");
                $('#markcomplete').modal("hide");
                window.location.reload();
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            },
            error: function(error) {
                // console.log(response);
                // if(error.responseJSON.errors.link){
                //     $('#linkError').text(error.responseJSON.errors.link);
                // }else{
                //     $('#linkError').text('');
                // }
                if(error.responseJSON.errors.text){
                    $('#textError').text(error.responseJSON.errors.text);
                }else{
                    $('#textError').text('');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });

    });

</script>
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

</script>
<script type="text/javascript">

  $("#rowAdder").click(function () {
    newRowAdd =
    '<div id="row"> <div class="input-group mr-3 mt-3">' +
    '<div class="input-group-prepend">' +
    '<button class="btn btn-danger" id="DeleteRow" type="button">' +
    '<i class="bi bi-trash"></i> </button> </div>' +
    '<input type="text" name="link[]" class="form-control m-input"> ' +'</div> </div>';

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
    '<input type="file" id="attach" name="file[]" class="form-control m-input"> ' +'</div> </div>';

    $('#newinput2').append(newRowAdd);
  });

  $("body").on("click", "#DeleteRow2", function () {
    $(this).parents("#row2").remove();
  })
</script>
