<x-cards.notification :notification="$notification"  :link="route('orders.show', $notification->data['id'])" :image="global_setting()->logo_url"
    :title="__('email.order.subject')" :text="$notification->data['order_number']"
    :time="$notification->created_at" />
