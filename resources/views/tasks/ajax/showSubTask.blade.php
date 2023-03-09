<h3 class="heading-h1" id="right-modal-title">Project: <a href="{{route('projects.show', $project->id)}}">{{$project->project_name}}</a></h3>
<h3 class="f-16" id="right-modal-title">Parent Task: <a href="{{route('tasks.show', $task->id)}}">{{$task->heading}}</a></h3>
<div class="d-flex flex-column w-tables rounded mt-3 bg-white">
	<div class="dataTables_wrapper dt-bootstrap4 no-footer">
		<div class="row mt-4">
			<div class="col-sm-12">
				<x-table class="border-0 pb-3 admin-dash-table table-hover">
					<x-slot name="thead">
						<th scope="col">#</th>
						<th scope="col">id</th>
						<th scope="col">title</th>
						<th scope="col">status</th>
						<th scope="col">Assigned To</th>
						<th scope="col">Added By</th>
						<th scope="col">Last updated</th>
						<th scope="col">Action</th>
					</x-slot>

					@forelse($tasks as $key=>$value)
					<tr id="row-{{ $value->id }}">
						<td class="pl-20">{{ $key + 1 }}</td>
						<td><a href="{{route('tasks.show', $value->task_id)}}">{{$value->id}}</a></td>
						<td><a href="{{route('tasks.show', $value->task_id)}}">{{$value->title}}</a></td>
						<td>
							@if($value->status == 'incomplete')
							<span class="badge badge-warning">{{$value->status}}</span>
							@elseif($value->staus == 'complete')
							<span class="badge badge-success">{{$value->status}}</span>
							@endif
						</td>
						<td><a href="{{route('employees.show', $value->assignedTo->id)}}">{{$value->assignedTo->name}}</a></td>
						<td><a href="{{route('employees.show', $value->addedBy->id)}}">{{$value->addedBy->name}}</a></td>
						<td>{{$value->updated_at->diffForHumans()}}</td>
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
				</x-table>
			</div>
		</div>
	</div>
</div>
