@php
$notificationUser = \App\Models\User::findOrFail($notification->data['user_id']);
$shift = \App\Models\EmployeeShift::findOrFail($notification->data['shift_id']);
@endphp
<x-cards.notification :notification="$notification"  :link="route('dashboard')"
    :image="$notificationUser->image_url" :title="__('email.shiftScheduled.subject') . ' - '.\Carbon\Carbon::parse($notification->data['date'])->format(global_setting()->date_format)"
    :text="__('modules.attendance.shiftName').': '.$shift->shift_name" :time="$notification->created_at" />
