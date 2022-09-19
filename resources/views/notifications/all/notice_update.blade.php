<x-cards.notification :notification="$notification"  :link="route('notices.show', $notification->data['id'])" :image="user()->image_url"
    :title="__('email.noticeUpdate.subject')" :text="$notification->data['heading']"
    :time="$notification->created_at" />
