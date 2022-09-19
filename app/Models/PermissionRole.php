<?php

namespace App\Models;

use App\Observers\PermissionRoleObserver;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Response;

/**
 * App\Models\PermissionRole
 *
 * @property int $permission_id
 * @property int $role_id
 * @property int $permission_type_id
 * @property-read mixed $icon
 * @property-read \App\Models\PermissionType $permissionType
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole query()
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole wherePermissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole wherePermissionTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PermissionRole whereRoleId($value)
 * @mixin \Eloquent
 * @property-read \App\Models\Permission $permission
 */
class PermissionRole extends BaseModel
{
    protected $table = 'permission_role';

    protected $fillable = ['role_id', 'permission_id', 'permission_type_id'];

    public $timestamps = false;

    /**
     * XXXXXXXXXXX
     *
     * @return BelongsTo
     */
    public function permissionType(): BelongsTo
    {
        return $this->belongsTo(PermissionType::class, 'permission_type_id');
    }

    public function permission(): BelongsTo
    {
        return $this->belongsTo(Permission::class, 'permission_id');
    }

    public static function employeeRolePermissions()
    {

        $employeePermissionsArray = [
            'view_projects' => 'owned',
            'view_project_files' => 'all',
            'add_project_files' => 'all',
            'edit_project_files' => 'added',
            'delete_project_files' => 'added',
            'view_project_members' => 'all',
            'view_project_discussions' => 'all',
            'add_project_discussions' => 'all',
            'edit_project_discussions' => 'added',
            'delete_project_discussions' => 'added',
            'view_project_note' => 'all',

            'view_attendance' => 'owned',

            'add_tasks' => 'added',
            'view_tasks' => 'both',
            'edit_tasks' => 'added',
            'delete_tasks' => 'added',
            'view_project_tasks' => 'all',
            'view_sub_tasks' => 'all',
            'add_sub_tasks' => 'all',
            'edit_sub_tasks' => 'added',
            'delete_sub_tasks' => 'added',
            'view_task_files' => 'all',
            'add_task_files' => 'all',
            'edit_task_files' => 'added',
            'delete_task_files' => 'added',
            'view_task_comments' => 'all',
            'add_task_comments' => 'all',
            'edit_task_comments' => 'added',
            'delete_task_comments' => 'added',
            'view_task_notes' => 'all',
            'add_task_notes' => 'all',
            'edit_task_notes' => 'added',
            'delete_task_notes' => 'added',

            'add_timelogs' => 'added',
            'edit_timelogs' => 'added',
            'view_timelogs' => 'both',
            'view_project_timelogs' => 'all',

            'add_tickets' => 'added',
            'view_tickets' => 'both',
            'edit_tickets' => 'both',
            'delete_tickets' => 'added',

            'view_events' => 'owned',

            'view_notice' => 'owned',

            'add_leave' => 'added',
            'view_leave' => 'both',
            'view_leaves_taken' => 'all',
            'approve_or_reject_leaves' => 'none',

            'add_lead' => 'added',
            'view_lead' => 'both',
            'edit_lead' => 'added',
            'view_lead_files' => 'added',
            'add_lead_files' => 'all',
            'view_lead_follow_up' => 'all',
            'add_lead_follow_up' => 'all',
            'edit_lead_follow_up' => 'added',
            'delete_lead_follow_up' => 'added',
            'change_lead_status' => 'both',

            'view_holiday' => 'all',

            'add_expenses' => 'added',
            'view_expenses' => 'both',
            'edit_expenses' => 'added',
            'delete_expenses' => 'added',
        ];

        return $employeePermissionsArray;
    }

    public static function clientRolePermissions()
    {

        $clientPermissionsArray = [
            'view_projects' => 'owned',
            'view_project_files' => 'all',
            'add_project_files' => 'all',
            'edit_project_files' => 'added',
            'delete_project_files' => 'added',
            'view_project_members' => 'all',
            'view_project_discussions' => 'all',
            'add_project_discussions' => 'all',
            'edit_project_discussions' => 'added',
            'delete_project_discussions' => 'added',
            'view_project_note' => 'all',

            'view_tasks' => 'owned',
            'view_project_tasks' => 'all',
            'view_sub_tasks' => 'all',
            'view_task_files' => 'all',
            'view_task_comments' => 'all',
            'add_task_comments' => 'all',
            'edit_task_comments' => 'added',
            'delete_task_comments' => 'added',
            'view_task_notes' => 'all',
            'add_task_notes' => 'all',
            'edit_task_notes' => 'added',
            'delete_task_notes' => 'added',

            'view_timelogs' => 'owned',
            'view_project_timelogs' => 'all',

            'add_tickets' => 'added',
            'view_tickets' => 'both',
            'edit_tickets' => 'added',
            'delete_tickets' => 'added',

            'view_events' => 'owned',

            'view_notice' => 'owned',

            'view_estimates' => 'owned',

            'view_invoices' => 'owned',
            'view_project_invoices' => 'all',

            'view_payments' => 'owned',
            'view_project_payments' => 'all',

            'view_product' => 'all',
            'view_contract' => 'owned',
            'add_contract_discussion' => 'all',
            'view_contract_discussion' => 'all',
            'view_contract_files' => 'all',

            'view_order' => 'owned',

        ];

        return $clientPermissionsArray;
    }

}
