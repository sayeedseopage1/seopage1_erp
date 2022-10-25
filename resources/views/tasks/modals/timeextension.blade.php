<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->


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
         <input type="date" class="form-control form-control-lg" name="due_date"  id="datepicker" width="100%" />


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
@push('scripts')
<script type="text/javascript">
const dp1 = datepicker('#due_date_ex', {
    position: 'bl',
    onSelect: (instance, date) => {
        if (typeof dp2.dateSelected !== 'undefined' && dp2.dateSelected.getTime() < date
            .getTime()) {
            dp2.setDate(date, true)
        }
        if (typeof dp2.dateSelected === 'undefined') {
            dp2.setDate(date, true)
        }
        dp2.setMin(date);
    },
    ...datepickerConfig
});
</script>

@endpush
