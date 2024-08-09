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

        .fc-list-event-graphic {
            display: none;
        }

        .fc .fc-list-event:hover td {
            background-color: #fff !important;
            color: #000 !important;
        }

        .left-3 {
            margin-right: -22px;
        }

        .clockin-right {
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
            color:
                /* Your color value here */
            ;
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
                        <a href="{{ route('holidays.show', $checkTodayHoliday->id) }}"
                            class="openRightModal text-dark-grey">
                            <u>@lang('messages.holidayToday')</u>
                        </a>
                    </x-alert>
                </div>
            </div>
        @endif

        <!-- CONTENT WRAPPER START -->
        <div class="content-wrapper px-0">
            <!-- Developer Clock IN START -->
            <div class="d-lg-flex d-md-flex d-block py-4">
                <!-- WELOCOME NAME START -->
                <div>
                    <h4 class=" mb-0 f-21 text-capitalize font-weight-bold">@lang('app.welcome')
                        {{ $user->name }}</h4>
                </div>
                <!-- WELOCOME NAME END -->

                <!-- CLOCK IN CLOCK OUT START -->
                @if (Auth::user()->role_id == 4 || Auth::user()->role_id == 7)
                    <div class="align-items-center border-left-grey border-left-grey-sm-0 h-100 pl-4 ml-5">
                        <div class="col-auto">
                            <label class="sr-only" for="inlineFormInputGroup"></label>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"> <i
                                            class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i>
                                    </div>
                                </div>
                                <input type="text"
                                    class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500"
                                    id="datatableRange2" placeholder="Start Date And End Date">
                            </div>
                        </div>
                    </div>
                @endif
                <!-- CLOCK IN CLOCK OUT END -->
                <!-- User check in checkout button -->
                @if (Auth::user()->role_id != 14)
                    <div id="employee-check-in-out-button"
                        class="ml-auto d-flex clock-in-out mb-3 mb-lg-0 mb-md-0 m mt-4 mt-lg-0 mt-md-0 justify-content-between">
                    </div>
                @endif
            </div>
            <!-- Developer Clock IN END -->
            <div id="employeeDashboard"></div>
        </div>
        <!-- CONTENT WRAPPER END -->
    @endsection
