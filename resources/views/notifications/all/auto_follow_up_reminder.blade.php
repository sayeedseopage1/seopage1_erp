<x-cards.notification :notification="$notification"  :link="route('leads.show', $notification->data['id']).'?tab=follow-up'" :image="global_setting()->logo_url"
    :title="__('email.followUpReminder.subject') . ' #' . $notification->data['id']"
    :time="$notification->created_at" />
