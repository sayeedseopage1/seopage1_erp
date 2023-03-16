<div class="row">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of Projects</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $no_of_inprogress }}<span class="f-12 font-weight-normal text-lightest">
                            @lang('In Progress') </span>
                        </p>
                    </a>

                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{$no_of_canceled}}<span
                            class="f-12 font-weight-normal text-lightest">@lang('Canceled')</span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Project Value</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_project_value,2) }} ($)<span class="f-12 font-weight-normal text-lightest">
                            @lang('Amount (USD)') </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Total Released Amount</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_released_amount,2) }} ($)<span class="f-12 font-weight-normal text-lightest">
                            @lang('Amount (USD)') </span>
                        </p>
                    </a>


                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>
<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% Projects Got Completed/Money Released</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($percentage_of_complete_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% Projects Got Canceled</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($percentage_of_canceled_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Average Project Completion Time</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($avg_project_completion_time,2) }} Days<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Of Projects Got Canceled</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_canceled_project,2) }}<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No. Of Cross/Upsell Projects</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>


                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Avg. Payment Release Time</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($avg_project_completion_time,2) }} Days<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>


                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>

<div class="row mt-3">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">Negative Feedbacks After Submission</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($total_canceled_project,2) }}<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Projects Completed on Time</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            0%<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">% of Project on Hold</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ round($percentage_of_onhold_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest">
                            </span>
                        </p>
                    </a>
                </div>
            </div>
            <div class="d-block">
                <i class="fa fa-list text-lightest f-27"></i>
            </div>
        </div>
    </div>
</div>




<div class="row mt-3">
    <div class="col-sm-6">
        <x-cards.data class="mb-3" :title="__('Total Projects (Status Wise)')" padding="false" otherClasses="h-200">
            <x-table>
                <?php
                $status= App\Models\ProjectStatusSetting::where('status','active')->orderBy('priority','asc')->get();
                ?>     
                <x-slot name="thead">
                    <th>#</th>
                    <th class="pl-20 text-capitalize">Status Name</th>
                    <th>No of Projects</th>

                </x-slot>
                @foreach($status as $st)
                <?php
                $total_project_st_count= App\Models\Project::where('pm_id',Auth::id())->where('status',$st->status_name)->whereBetween(DB::raw('DATE(`updated_at`)'), [$startDate, $endDate])->count();

                ?>
                <tr>
                    <td>
                        {{$loop->index+1}}
                    </td>
                    <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$st->color}}"></i>
                        {{$st->status_name}}
                    </td>
                    <td class="pl-20">{{$total_project_st_count}}</td>
                </tr>
                @endforeach
            </x-table>
        </x-cards.data>
    </div>
    <div class="col-sm-6">
        <x-cards.data class="mb-3" :title="__('Total Tasks (Status Wise)')" padding="false" otherClasses="h-200">
            <x-table>
                <?php
                $task_status= App\Models\TaskBoardColumn::orderBy('priority','asc')->get();
                ?>     
                <x-slot name="thead">
                    <th>#</th>
                    <th class="pl-20 text-capitalize">Status Name</th>
                    <th>No of Projects</th>

                </x-slot>
                @foreach($task_status as $st)
                <?php
                $task_count= App\Models\Task::where('added_by',Auth::id())->where('board_column_id',$st->id)->whereBetween(DB::raw('DATE(`created_at`)'), [$startDate, $endDate])->count();
                ?>
                <tr>
                    <td>
                        {{$loop->index+1}}
                    </td>
                    <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$st->label_color}}"></i>
                        {{$st->column_name}}
                    </td>
                    <td class="pl-20">{{$task_count}}</td>
                </tr>
                @endforeach
            </x-table>
        </x-cards.data>
    </div>
