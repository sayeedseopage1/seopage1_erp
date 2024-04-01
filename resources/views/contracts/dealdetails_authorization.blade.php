@extends('layouts.app')

@section('filter-section')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
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

    ?>

    <div class="content-wrapper border-top-0 client-detail-wrapper">
        <div class="card border-0 invoice">

            <!-- CARD BODY START -->
            <div class="card-body">
                @if($deal->submission_status == 'pending')
                    <h5 class="d-flex justify-content-center">Sales Lead Authorization Form for {{$deal->project_name??''}}</h5>
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

    <h4 class="text-center">Deal Details From Sales Team</h4>
    <hr>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Project Milestones</h4>
                        <br>
                        <?php
                        //dd($deal);
                        //$project= App\Models\Project::where('deal_id',$deal->id)->first();
                        $milestones= App\Models\ProjectMilestone::where('project_id',$project_id->id)->get();
                        ?>
                        <table class="table table-responsive table-bordered table-striped">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="col-3 col-sm-2">Milestone Name</th>
                                <th scope="col" class="col-3 col-sm-2">Milestone Type</th>
                                <th scope="col" class="col-3 col-sm-2">Milestone Cost</th>
                                <th scope="col" class="col-6 col-md-8">Milestone Summary</th>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach($milestones as $milestone)
                                <tr>
                                    <th>{{$loop->index+1}}</th>
                                    <td>{{$milestone->milestone_title}}</td>
                                    <td>{{$milestone->milestone_type}}</td>
                                    <td>{{$milestone->actual_cost}}{{$milestone->original_currency->currency_symbol}}</td>
                                    <td>@if($milestone->summary != null)
                                            {!!$milestone->summary!!}
                                        @else
                                            --
                                        @endif
                                    </td>
                                </tr>
                            @endforeach

                            </tbody>
                        </table>



                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    @php
        $contract = App\Models\Contract::with([

              'client',
              'client.clientDetails',

              'renewHistory',
              'renewHistory.renewedBy',

              'discussion.user',
          ])->findOrFail($project_id->deal_id);
    @endphp
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Freelancer Profile Link</h4>
                        <br>
                        <p><a target="_blank" href="{{ $contract->deal->profile_link}}">{{ $contract->deal->profile_link}}</a></p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Freelancer Message Link</h4>
                        <br>
                        <?php
                        $mystring = $contract->deal->message_link;

                        $output = str_replace('<br>',' ', $mystring);

                        $output_final= (trim($output));
                        $data= explode("  ", $output_final);
                        //  dd(($data));

                        ?>
                        @foreach($data as $message)
                            <p><a target="_blank" href="{{ $message}}">{{ $message}}</a></p>
                        @endforeach

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    @if($contract->deal->project_type=="hourly")
        <div class="row mb-4 mx-3" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-4">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Estimated Hours</h4>
                            <br>
                            @if($contract->deal->estimated_hour_task)
                                <p>{{$contract->deal->estimated_hour_task}}</p>
                            @else
                                <p>--</p>
                            @endif

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <div class="col-4">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Hourly Rate</h4>
                            <br>
                            @if($contract->deal->hourly_rate)
                                <p>{{$contract->deal->hourly_rate}}</p>
                            @else
                                <p>--</p>
                            @endif

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <div class="col-4">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Hub Staff Tracking </h4>
                            <br>
                            <p>{{$contract->deal->hubstaff_tracking ==1 ? 'Yes' : 'No'}}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>

        <div class="row mb-4 mx-3" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-6">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Expected Tracked Hours on Day 2</h4>
                            <br>
                            @if($contract->deal->second_day_tracked_hours)
                                <p>{{$contract->deal->second_day_tracked_hours}}</p>
                            @else
                                <p>--</p>
                            @endif

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <div class="col-6">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Clients Expected Amount of Work Per Hour </h4>
                            <br>
                            @if($contract->deal->expect_amount)
                                <p>{{$contract->deal->expect_amount}}</p>
                            @else
                                <p>--</p>
                            @endif

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>

        <div class="row mb-4 mx-3" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-6">
                <x-cards.data class="h-100">
                    <div class="col">
                        <h4>Expected Tracked Hours on Day 1 </h4>
                        <br>
                        @if($contract->deal->tracked_hours)
                            <p>{{$contract->deal->tracked_hours}}</p>
                        @else
                            <p>--</p>
                        @endif

                    </div>
                </x-cards.data>
            </div>
            <div class="col-6">
                <x-cards.data class="h-100">
                    <div class="row">
                        <div class="col">
                            <h4>Clients Expectation About Approx. Hours Needed for the Initial Tasks</h4>
                            <br>
                            @if($contract->deal->certain_amount_hour)
                                <p>{{$contract->deal->certain_amount_hour}}</p>
                            @else
                                <p>--</p>
                            @endif

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
    @endif
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h4>
                        <br>
                        <p>{!! $contract->deal->description2 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>
                            Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                            It should include home, about, his services in one page, blog, and contact. The look and feel should be
                            better than the references.)</h4>
                        <br>
                        <p>{!! $contract->deal->description3 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>
                            Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for
                            section layouts DEF.com is for header & footer styling. However, none of these can be copied)</h4>
                        <br>
                        <p>{!! $contract->deal->description4 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>
                            Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                            the way he wants.)</h4>
                        <br>
                        <p>{!! $contract->deal->description5 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>
                            Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h4>
                        <br>
                        <p>{!! $contract->deal->description6 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h4>
                        <br>
                        <p>{!! $contract->deal->description7 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>  If there is any cross-departmental work involved in this project
                            (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web
                            development)</h4>
                        <br>
                        <p>{!! $contract->deal->description8 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
    </div>
    <div class="row mb-4 mx-3" >
        <!-- BUDGET VS SPENT START -->
        <div class="col-md-12">
            <x-cards.data>
                <div class="row-cols-lg-1">
                    <div class="col">
                        <h4>Any other notes for the project manager/technical team</h4>
                        <br>
                        <p>{!! $contract->deal->description9 !!}</p>

                    </div>

                </div>
            </x-cards.data>
        </div>
        <!-- BUDGET VS SPENT END -->
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
                                        <label>Confirm that price is ok?</label>
                                        <textarea class="form-control" name="price_authorization" rows="10">{{$deal->price_authorization}}</textarea>
                                        <script>
                                            CKEDITOR.replace('price_authorization');
                                        </script>
                                        @error('price_authorization')
                                        <div class="d-block invalid-feedback">
                                            {{ $message }}
                                        </div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label>Confirm that requirment is defined or not?</label>
                                        <textarea class="form-control" name="requirment_define" rows="10">{{$deal->requirment_define}}</textarea>
                                        <script>
                                            CKEDITOR.replace('requirment_define');
                                        </script>
                                        @error('price_authorization')
                                        <div class="d-block invalid-feedback">
                                            {{ $message }}
                                        </div>
                                        @enderror
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
                                        @error('project_deadline_authorization')
                                        <div class="d-block invalid-feedback">
                                            {{ $message }}
                                        </div>
                                        @enderror
                                    </div>
                                </div>
                            </div>
                        @endif

                        <br>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-primary" type="submit" id="createDeal" value="createDeal"><span class="btn-txt">Authorize Deal</span></button>
                            <button class="btn btn-secondary ml-4" type="submit" id="denyDeal" value="denyDeal"><span class="btn-txt">Deny</span></button>
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
    <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
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
            $('#createDeal').attr("disabled", true);
            $('#createDeal').html("Processing...");
            /*var description2 = CKEDITOR.instances.description2Text.getData();
            var description3 = CKEDITOR.instances.description3Text.getData();
            var description4 = CKEDITOR.instances.description4Text.getData();
            var description5 = CKEDITOR.instances.description5Text.getData();
            var description6 = CKEDITOR.instances.description6Text.getData();
            var description7 = CKEDITOR.instances.description7Text.getData();
            var description8 = CKEDITOR.instances.description8Text.getData();
            var description9 = CKEDITOR.instances.description9Text.getData();*/
            var price_authorization = CKEDITOR.instances.price_authorization.getData();
            var requirment_define = CKEDITOR.instances.requirment_define.getData();
            var project_deadline_authorization = CKEDITOR.instances.project_deadline_authorization.getData();
            // console.log(name);
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var createDealValue = $('#createDeal').val();
            var data= {
                '_token': "{{ csrf_token() }}",
                /*'project_name': document.getElementById("project_name").value,
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
                'description7': description7,*/
                'createDeal': createDealValue,
                'price_authorization': price_authorization,
                'requirment_define': requirment_define,
                'project_deadline_authorization': project_deadline_authorization,
                'id': '{{$project_id->deal_id}}',
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

        $('#denyDeal').click(function(e){
            e.preventDefault();
            $('#denyDeal').attr("disabled", true);
            $('#denyDeal').html("Processing...");
            /*var description2 = CKEDITOR.instances.description2Text.getData();
            var description3 = CKEDITOR.instances.description3Text.getData();
            var description4 = CKEDITOR.instances.description4Text.getData();
            var description5 = CKEDITOR.instances.description5Text.getData();
            var description6 = CKEDITOR.instances.description6Text.getData();
            var description7 = CKEDITOR.instances.description7Text.getData();
            var description8 = CKEDITOR.instances.description8Text.getData();
            var description9 = CKEDITOR.instances.description9Text.getData();*/
            var price_authorization = CKEDITOR.instances.price_authorization.getData();
            var requirment_define = CKEDITOR.instances.requirment_define.getData();
            var project_deadline_authorization = CKEDITOR.instances.project_deadline_authorization.getData();
            // console.log(name);
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var denyDealValue = $('#denyDeal').val();
            var data= {
                '_token': "{{ csrf_token() }}",
                /*'project_name': document.getElementById("project_name").value,
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
                'description7': description7,*/
                'denyDeal': denyDealValue,
                'price_authorization': price_authorization,
                'requirment_define': requirment_define,
                'project_deadline_authorization': project_deadline_authorization,
                'id': '{{$project_id->deal_id}}',
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
                    $('#denyDeal').attr("disabled", false);
                    $('#denyDeal').html("Deny");
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
                    $('#denyDeal').attr("disabled", false);
                    $('#denyDeal').html("Deny");

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
