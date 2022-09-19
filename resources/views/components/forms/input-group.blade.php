<div {{ $attributes->merge(['class' => 'input-group']) }}>
    @if ($prepend)
        <div class="input-group-prepend">
            {!! $prepend !!}
        </div>
    @endif

    {{ $slot }}

    @if ($preappend)
        <div class="input-group-append">
            {!! $preappend !!}
        </div>
    @endif

    @if ($append)
        <div class="input-group-append">
            {!! $append !!}
        </div>
    @endif
</div>
