<?php

namespace App\Observers;

use App\Http\Controllers\AppSettingController;
use App\Models\CompanyAddress;
use App\Models\InvoiceSetting;
use App\Models\Permission;
use App\Models\Role;
use App\Models\Setting;
use App\Models\TranslateSetting;
use App\Models\User;
use App\Models\CurrencyFormatSetting;
use App\Models\CustomFieldGroup;
use App\Models\DashboardWidget;
use App\Models\DatabaseBackupSetting;
use App\Models\DiscussionCategory;
use App\Models\EmployeeShift;
use App\Models\GoogleCalendarModule;
use App\Models\LeadCustomForm;
use App\Models\LeadSource;
use App\Models\LeaveType;
use App\Models\MessageSetting;
use App\Models\Module;
use App\Models\ModuleSetting;
use App\Models\PaymentGatewayCredentials;
use App\Models\PusherSetting;
use App\Models\PushNotificationSetting;
use App\Models\StorageSetting;
use App\Models\TicketChannel;
use App\Models\TicketCustomForm;
use App\Models\TicketGroup;
use App\Models\TicketType;
use App\Models\LeadStatus;
use App\Models\TaskboardColumn;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class SettingsObserver
{

    public function saving(Setting $setting)
    {

        session()->forget('global_setting');

        $user = user();

        if ($user) {
            $setting->last_updated_by = $user->id;
        }

        if ($setting->isDirty('date_format')) {

            switch ($setting->date_format) {

            case 'd-m-Y':
                $setting->date_picker_format = 'dd-mm-yyyy';
                $setting->moment_format = 'DD-MM-YYYY';
                    break;
            case 'm-d-Y':
                $setting->date_picker_format = 'mm-dd-yyyy';
                $setting->moment_format = 'MM-DD-YYYY';
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

        }

        if (!isRunningInConsoleOrSeeding() && $setting->isDirty('currency_id')) {
            $allClients = User::allClients();
            $clientsArray = $allClients->pluck('id')->toArray();

            $appSettings = new AppSettingController();
            $appSettings->deleteSessions($clientsArray);
        }
    }

    public function creating(Setting $model)
    {
        $this->companyAddress($model);
        $this->roles();


    }

    //phpcs:ignore
    public function created(Setting $model)
    {
        $this->employeeShift();
        $this->attendanceSetting();
        $this->currencyFormat();
        $this->customFieldGroup();
        $this->dashboarWidgets();
        $this->discussionCategory();
        $this->emailNotificationSettings();
        $this->invoiceSetting();
        $this->leadCustomForms();
        $this->leadSources();
        $this->leaveType();
        $this->logTimeFor();
        $this->messageSetting();
        $this->projectSetting();
        $this->pushNotification();
        $this->slackSetting();
        $this->ticketChannel();
        $this->customForms();
    }

    private function employeeShift()
    {

        $employeeShift = new EmployeeShift();
        $employeeShift->shift_name = 'General Shift';
        $employeeShift->shift_short_code = 'GS';
        $employeeShift->color = '#99C7F1';
        $employeeShift->office_start_time = '09:00:00';
        $employeeShift->office_end_time = '18:00:00';
        $employeeShift->late_mark_duration = 20;
        $employeeShift->clockin_in_day = 2;
        $employeeShift->office_open_days = '[1,2,3,4,5]';
        $employeeShift->save();
    }

    private function attendanceSetting()
    {
        $setting = new \App\Models\AttendanceSetting();
        $setting->office_start_time = '09:00:00';
        $setting->office_end_time = '18:00:00';
        $setting->late_mark_duration = 20;
        $setting->save();
    }

    private function currencyFormat()
    {
        $format = new CurrencyFormatSetting();
        $format->currency_position = 'left';
        $format->no_of_decimal = 2;
        $format->thousand_separator = ',';
        $format->decimal_separator = '.';
        $format->save();
    }

    private function customFieldGroup()
    {

        DB::table('custom_field_groups')->insert([
            'name' => 'Client', 'model' => 'App\Models\ClientDetails'
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Employee', 'model' => 'App\Models\EmployeeDetails',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Project', 'model' => 'App\Models\Project',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Invoice', 'model' => 'App\Models\Invoice',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Estimate', 'model' => 'App\Models\Estimate',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Task', 'model' => 'App\Models\Task',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Expense', 'model' => 'App\Models\Expense',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Lead', 'model' => 'App\Models\Lead',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Product', 'model' => 'App\Models\Product',
        ]);

        DB::table('custom_field_groups')->insert([
            'name' => 'Ticket', 'model' => 'App\Models\Ticket',
        ]);

        $log = CustomFieldGroup::where('model', 'App\Models\ProjectTimeLog')->first();

        if (!$log) {
            DB::table('custom_field_groups')->insert([
                'name' => 'Time Log', 'model' => 'App\Models\ProjectTimeLog',
            ]);
        }

    }

    private function dashboarWidgets()
    {

        $widgets = [
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_clients'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_employees'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_projects'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_unpaid_invoices'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_hours_logged'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_pending_tasks'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_today_attendance'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'total_unresolved_tickets'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'recent_earnings'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'settings_leaves'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'new_tickets'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'overdue_tasks'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'pending_follow_up'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'project_activity_timeline'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'user_activity_timeline'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'total_clients'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'total_leads'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'total_lead_conversions'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'total_contracts_generated'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'total_contracts_signed'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'client_wise_earnings'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'client_wise_timelogs'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'lead_vs_status'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'lead_vs_source'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'latest_client'],
            ['dashboard_type' => 'admin-client-dashboard', 'widget_name' => 'recent_login_activities'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'total_paid_invoices'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'total_expenses'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'total_earnings'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'total_pending_amount'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'invoice_overview'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'estimate_overview'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'proposal_overview'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'earnings_by_client'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'earnings_by_projects'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'total_leaves_approved'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'total_new_employee'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'total_employee_exits'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'average_attendance'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'department_wise_employee'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'designation_wise_employee'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'gender_wise_employee'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'role_wise_employee'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'leaves_taken'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'late_attendance_mark'],
            ['dashboard_type' => 'admin-project-dashboard', 'widget_name' => 'total_project'],
            ['dashboard_type' => 'admin-project-dashboard', 'widget_name' => 'total_hours_logged'],
            ['dashboard_type' => 'admin-project-dashboard', 'widget_name' => 'total_overdue_project'],
            ['dashboard_type' => 'admin-project-dashboard', 'widget_name' => 'status_wise_project'],
            ['dashboard_type' => 'admin-project-dashboard', 'widget_name' => 'pending_milestone'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'total_tickets'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'total_unassigned_ticket'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'type_wise_ticket'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'status_wise_ticket'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'channel_wise_ticket'],
            ['dashboard_type' => 'admin-ticket-dashboard', 'widget_name' => 'new_tickets'],
            ['dashboard_type' => 'admin-dashboard', 'widget_name' => 'timelogs'],
            ['dashboard_type' => 'admin-finance-dashboard', 'widget_name' => 'total_unpaid_invoices'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'birthday'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'profile'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'shift_schedule'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'birthday'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'notices'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'tasks'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'projects'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'my_task'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'my_calender'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'week_timelog'],
            ['dashboard_type' => 'admin-hr-dashboard', 'widget_name' => 'total_today_attendance'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'leave'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'lead'],
            ['dashboard_type' => 'private-dashboard', 'widget_name' => 'work_from_home'],
        ];

        foreach ($widgets as $widget) {
            DashboardWidget::create($widget);
        }
    }

    private function discussionCategory()
    {
        DiscussionCategory::create(
            ['name' => 'General', 'color' => '#3498DB']
        );
    }

    private function emailNotificationSettings()
    {

        $data = [
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Expense/Added by Admin',
                'slug' => 'new-expenseadded-by-admin',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Expense/Added by Member',
                'slug' => 'new-expenseadded-by-member',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Expense Status Changed',
                'slug' => 'expense-status-changed',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Support Ticket Request',
                'slug' => 'new-support-ticket-request',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Leave Application',
                'slug' => 'new-leave-application',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Task Completed',
                'slug' => 'task-completed',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Invoice Create/Update Notification',
                'slug' => 'invoice-createupdate-notification',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Discussion Reply',
                'slug' => 'discussion-reply',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Product Purchase Request',
                'slug' => 'new-product-purchase-request',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Lead notification',
                'slug' => 'lead-notification',

            ],
            [
                'send_email' => 'no',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Order Create/Update Notification',
                'slug' => 'order-createupdate-notification',

            ],
            [
                'send_email' => 'no',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'User Join via Invitation',
                'slug' => 'user-join-via-invitation',

            ],
            [
                'send_email' => 'no',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Follow Up Reminder',
                'slug' => 'follow-up-reminder',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'User Registration/Added by Admin',
                'slug' => 'user-registrationadded-by-admin',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'Employee Assign to Project',
                'slug' => 'employee-assign-to-project',

            ],
            [
                'send_email' => 'no',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'New Notice Published',
                'slug' => 'new-notice-published',

            ],
            [
                'send_email' => 'yes',
                'send_push' => 'no',
                'send_slack' => 'no',
                'setting_name' => 'User Assign to Task',
                'slug' => 'user-assign-to-task',

            ],
        ];
        \DB::table('email_notification_settings')->insert($data);


    }

    private function invoiceSetting()
    {

        InvoiceSetting::create([
            'credit_note_digit' => 3,
            'credit_note_prefix' => 'CN',
            'due_after' => 15,
            'estimate_digit' => 3,
            'estimate_prefix' => 'EST',
            'estimate_terms' => null,
            'gst_number' => null,
            'hsn_sac_code_show' => 0,
            'invoice_digit' => 3,
            'invoice_prefix' => 'INV',
            'invoice_terms' => 'Thank you for your business.',
            'locale' => 'en',
            'logo' => null,
            'reminder' => null,
            'send_reminder' => 0,
            'send_reminder_after' => 0,
            'show_client_company_address' => 'yes',
            'show_client_company_name' => 'yes',
            'show_client_email' => 'yes',
            'show_client_name' => 'yes',
            'show_client_phone' => 'yes',
            'show_gst' => 'no',
            'show_project' => 0,
            'tax_calculation_msg' => 0,
            'template' => 'invoice-5',
        ]);
    }

    private function leadCustomForms()
    {
        $data = [
            [
                'field_display_name' => 'Name',
                'field_name' => 'name',
                'field_order' => 1,
                'required' => 1,
            ],
            [
                'field_display_name' => 'Email',
                'field_name' => 'email',
                'field_order' => 2,
                'required' => 1,

            ],
            [
                'field_display_name' => 'Company Name',
                'field_name' => 'company_name',
                'field_order' => 3,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Website',
                'field_name' => 'website',
                'field_order' => 4,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Address',
                'field_name' => 'address',
                'field_order' => 5,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Mobile',
                'field_name' => 'mobile',
                'field_order' => 6,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Message',
                'field_name' => 'message',
                'field_order' => 7,
                'required' => 0,

            ],
            [
                'field_display_name' => 'City',
                'field_name' => 'city',
                'field_order' => 1,
                'required' => 0,

            ],
            [
                'field_display_name' => 'State',
                'field_name' => 'state',
                'field_order' => 2,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Country',
                'field_name' => 'country',
                'field_order' => 3,
                'required' => 0,

            ],
            [
                'field_display_name' => 'Postal Code',
                'field_name' => 'postal_code',
                'field_order' => 4,
                'required' => 0,

            ],
        ];

        foreach ($data as $form) {
            $form['status'] = 'active';
            LeadCustomForm::create($form);
        }

    }

    private function leadSources()
    {
        $sources = [
            ['type' => 'email'],
            ['type' => 'google'],
            ['type' => 'facebook'],
            ['type' => 'friend'],
            ['type' => 'direct visit'],
            ['type' => 'tv ad']
        ];

        LeadSource::insert($sources);

        $status = [
            ['type' => 'pending', 'priority' => 1, 'default' => 1],
            ['type' => 'inprocess', 'priority' => 2],
            ['type' => 'converted', 'priority' => 3]
        ];

        foreach ($status as $item) {
            LeadStatus::create($item);
        }


    }

    private function leaveType()
    {
        $category = new LeaveType();
        $category->type_name = 'Casual';
        $category->color = '#16813D';
        $category->save();

        $category = new LeaveType();
        $category->type_name = 'Sick';
        $category->color = '#DB1313';
        $category->save();

        $category = new LeaveType();
        $category->type_name = 'Earned';
        $category->color = '#B078C6';
        $category->save();
    }

    private function logTimeFor()
    {
        $logTimeFor = new \App\Models\LogTimeFor();
        $logTimeFor->log_time_for = 'project';
        $logTimeFor->save();
    }

    private function messageSetting()
    {
        $setting = new MessageSetting();
        $setting->allow_client_admin = 'no';
        $setting->allow_client_employee = 'no';
        $setting->save();
    }

    private function projectSetting()
    {
        $project_setting = new \App\Models\ProjectSetting();

        $project_setting->send_reminder = 'no';
        $project_setting->remind_time = 5;
        $project_setting->remind_type = 'days';

        $project_setting->save();
    }

    private function pushNotification()
    {
        $slack = new PushNotificationSetting();
        $slack->onesignal_app_id = null;
        $slack->onesignal_rest_api_key = null;
        $slack->notification_logo = null;
        $slack->save();

        $pusherSetting = new PusherSetting();
        $pusherSetting->save();

    }

    private function slackSetting()
    {
        $slack = new \App\Models\SlackSetting();
        $slack->slack_webhook = null;
        $slack->slack_logo = null;
        $slack->save();
    }

    private function ticketChannel()
    {
        $channels = [
            'Email', 'Phone', 'Twitter', 'Facebook',
            'Sales', 'Code', 'Management', 'Question',
            'Problem', 'Incident', 'Feature Request'
        ];

        foreach ($channels as $value) {
            $channel = new TicketChannel();
            $channel->channel_name = $value;
            $channel->save();
        }

    }

    private function customForms()
    {
        $fields = ['Name', 'Email', 'Ticket Subject', 'Ticket Description', 'Type', 'Priority'];
        $fieldsName = ['name', 'email', 'ticket_subject', 'ticket_description', 'type', 'priority'];
        $fieldsType = ['text', 'text', 'text', 'textarea', 'select', 'select'];

        foreach ($fields as $key => $value) {

            TicketCustomForm::create(['field_display_name' => $value,
                'field_name' => $fieldsName[$key],
                'field_order' => $key + 1,
                'field_type' => $fieldsType[$key],
            ]);

        }
    }

    private function companyAddress($model)
    {
        CompanyAddress::create([
            'address' => $model->address,
            'location' => $model->company_name,
            'is_default' => 1
        ]);
    }

    private function roles()
    {

        $allPermissions = Permission::all();

        $admin = new Role();
        $admin->name = 'admin';
        $admin->display_name = 'App Administrator'; // optional
        $admin->description = 'Admin is allowed to manage everything of the app.'; // optional
        $admin->save();

        $employee = new Role();
        $employee->name = 'employee';
        $employee->display_name = 'Employee'; // optional
        $employee->description = 'Employee can see tasks and projects assigned to him.'; // optional
        $employee->save();

        $client = new Role();
        $client->name = 'client';
        $client->display_name = 'Client'; // optional
        $client->description = 'Client can see own tasks and projects.'; // optional
        $client->save();

        $admin->perms()->sync([]);
        $admin->attachPermissions($allPermissions);

        $employee->perms()->sync([]);
        $employee->attachPermissions($allPermissions);

        $client->perms()->sync([]);
        $client->attachPermissions($allPermissions);
    }

}
