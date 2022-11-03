@extends('layouts.app')

@section('filter-section')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
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
              @if($deal->submission_status == 'pending')
              <h5 class="d-flex justify-content-center">Link Submission for Client Data Collection</h5>

            @else
                <h5>Deal Details</h5>
            @endif
            <hr>
            <?php
            $url= url('/');
             ?>
              <div class="invoice-table-wrapper">
                @if($deal->submission_status == 'pending')
                <div class="d-flex justify-content-center">
                  <form class=""action="{{route('form-submit-to-client')}}" method="post">
                    @csrf
                      <input type="hidden" name="id" value="{{$deal->id}}">


                  <div class="mt-3">
                      <label for="input-state-3" class="form-label"><strong style="color:red;">Please Copy This URL, Send It To The Client & Confirm Submission</strong></label>
                    <div class="row" style="margin-left:40px;">

                      <div class="col-md-10">
                          <input type="text" class="form-control"  value="{{$url}}/deals/{{$deal->hash}}" id="{{$deal->hash}}">
                      </div>
                      <div class="col-md-2">
                              <button type="button" class="btn btn-info" onclick="myFunction{{$deal->hash}}()"><i class="fa-solid fa-copy"></i></button>
                      </div>


                    </div>



                          <!-- The button used to copy the text -->

                  </div>
                  <div class="mt-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary">Confirm Submission</button>
                  </div>
                    </form>
                </div>

                @else

                <div class="row">
                    <div class="col-sm-12">
                        <form method="post" action="{{route('store-deal-details')}}">
                          @csrf

                          <input type="hidden" name="id" value="{{$deal->id}}">
                          <div class="row">

                            <div class="col-md-4">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deal Id</label>
                              <input type="text" class="form-control" value="{{$deal->deal_id}}" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>


                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deal Creation Date</label>
                              <input type="text" value="{{$deal->deal_creation_date}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>


                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Project Name <span style="color:red;">*</span></label>
                              <input type="text" name="project_name" value="{{$deal->project_name}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required>
                              </div>

                            </div>


                          </div>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Project Budget <span style="color:red;">*</span></label>
                              <input type="text" name="amount" value="{{$deal->amount}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>
                            </div>

                            <!-- <div class="col-md-6">

                                <label for="exampleFormControlInput1">Create Milestone <span style="color:red;">*</span></label>
                              <div class="input-group mb-3">

                              <input type="text" class="form-control" placeholder="Add Milestone" aria-label="Add Milstone" aria-describedby="basic-addon2" required>
                              <div class="input-group-append">
                                <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#milestoneaddmodal" type="button">Add</button>
                              </div>
                              @include('contracts.modals.milestonecreatemodal')
                              </div>
                            </div> -->



                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Client Name</label>
                              <input type="text" name="client_name" value="{{$deal->client_name}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Client Username</label>
                              <input type="text" name="client_username" value="{{$deal->client_username}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Organization</label>
                              <input type="text" name="organization" class="form-control" id="exampleFormControlInput1" placeholder="Company Name" >
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Client Email</label>
                              <input type="text" name="client_email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" >
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Project Summary <span style="color:red;">*</span></label>
                                <textarea name="description" class="form-control" id="description" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-4">
                                <label for="exampleFormControlTextarea1">Pipeline Stage <span style="color:red;">*</span></label>
                              <select class="form-control" name="pipeline_stage">
                                <option value="Contact Made">Contact Made</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Requirements Defined">Requirements Defined</option>
                                <option value="Proposal Made">Proposal Made</option>
                                  <option value="Negotiation Started">Negotiation Started</option>
                              </select>
                            </div>
                            <div class="col-md-4">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deadline</label>
                              <input type="date" name="deadline" class="form-control" id="exampleFormControlInput1" placeholder="Enter deadline" >
                              </div>
                            </div>
                            <div class="col-md-4">
                              <?php
                              $currencies= App\Models\Currency::all();


                               ?>
                              <label for="exampleFormControlTextarea1">Currency <span style="color:red;">*</span></label>
                            <select class="form-control" name="currency_id">
                              @foreach($currencies as $currency)
                              <option value="{{$currency->id}}">{{$currency->currency_code}} ({{$currency->currency_symbol}})</option>
                            @endforeach
                            </select>
                            </div>

                          </div>
                          <br>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Freelancer Profile Link <span style="color:red;">*</span></label>
                              <input type="text" name="message_link" class="form-control" id="exampleFormControlInput1" placeholder="Input here" required>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Freelancer Message Link <span style="color:red;">*</span></label>
                              <input type="text" name="profile_link" class="form-control" id="exampleFormControlInput1" placeholder="Input here" required>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.) <span style="color:red;">*</span></label>
                                <textarea name="description2" class="form-control" id="description2" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                                  It should include home, about, his services in one page, blog, and contact.
                                  The look and feel should be better than the references.)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description3" class="form-control" id="description3" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Reference websites and what the references are for (Ex: ABC.com is for the color scheme.
                                                XYZ.com is for section layouts
                                                DEF.com is for header & footer styling.
                                                However, none of these can be copied)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description4" class="form-control" id="description4" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Any particular focus/concern of the client (Ex: 1. The client is very concerned about the
                                  final look & feel so needs to be careful with the design 2.
                                  The client is very concerned if the booking functionality will work the way he wants.)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description5" class="form-control" id="description5" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description6" class="form-control" id="description6" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)


                                   <span style="color:red;">*</span></label>
                                <textarea name="description7" class="form-control" id="description7" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)


                                   <span style="color:red;">*</span></label>
                                <textarea name="description8" class="form-control" id="description8" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Any other notes for the project manager/technical team



                                   <span style="color:red;">*</span></label>
                                <textarea name="description9" class="form-control" id="description9" rows="3" required></textarea>
                              </div>
                            </div>

                          </div>



                          <br>
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-primary" type="submit">Complete Deal Creation</button>

                          </div>
                        </form>

                    </div>
                </div>
                @endif
              </div>

              <div class="d-flex flex-column">

              </div>




          </div>
          <!-- CARD BODY END -->
          <!-- CARD FOOTER START -->
          <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">





          </div>
          <!-- CARD FOOTER END -->
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
    <script>
    $(document).ready(function() {
      $('#description').summernote();
    });
    $(document).ready(function() {
      $('#description2').summernote();
    });
    $(document).ready(function() {
      $('#description3').summernote();
    });
    $(document).ready(function() {
      $('#description4').summernote();
    });
    $(document).ready(function() {
      $('#description5').summernote();
    });
    $(document).ready(function() {
      $('#description6').summernote();
    });
    $(document).ready(function() {
      $('#description7').summernote();
    });
    $(document).ready(function() {
      $('#description8').summernote();
    });
    $(document).ready(function() {
      $('#description9').summernote();
    });
    </script>
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

@endsection
