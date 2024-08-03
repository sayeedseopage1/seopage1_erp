@php
$active = false;

if (isset($user->session)) {
    $lastSeen = \Carbon\Carbon::createFromTimestamp($user->session->last_activity)->timezone(global_setting()->timezone);

    $lastSeenDifference = now()->diffInSeconds($lastSeen);
    if ($lastSeenDifference > 0 && $lastSeenDifference <= 90) {
        $active = true;
    }
}
@endphp

<style>
    .disabled-link {
        pointer-events: none;
    }
</style>

<div class="media align-items-center mw-250">
    @if (!is_null($user))
        <a href="{{ isset($disabledLink) ? 'javascript:;' : route('employees.show', [$user->id]) }}" class="position-relative {{ isset($disabledLink) ? 'disabled-link' : '' }}">
            @if ($active)
                <span class="text-light-green position-absolute f-8 user-online"
                    title="@lang('modules.client.online')"><i class="fa fa-circle"></i></span>
            @endif
            <img src="{{ $user->image_url }}" class="mr-2 taskEmployeeImg rounded-circle"
                alt="{{ ucfirst($user->name) }}" title="{{ mb_ucwords($user->name) }}" onerror="this.onerror=null;this.src='{{URL::asset('user-uploads/avatar/avatar_blank.png')}}';">
        </a>
        <div class="media-body">
            <h5 class="mb-0 f-12">
                <a href="{{  isset($disabledLink) ? 'javascript:;' : route('employees.show', [$user->id]) }}"
                    class="text-darkest-grey {{ isset($disabledLink) ? 'disabled-link' : '' }}">{{ mb_ucwords($user->name) }}</a>
                @if (user() && user()->id == $user->id)
                    <span class="badge badge-secondary">@lang("app.itsYou")</span>
                @endif
            </h5>
            <p class="mb-0 f-12 text-dark-grey">
                {{ !is_null($user->employeeDetail) && !is_null($user->employeeDetail->designation) ? mb_ucwords($user->employeeDetail->designation->name) : ' ' }}
            </p>
        </div>
    @else
        --
    @endif
</div>
