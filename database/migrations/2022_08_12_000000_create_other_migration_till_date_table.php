<?php

use App\Models\CustomFieldGroup;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Module;

return new class extends Migration {

    /**
     * Run the migrations.
     * We have changed the file_name as 2018 for the purpose of modules
     *
     * @return void
     */
    public function up()
    {

        // Run this and check if show_clock_in_button column exist
        // for application having
        if (!Schema::hasColumn('attendance_settings', 'show_clock_in_button')) {
            $this->version5_1_7_to_5_1_8();
        }

        // Transition check for existence
        if (!Schema::hasColumn('message_settings', 'restrict_client')) {
            Schema::table('message_settings', function (Blueprint $table) {
                $table->enum('restrict_client', ['yes', 'no'])->default('no');
            });
        }


        $this->version5_1_8_to_5_1_9();

        $this->version5_1_9_to_5_2_0();

        $this->newVersion5_2_above();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }

    private function shiftRoaster()
    {
        $admins = \App\Models\RoleUser::where('role_id', '1')->get();
        $allTypePermisison = \App\Models\PermissionType::where('name', 'all')->first();
        $module = Module::where('module_name', 'attendance')->first();

        $employeeCustomPermisisons = [
            'view_shift_roster'
        ];

        foreach ($employeeCustomPermisisons as $permission) {
            $perm = \App\Models\Permission::create([
                'name' => $permission,
                'display_name' => ucwords(str_replace('_', ' ', $permission)),
                'is_custom' => 1,
                'module_id' => $module->id,
                'allowed_permissions' => '{"all":4, "owned":2, "none":5}'
            ]);

            foreach ($admins as $item) {
                \App\Models\UserPermission::create(
                    [
                        'user_id' => $item->user_id,
                        'permission_id' => $perm->id,
                        'permission_type_id' => $allTypePermisison->id
                    ]
                );
            }
        }
    }

    private function dateFormatChange()
    {
        $setting = \App\Models\Setting::first();

        if ($setting) {
            switch ($setting->date_format) {

            case 'd-m-Y':
                $setting->date_picker_format = 'dd-mm-yyyy';
                $setting->moment_format = 'DD-MM-YYYY';
                    break;
            case 'm-d-Y':
                $setting->date_picker_format = 'mm-dd-yyyy';
                $setting->moment_format = 'MM-DD-YYYY';
                    break;
            case 'Y-m-d':
                $setting->date_picker_format = 'yyyy-mm-dd';
                $setting->moment_format = 'YYYY-MM-DD';
                    break;
            case 'd.m.Y':
                $setting->date_picker_format = 'dd.mm.yyyy';
                $setting->moment_format = 'DD.MM.YYYY';
                    break;
            case 'm.d.Y':
                $setting->date_picker_format = 'mm.dd.yyyy';
                $setting->moment_format = 'MM.DD.YYYY';
                    break;
            case 'Y.m.d':
                $setting->date_picker_format = 'yyyy.mm.dd';
                $setting->moment_format = 'YYYY.MM.DD';
                    break;
            case 'd/m/Y':
                $setting->date_picker_format = 'dd/mm/yyyy';
                $setting->moment_format = 'DD/MM/YYYY';
                    break;
            case 'Y/m/d':
                $setting->date_picker_format = 'yyyy/mm/dd';
                $setting->moment_format = 'YYYY/MM/DD';
                    break;
            case 'd-M-Y':
                $setting->date_picker_format = 'dd-M-yyyy';
                $setting->moment_format = 'DD-MMM-YYYY';
                    break;
            case 'd/M/Y':
                $setting->date_picker_format = 'dd/M/yyyy';
                $setting->moment_format = 'DD/MMM/YYYY';
                    break;
            case 'd.M.Y':
                $setting->date_picker_format = 'dd.M.yyyy';
                $setting->moment_format = 'DD.MMM.YYYY';
                    break;
            case 'd M Y':
                $setting->date_picker_format = 'dd M yyyy';
                $setting->moment_format = 'DD MMM YYYY';
                    break;
            case 'd F, Y':
                $setting->date_picker_format = 'dd MM, yyyy';
                $setting->moment_format = 'yyyy-mm-d';
                    break;
            case 'd D M Y':
                $setting->date_picker_format = 'dd D M yyyy';
                $setting->moment_format = 'DD ddd MMM YYYY';
                    break;
            case 'D d M Y':
                $setting->date_picker_format = 'D dd M yyyy';
                $setting->moment_format = 'ddd DD MMMM YYYY';
                    break;
            default:
                $setting->date_picker_format = 'mm/dd/yyyy';
                $setting->moment_format = 'DD-MM-YYYY';
                    break;
            }

            $setting->save();
        }
    }

    private function expenseReportPermission()
    {
        $admins = \App\Models\RoleUser::where('role_id', '1')->get();
        $allTypePermisison = \App\Models\PermissionType::where('name', 'all')->first();
        $module = Module::where('module_name', 'reports')->first();

        $employeeCustomPermisisons = [
            'view_expense_report'
        ];

        foreach ($employeeCustomPermisisons as $permission) {
            $perm = \App\Models\Permission::create([
                'name' => $permission,
                'display_name' => ucwords(str_replace('_', ' ', $permission)),
                'is_custom' => 1,
                'module_id' => $module->id,
                'allowed_permissions' => '{"all":4, "none":5}'
            ]);

            foreach ($admins as $item) {
                \App\Models\UserPermission::create(
                    [
                        'user_id' => $item->user_id,
                        'permission_id' => $perm->id,
                        'permission_type_id' => $allTypePermisison->id
                    ]
                );
            }
        }
    }

    private function addIndexes()
    {
        Schema::table('attendances', function (Blueprint $table) {
            $table->index('clock_in_time');
            $table->index('clock_out_time');
        });
        Schema::table('leaves', function (Blueprint $table) {
            $table->index('leave_date');
        });
        Schema::table('tickets', function (Blueprint $table) {
            $table->index('updated_at');
        });
        Schema::table('tasks', function (Blueprint $table) {
            $table->index('due_date');
            $table->index('deleted_at');
        });
        Schema::table('employee_shift_schedules', function (Blueprint $table) {
            $table->index('date');
        });
        Schema::table('projects', function (Blueprint $table) {
            $table->index('deleted_at');
        });
        Schema::table('holidays', function (Blueprint $table) {
            $table->index('date');
        });
        Schema::table('project_time_logs', function (Blueprint $table) {
            $table->index('start_time');
            $table->index('end_time');
        });
        Schema::table('project_time_log_breaks', function (Blueprint $table) {
            $table->index('start_time');
            $table->index('end_time');
        });
        Schema::table('invoices', function (Blueprint $table) {
            $table->index('due_date');
        });
        Schema::table('payments', function (Blueprint $table) {
            $table->index('paid_on');
        });
        Schema::table('project_activity', function (Blueprint $table) {
            $table->index('created_at');
        });
        Schema::table('user_activities', function (Blueprint $table) {
            $table->index('created_at');
        });
    }

    // phpcs:ignore
    private function version5_1_7_to_5_1_8()
    {
        Schema::table('attendance_settings', function (Blueprint $table) {
            $table->enum('show_clock_in_button', ['yes', 'no'])->default('no')->after('allow_shift_change');
        });

        Schema::table('invoice_settings', function (Blueprint $table) {
            $table->integer('show_project')->default(0)->after('tax_calculation_msg');
        });

        Schema::table('employee_details', function (Blueprint $table) {
            $table->text('calendar_view')->after('date_of_birth')->nullable();
        });

        Schema::table('lead_custom_forms', function (Blueprint $table) {
            $table->unsignedInteger('custom_fields_id')->after('id')->nullable();
            $table->foreign('custom_fields_id')->references('id')->on('custom_fields')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::table('ticket_custom_forms', function (Blueprint $table) {
            $table->unsignedInteger('custom_fields_id')->after('id')->nullable();
            $table->foreign('custom_fields_id')->references('id')->on('custom_fields')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });


        DB::table('custom_field_groups')->insert(
            [
                'name' => 'Ticket', 'model' => 'App\Models\Ticket',
            ]
        );


        $this->shiftRoaster();

        Schema::table('users', function (Blueprint $table) {
            $table->boolean('google_calendar_status')->default(true);
        });

        $widgets = [
            ['widget_name' => 'profile', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'shift_schedule', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'birthday', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'notices', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'tasks', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'projects', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'my_task', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ['widget_name' => 'my_calender', 'status' => 1, 'dashboard_type' => 'private-dashboard'],

        ];

        foreach ($widgets as $widget) {
            \App\Models\DashboardWidget::create($widget);
        }

        Schema::table('project_milestones', function (Blueprint $table) {
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
        });

        Schema::table('attendances', function (Blueprint $table) {
            $table->dateTime('shift_start_time')->nullable();
            $table->dateTime('shift_end_time')->nullable();
            $table->bigInteger('employee_shift_id')->unsigned()->nullable();
            $table->foreign('employee_shift_id')->references('id')->on('employee_shifts')->onDelete('SET NULL')->onUpdate('cascade');
        });

        Schema::table('invoice_settings', function (Blueprint $table) {
            $table->enum('reminder', ['after', 'every'])->after('send_reminder')->nullable();
            $table->integer('send_reminder_after')->after('reminder')->default(0);
        });

        Schema::table('employee_shift_schedules', function (Blueprint $table) {
            $table->dateTime('shift_start_time')->nullable();
            $table->dateTime('shift_end_time')->nullable();
        });

        $existingSchedules = \App\Models\EmployeeShiftSchedule::whereDate('date', '>=', now()->subDay()->toDateString())->get();

        if ($existingSchedules) {
            foreach ($existingSchedules as $item) {
                $item->shift_start_time = $item->date->toDateString() . ' ' . $item->shift->office_start_time;

                if (\Carbon\Carbon::parse($item->shift->office_start_time)->gt(\Carbon\Carbon::parse($item->shift->office_end_time))) {
                    $item->shift_end_time = $item->date->addDay()->toDateString() . ' ' . $item->shift->office_end_time;

                } else {
                    $item->shift_end_time = $item->date->toDateString() . ' ' . $item->shift->office_end_time;
                }

                $item->save();
            }
        }

        $employees = \App\Models\EmployeeDetails::all();

        foreach ($employees as $employee) {
            $employee->calendar_view = 'task,events,holiday,tickets,leaves';
            $employee->save();
        }

        Schema::table('task_label_list', function (Blueprint $table) {
            $table->unsignedInteger('project_id')->after('id')->nullable();
            $table->foreign('project_id')->references('id')->on('projects')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });

    }

    // phpcs:ignore
    private function version5_1_8_to_5_1_9()
    {
        if (!Schema::hasColumn('organisation_settings', 'app_name')) {
            Schema::table('organisation_settings', function (Blueprint $table) {
                $table->string('app_name')->nullable()->after('company_name');
            });

            $companySettings = \App\Models\Setting::first();

            if ($companySettings) {
                $companySettings->app_name = $companySettings->company_name;
                $companySettings->save();
            }

            $this->dateFormatChange();
        }

        $log = CustomFieldGroup::where('model', 'App\Models\ProjectTimeLog')->first();

        if(!$log){
            DB::table('custom_field_groups')->insert(
                [
                    'name' => 'Time Log', 'model' => 'App\Models\ProjectTimeLog',
                ]
            );
        }

    }

    // phpcs:ignore
    private function version5_1_9_to_5_2_0()
    {

        if (!Schema::hasColumn('employee_shift_schedules', 'remarks')) {
            Schema::table('employee_shift_schedules', function (Blueprint $table) {
                $table->text('remarks')->nullable();
            });
        }

        if (!Schema::hasColumn('employee_shift_change_requests', 'reason')) {
            Schema::table('employee_shift_change_requests', function (Blueprint $table) {
                $table->text('reason')->nullable();
            });
        }

        if (!Schema::hasColumn('invoices', 'custom_invoice_number')) {
            Schema::table('invoices', function (Blueprint $table) {
                $table->string('custom_invoice_number')->nullable();
            });

            $invoices = \App\Models\Invoice::select('id', 'invoice_number')->get();

            if ($invoices->count() > 0) {
                foreach ($invoices as $invoice) {
                    \App\Models\Invoice::where('id', $invoice->id)->update(['custom_invoice_number' => $invoice->invoice_number]);
                }
            }

            \App\Models\ModuleSetting::where('module_name', 'dashboards')->where('type', 'employee')->delete();
            $widgets = [
                ['widget_name' => 'week_timelog', 'status' => 1, 'dashboard_type' => 'private-dashboard'],
            ];

            foreach ($widgets as $widget) {
                \App\Models\DashboardWidget::create($widget);
            }

        }


        if (!Schema::hasColumn('organisation_settings', 'license_type')) {
            Schema::table('organisation_settings', function (Blueprint $table) {
                $table->string('license_type', 20)->after('purchase_code')->nullable();
            });
        }


        if (!Schema::hasColumn('tasks', 'deleted_at')) {

            $this->expenseReportPermission();


            Schema::table('tasks', function (Blueprint $table) {
                $table->softDeletes();
            });

            $deletedProjects = \App\Models\Project::onlyTrashed()->get();

            foreach ($deletedProjects as $key => $project) {
                $project->tasks()->delete();
            }

            $widgets = [
                ['widget_name' => 'total_today_attendance', 'status' => 1, 'dashboard_type' => 'admin-hr-dashboard'],
            ];

            foreach ($widgets as $widget) {
                \App\Models\DashboardWidget::create($widget);
            }
        }

        if (!Schema::hasColumn('custom_fields', 'export')) {
            Schema::table('custom_fields', function (Blueprint $table) {
                $table->boolean('export')->default(0)->nullable()->after('values');
            });
        }
    }

    // phpcs:ignore
    private function newVersion5_2_above()
    {
        // NEW VERSION
        if (!Schema::hasColumn('employee_details', 'about_me')) {

            $this->addIndexes();

            Schema::table('employee_details', function (Blueprint $table) {
                $table->text('about_me')->nullable();
                $table->integer('reporting_to')->unsigned()->nullable();
                $table->foreign('reporting_to')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');
            });
        }

        if (!Schema::hasColumn('attendance_settings', 'auto_clock_in')) {
            Schema::table('attendance_settings', function (Blueprint $table) {
                $table->enum('auto_clock_in', ['yes', 'no'])->after('id')->default('no');
            });
        }

        if (!Schema::hasColumn('leaves', 'approved_by')) {
            Schema::table('leaves', function (Blueprint $table) {
                $table->integer('approved_by')->unsigned()->nullable();
                $table->foreign('approved_by')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');
                $table->string('half_day_type')->nullable();

                $table->dateTime('approved_at')->nullable();
            });
        }

        if (!Schema::hasColumn('leave_types', 'monthly_limit')) {
            Schema::table('leave_types', function (Blueprint $table) {
                $table->integer('monthly_limit')->default(0);
            });
        }

        if (!Schema::hasColumn('teams', 'parent_id')) {
            Schema::table('teams', function (Blueprint $table) {
                $table->integer('parent_id')->unsigned()->nullable()->after('team_name');
            });
        }

        if (!Schema::hasTable('knowledge_base_files')) {
            Schema::create('knowledge_base_files', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('knowledge_base_id')->unsigned();
                $table->foreign('knowledge_base_id')
                    ->references('id')
                    ->on('knowledge_bases')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
                $table->string('filename', 200)->nullable();
                $table->string('hashname', 200)->nullable();
                $table->string('size', 200)->nullable();
                $table->string('external_link_name')->nullable();
                $table->text('external_link')->nullable();

                $table->integer('added_by')->unsigned()->nullable();
                $table->foreign('added_by')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');

                $table->integer('last_updated_by')->unsigned()->nullable();
                $table->foreign('last_updated_by')->references('id')->on('users')->onDelete('SET NULL')->onUpdate('cascade');

                $table->timestamps();
            });
        }
    }

};
