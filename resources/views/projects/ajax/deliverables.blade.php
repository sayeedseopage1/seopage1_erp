<style>
    .logo {
        height: 33px;
    }

    .signature_wrap {
        position: relative;
        height: 150px;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 400px;
    }

    .signature-pad {
        position: absolute;
        left: 0;
        top: 0;
        width: 400px;
        height: 150px;
    }
    .icon-container {
        position: relative;
    }

    .show_old_data_modal {
        position: absolute;
        bottom: 6px ;
        right: 6px  ;
    }
    .show_i_on_top {
        position: absolute;
        top: 6px ;
        right: 6px  ;
        color: #1d82f5;
    }
</style>
<!-- SweetAlert -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css">

<div class="card border-0 invoice mt-5">

   <div class="col-md-12" align="right">
     @php

     $client= App\Models\User::where('id',$project->client_id)->first();
      $deal= App\Models\Deal::where('id',$project->deal_id)->first();
       $currency= App\Models\Currency::where('id',$deal->original_currency_id)->first();
       $oldContractSign = App\Models\ContractSign::where('project_id',$project->id)->first();
       $newDeliverable = null;
       if ($oldContractSign != null) {
            $newDeliverable = App\Models\ProjectDeliverable::where('project_id',$oldContractSign->project_id)->whereDate('created_at','>',$oldContractSign->created_at)->get();
       }
     if($project->pm_id != null)
     {
     $pm = App\Models\User::where('id',$project->pm_id)->first();
     }else
     {
     $pm = '--';
     }
     @endphp
                  <td >
                      <table  class="inv-num-date text-dark f-13 mt-3">
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                  Client Name</td>
                              <td class="border-left-0">{{$client->name}}</td>
                          </tr>

                          <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                                Budget</td>
                            <td class="border-left-0">{{$project->deal->actual_amount + $project->deal->upsell_actual_amount}}{{$currency->currency_symbol}}
                            </td>
                        </tr>
                          <tr>
                              <td class="bg-light-grey border-right-0 f-w-500">
                                Project Manager</td>
                              <td class="border-left-0">
                                {{$pm->name}}
                              </td>
                          </tr>
                          <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                              Total Estimation Hour</td>
                            <td class="border-left-0">
                              {{$project->hours_allocated}} hours
                            </td>
                        </tr>
                        <tr>
                            <td class="bg-light-grey border-right-0 f-w-500">
                            Estimated Hourly Rate</td>
                            <td class="border-left-0">
                                @if($project->hours_allocated >  0 )

                              {{round(($project->deal->amount+ $project->deal->upsell_amount)/$project->hours_allocated ,0)}}$/hour
                              @else
                              --
                              @endif
                            </td>
                        </tr>
                        @php
                        function calculateTotalLoggedTime($project_id) {
                            $total_minutes = DB::table('project_time_logs')
                                ->where('project_id', $project_id)
                                ->sum('total_minutes');

                            $total_hours = intval($total_minutes / 60);
                            $remaining_minutes = $total_minutes % 60;

                            return $total_hours . ' hrs ' . $remaining_minutes . ' mins';
                        }

                        $total_project_logged_time = calculateTotalLoggedTime($project->id);
                        preg_match('/(\d+)\s*hrs\s*(\d+)\s*mins/', $total_project_logged_time, $matches);
                        $total_hours = intval($matches[1]);
                        $remaining_minutes = intval($matches[2]);
                    @endphp

                <tr>
                    <td class="bg-light-grey border-right-0 f-w-500">
                        Total Logged Hours
                    </td>
                    <td class="border-left-0">
                        @if (!empty($total_project_logged_time))
                            {{ $total_project_logged_time }}
                        @else
                            00
                        @endif
                    </td>
                </tr>
                <tr>
                    <td class="bg-light-grey border-right-0 f-w-500">
                        Final Hourly Rate
                    </td>
                    <td class="border-left-0">
                        @if ($total_hours > 0 || $remaining_minutes > 0)
                            {{ round($project->project_budget / ($total_hours + $remaining_minutes / 60), 2) }}$/hour
                        @else
                            --
                        @endif
                    </td>
                </tr>

                      </table>

                  </td>

