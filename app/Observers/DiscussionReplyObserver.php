<?php

namespace App\Observers;

use App\Models\DiscussionReply;
use App\Events\DiscussionReplyEvent;
use Carbon\Carbon;

class DiscussionReplyObserver
{

    public function created(DiscussionReply $discussionReply)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $discussion = $discussionReply->discussion;
            $discussion->last_reply_at = now()->toDateTimeString();
            $discussion->last_reply_by_id = user()->id;
            $discussion->save();

            event(new DiscussionReplyEvent($discussionReply, $discussion->user));
        }
    }

    public function deleted(DiscussionReply $discussionReply)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $discussion = $discussionReply->discussion;
            $discussion->best_answer_id = null;
            $discussion->save();
        }
    }

}
