<?php

namespace App\Observers;

use App\Models\LeadAgent;

class LeadAgentObserver
{

    public function saving(LeadAgent $leadAgent)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadAgent->last_updated_by = user()->id;
        }
    }

    public function creating(LeadAgent $leadAgent)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadAgent->added_by = user()->id;
        }
    }

}
