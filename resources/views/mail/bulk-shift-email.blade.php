@component('mail::message')
# @lang('email.shiftScheduled.subject')

@component('mail::table')
| @lang('app.date')         | @lang('modules.attendance.shift')  |
|:------------- | --------:|
@foreach ($employeeShifts as $item)
| {{ $item->date->format('d M, Y') .' ('.$item->date->format('l').')'  }}      | {{ $item->shift->shift_name }}      |    
@endforeach
@endcomponent

@lang('email.regards'),<br>
{{ config('app.name') }}
@endcomponent
