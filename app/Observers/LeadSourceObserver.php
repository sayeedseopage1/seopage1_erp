<?php

namespace App\Observers;

use App\Models\LeadSource;

class LeadSourceObserver
{

    public function saving(LeadSource $leadSource)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadSource->last_updated_by = user()->id;
        }
    }

    public function creating(LeadSource $leadSource)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadSource->added_by = user()->id;
        }
    }

}
