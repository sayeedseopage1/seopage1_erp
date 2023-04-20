{{-- <h3 class="heading-h1" id="right-modal-title">Project: <a href="{{route('projects.show', $project->id)}}">{{$project->project_name}}</a></h3>--}}
{{-- <h3 class="f-16" id="right-modal-title">Parent Task: <a href="{{route('tasks.show', $task->id)}}">{{$task->heading}}</a></h3>--}}
<h3 class="heading-h1" id="right-modal-title">Subtasks of {{$task->heading}}</a></h3>
 <div class="filter-box">
     <!-- FILTER START -->
     <form action="" id="filter-form2">
         <div class="d-lg-flex d-md-flex d-block flex-wrap filter-box bg-white client-list-filter">
             <!-- DATE START -->
             <div class="select-box d-flex pr-2 border-right-grey border-right-grey-sm-0">
                 <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">Date</p>
                 <div class="select-status d-flex">
                     <input type="text" class="position-relative text-dark form-control border-0 p-2 text-left f-14 f-w-500" id="datatableRange2" placeholder="Start Date To End Date" autocomplete="off">
                 </div>
             </div>
             <!-- DATE END -->
             <div class="select-box d-flex py-2 px-lg-2 px-md-2 px-0 border-right-grey border-right-grey-sm-0">
                 <p class="mb-0 pr-3 f-14 text-dark-grey d-flex align-items-center">Status</p>
                 <div class="select-status">
                    @php
                $taskBoardStatus= App\Models\TaskBoardColumn::all();
                    @endphp
                     <select class="form-control select-picker" name="status" id="status" data-live-search="true" data-size="8">
                         <option value="not finished">Hide completed task</option>
                         <option {{ request('status') == 'all' ? 'selected' : '' }} value="all">@lang('app.all')</option>
                         @foreach ($taskBoardStatus as $status)
                             <option value="{{ $status->id }}">{{ $status->slug == 'completed' || $status->slug == 'incomplete' ? __('app.' . $status->slug) : mb_ucwords($status->column_name) }}</option>
                         @endforeach
                     </select>
                 </div>
             </div>
             <!-- SEARCH BY TASK START -->
             <div class="task-search d-flex  py-1 px-lg-3 px-0 border-right-grey align-items-center">
                 <div class="input-group bg-grey rounded">
                     <div class="input-group-prepend">
                        <span class="input-group-text border-0 bg-additional-grey">
                            <i class="fa fa-search f-13 text-dark-grey"></i>
                        </span>
                     </div>
                     <input type="text" class="form-control f-14 p-1 border-additional-grey" id="search2" placeholder="Start typing to search" autocomplete="off">
                 </div>
             </div>
             <!-- SEARCH BY TASK END -->

             <!-- RESET START -->
             <div class="select-box d-flex py-1 px-lg-2 px-md-2 px-0">
                 <x-forms.button-secondary class="btn-xs {{ request('overdue') != 'yes' ? 'd-none' : '' }}" id="reset-filters2" icon="times-circle">
                     @lang('app.clearFilters')
                 </x-forms.button-secondary>
             </div>
             <!-- RESET END -->
         </div>
     </form>
     <!-- FILTER END -->
 </div>
