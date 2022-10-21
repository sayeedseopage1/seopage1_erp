<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <script src="https://unpkg.com/gijgo@1.9.13/js/gijgo.min.js" type="text/javascript"></script>
    <link href="https://unpkg.com/gijgo@1.9.13/css/gijgo.min.css" rel="stylesheet" type="text/css" />

<!------ Include the above in your HEAD tag ---------->

<div class="modal fade" id="timextension" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Request of Time Extension</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <form  action="{{route('user-time-extension')}}" method="post">
        @csrf
        <input type="hidden" name="task_id" value="{{$task->id}}">
        <input type="hidden" name="user_id" value="{{Auth::user()->id}}">


      <div class="modal-body">
        <div class="col-md-12">


        <div class="form-group">
        <label for="exampleFormControlInput1">Extension Date</label>
         <input name="due_date" value="{{\Carbon\Carbon::now()}}" id="datepicker" width="100%" />
        </div>
        </div>
        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Explanation <span style="color:red;">*</span></label>
            <textarea name="description" class="form-control" id="description" rows="3" required></textarea>
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
<script>
        $('#datepicker').datepicker({
            uiLibrary: 'bootstrap4'
        });
    </script>
