<?php

namespace App\Http\Controllers;

use App\Helper\Reply;
use App\Models\Module;
use App\Models\Role;
use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Http\Request;

class UserPermissionController extends AccountBaseController
{

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $userPermission = UserPermission::where('permission_id', $request->permissionId)
            ->where('user_id', $id)
            ->first();

        $userPermission->permission_type_id = $request->permissionType;
        $userPermission->save();

        return Reply::dataOnly(['status' => 'success']);
    }

    public function customPermissions(Request $request, $id)
    {
        $this->employee = User::with('role')->findOrFail($id);

        $roleId = $this->employee->role[0]->role_id;
        $this->role = Role::with('permissions')->find($roleId);

        $this->modulesData = Module::with('customPermissions')->findOrFail($request->moduleId);;

        $html = view('employees.ajax.custom_permissions', $this->data)->render();
        return Reply::dataOnly(['status' => 'success', 'html' => $html]);
    }

}
