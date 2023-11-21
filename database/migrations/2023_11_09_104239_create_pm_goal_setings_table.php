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
        Schema::create('pm_goal_setings', function (Blueprint $table) {
            $table->id();
            $table->integer('project_budget_range_to');
            $table->integer('project_budget_range_from');
            $table->string('project_budget_range_name');
            $table->integer('project_priority_to');
            $table->integer('project_priority_from');
            $table->string('project_priority_name');
            $table->integer('project_high_priority_to');
            $table->integer('project_high_priority_from');
            $table->string('project_high_priority_name');
            $table->integer('project_top_most_priority_to');
            $table->integer('project_top_most_priority_from');
            $table->string('project_top_most_priority_name');
            $table->integer('critically_sensitive_to')->nullable();
            $table->integer('critically_sensitive_from')->nullable();
            $table->string('critically_sensitive_name')->nullable();
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
        Schema::dropIfExists('pm_goal_setings');
    }
};
