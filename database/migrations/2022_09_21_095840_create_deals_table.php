<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deals', function (Blueprint $table) {
            $table->id();
            $table->string('deal_id')->unique();
            $table->string('client_name')->nullable();
            $table->string('organization')->nullable();
            $table->string('project_name')->nullable();
            $table->string('pipeline_stage')->nullable();
            $table->date('start_date')->nullable();
            $table->string('amount')->nullable();
            $table->string('deal_creation_date')->nullable();
            $table->string('message_link')->nullable();
            $table->string('profile_link')->nullable();
            $table->integer('currency_id')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        /* id, deal_id, deal_category, cms_id, cms_name, lead_id, pm_id, client_name, client_id, client_username, client_badge,
        client_email, organization, project_name, deadline, pipeline_stage, start_date, amount, actual_amount, upsell_amount,
        upsell_actual_amount, original_currency_id, deal_creation_date, message_link, profile_link, currency_id, submission_status,
        description, description2, description3, description4, description5, description6, description7, description8, description9,
        hash, `status`, dept_status, award_time, old_award_time, reason, added_by, authorization_status, updated_by, price_authorization,
        requirment_define, project_type, estimated_hour_task, hourly_rate, hubstaff_tracking, tracked_hours, second_day_tracked_hours, expect_amount,
        certain_amount_hour, long_project, project_deadline_authorization, settled_milestone_amount, unsettled_milestone_amount, created_at, payment_date,
        updated_at, is_drafted, released_at */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deals');
    }
};
