<form method="{{ $spoofMethod ? 'POST' : $method }}" {!! $attributes !!} autocomplete="off">
    @include('sections.password-autocomplete-hide')

    <input type="hidden" id="redirect_url" name="redirect_url" value="{{ request()->redirectUrl }}">

    @unless(in_array($method, ['HEAD', 'GET', 'OPTIONS']))
        @csrf
    @endunless

    @if ($spoofMethod)
        @method($method)
    @endif

    {!! $slot !!}
</form>
