<?php

namespace App\Events;

use App\Models\Task;
use App\Models\TaskComment;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TaskCommentEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $task;
    public $notifyUser;
    public $comment;
    public $client;

    public function __construct(Task $task, TaskComment $comment, $notifyUser, $client = null)
    {
        $this->task = $task;
        $this->comment = $comment;
        $this->notifyUser = $notifyUser;
        $this->client = $client;
    }

}
