<?php

namespace App\Observers;

use App\Helper\Files;
use App\Models\TaskFile;

class TaskFileObserver
{

    public function saving(TaskFile $file)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $file->last_updated_by = user()->id;
        }
    }

    public function creating(TaskFile $file)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $file->added_by = $file->user_id;
        }
    }

}
