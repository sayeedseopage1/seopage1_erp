@php
$editTimelogPermission = user()->permission('edit_timelogs');
$deleteTimelogPermission = user()->permission('delete_timelogs');
@endphp
<div class="row user-timelogs mt-3">
    <div class="col-md-12">
        <x-table class="table-bordered table-sm-responsive bg-white" headType="thead-light">
            <x-slot name="thead">
                <th>@lang('app.task')</th>
                <th>@lang('app.time')</th>
                <th>@lang('modules.timeLogs.totalHours')</th>
                <th>@lang('app.earnings')</th>
                <th class="text-right">@lang('app.action')</th>
            </x-slot>

            @forelse($timelogs as $item)
                <tr>
                    <td>
                        @if (!is_null($item->project_id) && !is_null($item->task_id))
                            <h5 class="f-13 text-darkest-grey"><a href="{{ route('tasks.show', $item->task_id) }}"
                                    class="openRightModal">{{ $item->task->heading }}</a></h5>
                            <div class="text-muted">{{ $item->project->project_name }}</div>
                        @elseif (!is_null($item->project_id))
                            <a href="{{ route('projects.show', $item->project_id) }}"
                                class="text-darkest-grey ">{{ $item->project->project_name }}</a>
                        @elseif (!is_null($item->task_id))
                            <a href="{{ route('tasks.show', $item->task_id) }}"
                                class="text-darkest-grey openRightModal">{{ $item->task->heading }}</a>
                        @endif
                    </td>
                    <td>
                        <p>{{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                        </p>
                        {{ $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                    </td>
                    <td>
                        {{ $item->hours }}
                    </td>
                    <td>
                        {{ currency_formatter($item->earnings) }}
                        @if ($item->approved)
                            <i data-toggle="tooltip" data-original-title="{{ __('app.approved') }}"
                                class="fa fa-check-circle text-primary"></i>
                        @endif
                    </td>
                    <td class="text-right">
                        <div class="task_view">
                            <a href="{{ route('timelogs.show', $item->id) }}"
                                class="taskView openRightModal">@lang('app.view')</a>
                            <div class="dropdown">
                                <a class="task_view_more d-flex align-items-center justify-content-center dropdown-toggle"
                                    type="link" id="dropdownMenuLink-{{ $item->id }}" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i class="icon-options-vertical icons"></i>
                                </a>
                                <div class="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuLink-{{ $item->id }}" tabindex="0">

                                    @if (!is_null($item->end_time))
                                        @if ($editTimelogPermission == 'all' || ($editTimelogPermission == 'added' && user()->id == $item->added_by))
                                            @if (!$item->approved)
                                                <a class="dropdown-item approve-timelog" href="javascript:;" data-time-id="{{ $item->id }}">
                                                    <i class="fa fa-check mr-2"></i>
                                                    @lang('app.approve')
                                                </a>
                                            @endif
                                        @endif

                                        @if ($editTimelogPermission == 'all' || ($editTimelogPermission == 'added' && user()->id == $item->added_by))
                                            <a class="dropdown-item openRightModal"
                                                href="{{ route('timelogs.edit', $item->id) }}">
                                                <i class="fa fa-edit mr-2"></i>
                                                @lang('app.edit')
                                            </a>
                                        @endif

                                        @if ($deleteTimelogPermission == 'all' || ($deleteTimelogPermission == 'added' && user()->id == $item->added_by))
                                            <a class="dropdown-item delete-table-row" href="javascript:;"
                                                data-time-id="{{ $item->id }}">
                                                <i class="fa fa-trash mr-2"></i>
                                                @lang('app.delete')
                                            </a>
                                        @endif
                                    @endif
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="3">@lang('messages.noRecordFound')</td>
                </tr>
            @endforelse
        </x-table>


    </div>
</div>
