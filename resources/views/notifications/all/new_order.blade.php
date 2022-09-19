@php
$user =  \App\Models\Order::find($notification->data['id'])->client;
@endphp

<x-cards.notification :notification="$notification"  :link="route('orders.show', $notification->data['id'])" :image="$user->image_url"
    :title="__('email.order.subject')" :text="$notification->data['order_number']"
    :time="$notification->created_at" />
