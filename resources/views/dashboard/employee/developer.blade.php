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
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Developer (Today's Update)
                    </button>
                </h2>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
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
                                                <td><a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
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
                                                <td><a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a></td>
                                                <td>{{$value->project->deadline->format('Y-m-d')}}</td>
                                            </tr>
                                            @empty
                                            <tr>
                                                <td class="text-center" colspan="8">No items</td>
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
                                                <td><a href="{{route('tasks.show', $value->id)}}" title="{{$value->heading}}">{{\Str::limit($value->heading, 15, '...')}}</a></td>
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
                                                <td><a href="{{route('employees.show', $value->project_id)}}">{{$value->project->pm->name}}</a></td>
                                                <td>{{$value->project->deadline->format('Y-m-d')}}</td>
                                            </tr>
                                            @empty
                                            <tr>
                                                <td class="text-center" colspan="8">No items</td>
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
        <div class="card">
            <div class="card-header" id="headingTwo">
                <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Developer ({{\Carbon\Carbon::now()->firstOfMonth()->addDays(20)->toFormattedDateString()}} to {{\Carbon\Carbon::now()->firstOfMonth()->addMonths(1)->addDays(19)->toFormattedDateString()}} Update)
                    </button>
                </h2>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div class="card-body">
                    <h4>Total Tasks (Status wise)</h4>
                    <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
                        <div class="col-md-3">
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
                        <div class="col-md-3">
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
                        <div class="col-md-3">
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
                        <div class="col-md-3">
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                            <div class="text-center px-2 border border-danger rounded f-15 f-w-500">Avarage Rating<br>
                                                @php
                                                    $totalRating = $monthlyTasks->sum('totalRating');
                                                    $avgRating = 0;
                                                    if($totalRating > 0) {
                                                        $avgRating = round($totalRating / $monthlyTasks->count(), 2);
                                                    }
                                                @endphp
                                                @if($avgRating < 5 && $avgRating > 4)
                                                    <span class="text-success mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                @elseif($avgRating < 4 && $avgRating > 3)
                                                    <span class="text-warning mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                @elseif($avgRating < 3)
                                                    <span class="text-danger mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                @endif
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <a href="">
                                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 text-center">{{$monthlyPositiveRating}}
                                                <span class="f-12 font-weight-normal text-lightest">Positive Review</span>
                                            </p>
                                        </a>
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
                <div class="card-body">
                    <!-- <div class="row my-2 text-center">
                        <div class="col-md-4">calender view</div>
                    </div> -->
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                    <a href="{{route('projects.show', $value->project_id)}}" title="{{$value->project->name}}">{{$value->project->name}}</a>
                                                </td>
                                                <td>
                                                    <span class="text-primary">{{$value->project->client->name}}</span>
                                                </td>
                                                <td>{{$value->due_date}}</td>
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
                                                <td colspan="7" class="text-center f-w-500 text-danger">No items</td>
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
                                                @if($avgRating < 5 && $avgRating > 4)
                                                    <span class="text-success mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                @elseif($avgRating < 4 && $avgRating > 3)
                                                    <span class="text-warning mt-1">{{$avgRating}} <i class="fa fa-star text-warning"></i></span>
                                                @elseif($avgRating < 3)
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
        <div class="card">
            <div class="card-body">
                <div class="row mt-3">
                    <div class="col-md-6">
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
                    <div class="col-md-6">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
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
@endpush