</div>
<?php
    $signature= App\Models\ContractSign::where('project_id',$project->id)->first();
    //dd($project->updated_at);
    $accept_date= $project->updated_at;
    $current_time= \Carbon\Carbon::now();
    $diff_in_minutes = $current_time->diffInMinutes($accept_date);
    //dd( $diff_in_minutes);
    $pm_project= App\Models\PMProject::where('project_id',$project->id)->first();
?>
@if(($signature == null && $project->authorization_status == 'pending' )  || ($signature != null && $project->deliverable_authorization == 0))

    @if($project->pm_id == Auth::id() && Auth::user()->role_id != 1)

        @if($diff_in_minutes >1440 && $pm_project->deliverable_status == 0)
            <div class="col-md-2 mt-3">
                <button type="button" class="btn btn-primary"  disabled><i class="fas fa-plus"></i> Add Deliverable</button>
            </div>

            <div class="col-md-12 mt-3">
                @if($pm_project->deliverable_status == 0 && $pm_project->reason != null)
                    <h6 class="text-red">You cannot add deliverables as 24 hours have been past since you accepted the project.You have already submitted deliverable time extension request. Please wait for confirmation.</h6>
                @else
                    <h6 class="text-red">You cannot add deliverables as 24 hours have been past since you accepted the project. For authorization to enable the feature <a href="#"  data-toggle="modal" data-target="#deliverableauthorization">click here</a> to send approval request to top management.</h6>
                @endif
            </div>
            @include('projects.modals.deliverableauthorizationmodal')
        @else
            @if($project->authorization_status != 'submitted')
            <div class="row mx-3">
                @if($project->project_challenge == null || $project->project_challenge != "No Challenge" )
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#deliverablesaddModal"><i class="fas fa-plus"></i> Add Deliverable</button>
                @include('projects.modals.clientdeliverableaddmodal')
                @else

                @if ($project->admin_authorization_status == 0)
                    <button type="button" class="btn btn-primary alertAddDeliverable"><i class="fas fa-plus"></i> Add Deliverable</button>
                @else
                    <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#deliverables_info_Modal"><i class="fas fa-plus"></i> Add Deliverable</button>
                    @include('projects.modals.deliverable_info_modal')
                @endif

              @endif

                @php
                    $client_revision = \App\Models\ProjectDeliverablesClientDisagree::where([
                        'project_id' => $project->id,
                        'status' => '0'
                    ])->exists();
                @endphp
                @if($client_revision)
                    <div class="mt-3">
                        <button type="button" class="btn btn-primary"  data-toggle="modal" data-target="#deliverablesClientRevisionModal">
                            <i class="fas fa-plus mr-1"></i>Client Revision
                        </button>
                        @include('projects.modals.clientdeliverablerevisionmodal')
                    </div>
                @endif
            </div>
            @endif
        @endif





   @endif


  @endif
  @if(Auth::user()->role_id == 1)
  <div class="row">
      <div class="col-lg-8 col-10 mt-3 ml-3">
          <button type="button" class="btn btn-primary rounded f-14 p-2 my-3"  data-toggle="modal" data-target="#deliverablesaddModal"><i class="fas fa-plus"></i> Add Deliverable</button>
          @include('projects.modals.clientdeliverableaddmodal')
          @if($pm_project->deliverable_status == 0 && $pm_project->reason != null)
              <button type="button" class="btn btn-success rounded f-14 p-2 my-3"  data-toggle="modal" data-target="#deliverableextensionacceptmodal">
                  <i class="fas fa-check"></i>
                  Extend Time
              </button>
              @include('projects.modals.deliverableextensionacceptmodal')
          @endif
          @if(Auth::user()->role_id == 1 && $project->authorization_status == 'submitted')

              <button class="btn btn-success rounded f-14 p-2 my-3" type="button"  data-toggle="modal" data-target="#deliverablesfinalauthorizationacceptModal" aria-haspopup="true" aria-expanded="false" id="acceptBtn">Authorize</button>
              @include('projects.modals.deliverablefinalauthorizationacceptmodal')
          @endif

      </div>
  </div>
  @endif
  @php
      $qualifiedSale = App\Models\QualifiedSale::where('project_id',$project->id)->first();
    //   dd($qualifiedSale);
  @endphp
    <!-- CARD BODY START -->
    <div class="card-body">


        <div class="d-flex flex-column">
            <div class="d-flex justify-content-between">
                <h4>@lang('Project Deliverables')</h4>

                {{-- <a href="" class="btn btn-primary">See Admin Comment</a>    --}}
            </div>

            <td width="80%">
                <table class="inv-num-date text-dark f-13 mt-3">
                <thead>
                    <tr class="bg-light-grey border-right-0 f-w-500">
                      <th scope="col" class="text-center">#</th>
                      <th scope="col" class="text-center">Type</th>
                      <th scope="col" class="text-center">Title</th>
                      <th scope="col" class="text-center">Milestone</th>
                       <th scope="col" class="text-center">Milestone Cost</th>
                      <th scope="col" class="text-center">Estimation Hours</th>
                      <th scope="col" class="text-center">Quantity</th>
                      <th scope="col" class="text-center">Description</th>
                      <th scope="col" class="text-center">Estimated completion date</th>
                      @if($signature == null)
                      <th scope="col" class="text-center">Action</th>
                      @endif
                    </tr>
                  </thead>
                  <tbody >
                    @forelse($deliverables as $deliverable)
                    <tr {{ $deliverable->status == 0 ? 'class=bg-lightest-grey' : '' }}>
                        <td>{{$loop->index+1}}</td>
                        <td class="text-center icon-container">
                            @php
                                $data = \App\Models\DelivarableColumnEdit::where([
                                    'delivarable_id' => $deliverable->id,
                                    'column_name' => 'type',
                                ])->latest()->first();
                            @endphp
                            @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                            @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                            @endif
                            {{$deliverable->deliverable_type}}
                            @if ($newDeliverable != null && $newDeliverable->contains($deliverable))
                                <span class="badge badge-success">{{ $deliverable->created_at }}</span>
                            @endif
                            @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'type',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_type_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_type_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{$value->column_name}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                        </td>
                        <td class="text-center icon-container">
                            @php
                                $data = \App\Models\DelivarableColumnEdit::where([
                                    'delivarable_id' => $deliverable->id,
                                    'column_name' => 'title',
                                ])->latest()->first();
                            @endphp
                            @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                            @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                            @endif
                            {{$deliverable->title}}
                            @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'title',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{$value->column_name}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                        </td>
                        @if($deliverable->milestone_id != null)
                            <td class="text-center">{{$deliverable->milestone->milestone_title}}</td>
                        @else
                            <td class="text-center">--</td>
                        @endif
                        @if($deliverable->milestone_id != null)
                            <td class="text-center">{{$deliverable->milestone->actual_cost}}{{$currency->currency_symbol}}</td>
                        @else
                            <td class="text-center">--</td>
                        @endif
                        @if($deliverable->estimation_time != null)
                            <td class="text-center icon-container">
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'estimation_time',
                                    ])->latest()->first();
                                @endphp

                                @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                    <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                                @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                    <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                                @endif
                                {{$deliverable->estimation_time}} hours
                                @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'estimation_time',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_estimation_time_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_estimation_time_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{ucwords(str_replace('_', ' ', $value->column_name))}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                            </td>
                        @else
                            <td class="text-center">--</td>
                        @endif
                        <td class="text-center icon-container">
                            @php
                                $data = \App\Models\DelivarableColumnEdit::where([
                                    'delivarable_id' => $deliverable->id,
                                    'column_name' => 'quantity',
                                ])->latest()->first();
                            @endphp

                            @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                            @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                            @endif
                            {{$deliverable->quantity}}
                            @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'quantity',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{$value->column_name}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                        </td>
                        <td class="text-center icon-container">
                            @php
                                $data = \App\Models\DelivarableColumnEdit::where([
                                    'delivarable_id' => $deliverable->id,
                                    'column_name' => 'description',
                                ])->latest()->first();
                            @endphp
                            @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                            @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                            @endif
                            {!!$deliverable->description!!}
                            @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'description',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_description_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_description_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{$value->column_name}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                        </td>
                        @if($deliverable->to != null)
                            <td class="text-center icon-container">
                                Between {{\Carbon\Carbon::parse($deliverable->from)->format("jS M, Y")}} & {{\Carbon\Carbon::parse($deliverable->to)->format("jS M, Y")}}
                                @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'estimation_completed_date',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_estimation_date_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_estimation_date_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{ucwords(str_replace('_', ' ', $value->column_name))}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                                @endif
                            </td>
                        @else
                            <td class="text-center icon-container">
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'estimation_completed_date',
                                    ])->latest()->first();
                                @endphp

                                @if($data && $data->status == '0' && \Auth::user()->role_id == 4)
                                    <i class="fa fa-lightbulb text-danger" title="Admin request to {{$data->comment}}"></i>
                                @elseif($data && $data->status == '0' && \Auth::user()->role_id == 1)
                                    <i class="fa fa-check-circle show_i_on_top" aria-hidden="true" title="Request for change"></i>
                                @endif
                                On {{\Carbon\Carbon::parse($deliverable->from)->format("jS M, Y")}}
                                @if(\Auth::user()->role_id == 1 || \Auth::user()->role_id = 4)
                                @php
                                    $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'column_name' => 'estimation_completed_date',
                                        'status' => '1'
                                    ])->orderBy('updated_at', 'asc')->get();
                                    $key = 1;
                                @endphp
                                @if($data->count() > 0)
                                    <button type="button" data-toggle="modal" data-target="#old_estimation_date_edited_modal{{$deliverable->id}}">
                                        <div class="show_old_data_modal border px-1 rounded" title="{{$data->count()}} Histories">
                                            {{$data->count()}}<i class="fa fa-history ml-1" aria-hidden="true"></i>
                                        </div>
                                    </button>
                                    <div class="modal fade" id="old_estimation_date_edited_modal{{$deliverable->id}}" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="staticBackdropLabel">Old Histories</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Field</th>
                                                                        <th>Comment</th>
                                                                        <th>Old Data</th>
                                                                        <th>New Data</th>
                                                                        <th>Date</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    @forelse($data as $value)
                                                                        <tr>
                                                                            <td>{{$key++}}</td>
                                                                            <td>{{ucwords(str_replace('_', ' ', $value->column_name))}}</td>
                                                                            <td>{{$value->comment}}</td>
                                                                            <td>
                                                                                <del class="text-danger">{!! $value->old_data !!}</del>
                                                                            </td>
                                                                            <td>{{$value->new_data}}</td>
                                                                            <td>{{$value->updated_at->format('F j, Y h:i A')}}<br>{{$value->updated_at->diffForHumans()}}</td>
                                                                        </tr>
                                                                    @empty
                                                                        <tr>
                                                                            <td colspan="5" class="shadow-none">
                                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                                            </td>
                                                                        </tr>
                                                                    @endforelse
                                                                </tbody>
                                                            </table>
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
                            @endif
                            </td>
                        @endif
                        @if($signature == null)
                        <td class="text-center">
                            <div class="d-flex flex-column mb-3">
                                @if(Auth::user()->role_id == 1 && $project->authorization_status == 'submitted')
                                <a target="_blank" class="btn" href="{{route('deliverables_modification_form', $deliverable->id)}}" style="margin-top: 25px;">
                                    <i class="fa-solid fa-screwdriver-wrench" style="color: black"></i>
                                </a>
                                @endif
                                @php
                                    $checkShowAction = $data = \App\Models\DelivarableColumnEdit::where([
                                        'delivarable_id' => $deliverable->id,
                                        'status' => '0'
                                    ])->first();
                                @endphp
                                @if($project->authorization_status == 'pending' || $checkShowAction && \Auth::user()->role_id == 4)
                                    @if ($deliverable->status == 0)
                                        <button class="btn btn primary" data-toggle="modal" data-target="#deliverableseditModal{{$deliverable->id}}"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn primary deleteDeliverable" data-id="{{ $deliverable->id }}"><i class="fas fa-trash"></i></button>
                                    @endif
                                @elseif(\Auth::user()->role_id == 1)
                                    <button class="btn btn primary" data-toggle="modal" data-target="#deliverableseditModal{{$deliverable->id}}"><i class="fas fa-edit"></i></button>
                                    <button class="btn btn primary deleteDeliverable" data-id="{{ $deliverable->id }}"><i class="fas fa-trash"></i></button>
                                @endif
                            </div>
                            @if($deliverable->authorization == 0 && Auth::user()->role_id == 1)
                            <button class="btn btn-success approve_deliverable" data-id="{{$deliverable->id}}">Approve</button>
                            @endif
                        </td>
                        @endif
                    </tr>
                    @if($signature == null)
                        @include('projects.modals.clientdeliverableeditmodal')
                        @include('projects.modals.clientdeliverabledeletemodal')
                    @endif
                    @empty
                    <tr>
                        No Data
                    </tr>



                    @endforelse






                  </tbody>

              </table>
          </td>



        </div>
        <div class="mt-3">

                    @if ($project->signature)
                           <div class="d-flex flex-column">
                               <h6>@lang('Client Signature')</h6>
                               <img src="{{ $project->signature->signature }}" style="width: 200px;">
                                 <p>{{ $project->signature->full_name }}</p>
                              <p>Date: {{ ($project->signature->created_at)->format('d-m-Y') }}</p>
                           </div>
                       @endif
        </div>






        <div id="signature-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog d-flex justify-content-center align-items-center modal-xl">
                <div class="modal-content">
                    @include('estimates.ajax.accept-estimate')
                </div>
            </div>
        </div>

    </div>
    <!-- CARD BODY END -->
    <!-- CARD FOOTER START -->
    @php
       $status_check= App\Models\PMProject::where('project_id',$project->id)->first();
    @endphp
    @if($status_check->deliverable_status == 1 && $project->deliverable_authorization == 1 && Auth::user()->role_id == 4 || Auth::user()->role_id == 1)
        <div class="card-footer bg-white border-0 d-flex justify-content-start">
            <div class="d-flex">
                <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                    <button class="dropdown-toggle btn-secondary" type="button" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">@lang('app.action')
                        <span><i class="fa fa-chevron-down f-15 text-dark-grey"></i></span>
                    </button>
                    <!-- DROPDOWN - INFORMATION -->
                    <ul class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton" tabindex="0">


                      <?php
                      $url= url('/');
                       ?>
                        <li>
                            <a class="dropdown-item f-14 text-dark"
                                href="{{ route('projects.download', $project->id) }}">
                                <i class="fa fa-download f-w-500 mr-2 f-11"></i> @lang('app.download')
                            </a>
                            <!-- <a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="route('front.agreement', $project->project_short_code)"><i class="fa fa-copy mr-2"></i>Copy Link</a> -->
                              <a class="dropdown-item btn-copy" onclick="copyLink()" data-clipboard-text="{{$url}}/projects/agreement/{{$project->project_short_code}}"><i class="fa fa-copy mr-2"></i>Copy Link</a>
                        </li>
                    </ul>
                </div>
            </div>
            <x-forms.button-cancel :link="route('projects.index')" class="border-0">@lang('app.cancel')</x-forms.button-cancel>
        </div>
    @else
        @php
            $is_has_other = \App\Models\ProjectDeliverable::where([
                'project_id' => $project->id,
                'deliverable_type' => 'Others',
                'authorization' => 0
            ])->exists();
        @endphp
        @if($project->authorization_status == 'pending' && $is_has_other == false)
            @if(count($deliverables) > 0)
                <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">
                    <div class="d-flex">
                        <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                            <button class="dropdown-toggle btn-success text-white" type="button" data-id="{{$project->id}}" id="sendAuthorizationBtn">
                                @lang('Send for Authorization')
                            </button>
                        </div>
                    </div>
                </div>
            @endif
        @elseif($is_has_other == true)
            <div class="row mx-3">
                <p class="text-danger">You have "Other type" delivarable need to approved by admin</p>
            </div>
        @else
            <div class="card-footer bg-white border-0 d-flex justify-content-start py-0 py-lg-4 py-md-4 mb-4 mb-lg-3 mb-md-3 ">
                <div class="d-flex">
                    <div class="inv-action mr-3 mr-lg-3 mr-md-3 dropup">
                        <button disabled class="dropdown-toggle btn-warning" type="button" aria-haspopup="true" aria-expanded="false">
                            @lang('Awaiting for approval')
                        </button>
                    </div>
                </div>
            </div>
        @endif
    @endif


    <!-- CARD FOOTER END -->
