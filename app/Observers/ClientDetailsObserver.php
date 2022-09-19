<?php

namespace App\Observers;

use App\Models\ClientDetails;

class ClientDetailsObserver
{

    /**
     * @param ClientDetails $clientDetails
     */
    public function saving(ClientDetails $clientDetails)
    {
        if (user()) {
            $clientDetails->last_updated_by = user()->id;
        }

        if (request()->has('added_by')) {
            $clientDetails->added_by = request('added_by');
        }
    }

    public function creating(ClientDetails $clientDetails)
    {
        if (user()) {
            $clientDetails->added_by = user()->id;
        }
    }

}
