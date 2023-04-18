<div class="modal fade" id="deliverable_edit_permission{{$deliverable->id}}" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog modal-xl">
		<form method="post" action="{{route('deliverables_edit_permission')}}">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">Edit deliverable Permission</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					@csrf
					<input type="hidden" name="deliverable_id" value="{{$deliverable->id}}">
					<div class="parent-row{{$deliverable->id}}">
						<div class="row clone-row{{$deliverable->id}}">
							<div class="col-sm-4">
								<div class="form-group">
									<select class="form-control height-50 w-100" name="permission_column[]">
										<option value="">Select column</option>
										<option value="type">Type</option>
										<option value="title">Title</option>
										<option value="milestone_cost">Milestone Cost</option>
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
					<div class="row mx-0">
						<button type="button" class="btn btn-success add-row" row-id="{{$deliverable->id}}">+</button>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</form>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function() {
		$('.add-row').click(function() {
			//e.preventDefault();
			//console.log($(this).attr('row-id'));
			// var row = $('.clone-row').clone();
			// row.removeClass('clone-row');
			/*$('#'+$(this).attr('row-id')).append('<div class="row"><div class="col-sm-4"><div class="form-group"><select class="form-control height-50 w-100" name="permission_column[1]"><option value="">Select column</option><option value="type">Type</option><option value="title">Title</option><option value="milestone_cost">Milestone Cost</option><option value="estimation_time">Estimation Hours</option><option value="quantity">Quantity</option><option value="description">Description</option><option value="estimation_completed_date">Estimated completion date</option></select></div></div><div class="col-sm-7"><div class="form-group"><textarea class="form-control" name="data[1]"></textarea></div></div><div class="col-sm-1"> <button type="button" class="btn btn-danger height-50 remove-row">-</button></div></div>');*/
			var id = $(this).attr('row-id');
			var length = $('.parent-row569 .row').length + 1;
			var html = '<div class="row"><div class="col-sm-4"><div class="form-group"><select class="form-control height-50 w-100" name="permission_column['+length+']"><option value="">Select column</option><option value="type">Type</option><option value="title">Title</option><option value="milestone_cost">Milestone Cost</option><option value="estimation_time">Estimation Hours</option><option value="quantity">Quantity</option><option value="description">Description</option><option value="estimation_completed_date">Estimated completion date</option></select></div></div><div class="col-sm-7"><div class="form-group"><textarea class="form-control" name="data['+length+']"></textarea></div></div><div class="col-sm-1"> <button type="button" class="btn btn-danger height-50 remove-row">-</button></div></div>';
			//var row = $('.clone-row'+id).clone();
			//row.removeClass('clone-row'+id);
			$('.parent-row'+id).append(html);
		});
		// remove row
		$('.parent-row').on('click', '.remove-row', function() {
			$(this).closest('.row').remove();
		});

		//$("#myDropdown option[value='option-value']").hide().prop('disabled', true);

		// Refresh the Select2 dropdown to reflect the changes
	});
</script>