@extends('layouts.app')
@section('content')
<div class="row">
	<div class="col-12 col-sm-8 pt-5 m-auto">
		<form method="post" action="{{route('deliverables_edit_permission')}}">
			<div class="card">
				<div class="card-header">Update Request Form</div>
				<div class="card-body">
					@csrf
					<input type="hidden" name="delivarable_id" value="{{$deliverable_id}}">
					<div class="parent-row">
						<div class="row clone-row">
							<div class="col-sm-4">
								<div class="form-group">
									<select class="form-control height-50 w-100" name="permission_column[]">
										<option value="">Select column</option>
										<option value="type">Type</option>
										<option value="title">Title</option>
										<option value="estimation_time">Estimation Hours</option>
										<option value="quantity">Quantity</option>
										<option value="description">Description</option>
										<option value="estimation_completed_date">Estimated completion date</option>
									</select>
								</div>
							</div>
							<div class="col-sm-7">
								<div class="form-group">
									<textarea class="form-control" name="data[]"></textarea>
								</div>
							</div>
							<div class="col-sm-1">
								<button type="button" class="btn btn-danger height-50 remove-row">-</button>
							</div>
						</div>
					</div>				
				</div>
				<div class="card-footer">
					<div class="row mx-0">
						<button type="button" class="btn btn-success add-row mr-2">+</button>
						<button class="btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
@endsection
@push('scripts')
<script type="text/javascript">
	$(document).ready(function() {
		$('.add-row').unbind().click(function() {
			var length = $('.parent-row .row').length + 1;
			var html = '<div class="row"><div class="col-sm-4"><div class="form-group"><select class="form-control height-50 w-100" name="permission_column['+length+']"><option value="">Select column</option><option value="type">Type</option><option value="title">Title</option><option value="milestone_cost">Milestone Cost</option><option value="estimation_time">Estimation Hours</option><option value="quantity">Quantity</option><option value="description">Description</option><option value="estimation_completed_date">Estimated completion date</option></select></div></div><div class="col-sm-7"><div class="form-group"><textarea class="form-control" name="data['+length+']"></textarea></div></div><div class="col-sm-1"> <button type="button" class="btn btn-danger height-50 remove-row">-</button></div></div>';
			$('.parent-row').append(html);
		});
		// remove row
		$('.parent-row').on('click', '.remove-row', function() {
			$(this).closest('.row').remove();
		});
	});
</script>
@endpush