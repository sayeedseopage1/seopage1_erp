<?php

namespace App\Models;

use App\Observers\UserObserver;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Fortify\TwoFactorAuthenticationProvider;
use Trebol\Entrust\Traits\EntrustUserTrait;

/**
 * App\Models\User
 *
 * @property int $id
 * @property int|null $telegram_user_id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $remember_token
 * @property string|null $image
 * @property string|null $mobile
 * @property string $gender
 * @property string $locale
 * @property string $status
 * @property string $login
 * @property string|null $onesignal_player_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $last_login
 * @property int $email_notifications
 * @property int|null $country_id
 * @property int $dark_theme
 * @property int $rtl
 * @property-read Collection|\App\Models\TicketAgentGroups[] $agent
 * @property-read int|null $agent_count
 * @property-read Collection|\App\Models\Ticket[] $agents
 * @property-read int|null $agents_count
 * @property-read Collection|\App\Models\Attendance[] $attendance
 * @property-read Collection|\App\Models\Leave[] $leaves
 * @property-read int|null $attendance_count
 * @property-read Collection|\App\Models\EventAttendee[] $attendee
 * @property-read int|null $attendee_count
 * @property-read \App\Models\ClientDetails|null $clientDetails
 * @property-read Collection|\App\Models\Contract[] $contracts
 * @property-read int|null $contracts_count
 * @property-read \App\Models\Country|null $country
 * @property-read Collection|\App\Models\EmployeeDocument[] $documents
 * @property-read int|null $documents_count
 * @property-read Collection|\App\Models\EmployeeDetails[] $employee
 * @property-read int|null $employee_count
 * @property-read \App\Models\EmployeeDetails|null $employeeDetail
 * @property-read \App\Models\EmployeeDetails|null $employeeDetails
 * @property-read mixed $icon
 * @property-read mixed $image_url
 * @property-read mixed $modules
 * @property-read mixed $unread_notifications
 * @property-read mixed $user_other_role
 * @property-read Collection|\App\Models\EmployeeTeam[] $group
 * @property-read int|null $group_count
 * @property-read \App\Models\Lead|null $lead
 * @property-read Collection|\App\Models\LeadAgent[] $leadAgent
 * @property-read int|null $lead_agent_count
 * @property-read Collection|\App\Models\EmployeeLeaveQuota[] $leaveTypes
 * @property-read int|null $leave_types_count
 * @property-read Collection|\App\Models\ProjectMember[] $member
 * @property-read int|null $member_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read Collection|\App\Models\Permission[] $permissionTypes
 * @property-read int|null $permission_types_count
 * @property-read Collection|\App\Models\Project[] $projects
 * @property-read int|null $projects_count
 * @property-read Collection|\App\Models\RoleUser[] $role
 * @property-read int|null $role_count
 * @property-read Collection|\App\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \App\Models\Session|null $session
 * @property-read Collection|\App\Models\StickyNote[] $sticky
 * @property-read int|null $sticky_count
 * @property-read Collection|\App\Models\Task[] $tasks
 * @property-read int|null $tasks_count
 * @property-read Collection|\App\Models\Ticket[] $tickets
 * @property-read int|null $tickets_count
 * @property-read Collection|\App\Models\UserChat[] $userChat
 * @property-read int|null $user_chat_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static Builder|User newModelQuery()
 * @method static Builder|User newQuery()
 * @method static Builder|User query()
 * @method static Builder|User whereCountryId($value)
 * @method static Builder|User whereCreatedAt($value)
 * @method static Builder|User whereDarkTheme($value)
 * @method static Builder|User whereEmail($value)
 * @method static Builder|User whereEmailNotifications($value)
 * @method static Builder|User whereGender($value)
 * @method static Builder|User whereId($value)
 * @method static Builder|User whereImage($value)
 * @method static Builder|User whereLastLogin($value)
 * @method static Builder|User whereLocale($value)
 * @method static Builder|User whereLogin($value)
 * @method static Builder|User whereMobile($value)
 * @method static Builder|User whereName($value)
 * @method static Builder|User whereOnesignalPlayerId($value)
 * @method static Builder|User wherePassword($value)
 * @method static Builder|User whereRememberToken($value)
 * @method static Builder|User whereRtl($value)
 * @method static Builder|User whereStatus($value)
 * @method static Builder|User whereTwoFactorRecoveryCodes($value)
 * @method static Builder|User whereTwoFactorSecret($value)
 * @method static Builder|User whereUpdatedAt($value)
 * @method static Builder|User withRole(string $role)
 * @mixin \Eloquent
 * @property int $two_factor_confirmed
 * @property int $two_factor_email_confirmed
 * @property string|null $salutation
 * @property string|null $two_fa_verify_via
 * @property string|null $two_factor_code when authenticator is email
 * @property \Illuminate\Support\Carbon|null $two_factor_expires_at
 * @property int $admin_approval
 * @property int $permission_sync
 * @property-read int|null $leaves_count
 * @method static Builder|User whereAdminApproval($value)
 * @method static Builder|User wherePermissionSync($value)
 * @method static Builder|User whereSalutation($value)
 * @method static Builder|User whereTwoFaVerifyVia($value)
 * @method static Builder|User whereTwoFactorCode($value)
 * @method static Builder|User whereTwoFactorConfirmed($value)
 * @method static Builder|User whereTwoFactorEmailConfirmed($value)
 * @method static Builder|User whereTwoFactorExpiresAt($value)
 * @property-read Collection|\App\Models\ClientDocument[] $clientDocuments
 * @property-read Collection|\App\Models\EmployeeShiftSchedule[] $shifts
 * @property-read int|null $client_documents_count
 * @property-read Collection|\App\Models\Task[] $openTasks
 * @property-read int|null $open_tasks_count
 * @property-read Collection|\App\Models\EmergencyContact[] $emergencyContacts
 * @property-read int|null $emergency_contacts_count
 */
