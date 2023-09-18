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
        Schema::create('pm_core_metrics', function (Blueprint $table) {
            $table->id();
            $table->string('released_amount_for_cycle');
            $table->string('total_released_amount');
            $table->string('avg_project_completion_time_for_cycle');
            $table->string('avg_project_completion_time_in_cycle');
            $table->string('progress_project_count');
            $table->string('progress_project_count_2');
            $table->string('progress_project_value');
            $table->string('progress_project_value_2');
            $table->string('project_completion_rate_for_this_cycle_count');
            $table->string('project_completion_rate_in_this_cycle_count');
            $table->string('project_completion_rate_for_this_cycle_value');
            $table->string('project_completion_rate_in_this_cycle_value');
            $table->string('value_of_upsale');
            $table->string('current');
            $table->string('current_plus_old_ones');
            $table->string('cancelation_rate');
            $table->string('number_of_revisions_for_cycle');
            $table->string('number_of_revisions_in_cycle');
            $table->string('avg_payment_per_day');
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
        Schema::dropIfExists('pm_core_metrics');
    }
};
