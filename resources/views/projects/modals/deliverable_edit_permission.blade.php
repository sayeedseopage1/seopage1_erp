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
					<div class="parent-row">
						<div class="row clone-row">
							<div class="col-sm-4">
								<div class="form-group">
									<select class="form-control w-100" name="permission_column[]" id="columnRow">
										<option value="">Select column</option>
										<option value="type">Type</option>
										<option value="title">Title</option>
										<option value="milestone_cost">Milestone Cost</option>
										<option value="estimation_hours">Estimation Hours</option>
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
							  	<button type="button" class="btn btn-danger remove-row">-</button>
							</div>
						</div>
					</div>
					<div class="row mx-0">
						<button type="button" class="btn btn-success add-row">+</button>
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
		// add new row
		$('.add-row').click(function() {
			var row = $('.clone-row').clone();
			row.removeClass('clone-row');
			$('.parent-row').append(row);
		});
		// remove row
		$('.parent-row').on('click', '.remove-row', function() {
			$(this).closest('.row').remove();
		});

		//$("#myDropdown option[value='option-value']").hide().prop('disabled', true);

		// Refresh the Select2 dropdown to reflect the changes
	});
</script>