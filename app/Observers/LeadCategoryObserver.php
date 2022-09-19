<?php

namespace App\Observers;

use App\Models\LeadCategory;

class LeadCategoryObserver
{

    public function saving(LeadCategory $leadCategory)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadCategory->last_updated_by = user()->id;
        }
    }

    public function creating(LeadCategory $leadCategory)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $leadCategory->added_by = user()->id;
        }
    }

}
