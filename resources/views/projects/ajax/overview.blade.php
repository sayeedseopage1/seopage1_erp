<script src="{{ asset('vendor/jquery/frappe-charts.min.iife.js') }}"></script>
<script src="{{ asset('vendor/jquery/Chart.min.js') }}"></script>
<script src="{{ asset('vendor/jquery/gauge.js') }}"></script>
<link rel="stylesheet" href="{{asset('toastr/toastr.min.css')}}">

@php $editProjectPermission = user()->permission('edit_projects'); $addPaymentPermission = user()->permission('add_payments'); $projectBudgetPermission = user()->permission('view_project_budget'); $memberIds =
$project->members->pluck('user_id')->toArray(); @endphp
<style media="screen">
  .custom-css{
    	margin-right: auto;
      padding-top: 0 !important;
  }
  .table th, .table td {
    padding: 0.75rem;
    vertical-align: middle;
    border-top: 1px solid #dee2e6;
}

</style>
@php
    $pdExtension = App\Models\ProjectDeadlineExtension::where('project_id',$project->id)->first();
@endphp
<div class="d-lg-flex">
    <div class="project-leftxx w-100 py-0 py-lg-5 py-md-0" id="project-left">
        @if(Auth::user()->role_id == 4)
            <div style="margin-bottom: -40px;">
                @if ($pdExtension !=null && $pdExtension->status ==1)
                <button type="button" class="btn btn-warning"> 
                    Pending
                </button>
                @else
                <button type="button" class="btn btn-success project-deadline-extension" data-project-id="{{$project->id}}"> 
                    Extend Deadline
                </button>
                @endif
            </div>
        @endif
        @if(Auth::user()->role_id == 1)
            <div style="margin-bottom: -40px;">
                <a target="_blank" href="{{route('pde-request')}}" class="btn btn-success">Project Deadline Extension Requests</a>
            </div>
        @endif
        @php
            $q_c = \App\Models\QCSubmission::where('project_id',$project->id)->first();
        @endphp
        {{-- @if($q_c)
            <div style="margin-bottom: -40px;">
                <button type="button" class="btn btn-success" data-id="{{$project->id}}" data-toggle="modal" data-target="#client_review">
                    Client Review
                </button>
                @include('projects.modals.client_review')
            </div>
        @endif --}}
        <div class="d-flex align-content-center flex-lg-row-reverse mb-4">
            @if (!$project->trashed())
            @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
          {{-- <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                @if ($editProjectPermission == 'all' || ($editProjectPermission == 'added' && $project->added_by == user()->id) || ($project->project_admin == user()->id))
                <select class="form-control select-picker change-status height-35">
                    @foreach ($projectStatus as $status)
                    <option data-content="<i class='fa fa-circle mr-1 f-15' style='color:{{$status->color}}'></i>{{ ucfirst($status->status_name) }}" @if ($project->
                        status == $status->status_name) selected @endif value="{{$status->status_name}}">$status->status_name
                    </option>
                    @endforeach
                </select>
                @else
                <div class="bg-white p-2 border rounded">
                    @if ($project->status == 'in progress') <i class="fa fa-circle mr-2 text-blue"></i> {{ __('app.inProgress') }} @elseif ($project->status == 'on hold') <i class="fa fa-circle mr-2 text-warning"></i> {{ __('app.onHold') }}
                    @elseif ($project->status == 'not started') <i class="fa fa-circle mr-2 text-warning"></i> {{ __('app.notStarted') }} @elseif ($project->status == 'canceled') <i class="fa fa-circle mr-2 text-red"></i> {{
                    __('app.canceled') }} @elseif ($project->status == 'finished') <i class="fa fa-circle mr-2 text-dark-green"></i>
                    {{ __('app.finished') }} @endif
                </div>
                @endif
            </div> --}}
            @endif

            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">

                <div class="dropdown">
                    <button class="btn btn-lg bg-white border height-35 f-15 px-2 py-1 text-dark-grey text-capitalize rounded dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        @lang('app.action') <i class="icon-options-vertical icons"></i>
                    </button>

                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">
                        @if ($editProjectPermission == 'all' || ($project->project_admin == user()->id) || ($editProjectPermission == 'added' && user()->id == $project->added_by) || ($editProjectPermission == 'owned' && user()->id ==
                        $project->client_id && in_array('client', user_roles())) || ($editProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())) || ($editProjectPermission == 'both' &&
                        (user()->id == $project->client_id || user()->id == $project->added_by)) || ($editProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())))

                        <a class="dropdown-item openRightModal" href="{{ route('projects.edit', $project->id) }}">@lang('app.edit') @lang('app.project')</a>
                        <hr class="my-1" />
                        @endif @php $projectPin = $project->pinned() @endphp @if ($projectPin)
                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="pinned">@lang('app.unpin') @lang('app.project')</a>
                        @else
                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="unpinned">@lang('app.pin') @lang('app.project')</a>
                        @endif
                    </div>
                </div>
            </div>
              @if(Auth::user()->role_id == 1 && $project->status == 'under review')
            <a id="project-deny" class="btn btn-danger border height-35 f-15 px-3 py-2 text-white text-capitalize rounded" >
                @lang('Project Challenge Deny')
            </a>


            <a id="project-accept" class="btn btn-primary bg-white border height-35 f-15 px-3 py-2 text-dark-grey text-capitalize rounded mr-3">
                @lang('Project Challenge Accept')
            </a>

            @endif

            @if ($projectPin)
            <div class="align-self-center">
                <span class="badge badge-success"><i class="fa fa-thumbtack"></i> @lang('app.pinned')</span>
            </div>
            @endif @elseif($editProjectPermission == 'all' || ($project->project_admin == user()->id) || ($editProjectPermission == 'added' && user()->id == $project->added_by) || ($editProjectPermission == 'owned' && user()->id ==
            $project->client_id && in_array('client', user_roles())) || ($editProjectPermission == 'owned' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())) || ($editProjectPermission == 'both' && (user()->id ==
            $project->client_id || user()->id == $project->added_by)) || ($editProjectPermission == 'both' && in_array(user()->id, $memberIds) && in_array('employee', user_roles())))
            <div class="ml-3">
                <x-forms.button-primary class="restore-project" icon="undo">@lang('app.unarchive') </x-forms.button-primary>
            </div>
            @endif
            @if($project->project_status == 'Accepted')
            @if(Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
            @php
              $dispute= App\Models\ProjectDispute::where('project_id',$project->id)->first();

            @endphp

                @if($project->status == 'canceled' && $project->dispute_status == 1)

{{--                <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">--}}
{{--                    <div class="">--}}
{{--                        <a class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded openRightModal" href="{{ route('projects.dispute.form', $project->id) }}"  aria-haspopup="true" aria-expanded="false">--}}
{{--                        @lang('See Dispute')--}}
{{--                        </a>--}}


{{--                    </div>--}}
{{--                </div>--}}
                @endif
        @if($project->status == 'in progress' || $project->status == 'not started' || $project->status == 'on hold')

              @if($project->dispute_status == 1)
                      @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8 || Auth::user()->role_id == 4)
                             @if($dispute == null)

                                        <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                                            <div class="">
                                                <a class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded openRightModal" href="{{ route('projects.dispute', $project->id) }}"  aria-haspopup="true" aria-expanded="false">
                                                @lang('Expain Dispute')
                                                </a>


                                            </div>
                                        </div>



                             @endif
                     @endif
            @else


            @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)

            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                <div class="">
                  <form class="" action="{{route('project-incomplete')}}" method="post">
                    @csrf
                    <input type="hidden" name="id" value="{{$project->id}}">

                    <button class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded" type="submit"  aria-haspopup="true" aria-expanded="false" id="markAsIncompleteBtn">
                    @lang('Mark As Incomplete')
                  </button>
                    </form>

                </div>
            </div>

            @endif


            @endif



            @endif
            @endif
            @endif

            @php

            $project_submission= App\Models\ProjectSubmission::where('project_id',$project->id)->orderBy('id','desc')->first();
            //dd($project_submission);
            @endphp
             @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
            @if($project_submission != null && $project_submission->status == 'pending')
            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                <div class="">


                    <button class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded" id="project-submission-form"  aria-haspopup="true" aria-expanded="false">
                    @lang('Project Submission Form')
                  </button>


                </div>
            </div>
              @include('projects.modals.projectsubmissionmodal')
            @endif
            @endif
            @php

            $project_qc= App\Models\QCSubmission::where('project_id',$project->id)->orderBy('id','desc')->first();
            //dd($project_submission);
            @endphp
            @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 8)
            @if($project_qc != null && $project_qc->status == 'pending')
            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                <div class="">


                    <button class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded" id="project-qc-form"  aria-haspopup="true" aria-expanded="false">
                    @lang('Project QC Form')
                  </button>


                </div>
            </div>
              @include('projects.modals.projectqcsubmissionmodal')
            @endif
            @endif

        </div>

        <!-- PROJECT PROGRESS AND CLIENT START -->
        <div class="row">
            <!-- PROJECT PROGRESS START -->
            <div class="col-md-4 mb-4">
                @php
                       $tasks= App\Models\Task::where('project_id',$project->id)->count();
                $completed_tasks= App\Models\Task::where('project_id',$project->id)->where('status','completed')->count();
                if($tasks >= 1){
                    $percentage= round(($completed_tasks/$tasks)*100);
                    //dd($percentage);
                }else
                {
                    $percentage= 0;
                }
                @endphp
                <x-cards.data :title="__('modules.projects.projectProgress')" otherClasses="d-flex flex-wrap d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <div class="text-lightest">{{$percentage}}% Progress</div>

                    <!-- PROGRESS START DATE START -->
                    <div class="p-start-date mb-xl-0 mb-lg-3">
                        <h5 class="text-lightest f-14 font-weight-normal">@lang('app.startDate')</h5>
                        <p class="f-15 mb-0">{{ $project->start_date->format(global_setting()->date_format) }}</p>
                    </div>
                    <!-- PROGRESS START DATE END -->
                    <!-- PROGRESS END DATE START -->
                    <div class="p-end-date">
                        <h5 class="text-lightest f-14 font-weight-normal">@lang('modules.projects.deadline')</h5>
                        <p class="f-15 mb-0">
                            <a href="#" data-toggle="modal" data-target="#d_History{{$project->id}}">
                                {{ !is_null($project->deadline) ? $project->deadline->format(global_setting()->date_format) : '--' }}
                            </a>
                        </p>
                    </div>
                    @include('projects.modals.deadline_history')
                    <!-- PROGRESS END DATE END -->
                </x-cards.data>
            </div>
            <!-- PROJECT PROGRESS END -->
            <!-- CLIENT START -->
            <div class="col-md-4 mb-4">
                @if (!is_null($project->client))
                <x-cards.data :title="__('app.client')" otherClasses="d-block d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <div class="p-client-detail">
                        <div class="card border-0">
                            <div class="card-horizontal">
                                <div class="card-img m-0">
                                    <img class="" src=" {{ $project->client->image_url }}" alt="{{ $project->client->name }}" />
                                </div>
                                <div class="card-body border-0 p-0 ml-4 ml-xl-4 ml-lg-3 ml-md-3">
                                    <h4 class="card-title f-15 font-weight-normal mb-0 text-capitalize">
                                        <a href="{{ route('clients.show', $project->client_id) }}" class="text-dark">{{ $project->client->name }}</a>
                                    </h4>

                                    @if ($project->client->country_id)
                                    <span class="card-text f-12 text-lightest text-capitalize d-flex align-items-center">
                                        <span class="flag-icon flag-icon-{{ strtolower($project->client->country->iso) }} mr-2"></span>
                                        {{ $project->client->country->nicename }}
                                    </span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>

                    @if( (in_array('admin', user_roles()) && $messageSetting->allow_client_admin == 'yes') || (in_array('employee', user_roles()) && $messageSetting->allow_client_employee == 'yes') )
                    <div class="p-client-msg mt-4 mt-xl-0 mt-lg-4 mt-md-0">
                        <button type="button" class="btn-secondary rounded f-15" id="new-chat" data-client-id="{{ $project->client->id }}"><i class="fab fa-whatsapp mr-1"></i> @lang('app.message')</button>
                    </div>
                    @endif
                </x-cards.data>
                @else
                <x-cards.data otherClasses="d-flex d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <x-cards.no-record icon="user" :message="__('messages.noClientAddedToProject')" />
                </x-cards.data>
                @endif
            </div>
            <!-- CLIENT END -->
            <div class="col-md-4 mb-4">
                <!-- PM Start -->
                <x-cards.data :title="__('Project Manager')" otherClasses="d-block d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
                    <div class="p-client-detail">
                        <div class="card border-0">
                            <div class="card-horizontal">
                                <div class="card-img m-0">
                                    <img class="" src="{{ $project->pm->image_url }}" alt="{{ $project->pm->name }}" />
                                </div>
                                <div class="card-body border-0 p-0 ml-4 ml-xl-4 ml-lg-3 ml-md-3">
                                    <h4 class="card-title f-15 font-weight-normal mb-0 text-capitalize">
                                        <a href="{{ route('employees.show', $project->pm_id) }}" class="text-dark">{{ $project->pm->name }}</a>
                                    </h4>

                                    @if ($project->pm->country_id)
                                    <span class="card-text f-12 text-lightest text-capitalize d-flex align-items-center">
                                        <span class="flag-icon flag-icon-{{ strtolower($project->pm->country->iso) }} mr-2"></span>
                                        {{$project->pm->country->nicename}}
                                    </span>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </x-cards.data>
            <!-- PM End -->
            </div>
        </div>
        <!-- PROJECT PROGRESS AND CLIENT END -->

        <!--CLIENT REVIEW-->
        {{-- @php
            $client_review = \App\Models\ClientReview::where('project_id',$project->id)->orderBy('id','desc')->first();
        @endphp
        @if($client_review)
            <div class="row mb-4">
                <div class="col-md-12">
                    <x-cards.data>
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row' : '' }}">
                            <div class="col-12">
                                <h5>Client Rating</h5>
                                <div class="d-block">
                                    @if($client_review->client_rating)
                                        @if($client_review->client_rating ==5)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating > 4 && $client_review->client_rating <5)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating ==4)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating > 3 && $client_review->client_rating <4)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating ==3)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating > 2 && $client_review->client_rating <3)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating ==2)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating > 1 && $client_review->client_rating <2)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating ==1)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                        @if($client_review->client_rating > 0 && $client_review->client_rating <1)
                                            <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                            <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                                <i class="fa-solid fa-star-half-stroke"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                                <i class="fa-regular fa-star"></i>
                                            </h6>
                                        @endif
                                    @else
                                        <h3 style="font-size: 2.25rem;">{{number_format($client_review->client_rating,1)}} <sub style="font-size: 0.875rem;">/5</sub></h3>
                                        <h6 class="d-flex align-items-center" style="gap:3px; color: #ff8200; font-size: 16px; ">
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                            <i class="fa-regular fa-star"></i>
                                        </h6>
                                    @endif
                                </div>
                            </div>
                            <div class="col-12 pt-4">
                                <h5>Client Comment</h5>
                                <div class="col-6 px-0">{!! $client_review->client_comment !!}</div>
                            </div>

                        </div>
                    </x-cards.data>
                </div>
            </div>
        @endif --}}
        <!--END CLIENT REVIEW-->
        <!-- TASK STATUS AND BUDGET START -->
        <div class="row mb-4"  >
            <!-- TASK STATUS START -->
            <div class="col-lg-6 col-md-12">
                <x-cards.data :title="__('app.menu.tasks')" padding="false">
                    <x-pie-chart id="task-chart" :labels="$taskChart['labels']" :values="$taskChart['values']" :colors="$taskChart['colors']" height="220" width="250" />
                </x-cards.data>
                <br>
                <!--Top Management Pm Task Guideline Autonraization-->
                @php
                    $task_guideline_authorization = App\Models\PMTaskGuidelineAuthorization::where('project_id',$project->id)->first();
                    $status_count = App\Models\PMTaskGuidelineAuthorization::where('project_id', $project->id)->where('status',0)->count();
                @endphp
                @if (Auth::user()->role_id == 1 && $task_guideline_authorization !== null && $status_count !=0)
                <div class="card mb-3" style="border:none">
                    <div class="py-3">
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                <button type="button" style="width: 100%" class="btn-secondary rounded f-15" data-toggle="modal" data-target="#task_auth_form_modal">Task Guideline Needs to be Authorized by Admin</button>
                                @include('projects.modals.task_auth_form_modal')
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endif
                <!--End Top Management Pm Task Guideline Autonraization-->



                <?php
                $dispute = App\Models\ProjectDispute::where('project_id', $project->id)->first();
                $q_c = \App\Models\QCSubmission::where('project_id',$project->id)->first();
                $project_completion = \App\Models\ProjectSubmission::where('project_id',$project->id)->first();
                ?>
                @if ($q_c !=null && $project_completion !=null)
                <x-cards.data>
                    <div class="py-3">
                        <div class="container">
                            <div class="row mb-4">
                                <div class="col-6">
                                    @if ($q_c !=null)
                                    <button type="button" style="width: 100%" class="btn-secondary rounded f-15" data-toggle="modal" data-target="#qc_final_modal">Project QC</button>
                                    @include('projects.modals.qc_final_modal')
                                    @endif
                                </div>
                                <div class="col-6">
                                    @if ($project_completion !=null)
                                    <button type="button" style="width: 100%" class="btn-secondary rounded f-15" data-toggle="modal" data-target="#project_completion_final_modal">Project Completion</button>
                                    @include('projects.modals.project_completion_final_modal')
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </x-cards.data>
                @endif
                @if ($dispute !=null)
                    <x-cards.data>
                        <div class="py-3">
                            <div class="container">
                                <div class="row">
                                    <div class="col-12">
                                        @if ($dispute != null)
                                            <button style="width: 100%" type="button" class="btn-secondary rounded text-center" data-toggle="modal" data-target="#final_dispute_view">See Dispute</button>
                                            @include('projects.modals.final_dispute_view')
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </x-cards.data>
                @endif
            </div>
            <!-- TASK STATUS END -->
            <!-- BUDGET VS SPENT START -->
            <div class="col-lg-6 col-md-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="f-18 f-w-500 mb-4">@lang('app.statistics')</h4>
                    </div>
                    @if ($projectBudgetPermission == 'all')
                    <div class="col-12 col-sm-6">
                        <x-cards.widget
                            :title="__('Project Budget (USD)')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->amount + $project->deal->upsell_amount, $project->currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif

                    @if ($projectBudgetPermission == 'all')
                        @if($project->currency_id != $project->deal->original_currency_id)
                        <div class="col-12 col-sm-6">
                            <x-cards.widget
                                :title="__('Project Budget ('. $project->deal->original_currency->currency_code .')')"
                                :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->actual_amount+$project->deal->upsell_actual_amount, $project->deal->original_currency->currency_symbol) : '0')"
                                icon="coins"
                            />
                        </div>
                        @endif
                    @endif
                    @if ($projectBudgetPermission == 'all')
                    @if($project->deal->upsell_amount != 0)
                    @if($project->currency_id != $project->deal->currency_id)
                    <div class="col-12 col-sm-6 mt-3">
                        <x-cards.widget
                            :title="__('Upsold Amount ('. $project->currency->currency_code .')')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->upsell_amount, $project->currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif
                    @endif
                @endif
                    @if ($projectBudgetPermission == 'all')
                    @if($project->deal->upsell_amount != 0)
                    @if($project->currency_id != $project->deal->original_currency_id)
                    <div class="col-12 col-sm-6 mt-3">
                        <x-cards.widget
                            :title="__('Upsold Amount ('. $project->deal->original_currency->currency_code .')')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->upsell_actual_amount, $project->deal->original_currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif
                    @endif
                @endif
                    <div class="col-12 mt-3">
                        <x-cards.widget :title="__('Project Type')" :value="$project->deal->project_type" icon="clock" badge="true"/>
                    </div>
                </div>
                <div class="row mt-3">
                  @if ($viewPaymentPermission == 'all')
                  <div class="col">
                      <x-cards.widget :title="__('app.earnings')" :value="(!is_null($project->currency) ? currency_formatter($earnings, $project->currency->currency_symbol) : currency_formatter($earnings))" icon="coins" />
                  </div>
                  @endif
                  @if ($viewPaymentPermission == 'all')
                  @if($project->currency_id != $project->deal->original_currency_id)
                  @php

                  $actual_earnings= App\Models\Payment::where('project_id',$project->id)->sum('actual_amount');
                  @endphp
                 <div class="col">
                     <x-cards.widget :title="__('Earnings  ('. $project->deal->original_currency->currency_code .')')" :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($actual_earnings, $project->deal->original_currency->currency_symbol) : '0')" icon="coins" />
                 </div>
                 @endif
                 @endif
                </div>

                <div class="row mt-3">
                    @if ($viewProjectTimelogPermission == 'all')
                    <div class="col">
                        <x-cards.widget :title="__('modules.projects.hoursLogged')" :value="$hoursLogged" icon="clock" />
                    </div>
                    @endif
                   @if ($viewExpensePermission == 'all')
                    <div class="col">
                        <x-cards.widget
                            :title="__('modules.projects.expenses_total')"
                            :value="(!is_null($project->currency) ? currency_formatter($expenses, $project->currency->currency_symbol) : currency_formatter($expenses))"
                            icon="coins"
                        />
                    </div>
                    @endif
                </div>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>

        <!-- TASK STATUS AND BUDGET END -->


        <!-- TASK STATUS AND BUDGET START -->
        {{-- <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-2' : '' }}">
                        <div class="col">
                            <h4 class="f-18 f-w-500 mb-0">@lang('modules.projects.hoursLogged')</h4>
                            <x-stacked-chart id="task-chart2" :chartData="$hoursBudgetChart" height="250" />
                        </div>
                        @if ($projectBudgetPermission == 'all')
                        <div class="col">
                            <h4 class="f-18 f-w-500 mb-0">@lang('modules.projects.projectBudget')</h4>
                            <x-stacked-chart id="task-chart3" :chartData="$amountBudgetChart" height="250" />
                        </div>
                        @endif
                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div> --}}
        @if(Auth::user()->role_id == 1 || Auth::user()->role_id == 7 || Auth::user()->role_id == 8)
            @php
                $web_content = \App\Models\WebContent::where('deal_id',$project->deal_id)->get();
                $blog_article = \App\Models\BlogArticle::where('deal_id',$project->deal_id)->get();
                $product_description = \App\Models\ProductDescription::where('deal_id',$project->deal_id)->get();
                $product_category = \App\Models\ProductCategoryCollection::where('deal_id',$project->deal_id)->get();
                $basic_seo = \App\Models\BasicSeo::where('deal_id',$project->deal_id)->get();
            @endphp
            @if(count($web_content) > 0 || count($blog_article) > 0 || count($product_description) > 0 || count($product_category) > 0 || count($basic_seo) > 0)
                <div class="row mb-4">
                    <div class="col-12">
                        <x-cards.data>
                            <h3 class="mb-3">Cross Departmental Work</h3>
                            <div class="row {{ $projectBudgetPermission == 'all' ? 'row' : '' }}">
                                <div class="col-2">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h4>Web Content</h4>
                                                <a href="{{route('viewWebContent',$project->deal_id)}}">( {{count($web_content)}} )</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h4>Blog/Article</h4>
                                            <a href="{{route('viewBlogArticle',$project->deal_id)}}">( {{count($blog_article)}} )</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h4>Product Description</h4>
                                            <a href="{{route('viewProductDescription',$project->deal_id)}}">( {{count($product_description)}} )</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-3">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h4>Product Category/Collection Pages</h4>
                                            <a href="{{route('viewProductCategoryCollection',$project->deal_id)}}">( {{count($product_category)}} )</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="card">
                                        <div class="card-body text-center">
                                            <h4>Basic SEO</h4>
                                            <a href="{{route('viewBasicSEO',$project->deal_id)}}">( {{count($basic_seo)}} )</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </x-cards.data>
                    </div>
                </div>
            @endif
        @endif
       <!-- View Only PM -->
        @php
            $sales_webContent = \App\Models\SalesWebContent::where('deal_id',$project->deal_id)->first();
            $sales_blogArticle = \App\Models\SalesBlogArticle::where('deal_id',$project->deal_id)->first();
            $sales_productDescription = \App\Models\SalesProductDescription::where('deal_id',$project->deal_id)->first();
            $sales_productCategory = \App\Models\SalesProductCategory::where('deal_id',$project->deal_id)->first();
            $sales_basicSeo = \App\Models\SalesBasicSeo::where('deal_id',$project->deal_id)->first();
        @endphp
        @if(Auth::user()->role_id==4)
            @if($sales_webContent != null || $sales_blogArticle !=null || $sales_productDescription !=null || $sales_productCategory !=null || $sales_basicSeo !=null)
                @if($sales_webContent && $sales_webContent->status=='submitted' || $sales_blogArticle && $sales_blogArticle->status=='submitted' || $sales_productDescription && $sales_productDescription->status=='submitted' || $sales_productCategory && $sales_productCategory->status=='submitted' || $sales_basicSeo && $sales_basicSeo->status=='submitted')
                    <div class="row mb-4">
                        @php
                            $web_content = \App\Models\WebContent::where('deal_id',$project->deal_id)->get();
                            $blog_article = \App\Models\BlogArticle::where('deal_id',$project->deal_id)->get();
                            $product_description = \App\Models\ProductDescription::where('deal_id',$project->deal_id)->get();
                            $product_category = \App\Models\ProductCategoryCollection::where('deal_id',$project->deal_id)->get();
                            $basic_seo = \App\Models\BasicSeo::where('deal_id',$project->deal_id)->get();
                        @endphp
                        <div class="col-12">
                            <x-cards.data>
                                <h3 class="mb-3">Cross Departmental Work</h3>
                                <div class="row {{ $projectBudgetPermission == 'all' ? 'row' : '' }}">
                                    <div class="col-2">
                                        <div class="card">
                                            <div class="card-body text-center">
                                                <h4>Web Content</h4>
                                                @if($web_content !=null)
                                                    <a href="{{route('viewWebContent',$project->deal_id)}}">( {{count($web_content)}} )</a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="card">
                                            <div class="card-body text-center">
                                                <h4>Blog/Article</h4>
                                                @if($blog_article !=null)
                                                <a href="{{route('viewBlogArticle',$project->deal_id)}}">( {{count($blog_article)}} )</a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="card">
                                            <div class="card-body text-center">
                                                <h4>Product Description</h4>
                                                @if($product_description !=null)
                                                <a href="{{route('viewProductDescription',$project->deal_id)}}">( {{count($product_description)}} )</a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="card">
                                            <div class="card-body text-center">
                                                <h4>Product Category/Collection Pages</h4>
                                                @if($product_category !=null)
                                                <a href="{{route('viewProductCategoryCollection',$project->deal_id)}}">( {{count($product_category)}} )</a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <div class="card">
                                            <div class="card-body text-center">
                                                <h4>Basic SEO</h4>
                                                @if($basic_seo !=null)
                                                <a href="{{route('viewBasicSEO',$project->deal_id)}}">( {{count($basic_seo)}} )</a>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </x-cards.data>
                        </div>
                    </div>
                @endif
            @endif
        @endif
        @if($project->deal->project_type=="hourly")
            <div class="row mb-4" >
                <!-- BUDGET VS SPENT START -->
                <div class="col-4">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Estimated Hours</h4>
                                <br>
                                @if($project->deal->estimated_hour_task)
                                <p>{{$project->deal->estimated_hour_task}}</p>
                                @else
                                <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <div class="col-4">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Hourly Rate</h4>
                                <br>
                                @if($project->deal->hourly_rate)
                                <p>{{$project->deal->hourly_rate}}</p>
                                @else
                                    <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <div class="col-4">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Hub Staff Tracking </h4>
                                <br>
                                <p>{{$project->deal->hubstaff_tracking ==1 ? 'Yes' : 'No'}}</p>

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <!-- BUDGET VS SPENT END -->
            </div>

            <div class="row mb-4" >
                <!-- BUDGET VS SPENT START -->
                <div class="col-6">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Expected Tracked Hours on Day 2</h4>
                                <br>
                                @if($project->deal->second_day_tracked_hours)
                                <p>{{$project->deal->second_day_tracked_hours}}</p>
                                @else
                                    <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <div class="col-6">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Clients Expected Amount of Work Per Hour </h4>
                                <br>
                                @if($project->deal->expect_amount)
                                <p>{{$project->deal->expect_amount}}</p>
                                @else
                                    <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <!-- BUDGET VS SPENT END -->
            </div>

            <div class="row mb-4" >
                <!-- BUDGET VS SPENT START -->
                <div class="col-6">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Expected Tracked Hours on Day 1 </h4>
                                <br>
                                @if($project->deal->tracked_hours)
                                    <p>{{$project->deal->tracked_hours}}</p>
                                @else
                                    <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>
                <div class="col-6">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>Clients Expectation About Approx. Hours Needed for the Initial Tasks</h4>
                                <br>
                                @if($project->deal->certain_amount_hour)
                                    <p>{{$project->deal->certain_amount_hour}}</p>
                                @else
                                    <p>--</p>
                                @endif

                            </div>

                        </div>
                    </x-cards.data>
                </div>

                <!-- BUDGET VS SPENT END -->
            </div>

            <div class="row mb-4" >
                <!-- BUDGET VS SPENT START -->
                <div class="col-12">
                    <x-cards.data class="h-100">
                        <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                            <div class="col">
                                <h4>On-going/One-time Project? </h4>
                                <br>
                                @if($project->deal->long_project)
                                <p>{{$project->deal->long_project}}</p>
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
        @php
            $task_guideline = \App\Models\PmTaskGuideline::where('project_id',$project->id)->first();
            $working_environment= App\Models\WorkingEnvironment::where('project_id',$project->id)->first();
        @endphp
        <div class="row mb-4">
            @if ($task_guideline !=null)
                <div class="col-md-6">
                    <div class="card" style="border:none">
                        <div class="py-3">
                            <div class="container">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-6">
                                    <button type="button" style="width: 100%" class="btn-secondary rounded f-15" data-toggle="modal" data-target="#taskGuidelineModal">PM Task Guideline</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
            @if($working_environment != null)
                <div class="col-md-6">
                    <div class="card" style="border:none">
                        <div class="py-3">
                            <div class="container">
                                <div class="row d-flex justify-content-center">
                                    <div class="col-md-6">
                                    <button type="button" style="width: 100%" class="btn-secondary rounded f-15" data-toggle="modal" data-target="#workingEnvModal">Working Environment</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endif
        </div>
        <?php
            $deal= App\Models\Deal::where('id',$project->deal_id)->first(); ?>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>Project General Guidelines</h4>
                            <br>
                            <p>{!! $project->project_summary !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <!--Task Guideline Modal -->
        @if($task_guideline !=null)
            <div class="modal fade" id="taskGuidelineModal" tabindex="-1" aria-labelledby="taskGuidelineModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="taskGuidelineModalLabel">Parent Task Guideline</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            @php
                                $task_guideline = \App\Models\PmTaskGuideline::where('project_id',$project->id)->orderBy('id','desc')->first();
                            @endphp
                            <div class="row mb-3">
                                <div class="col-md-12 d-flex">
                                    <h6>Provide Theme Details :</h6>
                                    @if($task_guideline->theme_details != null)
                                        <p class="ml-2">
                                            @if($task_guideline->theme_details ==1)
                                                Yes
                                            @else
                                                No
                                            @endif
                                        </p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6>Theme Name :</h6>
                                    @if($task_guideline->theme_name != null)
                                        <p class="ml-2">{{$task_guideline->theme_name}}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                                <div class="col-md-6 d-flex">
                                    <h6>Theme Url : </h6>
                                    @if($task_guideline->theme_url != null)
                                    <a href="{{$task_guideline->theme_url}}" target="_blanck" class="ml-2">View On New Tab</a>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12 d-flex">
                                    <h6>Design :</h6>
                                    @if($task_guideline->design != null)
                                        <p class="ml-2">{{$task_guideline->design}}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6 for="">Input XD/Figma URL :</h6>
                                    @if($task_guideline->xd_url != null)
                                        <a href="{{$task_guideline->xd_url}}" target="_blanck" class="ml-2">View On New Tab</a>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                                <div class="col-md-6 d-flex">
                                    <h6>Input Google Drive File/Folder URL :</h6>
                                    @if($task_guideline->drive_url != null)
                                        <a href="{{$task_guideline->drive_url}}" target="_blanck" class="ml-2">View On New Tab</a>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                            <div class="col-md-12 d-flex">
                                    <h6>Reference Site Link :</h6>
                                    @if($task_guideline->reference_link != '[]')
                                            <p class="ml-2">
                                            @if ($task_guideline != null && !empty($task_guideline->reference_link))
                                                @php
                                                    $referenceLinks = is_array($task_guideline->reference_link) ? $task_guideline->reference_link : json_decode($task_guideline->reference_link, true);
                                                @endphp

                                                @foreach ($referenceLinks as $reference_link)
                                                    <a target="_blank" href="{{ $reference_link }}">View On New Tab</a>
                                                    <br>
                                                @endforeach
                                            @else
                                                -- No reference links available --
                                            @endif
                                        </p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <h6>Instruction :</h6>
                                    @if($task_guideline->instruction != null )
                                        <span>{!! $task_guideline->instruction !!}</span>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6>Primary Color :</h6>
                                    @if($task_guideline->color != null)
                                        <p class="ml-2">{{$task_guideline->primary_color}}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12 d-flex">
                                    <h6>Developers Use This Color :</h6>
                                    @if($task_guideline->color != null)
                                        <p class="ml-2">{!! $task_guideline->primary_color_description !!}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6>Secondary Color :</h6>
                                    @if($task_guideline->color != null)
                                        <p class="ml-2">{{implode(',  ',json_decode($task_guideline->color))}}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <h6>Developers Use This Color:</h6>
                                    @if($task_guideline->color_description != '[]')
                                        @if($task_guideline != null && !empty($task_guideline->color_description))
                                            @php
                                                $colorDescriptions = is_array($task_guideline->color_description) ? $task_guideline->color_description : json_decode($task_guideline->color_description, true);
                                            @endphp

                                            @foreach($colorDescriptions as $color_description)
                                                <p class="ml-2">{!! $color_description !!}</p>
                                            @endforeach
                                        @else
                                            <p class="ml-2">Not Shared</p>
                                        @endif
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12 d-flex">
                                    <h6>Plugin Research :</h6>
                                    @if($task_guideline->plugin_research != null)
                                        <p class="ml-2">
                                            @if($task_guideline->plugin_research ==1)
                                                Yes
                                            @else
                                                No
                                            @endif
                                        </p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6>Plugin Name :</h6>
                                    @if($task_guideline->plugin_name != null)
                                        <p class="ml-2">{{$task_guideline->plugin_name}}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-6 d-flex">
                                    <h6>Plugin URL :</h6>
                                    @if($task_guideline->plugin_url != null)
                                    <a href="{{$task_guideline->plugin_url}}" target="_blanck" class="ml-2">View On New Tab</a>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                                <div class="col-md-6 d-flex">
                                    <h6>Google Drive Link :</h6>
                                    @if($task_guideline->google_drive_link != null)
                                        <a href="{{$task_guideline->google_drive_link}}" target="_blanck" class="ml-2">View On New Tab</a>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-md-12">
                                    <h6>Instructions for Using This Plugin :</h6>
                                    @if($task_guideline->instruction_plugin != null)
                                        <p class="ml-2">{!! $task_guideline->instruction_plugin !!}</p>
                                    @else
                                        <p class="ml-2">Not Shared</p>
                                    @endif
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        @endif
        <!--Task Guideline Modal -->
        @if($working_environment !=null)
        <div class="modal fade" id="workingEnvModal" tabindex="-1" aria-labelledby="workingEnvModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="workingEnvModalLabel">Working Environment</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-3">
                            <div class="col-md-6 d-flex">
                                <h6>Site Url :</h6>
                                @if($working_environment->site_url != null)
                                <a href="{{$working_environment->site_url}}" target="_blanck" class="ml-2">{{$working_environment->site_url}}</a>
                                @else
                                    <p class="ml-2">Not Shared</p>
                                @endif
                            </div>
                            <div class="col-md-6 d-flex">
                                <h6>Frontend Password :</h6>
                                @if($working_environment->frontend_password != null)
                                    <p class="ml-2">{{$working_environment->frontend_password}}</p>
                                @else
                                    <p class="ml-2">Not Shared</p>
                                @endif
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4 d-flex">
                                <h6 for="">Login Url :</h6>
                                @if($working_environment->login_url != null)
                                <a href="{{$working_environment->login_url}}" target="_blanck" class="ml-2">{{$working_environment->login_url}}</a>
                                @else
                                    <p class="ml-2">Not Shared</p>
                                @endif
                            </div>
                            <div class="col-md-4 d-flex">
                                <h6>Email :</h6>
                                @if($working_environment->email != null)
                                    <p class="ml-2">{{$working_environment->email}}</p>
                                @else
                                    <p class="ml-2">Not Shared</p>
                                @endif
                            </div>
                            <div class="col-md-4 d-flex">
                                <h6>Password :</h6>
                                @if($working_environment->password != null)
                                    <p class="ml-2">{{$working_environment->password}}</p>
                                @else
                                    <p class="ml-2">Not Shared</p>
                                @endif
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        @endif
        @if(Auth::user()->role_id != 6)
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row-cols-lg-1">
                        <div class="col">
                            <h4>Project Milestones</h4>
                            <br>
                            <?php

                            $milestones= App\Models\ProjectMilestone::where('project_id',$project->id)->get();
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
                                        <th class="pl-20">{{$loop->index+1}}</th>
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
        @endif
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4><strong>Project Challenge:</strong> <span>{{$project->project_challenge }}</span></h4>
                            <br>
                            <p>{!!$project->comments !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>

        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row">
                        <div class="col">
                            @if ($deal->dept_status=='DM')
                            <h4>Profile Link</h4>
                            @else
                            <h4>Freelancer Profile Link</h4>
                            @endif
                            <br>
                            <p><a target="_blank" href="{{ $deal->profile_link}}">{{ $deal->profile_link}}</a></p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row">
                        <div class="col">
                            @if ($deal->dept_status=='DM')
                            <h4>Message Link</h4>
                            @else
                            <h4>Freelancer Message Link</h4>
                            @endif
                            <br>
                            <?php
                            $mystring = $deal->message_link;

                                $output = str_replace('<br>',' ', $mystring);

                                $output_final= (trim($output));
                                $data= explode("  ", $output_final);
                              //  dd(($data));

                             ?>
                             @foreach($data as $message)
                            <p><a target="_blank" href="{{ $message}}">{{$message}}</a></p>
                            @endforeach

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            @if ($deal->dept_status=='DM')
                            <h4>Write the what in 2-8 words here (Example: Whole website seo, Google ads, Backlink creation, Basic SEO, Sponsored posts etc.)</h4>
                            @else
                            <h4>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h4>
                            @endif
                            <br>
                            <p>{!! $deal->description2 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            @if ($deal->dept_status=='DM')
                            <h4>Elaborate the "WHAT" 3-4 lines here (The client created a new website recently and he now wants to start full suite SEO for his website.). Please share all the necessary information you possible can here. The execution team will work based on this instruction primarily.</h4>
                              @else
                            <h4>
                              Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                              It should include home, about, his services in one page, blog, and contact. The look and feel should be
                              better than the references.)</h4>
                              @endif
                            <br>
                            <p>{!! $deal->description3 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        @if ($deal->dept_status !='DM')
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>
                              Reference websites and what the references are for (Ex: ABC.com is for the color scheme. XYZ.com is for
                                section layouts DEF.com is for header & footer styling. However, none of these can be copied)</h4>
                            <br>
                            <p>{!! $deal->description4 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        @endif
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            @if ($deal->dept_status=='DM')
                            <h4>Any particular focus/concern of the client (Ex: 1. The client is very concerned about his websites current rank drop.  2. The client is frustrated about his google ads campaigns not getting enough returns and desperately wants someone to improve this)</h4>
                              @else
                            <h4>Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                              the way he wants.)</h4>
                              @endif
                            <br>
                            <p>{!! $deal->description5 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>
                              Required logins (Whichever of these are applicable: Wordpress, FTP, Cpanel, shopify, Domain register)</h4>
                            <br>
                            <p>{!! $deal->description6 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>Logo (Upload the google drive link here. Always ask for PSD and AI files so they are editable)</h4>
                            <br>
                            <p>{!! $deal->description7 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>  If there is any cross-departmental work involved in this project
                              (Example: SEO, Content writing, design, google ads, social media marketing, email marketing & anything else that is not explicitly included in web
                              development)</h4>
                            <br>
                            <p>{!! $deal->description8 !!}</p>

                        </div>

                    </div>
                </x-cards.data>

            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>Any other notes for the project manager/technical team</h4>
                            <br>
                            <p>{!! $deal->description9 !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>Were the requirements properly defined by Sales</h4>
                            <br>
                            <p>{!! $project->requirement_defined !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>

        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>Is the deadline provided by Sales realistic</h4>
                            <br>
                            <p>{!! $project->deadline_meet !!}</p>

                        </div>

                    </div>
                </x-cards.data>
            </div>
            <!-- BUDGET VS SPENT END -->
        </div>






         {{-- Custom fields data --}} @if (isset($fields) && count($fields) > 0)
        <div class="row mt-4">
            <!-- TASK STATUS START -->
            <div class="col-md-12">
                <x-cards.data :title="__('modules.client.clientOtherDetails')">
                    @foreach ($fields as $field) @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                    <x-cards.data-row :label="$field->label" :value="$project->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'textarea')
                    <x-cards.data-row :label="$field->label" html="true" :value="$project->custom_fields_data['field_'.$field->id] ?? '--'" />
                    @elseif($field->type == 'radio')
                    <x-cards.data-row :label="$field->label" :value="(!is_null($project->custom_fields_data['field_' . $field->id]) ? $project->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'checkbox')
                    <x-cards.data-row :label="$field->label" :value="(!is_null($project->custom_fields_data['field_' . $field->id]) ? $project->custom_fields_data['field_' . $field->id] : '--')" />
                    @elseif($field->type == 'select')
                    <x-cards.data-row
                        :label="$field->label"
                        :value="(!is_null($project->custom_fields_data['field_' . $field->id]) && $project->custom_fields_data['field_' . $field->id] != '' ? $field->values[$project->custom_fields_data['field_' . $field->id]] : '--')"
                    />
                    @elseif($field->type == 'date')
                    <x-cards.data-row
                        :label="$field->label"
                        :value="(!is_null($project->custom_fields_data['field_' . $field->id]) && $project->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($project->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')"
                    />
                    @endif @endforeach
                </x-cards.data>
            </div>
        </div>
        @endif


    </div>

    <!-- PROJECT RIGHT START -->
    {{--<div class="project-right pt-0 pb-4 p-lg-0 .activity" id="activity">
        <div class="bg-white">
            <!-- ACTIVITY HEADING START -->
            <div class="p-activity-heading d-flex align-items-center justify-content-between b-shadow-4 p-20">
                <p class="mb-0 f-18 f-w-500">@lang('modules.employees.activity')</p>
            </div>
            <!-- ACTIVITY HEADING END -->
            <!-- ACTIVITY DETAIL START -->
            <div class="p-activity-detail cal-info b-shadow-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500" id="projectActivityDetail">
                @forelse($activities as $key=>$activity)
                @if($activity->activity != 'modules.tasks.timerStoppedBy' && $activity->activity != 'modules.tasks.timerPausedBy' && $activity->activity != 'modules.tasks.timerStartedBy')
                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                    <div class="card-horizontal">
                        <div class="card-header m-0 p-0 bg-white rounded">
                            <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')" :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')" />
                        </div>
                        <div class="card-body border-0 p-0 ml-3">
                            <h4 class="card-title f-14 font-weight-normal text-capitalize">{!! __(str_replace('_', ' ', $activity->activity)) !!}</h4>
                            <p class="card-text f-12 text-dark-grey">
                                {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                            </p>
                        </div>
                    </div>
                </div>
                @endif
                <!-- card end -->
                @empty
                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                    <div class="card-horizontal">
                        <div class="card-body border-0 p-0 ml-3">
                            <h4 class="card-title f-14 font-weight-normal">
                                @lang('messages.noActivityByThisUser')
                            </h4>
                            <p class="card-text f-12 text-dark-grey"></p>
                        </div>
                    </div>
                </div>
                <!-- card end -->
                @endforelse
            </div>
            <!-- ACTIVITY DETAIL END -->
        </div>
    </div>--}}

    <!-- PROJECT RIGHT END -->


</div>
  @include('projects.modals.projectacceptmodal')
    @include('projects.modals.projectdenymodal')


<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>

<script>
$(document).on('click','#project-accept',function(e){


  //console.log(milestone_id);
  $('#projectreviewmodal').modal('show');


});
$(document).on('click','#project-deny',function(e){


  //console.log(milestone_id);
  $('#projectdenymodal').modal('show');


});
$(document).on('click','#project-submission-form',function(e){


  //console.log(milestone_id);
  $('#ProjectSubmissionModal').modal('show');


});
$(document).on('click','#project-qc-form',function(e){


  //console.log(milestone_id);
  $('#ProjectqcSubmissionModal').modal('show');


});
    $(document).ready(function () {
        $(".change-status").change(function () {
            var status = $(this).val();
            var url = "{{ route('projects.update_status', $project->id) }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                type: "POST",
                container: ".content-wrapper",
                blockUI: true,
                data: {
                    status: status,
                    _token: token,
                },
            });
        });

        $("body").on("click", "#pinnedItem", function () {
            var type = $("#pinnedItem").attr("data-pinned");
            var id = "{{ $project->id }}";
            var pinType = "project";

            var dataPin = type.trim(type);
            if (dataPin == "pinned") {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: "warning",
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmUnpin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: "btn btn-primary mr-3",
                        cancelButton: "btn btn-secondary",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('projects.destroy_pin', ':id') }}";
                        url = url.replace(":id", id);

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: "POST",
                            url: url,
                            data: {
                                _token: token,
                                type: pinType,
                            },
                            success: function (response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            },
                        });
                    }
                });
            } else {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: "warning",
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmPin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: "btn btn-primary mr-3",
                        cancelButton: "btn btn-secondary",
                    },
                    showClass: {
                        popup: "swal2-noanimation",
                        backdrop: "swal2-noanimation",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('projects.store_pin') }}?type=" + pinType;

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: "POST",
                            url: url,
                            data: {
                                _token: token,
                                project_id: id,
                            },
                            success: function (response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            },
                        });
                    }
                });
            }
        });

        $("body").on("click", ".restore-project", function () {
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.unArchiveMessage')",
                icon: "warning",
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmRevert')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: "btn btn-primary mr-3",
                    cancelButton: "btn btn-secondary",
                },
                showClass: {
                    popup: "swal2-noanimation",
                    backdrop: "swal2-noanimation",
                },
                buttonsStyling: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('projects.archive_restore', $project->id) }}";

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: "POST",
                        url: url,
                        data: {
                            _token: token,
                        },
                        success: function (response) {
                            if (response.status == "success") {
                                window.location.reload();
                            }
                        },
                    });
                }
            });
        });

        $("body").on("click", "#new-chat", function () {
            let clientId = $(this).data("client-id");
            const url = "{{ route('messages.create') }}?clientId=" + clientId;
            $(MODAL_LG + " " + MODAL_HEADING).html("...");
            $.ajaxModal(MODAL_LG, url);
        });
    });
