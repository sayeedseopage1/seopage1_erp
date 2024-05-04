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
        Schema::create('employee_evaluations', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('user_name');
            $table->dateTime('join_date');
            $table->dateTime('start_date')->nullable();
            $table->dateTime('exp_date')->nullable();
            $table->decimal('lead_dev_avg_rating')->nullable();
            $table->longText('team_lead_cmnt')->nullable();
            $table->longText('managements_cmnt')->nullable();
            $table->string('managements_decision')->nullable();
            $table->integer('managements_id')->nullable();
            $table->string('managements_name')->nullable();
            $table->dateTime('managements_auth_at')->nullable();
            $table->string('accept_rejected')->nullable();
            $table->dateTime('pending_action_sending_time')->nullable();
            $table->integer('ld_submission_status')->default(0);
            $table->integer('lead_dev_id')->nullable();
            $table->integer('team_lead_id')->nullable();
            $table->integer('lead_dev_acknowledged')->default(0);
            $table->integer('team_lead_acknowledged')->default(0);
            $table->dateTime('team_lead_cmnt_at')->nullable();
            $table->integer('team_lead_status')->default(0);
            $table->integer('employee_status')->default(0);
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
        Schema::dropIfExists('employee_evaluations');
    }
};
