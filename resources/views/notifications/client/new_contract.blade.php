<x-cards.notification :notification="$notification"  :link="route('contracts.show', $notification->data['id'])" :image="global_setting()->logo_url"
    :title="__('email.newContract.subject')" :time="$notification->created_at" />