</div>
<div class="row mt-3 mb-3">
    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h4 class="f-18 f-w-500 mb-2"><strong>Total Projects</strong></h4>
                <x-table>
                    <?php
                    $projects= App\Models\Project::where('pm_id',Auth::id())->orderBy('id','desc')->get();
                    ?>     
                    <x-slot name="thead">
                        <th>#</th>

                        <th class="pl-20 text-capitalize">Project</th>
                        <th class="pl-20 text-capitalize">Project Value</th>
                        <th class="pl-20 text-capitalize">Client</th>
                        <th class="pl-20 text-capitalize">Deadline</th>
                        <th class="pl-20 text-capitalize">Progress</th>
                        <th class="pl-20">Status</th>

                    </x-slot>
                    @foreach($pm_projects as $project)
                    <?php
                    $deal= App\Models\Deal::where('id',$project->deal_id)->first();
                    $project_status= App\Models\ProjectStatusSetting::where('status_name',$project->status)->first();
                    if ($project->completion_percent < 50) {
                        $statusColor = 'danger';
                    }
                    elseif ($project->completion_percent >= 50 && $project->completion_percent < 75) {
                        $statusColor = 'warning';
                    }
                    else {
                        $statusColor = 'success';
                    }

                    ?>
                    <tr>
                        <td>
                            {{$loop->index+1}}
                        </td>

                        <td class="pl-20 text-capitalize ">
                            <a class="text-darkest-grey openRightModal RightModal" id="RightModal" title="{{$project->project_name}}" href="/account/projects/{{$project->id}}" target="_blank">{{Str::limit($project->project_name,15)}}</a>
                        </td>
                        <td class="pl-20 text-capitalize">{{$deal->actual_amount}}{{$deal->original_currency->currency_symbol}}</td>
                        <td class="pl-20 text-capitalize">
                            <a class="openRightModal"  href="/account/clients/{{$project->client_id}}" title="{{$project->client_name->user_name}}" data-tooltip-bottom="{{$project->client_name->user_name}}">
                                @if($project->client_name->image != null)
                                <img class="mr-2 taskEmployeeImg rounded-circle" data-original-title="{{$project->client_name->user_name}}" src="{{asset('user-uploads/avatar/'. $project->client_name->image)}}" alt="{{$project->client_name->user_name}}">
                                @else
                                <img class="mr-2 taskEmployeeImg rounded-circle" src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$project->client_name->user_name}}" alt="{{$project->client_name->user_name}}" >
                                @endif
                            </a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            @if($project->deadline != null)
                            {{$project->deadline->format('Y-m-d')}}
                            @else
                            --
                            @endif
                        </td>
                        <td class="pl-20 text-capitalize">
                            <div class="progress" style="height: 15px;">
                                <div class="progress-bar f-12 bg-{{$statusColor}}" role="progressbar" style="width: {{$project->completion_percent}}%;" aria-valuenow="{{$project->completion_percent}}" aria-valuemin="0" aria-valuemax="100">{{$project->completion_percent}}%</div>
                            </div>
                        </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$project_status->color}};"></i> {{$project_status->status_name}}</td>

                    </tr>
                    @endforeach

                </x-table>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h4 class="f-18 f-w-500 mb-2"><strong>Total Tasks Assigned By Me</strong></h4>
                <x-table>
                    <x-slot name="thead">
                        <th>#</th>

                        <th class="pl-20 text-capitalize">Task</th>
                        <th class="pl-20 text-capitalize">Project</th>
                        <th class="pl-20 text-capitalize">Client</th>
                        <th class="pl-20 text-capitalize">Assignee</th>
                        <th class="pl-20">Status</th>

                    </x-slot>
                    @foreach($tasks as $task)
                    <?php
                    $task_member= App\Models\TaskUser::where('task_id',$task->id)->first();
                    $user_name= App\Models\User::where('id',$task_member->user_id)->first();
                    ?>
                    <tr>
                        <td>
                            {{$loop->index+1}}
                        </td>

                        <td class="pl-20 text-capitalize ">
                            <a class="text-darkest-grey openRightModal" title="{{$task->heading}}" href="/account/tasks/{{$task->id}}" target="_blank">{{$task->heading}}</a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class="text-darkest-grey openRightModal RightModal" title="{{$task->project->project_name}}" id="RightModal" href="/account/projects/{{$task->project->id}}" target="_blank">{{Str::limit($task->project->project_name,15)}}</a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class="openRightModal"  href="/account/clients/{{$task->project->client_id}}" title="{{$task->project->client_name->user_name}}" data-tooltip-bottom="{{$task->project->client_name->user_name}}">
                                @if($task->project->client_name->image != null)
                                <img class="mr-2 taskEmployeeImg rounded-circle" data-original-title="{{$task->project->client_name->user_name}}" src="{{asset('user-uploads/avatar/'. $task->project->client_name->image)}}" alt="{{$task->project->client_name->user_name}}">
                                @else
                                <img class="mr-2 taskEmployeeImg rounded-circle" src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$task->project->client_name->user_name}}" alt="{{$task->project->client_name->user_name}}" >
                                @endif
                            </a>
                        </td>
                        <td class="pl-20 text-capitalize">
                            <a class=""  href="/account/employees/{{$user_name->name}}" title="{{$user_name->name}}" data-tooltip-bottom="{{$user_name->name}}">
                                @if($task->project->client_name->image != null)
                                <img class="mr-2 taskEmployeeImg rounded-circle" data-original-title="{{$user_name->name}}" src="{{asset('user-uploads/avatar/'. $user_name->image)}}" alt="{{$user_name->name}}">
                                @else
                                <img class="mr-2 taskEmployeeImg rounded-circle" src="{{asset('user-uploads/avatar/avatar_blank.png')}}" title="{{$user_name->name}}" alt="{{$user_name->name}}" >
                                @endif
                            </a>
                        </td>
                        <td class="pl-20 text-capitalize"><i class="fas fa-circle" style="color:{{$task->stat->label_color}}"></i> {{$task->status}}</td>

                    </tr>
                    @endforeach

                </x-table>

            </div>
        </div>
    </div>
