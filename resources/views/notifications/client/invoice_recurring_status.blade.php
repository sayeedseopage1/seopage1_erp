<x-cards.notification :notification="$notification"  :link="route('recurring-invoices.show', $notification->data['id'])" :image="global_setting()->logo_url"
    :title="__('email.invoiceRecurringStatus.subject')" :text="$notification->data['event_name']"
    :time="$notification->created_at" />
