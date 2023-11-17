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
        Schema::create('project_pm_goal_statuses', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('pm_id');
            $table->string('goal_name');
            $table->date('goal_deadline');
            $table->string('duration');
            $table->longText('description');
            $table->longText('reason');
            $table->longText('suggestion');
            $table->integer('rating');
            $table->longText('admin_comment');
            $table->date('goal_start_date');
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
        Schema::dropIfExists('project_pm_goal_statuses');
    }
};
