@if(request()->ajax() && request()->route()->getName() == 'project_activity_time_log_ajax')
	<div class="row pt-3">
		<div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
			<x-cards.data :title="__('Project Activity Log ('. $activityLog->count().')')" otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
				<x-table class="border-0 pb-3 admin-dash-table table-hover">
					<x-slot name="thead">
						<th>On</th>
						<th>By</th>
						<th>Activity</th>
					</x-slot>
					@forelse($activityLog as $value)
					<tr>
						<td>{{$value->created_at->format('Y-m-d g:i A')}}<br>(GMT {{$value->created_at->format('P')}})</td>
						<td>
							@if(is_null($value->addedBy))
								---
							@else
							<img src="{{URL::asset('user-uploads/avatar/'.$value->addedBy->image)}}" class="mr-3 taskEmployeeImg rounded-circle" alt="{{$value->addedBy->name}}" title="{{$value->addedBy->name}}">
							{{$value->addedBy->name}}
							@endif
						</td>
						<td>{{$value->activity}}</td>
					</tr>
					@empty
					<tr> 
						<td colspan="3" class="shadow-none">
			                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
			            </td>
					</tr>
					@endforelse
				</x-table>
			</x-cards.data>
		</div>
	</div>
@else
	<style type="text/css">
		.table tr td {
			font-size: 14px;
		}
	</style>
	@php
		$myCollection = collect($activityLog);
		$uniqueCollection = $myCollection->unique('user_id');
	@endphp
	<div class="row mx-0">
		<form action="" class="w-100" id="filter-form">
			@csrf
			<input type="hidden" name="project_id" value="{{request()->route('project')}}">
	        <div class="d-block d-lg-flex d-md-flex my-3">
	            <div class="align-items-center d-flex pl-0 py-1 mr-3 w-100">
		            <div class="col-12 col-sm-3 p-0">
		                <label class="f-14 text-dark-grey mb-12" data-label="" for="status">Status</label>
		                <div class="border input-group rounded">
		                    <div class="input-group-prepend">
		                        <div class="input-group-text">  
		                        	<i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i>
		                        </div>
		                    </div>
		                    <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" name="date_range" id="datatableRange2" placeholder="Start Date And End Date">
		               </div>
		            </div>
		            <div class="col-12 col-sm-4">
		                <div class="select-box py-2 px-0 mr-3">
		                    <x-forms.label :fieldLabel="__('Employee')" fieldId="employee" />
		                    <select class="form-control select-picker" name="employee" id="employee" data-live-search="false" data-size="8">
		                        <option value="all">@lang('app.all')</option>
		                        @foreach($uniqueCollection as $value)
		                        <option value="{{$value->addedBy->id}}">{{$value->addedBy->name}}</option>
		                        @endforeach
		                    </select>
		                </div>
		            </div>
		        </div>
	        </div>
	    </form>
	</div>
	<div id="activityLog">
		<div class="row pt-3">
			<div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
				<x-cards.data :title="__('Project Activity Log ('. $activityLog->count().')')" otherClasses="border-0 p-0 d-flex justify-content-between align-items-center table-responsive-sm">
					<x-table class="border-0 pb-3 admin-dash-table table-hover">
						<x-slot name="thead">
							<th>On</th>
							<th>By</th>
							<th>Activity</th>
						</x-slot>
						@forelse($activityLog as $value)
						<tr>
							<td>{{$value->created_at->format('Y-m-d g:i A')}}<br>(GMT {{$value->created_at->format('P')}})</td>
							<td>
								@if(is_null($value->addedBy))
									---
								@else
								<img src="{{URL::asset('user-uploads/avatar/'.$value->addedBy->image)}}" class="mr-3 taskEmployeeImg rounded-circle" alt="{{$value->addedBy->name}}" title="{{$value->addedBy->name}}">
								{{$value->addedBy->name}}
								@endif
							</td>
							<td>{{$value->activity}}</td>
						</tr>
						@empty
						<tr> 
							<td colspan="3" class="shadow-none">
				                <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
				            </td>
						</tr>
						@endforelse
					</x-table>
				</x-cards.data>
			</div>
		</div>
	</div>

	<script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
	<script type="text/javascript">
	    @php
	        $startDate = \Carbon\Carbon::now()->startOfMonth()->subMonths(12)->addDays(20);
	        $today = \Carbon\Carbon::now()->format('d');
	        if ($today > 20) {
	            $endDate = \Carbon\Carbon::now()->startOfMonth()->addMonth(1)->addDays(19);
	        } else {
	            $endDate = \Carbon\Carbon::now()->startOfMonth()->addDays(19);
	        }
	    @endphp
	    $(function() {
	        var format = '{{ global_setting()->moment_format }}';
	        var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
	        var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
	        var picker = $('#datatableRange2');
	        var start = moment(startDate, format);
	        var end = moment(endDate, format);

	        function cb(start, end) {
	            $('#datatableRange2').val(moment(start).subtract(1, 'year').format('{{ global_setting()->moment_date_format }}') +
	                ' @lang("app.to") ' + end.format( '{{ global_setting()->moment_date_format }}'));
	            $('#reset-filters').removeClass('d-none');
	        }

	        $('#datatableRange2').daterangepicker({
	            locale: daterangeLocale,
	            linkedCalendars: false,
	            startDate: start,
	            endDate: end,
	            ranges: daterangeConfig,
	            opens: 'left',
	            parentEl: '.dashboard-header',
	        }, cb);

	        $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
	            $('#filter-form').submit();
	        });
	    });
	</script>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#filter-form input').change(function() {
				$('#filter-form').submit();
			});

			$('#filter-form select').change(function() {
				$('#filter-form').submit();
			});

			$('#filter-form').on('submit', function(e) {
				e.preventDefault();
				var formData = $(this).serialize();
				$.easyAjax({
					url: '{{route("project_activity_time_log_ajax")}}',
					type: 'post',
					data: formData,
					blockUI: true,
					success: function(resp) {
						if (resp.success == 200) {
							$('#activityLog').html(resp.html);
						}
					}
				})
			});
		});
	</script>
@endif