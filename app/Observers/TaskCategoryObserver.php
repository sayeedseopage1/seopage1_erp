<?php

namespace App\Observers;

use App\Models\TaskCategory;

class TaskCategoryObserver
{

    /**
     * @param TaskCategory $item
     */
    public function saving(TaskCategory $item)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $item->last_updated_by = user()->id;
        }
    }

    public function creating(TaskCategory $item)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $item->added_by = user()->id;
        }
    }

}