</div>
<!-- INVOICE CARD END -->
<!-- SweetAlert -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js"></script>

<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>


<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>


<script type="text/javascript">

    function copyLink(){
        if ($('#window').dialog('isOpen')) {
            $('span.ui-button-icon.ui-icon.ui-icon-minusthick.minusthick').click()
        }
        var clipboard = new ClipboardJS('.btn-copy');

        clipboard.on('success', function(e) {
            Swal.fire({
                icon: 'success',
                text: '@lang("app.copied")',
                toast: true,
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
            })
        });
    }
</script>

<script src="https://cdn.jsdelivr.net/npm/signature_pad@2.3.2/dist/signature_pad.min.js"></script>
<script>
    var canvas = document.getElementById('signature-pad');

    var signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
    });

    document.getElementById('clear-signature').addEventListener('click', function(e) {
        e.preventDefault();
        signaturePad.clear();
    });

    document.getElementById('undo-signature').addEventListener('click', function(e) {
        e.preventDefault();
        var data = signaturePad.toData();
        if (data) {
            data.pop(); // remove the last dot or line
            signaturePad.fromData(data);
        }
    });

    $('#toggle-pad-uploader').click(function() {
        var text = $('.signature').hasClass('d-none') ? '{{ __("modules.estimates.uploadSignature") }}' : '{{ __("app.sign") }}';

        $(this).html(text);

        $('.signature').toggleClass('d-none');
        $('.upload-image').toggleClass('d-none');
    });

    $('#save-signature').click(function() {
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var signature = signaturePad.toDataURL('image/png');
        var image = $('#image').val();

        // this parameter is used for type of signature used and will be used on validation and upload signature image
        var signature_type = !$('.signature').hasClass('d-none') ? 'signature' : 'upload';

        if (signaturePad.isEmpty() && !$('.signature').hasClass('d-none')) {
            Swal.fire({
                icon: 'error',
                text: "{{ __('messages.signatureRequired') }}",

                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            });
            return false;
        }

        $.easyAjax({
            url: "{{ route('projects.sign', $project->id) }}",
            container: '#acceptEstimate',
            type: "POST",
            blockUI: true,
            file: true,
            disableButton: true,
            buttonSelector : '#save-signature',
            data: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                signature: signature,
                image: image,
                signature_type: signature_type,
                _token: '{{ csrf_token() }}'
            },
        })
    });