<div class="d-flex flex-column w-tables rounded mt-3 bg-white">
	<div class="dataTables_wrapper dt-bootstrap4 no-footer">
		<div class="row mt-4">
			<div class="col-sm-12">
				<x-table class="border-0 pb-3 admin-dash-table table-hover subTasksTable">
					<x-slot name="thead">
						<th scope="col">Task name</th>
						<th scope="col">Timer</th>
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
						<th scope="col">Action</th>
					</x-slot>
					@forelse($tasks as $key => $value2)
					@php
						$value= App\Models\Task::where('subtask_id',$value2->id)->first();
					@endphp
					<tr id="row-{{ $value->id }}">
						<td><a class="openRightModal" title="{{$value->heading}}" href="{{route('tasks.show', $value->id)}}">{{Str::limit($value->heading,30)}}</a></td>
						<td>
							@php
								$timer_check= App\Models\ProjectTimeLog::where('task_id',$value->id)->where('start_time','!=',null)->where('end_time',null)->count();
							@endphp
							@if($timer_check > 0)
								<i class="fa-solid fa-circle-play" style="color:green;"></i> Active
							@else
								<i class="fa-solid fa-circle-stop" style="color:red;"></i> Inactive
							@endif
						</td>
						<td><a class="openRightModal" title="{{$task->heading}}" href="{{route('tasks.show', $task->id)}}">{{Str::limit($task->heading,30)}}</a></td>
						<td><a class="openRightModal" href="{{route('clients.show', $project->client->id)}}">{{$project->client->name}}</a></td>
						<td><a class="openRightModal" title="{{$project->project_name}}" href="{{route('projects.show', $value->project->id)}}">{{Str::limit($project->project_name, 30)}}</a></td>
						@php
							$assignedTo = \App\Models\TaskUser::where('task_id', $value->id)->first();
						@endphp
						<td><a class="openRightModal" href="{{route('employees.show', $assignedTo->user->id)}}">{{$assignedTo->user->name}}</a></td>
						<td><a class="openRightModal" href="{{route('employees.show', $value->addedByUser->id)}}">{{$value->addedByUser->name}}</a></td>
						<td>{{$value->start_date}}</td>
						<td>{{$value->due_date}}</td>
						<td>{{$value->estimate_hours}} Hours {{$value->estimate_minutes}} minutes</td>
						<td>
							@php
							$timeLog = '--';
			                if($value->timeLogged) {
			                    $totalMinutes = $value->timeLogged->sum('total_minutes');

			                    $breakMinutes = $value->breakMinutes();
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
							<i class="fa fa-circle mr-1 text-yellow" style="color:  {{$value->boardColumn->label_color}} "></i>{{$value->boardColumn->column_name}}
						</td>
						
						<td>
							<a class="openRightModal" href="{{route('tasks.show', $value->id)}}" class="text-darkest-grey">
								<i class="fa fa-eye fa-2x"></i>
							</a>
							<a class="openRightModal" href="{{route('tasks.edit', $value->id)}}" class="text-darkest-grey">
								<i class="fas fa-edit fa-2x"></i>
							</a>
						</td>
					</tr>
					@empty
					<tr>
						<td colspan="14">
							<x-cards.no-record icon="list" :message="__('messages.noRecordFound')" />
						</td>
					</tr>
					@endforelse
				</x-table>
			</div>
		</div>
	</div>
</div>

<script src="{{ asset('vendor/jquery/daterangepicker.min.js') }}"></script>
<script type="text/javascript">
    @php
        $startDate = \Carbon\Carbon::now()->startOfMonth()->subMonths(1)->addDays(20);
        $endDate = \Carbon\Carbon::now()->startOfMonth()->addDays(20);
    @endphp
    $(function() {
        var format = '{{ global_setting()->moment_format }}';
        var startDate = "{{ $startDate->format(global_setting()->date_format) }}";
        var endDate = "{{ $endDate->format(global_setting()->date_format) }}";
        var picker = $('#datatableRange2');
        var start = moment(startDate, format);
        var end = moment(endDate, format);

        function cb(start, end) {
            $('#datatableRange2').val(start.format('{{ global_setting()->moment_date_format }}') +
                ' @lang("app.to") ' + end.format( '{{ global_setting()->moment_date_format }}'));
            $('#reset-filters2').removeClass('d-none');
        }

        $('#datatableRange2').daterangepicker({
            locale: daterangeLocale,
            linkedCalendars: false,
            startDate: start,
            endDate: end,
            ranges: daterangeConfig,
            opens: 'left',
            parentEl: '.dashboard-header'
        }, cb);

        $('#datatableRange2').on('apply.daterangepicker', function(ev, picker) {
            showTable();
        });
    });
    $('#projects-table').on('preXhr.dt', function(e, settings, data) {

        var status = $('#status').val();
        var clientID = $('#client_id').val();
        var categoryID = $('#category_id').val();
        var teamID = $('#team_id').val();
        var employee_id = $('#employee_id').val();
        var pinned = $('#pinned').val();
        var searchText = $('#search-text-field').val();

        @if (request('deadLineStartDate') && request('deadLineEndDate'))
            deadLineStartDate = '{{ request("deadLineStartDate") }}';
        deadLineEndDate = '{{ request("deadLineEndDate") }}'
        @endif

            data['status'] = status;
        data['client_id'] = clientID;
        data['pinned'] = pinned;
        data['category_id'] = categoryID;
        data['team_id'] = teamID;
        data['employee_id'] = employee_id;
        data['deadLineStartDate'] = deadLineStartDate;
        data['deadLineEndDate'] = deadLineEndDate;
        data['searchText'] = searchText;
        var dateRangePicker = $('#datatableRange2').data('daterangepicker');
        var startDate = $('#datatableRange').val();

        if (startDate == '') {
            data['startDate'] = null;
            data['endDate'] = null;
        } else {
            data['startDate'] = dateRangePicker.startDate.format('{{ global_setting()->moment_date_format }}');
            data['endDate'] = dateRangePicker.endDate.format('{{ global_setting()->moment_date_format }}');
        }

        @if (!is_null(request('start')) && !is_null(request('end')))
            data['startDate'] = '{{ request('start') }}';
        data['endDate'] = '{{ request('end') }}';
        @endif
    });
</script>
<script>
    $('#reset-filters2').click(function() {
        $('#filter-form2')[0].reset();

        $('.filter-box #status').val('not finished');
        $('.filter-box #date_filter_on').val('start_date');
        $('.filter-box #assignedTo').val('all');
        $('.filter-box .select-picker').selectpicker("refresh");
        $('#reset-filters2').addClass('d-none');
        showTable();
    });
    $(document).on('keyup',function (e) {
        e.preventDefault();
        let search_string = $('#search2').val();
        var url = $(this).attr('href');
        $.ajax({
            url:"#",
            method:'GET',
            data:{search_string:search_string ,id:{{request('id')}}},
            success:function (response) {
                $('.subTasksTable').html(response);
                if (response.status == 'success') {
                    $('#right-modal-content').html(response.data);
                }
                if(response.status==400){
                    $('.subTasksTable').html('<span class="text-danger" style="margin-left: 50%;">'+'Nothing Found!'+'</span>');
                }
            }
        });
    })
</script>
