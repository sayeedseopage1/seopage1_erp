<?php

namespace Database\Seeders;

use App\Models\Module;
use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ModulePermissionSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->permissionTypes();
        $modules = [
            [
                'module_name' => 'clients',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Clients', 'is_custom' => 0,
                        'name' => 'add_clients',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'View Clients', 'is_custom' => 0,
                        'name' => 'view_clients',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Clients', 'is_custom' => 0,
                        'name' => 'edit_clients',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Clients', 'is_custom' => 0,
                        'name' => 'delete_clients',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Client Category', 'is_custom' => 1,
                        'name' => 'manage_client_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Client Subcategory', 'is_custom' => 1,
                        'name' => 'manage_client_subcategory',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Client Contacts', 'is_custom' => 1,
                        'name' => 'add_client_contacts',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Client Contacts', 'is_custom' => 1,
                        'name' => 'view_client_contacts',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Edit Client Contacts', 'is_custom' => 1,
                        'name' => 'edit_client_contacts',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Delete Client Contacts', 'is_custom' => 1,
                        'name' => 'delete_client_contacts',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Client Note',
                        'is_custom' => 1,
                        'name' => 'add_client_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'View Client Note',
                        'is_custom' => 1,
                        'name' => 'view_client_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Client Note',
                        'is_custom' => 1,
                        'name' => 'edit_client_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Client Note',
                        'is_custom' => 1,
                        'name' => 'delete_client_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Client Document', 'is_custom' => 1,

                        'name' => 'add_client_document',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'View Client Document', 'is_custom' => 1,

                        'name' => 'view_client_document',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Client Document', 'is_custom' => 1,

                        'name' => 'edit_client_document',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Client Document', 'is_custom' => 1,

                        'name' => 'delete_client_document',

                    ],
                ]
            ],
            [
                'module_name' => 'employees',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Employees', 'is_custom' => 0,

                        'name' => 'add_employees',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Employees', 'is_custom' => 0,

                        'name' => 'view_employees',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Employees', 'is_custom' => 0,

                        'name' => 'edit_employees',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Employees', 'is_custom' => 0,

                        'name' => 'delete_employees',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Designation', 'is_custom' => 1,

                        'name' => 'add_designation',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Designation', 'is_custom' => 1,

                        'name' => 'view_designation',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Edit Designation', 'is_custom' => 1,

                        'name' => 'edit_designation',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Delete Designation', 'is_custom' => 1,

                        'name' => 'delete_designation',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Department', 'is_custom' => 1,

                        'name' => 'add_department',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Department', 'is_custom' => 1,

                        'name' => 'view_department',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Edit Department', 'is_custom' => 1,

                        'name' => 'edit_department',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Delete Department', 'is_custom' => 1,

                        'name' => 'delete_department',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Documents', 'is_custom' => 1,

                        'name' => 'add_documents',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Documents', 'is_custom' => 1,

                        'name' => 'view_documents',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Documents', 'is_custom' => 1,

                        'name' => 'edit_documents',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Documents', 'is_custom' => 1,

                        'name' => 'delete_documents',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Leaves Taken', 'is_custom' => 1,

                        'name' => 'view_leaves_taken',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Update Leaves Quota', 'is_custom' => 1,

                        'name' => 'update_leaves_quota',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Employee Tasks', 'is_custom' => 1,

                        'name' => 'view_employee_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Employee Projects', 'is_custom' => 1,

                        'name' => 'view_employee_projects',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Employee Timelogs', 'is_custom' => 1,

                        'name' => 'view_employee_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Change Employee Role', 'is_custom' => 1,

                        'name' => 'change_employee_role',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Emergency Contact', 'is_custom' => 1,

                        'name' => 'manage_emergency_contact',
                    ],
                ]
            ],
            [
                'description' => 'User can view the basic details of projects assigned to him even without any permission.',
                'module_name' => 'projects',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Project',
                        'is_custom' => 0,

                        'name' => 'add_projects',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Project',
                        'is_custom' => 0,

                        'name' => 'view_projects',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Project',
                        'is_custom' => 0,

                        'name' => 'edit_projects',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Project',
                        'is_custom' => 0,

                        'name' => 'delete_projects',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Project Category', 'is_custom' => 1,

                        'name' => 'manage_project_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Project Files', 'is_custom' => 1,

                        'name' => 'view_project_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Project Files', 'is_custom' => 1,

                        'name' => 'add_project_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Project Files', 'is_custom' => 1,

                        'name' => 'delete_project_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Project Discussions', 'is_custom' => 1,

                        'name' => 'view_project_discussions',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Project Discussions', 'is_custom' => 1,

                        'name' => 'add_project_discussions',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Project Discussions', 'is_custom' => 1,

                        'name' => 'edit_project_discussions',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Project Discussions', 'is_custom' => 1,

                        'name' => 'delete_project_discussions',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Discussion Category', 'is_custom' => 1,

                        'name' => 'manage_discussion_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2, "none":5}', 'description' => null,
                        'display_name' => 'View Project Milestones', 'is_custom' => 1,

                        'name' => 'view_project_milestones',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Project Milestones', 'is_custom' => 1,

                        'name' => 'add_project_milestones',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2, "none":5}', 'description' => null,
                        'display_name' => 'Edit Project Milestones', 'is_custom' => 1,

                        'name' => 'edit_project_milestones',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2, "none":5}', 'description' => null,
                        'display_name' => 'Delete Project Milestones', 'is_custom' => 1,

                        'name' => 'delete_project_milestones',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Members', 'is_custom' => 1,

                        'name' => 'view_project_members',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Project Members', 'is_custom' => 1,

                        'name' => 'add_project_members',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Edit Project Members', 'is_custom' => 1,

                        'name' => 'edit_project_members',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Delete Project Members', 'is_custom' => 1,

                        'name' => 'delete_project_members',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Project Rating', 'is_custom' => 1,

                        'name' => 'view_project_rating',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Project Rating', 'is_custom' => 1,

                        'name' => 'add_project_rating',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Project Rating', 'is_custom' => 1,

                        'name' => 'edit_project_rating',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Project Rating', 'is_custom' => 1,

                        'name' => 'delete_project_rating',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Budget', 'is_custom' => 1,

                        'name' => 'view_project_budget',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Timelogs', 'is_custom' => 1,

                        'name' => 'view_project_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Expenses', 'is_custom' => 1,

                        'name' => 'view_project_expenses',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Tasks', 'is_custom' => 1,

                        'name' => 'view_project_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Invoices', 'is_custom' => 1,

                        'name' => 'view_project_invoices',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Burndown Chart', 'is_custom' => 1,

                        'name' => 'view_project_burndown_chart',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Payments', 'is_custom' => 1,

                        'name' => 'view_project_payments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'View Project Gantt Chart', 'is_custom' => 1,

                        'name' => 'view_project_gantt_chart',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Project Note',
                        'is_custom' => 1,

                        'name' => 'add_project_note',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Project Note',
                        'is_custom' => 1,

                        'name' => 'view_project_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Project Note',
                        'is_custom' => 1,

                        'name' => 'edit_project_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Project Note',
                        'is_custom' => 1,

                        'name' => 'delete_project_note',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Project Template',
                        'is_custom' => 1,

                        'name' => 'manage_project_template',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Project Hourly Rates', 'is_custom' => 1,

                        'name' => 'view_project_hourly_rates',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Create Public Project', 'is_custom' => 1,

                        'name' => 'create_public_project',

                    ],
                ]

            ],
            [
                'description' => 'User can view his own attendance even without any permission.',
                'module_name' => 'attendance',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Employee Shifts', 'is_custom' => 1,

                        'name' => 'manage_employee_shifts',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "owned":2, "none":5}',
                        'description' => null,
                        'display_name' => 'View Shift Roster', 'is_custom' => 1,

                        'name' => 'view_shift_roster',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Attendance', 'is_custom' => 0,

                        'name' => 'add_attendance',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Attendance', 'is_custom' => 0,

                        'name' => 'view_attendance',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Attendance',
                        'is_custom' => 0,

                        'name' => 'edit_attendance',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Attendance',
                        'is_custom' => 0,

                        'name' => 'delete_attendance',

                    ],
                ]

            ],
            [
                'description' => 'User can view the tasks assigned to him even without any permission.',
                'module_name' => 'tasks',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Tasks', 'is_custom' => 0,

                        'name' => 'add_tasks',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Tasks', 'is_custom' => 0,

                        'name' => 'view_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Tasks', 'is_custom' => 0,

                        'name' => 'edit_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Tasks', 'is_custom' => 0,

                        'name' => 'delete_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Task Category', 'is_custom' => 1,

                        'name' => 'view_task_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Task Category', 'is_custom' => 1,

                        'name' => 'add_task_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Task Category', 'is_custom' => 1,

                        'name' => 'edit_task_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Task Category', 'is_custom' => 1,

                        'name' => 'delete_task_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Task Files', 'is_custom' => 1,

                        'name' => 'view_task_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Add Task Files', 'is_custom' => 1,

                        'name' => 'add_task_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Task Files', 'is_custom' => 1,

                        'name' => 'delete_task_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Sub Tasks', 'is_custom' => 1,

                        'name' => 'view_sub_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Add Sub Tasks', 'is_custom' => 1,

                        'name' => 'add_sub_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Sub Tasks', 'is_custom' => 1,

                        'name' => 'edit_sub_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Sub Tasks', 'is_custom' => 1,

                        'name' => 'delete_sub_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Task Comments', 'is_custom' => 1,

                        'name' => 'view_task_comments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Add Task Comments', 'is_custom' => 1,

                        'name' => 'add_task_comments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Task Comments', 'is_custom' => 1,

                        'name' => 'edit_task_comments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Task Comments', 'is_custom' => 1,

                        'name' => 'delete_task_comments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Task Notes', 'is_custom' => 1,

                        'name' => 'view_task_notes',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Add Task Notes', 'is_custom' => 1,

                        'name' => 'add_task_notes',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Task Notes', 'is_custom' => 1,

                        'name' => 'edit_task_notes',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Task Notes', 'is_custom' => 1,

                        'name' => 'delete_task_notes',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Task Labels', 'is_custom' => 1,

                        'name' => 'task_labels',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Change Status', 'is_custom' => 1,

                        'name' => 'change_status',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Send Reminder', 'is_custom' => 1,

                        'name' => 'send_reminder',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Status', 'is_custom' => 1,

                        'name' => 'add_status',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Unassigned Tasks', 'is_custom' => 1,

                        'name' => 'view_unassigned_tasks',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Create Unassigned Tasks', 'is_custom' => 1,

                        'name' => 'create_unassigned_tasks',
                    ],
                ]

            ],
            [
                'module_name' => 'estimates',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Estimates', 'is_custom' => 0,

                        'name' => 'add_estimates',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Estimates', 'is_custom' => 0,

                        'name' => 'view_estimates',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Estimates', 'is_custom' => 0,

                        'name' => 'edit_estimates',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Estimates', 'is_custom' => 0,

                        'name' => 'delete_estimates',

                    ],
                ]

            ],
            [
                'module_name' => 'invoices',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Invoices', 'is_custom' => 0,

                        'name' => 'add_invoices',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Invoices', 'is_custom' => 0,

                        'name' => 'view_invoices',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Invoices', 'is_custom' => 0,

                        'name' => 'edit_invoices',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Invoices', 'is_custom' => 0,

                        'name' => 'delete_invoices',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Tax', 'is_custom' => 1,

                        'name' => 'manage_tax',

                    ],
                ]

            ],
            [
                'module_name' => 'payments',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Payments', 'is_custom' => 0,

                        'name' => 'add_payments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Payments', 'is_custom' => 0,

                        'name' => 'view_payments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Payments', 'is_custom' => 0,

                        'name' => 'edit_payments',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Payments', 'is_custom' => 0,

                        'name' => 'delete_payments',

                    ],
                ]

            ],
            [
                'module_name' => 'timelogs',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4,"added":1, "none":5}', 'description' => null,
                        'display_name' => 'Add Timelogs', 'is_custom' => 0,

                        'name' => 'add_timelogs',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Timelogs', 'is_custom' => 0,

                        'name' => 'view_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Timelogs', 'is_custom' => 0,

                        'name' => 'edit_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Timelogs', 'is_custom' => 0,

                        'name' => 'delete_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Approve Timelogs',
                        'is_custom' => 1,

                        'name' => 'approve_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Active Timelogs',
                        'is_custom' => 1,

                        'name' => 'manage_active_timelogs',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Timelog Earnings', 'is_custom' => 1,

                        'name' => 'view_timelog_earnings',

                    ],
                ]

            ],
            [
                'description' => 'User can view the tickets generated by him as default even without any permission.',
                'module_name' => 'tickets',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4,"added":1, "none":5}', 'description' => null,
                        'display_name' => 'Add Tickets', 'is_custom' => 0,

                        'name' => 'add_tickets',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Tickets', 'is_custom' => 0,

                        'name' => 'view_tickets',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Tickets', 'is_custom' => 0,

                        'name' => 'edit_tickets',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Tickets', 'is_custom' => 0,

                        'name' => 'delete_tickets',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Ticket Type',
                        'is_custom' => 1,

                        'name' => 'manage_ticket_type',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Ticket Agent',
                        'is_custom' => 1,

                        'name' => 'manage_ticket_agent',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Ticket Channel',
                        'is_custom' => 1,

                        'name' => 'manage_ticket_channel',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Ticket Tags',
                        'is_custom' => 1,

                        'name' => 'manage_ticket_tags',

                    ],

                ]

            ],
            [
                'description' => 'User can view the events to be attended by him as default even without any permission.',
                'module_name' => 'events',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Events', 'is_custom' => 0,

                        'name' => 'add_events',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Events', 'is_custom' => 0,

                        'name' => 'view_events',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Events', 'is_custom' => 0,

                        'name' => 'edit_events',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Events', 'is_custom' => 0,

                        'name' => 'delete_events',

                    ],
                ]

            ],
            [
                'module_name' => 'notices',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Notice', 'is_custom' => 0,

                        'name' => 'add_notice',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Notice', 'is_custom' => 0,

                        'name' => 'view_notice',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Notice', 'is_custom' => 0,

                        'name' => 'edit_notice',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Notice', 'is_custom' => 0,

                        'name' => 'delete_notice',

                    ],
                ]

            ],
            [
                'description' => 'User can view the leaves applied by him as default even without any permission.',
                'module_name' => 'leaves',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Add Leave', 'is_custom' => 0,

                        'name' => 'add_leave',
                        'updated_at' => '2022-08-10 07:50:41',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Leave', 'is_custom' => 0,

                        'name' => 'view_leave',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Leave', 'is_custom' => 0,

                        'name' => 'edit_leave',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Leave', 'is_custom' => 0,

                        'name' => 'delete_leave',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Approve Or Reject Leaves', 'is_custom' => 1,

                        'name' => 'approve_or_reject_leaves',

                    ],
                ]

            ],
            [
                'module_name' => 'leads',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Add Lead', 'is_custom' => 0,

                        'name' => 'add_lead',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Lead', 'is_custom' => 0,

                        'name' => 'view_lead',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Lead', 'is_custom' => 0,

                        'name' => 'edit_lead',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Lead', 'is_custom' => 0,

                        'name' => 'delete_lead',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Agents', 'is_custom' => 1,

                        'name' => 'view_lead_agents',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Agent', 'is_custom' => 1,

                        'name' => 'add_lead_agent',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',

                        'description' => null,
                        'display_name' => 'Edit Lead Agent', 'is_custom' => 1,

                        'name' => 'edit_lead_agent',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Agent', 'is_custom' => 1,

                        'name' => 'delete_lead_agent',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Category', 'is_custom' => 1,

                        'name' => 'view_lead_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Category', 'is_custom' => 1,

                        'name' => 'add_lead_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Edit Lead Category', 'is_custom' => 1,

                        'name' => 'edit_lead_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Category', 'is_custom' => 1,

                        'name' => 'delete_lead_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Lead Custom Forms', 'is_custom' => 1,

                        'name' => 'manage_lead_custom_forms',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Files', 'is_custom' => 1,

                        'name' => 'view_lead_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Files', 'is_custom' => 1,

                        'name' => 'add_lead_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Files', 'is_custom' => 1,

                        'name' => 'delete_lead_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Follow Up', 'is_custom' => 1,

                        'name' => 'view_lead_follow_up',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Follow Up', 'is_custom' => 1,

                        'name' => 'add_lead_follow_up',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Edit Lead Follow Up', 'is_custom' => 1,

                        'name' => 'edit_lead_follow_up',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Follow Up', 'is_custom' => 1,

                        'name' => 'delete_lead_follow_up',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Sources', 'is_custom' => 1,

                        'name' => 'view_lead_sources',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Sources', 'is_custom' => 1,

                        'name' => 'add_lead_sources',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Edit Lead Sources', 'is_custom' => 1,

                        'name' => 'edit_lead_sources',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Sources', 'is_custom' => 1,

                        'name' => 'delete_lead_sources',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'View Lead Proposals', 'is_custom' => 1,

                        'name' => 'view_lead_proposals',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Add Lead Proposals', 'is_custom' => 1,

                        'name' => 'add_lead_proposals',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Edit Lead Proposals', 'is_custom' => 1,

                        'name' => 'edit_lead_proposals',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Lead Proposals', 'is_custom' => 1,

                        'name' => 'delete_lead_proposals',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Proposal Template', 'is_custom' => 1,

                        'name' => 'manage_proposal_template',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Change Lead Status', 'is_custom' => 1,

                        'name' => 'change_lead_status',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Lead Note', 'is_custom' => 1,

                        'name' => 'add_lead_note',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Lead Note', 'is_custom' => 1,

                        'name' => 'view_lead_note',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Lead Note', 'is_custom' => 1,

                        'name' => 'edit_lead_note',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Lead Note', 'is_custom' => 1,

                        'name' => 'delete_lead_note',
                    ],

                ]
            ],
            [
                'module_name' => 'holidays',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Holiday', 'is_custom' => 0,

                        'name' => 'add_holiday',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Holiday', 'is_custom' => 0,

                        'name' => 'view_holiday',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Holiday', 'is_custom' => 0,

                        'name' => 'edit_holiday',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Holiday', 'is_custom' => 0,

                        'name' => 'delete_holiday',

                    ],
                ]

            ],
            [
                'module_name' => 'products',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Product', 'is_custom' => 0,

                        'name' => 'add_product',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'View Product', 'is_custom' => 0,

                        'name' => 'view_product',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Edit Product', 'is_custom' => 0,

                        'name' => 'edit_product',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Delete Product', 'is_custom' => 0,

                        'name' => 'delete_product',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Product Category', 'is_custom' => 1,

                        'name' => 'manage_product_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Product Sub Category', 'is_custom' => 1,

                        'name' => 'manage_product_sub_category',

                    ],
                ]
            ],
            [
                'description' => 'User can view and add(self expenses) the expenses as default even without any permission.',
                'module_name' => 'expenses',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}', 'description' => null,
                        'display_name' => 'Add Expenses', 'is_custom' => 0,

                        'name' => 'add_expenses',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Expenses', 'is_custom' => 0,

                        'name' => 'view_expenses',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Expenses', 'is_custom' => 0,

                        'name' => 'edit_expenses',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Expenses', 'is_custom' => 0,

                        'name' => 'delete_expenses',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',

                        'description' => null,
                        'display_name' => 'Manage Expense Category', 'is_custom' => 1,

                        'name' => 'manage_expense_category',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Recurring Expense', 'is_custom' => 1,

                        'name' => 'manage_recurring_expense',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Approve Expenses', 'is_custom' => 1,

                        'name' => 'approve_expenses',

                    ],

                ]
            ],
            [
                'description' => 'User can view all contracts',
                'module_name' => 'contracts',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Contract', 'is_custom' => 0,

                        'name' => 'add_contract',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'View Contract', 'is_custom' => 0,

                        'name' => 'view_contract',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Edit Contract', 'is_custom' => 0,

                        'name' => 'edit_contract',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}', 'description' => null,
                        'display_name' => 'Delete Contract', 'is_custom' => 0,

                        'name' => 'delete_contract',

                    ],

                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Contract Type',
                        'is_custom' => 1,

                        'name' => 'manage_contract_type',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Renew Contract',
                        'is_custom' => 1,

                        'name' => 'renew_contract',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Contract Discussion',
                        'is_custom' => 1,

                        'name' => 'add_contract_discussion',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Contract Discussion',
                        'is_custom' => 1,

                        'name' => 'edit_contract_discussion',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'View Contract Discussion',
                        'is_custom' => 1,

                        'name' => 'view_contract_discussion',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Contract Discussion',
                        'is_custom' => 1,

                        'name' => 'delete_contract_discussion',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Contract Files',
                        'is_custom' => 1,

                        'name' => 'add_contract_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'View Contract Files',
                        'is_custom' => 1,

                        'name' => 'view_contract_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',

                        'description' => null,
                        'display_name' => 'Delete Contract Files',
                        'is_custom' => 1,

                        'name' => 'delete_contract_files',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Contract Template',
                        'is_custom' => 1,
                        'name' => 'manage_contract_template',
                    ],


                ]
            ],
            [
                'description' => 'User can manage permission of particular report',
                'module_name' => 'reports',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Task Report',
                        'is_custom' => 1,

                        'name' => 'view_task_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Time Log Report',
                        'is_custom' => 1,

                        'name' => 'view_time_log_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Finance Report',
                        'is_custom' => 1,

                        'name' => 'view_finance_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Income Vs Expense Report',
                        'is_custom' => 1,

                        'name' => 'view_income_expense_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Leave Report',
                        'is_custom' => 1,

                        'name' => 'view_leave_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Attendance Report',
                        'is_custom' => 1,

                        'name' => 'view_attendance_report',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Expense Report', 'is_custom' => 1,

                        'name' => 'view_expense_report',
                    ]
                ]
            ],
            [
                'description' => 'User can manage settings',
                'module_name' => 'settings',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Company Settings',
                        'is_custom' => 1,

                        'name' => 'manage_company_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage App Settings',
                        'is_custom' => 1,

                        'name' => 'manage_app_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Notification Settings',
                        'is_custom' => 1,

                        'name' => 'manage_notification_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Currency Settings',
                        'is_custom' => 1,

                        'name' => 'manage_currency_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Payment Settings',
                        'is_custom' => 1,

                        'name' => 'manage_payment_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Finance Settings',
                        'is_custom' => 1,

                        'name' => 'manage_finance_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Ticket Settings',
                        'is_custom' => 1,

                        'name' => 'manage_ticket_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Project Settings',
                        'is_custom' => 1,

                        'name' => 'manage_project_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Attendance Settings',
                        'is_custom' => 1,

                        'name' => 'manage_attendance_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Leave Settings',
                        'is_custom' => 1,

                        'name' => 'manage_leave_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Custom Field Settings',
                        'is_custom' => 1,

                        'name' => 'manage_custom_field_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Message Settings',
                        'is_custom' => 1,

                        'name' => 'manage_message_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Storage Settings',
                        'is_custom' => 1,

                        'name' => 'manage_storage_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Language Settings',
                        'is_custom' => 1,

                        'name' => 'manage_language_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Lead Settings', 'is_custom' => 1,

                        'name' => 'manage_lead_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Time Log Settings', 'is_custom' => 1,

                        'name' => 'manage_time_log_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Task Settings', 'is_custom' => 1,

                        'name' => 'manage_task_setting',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Social Login Settings', 'is_custom' => 1,

                        'name' => 'manage_social_login_setting',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Security Settings', 'is_custom' => 1,

                        'name' => 'manage_security_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage GDPR Settings', 'is_custom' => 1,

                        'name' => 'manage_gdpr_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Manage Theme Settings', 'is_custom' => 1,

                        'name' => 'manage_theme_setting',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Role Permission Setting', 'is_custom' => 1,

                        'name' => 'manage_role_permission_setting',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Module Setting', 'is_custom' => 1,

                        'name' => 'manage_module_setting',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Manage Google Calendar Setting', 'is_custom' => 1,

                        'name' => 'manage_google_calendar_setting',
                    ],
                ]
            ],
            [
                'module_name' => 'dashboards',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Overview Dashboard', 'is_custom' => 1,

                        'name' => 'view_overview_dashboard',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Project Dashboard', 'is_custom' => 1,

                        'name' => 'view_project_dashboard',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Client Dashboard', 'is_custom' => 1,

                        'name' => 'view_client_dashboard',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Hr Dashboard', 'is_custom' => 1,

                        'name' => 'view_hr_dashboard',
                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Ticket Dashboard', 'is_custom' => 1,

                        'name' => 'view_ticket_dashboard',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'View Finance Dashboard', 'is_custom' => 1,

                        'name' => 'view_finance_dashboard',

                    ],
                ]
            ],
            [
                'module_name' => 'orders',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}',
                        'description' => null,
                        'display_name' => 'Add Order', 'is_custom' => 0,

                        'name' => 'add_order',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'View Order', 'is_custom' => 0,

                        'name' => 'view_order',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Edit Order', 'is_custom' => 0,

                        'name' => 'edit_order',

                    ],
                    [
                        'allowed_permissions' => '{"all":4, "added":1, "owned":2,"both":3, "none":5}',
                        'description' => null,
                        'display_name' => 'Delete Order', 'is_custom' => 0,

                        'name' => 'delete_order',

                    ],


                ]

            ],
            [
                'module_name' => 'knowledgebase',
                'permissions' => [
                    [
                        'allowed_permissions' => '{"all":4, "none":5}', 'description' => null,
                        'display_name' => 'Add Knowledgebase', 'is_custom' => 0,

                        'name' => 'add_knowledgebase',
                        'updated_at' => null,
                    ],
                    [
                        'allowed_permissions' => '{"all":4,"added":1,"none":5}', 'description' => null,
                        'display_name' => 'View Knowledgebase', 'is_custom' => 0,

                        'name' => 'view_knowledgebase',

                    ],
                    [
                        'allowed_permissions' => '{"all":4,"added":1,"none":5}', 'description' => null,
                        'display_name' => 'Edit Knowledgebase', 'is_custom' => 0,

                        'name' => 'edit_knowledgebase',

                    ],
                    [
                        'allowed_permissions' => '{"all":4,"added":1,"none":5}', 'description' => null,
                        'display_name' => 'Delete Knowledgebase', 'is_custom' => 0,

                        'name' => 'delete_knowledgebase',
                    ],

                ]
            ]
        ];

        foreach ($modules as $module) {
            $insert = Module::create([
                'module_name' => $module['module_name'],
                'description' => $module['description'] ?? null
            ]);


            // Run for every permissions
            foreach ($module['permissions'] as $permission) {
                $permission['module_id'] = $insert->id;
                Permission::create($permission);
            }
        }
    }

    private function permissionTypes()
    {
        \DB::table('permission_types')->insert([
            ['name' => 'added'],
            ['name' => 'owned'],
            ['name' => 'both'],
            ['name' => 'all'],
            ['name' => 'none']
        ]);
    }

}
