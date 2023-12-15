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
        .history-color {
    color: /* Your color value here */;
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

        <!-- CLOCK IN CLOCK OUT START -->
        @if(Auth::user()->role_id == 4 || Auth::user()->role_id == 7)
        <div class="align-items-center border-left-grey border-left-grey-sm-0 h-100 pl-4 ml-5">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup"></label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">  <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i></div>
                    </div>
                    <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange2" placeholder="Start Date And End Date">
               </div>
            </div>
        </div>
        @endif
        <!-- CLOCK IN CLOCK OUT END -->
        <!-- User check in checkout button -->
            <div id="employee-check-in-out-button" class="ml-auto d-flex clock-in-out mb-3 mb-lg-0 mb-md-0 m mt-4 mt-lg-0 mt-md-0 justify-content-between"></div>
    </div>
    <div class="emp-dash-detail">
        @if(count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
            @if(Auth::user()->role_id != 4 && Auth::user()->role_id != 7)
           
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
        @endif

    </div>
    <div class="select-box d-flex border-right-grey border-right-grey-sm-0 mb-3 ml-auto">
        <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">@lang('app.date')</p>
        <div class="select-status d-flex">
            <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                id="datatableRange2" placeholder="@lang('placeholders.dateRange')">
        </div>
    </div>
    
        {{-- <div class="card">
            <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Developer (Today's Update)
                    </button>
                </h2>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
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
                        <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
                            <div class="col-md-6">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="col-10 d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today</h5>
                                        <div class="d-flex justify-content-between">
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayDeadLineTasks->count()}}</p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-2 d-block text-right">
                                        <i class="fa fa-list text-lightest f-27"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Assigned To Me Today</h5>
                                        <div class="d-flex">
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayStartTasks->count()}}</p>
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
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Task Deadline Today (Assigned To Me)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>SL. No.</th>
                                                <th>Task Name</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                                <th>Project Manager</th>
                                                <th>Project Deadline</th>
                                            </thead>
                                            <tbody>
                                                @php $index = 0 @endphp
                                                @forelse($todayDeadLineTasks as $value)
                                                <tr>
                                                    <td>{{$index +1}}</td>
                                                    <td><a href="{{route('tasks.show', $value->task_id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
                                                    <td>{{$value->start_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} Hours</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                    <a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a>
                                                        @else
                                                        --
                                                        @endif

                                                </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                    {{$value->project->deadline}}
                                                    @else
                                                    --
                                                    @endif
                                                </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="8" class="shadow-none">
                                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                    </td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Task Deadline Today (Assigned To Me)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>SL. No.</th>
                                                <th>Task Name</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                                <th>Project Manager</th>
                                                <th>Project Deadline</th>
                                            </thead>
                                            <tbody>
                                                @php $index = 0 @endphp
                                                @forelse($todayStartTasks as $value)
                                                <tr>
                                                    <td>{{$index +1}}</td>
                                                    <td><a href="{{route('tasks.show', $value->task_id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
                                                    <td>{{$value->start_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} Hours</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                    <a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a>
                                                    @else
                                                    --
                                                    @endif
                                                </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                    {{$value->project->deadline}}
                                                        @else
                                                        --
                                                        @endif
                                                </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="8" class="shadow-none">
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
                        Developer Monthly Cycle Update (21st - 20th)
                    </button>
                </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
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
                        <h4>Total Tasks (Status wise)</h4>
                        <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
                            <div class="col-md-4">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">To Do</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$monthlyToDo->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
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
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Doing</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$monthlyDoing->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
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
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Overdue</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$monthlyOverdue->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
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
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Under Review</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$monthlyUnderReview->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-block">
                                        <i class="fa fa-list text-lightest f-27"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="w-100 d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 text-darkest-grey">Reviews</h5>
                                        <div class="d-flex justify-content-between">
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 text-center">{{$monthlyPositiveRating}}
                                                    <span class="f-12 font-weight-normal text-lightest">Positive Review</span>
                                                </p>
                                            </a>
                                            <div class="col-md-4 mx-auto">
                                                <div class="text-center px-2 border border-danger rounded f-15 f-w-500">Avarage Rating<br>
                                                    @php
                                                        $totalRating = $monthlyTasks->sum('totalRating');
                                                        //dd($totalRating, $monthlyTasks->count());
                                                        $avgRating = 0;
                                                        if($totalRating > 0) {
                                                            $avgRating = round($totalRating / $monthlyTasks->count(), 2);
                                                        }
                                                    @endphp
                                                    @if($avgRating <= 5 && $avgRating >= 4)
                                                        <span class="text-success mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @elseif($avgRating <= 4 && $avgRating >= 3)
                                                        <span class="text-warning mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @elseif($avgRating <= 3)
                                                        <span class="text-danger mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @else
                                                        <span class="text-danger mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @endif
                                                </div>
                                            </div>
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-red d-grid text-center">{{$monthlyNegativeRating}}
                                                    <span class="f-12 font-weight-normal text-lightest">Negative Review</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (To Do)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($monthlyToDo as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                        @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif

                                                    </td>
                                                    <td>
                                                        <span class="text-primary">
                                                            @if($value->project_id != null)

                                                        {{$value->project->client->name}}
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif

                                                    </span>
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
                                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                    </td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Doing)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($monthlyDoing as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                        @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --

                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
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
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Overdue)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($monthlyOverdue as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                        @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif

                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
                                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                    </td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Under Review)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($monthlyUnderReview as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
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

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingThree">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Developer (General View)
                    </button>
                </h2>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
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
                        <h4>Total Tasks (Status wise)</h4>
                        <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
                            <div class="col-md-3">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">To Do</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$yearlyToDo->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-block">
                                        <i class="fa fa-list text-lightest f-27"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Doing</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$yearlyDoing->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-block">
                                        <i class="fa fa-list text-lightest f-27"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Overdue</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$yearlyOverdue->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-block">
                                        <i class="fa fa-list text-lightest f-27"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Under Review</h5>
                                        <div class="d-flex">
                                            <a href="#">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{$yearlyUnderReview->count()}}
                                                    <span class="f-12 font-weight-normal text-lightest"></span>
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
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (To Do)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($yearlyToDo as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
                                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                    </td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Doing)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($yearlyDoing as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
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
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Overdue)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($yearlyOverdue as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
                                                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                                                    </td>
                                                </tr>
                                                @endforelse
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-lg-6 mt-3">
                                <div class="card bg-white border-0 b-shadow-4">
                                    <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
                                        <h4 class="f-18 f-w-500 mb-0">Total Task Assigned On Developer (Under Review)
                                            <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
                                        </h4>
                                    </div>
                                    <div class="card-body p-0 h-200">
                                        <table class="table">
                                            <thead>
                                                <th>Task ID</th>
                                                <th>Task Name</th>
                                                <th>Project</th>
                                                <th>Client</th>
                                                <th>Due Date</th>
                                                <th>Estimated Time</th>
                                                <th>Hours Logged</th>
                                            </thead>
                                            <tbody>
                                                @forelse($yearlyUnderReview as $value)
                                                <tr>
                                                    <td>{{$value->id}}</td>
                                                    <td>
                                                        <a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 20, ' ...')}}</a>
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->project_name}}">{{Str::limit($value->project->project_name, 20, ' ...')}}</a>
                                                        @else
                                                        --
                                                        @endif
                                                    </td>
                                                    <td>
                                                    @if($value->project_id != null)
                                                        <span class="text-primary">{{$value->project->client->name}}</span>
                                                        @else
                                                        {{$value->client_name}}
                                                        @endif
                                                    </td>
                                                    <td>{{$value->due_date->format('Y-m-d')}}</td>
                                                    <td>{{$value->estimate_hours}} h {{$value->estimate_minutes}} M</td>
                                                    <td>
                                                        @php
                                                        $timeLog = '--';

                                                        if($value->timeLogged) {
                                                            $totalMinutes = $value->timeLogged->sum('total_minutes');

                                                            $breakMinutes = $value->breakMinutes();
                                                            $totalMinutes = $totalMinutes - $breakMinutes;

                                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($totalMinutes % 60 > 0) {
                                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                                            }
                                                        }

                                                        $subtasks = \App\Models\Subtask::where('task_id', $value->id)->get();
                                                        $time = 0;

                                                        foreach ($subtasks as $subtask) {
                                                            $task = \App\Models\Task::where('subtask_id', $subtask->id)->first();
                                                            $time += $task->timeLogged->sum('total_minutes');
                                                        }

                                                        if($subtasks == null) {
                                                            echo $timeLog;
                                                        } else {
                                                            $timeL = intdiv(($time+$totalMinutes), 60) . ' ' . __('app.hrs') . ' ';

                                                            if ($time % 60 > 0) {
                                                                $timeL .= ($time+$totalMinutes) % 60 . ' ' . __('app.mins');
                                                            }
                                                            echo $timeL;
                                                        }
                                                        @endphp
                                                    </td>
                                                </tr>
                                                @empty
                                                <tr>
                                                    <td colspan="7" class="shadow-none">
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
                            <div class="col-md-6">
                                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                    <div class="w-100 d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Reviews</h5>
                                        <div class="row">
                                            <div class="col-md-4 mx-auto">
                                                <div class="text-center px-2 border border-danger rounded f-15 f-w-500 line-height-30">Avarage Reviews<br>
                                                    @php
                                                        $totalRating = $yearlyTasks->sum('totalRating');
                                                        $avgRating = 0;
                                                        if($totalRating > 0) {
                                                            $avgRating = round($totalRating / $yearlyTasks->count(), 2);
                                                        }
                                                    @endphp
                                                    @if($avgRating <= 5 && $avgRating >= 4)
                                                        <span class="text-success mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @elseif($avgRating <= 4 && $avgRating >= 3)
                                                        <span class="text-warning mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @elseif($avgRating <= 3)
                                                        <span class="text-danger mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @else
                                                        <span class="text-danger mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                    @endif
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-between">
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 text-center">{{$yearlyPositiveRating}}
                                                    <span class="f-12 font-weight-normal text-lightest">Positive Review</span>
                                                </p>
                                            </a>
                                            <a href="">
                                                <p class="mb-0 f-21 font-weight-bold text-red d-grid text-center">{{$yearlyNegativeRating}}
                                                    <span class="f-12 font-weight-normal text-lightest">Negative Review</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> --}}
        <div id="generalHtml">
 <div class="row">
            <div class="col-md-4">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of tasks received</h5>
                        <div class="d-flex flex-wrap">
                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                    {{$number_of_tasks_received}}
                                </a>
                                {{-- <span class="f-12 font-weight-normal text-lightest">
                                    @lang('Received tasks this cycle')
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                                 
                                </span> --}}
                            </p>
                        

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of submitted tasks</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                {{$submit_number_of_tasks_in_this_month}}
                                  
                                </a>
                                {{-- <span class="f-12 font-weight-normal text-lightest">
                                    @lang('Primary pages')
                                    <i class="fa fa-question-circle" aria-hidden="true" data-toggle="modal" data-target="#"></i>
                                 
                                </span> --}}
                            </p>
                           

                           
                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Lead Developer</h5>
                        <div class="d-flex flex-wrap">
                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                   {{$first_attempt_approve_task_in_this_month}}
                                </a>
                              
                            </p>
                        

                          
                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of approved tasks on 1st attempt by Client</h5>
                        <div class="d-flex flex-wrap">
                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                    {{$first_attempt_approve_task_in_this_month_client}}
                                </a>
                              
                            </p>
                        

                          
                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Lead Developer</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($average_submission_aproval_in_this_month,2)}}
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg number of attempts needed for approval by Client</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($average_submission_aproval_in_this_month_client,2)}}
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
          
           

        </div>
        <div class="row mt-3">
            <div class="col-md-3">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks with revisions</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($percentage_of_tasks_with_revision,2)}}%
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                            Total number of revisions
                            </h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($number_of_total_revision_for_this_month,2)}}
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. logged time for complete tasks (In Hours)</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($average_submission_time_in_this_month,2)}} Hours
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average task submission time (In days)</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($average_submission_day_in_this_month,2)}} Days
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average number of in-progress tasks</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($average_in_progress_date_range ,2)}}
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                            Percentage of tasks where deadline was missed 
                            </h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{round($percentage_of_tasks_deadline,2)}}%
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Percentage of tasks where given estimated time was missed</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 
                                    {{round($percentage_number_task_cross_estimate_time,2)}}%
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rejection rate</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                0%
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                            Cancelation rate 
                            </h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                0%
                                  
                                </a>
                               
                            </p>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Rate of reassign</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                0
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
           
           

        </div>
        <div class="row mt-3">
            <div class="col-md-5">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Number of disputes filed</h5>
                        <div class="d-flex flex-wrap">

                            <h6 class="mb-0 f-18 font-weight-bold mr-5">
                                No. of disputes filed:
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                  {{$number_of_dispute_filed_own}} 
                                  
                                  
                                </a>
                               
                            </h6>
                            <h6 class="mb-0 f-18 font-weight-bold mr-5">
                                No. of disputes (Overall):
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                    {{$number_of_dispute_filed_all}}
                                  
                                  
                                </a>
                               
                            </h6>
                          

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-7">
                <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                    <div class="d-block text-capitalize">
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">
                            Number of disputes lost
                            </h5>
                        <div class="d-flex flex-wrap">

                            <h6 class="mb-0 f-18 font-weight-bold mr-5">
                                No. of disputes lost(Raised By Developer):
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                     {{ $number_of_dispute_lost_own}}
    
                                </a>
                               
                            </h6>
                            <h6 class="mb-0 f-18 font-weight-bold mr-5">
                                No. of disputes lost(Overall):
                                <a href="#" data-toggle="modal" data-target="#">
                                 

                                     {{ $number_of_dispute_lost_all}}
                                  
                                </a>
                               
                            </h6>

                          
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
                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Hours spent in revisions</h5>
                        <div class="d-flex flex-wrap">

                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                <a href="#" data-toggle="modal" data-target="#">
                                 
                                    {{round($spent_revision_developer,2)}} Hours
                                  
                                </a>
                               
                            </p>

                          
                        </div>
                    </div>
                    <div class="d-block">
                        <i class="fa fa-list text-lightest f-27"></i>
                    </div>
                </div>
            </div>

        </div>
        <div class="row mt-3">
				
            <div class="col-sm-6 col-lg-6">
                <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
                    <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                        <x-slot name="thead">
                            <th class="pl-20">#</th>
                            <th>Creation Date</th>
                            <th>Task Name</th>
                            <th>Client Name</th>
                            <th>Submittion date</th>
                            <th>Current Status</th>
                            
                        
                        </x-slot>
        
                        @forelse($tasks as $task)
                        
                        <tr>
                            <td class="pl-20">{{$loop->index+1}}</td>
                            <td>
                               {{$task->created_at}}
                            </td>
                            <td>
                                <a href="{{route('tasks.show',$task->id)}}"> {{$task->heading}}</a>
                            
                            </td>
                            <td>
                                @if($task->ProjectId != null)

                                <a href="{{route('clients.show',$task->client_id)}}">{{$task->clientName}}</a>
                                @elseif($task->task_client_name != null)
                                {{$task->task_client_name}}
                                @else 
                                {{$task->cl_name}}

                                @endif
                                
                            </td>
        
                            <td>
                                @if($task->board_column_id == 2 || $task->board_column_id == 1 || $task->board_column_id == 3)
                                N\A 
                                @else 
                                {{$task->submission_date}}
                              
                                @endif
                                
                            </td>
                            <td>
                                <span class="task-status" data-task-id="{{ $task->id }}" style="color: {{ $task->label_color }}; cursor:pointer">
                                    {{ $task->column_name }}
                                </span>

                               
                                
                            
                            </td>
                            
                            
                            
                          
                        </tr>
                        @empty
                        
                        <tr>
                            <td colspan="10" class="shadow-none">
                                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                        @endforelse
                        
                    </x-table>
                    
                </x-cards.data>
            </div>
    
    
        <div class="col-sm-6 col-lg-6">
            <x-cards.data :title="__('')" padding="false" otherClasses="h-200">
                <x-table class="border-0 pb-3 admin-dash-table table-hover mt-3">
                    <x-slot name="thead">
                        <th class="pl-20">#</th>
                        <th>Creation Date</th>
                        <th>task Name</th>
                        <th>Client Name</th>
                        <th>Current Status</th>
                        
                
                    </x-slot>
    
                    
                    
                    @forelse($past_tasks as $task)
                        
                    <tr>
                        <td class="pl-20">{{$loop->index+1}}</td>
                        <td>
                           {{$task->created_at}}
                        </td>
                        <td>
                            <a href="{{route('tasks.show',$task->id)}}"> {{$task->heading}}</a>
                        
                        </td>
                        <td>
                            @if($task->ProjectId != null)

                            <a href="{{route('clients.show',$task->client_id)}}">{{$task->clientName}}</a>
                            @elseif($task->task_client_name != null)
                            {{$task->task_client_name}}
                            @else 
                            {{$task->cl_name}}

                            @endif
                            
                        </td>
    
                      
                        <td>
                            <span class="task-status" data-task-id="{{ $task->id }}" style="color: {{ $task->label_color }}; cursor:pointer">
                                {{ $task->column_name }}
                            </span>

                           
                            
                        
                        </td>
                        
                        
                        
                      
                    </tr>
                    @empty
                    
                    <tr>
                        <td colspan="10" class="shadow-none">
                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                        </td>
                    </tr>
                    @endforelse
                    
                </x-table>
            </x-cards.data>
        </div>
            <!-- CARD BODY START -->
        
       </div>
