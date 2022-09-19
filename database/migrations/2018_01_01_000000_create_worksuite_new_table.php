<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Run the migrations.
     * We have changed the file_name as 2018 for the purpose of modules
     *
     * @return void
     */
    public function up()
    {
        //
        // BIG NOTE: THIS FILE IS GETTING LOADED FROM schema/mysql-schema.dump
        //
        // We are checking if organisation_settings exists in database or not
        // because for existing customers if the update the application
        // then existing and this migration will remain in migrations folder and
        // it will try to run this new migration. But since we are checking organisation_settings
        // exists or not and accordingly run this migration
        // We are not checking every table as it will create extra queries for every table
        if (!Schema::hasTable('organisation_settings')) {

            Schema::create('organisation_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('company_name');
                $table->string('app_name')->nullable();
                $table->string('company_email');
                $table->string('company_phone');
                $table->string('logo')->nullable();
                $table->string('login_background')->nullable();
                $table->text('address');
                $table->string('website')->nullable();
                $table->unsignedInteger('currency_id')->nullable()->index('organisation_settings_currency_id_foreign');
                $table->string('timezone')->default('Asia/Kolkata');
                $table->string('date_format', 20)->default('d-m-Y');
                $table->string('date_picker_format')->nullable();
                $table->string('moment_format')->nullable();
                $table->string('time_format', 20)->default('h:i a');
                $table->string('locale')->default('en');
                $table->decimal('latitude', 10, 8)->default(26.9124336);
                $table->decimal('longitude', 11, 8)->default(75.7872709);
                $table->enum('leaves_start_from', ['joining_date', 'year_start'])->default('joining_date');
                $table->enum('active_theme', ['default', 'custom'])->default('default');
                $table->unsignedInteger('last_updated_by')->nullable()->index('organisation_settings_last_updated_by_foreign');
                $table->string('currency_converter_key')->nullable();
                $table->string('google_map_key')->nullable();
                $table->enum('task_self', ['yes', 'no'])->default('yes');
                $table->timestamps();
                $table->text('weather_key');
                $table->string('purchase_code', 100)->nullable();
                $table->string('license_type', 20)->nullable();
                $table->timestamp('supported_until')->nullable();
                $table->enum('google_recaptcha_status', ['active', 'deactive'])->default('deactive');
                $table->enum('google_recaptcha_v2_status', ['active', 'deactive'])->default('deactive');
                $table->string('google_recaptcha_v2_site_key')->nullable();
                $table->string('google_recaptcha_v2_secret_key')->nullable();
                $table->enum('google_recaptcha_v3_status', ['active', 'deactive'])->default('deactive');
                $table->string('google_recaptcha_v3_site_key')->nullable();
                $table->string('google_recaptcha_v3_secret_key')->nullable();
                $table->boolean('app_debug')->default(false);
                $table->boolean('rounded_theme');
                $table->boolean('hide_cron_message')->default(false);
                $table->boolean('system_update')->default(true);
                $table->string('logo_background_color')->default('#ffffff');
                $table->integer('before_days');
                $table->integer('after_days');
                $table->enum('on_deadline', ['yes', 'no'])->default('yes');
                $table->unsignedInteger('default_task_status')->default(1)->index('organisation_settings_default_task_status_foreign');
                $table->boolean('show_review_modal')->default(true);
                $table->boolean('dashboard_clock')->default(true);
                $table->boolean('ticket_form_google_captcha')->default(false);
                $table->boolean('lead_form_google_captcha')->default(false);
                $table->integer('taskboard_length')->default(10);
                $table->timestamp('last_cron_run')->nullable();
                $table->string('favicon')->nullable();
                $table->enum('auth_theme', ['dark', 'light'])->default('light');
                $table->string('light_logo')->nullable();
                $table->enum('sidebar_logo_style', ['square', 'full'])->default('square');
                $table->enum('session_driver', ['file', 'database'])->default('file');
                $table->boolean('allow_client_signup');
                $table->boolean('admin_client_signup_approval');
                $table->text('allowed_file_types')->nullable();
                $table->enum('google_calendar_status', ['active', 'inactive'])->default('inactive');
                $table->text('google_client_id')->nullable();
                $table->text('google_client_secret')->nullable();
                $table->enum('google_calendar_verification_status', ['verified', 'non_verified'])->default('non_verified');
                $table->string('google_id')->nullable();
                $table->string('name')->nullable();
                $table->text('token')->nullable();
                $table->integer('allowed_file_size')->default(10);
                $table->enum('currency_key_version', ['free', 'api'])->default('free');
            });

            Schema::create('accept_estimates', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('estimate_id')->index('accept_estimates_estimate_id_foreign');
                $table->string('full_name');
                $table->string('email');
                $table->string('signature');
                $table->timestamps();
            });

            Schema::create('attendance_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->enum('auto_clock_in', ['yes', 'no'])->default('no');
                $table->time('office_start_time');
                $table->time('office_end_time');
                $table->time('halfday_mark_time')->nullable();
                $table->tinyInteger('late_mark_duration');
                $table->integer('clockin_in_day')->default(1);
                $table->enum('employee_clock_in_out', ['yes', 'no'])->default('yes');
                $table->string('office_open_days')->default('[1,2,3,4,5]');
                $table->text('ip_address')->nullable();
                $table->integer('radius')->nullable();
                $table->enum('radius_check', ['yes', 'no'])->default('no');
                $table->enum('ip_check', ['yes', 'no'])->default('no');
                $table->integer('alert_after')->nullable();
                $table->boolean('alert_after_status')->default(true);
                $table->timestamps();
                $table->boolean('save_current_location')->default(false);
                $table->unsignedBigInteger('default_employee_shift')->nullable()->default(1)->index('attendance_settings_default_employee_shift_foreign');
                $table->string('week_start_from')->default('1');
                $table->boolean('allow_shift_change')->default(true);
                $table->enum('show_clock_in_button', ['yes', 'no'])->default('no');
            });

            Schema::create('attendances', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('attendances_user_id_foreign');
                $table->unsignedBigInteger('location_id')->nullable()->index('attendances_location_id_foreign');
                $table->dateTime('clock_in_time')->index();
                $table->dateTime('clock_out_time')->nullable()->index();
                $table->string('clock_in_ip');
                $table->string('clock_out_ip')->nullable();
                $table->string('working_from')->default('office');
                $table->enum('late', ['yes', 'no'])->default('no');
                $table->enum('half_day', ['yes', 'no']);
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('attendances_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('attendances_last_updated_by_foreign');
                $table->decimal('latitude', 10, 8)->nullable();
                $table->decimal('longitude', 11, 8)->nullable();
                $table->dateTime('shift_start_time')->nullable();
                $table->dateTime('shift_end_time')->nullable();
                $table->unsignedBigInteger('employee_shift_id')->nullable()->index('attendances_employee_shift_id_foreign');
            });

            Schema::create('client_categories', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('category_name');
                $table->timestamps();
            });

            Schema::create('client_contacts', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('client_contacts_user_id_foreign');
                $table->string('contact_name');
                $table->string('phone')->nullable();
                $table->string('email')->nullable();
                $table->string('title')->nullable();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('client_contacts_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('client_contacts_last_updated_by_foreign');
            });

            Schema::create('client_details', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('client_details_user_id_foreign');
                $table->string('company_name')->nullable();
                $table->text('address')->nullable();
                $table->text('shipping_address')->nullable();
                $table->string('postal_code')->nullable();
                $table->string('state')->nullable();
                $table->string('city')->nullable();
                $table->string('office')->nullable();
                $table->string('website')->nullable();
                $table->text('note')->nullable();
                $table->string('linkedin')->nullable();
                $table->string('facebook')->nullable();
                $table->string('twitter')->nullable();
                $table->string('skype')->nullable();
                $table->string('gst_number')->nullable();
                $table->timestamps();
                $table->unsignedBigInteger('category_id')->nullable()->index('client_details_category_id_foreign');
                $table->unsignedBigInteger('sub_category_id')->nullable()->index('client_details_sub_category_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('client_details_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('client_details_last_updated_by_foreign');
            });

            Schema::create('client_docs', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('client_docs_user_id_foreign');
                $table->string('name', 200);
                $table->string('filename', 200);
                $table->string('hashname', 200);
                $table->string('size', 200)->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('client_docs_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('client_docs_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('client_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('client_id')->nullable()->index('client_notes_client_id_foreign');
                $table->string('title');
                $table->boolean('type')->default(false);
                $table->unsignedInteger('member_id')->nullable()->index('client_notes_member_id_foreign');
                $table->boolean('is_client_show')->default(false);
                $table->boolean('ask_password')->default(false);
                $table->longText('details');
                $table->unsignedInteger('added_by')->nullable()->index('client_notes_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('client_notes_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('client_sub_categories', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('category_id')->index('client_sub_categories_category_id_foreign');
                $table->string('category_name');
                $table->timestamps();
            });

            Schema::create('client_user_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('client_user_notes_user_id_foreign');
                $table->unsignedInteger('client_note_id')->index('client_user_notes_client_note_id_foreign');
                $table->timestamps();
            });

            Schema::create('company_addresses', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->mediumText('address');
                $table->boolean('is_default');
                $table->string('tax_number')->nullable();
                $table->string('tax_name')->nullable();
                $table->string('location')->nullable();
                $table->timestamps();
            });

            Schema::create('contract_discussions', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('contract_id')->index('contract_discussions_contract_id_foreign');
                $table->unsignedInteger('from')->index('contract_discussions_from_foreign');
                $table->longText('message');
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('contract_discussions_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('contract_discussions_last_updated_by_foreign');
            });

            Schema::create('contract_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('contract_files_user_id_foreign');
                $table->unsignedBigInteger('contract_id')->index('contract_files_contract_id_foreign');
                $table->string('filename');
                $table->string('hashname');
                $table->string('size');
                $table->string('google_url');
                $table->string('dropbox_link');
                $table->string('external_link_name');
                $table->string('external_link');
                $table->text('description')->nullable();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('contract_files_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('contract_files_last_updated_by_foreign');
            });

            Schema::create('contract_renews', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('renewed_by')->index('contract_renews_renewed_by_foreign');
                $table->unsignedBigInteger('contract_id')->index('contract_renews_contract_id_foreign');
                $table->date('start_date');
                $table->date('end_date');
                $table->decimal('amount', 12);
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('contract_renews_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('contract_renews_last_updated_by_foreign');
            });

            Schema::create('contract_signs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('contract_id')->index('contract_signs_contract_id_foreign');
                $table->string('full_name');
                $table->string('email');
                $table->string('signature');
                $table->timestamps();
            });

            Schema::create('contract_types', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->timestamps();
            });

            Schema::create('contracts', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('client_id')->index('contracts_client_id_foreign');
                $table->string('subject');
                $table->string('amount');
                $table->decimal('original_amount', 15);
                $table->unsignedBigInteger('contract_type_id')->nullable()->index('contracts_contract_type_id_foreign');
                $table->date('start_date');
                $table->date('original_start_date');
                $table->date('end_date')->nullable();
                $table->date('original_end_date')->nullable();
                $table->longText('description')->nullable();
                $table->string('contract_name')->nullable();
                $table->string('company_logo')->nullable();
                $table->string('alternate_address')->nullable();
                $table->string('cell')->nullable();
                $table->string('office')->nullable();
                $table->string('city')->nullable();
                $table->string('state')->nullable();
                $table->string('country')->nullable();
                $table->string('postal_code')->nullable();
                $table->longText('contract_detail')->nullable();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('contracts_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('contracts_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->unsignedInteger('currency_id')->nullable()->index('contracts_currency_id_foreign');
                $table->text('event_id')->nullable();
            });

            Schema::create('conversation', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_one')->index('conversation_user_one_foreign');
                $table->unsignedInteger('user_two')->index('conversation_user_two_foreign');
                $table->timestamps();
            });

            Schema::create('conversation_reply', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('conversation_id')->index('conversation_reply_conversation_id_foreign');
                $table->text('reply');
                $table->unsignedInteger('user_id')->index('conversation_reply_user_id_foreign');
                $table->timestamps();
            });

            Schema::create('countries', function (Blueprint $table) {
                $table->increments('id');
                $table->char('iso', 2);
                $table->string('name', 80);
                $table->string('nicename', 80);
                $table->char('iso3', 3)->nullable();
                $table->smallInteger('numcode')->nullable();
                $table->integer('phonecode');
            });

            Schema::create('credit_note_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('credit_note_item_id')->index('credit_note_item_images_credit_note_item_id_foreign');
                $table->string('filename')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('credit_note_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('credit_note_id')->index('credit_note_items_credit_note_id_foreign');
                $table->string('item_name');
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->integer('quantity');
                $table->double('unit_price', 8, 2);
                $table->double('amount', 8, 2);
                $table->string('taxes')->nullable();
                $table->timestamps();
                $table->string('hsn_sac_code')->nullable();
                $table->text('item_summary')->nullable();
            });

            Schema::create('credit_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('credit_notes_project_id_foreign');
                $table->unsignedInteger('client_id')->nullable()->index('credit_notes_client_id_foreign');
                $table->string('cn_number');
                $table->unsignedInteger('invoice_id')->nullable();
                $table->date('issue_date');
                $table->date('due_date');
                $table->double('discount')->default(0);
                $table->enum('discount_type', ['percent', 'fixed'])->default('percent');
                $table->double('sub_total', 15, 2);
                $table->double('total', 15, 2);
                $table->double('adjustment_amount', 8, 2)->nullable();
                $table->unsignedInteger('currency_id')->nullable()->index('credit_notes_currency_id_foreign');
                $table->enum('status', ['closed', 'open'])->default('open');
                $table->enum('recurring', ['yes', 'no'])->default('no');
                $table->string('billing_frequency')->nullable();
                $table->integer('billing_interval')->nullable();
                $table->integer('billing_cycle')->nullable();
                $table->string('file')->nullable();
                $table->string('file_original_name')->nullable();
                $table->text('note')->nullable();
                $table->softDeletes();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('credit_notes_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('credit_notes_last_updated_by_foreign');
                $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
            });

            Schema::create('currencies', function (Blueprint $table) {
                $table->increments('id');
                $table->string('currency_name');
                $table->string('currency_symbol')->nullable();
                $table->string('currency_code');
                $table->double('exchange_rate')->nullable();
                $table->enum('is_cryptocurrency', ['yes', 'no'])->default('no');
                $table->double('usd_price')->nullable();
                $table->timestamps();
            });

            Schema::create('currency_format_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->enum('currency_position', ['left', 'right', 'left_with_space', 'right_with_space'])->default('left');
                $table->unsignedInteger('no_of_decimal');
                $table->string('thousand_separator')->nullable();
                $table->string('decimal_separator')->nullable();
            });

            Schema::create('custom_field_groups', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('model')->nullable()->index();
            });

            Schema::create('custom_fields', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('custom_field_group_id')->nullable()->index('custom_fields_custom_field_group_id_foreign');
                $table->string('label', 100);
                $table->string('name', 100);
                $table->string('type', 10);
                $table->enum('required', ['yes', 'no'])->default('no');
                $table->string('values', 5000)->nullable();
                $table->boolean('export')->nullable()->default(false);
            });

            Schema::create('custom_fields_data', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('custom_field_id')->index('custom_fields_data_custom_field_id_foreign');
                $table->unsignedInteger('model_id');
                $table->string('model')->nullable()->index();
                $table->string('value', 10000);
            });

            Schema::create('dashboard_widgets', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('widget_name');
                $table->boolean('status')->default(true);
                $table->timestamps();
                $table->string('dashboard_type')->nullable();
            });

            Schema::create('database_backup_cron_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->enum('status', ['active', 'inactive'])->default('inactive');
                $table->time('hour_of_day')->nullable();
                $table->string('backup_after_days')->nullable();
                $table->string('delete_backup_after_days')->nullable();
            });

            Schema::create('database_backups', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('filename')->nullable();
                $table->string('size')->nullable();
                $table->dateTime('created_at')->nullable();
            });

            Schema::create('designations', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('designations_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('designations_last_updated_by_foreign');
            });

            Schema::create('discussion_categories', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('order')->default(1);
                $table->string('name');
                $table->string('color', 20);
                $table->timestamps();
            });

            Schema::create('discussion_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('discussion_files_user_id_foreign');
                $table->unsignedInteger('discussion_id')->nullable()->index('discussion_files_discussion_id_foreign');
                $table->unsignedInteger('discussion_reply_id')->nullable()->index('discussion_files_discussion_reply_id_foreign');
                $table->string('filename');
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->timestamps();
            });

            Schema::create('discussion_replies', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('discussion_id')->index('discussion_replies_discussion_id_foreign');
                $table->unsignedInteger('user_id')->index('discussion_replies_user_id_foreign');
                $table->longText('body');
                $table->softDeletes();
                $table->timestamps();
            });

            Schema::create('discussions', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('discussion_category_id')->nullable()->default(1)->index('discussions_discussion_category_id_foreign');
                $table->unsignedInteger('project_id')->nullable()->index('discussions_project_id_foreign');
                $table->string('title');
                $table->string('color', 20)->nullable()->default('#232629');
                $table->unsignedInteger('user_id')->index('discussions_user_id_foreign');
                $table->boolean('pinned')->default(false);
                $table->boolean('closed')->default(false);
                $table->softDeletes();
                $table->timestamp('last_reply_at')->useCurrent();
                $table->timestamps();
                $table->unsignedInteger('best_answer_id')->nullable()->index('discussions_best_answer_id_foreign');
                $table->unsignedInteger('last_reply_by_id')->nullable()->index('discussions_last_reply_by_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('discussions_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('discussions_last_updated_by_foreign');
            });

            Schema::create('email_notification_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('setting_name');
                $table->enum('send_email', ['yes', 'no'])->default('no');
                $table->enum('send_slack', ['yes', 'no'])->default('no');
                $table->enum('send_push', ['yes', 'no'])->default('no');
                $table->timestamps();
                $table->string('slug')->nullable();
            });

            Schema::create('emergency_contacts', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('emergency_contacts_user_id_foreign');
                $table->string('name')->nullable();
                $table->string('email')->nullable();
                $table->string('mobile')->nullable();
                $table->string('relation')->nullable();
                $table->string('address')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('emergency_contacts_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('emergency_contacts_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('employee_details', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('employee_details_user_id_foreign');
                $table->string('employee_id')->nullable()->unique();
                $table->text('address')->nullable();
                $table->double('hourly_rate')->nullable();
                $table->string('slack_username')->nullable()->unique();
                $table->unsignedInteger('department_id')->nullable()->index('employee_details_department_id_foreign');
                $table->unsignedBigInteger('designation_id')->nullable()->index('employee_details_designation_id_foreign');
                $table->timestamps();
                $table->timestamp('joining_date')->useCurrent();
                $table->date('last_date')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('employee_details_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('employee_details_last_updated_by_foreign');
                $table->date('attendance_reminder')->nullable();
                $table->date('date_of_birth')->nullable();
                $table->text('calendar_view')->nullable();
                $table->text('about_me')->nullable();
                $table->unsignedInteger('reporting_to')->nullable()->index('employee_details_reporting_to_foreign');
            });

            Schema::create('employee_docs', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('employee_docs_user_id_foreign');
                $table->string('name', 200);
                $table->string('filename', 200);
                $table->string('hashname', 200);
                $table->string('size', 200)->nullable();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('employee_docs_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('employee_docs_last_updated_by_foreign');
            });

            Schema::create('employee_leave_quotas', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('employee_leave_quotas_user_id_foreign');
                $table->unsignedInteger('leave_type_id')->index('employee_leave_quotas_leave_type_id_foreign');
                $table->integer('no_of_leaves');
                $table->timestamps();
            });

            Schema::create('employee_shift_change_requests', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('shift_schedule_id')->index('employee_shift_change_requests_shift_schedule_id_foreign');
                $table->unsignedBigInteger('employee_shift_id')->index('employee_shift_change_requests_employee_shift_id_foreign');
                $table->enum('status', ['waiting', 'accepted', 'rejected'])->default('waiting');
                $table->text('reason')->nullable();
                $table->timestamps();
            });

            Schema::create('employee_shift_schedules', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('employee_shift_schedules_user_id_foreign');
                $table->date('date')->index();
                $table->unsignedBigInteger('employee_shift_id')->index('employee_shift_schedules_employee_shift_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('employee_shift_schedules_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('employee_shift_schedules_last_updated_by_foreign');
                $table->dateTime('shift_start_time')->nullable();
                $table->dateTime('shift_end_time')->nullable();
                $table->text('remarks')->nullable();
                $table->timestamps();
            });

            Schema::create('employee_shifts', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('shift_name');
                $table->string('shift_short_code');
                $table->string('color');
                $table->time('office_start_time');
                $table->time('office_end_time');
                $table->time('halfday_mark_time')->nullable();
                $table->tinyInteger('late_mark_duration');
                $table->tinyInteger('clockin_in_day');
                $table->text('office_open_days');
                $table->timestamps();
            });

            Schema::create('employee_skills', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('employee_skills_user_id_foreign');
                $table->unsignedInteger('skill_id')->index('employee_skills_skill_id_foreign');
                $table->timestamps();
            });

            Schema::create('employee_teams', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('team_id')->index('employee_teams_team_id_foreign');
                $table->unsignedInteger('user_id')->index('employee_teams_user_id_foreign');
                $table->timestamps();
            });

            Schema::create('estimate_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('estimate_item_id')->index('estimate_item_images_estimate_item_id_foreign');
                $table->string('filename');
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('estimate_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('estimate_id')->index('estimate_items_estimate_id_foreign');
                $table->string('item_name');
                $table->text('item_summary')->nullable();
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->double('quantity', 16, 2);
                $table->double('unit_price', 16, 2);
                $table->double('amount', 16, 2);
                $table->string('taxes')->nullable();
                $table->timestamps();
                $table->string('hsn_sac_code')->nullable();
            });

            Schema::create('estimates', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('client_id')->index('estimates_client_id_foreign');
                $table->string('estimate_number')->nullable()->unique();
                $table->date('valid_till');
                $table->double('sub_total', 16, 2);
                $table->double('discount')->default(0);
                $table->enum('discount_type', ['percent', 'fixed'])->default('percent');
                $table->double('total', 16, 2);
                $table->unsignedInteger('currency_id')->nullable()->index('estimates_currency_id_foreign');
                $table->enum('status', ['declined', 'accepted', 'waiting', 'sent', 'draft', 'canceled'])->default('waiting');
                $table->mediumText('note')->nullable();
                $table->longText('description')->nullable();
                $table->timestamps();
                $table->boolean('send_status')->default(true);
                $table->unsignedInteger('added_by')->nullable()->index('estimates_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('estimates_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
            });

            Schema::create('event_attendees', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('event_attendees_user_id_foreign');
                $table->unsignedInteger('event_id')->index('event_attendees_event_id_foreign');
                $table->timestamps();
            });

            Schema::create('events', function (Blueprint $table) {
                $table->increments('id');
                $table->string('event_name');
                $table->string('label_color');
                $table->string('where');
                $table->mediumText('description');
                $table->dateTime('start_date_time');
                $table->dateTime('end_date_time');
                $table->enum('repeat', ['yes', 'no'])->default('no');
                $table->integer('repeat_every')->nullable();
                $table->integer('repeat_cycles')->nullable();
                $table->enum('repeat_type', ['day', 'week', 'month', 'year'])->default('day');
                $table->enum('send_reminder', ['yes', 'no'])->default('no');
                $table->integer('remind_time')->nullable();
                $table->enum('remind_type', ['day', 'hour', 'minute'])->default('day');
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('events_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('events_last_updated_by_foreign');
                $table->text('event_id')->nullable();
            });

            Schema::create('expenses', function (Blueprint $table) {
                $table->increments('id');
                $table->string('item_name');
                $table->date('purchase_date');
                $table->string('purchase_from')->nullable();
                $table->double('price', 16, 2);
                $table->unsignedInteger('currency_id')->index('expenses_currency_id_foreign');
                $table->unsignedInteger('project_id')->nullable();
                $table->string('bill')->nullable();
                $table->unsignedInteger('user_id')->index('expenses_user_id_foreign');
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->timestamps();
                $table->boolean('can_claim')->default(true);
                $table->unsignedBigInteger('category_id')->nullable()->index('expenses_category_id_foreign');
                $table->unsignedBigInteger('expenses_recurring_id')->nullable()->index('expenses_expenses_recurring_id_foreign');
                $table->unsignedInteger('created_by')->nullable()->index('expenses_created_by_foreign');
                $table->text('description')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('expenses_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('expenses_last_updated_by_foreign');
                $table->unsignedInteger('approver_id')->nullable()->index('expenses_approver_id_foreign');
            });

            Schema::create('expenses_category', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('category_name');

                $table->unsignedInteger('added_by')->nullable()->index('expenses_category_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('expenses_category_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('expenses_category_roles', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedBigInteger('expenses_category_id')->nullable()->index('expenses_category_roles_expenses_category_id_foreign');
                $table->unsignedInteger('role_id')->index('expenses_category_roles_role_id_foreign');
                $table->timestamps();
            });

            Schema::create('expenses_recurring', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('category_id')->nullable()->index('expenses_recurring_category_id_foreign');
                $table->unsignedInteger('currency_id')->nullable()->index('expenses_recurring_currency_id_foreign');
                $table->unsignedInteger('project_id')->nullable()->index('expenses_recurring_project_id_foreign');
                $table->unsignedInteger('user_id')->nullable()->index('expenses_recurring_user_id_foreign');
                $table->unsignedInteger('created_by')->nullable()->index('expenses_recurring_created_by_foreign');
                $table->string('item_name');
                $table->integer('day_of_month')->nullable()->default(1);
                $table->integer('day_of_week')->nullable()->default(1);
                $table->string('payment_method')->nullable();
                $table->enum('rotation', ['monthly', 'weekly', 'bi-weekly', 'quarterly', 'half-yearly', 'annually', 'daily']);
                $table->integer('billing_cycle')->nullable();
                $table->boolean('unlimited_recurring')->default(false);
                $table->double('price');
                $table->string('bill')->nullable();
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->text('description')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('expenses_recurring_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('expenses_recurring_last_updated_by_foreign');
                $table->string('purchase_from')->nullable();
                $table->timestamps();
            });

            Schema::create('failed_jobs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('uuid')->unique();
                $table->text('connection');
                $table->text('queue');
                $table->longText('payload');
                $table->longText('exception');
                $table->timestamp('failed_at')->useCurrent();
            });

            Schema::create('file_storage', function (Blueprint $table) {
                $table->increments('id');
                $table->string('path');
                $table->string('filename');
                $table->string('type', 50)->nullable();
                $table->unsignedInteger('size');
                $table->enum('storage_location', ['local', 'aws_s3'])->default('local');
                $table->timestamps();
            });

            Schema::create('file_storage_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('filesystem');
                $table->text('auth_keys')->nullable();
                $table->enum('status', ['enabled', 'disabled'])->default('disabled');
                $table->timestamps();
            });

            Schema::create('gdpr_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->boolean('enable_gdpr')->default(false);
                $table->boolean('show_customer_area')->default(false);
                $table->boolean('show_customer_footer')->default(false);
                $table->longText('top_information_block')->nullable();
                $table->boolean('enable_export')->default(false);
                $table->boolean('data_removal')->default(false);
                $table->boolean('lead_removal_public_form')->default(false);
                $table->boolean('terms_customer_footer')->default(false);
                $table->longText('terms')->nullable();
                $table->longText('policy')->nullable();
                $table->boolean('public_lead_edit')->default(false);
                $table->boolean('consent_customer')->default(false);
                $table->boolean('consent_leads')->default(false);
                $table->longText('consent_block')->nullable();
                $table->timestamps();
            });

            Schema::create('google_calendar_modules', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->boolean('lead_status')->default(false);
                $table->boolean('leave_status')->default(false);
                $table->boolean('invoice_status')->default(false);
                $table->boolean('contract_status')->default(false);
                $table->boolean('task_status')->default(false);
                $table->boolean('event_status')->default(false);
                $table->boolean('holiday_status')->default(false);
                $table->timestamps();
            });

            Schema::create('holidays', function (Blueprint $table) {
                $table->increments('id');
                $table->date('date')->index();
                $table->string('occassion', 100)->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('holidays_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('holidays_last_updated_by_foreign');
                $table->text('event_id')->nullable();
                $table->timestamps();
            });

            Schema::create('invoice_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('invoice_item_id')->index('invoice_item_images_invoice_item_id_foreign');
                $table->string('filename');
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('invoice_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('invoice_id')->index('invoice_items_invoice_id_foreign');
                $table->string('item_name');
                $table->text('item_summary')->nullable();
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->double('quantity', 16, 2);
                $table->double('unit_price', 16, 2);
                $table->double('amount', 16, 2);
                $table->string('taxes')->nullable();
                $table->string('hsn_sac_code')->nullable();
                $table->timestamps();
            });

            Schema::create('invoice_recurring', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('currency_id')->nullable()->index('invoice_recurring_currency_id_foreign');
                $table->unsignedInteger('project_id')->nullable()->index('invoice_recurring_project_id_foreign');
                $table->unsignedInteger('client_id')->nullable()->index('invoice_recurring_client_id_foreign');
                $table->unsignedInteger('user_id')->nullable()->index('invoice_recurring_user_id_foreign');
                $table->unsignedInteger('created_by')->nullable()->index('invoice_recurring_created_by_foreign');
                $table->date('issue_date');
                $table->date('due_date');
                $table->double('sub_total')->default(0);
                $table->double('total')->default(0);
                $table->double('discount')->default(0);
                $table->enum('discount_type', ['percent', 'fixed'])->default('percent');
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->string('file')->nullable();
                $table->string('file_original_name')->nullable();
                $table->text('note')->nullable();
                $table->enum('show_shipping_address', ['yes', 'no'])->default('no');
                $table->integer('day_of_month')->nullable()->default(1);
                $table->integer('day_of_week')->nullable()->default(1);
                $table->string('payment_method')->nullable();
                $table->enum('rotation', ['monthly', 'weekly', 'bi-weekly', 'quarterly', 'half-yearly', 'annually', 'daily']);
                $table->integer('billing_cycle')->nullable();
                $table->boolean('client_can_stop')->default(true);
                $table->boolean('unlimited_recurring')->default(false);
                $table->dateTime('deleted_at')->nullable();
                $table->text('shipping_address')->nullable();
                $table->timestamps();
                $table->unsignedInteger('added_by')->nullable()->index('invoice_recurring_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('invoice_recurring_last_updated_by_foreign');
                $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
            });

            Schema::create('invoice_recurring_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('invoice_recurring_item_id')->index('invoice_recurring_item_images_invoice_recurring_item_id_foreign');
                $table->string('filename');
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('invoice_recurring_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedBigInteger('invoice_recurring_id')->index('invoice_recurring_items_invoice_recurring_id_foreign');
                $table->string('item_name');
                $table->double('quantity');
                $table->double('unit_price');
                $table->double('amount');
                $table->text('taxes')->nullable();
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->text('item_summary')->nullable();
                $table->timestamps();
                $table->string('hsn_sac_code')->nullable();
            });

            Schema::create('invoice_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('invoice_prefix');
                $table->unsignedInteger('invoice_digit')->default(3);
                $table->string('estimate_prefix')->default('EST');
                $table->unsignedInteger('estimate_digit')->default(3);
                $table->string('credit_note_prefix')->default('CN');
                $table->unsignedInteger('credit_note_digit')->default(3);
                $table->string('template');
                $table->integer('due_after');
                $table->text('invoice_terms');
                $table->text('estimate_terms')->nullable();
                $table->string('gst_number')->nullable();
                $table->enum('show_gst', ['yes', 'no'])->nullable()->default('no');
                $table->timestamps();
                $table->string('logo', 80)->nullable();
                $table->boolean('hsn_sac_code_show')->default(false);
                $table->string('locale')->nullable()->default('en');
                $table->integer('send_reminder')->default(0);
                $table->enum('reminder', ['after', 'every'])->nullable();
                $table->integer('send_reminder_after')->default(0);
                $table->boolean('tax_calculation_msg')->default(false);
                $table->integer('show_project')->default(0);
                $table->enum('show_client_name', ['yes', 'no'])->nullable()->default('no');
                $table->enum('show_client_email', ['yes', 'no'])->nullable()->default('no');
                $table->enum('show_client_phone', ['yes', 'no'])->nullable()->default('no');
                $table->enum('show_client_company_address', ['yes', 'no'])->nullable()->default('no');
                $table->enum('show_client_company_name', ['yes', 'no'])->nullable()->default('no');
            });

            Schema::create('invoices', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('invoices_project_id_foreign');
                $table->unsignedInteger('client_id')->nullable()->index('invoices_client_id_foreign');
                $table->unsignedBigInteger('order_id')->nullable()->index('invoices_order_id_foreign');
                $table->string('invoice_number')->unique();
                $table->date('issue_date');
                $table->date('due_date')->index();
                $table->double('sub_total', 16, 2);
                $table->double('discount')->default(0);
                $table->enum('discount_type', ['percent', 'fixed'])->default('percent');
                $table->double('total', 16, 2);
                $table->unsignedInteger('currency_id')->nullable()->index('invoices_currency_id_foreign');
                $table->enum('status', ['paid', 'unpaid', 'partial', 'canceled', 'draft'])->default('unpaid');
                $table->enum('recurring', ['yes', 'no'])->default('no');
                $table->integer('billing_cycle')->nullable();
                $table->integer('billing_interval')->nullable();
                $table->string('billing_frequency')->nullable();
                $table->string('file')->nullable();
                $table->string('file_original_name')->nullable();
                $table->text('note')->nullable();
                $table->boolean('credit_note')->default(false);
                $table->enum('show_shipping_address', ['yes', 'no'])->default('no');
                $table->timestamps();
                $table->unsignedInteger('estimate_id')->nullable()->index('invoices_estimate_id_foreign');
                $table->boolean('send_status')->default(true);
                $table->double('due_amount', 8, 2)->default(0);
                $table->unsignedInteger('parent_id')->nullable()->index('invoices_parent_id_foreign');
                $table->unsignedBigInteger('invoice_recurring_id')->nullable()->index('invoices_invoice_recurring_id_foreign');
                $table->unsignedInteger('created_by')->nullable()->index('invoices_created_by_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('invoices_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('invoices_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
                $table->unsignedBigInteger('company_address_id')->nullable()->index('invoices_company_address_id_foreign');
                $table->text('event_id')->nullable();
                $table->string('custom_invoice_number')->nullable();
            });

            Schema::create('issues', function (Blueprint $table) {
                $table->increments('id');
                $table->mediumText('description');
                $table->unsignedInteger('user_id')->nullable()->index('issues_user_id_foreign');
                $table->unsignedInteger('project_id')->nullable()->index('issues_project_id_foreign');
                $table->enum('status', ['pending', 'resolved'])->default('pending');
                $table->timestamps();
            });

            Schema::create('job_batches', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->string('name');
                $table->integer('total_jobs');
                $table->integer('pending_jobs');
                $table->integer('failed_jobs');
                $table->text('failed_job_ids');
                $table->mediumText('options')->nullable();
                $table->integer('cancelled_at')->nullable();
                $table->integer('created_at');
                $table->integer('finished_at')->nullable();
            });

            Schema::create('jobs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('queue')->index();
                $table->longText('payload');
                $table->unsignedTinyInteger('attempts');
                $table->unsignedInteger('reserved_at')->nullable();
                $table->unsignedInteger('available_at');
                $table->unsignedInteger('created_at');
            });

            Schema::create('knowledge_bases', function (Blueprint $table) {
                $table->increments('id');
                $table->string('to')->default('employee');
                $table->string('heading')->nullable();
                $table->unsignedInteger('category_id')->nullable()->index('knowledge_bases_category_id_foreign');
                $table->mediumText('description')->nullable();
                $table->unsignedInteger('added_by');
                $table->timestamps();
            });

            Schema::create('knowledge_categories', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->timestamps();
            });

            Schema::create('language_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('language_code');
                $table->string('language_name');
                $table->enum('status', ['enabled', 'disabled']);
                $table->timestamps();
            });

            Schema::create('lead_agents', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('lead_agents_user_id_foreign');
                $table->enum('status', ['enabled', 'disabled'])->default('enabled');
                $table->unsignedInteger('added_by')->nullable()->index('lead_agents_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_agents_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_category', function (Blueprint $table) {
                $table->increments('id');
                $table->string('category_name');
                $table->unsignedInteger('added_by')->nullable()->index('lead_category_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_category_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_custom_forms', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('custom_fields_id')->nullable()->index('lead_custom_forms_custom_fields_id_foreign');
                $table->string('field_display_name');
                $table->string('field_name');
                $table->integer('field_order');
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->boolean('required')->default(false);
                $table->unsignedInteger('added_by')->nullable()->index('lead_custom_forms_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_custom_forms_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('lead_id')->index('lead_files_lead_id_foreign');
                $table->unsignedInteger('user_id')->index('lead_files_user_id_foreign');
                $table->string('filename', 200);
                $table->string('hashname', 200);
                $table->string('size', 200);
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('lead_files_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_files_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_follow_up', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('lead_id')->index('lead_follow_up_lead_id_foreign');
                $table->longText('remark')->nullable();
                $table->dateTime('next_follow_up_date')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('lead_follow_up_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_follow_up_last_updated_by_foreign');
                $table->text('event_id')->nullable();
                $table->enum('send_reminder', ['yes', 'no'])->nullable()->default('no');
                $table->text('remind_time')->nullable();
                $table->enum('remind_type', ['minute', 'hour', 'day'])->nullable();
                $table->timestamps();
            });

            Schema::create('lead_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('lead_id')->nullable()->index('lead_notes_lead_id_foreign');
                $table->string('title');
                $table->boolean('type')->default(false);
                $table->unsignedInteger('member_id')->nullable()->index('lead_notes_member_id_foreign');
                $table->boolean('is_lead_show')->default(false);
                $table->boolean('ask_password')->default(false);
                $table->string('details');
                $table->unsignedInteger('added_by')->nullable()->index('lead_notes_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_notes_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_sources', function (Blueprint $table) {
                $table->increments('id');
                $table->string('type')->unique();
                $table->unsignedInteger('added_by')->nullable()->index('lead_sources_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('lead_sources_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('lead_status', function (Blueprint $table) {
                $table->increments('id');
                $table->string('type')->unique();
                $table->integer('priority');
                $table->boolean('default');
                $table->string('label_color')->default('#ff0000');
                $table->timestamps();
            });

            Schema::create('lead_user_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('lead_user_notes_user_id_foreign');
                $table->unsignedInteger('lead_note_id')->index('lead_user_notes_lead_note_id_foreign');
                $table->timestamps();
            });

            Schema::create('leads', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('client_id')->nullable();
                $table->integer('source_id')->nullable();
                $table->integer('status_id')->nullable();
                $table->integer('column_priority');
                $table->unsignedBigInteger('agent_id')->nullable()->index('leads_agent_id_foreign');
                $table->string('company_name')->nullable();
                $table->string('website')->nullable();
                $table->text('address')->nullable();
                $table->enum('salutation', ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'])->nullable();
                $table->string('client_name');
                $table->string('client_email')->nullable();
                $table->string('mobile')->nullable();
                $table->string('cell')->nullable();
                $table->string('office')->nullable();
                $table->string('city')->nullable();
                $table->string('state')->nullable();
                $table->string('country')->nullable();
                $table->string('postal_code')->nullable();
                $table->text('note')->nullable();
                $table->enum('next_follow_up', ['yes', 'no'])->default('yes');
                $table->double('value')->nullable()->default(0);
                $table->unsignedInteger('currency_id')->nullable()->index('leads_currency_id_foreign');
                $table->unsignedInteger('category_id')->nullable()->index('leads_category_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('leads_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('leads_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->timestamps();
            });

            Schema::create('leave_types', function (Blueprint $table) {
                $table->increments('id');
                $table->string('type_name');
                $table->string('color');
                $table->integer('no_of_leaves')->default(5);
                $table->boolean('paid')->default(true);
                $table->integer('monthly_limit')->default(0);
                $table->timestamps();
            });

            Schema::create('leaves', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('leaves_user_id_foreign');
                $table->unsignedInteger('leave_type_id')->index('leaves_leave_type_id_foreign');
                $table->string('duration');
                $table->date('leave_date')->index();
                $table->text('reason');
                $table->enum('status', ['approved', 'pending', 'rejected']);
                $table->text('reject_reason')->nullable();
                $table->boolean('paid')->default(false);
                $table->unsignedInteger('added_by')->nullable()->index('leaves_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('leaves_last_updated_by_foreign');
                $table->text('event_id')->nullable();
                $table->unsignedInteger('approved_by')->nullable()->index('leaves_approved_by_foreign');
                $table->dateTime('approved_at')->nullable();
                $table->string('half_day_type')->nullable();
                $table->timestamps();
            });

            Schema::create('log_time_for', function (Blueprint $table) {
                $table->increments('id');
                $table->enum('log_time_for', ['project', 'task'])->default('project');
                $table->enum('auto_timer_stop', ['yes', 'no'])->default('no');
                $table->boolean('approval_required');
                $table->timestamps();
            });

            Schema::create('ltm_translations', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('status')->default(0);
                $table->string('locale');
                $table->string('group');
                $table->string('key');
                $table->text('value')->nullable();
                $table->timestamps();
            });

            Schema::create('menu_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->longText('main_menu')->nullable();
                $table->longText('default_main_menu')->nullable();
                $table->longText('setting_menu')->nullable();
                $table->longText('default_setting_menu')->nullable();
                $table->timestamps();
            });

            Schema::create('menus', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('menu_name', 100);
                $table->string('translate_name')->nullable();
                $table->string('route', 100)->nullable();
                $table->string('module')->nullable();
                $table->string('icon')->nullable();
                $table->boolean('setting_menu')->nullable();
                $table->timestamps();
            });

            Schema::create('message_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->enum('allow_client_admin', ['yes', 'no'])->default('no');
                $table->enum('allow_client_employee', ['yes', 'no'])->default('no');
                $table->enum('restrict_client', ['yes', 'no'])->default('no');
                $table->timestamps();
            });

            Schema::create('module_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('module_name');
                $table->enum('status', ['active', 'deactive']);
                $table->enum('type', ['admin', 'employee', 'client'])->default('admin');
                $table->timestamps();
            });

            Schema::create('modules', function (Blueprint $table) {
                $table->increments('id');
                $table->string('module_name');
                $table->string('description')->nullable();
                $table->timestamps();
            });

            Schema::create('notice_views', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('notice_id')->index('notice_views_notice_id_foreign');
                $table->unsignedInteger('user_id')->index('notice_views_user_id_foreign');
                $table->boolean('read')->default(false);
                $table->timestamps();
            });

            Schema::create('notices', function (Blueprint $table) {
                $table->increments('id');
                $table->string('to')->default('employee');
                $table->string('heading');
                $table->mediumText('description')->nullable();
                $table->unsignedInteger('department_id')->nullable()->index('notices_department_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('notices_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('notices_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('notifications', function (Blueprint $table) {
                $table->char('id', 36)->primary();
                $table->string('type');
                $table->string('notifiable_type');
                $table->unsignedBigInteger('notifiable_id');
                $table->text('data');
                $table->timestamp('read_at')->nullable();
                $table->timestamps();

                $table->index(['notifiable_type', 'notifiable_id']);

            });

            Schema::create('offline_payment_methods', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->longText('description')->nullable();
                $table->enum('status', ['yes', 'no'])->nullable()->default('yes');
                $table->timestamps();
            });

            Schema::create('order_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedBigInteger('order_item_id')->nullable()->index();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('order_items', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('order_id')->index('order_items_order_id_foreign');
                $table->unsignedInteger('product_id')->nullable()->index('order_items_product_id_foreign');
                $table->string('item_name');
                $table->text('item_summary')->nullable();
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->double('quantity', 16, 2);
                $table->integer('unit_price');
                $table->double('amount', 8, 2);
                $table->string('hsn_sac_code')->nullable();
                $table->string('taxes')->nullable();
                $table->timestamps();
            });

            Schema::create('orders', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('client_id')->nullable()->index('orders_client_id_foreign');
                $table->date('order_date');
                $table->double('sub_total', 8, 2);
                $table->double('discount')->default(0);
                $table->enum('discount_type', ['percent', 'fixed'])->default('percent');
                $table->double('total', 8, 2);
                $table->enum('status', ['pending', 'on-hold', 'failed', 'processing', 'completed', 'canceled', 'refunded'])->default('pending');
                $table->unsignedInteger('currency_id')->nullable()->index('orders_currency_id_foreign');
                $table->enum('show_shipping_address', ['yes', 'no'])->default('no');
                $table->string('note')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('orders_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('orders_last_updated_by_foreign');
                $table->unsignedBigInteger('company_address_id')->nullable()->index('orders_company_address_id_foreign');
                $table->timestamps();
            });


            Schema::create('password_resets', function (Blueprint $table) {
                $table->string('email')->index();
                $table->string('token')->index();
                $table->timestamp('created_at')->nullable();
            });

            Schema::create('payment_gateway_credentials', function (Blueprint $table) {
                $table->increments('id');
                $table->string('paypal_client_id')->nullable();
                $table->string('paypal_secret')->nullable();
                $table->enum('paypal_status', ['active', 'deactive'])->default('active');
                $table->string('live_stripe_client_id')->nullable();
                $table->string('live_stripe_secret')->nullable();
                $table->string('live_stripe_webhook_secret')->nullable();
                $table->enum('stripe_status', ['active', 'deactive'])->default('active');
                $table->timestamps();
                $table->string('live_razorpay_key')->nullable();
                $table->string('live_razorpay_secret')->nullable();
                $table->enum('razorpay_status', ['active', 'inactive'])->default('inactive');
                $table->enum('paypal_mode', ['sandbox', 'live'])->default('sandbox');
                $table->string('sandbox_paypal_client_id')->nullable();
                $table->string('sandbox_paypal_secret')->nullable();
                $table->string('test_stripe_client_id')->nullable();
                $table->string('test_stripe_secret')->nullable();
                $table->string('test_razorpay_key')->nullable();
                $table->string('test_razorpay_secret')->nullable();
                $table->string('test_stripe_webhook_secret')->nullable();
                $table->enum('stripe_mode', ['test', 'live'])->default('test');
                $table->enum('razorpay_mode', ['test', 'live'])->default('test');
                $table->string('paystack_key')->nullable();
                $table->string('paystack_secret')->nullable();
                $table->string('paystack_merchant_email')->nullable();
                $table->enum('paystack_status', ['active', 'deactive'])->nullable()->default('deactive');
                $table->enum('paystack_mode', ['sandbox', 'live'])->default('sandbox');
                $table->string('test_paystack_key')->nullable();
                $table->string('test_paystack_secret')->nullable();
                $table->string('test_paystack_merchant_email')->nullable();
                $table->string('paystack_payment_url')->nullable()->default('https://api.paystack.co');
                $table->string('mollie_api_key')->nullable();
                $table->enum('mollie_status', ['active', 'deactive'])->nullable()->default('deactive');
                $table->string('payfast_merchant_id')->nullable();
                $table->string('payfast_merchant_key')->nullable();
                $table->string('payfast_passphrase')->nullable();
                $table->enum('payfast_mode', ['sandbox', 'live'])->default('sandbox');
                $table->enum('payfast_status', ['active', 'deactive'])->nullable()->default('deactive');
                $table->string('authorize_api_login_id')->nullable();
                $table->string('authorize_transaction_key')->nullable();
                $table->enum('authorize_environment', ['sandbox', 'live'])->default('sandbox');
                $table->enum('authorize_status', ['active', 'deactive'])->default('deactive');
                $table->string('square_application_id')->nullable();
                $table->string('square_access_token')->nullable();
                $table->string('square_location_id')->nullable();
                $table->enum('square_environment', ['sandbox', 'production'])->default('sandbox');
                $table->enum('square_status', ['active', 'deactive'])->default('deactive');
                $table->enum('flutterwave_status', ['active', 'deactive'])->default('deactive');
                $table->enum('flutterwave_mode', ['sandbox', 'live'])->default('sandbox');
                $table->string('test_flutterwave_key')->nullable();
                $table->string('test_flutterwave_secret')->nullable();
                $table->string('test_flutterwave_hash')->nullable();
                $table->string('live_flutterwave_key')->nullable();
                $table->string('live_flutterwave_secret')->nullable();
                $table->string('live_flutterwave_hash')->nullable();
                $table->string('flutterwave_webhook_secret_hash')->nullable();
            });

            Schema::create('payments', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('payments_project_id_foreign');
                $table->unsignedInteger('invoice_id')->nullable()->index('payments_invoice_id_foreign');
                $table->unsignedBigInteger('order_id')->nullable()->index('payments_order_id_foreign');
                $table->unsignedInteger('credit_notes_id')->nullable()->index('payments_credit_notes_id_foreign');
                $table->double('amount');
                $table->string('gateway')->nullable();
                $table->string('transaction_id')->nullable()->unique();
                $table->unsignedInteger('currency_id')->nullable()->index('payments_currency_id_foreign');
                $table->string('plan_id')->nullable()->unique();
                $table->string('customer_id')->nullable();
                $table->string('event_id')->nullable()->unique();
                $table->enum('status', ['complete', 'pending', 'failed'])->default('pending');
                $table->dateTime('paid_on')->nullable()->index();
                $table->text('remarks')->nullable();
                $table->timestamps();
                $table->unsignedInteger('offline_method_id')->nullable()->index('payments_offline_method_id_foreign');
                $table->string('bill')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('payments_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('payments_last_updated_by_foreign');
                $table->text('payment_gateway_response')->nullable()->comment('null = success');
                $table->string('payload_id')->nullable();
            });

            Schema::create('permission_role', function (Blueprint $table) {
                $table->unsignedInteger('permission_id');
                $table->unsignedInteger('role_id')->index('permission_role_role_id_foreign');
                $table->unsignedBigInteger('permission_type_id')->default(5)->index('permission_role_permission_type_id_foreign');

                $table->primary(['permission_id', 'role_id']);
            });

            Schema::create('permission_types', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->timestamps();
            });

            Schema::create('permissions', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->unique();
                $table->string('display_name')->nullable();
                $table->string('description')->nullable();
                $table->unsignedInteger('module_id')->index('permissions_module_id_foreign');
                $table->timestamps();
                $table->boolean('is_custom')->default(false);
                $table->text('allowed_permissions')->nullable();
            });

            Schema::create('pinned', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('project_id')->nullable()->index('pinned_project_id_foreign');
                $table->unsignedInteger('task_id')->nullable()->index('pinned_task_id_foreign');
                $table->unsignedInteger('user_id')->index('pinned_user_id_foreign');
                $table->timestamps();
            });

            Schema::create('product_category', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('category_name');
                $table->timestamps();
            });

            Schema::create('product_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('product_id')->index('product_files_product_id_foreign');
                $table->string('filename', 200)->nullable();
                $table->string('hashname', 200)->nullable();
                $table->string('size', 200)->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('product_files_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('product_files_last_updated_by_foreign');
            });

            Schema::create('product_sub_category', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedBigInteger('category_id')->index('product_sub_category_category_id_foreign');
                $table->string('category_name');
                $table->timestamps();
            });

            Schema::create('products', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('price');
                $table->string('taxes')->nullable();
                $table->boolean('allow_purchase')->default(false);
                $table->boolean('downloadable')->default(false);
                $table->string('downloadable_file')->nullable();
                $table->text('description')->nullable();
                $table->unsignedBigInteger('category_id')->nullable()->index('products_category_id_foreign');
                $table->unsignedBigInteger('sub_category_id')->nullable()->index('products_sub_category_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('products_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('products_last_updated_by_foreign');
                $table->string('hsn_sac_code')->nullable();
                $table->string('default_image')->nullable();
                $table->timestamps();
            });

            Schema::create('project_activity', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->index('project_activity_project_id_foreign');
                $table->text('activity');
                $table->timestamp('created_at')->nullable()->index();
                $table->timestamp('updated_at')->nullable();
            });

            Schema::create('project_category', function (Blueprint $table) {
                $table->increments('id');
                $table->string('category_name');
                $table->unsignedInteger('added_by')->nullable()->index('project_category_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_category_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('project_files_user_id_foreign');
                $table->unsignedInteger('project_id')->index('project_files_project_id_foreign');
                $table->string('filename');
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->text('external_link')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('project_files_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_files_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_members', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('project_members_user_id_foreign');
                $table->unsignedInteger('project_id')->index('project_members_project_id_foreign');
                $table->double('hourly_rate');
                $table->unsignedInteger('added_by')->nullable()->index('project_members_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_members_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_milestones', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('project_milestones_project_id_foreign');
                $table->unsignedInteger('currency_id')->nullable()->index('project_milestones_currency_id_foreign');
                $table->string('milestone_title');
                $table->mediumText('summary');
                $table->double('cost', 16, 2);
                $table->enum('status', ['complete', 'incomplete'])->default('incomplete');
                $table->boolean('invoice_created');
                $table->integer('invoice_id')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('project_milestones_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_milestones_last_updated_by_foreign');
                $table->date('start_date')->nullable();
                $table->date('end_date')->nullable();
                $table->timestamps();
            });

            Schema::create('project_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('project_notes_project_id_foreign');
                $table->string('title');
                $table->boolean('type')->default(false);
                $table->unsignedInteger('client_id')->nullable()->index('project_notes_client_id_foreign');
                $table->boolean('is_client_show')->default(false);
                $table->boolean('ask_password')->default(false);
                $table->longText('details');
                $table->unsignedInteger('added_by')->nullable()->index('project_notes_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_notes_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_ratings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('project_id')->index('project_ratings_project_id_foreign');
                $table->double('rating')->default(0);
                $table->text('comment')->nullable();
                $table->unsignedInteger('user_id')->index('project_ratings_user_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('project_ratings_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_ratings_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->enum('send_reminder', ['yes', 'no']);
                $table->integer('remind_time');
                $table->string('remind_type');
                $table->string('remind_to')->default('["admins","members"]');
                $table->timestamps();
            });

            Schema::create('project_template_members', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('project_template_members_user_id_foreign');
                $table->unsignedInteger('project_template_id')->index('project_template_members_project_template_id_foreign');
                $table->timestamps();
            });

            Schema::create('project_template_sub_tasks', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('project_template_task_id')->index('project_template_sub_tasks_project_template_task_id_foreign');
                $table->text('title');
                $table->dateTime('start_date')->nullable();
                $table->dateTime('due_date')->nullable();
                $table->enum('status', ['incomplete', 'complete'])->default('incomplete');
                $table->timestamps();
            });

            Schema::create('project_template_task_users', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('project_template_task_id')->index('project_template_task_users_project_template_task_id_foreign');
                $table->unsignedInteger('user_id')->index('project_template_task_users_user_id_foreign');
                $table->timestamps();
            });

            Schema::create('project_template_tasks', function (Blueprint $table) {
                $table->increments('id');
                $table->string('heading');
                $table->mediumText('description')->nullable();
                $table->unsignedInteger('project_template_id')->index('project_template_tasks_project_template_id_foreign');
                $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
                $table->unsignedInteger('project_template_task_category_id')->nullable()->index('project_template_tasks_project_template_task_category_id_foreign');
                $table->timestamps();
            });

            Schema::create('project_templates', function (Blueprint $table) {
                $table->increments('id');
                $table->string('project_name');
                $table->unsignedInteger('category_id')->nullable()->index('project_templates_category_id_foreign');
                $table->unsignedInteger('client_id')->nullable()->index('project_templates_client_id_foreign');
                $table->mediumText('project_summary')->nullable();
                $table->longText('notes')->nullable();
                $table->mediumText('feedback')->nullable();
                $table->enum('client_view_task', ['enable', 'disable'])->default('disable');
                $table->enum('allow_client_notification', ['enable', 'disable'])->default('disable');
                $table->enum('manual_timelog', ['enable', 'disable'])->default('disable');
                $table->timestamps();
            });

            Schema::create('project_time_log_breaks', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('project_time_log_id')->nullable()->index('project_time_log_breaks_project_time_log_id_foreign');
                $table->dateTime('start_time')->index();
                $table->dateTime('end_time')->nullable()->index();
                $table->text('reason');
                $table->string('total_hours')->nullable();
                $table->string('total_minutes')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('project_time_log_breaks_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_time_log_breaks_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('project_time_logs', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('project_time_logs_project_id_foreign');
                $table->unsignedInteger('task_id')->nullable()->index('project_time_logs_task_id_foreign');
                $table->unsignedInteger('user_id')->index('project_time_logs_user_id_foreign');
                $table->dateTime('start_time')->index();
                $table->dateTime('end_time')->nullable()->index();
                $table->text('memo');
                $table->string('total_hours')->nullable();
                $table->string('total_minutes')->nullable();
                $table->unsignedInteger('edited_by_user')->nullable()->index('project_time_logs_edited_by_user_foreign');
                $table->integer('hourly_rate');
                $table->integer('earnings');
                $table->boolean('approved')->default(true);
                $table->unsignedInteger('approved_by')->nullable()->index('project_time_logs_approved_by_foreign');
                $table->unsignedInteger('invoice_id')->nullable()->index('project_time_logs_invoice_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('project_time_logs_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('project_time_logs_last_updated_by_foreign');
                $table->string('total_break_minutes')->nullable();
                $table->timestamps();
            });

            Schema::create('project_user_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('project_user_notes_user_id_foreign');
                $table->unsignedInteger('project_note_id')->index('project_user_notes_project_note_id_foreign');
                $table->timestamps();
            });

            Schema::create('projects', function (Blueprint $table) {
                $table->increments('id');
                $table->string('project_name');
                $table->longText('project_summary')->nullable();
                $table->unsignedInteger('project_admin')->nullable()->index('projects_project_admin_foreign');
                $table->date('start_date');
                $table->date('deadline')->nullable();
                $table->longText('notes')->nullable();
                $table->unsignedInteger('category_id')->nullable()->index('projects_category_id_foreign');
                $table->unsignedInteger('client_id')->nullable()->index('projects_client_id_foreign');
                $table->unsignedInteger('team_id')->nullable()->index('projects_team_id_foreign');
                $table->mediumText('feedback')->nullable();
                $table->enum('manual_timelog', ['enable', 'disable'])->default('disable');
                $table->enum('client_view_task', ['enable', 'disable'])->default('disable');
                $table->enum('allow_client_notification', ['enable', 'disable'])->default('disable');
                $table->tinyInteger('completion_percent');
                $table->enum('calculate_task_progress', ['true', 'false'])->default('true');

                $table->double('project_budget', 20, 2)->nullable();
                $table->unsignedInteger('currency_id')->nullable()->index('projects_currency_id_foreign');
                $table->double('hours_allocated', 8, 2)->nullable();
                $table->enum('status', ['not started', 'in progress', 'on hold', 'canceled', 'finished', 'under review'])->default('in progress');
                $table->unsignedInteger('added_by')->nullable()->index('projects_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('projects_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->boolean('public');
                $table->timestamps();
                $table->softDeletes()->index();
            });

            Schema::create('proposal_item_images', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('proposal_item_id')->index('proposal_item_images_proposal_item_id_foreign');
                $table->string('filename');
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->timestamps();
            });

            Schema::create('proposal_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('proposal_id')->index('proposal_items_proposal_id_foreign');
                $table->string('item_name');
                $table->enum('type', ['item', 'discount', 'tax'])->default('item');
                $table->double('quantity', 16, 2);
                $table->double('unit_price', 16, 2);
                $table->double('amount', 16, 2);
                $table->text('item_summary')->nullable();
                $table->string('taxes')->nullable();
                $table->string('hsn_sac_code')->nullable();
                $table->timestamps();
            });

            Schema::create('proposal_signs', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('proposal_id')->index('proposal_signs_proposal_id_foreign');
                $table->string('full_name');
                $table->string('email');
                $table->string('signature')->nullable();
                $table->timestamps();
            });

            Schema::create('proposals', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('lead_id')->index('proposals_lead_id_foreign');
                $table->date('valid_till');
                $table->double('sub_total', 16, 2);
                $table->double('total', 16, 2);
                $table->unsignedInteger('currency_id')->nullable()->index('proposals_currency_id_foreign');
                $table->enum('discount_type', ['percent', 'fixed']);
                $table->double('discount');
                $table->boolean('invoice_convert')->default(false);
                $table->enum('status', ['declined', 'accepted', 'waiting'])->default('waiting');
                $table->mediumText('note')->nullable();
                $table->longText('description')->nullable();
                $table->text('client_comment')->nullable();
                $table->boolean('signature_approval')->default(true);
                $table->unsignedInteger('added_by')->nullable()->index('proposals_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('proposals_last_updated_by_foreign');
                $table->text('hash')->nullable();
                $table->enum('calculate_tax', ['after_discount', 'before_discount'])->default('after_discount');
                $table->timestamps();
            });

            Schema::create('purpose_consent', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->text('description')->nullable();
                $table->timestamps();
            });

            Schema::create('purpose_consent_leads', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('lead_id')->index('purpose_consent_leads_lead_id_foreign');
                $table->unsignedInteger('purpose_consent_id')->index('purpose_consent_leads_purpose_consent_id_foreign');
                $table->enum('status', ['agree', 'disagree'])->default('agree');
                $table->string('ip')->nullable();
                $table->unsignedInteger('updated_by_id')->nullable()->index('purpose_consent_leads_updated_by_id_foreign');
                $table->text('additional_description')->nullable();
                $table->timestamps();
            });

            Schema::create('purpose_consent_users', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('client_id')->index('purpose_consent_users_client_id_foreign');
                $table->unsignedInteger('purpose_consent_id')->index('purpose_consent_users_purpose_consent_id_foreign');
                $table->enum('status', ['agree', 'disagree'])->default('agree');
                $table->string('ip')->nullable();
                $table->unsignedInteger('updated_by_id')->index('purpose_consent_users_updated_by_id_foreign');
                $table->text('additional_description')->nullable();
                $table->timestamps();
            });

            Schema::create('push_notification_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->text('onesignal_app_id')->nullable();
                $table->text('onesignal_rest_api_key')->nullable();
                $table->string('notification_logo')->nullable();
                $table->enum('status', ['active', 'inactive'])->default('inactive');
                $table->timestamps();
            });

            Schema::create('push_subscriptions', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index();
                $table->string('endpoint')->unique();
                $table->string('public_key')->nullable();
                $table->string('auth_token')->nullable();
                $table->timestamps();
            });

            Schema::create('pusher_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('pusher_app_id')->nullable();
                $table->string('pusher_app_key')->nullable();
                $table->string('pusher_app_secret')->nullable();
                $table->string('pusher_cluster')->nullable();
                $table->boolean('force_tls');
                $table->boolean('status');
                $table->boolean('taskboard')->default(true);
                $table->boolean('messages')->default(false);
                $table->timestamps();
            });

            Schema::create('quotation_items', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('quotation_id')->index('quotation_items_quotation_id_foreign');
                $table->string('item_name');
                $table->integer('quantity');
                $table->integer('unit_price');
                $table->double('amount', 8, 2);
                $table->string('hsn_sac_code')->nullable();
                $table->timestamps();
            });

            Schema::create('quotations', function (Blueprint $table) {
                $table->increments('id');
                $table->string('business_name');
                $table->string('client_name');
                $table->string('client_email');
                $table->string('phone')->nullable();
                $table->text('address')->nullable();
                $table->double('sub_total', 8, 2);
                $table->double('total', 8, 2);
                $table->timestamps();
            });

            Schema::create('removal_requests', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('description');
                $table->unsignedInteger('user_id')->nullable()->index('removal_requests_user_id_foreign');
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->timestamps();
            });

            Schema::create('removal_requests_lead', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('name');
                $table->string('description');
                $table->unsignedInteger('lead_id')->nullable()->index('removal_requests_lead_lead_id_foreign');
                $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
                $table->timestamps();
            });

            Schema::create('role_user', function (Blueprint $table) {
                $table->unsignedInteger('user_id');
                $table->unsignedInteger('role_id')->index('role_user_role_id_foreign');
                $table->primary(['user_id', 'role_id']);
            });

            Schema::create('roles', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name')->unique();
                $table->string('display_name')->nullable();
                $table->string('description')->nullable();
                $table->timestamps();
            });

            Schema::create('sessions', function (Blueprint $table) {
                $table->string('id')->primary();
                $table->unsignedBigInteger('user_id')->nullable()->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->mediumText('payload');
                $table->integer('last_activity')->index();
            });

            Schema::create('skills', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name', 200);
                $table->timestamps();
            });

            Schema::create('slack_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->text('slack_webhook')->nullable();
                $table->string('slack_logo')->nullable();
                $table->enum('status', ['active', 'inactive'])->default('inactive');
                $table->timestamps();
            });

            Schema::create('smtp_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('mail_driver')->default('smtp');
                $table->string('mail_host')->default('smtp.gmail.com');
                $table->string('mail_port')->default('587');
                $table->string('mail_username')->default('youremail@gmail.com');
                $table->string('mail_password')->default('your password');
                $table->string('mail_from_name')->default('your name');
                $table->string('mail_from_email')->default('from@email.com');
                $table->enum('mail_encryption', ['tls', 'ssl'])->nullable()->default('tls');
                $table->boolean('verified')->default(false);
                $table->enum('mail_connection', ['sync', 'database'])->default('sync');
                $table->timestamps();
            });

            Schema::create('social_auth_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('facebook_client_id')->nullable();
                $table->string('facebook_secret_id')->nullable();
                $table->enum('facebook_status', ['enable', 'disable'])->default('disable');
                $table->string('google_client_id')->nullable();
                $table->string('google_secret_id')->nullable();
                $table->enum('google_status', ['enable', 'disable'])->default('disable');
                $table->string('twitter_client_id')->nullable();
                $table->string('twitter_secret_id')->nullable();
                $table->enum('twitter_status', ['enable', 'disable'])->default('disable');
                $table->string('linkedin_client_id')->nullable();
                $table->string('linkedin_secret_id')->nullable();
                $table->enum('linkedin_status', ['enable', 'disable'])->default('disable');
                $table->timestamps();
            });

            Schema::create('socials', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->nullable();
                $table->text('social_id');
                $table->text('social_service');
                $table->timestamps();
            });

            Schema::create('sticky_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('sticky_notes_user_id_foreign');
                $table->mediumText('note_text');
                $table->enum('colour', ['blue', 'yellow', 'red', 'gray', 'purple', 'green'])->default('blue');
                $table->timestamps();
            });

            Schema::create('sub_task_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->nullable()->index('sub_task_files_user_id_foreign');
                $table->unsignedInteger('sub_task_id')->index('sub_task_files_sub_task_id_foreign');
                $table->string('filename');
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->string('external_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->timestamps();
            });

            Schema::create('sub_tasks', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('task_id')->index('sub_tasks_task_id_foreign');
                $table->text('title');
                $table->dateTime('due_date')->nullable();
                $table->date('start_date')->nullable();
                $table->enum('status', ['incomplete', 'complete'])->default('incomplete');
                $table->unsignedInteger('assigned_to')->nullable()->index('sub_tasks_assigned_to_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('sub_tasks_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('sub_tasks_last_updated_by_foreign');
                $table->text('description')->nullable();
                $table->timestamps();
            });

            Schema::create('task_category', function (Blueprint $table) {
                $table->increments('id');
                $table->string('category_name');
                $table->unsignedInteger('added_by')->nullable()->index('task_category_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('task_category_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('task_comments', function (Blueprint $table) {
                $table->increments('id');
                $table->text('comment');
                $table->unsignedInteger('user_id')->index('task_comments_user_id_foreign');
                $table->unsignedInteger('task_id')->index('task_comments_task_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('task_comments_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('task_comments_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('task_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('task_files_user_id_foreign');
                $table->unsignedInteger('task_id')->index('task_files_task_id_foreign');
                $table->string('filename');
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->string('external_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('task_files_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('task_files_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('task_history', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('task_id')->index('task_history_task_id_foreign');
                $table->unsignedInteger('sub_task_id')->nullable()->index('task_history_sub_task_id_foreign');
                $table->unsignedInteger('user_id')->index('task_history_user_id_foreign');
                $table->text('details');
                $table->unsignedInteger('board_column_id')->nullable()->index('task_history_board_column_id_foreign');
                $table->timestamps();
            });

            Schema::create('task_label_list', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('project_id')->nullable()->index('task_label_list_project_id_foreign');
                $table->string('label_name');
                $table->string('color')->nullable();
                $table->string('description')->nullable();
                $table->timestamps();
            });

            Schema::create('task_labels', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('label_id')->index('task_labels_label_id_foreign');
                $table->unsignedInteger('task_id')->index('task_tags_task_id_foreign');
                $table->timestamps();
            });

            Schema::create('task_notes', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('task_id')->index('task_notes_task_id_foreign');
                $table->integer('user_id')->nullable();
                $table->text('note')->nullable();
                $table->unsignedInteger('added_by')->nullable()->index('task_notes_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('task_notes_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('task_users', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('task_id')->index('task_users_task_id_foreign');
                $table->unsignedInteger('user_id')->index('task_users_user_id_foreign');
                $table->timestamps();
            });

            Schema::create('taskboard_columns', function (Blueprint $table) {
                $table->increments('id');
                $table->string('column_name')->unique();
                $table->string('slug')->nullable();
                $table->string('label_color');
                $table->integer('priority');
                $table->timestamps();
            });

            Schema::create('tasks', function (Blueprint $table) {
                $table->increments('id');
                $table->string('heading');
                $table->longText('description')->nullable();
                $table->date('due_date')->nullable()->index();
                $table->date('start_date')->nullable();
                $table->unsignedInteger('project_id')->nullable()->index('tasks_project_id_foreign');
                $table->unsignedInteger('task_category_id')->nullable()->index('tasks_task_category_id_foreign');
                $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
                $table->enum('status', ['incomplete', 'completed'])->default('incomplete');
                $table->unsignedInteger('board_column_id')->nullable()->default(1)->index('tasks_board_column_id_foreign');
                $table->integer('column_priority');
                $table->dateTime('completed_on')->nullable();
                $table->unsignedInteger('created_by')->nullable()->index('tasks_created_by_foreign');
                $table->unsignedInteger('recurring_task_id')->nullable()->index('tasks_recurring_task_id_foreign');
                $table->unsignedInteger('dependent_task_id')->nullable()->index('tasks_dependent_task_id_foreign');
                $table->unsignedInteger('milestone_id')->nullable()->index('tasks_milestone_id_foreign');
                $table->boolean('is_private')->default(false);
                $table->boolean('billable')->default(true);
                $table->integer('estimate_hours');
                $table->integer('estimate_minutes');
                $table->unsignedInteger('added_by')->nullable()->index('tasks_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('tasks_last_updated_by_foreign');
                $table->string('hash', 64)->nullable();
                $table->boolean('repeat')->default(false);
                $table->boolean('repeat_complete')->default(false);
                $table->integer('repeat_count')->nullable();
                $table->enum('repeat_type', ['day', 'week', 'month', 'year'])->default('day');
                $table->integer('repeat_cycles')->nullable();
                $table->text('event_id')->nullable();
                $table->timestamps();
                $table->softDeletes()->index();
            });

            Schema::create('taxes', function (Blueprint $table) {
                $table->increments('id');
                $table->string('tax_name');
                $table->string('rate_percent');
                $table->timestamps();
                $table->softDeletes();
            });

            Schema::create('teams', function (Blueprint $table) {
                $table->increments('id');
                $table->string('team_name');
                $table->unsignedInteger('added_by')->nullable()->index('teams_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('teams_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('theme_settings', function (Blueprint $table) {
                $table->increments('id');
                $table->string('panel');
                $table->string('header_color');
                $table->string('sidebar_color');
                $table->string('sidebar_text_color');
                $table->string('link_color')->default('#ffffff');
                $table->longText('user_css')->nullable();
                $table->enum('sidebar_theme', ['dark', 'light'])->default('dark');
                $table->timestamps();
            });

            Schema::create('ticket_agent_groups', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('agent_id')->index('ticket_agent_groups_agent_id_foreign');
                $table->unsignedInteger('group_id')->nullable()->index('ticket_agent_groups_group_id_foreign');
                $table->enum('status', ['enabled', 'disabled'])->default('enabled');
                $table->unsignedInteger('added_by')->nullable()->index('ticket_agent_groups_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('ticket_agent_groups_last_updated_by_foreign');
                $table->timestamps();
            });

            Schema::create('ticket_channels', function (Blueprint $table) {
                $table->increments('id');
                $table->string('channel_name')->unique();
                $table->timestamps();
            });

            Schema::create('ticket_custom_forms', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('custom_fields_id')->nullable()->index('ticket_custom_forms_custom_fields_id_foreign');
                $table->string('field_display_name');
                $table->string('field_name');
                $table->string('field_type')->default('text');
                $table->integer('field_order');
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->boolean('required')->default(false);
                $table->timestamps();
            });

            Schema::create('ticket_email_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('mail_username')->nullable();
                $table->string('mail_password')->nullable();
                $table->string('mail_from_name')->nullable();
                $table->string('mail_from_email')->nullable();
                $table->string('imap_host')->nullable();
                $table->string('imap_port')->nullable();
                $table->string('imap_encryption')->nullable();
                $table->boolean('status');
                $table->boolean('verified');
                $table->integer('sync_interval')->default(1);
                $table->timestamps();
            });

            Schema::create('ticket_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('ticket_files_user_id_foreign');
                $table->unsignedInteger('ticket_reply_id')->index('ticket_files_ticket_reply_id_foreign');
                $table->string('filename');
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('dropbox_link')->nullable();
                $table->string('external_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->timestamps();
            });

            Schema::create('ticket_groups', function (Blueprint $table) {
                $table->increments('id');
                $table->string('group_name');
                $table->timestamps();
            });

            Schema::create('ticket_replies', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('ticket_id')->index('ticket_replies_ticket_id_foreign');
                $table->unsignedInteger('user_id')->index('ticket_replies_user_id_foreign');
                $table->mediumText('message')->nullable();
                $table->softDeletes();
                $table->string('imap_message_id')->nullable();
                $table->string('imap_message_uid')->nullable();
                $table->string('imap_in_reply_to')->nullable();
                $table->timestamps();
            });

            Schema::create('ticket_reply_templates', function (Blueprint $table) {
                $table->increments('id');
                $table->mediumText('reply_heading');
                $table->mediumText('reply_text');
                $table->timestamps();
            });

            Schema::create('ticket_tag_list', function (Blueprint $table) {
                $table->increments('id');
                $table->string('tag_name');
                $table->timestamps();
            });

            Schema::create('ticket_tags', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('tag_id')->index('ticket_tags_tag_id_foreign');
                $table->unsignedInteger('ticket_id')->index('ticket_tags_ticket_id_foreign');
                $table->timestamps();
            });

            Schema::create('ticket_types', function (Blueprint $table) {
                $table->increments('id');
                $table->string('type')->unique();
                $table->timestamps();
            });

            Schema::create('tickets', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('tickets_user_id_foreign');
                $table->text('subject');
                $table->enum('status', ['open', 'pending', 'resolved', 'closed'])->default('open');
                $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
                $table->unsignedInteger('agent_id')->nullable()->index('tickets_agent_id_foreign');
                $table->unsignedInteger('channel_id')->nullable()->index('tickets_channel_id_foreign');
                $table->unsignedInteger('type_id')->nullable()->index('tickets_type_id_foreign');
                $table->date('close_date')->nullable();
                $table->softDeletes();
                $table->string('mobile')->nullable();
                $table->unsignedInteger('country_id')->nullable()->index('tickets_country_id_foreign');
                $table->unsignedInteger('added_by')->nullable()->index('tickets_added_by_foreign');
                $table->unsignedInteger('last_updated_by')->nullable()->index('tickets_last_updated_by_foreign');
                $table->timestamp('created_at')->nullable();
                $table->timestamp('updated_at')->nullable()->index();
            });

            Schema::create('translate_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('google_key')->nullable();
                $table->timestamps();
            });

            Schema::create('universal_search', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('searchable_id');
                $table->enum('module_type', ['ticket', 'invoice', 'notice', 'proposal', 'task', 'creditNote', 'client', 'employee', 'project', 'estimate', 'lead'])->nullable();
                $table->string('title');
                $table->string('route_name');
                $table->timestamps();
            });

            Schema::create('user_activities', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('user_activities_user_id_foreign');
                $table->text('activity');
                $table->timestamp('created_at')->nullable()->index();
                $table->timestamp('updated_at')->nullable();
            });

            Schema::create('user_invitations', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('user_invitations_user_id_foreign');
                $table->enum('invitation_type', ['email', 'link'])->default('email');
                $table->string('email')->nullable();
                $table->string('invitation_code');
                $table->enum('status', ['active', 'inactive'])->default('active');
                $table->string('email_restriction')->nullable();
                $table->text('message')->nullable();
                $table->timestamps();
            });

            Schema::create('user_leadboard_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('user_leadboard_settings_user_id_foreign');
                $table->unsignedInteger('board_column_id')->index('user_leadboard_settings_board_column_id_foreign');
                $table->boolean('collapsed')->default(false);
                $table->timestamps();
            });

            Schema::create('user_permissions', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('user_permissions_user_id_foreign');
                $table->unsignedInteger('permission_id')->index('user_permissions_permission_id_foreign');
                $table->unsignedBigInteger('permission_type_id')->index('user_permissions_permission_type_id_foreign');
                $table->timestamps();
            });

            Schema::create('user_taskboard_settings', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->unsignedInteger('user_id')->index('user_taskboard_settings_user_id_foreign');
                $table->unsignedInteger('board_column_id')->index('user_taskboard_settings_board_column_id_foreign');
                $table->boolean('collapsed')->default(false);
                $table->timestamps();
            });

            Schema::create('users', function (Blueprint $table) {
                $table->increments('id');
                $table->string('name');
                $table->string('email')->nullable()->unique();
                $table->string('password');
                $table->text('two_factor_secret')->nullable();
                $table->text('two_factor_recovery_codes')->nullable();
                $table->boolean('two_factor_confirmed')->default(false);
                $table->boolean('two_factor_email_confirmed')->default(false);
                $table->rememberToken();
                $table->string('image')->nullable();
                $table->string('mobile')->nullable();
                $table->enum('gender', ['male', 'female', 'others'])->nullable();
                $table->enum('salutation', ['mr', 'mrs', 'miss', 'dr', 'sir', 'madam'])->nullable();
                $table->string('locale')->default('en');
                $table->enum('status', ['active', 'deactive'])->default('active');
                $table->enum('login', ['enable', 'disable'])->default('enable');
                $table->text('onesignal_player_id')->nullable();
                $table->timestamp('last_login')->nullable();
                $table->boolean('email_notifications')->default(true);
                $table->unsignedInteger('country_id')->nullable()->index('users_country_id_foreign');
                $table->boolean('dark_theme');
                $table->boolean('rtl');
                $table->enum('two_fa_verify_via', ['email', 'google_authenticator', 'both'])->nullable();
                $table->string('two_factor_code')->nullable()->comment('when authenticator is email');
                $table->dateTime('two_factor_expires_at')->nullable();
                $table->boolean('admin_approval')->default(true);
                $table->boolean('permission_sync')->default(true);
                $table->boolean('google_calendar_status')->default(true);
                $table->timestamps();
            });

            Schema::create('users_chat', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_one')->index('users_chat_user_one_foreign');
                $table->unsignedInteger('user_id')->index('users_chat_user_id_foreign');
                $table->mediumText('message')->nullable();
                $table->unsignedInteger('from')->nullable()->index('users_chat_from_foreign');
                $table->unsignedInteger('to')->nullable()->index('users_chat_to_foreign');
                $table->enum('message_seen', ['yes', 'no'])->default('no');
                $table->timestamps();
            });

            Schema::create('users_chat_files', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('user_id')->index('users_chat_files_user_id_foreign');
                $table->unsignedInteger('users_chat_id')->index('users_chat_files_users_chat_id_foreign');
                $table->string('filename');
                $table->text('description')->nullable();
                $table->string('google_url')->nullable();
                $table->string('hashname')->nullable();
                $table->string('size')->nullable();
                $table->string('external_link')->nullable();
                $table->string('external_link_name')->nullable();
                $table->timestamps();
            });

            // Foreign Keys
            Schema::table('accept_estimates', function (Blueprint $table) {
                $table->foreign(['estimate_id'])->references(['id'])->on('estimates')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('attendance_settings', function (Blueprint $table) {
                $table->foreign(['default_employee_shift'])->references(['id'])->on('employee_shifts')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('attendances', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['employee_shift_id'])->references(['id'])->on('employee_shifts')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['location_id'])->references(['id'])->on('company_addresses')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_contacts', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_details', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['category_id'])->references(['id'])->on('client_categories')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['sub_category_id'])->references(['id'])->on('client_sub_categories')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_docs', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_notes', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['member_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_sub_categories', function (Blueprint $table) {
                $table->foreign(['category_id'])->references(['id'])->on('client_categories')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('client_user_notes', function (Blueprint $table) {
                $table->foreign(['client_note_id'])->references(['id'])->on('client_notes')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('contract_discussions', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['contract_id'])->references(['id'])->on('contracts')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['from'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('contract_files', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['contract_id'])->references(['id'])->on('contracts')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('contract_renews', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['contract_id'])->references(['id'])->on('contracts')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['renewed_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('contract_signs', function (Blueprint $table) {
                $table->foreign(['contract_id'])->references(['id'])->on('contracts')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('contracts', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['contract_type_id'])->references(['id'])->on('contract_types')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('conversation', function (Blueprint $table) {
                $table->foreign(['user_one'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_two'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('conversation_reply', function (Blueprint $table) {
                $table->foreign(['conversation_id'])->references(['id'])->on('conversation')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('credit_note_item_images', function (Blueprint $table) {
                $table->foreign(['credit_note_item_id'])->references(['id'])->on('credit_note_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('credit_note_items', function (Blueprint $table) {
                $table->foreign(['credit_note_id'])->references(['id'])->on('credit_notes')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('credit_notes', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('custom_fields', function (Blueprint $table) {
                $table->foreign(['custom_field_group_id'])->references(['id'])->on('custom_field_groups')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('custom_fields_data', function (Blueprint $table) {
                $table->foreign(['custom_field_id'])->references(['id'])->on('custom_fields')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('designations', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('discussion_files', function (Blueprint $table) {
                $table->foreign(['discussion_id'])->references(['id'])->on('discussions')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['discussion_reply_id'])->references(['id'])->on('discussion_replies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('discussion_replies', function (Blueprint $table) {
                $table->foreign(['discussion_id'])->references(['id'])->on('discussions')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('discussions', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['best_answer_id'])->references(['id'])->on('discussion_replies')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['discussion_category_id'])->references(['id'])->on('discussion_categories')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_reply_by_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('emergency_contacts', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_details', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['department_id'])->references(['id'])->on('teams')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['designation_id'])->references(['id'])->on('designations')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['reporting_to'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_docs', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_leave_quotas', function (Blueprint $table) {
                $table->foreign(['leave_type_id'])->references(['id'])->on('leave_types')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_shift_change_requests', function (Blueprint $table) {
                $table->foreign(['employee_shift_id'])->references(['id'])->on('employee_shifts')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['shift_schedule_id'])->references(['id'])->on('employee_shift_schedules')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_shift_schedules', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['employee_shift_id'])->references(['id'])->on('employee_shifts')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_skills', function (Blueprint $table) {
                $table->foreign(['skill_id'])->references(['id'])->on('skills')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('employee_teams', function (Blueprint $table) {
                $table->foreign(['team_id'])->references(['id'])->on('teams')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('estimate_item_images', function (Blueprint $table) {
                $table->foreign(['estimate_item_id'])->references(['id'])->on('estimate_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('estimate_items', function (Blueprint $table) {
                $table->foreign(['estimate_id'])->references(['id'])->on('estimates')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('estimates', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('event_attendees', function (Blueprint $table) {
                $table->foreign(['event_id'])->references(['id'])->on('events')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('events', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('expenses', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['approver_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['category_id'])->references(['id'])->on('expenses_category')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['created_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['expenses_recurring_id'])->references(['id'])->on('expenses_recurring')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('expenses_category', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('expenses_category_roles', function (Blueprint $table) {
                $table->foreign(['expenses_category_id'])->references(['id'])->on('expenses_category')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['role_id'])->references(['id'])->on('roles')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('expenses_recurring', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['category_id'])->references(['id'])->on('expenses_category')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['created_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('holidays', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('invoice_item_images', function (Blueprint $table) {
                $table->foreign(['invoice_item_id'])->references(['id'])->on('invoice_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('invoice_items', function (Blueprint $table) {
                $table->foreign(['invoice_id'])->references(['id'])->on('invoices')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('invoice_recurring', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['created_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('invoice_recurring_item_images', function (Blueprint $table) {
                $table->foreign(['invoice_recurring_item_id'])->references(['id'])->on('invoice_recurring_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('invoice_recurring_items', function (Blueprint $table) {
                $table->foreign(['invoice_recurring_id'])->references(['id'])->on('invoice_recurring')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('invoices', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['company_address_id'])->references(['id'])->on('company_addresses')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['created_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['estimate_id'])->references(['id'])->on('estimates')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['invoice_recurring_id'])->references(['id'])->on('invoice_recurring')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['order_id'])->references(['id'])->on('orders')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['parent_id'])->references(['id'])->on('invoices')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('issues', function (Blueprint $table) {
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('knowledge_bases', function (Blueprint $table) {
                $table->foreign(['category_id'])->references(['id'])->on('knowledge_categories')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('lead_agents', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('lead_category', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('lead_custom_forms', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['custom_fields_id'])->references(['id'])->on('custom_fields')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('lead_files', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('lead_follow_up', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('lead_notes', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['member_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('lead_sources', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('lead_user_notes', function (Blueprint $table) {
                $table->foreign(['lead_note_id'])->references(['id'])->on('lead_notes')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('leads', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['agent_id'])->references(['id'])->on('lead_agents')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['category_id'])->references(['id'])->on('lead_category')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('leaves', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['approved_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['leave_type_id'])->references(['id'])->on('leave_types')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('notice_views', function (Blueprint $table) {
                $table->foreign(['notice_id'])->references(['id'])->on('notices')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('notices', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['department_id'])->references(['id'])->on('teams')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('order_item_images', function (Blueprint $table) {
                $table->foreign(['order_item_id'])->references(['id'])->on('order_items')->onUpdate('NO ACTION')->onDelete('CASCADE');
            });

            Schema::table('order_items', function (Blueprint $table) {
                $table->foreign(['order_id'])->references(['id'])->on('orders')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['product_id'])->references(['id'])->on('products')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('orders', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['company_address_id'])->references(['id'])->on('company_addresses')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('organisation_settings', function (Blueprint $table) {
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['default_task_status'])->references(['id'])->on('taskboard_columns')->onUpdate('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('payments', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['credit_notes_id'])->references(['id'])->on('credit_notes')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['invoice_id'])->references(['id'])->on('invoices')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['offline_method_id'])->references(['id'])->on('offline_payment_methods')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['order_id'])->references(['id'])->on('orders')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('permission_role', function (Blueprint $table) {
                $table->foreign(['permission_id'])->references(['id'])->on('permissions')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['permission_type_id'])->references(['id'])->on('permission_types')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['role_id'])->references(['id'])->on('roles')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('permissions', function (Blueprint $table) {
                $table->foreign(['module_id'])->references(['id'])->on('modules')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('pinned', function (Blueprint $table) {
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('product_files', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['product_id'])->references(['id'])->on('products')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('product_sub_category', function (Blueprint $table) {
                $table->foreign(['category_id'])->references(['id'])->on('product_category')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('products', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['category_id'])->references(['id'])->on('product_category')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['sub_category_id'])->references(['id'])->on('product_sub_category')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('project_activity', function (Blueprint $table) {
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_category', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('project_files', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_members', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_milestones', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_notes', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_ratings', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_template_members', function (Blueprint $table) {
                $table->foreign(['project_template_id'])->references(['id'])->on('project_templates')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_template_sub_tasks', function (Blueprint $table) {
                $table->foreign(['project_template_task_id'])->references(['id'])->on('project_template_tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_template_task_users', function (Blueprint $table) {
                $table->foreign(['project_template_task_id'])->references(['id'])->on('project_template_tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_template_tasks', function (Blueprint $table) {
                $table->foreign(['project_template_id'])->references(['id'])->on('project_templates')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['project_template_task_category_id'])->references(['id'])->on('task_category')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('project_templates', function (Blueprint $table) {
                $table->foreign(['category_id'])->references(['id'])->on('project_category')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('project_time_log_breaks', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_time_log_id'])->references(['id'])->on('project_time_logs')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_time_logs', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['approved_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['edited_by_user'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['invoice_id'])->references(['id'])->on('invoices')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('project_user_notes', function (Blueprint $table) {
                $table->foreign(['project_note_id'])->references(['id'])->on('project_notes')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('projects', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['category_id'])->references(['id'])->on('project_category')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_admin'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['team_id'])->references(['id'])->on('teams')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('proposal_item_images', function (Blueprint $table) {
                $table->foreign(['proposal_item_id'])->references(['id'])->on('proposal_items')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('proposal_items', function (Blueprint $table) {
                $table->foreign(['proposal_id'])->references(['id'])->on('proposals')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('proposal_signs', function (Blueprint $table) {
                $table->foreign(['proposal_id'])->references(['id'])->on('proposals')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('proposals', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['currency_id'])->references(['id'])->on('currencies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('purpose_consent_leads', function (Blueprint $table) {
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['purpose_consent_id'])->references(['id'])->on('purpose_consent')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['updated_by_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('purpose_consent_users', function (Blueprint $table) {
                $table->foreign(['client_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['purpose_consent_id'])->references(['id'])->on('purpose_consent')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['updated_by_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('push_subscriptions', function (Blueprint $table) {
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('NO ACTION')->onDelete('CASCADE');
            });

            Schema::table('quotation_items', function (Blueprint $table) {
                $table->foreign(['quotation_id'])->references(['id'])->on('quotations')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('removal_requests', function (Blueprint $table) {
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('removal_requests_lead', function (Blueprint $table) {
                $table->foreign(['lead_id'])->references(['id'])->on('leads')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('role_user', function (Blueprint $table) {
                $table->foreign(['role_id'])->references(['id'])->on('roles')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('sticky_notes', function (Blueprint $table) {
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('sub_task_files', function (Blueprint $table) {
                $table->foreign(['sub_task_id'])->references(['id'])->on('sub_tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('sub_tasks', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['assigned_to'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_category', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('task_comments', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_files', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_history', function (Blueprint $table) {
                $table->foreign(['board_column_id'])->references(['id'])->on('taskboard_columns')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['sub_task_id'])->references(['id'])->on('sub_tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_label_list', function (Blueprint $table) {
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_labels', function (Blueprint $table) {
                $table->foreign(['label_id'])->references(['id'])->on('task_label_list')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['task_id'], 'task_tags_task_id_foreign')->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_notes', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('task_users', function (Blueprint $table) {
                $table->foreign(['task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('tasks', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['board_column_id'])->references(['id'])->on('taskboard_columns')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['created_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['dependent_task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['milestone_id'])->references(['id'])->on('project_milestones')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['project_id'])->references(['id'])->on('projects')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['recurring_task_id'])->references(['id'])->on('tasks')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['task_category_id'])->references(['id'])->on('task_category')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('teams', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('ticket_agent_groups', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['agent_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['group_id'])->references(['id'])->on('ticket_groups')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('ticket_custom_forms', function (Blueprint $table) {
                $table->foreign(['custom_fields_id'])->references(['id'])->on('custom_fields')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('ticket_files', function (Blueprint $table) {
                $table->foreign(['ticket_reply_id'])->references(['id'])->on('ticket_replies')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('ticket_replies', function (Blueprint $table) {
                $table->foreign(['ticket_id'])->references(['id'])->on('tickets')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('ticket_tags', function (Blueprint $table) {
                $table->foreign(['tag_id'])->references(['id'])->on('ticket_tag_list')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['ticket_id'])->references(['id'])->on('tickets')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('tickets', function (Blueprint $table) {
                $table->foreign(['added_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['agent_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['channel_id'])->references(['id'])->on('ticket_channels')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['country_id'])->references(['id'])->on('countries')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['last_updated_by'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['type_id'])->references(['id'])->on('ticket_types')->onUpdate('CASCADE')->onDelete('SET NULL');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('user_activities', function (Blueprint $table) {
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('user_invitations', function (Blueprint $table) {
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('user_leadboard_settings', function (Blueprint $table) {
                $table->foreign(['board_column_id'])->references(['id'])->on('lead_status')->onUpdate('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('user_permissions', function (Blueprint $table) {
                $table->foreign(['permission_id'])->references(['id'])->on('permissions')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['permission_type_id'])->references(['id'])->on('permission_types')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('user_taskboard_settings', function (Blueprint $table) {
                $table->foreign(['board_column_id'])->references(['id'])->on('taskboard_columns')->onUpdate('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('users', function (Blueprint $table) {
                $table->foreign(['country_id'])->references(['id'])->on('countries')->onUpdate('CASCADE')->onDelete('SET NULL');
            });

            Schema::table('users_chat', function (Blueprint $table) {
                $table->foreign(['from'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['to'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_one'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });

            Schema::table('users_chat_files', function (Blueprint $table) {
                $table->foreign(['users_chat_id'])->references(['id'])->on('users_chat')->onUpdate('CASCADE')->onDelete('CASCADE');
                $table->foreign(['user_id'])->references(['id'])->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users_chat_files', function (Blueprint $table) {
            $table->dropForeign('users_chat_files_users_chat_id_foreign');
            $table->dropForeign('users_chat_files_user_id_foreign');
        });

        Schema::table('users_chat', function (Blueprint $table) {
            $table->dropForeign('users_chat_from_foreign');
            $table->dropForeign('users_chat_to_foreign');
            $table->dropForeign('users_chat_user_id_foreign');
            $table->dropForeign('users_chat_user_one_foreign');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_country_id_foreign');
        });

        Schema::table('user_taskboard_settings', function (Blueprint $table) {
            $table->dropForeign('user_taskboard_settings_board_column_id_foreign');
            $table->dropForeign('user_taskboard_settings_user_id_foreign');
        });

        Schema::table('user_permissions', function (Blueprint $table) {
            $table->dropForeign('user_permissions_permission_id_foreign');
            $table->dropForeign('user_permissions_permission_type_id_foreign');
            $table->dropForeign('user_permissions_user_id_foreign');
        });

        Schema::table('user_leadboard_settings', function (Blueprint $table) {
            $table->dropForeign('user_leadboard_settings_board_column_id_foreign');
            $table->dropForeign('user_leadboard_settings_user_id_foreign');
        });

        Schema::table('user_invitations', function (Blueprint $table) {
            $table->dropForeign('user_invitations_user_id_foreign');
        });

        Schema::table('user_activities', function (Blueprint $table) {
            $table->dropForeign('user_activities_user_id_foreign');
        });

        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign('tickets_added_by_foreign');
            $table->dropForeign('tickets_agent_id_foreign');
            $table->dropForeign('tickets_channel_id_foreign');
            $table->dropForeign('tickets_country_id_foreign');
            $table->dropForeign('tickets_last_updated_by_foreign');
            $table->dropForeign('tickets_type_id_foreign');
            $table->dropForeign('tickets_user_id_foreign');
        });

        Schema::table('ticket_tags', function (Blueprint $table) {
            $table->dropForeign('ticket_tags_tag_id_foreign');
            $table->dropForeign('ticket_tags_ticket_id_foreign');
        });

        Schema::table('ticket_replies', function (Blueprint $table) {
            $table->dropForeign('ticket_replies_ticket_id_foreign');
            $table->dropForeign('ticket_replies_user_id_foreign');
        });

        Schema::table('ticket_files', function (Blueprint $table) {
            $table->dropForeign('ticket_files_ticket_reply_id_foreign');
            $table->dropForeign('ticket_files_user_id_foreign');
        });

        Schema::table('ticket_custom_forms', function (Blueprint $table) {
            $table->dropForeign('ticket_custom_forms_custom_fields_id_foreign');
        });

        Schema::table('ticket_agent_groups', function (Blueprint $table) {
            $table->dropForeign('ticket_agent_groups_added_by_foreign');
            $table->dropForeign('ticket_agent_groups_agent_id_foreign');
            $table->dropForeign('ticket_agent_groups_group_id_foreign');
            $table->dropForeign('ticket_agent_groups_last_updated_by_foreign');
        });

        Schema::table('teams', function (Blueprint $table) {
            $table->dropForeign('teams_added_by_foreign');
            $table->dropForeign('teams_last_updated_by_foreign');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign('tasks_added_by_foreign');
            $table->dropForeign('tasks_board_column_id_foreign');
            $table->dropForeign('tasks_created_by_foreign');
            $table->dropForeign('tasks_dependent_task_id_foreign');
            $table->dropForeign('tasks_last_updated_by_foreign');
            $table->dropForeign('tasks_milestone_id_foreign');
            $table->dropForeign('tasks_project_id_foreign');
            $table->dropForeign('tasks_recurring_task_id_foreign');
            $table->dropForeign('tasks_task_category_id_foreign');
        });

        Schema::table('task_users', function (Blueprint $table) {
            $table->dropForeign('task_users_task_id_foreign');
            $table->dropForeign('task_users_user_id_foreign');
        });

        Schema::table('task_notes', function (Blueprint $table) {
            $table->dropForeign('task_notes_added_by_foreign');
            $table->dropForeign('task_notes_last_updated_by_foreign');
            $table->dropForeign('task_notes_task_id_foreign');
        });

        Schema::table('task_labels', function (Blueprint $table) {
            $table->dropForeign('task_labels_label_id_foreign');
            $table->dropForeign('task_tags_task_id_foreign');
        });

        Schema::table('task_label_list', function (Blueprint $table) {
            $table->dropForeign('task_label_list_project_id_foreign');
        });

        Schema::table('task_history', function (Blueprint $table) {
            $table->dropForeign('task_history_board_column_id_foreign');
            $table->dropForeign('task_history_sub_task_id_foreign');
            $table->dropForeign('task_history_task_id_foreign');
            $table->dropForeign('task_history_user_id_foreign');
        });

        Schema::table('task_files', function (Blueprint $table) {
            $table->dropForeign('task_files_added_by_foreign');
            $table->dropForeign('task_files_last_updated_by_foreign');
            $table->dropForeign('task_files_task_id_foreign');
            $table->dropForeign('task_files_user_id_foreign');
        });

        Schema::table('task_comments', function (Blueprint $table) {
            $table->dropForeign('task_comments_added_by_foreign');
            $table->dropForeign('task_comments_last_updated_by_foreign');
            $table->dropForeign('task_comments_task_id_foreign');
            $table->dropForeign('task_comments_user_id_foreign');
        });

        Schema::table('task_category', function (Blueprint $table) {
            $table->dropForeign('task_category_added_by_foreign');
            $table->dropForeign('task_category_last_updated_by_foreign');
        });

        Schema::table('sub_tasks', function (Blueprint $table) {
            $table->dropForeign('sub_tasks_added_by_foreign');
            $table->dropForeign('sub_tasks_assigned_to_foreign');
            $table->dropForeign('sub_tasks_last_updated_by_foreign');
            $table->dropForeign('sub_tasks_task_id_foreign');
        });

        Schema::table('sub_task_files', function (Blueprint $table) {
            $table->dropForeign('sub_task_files_sub_task_id_foreign');
            $table->dropForeign('sub_task_files_user_id_foreign');
        });

        Schema::table('sticky_notes', function (Blueprint $table) {
            $table->dropForeign('sticky_notes_user_id_foreign');
        });

        Schema::table('role_user', function (Blueprint $table) {
            $table->dropForeign('role_user_role_id_foreign');
            $table->dropForeign('role_user_user_id_foreign');
        });

        Schema::table('removal_requests_lead', function (Blueprint $table) {
            $table->dropForeign('removal_requests_lead_lead_id_foreign');
        });

        Schema::table('removal_requests', function (Blueprint $table) {
            $table->dropForeign('removal_requests_user_id_foreign');
        });

        Schema::table('quotation_items', function (Blueprint $table) {
            $table->dropForeign('quotation_items_quotation_id_foreign');
        });

        Schema::table('push_subscriptions', function (Blueprint $table) {
            $table->dropForeign('push_subscriptions_user_id_foreign');
        });

        Schema::table('purpose_consent_users', function (Blueprint $table) {
            $table->dropForeign('purpose_consent_users_client_id_foreign');
            $table->dropForeign('purpose_consent_users_purpose_consent_id_foreign');
            $table->dropForeign('purpose_consent_users_updated_by_id_foreign');
        });

        Schema::table('purpose_consent_leads', function (Blueprint $table) {
            $table->dropForeign('purpose_consent_leads_lead_id_foreign');
            $table->dropForeign('purpose_consent_leads_purpose_consent_id_foreign');
            $table->dropForeign('purpose_consent_leads_updated_by_id_foreign');
        });

        Schema::table('proposals', function (Blueprint $table) {
            $table->dropForeign('proposals_added_by_foreign');
            $table->dropForeign('proposals_currency_id_foreign');
            $table->dropForeign('proposals_last_updated_by_foreign');
            $table->dropForeign('proposals_lead_id_foreign');
        });

        Schema::table('proposal_signs', function (Blueprint $table) {
            $table->dropForeign('proposal_signs_proposal_id_foreign');
        });

        Schema::table('proposal_items', function (Blueprint $table) {
            $table->dropForeign('proposal_items_proposal_id_foreign');
        });

        Schema::table('proposal_item_images', function (Blueprint $table) {
            $table->dropForeign('proposal_item_images_proposal_item_id_foreign');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropForeign('projects_added_by_foreign');
            $table->dropForeign('projects_category_id_foreign');
            $table->dropForeign('projects_client_id_foreign');
            $table->dropForeign('projects_currency_id_foreign');
            $table->dropForeign('projects_last_updated_by_foreign');
            $table->dropForeign('projects_project_admin_foreign');
            $table->dropForeign('projects_team_id_foreign');
        });

        Schema::table('project_user_notes', function (Blueprint $table) {
            $table->dropForeign('project_user_notes_project_note_id_foreign');
            $table->dropForeign('project_user_notes_user_id_foreign');
        });

        Schema::table('project_time_logs', function (Blueprint $table) {
            $table->dropForeign('project_time_logs_added_by_foreign');
            $table->dropForeign('project_time_logs_approved_by_foreign');
            $table->dropForeign('project_time_logs_edited_by_user_foreign');
            $table->dropForeign('project_time_logs_invoice_id_foreign');
            $table->dropForeign('project_time_logs_last_updated_by_foreign');
            $table->dropForeign('project_time_logs_project_id_foreign');
            $table->dropForeign('project_time_logs_task_id_foreign');
            $table->dropForeign('project_time_logs_user_id_foreign');
        });

        Schema::table('project_time_log_breaks', function (Blueprint $table) {
            $table->dropForeign('project_time_log_breaks_added_by_foreign');
            $table->dropForeign('project_time_log_breaks_last_updated_by_foreign');
            $table->dropForeign('project_time_log_breaks_project_time_log_id_foreign');
        });

        Schema::table('project_templates', function (Blueprint $table) {
            $table->dropForeign('project_templates_category_id_foreign');
            $table->dropForeign('project_templates_client_id_foreign');
        });

        Schema::table('project_template_tasks', function (Blueprint $table) {
            $table->dropForeign('project_template_tasks_project_template_id_foreign');
            $table->dropForeign('project_template_tasks_project_template_task_category_id_foreign');
        });

        Schema::table('project_template_task_users', function (Blueprint $table) {
            $table->dropForeign('project_template_task_users_project_template_task_id_foreign');
            $table->dropForeign('project_template_task_users_user_id_foreign');
        });

        Schema::table('project_template_sub_tasks', function (Blueprint $table) {
            $table->dropForeign('project_template_sub_tasks_project_template_task_id_foreign');
        });

        Schema::table('project_template_members', function (Blueprint $table) {
            $table->dropForeign('project_template_members_project_template_id_foreign');
            $table->dropForeign('project_template_members_user_id_foreign');
        });

        Schema::table('project_ratings', function (Blueprint $table) {
            $table->dropForeign('project_ratings_added_by_foreign');
            $table->dropForeign('project_ratings_last_updated_by_foreign');
            $table->dropForeign('project_ratings_project_id_foreign');
            $table->dropForeign('project_ratings_user_id_foreign');
        });

        Schema::table('project_notes', function (Blueprint $table) {
            $table->dropForeign('project_notes_added_by_foreign');
            $table->dropForeign('project_notes_client_id_foreign');
            $table->dropForeign('project_notes_last_updated_by_foreign');
            $table->dropForeign('project_notes_project_id_foreign');
        });

        Schema::table('project_milestones', function (Blueprint $table) {
            $table->dropForeign('project_milestones_added_by_foreign');
            $table->dropForeign('project_milestones_currency_id_foreign');
            $table->dropForeign('project_milestones_last_updated_by_foreign');
            $table->dropForeign('project_milestones_project_id_foreign');
        });

        Schema::table('project_members', function (Blueprint $table) {
            $table->dropForeign('project_members_added_by_foreign');
            $table->dropForeign('project_members_last_updated_by_foreign');
            $table->dropForeign('project_members_project_id_foreign');
            $table->dropForeign('project_members_user_id_foreign');
        });

        Schema::table('project_files', function (Blueprint $table) {
            $table->dropForeign('project_files_added_by_foreign');
            $table->dropForeign('project_files_last_updated_by_foreign');
            $table->dropForeign('project_files_project_id_foreign');
            $table->dropForeign('project_files_user_id_foreign');
        });

        Schema::table('project_category', function (Blueprint $table) {
            $table->dropForeign('project_category_added_by_foreign');
            $table->dropForeign('project_category_last_updated_by_foreign');
        });

        Schema::table('project_activity', function (Blueprint $table) {
            $table->dropForeign('project_activity_project_id_foreign');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign('products_added_by_foreign');
            $table->dropForeign('products_category_id_foreign');
            $table->dropForeign('products_last_updated_by_foreign');
            $table->dropForeign('products_sub_category_id_foreign');
        });

        Schema::table('product_sub_category', function (Blueprint $table) {
            $table->dropForeign('product_sub_category_category_id_foreign');
        });

        Schema::table('product_files', function (Blueprint $table) {
            $table->dropForeign('product_files_added_by_foreign');
            $table->dropForeign('product_files_last_updated_by_foreign');
            $table->dropForeign('product_files_product_id_foreign');
        });

        Schema::table('pinned', function (Blueprint $table) {
            $table->dropForeign('pinned_project_id_foreign');
            $table->dropForeign('pinned_task_id_foreign');
            $table->dropForeign('pinned_user_id_foreign');
        });

        Schema::table('permissions', function (Blueprint $table) {
            $table->dropForeign('permissions_module_id_foreign');
        });

        Schema::table('permission_role', function (Blueprint $table) {
            $table->dropForeign('permission_role_permission_id_foreign');
            $table->dropForeign('permission_role_permission_type_id_foreign');
            $table->dropForeign('permission_role_role_id_foreign');
        });

        Schema::table('payments', function (Blueprint $table) {
            $table->dropForeign('payments_added_by_foreign');
            $table->dropForeign('payments_credit_notes_id_foreign');
            $table->dropForeign('payments_currency_id_foreign');
            $table->dropForeign('payments_invoice_id_foreign');
            $table->dropForeign('payments_last_updated_by_foreign');
            $table->dropForeign('payments_offline_method_id_foreign');
            $table->dropForeign('payments_order_id_foreign');
            $table->dropForeign('payments_project_id_foreign');
        });

        Schema::table('organisation_settings', function (Blueprint $table) {
            $table->dropForeign('organisation_settings_currency_id_foreign');
            $table->dropForeign('organisation_settings_default_task_status_foreign');
            $table->dropForeign('organisation_settings_last_updated_by_foreign');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign('orders_added_by_foreign');
            $table->dropForeign('orders_client_id_foreign');
            $table->dropForeign('orders_company_address_id_foreign');
            $table->dropForeign('orders_currency_id_foreign');
            $table->dropForeign('orders_last_updated_by_foreign');
        });

        Schema::table('order_items', function (Blueprint $table) {
            $table->dropForeign('order_items_order_id_foreign');
            $table->dropForeign('order_items_product_id_foreign');
        });

        Schema::table('order_item_images', function (Blueprint $table) {
            $table->dropForeign('order_item_images_order_item_id_foreign');
        });

        Schema::table('notices', function (Blueprint $table) {
            $table->dropForeign('notices_added_by_foreign');
            $table->dropForeign('notices_department_id_foreign');
            $table->dropForeign('notices_last_updated_by_foreign');
        });

        Schema::table('notice_views', function (Blueprint $table) {
            $table->dropForeign('notice_views_notice_id_foreign');
            $table->dropForeign('notice_views_user_id_foreign');
        });

        Schema::table('leaves', function (Blueprint $table) {
            $table->dropForeign('leaves_added_by_foreign');
            $table->dropForeign('leaves_approved_by_foreign');
            $table->dropForeign('leaves_last_updated_by_foreign');
            $table->dropForeign('leaves_leave_type_id_foreign');
            $table->dropForeign('leaves_user_id_foreign');
        });

        Schema::table('leads', function (Blueprint $table) {
            $table->dropForeign('leads_added_by_foreign');
            $table->dropForeign('leads_agent_id_foreign');
            $table->dropForeign('leads_category_id_foreign');
            $table->dropForeign('leads_currency_id_foreign');
            $table->dropForeign('leads_last_updated_by_foreign');
        });

        Schema::table('lead_user_notes', function (Blueprint $table) {
            $table->dropForeign('lead_user_notes_lead_note_id_foreign');
            $table->dropForeign('lead_user_notes_user_id_foreign');
        });

        Schema::table('lead_sources', function (Blueprint $table) {
            $table->dropForeign('lead_sources_added_by_foreign');
            $table->dropForeign('lead_sources_last_updated_by_foreign');
        });

        Schema::table('lead_notes', function (Blueprint $table) {
            $table->dropForeign('lead_notes_added_by_foreign');
            $table->dropForeign('lead_notes_last_updated_by_foreign');
            $table->dropForeign('lead_notes_lead_id_foreign');
            $table->dropForeign('lead_notes_member_id_foreign');
        });

        Schema::table('lead_follow_up', function (Blueprint $table) {
            $table->dropForeign('lead_follow_up_added_by_foreign');
            $table->dropForeign('lead_follow_up_last_updated_by_foreign');
            $table->dropForeign('lead_follow_up_lead_id_foreign');
        });

        Schema::table('lead_files', function (Blueprint $table) {
            $table->dropForeign('lead_files_added_by_foreign');
            $table->dropForeign('lead_files_last_updated_by_foreign');
            $table->dropForeign('lead_files_lead_id_foreign');
            $table->dropForeign('lead_files_user_id_foreign');
        });

        Schema::table('lead_custom_forms', function (Blueprint $table) {
            $table->dropForeign('lead_custom_forms_added_by_foreign');
            $table->dropForeign('lead_custom_forms_custom_fields_id_foreign');
            $table->dropForeign('lead_custom_forms_last_updated_by_foreign');
        });

        Schema::table('lead_category', function (Blueprint $table) {
            $table->dropForeign('lead_category_added_by_foreign');
            $table->dropForeign('lead_category_last_updated_by_foreign');
        });

        Schema::table('lead_agents', function (Blueprint $table) {
            $table->dropForeign('lead_agents_added_by_foreign');
            $table->dropForeign('lead_agents_last_updated_by_foreign');
            $table->dropForeign('lead_agents_user_id_foreign');
        });

        Schema::table('knowledge_bases', function (Blueprint $table) {
            $table->dropForeign('knowledge_bases_category_id_foreign');
        });

        Schema::table('issues', function (Blueprint $table) {
            $table->dropForeign('issues_project_id_foreign');
            $table->dropForeign('issues_user_id_foreign');
        });

        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign('invoices_added_by_foreign');
            $table->dropForeign('invoices_client_id_foreign');
            $table->dropForeign('invoices_company_address_id_foreign');
            $table->dropForeign('invoices_created_by_foreign');
            $table->dropForeign('invoices_currency_id_foreign');
            $table->dropForeign('invoices_estimate_id_foreign');
            $table->dropForeign('invoices_invoice_recurring_id_foreign');
            $table->dropForeign('invoices_last_updated_by_foreign');
            $table->dropForeign('invoices_order_id_foreign');
            $table->dropForeign('invoices_parent_id_foreign');
            $table->dropForeign('invoices_project_id_foreign');
        });

        Schema::table('invoice_recurring_items', function (Blueprint $table) {
            $table->dropForeign('invoice_recurring_items_invoice_recurring_id_foreign');
        });

        Schema::table('invoice_recurring_item_images', function (Blueprint $table) {
            $table->dropForeign('invoice_recurring_item_images_invoice_recurring_item_id_foreign');
        });

        Schema::table('invoice_recurring', function (Blueprint $table) {
            $table->dropForeign('invoice_recurring_added_by_foreign');
            $table->dropForeign('invoice_recurring_client_id_foreign');
            $table->dropForeign('invoice_recurring_created_by_foreign');
            $table->dropForeign('invoice_recurring_currency_id_foreign');
            $table->dropForeign('invoice_recurring_last_updated_by_foreign');
            $table->dropForeign('invoice_recurring_project_id_foreign');
            $table->dropForeign('invoice_recurring_user_id_foreign');
        });

        Schema::table('invoice_items', function (Blueprint $table) {
            $table->dropForeign('invoice_items_invoice_id_foreign');
        });

        Schema::table('invoice_item_images', function (Blueprint $table) {
            $table->dropForeign('invoice_item_images_invoice_item_id_foreign');
        });

        Schema::table('holidays', function (Blueprint $table) {
            $table->dropForeign('holidays_added_by_foreign');
            $table->dropForeign('holidays_last_updated_by_foreign');
        });

        Schema::table('expenses_recurring', function (Blueprint $table) {
            $table->dropForeign('expenses_recurring_added_by_foreign');
            $table->dropForeign('expenses_recurring_category_id_foreign');
            $table->dropForeign('expenses_recurring_created_by_foreign');
            $table->dropForeign('expenses_recurring_currency_id_foreign');
            $table->dropForeign('expenses_recurring_last_updated_by_foreign');
            $table->dropForeign('expenses_recurring_project_id_foreign');
            $table->dropForeign('expenses_recurring_user_id_foreign');
        });

        Schema::table('expenses_category_roles', function (Blueprint $table) {
            $table->dropForeign('expenses_category_roles_expenses_category_id_foreign');
            $table->dropForeign('expenses_category_roles_role_id_foreign');
        });

        Schema::table('expenses_category', function (Blueprint $table) {
            $table->dropForeign('expenses_category_added_by_foreign');
            $table->dropForeign('expenses_category_last_updated_by_foreign');
        });

        Schema::table('expenses', function (Blueprint $table) {
            $table->dropForeign('expenses_added_by_foreign');
            $table->dropForeign('expenses_approver_id_foreign');
            $table->dropForeign('expenses_category_id_foreign');
            $table->dropForeign('expenses_created_by_foreign');
            $table->dropForeign('expenses_currency_id_foreign');
            $table->dropForeign('expenses_expenses_recurring_id_foreign');
            $table->dropForeign('expenses_last_updated_by_foreign');
            $table->dropForeign('expenses_user_id_foreign');
        });

        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign('events_added_by_foreign');
            $table->dropForeign('events_last_updated_by_foreign');
        });

        Schema::table('event_attendees', function (Blueprint $table) {
            $table->dropForeign('event_attendees_event_id_foreign');
            $table->dropForeign('event_attendees_user_id_foreign');
        });

        Schema::table('estimates', function (Blueprint $table) {
            $table->dropForeign('estimates_added_by_foreign');
            $table->dropForeign('estimates_client_id_foreign');
            $table->dropForeign('estimates_currency_id_foreign');
            $table->dropForeign('estimates_last_updated_by_foreign');
        });

        Schema::table('estimate_items', function (Blueprint $table) {
            $table->dropForeign('estimate_items_estimate_id_foreign');
        });

        Schema::table('estimate_item_images', function (Blueprint $table) {
            $table->dropForeign('estimate_item_images_estimate_item_id_foreign');
        });

        Schema::table('employee_teams', function (Blueprint $table) {
            $table->dropForeign('employee_teams_team_id_foreign');
            $table->dropForeign('employee_teams_user_id_foreign');
        });

        Schema::table('employee_skills', function (Blueprint $table) {
            $table->dropForeign('employee_skills_skill_id_foreign');
            $table->dropForeign('employee_skills_user_id_foreign');
        });

        Schema::table('employee_shift_schedules', function (Blueprint $table) {
            $table->dropForeign('employee_shift_schedules_added_by_foreign');
            $table->dropForeign('employee_shift_schedules_employee_shift_id_foreign');
            $table->dropForeign('employee_shift_schedules_last_updated_by_foreign');
            $table->dropForeign('employee_shift_schedules_user_id_foreign');
        });

        Schema::table('employee_shift_change_requests', function (Blueprint $table) {
            $table->dropForeign('employee_shift_change_requests_employee_shift_id_foreign');
            $table->dropForeign('employee_shift_change_requests_shift_schedule_id_foreign');
        });

        Schema::table('employee_leave_quotas', function (Blueprint $table) {
            $table->dropForeign('employee_leave_quotas_leave_type_id_foreign');
            $table->dropForeign('employee_leave_quotas_user_id_foreign');
        });

        Schema::table('employee_docs', function (Blueprint $table) {
            $table->dropForeign('employee_docs_added_by_foreign');
            $table->dropForeign('employee_docs_last_updated_by_foreign');
            $table->dropForeign('employee_docs_user_id_foreign');
        });

        Schema::table('employee_details', function (Blueprint $table) {
            $table->dropForeign('employee_details_added_by_foreign');
            $table->dropForeign('employee_details_department_id_foreign');
            $table->dropForeign('employee_details_designation_id_foreign');
            $table->dropForeign('employee_details_last_updated_by_foreign');
            $table->dropForeign('employee_details_reporting_to_foreign');
            $table->dropForeign('employee_details_user_id_foreign');
        });

        Schema::table('emergency_contacts', function (Blueprint $table) {
            $table->dropForeign('emergency_contacts_added_by_foreign');
            $table->dropForeign('emergency_contacts_last_updated_by_foreign');
            $table->dropForeign('emergency_contacts_user_id_foreign');
        });

        Schema::table('discussions', function (Blueprint $table) {
            $table->dropForeign('discussions_added_by_foreign');
            $table->dropForeign('discussions_best_answer_id_foreign');
            $table->dropForeign('discussions_discussion_category_id_foreign');
            $table->dropForeign('discussions_last_reply_by_id_foreign');
            $table->dropForeign('discussions_last_updated_by_foreign');
            $table->dropForeign('discussions_project_id_foreign');
            $table->dropForeign('discussions_user_id_foreign');
        });

        Schema::table('discussion_replies', function (Blueprint $table) {
            $table->dropForeign('discussion_replies_discussion_id_foreign');
            $table->dropForeign('discussion_replies_user_id_foreign');
        });

        Schema::table('discussion_files', function (Blueprint $table) {
            $table->dropForeign('discussion_files_discussion_id_foreign');
            $table->dropForeign('discussion_files_discussion_reply_id_foreign');
            $table->dropForeign('discussion_files_user_id_foreign');
        });

        Schema::table('designations', function (Blueprint $table) {
            $table->dropForeign('designations_added_by_foreign');
            $table->dropForeign('designations_last_updated_by_foreign');
        });

        Schema::table('custom_fields_data', function (Blueprint $table) {
            $table->dropForeign('custom_fields_data_custom_field_id_foreign');
        });

        Schema::table('custom_fields', function (Blueprint $table) {
            $table->dropForeign('custom_fields_custom_field_group_id_foreign');
        });

        Schema::table('credit_notes', function (Blueprint $table) {
            $table->dropForeign('credit_notes_added_by_foreign');
            $table->dropForeign('credit_notes_client_id_foreign');
            $table->dropForeign('credit_notes_currency_id_foreign');
            $table->dropForeign('credit_notes_last_updated_by_foreign');
            $table->dropForeign('credit_notes_project_id_foreign');
        });

        Schema::table('credit_note_items', function (Blueprint $table) {
            $table->dropForeign('credit_note_items_credit_note_id_foreign');
        });

        Schema::table('credit_note_item_images', function (Blueprint $table) {
            $table->dropForeign('credit_note_item_images_credit_note_item_id_foreign');
        });

        Schema::table('conversation_reply', function (Blueprint $table) {
            $table->dropForeign('conversation_reply_conversation_id_foreign');
            $table->dropForeign('conversation_reply_user_id_foreign');
        });

        Schema::table('conversation', function (Blueprint $table) {
            $table->dropForeign('conversation_user_one_foreign');
            $table->dropForeign('conversation_user_two_foreign');
        });

        Schema::table('contracts', function (Blueprint $table) {
            $table->dropForeign('contracts_added_by_foreign');
            $table->dropForeign('contracts_client_id_foreign');
            $table->dropForeign('contracts_contract_type_id_foreign');
            $table->dropForeign('contracts_currency_id_foreign');
            $table->dropForeign('contracts_last_updated_by_foreign');
        });

        Schema::table('contract_signs', function (Blueprint $table) {
            $table->dropForeign('contract_signs_contract_id_foreign');
        });

        Schema::table('contract_renews', function (Blueprint $table) {
            $table->dropForeign('contract_renews_added_by_foreign');
            $table->dropForeign('contract_renews_contract_id_foreign');
            $table->dropForeign('contract_renews_last_updated_by_foreign');
            $table->dropForeign('contract_renews_renewed_by_foreign');
        });

        Schema::table('contract_files', function (Blueprint $table) {
            $table->dropForeign('contract_files_added_by_foreign');
            $table->dropForeign('contract_files_contract_id_foreign');
            $table->dropForeign('contract_files_last_updated_by_foreign');
            $table->dropForeign('contract_files_user_id_foreign');
        });

        Schema::table('contract_discussions', function (Blueprint $table) {
            $table->dropForeign('contract_discussions_added_by_foreign');
            $table->dropForeign('contract_discussions_contract_id_foreign');
            $table->dropForeign('contract_discussions_from_foreign');
            $table->dropForeign('contract_discussions_last_updated_by_foreign');
        });

        Schema::table('client_user_notes', function (Blueprint $table) {
            $table->dropForeign('client_user_notes_client_note_id_foreign');
            $table->dropForeign('client_user_notes_user_id_foreign');
        });

        Schema::table('client_sub_categories', function (Blueprint $table) {
            $table->dropForeign('client_sub_categories_category_id_foreign');
        });

        Schema::table('client_notes', function (Blueprint $table) {
            $table->dropForeign('client_notes_added_by_foreign');
            $table->dropForeign('client_notes_client_id_foreign');
            $table->dropForeign('client_notes_last_updated_by_foreign');
            $table->dropForeign('client_notes_member_id_foreign');
        });

        Schema::table('client_docs', function (Blueprint $table) {
            $table->dropForeign('client_docs_added_by_foreign');
            $table->dropForeign('client_docs_last_updated_by_foreign');
            $table->dropForeign('client_docs_user_id_foreign');
        });

        Schema::table('client_details', function (Blueprint $table) {
            $table->dropForeign('client_details_added_by_foreign');
            $table->dropForeign('client_details_category_id_foreign');
            $table->dropForeign('client_details_last_updated_by_foreign');
            $table->dropForeign('client_details_sub_category_id_foreign');
            $table->dropForeign('client_details_user_id_foreign');
        });

        Schema::table('client_contacts', function (Blueprint $table) {
            $table->dropForeign('client_contacts_added_by_foreign');
            $table->dropForeign('client_contacts_last_updated_by_foreign');
            $table->dropForeign('client_contacts_user_id_foreign');
        });

        Schema::table('attendances', function (Blueprint $table) {
            $table->dropForeign('attendances_added_by_foreign');
            $table->dropForeign('attendances_employee_shift_id_foreign');
            $table->dropForeign('attendances_last_updated_by_foreign');
            $table->dropForeign('attendances_location_id_foreign');
            $table->dropForeign('attendances_user_id_foreign');
        });

        Schema::table('attendance_settings', function (Blueprint $table) {
            $table->dropForeign('attendance_settings_default_employee_shift_foreign');
        });

        Schema::table('accept_estimates', function (Blueprint $table) {
            $table->dropForeign('accept_estimates_estimate_id_foreign');
        });

        Schema::dropIfExists('users_chat_files');

        Schema::dropIfExists('users_chat');

        Schema::dropIfExists('users');

        Schema::dropIfExists('user_taskboard_settings');

        Schema::dropIfExists('user_permissions');

        Schema::dropIfExists('user_leadboard_settings');

        Schema::dropIfExists('user_invitations');

        Schema::dropIfExists('user_activities');

        Schema::dropIfExists('universal_search');

        Schema::dropIfExists('translate_settings');

        Schema::dropIfExists('tickets');

        Schema::dropIfExists('ticket_types');

        Schema::dropIfExists('ticket_tags');

        Schema::dropIfExists('ticket_tag_list');

        Schema::dropIfExists('ticket_reply_templates');

        Schema::dropIfExists('ticket_replies');

        Schema::dropIfExists('ticket_groups');

        Schema::dropIfExists('ticket_files');

        Schema::dropIfExists('ticket_email_settings');

        Schema::dropIfExists('ticket_custom_forms');

        Schema::dropIfExists('ticket_channels');

        Schema::dropIfExists('ticket_agent_groups');

        Schema::dropIfExists('theme_settings');

        Schema::dropIfExists('teams');

        Schema::dropIfExists('taxes');

        Schema::dropIfExists('tasks');

        Schema::dropIfExists('taskboard_columns');

        Schema::dropIfExists('task_users');

        Schema::dropIfExists('task_notes');

        Schema::dropIfExists('task_labels');

        Schema::dropIfExists('task_label_list');

        Schema::dropIfExists('task_history');

        Schema::dropIfExists('task_files');

        Schema::dropIfExists('task_comments');

        Schema::dropIfExists('task_category');

        Schema::dropIfExists('sub_tasks');

        Schema::dropIfExists('sub_task_files');

        Schema::dropIfExists('sticky_notes');

        Schema::dropIfExists('socials');

        Schema::dropIfExists('social_auth_settings');

        Schema::dropIfExists('smtp_settings');

        Schema::dropIfExists('slack_settings');

        Schema::dropIfExists('skills');

        Schema::dropIfExists('sessions');

        Schema::dropIfExists('roles');

        Schema::dropIfExists('role_user');

        Schema::dropIfExists('removal_requests_lead');

        Schema::dropIfExists('removal_requests');

        Schema::dropIfExists('quotations');

        Schema::dropIfExists('quotation_items');

        Schema::dropIfExists('pusher_settings');

        Schema::dropIfExists('push_subscriptions');

        Schema::dropIfExists('push_notification_settings');

        Schema::dropIfExists('purpose_consent_users');

        Schema::dropIfExists('purpose_consent_leads');

        Schema::dropIfExists('purpose_consent');

        Schema::dropIfExists('proposals');

        Schema::dropIfExists('proposal_signs');

        Schema::dropIfExists('proposal_items');

        Schema::dropIfExists('proposal_item_images');

        Schema::dropIfExists('projects');

        Schema::dropIfExists('project_user_notes');

        Schema::dropIfExists('project_time_logs');

        Schema::dropIfExists('project_time_log_breaks');

        Schema::dropIfExists('project_templates');

        Schema::dropIfExists('project_template_tasks');

        Schema::dropIfExists('project_template_task_users');

        Schema::dropIfExists('project_template_sub_tasks');

        Schema::dropIfExists('project_template_members');

        Schema::dropIfExists('project_settings');

        Schema::dropIfExists('project_ratings');

        Schema::dropIfExists('project_notes');

        Schema::dropIfExists('project_milestones');

        Schema::dropIfExists('project_members');

        Schema::dropIfExists('project_files');

        Schema::dropIfExists('project_category');

        Schema::dropIfExists('project_activity');

        Schema::dropIfExists('products');

        Schema::dropIfExists('product_sub_category');

        Schema::dropIfExists('product_files');

        Schema::dropIfExists('product_category');

        Schema::dropIfExists('pinned');

        Schema::dropIfExists('permissions');

        Schema::dropIfExists('permission_types');

        Schema::dropIfExists('permission_role');

        Schema::dropIfExists('payments');

        Schema::dropIfExists('payment_gateway_credentials');

        Schema::dropIfExists('password_resets');

        Schema::dropIfExists('organisation_settings');

        Schema::dropIfExists('orders');

        Schema::dropIfExists('order_items');

        Schema::dropIfExists('order_item_images');

        Schema::dropIfExists('offline_payment_methods');

        Schema::dropIfExists('notifications');

        Schema::dropIfExists('notices');

        Schema::dropIfExists('notice_views');

        Schema::dropIfExists('modules');

        Schema::dropIfExists('module_settings');

        Schema::dropIfExists('message_settings');

        Schema::dropIfExists('menus');

        Schema::dropIfExists('menu_settings');

        Schema::dropIfExists('ltm_translations');

        Schema::dropIfExists('log_time_for');

        Schema::dropIfExists('leaves');

        Schema::dropIfExists('leave_types');

        Schema::dropIfExists('leads');

        Schema::dropIfExists('lead_user_notes');

        Schema::dropIfExists('lead_status');

        Schema::dropIfExists('lead_sources');

        Schema::dropIfExists('lead_notes');

        Schema::dropIfExists('lead_follow_up');

        Schema::dropIfExists('lead_files');

        Schema::dropIfExists('lead_custom_forms');

        Schema::dropIfExists('lead_category');

        Schema::dropIfExists('lead_agents');

        Schema::dropIfExists('language_settings');

        Schema::dropIfExists('knowledge_categories');

        Schema::dropIfExists('knowledge_bases');

        Schema::dropIfExists('jobs');

        Schema::dropIfExists('job_batches');

        Schema::dropIfExists('issues');

        Schema::dropIfExists('invoices');

        Schema::dropIfExists('invoice_settings');

        Schema::dropIfExists('invoice_recurring_items');

        Schema::dropIfExists('invoice_recurring_item_images');

        Schema::dropIfExists('invoice_recurring');

        Schema::dropIfExists('invoice_items');

        Schema::dropIfExists('invoice_item_images');

        Schema::dropIfExists('holidays');

        Schema::dropIfExists('google_calendar_modules');

        Schema::dropIfExists('gdpr_settings');

        Schema::dropIfExists('file_storage_settings');

        Schema::dropIfExists('file_storage');

        Schema::dropIfExists('failed_jobs');

        Schema::dropIfExists('expenses_recurring');

        Schema::dropIfExists('expenses_category_roles');

        Schema::dropIfExists('expenses_category');

        Schema::dropIfExists('expenses');

        Schema::dropIfExists('events');

        Schema::dropIfExists('event_attendees');

        Schema::dropIfExists('estimates');

        Schema::dropIfExists('estimate_items');

        Schema::dropIfExists('estimate_item_images');

        Schema::dropIfExists('employee_teams');

        Schema::dropIfExists('employee_skills');

        Schema::dropIfExists('employee_shifts');

        Schema::dropIfExists('employee_shift_schedules');

        Schema::dropIfExists('employee_shift_change_requests');

        Schema::dropIfExists('employee_leave_quotas');

        Schema::dropIfExists('employee_docs');

        Schema::dropIfExists('employee_details');

        Schema::dropIfExists('emergency_contacts');

        Schema::dropIfExists('email_notification_settings');

        Schema::dropIfExists('discussions');

        Schema::dropIfExists('discussion_replies');

        Schema::dropIfExists('discussion_files');

        Schema::dropIfExists('discussion_categories');

        Schema::dropIfExists('designations');

        Schema::dropIfExists('database_backups');

        Schema::dropIfExists('database_backup_cron_settings');

        Schema::dropIfExists('dashboard_widgets');

        Schema::dropIfExists('custom_fields_data');

        Schema::dropIfExists('custom_fields');

        Schema::dropIfExists('custom_field_groups');

        Schema::dropIfExists('currency_format_settings');

        Schema::dropIfExists('currencies');

        Schema::dropIfExists('credit_notes');

        Schema::dropIfExists('credit_note_items');

        Schema::dropIfExists('credit_note_item_images');

        Schema::dropIfExists('countries');

        Schema::dropIfExists('conversation_reply');

        Schema::dropIfExists('conversation');

        Schema::dropIfExists('contracts');

        Schema::dropIfExists('contract_types');

        Schema::dropIfExists('contract_signs');

        Schema::dropIfExists('contract_renews');

        Schema::dropIfExists('contract_files');

        Schema::dropIfExists('contract_discussions');

        Schema::dropIfExists('company_addresses');

        Schema::dropIfExists('client_user_notes');

        Schema::dropIfExists('client_sub_categories');

        Schema::dropIfExists('client_notes');

        Schema::dropIfExists('client_docs');

        Schema::dropIfExists('client_details');

        Schema::dropIfExists('client_contacts');

        Schema::dropIfExists('client_categories');

        Schema::dropIfExists('attendances');

        Schema::dropIfExists('attendance_settings');

        Schema::dropIfExists('accept_estimates');
    }

};
