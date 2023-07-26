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
        Schema::create('developer_stop_timers', function (Blueprint $table) {
            $table->id();
            $table->string('reason_for_less_tracked_hours_a_day_task')->nullable();
            $table->json('durations')->nullable();
            $table->text('comment')->nullable();
            $table->string('leave_period')->nullable();
            $table->text('child_reason')->nullable();
            $table->string('responsible_person')->nullable();
            $table->string('related_to_any_project')->nullable();
            $table->integer('responsible_person_id')->nullable();
            $table->integer('project_id')->nullable();
            $table->integer('forgot_to_track_task_id')->nullable();
            $table->bigInteger('transition_hours')->nullable();
            $table->bigInteger('transition_minutes')->nullable();
            $table->integer('task_id');
            $table->integer('user_id');
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
        Schema::dropIfExists('developer_stop_timers');
    }
};
