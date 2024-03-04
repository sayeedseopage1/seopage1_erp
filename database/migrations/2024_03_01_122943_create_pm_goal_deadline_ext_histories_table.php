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
            $table->dateTime('start_date');
            $table->dateTime('old_deadline');
            $table->dateTime('new_deadline');
            $table->string('duration');
            $table->longText('description');
            $table->integer('goal_status')->default(0);
            $table->longText('extended_admin_cmnt');
            $table->dateTime('extension_req_on');
            $table->dateTime('extension_req_for');
            $table->dateTime('extension_req_auth_on');
            $table->dateTime('extension_req_auth_for');
            $table->integer('authorization_by');
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
