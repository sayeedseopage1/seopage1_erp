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
        Schema::create('pm_goal_exp_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('goal_id');
            // $table->dateTime('start_date');
            // $table->dateTime('deadline');
            $table->longText('expired_pm_reason');
            $table->longText('client_communication')->nullable();
            $table->double('client_communication_rating')->nullable();
            $table->longText('negligence_pm')->nullable();
            $table->double('negligence_pm_rating')->nullable();
            $table->longText('any_other_suggestion_admin')->nullable();
            $table->integer('authorization_status')->default(0);
            $table->dateTime('authorization_on')->nullable();
            $table->integer('authorization_by')->nullable();
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
        Schema::dropIfExists('pm_goal_exp_histories');
    }
};
