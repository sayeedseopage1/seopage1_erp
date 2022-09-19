<?php

namespace App\Observers;

use App\Models\LeadCustomForm;

class LeadCustomFormObserver
{

    public function saving(LeadCustomForm $leadCustomForm)
    {
        if (user()) {
            $leadCustomForm->last_updated_by = user()->id;
        }
    }

    public function creating(LeadCustomForm $leadCustomForm)
    {
        if (user()) {
            $leadCustomForm->added_by = user()->id;
        }
    }

}
