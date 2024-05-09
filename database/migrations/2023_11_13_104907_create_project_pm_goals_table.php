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
        Schema::create('project_pm_goals', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('client_id');
            $table->integer('pm_id');
            $table->string('project_type');
            $table->string('project_category');
            $table->string('goal_code');
            $table->string('goal_name');
            $table->string('goal_type');
            $table->dateTime('goal_start_date');
            $table->dateTime('goal_end_date');
            $table->string('duration');
            // $table->double('rating')->nullable();
            // $table->double('client_communication_rating')->nullable();
            // $table->double('negligence_pm_rating')->nullable();
            $table->integer('admin_id')->nullable();
            $table->integer('added_by');
            $table->integer('updated_by')->nullable();
            // $table->integer('extension_status')->default(0);
            $table->float('goal_progress')->default(0);
            // $table->integer('resolved_status')->default(0);
            $table->integer('goal_status')->default(0);
            // $table->longText('client_communication')->nullable();
            $table->longText('expired_meet_description')->nullable();
            // $table->longText('negligence_pm')->nullable();
            // $table->longText('reason')->nullable();
            // $table->dateTime('extension_req_on');
            // $table->longText('extended_reason')->nullable();
            // $table->longText('extended_admin_cmnt')->nullable();
            // $table->string('screenshot')->nullable();
            // $table->string('uuid')->nullable();
            // $table->integer('reason_status')->default(0);
            // $table->integer('extended_day')->nullable();
            // $table->dateTime('extended_goal_end_day')->nullable();
            // $table->integer('extended_request_status')->default(0);
            $table->integer('expired_status')->default(0);
            $table->integer('mail_status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_pm_goals');
    }
};
