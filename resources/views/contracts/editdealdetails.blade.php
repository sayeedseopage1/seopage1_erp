@extends('layouts.app')

@section('filter-section')
{{--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">--}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<style>
.milestone-wrapper{
  height: auto !important;
}
</style>
    <!-- FILTER START -->
    <!-- PROJECT HEADER START -->
    <?php
      $project_id= App\Models\Project::where('deal_id',$deal->id)->first();
      //dd($project_id->id);

     ?>
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
                          <input type="text" class="form-control"  value="https://erp.seopage1.net/deals/{{$deal->hash}}" id="{{$deal->hash}}">
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
                        <form method="post" action="{{route('update-deal-details')}}" id="update-deal">
                          @csrf

                          <input type="hidden" name="id" value="{{$deal->id}}">
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deal_id">Deal Id</label>
                              <input type="text" class="form-control height-35 f-14" value="{{$deal->deal_id}}" id="deal_id" placeholder="name@example.com" readonly>
                              </div>

                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deal_creation_date">Deal Creation Date</label>
                              <input type="text" value="{{$deal->deal_creation_date}}" class="form-control height-35 f-14" id="deal_creation_date" placeholder="name@example.com" readonly>
                              </div>


                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="project_name">Project Name <span style="color:red;">*</span></label>
                              <input type="text" name="project_name" value="{{$deal->project_name}}" class="form-control height-35 f-14" id="project_name" placeholder="name@example.com">
                                  <label id="projectNameError" class="error text-danger" for="project_name"></label>
                              </div>


                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deadline">Deadline <span style="color:red;">*</span></label>
                              <input type="datetime-local" name="deadline" value="{{ \Carbon\Carbon::parse($deal->deadline)->format('Y-m-d H:i') }}" class="form-control height-35 f-14" id="deadline" placeholder="Enter deadline" style="background: #ffffff;">
                                  <label id="deadlineError" class="error text-danger" for="deadline"></label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="amount">Project Budget <span style="color:red;">*</span></label>
                              <input type="text" name="amount" value="{{$deal->actual_amount}}" class="form-control height-35 f-14" id="amount" placeholder="name@example.com">
                                  <label id="amountError" class="error text-danger" for="amount"></label>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <?php
                              $currency= App\Models\Currency::where('id',$deal->original_currency_id)->first();
                               ?>
                              <label for="original_currency_id">Currency <span style="color:red;">*</span></label>
                            <select class="form-control height-35 f-14" name="original_currency_id" id="original_currency_id">
                              <option selected value="{{$deal->original_currency->id}}">{{$deal->original_currency->currency_code}} ({{$deal->original_currency->currency_symbol}})</option>
                                <label id="currencyError" class="error text-danger" for="original_currency_id"></label>
                            </select>
                            </div>

                            <div class="col-md-6">
                              <?php
                                $milestones= App\Models\ProjectMilestone::where('project_id',$project_id->id)->get();
                               ?>
                                <label for="exampleFormControlInput1">Milestones <span style="color:red;">*</span></label>
                              <div class="input-group mb-3 w-100">
                                <div class="milestone-wrapper d-flex flex-wrap form-control" id="milestone_value"></div>

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
                              <label for="client_name">Client Name</label>
                              <input type="text" name="client_name" value="{{$deal->client_name}}" class="form-control height-35 f-14" id="client_name" placeholder="name@example.com" required>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="client_username">Client Username</label>
                              <input type="text" name="client_username" value="{{$deal->client_username}}" class="form-control height-35 f-14" id="client_username" placeholder="name@example.com" readonly>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="organization">Organization</label>
                              <input type="text" value="{{$deal->organization}}" name="organization" class="form-control height-35 f-14" id="organization" placeholder="Enter organization name" >
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="client_email">Client Email</label>
                              <input type="text" value="{{$deal->client_email}}" name="client_email" class="form-control height-35 f-14" id="client_email" placeholder="client@email.com" >
                              </div>
                            </div>

                          </div>
                          <br>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                              <label for="profile_link">Freelancer Profile Link <span style="color:red;">*</span></label>
                              <input type="text" value="{{$deal->profile_link}}" name="profile_link" class="form-control height-35 f-14" id="profile_link" placeholder="Input here">
                                  <label id="profileLinkError" class="error text-danger" for="profile_link"></label>
                              </div>
                            </div>
                            <?php
                            $mystring = $deal->message_link;

                                $output = str_replace('<br>',' ', $mystring);

                                $output_final= (trim($output));
                                $data= explode("  ", $output_final);
                               // dd(($data));

                             ?>

                            <div class="col-md-12">
                               @foreach($data as $message)
                              <div class="form-group">

                              <label for="freelancer_message_link">Freelancer Message Link</label>
                                <input type="text" value="{{$message}}" name="message_link[]" class="form-control height-35 f-14" id="message_link" placeholder="Input here">
                              </div>
                                @endforeach
                            </div>

                            <div class="col-md-7 dynamic-field" id="dynamic-field-1">
                                <div class="row">
                                    <div class="col-md-9 my-2">
                                        <div class="form-group">
                                            <input type="text" id="message_link"  class="form-control height-35 f-14" placeholder="Add Link Here" name="message_link[]"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                              <div class="col-md-3 my-2 form-group append-buttons">
                                  <div class="clearfix">
                                      <button type="button" id="add-button" class="btn btn-secondary2 float-left text-uppercase shadow-sm"><i class="fa fa-plus fa-fw"></i></button>
                                      <button type="button" id="remove-button" class="btn btn-secondary2 float-left text-uppercase ml-1" disabled="disabled"><i class="fa fa-minus fa-fw"></i></button>
                                  </div>
                              </div>
                          </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="text-dark-grey" data-label="true" for="description2Text">Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <textarea name="description2" id="description2Text" class="form-control">{!!$deal->description2!!}</textarea>
                                        <script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>
                                        <script>
                                            CKEDITOR.replace('description2');
                                        </script>
                                        <label id="description2Error" class="error text-danger" for="description2Text"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="text-dark-grey" data-label="true" for="description3Text">Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog, and contact. The look and feel should be better than the references.)
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <textarea name="description3" id="description3Text" class="form-control">{!!$deal->description3!!}</textarea>
                                        <script>
                                            CKEDITOR.replace('description3');
                                        </script>
                                        <label id="description3Error" class="error text-danger" for="description3Text"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="text-dark-grey" data-label="true" for="description4Text">Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for section layouts DEF.com is for header & footer styling. However, none of these can be copied)
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <textarea name="description4" id="description4Text" class="form-control">{!!$deal->description4!!}</textarea>
                                        <script>
                                            CKEDITOR.replace('description4');
                                        </script>
                                        <label id="description4Error" class="error text-danger" for="description4Text"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="text-dark-grey" data-label="true" for="description5Text">Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work the way he wants.)
                                            <sup class="mr-1">*</sup>
                                        </label>
                                        <textarea name="description5" id="description5Text" class="form-control">{!!$deal->description5!!}</textarea>
                                        <script>
                                            CKEDITOR.replace('description5');
                                        </script>
                                        <label id="description5Error" class="error text-danger" for="description5Text"></label>
                                    </div>
                                </div>
                            </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)
                                   <span style="color:red;">*</span></label>
                                  <textarea name="description6" id="description6Text" class="form-control ">{!!$deal->description6!!}</textarea>
                                  <script>
                                      CKEDITOR.replace('description6');
                                  </script>
                                  <label id="description6Error" class="error text-danger" for="description6Text"></label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)
                                   <span style="color:red;">*</span></label>
                                  <textarea name="description7" id="description7Text" class="form-control">{!!$deal->description7!!}</textarea>
                                  <script>
                                      CKEDITOR.replace('description7');
                                  </script>
                                  <label id="description7Error" class="error text-danger" for="description7Text"></label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)
                                   <span style="color:red;">*</span></label>
                                  <textarea name="description8" id="description8Text" class="form-control">{!!$deal->description8!!}</textarea>
                                  <script>
                                      CKEDITOR.replace('description8');
                                  </script>
                                  <label id="description8Error" class="error text-danger" for="description8Text"></label>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="exampleFormControlTextarea1">Any other notes for the project manager/technical team
                                   <span style="color:red;">*</span></label>
                                  <textarea name="description9" id="description9Text" class="form-control">{!!$deal->description9!!}</textarea>
                                  <script>
                                      CKEDITOR.replace('description9');
                                  </script>
                                  <label id="description9Error" class="error text-danger" for="description9Text"></label>
                              </div>
                            </div>
                          </div>
                          <br>
                          <div class="d-flex justify-content-center">
                            <button class="btn btn-primary" type="submit" id="updateBtn"><span class="btn-txt">Update Deal Creation</span></button>
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
{{--    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>--}}
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
                        spans += `<span class="badge badge-light mr-2"><a href="javascript:;" data-milestone-id="${item.id}" class="taskView milestone-detail text-darkest-grey f-w-500" title="${item.milestone_title}">${item.milestone_title.substr(0, 20)} (${item.actual_cost}) </a><button type="button" value="${item.id}" style="color:blue;" class="fa-solid fa-pen-to-square edit_milestone"></button> <button value="${item.id}" type="button" style="color:red;" class="fa-solid fa-trash delete_milestone"></button></span>`
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

                        $('#cost').val(response.milestone.actual_cost);
                        $('#summary').val(response.milestone.summary);
                        $('#milestone_id').val(milestone_id);
                    }
                }
            });

        });

        $(document).on('click',' .update_milestone',function(e){
            e.preventDefault();
            var summary = CKEDITOR.instances.summary2.getData();

            var milestone_id = $('#milestone_id').val();
            var data= {
                'title' : $('#title').val(),
                'cost' : $('#cost').val(),
                'summary' : summary,
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
            var summary = CKEDITOR.instances.summary2.getData();
            //console.log("test");
            var data= {
                'title': $('.title').val(),
                'cost': $('.cost').val(),
                'summary': summary,
                //'project_id': document.querySelector('.project_id').value,
                'project_id': document.getElementById("project_id").value,
                'original_currency_id': document.getElementById("original_currency_id").value,
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
    $('body').on('click', '.milestone-detail', function() {
        var id = $(this).data('milestone-id');
        var url = "{{ route('milestones.show', ':id') }}";
        url = url.replace(':id', id);
        $(MODAL_XL + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_XL, url);
    });


    </script>
    <!--EDIT DEAL DETAILS START-->
    <script>
        $('#updateBtn').click(function(e){
            e.preventDefault();
            // alert('ok');
            var description2 = CKEDITOR.instances.description2Text.getData();
            var description3 = CKEDITOR.instances.description3Text.getData();
            var description4 = CKEDITOR.instances.description4Text.getData();
            var description5 = CKEDITOR.instances.description5Text.getData();
            var description6 = CKEDITOR.instances.description6Text.getData();
            var description7 = CKEDITOR.instances.description7Text.getData();
            var description8 = CKEDITOR.instances.description8Text.getData();
            var description9 = CKEDITOR.instances.description9Text.getData();
            // console.log(description3);
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var data= {
                '_token': "{{ csrf_token() }}",
                'project_name': document.getElementById("project_name").value,
                'deadline': document.getElementById("deadline").value,
                'original_currency_id': document.getElementById("original_currency_id").value,
                'amount': document.getElementById("amount").value,
                'client_name': document.getElementById("client_name").value,
                'organization': document.getElementById("organization").value,
                'client_email': document.getElementById("client_email").value,
                'profile_link': document.getElementById("profile_link").value,
                'message_link': message_links_values,
                'description2': description2,
                'description3': description3,
                'description4': description4,
                'description5': description5,
                'description6': description6,
                'description7': description7,
                'description8': description8,
                'description9': description9,
                'id': '{{$deal->id}}',
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('update-deal-details')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('.error').html("");
                    $(location).prop('href', '{{url('/account/contracts/')}}');
                    toastr.success('Deal Updated Successfully');
                },
                error: function(error) {
                    if (error) {
                        $('#projectNameError').html(error.responseJSON.errors.project_name);
                        $('#deadlineError').html(error.responseJSON.errors.deadline);
                        $('#currencyError').html(error.responseJSON.errors.original_currency_id);
                        $('#profileLinkError').html(error.responseJSON.errors.profile_link);
                        $('#description2Error').html(error.responseJSON.errors.description2);
                        $('#description3Error').html(error.responseJSON.errors.description3);
                        $('#description4Error').html(error.responseJSON.errors.description4);
                        $('#description5Error').html(error.responseJSON.errors.description5);
                        $('#description6Error').html(error.responseJSON.errors.description6);
                        $('#description7Error').html(error.responseJSON.errors.description7);
                        $('#description8Error').html(error.responseJSON.errors.description8);
                        $('#description9Error').html(error.responseJSON.errors.description9);
                        if (error.responseJSON.errors.milestone_value) {
                            {{--$(location).prop('href', '{{url('/account/contracts/')}}');--}}
                            toastr.error('Please add a milestone!');
                        }
                    }

                }
            });
        });

    </script>
    <!--ENDI DEAL DETAILS END-->
    @push('scripts')

    <script>
             $(document).ready(function () {
                 var buttonAdd = $("#add-button");
                 var buttonRemove = $("#remove-button");
                 var className = ".dynamic-field";
                 var count = 0;
                 var field = "";
                 var maxFields = 50;

                 function totalFields() {
                     return $(className).length;
                 }

                 function addNewField() {
                     count = totalFields() + 1;
                     field = $("#dynamic-field-1").clone();
                     field.attr("id", "dynamic-field-" + count);
                     field.children("label").text("Field " + count);
                     field.find("input").val("");
                     $(className + ":last").after($(field));
                 }

                 function removeLastField() {
                     if (totalFields() > 1) {
                         $(className + ":last").remove();
                     }
                 }

                 function enableButtonRemove() {
                     if (totalFields() === 2) {
                         buttonRemove.removeAttr("disabled");
                         buttonRemove.addClass("shadow-sm");
                     }
                 }

                 function disableButtonRemove() {
                     if (totalFields() === 1) {
                         buttonRemove.attr("disabled", "disabled");
                         buttonRemove.removeClass("shadow-sm");
                     }
                 }

                 function disableButtonAdd() {
                     if (totalFields() === maxFields) {
                         buttonAdd.attr("disabled", "disabled");
                         buttonAdd.removeClass("shadow-sm");
                     }
                 }

                 function enableButtonAdd() {
                     if (totalFields() === maxFields - 1) {
                         buttonAdd.removeAttr("disabled");
                         buttonAdd.addClass("shadow-sm");
                     }
                 }

                 buttonAdd.click(function () {
                     addNewField();
                     enableButtonRemove();
                     disableButtonAdd();
                 });

                 buttonRemove.click(function () {
                     removeLastField();
                     disableButtonRemove();
                     enableButtonAdd();
                 });
             });
         </script>
    <script>
        const form = document.getElementById('update-deal');
        const button = document.getElementById('updateBtn');
        const projectName = document.getElementById('project_name');
        const deadline = document.getElementById('deadline');

        const currency  = document.getElementById('original_currency_id');



        form.addEventListener('input', () => {
            let valid = true;
            if (projectName.value.trim() === '') {
                valid = false;
                projectNameError.textContent = 'Please enter the project name!';
            } else {
                projectNameError.textContent = '';
            }
            if (deadline.value.trim() === '') {
                valid = false;

                deadlineError.textContent = 'Please select project deadline from Freelancer.com!';
            } else {
                deadlineError.textContent = '';
            }
            if (currency.value.trim() === '') {

                valid = false;
                currencyError.textContent = 'Please select correct currency!';
            } else {
                currencyError.textContent = '';
            }
        });
    </script>
    <script>
        flatpickr("#deadline", {
            dateFormat: "Y-m-d",
        });
        $("#updateBtn").on('click',function() {
            $("#updateBtn").attr("disabled", true);
            $(".btn-txt").text("Processing ...");
        });
    </script>
    @endpush
@endsection
