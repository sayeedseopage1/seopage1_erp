<div id="task-detail-section">
	<h2>#{{$task->id}}</h2>
	<h2>Name: {{$task->heading}}</h2>
	<div class="row">
		<div class="col-12">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">title</th>
						<th scope="col">status</th>
						<th scope="col">Assigned To</th>
						<th scope="col">Added By</th>
						<th scope="col">Last updated</th>
					</tr>
				</thead>
				<tbody>
					@forelse($task->subtasks as $value)
					<tr>
						<td>{{$value->id}}</td>
						<td>{{$value->title}}</td>
						<td>
							@if($value->status == 'incomplete')
							<span class="badge badge-warning">{{$value->status}}</span>
							@elseif($value->staus == 'complete')
							<span class="badge badge-success">{{$value->status}}</span>
							@endif
						</td>
						<td>{{$value->assignedTo->name}}</td>
						<td>{{$value->addedBy->name}}</td>
						<td>{{$value->updated_at->diffForHumans()}}</td>
					</tr>
					@empty
					<tr>
						<td class="text-center" colspan="6">No item Found!!!</td>
					</tr>
					@endforelse
				</tbody>
			</table>
		</div>
	</div>
</div>