<?php

namespace App\Observers;

use App\Http\Controllers\AppSettingController;
use App\Models\InvoiceSetting;
use App\Models\Role;

class InvoiceSettingObserver
{

    public function updated(InvoiceSetting $invoiceSetting)
    {
        if (!isRunningInConsoleOrSeeding()) {

            if ($invoiceSetting->isDirty('template')) {
                $role = Role::with('roleuser')->where('name', 'client')->first();
                $roleUsers = $role->roleuser->pluck('user_id')->toArray();
                $deleteSessions = new AppSettingController();
                $deleteSessions->deleteSessions($roleUsers);
            }
        }
    }

}
