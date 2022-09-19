<x-cards.notification :notification="$notification" :link="route('employees.show', $notification->data['user_id'])" :image="$notification->data['image_url']" :title="$notification->data['name']" :text="__('email.newUserViaLink.subject')"
    :time="$notification->created_at" />
