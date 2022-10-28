

<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="extensionrequest" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Request of Time Extension</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>

      <form  action="{{route('accept-task-extension')}}" method="post">
        @csrf
        <?php
        $task_extension= App\Models\TaskTimeExtension::where('task_id',$task->id)->first();
        $date= $task_extension->due_date;
        //dd($date);

         ?>
        <input type="hidden" name="task_id" value="{{$task->id}}">
        <input type="hidden" name="added_by" value="{{Auth::user()->id}}">
        <input type="hidden" name="id" value="{{$task_extension->id}}">


      <div class="modal-body">
        <div class="col-md-12">


        <div class="form-group">
        <label for="exampleFormControlInput1">Original Due Date</label>
         <input type="text" class="form-control form-control-lg" value="{{$task->due_date->format('m/d/Y')}}" readonly  id="datepicker" width="100%" />


        </div>
        </div>
        <div class="col-md-12">


        <div class="form-group">
        <label for="exampleFormControlInput1">Request Date</label>
         <input type="date" class="form-control form-control-lg" value="{{$date}}" name="due_date"   width="100%" />


        </div>
        </div>

        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Member Explanation <span style="color:red;"></span></label>
            <div class="card" style="height:300px;">
              <div class="card-body">
                  {{$extension_request->description}}
              </div>

            </div>

          </div>
        </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Approve</button>

      </div>
        </form>
    </div>
  </div>
</div>
<script>
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4'
        });
    </script>
