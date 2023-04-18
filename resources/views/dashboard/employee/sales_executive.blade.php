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
    <div class="emp-dash-detail">
        @if(count(array_intersect(['profile', 'shift_schedule', 'birthday', 'notices'], $activeWidgets)) > 0)
            @if(Auth::user()->role_id == 7)
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
	                    Sales Executive (Today's Update)
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
                    <div class="todayHtml">
		                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="col-10 d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today's Leads</h5>
		                                <div class="d-flex justify-content-between">
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayLeadcount}}
		                                            <span class="f-12 font-weight-normal text-lightest">Leads Created Today</span>
		                                        </p>
		                                    </a>
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($avg_bid_value)}} $
		                                            <span class="f-12 font-weight-normal text-lightest">Avg. Bid Value</span>
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
		                            <div class="col-10 d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Today Converted Leads</h5>
		                                <div class="d-flex justify-content-between">
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$todayLeadconverted}}<span class="f-12 font-weight-normal text-lightest">Leads Converted Today</span></p>
		                                    </a>
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{round($todayLeadconvertedValue,2)}} $<span class="f-12 font-weight-normal text-lightest">Converted Lead Value</span>
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
		            </div>
	            </div>
	        </div>
	    </div>
	    <div class="card">
	        <div class="card-header" id="headingTwo">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
	                    Sales Executive Monthly Cycle Update (21st - 20th)
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
		                <div class="row">
		                    <div class="col-md-4">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalLeads->count()}}
		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Converted</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$Leadconverted}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Lost</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalostdeal}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Bids Value</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{round($totalbidsValue,2)}} $<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
		                                        </p>
		                                    </a>
		                                </div>
		                            </div>
		                            <div class="d-block">
		                                <i class="fa fa-list text-lightest f-27"></i>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Bids Value</h5>
		                                <div class="d-flex">
		                                    <a href="#">

		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{round($avg_value, 2)}} $<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Won Deals</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalwondeal}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> % of Leads Converted
		                                </h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                           
		                                            


		                                            {{round( $percentage_of_lead_converted, 2 )}}%

		                                            
		                                            
		                                            <span class="f-12 font-weight-normal text-lightest">



		                                            </span>

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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Won</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                           
		                                            {{round($percentage_of_deal_won, 2)}}%
		                                           
		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Lost</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">

		                                           
		                                            {{-- $percentage = $lostLeads->where('deal_status', 'Lost')->count() / $lostLeads->count(); --}}
		                                           {{round($percentage_of_deal_lost,2)}}%

		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Projects Got Rejected by PMs</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$rejectedbyPm}}<span class="f-12 font-weight-normal text-lightest"></span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Won Deals Getting Rejected</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$percentage_of_deal_getting_rejected}}%<span class="f-12 font-weight-normal text-lightest"></span>
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
	                </div>
	            </div>
	        </div>
	    </div>
	    <div class="card">
	        <div class="card-header" id="headingThree">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
	                    Sales Executive (General View) 
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
		                <div class="row">
		                    <div class="col-md-4">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalleads}}
		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Converted</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$Leadconverted}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Leads Lost</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalostdeal}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Bids Value</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{round($totalbidsValue,2)}} $<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
		                                        </p>
		                                    </a>
		                                </div>
		                            </div>
		                            <div class="d-block">
		                                <i class="fa fa-list text-lightest f-27"></i>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Bids Value</h5>
		                                <div class="d-flex">
		                                    <a href="#">

		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{round($avg_value, 2)}} $<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. of Won Deals</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$totalwondeal}}<span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey"> % of Leads Converted
		                                </h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                          
		                                            
		                                            {{round( $percentage_of_lead_converted, 2 )}}%
		                                            
		                                            
		                                            <span class="f-12 font-weight-normal text-lightest">



		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Won</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                           
		                                            
		                                            {{round($percentage_of_deal_won, 2)}}%
		                                           
		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Deal Lost</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{round($percentage_of_deal_lost,2)}}%
		                                            <span class="f-12 font-weight-normal text-lightest">
		                                            </span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Projects Got Rejected by PMs</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$rejectedbyPm}}<span class="f-12 font-weight-normal text-lightest"></span>
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
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Won Deals Getting Rejected</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$percentage_of_deal_getting_rejected}}%<span class="f-12 font-weight-normal text-lightest"></span>
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
		              
		                <div class="row mt-3 mb-3">
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize w-100 h-200">
		                                <h4 class="f-18 f-w-500 mb-2">Total Leads</h4>
		                                <x-table class="h-200">
		                                    <x-slot name="thead">
		                                        <th class="pl-20 text-capitalize"> SL. No</th>
		                                        <th class="pl-20 text-capitalize">Lead Name</th>
		                                        <th class="pl-20 text-capitalize">Lead Value</th>
		                                        <th class="pl-20 text-capitalize">Bid Value</th>
		                                        <th class="pl-20 text-capitalize">Created Date</th>
		                                        <th class="pl-20 text-capitalize">Conversion Status</th>
		                                    </x-slot>
		                                    @forelse($totalLeads as $value)
		                                    <tr>
		                                        <td>{{$loop->index+1}}</td>
		                                        <td class="pl-20 text-capitalize ">
		                                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$value->project_name}}" href="{{route('leads.show', $value->id)}}" target="_blank">{!!html_entity_decode($value->client_name)!!}</a>
		                                        </td>
		                                        <td class="pl-20 text-capitalize">{{$value->bid_value}}-{{$value->bid_value2}}{{$value->original_currency->currency_symbol}}</td>
		                                        <td class="pl-20 text-capitalize">{{$value->actual_value}}{{$value->original_currency->currency_symbol}}</td>
		                                        <td class="pl-20 text-capitalize">
		                                            @if($value->created_at != null)
		                                            {{$value->created_at->format('Y-m-d')}}
		                                            @else
		                                            --
		                                            @endif
		                                        </td>
		                                        <td class="pl-20 text-capitalize">
		                                            @if($value->deal_status == 0)
		                                            <i class="fas fa-circle" style="color:red;"></i> Not Converted
		                                            @else 
		                                            <i class="fas fa-circle" style="color:green;"></i> Converted

		                                            @endif
		                                        
		                                        </td>
		                                    </tr>
		                                    @empty
		                                        <tr>
													<td colspan="6" class="shadow-none">
							                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
							                        </td>
												</tr>
		                                    @endforelse
		                                </x-table>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h4 class="f-18 f-w-500 mb-2"><strong>Won Deals Table</strong></h4>
		                                <x-table class="h-200">
		                                    <x-slot name="thead">
		                                        <th class="pl-20 text-capitalize">SL. No.</th>
		                                        <th class="pl-20 text-capitalize">Won Deal Name</th>
		                                        <th class="pl-20 text-capitalize">Won Deal Value</th>
		                                        <th class="pl-20 text-capitalize">Won Date</th>
		                                        <th class="pl-20 text-capitalize">Project Status</th>
		                                    </x-slot>
		                                    @forelse($totalDeals as $value)
		                                    <tr>
		                                        <td>{{$loop->index+1}}</td>
		                                        <td class="pl-20 text-capitalize ">
		                                            <a class="text-darkest-grey openRightModal" title="{{$value->project_name}}" href="{{route('deals.show', $value->id)}}" target="_blank">{{$value->project_name}}</a>
		                                        </td>
		                                        <td class="pl-20 text-capitalize">{{$value->actual_amount}}{{$value->original_currency->currency_symbol}}</td>
		                                        <td class="pl-20 text-capitalize">{{$value->created_at->format('Y-m-d')}}</td>
		                                        <td class="pl-20 text-capitalize">
		                                            {{$value->status}}
		                                            
		                                        </td>
		                                    </tr>
		                                    @empty
		                                    <tr>
												<td colspan="5" class="shadow-none">
						                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
						                        </td>
											</tr>
		                                    @endforelse
		                                </x-table>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
	            </div>
	        </div>
	    </div>
	    <div class="row mt-3">
        	<div class="col-md-7">
        		<div class="card">
        			<div class="card-body">
        				<!-- EMP DASHBOARD EVENTS START -->
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
                $('.monthDate').text('21st ' + moment(monthDate).format('MMMM, YYYY')+' to 20th '+moment(monthDate).add(1, 'month').format('MMMM, YYYY'));
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
@endif
@endpush

