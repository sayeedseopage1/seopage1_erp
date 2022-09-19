<div {{ $attributes->merge(['class' => 'card bg-white border-0 b-shadow-4']) }}>
    @if ($title)
        <x-cards.card-header>
            {!! $title !!}

            <x-slot name="action">
                {!! $action !!}
            </x-slot>

        </x-cards.card-header>
    @endif

    @if ($padding === 'false')
        <div class="card-body p-0 {{ $otherClasses }}">
            {{ $slot }}
        </div>
    @else
        <div class="card-body {{ $otherClasses }}">
            {{ $slot }}
        </div>
    @endif
</div>
