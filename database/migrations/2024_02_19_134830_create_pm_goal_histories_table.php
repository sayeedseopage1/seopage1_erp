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
        Schema::create('pm_goal_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('goal_id');
            $table->integer('project_id');
            $table->integer('client_id');
            $table->integer('pm_id');
            $table->float('project_budget');
            $table->integer('currency_id');
            $table->string('project_category');
            $table->dateTime('start_date');
            $table->dateTime('deadline');
            $table->longText('description');
            $table->longText('reason');
            $table->double('rating')->nullable();
            $table->double('client_communication_rating')->nullable();
            $table->double('negligence_pm_rating')->nullable();
            $table->longText('client_communication')->nullable();
            $table->longText('negligence_pm')->nullable();
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
        Schema::dropIfExists('pm_goal_histories');
    }
};
