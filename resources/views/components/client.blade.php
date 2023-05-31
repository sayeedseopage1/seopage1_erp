@php
$active = false;

if ($user->session) {
    $lastSeen = \Carbon\Carbon::createFromTimestamp($user->session->last_activity)->timezone(global_setting()->timezone);

    $lastSeenDifference = now()->diffInSeconds($lastSeen);
    if ($lastSeenDifference > 0 && $lastSeenDifference <= 90) {
        $active = true;
    }
}
@endphp

<div class="media align-items-center mw-250">
    @if (!is_null($user))
        <a href="{{ route('clients.show', [$user->id]) }}" class="position-relative">
            @if ($active)
                <span class="text-light-green position-absolute f-8 user-online" title="@lang('modules.client.online')"><i class="fa fa-circle"></i></span>
            @endif
            <img src="{{ $user->image_url }}" class="mr-2 taskEmployeeImg rounded-circle" alt="{{ ucfirst($user->name) }}" title="{{ ucfirst($user->name) }}">
        </a>
        <div class="media-body">
            <h5 class="mb-0 f-12"><a href="{{ route('clients.show', [$user->id]) }}" class="text-darkest-grey">{{ mb_ucfirst($user->name) }}</a>
                @if (isset($user->admin_approval) && $user->admin_approval == 0)
                    <i class="bi bi-person-x text-red" data-toggle="tooltip" data-original-title="@lang('modules.dashboard.verificationPending')"></i>
                @elseif (user() && user()->id == $user->id)
                    <span class="badge badge-secondary">@lang('app.itsYou')</span>
                @endif
            </h5>
            <p class="mb-0 f-12 text-dark-grey">
                {{ !is_null($user->clientDetails) && !is_null($user->clientDetails->company_name) ? mb_ucwords($user->clientDetails->company_name) : ' ' }}
            </p>
        </div>
    @else
        --
    @endif
</div>
