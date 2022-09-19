@php
$notificationUser = \App\Models\User::findOrFail($notification->data['user_id']);
@endphp

<x-cards.notification :notification="$notification"  :link="route('leaves.show', $notification->data['id'])" :image="$notificationUser->image_url"
    :title="__('email.leaves.subject')" :text="$notification->data['user']['name']" :time="$notification->created_at" />
