{{--<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">--}}
<link rel="stylesheet" href="{{asset('time-picker2/css/bootstrap-material-datetimepicker.css')}}" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
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
      <form class="" action="#" method="post" id="storeDeals">
        @csrf
        <?php
          $date= \Carbon\Carbon::now();
         ?>
        <input type="hidden" name="date" value="{{$date}}">
      <div class="modal-body">
          <div class="row">
              <div class="col-md-6">
                  <div class="mt-3">
                      <label for="client_name" class="form-label"><strong>Client Name <span style="color:red;">*<span></strong>
                          <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Name" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                              <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                          </svg>
                      </label>
                      <input name="client_name" id="client_name" type="text" class="form-control height-35 f-14" placeholder="Enter Client Name">
                      <label id="clientNameError" class="error text-danger" for="client_name"></label>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="mt-3">
                      <label for="input-state-3" class="form-label"><strong>Client Username <span style="color:red;">*<span></strong>
                          <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type Client Username" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                              <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                          </svg>
                      </label>
                      <input name="user_name" id="user_name" type="text" class="form-control height-35 f-14" placeholder="Enter Client Username">
                      <label id="userNameError" class="error text-danger" for="user_name"></label>
                  </div>
              </div>
          </div>
          <?php
          $countries= App\Models\Country::all();
          $label= '';
          $label .= '<strong class="form-label">Client Country</strong>'
          ?>
          <div class="mb-1">
              <x-forms.select fieldId="country" :fieldLabel="__($label)" fieldName="country" search="true"  fieldRequired="true" required>
                  <option value="">--</option>
                  @foreach ($countries as $item)
                      <option data-tokens="{{ $item->iso3 }}" data-content="<span class='flag-icon flag-icon-{{ strtolower($item->iso) }} flag-icon-squared'></span> {{ $item->nicename }}" value="{{ $item->nicename }}">{{ $item->nicename }}</option>
                  @endforeach
              </x-forms.select>
          </div>
          <div class="mt-3">
              <label for="input-state-3" class="form-label"><strong>Project Name <span style="color:red;">*<span></strong>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Type project name from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <input name="project_name" id="project_name" type="text" class="form-control height-35 f-14" placeholder="Enter Project Name" >
              <label id="projectNameError" class="error text-danger" for="project_name"></label>
          </div>
          <div class="mt-3">
              <label for="input-state-3" class="form-label"><strong>Project Budget <span style="color:red;">*<span></strong>
                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project budget from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                  </svg>
              </label>
              <input name="amount" id="amount" type="number" class="form-control height-35 f-14" placeholder="Enter Amount">
              <label id="amountError" class="error text-danger" for="amount"></label>
          </div>
          <div class="mt-3">
              <?php
              $currencies= App\Models\Currency::all();
              ?>
              <label for="original_currency_id" class="form-label"><strong>Currency <span style="color:red;">*<span></strong></label>
                  <select class="form-select form-control mb-3 height-35 f-14" aria-label=".form-select-lg example" name="original_currency_id" id="original_currency_id">
                      @foreach($currencies as $currency)
                          <option value="{{$currency->id}}">({{$currency->currency_code}})</option>
                      @endforeach
                  </select>
                  <label id="currencyError" class="error text-danger" for="original_currency_id"></label>
          </div>
{{--          <div class="mt-3" id="timerss">--}}
{{--              <h2><strong>Project Award Time <span style="color:red;">*<span></strong></h2>--}}
{{--              <input type="text" id="date-format" name="award_time" class="form-control floating-label height-35 f-14 @error('award_time') is-invalid @enderror" placeholder="Select Exact Award Time" >--}}
{{--              <?php--}}
{{--              $current_time = \Carbon\Carbon::now()->format('d-m-Y H:m:s');--}}
{{--              ?>--}}
{{--              <input type="hidden" name="current_time" value="{{$current_time}}">--}}
{{--          </div>--}}
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
          <button type="submit" class="btn btn-primary"  value="Submit" id="storeWonDeal">Create Won Deal</button>
      </div>
        </form>
    </div>
  </div>
</div>
  @push('scripts')
      <script>
          $('#storeWonDeal').click(function(e){
              // alert("success");
              e.preventDefault();
              var data= {
                  '_token': "{{ csrf_token() }}",
                  'client_name': document.getElementById("client_name").value,
                  'user_name': document.getElementById("user_name").value,
                  'country': document.getElementById("country").value,
                  'project_name': document.getElementById("project_name").value,
                  'amount': document.getElementById("amount").value,
                  'original_currency_id': document.getElementById("original_currency_id").value,
                  // 'award_time': document.getElementById("date-format").value,
              }
              console.log(data);
              $.ajaxSetup({
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  }
              });
              $.ajax({
                  type: "POST",
                  url: "{{route('store-deals')}}",
                  data: data,
                  dataType: "json",
                  success: function (response) {
                      // console.log(response.status);
                      $('#storeDeals').trigger("reset");
                      $('.error').html("");
                      if (response.status == 'success') {
                          window.location.href = response.redirectUrl;
                      }
                  },
                  error: function(error) {
                      if (error) {
                          $('#clientNameError').html(error.responseJSON.errors.client_name);
                          $('#userNameError').html(error.responseJSON.errors.user_name);
                          // $('#countryError').html(error.responseJSON.errors.country);
                          $('#projectNameError').html(error.responseJSON.errors.project_name);
                          $('#amountError').html(error.responseJSON.errors.amount);
                          $('#currencyError').html(error.responseJSON.errors.original_currency_id);
                      }
                  }
              });
          });

      </script>
{{--      <script>--}}
{{--          const form = document.getElementById('storeDeal');--}}
{{--          const button = document.getElementById('storeWonDeal');--}}
{{--          const name = document.getElementById('client_name');--}}
{{--          const username = document.getElementById('user_name');--}}
{{--          const projectName = document.getElementById('project_name');--}}
{{--          const amount = document.getElementById('amount');--}}
{{--          const currency = document.getElementById('original_currency_id');--}}


{{--          form.addEventListener('input', () => {--}}
{{--              let valid = true;--}}
{{--              if (name.value.trim() === '') {--}}
{{--                  valid = false;--}}
{{--                  clientNameError.textContent = 'Please enter the client name!';--}}
{{--              } else {--}}
{{--                  clientNameError.textContent = '';--}}
{{--              }--}}
{{--              if (username.value.trim() === '') {--}}
{{--                  valid = false;--}}
{{--                  userNameError.textContent = 'Please select client user name!';--}}
{{--              } else {--}}
{{--                  userNameError.textContent = '';--}}
{{--              }--}}
{{--              if (projectName.value.trim() === '') {--}}
{{--                  valid = false;--}}
{{--                  projectNameError.textContent = 'Please select project name!';--}}
{{--              } else {--}}
{{--                  projectNameError.textContent = '';--}}
{{--              }--}}
{{--              if (amount.value.trim() === '') {--}}
{{--                  valid = false;--}}
{{--                  amountError.textContent = 'Please select project budget!';--}}
{{--              } else {--}}
{{--                  amountError.textContent = '';--}}
{{--              }--}}
{{--              if (currency.value.trim() === '') {--}}
{{--                  valid = false;--}}
{{--                  currencyError.textContent = 'Please select project budget!';--}}
{{--              } else {--}}
{{--                  currencyError.textContent = '';--}}
{{--              }--}}
{{--              $("#storeWonDeal").attr("disabled", false);--}}
{{--              $("#storeWonDeal").html("Create Won Deal");--}}
{{--          });--}}
{{--      </script>--}}
      <script>
          $("#storeWonDeal").on('click',function() {
              // $("#storeWonDeal").attr("disabled", true);
              // $("#storeWonDeal").html("Processing...");
          });
      </script>
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
