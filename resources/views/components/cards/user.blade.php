<div class="card border-0 b-shadow-4">
    <div class="card-horizontal align-items-center">
        <div class="card-img">
            <img class="" src="{{ $image }}" alt="">
        </div>
        <div class="card-body border-0 pl-0">
            {{ $slot }}
        </div>
    </div>

    @isset($footer)
        {{ $footer }}
    @endisset

</div>
