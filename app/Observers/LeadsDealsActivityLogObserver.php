<?php

namespace App\Observers;

use App\Models\LeadsDealsActivityLog;

class LeadsDealsActivityLogObserver
{
    /**
     * Handle the LeadsDealsActivityLog "created" event.
     *
     * @param  \App\Models\LeadsDealsActivityLog  $leadsDealsActivityLog
     * @return void
     */
    public function created(LeadsDealsActivityLog $leadsDealsActivityLog)
    {
        if (!is_null($leadsDealsActivityLog->lead_id) && !is_null($leadsDealsActivityLog->deal_id)) {
            $data = LeadsDealsActivityLog::where([
                'lead_id' => $leadsDealsActivityLog->lead_id,
                'deal_id' => null
            ])->update([
                'deal_id' => $leadsDealsActivityLog->deal_id
            ]);
        }

        if (!is_null($leadsDealsActivityLog->deal_id) && !is_null($leadsDealsActivityLog->won_deal_id)) {
            $data = LeadsDealsActivityLog::where([
                'deal_id' => $leadsDealsActivityLog->deal_id,
                'won_deal_id' => null
            ])->update([
                'won_deal_id' => $leadsDealsActivityLog->won_deal_id
            ]);
        }

        if (!is_null($leadsDealsActivityLog->won_deal_id) && !is_null($leadsDealsActivityLog->project_id)) {
            $data = LeadsDealsActivityLog::where([
                'won_deal_id' => $leadsDealsActivityLog->won_deal_id,
                'project_id' => null
            ])->update([
                'project_id' => $leadsDealsActivityLog->project_id
            ]);
        }
    }

    /**
     * Handle the LeadsDealsActivityLog "updated" event.
     *
     * @param  \App\Models\LeadsDealsActivityLog  $leadsDealsActivityLog
     * @return void
     */
    public function updated(LeadsDealsActivityLog $leadsDealsActivityLog)
    {
        //
    }

    /**
     * Handle the LeadsDealsActivityLog "deleted" event.
     *
     * @param  \App\Models\LeadsDealsActivityLog  $leadsDealsActivityLog
     * @return void
     */
    public function deleted(LeadsDealsActivityLog $leadsDealsActivityLog)
    {
        //
    }

    /**
     * Handle the LeadsDealsActivityLog "restored" event.
     *
     * @param  \App\Models\LeadsDealsActivityLog  $leadsDealsActivityLog
     * @return void
     */
    public function restored(LeadsDealsActivityLog $leadsDealsActivityLog)
    {
        //
    }

    /**
     * Handle the LeadsDealsActivityLog "force deleted" event.
     *
     * @param  \App\Models\LeadsDealsActivityLog  $leadsDealsActivityLog
     * @return void
     */
    public function forceDeleted(LeadsDealsActivityLog $leadsDealsActivityLog)
    {
        //
    }
}
