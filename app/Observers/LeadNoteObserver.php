<?php

namespace App\Observers;

use App\Models\LeadNote;

class LeadNoteObserver
{

    /**
     * @param LeadNote $leadNote
     */
    public function saving(LeadNote $leadNote)
    {
        if (!isRunningInConsoleOrSeeding() ) {
            if (user()) {
                $leadNote->last_updated_by = user()->id;
            }
        }
    }

    public function creating(LeadNote $leadNote)
    {
        if (!isRunningInConsoleOrSeeding() ) {
            if (user()) {
                $leadNote->added_by = user()->id;
            }
        }
    }

}
