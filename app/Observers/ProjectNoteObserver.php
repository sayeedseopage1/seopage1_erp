<?php

namespace App\Observers;

use App\Models\ProjectNote;

class ProjectNoteObserver
{

    /**
     * @param ProjectNote $ProjectNote
     */
    public function saving(ProjectNote $ProjectNote)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $ProjectNote->last_updated_by = user()->id;
        }
    }

    public function creating(ProjectNote $ProjectNote)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $ProjectNote->added_by = user()->id;
        }
    }

}
