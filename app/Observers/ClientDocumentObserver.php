<?php

namespace App\Observers;

use App\Models\ClientDocument;

class ClientDocumentObserver
{

    /**
     * @param ClientDocument $clientDocs
     */
    public function saving(ClientDocument $clientDocs)
    {
        if (user()) {
            $clientDocs->last_updated_by = user()->id;
        }
    }

    public function creating(ClientDocument $clientDocs)
    {
        if (user()) {
            $clientDocs->added_by = user()->id;
        }
    }

}
