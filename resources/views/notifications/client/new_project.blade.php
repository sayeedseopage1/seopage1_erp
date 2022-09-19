<x-cards.notification :notification="$notification"  :link="route('projects.show', $notification->data['id'])" :image="user()->image_url"
    :title="__('email.newProject.subject')" :time="$notification->created_at" />
