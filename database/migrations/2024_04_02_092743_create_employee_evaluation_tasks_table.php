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
            $table->decimal('qw_first_chance')->nullable();
            $table->decimal('qw_first_revision')->nullable();
            $table->decimal('qw_second_revision')->nullable();
            $table->decimal('speed_of_work')->nullable();
            $table->decimal('understand_instruction')->nullable();
            $table->integer('lead_dev_id')->nullable();
            $table->longText('lead_dev_cmnt')->nullable();
            $table->decimal('avg_rating')->nullable();
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
        Schema::dropIfExists('employee_evaluation_tasks');
    }
};
