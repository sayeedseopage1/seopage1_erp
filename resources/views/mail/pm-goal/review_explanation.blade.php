
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
@lang('Add your ratings')
@endcomponent

@lang('missing goals and can add their comments and ratings!'),<br><br>
@lang('Additionally, if needed, have a session with the concerned project manager to explain the lackings he had here so he can meet his goals in the future.'),<br><br>
@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