</div>
       
        
     
        <div class="card mt-3">
            <div class="card-body">
                <div class="row">
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
                                                        class="text-dark-grey">{{ $myActiveTimer->task->heading }}</a>
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
                                      {{--  <div class="col-sm-12 pt-3 text-right">
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
                                        </div> --}}
                                    </div>
                                </x-cards.data>
                            </div>
                        @endif
                        @if (in_array('week_timelog', $activeWidgets))
                            <div class="col">
                                <div
                                    class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mt-3">
                                    <div class="d-block text-capitalize w-100">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">@lang('modules.dashboard.weekTimelog') <span class="badge badge-secondary ml-1 f-10">{{ minute_to_hour($weekWiseTimelogs - $weekWiseTimelogBreak) . ' ' . __('modules.timeLogs.thisWeek') }}</span></h5>

                                        <div id="weekly-timelogs">
                                            <nav class="mb-3">
                                                <ul class="pagination pagination-sm week-pagination">
                                                    @foreach ($weekPeriod->toArray() as $date)
                                                        <li
                                                        @class([
                                                            'page-item',
                                                            'week-timelog-day',
                                                            'active' => (now(global_setting()->timezone)->toDateString() == $date->toDateString()),
                                                        ])
                                                        data-toggle="tooltip" data-original-title="{{ $date->format(global_setting()->date_format) }}" data-date="{{ $date->toDateString() }}">
                                                            <a class="page-link" href="javascript:;">{{ $date->isoFormat('dd') }}</a>
                                                        </li>
                                                    @endforeach
                                                </ul>
                                            </nav>
                                            <div class="progress" style="height: 7px;">
                                                @php
                                                    $totalDayMinutes = $dateWiseTimelogs->sum('total_minutes');
                                                    $totalDayBreakMinutes = $dateWiseTimelogBreak->sum('total_minutes');
                                                    $totalDayMinutesPercent = ($totalDayMinutes > 0) ? floatval((floatval($totalDayMinutes - $totalDayBreakMinutes)/$totalDayMinutes) * 100) : 0;
                                                @endphp
                                                <div class="progress-bar bg-primary" role="progressbar" style="width: {{ $totalDayMinutesPercent }}%" aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-original-title="{{ minute_to_hour($totalDayMinutes - $totalDayBreakMinutes) }}"></div>

                                                <div class="progress-bar bg-secondary" role="progressbar" style="width: {{ (100 - $totalDayMinutesPercent) }}%" aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-original-title="{{ minute_to_hour($totalDayBreakMinutes) }}"></div>
                                            </div>

                                            <div class="d-flex justify-content-between mt-1 text-dark-grey f-12">
                                                <small>@lang('app.duration'): {{ minute_to_hour($dateWiseTimelogs->sum('total_minutes') - $dateWiseTimelogBreak->sum('total_minutes')) }}</small>
                                                <small>@lang('modules.timeLogs.break'): {{ minute_to_hour($dateWiseTimelogBreak->sum('total_minutes')) }}</small>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
   
