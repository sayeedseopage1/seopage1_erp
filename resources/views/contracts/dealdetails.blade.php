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

 ?>
    <div class="content-wrapper border-top-0 client-detail-wrapper">
      <div class="card border-0 invoice">

          <!-- CARD BODY START -->
          <div class="card-body">

                <h5>Deal Details</h5>

            <hr>
            <?php
            $url= url('/');
             ?>
              <div class="invoice-table-wrapper">


                <div class="row">
                    <div class="col-sm-12">
                        <form method="post" action="{{route('store-deal-details')}}" id="storeDeal">
                          @csrf

                          <input type="hidden" name="id" value="{{$deal->id}}">
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deal_id">Deal Id</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16 mr-1" data-toggle="popover" data-placement="top" data-content="This is system generated unique ID for every won deal." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" class="form-control height-35 f-14" value="{{$deal->deal_id}}" id="deal_id" placeholder="deal_id" readonly>
                              </div>


                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deal_date">Deal Creation Date</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="This date is picked automatically when deal was converted as won deal." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" value="{{$deal->deal_creation_date}}" class="form-control height-35 f-14" id="deal_date" placeholder="deal_date" readonly>
                              </div>


                            </div>
                            <div class="col-md-2">
                              <div class="form-group">
                              <label for="project_name">Project Name <span style="color:red;">*</span></label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project name from Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="project_name" value="{{$deal->project_name}}" class="form-control height-35 f-14" id="project_name" placeholder="Enter project name" >
                                  <label id="projectNameError" class="error text-danger" for="project_name"></label>
                              </div>
                            </div>
                              @if($deal->project_type !='hourly')
                            @if($deal->lead_id != null)
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deadline">Deadline<span style="color:red;">*</span></label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the deadline you mentioned when you submitted the bid. If you have discussed the deadline in-details with client, please based on your discussion enter the deadline here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="datetime-local" name="deadline" value="{{$deal->lead->deadline}}"  class="form-control height-35 f-14" id="deadline" placeholder="Enter deadline" style="background: #ffffff;">
                                  <label id="deadlineError" class="error text-danger" for="deadline"></label>
                              </div>
                            </div>
                            @else
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="deadline">Deadline<span style="color:red;">*</span></label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the deadline you mentioned when you submitted the bid. If you have discussed the deadline in-details with client, please based on your discussion enter the deadline here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="datetime-local" name="deadline"  class="form-control height-35 f-14" id="deadline" placeholder="Enter deadline" style="background: #ffffff;">
                                  <label id="deadlineError" class="error text-danger" for="deadline"></label>
                              </div>
                            </div>
                            @endif
                                  @else
                                      <div class="col-md-4">
                                          <div class="form-group">
                                              <label for="estimated_hour_task" >Estimated hours for the first set of tasks <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Estimated hours for the first set of tasks" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <select class="form-control height-35 f-14" name="estimated_hour_task" id="estimated_hour_task">
                                                  <option value="" selected>--</option>
                                                  <option value="1-5">1-5</option>
                                                  <option value="6-15">6-15</option>
                                                  <option value="16-25">16-25</option>
                                                  <option value="26-50">26-50</option>
                                                  <option value="51-100">51-100</option>
                                                  <option value="100+">100+</option>
                                                  <label id="estimated_hour_taskError" class="error text-danger" for="estimated_hour_task"></label>
                                              </select>
                                          </div>
                                      </div>
                                  @endif
                          </div>
                          <div id="success_message">

                          </div>
                          @if(Session::has('error'))
                          <div class="alert alert-danger" role="alert">

                              <div class="alert-body">
                                  {{Session::get('error')}}
                              </div>
                          </div>
                          @endif
                          <div class="row">
                              @if($deal->project_type !='hourly')
                              @if($deal->upsell_actual_amount == 0)

                                  <div class="col-md-3">
                                      <div class="form-group">
                                          <label for="amount" >Project Budget <span style="color:red;" class="mr-1">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="This budget is automatically taken from deal. After negotiation stage, if the price changes, please change the price in this project budget field." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                  <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                              </svg></label>
                                          <input type="text" name="amount" value="{{$deal->actual_amount}}" class="form-control height-35 f-14" id="amount" placeholder="Enter project buget">
                                          <label id="amountError" class="error text-danger" for="amount"></label>
                                      </div>
                                  </div>
                                  @else

                                        <input type="hidden" name="amount" value="{{$deal->actual_amount}}" class="form-control height-35 f-14" id="amount" placeholder="Enter project buget">

                                    </div>
                                </div>


                                  @endif

                                  @if($deal->upsell_actual_amount > 0)
                                  <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="amount" >Upsell Project Budget <span style="color:red;" class="mr-1">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="This budget is automatically taken from deal. After negotiation stage, if the price changes, please change the price in this project budget field." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                            </svg></label>
                                        <input type="text" name="" value="{{$deal->upsell_actual_amount}}" class="form-control height-35 f-14" id="amount" placeholder="Enter project buget">
                                        <label id="amountError" class="error text-danger" for="amount"></label>
                                    </div>
                                </div>


                                  @endif
                              @else
                                  <div class="col-md-3">
                                      <input type="hidden" name="amount" value="0" class="form-control height-35 f-14" id="amount" placeholder="Enter project buget">
                                      <div class="form-group">
                                          <label for="hourly_rate" >Hourly Rate <span style="color:red;" class="mr-1">*</span>
                                              <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Hourly rate" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                  <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                              </svg>
                                          </label>
                                          <input type="text" name="hourly_rate" value="" class="form-control height-35 f-14" id="hourly_rate" placeholder="Enter project hourly rate">
                                          <label id="hourly_rateError" class="error text-danger" for="hourly_rate"></label>
                                      </div>
                                  </div>
                              @endif
                            <div class="col-md-3">
                              <?php
                              $currency= App\Models\Currency::where('id',$deal->original_currency_id)->first();

                               ?>
                              <label for="original_currency_id">Currency <span style="color:red;">*</span></label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="The currency is automatically taken when the deal was won. You cannot change the currency here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                            <select class="form-control height-35 f-14" name="original_currency_id" readonly id="original_currency_id">
                              <option selected value="{{$deal->original_currency->id}}">{{$deal->original_currency->currency_code}} ({{$deal->original_currency->currency_symbol}})</option>
                            </select>
                            </div>

                                  @if($deal->project_type !='hourly')
                                      <div class="col-md-6">
                                          <?php
                                          $milestones= App\Models\ProjectMilestone::where('project_id',$project_id->id)->get();
                                          ?>
                                          <label for="exampleFormControlInput1">Milestones <span style="color:red;">*</span></label>
                                          <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Create milestones of the project. Milestone names must match the original name of the milestone on Freelancer.com. You can add as many milestone as you want but the sum of all milestone's cost must not exceed the project budget." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                              <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                          </svg>
                                          <div class="input-group mb-3 w-100">
                                              <div class="milestone-wrapper d-flex align-items-center flex-wrap form-control" id="milestone_value"></div>

                                              <div class="input-group-append">
                                                  <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#milestoneaddmodal" type="button">Add</button>
                                              </div>

                                              <input type="hidden" class="project_id" name="project_id" id="project_id" value="{{$project_id->id}}">
                                              <label id="milestoneError" class="error text-danger" for=""></label>
                                              @include('contracts.modals.milestoneviewmodal')
                                              @include('contracts.modals.milestonecreatemodal')
                                              @include('contracts.modals.milestoneeditmodal')
                                              @include('contracts.modals.milestonedeletemodal')
                                          </div>
                                      </div>
                                  @else
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="amount" >Did the confirm hubstaff tracking?<span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Did the confirm hubstaff tracking?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <div class="form-group">
                                                  <div class="row">
                                                      <div class="col-sm-12">
                                                          <div class="row">
                                                              <div class="form-check">
                                                                  <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="hubstaff_tracking" value="1" id="hubstaff_tracking">
                                                                  <label class="form-check-label" for="flexRadioDefault1">
                                                                      Yes
                                                                  </label>
                                                              </div>
                                                              <div class="form-check">
                                                                  <input class="form-control border rounded p-2 h-50 f-14 error" type="radio" name="hubstaff_tracking" value="0" id="hubstaff_tracking">
                                                                  <label class="form-check-label" for="flexRadioDefault2">
                                                                      No
                                                                  </label>
                                                              </div>
                                                          </div>
                                                          <label id="hubstaff_trackingError" class="error text-danger" for="descriptionText"></label>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="amount" >How many hours need to be tracked in the first 24 hours? <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="How many hours need to be tracked in the first 24 hours? " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <input type="text" name="tracked_hours" value="" class="form-control height-35 f-14" id="tracked_hours" placeholder="Type here">
                                              <label id="tracked_hoursError" class="error text-danger" for="amount"></label>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="second_day_tracked_hours" >How many hours need to be tracked on the 2nd day i.e. between 25th-48th hours? <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="How many hours need to be tracked in the first 24 hours? " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <input type="text" name="second_day_tracked_hours" value="" class="form-control height-35 f-14" id="second_day_tracked_hours" placeholder="Enter project hubstaff tracking">
                                              <label id="second_day_tracked_hoursError" class="error text-danger" for="second_day_tracked_hours"></label>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="expect_amount" >Is the amount of work he expects per hour realistic? <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="How many hours need to be tracked in the first 24 hours? " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <textarea class="form-control" placeholder="Leave a comment here" id="expect_amount" name="expect_amount" style="height: 100px"></textarea>
                                              <label id="expect_amountError" class="error text-danger" for="expect_amount"></label>
                                          </div>
                                      </div>
                                      <div class="col-md-6">
                                          <div class="form-group">
                                              <label for="certain_amount_hour" >Does the client have any certain amount of hours on mind for the first set of tasks? <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="How many hours need to be tracked in the first 24 hours? " data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <textarea class="form-control" placeholder="Leave a comment here" id="certain_amount_hour" name="certain_amount_hour" style="height: 100px"></textarea>
                                              <label id="certain_amount_hourError" class="error text-danger" for="certain_amount_hour"></label>
                                          </div>
                                      </div>
                                      <div class="col-md-6 mb-3">
                                          <div class="form-group">
                                              <label for="long_project" >For how long the project may continue? <span style="color:red;" class="mr-1">*</span>
                                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="For how long the project may continue?" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                                  </svg>
                                              </label>
                                              <select class="form-control height-35 f-14" name="long_project" id="long_project">
                                                  <option value="" selected>--</option>
                                                  <option value="The client has a few tasks and the project will be finished when those are done">The client has a few tasks and the project will be finished when those are done</option>
                                                  <option value="The client will keep having weekly/monthly works and the project will keep going on">The client will keep having weekly/monthly works and the project will keep going on</option>
                                                  <option value="The client said it can be a long term project but it seems he has only 1 site and it should be short term">The client said it can be a long term project but it seems he has only 1 site and it should be short term</option>
                                                  <label id="long_projectError" class="error text-danger" for="long_project"></label>
                                              </select>
                                          </div>
                                      </div>
                                  @endif



                          </div>
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="client_name">Client Name</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Go to client profile or project page to see the full name of the client. Copy the full name of the client and paste the name in this field. Be sure to check after pasting whether client name is pasted on something else is pasted mistakenly." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="client_name" value="{{$deal->client_name}}" class="form-control height-35 f-14" id="client_name" placeholder="name@example.com" >
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="client_username">Client Username</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the client's username from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="client_username" value="{{$deal->client_username}}" class="form-control height-35 f-14" id="client_username" placeholder="name@example.com" readonly>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="organization">Organization</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="This is a mandatory field. If you can manage to get the organization name of the client, please input the name in this field." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="organization" class="form-control height-35 f-14" id="organization" placeholder="Company Name" >
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="form-group">
                              <label for="client_email">Client Email</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If you get the email address from client, input it here. So, that we can contact with them when the client is not available on Freelancer.com." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="client_email" class="form-control height-35 f-14" id="client_email" placeholder="name@example.com" >
                              </div>
                            </div>
                          </div>
                          @php
                                $project_cms = App\Models\ProjectCms::all();
                          @endphp
                      <div class="row">
                        <div class="col-md-6">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="deal_category">Deal Category
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the deal category." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <div class="dropdown bootstrap-select form-control select-picker">
                                <select name="deal_category" id="deal_category" data-live-search="true" class="form-control select-picker error" data-size="8">
                                    <option value="">--</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Website Maintainance">Website Maintainance</option>
                                    <option value="Graphic Design">Graphic Design</option>
                                    <option value="Ui Design">Ui Design</option>
                                    <option value="Content">Content</option>
                                    <option value="SEO">SEO</option>
                                    <option value="Google Ads">Google Ads</option>
                                </select>
                                <span id="deal_category_error" class="text-danger"></span>
                            </div>
                        </div>
                        <div class="col-md-6" id="cmsSelect" style="display: none">
                            <label class="f-14 text-dark-grey mb-12" data-label="true" for="project_cms">Project CMS
                                <sup class="f-14 mr-1">*</sup>
                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Enter the project cms name." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                    <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                </svg>
                            </label>
                            <div class="dropdown bootstrap-select form-control select-picker">
                                <select name="cms_id" id="cms_id" data-live-search="true" class="form-control select-picker error" data-size="8">
                                    <option value="">--</option>
                                    @foreach ($project_cms as $item)
                                        <option value="{{ $item->id .'-'. $item->cms_name }}">{{ $item->cms_name }}</option>
                                    @endforeach
                                </select>
                                <span id="cms_id_error" class="text-danger"></span>
                            </div>
                        </div>
                      </div>
                          <br>
                          <div class="row">
                            @if($deal->profile_link != null)
                            <div class="col-md-12">
                              <div class="form-group">
                              <label for="profile_link">Freelancer Profile Link </label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy client's profile URL from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="profile_link" readonly value="{{$deal->profile_link}}" class="form-control height-35 f-14" id="profile_link" placeholder="Input here">
                              </div>
                            </div>
                            @else
                            <div class="col-md-12">
                              <div class="form-group">
                              <label for="profile_link">Freelancer Profile Link </label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project message thread link from Freelancer.com and paste it in this field." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="profile_link" class="form-control height-35 f-14" id="profile_link" placeholder="Input here">
                              </div>
                            </div>



                            @endif
                              @if($deal->message_link != null)
                              <?php
                              $mystring = $deal->message_link;

                                  $output = str_replace('<br>',' ', $mystring);

                                  $output_final= (trim($output));
                                  $data= explode("  ", $output_final);
                                //  dd(($data));

                               ?>
                                  @foreach($data as $message)
                            <div class="col-md-12">
                              <div class="form-group">
                              <label for="">Freelancer Message Link <span style="color:red;">*</span></label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy client's profile URL from Freelancer.com and paste it here." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                              <input type="text" name="message_link[]"  value="{{$message}}" class="form-control height-35 f-14" id="" placeholder="Input here">
                              </div>
                            </div>
                            @endforeach
                            <div class="col-md-7 dynamic-field" id="dynamic-field-1">

                                       <div class="row">
                                           <div class="col-md-9 my-2">
                                               <div class="form-group">
                                                   <input type="text" id="message_link"  class="form-control height-35 f-14 message_link" placeholder="Add Link Here" name="message_link[]"/>
                                                   <label id="messageLinkError" class="error text-danger" for="message_link"></label>
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
                            @else

                            <div class="col-md-12">
                              <div class="form-group">
                                  <label for="freelancer_message_link">Freelancer Message Thread Link</label>
                                  <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Copy the project message thread link from Freelancer.com and paste it in this field." data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                      <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                  </svg>
                                  <div class="col-md-7 dynamic-field" id="dynamic-field-1">

                                             <div class="row">
                                                 <div class="col-md-9 my-2">
                                                     <div class="form-group">
                                                         <input type="text" id="message_link"  class="form-control height-35 f-14 message_link" placeholder="Add Link Here" name="message_link[]"/>
                                                         <label id="messageLinkError" class="error text-danger" for="message_link"></label>
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


                            </div>
                            @endif

                          </div>
                          <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="text-dark-grey" data-label="true" for="description2Text">Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)
                                        <sup class="mr-1">*</sup>
                                        <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg>
                                    </label>
                                    <textarea name="description2" id="description2Text" class="form-control">{!!old('description2')!!}</textarea>
                                   <script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
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
                                <label for="description3Text">Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                                  It should include home, about, his services in one page, blog, and contact.
                                  The look and feel should be better than the references.)

                                   <span style="color:red;">*</span>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Elaborate the 'WHAT' 3-4 lines here(The client needs a 5 page static WordPress website for his new design agency. It should include home, about, his services in one page, blog,and contact. The look and feel should be better than the references.)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg></label>
                                  <textarea name="description3" id="description3Text" class="form-control">{!!old('description3')!!}</textarea>
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
                                <label for="description4Text">Reference websites and what the references are for (Ex: ABC.com is for the color scheme.
                                                XYZ.com is for section layouts
                                                DEF.com is for header & footer styling.
                                                However, none of these can be copied)

                                   <span style="color:red;">*</span>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Reference websites and what the references are for (Ex: ABC.com is for the color scheme.
                                                XYZ.com is for section layouts
                                                DEF.com is for header & footer styling.
                                                However, none of these can be copied)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <textarea name="description4" class="form-control" id="description4Text" rows="3">{!!old('description4')!!}</textarea>
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
                                <label for="description5Text">Any particular focus/concern of the client (Ex: 1. The client is very concerned about the
                                  final look & feel so needs to be careful with the design 2.
                                  The client is very concerned if the booking functionality will work the way he wants.)

                                   <span style="color:red;">*</span>
                                    <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Any particular focus/concern of the client (Ex: 1. The client is very concerned about the
                                  final look & feel so needs to be careful with the design 2.
                                  The client is very concerned if the booking functionality will work the way he wants.)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg>
                                </label>
                                <textarea name="description5" class="form-control" id="description5Text" rows="3">{!!old('description5')!!}</textarea>
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
                                <label for="description6Text">Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)

                                   <span style="color:red;">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg></label>
                                <textarea name="description6" class="form-control" id="description6Text" rows="3">{!!old('description6')!!}</textarea>
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
                                <label for="description7Text">Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)


                                   <span style="color:red;">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg></label>
                                <textarea name="description7" class="form-control " id="description7Text" rows="3">{!!old('description7')!!}</textarea>
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
                                <label for="description8Text">If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)


                                   <span style="color:red;">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="If there is any cross-departmental work involved in this project (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web development)" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg></label>
                                <textarea name="description8" class="form-control " id="description8Text" rows="3">{!!old('description8')!!}</textarea>
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
                                <label for="description9Text">Any other notes for the project manager/technical team
                                   <span style="color:red;">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Any other notes for the project manager/technical team" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                        <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                    </svg></label>
                                <textarea name="description9" class="form-control" id="description9Text" rows="3">{!!old('description9')!!}</textarea>
                                  <script>
                                      CKEDITOR.replace('description9');
                                  </script>
                                  <label id="description9Error" class="error text-danger" for="description9Text"></label>
                              </div>
                            </div>
                          </div>

                          @php
                              $user = \App\Models\User::where('id',$deal->added_by)->first();
                          @endphp
                          @if ($user->role_id==4)
                            <div class="row">
                                <div class="col-md-12">
                                <div class="form-group">
                                    <label for="project_summary">Project General Guidelines
                                    <span style="color:red;">*</span><svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="Project General Guidelines" data-html="true" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title="">
                                            <path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path>
                                        </svg></label>
                                    <textarea name="project_summary" class="form-control" id="project_summary" rows="3">{!!old('project_summary')!!}</textarea>
                                    <script>
                                        CKEDITOR.replace('project_summary');
                                    </script>
                                    <label id="projectSummaryError" class="error text-danger" for="project_summary"></label>
                                </div>
                                </div>
                            </div>
                          @endif
                          <div class="row">
                            <div class="col-md-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="1" name="is_drafted" id="is_drafted">
                                    <label class="form-check-label m-1" for="flexCheckDefault">
                                        Keep it as draft
                                    </label>
                                </div>
                              </div>
                          </div>

                          <br>
                          <div class="d-flex justify-content-center">
                              <button class="btn btn-primary" type="submit" id="createDeal"><span class="btn-txt">Complete Deal Creation</span></button>
                          </div>
                        </form>

                    </div>
                </div>

              </div>

              <div class="d-flex flex-column">

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

    $(document).ready(function() {
        fetchmilestone();
        function fetchmilestone()
        {
            $.ajax({
                type: "GET",
                url: "/deals/milestone-get/{{$project_id->id}}",

                dataType: "json",
                success: function (response){
                     // console.log(response.milestones);
                    let spans= '';
                    response.milestones.forEach((item)=> {
                        spans += `<span class="badge badge-light mr-2">
                            <a href="javascript:;" data-milestone-id="${item.id}" class="taskView milestone-detail text-darkest-grey f-w-500" title="${item.milestone_title}">${item.milestone_title.substr(0, 20)} (${item.actual_cost}) </a>
                            <button type="button" value="${item.id}" style="color:blue;" class="fa-solid fa-pen-to-square edit_milestone"></button>
                             <button value="${item.id}" type="button" style="color:red;" class="fa-solid fa-trash delete_milestone"></button></span>`
                    });

                    document.querySelector('#milestone_value').innerHTML= spans;

                }
            });
        }
        $(document).on('click', '.edit_milestone', function(e) {
            e.preventDefault();
            var milestone_id = $(this).val();

            $('#editmilestone').modal('show');

            $.ajax({
                type: "GET",
                url: "/deals/edit-milestone/" + milestone_id,
                success: function(response) {
                    if (response.status == 404) {
                        $('#success_message').html("");
                        $('#success_message').addClass('alert alert-danger');
                        $('#success_message').text(response.message);
                    } else {
                        $('#title').val(response.milestone.milestone_title);
                        $('#cost').val(response.milestone.actual_cost);
                        CKEDITOR.instances['summary2'].setData(response.milestone.summary);
                        $('#milestone_type').val(response.milestone.milestone_type);
                        $('#service_type2').val(response.milestone.service_type);
                        $('#milestone_id').val(milestone_id);
                    }
                }
            });
        });
        $(document).on('click',' .update_milestone',function(e){
            e.preventDefault();
            var summary = CKEDITOR.instances.summary1.getData();
            var milestone_id = $('#milestone_id').val();
            var data= {
                'title' : $('#title').val(),
                'cost' : $('#cost').val(),
                'milestone_type': $('#milestone_type').val(),
                'original_currency_id': $('#original_currency_id').val(),
                'service_type': $('#service_type2').val(),
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
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be delete this item!",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: "/deals/delete-milestone/"+milestone_id,
                        type: "DELETE",
                        data: {
                            '_token': '{{ csrf_token() }}',
                            'id':milestone_id,
                        },
                        success: function (response){
                            //console.log(response);
                            swal.fire({
                                title: 'Deleted!',
                                text: 'The item has been deleted successfully.',
                                icon: 'success',
                            })
                            fetchmilestone();
                        }
                    });
                }
            });
        });

        $(document).on('click','.add_milestone',function(e){

            e.preventDefault();
            var summary = CKEDITOR.instances.summary1.getData();
            var unique_id = $('#generatedLinkContainer').data('linkId');
            var data= {
                'title': $('.title').val(),
                'cost': $('.cost').val(),
                'milestone_type': $('.milestone_type').val(),
                'summary': summary,
                'random_id': unique_id,
                'project_id': document.getElementById("project_id").value,
                'original_currency_id': document.getElementById("original_currency_id").value,
                'service_type': document.getElementById("service_type").value,
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
                        $('.milestone_type').val('');
                        CKEDITOR.instances.summary1.setData('');
                        $('#service_type').val('');
                        $('#inputUrl').hide();
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
<!--ADD DEAL DETAILS START-->
@if($deal->project_type !='hourly')
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
            @if ($user->role_id==4)
                var project_summary = CKEDITOR.instances.project_summary.getData();
            @endif
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var deal_category = document.getElementById("deal_category").value;
            var cms_id = deal_category=="Web Development" ? document.getElementById("cms_id").value : null;
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
                'is_drafted': $('#is_drafted').is(":checked") ? 1 : 0,
                'deal_category': deal_category,
                'cms_id': cms_id,
                'message_link': message_links_values,
                'description2': description2,
                'description3': description3,
                'description4': description4,
                'description5': description5,
                'description6': description6,
                'description7': description7,
                'description8': description8,
                'description9': description9,
                @if ($user->role_id==4)
                'project_summary': project_summary,
                @endif
                'id': '{{$deal->id}}',
                'pm_id': '{{Auth::user()->role_id}}',
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{route('store-deal-details')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('.error').html("");
                    $(location).prop('href', '{{url('/account/contracts/')}}');
                    toastr.success('Deal Create Successfully');
                    $('#createDeal').attr("disabled", false);
                    $('#createDeal').html("Complete Deal Creation");
                },
                error: function(error) {
                    const errorKeys = Object.keys(error.responseJSON.errors);
                    const numErrors = errorKeys.length;
                    // console.log(numErrors);
                    if(numErrors > 0)
                    {
                        $('#commonError').show();
                        $('#createDeal').attr("disabled", false);
                        $('#createDeal').html("Complete Deal Creation");
                        toastr.error('Some fields are missing, please check again and input all required data properly!');
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
                    if(error.responseJSON.errors.message_link){
                        $('#messageLinkError').text(error.responseJSON.errors.message_link);
                    }else{
                        $('#messageLinkError').text('');
                    }
                    if(error.responseJSON.errors.message_link){
                        $('#messageLinkError').text(error.responseJSON.errors.message_link);
                    }else{
                        $('#messageLinkError').text('');
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
                    if(error.responseJSON.errors.project_summary){
                        $('#projectSummaryError').text(error.responseJSON.errors.project_summary);
                    }else{
                        $('#projectSummaryError').text('');
                    }
                    if (error.responseJSON.errors && error.responseJSON.errors.deal_category) {
                        $('#deal_category_error').text(error.responseJSON.errors.deal_category);
                    } else {
                        $('#deal_category_error').text('');
                    }
                    if (error.responseJSON.errors && error.responseJSON.errors.cms_id) {
                        $('#cms_id_error').text(error.responseJSON.errors.cms_id);
                    } else {
                        $('#cms_id_error').text('');
                    }
                    if (error.responseJSON.errors.milestone_value) {
                        toastr.error('Please add a milestone!');
                        $('#createDeal').attr("disabled", false);
                        $('#createDeal').html("Complete Deal Creation");
                    }
                    $('#createDeal').attr("disabled", false);
                    $('#createDeal').html("Complete Deal Creation");

                }
            });
        });

    </script>
@else
    <script>
        $('#createDeal').click(function(e){
            e.preventDefault();
            // alert($('#is_drafted').val());
            $('#createDeal').attr("disabled", true);
            $('#createDeal').html("Processing...");
            var hubstaff_tracking = $('input[name="hubstaff_tracking"]:checked').val();
            var description2 = CKEDITOR.instances.description2Text.getData();
            var description3 = CKEDITOR.instances.description3Text.getData();
            var description4 = CKEDITOR.instances.description4Text.getData();
            var description5 = CKEDITOR.instances.description5Text.getData();
            var description6 = CKEDITOR.instances.description6Text.getData();
            var description7 = CKEDITOR.instances.description7Text.getData();
            var description8 = CKEDITOR.instances.description8Text.getData();
            var description9 = CKEDITOR.instances.description9Text.getData();
            @if ($user->role_id==4)
                var project_summary = CKEDITOR.instances.project_summary.getData();
            @endif
            var message_links = document.getElementsByName("message_link[]");
            var message_links_values = [];
            for (var i = 0; i < message_links.length; i++) {
                message_links_values.push(message_links[i].value);
            }
            var deal_category = document.getElementById("deal_category").value;
            var cms_id = deal_category=="Web Development" ? document.getElementById("cms_id").value : null;
            var data= {
                '_token': "{{ csrf_token() }}",
                'project_name': document.getElementById("project_name").value,
                'original_currency_id': document.getElementById("original_currency_id").value,
                'estimated_hour_task': document.getElementById("estimated_hour_task").value,
                'hourly_rate': document.getElementById("hourly_rate").value,
                'tracked_hours': document.getElementById("tracked_hours").value,
                'second_day_tracked_hours': document.getElementById("second_day_tracked_hours").value,
                'expect_amount': document.getElementById("expect_amount").value,
                'certain_amount_hour': document.getElementById("certain_amount_hour").value,
                'amount': document.getElementById("amount").value,
                'client_name': document.getElementById("client_name").value,
                'organization': document.getElementById("organization").value,
                'client_email': document.getElementById("client_email").value,
                'profile_link': document.getElementById("profile_link").value,
                'long_project': document.getElementById("long_project").value,
                'is_drafted': $('#is_drafted').is(":checked") ? 1 : 0,
                'deal_category': deal_category,
                'cms_id': cms_id,
                'hubstaff_tracking': hubstaff_tracking,
                'message_link': message_links_values,
                'description2': description2,
                'description3': description3,
                'description4': description4,
                'description5': description5,
                'description6': description6,
                'description7': description7,
                'description8': description8,
                'description9': description9,
                @if ($user->role_id==4)
                'project_summary': project_summary,
                @endif
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
                url: "{{route('store-deal-details')}}",
                data: data,
                dataType: "json",
                success: function (response) {
                    $('.error').html("");
                    $(location).prop('href', '{{url('/account/contracts/')}}');
                    toastr.success('Deal Create Successfully');
                    $('#createDeal').attr("disabled", false);
                    $('#createDeal').html("Complete Deal Creation");
                },
                error: function(error) {
                    const errorKeys = Object.keys(error.responseJSON.errors);
                    const numErrors = errorKeys.length;
                    // console.log(numErrors);
                    if(numErrors > 0)
                    {
                        $('#commonError').show();
                        $('#createDeal').attr("disabled", false);
                        $('#createDeal').html("Complete Deal Creation");
                        toastr.error('Some fields are missing, please check again and input all required data properly!');
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
                    if(error.responseJSON.errors.estimated_hour_task){
                        $('#estimated_hour_taskError').text(error.responseJSON.errors.estimated_hour_task);
                    }else{
                        $('#estimated_hour_taskError').text('');
                    }
                    if(error.responseJSON.errors.hourly_rate){
                        $('#hourly_rateError').text(error.responseJSON.errors.hourly_rate);
                    }else{
                        $('#hourly_rateError').text('');
                    }
                    if(error.responseJSON.errors.hubstaff_tracking){
                        $('#hubstaff_trackingError').text(error.responseJSON.errors.hubstaff_tracking);
                    }else{
                        $('#hubstaff_trackingError').text('');
                    }
                    if(error.responseJSON.errors.tracked_hours){
                        $('#tracked_hoursError').text(error.responseJSON.errors.tracked_hours);
                    }else{
                        $('#tracked_hoursError').text('');
                    }
                    if(error.responseJSON.errors.second_day_tracked_hours){
                        $('#second_day_tracked_hoursError').text(error.responseJSON.errors.second_day_tracked_hours);
                    }else{
                        $('#second_day_tracked_hoursError').text('');
                    }
                    if(error.responseJSON.errors.expect_amount){
                        $('#expect_amountError').text(error.responseJSON.errors.expect_amount);
                    }else{
                        $('#expect_amountError').text('');
                    }
                    if(error.responseJSON.errors.certain_amount_hour){
                        $('#certain_amount_hourError').text(error.responseJSON.errors.certain_amount_hour);
                    }else{
                        $('#certain_amount_hourError').text('');
                    }
                    if(error.responseJSON.errors.long_project){
                        $('#long_projectError').text(error.responseJSON.errors.long_project);
                    }else{
                        $('#long_projectError').text('');
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
                    if(error.responseJSON.errors.message_link){
                        $('#messageLinkError').text(error.responseJSON.errors.message_link);
                    }else{
                        $('#messageLinkError').text('');
                    }
                    if(error.responseJSON.errors.message_link){
                        $('#messageLinkError').text(error.responseJSON.errors.message_link);
                    }else{
                        $('#messageLinkError').text('');
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
                    if(error.responseJSON.errors.project_summary){
                        $('#projectSummaryError').text(error.responseJSON.errors.project_summary);
                    }else{
                        $('#projectSummaryError').text('');
                    }
                    if (error.responseJSON.errors && error.responseJSON.errors.deal_category) {
                        $('#deal_category_error').text(error.responseJSON.errors.deal_category);
                    } else {
                        $('#deal_category_error').text('');
                    }
                    if (error.responseJSON.errors && error.responseJSON.errors.cms_id) {
                        $('#cms_id_error').text(error.responseJSON.errors.cms_id);
                    } else {
                        $('#cms_id_error').text('');
                    }
                    if (error.responseJSON.errors.milestone_value) {
                        toastr.error('Please add a milestone!');
                        $('#createDeal').attr("disabled", false);
                        $('#createDeal').html("Complete Deal Creation");
                    }
                    $('#createDeal').attr("disabled", false);
                    $('#createDeal').html("Complete Deal Creation");

                }
            });
        });

    </script>
@endif
<!--ADD DEAL DETAILS END-->
    @push('scripts')

    <script>
        var dealCategorySelect = document.getElementById("deal_category");
        var cmsSection = document.querySelector("#cmsSelect");
        dealCategorySelect.addEventListener("change", function() {
            if (dealCategorySelect.value === "Web Development") {
                cmsSection.style.display = "block";
            } else {
                cmsSection.style.display = "none";
            }
        });
    </script>

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
