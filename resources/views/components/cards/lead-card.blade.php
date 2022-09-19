<div class="card rounded bg-white border-grey b-shadow-4 m-1 mb-3 task-card" data-task-id="{{ $lead->id }}"
    id="drag-task-{{ $lead->id }}">
    <div class="card-body p-2">
        <div class="d-flex justify-content-between mb-2">
            <a href="{{ route('leads.show', [$lead->id]) }}"
                class="f-12 f-w-500 text-dark mb-0 text-wrap openRightModal">{{ ucfirst($lead->client_name) }}</a>
            @if (!is_null($lead->currency_id))
                <div class="d-flex">
                    <span
                        class="ml-2 f-11 text-lightest">{{ currency_formatter($lead->value) }}</span>
                </div>
            @endif
        </div>

        @if ($lead->company_name)
            <div class="d-flex mb-3 align-items-center">
                <i class="fa fa-building f-11 text-lightest"></i><span
                    class="ml-2 f-11 text-lightest">{{ ucfirst($lead->company_name) }}</span>
            </div>
        @endif

        <div class="d-flex justify-content-between align-items-center">
            @if (!is_null($lead->agent_id))
                <div class="d-flex flex-wrap">
                    <div class="avatar-img mr-1 rounded-circle">
                        <a href="" alt="{{ mb_ucwords($lead->leadAgent->user->name) }}" data-toggle="tooltip"
                            data-original-title="{{ mb_ucwords($lead->leadAgent->user->name) }}"
                            data-placement="right"><img src="{{ $lead->leadAgent->user->image_url }}"></a>
                    </div>
                </div>
            @endif
            @if ($lead->next_follow_up_date != null && $lead->next_follow_up_date != '')
                <div class="d-flex text-lightest">
                    <i class="f-11 bi bi-calendar"></i><span
                        class="f-12 ml-1">{{ \Carbon\Carbon::parse($lead->next_follow_up_date)->format(global_setting()->date_format) }}</span>
                </div>
            @endif

        </div>
    </div>
</div><!-- div end -->
