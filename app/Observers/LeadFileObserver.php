<?php

namespace App\Observers;

use App\Helper\Files;
use App\Models\LeadFiles;

class LeadFileObserver
{

    public function saving(LeadFiles $leadFile)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadFile->last_updated_by = user()->id;
        }
    }

    public function creating(LeadFiles $leadFile)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadFile->added_by = user()->id;
        }

    }

}
