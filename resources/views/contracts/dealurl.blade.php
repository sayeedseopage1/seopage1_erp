@extends('layouts.app')

@section('filter-section')


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
    <style>
        .seopage_card {
            box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
            padding: 5%;
            margin: 5% auto;
            display: block;
            border-radius: 30px;
        }
        .details-seopage1 {
            width: 100%;
            height: auto;
            border-bottom: 1px solid #ddd;
            padding: 8px 0;
        }
        .details-seopage1 h4{
            font-family: Poppins;
            font-size: 22px;
            font-weight: normal;
            line-height: 1.48;
            text-align: left;
            color: #41b4e1;
        }
        .details-seopage1 p{
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.5;
            letter-spacing: normal;
            text-align: left;
            color: #6a6a6a;
        }
        .details-seopage1 a{
            font-size: 16px;
            font-weight: normal;
            line-height: 1.5;
            text-align: left;
            color: #41b4e1;
            text-decoration: none;
        }
        .details-seopage1 p span {
            font-weight: 500;
            color: #333;
        }

        .details-seopage1 i.fa-regular.fa-copy {
            color: #41b4e1 !important;
            font-size: 18px;
        }
    </style>

@endpush

@section('content')

  {{--  <div class="content-wrapper border-top-0 client-detail-wrapper">
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
                        <label for="floatingTextarea"><strong>Client's Timezone</strong></label>
                        @if($client== null)
                              <textarea class="form-control" readonly  name="message"  placeholder="Leave a comment here" required></textarea>

                        @else
                      <textarea class="form-control" readonly  name="timezone"  placeholder="Leave a comment here" required>{!!$client->timezone!!}</textarea>

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
    </div> --}}
    <section>
        <div class="container">
            <div class="row">
                <div class="col-md-2"></div>
                @if($client != null)
                <div class="col-md-8 seopage_card">
                    <h3 class="text-center" style="color:#41b4e1;font-weight: 600;"> Clients Data Details</h3>


                      <div class="details-seopage1">
                        <h4>Client User Neme</h4>
                        <p>{{$client->client_username}}</p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client Email</h4>
                        <p>{{$client->client_email}}</p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client Phone</h4>
                        <p>{{$client->client_phone}}</p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client WatsApp ID (For Future Communation)!</h4>
                        <p>{!!$client->client_whatsapp!!}</p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client's Avilable Platform</h4>
                        <p>{!!$client->other_platform!!}</p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client's Message</h4>
                        <p>{!!$client->message!!}</p>
                      </div>

                      <div class="details-seopage1 py-4">
                        <?php
                        $url= url('/');
                        $deal_url = $url.'/'.'deals/'.$deal->hash;
                        //dd($deal_url);
                         ?>
                        <span>
                          <input type="text" readonly class="form-control"  value="{{$url}}/deals/{{$deal->deal_id}}" id="{{$deal->deal_id}}">

                        </span>
                            <button type="button" class="btn btn-info mt-3" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>


                      </div>
                </div>
                @else
                <div class="col-md-8 seopage_card">
                    <h3 class="text-center" style="color:#41b4e1;font-weight: 600;"> Clients Data Details</h3>


                      <div class="details-seopage1">
                        <h4>Client User Neme</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client Email</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client Phone</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client WatsApp ID (For Future Communation)!</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client's Avilable Platform</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1">
                        <h4>Client's Message</h4>
                        <p></p>
                      </div>

                      <div class="details-seopage1 py-4">

                        <span>
                          <h4 class="text-center" style="color:red !important;"> Client hasn't Responsed Yet!</h4>

                        </span>



                      </div>
                </div>
                @endif
                <div class="col-md-2"></div>
            </div>
        </div>
    </section>

    <script type="text/javascript">
    function myFunction{{$deal->hash}}() {
      // Get the text field
      var copyText = document.getElementById("{{$deal->deal_id}}");

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
    <script>
        const textElement = document.getElementById("textcopyseopage1");
        const copyButton = document.getElementById("copy");

        const copyText = (e) => {
        window.getSelection().selectAllChildren(textElement);
        document.execCommand("copy");
        e.target.setAttribute("tooltip", "Copied! ✅");
        };

        const resetTooltip = (e) => {
        e.target.setAttribute("tooltip", "Copy to clipboard");
        };

        copyButton.addEventListener("click", (e) => copyText(e));
        copyButton.addEventListener("mouseover", (e) => resetTooltip(e));

    </script>


@endsection
