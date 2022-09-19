<x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id'])" :image="user()->image_url"
    :title="__('email.taskUpdate.subject')" :text="$notification->data['heading']" :time="$notification->created_at" />
