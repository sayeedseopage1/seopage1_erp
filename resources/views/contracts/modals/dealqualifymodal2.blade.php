<div class="modal fade" id="qualifymodal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
          @if($deal->deal_stage == 0)
            <h5 class="modal-title" id="exampleModalLabel">Contact Made <span>&#8594;</span> Requirements Defined</h5>

            @elseif($deal->deal_stage == 1)
              <h5 class="modal-title" id="exampleModalLabel">Requirements Defined <span>&#8594;</span> Proposal Made</h5>
              @elseif($deal->deal_stage == 2)
                <h5 class="modal-title" id="exampleModalLabel">Proposal Made <span>&#8594;</span> Negotiation Started</h5>

          @endif
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form  action="{{route('deal-stage-update')}}" method="post">
          @csrf
        <div class="modal-body">

              <input type="hidden" name="id" value="{{$deal->id}}">
            <div class="mb-3">
                <label for="message-text" class="col-form-label">Comments</label>
                <textarea id="comments1" name="comments" class="form-control height-35 f-14"  required></textarea>
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
          </form>

        </div>
    </div>
</div>
