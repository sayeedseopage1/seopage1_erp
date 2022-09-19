<div id="task-detail-section">

    <h3 class="heading-h1 mb-3">{{ ucfirst($task->heading) }}</h3>
    <div class="row">
        <div class="col-sm-9">
            <div class="card bg-white border-0 b-shadow-4">

                <div class="card-body">
                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">@lang('app.project')</p>
                        <p class="mb-0 text-dark-grey f-14">
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
                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.priority')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            @if ($task->priority == 'high')
                                <i class="fa fa-circle mr-1 text-red f-10"></i>
                            @elseif ($task->priority == 'medium')
                                <i class="fa fa-circle mr-1 text-yellow f-10"></i>
                            @else
                                <i class="fa fa-circle mr-1 text-dark-green f-10"></i>
                            @endif
                            @lang('app.'.$task->priority)
                        </p>
                    </div>

                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('modules.tasks.assignTo')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            @if (count($task->users) > 0)
                                @if (count($task->users) > 1)
                                    @foreach ($task->users as $item)
                                        <div class="taskEmployeeImg rounded-circle mr-1">
                                            <a href="{{ route('employees.show', $item->id) }}">
                                                <img data-toggle="tooltip" data-original-title="{{ mb_ucwords($item->name) }}"
                                                    src="{{ $item->image_url }}">
                                            </a>
                                        </div>
                                    @endforeach
                                @else
                                    @foreach ($task->users as $item)
                                        <x-employee :user="$item" disabledLink="true" />
                                    @endforeach
                                @endif

                            @else
                                --
                            @endif
                        </p>
                    </div>

                    @if ($task->created_by)
                        <div class="col-12 px-0 pb-3 d-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                @lang('modules.tasks.assignBy')</p>
                            <p class="mb-0 text-dark-grey f-14">
                                <x-employee :user="$task->createBy" disabledLink="true" />
                            </p>
                        </div>
                    @endif

                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('app.label')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            @forelse ($task->labels as $key => $label)
                                <span class='badge badge-secondary'
                                    style='background-color: {{ $label->label_color }}'>{{ $label->label_name }}</span>
                            @empty
                                --
                            @endforelse
                        </p>
                    </div>

                    <x-cards.data-row :label="__('modules.tasks.taskCategory')"
                        :value="$task->category->category_name ?? '--'" html="true" />
                    <x-cards.data-row :label="__('app.description')" :value="$task->description" html="true" />

                    {{-- Custom fields data --}}
                    @if (isset($fields))
                        @foreach ($fields as $field)
                            @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                                <x-cards.data-row :label="$field->label"
                                    :value="$task->custom_fields_data['field_'.$field->id] ?? '--'" />
                            @elseif($field->type == 'textarea')
                                <x-cards.data-row :label="$field->label" html="true"
                                    :value="$task->custom_fields_data['field_'.$field->id] ?? '--'" />
                            @elseif($field->type == 'radio')
                                <x-cards.data-row :label="$field->label"
                                    :value="(!is_null($task->custom_fields_data['field_' . $field->id]) ? $task->custom_fields_data['field_' . $field->id] : '--')" />
                            @elseif($field->type == 'select')
                                <x-cards.data-row :label="$field->label"
                                    :value="(!is_null($task->custom_fields_data['field_' . $field->id]) && $task->custom_fields_data['field_' . $field->id] != '' ? $field->values[$task->custom_fields_data['field_' . $field->id]] : '--')" />
                            @elseif($field->type == 'date')
                                <x-cards.data-row :label="$field->label"
                                    :value="(!is_null($task->custom_fields_data['field_' . $field->id]) && $task->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($task->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                            @endif
                        @endforeach
                    @endif

                </div>
            </div>

            <!-- TASK TABS START -->
            <div class="bg-additional-grey rounded my-3">

                <a class="mb-0 d-block d-lg-none text-dark-grey s-b-mob-sidebar" onclick="openSettingsSidebar()"><i
                        class="fa fa-ellipsis-v"></i></a>

                <div class="s-b-inner s-b-notifications bg-white b-shadow-4 rounded">

                    <x-tab-section class="task-tabs">

                        <x-tab-item class="ajax-tab" :active="(request('view') === 'file' || !request('view'))"
                            :link="route('front.task_detail', $task->hash).'?view=file'">@lang('app.file')</x-tab-item>

                        <x-tab-item class="ajax-tab" :active="(request('view') === 'sub_task')"
                            :link="route('front.task_detail', $task->hash).'?view=sub_task'">
                            @lang('modules.tasks.subTask')</x-tab-item>

                        <x-tab-item class="ajax-tab" :active="(request('view') === 'history')"
                            :link="route('front.task_detail', $task->hash).'?view=history'">@lang('modules.tasks.history')
                        </x-tab-item>
                    </x-tab-section>


                    <div class="s-b-n-content">
                        <div class="tab-content" id="nav-tabContent">
                            @include($tab)
                        </div>
                    </div>
                </div>


            </div>
            <!-- TASK TABS END -->



        </div>

        <div class="col-sm-3">
            <x-cards.data>
                <p class="f-w-500"><i class="fa fa-circle mr-1 text-yellow"
                        style="color: {{ $task->boardColumn->label_color }}"></i>{{ $task->boardColumn->slug == 'completed' || $task->boardColumn->slug == 'incomplete' ? __('app.' . $task->boardColumn->slug) : $task->boardColumn->column_name }}
                </p>

                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest w-50 f-14 d-inline-block text-capitalize">{{ __('app.startDate') }}
                    </p>
                    <p class="mb-0 text-dark-grey w-50 f-14 d-inline">
                        @if(!is_null($task->start_date))
                            {{ $task->start_date->format(global_setting()->date_format) }}
                        @else
                            --
                        @endif
                    </p>
                </div>
                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest w-50 f-14 d-inline-block text-capitalize">{{ __('app.dueDate') }}
                    </p>
                    <p class="mb-0 text-dark-grey w-50 f-14 d-inline">
                        @if(!is_null($task->due_date))
                            {{ $task->due_date->format(global_setting()->date_format) }}
                        @else
                            --
                        @endif
                    </p>
                </div>

                @php
                    $totalMinutes = $task->timeLogged->sum('total_minutes') - $breakMinutes;
                    $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                    if ($totalMinutes % 60 > 0) {
                        $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                    }
                @endphp

                <div class="col-12 px-0 pb-3 d-flex">
                    <p class="mb-0 text-lightest w-50 f-14 d-inline-block text-capitalize">
                        {{ __('modules.employees.hoursLogged') }}
                    </p>
                    <p class="mb-0 text-dark-grey w-50 f-14 d-inline">{{ $timeLog }}</p>
                </div>
            </x-cards.data>

        </div>

    </div>

    <script>
        $(document).ready(function() {

            $("body").on("click", ".ajax-tab", function(event) {
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

            init(RIGHT_MODAL);
        });
    </script>
</div>
