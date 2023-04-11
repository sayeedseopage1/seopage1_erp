@extends('layouts.app')
@push('datatable-styles')
    @include('sections.daterange_css')
@endpush
@push('styles')
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
        <link rel="stylesheet" href="{{ asset('vendor/full-calendar/main.min.css') }}">
    @endif
    <style>
        .h-200 {
            max-height: 340px;
            overflow-y: auto;
        }

        .dashboard-settings {
            width: 600px;
        }

        @media (max-width: 768px) {
            .dashboard-settings {
                width: 300px;
            }
        }

        .fc-list-event-graphic{
            display: none;
        }

        .fc .fc-list-event:hover td{
            background-color: #fff !important;
            color:#000 !important;
        }
        .left-3{
            margin-right: -22px;
        }
        .clockin-right{
            margin-right: -10px;
        }

        .week-pagination li {
            margin-right: 5px;
            z-index: 1;
        }
        .week-pagination li a {
            border-radius: 50%;
            padding: 2px 6px !important;
            font-size: 11px !important;
        }

        .week-pagination li.page-item:first-child .page-link {
            border-top-left-radius: 50%;
            border-bottom-left-radius: 50%;
        }

        .week-pagination li.page-item:last-child .page-link {
            border-top-right-radius: 50%;
            border-bottom-right-radius: 50%;
        }
        .hide-calender .table-condensed thead tr:nth-child(2),
        .hide-calender .table-condensed tbody {
            /*            display: none*/
        }
        .hide-calender.daterangepicker {
            width: 320px;
        }
        .hide-calender.monthselect {
            width: 100% !important;
        }
        .line-height-30 {
            line-height: 30px;
        }
    </style>