</div>
@endsection
@push('scripts')
@if (!is_null($viewEventPermission) && $viewEventPermission != 'none')
    <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
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
    <script>
        $(document).ready(function() {
            var todayDate = moment();
            var monthDate = moment();

            $('.todayDate').text(todayDate.format('dddd LL'));

            var todayOnlyDate = moment(todayDate).format('DD');
            if (todayOnlyDate > 21) {
                var text = '21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY');
                $('.monthDate').text(text);
                $('.monthDateOnHeading').text(text);
            } else {
                $('.monthDate').text('21st ' + moment(monthDate).subtract(1, 'month').format('MMMM, YYYY')+' to 20th '+moment(monthDate).startOf('month').add(20, 'day').format('MMMM, YYYY'));
            }

            $('.fc-prev-button').click(function() {
                var mode = $(this).attr('date-mode');
                if (mode == 'month') {
                    if(todayOnlyDate > 21) {
                        monthDate = moment(monthDate).subtract(1, 'month');
                    } else {
                        monthDate = moment(monthDate).subtract(2, 'month');
                    }
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

            $('.fc-today-button').click(function() {
                todayDate = moment();
            })
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
                var user_id = {{Auth::user()->id}};
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
                        user_id: user_id,
                        // mode: 'general'
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
        $(document).ready(function () {
        // Enable Bootstrap popovers
        $('[data-toggle="popover"]').popover();

        // Handle click on task status element
        $('.task-status').on('click', function () {
            var taskId = $(this).data('task-id');
            var url = '{{ route('task_history_dashboard', ':taskId') }}'.replace(':taskId', taskId);

            // Reference 'this' to use inside the AJAX success function
            var self = $(this);

            // Make an AJAX request to fetch task history data
            $.ajax({
                url: url,
                type: 'GET',
                success: function (data) {
                console.log(data);
                    // Format the task history data for display in the popover
                    var popoverContent = '<ul >';
                    $.each(data, function (index, history) {
                        
                        // popoverContent += '<li class="history_color">' + history.column_name + ' (' + history?.created_on + ')</li>';
                        popoverContent += `<li> ${history.column_name} (${history.created_on}) </li>`;
                     

                    });
                    popoverContent += '</ul>';

                    // Open a Bootstrap popover and display the task history data
                    self.popover({
                        content: popoverContent,
                        html: true,
                        title: 'Task History',
                        placement: 'auto',
                        trigger: 'manual' // Set trigger to 'manual' to control popover manually
                    }).popover('show');
                },
                error: function (xhr, status, error) {
                    console.error('Error fetching task history:', error);
                }
            });
        });
    });
    </script>
@endif
@endpush

