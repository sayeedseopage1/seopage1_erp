@php
$notificationUser = \App\Models\User::findOrFail($notification->data['client_id']);
@endphp
<x-cards.notification :notification="$notification"  :link="route('contracts.show', $notification->data['id'])"
    :image="$notificationUser->image_url" :title="__('email.contractSign.subject')"
    :text="$notification->data['subject']" :time="$notification->created_at" />
