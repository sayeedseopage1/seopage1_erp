@php
$notificationUser = \App\Models\User::findOrFail($notification->data['id']);
@endphp

<x-cards.notification :notification="$notification"  :link="route('clients.show', $notification->data['id'])" :image="$notificationUser->image_url"
    :title="__('email.newCustomer.subject')" :text="$notification->data['name']" :time="$notification->created_at" />
