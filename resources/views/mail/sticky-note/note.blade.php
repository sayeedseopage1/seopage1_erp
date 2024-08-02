@component('mail::message')
@component('mail::text', ['text' => $header])
@endcomponent

@component('mail::text', ['text' => $greet])
@endcomponent

@component('mail::text', ['text' => $body])
@endcomponent

@component('mail::text', ['text' => $content])
@endcomponent

@component('mail::button', ['url' => $url1])
@lang('Mark as Complete')
@endcomponent

@component('mail::button', ['url' => $url2])
@lang('Set a new expiry time')
@endcomponent

@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
