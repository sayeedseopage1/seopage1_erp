@php
$notificationUser = \App\Models\TaskHistory::where('task_id', $notification->data['id'])
    ->orderBy('id', 'desc')
    ->first();
@endphp
@if ($notificationUser)
    <x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id'])"
        :image="$notificationUser->user->image_url" :title="__('email.taskComplete.subject')"
        :text="$notification->data['heading']" :time="$notification->created_at" />
@endif
