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
						@foreach($total_deadline_task_assigned_to_me_period as $row)
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
						@endforeach
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
						@foreach($total_deadline_task_assigned_by_me_period as $row) 
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
								 	$user = App\Models\User::where('id',$task_user->user_id)->first();
							 	@endphp
								<a href="{{route('projects.show', $project->id)}}" title="{{$project->project_name}}" class="openRightModal">{{Str::limit($project->project_name,15)}}</a>
							</td>
                        	<td>
                        		<a href="{{route('clients.show', $project->client_id)}}" title="{{$client->name}}" class="openRightModal">{{$client->name}}</a>
                        	</td>
							<td>
								<a href="{{route('employees.show', $user->id)}}" title="{{$user->name}}" class="openRightModal">{{$user->name}}</a>
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
						@endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>