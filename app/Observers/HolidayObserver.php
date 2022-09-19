<?php

namespace App\Observers;

use App\Models\Holiday;

class HolidayObserver
{

    public function saving(Holiday $lead)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $lead->last_updated_by = user()->id;
        }
    }

    public function creating(Holiday $lead)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $lead->added_by = user()->id;
        }
    }

}
