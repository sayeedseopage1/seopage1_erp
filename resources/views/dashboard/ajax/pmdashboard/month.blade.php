<div class="row">
    <div class="col-md-4">
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0">
            <div class="d-block text-capitalize">
                <h5 class="f-15 f-w-500 mb-20 text-darkest-grey">No of Projects</h5>
                <div class="d-flex">
                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-blue d-grid mr-5">
                            {{ $no_of_inprogress }}<span class="f-12 font-weight-normal text-lightest">@lang('In Progress') </span>
                        </p>
                    </a>

                    <a href="#">
                        <p class="mb-0 f-21 font-weight-bold text-red d-grid">{{$no_of_canceled}}
                            <span class="f-12 font-weight-normal text-lightest">@lang('Canceled')</span>
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
                            {{ round($total_project_value,2) }} ($)<span class="f-12 font-weight-normal text-lightest">@lang('Amount (USD)') </span>
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
                            {{ round($total_released_amount,2) }} ($)<span class="f-12 font-weight-normal text-lightest">  @lang('Amount (USD)') </span>
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
                            {{ round($percentage_of_complete_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest"> </span>
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
                            {{ round($percentage_of_canceled_project_count,2) }}%<span class="f-12 font-weight-normal text-lightest"> </span>
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
                            {{ round($avg_project_completion_time,2) }} Days<span class="f-12 font-weight-normal text-lightest"> </span>
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
                            {{ round($total_canceled_project,2) }}<span class="f-12 font-weight-normal text-lightest"> </span>
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
                            0<span class="f-12 font-weight-normal text-lightest"> </span>
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
                            {{ round($avg_project_completion_time,2) }} Days<span class="f-12 font-weight-normal text-lightest"></span>
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
                            {{ round($total_canceled_project,2) }}<span class="f-12 font-weight-normal text-lightest"></span>
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
                            0%<span class="f-12 font-weight-normal text-lightest"></span>
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0 h-200">
            <div class="d-block text-capitalize">
                <h4 class="f-18 f-w-500 mb-2"><strong>Total Projects</strong></h4>
                <x-table class="h-200">
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
        <div class="bg-white p-20 rounded b-shadow-4 d-flex justify-content-between align-items-center mb-4 mb-md-0 mb-lg-0 h-200">
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