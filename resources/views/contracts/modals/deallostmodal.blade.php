{{--lost modal --}}
<div class="modal fade" id="lostmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Lost</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage-update-lost')}}" method="post">
        @csrf
        <input type="hidden" name="id" value="{{$lead_id->id}}">
      <div class="modal-body">
        <div class="col-md-12">
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Comments<span style="color:red;">*</span></label>
            <textarea name="comments" class="form-control" id="comment2" rows="3" required></textarea>
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
@push('scripts')

<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
<script>
$(document).ready(function() {
  $('#comment2').summernote();
});

</script>


@endpush