@endpush
@section('content')
    <div class="px-4 py-2 border-top-0">
        <!-- WELOCOME START -->
        @if (!is_null($checkTodayLeave))
            <div class="row pt-4">
                <div class="col-md-12">
                    <x-alert type="info" icon="info-circle">
                        <a href="{{ route('leaves.show', $checkTodayLeave->id) }}" class="openRightModal text-dark-grey">
                            <u>@lang('messages.youAreOnLeave')</u>
                        </a>
                    </x-alert>
                </div>
            </div>
        @elseif (!is_null($checkTodayHoliday))
            <div class="row pt-4">
                <div class="col-md-12">
                    <x-alert type="info" icon="info-circle">
                        <a href="{{ route('holidays.show', $checkTodayHoliday->id) }}" class="openRightModal text-dark-grey">
                            <u>@lang('messages.holidayToday')</u>
                        </a>
                    </x-alert>
                </div>
            </div>
        @endif

        <div class="d-lg-flex d-md-flex d-block py-4">
            <!-- WELOCOME NAME START -->
            <div>
                <h4 class=" mb-0 f-21 text-capitalize font-weight-bold">@lang('app.welcome')
                    {{ $user->name }}</h4>
            </div>
            <!-- WELOCOME NAME END -->
        </div>
        <div class="emp-dash-detail">
            @if(count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
                <div class="row">
                @if (in_array('profile', $activeWidgets))
                    <!-- EMP DASHBOARD INFO START -->
                        <div class="col-md-12">
                            <div class="card border-0 b-shadow-4 mb-3 e-d-info">
                                <div class="card-horizontal align-items-center">
                                    <div class="card-img">
                                        <img class="" src=" {{ $user->image_url }}" alt="Card image">
                                    </div>
                                    <div class="card-body border-0 pl-0">
                                        <h4 class="card-title f-18 f-w-500 mb-0">{{ mb_ucwords($user->name) }}</h4>
                                        <p class="f-14 font-weight-normal text-dark-grey mb-2">{{ $user->employeeDetails->designation->name ?? '--' }}</p>
                                        <p class="card-text f-12 text-lightest"> @lang('app.employeeId') : {{ mb_strtoupper($user->employeeDetails->employee_id) }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- EMP DASHBOARD INFO END -->
                    @endif
                </div>
            @endif
        </div>
        <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Project Manager (Today's Update)
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body bg-amt-grey">
                        <div class="row my-2 text-center mx-auto">
                            <div class="col-sm-12 pb-3">
                                <div class="fc fc-media-screen fc-direction-ltr fc-theme-standard fc-liquid-hack text-center">
                                    <div class="fc-toolbar-chunk">
                                        <div class="fc-button-group">
                                            <button date-mode="today" class="fc-prev-button fc-button fc-button-primary" type="button" aria-label="prev">
                                                <span class="fc-icon fc-icon-chevron-left"></span>
                                            </button>
                                            <h2 class="fc-toolbar-title mx-3 todayDate"></h2>
                                            <button class="fc-today-button fc-button fc-button-primary" type="button" disabled="">today</button>
                                            <button date-mode="today" class="fc-next-button fc-button fc-button-primary" type="button" aria-label="next">
                                                <span class="fc-icon fc-icon-chevron-right"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="todayHtml">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Projects Deadline Today</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_project_deadline->count()}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Waiting To be Completed</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_milestoe_to_be_completed}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Tasks Under Review (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_tasks_under_review}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_tasks_deadline}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completed Today</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_completed_milestone}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Invoice Created Today</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_invoice_created}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Payment Released Today</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_payment_release}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">QC Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_qc_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Completion Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$today_completion_form_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Projects</h4>
                                            <table class="table w-100">
                                                <thead name="thead">
                                                    <th class="pl-20 text-capitalize"> SL. No</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Project Value</th>
                                                    <th class="pl-20 text-capitalize">Tasks</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Task)</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Payment)</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Progress</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($today_project_status as $value)
                                                    <tr>
                                                        <td>{{$loop->index+1}}</td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->project_budget}} $</td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $completed_task = $value->tasks->where('status', 'completed')->count();
                                                                $total = $value->tasks->count();
                                                                echo '('.$completed_task.' / '.$total.')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                            $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();

                                                            echo '('.$completed_milestones.' / '.$milestones.')'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $totalPaymentComplete = 0;
                                                                foreach($value->milestones as $mil) {
                                                                    $invoice = \App\Models\Invoice::find($mil->invoice_id);
                                                                    if (!is_null($invoice) && $invoice->status == 'paid') {
                                                                        $totalPaymentComplete++;
                                                                    }
                                                                }

                                                                echo '('.$totalPaymentComplete.' / '.$value->milestones->count().')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->start_date->format('Y-m-d')}}</td>
                                                        <td class="pl-20 text-capitalize">{{$value->deadline->format('Y-m-d')}}</td>
                                                        <td>
                                                            @php
                                                                $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                                $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();
                                                                if ($milestones < 1 ) {
                                                                   $completion= 0;
                                                                   $statusColor = 'danger';
                                                                } elseif ($milestones >= 1) {
                                                                    $percentage = round(($completed_milestones/$milestones)*100,2);
                                                                    if($percentage < 50) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'danger';
                                                                    } elseif ($percentage >= 50 && $percentage < 75) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'warning';
                                                                    } elseif($percentage >= 75 && $percentage < 99) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'info';
                                                                    } else {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'success';
                                                                    }
                                                                }

                                                                echo '<div class="progress" style="height: 15px;">
                                                                    <div class="progress-bar f-12 bg-' . $statusColor . '" role="progressbar" style="width: ' . $completion . '%;" aria-valuenow="' . $completion . '" aria-valuemin="0" aria-valuemax="100">' . $completion . '%</div>
                                                                </div>'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            //dd($value);
                                                            $projectStatus = \App\Models\ProjectStatusSetting::all();

                                                            foreach($projectStatus as $status)
                                                            {
                                                                if ($value->status == $status->status_name) {
                                                                    $color = $status->color;
                                                                    echo ' <i class="fa fa-circle mr-1 f-10" style="color:'.$color.'"></i>' .'<span class="text-capitalize">'. ucfirst($status->status_name).'</span>';
                                                                }
                                                            }
                                                            @endphp
                                                        </td>
                                                    </tr>
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Milestones</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Milestone Cost</th>
                                                    <th class="pl-20 text-capitalize">Status (Tasks)</th>
                                                    <th class="pl-20 text-capitalize">Invoice Generated</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($today_project_status as $value)
                                                        @foreach($value->milestones as $milestone)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->milestone_title}}" href="{{route('milestones.show', $milestone->id)}}" target="_blank">{{\Str::limit($milestone->milestone_title, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->project_name)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$milestone->cost}} $</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    ({{$milestone->tasks->where('status', 'tasks')->count()}} / {{$milestone->tasks->count()}})
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice_created == 1)
                                                                        <span class="badge badge-success">Yes</span>
                                                                    @else
                                                                        <span class="badge badge-danger">No</span>
                                                                    @endif
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice)
                                                                        @if($milestone->invoice->status == 'paid')
                                                                            <span class="badge badge-success">Paid</span> 
                                                                        @else
                                                                            <span class="badge badge-danger">Unpaid</span>
                                                                        @endif
                                                                    @else
                                                                        <span class="badge badge-warning">N/A</span>
                                                                    @endif
                                                                    
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Tasks</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Task</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Assign To</th>
                                                    <th class="pl-20 text-capitalize">Estimated Time</th>
                                                    <th class="pl-20 text-capitalize">Hours Logged</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($today_project_status as $value)
                                                        @foreach($value->tasks as $task)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->heading}}" href="{{route('tasks.show', $task->id)}}" target="_blank">{{\Str::limit($task->heading, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->milestone_title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=milestone" target="_blank">{{\Str::limit($task->milestone->milestone_title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($task->milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name ?? 'N/A'}}" href="{{route('clients.show', $value->client_id ?? 0)}}" target="_blank">{{\Str::limit($value->client->name ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$task->start_date->format('Y-m-d') ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">{{$task->due_date->format('Y-m-d') ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;
                                                                        if (count($row->users) == 0) {
                                                                            return '--';
                                                                        }

                                                                        $members = '<div class="position-relative">';

                                                                        foreach ($row->users as $key => $member) {
                                                                            if ($key < 4) {
                                                                                $img = '<img data-toggle="tooltip" data-original-title="' . mb_ucwords($member->name) . '" src="' . $member->image_url . '">';
                                                                                $position = $key > 0 ? 'position-absolute' : '';

                                                                                $members .= '<div class="taskEmployeeImg rounded-circle '.$position.'" style="left:  '. ($key * 13) . 'px"><a href="' . route('employees.show', $member->id) . '">' . $img . '</a></div> ';
                                                                            }
                                                                        }

                                                                        if (count($row->users) > 4) {
                                                                            $members .= '<div class="taskEmployeeImg more-user-count text-center rounded-circle border bg-amt-grey position-absolute" style="left:  '. (($key - 1) * 13) . 'px"><a href="' .  route('tasks.show', [$row->id]). '" class="text-dark f-10">+' . (count($row->users) - 4) . '</a></div> ';
                                                                        }

                                                                        $members .= '</div>';

                                                                        echo $members;
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $totalHours = $task->estimate_hours;
                                                                        $totalMinutes = $task->estimate_minutes;
                                                                        
                                                                        $tasks = $task->subtasks;
                                                                        
                                                                        foreach($tasks as $value) {
                                                                            $countTask = \App\Models\Task::where('subtask_id', $value->id)->first();
                                                                            $totalHours = $totalHours + $countTask->estimate_hours;
                                                                            $totalMinutes = $totalMinutes + $countTask->estimate_minutes;
                                                                        }

                                                                        if ($totalMinutes >= 60) {
                                                                            $hours = intval(floor($totalMinutes / 60));
                                                                            $minutes = $totalMinutes % 60;
                                                                            $totalHours = $totalHours + $hours;
                                                                            $totalMinutes = $minutes;
                                                                        }

                                                                        if ($totalHours == 0 && $totalMinutes == 0) {
                                                                            echo '---';
                                                                        } else {
                                                                            echo $totalHours.' hrs '.$totalMinutes.' mins';
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;   
                                                                        $timeLog = '--';
                                                
                                                                        if($row->timeLogged) {
                                                                            $totalMinutes = $row->timeLogged->sum('total_minutes');

                                                                            foreach($row->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                            
                                                                            $breakMinutes = $row->breakMinutes();
                                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                                            }
                                                                        }

                                                                        $tas_id = \App\Models\Task::where('id',$row->id)->first();
                                                                        $subtasks = \App\Models\Subtask::where('task_id', $tas_id->id)->get();

                                                                        //$time = 0;

                                                                        foreach ($subtasks as $subtask) {
                                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                                            $totalMinutes = $totalMinutes + $task->timeLogged->sum('total_minutes');
                                                                            
                                                                            foreach($task->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                        }

                                                                        if($subtasks == null) {
                                                                            echo $timeLog;
                                                                        } else {
                                                                            $timeL = intdiv(($totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeL .= ($totalMinutes) % 60 . ' ' . __('app.mins');
                                                                            }
                                                                            echo $timeL;
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    <i class="fa fa-circle mr-1 text-yellow" style="color: {{$row->boardColumn->label_color}};"></i>{{$row->boardColumn->column_name}}
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Project Manager ({{\Carbon\Carbon::now()->firstOfMonth()->addDays(20)->toFormattedDateString()}} to {{\Carbon\Carbon::now()->firstOfMonth()->addMonths(1)->addDays(19)->toFormattedDateString()}} Update)
                        </button>
                    </h2>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body bg-amt-grey">
                        <div class="row my-2 text-center mx-auto">
                            <div class="col-sm-12 pb-3">
                                <div class="fc fc-media-screen fc-direction-ltr fc-theme-standard fc-liquid-hack text-center">
                                    <div class="fc-toolbar-chunk">
                                        <div class="fc-button-group">
                                            <button date-mode="month" class="fc-prev-button fc-button fc-button-primary" type="button" aria-label="prev">
                                                <span class="fc-icon fc-icon-chevron-left"></span>
                                            </button>
                                            <h2 class="fc-toolbar-title mx-3 monthDate"></h2>
                                            <button date-mode="month" class="fc-next-button fc-button fc-button-primary" type="button" aria-label="next">
                                                <span class="fc-icon fc-icon-chevron-right"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="monthHtml">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Projects Deadline Of this Month</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_project_deadline->count()}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Waiting To be Completed</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_milestoe_to_be_completed}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Tasks Under Review (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_tasks_under_review}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Of this Month (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_tasks_deadline}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completed Of this Month</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_completed_milestone}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Invoice Created Of this Month</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_invoice_created}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Payment Released Of this Month</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_payment_release}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">QC Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_qc_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Completion Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_completion_form_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Partially Finished Projects</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_partially_finished_project->count()}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_total_milestone_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Released</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_project_milestone->sum('milestone_paid')}} $<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Canceled</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_project_milestone->sum('milestone_cancel_amount')}} $<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">QC Form Pending Approval</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_qc_pending_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Completion Form Pending Approval</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$month_completion_pending_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Projects</h4>
                                            <table class="table w-100">
                                                <thead name="thead">
                                                    <th class="pl-20 text-capitalize"> SL. No</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Project Value</th>
                                                    <th class="pl-20 text-capitalize">Tasks</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Task)</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Payment)</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Actual Completion Date</th>
                                                    <th class="pl-20 text-capitalize">Progress</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($month_project_status as $value)
                                                    <tr>
                                                        <td>{{$loop->index+1}}</td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->project_budget}} $</td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $completed_task = $value->tasks->where('status', 'completed')->count();
                                                                $total = $value->tasks->count();
                                                                echo '('.$completed_task.' / '.$total.')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                            $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();

                                                            echo '('.$completed_milestones.' / '.$milestones.')'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $totalPaymentComplete = 0;
                                                                foreach($value->milestones as $mil) {
                                                                    $invoice = \App\Models\Invoice::find($mil->invoice_id);
                                                                    if (!is_null($invoice) && $invoice->status == 'paid') {
                                                                        $totalPaymentComplete++;
                                                                    }
                                                                }

                                                                echo '('.$totalPaymentComplete.' / '.$value->milestones->count().')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->start_date->format('Y-m-d')}}</td>
                                                        <td class="pl-20 text-capitalize">{{$value->deadline->format('Y-m-d')}}</td>
                                                        <td>
                                                            need fix here
                                                        </td>
                                                        <td>
                                                            @php
                                                                $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                                $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();
                                                                if ($milestones < 1 ) {
                                                                   $completion= 0;
                                                                   $statusColor = 'danger';
                                                                } elseif ($milestones >= 1) {
                                                                    $percentage = round(($completed_milestones/$milestones)*100,2);
                                                                    if($percentage < 50) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'danger';
                                                                    } elseif ($percentage >= 50 && $percentage < 75) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'warning';
                                                                    } elseif($percentage >= 75 && $percentage < 99) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'info';
                                                                    } else {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'success';
                                                                    }
                                                                }

                                                                echo '<div class="progress" style="height: 15px;">
                                                                    <div class="progress-bar f-12 bg-' . $statusColor . '" role="progressbar" style="width: ' . $completion . '%;" aria-valuenow="' . $completion . '" aria-valuemin="0" aria-valuemax="100">' . $completion . '%</div>
                                                                </div>'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            //dd($value);
                                                            $projectStatus = \App\Models\ProjectStatusSetting::all();

                                                            foreach($projectStatus as $status)
                                                            {
                                                                if ($value->status == $status->status_name) {
                                                                    $color = $status->color;
                                                                    echo ' <i class="fa fa-circle mr-1 f-10" style="color:'.$color.'"></i>' .'<span class="text-capitalize">'. ucfirst($status->status_name).'</span>';
                                                                }
                                                            }
                                                            @endphp
                                                        </td>
                                                    </tr>
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Milestones</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Milestone Cost</th>
                                                    <th class="pl-20 text-capitalize">Status (Tasks)</th>
                                                    <th class="pl-20 text-capitalize">Invoice Generated</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($month_project_status as $value)
                                                        @foreach($value->milestones as $milestone)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->milestone_title}}" href="{{route('milestones.show', $milestone->id)}}" target="_blank">{{\Str::limit($milestone->milestone_title, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->project_name)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$milestone->cost}} $</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    ({{$milestone->tasks->where('status', 'tasks')->count()}} / {{$milestone->tasks->count()}})
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice_created == 1)
                                                                        <span class="badge badge-success">Yes</span>
                                                                    @else
                                                                        <span class="badge badge-danger">No</span>
                                                                    @endif
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice)
                                                                        @if($milestone->invoice->status == 'paid')
                                                                            <span class="badge badge-success">Paid</span> 
                                                                        @else
                                                                            <span class="badge badge-danger">Unpaid</span>
                                                                        @endif
                                                                    @else
                                                                        <span class="badge badge-warning">N/A</span>
                                                                    @endif
                                                                    
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Tasks</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Task</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Assign To</th>
                                                    <th class="pl-20 text-capitalize">Estimated Time</th>
                                                    <th class="pl-20 text-capitalize">Hours Logged</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($month_project_status as $value)
                                                        @foreach($value->tasks as $task)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->heading}}" href="{{route('tasks.show', $task->id)}}" target="_blank">{{\Str::limit($task->heading, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->milestone_title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=milestone" target="_blank">{{\Str::limit($task->milestone->milestone_title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($task->milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name ?? 'N/A'}}" href="{{route('clients.show', $value->client_id ?? 0)}}" target="_blank">{{\Str::limit($value->client->name ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$task->start_date ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">{{$task->due_date ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;
                                                                        if (count($row->users) == 0) {
                                                                            return '--';
                                                                        }

                                                                        $members = '<div class="position-relative">';

                                                                        foreach ($row->users as $key => $member) {
                                                                            if ($key < 4) {
                                                                                $img = '<img data-toggle="tooltip" data-original-title="' . mb_ucwords($member->name) . '" src="' . $member->image_url . '">';
                                                                                $position = $key > 0 ? 'position-absolute' : '';

                                                                                $members .= '<div class="taskEmployeeImg rounded-circle '.$position.'" style="left:  '. ($key * 13) . 'px"><a href="' . route('employees.show', $member->id) . '">' . $img . '</a></div> ';
                                                                            }
                                                                        }

                                                                        if (count($row->users) > 4) {
                                                                            $members .= '<div class="taskEmployeeImg more-user-count text-center rounded-circle border bg-amt-grey position-absolute" style="left:  '. (($key - 1) * 13) . 'px"><a href="' .  route('tasks.show', [$row->id]). '" class="text-dark f-10">+' . (count($row->users) - 4) . '</a></div> ';
                                                                        }

                                                                        $members .= '</div>';

                                                                        echo $members;
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $totalHours = $task->estimate_hours;
                                                                        $totalMinutes = $task->estimate_minutes;
                                                                        
                                                                        $tasks = $task->subtasks;
                                                                        
                                                                        foreach($tasks as $value) {
                                                                            $countTask = \App\Models\Task::where('subtask_id', $value->id)->first();
                                                                            $totalHours = $totalHours + $countTask->estimate_hours;
                                                                            $totalMinutes = $totalMinutes + $countTask->estimate_minutes;
                                                                        }

                                                                        if ($totalMinutes >= 60) {
                                                                            $hours = intval(floor($totalMinutes / 60));
                                                                            $minutes = $totalMinutes % 60;
                                                                            $totalHours = $totalHours + $hours;
                                                                            $totalMinutes = $minutes;
                                                                        }

                                                                        if ($totalHours == 0 && $totalMinutes == 0) {
                                                                            echo '---';
                                                                        } else {
                                                                            echo $totalHours.' hrs '.$totalMinutes.' mins';
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;   
                                                                        $timeLog = '--';
                                                
                                                                        if($row->timeLogged) {
                                                                            $totalMinutes = $row->timeLogged->sum('total_minutes');

                                                                            foreach($row->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                            
                                                                            $breakMinutes = $row->breakMinutes();
                                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                                            }
                                                                        }

                                                                        $tas_id = \App\Models\Task::where('id',$row->id)->first();
                                                                        $subtasks = \App\Models\Subtask::where('task_id', $tas_id->id)->get();

                                                                        //$time = 0;

                                                                        foreach ($subtasks as $subtask) {
                                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                                            $totalMinutes = $totalMinutes + $task->timeLogged->sum('total_minutes');
                                                                            
                                                                            foreach($task->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                        }

                                                                        if($subtasks == null) {
                                                                            echo $timeLog;
                                                                        } else {
                                                                            $timeL = intdiv(($totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeL .= ($totalMinutes) % 60 . ' ' . __('app.mins');
                                                                            }
                                                                            echo $timeL;
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    <i class="fa fa-circle mr-1 text-yellow" style="color: {{$row->boardColumn->label_color}};"></i>{{$row->boardColumn->column_name}}
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Project Manager (General View)
                        </button>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body bg-amt-grey">
                        <div class="row">
                            <div class="align-items-center mx-auto h-100 pl-4 ml-5">
                                <div class="col-auto">
                                    <label class="sr-only" for="inlineFormInputGroup"></label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i></div>
                                        </div>
                                        <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange2" placeholder="Start Date And End Date">
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div id="generalHtml">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Projects Deadline Of this Month</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_project_deadline->count()}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Waiting To be Completed</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_milestoe_to_be_completed}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Tasks Under Review (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_tasks_under_review}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline general (Assigned By Me)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_tasks_deadline}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Completed general</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_completed_milestone}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Invoice Created general</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_invoice_created}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Payment Released general</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_payment_release}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">QC Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_qc_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Completion Form (Required Submission)</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_completion_form_required_submission}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Partially Finished Projects</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_partially_finished_project->count()}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Milestone</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_total_milestone_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Released</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_project_milestone->sum('milestone_paid')}} $<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Milestone Canceled</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_project_milestone->sum('milestone_cancel_amount')}} $<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">QC Form Pending Approval</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_qc_pending_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize">
                                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Completion Form Pending Approval</h5>
                                            <div class="d-flex">
                                                <a href="#">
                                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                        {{$general_completion_pending_count}}<span class="f-12 font-weight-normal text-lightest"></span>
                                                    </p>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="d-block">
                                            <i class="fa fa-list text-lightest f-27"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Projects</h4>
                                            <table class="table w-100">
                                                <thead name="thead">
                                                    <th class="pl-20 text-capitalize"> SL. No</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Project Value</th>
                                                    <th class="pl-20 text-capitalize">Tasks</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Task)</th>
                                                    <th class="pl-20 text-capitalize">Milestones (Payment)</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Progress</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($general_project_status as $value)
                                                    <tr>
                                                        <td>{{$loop->index+1}}</td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize ">
                                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->project_budget}} $</td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $completed_task = $value->tasks->where('status', 'completed')->count();
                                                                $total = $value->tasks->count();
                                                                echo '('.$completed_task.' / '.$total.')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                            $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();

                                                            echo '('.$completed_milestones.' / '.$milestones.')'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                                $totalPaymentComplete = 0;
                                                                foreach($value->milestones as $mil) {
                                                                    $invoice = \App\Models\Invoice::find($mil->invoice_id);
                                                                    if (!is_null($invoice) && $invoice->status == 'paid') {
                                                                        $totalPaymentComplete++;
                                                                    }
                                                                }

                                                                echo '('.$totalPaymentComplete.' / '.$value->milestones->count().')';
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">{{$value->start_date->format('Y-m-d')}}</td>
                                                        <td class="pl-20 text-capitalize">{{$value->deadline->format('Y-m-d')}}</td>
                                                        <td>
                                                            @php
                                                                $milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->count();
                                                                $completed_milestones= \App\Models\ProjectMilestone::where('project_id',$value->id)->where('status','complete')->count();
                                                                if ($milestones < 1 ) {
                                                                   $completion= 0;
                                                                   $statusColor = 'danger';
                                                                } elseif ($milestones >= 1) {
                                                                    $percentage = round(($completed_milestones/$milestones)*100,2);
                                                                    if($percentage < 50) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'danger';
                                                                    } elseif ($percentage >= 50 && $percentage < 75) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'warning';
                                                                    } elseif($percentage >= 75 && $percentage < 99) {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'info';
                                                                    } else {
                                                                        $completion= $percentage;
                                                                        $statusColor = 'success';
                                                                    }
                                                                }

                                                                echo '<div class="progress" style="height: 15px;">
                                                                    <div class="progress-bar f-12 bg-' . $statusColor . '" role="progressbar" style="width: ' . $completion . '%;" aria-valuenow="' . $completion . '" aria-valuemin="0" aria-valuemax="100">' . $completion . '%</div>
                                                                </div>'
                                                            @endphp
                                                        </td>
                                                        <td class="pl-20 text-capitalize">
                                                            @php
                                                            //dd($value);
                                                            $projectStatus = \App\Models\ProjectStatusSetting::all();

                                                            foreach($projectStatus as $status)
                                                            {
                                                                if ($value->status == $status->status_name) {
                                                                    $color = $status->color;
                                                                    echo ' <i class="fa fa-circle mr-1 f-10" style="color:'.$color.'"></i>' .'<span class="text-capitalize">'. ucfirst($status->status_name).'</span>';
                                                                }
                                                            }
                                                            @endphp
                                                        </td>
                                                    </tr>
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Milestones</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Milestone Cost</th>
                                                    <th class="pl-20 text-capitalize">Status (Tasks)</th>
                                                    <th class="pl-20 text-capitalize">Invoice Generated</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($general_project_status as $value)
                                                        @foreach($value->milestones as $milestone)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->milestone_title}}" href="{{route('milestones.show', $milestone->id)}}" target="_blank">{{\Str::limit($milestone->milestone_title, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->project_name)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name}}" href="{{route('clients.show', $value->client_id)}}" target="_blank">{{\Str::limit($value->client->name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$milestone->cost}} $</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    ({{$milestone->tasks->where('status', 'tasks')->count()}} / {{$milestone->tasks->count()}})
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice_created == 1)
                                                                        <span class="badge badge-success">Yes</span>
                                                                    @else
                                                                        <span class="badge badge-danger">No</span>
                                                                    @endif
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @if($milestone->invoice)
                                                                        @if($milestone->invoice->status == 'paid')
                                                                            <span class="badge badge-success">Paid</span> 
                                                                        @else
                                                                            <span class="badge badge-danger">Unpaid</span>
                                                                        @endif
                                                                    @else
                                                                        <span class="badge badge-warning">N/A</span>
                                                                    @endif
                                                                    
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                        <div class="d-block text-capitalize w-100 h-200">
                                            <h4 class="f-18 f-w-500 mb-2">Total Tasks</h4>
                                            <table class="table w-100">
                                                <thead>
                                                    <th class="pl-20 text-capitalize">SL. No</th>
                                                    <th class="pl-20 text-capitalize">Task</th>
                                                    <th class="pl-20 text-capitalize">Milestone</th>
                                                    <th class="pl-20 text-capitalize">Deliverable</th>
                                                    <th class="pl-20 text-capitalize">Project</th>
                                                    <th class="pl-20 text-capitalize">Client</th>
                                                    <th class="pl-20 text-capitalize">Start Date</th>
                                                    <th class="pl-20 text-capitalize">Deadline</th>
                                                    <th class="pl-20 text-capitalize">Assign To</th>
                                                    <th class="pl-20 text-capitalize">Estimated Time</th>
                                                    <th class="pl-20 text-capitalize">Hours Logged</th>
                                                    <th class="pl-20 text-capitalize">Status</th>
                                                </thead>
                                                <tbody>
                                                    @forelse($general_project_status as $value)
                                                        @foreach($value->tasks as $task)
                                                            <tr>
                                                                <td>{{$loop->index+1}}</td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->heading}}" href="{{route('tasks.show', $task->id)}}" target="_blank">{{\Str::limit($task->heading, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->milestone_title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=milestone" target="_blank">{{\Str::limit($task->milestone->milestone_title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$task->milestone->deliverables->title ?? 'N/A'}}" href="{{route('projects.show', $value->id)}}?tab=deliverables" target="_blank">{{\Str::limit($task->milestone->deliverables->title ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('projects.show', $value->id)}}" target="_blank">{{\Str::limit($value->project_name, 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize ">
                                                                    <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->client->name ?? 'N/A'}}" href="{{route('clients.show', $value->client_id ?? 0)}}" target="_blank">{{\Str::limit($value->client->name ?? 'N/A', 20, ' ...')}}</a>
                                                                </td>
                                                                <td class="pl-20 text-capitalize">{{$task->start_date ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">{{$task->due_date ?? '---'}}</td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;
                                                                        if (count($row->users) == 0) {
                                                                            return '--';
                                                                        }

                                                                        $members = '<div class="position-relative">';

                                                                        foreach ($row->users as $key => $member) {
                                                                            if ($key < 4) {
                                                                                $img = '<img data-toggle="tooltip" data-original-title="' . mb_ucwords($member->name) . '" src="' . $member->image_url . '">';
                                                                                $position = $key > 0 ? 'position-absolute' : '';

                                                                                $members .= '<div class="taskEmployeeImg rounded-circle '.$position.'" style="left:  '. ($key * 13) . 'px"><a href="' . route('employees.show', $member->id) . '">' . $img . '</a></div> ';
                                                                            }
                                                                        }

                                                                        if (count($row->users) > 4) {
                                                                            $members .= '<div class="taskEmployeeImg more-user-count text-center rounded-circle border bg-amt-grey position-absolute" style="left:  '. (($key - 1) * 13) . 'px"><a href="' .  route('tasks.show', [$row->id]). '" class="text-dark f-10">+' . (count($row->users) - 4) . '</a></div> ';
                                                                        }

                                                                        $members .= '</div>';

                                                                        echo $members;
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $totalHours = $task->estimate_hours;
                                                                        $totalMinutes = $task->estimate_minutes;
                                                                        
                                                                        $tasks = $task->subtasks;
                                                                        
                                                                        foreach($tasks as $value) {
                                                                            $countTask = \App\Models\Task::where('subtask_id', $value->id)->first();
                                                                            $totalHours = $totalHours + $countTask->estimate_hours;
                                                                            $totalMinutes = $totalMinutes + $countTask->estimate_minutes;
                                                                        }

                                                                        if ($totalMinutes >= 60) {
                                                                            $hours = intval(floor($totalMinutes / 60));
                                                                            $minutes = $totalMinutes % 60;
                                                                            $totalHours = $totalHours + $hours;
                                                                            $totalMinutes = $minutes;
                                                                        }

                                                                        if ($totalHours == 0 && $totalMinutes == 0) {
                                                                            echo '---';
                                                                        } else {
                                                                            echo $totalHours.' hrs '.$totalMinutes.' mins';
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    @php
                                                                        $row = $task;   
                                                                        $timeLog = '--';
                                                
                                                                        if($row->timeLogged) {
                                                                            $totalMinutes = $row->timeLogged->sum('total_minutes');

                                                                            foreach($row->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                            
                                                                            $breakMinutes = $row->breakMinutes();
                                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                                            }
                                                                        }

                                                                        $tas_id = \App\Models\Task::where('id',$row->id)->first();
                                                                        $subtasks = \App\Models\Subtask::where('task_id', $tas_id->id)->get();

                                                                        //$time = 0;

                                                                        foreach ($subtasks as $subtask) {
                                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                                            $totalMinutes = $totalMinutes + $task->timeLogged->sum('total_minutes');
                                                                            
                                                                            foreach($task->timeLogged as $value) {
                                                                                if (is_null($value->end_time)) {
                                                                                    $workingTime = $value->start_time->diffInMinutes(\Carbon\Carbon::now());
                                                                                    $totalMinutes = $totalMinutes + $workingTime;
                                                                                }
                                                                            }
                                                                        }

                                                                        if($subtasks == null) {
                                                                            echo $timeLog;
                                                                        } else {
                                                                            $timeL = intdiv(($totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                                            if ($totalMinutes % 60 > 0) {
                                                                                $timeL .= ($totalMinutes) % 60 . ' ' . __('app.mins');
                                                                            }
                                                                            echo $timeL;
                                                                        }
                                                                    @endphp
                                                                </td>
                                                                <td class="pl-20 text-capitalize">
                                                                    <i class="fa fa-circle mr-1 text-yellow" style="color: {{$row->boardColumn->label_color}};"></i>{{$row->boardColumn->column_name}}
                                                                </td>
                                                            </tr>
                                                        @endforeach
                                                    @empty
                                                        <tr>
                                                            <td colspan="12" class="shadow-none">
                                                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                            </td>
                                                        </tr>
                                                    @endforelse
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
        {{--<div class="row">
            <div class="col-md-7">
                <!-- EMP DASHBOARD EVENTS START -->
                @if(Auth::user()->role_id != 4 && Auth::user()->role_id != 7)
                @if (in_array('my_calender', $activeWidgets))
                    <div class="row mt-3">
                        <div class="col-md-12">
                            <x-cards.data :title="__('app.menu.myCalendar')">
                                <div id="calendar"></div>
                                <x-slot name="action">
                                    <div class="dropdown ml-auto calendar-action">
                                        <button id="event-btn" class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle cal-event" type="button"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="fa fa-ellipsis-h"></i>
                                        </button>

                                        <div id="cal-drop" class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-2">
                                            @if(in_array('tasks', user_modules()))
                                            <div class="custom-control custom-checkbox cal-filter">
                                                <input type="checkbox" value="task"
                                                    class="form-check-input filter-check" name="calendar[]"
                                                    id="customCheck1" @if(in_array('task',$event_filter)) checked @endif>
                                                <label
                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                    for="customCheck1">@lang('app.menu.tasks')</label>
                                            </div>
                                            @endif
                                            @if(in_array('events', user_modules()))
                                            <div class="custom-control custom-checkbox cal-filter">
                                                <input type="checkbox" value="events" class="form-check-input filter-check" name="calendar[]" id="customCheck2" @if(in_array('events',$event_filter)) checked @endif>
                                                <label class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap" for="customCheck2">@lang('app.menu.Events')</label>
                                            </div>
                                            @endif
                                            @if(in_array('holidays', user_modules()))
                                            <div class="custom-control custom-checkbox cal-filter">
                                                <input type="checkbox" value="holiday"
                                                    class="form-check-input filter-check" name="calendar[]"
                                                    id="customCheck3" @if(in_array('holiday',$event_filter)) checked @endif>
                                                <label
                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                    for="customCheck3">@lang('app.menu.holiday')</label>
                                            </div>
                                            @endif
                                            @if(in_array('tickets', user_modules()))
                                            <div class="custom-control custom-checkbox cal-filter">
                                                <input type="checkbox" value="tickets"
                                                    class="form-check-input filter-check" name="calendar[]"
                                                    id="customCheck4" @if(in_array('tickets',$event_filter)) checked @endif>
                                                <label
                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                    for="customCheck4">@lang('app.menu.tickets')</label>
                                            </div>
                                            @endif
                                            @if(in_array('leaves', user_modules()))
                                            <div class="custom-control custom-checkbox cal-filter">
                                                <input type="checkbox" value="leaves"
                                                    class="form-check-input filter-check" name="calendar[]"
                                                    id="customCheck5" @if(in_array('leaves',$event_filter)) checked @endif>
                                                <label
                                                    class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                    for="customCheck5">@lang('app.menu.leaves')</label>
                                            </div>
                                            @endif
                                        </div>
                                    </div>
                                </x-slot>
                            </x-cards.data>
                        </div>
                    </div>
                @endif
                @endif
                <!-- EMP DASHBOARD EVENTS END -->
            </div>
            <div class="col-md-5">
                @if (in_array('notices', $activeWidgets))
                    @isset($notices)
                        <!-- EMP DASHBOARD NOTICE START -->
                        <div class="col-md-12">
                            <div class="mb-3 b-shadow-4 rounded bg-white pb-2">
                                <!-- NOTICE HEADING START -->
                                <div class="d-flex align-items-center b-shadow-4 p-20">
                                    <p class="mb-0 f-18 f-w-500"> @lang('app.menu.notices') </p>
                                </div>
                                <!-- NOTICE HEADING END -->
                                <!-- NOTICE DETAIL START -->
                                <div class="b-shadow-4 cal-info scroll ps" data-menu-vertical="1" data-menu-scroll="1"
                                    data-menu-dropdown-timeout="500" id="empDashNotice" style="overflow: hidden;">


                                    @foreach ($notices as $notice)
                                        <div class="card border-0 b-shadow-4 p-20 rounded-0">
                                            <div class="card-horizontal">
                                                <div class="card-header m-0 p-0 bg-white rounded">
                                                    <x-date-badge :month="$notice->created_at->format('M')" :date="$notice->created_at
                                                        ->timezone(global_setting()->timezone)
                                                        ->format('d')" />
                                                </div>
                                                <div class="card-body border-0 p-0 ml-3">
                                                    <h4 class="card-title f-14 font-weight-normal text-capitalize mb-0">
                                                        <a href="{{ route('notices.show', $notice->id) }}"
                                                            class="openRightModal text-darkest-grey">{{ $notice->heading }}</a>
                                                    </h4>
                                                </div>
                                            </div>
                                        </div><!-- card end -->
                                    @endforeach


                                    <div class="ps__rail-x" style="left: 0px; top: 0px;">
                                        <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                                    </div>
                                    <div class="ps__rail-y" style="top: 0px; left: 0px;">
                                        <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                                    </div>
                                </div>
                                <!-- NOTICE DETAIL END -->
                            </div>
                        </div>
                        <!-- EMP DASHBOARD NOTICE END -->
                    @endisset
                @endif
                @if (!is_null($myActiveTimer))
                    <div class="col-sm-12" id="myActiveTimerSection">
                        <x-cards.data :title="__('modules.timeLogs.myActiveTimer')">
                            <div class="row">
                                <div class="col-sm-12">
                                    {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format('M d, Y' . ' - ' . global_setting()->time_format) }}
                                    <p class="text-primary my-2">
                                        @php
                                            $endTime = now();
                                            $totalHours = $endTime->diff($myActiveTimer->start_time)->format('%d') * 24 + $endTime->diff($myActiveTimer->start_time)->format('%H');
                                            $totalMinutes = $totalHours * 60 + $endTime->diff($myActiveTimer->start_time)->format('%i');

                                            $totalMinutes = $totalMinutes - $myActiveTimer->breaks->sum('total_minutes');

                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                            if ($totalMinutes % 60 > 0) {
                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                            }
                                        @endphp

                                        <strong>@lang('modules.timeLogs.totalHours'):</strong> {{ $timeLog }}
                                    </p>

                                    <ul class="list-group">
                                        <li
                                            class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                            <span><i class="fa fa-clock"></i>
                                                @lang('modules.timeLogs.startTime')</span>
                                            {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                        </li>
                                        <li
                                            class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                            <span><i class="fa fa-briefcase"></i> @lang('app.task')</span>
                                            <a href="{{ route('tasks.show', $myActiveTimer->task->id) }}"
                                                class="text-dark-grey openRightModal">{{ $myActiveTimer->task->heading }}</a>
                                        </li>
                                        @foreach ($myActiveTimer->breaks as $item)
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                                @if (!is_null($item->end_time))
                                                    @php
                                                        $endTime = $item->end_time;
                                                        $totalHours = $endTime->diff($item->start_time)->format('%d') * 24 + $endTime->diff($item->start_time)->format('%H');
                                                        $totalMinutes = $totalHours * 60 + $endTime->diff($item->start_time)->format('%i');

                                                        $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                        if ($totalMinutes % 60 > 0) {
                                                            $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                        }
                                                    @endphp
                                                    <span><i class="fa fa-mug-hot"></i>
                                                        @lang('modules.timeLogs.break')
                                                        ({{ $timeLog }})
                                                    </span>
                                                    {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) . ' - ' . $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                                @else
                                                    <span><i class="fa fa-mug-hot"></i>
                                                        @lang('modules.timeLogs.break')</span>
                                                    {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                                @endif
                                            </li>
                                        @endforeach
                                    </ul>

                                </div>
                                <div class="col-sm-12 pt-3 text-right">
                                    @if ($editTimelogPermission == 'all' || ($editTimelogPermission == 'added' && $myActiveTimer->added_by == user()->id) || ($editTimelogPermission == 'owned' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id)) || ($editTimelogPermission == 'both' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id || $myActiveTimer->added_by == user()->id)))
                                        @if (is_null($myActiveTimer->activeBreak))
                                            <x-forms.button-secondary icon="pause-circle"
                                                data-time-id="{{ $myActiveTimer->id }}" id="pause-timer-btn">
                                                @lang('modules.timeLogs.pauseTimer')</x-forms.button-secondary>
                                            <x-forms.button-primary class="ml-3 stop-active-timer"
                                                data-time-id="{{ $myActiveTimer->id }}" icon="stop-circle">
                                                @lang('modules.timeLogs.stopTimer')</x-forms.button-primary>
                                        @else
                                            <x-forms.button-primary id="resume-timer-btn" icon="play-circle"
                                                data-time-id="{{ $myActiveTimer->activeBreak->id }}">
                                                @lang('modules.timeLogs.resumeTimer')</x-forms.button-primary>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </x-cards.data>
                    </div>
                @endif
            </div>
        </div>--}}
    </div>
@endsection
@push('scripts')
    <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
    <script type="text/javascript">
        @php
            $startDate = \Carbon\Carbon::now()->startOfMonth()->subMonths(1)->addDays(20);
            $endDate = \Carbon\Carbon::now()->startOfMonth()->addDays(20);
        @endphp
        $(function() {
            var format = '{{ global_setting()->moment_format }}';
            var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
            var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
            var picker = $('#datatableRange2');
            var start = moment(startDate, format);
            var end = moment(endDate, format);

            function cb(start, end) {
                $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                    ' @lang("app.to") ' + end.format( '{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange2').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig,
                opens: 'left',
                parentEl: '.dashboard-header'
            }, cb);

            $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                showTable();
            });
        });
    </script>
    <script type="text/javascript">
        $(".dashboard-header").on("click", ".ajax-tab", function(event) {
            event.preventDefault();


            var dateRangePicker = $('#datatableRange2').data('daterangepicker');
            var startDate = $('#datatableRange').val();

            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            const requestUrl = this.href;
            //alert(requestUrl);

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard",
                historyPush: true,
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#emp-dashboard').html(response.html);
                        init('#emp-dashboard');
                    }
                }
            });
            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard2",
                historyPush: true,
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {
                    if (response.status == "success") {
                        $('#emp-dashboard2').html(response.html);
                        init('#emp-dashboard2');
                    }
                }
            });
        });

        function showTable() {
            var dateRangePicker = $('#datatableRange2').data('daterangepicker');
            var startDate = $('#datatableRange').val();
            if (startDate == '') {
                startDate = null;
                endDate = null;
            } else {
                startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
            }

            const requestUrl = this.href;


            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard",
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {

                    if (response.status == "success") {

                        $('#emp-dashboard').html(response.html);

                        init('#emp-dashboard');
                    }
                }
            });
            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#emp-dashboard2",
                data: {
                    startDate: startDate,
                    endDate: endDate
                },
                blockUI: true,
                success: function(response) {

                    if (response.status == "success") {

                        $('#emp-dashboard2').html(response.html2);

                        init('#emp-dashboard2');

                    }
                }
            });
        }
    </script>
    @if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
        <script src="{{ asset('vendor/full-calendar/main.min.js') }}"></script>
        <script src="{{ asset('vendor/full-calendar/locales-all.min.js') }}"></script>
        <script>

            var initialLocaleCode = '{{ user()->locale }}';
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                locale: initialLocaleCode,
                timeZone: '{{ global_setting()->timezone }}',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                navLinks: true, // can click day/week names to navigate views
                selectable: false,
                initialView: 'listWeek',
                selectMirror: true,
                select: function(arg) {
                    addEventModal(arg.start, arg.end, arg.allDay);
                    calendar.unselect()
                },
                eventClick: function(arg) {
                    getEventDetail(arg.event.id,arg.event.extendedProps.event_type);
                },
                editable: false,
                dayMaxEvents: true, // allow "more" link when too many events
                events: {
                    url: "{{ route('dashboard.private_calendar') }}",
                },
                eventDidMount: function(info) {
                    $(info.el).css('background-color', info.event.extendedProps.bg_color);
                    $(info.el).css('color', info.event.extendedProps.color);
                    $(info.el).find('td.fc-list-event-title').prepend('<i class="fa '+info.event.extendedProps.icon+'"></i>&nbsp;&nbsp;');
                    // tooltip for leaves
                    if(info.event.extendedProps.event_type == 'leave'){
                        $(info.el).find('td.fc-list-event-title > a').css('cursor','default'); // list view cursor for leave
                        $(info.el).css('cursor','default')
                        $(info.el).tooltip({
                            title: info.event.extendedProps.name,
                            container: 'body',
                            delay: { "show": 50, "hide": 50 }
                        });
                    }
                },
                eventTimeFormat: { // like '14:30:00'
                    hour: global_setting.time_format == 'H:i' ? '2-digit' : 'numeric',
                    minute: '2-digit',
                    meridiem: global_setting.time_format == 'H:i' ? false : true
                }
            });

            calendar.render();

            // Task Detail show in sidebar
            var getEventDetail = function(id,type) {
                if(type == 'ticket')
                {
                    var url = "{{ route('tickets.show', ':id') }}";
                    url = url.replace(':id', id);
                    window.location = url;
                    return true;
                }

                if(type == 'leave')
                {
                    return true;
                }

                openTaskDetail();

                switch (type) {
                    case 'task':
                        var url = "{{ route('tasks.show', ':id') }}";
                        break;
                    case 'event':
                        var url = "{{ route('events.show', ':id') }}";
                        break;
                    case 'holiday':
                        var url = "{{ route('holidays.show', ':id') }}";
                        break;
                    case 'leave':
                        var url = "{{ route('leaves.show', ':id') }}";
                        break;
                    default:
                        return 0;
                        break;
                }

                url = url.replace(':id', id);

                $.easyAjax({
                    url: url,
                    blockUI: true,
                    container: RIGHT_MODAL,
                    historyPush: true,
                    success: function(response) {
                        if (response.status == "success") {
                            $(RIGHT_MODAL_CONTENT).html(response.html);
                            $(RIGHT_MODAL_TITLE).html(response.title);
                        }
                    },
                    error: function(request, status, error) {
                        if (request.status == 403) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">403 | Permission Denied</div>'
                            );
                        } else if (request.status == 404) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">404 | Not Found</div>'
                            );
                        } else if (request.status == 500) {
                            $(RIGHT_MODAL_CONTENT).html(
                                '<div class="align-content-between d-flex justify-content-center mt-105 f-21">500 | Something Went Wrong</div>'
                            );
                        }
                    }
                });

            };

            // calendar filter
            var hideDropdown = false;

            $('#event-btn').click(function(){
                if(hideDropdown == true)
                {
                    $('#cal-drop').hide();
                    hideDropdown = false;
                }
                else
                {
                    $('#cal-drop').toggle();
                    hideDropdown = true;
                }
            });


            $(document).mouseup(e => {

                const $menu = $('.calendar-action');

                if (!$menu.is(e.target) && $menu.has(e.target).length === 0)
                {
                    hideDropdown = false;
                    $('#cal-drop').hide();
                }
            });


            $('.cal-filter').on('click', function() {

                var filter = [];

                $('.filter-check:checked').each(function() {
                    filter.push($(this).val());
                });

                if(filter.length < 1){
                    filter.push('None');
                }

                calendar.removeAllEventSources();
                calendar.addEventSource({
                    url: "{{ route('dashboard.private_calendar') }}",
                    extraParams: {
                        filter: filter
                    }
                });

                filter = null;
            });
        </script>
    @endif

    <script>
        $('#save-dashboard-widget').click(function() {
            $.easyAjax({
                url: "{{ route('dashboard.widget', 'private-dashboard') }}",
                container: '#privateDashboardWidgetForm',
                blockUI: true,
                type: "POST",
                redirect: true,
                data: $('#privateDashboardWidgetForm').serialize(),
                success: function() {
                    window.location.reload();
                }
            })
        });

        $('#clock-in').click(function() {
            const url = "{{ route('attendances.clock_in_modal') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('.request-shift-change').click(function() {
            var id = $(this).data('shift-schedule-id');
            var url = "{{ route('shifts-change.edit', ':id') }}";
            url = url.replace(':id', id);

            $(MODAL_DEFAULT + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_DEFAULT, url);
        });

        $('#view-shifts').click(function() {
            const url = "{{ route('employee-shifts.index') }}";
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        /** clock timer start here */
        function currentTime() {
            let date = new Date();
            date = moment.tz(date, "{{ global_setting()->timezone }}");

            let hour = date.hour();
            let min = date.minutes();
            let sec = date.seconds();
            let midday = "AM";
            midday = (hour >= 12) ? "PM" : "AM";
            @if (global_setting()->time_format == 'h:i A')
                hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12) : hour); /* assigning hour in 12-hour format */
            @endif
                hour = updateTime(hour);
            min = updateTime(min);
            document.getElementById("clock").innerText = `${hour} : ${min} ${midday}`
            const time = setTimeout(function() {
                currentTime()
            }, 1000);
        }

        /* appending 0 before time elements if less than 10 */
        function updateTime(timer) {
            if (timer < 10) {
                return "0" + timer;
            } else {
                return timer;
            }
        }

        @if (!is_null($currentClockIn))
        $('#clock-out').click(function() {

            var token = "{{ csrf_token() }}";
            var currentLatitude = document.getElementById("current-latitude").value;
            var currentLongitude = document.getElementById("current-longitude").value;

            $.easyAjax({
                url: "{{ route('attendances.update_clock_in') }}",
                type: "GET",
                data: {
                    currentLatitude: currentLatitude,
                    currentLongitude: currentLongitude,
                    _token: token,
                    id: '{{ $currentClockIn->id }}'
                },
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            });
        });
        @endif

        $('.keep-open .dropdown-menu').on({
            "click": function(e) {
                e.stopPropagation();
            }
        });

        $('#weekly-timelogs').on('click', '.week-timelog-day', function() {
            var date = $(this).data('date');

            $.easyAjax({
                url: "{{ route('dashboard.week_timelog') }}",
                container: '#weekly-timelogs',
                blockUI: true,
                type: "POST",
                redirect: true,
                data: {
                    'date': date,
                    '_token': "{{ csrf_token() }}"
                },
                success: function(response) {
                    $('#weekly-timelogs').html(response.html)
                }
            })
        });

    </script>
        <script>
        $(document).ready(function() {
            var todayDate = moment();
            var monthDate = moment();
            
            $('.todayDate').text(todayDate.format('dddd LL'));

            var todayOnlyDate = moment(todayDate).format('DD');
            if (todayOnlyDate > 21) {
                $('.monthDate').text('21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
            } else {
                $('.monthDate').text('21st ' + moment(monthDate).subtract(1, 'month').format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(20, 'day').format('MMMM, YYYY'));
            }

            $('.fc-prev-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    monthDate = moment(monthDate).subtract(1, 'month');
                    $(this).next().text('21st ' + moment(monthDate).format('MMMM, YYYY')+ ' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                    date = monthDate
                } else {
                    todayDate = moment(todayDate).subtract(1, 'days');
                    $(this).next().text(todayDate.format('dddd LL'));
                    date = todayDate
                }

                getData(mode, $(this), date);
            });

            $('.fc-next-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    monthDate = moment(monthDate).add(1, 'month');
                    $(this).prev().text('21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
                    date = monthDate
                } else {
                    todayDate = moment(todayDate).add(1, 'days');
                    $(this).prev().prev().text(todayDate.format('dddd LL'));
                    date = todayDate
                }
                
                getData(mode, $(this), date);
            });
        });

        function getData(mode, disableButton, date) {
            $.easyAjax({
                url: this.href,
                type: "GET",
                disableButton: true,
                buttonSelector: disableButton,
                data: {
                    mode: mode,
                    startDate: date.format('YYYY-MM-DD'),
                },
                success: function(resp) {
                    $('#'+mode+'Html').html(resp.html);
                }
            })
        }

        @php
            $startDate = \Carbon\Carbon::now()->startOfMonth();
            $endDate = \Carbon\Carbon::now();
        @endphp
        $(function() {
            var format = '{{ global_setting()->moment_format }}';
            var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
            var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
            var picker = $('#datatableRange2');
            var start = moment(startDate, format);
            var end = moment(endDate, format);

            function cb(start, end) {
                $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                    ' @lang("app.to") ' + end.format( '{{ global_setting()->moment_date_format }}'));
                $('#reset-filters').removeClass('d-none');
            }

            $('#datatableRange2').daterangepicker({
                locale: daterangeLocale,
                linkedCalendars: false,
                startDate: start,
                endDate: end,
                ranges: daterangeConfig,
                opens: 'left',
                parentEl: '.dashboard-header'
            }, cb);

            $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
                showTable();
            });

            function showTable() {
                var dateRangePicker = $('#datatableRange2').data('daterangepicker');
                var startDate = $('#datatableRange').val();
                if (startDate == '') {
                    startDate = null;
                    endDate = null;
                } else {
                    startDate = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
                    endDate = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
                }

                const requestUrl = this.href;


                $.easyAjax({
                    url: requestUrl,
                    blockUI: true,
                    data: {
                        startDate: startDate,
                        endDate: endDate,
                        mode: 'general'
                    },
                    blockUI: true,
                    success: function(resp) {
                        if (resp.status == "success") {
                            $('#generalHtml').html(resp.html)
                        }
                    }
                });
            }
        });
    </script>

    @if (attendance_setting()->radius_check == 'yes' || attendance_setting()->save_current_location)
        <script>
            var currentLatitude = document.getElementById("current-latitude");
            var currentLongitude = document.getElementById("current-longitude");
            var x = document.getElementById("current-latitude");

            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);
                } else {
                    // x.innerHTML = "Geolocation is not supported by this browser.";
                }
            }

            function showPosition(position) {
                currentLatitude.value = position.coords.latitude;
                currentLongitude.value = position.coords.longitude;
            }
            getLocation();

        </script>
    @endif
@endpush



