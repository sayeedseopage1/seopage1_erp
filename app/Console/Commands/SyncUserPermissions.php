<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class SyncUserPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync-user-permissions {all?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync User Permissions';

    public function handle()
    {
        $unsyncedUsers = User::with('roles', 'role')->where('permission_sync', 0);

        $unsyncedUsers = $this->argument('all') ? $unsyncedUsers->get() : $unsyncedUsers->limit(10)->get();

        if (count($unsyncedUsers) == 0) {
            $this->info('All user permissions are synced ');
            return true;
        }

        foreach ($unsyncedUsers as $user) {
            $userRole = $user->roles->pluck('name')->toArray();

            if (!in_array('admin', $userRole) && count($userRole) == 1) {
                $this->info('Syncing permission started for ' . $user->name);

                $roleId = $user->role[0]->role_id;
                $user->assignUserRolePermission($roleId);

                $this->info('Syncing permission ended for ' . $user->name);

            }

            $user->permission_sync = 1;
            $user->save();
        }
    }

}
