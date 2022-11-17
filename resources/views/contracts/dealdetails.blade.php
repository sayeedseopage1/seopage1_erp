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
<?php
  $project_id= App\Models\Project::where('deal_id',$deal->id)->first();
  //dd($project_id->id);

 ?>

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

                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deal Id</label>
                              <input type="text" class="form-control" value="{{$deal->deal_id}}" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>


                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deal Creation Date</label>
                              <input type="text" value="{{$deal->deal_creation_date}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>


                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Project Name <span style="color:red;">*</span></label>
                              <input type="text" name="project_name" value="{{$deal->project_name}}" class="form-control  @error('project_name') is-invalid @enderror" id="exampleFormControlInput1" placeholder="" >
                              </div>
                              @error('project_name')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror

                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Deadline</label>
                              <input type="date" name="deadline"  class="form-control" id="exampleFormControlInput1" placeholder="Enter deadline" >
                              </div>
                            </div>


                          </div>
                          <div id="success_message">

                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Project Budget <span style="color:red;">*</span></label>
                              <input type="text" name="amount" value="{{$deal->actual_amount}}" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" readonly>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <?php
                              $currency= App\Models\Currency::where('id',$deal->original_currency_id)->first();


                               ?>
                              <label for="exampleFormControlTextarea1">Currency <span style="color:red;">*</span></label>
                            <select class="form-control" name="original_currency_id">



                              <option selected value="{{$deal->original_currency->id}}">{{$deal->original_currency->currency_code}} ({{$deal->original_currency->currency_symbol}})</option>

                            </select>
                            </div>

                            <div class="col-md-6">
                              <?php
                                $milestones= App\Models\ProjectMilestone::where('project_id',$project_id->id)->get();


                               ?>


                                <label for="exampleFormControlInput1">Create Milestone <span style="color:red;">*</span></label>
                              <div class="input-group mb-3 w-100">
                                <div class="milestone-wrapper d-flex align-items-center flex-wrap form-control" id="milestone_value"></div>

                              <div class="input-group-append">
                                <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#milestoneaddmodal" type="button">Add</button>
                              </div>
                                <input type="hidden" class="project_id" name="project_id" id="project_id" value="{{$project_id->id}}">
                              @include('contracts.modals.milestonecreatemodal')
                                @include('contracts.modals.milestoneeditmodal')
                                @include('contracts.modals.milestonedeletemodal')
                              </div>
                            </div>



                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Client Name</label>
                              <input type="text" name="client_name" value="{{$deal->client_name}}" class="form-control @error('project_name') is-invalid @enderror" id="exampleFormControlInput1" placeholder="name@example.com" >
                              </div>
                              @error('client_name')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
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
                                <textarea name="description" class="form-control @error('description') is-invalid @enderror" id="description" rows="3"></textarea>
                              </div>
                              @error('description')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                            </div>

                          </div>

                          <br>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Freelancer Profile Link <span style="color:red;">*</span></label>
                              <input type="text" name="message_link" class="form-control @error('profile_link') is-invalid @enderror" id="exampleFormControlInput1" placeholder="Input here">
                              </div>
                              @error('profile_link')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                              <label for="exampleFormControlInput1">Freelancer Message Link <span style="color:red;">*</span></label>
                              <input type="text" name="profile_link" class="form-control @error('message_link') is-invalid @enderror" id="exampleFormControlInput1" placeholder="Input here">
                              </div>
                              @error('message_link')
                              <div class="mt-3">
                                <div class="alert alert-danger">{{ $message }}</div>
                                </div>
                              @enderror
                            </div>

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.) <span style="color:red;">*</span></label>
                                <textarea name="description2" class="form-control  @error('description2') is-invalid @enderror" id="description2" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description2')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                                  It should include home, about, his services in one page, blog, and contact.
                                  The look and feel should be better than the references.)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description3" class="form-control  @error('description3') is-invalid @enderror" id="description3" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description3')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Reference websites and what the references are for (Ex: ABC.com is for the color scheme.
                                                XYZ.com is for section layouts
                                                DEF.com is for header & footer styling.
                                                However, none of these can be copied)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description4" class="form-control  @error('description4') is-invalid @enderror" id="description4" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description4')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Any particular focus/concern of the client (Ex: 1. The client is very concerned about the
                                  final look & feel so needs to be careful with the design 2.
                                  The client is very concerned if the booking functionality will work the way he wants.)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description5" class="form-control  @error('description5') is-invalid @enderror" id="description5" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description5')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)

                                   <span style="color:red;">*</span></label>
                                <textarea name="description6" class="form-control  @error('description6') is-invalid @enderror" id="description6" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description6')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)


                                   <span style="color:red;">*</span></label>
                                <textarea name="description7" class="form-control  @error('description7') is-invalid @enderror" id="description7" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description7')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)


                                   <span style="color:red;">*</span></label>
                                <textarea name="description8" class="form-control  @error('description8') is-invalid @enderror" id="description8" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description8')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Any other notes for the project manager/technical team



                                   <span style="color:red;">*</span></label>
                                <textarea name="description9" class="form-control  @error('description9') is-invalid @enderror" id="description9" rows="3"></textarea>
                              </div>
                            </div>
                            @error('description9')
                            <div class="mt-3">
                              <div class="alert alert-danger">{{ $message }}</div>
                              </div>
                            @enderror

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

      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
    <script>
    $(document).ready(function() {
      $('#summary2').summernote();
    });
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
    $(document).ready(function() {
      fetchmilestone();
      function fetchmilestone()
      {
        $.ajax({
          type: "GET",
          url: "/deals/milestone-get/{{$project_id->id}}",

          dataType: "json",
          success: function (response){
          //  console.log(response.milestones);
            let spans= '';
            response.milestones.forEach((item)=> {
              spans += `<span class="badge badge-light mr-2">${item.milestone_title} <button type="button" value="${item.id}" style="color:blue;" class="fa-solid fa-pen-to-square edit_milestone"></button> <button value="${item.id}" type="button" style="color:red;" class="fa-solid fa-trash delete_milestone"></button></span>`
            });

            document.querySelector('#milestone_value').innerHTML= spans;

          }
        });
      }

      $(document).on('click',' .edit_milestone',function(e){
        e.preventDefault();
        var milestone_id = $(this).val();
        //console.log(milestone_id);
        $('#editmilestone').modal('show');
        $.ajax({
          type: "GET",
          url: "/deals/edit-milestone/"+milestone_id,

          success: function(response){
            //console.log(response);
            if (response.status == 404) {
              $('#success_message').html("");
              $('#success_message').addClass('alert alert-danger');
              $('#success_message').text(response.message);
            }else {
              $('#title').val(response.milestone.milestone_title);
              $('#cost').val(response.milestone.cost);
              $('#summary').val(response.milestone.summary);
              $('#milestone_id').val(milestone_id);
            }
          }
        });

      });

      $(document).on('click',' .update_milestone',function(e){
        e.preventDefault();

        var milestone_id = $('#milestone_id').val();
        var data= {
          'title' : $('#title').val(),
          'cost' : $('#cost').val(),
          'summary' : $('#summary').val(),
        }
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "PUT",
          url: "/deals/update-milestone/"+milestone_id,
          data: data,
          dataType: "json",
          success: function(response){
          //  console.log(response);
            if (response.status == 400) {
              $('#updateform_errList').html("");
              $('#updateform_errList').addClass('alert alert-danger');
              $.each(response.errors, function (key, err_values){
                $('#updateform_errList').append('<li>'+err_values+'</li>');
              });
            }
            else if (response.status == 400)
            {
              $('#updateform_errList').html("");
              $('#success_message').addClass('alert alert-success');
              $('#success_message').text(response.message);
            }

            else{
              $('#updateform_errList').html("");
              $('#success_message').html("");
              $('#success_message').addClass('alert alert-success');
              $('#success_message').text(response.message);
              $('#editmilestone').modal('hide');
                fetchmilestone();
            }
          }
        });


      });

      $(document).on('click','.delete_milestone',function(e){
        e.preventDefault();
        var milestone_id= $(this).val();
          //console.log(milestone_id);
        $('#delete_milestone_id').val(milestone_id);

        $('#deletemilestone').modal('show');
      });
      $(document).on('click','.delete_milestone_btn',function(e){
        e.preventDefault();
        $(this).text("Deleting");
        var milestone_id= $('#delete_milestone_id').val();
      //  console.log(milestone_id);
        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
          }
        });
        $.ajax({
          type: "DELETE",
          url: "/deals/delete-milestone/"+milestone_id,
          success: function (response){
            //console.log(response);
              $('#success_message').addClass('alert alert-danger');
            $('#success_message').text(response.message);
            $('#deletemilestone').modal('hide');
              $('delete_milestone_btn').text("Yes Delete");
              fetchmilestone();
          }

        });

      });

      $(document).on('click','.add_milestone',function(e){

      e.preventDefault();
      //console.log("test");
      var data= {
        'title': $('.title').val(),
        'cost': $('.cost').val(),
        'summary': $('.summary').val(),
        //'project_id': document.querySelector('.project_id').value,
        'project_id': document.getElementById("project_id").value,
      }
      //console.log(data);
      $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        type: "POST",
        url: "{{route('add-milestone')}}",
        data: data,
        dataType: "json",
        success: function (response){
          if (response.status == 400) {
            $('#saveform_errList').html("");
            $('#saveform_errList').addClass('alert alert-danger');
            $.each(response.errors, function (key, err_values){
              $('#saveform_errList').append('<li>'+err_values+'</li>');
            });
          }
          else {
              $('#saveform_errList').html("");
              $('#success_message').addClass('alert alert-success');
              $('#success_message').text(response.message);
              $('#milestoneaddmodal').modal('hide');
              $('#milestoneaddmodal').find('input').val("");
              document.querySelector('#summary').value= '';
                fetchmilestone();

          }
        }
      });
    });

    });
    </script>


@endsection
