<?php

namespace App\Observers;

use App\Models\ContractRenew;

class ContractRenewObserver
{

    public function saving(ContractRenew $contractRenew)
    {
        if (!isRunningInConsoleOrSeeding()) {
            if (user()) {
                $contractRenew->last_updated_by = user()->id;
            }
        }
    }

    public function creating(ContractRenew $contractRenew)
    {
        if (user()) {
            $contractRenew->added_by = user()->id;
        }
    }

}