</script>
<script src="{{ asset('vendor/jquery/dropzone.min.js') }}"></script>
<script>
    $(document).ready(function() {

        if ($('.custom-date-picker').length > 0) {
            datepicker('.custom-date-picker', {
                position: 'bl',
                ...datepickerConfig
            });
        }

        const today = new Date(); // get current date

        const maxDate = new Date('{{ \Carbon\Carbon::parse($project->deadline)->format("Y-m-d") }}');


        const dp1 = datepicker('#from_add', {
            position: 'bl',
            minDate: today > maxDate ? maxDate : today, // set minimum date to current date
            onSelect: (instance, date) => {
              dp2.setMin(date);
            },
            maxDate,
            disabler: date => date.getDay() === 0 || today > maxDate || date > maxDate,
            ...datepickerConfig
        });


        const dp2 = datepicker('#to_add', {
            position: 'bl',
            minDate: today > maxDate ? maxDate : today, // set minimum date to current date
            onSelect: (instance, date) => {
               dp1.setMax(date);
            },
            maxDate,
            disabler: date => date.getDay() === 0 || today > maxDate || date > maxDate,
            ...datepickerConfig
        });
    });
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $('.deleteDeliverable').click(function(e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this item!",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        url: '/projects/delete-deliverables/' + id,
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            'id':id,
                        },
                        success: function(response) {
                            if(response.status==400){
                                swal.fire({
                                    title: 'Deleted!',
                                    text: 'The item has been deleted successfully.',
                                    icon: 'success',
                                }).then(function() {
                                    window.location.reload();
                                });
                            }
                        },
                        error: function(response) {
                            swal.fire({
                                title: 'Error!',
                                text: 'An error occurred while deleting the item.',
                                icon: 'error',
                            });
                        }
                    });
                }
            });
        })
    })
