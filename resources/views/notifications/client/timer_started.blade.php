<x-cards.notification :notification="$notification"  :link="route('projects.show', $notification->data['project']['id'])" :image="user()->image_url"
    :title="__('messages.timerStartedProject')" :text="ucfirst($notification->data['project']['project_name'])"
    :time="$notification->created_at" />