</div>

<div class="row">
    @if (in_array('my_task', $activeWidgets))

    <div class="col-md-6">
        <div class="card border-0 b-shadow-4 mb-3 e-d-info">
            <x-cards.data :title="__('modules.tasks.myTask')" padding="false" otherClasses="h-200">
                <x-table>
                    <x-slot name="thead">
                        <th>@lang('app.task')#</th>
                        <th>@lang('app.task')</th>
                        <th>@lang('app.status')</th>
                        <th class="text-right pr-20">@lang('app.dueDate')</th>
                    </x-slot>

                    @forelse ($pendingTasks as $task)
                    <tr>
                        <td class="pl-20">
                            #{{ $task->id }}
                        </td>
                        <td>
                            <div class="media align-items-center">
                                <div class="media-body">
                                    <h5 class="f-12 mb-1 text-darkest-grey"><a
                                        href="{{ route('tasks.show', [$task->id]) }}"
                                        class="openRightModal">{{ ucfirst($task->heading) }}</a>
                                    </h5>
                                    <p class="mb-0">
                                        @foreach ($task->labels as $label)
                                        <span class="badge badge-secondary mr-1"
                                        style="background-color: {{ $label->label_color }}">{{ $label->label_name }}</span>
                                        @endforeach
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="pr-20">
                            <i class="fa fa-circle mr-1 text-yellow"
                            style="color: {{ $task->boardColumn->label_color }}"></i>
                            {{ $task->boardColumn->column_name }}
                        </td>
                        <td class="pr-20" align="right">
                            @if (is_null($task->due_date))
                            --
                            @elseif ($task->due_date->endOfDay()->isPast())
                            <span
                            class="text-danger">{{ $task->due_date->format(global_setting()->date_format) }}</span>
                            @elseif ($task->due_date->setTimezone(global_setting()->timezone)->isToday())
                            <span class="text-success">{{ __('app.today') }}</span>
                            @else
                            <span>{{ $task->due_date->format(global_setting()->date_format) }}</span>
                            @endif
                        </td>
                    </tr>
                    @empty
                    <tr>
                        <td colspan="4" class="shadow-none">
                            <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                        </td>
                    </tr>
                    @endforelse
                </x-table>
            </x-cards.data>
        </div>
    </div>

    @endif
    <div class="col-md-6">
        @if (in_array('week_timelog', $activeWidgets))
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center">
        <div class="d-block text-capitalize w-100">
            <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">@lang('modules.dashboard.weekTimelog') <span class="badge badge-secondary ml-1 f-10">{{ minute_to_hour($weekWiseTimelogs - $weekWiseTimelogBreak) . ' ' . __('modules.timeLogs.thisWeek') }}</span></h5>

            <div id="weekly-timelogs">
                <nav class="mb-3">
                    <ul class="pagination pagination-sm week-pagination">
                        @foreach ($weekPeriod->toArray() as $date)
                        <li @class([
                        'page-item',
                        'week-timelog-day',
                        'active' => (now(global_setting()->timezone)->toDateString() == $date->toDateString()),
                        ])
                        data-toggle="tooltip" data-original-title="{{ $date->format(global_setting()->date_format) }}" data-date="{{ $date->toDateString() }}">
                        <a class="page-link" href="javascript:;">{{ $date->isoFormat('dd') }}</a>
                    </li>
                    @endforeach
                </ul>
            </nav>
            <div class="progress" style="height: 7px;">
                @php
                $totalDayMinutes = $dateWiseTimelogs->sum('total_minutes');
                $totalDayBreakMinutes = $dateWiseTimelogBreak->sum('total_minutes');
                $totalDayMinutesPercent = ($totalDayMinutes > 0) ? floatval((floatval($totalDayMinutes - $totalDayBreakMinutes)/$totalDayMinutes) * 100) : 0;
                @endphp
                <div class="progress-bar bg-primary" role="progressbar" style="width: {{ $totalDayMinutesPercent }}%" aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-original-title="{{ minute_to_hour($totalDayMinutes - $totalDayBreakMinutes) }}"></div>

                <div class="progress-bar bg-secondary" role="progressbar" style="width: {{ (100 - $totalDayMinutesPercent) }}%" aria-valuenow="{{ $totalDayMinutesPercent }}" aria-valuemin="0" aria-valuemax="100" data-toggle="tooltip" data-original-title="{{ minute_to_hour($totalDayBreakMinutes) }}"></div>
            </div>

            <div class="d-flex justify-content-between mt-1 text-dark-grey f-12">
                <small>@lang('app.duration'): {{ minute_to_hour($dateWiseTimelogs->sum('total_minutes') - $dateWiseTimelogBreak->sum('total_minutes')) }}</small>
                <small>@lang('modules.timeLogs.break'): {{ minute_to_hour($dateWiseTimelogBreak->sum('total_minutes')) }}</small>
            </div>
        </div>

    </div>

