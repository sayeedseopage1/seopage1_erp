@php
if (!isset($notification->data['subject'])) {
    $ticketReply = \App\Models\Ticket::find($notification->data['id']);
    $subject = $ticketReply->ticket->subject;
} else {
    $subject = $notification->data['subject'];
}
$notificationUser = \App\Models\User::withoutGlobalScope('active')->findOrFail($notification->data['user_id']);
@endphp

<x-cards.notification :notification="$notification"  :link="route('tickets.show', $notification->data['id'])" :image="$notificationUser->image_url"
    :title="__('email.ticketReply.subject') . ' #' . $notification->data['id']" :text="$subject"
    :time="$notification->created_at" />
