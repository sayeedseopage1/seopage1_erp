<?php

namespace App\Http\Controllers;

use App\Events\NewUserRegistrationViaInviteEvent;
use App\Helper\Reply;
use App\Http\Requests\User\AcceptInviteRequest;
use App\Http\Requests\User\AccountSetupRequest;
use App\Models\EmployeeDetails;
use App\Models\Permission;
use App\Models\PermissionRole;
use App\Models\Role;
use App\Models\Setting;
use App\Models\UniversalSearch;
use App\Models\User;
use App\Models\UserInvitation;
use App\Models\UserPermission;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{

    public function invitation($code)
    {
        if (Auth::check()) {
            return redirect(route('dashboard'));
        }

        $this->invite = UserInvitation::where('invitation_code', $code)
            ->where('status', 'active')
            ->firstOrFail();
        return view('auth.invitation', $this->data);
    }

    public function acceptInvite(AcceptInviteRequest $request)
    {
        $invite = UserInvitation::where('invitation_code', $request->invite)
            ->where('status', 'active')
            ->first();

        if (is_null($invite) || ($invite->invitation_type == 'email' && $request->email != $invite->email)) {
            return Reply::error('messages.acceptInviteError');
        }

        DB::beginTransaction();
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password);
            $user->save();
            $user = $user->setAppends([]);

            if ($user->id) {
                $employee = new EmployeeDetails();
                $employee->user_id = $user->id;
                $employee->employee_id = $user->id;
                $employee->joining_date = now($this->global->timezone)->format('Y-m-d');
                $employee->added_by = $user->id;
                $employee->last_updated_by = $user->id;
                $employee->save();
            }

            $employeeRole = Role::where('name', 'employee')->first();
            $user->attachRole($employeeRole);


            $rolePermissions = PermissionRole::where('role_id', $employeeRole->id)->get();

            foreach ($rolePermissions as $key => $value) {
                $userPermission = UserPermission::where('permission_id', $value->permission_id)
                    ->where('user_id', $user->id)->firstOrNew();
                $userPermission->permission_id = $value->permission_id;
                $userPermission->user_id = $user->id;
                $userPermission->permission_type_id = $value->permission_type_id;
                $userPermission->save();
            }

            $logSearch = new AccountBaseController();
            $logSearch->logSearchEntry($user->id, $user->name, 'employees.show', 'employee');

            if ($invite->invitation_type == 'email') {
                $invite->status = 'inactive';
                $invite->save();
            }

            // Commit Transaction
            DB::commit();

            // Send Notification to all admins about recently added member
            $admins = User::allAdmins();

            if ($admins) {
                foreach ($admins as $admin) {
                    event(new NewUserRegistrationViaInviteEvent($admin, $user));
                }
            }

            session()->forget('user');
            Auth::login($user);
            return Reply::success(__('messages.signupSuccess'));
        } catch (\Swift_TransportException $e) {
            // Rollback Transaction
            DB::rollback();
            return Reply::error('Please configure SMTP details. Visit Settings -> notification setting to set smtp', 'smtp_error');
        } catch (\Exception $e) {
            // Rollback Transaction
            DB::rollback();
            return Reply::error('Some error occured when inserting the data. Please try again or contact support');
        }

        return view('auth.invitation', $this->data);
    }

    /**
     * XXXXXXXXXXX
     *
     * @return \Illuminate\Http\Response
     */
    public function setupAccount(AccountSetupRequest $request)
    {
        // Update company name
        $setting = Setting::first();
        $setting->company_name = $request->company_name;
        $setting->save();

        // Create admin user
        $user = new User();
        $user->name = $request->full_name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        $employee = new EmployeeDetails();
        $employee->user_id = $user->id;
        $employee->employee_id = $user->id;
        $employee->save();

        $search = new UniversalSearch();
        $search->searchable_id = $user->id;
        $search->title = $user->name;
        $search->route_name = 'employees.show';
        $search->save();

        // Attach roles
        $adminRole = Role::where('name', 'admin')->first();
        $employeeRole = Role::where('name', 'employee')->first();
        $user->roles()->attach($adminRole->id);
        $user->roles()->attach($employeeRole->id);

        $allPermissions = Permission::orderBy('id', 'asc')->get()->pluck('id')->toArray();

        foreach ($allPermissions as $key => $permission) {
            $user->permissionTypes()->attach([$permission => ['permission_type_id' => 4]]);
        }

        Auth::login($user);
        return Reply::success(__('messages.signupSuccess'));
    }

}
