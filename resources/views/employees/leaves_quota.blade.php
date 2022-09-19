<div class="card w-100 rounded-0 border-0 comment">
    <div class="card-horizontal">
        <div class="card-body border-0 pl-0 py-1">
            @forelse ($leaveTypes as $key=>$leaveType)
                <div class="card-text f-14 text-dark-grey text-justify">
                    <x-table class="table-bordered my-3 rounded">
                        <x-slot name="thead">
                            <th>@lang('modules.leaves.leaveType')</th>
                            <th>@lang('modules.leaves.noOfLeaves')</th>
                            <th>@lang('modules.leaves.monthLimit')</th>
                            <th class="text-right">@lang('app.total') @lang('modules.leaves.leavesTaken')</th>
                        </x-slot>
                        <tr>
                            <td>
                                <x-status :value="$leaveType->type_name" :style="'color:'.$leaveType->color" />
                            </td>
                            <td>{{ isset($employeeLeavesQuota[$key]) ? $employeeLeavesQuota[$key]->no_of_leaves : 0 }}
                            <td>{{ ($leaveType->monthly_limit > 0) ? $leaveType->monthly_limit : '--' }}
                            </td>
                            <td class="text-right">
                                {{ (isset($leaveType->leavesCount[0])) ? $leaveType->leavesCount[0]->count - ($leaveType->leavesCount[0]->halfday*0.5) : '0' }}
                            </td>
                        </tr>
                    </x-table>
                </div>
            @empty
                <x-cards.no-record icon="redo" :message="__('messages.noRecordFound')" />
            @endforelse
        </div>
    </div>
</div>
