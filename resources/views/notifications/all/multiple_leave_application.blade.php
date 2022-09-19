@php
$notificationUser = \App\Models\User::findOrFail($notification->data['user_id']);
@endphp

<x-cards.notification :notification="$notification" :link="route('leaves.index')" :image="$notificationUser->image_url" :title="__('email.leave.applied')" :time="$notification->created_at" />
