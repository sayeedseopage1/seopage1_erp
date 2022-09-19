<?php

namespace App\Observers;

use App\Events\FileUploadEvent;
use App\Models\ProjectFile;

class FileUploadObserver
{

    public function saving(ProjectFile $project)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $project->last_updated_by = user()->id;
        }
    }

    public function creating(ProjectFile $project)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $project->added_by = user()->id;
        }
    }

    public function created(ProjectFile $file)
    {
        if (!isRunningInConsoleOrSeeding()) {
            event(new FileUploadEvent($file));
        }
    }

}
