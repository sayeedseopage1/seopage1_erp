<?php

namespace App\Observers;

use App\Events\NewChatEvent;
use App\Events\NewMessage;
use App\Models\Notification;
use App\Models\UserChat;
use Illuminate\Support\Facades\Config;

class NewChatObserver
{

    public function created(UserChat $userChat)
    {
        if (!isRunningInConsoleOrSeeding() && pusher_settings()->status) {
            Config::set('queue.default', 'sync'); // Set intentionally for instant delivery of messages
            event(new NewChatEvent($userChat));
            event(new NewMessage($userChat));
        }
    }

    public function deleting(UserChat $userChat)
    {
        $notifyData = ['App\Notifications\NewChat'];

        Notification::whereIn('type', $notifyData)
            ->whereNull('read_at')
            ->where('data', 'like', '{"id":'.$userChat->id.',%')
            ->delete();
    }

}
