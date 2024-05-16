
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
@lang('Extend')
@endcomponent

@lang('Additionally, if needed, have a session with the concerned project manager to understand how justified the goal extension request is.')<br><br>
@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
