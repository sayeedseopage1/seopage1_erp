@php
$notificationUser = \App\Models\Project::findOrFail($notification->data['id']);
@endphp

<x-cards.notification :notification="$notification"  :link="route('projects.show', $notification->data['id'])"
    :image="$notificationUser->client->image_url" :title="__('email.rating.subject')"
    :text="$notification->data['project_name']" :time="$notification->created_at" />