</div>

@endif
</div>
</div>

@if (in_array('my_calender', $activeWidgets))
<div class="row mt-3">
    <div class="col-md-6">
        <x-cards.data :title="__('app.menu.myCalendar')">
            <div id="calendar"></div>
            <x-slot name="action">
                <div class="dropdown ml-auto calendar-action">
                    <button id="event-btn" class="btn btn-lg f-14 p-0 text-lightest text-capitalize rounded  dropdown-toggle cal-event" type="button"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-ellipsis-h"></i>
                </button>

                <div id="cal-drop" class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-2">
                    @if(in_array('tasks', user_modules()))
                    <div class="custom-control custom-checkbox cal-filter">
                        <input type="checkbox" value="task"
                        class="form-check-input filter-check" name="calendar[]"
                        id="customCheck1" @if(in_array('task',$event_filter)) checked @endif>
                        <label
                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                        for="customCheck1">@lang('app.menu.tasks')</label>
                    </div>
                    @endif
                    @if(in_array('events', user_modules()))
                    <div class="custom-control custom-checkbox cal-filter">
                        <input type="checkbox" value="events"
                        class="form-check-input filter-check" name="calendar[]"
                        id="customCheck2" @if(in_array('events',$event_filter)) checked @endif>
                        <label
                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                        for="customCheck2">@lang('app.menu.Events')</label>
                    </div>
                    @endif
                    @if(in_array('holidays', user_modules()))
                    <div class="custom-control custom-checkbox cal-filter">
                        <input type="checkbox" value="holiday"
                        class="form-check-input filter-check" name="calendar[]"
                        id="customCheck3" @if(in_array('holiday',$event_filter)) checked @endif>
                        <label
                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                        for="customCheck3">@lang('app.menu.holiday')</label>
                    </div>
                    @endif
                    @if(in_array('tickets', user_modules()))
                    <div class="custom-control custom-checkbox cal-filter">
                        <input type="checkbox" value="tickets"
                        class="form-check-input filter-check" name="calendar[]"
                        id="customCheck4" @if(in_array('tickets',$event_filter)) checked @endif>
                        <label
                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                        for="customCheck4">@lang('app.menu.tickets')</label>
                    </div>
                    @endif
                    @if(in_array('leaves', user_modules()))
                    <div class="custom-control custom-checkbox cal-filter">
                        <input type="checkbox" value="leaves"
                        class="form-check-input filter-check" name="calendar[]"
                        id="customCheck5" @if(in_array('leaves',$event_filter)) checked @endif>
                        <label
                        class="form-check-label form_custom_label text-dark-grey pl-2 mr-3 justify-content-start cursor-pointer checkmark-20 pt-2 text-wrap"
                        for="customCheck5">@lang('app.menu.leaves')</label>
                    </div>
                    @endif
                </div>
            </div>
        </x-slot>



    </x-cards.data>
