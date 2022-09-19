<div id="task-detail-section">
    <div class="row">
        <div class="col-sm-12 col-lg-7">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-lg-10 col-md-10 col-10">
                            <h3 class="heading-h1 mb-3">@lang('app.timeLog') @lang('app.details')</h3>
                        </div>
                        <div class="col-lg-2 col-md-2 col-2 text-right">
                            @if (
                                $editTimelogPermission == 'all'
                                || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
                                || ($editTimelogPermission == 'owned'
                                    && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
                                    )
                                || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
                            )
                                <div class="dropdown">
                                    <button
                                        class="btn btn-lg f-14 px-2 py-1 text-dark-grey text-capitalize rounded  dropdown-toggle"
                                        type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fa fa-ellipsis-h"></i>
                                    </button>

                                    <div class="dropdown-menu dropdown-menu-right border-grey rounded b-shadow-4 p-0"
                                        aria-labelledby="dropdownMenuLink" tabindex="0">
                                        @if (!is_null($timeLog->end_time))
                                            <a class="dropdown-item openRightModal"
                                                href="{{ route('timelogs.edit', $timeLog->id) }}">@lang('app.edit')</a>
                                        @else
                                            <a class="dropdown-item stop-timer"
                                                data-time-id="{{ $timeLog->id }}"
                                                href="javascript:;">@lang('app.stop')</a>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <x-cards.data-row :label="__('modules.timeLogs.startTime')"
                        :value="$timeLog->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format)" />

                    @if (!is_null($timeLog->end_time))
                        <x-cards.data-row :label="__('modules.timeLogs.endTime')"
                            :value="$timeLog->end_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format)" />
                        <x-cards.data-row :label="__('modules.timeLogs.totalHours')" :value="$timeLog->hours" />
                    @elseif(!is_null($timeLog->activeBreak))
                        <div class="col-12 px-0 pb-3 d-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                @lang('modules.timeLogs.endTime')</p>
                            <p class="mb-0 text-dark-grey f-14">
                                <span class="badge badge-secondary">@lang('modules.timeLogs.paused')</span>
                            </p>
                        </div>
                    @else
                        <div class="col-12 px-0 pb-3 d-flex">
                            <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                                @lang('modules.timeLogs.endTime')</p>
                            <p class="mb-0 text-dark-grey f-14">
                                <span class="badge badge-primary">@lang('app.active')</span>
                            </p>
                        </div>
                    @endif

                    <x-cards.data-row :label="__('app.earnings')" :value="currency_formatter($timeLog->earnings)" />
                    <x-cards.data-row :label="__('modules.timeLogs.memo')" :value="$timeLog->memo" />
                    <x-cards.data-row :label="__('app.project')" :value="$timeLog->project->project_name ?? '--'" />
                    <x-cards.data-row :label="__('app.task')" :value="$timeLog->task->heading ?? '--'" />


                    <div class="col-12 px-0 pb-3 d-flex">
                        <p class="mb-0 text-lightest f-14 w-30 d-inline-block text-capitalize">
                            @lang('app.employee')</p>
                        <p class="mb-0 text-dark-grey f-14">
                            <x-employee :user="$timeLog->user" />
                        </p>
                    </div>

                    @if (isset($fields) && count($fields) > 0)
                        @foreach ($fields as $field)
                            @if ($field->type == 'text' || $field->type == 'password' || $field->type == 'number')
                                <x-cards.data-row :label="$field->label"
                                    :value="($timeLog->custom_fields_data['field_'.$field->id] != '') ? $timeLog->custom_fields_data['field_'.$field->id] : '--'" />
                            @elseif($field->type == 'textarea')
                                <x-cards.data-row :label="$field->label" html="true"
                                    :value="($timeLog->custom_fields_data['field_'.$field->id] != '') ? $timeLog->custom_fields_data['field_'.$field->id] : '--'" />
                            @elseif($field->type == 'radio')
                                <x-cards.data-row :label="$field->label"
                                    :value="($timeLog->custom_fields_data['field_' . $field->id] != '') ? $timeLog->custom_fields_data['field_' . $field->id] : '--'" />
                            @elseif($field->type == 'checkbox')
                                <x-cards.data-row :label="$field->label"
                                    :value="($timeLog->custom_fields_data['field_' . $field->id] != '') ? $timeLog->custom_fields_data['field_' . $field->id] : '--'" />
                            @elseif($field->type == 'select')
                                <x-cards.data-row :label="$field->label"
                                    :value="($timeLog->custom_fields_data['field_' . $field->id] != '') ? $timeLog->custom_fields_data['field_' . $field->id] : '--'" />
                            @elseif($field->type == 'date')
                                <x-cards.data-row :label="$field->label"
                                    :value="(!is_null($timeLog->custom_fields_data['field_' . $field->id]) && $timeLog->custom_fields_data['field_' . $field->id] != '' ? \Carbon\Carbon::parse($timeLog->custom_fields_data['field_' . $field->id])->format(global_setting()->date_format) : '--')" />
                            @endif
                        @endforeach
                    @endif
                </div>
            </div>
        </div>

        <div class="col-sm-12 col-lg-5">
            <div class="card bg-white border-0 b-shadow-4">
                <div class="card-header bg-white  border-bottom-grey text-capitalize justify-content-between p-20">
                    <div class="row">
                        <div class="col-12">
                            <h3 class="heading-h1 mb-3">@lang('modules.tasks.history')</h3>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                            <span><i class="fa fa-clock"></i> @lang('modules.timeLogs.startTime')</span>
                            {{ $timeLog->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format .' '.global_setting()->time_format) }}
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                            <span><i class="fa fa-briefcase"></i> @lang('app.task')</span>
                            {{ $timeLog->task->heading }}
                        </li>
                        @foreach ($timeLog->breaks as $item)
                            <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                @if (!is_null($item->end_time))
                                    @php
                                        $endTime = $item->end_time;
                                        $totalHours = $endTime->diff($item->start_time)->format('%d') * 24 + $endTime->diff($item->start_time)->format('%H');
                                        $totalMinutes = $totalHours * 60 + $endTime->diff($item->start_time)->format('%i');

                                        $timeLogHours = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';

                                        if ($totalMinutes % 60 > 0) {
                                            $timeLogHours .= $totalMinutes % 60 . ' ' . __('app.mins');
                                        }
                                    @endphp
                                    <span><i class="fa fa-mug-hot"></i> @lang('modules.timeLogs.break') ({{ $timeLogHours }})</span>
                                    <span>
                                        {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) . ' - ' . $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}

                                        @if (
                                            $editTimelogPermission == 'all'
                                            || ($editTimelogPermission == 'added' && $timeLog->added_by == user()->id)
                                            || ($editTimelogPermission == 'owned'
                                                && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id)
                                                )
                                            || ($editTimelogPermission == 'both' && (($timeLog->project && $timeLog->project->client_id == user()->id) || $timeLog->user_id == user()->id || $timeLog->added_by == user()->id))
                                        )
                                            <a href="javascript:;" data-break-id="{{ $item->id }}" class="text-lightest ml-1 edit-time-break"><i class="fa fa-edit"></i></a>
                                        @endif
                                    </span>
                                @else
                                    <span><i class="fa fa-mug-hot"></i> @lang('modules.timeLogs.break')</span>
                                    {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->time_format) }}
                                @endif
                            </li>
                        @endforeach

                        @if (!is_null($timeLog->end_time))
                            <li class="list-group-item d-flex justify-content-between align-items-center f-12 text-dark-grey">
                                <span><i class="fa fa-clock"></i> @lang('modules.timeLogs.endTime')</span>
                                {{ $timeLog->end_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $('body').on('click', '.stop-timer', function() {
        var id = $(this).data('time-id');
        var url = "{{ route('timelogs.stop_timer', ':id') }}";
        url = url.replace(':id', id);
        var token = '{{ csrf_token() }}';
        $.easyAjax({
            url: url,
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

    $('body').on('click', '.edit-time-break', function() {
        var breakId = $(this).data('break-id');
        var url = "{{ route('timelog-break.edit', ':id')}}";
        url = url.replace(':id', breakId);
        $(MODAL_LG + ' ' + MODAL_HEADING).html('...');
        $.ajaxModal(MODAL_LG, url);
    });

</script>
