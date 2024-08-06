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
<div class="d-lg-flex">
    <div class="project-left w-100 py-0 py-lg-5 py-md-0" id="project-left">
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
                @lang('Deny')
            </a>


            <a id="project-accept" class="btn btn-primary bg-white border height-35 f-15 px-3 py-2 text-dark-grey text-capitalize rounded mr-3">
                @lang('Accept')
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
              //dd($dispute);

            @endphp
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

            @else
            <div class="ml-lg-3 ml-md-0 ml-0 mr-3 mr-lg-0 mr-md-3">
                <div class="">
                    <a class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded openRightModal" href="{{ route('projects.dispute.form', $project->id) }}"  aria-haspopup="true" aria-expanded="false">
                    @lang('Dispute Form')
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

                    <button class="btn btn-primary bg-white border height-35 f-15 px-2 py-2 text-dark-grey text-capitalize rounded" type="submit"  aria-haspopup="true" aria-expanded="false">
                    @lang('Mark As Incomplete')
                  </button>
                    </form>

                </div>
            </div>
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
            @endif


            @endif



            @endif
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
            <div class="col-md-6 mb-4">
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
                <x-cards.data :title="__('modules.projects.projectProgress')" otherClasses="d-flex d-xl-flex d-lg-block d-md-flex  justify-content-between align-items-center">
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
                            {{ !is_null($project->deadline) ? $project->deadline->format(global_setting()->date_format) : '--' }}
                        </p>
                    </div>
                    <!-- PROGRESS END DATE END -->
                </x-cards.data>
            </div>
            <!-- PROJECT PROGRESS END -->
            <!-- CLIENT START -->
            <div class="col-md-6 mb-4">
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
        </div>
        <!-- PROJECT PROGRESS AND CLIENT END -->

        <!-- TASK STATUS AND BUDGET START -->
        <div class="row mb-4"  >
            <!-- TASK STATUS START -->
            <div class="col-lg-6 col-md-12">
                <x-cards.data :title="__('app.menu.tasks')" padding="false">
                    <x-pie-chart id="task-chart" :labels="$taskChart['labels']" :values="$taskChart['values']" :colors="$taskChart['colors']" height="220" width="250" />
                </x-cards.data>
            </div>
            <!-- TASK STATUS END -->
            <!-- BUDGET VS SPENT START -->
            <div class="col-lg-6 col-md-12">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="f-18 f-w-500 mb-4">@lang('app.statistics')</h4>
                    </div>
                    @if ($projectBudgetPermission == 'all')
                    <div class="col">
                        <x-cards.widget
                            :title="__('Project Budget (USD)')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->project_budget, $project->currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif @if ($projectBudgetPermission == 'all') @if($project->currency_id != $project->deal->original_currency_id)
                    <div class="col">
                        <x-cards.widget
                            :title="__('Project Budget ('. $project->deal->original_currency->currency_code .')')"
                            :value="((!is_null($project->project_budget) && $project->currency) ? currency_formatter($project->deal->actual_amount, $project->deal->original_currency->currency_symbol) : '0')"
                            icon="coins"
                        />
                    </div>
                    @endif @endif


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
                            <h4>Freelancer Profile Link</h4>
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
                            <h4>Freelancer Message Link</h4>
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
                            <h4>Write the what in 2-8 words here (Examples: Website redesign, Shopify website migration to Wix, Creating a 5 page business website in WordPress, Shopify website creation, etc.)</h4>
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
                            <h4>
                              Elaborate the "WHAT" 3-4 lines here (The client needs a 5 page static WordPress website for his new design agency.
                              It should include home, about, his services in one page, blog, and contact. The look and feel should be
                              better than the references.)</h4>
                            <br>
                            <p>{!! $deal->description3 !!}</p>

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
        <div class="row mb-4" >
            <!-- BUDGET VS SPENT START -->
            <div class="col-md-12">
                <x-cards.data>
                    <div class="row {{ $projectBudgetPermission == 'all' ? 'row-cols-lg-1' : '' }}">
                        <div class="col">
                            <h4>
                              Any particular focus/concern of the client (Ex: 1. The client is very concerned about the final look & feel so needs to be careful with the design 2. The client is very concerned if the booking functionality will work
                              the way he wants.)</h4>
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
    <div class="project-right pt-0 pb-4 p-lg-0 .activity" id="activity">
        <div class="bg-white">
            <!-- ACTIVITY HEADING START -->
            <div class="p-activity-heading d-flex align-items-center justify-content-between b-shadow-4 p-20">
                <p class="mb-0 f-18 f-w-500">@lang('modules.employees.activity')</p>
            </div>
            <!-- ACTIVITY HEADING END -->
            <!-- ACTIVITY DETAIL START -->
            <div class="p-activity-detail cal-info b-shadow-4" data-menu-vertical="1" data-menu-scroll="1" data-menu-dropdown-timeout="500" id="projectActivityDetail">
                @forelse($activities as $key=>$activity)
                <div class="card border-0 b-shadow-4 p-20 rounded-0">
                    <div class="card-horizontal">
                        <div class="card-header m-0 p-0 bg-white rounded">
                            <x-date-badge :month="$activity->created_at->timezone(global_setting()->timezone)->format('M')" :date="$activity->created_at->timezone(global_setting()->timezone)->format('d')" />
                        </div>
                        <div class="card-body border-0 p-0 ml-3">
                            <h4 class="card-title f-14 font-weight-normal text-capitalize">{!! __($activity->activity) !!}</h4>
                            <p class="card-text f-12 text-dark-grey">
                                {{ $activity->created_at->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                            </p>
                        </div>
                    </div>
                </div>
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
    </div>

    <!-- PROJECT RIGHT END -->


</div>
  @include('projects.modals.projectacceptmodal')
    @include('projects.modals.projectdenymodal')




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


// .project-left {
// 	margin-right: auto;
// }
// .project-left.w-100.py-0.py-lg-5.py-md-0 {
// 	padding-top: 0 !important;
// }


</script>


