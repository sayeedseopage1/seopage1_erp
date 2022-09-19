@php
if (isset($notification->data['user_id'])) {
    $notificationUser = \App\Models\User::find($notification->data['user_id']);
} else {
    $notificationUser = user();
}
@endphp

<x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id']) . '?view=comments'"
    :image="$notificationUser->image_url" :title="__('email.taskComment.subject'). ' #' . $notification->data['id']" :text="$notification->data['heading']"
    :time="$notification->created_at" />
