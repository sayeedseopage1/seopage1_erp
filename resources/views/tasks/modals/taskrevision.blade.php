

<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="taskrevision" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Revision of Task</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form  action="{{route('task-status-revision')}}" method="post">
        @csrf
        <input type="hidden" name="task_id" value="{{$task->id}}">
          <input type="hidden" name="user_id" value="{{$task->last_updated_by}}">




      <div class="modal-body">

        <div class="container">
      	<div class="row flex-column">



        <div class="mb-3">
          Comments
            <sup class="f-14 text-danger">*</sup>
            <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="Comments" data-html="true" data-trigger="hover"></i>
        </div>
        <div class="">
          <textarea name="comments2" id="comments2" class="form-control"></textarea>
            <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
            <script>
                CKEDITOR.replace('comments2',{
                    height:100,
                });
            </script>
            <span id="commentsError" class="text-danger" ></span>
        </div>

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
        e.preventDefault();
        $('#submitBtn').attr("disabled", true);
        $('#submitBtn').html("Processing...");
        var comments2 = CKEDITOR.instances.comments2.getData();
        var data= {
            '_token': "{{ csrf_token() }}",
            'comments2': comments2,
            'task_id': {{$task->id}},
            'user_id': {{$task->last_updated_by}},
        }
        // console.log(data);
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: "POST",
            url: "{{route('task-status-revision')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                // console.log(response.status);
                if(response.status==200){
                    $('#taskapprove').trigger("reset");
                    $('#submitBtn').attr("disabled", false);
                    $('#submitBtn').html("Submit");
                    window.location.reload();
                    toastr.success('Task Revision Successfully');
                }

            },
            error: function(error) {
                if (error.responseJSON.errors.comments2) {
                    toastr.error('This field is required!');
                }
                $('#submitBtn').attr("disabled", false);
                $('#submitBtn').html("Submit");
            }
        });
    });

</script>