class User extends BaseModel implements AuthenticatableContract, AuthorizableContract, CanResetPasswordContract
{
    use Notifiable, EntrustUserTrait, Authenticatable, Authorizable, CanResetPassword, HasFactory, TwoFactorAuthenticatable;

    protected static function booted()
    {
        static::addGlobalScope('active', function (Builder $builder) {
            $builder->where('users.status', '=', 'active');
        });
    }

    protected $with = ['role', 'clientDetails', 'session', 'employeeDetail'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'created_at',
        'updated_at',
    ];

    public $dates = ['created_at', 'updated_at', 'last_login', 'two_factor_expires_at'];

    protected $appends = ['image_url', 'modules', 'user_other_role'];

    public $clientCustomFieldModel   = 'App\Models\ClientDetails';
    public $employeeCustomFieldModel = 'App\Models\employeeDetails';

    public function getImageUrlAttribute()
    {
        $gravatarHash = md5(strtolower(trim($this->email)));
        return ($this->image) ? asset_url('avatar/' . $this->image) : 'https://www.gravatar.com/avatar/' . $gravatarHash . '.png?s=200&d=mp';
    }

    public function hasGravatar($email)
    {
        // Craft a potential url and test its headers
        $hash = md5(strtolower(trim($email)));

        $uri     = 'http://www.gravatar.com/avatar/' . $hash . '?d=404';
        $headers = @get_headers($uri);

        $has_valid_avatar = true;

        try {
            if (!preg_match('|200|', $headers[0])) {
                $has_valid_avatar = false;
            }
        } catch (\Exception $e) {
            $has_valid_avatar = true;
        }

        return $has_valid_avatar;
    }

    /**
     * Route notifications for the Slack channel.
     *
     * @return string
     */
    public function routeNotificationForSlack()
    {
        $slack = SlackSetting::setting();
        return $slack->slack_webhook;
    }

    public function routeNotificationForOneSignal()
    {
        return $this->onesignal_player_id;
    }

    public function routeNotificationForTwilio()
    {
        if (!is_null($this->mobile) && !is_null($this->country_id)) {
            return '+' . $this->country->phonecode . $this->mobile;
        }

        return null;
    }

