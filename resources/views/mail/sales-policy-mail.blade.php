
@component('mail::message')
@component('mail::text', ['text' => $header])

@endcomponent
<br>


@component('mail::text', ['text' => $body])

@endcomponent




@component('mail::button', ['url' => $url])
@lang($text)
@endcomponent

@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
