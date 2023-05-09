<?php

namespace App\Observers;

use App\Models\DealStage;
use App\Models\DealStatus;
use App\Models\User;
use App\Models\UserDealboardSetting;
use App\Traits\LeadDealActivityLog;
use Auth;

class DealStatusObserver
{
    use LeadDealActivityLog;

    public function created(DealStatus $dealStatus)
    {
        if (!isRunningInConsoleOrSeeding()) {
            $employees = User::allEmployees();

            foreach ($employees as $item) {
                UserDealboardSetting::create([
                    'user_id' => $item->id,
                    'board_column_id' => $dealStatus->id
                ]);
            }
        }
    }

    public function deleting(DealStatus $dealStatus)
    {
        $defaultStatus = DealStatus::where('default', 1)->first();
        abort_403($defaultStatus->id == $dealStatus->id);

        DealStage::where('status_id', $dealStatus->id)->update(['status_id' => $defaultStatus->id]);;
    }

}
