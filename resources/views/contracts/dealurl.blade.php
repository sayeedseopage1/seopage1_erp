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
                      <div class="details-seopage1">
                        <h4>Client's Timezone</h4>
                        <p>{{$client->timezone}}</p>
                      </div>
                      <?php
                      // $day= rtrim($client->day, " ,");
                       ?>
                      <div class="details-seopage1">
                        <h4>Client's Available Time</h4>
                        <p>{!!$client->day!!}</p>
                      </div>

                      <div class="details-seopage1 py-4">
                          <h4>Public Url</h4>
                        <?php
                        $url= url('/');
                        $deal_url = $url.'/'.'deals/'.$deal->hash;
                        //dd($deal_url);
                         ?>
                        <span>
                          <input type="text" readonly class="form-control"  value="{{$url}}/deals/client-form/{{$deal->deal_id}}" id="{{$deal->deal_id}}">

                        </span>
                            <button type="button" class="btn btn-info mt-3" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>


                      </div>
                </div>
                @else
                <div class="col-md-8 seopage_card">
                    <h3 class="text-center" style="color:#41b4e1;font-weight: 600;"> Clients Data Details</h3>


                      <!-- <div class="details-seopage1">
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
                      <div class="details-seopage1">
                        <h4>Client's Timezone</h4>
                        <p></p>
                      </div>
                      <div class="details-seopage1">
                        <h4>Client's Available Time</h4>
                        <p></p>
                      </div> -->
                      <div class="details-seopage1 py-4">
                        <h4>Public Url</h4>
                        <?php
                        $url= url('/');
                        $deal_url = $url.'/'.'deals/'.$deal->hash;
                        //dd($deal_url);
                         ?>
                        <span>
                          <input type="text" readonly class="form-control"  value="{{$url}}/deals/client-form/{{$deal->deal_id}}" id="{{$deal->deal_id}}">

                        </span>
                            <button type="button" class="btn btn-info mt-3" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>


                      </div>

                      <div class="details-seopage1 py-4">

                        <span>
                          <h4 class="text-center" style="color:red !important;"> Client hasn't Responded Yet!</h4>

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
