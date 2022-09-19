<?php

namespace App\Observers;

use App\Models\UserPermission;
use Illuminate\Support\Facades\Cache;

class UserPermissionObserver
{

    public function saving(UserPermission $permission)
    {

        Cache::forget('permission-' . $permission->permission->name . '-' . $permission->user_id);
        Cache::forget('permission-id-' . $permission->permission->name . '-' . $permission->user_id);
    }

}
