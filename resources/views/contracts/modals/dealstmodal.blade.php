@push('datatable-styles')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
@endpush
<div class="modal fade" data-id="id" id="dealstmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"  id="exampleModalLabel">Select Deal Stage</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('deal-stage')}}" method="post">
        @csrf
        <input type="hidden"  name="id"  id="mydata">


      <div class="modal-body">

                                  <div class="row">
                                    <div class="col-md-12">

                                          <label for="input-state-2" class="form-label"><strong>Select Status <span style="color:red;">*<span></strong></label>
                                            <select class="form-select" name="deal_stage" aria-label="Default select example">

                                              <option value="0">Contact Made</option>
                                              <option value="1">Requirements Defined</option>
                                              <option value="2">Proposal Made</option>
                                                <option value="3">Negotiation Started</option>
                                            </select>


                                    </div>


                                  </div>









            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" >Convert</button>

            </div>
              </form>

    </div>
  </div>
</div>
