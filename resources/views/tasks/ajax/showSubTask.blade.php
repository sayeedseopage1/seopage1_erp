<h3 class="heading-h1" id="right-modal-title">Project: <a href="{{route('projects.show', $project->id)}}">{{$project->project_name}}</a></h3>
<h3 class="f-16" id="right-modal-title">Parent Task: <a href="{{route('tasks.show', $task->id)}}">{{$task->heading}}</a></h3>
<div class="d-flex flex-column w-tables rounded mt-3 bg-white">
	<div class="dataTables_wrapper dt-bootstrap4 no-footer">
		<div class="row mt-4">
			<div class="col-sm-12">
				<x-table class="border-0 pb-3 admin-dash-table table-hover">
					@if(Auth::user()->role_id == 1)
						<x-slot name="thead">
							<th scope="col">#</th>
							<th scope="col">Task name</th>
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
						</x-slot>

						@forelse($tasks as $key=>$value)
						<tr id="row-{{ $value->id }}">
							<td><a href="{{route('tasks.show', $value->task_id)}}">{{$value->id}}</a></td>
							<td><a href="{{route('tasks.show', $value->task_id)}}">{{$value->title}}</a></td>
							<td><a href="{{route('tasks.show', $value->task_id)}}">{{$task->heading}}</a></td>
							<td><a href="{{route('tasks.show', $value->task_id)}}">{{$project->client->name}}</a></td>
							<td><a href="{{route('tasks.show', $value->task_id)}}">{{$project->project_name}}</a></td>
							<td><a href="{{route('employees.show', $value->assignedTo->id)}}">{{$value->assignedTo->name}}</a></td>
							<td><a href="{{route('employees.show', $value->addedBy->id)}}">{{$value->addedBy->name}}</a></td>
							<td>{{$value->start_date->format('Y-m-d')}}</td>
							<td>{{$value->due_date->format('Y-m-d')}}</td>
							<td>{{$task->estimate_hours.' hours '.$task->estimate_minutes.' minutes'}}</td>
							<td>
								@php
								$timeLog = '--';
				                if($task->timeLogged) {
				                    $totalMinutes = $task->timeLogged->sum('total_minutes');

				                    $breakMinutes = $task->breakMinutes();
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
								@if($value->status == 'incomplete')
								<span class="badge badge-warning">{{$value->status}}</span>
								@elseif($value->staus == 'complete')
								<span class="badge badge-success">{{$value->status}}</span>
								@endif
							</td>
							<td>
								<a href="{{route('tasks.show', $value->task_id)}}" class="btn btn-sm btn-primary">
									<i class="fa fa-eye"></i>
								</a>
								<a href="{{route('tasks.edit', $value->task_id)}}" class="btn btn-sm btn-secondary">
									<i class="fas fa-edit"></i>
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
					@endif
				</x-table>
			</div>
		</div>
	</div>
</div>