    // phpcs:ignore
    public function routeNotificationForEmail($notification = null)
    {
        $containsExample = Str::contains($this->email, 'example');

        if (\config('app.env') === 'demo' && $containsExample) {
            return null;
        }

        return $this->email;
    }

    // phpcs:ignore
    public function routeNotificationForNexmo($notification)
    {
        if (!is_null($this->mobile) && !is_null($this->country_id)) {
            return $this->country->phonecode . $this->mobile;
        }

        return null;

    }

    // phpcs:ignore
    public function routeNotificationForMsg91($notification)
    {
        if (!is_null($this->mobile) && !is_null($this->country_id)) {
            return $this->country->phonecode . $this->mobile;
        }

        return null;
    }

    public function clientDetails(): HasOne
    {
        return $this->hasOne(ClientDetails::class, 'user_id');
    }

    public function lead(): HasOne
    {
        return $this->hasOne(Lead::class, 'user_id');
    }

    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class, 'user_id');
    }

    public function employee(): HasMany
    {
        return $this->hasMany(EmployeeDetails::class, 'user_id');
    }

    public function employeeDetail(): HasOne
    {
        return $this->hasOne(EmployeeDetails::class, 'user_id');
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function member(): HasMany
    {
        return $this->hasMany(ProjectMember::class, 'user_id');
    }

    public function templateMember(): HasMany
    {
        return $this->hasMany(ProjectTemplateMember::class, 'user_id');
    }

    public function role(): HasMany
    {
        return $this->hasMany(RoleUser::class, 'user_id');
    }

    public function attendee(): HasMany
    {
        return $this->hasMany(EventAttendee::class, 'user_id');
    }

    public function agent(): HasMany
    {
        return $this->hasMany(TicketAgentGroups::class, 'agent_id');
    }

    public function agents(): HasMany
    {
        return $this->hasMany(Ticket::class, 'agent_id');
    }

    public function leadAgent(): HasMany
    {
        return $this->hasMany(LeadAgent::class, 'user_id');
    }

    public function group(): HasMany
    {
        return $this->hasMany(EmployeeTeam::class, 'user_id');
    }

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'id', 'country_id');
    }

    public function skills(): array
    {
        return EmployeeSkill::select('skills.name')->join('skills', 'skills.id', 'employee_skills.skill_id')->where('user_id', $this->id)->pluck('name')->toArray();
    }

    public function emergencyContacts(): HasMany
    {
        return $this->hasMany(EmergencyContact::class);
    }

    public function leaveTypes(): HasMany
    {
        return $this->hasMany(EmployeeLeaveQuota::class);
    }

    public function reportingTeam(): HasMany
    {
        return $this->hasMany(EmployeeDetails::class, 'reporting_to');
    }

    public function tasks(): BelongsToMany
    {
        return $this->belongsToMany(Task::class, 'task_users');
    }

    public function openTasks(): BelongsToMany
    {
        $taskBoardColumn = TaskboardColumn::completeColumn();
        return $this->belongsToMany(Task::class, 'task_users')->where('tasks.board_column_id', '<>', $taskBoardColumn->id);
    }

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class, 'user_id')->orderBy('id', 'desc');
    }

    public function leaves(): HasMany
    {
        return $this->hasMany(Leave::class, 'user_id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(EmployeeDocument::class, 'user_id');
    }

    public function clientDocuments(): HasMany
    {
        return $this->hasMany(ClientDocument::class, 'user_id');
    }

    public static function allClients($overRidePermission = null)
    {

        if (!isRunningInConsoleOrSeeding() && !is_null($overRidePermission)) {
            $viewClientPermission = $overRidePermission;
        } elseif (!isRunningInConsoleOrSeeding() && user()) {
            $viewClientPermission = user()->permission('view_clients');
        }

        if (isset($viewClientPermission) && $viewClientPermission == 'none') {
            return collect([]);
        }

        $clients = User::withoutGlobalScope('active')
            ->with('clientDetails')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->join('client_details', 'users.id', '=', 'client_details.user_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'client_details.company_name', 'users.image', 'users.email_notifications', 'users.mobile', 'users.country_id')
            ->where('roles.name', 'client');

        if (!isRunningInConsoleOrSeeding() && isset($viewClientPermission) && $viewClientPermission == 'added') {
            $clients->where('client_details.added_by', user()->id);
        }

        if (!isRunningInConsoleOrSeeding() && in_array('client', user_roles())) {
            $clients->where('client_details.user_id', user()->id);
        }

        return $clients->orderBy('users.name', 'asc')->get();
    }

    public static function client()
    {
        return User::withoutGlobalScope('active')
            ->with('clientDetails')
            ->join('role_user', 'role_user.user_id', '=', 'users.id')
            ->join('roles', 'roles.id', '=', 'role_user.role_id')
            ->join('client_details', 'users.id', '=', 'client_details.user_id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'client_details.company_name', 'users.image', 'users.email_notifications', 'users.mobile', 'users.country_id')
            ->where('roles.name', 'client')
            ->where('users.id', user()->id)
            ->orderBy('users.name', 'asc')
            ->get();
    }

    public static function allEmployees($exceptId = null, $active = false, $overRidePermission = null)
    {
        if (!isRunningInConsoleOrSeeding() && !is_null($overRidePermission)) {
            $viewEmployeePermission = $overRidePermission;
        } elseif (!isRunningInConsoleOrSeeding() && user()) {
            $viewEmployeePermission = user()->permission('view_employees');
        }

        $users = User::withRole('employee')
            ->join('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->leftJoin('designations', 'employee_details.designation_id', '=', 'designations.id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at', 'users.image', 'designations.name as designation_name', 'users.email_notifications', 'users.mobile', 'users.country_id');

        if (!is_null($exceptId)) {
            if (is_array($exceptId)) {
                $users->whereNotIn('users.id', $exceptId);
            } else {
                $users->where('users.id', '<>', $exceptId);
            }
        }

        if (!$active) {
            $users->withoutGlobalScope('active');
        }

        if (!isRunningInConsoleOrSeeding() && user() && isset($viewEmployeePermission)) {
            if ($viewEmployeePermission == 'added' && !in_array('client', user_roles())) {
                $users->where(function ($q) {
                    $q->where('employee_details.user_id', user()->id);
                    $q->orWhere('employee_details.added_by', user()->id);
                });
            } elseif ($viewEmployeePermission == 'owned' && !in_array('client', user_roles())) {
                $users->where('users.id', user()->id);
            } elseif ($viewEmployeePermission == 'both' && !in_array('client', user_roles())) {
                $users->where(function ($q) {
                    $q->where('employee_details.user_id', user()->id);
                    $q->orWhere('employee_details.added_by', user()->id);
                });
            } elseif (($viewEmployeePermission == 'none' || $viewEmployeePermission == '') && !in_array('client', user_roles())) {
                $users->where('users.id', user()->id);
            }
        }

        $users->orderBy('users.name', 'asc');
        $users->groupBy('users.id');
        return $users->get();
    }

    public static function allAdmins($exceptId = null)
    {
        if (!is_null($exceptId)) {
            $users = User::withOut('clientDetails')->withRole('admin');

            if (!is_null($exceptId)) {
                $users->where('users.id', '<>', $exceptId);
            }

            return $users->get();
        }

        $users = User::withOut('clientDetails')->withRole('admin');

        if (!is_null($exceptId)) {
            $users->where('users.id', '<>', $exceptId);
        }

        return $users->get();
        ;
    }

    public static function departmentUsers($teamId)
    {
        $users = User::join('employee_details', 'employee_details.user_id', '=', 'users.id')
            ->select('users.id', 'users.name', 'users.email', 'users.created_at')
            ->where('employee_details.department_id', $teamId);

        return $users->get();
    }

    public static function userListLatest($userID, $term)
    {
        $termCnd = '';

        if ($term) {
            $termCnd = 'and users.name like %' . $term . '%';
        }

        $messageSetting = message_setting();

        if (in_array('admin', user_roles())) {
            if ($messageSetting->allow_client_admin == 'no') {
                $termCnd .= "and roles.name != 'client'";
            }
        } elseif (in_array('employee', user_roles())) {
            if ($messageSetting->allow_client_employee == 'no') {
                $termCnd .= "and roles.name != 'client'";
            }
        } elseif (in_array('client', user_roles())) {
            if ($messageSetting->allow_client_admin == 'no') {
                $termCnd .= "and roles.name != 'admin'";
            }

            if ($messageSetting->allow_client_employee == 'no') {
                $termCnd .= "and roles.name != 'employee'";
            }
        }

        $query = DB::select('SELECT * FROM ( SELECT * FROM (
                    SELECT users.id,"0" AS groupId, users.name, users.image, users.email, users_chat.created_at as last_message, users_chat.message, users_chat.message_seen, users_chat.user_one
                    FROM users
                    INNER JOIN users_chat ON users_chat.from = users.id
                    LEFT JOIN role_user ON role_user.user_id = users.id
                    LEFT JOIN roles ON roles.id = role_user.role_id
                    WHERE users_chat.to = ' . $userID . ' ' . $termCnd . '
                    UNION
                    SELECT users.id,"0" AS groupId, users.name,users.image, users.email, users_chat.created_at  as last_message, users_chat.message, users_chat.message_seen, users_chat.user_one
                    FROM users
                    INNER JOIN users_chat ON users_chat.to = users.id
                    LEFT JOIN role_user ON role_user.user_id = users.id
                    LEFT JOIN roles ON roles.id = role_user.role_id
                    WHERE users_chat.from = ' . $userID . ' ' . $termCnd . '
                    ) AS allUsers
                    ORDER BY  last_message DESC
                    ) AS allUsersSorted
                    GROUP BY id
                    ORDER BY  last_message DESC');

        return $query;
    }

    public static function isAdmin($userId)
    {
        $user = User::find($userId);

        if ($user) {
            return $user->hasRole('admin') ? true : false;
        }

        return false;
    }

    public static function isClient($userId): bool
    {
        $user = User::find($userId);

        if ($user) {
            return $user->hasRole('client') ? true : false;
        }

        return false;
    }

    public static function isEmployee($userId): bool
    {
        $user = User::find($userId);

        if ($user) {
            return $user->hasRole('employee') ? true : false;
        }

        return false;
    }

    public function getModulesAttribute()
    {
        return user_modules();
    }

    public function sticky(): HasMany
    {
        return $this->hasMany(StickyNote::class, 'user_id')->orderBy('updated_at', 'desc');
    }

    public function userChat(): HasMany
    {
        return $this->hasMany(UserChat::class, 'to')->where('message_seen', 'no');
    }

    public function employeeDetails(): HasOne
    {
        return $this->hasOne(EmployeeDetails::class);
    }

    public function getUnreadNotificationsAttribute()
    {
        return $this->unreadNotifications()->get();
    }

    /**
     * Check if user has a permission by its name.
     *
     * @param string|array $permission Permission string or array of permissions.
     * @param bool $requireAll All permissions in the array are required.
     *
     * @return bool
     */
    public function can($permission, $requireAll = false)
    {
        config(['cache.default' => 'array']);

        if (is_array($permission)) {
            foreach ($permission as $permName) {
                $hasPerm = $this->can($permName);

                if ($hasPerm && !$requireAll) {
                    return true;
                }

                if (!$hasPerm && $requireAll) {
                    return false;
                }
            }

            // If we've made it this far and $requireAll is FALSE, then NONE of the perms were found
            // If we've made it this far and $requireAll is TRUE, then ALL of the perms were found.
            // Return the value of $requireAll;
            return $requireAll;
        } else {
            foreach ($this->cachedRoles() as $role) {
                // Validate against the Permission table
                foreach ($role->cachedPermissions() as $perm) {
                    if (Str::is($permission, $perm->name)) {
                        return true;
                    }
                }
            }
        }

        config(['cache.default' => 'file']);
        return false;
    }

    public function getUserOtherRoleAttribute()
    {
        if (!module_enabled('RestAPI')) {
            return true;
        }

        $userRole = null;
        $roles    = cache()->remember(
            'non-client-roles',
            60 * 60 * 24,
            function () {
                return Role::where('name', '<>', 'client')
                    ->orderBy('id', 'asc')->get();
            }
        );

        foreach ($roles as $role) {
            foreach ($this->role as $urole) {
                if ($role->id == $urole->role_id) {
                    $userRole = $role->name;
                }

                if ($userRole == 'admin') {
                    break;
                }
            }
        }

        return $userRole;
    }

    /**
     * @return false|mixed
     */
    public function permission($permission)
    {
        return Cache::rememberForever('permission-' . $permission . '-' . $this->id, function () use ($permission) {
            $permissionType = UserPermission::join('permissions', 'user_permissions.permission_id', '=', 'permissions.id')
                ->join('permission_types', 'user_permissions.permission_type_id', '=', 'permission_types.id')
                ->select('permission_types.name')
                ->where('permissions.name', $permission)
                ->where('user_permissions.user_id', $this->id)
                ->first();

            return $permissionType ? $permissionType->name : false;
        });
    }

    public function permissionTypeId($permission)
    {
        return Cache::rememberForever('permission-id-' . $permission . '-' . $this->id, function () use ($permission) {

            $permissionType = UserPermission::join('permissions', 'user_permissions.permission_id', '=', 'permissions.id')
                ->join('permission_types', 'user_permissions.permission_type_id', '=', 'permission_types.id')
                ->select('permission_types.name', 'permission_types.id')
                ->where('permissions.name', $permission)
                ->where('user_permissions.user_id', $this->id)
                ->first();

            return $permissionType ? $permissionType->name : false;
        });
    }

    /**
     * @return BelongsToMany
     */
    public function permissionTypes(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'user_permissions')->withTimestamps();
    }

    /**
     * @return HasOne
     */
    public function session(): HasOne
    {
        return $this->hasOne(Session::class, 'user_id')->select('user_id', 'ip_address', 'last_activity');
    }

    /**
     * @return HasMany
     */
    public function contracts(): HasMany
    {
        return $this->hasMany(Contract::class, 'client_id', 'id');
    }

    public function assignUserRolePermission($roleId)
    {
        $rolePermissions = PermissionRole::where('role_id', $roleId)->get();

        foreach ($rolePermissions as $key => $value) {
            $userPermission = UserPermission::where('permission_id', $value->permission_id)
                ->where('user_id', $this->id)
                ->firstOrNew();

            $userPermission->permission_id      = $value->permission_id;
            $userPermission->user_id            = $this->id;
            $userPermission->permission_type_id = $value->permission_type_id;
            $userPermission->save();
        }
    }

    public function generateTwoFactorCode()
    {
        $this->timestamps            = false;
        $this->two_factor_code       = rand(100000, 999999);
        $this->two_factor_expires_at = now()->addMinutes(10);
        $this->save();
    }

    public function resetTwoFactorCode()
    {
        $this->timestamps            = false;
        $this->two_factor_code       = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    public function confirmTwoFactorAuth($code)
    {
        $codeIsValid = app(TwoFactorAuthenticationProvider::class)
            ->verify(decrypt($this->two_factor_secret), $code);

        if ($codeIsValid) {
            $this->two_factor_confirmed = true;
            $this->save();

            return true;
        }

        return false;
    }

    public function unreadMessages(): HasMany
    {
        return $this->hasMany(UserChat::class, 'from')->where('to', user()->id)->where('message_seen', 'no');
    }

    public function shifts(): HasMany
    {
        return $this->hasMany(EmployeeShiftSchedule::class, 'user_id');
    }

    public function employeeShift(): BelongsToMany
    {
        return $this->belongsToMany(EmployeeShift::class, 'employee_shift_schedules');
    }

    public function getRole()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
}
