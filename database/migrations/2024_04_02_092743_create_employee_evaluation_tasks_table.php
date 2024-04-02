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
        Schema::create('employee_evaluation_tasks', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('task_id');
            $table->string('task_name');
            $table->dateTime('assign_date');
            $table->dateTime('submission_date')->nullable();
            $table->integer('total_hours')->nullable();
            $table->integer('total_min')->nullable();
            $table->text('completed_work')->nullable();
            $table->integer('revision_number')->nullable();
            $table->integer('status')->default(0);
            $table->integer('rating_status')->default(0);
            $table->integer('evaluate_status')->default(0);
            $table->integer('cron_status')->default(0);
            $table->integer('sending_status')->default(0);
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
        Schema::dropIfExists('employee_evaluation_tasks');
    }
};
