@php
    $editTaskPermission = user()->permission('edit_tasks');
    $sendReminderPermission = user()->permission('send_reminder');
    $changeStatusPermission = user()->permission('change_status');
@endphp
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">

<div id="task-detail-section">
    <div class="row mx-0">
        @if (Auth::user()->role_id == 5 || Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
            <a href="{{ route('tasks.index') }}"><button class="btn btn-primary mb-3">Go back</button></a>
        @else
            <a href="{{ route('projects.show', $task->project_id) }}?tab=tasks"><button class="btn btn-primary mb-3">Go
                    back</button></a>
        @endif
        <h3 class="heading-h1 mb-3 ml-2 align-self-center">{{ ucfirst($task->heading) }}</h3>
    </div>
    <div class="row">
        <div class="col-sm-9 review-card">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-8 col-10">
                            @php
                                $task_member = App\Models\TaskUser::where('task_id', $task->id)->first();
                            @endphp
                            {{-- @if (Auth::user()->role_id == 5 && $task->board_column_id == 1 && $task_member->user_id == Auth::user()->id)
                                <button class="btn-secondary rounded f-14 p-2" data-toggle="modal" data-target="#revision">Revision</button>
                                @include('tasks.modals.develoepr_revision')
                            @endif --}}
                            @if ($changeStatusPermission == 'all' || ($changeStatusPermission == 'added' && $task->added_by == user()->id) || ($changeStatusPermission == 'owned' && in_array(user()->id, $taskUsers)) || ($changeStatusPermission == 'both' && (in_array(user()->id, $taskUsers) || $task->added_by == user()->id)) || ($task->project && $task->project->project_admin == user()->id))
                                <?php
                                $extension_request = App\Models\TaskTimeExtension::where('task_id', $task->id)
                                    ->where('user_id', '!=', Auth::id())
                                    ->first();
                                ?>
                                @if ($extension_request != null)
                                    @if ($extension_request->status == 'pending')
                                        <!-- <x-forms.button-primary icon="check" data-status="completed"
                                    class="change-task-status mr-2 mb-2 mb-lg-0 mb-md-0">
                                    @lang('modules.tasks.markComplete')
                                </x-forms.button-primary> -->

                                        <button class="btn bg-success mr-2 mb-2 mb-lg-0 mb-md-0 text-white" data-toggle="modal" data-target="#extensionrequest">Extension
                                            Request</button>


                                        @include('tasks.modals.extensionrequest')
                                    @endif
                                @endif
                                <?php
                                $task_user = App\Models\TaskSubmission::orderBy('id', 'desc')
                                    ->where('task_id', $task->id)
                                    ->first();
                                //  dd($task_user->user_id,Auth::user()->id);
                                ?>

                                @if ($task->task_status == 'submitted')
                                    <!-- <x-forms.button-primary icon="check" data-status="completed"
                                        class="change-task-status mr-2 mb-2 mb-lg-0 mb-md-0">
                                        @if ($task->board_column_id != 7)
@lang('modules.tasks.markComplete')
@endif
                                    </x-forms.button-primary> -->

                                    @if ($task->added_by == Auth::user()->id || Auth::user()->role_id == 1)
                                        <button class="btn bg-success mr-2 mb-2 mb-lg-0 mb-md-0 text-white" data-toggle="modal" data-target="#taskapprove">Approve</button>
                                        <button class="btn bg-danger mr-3 mb-2 mb-lg-0 mb-md-0 text-white" data-toggle="modal" data-target="#taskBtn">Need Revision</button>

                                        @include('tasks.modals.taskBtn')
                                        @include('tasks.modals.taskapprove')
                                    @endif
                                @endif
                            @endif

                            @if (Auth::user()->role_id == 4)
                                @if ($task->board_column_id == 8)
                                    <button class="btn btn-success mr-2 mb-2 mb-lg-0 mb-md-0" id="submit_task_for_client_approval">Submit Task for Client Approval</button>
                                @endif
                            @endif
                            @if (Auth::user()->role_id == 4)
                                @if ($task->board_column_id == 9)
                                    <button class="btn btn-success mr-2 mb-2 mb-lg-0 mb-md-0" id="client_approve_task">Client Approved Task</button>
                                    <button class="btn btn-danger mr-2 mb-2 mb-lg-0 mb-md-0" data-toggle="modal" data-target="#task_client_has_revision">Client Has Revision</button>
                                    @include('tasks.modals.task_client_has_revision')
                                @endif
                            @endif

                            @php
                                $val = App\Models\ProjectTimeLog::where('task_id', $task->id)
                                    ->latest()
                                    ->first();
                                $task_active_id = App\Models\Task::where('id', $task->id)->first();
                            @endphp
                            @if ($task->task_status == 'in progress' || $task->task_status == 'pending' || $task->task_status == 'revision' || $task->task_status == 'incomplete')
                                @if ($task->boardColumn->slug != 'completed' && !is_null($task->is_task_user))
                                    @if ($task->boardColumn->id != 1)
                                        @if (is_null($task->userActiveTimer))
                                            <x-forms.button-secondary id="start-task-timer" icon="play">
                                                @lang('modules.timeLogs.startTimer')
                                            </x-forms.button-secondary>
                                        @elseif (!is_null($task->userActiveTimer))
                                            <span class="border p-2 rounded mr-2 bg-light"><i class="fa fa-clock mr-1"></i><span id="active-task-timer">{{ $task->userActiveTimer->timer }}</span></span>

                                            @if (is_null($task->userActiveTimer->activeBreak))
                                                {{-- <x-forms.button-secondary icon="pause-circle" data-time-id="{{ $task->userActiveTimer->id }}" id="pause-timer-btn" class="mr-2">@lang('modules.timeLogs.pauseTimer')</x-forms.button-secondary> --}}

                                                <x-forms.button-secondary data-time-id="{{ $task->userActiveTimer->id }}" id="stop-task-timer" icon="stop-circle">
                                                    @lang('modules.timeLogs.stopTimer')
                                                </x-forms.button-secondary>
                                            @else
                                                <x-forms.button-secondary id="resume-timer-btn" icon="play-circle" data-time-id="{{ $task->userActiveTimer->activeBreak->id }}">
                                                    @lang('modules.timeLogs.resumeTimer')</x-forms.button-secondary>
                                            @endif

                                        @endif
                                    @endif
                                @endif
                                @if (Auth::user()->role_id == 5 || Auth::user()->role_id == 6 || Auth::user()->role_id == 4 || Auth::user()->role_id == 9 || Auth::user()->role_id == 10)

                                    @if ($task->task_status == 'in progress' || $task->task_status == 'pending' || $task->task_status == 'revision' || $task->board_column_id == 3)
                                        @php
                                            $task_time = App\Models\ProjectTimelog::orderBy('id', 'desc')
                                                ->where('task_id', $task->id)
                                                ->first();
                                        @endphp
                                        @if ($task->board_column_id != 4 && is_null($task->userActiveTimer) && $task->taskUsers->first()->user_id == Auth::id())

                                            @php
                                                $has_incompleted_task = false;
                                                $subtasks = \App\Models\Subtask::where('task_id', $task->id)->get();
                                                
                                                $subtask_incompleted_count = 0;
                                                foreach ($subtasks as $sub) {
                                                    $subtask_check = App\Models\Task::where('subtask_id', $sub->id)->first();
                                                
                                                    if ($subtask_check->board_column_id == 1 || $subtask_check->board_column_id == 2 || $subtask_check->board_column_id == 3 || $subtask_check->board_column_id == 6) {
                                                        $has_incompleted_task = true;
                                                    }
                                                }
                                                $incompleted_subtask = $subtasks->count() - $subtask_incompleted_count;
                                                //dd($task, $subtasks, $incompleted_subtask, $has_incompleted_task);
                                            @endphp
                                            {{-- && $subtasks->count() != $subtask_incompleted_count --}}
                                            @if (Auth::user()->role_id == 6 && $has_incompleted_task == true && $subtasks->count() != 0)
                                                <button class="btn-secondary rounded f-14 p-2 my-3 disabled"><i class="fa-solid fa-check"></i> Mark As Complete</button>
                                                <!-- <button class="btn-secondary rounded f-14 p-2 my-3" data-toggle="modal" data-target="#markcomplete"><i class="fa-solid fa-check"></i> Mark As Complete</button> -->
                                            @else
                                                @if ($task->boardColumn->id != 1)
                                                    <button class="btn-secondary rounded f-14 p-2 my-3" data-toggle="modal" data-target="#markcomplete"><i class="fa-solid fa-check"></i> Mark As Complete</button>
                                                @endif
                                            @endif
                                        @endif

                                    @endif

                                    <?php
                                    $extension = App\Models\TaskTimeExtension::orderBy('id', 'desc')
                                        ->where('task_id', $task->id)
                                        ->where('user_id', Auth::id())
                                        ->first();
                                    $task_member = App\Models\TaskUser::where('task_id', $task->id)->first();
                                    ?>

                                    @if ($task->task_status == 'in progress' || $task->task_status == 'pending' || $task->task_status == 'revision')
                                        @if ($extension == null && $task_member->user_id == Auth::user()->id)
                                            <button class="btn-secondary rounded f-14 p-2" data-toggle="modal" data-target="#timextension"><i class="fa-solid fa-plus"></i> Request
                                                Time Extension</button>
                                        @endif
                                    @endif

                                    @if ($task->board_column_id == 1 && $task_member->user_id == Auth::user()->id)
                                        <button class="btn-secondary rounded f-14 p-2" data-toggle="modal" data-target="#revision"> Revision</button>

                                        @if (Auth::user()->role_id == 5)
                                            @include('tasks.modals.develoepr_revision')
                                        @elseif(Auth::user()->role_id == 6 || Auth::user()->role_id == 9 || Auth::user()->role_id == 10)
                                            @include('tasks.modals.revision')
                                        @endif
                                    @endif





                                    @include('tasks.modals.markcomplete')
                                    @include('tasks.modals.timeextension')




                                    <?php
                                    
                                    $extension_status = App\Models\TaskTimeExtension::orderBy('id', 'desc')
                                        ->where('task_id', $task->id)
                                        ->first();
                                    ?>


                                    @if ($extension_status != null)
                                        @if ($extension_status->status == 'pending' || $extension_status->status != 'approved')
                                            <!-- <button class="btn btn-primary" ><i class="fa-solid fa-check"></i> Submitted for Extension</button> -->
                                            <div class="d-flex justify-content-center float-right">


                                                <h4> <span class="badge badge-success">Submitted for Extension</span>
                                                </h4>
                                            </div>
                                        @endif
                                    @endif
                                @endif



                            @endif
                        </div>

                        <div class="col-lg-4 col-2 text-right">
                            <div class="dropdown">
                                <button class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-ellipsis-h"></i>
                                </button>

                                <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0" aria-labelledby="dropdownMenuLink" tabindex="0">

                                    @if ($sendReminderPermission == 'all' && $task->boardColumn->slug != 'completed')
                                        <a class="dropdown-item" id="reminderButton" href="javascript:;">@lang('modules.tasks.reminder')</a>
                                    @endif

                                    @if ($editTaskPermission == 'all' || ($editTaskPermission == 'added' && $task->added_by == user()->id) || ($task->project && $task->project->project_admin == user()->id))
                                        <a class="dropdown-item" href="{{ route('tasks.edit', $task->id) }}">@lang('app.edit')
                                            @lang('app.task')</a>

                                        <hr class="my-1">
                                    @endif

                                    @php $pin = $task->pinned() @endphp

                                    @if ($pin)
                                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="pinned">@lang('app.unpin')
                                            @lang('app.task')</a>
                                    @else
                                        <a class="dropdown-item" href="javascript:;" id="pinnedItem" data-pinned="unpinned">@lang('app.pin')
                                            @lang('app.task')</a>
                                    @endif

                                    @if (($taskSettings->copy_task_link == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                        <a class="dropdown-item btn-copy" href="javascript:;" data-clipboard-text="{{ route('front.task_detail', $task->hash) }}">@lang('modules.tasks.copyTaskLink')</a>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <?php
                    
                    $task_name = App\Models\Task::where('id', $task->dependent_task_id)->first();
                    
                    ?>
                    @if ($task_name != null)
                        @if (($taskSettings->description == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                            <div class="col-12 px-0 pb-3 d-lg-flex d-md-flex d-block">
                                <p class="mb-0 text-lightest f-14 w-30 text-capitalize">
                                    Parent Task
                                </p>
                                <div class="mb-0 text-dark-grey">
                                    <a class="text-dark-grey" style="font-weight:bold;" href="/account/tasks/{{ $task_name->id }}">{{ $task_name->heading }}</a>
                                </div>


                            </div>
                        @endif
                    @endif
                    @if (($taskSettings->project == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('app.project')
                            </p>
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                @if ($task->project_id)
                                    @if ($task->project->status == 'in progress')
                                        <i class="fa fa-circle mr-1 text-blue f-10"></i>
                                    @elseif ($task->project->status == 'on hold')
                                        <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                                    @elseif ($task->project->status == 'not started')
                                        <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                                    @elseif ($task->project->status == 'canceled')
                                        <i class="fa fa-circle mr-1 text-red f-10"></i>
                                    @elseif ($task->project->status == 'finished')
                                        <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                                    @endif
                                    <a href="{{ route('projects.show', $task->project_id) }}" class="text-dark-grey">
                                        {{ $task->project->project_name }}</a>
                                @else
                                    --
                                @endif
                            </p>

                        </div>
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('Milestone')
                            </p>
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                @if ($task->milestone_id != null)
                                    <i class="fa fa-circle mr-1 text-red f-10"></i>

                                    <span class="text-dark-grey">
                                        {{ $task->milestone->milestone_title }}</span>
                                @else
                                    --
                                @endif
                            </p>

                        </div>
                    @endif



                    @if (($taskSettings->assigned_to == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                @lang('modules.tasks.assignTo')</p>
                            @if (count($task->users) > 0)
                                @if (count($task->users) > 1)
                                    @foreach ($task->users as $item)
                                        <div class="taskEmployeeImg rounded-circle mr-1">
                                            <a href="{{ route('employees.show', $item->id) }}">
                                                <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($item->name) }}" src="{{ $item->image_url }}">
                                            </a>
                                        </div>
                                    @endforeach
                                @else
                                    @foreach ($task->users as $item)
                                        <x-employee :user="$item" />
                                    @endforeach
                                @endif
                            @else
                                --
                            @endif
                        </div>
                    @endif
                    @if (($taskSettings->assigned_by == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        @if ($task->created_by)
                            <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                                <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                    @lang('modules.tasks.assignBy')</p>

                                <x-employee :user="$task->createBy" />

                            </div>
                        @endif
                    @endif
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('Project Manager')</p>

                        <x-employee :user="$task->project->pm" />

                    </div>
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('Client')</p>

                        <x-client :user="$task->project->client" />

                    </div>
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.priority')</p>
                        <p class="mb-0 text-dark-grey f-14 w-70">
                            @if ($task->priority == 'high')
                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                            @elseif ($task->priority == 'medium')
                                <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                            @else
                                <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                            @endif
                            @lang('app.' . $task->priority)
                        </p>
                    </div>
                    @if (($taskSettings->task_category == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <x-cards.data-row :label="__('modules.tasks.taskCategory')" :value="$task->category->category_name ?? '--'" html="true" />
                    @endif

                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('modules.taskShortCode')</p>
                        <p class="mb-0 text-dark-grey f-14 w-70">
                            {{ $task->task_short_code }}
                        </p>
                    </div>




                    {{--  @if (($taskSettings->label == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                @lang('app.label')</p>
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                @forelse ($task->labels as $key => $label)
                                    <span class='badge badge-secondary'
                                        style='background-color: {{ $label->label_color }}'>{{ $label->label_name }} </span>
                                    <i class="fa fa-question-circle" data-toggle="popover" data-placement="top" data-content="{{ $label->description }}" data-html="true" data-trigger="hover"></i>

                                @empty
                                    --
                                @endforelse
                            </p>


                        </div>
                    @endif --}}

                    {{-- @if (in_array('gitlab', user_modules()) && isset($gitlabIssue))
                        <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                GitLab</p>
                            <div class="mb-0 w-70">
                                <div class='card border'>
                                    <div class="card-body bg-white d-flex justify-content-between p-2 align-items-center rounded">
                                        <h4 class="f-13 f-w-500 mb-0">
                                            <img src="{{ asset('img/gitlab-icon-rgb.png') }}" class="height-35">
                                            <a href="{{ $gitlabIssue['web_url'] }}" class="text-darkest-grey f-w-500" target="_blank">#{{ $gitlabIssue['iid'] }} {{ $gitlabIssue['title'] }} <i class="fa fa-external-link-alt"></i></a>
                                        </h4>
                                        <div>
                                            <span class="badge badge-{{ $gitlabIssue['state'] == 'opened' ? 'danger' : 'success' }}">{{ $gitlabIssue['state'] }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endif --}}






                    <x-cards.data-row :label="__('General Guidelines')" :value="!empty($task->project->project_summary) ? $task->project->project_summary : '--'" html="true" />

                    @php
                        $working_environment = \App\Models\WorkingEnvironment::where('project_id', $task->project->id)
                            ->orderBy('id', 'desc')
                            ->first();
                    @endphp
                    {{-- <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">Working/Staging Site’s
                            URL</p>
                        @if ($working_environment != null)
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                {{ $working_environment->site_url }}
                            </p>
                        @else
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                --
                            </p>
                        @endif
                    </div>
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">Working/Staging Site’s
                            Login URL</p>
                        @if ($working_environment != null)
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                {{ $working_environment->login_url }}
                            </p>
                        @else
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                --
                            </p>
                        @endif
                    </div>
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">Username/Email</p>
                        @if ($working_environment != null)
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                {{ $working_environment->email }}
                            </p>
                        @else
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                --
                            </p>
                        @endif
                    </div>
                    <div class="col-12 px-0 pb-3 d-block d-lg-flex d-md-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">Frontend Password</p>
                        @if ($working_environment != null)
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                {{ $working_environment->password }}
                            </p>
                        @else
                            <p class="mb-0 text-dark-grey f-14 w-70">
                                --
                            </p>
                        @endif
                    </div> --}}

                    <div class="card">
                        <div class="body">



                            @if (($taskSettings->description == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                <x-cards.data-row :label="__(' Description')" :value="!empty($task->description) ? $task->description : '--'" html="true" />
                            @endif

                        </div>


                    </div>


                    {{-- Custom fields data --}}
                    @if (($taskSettings->custom_fields == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        @if (isset($fields))
                            @foreach ($fields as $field)
                                @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                                    <x-cards.data-row :label="$field->label" :value="$task->custom_fields_data['field_' . $field->id] ?? '--'" />
                                @elseif($field->type == 'textarea')
                                    <x-cards.data-row :label="$field->label" html="true" :value="$task->custom_fields_data['field_' . $field->id] ?? '--'" />
                                @elseif($field->type == 'radio')
                                    <x-cards.data-row :label="$field->label" :value="!is_null($task->custom_fields_data['field_' . $field->id]) ? $task->custom_fields_data['field_' . $field->id] : '--'" />
                                @elseif($field->type == 'checkbox')
                                    <x-cards.data-row :label="$field->label" :value="!is_null($task->custom_fields_data['field_' . $field->id]) ? $task->custom_fields_data['field_' . $field->id] : '--'" />
                                @elseif($field->type == 'select')
                                    <x-cards.data-row :label="$field->label" :value="!is_null($task->custom_fields_data['field_' . $field->id]) && $task->custom_fields_data['field_' . $field->id] != '' ? $field->values[$task->custom_fields_data['field_' . $field->id]] : '--'" />
                                @elseif($field->type == 'date')
                                    <x-cards.data-row :label="$field->label" :value="!is_null($task->custom_fields_data['field_' . $field->id]) && $task->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($task->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--'" />
                                @endif
                            @endforeach
                        @endif
                    @endif

                </div>

            </div>

            @if ((($taskSettings->files == 'yes' || $taskSettings->time_logs == 'yes' || $taskSettings->notes == 'yes' || $taskSettings->history == 'yes') && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                <!-- TASK TABS START -->
                <div class="bg-additional-grey rounded my-3">

                    <div class="s-b-inner s-b-notifications bg-white b-shadow-4 rounded">

                        <x-tab-section class="task-tabs">
                            @if (($taskSettings->sub_task == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                <x-tab-item class="ajax-tab" :active="request('view') === 'sub_task' || !request('view')" :link="route('tasks.show', $task->id) . '?view=sub_task'">
                                    @lang('modules.tasks.subTask')</x-tab-item>
                            @endif


                            <x-tab-item class="ajax-tab" :active="request('view') === 'file'" :link="route('tasks.show', $task->id) . '?view=file'">@lang('Comment')
                            </x-tab-item>




                            {{-- @if (($taskSettings->comments == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                @if ($viewTaskCommentPermission != 'none')
                                    <x-tab-item class="ajax-tab" :active="(request('view') === 'comments')"
                                        :link="route('tasks.show', $task->id).'?view=comments'">
                                        @lang('modules.tasks.comment')</x-tab-item>
                                @endif
                            @endif --}}

                            @if (($taskSettings->time_logs == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                <x-tab-item class="ajax-tab" :active="request('view') === 'time_logs'" :link="route('tasks.show', $task->id) . '?view=time_logs'">
                                    @lang('app.menu.timeLogs')
                                    @if ($task->active_timer_all_count > 0)
                                        <i class="fa fa-clock text-primary f-12 ml-1"></i>
                                    @endif
                                </x-tab-item>
                            @endif

                            @if (($taskSettings->notes == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                @if ($viewTaskNotePermission != 'none')
                                    <x-tab-item class="ajax-tab" :active="request('view') === 'notes'" :link="route('tasks.show', $task->id) . '?view=notes'">
                                        @lang('app.notes')</x-tab-item>
                                @endif
                            @endif

                            @if (($taskSettings->history == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                <x-tab-item class="ajax-tab" :active="request('view') === 'history'" :link="route('tasks.show', $task->id) . '?view=history'">@lang('modules.tasks.history')
                                </x-tab-item>
                            @endif
                            @if (($taskSettings->history == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                                <x-tab-item class="ajax-tab" :active="request('view') === 'deliverables'" :link="route('tasks.show', $task->id) . '?view=deliverables'">@lang('Submitted Work')
                                </x-tab-item>
                            @endif
                        </x-tab-section>


                        <div class="s-b-n-content">
                            <div class="tab-content" id="nav-tabContent">
                                @include($tab)
                            </div>
                        </div>
                    </div>


                </div>
                <!-- TASK TABS END -->
            @endif

            <?php
            $task_review = App\Models\TaskApprove::where('task_id', $task->id)
                ->orderBy('id', 'desc')
                ->first();
            
            ?>

        </div>
        <div class="col-sm-3 review-card">
            <x-cards.data>
                @if (($taskSettings->status == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    <p class="f-w-500">
                        <i class="fa fa-circle mr-1 text-yellow" style="color: {{ $task->boardColumn->label_color }}"></i>
                        {{ $task->boardColumn->column_name }}
                    </p>
                @endif

                @if (($taskSettings->make_private == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    @if ($task->is_private || $pin)
                        <div class="col-12 px-0 pb-3 d-flex">
                            @if ($task->is_private)
                                <span class='badge badge-secondary'><i class='fa fa-lock'></i>
                                    @lang('app.private')</span>&nbsp;
                            @endif

                            @if ($pin)
                                <span class='badge badge-success'><i class='fa fa-thumbtack'></i>
                                    @lang('app.pinned')</span>
                            @endif
                        </div>
                    @endif
                @endif

                @if (($taskSettings->start_date == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('app.startDate') }}</p>
                        <p class="mb-0 text-dark-grey w-50 f-14">
                            @if (!is_null($task->start_date))
                                {{ $task->start_date->format(global_setting()->date_format) }}
                            @else
                                --
                            @endif
                        </p>
                    </div>
                @endif

                @if (($taskSettings->due_date == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('app.dueDate') }}
                        </p>
                        <p class="mb-0 text-dark-grey w-50 f-14">
                            @if (!is_null($task->due_date))
                                {{ $task->due_date->format(global_setting()->date_format) }}
                            @else
                                --
                            @endif

                        </p>
                    </div>
                @endif
                @if ($task->original_due_date != null)
                    @if (($taskSettings->due_date == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                            <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Original Due Date') }}
                            </p>
                            <p class="mb-0 text-dark-grey w-50 f-14">
                                @if (!is_null($task->original_due_date))
                                    {{ \Carbon\Carbon::parse($task->original_due_date)->format('d-m-Y') }}
                                @else
                                    --
                                @endif

                            </p>
                        </div>
                    @endif
                @endif
                @if ($task->status == 'completed')

                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Actual Completion Date') }}
                        </p>
                        <p class="mb-0 text-dark-grey w-50 f-14">
                            @if (!is_null($task->updated_at))
                                {{ \Carbon\Carbon::parse($task->updated_at)->format('d-m-Y') }}
                            @else
                                --
                            @endif

                        </p>
                    </div>

                @endif

                @if (($taskSettings->time_estimate == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    @if ($task->estimate_hours > 0 || $task->estimate_minutes > 0)
                        <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                            <p class="mb-0 text-lightest w-50 f-14 text-capitalize">
                                {{ __('modules.tasks.setTimeEstimate') }}
                            </p>
                            <p class="mb-0 text-dark-grey w-50 f-14">{{ $task->estimate_hours }}
                                @lang('app.hrs') {{ $task->estimate_minutes }} @lang('app.mins')</p>
                        </div>
                    @endif
                @endif

                @php
                    $totalMinutes = $task->timeLogged->sum('total_minutes') - $breakMinutes;
                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';
                    
                    if ($totalMinutes % 60 > 0) {
                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                    }
                @endphp

                @if (($taskSettings->hours_logged == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">
                            {{ __('Parent task hours logged') }}
                        </p>
                        <p class="mb-0 text-dark-grey w-50 f-14">{{ $timeLog }}</p>
                    </div>
                    @php
                        $tas_id = App\Models\Task::where('id', $task->id)->first();
                        $subtasks = App\Models\Subtask::where('task_id', $tas_id->id)->get();
                        $subtask_count = App\Models\Subtask::where('task_id', $tas_id->id)->count();
                        // dd($subtasks);
                        $time = 0;
                        
                        foreach ($subtasks as $subtask) {
                            $task = App\Models\Task::where('subtask_id', $subtask->id)->first();
                            $time += $task->timeLogged->sum('total_minutes');
                        }
                        $timeL = intdiv($time, 60) . ' ' . __('app.hrs') . ' ';
                        
                        if ($time % 60 > 0) {
                            $timeL .= $time % 60 . ' ' . __('app.mins');
                        }
                        if ($subtasks != null) {
                            $timeLo = intdiv($time + $totalMinutes, 60) . ' ' . __('app.hrs') . ' ';
                        
                            if ($time % 60 > 0) {
                                $timeLo .= ($time + $totalMinutes) % 60 . ' ' . __('app.mins');
                            }
                        }
                        
                    @endphp
                    @if ($subtasks != null)
                        <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                            <p class="mb-0 text-lightest w-50 f-14 text-capitalize">
                                {{ __('Subtask (' . $subtask_count . ') hours logged') }}
                            </p>
                            <p class="mb-0 text-dark-grey w-50 f-14">{{ $timeL }}</p>
                        </div>
                        <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                            <p class="mb-0 text-lightest w-50 f-14 text-capitalize">
                                {{ __('Total hours logged') }}
                            </p>
                            <p class="mb-0 text-dark-grey w-50 f-14">{{ $timeLo }}</p>
                        </div>
                    @endif
                @endif
            </x-cards.data>
            @if ($task_review != null)
                <br>
                <x-cards.data>
                    @if (($taskSettings->status == 'yes' && in_array('client', user_roles())) || in_array('admin', user_roles()) || in_array('employee', user_roles()))
                        <p style="font-size:15px;" class="f-w-500 badge badge-primary">Task Review</p>
                    @endif


                    <?php
                    $avg = ($task_review->rating + $task_review->rating2 + $task_review->rating3) / 3;
                    $avgRating = number_format($avg, 1);
                    
                    ?>

                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Deadline Meet') }}
                        </p>
                        @if ($task_review->rating == 5)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </p>
                        @elseif($task_review->rating == 4)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>

                            </p>
                        @elseif($task_review->rating == 3)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>

                            </p>
                        @elseif($task_review->rating == 2)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>


                            </p>
                        @elseif($task_review->rating == 1)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>

                            </p>
                        @endif
                    </div>



                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Submission Quality') }}
                        </p>
                        @if ($task_review->rating2 == 5)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </p>
                        @elseif($task_review->rating2 == 4)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>

                            </p>
                        @elseif($task_review->rating2 == 3)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>

                            </p>
                        @elseif($task_review->rating2 == 2)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>


                            </p>
                        @elseif($task_review->rating2 == 1)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>

                            </p>
                        @endif
                    </div>


                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Req. Fullfillment') }}
                        </p>
                        @if ($task_review->rating3 == 5)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>
                                <span class="fa fa-star"></span>
                            </p>
                        @elseif($task_review->rating3 == 4)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star"></span>

                            </p>
                        @elseif($task_review->rating3 == 3)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>

                            </p>
                        @elseif($task_review->rating3 == 2)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>
                                <span class="fa fa-star checked"></span>


                            </p>
                        @elseif($task_review->rating3 == 1)
                            <p class="mb-0 w-50 f-14" style="color:orange;">
                                <span class="fa fa-star checked"></span>

                            </p>
                        @endif
                    </div>

                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">{{ __('Overall Task Ratings') }}
                        </p>
                        <p class="mb-0 w-50 f-14" style="color:orange;">
                            @for ($i = 1; $i <= $avgRating; $i++)
                                <span style="color: orange;" class="fa fa-star{{ $i <= $avgRating ? '' : '-empty' }}"></span>
                            @endfor


                        </p>
                    </div>


                    <div class="col-12 px-0 pb-3 d-lg-flex d-block">
                        <p class="mb-0 text-lightest w-50 f-14 text-capitalize">
                            {{ __('Comments') }}
                        </p>
                        <p class="mb-0 text-dark-grey w-50 f-14">{!! $task_review->comments !!}</p>
                    </div>


                </x-cards.data>
            @endif
        </div>
    </div>
</div>


<script src="{{ asset('vendor/jquery/clipboard.min.js') }}"></script>
<script>
    var clipboard = new ClipboardJS('.btn-copy');

    clipboard.on('success', function(e) {
        Swal.fire({
            icon: 'success',
            text: '@lang('app.copied')',
            toast: true,
            position: 'top-end',
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            showClass: {
                popup: 'swal2-noanimation',
                backdrop: 'swal2-noanimation'
            },
        })
    });
</script>

<script>
    $(document).ready(function() {

        var $worked = $("#active-task-timer");

        function updateTimer() {
            var myTime = $worked.html();
            var ss = myTime.split(":");

            var hours = ss[0];
            var mins = ss[1];
            var secs = ss[2];
            secs = parseInt(secs) + 1;

            if (secs > 59) {
                secs = '00';
                mins = parseInt(mins) + 1;
            }

            if (mins > 59) {
                secs = '00';
                mins = '00';
                hours = parseInt(hours) + 1;
            }

            if (hours.toString().length < 2) {
                hours = '0' + hours;
            }
            if (mins.toString().length < 2) {
                mins = '0' + mins;
            }
            if (secs.toString().length < 2) {
                secs = '0' + secs;
            }
            var ts = hours + ':' + mins + ':' + secs;

            $worked.html(ts);
            setTimeout(updateTimer, 1000);
        }
        if ($('#stop-task-timer').length) {
            setTimeout(updateTimer, 1000);
        }

        //    change task status
        $('body').on('click', '.change-task-status', function() {
            var status = $(this).data('status');

            var id = '{{ $task->id }}';

            if (status == 'completed') {
                var checkUrl = "{{ route('tasks.check_task', ':id') }}";
                checkUrl = checkUrl.replace(':id', id);
                var token = "{{ csrf_token() }}";

                $.easyAjax({
                    url: checkUrl,
                    type: "POST",
                    blockUI: true,
                    container: '#task-detail-section',
                    data: {
                        '_token': token
                    },
                    success: function(data) {
                        if (data.taskCount > 0) {
                            Swal.fire({
                                title: "@lang('messages.sweetAlertTitle')",
                                text: "@lang('messages.markCompleteTask')",
                                icon: 'warning',
                                showCancelButton: true,
                                focusConfirm: false,
                                confirmButtonText: "@lang('messages.completeIt')",
                                cancelButtonText: "@lang('app.cancel')",
                                customClass: {
                                    confirmButton: 'btn btn-primary mr-3',
                                    cancelButton: 'btn btn-secondary'
                                },
                                showClass: {
                                    popup: 'swal2-noanimation',
                                    backdrop: 'swal2-noanimation'
                                },
                                buttonsStyling: false
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    updateTask(id, status);
                                }
                            });

                        } else {
                            updateTask(id, status)
                        }

                    }
                });
            } else {
                updateTask(id, status)
            }


        });

        $('body').on('click', '#pinnedItem', function() {
            var type = $('#pinnedItem').attr('data-pinned');
            var id = '{{ $task->id }}';
            var pinType = 'task';

            var dataPin = type.trim(type);
            if (dataPin == 'pinned') {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmUnpin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: 'btn btn-primary mr-3',
                        cancelButton: 'btn btn-secondary'
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('tasks.destroy_pin', ':id') }}";
                        url = url.replace(':id', id);

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: 'POST',
                            url: url,
                            data: {
                                '_token': token,
                                'type': pinType
                            },
                            success: function(response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            }
                        })
                    }
                });

            } else {
                Swal.fire({
                    title: "@lang('messages.sweetAlertTitle')",
                    icon: 'warning',
                    showCancelButton: true,
                    focusConfirm: false,
                    confirmButtonText: "@lang('messages.confirmPin')",
                    cancelButtonText: "@lang('app.cancel')",
                    customClass: {
                        confirmButton: 'btn btn-primary mr-3',
                        cancelButton: 'btn btn-secondary'
                    },
                    showClass: {
                        popup: 'swal2-noanimation',
                        backdrop: 'swal2-noanimation'
                    },
                    buttonsStyling: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        var url = "{{ route('tasks.store_pin') }}?type=" + pinType;

                        var token = "{{ csrf_token() }}";
                        $.easyAjax({
                            type: 'POST',
                            url: url,
                            data: {
                                '_token': token,
                                'task_id': id
                            },
                            success: function(response) {
                                if (response.status == "success") {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                });
            }
        });

        $(".ajax-tab").click(function(event) {
            event.preventDefault();

            $('.task-tabs .ajax-tab').removeClass('active');
            $(this).addClass('active');

            const requestUrl = this.href;

            $.easyAjax({
                url: requestUrl,
                blockUI: true,
                container: "#nav-tabContent",
                historyPush: ($(RIGHT_MODAL).hasClass('in') ? false : true),
                data: {
                    'json': true
                },
                success: function(response) {
                    if (response.status == "success") {
                        $('#nav-tabContent').html(response.html);
                    }
                }
            });

        });

        // Update Task
        function updateTask(id, status) {
            var url = "{{ route('tasks.change_status') }}";
            var token = "{{ csrf_token() }}";
            $.easyAjax({
                url: url,
                type: "POST",
                async: false,
                data: {
                    '_token': token,
                    taskId: id,
                    status: status,
                    sortBy: 'id'
                },
                success: function(data) {
                    window.location.reload();
                }
            })
        }


        /*$('body').on('click', '.delete-comment', function() {
            var id = $(this).data('row-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('taskComment.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('#comment-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '#submitReply', function(e) {
            e.preventDefault();
            $('#submitReply').attr("disabled", true);
            $('#submitReply').html("Sending...");
            var reply = CKEDITOR.instances.replyComment.getData();
            var reply_id = document.getElementById('replyId').value;
            // console.log(reply_id);
            var data = {
                '_token': "{{ csrf_token() }}",
                'reply': reply,
                'user_id': '{{ Auth::user()->id }}',
                'added_by': '{{ $task->added_by }}',
                'last_updated_by': '{{ $task->added_by }}',
                taskId: '{{ $task->id }}',
                'reply_id': reply_id,
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{ route('taskReply.store') }}",
                data: data,
                dataType: "json",
                success: function(response) {
                    // console.log(response.status);
                    if (response.status == 400) {
                        $('#comment-1-reply-form').trigger("reset");
                        $('#replyComment').text('');

                        $('#comment-list').html(response.html);
                    }

                },
                error: function(error) {
                    // console.log(response);
                }
            });
        });

        $('body').on('click', '#submit-comment', function() {
            var comment = CKEDITOR.instances.descriptionComment.getData();
            document.getElementById('descriptionComment').value = comment;

            var token = '{{ csrf_token() }}';

            const url = "{{ route('taskComment.store') }}";

            $.easyAjax({
                url: url,
                container: '#save-comment-data-form',
                type: "POST",
                disableButton: true,
                blockUI: true,
                buttonSelector: "#submit-comment",
                data: {
                    '_token': token,
                    comment: comment,
                    taskId: '{{ $task->id }}'
                },
                success: function(response) {
                    // console.log(response);
                    if (response.status == "success") {
                        $('#comment-list').html(response.view);
                        CKEDITOR.instances.descriptionComment.getData();
                        $('#descriptionComment').val('');
                        $('#comment-list').html(response.html);
                        // window.location.reload();
                    }

                }
            });
        });

        $('body').on('click', '.edit-comment', function() {
            var id = $(this).data('row-id');
            var url = "{{ route('taskComment.edit', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });*/

        $('body').on('click', '.delete-subtask', function() {
            var id = $(this).data('row-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('sub-tasks.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('#sub-task-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.edit-subtask', function() {
            var id = $(this).data('row-id');
            var url = "{{ route('sub-tasks.edit', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('body').on('change', '.task-check', function() {
            if ($(this).is(':checked')) {
                var status = 'complete';
            } else {
                var status = 'incomplete';
            }

            var id = $(this).data('sub-task-id');
            var url = "{{ route('sub_tasks.change_status') }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: url,
                type: "POST",
                data: {
                    '_token': token,
                    subTaskId: id,
                    status: status
                },
                success: function(response) {
                    if (response.status == "success") {

                        $('#sub-task-list').html(response.view);

                    }
                }
            })
        });


        $('body').on('click', '.delete-file', function() {
            var id = $(this).data('row-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('task-files.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('#task-file-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.delete-note', function() {
            var id = $(this).data('row-id');
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.recoverRecord')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmDelete')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('task-note.destroy', ':id') }}";
                    url = url.replace(':id', id);

                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            '_token': token,
                            '_method': 'DELETE'
                        },
                        success: function(response) {
                            if (response.status == "success") {
                                $('#note-list').html(response.view);
                            }
                        }
                    });
                }
            });
        });

        $('body').on('click', '.edit-note', function() {
            var id = $(this).data('row-id');
            var url = "{{ route('task-note.edit', ':id') }}";
            url = url.replace(':id', id);
            $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
            $.ajaxModal(MODAL_LG, url);
        });

        $('#start-task-timer').click(function() {
            var task_id = "{{ $task_active_id->id }}";
            var project_id = "{{ $task_active_id->project_id }}";
            var user_id = "{{ user()->id }}";
            var memo = "{{ $task_active_id->heading }}";
            var token = "{{ csrf_token() }}";

            $.easyAjax({
                url: "{{ route('timelogs.start_timer') }}",
                blockUI: true,
                type: "POST",
                data: {
                    task_id: task_id,
                    project_id: project_id,
                    memo: memo,
                    '_token': token,
                    user_id: user_id
                },
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        $('#stop-task-timer').click(function() {
            var id = $(this).data('time-id');
            var url = "{{ route('timelogs.stop_timer', ':id') }}";
            url = url.replace(':id', id);
            var token = '{{ csrf_token() }}';
            $.easyAjax({
                url: url,
                blockUI: true,
                type: "POST",
                data: {
                    timeId: id,
                    _token: token
                },
                success: function(data) {
                    window.location.reload();
                }
            })
        });

        $('body').on('click', '#reminderButton', function() {
            Swal.fire({
                title: "@lang('messages.sweetAlertTitle')",
                text: "@lang('messages.sendReminder')",
                icon: 'warning',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: "@lang('messages.confirmSend')",
                cancelButtonText: "@lang('app.cancel')",
                customClass: {
                    confirmButton: 'btn btn-primary mr-3',
                    cancelButton: 'btn btn-secondary'
                },
                showClass: {
                    popup: 'swal2-noanimation',
                    backdrop: 'swal2-noanimation'
                },
                buttonsStyling: false
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = "{{ route('tasks.reminder') }}";
                    var token = "{{ csrf_token() }}";

                    $.easyAjax({
                        type: 'POST',
                        url: url,
                        data: {
                            'id': "{{ $task->id }}",
                            '_token': token
                        }
                    });
                }
            });
        });



        init(RIGHT_MODAL);
    });

    // SUBMIT TASK FOR CLIENT APPROVE
    $('#submit_task_for_client_approval').click(function(e) {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be submit task for client approval!",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '{{ route('tasks.client_approval') }}',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        '_token': '{{ csrf_token() }}',
                        'task_id': '{{ $task_active_id->id }}',
                    },
                    success: function(response) {
                        if (response.status == 400) {
                            swal.fire({
                                title: 'Client Approval!',
                                text: 'Client approval successfully.',
                                icon: 'success',
                            }).then(function() {
                                window.location.reload();
                            });
                        }
                    },
                    error: function(response) {
                        swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while client approval.',
                            icon: 'error',
                        });
                    }
                });
            }
        });
    })

    // CLIENT APPROVE TASK
    $('#client_approve_task').click(function(e) {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be client approved task",
            icon: 'warning',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '{{ route('tasks.client_approved_task') }}',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        '_token': '{{ csrf_token() }}',
                        'task_id': '{{ $task_active_id->id }}',
                    },
                    success: function(response) {
                        if (response.status == 200) {
                            swal.fire({
                                title: 'Client Approved Task!',
                                text: 'Client approved task successfully.',
                                icon: 'success',
                            }).then(function() {
                                window.location.reload();
                            });
                        }
                    },
                    error: function(response) {
                        swal.fire({
                            title: 'Error!',
                            text: 'An error occurred while client approved task.',
                            icon: 'error',
                        });
                    }
                });
            }
        });
    })
    /*function submitBtnRevision_ajax() {
        //$('#submitBtnRevision').click(function(e){
            //e.preventDefault();
            $('#submitBtnRevision').attr("disabled", true);
            $('#submitBtnRevision').html("Processing...");
            var comments2 = CKEDITOR.instances.comments2.getData();
            var status = this.name;
            var data= {
                '_token': "{{ csrf_token() }}",
                'comments2': comments2,
                'task_id': {{ $task->id }},
                'user_id': {{ $task->last_updated_by }},
                'revision_status': status,
            }
            // console.log(data);
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: "POST",
                url: "{{ route('task-status-revision') }}",
                data: data,
                dataType: "json",
                success: function (response) {
                    // console.log(response.status);
                    if(response.status==200){
                        $('#submitBtnRevision').attr("disabled", false);
                        $('#submitBtnRevision').html("Submit");
                        //window.location.reload();
                        window.location.href = '{{ route('tasks.show', $task->id) }}'
                        toastr.success('Task Revision Successfully');
                    }

                },
                error: function(error) {
                    if (error.responseJSON.errors.comments2) {
                        toastr.error('This field is required!');
                    }
                    $('#submitBtnRevision').attr("disabled", false);
                    $('#submitBtnRevision').html("Submit");
                }
            });
        //});
    }*/
</script>

<script src="{{ asset('/ckeditor/ckeditor.js') }}"></script>
