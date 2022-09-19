<?php

namespace App\Observers;

use App\Models\Task;

class TaskLabelListObserver
{

    public function updated($taskLabel)
    {
        if ($taskLabel->isDirty('project_id') && request()->task_id != null) {

            $task = Task::with('labels')->find(request()->task_id);

            if ($task->project_id != $taskLabel->project_id) {
                $task->labels()->detach(request()->label_id);
            }

        }
    }

}


