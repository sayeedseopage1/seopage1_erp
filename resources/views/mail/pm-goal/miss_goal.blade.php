
@component('mail::message')
@component('mail::text', ['text' => $header])

@endcomponent
<br>

@component('mail::text', ['text' => $greet])

@endcomponent


@component('mail::text', ['text' => $body])

@endcomponent





@component('mail::text', ['text' => $content])

@endcomponent



@component('mail::button', ['url' => $url])
@lang('View')
@endcomponent

@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
