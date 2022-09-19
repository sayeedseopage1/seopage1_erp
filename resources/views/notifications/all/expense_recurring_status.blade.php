@php
$notificationUser = \App\Models\User::findOrFail($notification->data['user_id']);
@endphp

<x-cards.notification :notification="$notification"  :link="route('expenses.show', $notification->data['id'])" :image="$notificationUser->image_url"
    :title="__('email.expenseRecurringStatus.subject')" :text="$notification->data['item_name']"
    :time="$notification->created_at" />
