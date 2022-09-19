<div class="table-responsive p-20">
    <x-table class="table-bordered">
        <x-slot name="thead">
            <th>#</th>
            <th>@lang('app.name')</th>
            <th class="text-right">@lang('app.action')</th>
        </x-slot>

       @forelse($leadAgents as $key => $agent)
            <tr class="row{{ $agent->id }}">
                <td width="10%">{{ ($key+1) }}</td>
                <td width="60%"> @if(!is_null($agent->user)) {{ mb_ucwords($agent->user->name) }} @endif</td>
                <td class="text-right">
                    <div class="task_view">
                        <a class="task_view_more d-flex align-items-center justify-content-center delete-agent" href="javascript:;" data-agent-id="{{ $agent->id }}">
                            <i class="fa fa-trash icons mr-2"></i> @lang('app.delete')
                        </a>
                    </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4">
                    <x-cards.no-record icon="list" :message="__('messages.noLeadAgentAdded')" />
                </td>
            </tr>
        @endforelse
    </x-table>
</div>
