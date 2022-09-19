@php
$notificationUser = \App\Models\User::findOrFail($notification->data['user_one']);
if (!isset($notification->data['from_name'])) {
    $chat = \App\UserChat::with('fromUser')->find($notification->data['id']);
    $fromName = $chat->fromUser->name;
} else {
    $fromName = $notification->data['from_name'];
}
@endphp

<x-cards.notification :notification="$notification"  :link="route('messages.index') . '?user=' . $notification->data['user_one']"
    :image="$notificationUser->image_url" :title="__('email.newChat.subject')" :text="$notificationUser->name"
    :time="$notification->created_at" />