</script>
<script type="text/javascript">
    $(document).ready(function() {
        $('#sendAuthorizationBtn').click(function(e) {
            e.preventDefault();
            var id = $(this).attr('data-id');
            console.log(id);
            Swal.fire({
                title: 'Are You Sure You Want to send approval request?',
                showDenyButton: true,
                confirmButtonText: 'Send',
                denyButtonText: `Cancel`,
            }).then((result) => {
                if (result.isConfirmed) {

                  //  $('#sendAuthorizationBtn').attr('disabled','disabld');
                    $("#sendAuthorizationBtn").attr("disabled", true);
                    $("#sendAuthorizationBtn").html("Processing...");


                    $.ajax({
                        url: '/projects/send-final-authorization-deliverables/' + id,
                        type: 'GET',
                        dataType: 'JSON',
                        data: {
                            '_token': '{{ csrf_token() }}',
                            'id':id,
                        },
                        success: function(response) {
                            if(response.status==400){
                                Swal.fire('Authorization request send Successfully', '', 'success');
                                window.location.reload();
                            }
                        },
                    });
                }else if (result.isDenied) {
                    Swal.fire('Accept authorization are not saved', '', 'info')
                }
            });
        })
    })
</script>
<script>
    $(document).ready(function() {
        $('.approve_deliverable').click(function(e) {
            e.preventDefault();
            Swal.fire({
                icon: 'warning',
                text: '@lang("Are You Sure You Want to Approve this?")',
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText: 'Approve',
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    $(this).text('Processing...');
                    $(this).prop('disabled', true);
                    window.location.href = '/projects/approve-deliverables/'+$(this).attr('data-id');
                }
            })
        })
    })
    $(document).ready(function() {
        $('.alertAddDeliverable').click(function(e) {
            e.preventDefault();
            Swal.fire("Project challenge authorization is not done yet. Please check this out with your reporting boss");
        })
    })
</script>
