@php
if(isset($notification->data['added_by']))
{
    $notificationUser = \App\Models\User::findOrFail($notification->data['added_by']);
}
else
{
    $notificationUser = \App\Models\User::findOrFail(user()->id);
}
@endphp

<x-cards.notification :notification="$notification"  :link="route('leads.show', $notification->data['id'])" :image="$notificationUser->image_url"
    :title="__('email.leadAgent.subject')"
    :text="$notification->data['name']"
    :time="$notification->created_at" />
