<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Http\Requests\Role\StoreRole;
use App\Models\Module;
use App\Models\ModuleSetting;
use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\PermissionType;
use App\Models\Role;
use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Http\Request;

class RolePermissionController extends AccountBaseController
{

    public function __construct()
    {
        parent::__construct();
        $this->pageTitle = 'app.menu.rolesPermission';
        $this->activeSettingMenu = 'role_permissions';
    }

    public function index()
    {
        abort_403(user()->permission('manage_role_permission_setting') != 'all');

        $this->roles = Role::withCount('users')
            ->where('name', '<>', 'admin')
            ->orderBy('id', 'asc')
            ->get();

        $this->totalPermissions = Permission::count();
        return view('role-permissions.index', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */

    public function create()
    {
        abort_403(user()->permission('manage_role_permission_setting') != 'all');

        $this->roles = Role::withCount('unsyncedUsers')->get();
        
        return view('role-permissions.ajax.create', $this->data);
    }

    public function store(Request $request)
    {
        abort_403(user()->permission('manage_role_permission_setting') != 'all');

        $roleId = $request->roleId;
        $permissionId = $request->permissionId;
        
        $permissionType = $request->permissionType;

        if ($permissionType == '') {
            abort(404);
        }

        $role = Role::with('users', 'users.role')->find($roleId);

        // Update role's permission
        $permissionRole = PermissionRole::where('permission_id', $permissionId)
            ->where('role_id', $roleId)
            ->first();

        if ($permissionRole) {
            $permissionRole = PermissionRole::where('permission_id', $permissionId)
                ->where('role_id', $roleId)
                ->update(['permission_type_id' => $permissionType]);
    
        } else {
            $permissionRole = new PermissionRole();
            $permissionRole->permission_id = $permissionId;
            $permissionRole->role_id = $roleId;
            $permissionRole->permission_type_id = $permissionType;
            $permissionRole->save();
    
        }

        // Update user permission with the role
        foreach ($role->users as $roleuser) {
            if (($role->name == 'employee' && count($roleuser->role) == 1) || $role->name != 'employee') {
                $userPermission = UserPermission::where('permission_id', $permissionId)
                    ->where('user_id', $roleuser->id)
                    ->firstOrNew();

                $userPermission->permission_id = $permissionId;
                $userPermission->user_id = $roleuser->id;
                $userPermission->permission_type_id = $permissionType;
                $userPermission->save();
            }
        }

        return Reply::dataOnly(['status' => 'success']);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function permissions()
    {
        $roleId = request('roleId');
        $this->role = Role::with('permissions')->find($roleId);

        if ($this->role->name == 'client') {
            $clientModules = ModuleSetting::where('type', 'client')->get()->pluck('module_name');
            $this->modulesData = Module::with('permissions')->withCount('customPermissions')
                ->whereIn('module_name', $clientModules)->get();

        } else {
            $this->modulesData = Module::with('permissions')->withCount('customPermissions')->get();
        }

        $html = view('role-permissions.ajax.permissions', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html]);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function updateUserPermissions($roleId, $userId)
    {
        $rolePermissions = PermissionRole::where('role_id', $roleId)->get();

        foreach ($rolePermissions as $key => $value) {
            UserPermission::where('permission_id', $value->permission_id)
                ->where('user_id', $userId)
                ->update(['permission_type_id' => $value->permission_type_id]);
        }

        return Reply::dataOnly(['status' => 'success']);
    }

    public function storeRole(StoreRole $request)
    {
        abort_403(user()->permission('manage_role_permission_setting') != 'all');

        $role = new Role();
        $role->name = $request->name;
        $role->display_name = mb_ucwords($request->name);
        $role->save();

        if ($request->import_from_role != '') {
            $importRolePermissions = PermissionRole::where('role_id', $request->import_from_role)->get();
            
            if (count($importRolePermissions) == 0) {
                return Reply::error(__('messages.noRoleFound'));
            }
            
            foreach($importRolePermissions as $perm)
            {
                $perm->replicate()->fill([
                    'role_id' => $role->id
                ])->save();
            }

        } else {
            $allPermissions = Permission::all();
            $role->perms()->sync([]);
            $role->attachPermissions($allPermissions);
        }

        return Reply::success(__('messages.roleCreated'));
    }

    public function deleteRole(Request $request)
    {
        Role::whereId($request->roleId)->delete();
        return Reply::dataOnly(['status' => 'success']);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function customPermissions(Request $request)
    {
        $moduleId = $request->moduleId;
        $roleId = request('roleId');
        $this->role = Role::with('permissions')->find($roleId);
        $this->modulesData = Module::with('customPermissions')->findOrFail($moduleId);;
        $html = view('role-permissions.ajax.custom_permissions', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html]);
    }

    public function resetPermissions()
    {
        $permissionTypes = [
            'added' => 1,
            'owned' => 2,
            'both' => 3,
            'all' => 4,
            'none' => 5
        ];
        
        $role = Role::with('roleuser', 'roleuser.user.roles')->findOrFail(request('roleId'));
        $allPermissions = Permission::all();
        
        PermissionRole::where('role_id', $role->id)->delete();

        switch ($role->name) {
        case 'employee':
            $rolePermissionsArray = PermissionRole::employeeRolePermissions();
                break;

        case 'client':
            $rolePermissionsArray = PermissionRole::clientRolePermissions();
                break;
            
        default:
                return Reply::error(__('messages.permissionDenied'));
        }

        foreach ($allPermissions as $key => $value) {
            $permissionRole = new PermissionRole();
            $permissionRole->permission_id = $value->id;
            $permissionRole->role_id = $role->id;
            $permissionRole->permission_type_id = $permissionTypes['none'];
            $permissionRole->save();
        }

        $rolePermissionsArrayKeys = array_keys($rolePermissionsArray);

        $rolePermissions = Permission::whereIn('name', $rolePermissionsArrayKeys)->get();

           
        foreach ($rolePermissions as $key => $ep) {

            $permissionRole = PermissionRole::with('permission', 'permission')
                ->where('permission_id', $ep->id)
                ->where('role_id', $role->id)
                ->first();
            PermissionRole::where('permission_id', $ep->id)
                ->where('role_id', $role->id)
                ->update(['permission_type_id' => $permissionTypes[$rolePermissionsArray[$permissionRole->permission->name]]]);
        }

        $userIds = $role->roleuser->pluck('user_id');

        User::whereIn('id', $userIds)->update(['permission_sync' => 0]);

        return Reply::success(__('messages.recordSaved'));

    }

    public function update(Request $request, $id)
    {
        Role::where('id', $id)->update(['display_name' => mb_ucwords($request->role_name), 'name' => $request->role_name]);
    }

    public function addMissingAdminPermission()
    {
        $adminRole = Role::where('name', 'admin')->first();
       
        if ($adminRole) {
            $adminPermission = PermissionRole::where('role_id', $adminRole->id)->pluck('permission_id')->toArray();
            $allTypePermisison = PermissionType::where('name', 'all')->first();
            $missingPermissions = Permission::select('id')->whereNotIn('id', $adminPermission)->get();
    
            foreach ($missingPermissions as $key => $value) {
                PermissionRole::create([
                    'permission_id' => $value->id,
                    'role_id' => $adminRole->id,
                    'permission_type_id' => $allTypePermisison->id
                ]);
            }

            if (count($missingPermissions) > 0) {
                $this->addMissingAdminUserPermission($adminRole->id);
            }
        }
    }

    public function addMissingEmployeePermission()
    {
        $roles = Role::where('name', '<>', 'admin')->get();

        foreach ($roles as $employeeRole) {
            $employeePermission = PermissionRole::where('role_id', $employeeRole->id)->pluck('permission_id')->toArray();
            $noneTypePermisison = PermissionType::where('name', 'none')->first();
            $missingPermissions = Permission::select('id')->whereNotIn('id', $employeePermission)->get();

            foreach ($missingPermissions as $key => $value) {
                PermissionRole::create([
                'permission_id' => $value->id,
                'role_id' => $employeeRole->id,
                'permission_type_id' => $noneTypePermisison->id
                ]);
            }

            if (count($missingPermissions) > 0) {
                $this->addMissingUserPermission($employeeRole->id);
            }
        }
    }

    public function addMissingAdminUserPermission($roleId)
    {

        $role = Role::withCount('permissions')->find($roleId);
        $users = $role->users;

        foreach ($users as $user) {
            $user->assignUserRolePermission($roleId);
        }
    }

    public function addMissingUserPermission($roleId)
    {

        $role = Role::withCount('permissions')->find($roleId);
        $users = $role->users;

        foreach ($users as $user) {
            $userRole = $user->roles->pluck('name')->toArray();

            if (!in_array('admin', $userRole)) {
                $user->assignUserRolePermission($roleId);
            }

        }
    }

}
