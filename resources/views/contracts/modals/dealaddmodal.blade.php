
<div class="modal fade" id="dealaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Deal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('store-deals')}}" method="post">
        @csrf
        <?php
          $date= \Carbon\Carbon::now();
         ?>
        <input type="hidden" name="date" value="{{$date}}">

      <div class="modal-body">


                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Client Name <span style="color:red;">*<span></strong></label>
                                    <input name="client_name" id="input-state-2" type="text" class="form-control @error('client_name') is-invalid @enderror" placeholder="Enter Client Name">


                                </div>
                                @error('client_name')
                                <div class="mt-3">
                                  <div class="alert alert-danger">{{ $message }}</div>
                                  </div>
                                @enderror
                              </div>
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Client Username <span style="color:red;">*<span></strong></label>
                                    <input name="user_name" id="input-state-3" type="text" class="form-control @error('user_name') is-invalid @enderror" placeholder="Enter Client Username">

                                </div>
                                @error('user_name')
                                  <div class="mt-3">
                                    <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                @enderror
                              </div>


                            </div>

                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Project Name <span style="color:red;">*<span></strong></label>
                                <input name="project_name" id="input-state-3" type="text" class="form-control @error('project_name') is-invalid @enderror" placeholder="Enter Project Name" >

                            </div>
                            @error('project_name')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Project Budget <span style="color:red;">*<span></strong></label>
                                <input name="amount" id="input-state-3" type="number" class="form-control @error('amount') is-invalid @enderror" placeholder="Enter Amount">

                            </div>
                            @error('amount')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror
                            <div class="mt-3">
                              <?php
                                $currencies= App\Models\Currency::all();
                               ?>
                               <label for="input-state-3" class="form-label"><strong>Currency <span style="color:red;">*<span></strong></label>
                          <select class="form-select form-control mb-3 @error('original_currency_id') is-invalid @enderror" aria-label=".form-select-lg example" name="original_currency_id">


                              @foreach($currencies as $currency)
                              <option value="{{$currency->id}}">({{$currency->currency_code}})</option>

                              @endforeach
                            </select>
                            </div>
                            @error('original_currency_id')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror





      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Create Deal</button>

      </div>
        </form>
    </div>
  </div>
</div>
