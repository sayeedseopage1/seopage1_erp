@extends('layouts.app')

@section('filter-section')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">

    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->

    <div class="d-flex filter-box project-header bg-white">

        <div class="mobile-close-overlay w-100 h-100" id="close-client-overlay"></div>
        <div class="project-menu d-lg-flex" id="mob-client-detail">

            <a class="d-none close-it" href="javascript:;" id="close-client-detail">
                <i class="fa fa-times"></i>
            </a>


        </div>

        <a class="mb-0 d-block d-lg-none text-dark-grey ml-auto mr-2 border-left-grey"
            onclick="openClientDetailSidebar()"><i class="fa fa-ellipsis-v "></i></a>

    </div>
    <!-- FILTER END -->
    <!-- PROJECT HEADER END -->

@endsection

@push('styles')
    <script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
@endpush

@section('content')

    <div class="content-wrapper border-top-0 client-detail-wrapper">
      <div class="card border-0 invoice">

          <!-- CARD BODY START -->
          <div class="card-body">

              <h5 class="d-flex justify-content-center">Client Data Collection</h5>


            <hr>
            <?php
            $url= url('/');
             ?>
              <div class="invoice-table-wrapper">

                <div class="d-flex justify-content-center">
                  <form class="" action="#" method="post">
                    @csrf



                    <div class="row">
                      <div class="col-md-6">
                        <div class="mt-3">
                            <label for="input-state-2" class="form-label"><strong>Client Username</strong></label>
                            @if($client== null)

                            <input id="input-state-2" name="client_username" type="text"  readonly class="form-control" placeholder="Enter User Name" required>
                            @else
                            <input id="input-state-2" name="client_username" type="text" value="{{$client->client_username}}" readonly class="form-control" placeholder="Enter User Name" required>
                            @endif
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="mt-3">
                            <label for="input-state-3" class="form-label"><strong>Client Email</strong></label>
                            @if($client== null)
                                <input id="input-state-3" readonly name="client_email"  type="text" class="form-control" placeholder="Enter Your Email" required>

                            @else
                            <input id="input-state-3" readonly name="client_email" value="{{$client->client_email}}" type="text" class="form-control" placeholder="Enter Your Email" required>
                            @endif
                        </div>
                      </div>


                    </div>

                    <div class="mt-3">Client Phone Number</strong></label>
                      @if($client== null)
                      <input id="input-state-3" name="client_phone" readonly   type="text" class="form-control" placeholder="Enter Your Phone number" required>

                      @else
                        <input id="input-state-3" name="client_phone" readonly value="{{$client->client_phone}}"  type="text" class="form-control" placeholder="Enter Your Phone number" required>
                        @endif

                    </div>
                    <div class="mt-3">
                        <label for="floatingTextarea"><strong>Client WhatsApp ID (For future communication)!</strong></label>
                        @if($client== null)

                          <textarea class="form-control"  readonly name="client_whatsapp" placeholder="Leave a comment here" ></textarea>
                        @else
                      <textarea class="form-control"  readonly name="client_whatsapp" placeholder="Leave a comment here" >{!!$client->client_whatsapp!!}</textarea>
                      @endif



                    </div>
                    <div class="mt-3">
                        <label for="floatingTextarea"><strong>Client's Available Platform</strong></label>
                        @if($client== null)
                          <textarea class="form-control"  readonly name="other_platform" placeholder="Leave a comment here"></textarea>

                        @else
                      <textarea class="form-control"  readonly name="other_platform" placeholder="Leave a comment here">{!!$client->other_platform!!}</textarea>
                      @endif


                    </div>
                    <div class="mt-3">
                        <label for="floatingTextarea"><strong>Client's Message </strong></label>
                        @if($client== null)
                              <textarea class="form-control" readonly  name="message"  placeholder="Leave a comment here" required></textarea>

                        @else
                      <textarea class="form-control" readonly  name="message"  placeholder="Leave a comment here" required>{!!$client->message!!}</textarea>

                      @endif

                    </div>
                    <div class="mt-3">
                        <label for="input-state-3" class="form-label"><strong style="color:red;">Client Submission Url</strong></label>
                      <div class="row" >

                        <div class="col-md-10">
                            <input type="text" readonly class="form-control"  value="{{$url}}/deals/{{$deal->hash}}" id="{{$deal->hash}}">
                        </div>
                        <div class="col-md-2">
                                <button type="button" class="btn btn-info" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>
                        </div>


                      </div>



                            <!-- The button used to copy the text -->

                    </div>

                      </form>





                </div>




              </div>






          </div>
          <!-- CARD BODY END -->
          <!-- CARD FOOTER START -->
          <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">





          </div>
          <!-- CARD FOOTER END -->
      </div>
    </div>

    <script type="text/javascript">
    function myFunction{{$deal->hash}}() {
      // Get the text field
      var copyText = document.getElementById("{{$deal->hash}}");

      // Select the text field
      copyText.select();
      copyText.setSelectionRange(0, 99999); // For mobile devices

       // Copy the text inside the text field
      navigator.clipboard.writeText(copyText.value);

      // Alert the copied text
      alert("Copied the text: " + copyText.value);
    }

    </script>

          <script>
      @if(Session::has('message'))
      toastr.options =
      {
      	"closeButton" : true,
      	"progressBar" : true
      }
      		toastr.success("{{ session('message') }}");
      @endif

      @if(Session::has('error'))
      toastr.options =
      {
      	"closeButton" : true,
      	"progressBar" : true
      }
      		toastr.error("{{ session('error') }}");
      @endif

      @if(Session::has('info'))
      toastr.options =
      {
      	"closeButton" : true,
      	"progressBar" : true
      }
      		toastr.info("{{ session('info') }}");
      @endif

      @if(Session::has('warning'))
      toastr.options =
      {
      	"closeButton" : true,
      	"progressBar" : true
      }
      		toastr.warning("{{ session('warning') }}");
      @endif
    </script>

@endsection
