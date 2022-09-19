<?php

namespace App\Observers;

use App\Models\ContractDiscussion;

class ContractDiscussionObserver
{

    public function saving(ContractDiscussion $contract)
    {
        if (user()) {
            $contract->last_updated_by = user()->id;
        }
    }

    public function creating(ContractDiscussion $contract)
    {
        if (user()) {
            $contract->added_by = user()->id;
        }
    }

}
