<!-- TAB CONTENT START -->
<div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-email-tab">

    <div class="d-flex flex-wrap p-20" id="task-file-list">

        <x-table headType="thead-light">
            <x-slot name="thead">
                <th>@lang('app.employee')</th>
                <th>@lang('modules.timeLogs.startTime')</th>
                <th>@lang('modules.timeLogs.endTime')</th>
                <th>@lang('modules.timeLogs.memo')</th>
                <th class="text-right">@lang('modules.employees.hoursLogged')</th>
            </x-slot>

            @forelse ($task->approvedTimeLogs as $item)
                <tr>
                    <td>
                        <x-employee-image :user="$item->user" />
                    </td>
                    <td>
                        {{ $item->start_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                    </td>
                    <td>
                        @if (!is_null($item->end_time))
                            {{ $item->end_time->timezone(global_setting()->timezone)->format(global_setting()->date_format . ' ' . global_setting()->time_format) }}
                        @elseif(!is_null($item->activeBreak))
                            <span class='badge badge-secondary'>{{ __('modules.timeLogs.paused') }}</span>
                        @else
                            <span class='badge badge-primary'>{{ __('app.active') }}</span>
                        @endif
                    </td>
                    <td>{{ $item->memo }}</td>
                    <td class="text-right">
                        {{ $item->hours }}
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5">
                        <x-cards.no-record :message="__('messages.noRecordFound')" icon="clock" />
                    </td>
                </tr>
            @endforelse
        </x-table>
    </div>
</div>
<!-- TAB CONTENT END -->
