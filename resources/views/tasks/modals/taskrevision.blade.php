

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
        </div>
        <div class="">
          <textarea name="comments" rows="8" cols="57"></textarea>

        </div>

      	</div>
      </div>





      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Submit</button>

      </div>
        </form>
    </div>
  </div>
</div>
