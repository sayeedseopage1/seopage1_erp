@php
$discussion = \App\Models\Discussion::find($notification->data['id']);
$projectId = $notification->data['project_id'];
$notificationUser = \App\Models\User::findOrFail($discussion->user_id);
$route = route('projects.show', $projectId) . '?tab=discussion';
@endphp

<x-cards.notification :notification="$notification"  :link="$route" :image="$notificationUser->image_url" :title="__('email.discussion.subject')"
    :text="ucfirst($notification->data['title'])" :time="$notification->created_at" />
