
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
@lang('Add an explanation as to why this goal was not met!')
@endcomponent

@lang('Please remember that meeting goals is essential for fulfilling our commitments to the client and also keeping your performance metrics good.')<br><br>
@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
