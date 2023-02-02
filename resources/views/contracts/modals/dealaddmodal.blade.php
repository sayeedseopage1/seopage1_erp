
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

		<link rel="stylesheet" href="{{asset('time-picker2/css/bootstrap-material-datetimepicker.css')}}" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">



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
<div class="modal fade" id="dealaddmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Create Won Deal</h5>
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
														<?php
														$countries= App\Models\Country::all();
														$label= '';
														$label .= '<strong class="form-label">Client Country</strong>'
														 ?>
														<div class="mb-1">
																<x-forms.select fieldId="country" :fieldLabel="__($label)" fieldName="country"
																		search="true"  fieldRequired="true" required>
																		<option value="">--</option>
																		@foreach ($countries as $item)
																				<option data-tokens="{{ $item->iso3 }}"
																						data-content="<span class='flag-icon flag-icon-{{ strtolower($item->iso) }} flag-icon-squared'></span> {{ $item->nicename }}"
																						value="{{ $item->nicename }}">{{ $item->nicename }}</option>
																		@endforeach
																</x-forms.select>
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



                            <div class="mt-3" id="timerss">

                        			<h2><strong>Project Award Time <span style="color:red;">*<span></strong></h2>

                        				<input type="text" id="date-format" name="award_time" class="form-control floating-label @error('award_time') is-invalid @enderror" placeholder="Select Exact Award Time" >
																<?php
																$current_time = \Carbon\Carbon::now()->format('d-m-Y H:m:s');
																 ?>
														<input type="hidden" name="current_time" value="{{$current_time}}">

                        		</div>
														@if(Session::has('error'))
														<div class="alert alert-danger" role="alert">

																<div class="alert-body">
																		{{Session::get('error')}}
																</div>
														</div>
														@endif
                            @error('award_time')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror







      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary"  value="Submit">Create Deal</button>

      </div>
        </form>
    </div>
  </div>
</div>
  @push('scripts')
  @if (count($errors) > 0 || Session::has('error'))
  <script>
      $( document ).ready(function() {
          $('#dealaddmodal').modal('show');
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

    @endpush
