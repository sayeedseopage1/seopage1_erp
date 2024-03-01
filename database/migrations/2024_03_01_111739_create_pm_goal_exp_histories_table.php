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
            $table->dateTime('start_date');
            $table->dateTime('deadline');
            $table->string('duration');
            $table->longText('description');
            $table->longText('reason');
            $table->longText('client_communication')->nullable();
            $table->longText('negligence_pm')->nullable();
            $table->integer('goal_status')->default(0);
            $table->integer('authorization_status')->default(0);
            $table->integer('authorization_on')->nullable();
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
