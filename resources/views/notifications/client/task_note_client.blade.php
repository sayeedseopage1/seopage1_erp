<x-cards.notification :notification="$notification"  :link="route('tasks.show', $notification->data['id']).'?view=notes'" :image="user()->image_url"
    :title="__('email.taskNote.subject')" :text="ucfirst($notification->data['heading'])"
    :time="$notification->created_at" />
