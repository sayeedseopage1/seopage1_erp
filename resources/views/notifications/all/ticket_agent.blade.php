<x-cards.notification :notification="$notification"  :link="route('tickets.show', $notification->data['id'])" :image="user()->image_url"
    :title="__('email.ticketAgent.subject') . ' #' . $notification->data['id']" :time="$notification->created_at" />
