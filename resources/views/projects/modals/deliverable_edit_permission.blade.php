@extends('layouts.app')
@push('styles')
<style type="text/css">
	.old_data {
		height: 25px;
	}
</style>
@endpush
@section('content')
@php
	$deliverable = json_decode($deliverable);
@endphp
<div class="row mx-3">
	<div class="col-12 pt-5 m-auto">
		<form method="post" action="{{route('deliverables_edit_permission')}}">
			<div class="card">
				<div class="card-header">Update Request Form</div>
				<div class="card-body">
					@csrf
					<input type="hidden" name="delivarable_id" value="{{$deliverable->id}}">
					<div class="parent-row">
						<div class="row clone-row">
							<div class="align-self-end col-sm-2">
								<div class="form-group">
									<label>Select Column</label>
									<select class="form-control height-50 w-100 permission_column" name="permission_column[]">
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
							<div class="col-sm-4">
								<label>Old data</label>
								<div class="form-group border rounded">
									<div class="old_data mb-4 mx-2"></div>
								</div>
							</div>
							<div class="col-sm-5">
								<div class="form-group">
									<label>New Data</label>
									<textarea class="form-control" name="data[]"></textarea>
								</div>
							</div>
							<div class="align-self-end col-sm-1">
								<div class="form-group">
									<button type="button" class="btn btn-danger height-50 remove-row">-</button>
								</div>
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
			var html = '<div class="row"><div class="align-self-end col-sm-2"><div class="form-group"><select class="form-control w-100 permission_column" name="permission_column['+length+']"><option value="">Select column</option><option value="type">Type</option><option value="title">Title</option><option value="estimation_time">Estimation Hours</option><option value="quantity">Quantity</option><option value="description">Description</option><option value="estimation_completed_date">Estimated completion date</option></select></div></div><div class="col-sm-4"><div class="form-group border rounded"><p class="old_data mb-4 mx-2"></p></div></div><div class="col-sm-5"><div class="form-group"><textarea class="form-control" name="data['+length+']"></textarea></div></div><div class="align-self-end col-sm-1"> <button type="button" class="btn btn-danger remove-row">-</button></div></div>';
			$('.parent-row').append(html);
		});
		// remove row
		$('.parent-row').on('click', '.remove-row', function() {
			$(this).closest('.row').remove();
		});

		/*$('.permission_column').change(function() {
			var selected_option = $('.permission_column option:selected').val();
			var textarea = $(this).closest('.clone-row').find('.old_data');
			
			$.each(deliverable, function(key, value) {
				if (key == selected_option) {
					textarea.text(value);
				}
			});
		})*/

		$(document).on('change', '.permission_column', function() {
			//var selected_option = $('.permission_column option:selected').val();
			var selected_option = $(this).find('option:selected').val()
			var deliverable = {!! json_encode($deliverable) !!};
			var textarea = $(this).closest('.row').find('.old_data');

			$.each(deliverable, function(key, value) {
				if (key == selected_option) {
					textarea.html(value);
				}
			});
		})
	});
</script>
@endpush