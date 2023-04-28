<style type="text/css">
	.table tr td {
		font-size: 14px;
	}
</style>
<div class="row">
	<div class="col-12">
		<form action="" id="filter-form">
            <div class="d-block d-lg-flex d-md-flex my-3">
                <div class="align-items-center border-right-grey px-0 py-1">
		            <div class="col-auto">
		                <label class="sr-only" for="inlineFormInputGroup"></label>
		                <div class="border input-group rounded">
		                    <div class="input-group-prepend">
		                        <div class="input-group-text">  <i class="fa fa-calendar-alt mr-2 f-14 text-dark-grey"></i></div>
		                    </div>
		                    <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange2" placeholder="Start Date And End Date">
		               </div>
		            </div>
		        </div>
            </div>
        </form>
	</div>
</div>
<div class="row py-5">
	<div class="col-lg-12 col-md-12 mb-4 mb-xl-0 mb-lg-4">
		<!-- <table class="table table-hover border mx-2 mt-5 rounded bg-white">
			<thead class="thead-light">
				<th>On</th>
				<th>By</th>
				<th>Activity</th>
			</thead>
			<tbody>
				@forelse($activityLog as $value)
				<tr>
					<td>{{$value->created_at->format('Y-m-d g:i A')}}<br>(GMT {{$value->created_at->format('P')}})</td>
					<td>{{$value->addedBy->name ?? '---'}}</td>
					<td>{{$value->activity}}</td>
				</tr>
				@empty
				<tr> 
					<td colspan="3" class="shadow-none">
                        <x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
                    </td>
				</tr>
				@endforelse
			</tbody>
		</table> -->
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
            showTable();
        });
    });
</script>
