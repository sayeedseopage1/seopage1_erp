<?php

namespace App\Observers;

use App\Models\ProjectCategory;

class ProjectCategoryObserver
{

    /**
     * @param ProjectCategory $item
     */
    public function saving(ProjectCategory $item)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $item->last_updated_by = user()->id;
        }
    }

    public function creating(ProjectCategory $item)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $item->added_by = user()->id;
        }
    }

}
