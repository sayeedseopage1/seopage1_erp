<?php

namespace App\Observers;

use App\Models\ContractFile;

class ContractFileObserver
{

    public function saving(ContractFile $file)
    {
        if (user()) {
            $file->last_updated_by = user()->id;
        }
    }

    public function creating(ContractFile $file)
    {
            $file->added_by = $file->user_id;
    }

}
