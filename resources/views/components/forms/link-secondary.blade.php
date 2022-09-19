<a href="{{ $link }}" {{ $attributes->merge(['class' => 'btn-secondary rounded f-14 p-2']) }}>
    @if ($icon != '')
        <i class="fa fa-{{ $icon }} mr-1"></i>
    @endif
    {{ $slot }}
</a>