</div>
@if (!is_null($myActiveTimer))
<div class="col-md-6" id="myActiveTimerSection">
    <x-cards.data :title="__('modules.timeLogs.myActiveTimer')">
        <div class="row">
            <div class="col-sm-12">
                {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format('M d, Y' . ' - ' . global_setting()->time_format) }}
                <p class="text-primary my-2">
                    @php
                    $endTime = now();
                    $totalHours = $endTime->diff($myActiveTimer->start_time)->format('%d') * 24 + $endTime->diff($myActiveTimer->start_time)->format('%H');
                    $totalMinutes = $totalHours * 60 + $endTime->diff($myActiveTimer->start_time)->format('%i');

                    $totalMinutes = $totalMinutes - $myActiveTimer->breaks->sum('total_minutes');

                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if ($totalMinutes % 60 > 0) {
                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                    }
                    @endphp

                    <strong>@lang('modules.timeLogs.totalHours'):</strong> {{ $timeLog }}
                </p>

                <ul class="list-group">
                    <li
                    class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                    <span><i class="fa fa-clock"></i>
                    @lang('modules.timeLogs.startTime')</span>
                    {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                </li>
                <li
                class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                <span><i class="fa fa-briefcase"></i> @lang('app.task')</span>
                <a href="{{ route('tasks.show', $myActiveTimer->task->id) }}"
                    class="text-dark-grey openRightModal">{{ $myActiveTimer->task->heading }}</a>
                </li>
                @foreach ($myActiveTimer->breaks as $item)
                <li
                class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                @if (!is_null($item->end_time))
                @php
                $endTime = $item->end_time;
                $totalHours = $endTime->diff($item->start_time)->format('%d') * 24 + $endTime->diff($item->start_time)->format('%H');
                $totalMinutes = $totalHours * 60 + $endTime->diff($item->start_time)->format('%i');

                $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                if ($totalMinutes % 60 > 0) {
                    $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                }
                @endphp
                <span><i class="fa fa-mug-hot"></i>
                    @lang('modules.timeLogs.break')
                    ({{ $timeLog }})
                </span>
                {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) . ' - ' . $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                @else
                <span><i class="fa fa-mug-hot"></i>
                @lang('modules.timeLogs.break')</span>
                {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                @endif
            </li>
            @endforeach
        </ul>

    </div>
    <div class="col-sm-12 pt-3 text-right">
        @if ($editTimelogPermission == 'all' || ($editTimelogPermission == 'added' && $myActiveTimer->added_by == user()->id) || ($editTimelogPermission == 'owned' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id)) || ($editTimelogPermission == 'both' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id || $myActiveTimer->added_by == user()->id)))
        @if (is_null($myActiveTimer->activeBreak))
        <x-forms.button-secondary icon="pause-circle"
        data-time-id="{{ $myActiveTimer->id }}" id="pause-timer-btn">
    @lang('modules.timeLogs.pauseTimer')</x-forms.button-secondary>
    <x-forms.button-primary class="ml-3 stop-active-timer"
    data-time-id="{{ $myActiveTimer->id }}" icon="stop-circle">
