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

    </style>
@endpush


@section('content')




    <!-- CONTENT WRAPPER START -->
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
            @if(Auth::user()->role_id == 4)
          {{-- <div id="reportrange" class="mb-0" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: auto; margin:0 auto;">
                <i class="fa fa-calendar"></i>&nbsp;
                <span></span> <i class="fa fa-caret-down"></i>
            </div> --}}
            <div
                class="align-items-center border-left-grey border-left-grey-sm-0 h-100 pl-4">

                <div class="col-auto">
                   <label class="sr-only" for="inlineFormInputGroup"></label>
                   <div class="input-group mb-2">
                     <div class="input-group-prepend">
                       <div class="input-group-text">  <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i></div>
                     </div>
                     <input type="text" class="form-control height-35 f-14" id="datatableRange2" placeholder="Start Date And End Date">
                   </div>
                 </div>

            </div>
            @endif
            <div
                class="ml-auto d-flex clock-in-out mb-3 mb-lg-0 mb-md-0 m mt-4 mt-lg-0 mt-md-0 justify-content-between">

                <p
                    class="mb-0 text-lg-right text-md-right f-18 font-weight-bold text-dark-grey d-grid align-items-center">
                    <input type="hidden" id="current-latitude" name="current_latitude">
                    <input type="hidden" id="current-longitude" name="current_longitude">

                    {!! now()->timezone(global_setting()->timezone)->format(global_setting()->time_format) . '<span class="f-10 font-weight-normal">' . now()->timezone(global_setting()->timezone)->format('l') . '</span>' !!}

                    @if (!is_null($currentClockIn))
                        <span class="f-11 font-weight-normal text-lightest">
                            @lang('app.clockInAt') -
                            {{ $currentClockIn->clock_in_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                        </span>
                    @endif
                </p>

                @if (in_array('attendance', user_modules()) && $cannotLogin == false)
                    @if (is_null($currentClockIn) && is_null($checkTodayLeave) && is_null($checkTodayHoliday))
                        <button type="button" class="btn-primary rounded f-15 ml-4" id="clock-in"><i
                        class="icons icon-login mr-2"></i>@lang('modules.attendance.clock_in')</button>
                    @endif
                @endif

                @if (!is_null($currentClockIn) && is_null($currentClockIn->clock_out_time))
                    <button type="button" class="btn-danger rounded f-15 ml-4" id="clock-out"><i
                            class="icons icon-login mr-2"></i>@lang('modules.attendance.clock_out')</button>
                @endif


                @if (in_array('admin', user_roles()))
                    <div class="private-dash-settings d-flex align-self-center">
                        <x-form id="privateDashboardWidgetForm" method="POST">
                            <div class="dropdown keep-open">
                                <a class="d-flex align-items-center justify-content-center dropdown-toggle px-lg-4 border-left-grey text-dark left-3"
                                    type="link" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                    <i class="fa fa-cog"></i>
                                </a>
                                <!-- Dropdown - User Information -->
                                <ul class="dropdown-menu dropdown-menu-right dashboard-settings p-20"
                                    aria-labelledby="dropdownMenuLink" tabindex="0">
                                    <li class="border-bottom mb-3">
                                        <h4 class="heading-h3">@lang('modules.dashboard.dashboardWidgets')</h4>
                                    </li>
                                    @foreach ($widgets as $widget)
                                        @php
                                            $wname = \Illuminate\Support\Str::camel($widget->widget_name);
                                        @endphp
                                        <li class="mb-2 float-left w-50">
                                            <div class="checkbox checkbox-info ">
                                                <input id="{{ $widget->widget_name }}" name="{{ $widget->widget_name }}"
                                                    value="true" @if ($widget->status) checked @endif type="checkbox">
                                                <label for="{{ $widget->widget_name }}">@lang('modules.dashboard.' .
                                                    $wname)</label>
                                            </div>
                                        </li>
                                    @endforeach
                                    @if (count($widgets) % 2 != 0)
                                        <li class="mb-2 float-left w-50 height-35"></li>
                                    @endif
                                    <li class="float-none w-100">
                                        <x-forms.button-primary id="save-dashboard-widget" icon="check">@lang('app.save')
                                        </x-forms.button-primary>
                                    </li>
                                </ul>
                            </div>
                        </x-form>
                    </div>
                @endif

            </div>

            <!-- CLOCK IN CLOCK OUT END -->
        </div>
        <!-- WELOCOME END -->
         <!-- EMPLOYEE DASHBOARD DETAIL START -->



         <div class="row emp-dash-detail">

            <!-- EMP DASHBOARD INFO NOTICES START -->

            @if(count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
                <div class="col-xl-5 col-lg-12 col-md-12 e-d-info-notices">
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
                                        <p class="f-14 font-weight-normal text-dark-grey mb-2">
                                            {{ $user->employeeDetails->designation->name ?? '--' }}</p>
                                        <p class="card-text f-12 text-lightest"> @lang('app.employeeId') :
                                            {{ mb_strtoupper($user->employeeDetails->employee_id) }}</p>
                                    </div>
                                </div>

                              {{--  <div class="card-footer bg-white border-top-grey py-3">
                                    <div class="d-flex flex-wrap justify-content-between">
                                        <span>
                                            <label class="f-12 text-dark-grey mb-12 text-capitalize" for="usr">
                                                @lang('app.open') @lang('app.menu.tasks') </label>
                                            <p class="mb-0 f-18 f-w-500">
                                                <a href="{{ route('tasks.index') . '?assignee=me' }}"
                                                    class="text-dark">
                                                    {{ $inProcessTasks }}
                                                </a>
                                            </p>
                                        </span>
                                        <span>
                                            <label class="f-12 text-dark-grey mb-12 text-capitalize" for="usr">
                                                @lang('app.menu.projects') </label>
                                            <p class="mb-0 f-18 f-w-500">
                                                <a href="{{ route('projects.index') . '?assignee=me&status=all' }}"
                                                    class="text-dark">{{ $totalProjects }}</a>
                                            </p>
                                        </span>

                                        @if (isset($totalOpenTickets))
                                            <span>
                                                <label class="f-12 text-dark-grey mb-12 text-capitalize" for="usr">
                                                    @lang('modules.dashboard.totalOpenTickets') </label>
                                                <p class="mb-0 f-18 f-w-500">
                                                    <a href="{{ route('tickets.index') . '?agent=me&status=open' }}"
                                                        class="text-dark">{{ $totalOpenTickets }}</a>
                                                </p>
                                            </span>
                                        @endif
                                    </div>
                                </div> --}}
                            </div>
                        </div>
                        <!-- EMP DASHBOARD INFO END -->
                        @endif
                      


                        @if (in_array('attendance', user_modules()) && in_array('shift_schedule', $activeWidgets))
                            <div class="col-sm-12">
                                <x-cards.data class="mb-3" :title="__('modules.attendance.shiftSchedule')" padding="false" otherClasses="h-200">
                                    <x-slot name="action">
                                        <x-forms.button-primary id="view-shifts">@lang('modules.attendance.shift')
                                        </x-forms.button-primary>
                                    </x-slot>

                                    <x-table>
                                        @foreach ($currentWeekDates as $key => $weekDate)
                                            @if (isset($weekShifts[$key]))
                                                <tr>
                                                    <td class="pl-20">
                                                        {{ $weekDate->format(global_setting()->date_format) }}
                                                    </td>
                                                    <td>{{ $weekDate->format('l') }}</td>
                                                    <td>
                                                        @if (isset($weekShifts[$key]->shift))
                                                            <span class="badge badge-success"
                                                                style="background-color:{{ $weekShifts[$key]->shift->color }}">{{ $weekShifts[$key]->shift->shift_name }}
                                                            </span>

                                                            @if (!is_null($weekShifts[$key]->remarks) && $weekShifts[$key]->remarks != '')
                                                            <i class="fa fa-info-circle text-dark-grey" data-toggle="popover" data-placement="top" data-content="{{ $weekShifts[$key]->remarks }}" data-html="true" data-trigger="hover"></i>
                                                        @endif
                                                        @else
                                                            {!! $weekShifts[$key] !!}
                                                        @endif
                                                    </td>
                                                        <td class="pr-20 text-right">
                                                            @if (isset($weekShifts[$key]->shift))
                                                                @if (attendance_setting()->allow_shift_change && !$weekDate->isPast())
                                                                    @if (!is_null($weekShifts[$key]->requestChange) && $weekShifts[$key]->requestChange->status == 'waiting')
                                                                        <div class="task_view">
                                                                            <a href="javascript:;"
                                                                                data-shift-schedule-id="{{ $weekShifts[$key]->id }}"
                                                                                class="taskView border-right-0 request-shift-change f-11">@lang('modules.attendance.requestPending')</a>
                                                                        </div>
                                                                    @else
                                                                        <div class="task_view">
                                                                            <a href="javascript:;"
                                                                                data-shift-schedule-id="{{ $weekShifts[$key]->id }}"
                                                                                class="taskView border-right-0 request-shift-change f-11">@lang('modules.attendance.requestChange')</a>
                                                                        </div>
                                                                    @endif
                                                                @else
                                                                --
                                                                @endif
                                                            @else
                                                                --
                                                            @endif

                                                        </td>
                                                </tr>
                                            @endif
                                        @endforeach
                                    </x-table>
                                </x-cards.data>
                            </div>
                        @endif

                        @if (in_array('birthday', $activeWidgets))
                        <!-- EMP DASHBOARD BIRTHDAY START -->
                        <div class="col-sm-12">
                            <x-cards.data class="e-d-info mb-3" :title="__('modules.dashboard.birthday')" padding="false" otherClasses="h-200">
                                <x-table>
                                    @forelse ($upcomingBirthdays as $upcomingBirthday)
                                        <tr>
                                            <td class="pl-20">
                                                <x-employee :user="$upcomingBirthday->user" />
                                            </td>
                                            <td class="pr-20"><span class="badge badge-secondary p-2">
                                                    <i class="fa fa-birthday-cake"></i>
                                                    {{ $upcomingBirthday->date_of_birth->format('d') }}
                                                    {{ $upcomingBirthday->date_of_birth->format('M') }}</span></td>
                                            <td class="pr-20" align="right">
                                                @php
                                                    $currentYear = \Carbon\Carbon::now()->year;
                                                    $dateBirth = $upcomingBirthday->date_of_birth->format($currentYear . '-m-d');
                                                    $dateBirth = \Carbon\Carbon::parse($dateBirth);
                                                    $date1 = \Carbon\Carbon::now();
                                                    $date1 = strtotime($date1);
                                                    $date2 = strtotime($dateBirth);
                                                    $diff = $date2 - $date1;
                                                    $diff_in_days = floor($diff / (60 * 60 * 24)) + 1;
                                                @endphp
                                                @if ($diff_in_days == 0)
                                                    <span class="badge badge-light p-2">@lang('app.today')</span>
                                                @else
                                                    <span class="badge badge-light p-2">@lang('modules.dashboard.inDays', ['days' => $diff_in_days])</span>
                                                @endif
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="3" class="shadow-none">
                                                <x-cards.no-record icon="birthday-cake" :message="__('messages.noRecordFound')" />
                                            </td>
                                        </tr>
                                    @endforelse
                                </x-table>
                            </x-cards.data>
                        </div>
                        <!-- EMP DASHBOARD BIRTHDAY END -->
                        @endif

                        @if (in_array('leave', $activeWidgets))
                        <!-- EMP DASHBOARD BIRTHDAY START -->
                        <div class="col-sm-12">
                            <x-cards.data class="e-d-info mb-3" :title="__('modules.dashboard.leave')" padding="false" otherClasses="h-200">
                                <x-table>
                                    @forelse ($leave as $totalLeave)
                                        <tr>
                                            <td class="pl-20">
                                                <x-employee :user="$totalLeave->user" />
                                            </td>
                                            {{-- <td class="pr-20"><span class="badge badge-secondary p-2">
                                                    {{ $leave->leave_date }}</span>
                                            </td> --}}
                                            <td class="pr-20">
                                                @if ($totalLeave->duration == 'single' || $totalLeave->duration == 'multiple')
                                                    <span class="badge badge-secondary p-2">@lang('modules.dashboard.fullDay')</span>
                                                @else
                                                    @if ($totalLeave->duration == 'half day' && $totalLeave->half_day_type == 'first_half')
                                                        <span class="badge badge-secondary p-2">@lang('modules.leaves.firstHalf')</span>
                                                    @else
                                                        <span class="badge badge-secondary p-2">@lang('modules.leaves.secondHalf')</span>
                                                    @endif
                                                @endif
                                            </td>
                                            <td class="pr-20" align="right">
                                                <span class="badge badge-success p-2" style="background-color:{{$totalLeave->type->color}}">{{ucfirst($totalLeave->type->type_name)}}</span>
                                        </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="3" class="shadow-none">
                                                <x-cards.no-record icon="plane-departure" :message="__('messages.noRecordFound')" />
                                            </td>
                                        </tr>
                                    @endforelse
                                </x-table>
                            </x-cards.data>
                        </div>
                        <!-- EMP DASHBOARD BIRTHDAY END -->
                        @endif

                        @if (in_array('work_from_home', $activeWidgets))
                        <!-- ON WORK FROM HOME START -->
                        <div class="col-sm-12">
                            <x-cards.data class="e-d-info mb-3" :title="__('modules.dashboard.workFromHome')" padding="false">
                                <div class="row pr-20 ml-2">
                                    @forelse ($workFromHome as $totalworkFromHome)
                                    <div class="col-md-6 mb-2">
                                        <x-employee :user="$totalworkFromHome->user" />
                                    </div>
                                    @empty
                                    <p colspan="3" class="shadow-none">
                                        <x-cards.no-record icon="plane-departure" :message="__('messages.noRecordFound')" />
                                    </p>
                                    @endforelse

                                </div>
                            </x-cards.data>
                        </div>
                        <!-- ON WORK FROM HOME  END -->
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
            @endif
            <!-- EMP DASHBOARD INFO NOTICES END -->
            <!-- EMP DASHBOARD TASKS PROJECTS EVENTS START -->
            <div class="col-xl-7 col-lg-12 col-md-12 e-d-tasks-projects-events">
                <!-- EMP DASHBOARD TASKS PROJECTS START -->

                @if(Auth::user()->role_id != 4)
                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
                    @if (in_array('tasks', $activeWidgets))
                        <div class="col-md-6">
                            <div
                                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
                                <div class="d-block text-capitalize">
                                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">@lang('app.menu.tasks')</h5>
                                    <div class="d-flex">
                                        <a href="{{ route('tasks.index') . '?assignee=me' }}">
                                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                {{ $inProcessTasks }}<span class="f-12 font-weight-normal text-lightest">
                                                    @lang('app.pending') </span>
                                            </p>
                                        </a>
                                        <a href="{{ route('tasks.index') . '?assignee=me&overdue=yes' }}">
                                            <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{ $dueTasks }}<span
                                                    class="f-12 font-weight-normal text-lightest">@lang('app.overdue')</span>
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div class="d-block">
                                    <i class="fa fa-list text-lightest f-27"></i>
                                </div>
                            </div>
                        </div>
                    @endif
                    @if (in_array('projects', $activeWidgets))
                        <div class="col-md-6">
                            <div
                                class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mt-3 mt-lg-0 mt-md-0">
                                <div class="d-block text-capitalize">
                                    <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> @lang('app.menu.projects') </h5>
                                    <div class="d-flex">
                                        <a href="{{ route('projects.index') . '?assignee=me&status=in progress' }}">
                                            <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                {{ $totalProjects }}<span
                                                    class="f-12 font-weight-normal text-lightest">@lang('app.inProgress')</span>
                                            </p>
                                        </a>

                                        <a href="{{ route('projects.index') . '?assignee=me&status=overdue' }}">
                                            <p class="mb-0 f-21 font-weight-bold text-red d-grid">
                                                {{ $dueProjects }}<span
                                                    class="f-12 font-weight-normal text-lightest">@lang('app.overdue')</span>
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div class="d-block">
                                    <i class="fa fa-layer-group text-lightest f-27"></i>
                                </div>
                            </div>
                        </div>
                    @endif
                    @if (in_array('lead', $activeWidgets) && $leadAgent)
                            <div class="col-md-6 mt-3">
                                <div
                                    class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mt-3 mt-lg-0 mt-md-0">
                                    <div class="d-block text-capitalize">
                                        <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> @lang('app.menu.lead') </h5>
                                        <div class="d-flex">
                                            <a href="{{ route('leads.index') . '?assignee=me&type=lead' }}">
                                                <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                                                    {{ $totalLead }}<span
                                                        class="f-12 font-weight-normal text-lightest">@lang('app.total') @lang('app.menu.leads')</span>
                                                </p>
                                            </a>

                                            <a href="{{ route('leads.index') . '?assignee=me&type=client' }}">
                                                <p class="mb-0 f-21 font-weight-bold text-success d-grid">
                                                    {{ $convertedLead }}<span
                                                        class="f-12 font-weight-normal text-lightest">@lang('modules.lead.convertedLead')</span>
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-block">
                                        <i class="bi bi-person text-lightest f-27"></i>
                                    </div>
                                </div>
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

                @endif
                <!-- PROJECT MANAGER VIEW -->
                @if(Auth::user()->role_id == 4)
                <!-- EMP DASHBOARD TASKS PROJECTS END -->

                  <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4" id="emp-dashboard">

                    @include($view)
                  </div>


                @endif
                @if (in_array('my_task', $activeWidgets))
                <div class="row">
                    <div class="col-sm-12">
                        <div class="card border-0 b-shadow-4 mb-3 e-d-info">
                            <x-cards.data :title="__('modules.tasks.myTask')" padding="false" otherClasses="h-200">
                                <x-table>
                                    <x-slot name="thead">
                                        <th>@lang('app.task')#</th>
                                        <th>@lang('app.task')</th>
                                        <th>@lang('app.status')</th>
                                        <th class="text-right pr-20">@lang('app.dueDate')</th>
                                    </x-slot>

                                    @forelse ($pendingTasks as $task)
                                        <tr>
                                            <td class="pl-20">
                                                #{{ $task->id }}
                                            </td>
                                            <td>
                                                <div class="media align-items-center">
                                                    <div class="media-body">
                                                        <h5 class="f-12 mb-1 text-darkest-grey"><a
                                                                href="{{ route('tasks.show', [$task->id]) }}"
                                                                class="openRightModal">{{ ucfirst($task->heading) }}</a>
                                                        </h5>
                                                        <p class="mb-0">
                                                            @foreach ($task->labels as $label)
                                                                <span class="badge badge-secondary mr-1"
                                                                    style="background-color: {{ $label->label_color }}">{{ $label->label_name }}</span>
                                                            @endforeach
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="pr-20">
                                                <i class="fa fa-circle mr-1 text-yellow"
                                                    style="color: {{ $task->boardColumn->label_color }}"></i>
                                                {{ $task->boardColumn->column_name }}
                                            </td>
                                            <td class="pr-20" align="right">
                                                @if (is_null($task->due_date))
                                                    --
                                                @elseif ($task->due_date->endOfDay()->isPast())
                                                    <span
                                                        class="text-danger">{{ $task->due_date->format(global_setting()->date_format) }}</span>
                                                @elseif ($task->due_date->setTimezone(global_setting()->timezone)->isToday())
                                                    <span class="text-success">{{ __('app.today') }}</span>
                                                @else
                                                    <span>{{ $task->due_date->format(global_setting()->date_format) }}</span>
                                                @endif
                                            </td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="4" class="shadow-none">
                                                <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                                            </td>
                                        </tr>
                                    @endforelse
                                </x-table>
                            </x-cards.data>
                        </div>
                    </div>
                </div>
                @endif

                <!-- EMP DASHBOARD EVENTS START -->
                @if (in_array('my_calender', $activeWidgets))
                    <div class="row">
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
                                                    <input type="checkbox" value="events"
                                                        class="form-check-input filter-check" name="calendar[]"
                                                        id="customCheck2" @if(in_array('events',$event_filter)) checked @endif>
                                                    <label
                                                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                                                        for="customCheck2">@lang('app.menu.Events')</label>
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
                <!-- EMP DASHBOARD EVENTS END -->
            </div>
            <!-- EMP DASHBOARD TASKS PROJECTS EVENTS END -->
        </div>
        <!-- EMPLOYEE DASHBOARD DETAIL END -->


    </div>
    <!-- CONTENT WRAPPER END -->
@endsection

@push('scripts')
  <script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
  <script type="text/javascript">
      $(function() {
          var format = '{{ global_setting()->moment_format }}';
          var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
          var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
          var picker = $('#datatableRange2');
          var start = moment(startDate, format);
          var end = moment(endDate, format);

          function cb(start, end) {
              $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                  ' @lang("app.to") ' + end.format(
                      '{{ global_setting()->moment_date_format }}'));
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
            //console.log(response);

              if (response.status == "success") {

                  $('#emp-dashboard').html(response.html);

                  init('#emp-dashboard');
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
