<div class="card border-0">
    <a class="view-notification text-dark border-bottom-grey px-3" href="{{ $link }}"
        data-notification-id="{{ $notification->id }}">
        <div class="card-horizontal align-items-center">
            <div class="card-img-small mr-3 ml-0 my-2">
                <img class="___class_+?4___" src="{{ $image }}">
            </div>
            <div class="card-body border-0 pl-0 pr-0 py-1">
                <p class="card-title f-11 mb-0 text-dark-grey f-w-500">{{ $title ?? '' }}</p>
                <p class="f-11 mb-0 text-dark-grey">{{ $text ?? '' }}</p>
                <p class="card-text f-10 text-lightest">{{ $time->diffForHumans() }}</p>
            </div>
        </div>
    </a>
</div>
