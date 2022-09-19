<?php

namespace App\Observers;

use App\Models\ClientContact;

class ClientContactObserver
{

    public function saving(ClientContact $clientDetails)
    {
        if (user()) {
            $clientDetails->last_updated_by = user()->id;
        }
    }

    public function creating(ClientContact $clientDetails)
    {
        if (user()) {
            $clientDetails->added_by = user()->id;
        }
    }

}
