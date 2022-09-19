@php
$editTimelogPermission = user()->permission('edit_timelogs');
$addTaskPermission = user()->permission('add_tasks');
@endphp
<div class="modal-header">
    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.activeTimers')</h5>
    <button type="button"  class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">×</span></button>
</div>
<div class="modal-body py-0">
    <div class="row">
        @if (!is_null($myActiveTimer))
            <div class="col-lg-4 col-md-5 bg-additional-grey py-3" id="myActiveTimer">
                <h4 class="heading-h4">@lang('modules.timeLogs.myActiveTimer')</h4>
                <x-cards.data>
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
                                <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                    <span><i class="fa fa-clock"></i> @lang('modules.timeLogs.startTime')</span>
                                    {{ $myActiveTimer->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                </li>
                                <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                    <span><i class="fa fa-briefcase"></i> @lang('app.task')</span>
                                    {{ $myActiveTimer->task->heading }}
                                </li>
                                @foreach ($myActiveTimer->breaks as $item)
                                    <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
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
                                            <span><i class="fa fa-mug-hot"></i> @lang('modules.timeLogs.break') ({{ $timeLog }})</span>
                                            {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) . ' - ' . $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}

                                        @else
                                            <span><i class="fa fa-mug-hot"></i> @lang('modules.timeLogs.break')</span>
                                            {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                        @endif
                                    </li>
                                @endforeach
                            </ul>

                        </div>
                        <div class="col-sm-12 pt-3 text-right">
                            @if (
                                    $editTimelogPermission == 'all'
                                    || ($editTimelogPermission == 'added' && $myActiveTimer->added_by == user()->id)
                                    || ($editTimelogPermission == 'owned'
                                        && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id)
                                        )
                                    || ($editTimelogPermission == 'both' && (($myActiveTimer->project && $myActiveTimer->project->client_id == user()->id) || $myActiveTimer->user_id == user()->id || $myActiveTimer->added_by == user()->id))
                                )

                                @if (is_null($myActiveTimer->activeBreak))
                                    <x-forms.button-secondary icon="pause-circle" data-time-id="{{ $myActiveTimer->id }}" id="pause-timer-btn">@lang('modules.timeLogs.pauseTimer')</x-forms.button-secondary>
                                    <x-forms.button-primary class="ml-3 stop-active-timer" data-time-id="{{ $myActiveTimer->id }}" icon="stop-circle">@lang('modules.timeLogs.stopTimer')</x-forms.button-primary>
                                @else
                                    <x-forms.button-primary id="resume-timer-btn" icon="play-circle"
                                    data-time-id="{{ $myActiveTimer->activeBreak->id }}">@lang('modules.timeLogs.resumeTimer')</x-forms.button-primary>
                                @endif
                            @endif
                        </div>
                    </div>
                </x-cards.data>
            </div>
        @else
            <div class="col-lg-4 bg-additional-grey py-3">
                <x-cards.data :title="__('modules.timeLogs.startTimer')">
                    <x-form id="startTimerForm">
                        <input type="hidden" name="user_id[]" value="{{ user()->id }}">
                        <div class="row justify-content-between">
                            <div class="col" id="task_div">
                                <x-task-selection-dropdown :tasks="$tasks" />
                            </div>
                        </div>

                        <div class="row">
                            @if ($addTaskPermission == 'all' || $addTaskPermission == 'added')

                                <div class="col">
                                    <div class="form-group">
                                        <div class="d-flex mt-3">
                                            <x-forms.checkbox :fieldLabel="__('app.create') . ' ' . __('modules.tasks.newTask')"
                                                fieldName="create_task" fieldId="create_task" />
                                        </div>
                                    </div>
                                </div>
                            @endif

                            <div class="col-12">
                                <x-forms.text fieldId="memo" fieldName="memo" :fieldLabel="__('modules.timeLogs.memo')"
                                    fieldRequired="true" />
                            </div>
                            <div class="col-12 text-right">
                                <x-forms.button-primary id="start-timer-btn" icon="play">@lang('modules.timeLogs.startTimer')</x-forms.button-primary>
                            </div>
                        </div>

                    </x-form>
                </x-cards.data>
            </div>
        @endif

        <div class="my-3 col-lg-8 col-md-7">
            <div class="table-responsive">
                <x-table class="table-bordered table-hover" headType="thead-light">
                    <x-slot name="thead">
                        <th>#</th>
                        <th>@lang('app.task')</th>
                        <th>@lang('app.employee')</th>
                        <th class="w-180">@lang('modules.timeLogs.startTime')</th>
                        <th class="text-right w-150">@lang('app.action')</th>
                    </x-slot>

                    @forelse ($activeTimers as $key => $item)
                        <tr id="timer-{{ $item->id }}">
                            <td>{{ $key + 1 }}</td>
                            <td>
                                <a href="{{ route('tasks.show', $item->task_id) }}" class="text-darkest-grey">
                                    {{ $item->task->heading }}
                                </a>
                                @if ($item->task->project_id)
                                    <p class="text-lightest mb-0">{{ $item->task->project->project_name }}</p>
                                @endif
                            </td>
                            <td>
                                <x-employee-image :user="$item->user" />
                            </td>
                            <td>
                                {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                                <div class="mt-1 f-12">
                                    @if (is_null($item->activeBreak))
                                        @php
                                            $endTime = now();
                                            $totalHours = $endTime->diff($item->start_time)->format('%d') * 24 + $endTime->diff($item->start_time)->format('%H');
                                            $totalMinutes = $totalHours * 60 + $endTime->diff($item->start_time)->format('%i');

                                            $totalMinutes = $totalMinutes - $item->breaks->sum('total_minutes');

                                            $timeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                            if ($totalMinutes % 60 > 0) {
                                                $timeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                            }
                                        @endphp

                                        <span class="badge badge-secondary">
                                            <i data-toggle="tooltip" data-original-title="@lang('app.active')"
                                            class="fa fa-hourglass-start"></i> {{ $timeLog }}
                                        </span>
                                    @else
                                        <span class="badge badge-primary" data-toggle="tooltip" data-original-title="{{ $item->activeBreak->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}">
                                            <i class="fa fa-pause-circle"></i> @lang('modules.timeLogs.paused')
                                        </span>
                                    @endif
                                </div>
                            </td>
                            <td class="text-right">
                                @if (
                                    $editTimelogPermission == 'all'
                                    || ($editTimelogPermission == 'added' && $item->added_by == user()->id)
                                    || ($editTimelogPermission == 'owned'
                                        && (($item->project && $item->project->client_id == user()->id) || $item->user_id == user()->id)
                                        )
                                    || ($editTimelogPermission == 'both' && (($item->project && $item->project->client_id == user()->id) || $item->user_id == user()->id || $item->added_by == user()->id))
                                )
                                <x-forms.button-secondary class="stop-active-timer" icon="stop-circle"
                                    data-time-id="{{ $item->id }}">@lang('app.stop')</x-forms.button-secondary>
                                @endif
                            </td>
                        </tr>

                    @empty
                        <tr>
                            <td colspan="5">
                                <x-cards.no-record icon="clock" :message="__('messages.noRecordFound')" />
                            </td>
                        </tr>
                    @endforelse

                </x-table>
            </div>
        </div>

    </div>
</div>
<div class="modal-footer">
    <x-forms.button-cancel data-dismiss="modal" class="border-0">@lang('app.cancel')</x-forms.button-cancel>
</div>

<script>

    $(function(){

        $('#start-timer-btn').click(function() {
            var url = "{{ route('timelogs.start_timer') }}";
            $.easyAjax({
                url: url,
                container: '#startTimerForm',
                type: "POST",
                blockUI: true,
                disableButton: true,
                buttonSelector: "#start-timer-btn",
                data: $('#startTimerForm').serialize(),
                success: function(response) {
                    if (response.status == 'success') {
                        window.location.reload();
                    }
                }
            })
        });

        $("input[name=create_task]").click(function() {
            $('#task_div').toggleClass('d-none');
        });

    });

    init(MODAL_XL);

</script>
