{{-- <h3 class="heading-h1" id="right-modal-title">Project: <a href="{{route('projects.show', $project->id)}}">{{$project->project_name}}</a></h3> --}}
{{-- <h3 class="f-16" id="right-modal-title">Parent Task: <a href="{{route('tasks.show', $task->id)}}">{{$task->heading}}</a></h3> --}}
<h3 class="heading-h1" id="right-modal-title">Subtasks of {{$task->heading}}</a></h3>
<div class="d-flex flex-column w-tables rounded mt-3 bg-white">
	<div class="dataTables_wrapper dt-bootstrap4 no-footer">
		<div class="row mt-4">
			<div class="col-sm-12">
				<x-table class="border-0 pb-3 admin-dash-table table-hover">
					<x-slot name="thead">
						<th scope="col">Task name</th>
						<th scope="col">Timer</th>
						<th scope="col">Parent task</th>
						<th scope="col">Client Name</th>
						<th scope="col">Project Name</th>
						<th scope="col">Assigned To</th>
						<th scope="col">Assigned By</th>
						<th scope="col">Start date</th>
						<th scope="col">Due date</th>
						<th scope="col">Estimated time</th>
						<th scope="col">Hours Logged</th>
						<th scope="col">Task Status</th>
						<th scope="col">Parent Task Progress</th>
						<th scope="col">Action</th>
					</x-slot>
					@forelse($tasks as $key=>$value2)
					@php
						$value= App\Models\Task::where('subtask_id',$value2->id)->first();
					@endphp
					<tr id="row-{{ $value->id }}">
						<td><a class="openRightModal" title="{{$value->heading}}" href="{{route('tasks.show', $value->id)}}">{{Str::limit($value->heading,30)}}</a></td>
						<td>
							@php
							$timer_check= App\Models\ProjectTimeLog::where('task_id',$value->id)->where('start_time','!=',null)->where('end_time',null)->count();
							@endphp
							@if($timer_check > 0)
							<i class="fa-solid fa-circle-play" style="color:green;"></i> Active
							@else
							<i class="fa-solid fa-circle-stop" style="color:red;"></i> Inactive

							@endif


						</td>
						<td><a class="openRightModal" title="{{$task->heading}}" href="{{route('tasks.show', $task->id)}}">{{Str::limit($task->heading,30)}}</a></td>
						<td><a class="openRightModal" href="{{route('clients.show', $project->client->id)}}">{{$project->client->name}}</a></td>
						<td><a class="openRightModal" title="{{$project->project_name}}" href="{{route('projects.show', $value->project->id)}}">{{Str::limit($project->project_name,30)}}</a></td>
						@php
							$assignedTo = \App\Models\TaskUser::where('task_id', $value->id)->first();
						@endphp
						<td><a class="openRightModal" href="{{route('employees.show', $assignedTo->user->id)}}">{{$assignedTo->user->name}}</a></td>
						<td><a class="openRightModal" href="{{route('employees.show', $value->addedByUser->id)}}">{{$value->addedByUser->name}}</a></td>
						<td>{{$value->start_date->format('Y-m-d')}}</td>
						<td>{{$value->due_date->format('Y-m-d')}}</td>
						<td>{{$task->estimate_hours.' hours '.$task->estimate_minutes.' minutes'}}</td>
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
							@endphp
							{{$timeLog}}
						</td>
						<td>
							<i class="fa fa-circle mr-1 text-yellow" style="color:  {{$value->boardColumn->label_color}} "></i>{{$value->boardColumn->column_name}}
						</td>
						<td>
							@php
							$milestones = $project->milestones->count();
			                $completed_milestones = $project->milestones->where('status','complete')->count();

			                if ($milestones < 1 ) {
			                   $completion = 0;
			                   $statusColor = 'danger';
			                } elseif ($milestones >= 1){
			                    $percentage= round(($completed_milestones/$milestones)*100, 2);
			                    if($percentage < 50)
			                    {
			                        $completion= $percentage;
			                        $statusColor = 'danger';
			                    }
			                    elseif ($percentage >= 50 && $percentage < 75) {
			                        $completion= $percentage;
			                        $statusColor = 'warning';
			                    }elseif($percentage >= 75 && $percentage < 99) {
			                        $completion= $percentage;
			                        $statusColor = 'info';
			                    }else {
			                        $completion= $percentage;
			                        $statusColor = 'success';
			                    }
			                }
			                @endphp
			                <div class="progress" style="height: 15px;">
			                	<div class="progress-bar f-12 bg-{{$statusColor}}" role="progressbar" style="width: {{$completion}}%;" aria-valuenow="{{$completion}}" aria-valuemin="0" aria-valuemax="100">{{$completion}}%</div>
			                </div>
						</td>
						<td>
							<a class="openRightModal" href="{{route('tasks.show', $value->id)}}" class="text-darkest-grey">
								<i class="fa fa-eye fa-2x"></i>
							</a>
							<a class="openRightModal" href="{{route('tasks.edit', $value->id)}}" class="text-darkest-grey">
								<i class="fas fa-edit fa-2x"></i>
							</a>
						</td>
					</tr>
					@empty
					<tr>
						<td colspan="8">
							<x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
						</td>
					</tr>
					@endforelse
				</x-table>
			</div>
		</div>
	</div>
</div>
