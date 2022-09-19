<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use App\Models\PermissionRole;
use Illuminate\Database\Seeder;

class KnowledgeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        $permissionTypes = [
            'added' => 1,
            'owned' => 2,
            'both' => 3,
            'all' => 4,
            'none' => 5
        ];

        $employeeRole = Role::where('name', 'employee')->orWhere('name', 'client')->get('id');
        $allPermissions = Permission::where('name', 'view_knowledgebase')->get('id');

        for($role_id = 0;$role_id < 2;$role_id++){
            PermissionRole::where('role_id', $employeeRole[$role_id]['id'])
                ->where('permission_id', $allPermissions[0]['id'])
                ->update(['permission_type_id' => $permissionTypes['all']]);
        }

    }

}
