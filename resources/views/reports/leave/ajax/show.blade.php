<div class="row mx-0 py-4 bg-additional-grey">
    @foreach ($leave_types as $leave_type)
        <div class="col-md-6 col-lg-4 mb-3 mb-lg-0">
            <x-cards.widget :title="$leave_type->type_name" :value="$leave_type->leaves->count()" icon="calendar" />
        </div>
    @endforeach
</div>
<div class="table-responsive">
    <x-table>
        <x-slot name="thead">
            <th width="20%">@lang('modules.leaves.leaveType')</th>
            <th width="20%">@lang('app.date')</th>
            <th>@lang('modules.leaves.reason')</th>
        </x-slot>
        @foreach ($leave_types as $item)
            @foreach ($item->leaves as $key => $leave)
                <tr>
                    <td>
                        <x-status :style="'color: '.$leave->type->color" :value="$leave->type->type_name" />
                        {!! $leave->duration == 'half day' ? '<span class="badge badge-inverse">' . __('modules.leaves.halfDay') . '</span>' : '' !!}
                    </td>
                    <td>
                        {{ $leave->leave_date->format(global_setting()->date_format) }}
                    </td>
                    <td>
                        {{ $leave->reason }}
                    </td>
                </tr>
            @endforeach
        @endforeach

    </x-table>
</div>
