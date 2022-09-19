<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EmployeePermissionSeeder extends Seeder
{

    protected array $permissionTypes = [
        'added' => 1,
        'owned' => 2,
        'both' => 3,
        'all' => 4,
        'none' => 5
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::beginTransaction();
        // Employee role
        $employeeRole = Role::with('roleuser', 'roleuser.user.roles')
            ->where('name', 'employee')
            ->first();

        $allPermissions = Permission::all();

        $this->permissionRole($allPermissions, 'employee');

        // Employee permissions will be synced via cron
        $userIds = $employeeRole->roleuser->pluck('user_id');
        try {
            User::whereIn('id', $userIds)->update(['permission_sync' => 0]);
        } catch (\Exception $exception) {
            Log::info($exception);
        }

        // Admin role
        $adminRole = Role::with('roleuser', 'roleuser.user.roles')
            ->where('name', 'admin')
            ->first();

        PermissionRole::where('role_id', $adminRole->id)->delete();

        $this->rolePermissionInsert($allPermissions, $adminRole->id, 'all');

        foreach ($adminRole->roleuser as $roleuser) {
            $roleuser->user->assignUserRolePermission($adminRole->id);
        }

        // Client role
        $this->permissionRole($allPermissions, 'client');

        DB::commit();
    }

    private function rolePermissionInsert($allPermissions, $roleId, $permissionType = 'none')
    {
        $data = [];

        foreach ($allPermissions as $permission) {
            $data[] = [
                'permission_id' => $permission->id,
                'role_id' => $roleId,
                'permission_type_id' => $this->permissionTypes[$permissionType],
            ];
        }

        foreach (array_chunk($data, 100) as $item) {
            PermissionRole::insert($item);
        }

    }

    private function permissionRole($allPermissions, $type)
    {
        $role = Role::with('roleuser', 'roleuser.user.roles')
            ->where('name', $type)
            ->first();

        PermissionRole::where('role_id', $role->id)->delete();

        $this->rolePermissionInsert($allPermissions, $role->id);

        $permissionArray = [];

        if ($type === 'client') {
            $permissionArray = PermissionRole::clientRolePermissions();

        } elseif ($type === 'employee') {
            $permissionArray = PermissionRole::employeeRolePermissions();

        }

        $permissionArrayKeys = array_keys($permissionArray);

        $permissions = Permission::whereIn('name', $permissionArrayKeys)->get();

        foreach ($permissions as $key => $ep) {

            $permissionRole = PermissionRole::with('permission')
                ->where('permission_id', $ep->id)
                ->where('role_id', $role->id)
                ->first();

            PermissionRole::where('permission_id', $ep->id)
                ->where('role_id', $role->id)
                ->update([
                    'permission_type_id' => $this->permissionTypes[$permissionArray[$permissionRole->permission->name]]
                ]);
        }

        if ($type === 'client') {
            foreach ($role->roleuser as $roleuser) {
                $roleuser->user->assignUserRolePermission($role->id);
            }
        }
    }

}
