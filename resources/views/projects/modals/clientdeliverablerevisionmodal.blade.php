<div class="modal fade" id="deliverablesClientRevisionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Client Disagree Requests</h5>
				<button type="button" class="btn-close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-12">
						<table class="table">
							<thead>
								<th>#</th>
								<th>Delivarable</th>
								<th>Client Comment</th>
							</thead>
							<tbody>
								@php $key = 1; @endphp
								@foreach($deliverables as $value)
								<tr>
									<td>{{$key++}}</td>
									<td>{{$value->title}}</td>
									<td>
										@php
										$data = \App\Models\ProjectDeliverablesClientDisagree::where([
											'delivarable_id' => $value->id,
											'status' => '0'
										])->latest()->first();
										@endphp
										{{isset($data) ? $data->comment : 'N/A'}}
									</td>
								</tr>
								@endforeach
							</tbody>
						</table>
					</div>
				</div>	
			</div>
		</div>
	</div>
</div>
