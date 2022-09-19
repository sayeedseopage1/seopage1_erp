@php
if (!isset($notification->data['project'])) {
    $project = \App\ProjectMember::with('project')->find($notification->data['id']);
    $projectId = $project->project_id;
    $project = $project->project->project_name;
} else {
    $projectId = $notification->data['project_id'];
    $project = $notification->data['project'];
}
@endphp

<x-cards.notification :notification="$notification"  :link="route('projects.show', $projectId)" :image="user()->image_url"
    :title="__('email.newProjectMember.subject')" :text="$project" :time="$notification->created_at" />
