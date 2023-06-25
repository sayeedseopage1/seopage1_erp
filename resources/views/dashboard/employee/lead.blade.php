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
	                    Lead Developer (Today's Update)
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
			                            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Task Deadline Today (Assigned To Me)</h5>
			                            <div class="d-flex justify-content-between">
			                                <a href="">
			                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$today_deadline_task_assigned_to_me}}
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
			                                    <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">{{$today_deadline_task_assigned_by_me}}
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
			                                    
			                                    <th>Estimated Time</th>
			                                    <th>Hours Logged</th>
			                                    <th>Project Manager</th>
			                                    <th>Project Deadline</th>
												<th>Status</th>
			                                </thead>
											@forelse($total_deadline_task_assigned_to_me as $row)
											
											<tr>
												<td>{{$loop->index+1}}</td>
												<td><a href="{{route('tasks.show', $row->id)}}" title="{{$row->heading}}" class="openRightModal">{{Str::limit($row->heading,15)}}</a></td>
												<td>{{$row->start_date}}</td>
											
												<td>{{$row->estimate_hours}} hours {{$row->estimate_minutes}} min</td>
												<td>
													@php
													$total_minutes= App\Models\ProjectTimeLog::where('task_id',$row->id)->sum('total_minutes');
													$timelog= '';
														$timelog .= round($total_minutes/60,0) .' hours ';
														$timelog .= $total_minutes%60 .' min';
													 $subtasks = App\Models\Subtask::where('task_id', $row->id)->get();
													
													 $time = 0;
													foreach ($subtasks as $subtask) {
													$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
													$time += $task->timeLogged->sum('total_minutes');
													
													}
													if($subtasks == null)
													{
														$timeL = $timelog;
														
													}else 
													{
														$timeL = '';
														$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
														$timeL .= ($total_minutes+$time)%60 . ' min';

													}

													@endphp
													{{$timeL}}
													
												</td>
												<td>
													@php
													$project= App\Models\Project::where('id',$row->project_id)->first();
													$pm = App\Models\User::where('id',$project->pm_id)->first();

													@endphp
													<a href="{{route('employees.show', $pm->id)}}" title="{{$pm->name}}" class="openRightModal">{{Str::limit($pm->name,15)}}</a>
													
												</td>
												<td>{{$project->deadline}}</td>
												<td>
													@php
													$task_status= App\Models\TaskBoardColumn::where('id',$row->board_column_id)->first();
													@endphp
													
													<span class="badge badge-light" style="color:{{$task_status->label_color}}">
													{{$task_status->column_name}}</span></td>
											</tr>
											@empty
											<tr>
												<td colspan="8" class="shadow-none">
						                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
						                        </td>
											</tr>
											@endforelse
			                                <tbody>
			                                </tbody>
			                            </table>
			                        </div>
			                    </div>
			                </div>
			                <div class="col-sm-12 col-lg-6 mt-3">
			                	<div class="card bg-white border-0 b-shadow-4">
			                        <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
			                            <h4 class="f-18 f-w-500 mb-0">Task Deadline Today (Assigned By Me) 
			                                <svg class="svg-inline--fa fa-question-circle fa-w-16" data-toggle="popover" data-placement="top" data-content="From 01-03-2023 To 23-03-2023" data-trigger="hover" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="question-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" data-original-title="" title=""><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
			                            </h4>
			                        </div>
			                        <div class="card-body p-0 h-200">
			                            <table class="table">
			                                <thead>
			                                    <th>SL. No.</th>
				                                <th>Task Name</th>
				                                <th>Start Date</th>
				                               
				                                <th>Estimated Time</th>
				                                <th>Hours Logged</th>
				                                <th>Developer</th>
				                                <th>Project Deadline</th>
												<th>Status</th>
			                                </thead>
											@forelse($total_deadline_task_assigned_by_me as $item)
											<tr>
												<td>{{$loop->index+1}}</td>
												<td><a href="{{route('tasks.show', $item->id)}}" title="{{$item->heading}}" class="openRightModal">{{Str::limit($item->heading,15)}}</a></td>
												<td>{{$item->start_date->format('Y-m-d')}}</td>
											
												<td>{{$item->estimate_hours}} hours {{$item->estimate_minutes}} min</td>
												<td>
													@php
													$total_minutes= App\Models\ProjectTimeLog::where('task_id',$item->id)->sum('total_minutes');
													$timelog= '';
														$timelog .= round($total_minutes/60,0) .' hours ';
														$timelog .= $total_minutes%60 .' min';
													 $subtasks = App\Models\Subtask::where('task_id', $item->id)->get();
													
													 $time = 0;
													foreach ($subtasks as $subtask) {
													$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
													$time += $task->timeLogged->sum('total_minutes');
													
													}
													if($subtasks == null)
													{
														$timeL = $timelog;
														
													}else 
													{
														$timeL = '';
														$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
														$timeL .= ($total_minutes+$time)%60 . ' min';

													}

													@endphp
													{{$timeL}}
													
												</td>
												<td>
													@php
													$project= App\Models\Project::where('id',$item->project_id)->first();
													$task_user= App\Models\TaskUser::where('task_id',$item->id)->first();
													$user = App\Models\User::where('id',$task_user->user_id)->first();
													@endphp
													<a href="{{route('employees.show', $user->id)}}" title="{{$user->name}}" class="openRightModal">{{Str::limit($user->name,10)}}</a>
													
												</td>
												<td>{{$project->deadline}}</td>
												<td>
													@php
													$task_status= App\Models\TaskBoardColumn::where('id',$item->board_column_id)->first();
													@endphp
													
													<span class="badge badge-light" style="color:{{$task_status->label_color}}">
													{{$task_status->column_name}}</span></td>


											</tr>
											@empty
											<tr>
												<td colspan="8" class="shadow-none">
						                            <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
						                        </td>
											</tr>
											@endforelse
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
	    <div class="card">
	        <div class="card-header" id="headingTwo">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
	                    Lead Developer Monthly Cycle Update (21st - 20th)
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
		            	<h4>Total Projects (Status wise)</h4>
						<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
						    <div class="col-md-4">
						        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
						            <div class="d-block text-capitalize">
						                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Not Started</h5>
						                <div class="d-flex">
						                    <a href="#">
						                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
						                            {{$total_not_started_projects}}
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
						                            {{$total_under_review_projects}}
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
						                            {{$total_in_progress_projects}}
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
						                            {{$total_on_hold_projects}}
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
						                           {{$total_canceled_projects}}
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
						                            {{$total_finished_projects}}
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
						<h4 class="my-3">Total Tasks (Status wise)</h4>
						<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
						    <div class="col-md-3">
						        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
						            <div class="d-block text-capitalize">
						                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">To Do</h5>
						                <div class="d-flex">
						                    <a href="#">
						                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
						                            {{$total_to_do_tasks}}
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
						                            {{$total_doing_tasks}}
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
						                            {{$total_overdue_tasks}}
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
						                            {{$total_under_review_tasks}}
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
						<h4 class="my-3">Reviews </h4>
						<div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
							<div class="col-md-6">
						        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
						            <div class="w-100 d-block text-capitalize">
						                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Reviews</h5>
						                <div class="row">
						                	<div class="col-md-4 mx-auto">
						                		<div class="text-center px-2 border border-danger rounded f-15 f-w-500">Avarage Scrore <br> {{round($average,2)}}</div>
						                	</div>
						                </div>
						                <div class="d-flex justify-content-between">
						                    <a href="">
						                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 text-center">{{$positive_review}}
						                            <span class="f-12 font-weight-normal text-lightest">Positive Review</span>
						                        </p>
						                    </a>
						                    <a href="">
						                        <p class="mb-0 f-21 font-weight-bold text-red d-grid text-center">{{$negative_review}}
						                            <span class="f-12 font-weight-normal text-lightest">Negative Review</span>
						                        </p>
						                    </a>
						                </div>
						            </div>
						        </div>
						    </div>
						    <div class="col-md-6">
						    	<div class="row">
						        	<div class="col-md-6">
						        		<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
						        			<div class="d-block text-capitalize">
						        				<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Reviews on Tasks You’ve Worked On</h5>
						        				<div class="d-flex">
						        					<a href="#">
						        						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
						        							{{round($average,2)}}
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
						        	<div class="col-md-6">
						        		<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
						        			<div class="d-block text-capitalize">
						        				<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Reviews on Tasks You Assigned</h5>
						        				<div class="d-flex">
						        					<a href="#">
						        						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
						        							{{round($average_review_assign_by_me,2)}}
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
						    </div>
						</div>
						<div class="row mt-3">
						    <div class="col-sm-12 col-lg-6 mt-3">
						        <div class="card bg-white border-0 b-shadow-4">
						            <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
						                <h4 class="f-18 f-w-500 mb-0">Total Task Assigned To Lead Developer
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
												<th>Status</th>
						                    </thead>
						                    <tbody>
												@forelse($total_deadline_task_assigned_to_me_period as $row)
						                    	<tr>
						                    		<td>{{$loop->index+1}}</td>
													<td>
														<a href="{{route('tasks.show', $row->id)}}" title="{{$row->heading}}" class="openRightModal">{{Str::limit($row->heading,15)}}</a>
													</td>
						                        	<td>
														@php
															$project= App\Models\Project::where('id',$row->project_id)->first();
															$client= App\Models\User::where('id',$project->client_id)->first();
															// $task_user= App\Models\TaskUser::where('task_id',$item->id)->first();
															// $user = App\Models\User::where('id',$task_user->user_id)->first();
														@endphp
														<a href="{{route('projects.show', $project->id)}}" title="{{$project->project_name}}" class="openRightModal">{{Str::limit($project->project_name,15)}}</a>
													</td>
						                        	<td>
						                        		<a href="{{route('clients.show', $project->client_id)}}" title="{{$client->name}}" class="openRightModal">{{$client->name}}</a>
						                        	</td>
						                        	<td>
														@if($row->due_date != null)
														{{$row->due_date}}
														@else 
														-- 
														@endif
													</td>
						                        	<td>{{$row->estimate_hours}} hours {{$row->estimate_minutes}} min</td>
						                        	<td>
														@php
															$total_minutes= App\Models\ProjectTimeLog::where('task_id',$row->id)->sum('total_minutes');
															$timelog= '';
															$timelog .= round($total_minutes/60,0) .' hours ';
															$timelog .= $total_minutes%60 .' min';
														 	$subtasks = App\Models\Subtask::where('task_id', $row->id)->get();
														
														 	$time = 0;
															foreach ($subtasks as $subtask) {
																$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
																$time += $task->timeLogged->sum('total_minutes');
															}
															if($subtasks == null) {
																$timeL = $timelog;
															} else {
																$timeL = '';
																$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
																$timeL .= ($total_minutes+$time)%60 . ' min';
															}
														@endphp
														{{$timeL}}
													</td>
													<td>
														@php
															$task_status= App\Models\TaskBoardColumn::where('id',$row->board_column_id)->first();
														@endphp
														
														<span class="badge badge-light" style="color:{{$task_status->label_color}}">
														{{$task_status->column_name}}</span>
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
						                <h4 class="f-18 f-w-500 mb-0">Total Task Assigned By Lead Developer 
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
												<th>Developer</th>
						                        <th>Due Date</th>
						                        <th>Estimated Time</th>
						                        <th>Hours Logged</th>
												<th>Status</th>
						                    </thead>
						                    <tbody>
												@forelse($total_deadline_task_assigned_by_me_period as $row) 
						                    	<tr>
						                    		<td>{{$loop->index+1}}</td>
													<td>
														<a href="{{route('tasks.show', $row->id)}}" title="{{$row->heading}}" class="openRightModal">{{Str::limit($row->heading,15)}}</a>
													</td>
						                        	<td>
														@php
															$project= App\Models\Project::where('id',$row->project_id)->first();
															$client= App\Models\User::where('id',$project->client_id)->first();
														 	$task_user= App\Models\TaskUser::where('task_id',$row->id)->first();
														 	if($task_user != null) {
														 		$user = App\Models\User::where('id',$task_user->user_id)->first();
														 	} else {
														 		'no data';
														 	}
													 	@endphp
														<a href="{{route('projects.show', $project->id)}}" title="{{$project->project_name}}" class="openRightModal">{{Str::limit($project->project_name,15)}}</a>
													</td>
						                        	<td>
						                        		<a href="{{route('clients.show', $project->client_id)}}" title="{{$client->name}}" class="openRightModal">{{$client->name}}</a>
						                        	</td>
													<td>
														@if($task_user != null)
														<a href="{{route('employees.show', $user->id)}}" title="{{$user->name}}" class="openRightModal">{{$user->name}}</a>
														@else 
															--
														@endif
													</td>
						                        	<td>
														@if($row->due_date != null)
														{{$row->due_date->format('Y-m-d')}}
														@else 
														-- 
														@endif
													</td>
						                        	<td>{{$row->estimate_hours}} hours {{$row->estimate_minutes}} min</td>
						                        	<td>
														@php
															$total_minutes= App\Models\ProjectTimeLog::where('task_id',$row->id)->sum('total_minutes');
															$timelog= '';
															$timelog .= round($total_minutes/60,0) .' hours ';
															$timelog .= $total_minutes%60 .' min';
														 	$subtasks = App\Models\Subtask::where('task_id', $row->id)->get();
														
														 	$time = 0;
															foreach ($subtasks as $subtask) {
																$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
																$time += $task->timeLogged->sum('total_minutes');
															}

															if($subtasks == null) {
																$timeL = $timelog;
															} else {
																$timeL = '';
																$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
																$timeL .= ($total_minutes+$time)%60 . ' min';
															}
														@endphp
														{{$timeL}}
													</td>
													<td>
														@php
															$task_status= App\Models\TaskBoardColumn::where('id',$row->board_column_id)->first();
														@endphp

														<span class="badge badge-light" style="color:{{$task_status->label_color}}">
														{{$task_status->column_name}}</span>
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
	        <div class="card-header" id="headingThree">
	            <h2 class="mb-0">
	                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
	                    Lead Developer (General View) 
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
		            	<h4>Total Projects (Status wise)</h4>
		                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
		                    <div class="col-md-4">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Not Started</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$total_not_started_projects_general}}
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
		                                            {{$total_in_progress_projects_general}}
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
		                                            {{$total_under_review_projects_general}}
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
		                                            {{$total_on_hold_projects_general}}
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
		                                            {{$total_canceled_projects_general}}
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
		                                            {{$total_finished_projects_general}}
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
		                <h4 class="my-3">Total Tasks (Status wise)</h4>
		                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
		                    <div class="col-md-3">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">To Do</h5>
		                                <div class="d-flex">
		                                    <a href="#">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
		                                            {{$total_to_do_tasks_general}}
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
		                                            {{$total_doing_tasks_general}}
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
		                                            {{$total_overdue_tasks_general}}
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
		                                            {{$total_under_review_tasks_general}}
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
		                <h4 class="my-3">Reviews </h4>
		                <div class="row mb-3 mt-xl-0 mt-lg-4 mt-md-4 mt-4">
		                	<div class="col-md-6">
		                        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
		                            <div class="w-100 d-block text-capitalize">
		                                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Reviews</h5>
		                                <div class="row">
		                                	<div class="col-md-4 mx-auto">
		                                		<div class="text-center px-2 border border-danger rounded f-15 f-w-500">Avarage Scrore <br> {{round($average_general,2)}}</div>
		                                	</div>
		                                </div>
		                                <div class="d-flex justify-content-between">
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5 text-center">{{round($positive_review_general,2)}}
		                                            <span class="f-12 font-weight-normal text-lightest">Positive Review</span>
		                                        </p>
		                                    </a>
		                                    <a href="">
		                                        <p class="mb-0 f-21 font-weight-bold text-red d-grid text-center">{{round($negative_review_general,2)}}
		                                            <span class="f-12 font-weight-normal text-lightest">Negative Review</span>
		                                        </p>
		                                    </a>
		                                </div>
		                            </div>
		                        </div>
		                    </div>
		                    <div class="col-md-6">
		                    	<div class="row">
			                    	<div class="col-md-6">
			                    		<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
			                    			<div class="d-block text-capitalize">
			                    				<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Reviews on Tasks You’ve Worked On</h5>
			                    				<div class="d-flex">
			                    					<a href="#">
			                    						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
			                    							{{round($average_general,2)}}
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
			                    	<div class="col-md-6">
			                    		<div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
			                    			<div class="d-block text-capitalize">
			                    				<h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Reviews on Tasks You Assigned</h5>
			                    				<div class="d-flex">
			                    					<a href="#">
			                    						<p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
			                    							{{round($average_review_assign_by_me_general,2)}}
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
		                    </div>
		                </div>
		                <div class="row mt-3">
			                <div class="col-sm-12 col-lg-6 mt-3">
			                    <div class="card bg-white border-0 b-shadow-4">
			                        <div class="card-header bg-white border-0 text-capitalize d-flex justify-content-between p-20">
			                            <h4 class="f-18 f-w-500 mb-0">Total Task Assigned To Lead Developer
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
												<th>Status</th>
			                                </thead>
			                                <tbody>
			                                	@forelse($total_task_assigned_to_me_general as $row)
			                                	<tr>
			                                		<td>{{$loop->index+1}}</td>
													<td><a href="{{route('tasks.show', $row->id)}}" title="{{$row->heading}}" class="openRightModal">{{Str::limit($row->heading,15)}}</a></td>
				                                	<td>
														@php
													$project= App\Models\Project::where('id',$row->project_id)->first();
													$client= App\Models\User::where('id',$project->client_id)->first();
													// $task_user= App\Models\TaskUser::where('task_id',$item->id)->first();
													// $user = App\Models\User::where('id',$task_user->user_id)->first();

													@endphp
													<a href="{{route('projects.show', $project->id)}}" title="{{$project->project_name}}" class="openRightModal">{{Str::limit($project->project_name,15)}}</a>
													



													</td>
				                                	<td><a href="{{route('clients.show', $project->client_id)}}" title="{{$client->name}}" class="openRightModal">{{$client->name}}</a></td>
				                                	<td>
														@if($row->due_date != null)
														{{$row->due_date}}
														@else 
														-- 
														@endif
												</td>
				                                	<td>{{$row->estimate_hours}} hours {{$row->estimate_minutes}} min</td>
				                                	<td>
														@php
													$total_minutes= App\Models\ProjectTimeLog::where('task_id',$row->id)->sum('total_minutes');
													$timelog= '';
														$timelog .= round($total_minutes/60,0) .' hours ';
														$timelog .= $total_minutes%60 .' min';
													 $subtasks = App\Models\Subtask::where('task_id', $row->id)->get();
													
													 $time = 0;
													foreach ($subtasks as $subtask) {
													$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
													$time += $task->timeLogged->sum('total_minutes');
													
													}
													if($subtasks == null)
													{
														$timeL = $timelog;
														
													}else 
													{
														$timeL = '';
														$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
														$timeL .= ($total_minutes+$time)%60 . ' min';

													}

													@endphp
													{{$timeL}}

													</td>
													<td>
														@php
														$task_status= App\Models\TaskBoardColumn::where('id',$row->board_column_id)->first();
														@endphp
														
														<span class="badge badge-light" style="color:{{$task_status->label_color}}">
														{{$task_status->column_name}}</span>

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
			                            <h4 class="f-18 f-w-500 mb-0">Total Task Assigned By Lead Developer 
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
												<th>Status</th>
			                                </thead>
			                                <tbody>
												@forelse($total_task_assigned_by_me_general as $row) 
			                                	<tr>
			                                		<td>{{$loop->index+1}}</td>
													<td><a href="{{route('tasks.show', $row->id)}}" title="{{$row->heading}}" class="openRightModal">{{Str::limit($row->heading,15)}}</a></td>
				                                	<td>
													@php
													$project= App\Models\Project::where('id',$row->project_id)->first();
													$client= App\Models\User::where('id',$project->client_id)->first();
												 	$task_user= App\Models\TaskUser::where('task_id',$row->id)->first();
												 	if($task_user != null) {
												 		$user = App\Models\User::where('id',$task_user->user_id)->first();
												 	} else {
												 		'no data';
												 	}

													@endphp
													<a href="{{route('projects.show', $project->id)}}" title="{{$project->project_name}}" class="openRightModal">{{Str::limit($project->project_name,15)}}</a>
													



													</td>
				                                	<td><a href="{{route('clients.show', $project->client_id)}}" title="{{$client->name}}" class="openRightModal">{{$client->name}}</a></td>
													<td><a href="{{route('employees.show', $user->id)}}" title="{{$user->name}}" class="openRightModal">{{$user->name}}</a></td>
				                                	<td>
														@if($row->due_date != null)
														{{$row->due_date->format('Y-m-d')}}
														@else 
														-- 
														@endif
												</td>
				                                	<td>{{$row->estimate_hours}} hours {{$row->estimate_minutes}} min</td>
				                                	<td>
														@php
													$total_minutes= App\Models\ProjectTimeLog::where('task_id',$row->id)->sum('total_minutes');
													$timelog= '';
														$timelog .= round($total_minutes/60,0) .' hours ';
														$timelog .= $total_minutes%60 .' min';
													 $subtasks = App\Models\Subtask::where('task_id', $row->id)->get();
													
													 $time = 0;
													foreach ($subtasks as $subtask) {
													$task = App\Models\Task::where('subtask_id', $subtask->id)->first();
													$time += $task->timeLogged->sum('total_minutes');
													
													}
													if($subtasks == null)
													{
														$timeL = $timelog;
														
													}else 
													{
														$timeL = '';
														$timeL .= round(($total_minutes+$time)/60,0) . ' hours ';
														$timeL .= ($total_minutes+$time)%60 . ' min';

													}

													@endphp
													{{$timeL}}

													</td>
													<td>
														@php
														$task_status= App\Models\TaskBoardColumn::where('id',$row->board_column_id)->first();
														@endphp
														
														<span class="badge badge-light" style="color:{{$task_status->label_color}}">
														{{$task_status->column_name}}</span>

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
            });  
        })

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

