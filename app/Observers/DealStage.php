<?php

namespace App\Observers;

use App\Models\DealStage;

class DealStage
{
    /**
     * Handle the Deal "created" event.
     *
     * @param  \App\Models\Deal  $deal
     * @return void
     */
    public function created(DealStage $deal)
    {
        $user = Auth::user();
        $text = $user->getRole->name.' '.$user->name.' - Lead ('.$lead->client_name.') was converted';
        $link = '<a href="'.route('deals.show', $dealStatus->id).'">'.$text.'</a>';
        $this->saveActivityLog([
            'lead' => $dealStatus->lead_id,
            'deal' => $dealStatus->id
        ], $link);
    }

    /**
     * Handle the Deal "updated" event.
     *
     * @param  \App\Models\Deal  $deal
     * @return void
     */
    public function updated(Deal $deal)
    {
        //
    }

    /**
     * Handle the Deal "deleted" event.
     *
     * @param  \App\Models\Deal  $deal
     * @return void
     */
    public function deleted(Deal $deal)
    {
        //
    }

    /**
     * Handle the Deal "restored" event.
     *
     * @param  \App\Models\Deal  $deal
     * @return void
     */
    public function restored(Deal $deal)
    {
        //
    }

    /**
     * Handle the Deal "force deleted" event.
     *
     * @param  \App\Models\Deal  $deal
     * @return void
     */
    public function forceDeleted(Deal $deal)
    {
        //
    }
}
