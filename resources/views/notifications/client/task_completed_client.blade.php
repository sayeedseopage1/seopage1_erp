@php
$notificationUser = \App\Models\TaskHistory::with('user')
    ->where('task_id', $notification->data['id'])
    ->first();
@endphp
@if ($notificationUser)
    <x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id'])"
        :image="$notificationUser->user->image_url" :title="__('email.taskComplete.subject')"
        :text="ucfirst($notification->data['heading'])" :time="$notification->created_at" />
@endif
