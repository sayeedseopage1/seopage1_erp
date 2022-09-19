<a @if ($active)
    {{ $attributes->merge(['class' => 'nav-item nav-link f-15 active']) }}
@else
    {{ $attributes->merge(['class' => 'nav-item nav-link f-15']) }}
    @endif
    href="{{ $link }}" role="tab" aria-selected="true">
    {{ $slot }}
</a>
