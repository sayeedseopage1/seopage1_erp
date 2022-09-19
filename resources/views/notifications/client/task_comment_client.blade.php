<x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id']).'?view=comments'" :image="user()->image_url"
    :title="__('email.taskComment.subject')" :text="ucfirst($notification->data['heading'])"
    :time="$notification->created_at" />