</script>
<script type="text/javascript">

var list = document.getElementsByClassName("RightModal");
if (list && list.length > 0) {

  $(document).ready(function() {
    $('#activity').hide();
  //  $('#project-left').css({"margin-right":"auto","padding-top":"0px !important"});
    $("#project-left").removeClass("project-left w-100 py-0 py-lg-5 py-md-0");
    $("#project-left").addClass("custom-css");

});
}
</script>
<script>
    $('#markAsIncompleteBtn').click(function(e) {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "If you click Yes, This project will be marked as incomplete!",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '{{route('project-incomplete')}}',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        '_token': '{{ csrf_token() }}',
                        'id':{{$project->id}},
                    },
                    success: function(response) {
                        if(response.status==400){
                            swal.fire({
                                title: 'success!',
                                text: 'Mark As Incomplete Done',
                                icon: 'success',
                            }).then(function() {
                                window.location.reload();
                            });
                        }
                    },
                    error: function(response) {
                        swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while mark as incomplete.',
                            icon: 'error',
                        });
                    }
                });
            }
        });
    })
</script>
<script>
    $('body').on('click', '.project-deadline-extension', function() {
        let projectId = $(this).data('project-id');
        console.log(projectId);
        let searchQuery = "?project_id=" + projectId;
        let url = "{{ route('project-deadline-extension') }}" + searchQuery;

        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });
</script>
<script src="https://cdn.ckeditor.com/4.19.1/standard/ckeditor.js"></script>


