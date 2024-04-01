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
            $table->double('lead_dev_avg_rating')->nullable();
            $table->longText('team_lead_cmnt')->nullable();
            $table->longText('managements_cmnt')->nullable();
            $table->string('management_decision')->nullable();
            $table->dateTime('accept_rejected')->nullable();
            $table->integer('status')->default(0);
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