@lang('modules.timeLogs.stopTimer')</x-forms.button-primary>
@else
<x-forms.button-primary id="resume-timer-btn" icon="play-circle"
data-time-id="{{ $myActiveTimer->activeBreak->id }}">
@lang('modules.timeLogs.resumeTimer')</x-forms.button-primary>
@endif
@endif
</div>
</div>
</x-cards.data>
</div>
@endif
</div>
@endif

<div class="row mt-3 mb-3
">

@if (in_array('notices', $activeWidgets))
@isset($notices)
<!-- EMP DASHBOARD NOTICE START -->
<div class="col-md-6">
    <div class="b-shadow-4 rounded bg-white pb-2">
        <!-- NOTICE HEADING START -->
        <div class="d-flex align-items-center b-shadow-4 p-20">
            <p class="mb-0 f-18 f-w-500"> @lang('app.menu.notices') </p>
        </div>
        <!-- NOTICE HEADING END -->
        <!-- NOTICE DETAIL START -->
        <div class="b-shadow-4 cal-info scroll ps" data-menu-vertical="1" data-menu-scroll="1"
        data-menu-dropdown-timeout="500" id="empDashNotice" style="overflow: hidden;">


        @foreach ($notices as $notice)
        <div class="card border-0 b-shadow-4 p-20 rounded-0">
            <div class="card-horizontal">
                <div class="card-header m-0 p-0 bg-white rounded">
                    <x-date-badge :month="$notice->created_at->format('M')" :date="$notice->created_at
                        ->timezone(global_setting()->timezone)
                        ->format('d')" />
                    </div>
                    <div class="card-body border-0 p-0 ml-3">
                        <h4 class="card-title f-14 font-weight-normal text-capitalize mb-0">
                            <a href="{{ route('notices.show', $notice->id) }}"
                                class="openRightModal text-darkest-grey">{{ $notice->heading }}</a>
                            </h4>
                        </div>
                    </div>
                </div><!-- card end -->
                @endforeach


                <div class="ps__rail-x" style="left: 0px; top: 0px;">
                    <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
                </div>
                <div class="ps__rail-y" style="top: 0px; left: 0px;">
                    <div class="ps__thumb-y" tabindex="0" style="top: 0px; height: 0px;"></div>
                </div>
            </div>
            <!-- NOTICE DETAIL END -->
        </div>
    </div>
    <!-- EMP DASHBOARD NOTICE END -->
    @endisset
    @endif


</div>
<script type="text/javascript">



    $(document).ready(function(){
        $(".RightModal").click(function(){
            $(".activity").hide();
        });

    });



</script>
