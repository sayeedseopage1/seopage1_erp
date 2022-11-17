
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

<div class="modal fade" id="dealaddstagemodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Deal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form class="" action="{{route('store-deals-stage')}}" method="post">
        @csrf
        <?php
          $date= \Carbon\Carbon::now();
         ?>
        <input type="hidden" name="lead_id" value="{{$lead->id}}">
        <input type="hidden" name="date" value="{{$date}}">
        <input type="hidden" name="id" value="{{$deal->id}}">

      <div class="modal-body">


                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Deal ID <span style="color:red;">*<span></strong></label>
                                    <input name="deal_id" value="{{$deal->short_code}}" readonly id="input-state-2" type="text" class="form-control" placeholder="Enter Client Name" required>

                                </div>
                              </div>
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


                            </div>
                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Client Username <span style="color:red;">*<span></strong></label>
                                    <input name="user_name" id="input-state-3" type="text" class="form-control @error('user_name') is-invalid @enderror" placeholder="Enter Client Username" >

                                </div>
                                @error('user_name')
                                  <div class="mt-3">
                                    <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                @enderror
                              </div>

                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Project Name <span style="color:red;">*<span></strong></label>
                                    <input name="project_name" value="{{$lead_id->client_name}}" readonly id="input-state-3" type="text" class="form-control" placeholder="Enter Project Name" required>

                                </div>
                              </div>
                            </div>


                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Project Budget <span style="color:red;">*<span></strong></label>
                                <input name="amount" value="{{$lead_id->actual_value}}" id="input-state-3" type="number" class="form-control" placeholder="Enter Amount" required>

                            </div>
                              <div class="mt-3">
                                <?php
                                  $currencies= App\Models\Currency::all();
                                 ?>
                                 <label for="input-state-3" class="form-label"><strong>Currency <span style="color:red;">*<span></strong></label>
                            <select class="form-select mb-3" aria-label=".form-select-lg example" name="original_currency_id">
                                <option selected value="{{$lead_id->original_currency_id}}">({{$lead_id->original_currency->currency_code}})</option>

                                @foreach($currencies as $currency)
                                <option value="{{$currency->id}}">({{$currency->currency_code}})</option>

                                @endforeach
                              </select>
                              </div>







      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary" >Create Deal</button>

      </div>
        </form>
    </div>
  </div>
</div>
@if (count($errors) > 0)
<script>
    $( document ).ready(function() {
        $('#dealaddstagemodal').modal('show');
    });
</script>
  @endif
