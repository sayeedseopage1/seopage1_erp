<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Trebol\Entrust\EntrustRole;

/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $name
 * @property string|null $display_name
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PermissionRole[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $perms
 * @property-read int|null $perms_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\RoleUser[] $roleuser
 * @property-read int|null $roleuser_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereDisplayName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Permission[] $rolePermissions
 * @property-read int|null $role_permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $unsyncedUsers
 * @property-read int|null $unsynced_users_count
 */
class Role extends EntrustRole
{
    protected $fillable = ['name', 'display_name', 'description'];

    public function permissions(): HasMany
    {
        return $this->hasMany(PermissionRole::class, 'role_id');
    }

    public function rolePermissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'permission_role');
    }

    public function roleuser(): HasMany
    {
        return $this->hasMany(RoleUser::class, 'role_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'role_user');
    }

    public function permissionType($permissionId)
    {
        $permissionType = PermissionRole::where('role_id', $this->id)->where('permission_id', $permissionId)->first();

        if ($permissionType) {
            return $permissionType->permission_type_id;
        }

        return false;
    }

    public function unsyncedUsers()
    {
        return $this->belongsToMany(User::class, 'role_user')->where('users.permission_sync', 0);
    }

}
