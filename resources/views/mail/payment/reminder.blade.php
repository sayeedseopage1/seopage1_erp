@component('mail::message')
# <center> @lang('email.paymentReminder.subject') </center>

# @lang('app.invoice') @lang('app.details') -

@component('mail::text', ['text' => $content])
@endcomponent

@component('mail::button', ['url' => $paymentUrl])
    @lang('app.view') @lang('app.invoice')
@endcomponent

@lang('email.regards'),<br>
    {{ config('app.name') }}
@endcomponent
