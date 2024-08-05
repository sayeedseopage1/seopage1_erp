@component('mail::message')

@component('mail::text', ['text' => $header])
@endcomponent

@component('mail::text', ['text' => $greet])
@endcomponent

@component('mail::text', ['text' => $body])
@endcomponent

@component('mail::text', ['text' => $content])
@endcomponent

<div style="text-align: center;">
    <a href="{{ $url1 }}" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-radius:4px;color:#fff;display:inline-block;overflow:hidden;text-decoration:none;background-color:#2d3748;border-bottom:8px solid #2d3748;border-left:18px solid #2d3748;border-right:18px solid #2d3748;border-top:8px solid #2d3748;" target="_blank">Mark as Complete</a>
    <a href="{{ $url2 }}" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';border-radius:4px;color:#fff;display:inline-block;overflow:hidden;text-decoration:none;background-color:#2d3748;border-bottom:8px solid #2d3748;border-left:18px solid #2d3748;border-right:18px solid #2d3748;border-top:8px solid #2d3748;" target="_blank">Set a new expiry time</a>
</div>

@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
