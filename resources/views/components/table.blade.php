<table id="example" {{ $attributes->merge(['class' => 'table']) }}>
    @isset($thead)
        <thead class="{{ $headType }}">
            <tr>
                {!! $thead !!}
            </tr>
        </thead>
    @endisset
    <tbody>
        {{ $slot }}
    </tbody>
</table>
