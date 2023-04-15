@push('datatable-styles')
   <script src="//cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
@endpush
{{--qulaify modal --}}
<div class="modal fade" id="qualifymodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Qualify</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage-update')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$deal->id}}">


      <div class="modal-body">

        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Comments<span style="color:red;">*</span></label>
            <textarea name="comments" class="form-control" id="comment" rows="3" required></textarea>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="d-flex justify-content-center">
               @if($deal->deal_stage == 3)
               <h6><strong>Deal Status</strong></h6>
               @else

            <h6><strong>Deal Won?</strong></h6>
            @endif
            <br>
          </div>
          <div class="d-flex justify-content-center">
            <div class="col-md-4">
             <div class="form-check">
               @if($deal->deal_stage == 3)
<label for="input-state-2" class="form-check-label">Won<span style="color:red;">*<span></label>
  @else
               <label for="input-state-2" class="form-check-label">Yes<span style="color:red;">*<span></label>
                 @endif
          <input type="radio" value="Yes" name="won_lost"  required/>
        </div>
      </div>
      <div class="col-md-4">
       <div class="form-check">
         @if($deal->deal_stage ==
3)
           <label for="input-state-2"  class="form-check-label">Lost<span style="color:red;">*<span></label>
             @else
             <label for="input-state-2"  class="form-check-label">No<span style="color:red;">*<span></label>
               @endif

  <input type="radio" value="No" name="won_lost" required/>
  </div>
  </div>
          </div>


        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
        </form>
    </div>
  </div>
</div>
@include('contracts.modals.dealaddstagemodal')
@push('scripts')
   <script src="//cdn.ckeditor.com/4.21.0/standard/ckeditor.js"></script>
<script>
$(document).ready(function() {
  $('#comment').summernote();
});
$('input[name="won_lost"]').change(function() {
   if($(this).is(':checked') && $(this).val() == 'Yes') {
        $('#dealaddstagemodal').modal('show');
        $('#qualifymodal').modal('hide');
   }
});
</script>


@endpush
