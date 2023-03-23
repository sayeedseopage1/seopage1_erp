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
    <div class="accordion" id="accordionExample">
	    <div class="card">
	        <div class="card-header" id="headingOne">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
	                    Lead Developer (Today's Update)
	                </button>
	            </h2>
	        </div>
	        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
		        <div class="card-body">
		            <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
		                <div class="col-md-6">
		                    <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                        <div class="col-10 d-block text-capitalize">
		                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today (Assigned To Me)</h5>
		                            <div class="d-flex justify-content-between">
		                                <a href="">
		                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">10
		                                        <!-- <span class="f-12 font-weight-normal text-lightest">Leads Created Today</span> -->
		                                    </p>
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
		                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today (Assigned By Me)</h5>
		                            <div class="d-flex">
		                                <a href="">
		                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">20
		                                        <!-- <span class="f-12 font-weight-normal text-lightest">Leads Converted Today</span> -->
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
			                                <th>Developer</th>
			                                <th>Project Deadline</th>
		                                </thead>
		                                <tbody>
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
	                    Lead Developer ({{\Carbon\Carbon::now()->firstOfMonth()->addDays(20)->toFormattedDateString()}} to {{\Carbon\Carbon::now()->firstOfMonth()->addMonths(1)->addDays(19)->toFormattedDateString()}} Update)
	                </button>
	            </h2>
	        </div>
	        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
	            <div class="card-body">
	            	<h4>Total Projects (Status wise)</h4>
	                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
	                    <div class="col-md-4">
	                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
	                            <div class="d-block text-capitalize">
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Not Started</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Under Review</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">In Progress</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
	                <div class="row">
	                    <div class="col-md-4">
	                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
	                            <div class="d-block text-capitalize">
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">On Hold</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Canceled</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Finished</h5>
	                                <div class="d-flex">
	                                    <a href="#">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
	                                            0
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
			                                <th>Developer</th>
			                                <th>Project Deadline</th>
		                                </thead>
		                                <tbody>
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
	        <div class="card-header" id="headingThree">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
	                    Lead Developer (General View) 
	                </button>
	            </h2>
	        </div>
	        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
	            <div class="card-body">
	                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
	                    <div class="col-md-6">
	                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
	                            <div class="col-10 d-block text-capitalize">
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline total (Assigned To Me)</h5>
	                                <div class="d-flex justify-content-between">
	                                    <a href="">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">10
	                                            <!-- <span class="f-12 font-weight-normal text-lightest">Leads Created Today</span> -->
	                                        </p>
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
	                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline total (Assigned By Me)</h5>
	                                <div class="d-flex">
	                                    <a href="">
	                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">20
	                                            <!-- <span class="f-12 font-weight-normal text-lightest">Leads Converted Today</span> -->
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
			                                <th>Developer</th>
			                                <th>Project Deadline</th>
		                                </thead>
		                                <tbody>
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
@endsection


