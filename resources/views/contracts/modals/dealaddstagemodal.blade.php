<link rel="stylesheet" href="{{asset('time-picker2/css/bootstrap-material-datetimepicker.css')}}" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet">


<script src="https://code.jquery.com/jquery-1.12.3.min.js" integrity="sha256-aaODHAgvwQW1bFOGXMeX+pC4PZIPsvn2h1sArYOhgXQ=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://momentjs.com/downloads/moment-with-locales.min.js"></script>
<script type="text/javascript" src="{{asset('time-picker2/js/bootstrap-material-datetimepicker.js')}}"></script>
<style media="screen">
#timerss {
/* max-width: a; */
display: flex;
flex-direction: column;
margin: 8px auto;
/* background: aliceblue; */
align-items: flex-start;
border-radius: 7px;
justify-content: center;
/* padding: 7px; */
}
</style>
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
         @if($deal->lead_id != null)
        <input type="hidden" name="lead_id" value="{{$deal->lead_id}}">
        @endif
        <input type="hidden" name="date" value="{{$date}}">
        <input type="hidden" name="id" value="{{$deal->id}}">

      <div class="modal-body">


                            <div class="row">
                              <div class="col-md-6">
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Deal ID <span style="color:red;">*<span></strong></label>
                                    <input name="deal_id" value="{{$deal->short_code}}" readonly id="input-state-2" type="text" class="form-control height-35 f-14" placeholder="Enter Client Name" required>

                                </div>
                              </div>
                              <div class="col-md-6">
                                @if($deal->client_name != null)
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Client Name <span style="color:red;">*<span></strong></label>
                                    <input name="client_name" readonly value="{{$deal->client_name}}"   id="input-state-2" type="text" class="form-control height-35 f-14 @error('client_name') is-invalid @enderror" placeholder="Enter Client Name">

                                </div>
                                @else
                                <div class="mt-3">
                                    <label for="input-state-2" class="form-label"><strong>Client Name <span style="color:red;">*<span></strong></label>
                                    <input name="client_name"  id="input-state-2" type="text" class="form-control height-35 f-14 @error('client_name') is-invalid @enderror" placeholder="Enter Client Name">

                                </div>


                                @endif
                                @error('client_name')
                                  <div class="mt-3">
                                    <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                @enderror
                              </div>


                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Client Username <span style="color:red;">*<span></strong></label>
                                    <input name="user_name" id="input-state-3" readonly value="{{$deal->client_username}}" type="text" class="form-control height-35 f-14 @error('user_name') is-invalid @enderror" placeholder="Enter Client Username" >

                                </div>
                                @error('user_name')
                                  <div class="mt-3">
                                    <div class="alert alert-danger">{{ $message }}</div>
                                    </div>
                                @enderror
                              </div>

                              <div class="col-md-12">
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Project Name <span style="color:red;">*<span></strong></label>
                                    <input name="project_name" value="{{$deal->project_name}}" readonly id="input-state-3" type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" required>

                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-12">
                                @if($deal->profile_link != null)
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Profile Link </strong></label>
                                    <input name="profile_link" value="{{$deal->profile_link}}" readonly id="input-state-3" type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" required>

                                </div>
                                @else
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Profile Link</strong></label>
                                    <input name="profile_link"  id="input-state-3" type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" >

                                </div>

                                @endif
                              </div>
                              <div class="col-md-12">
                                @if($deal->message_link != null)
                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Message Link</strong></label>
                                    <input name="message_link" value="{{$deal->message_link}}" readonly id="input-state-3" type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" required>

                                </div>
                                @else

                                <div class="mt-3">
                                    <label for="input-state-3" class="form-label"><strong>Message Link </strong></label>
                                    <input name="message_link"  id="input-state-3" type="text" class="form-control height-35 f-14" placeholder="Enter Message Link" >

                                </div>

                                @endif
                              </div>
                            </div>



                            <div class="mt-3">
                                <label for="input-state-3" class="form-label"><strong>Project Budget <span style="color:red;">*<span></strong></label>
                                <input name="amount" value="{{$deal->actual_amount}}" id="input-state-3" type="number" class="form-control height-35 f-14" placeholder="Enter Amount" required>

                            </div>
                              <div class="mt-3">
                                <?php
                                  $currencies= App\Models\Currency::where('id',$deal->original_currency_id)->first();
                                 ?>
                                 <label for="input-state-3" class="form-label"><strong>Currency <span style="color:red;">*<span></strong></label>
                            <select class="form-control height-35 f-14 form-select mb-3" aria-label=".form-select-lg example" name="original_currency_id">
                                <option selected value="{{$currencies->id}}">({{$currencies->currency_code}})</option>


                              </select>
                              </div>

                              <div class="mt-3" id="timerss">

                          			<h2><strong>Project Award Time <span style="color:red;">*<span></strong></h2>

                          				<input type="text" id="date-format" name="award_time" class="form-control height-35 f-14 floating-label @error('award_time') is-invalid @enderror" placeholder="Select Exact Award Time" >


                          		</div>
                              @error('award_time')
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
@if (count($errors) > 0)
<script>
    $( document ).ready(function() {
        $('#dealaddstagemodal').modal('show');
    });
</script>
  @endif
  <script type="text/javascript">
  $(document).ready(function()
  {
    $('#date').bootstrapMaterialDatePicker
    ({
      time: false,
      clearButton: true
    });

    $('#time').bootstrapMaterialDatePicker
    ({
      date: false,
      shortTime: false,
      format: 'HH:mm'
    });

    $('#date-format').bootstrapMaterialDatePicker
    ({
      format: 'DD MMMM YYYY HH:mm:ss'
    });
    $('#date-fr').bootstrapMaterialDatePicker
    ({
      format: 'DD/MM/YYYY HH:mm',
      lang: 'fr',
      weekStart: 1,
      cancelText : 'ANNULER',
      nowButton : true,
      switchOnClick : true
    });

    $('#date-end').bootstrapMaterialDatePicker
    ({
      weekStart: 0, format: 'DD/MM/YYYY HH:mm'
    });
    $('#date-start').bootstrapMaterialDatePicker
    ({
      weekStart: 0, format: 'DD/MM/YYYY HH:mm', shortTime : true
    }).on('change', function(e, date)
    {
      $('#date-end').bootstrapMaterialDatePicker('setMinDate', date);
    });

    $('#min-date').bootstrapMaterialDatePicker({ format : 'DD/MM/YYYY HH:mm', minDate : new Date() });

    $.material.init()
  });


  </script>
  
