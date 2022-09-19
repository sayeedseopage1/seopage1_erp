<?php

namespace App\Observers;

use App\Models\Lead;
use App\Models\LeadStatus;
use App\Models\User;
use App\Models\UserLeadboardSetting;

class LeadStatusObserver
{

    public function created(LeadStatus $leadStatus)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $employees = User::allEmployees();

            foreach ($employees as $item) {
                UserLeadboardSetting::create([
                    'user_id' => $item->id,
                    'board_column_id' => $leadStatus->id
                ]);
            }
        }
    }

    public function deleting(LeadStatus $leadStatus)
    {
        $defaultStatus = LeadStatus::where('default', 1)->first();
        abort_403($defaultStatus->id == $leadStatus->id);

        Lead::where('status_id', $leadStatus->id)->update(['status_id' => $defaultStatus->id]);;
    }

}
