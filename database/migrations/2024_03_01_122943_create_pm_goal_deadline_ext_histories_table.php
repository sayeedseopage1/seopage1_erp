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
        Schema::create('pm_goal_deadline_ext_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('goal_id');
            $table->dateTime('old_deadline');
            $table->string('old_duration');
            $table->dateTime('extension_req_on');
            $table->dateTime('extension_req_for');
            $table->longText('extended_pm_reason');
            $table->string('uuid')->nullable();
            $table->string('screenshot')->nullable();
            $table->dateTime('extension_req_auth_for')->nullable();
            $table->dateTime('new_deadline')->nullable();
            $table->string('new_duration')->nullable();
            $table->longText('extended_admin_comment')->nullable();
            $table->dateTime('extension_req_auth_on')->nullable();
            $table->integer('authorization_by')->nullable();
            $table->integer('auth_status')->default(0);
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
        Schema::dropIfExists('pm_goal_deadline_ext_histories');
    }
};
