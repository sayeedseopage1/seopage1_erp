<?php

namespace App\Observers;

use App\Models\ClientNote;

class ClientNoteObserver
{

    /**
     * @param ClientNote $clientNote
     */
    public function saving(ClientNote $clientNote)
    {
        if (user()) {
            $clientNote->last_updated_by = user()->id;
        }
    }

    public function creating(ClientNote $clientNote)
    {
        if (user()) {
            $clientNote->added_by = user()->id;
        }
    }

}
