<x-cards.notification :notification="$notification"  :link="route('events.index')" :image="user()->image_url" :title="__('email.newEvent.subject')"
    :text="$notification->data['event_name']" :time="$notification->created_at" />
