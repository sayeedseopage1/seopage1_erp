@php
    $milestone = App\Models\ProjectMilestone::where('id', $item->id)->first();
@endphp
<div class="modal fade" id="showMilestone{{ $item->id }}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content text-left">
            <div class="modal-header">
                <div class="rows">
                    <h5 class="modal-title" id="modelHeading">@lang('modules.projects.milestones') @lang('app.details')</h5>

                </div>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">×</span></button>
            </div>
            <div class="modal-body bg-additional-grey">
                <input type="hidden" id="milestone_id" value="{{ $milestone->id }}">
                <?php
                $task = App\Models\Task::where('milestone_id', $milestone->id)
                    ->where('status', 'incomplete')
                    ->count();
                //dd($task);
                ?>

                @if ($task > 0)
                    <h6 class="text-center text-red">You can't complete this milestone because you have some pending
                        tasks.</h6>
                @endif
                <x-cards.data>
                    <x-cards.data-row :label="__('modules.projects.milestoneTitle')" :value="$milestone->milestone_title" />
                    @php
                        $original_currency = App\Models\Currency::where('id', $milestone->original_currency_id)->first();
                    @endphp
                    <x-cards.data-row :label="__('modules.projects.milestoneCost')" :value="currency_formatter($milestone->actual_cost, $original_currency->currency_symbol)" />

                    @if ($milestone->status == 'incomplete')
                        @php
                            $status = "<i class='fa fa-circle mr-2 text-red'></i>" . __('app.incomplete');
                        @endphp
                    @else
                        @php
                            $status = "<i class='fa fa-circle mr-2 text-dark-green'></i>" . __('app.complete');
                        @endphp
                    @endif
                    <x-cards.data-row :label="__('app.status')" :value="$status" html="true" />

                    <x-cards.data-row :label="__('Service Type')" :value="$milestone->service_type" />

                    <x-cards.data-row :label="__('modules.projects.milestoneSummary')" :value="$milestone->summary" />

                </x-cards.data>

                <x-cards.data :title="__('app.menu.tasks')" class="mt-4">
                    <x-table class="border-0 pb-3 admin-dash-table table-hover">

                        <x-slot name="thead">
                            <th class="pl-20">#</th>
                            <th>@lang('app.task')</th>
                            <th>@lang('modules.tasks.assignTo')</th>
                            <th>@lang('modules.tasks.assignBy')</th>
                            <th>@lang('app.dueDate')</th>
                            <th>@lang('modules.timeLogs.totalHours')</th>
                            <th class="pr-20">@lang('app.status')</th>
                        </x-slot>

                        @forelse ($milestone->tasks as $key=>$item)
                            @php
                                $totalMinutes = $item->timeLogged->sum('total_minutes');
                                $breakMinutes = $item->breakMinutes();
                                $totalMinutes = $totalMinutes - $breakMinutes;
                                $totalTimeLog = intdiv($totalMinutes, 60) . ' ' . __('app.hrs') . ' ';
                                
                                if ($totalMinutes % 60 > 0) {
                                    $totalTimeLog .= $totalMinutes % 60 . ' ' . __('app.mins');
                                }
                            @endphp
                            <tr>
                                <td>{{ $key + 1 }}</td>
                                <td>{{ ucfirst($item->heading) }}</td>
                                <td>
                                    @foreach ($item->users as $member)
                                        <div class="taskEmployeeImg rounded-circle"><a
                                                href="{{ route('employees.show', $member->id) }}">
                                                <img data-toggle="tooltip"
                                                    data-original-title="{{ mb_ucwords($member->name) }}"
                                                    src="{{ $member->image_url }}">
                                            </a></div>
                                    @endforeach
                                </td>
                                <td>{{ $item->created_by ? mb_ucwords($item->createBy->name) : '--' }}</td>
                                <td>{{ $item->due_date ? $item->due_date->format(global_setting()->date_format) : '--' }}
                                </td>
                                <td>{{ $totalTimeLog }}</td>
                                <td>
                                    <x-status :value="$item->boardColumn->slug == 'completed' ||
                                    $item->boardColumn->slug == 'incomplete'
                                        ? __('app.' . $item->boardColumn->slug)
                                        : $item->boardColumn->column_name" :style="'color:' . $item->boardColumn->label_color" />
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7">
                                    <x-cards.no-record icon="tasks" :message="__('messages.noRecordFound')" />
                                </td>
                            </tr>
                        @endforelse
                    </x-table>

                </x-cards.data>
            </div>
            <div class="modal-footer">
                <x-forms.button-cancel data-dismiss="modal" class="border-0">@lang('app.close')</x-forms.button-cancel>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    let milestone_id = document.getElementById('milestone_id').value;
    //console.log(milestone_id);
    document.querySelector('create-invoice').addEventListener('click', () => {
        var url = `{{ route('invoices.create') }}`;

        string = `?project_id=${project_id}&client_id=${client_id}&milestone_id=${milestone_id}`;
        url += string;

        window.open(url);
    });
</script>
