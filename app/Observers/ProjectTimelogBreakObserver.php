<?php

namespace App\Observers;

use App\Models\ProjectTimeLogBreak;

class ProjectTimelogBreakObserver
{

    public function saving(ProjectTimeLogBreak $projectTimeLogBreak)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $projectTimeLogBreak->last_updated_by = user()->id;
        }
    }

    public function creating(ProjectTimeLogBreak $projectTimeLogBreak)
    {
        if (!isRunningInConsoleOrSeeding() && user()) {
            $projectTimeLogBreak->added_by = user()->id;
        }
    }

}
