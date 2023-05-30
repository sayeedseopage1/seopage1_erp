@extends('layouts.app')

@section('filter-section')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<style>
.milestone-wrapper{
  height: auto !important;
}
</style>
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
                <h5>Deal Authorization</h5>
            @endif
            <hr>
            <div class="col-md-4">
                <td >
                    <table  class="inv-num-date text-dark f-13 mt-3">
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                                Deal Number</td>
                            <td class="border-left-0">#{{ $deal->deal_id }}</td>
                        </tr>
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                                @lang('modules.projects.startDate')</td>
                            <td class="border-left-0">{{ $deal->start_date }}
                            </td>
                        </tr>
                        <tr>
                          <td class="bg-light-grey border-right-0 f-w-500">
                              @lang('Deadline')</td>
                          <td class="border-left-0">{{ $deal->deadline }}
                          </td>
                      </tr>
                      {{-- {{dd($deal->lead_id)}} --}}
                      @if($deal->lead_id != null)
                      <tr>
                          <td class="bg-light-grey border-right-0 f-w-500">
                            Lead Name</td>
                          <td class="border-left-0"><a href="{{route('leads.show',$deal->lead_id)}}">{{ $deal->project_name }}</a>
                          </td>
                      </tr>
                      @endif   
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Deal Name</td>
                              @php
                                  $deal= App\Models\DealStage::where('short_code',$deal->deal_id)->first();
                              @endphp
                            <td class="border-left-0"><a href="{{route('deals.show',$deal->id)}}">{{ $deal->project_name }}</a>
                            </td>
                        </tr>
                        @php
                            $project= App\Models\Project::where('deal_id',$deal->id)->first();
                        @endphp
                        
                        @if ($deal->actual_amount != 0)
                        <tr>
                          <td class="bg-light-grey border-right-0 f-w-500">
                            Deal Value </td>
                            <td class="border-left-0">
                                <h4>
                                    {{$deal->actual_amount}}{{$deal->original_currency->currency_symbol}}</h4>
                            </td>


                        </tr>


                        @endif
                      {{-- @if ($deal->end_date != null)
                            <tr>
                                <td class="bg-light-grey border-right-0 f-w-500">@lang('modules.contracts.endDate')
                                </td>
                                <td class="border-left-0">{{ $deal->end_date->format(global_setting()->date_format) }}
                                </td>
                            </tr>
                        @endif --}}
                        <tr>
                            {{--}}<td class="bg-light-grey border-right-0 f-w-500">
                                @lang('modules.contracts.contractType')</td>
                            <td class="border-left-0">{{ $deal->contractType->name }}
                            </td> --}}
                        </tr>
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Project Manager</td>
                              @if($deal->pm_id != null)
                            <td class="border-left-0"><a class="text-darkest-grey" href="/account/employees/{{$deal->pm_id}}">{{ $deal->pm->name }}</a>
                            </td>
                            @else
                            <td class="border-left-0"><a class="text-darkest-grey" href="#">--</a>
                            </td>
                            @endif

                        </tr>
                    </table>

                </td>
              </div>

            </div>

          </div>


      </div>

    
           
             
      <div class="content-wrapper border-top-0 client-detail-wrapper">
        <div class="card border-0 invoice">
  
            <!-- CARD BODY START -->
            <div class="card-body">

                <div class="row">
                    <div class="col-sm-12">
                        
                         
                          
                         
                         
                          <br>
                         
 
                          @if((Auth::user()->role_id == 8 ) && Route::currentRouteName() == 'authorization_request')
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>Confirm that is price is ok?</label>
                                <textarea class="form-control" name="price_authorization" rows="10">{{$deal->price_authorization}}</textarea>
                                <script>
                                      CKEDITOR.replace('price_authorization');
                                  </script>
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>Confirm that is requirment is defined or not?</label>
                                <textarea class="form-control" name="requirment_define" rows="10">{{$deal->requirment_define}}</textarea>
                                <script>
                                      CKEDITOR.replace('requirment_define');
                                  </script>
                              </div>
                            </div>
                          </div>

                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label>Has sales team set project deadline properly?</label>
                                <textarea class="form-control" name="project_deadline_authorization" rows="10">{{$deal->project_deadline_authorization}}</textarea>
                                <script>
                                      CKEDITOR.replace('project_deadline_authorization');
                                  </script>
                              </div>
                            </div>
                          </div>
                          @endif

                          <br>
                          <div class="d-flex justify-content-center">
                              <button class="btn btn-primary" type="submit" id="createDeal" ><span class="btn-txt">Authorize Deal</span></button>
                          </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
               
              

              



          </div>
          <!-- CARD BODY END -->
          <!-- CARD FOOTER START -->

      </div>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

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
<!--ADD DEAL DETAILS START-->
<script>
    $('#createDeal').click(function(e){
        e.preventDefault();
        // alert('ok');
        $('#createDeal').attr("disabled", true);
        $('#createDeal').html("Processing...");
        var description2 = CKEDITOR.instances.description2Text.getData();
        var description3 = CKEDITOR.instances.description3Text.getData();
        var description4 = CKEDITOR.instances.description4Text.getData();
        var description5 = CKEDITOR.instances.description5Text.getData();
        var description6 = CKEDITOR.instances.description6Text.getData();
        var description7 = CKEDITOR.instances.description7Text.getData();
        var description8 = CKEDITOR.instances.description8Text.getData();
        var description9 = CKEDITOR.instances.description9Text.getData();
        var price_authorization = CKEDITOR.instances.price_authorization.getData();
        var requirment_define = CKEDITOR.instances.requirment_define.getData();
        var project_deadline_authorization = CKEDITOR.instances.project_deadline_authorization.getData();
        // console.log(name);
        var message_links = document.getElementsByName("message_link[]");
        var message_links_values = [];
        for (var i = 0; i < message_links.length; i++) {
            message_links_values.push(message_links[i].value);
        }
        var data= {
            '_token': "{{ csrf_token() }}",
            'project_name': document.getElementById("project_name").value,
            'deadline': document.getElementById("deadline").value,
            'amount': document.getElementById("amount").value,
            'original_currency_id': document.getElementById("original_currency_id").value,
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
            'price_authorization': price_authorization,
            'requirment_define': requirment_define,
            'project_deadline_authorization': project_deadline_authorization,
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
            url: "{{route('authorization_submit')}}",
            data: data,
            dataType: "json",
            success: function (response) {
                $('.error').html("");
                $(location).prop('href', '{{url('/account/contracts/')}}');
                toastr.success('Authorization Complete');
                $('#createDeal').attr("disabled", false);
                $('#createDeal').html("Complete Deal Creation");
            },
            error: function(error) {
                if (error.responseJSON.errors.milestone_value) {
                    toastr.error('Please add a milestone!');
                }
                if(error.responseJSON.errors.project_name){
                    $('#projectNameError').text(error.responseJSON.errors.project_name);
                }else{
                    $('#projectNameError').text('');
                }
                if(error.responseJSON.errors.deadline){
                    $('#deadlineError').text(error.responseJSON.errors.deadline);
                }else{
                    $('#deadlineError').text('');
                }
                if(error.responseJSON.errors.original_currency_id){
                    $('#currencyError').text(error.responseJSON.errors.original_currency_id);
                }else{
                    $('#currencyError').text('');
                }
                if(error.responseJSON.errors.amount){
                    $('#amountError').text(error.responseJSON.errors.amount);
                }else{
                    $('#amountError').text('');
                }
                if(error.responseJSON.errors.description2){
                    $('#description2Error').text(error.responseJSON.errors.description2);
                }else{
                    $('#description2Error').text('');
                }
                if(error.responseJSON.errors.description3){
                    $('#description3Error').text(error.responseJSON.errors.description3);
                }else{
                    $('#description3Error').text('');
                }
                if(error.responseJSON.errors.description4){
                    $('#description4Error').text(error.responseJSON.errors.description4);
                }else{
                    $('#description4Error').text('');
                }
                if(error.responseJSON.errors.description5){
                    $('#description5Error').text(error.responseJSON.errors.description5);
                }else{
                    $('#description5Error').text('');
                }
                if(error.responseJSON.errors.description6){
                    $('#description6Error').text(error.responseJSON.errors.description6);
                }else{
                    $('#description6Error').text('');
                }
                if(error.responseJSON.errors.description7){
                    $('#description7Error').text(error.responseJSON.errors.description7);
                }else{
                    $('#description7Error').text('');
                }
                if(error.responseJSON.errors.description8){
                    $('#description8Error').text(error.responseJSON.errors.description8);
                }else{
                    $('#description8Error').text('');
                }
                if(error.responseJSON.errors.description9){
                    $('#description9Error').text(error.responseJSON.errors.description9);
                }else{
                    $('#description9Error').text('');
                }
                $('#createDeal').attr("disabled", false);
                $('#createDeal').html("Complete Deal Creation");

            }
        });
    });

</script>
<!--ADD DEAL DETAILS END-->
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
        flatpickr("input[type=datetime-local]", {});
        $("#createDeal").on('click',function() {
            $("#createDeal").attr("disabled", true);
            // $(".btn-txt").text("Processing ...");
        })
    </script>
    @endpush

@endsection
