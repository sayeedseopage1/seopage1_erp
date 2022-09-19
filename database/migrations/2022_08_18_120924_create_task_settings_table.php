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
        Schema::create('task_settings', function (Blueprint $table) {
            $table->id();
            $table->enum('task_category', ['yes', 'no']);
            $table->enum('project', ['yes', 'no']);
            $table->enum('start_date', ['yes', 'no']);
            $table->enum('due_date', ['yes', 'no']);
            $table->enum('assigned_to', ['yes', 'no']);
            $table->enum('assigned_by', ['yes', 'no']);
            $table->enum('description', ['yes', 'no']);
            $table->enum('label', ['yes', 'no']);
            $table->enum('status', ['yes', 'no']);
            $table->enum('priority', ['yes', 'no']);
            $table->enum('make_private', ['yes', 'no']);
            $table->enum('time_estimate', ['yes', 'no']);
            $table->enum('hours_logged', ['yes', 'no']);
            $table->enum('custom_fields', ['yes', 'no']);
            $table->enum('copy_task_link', ['yes', 'no']);
            $table->enum('files', ['yes', 'no']);
            $table->enum('sub_task', ['yes', 'no']);
            $table->enum('comments', ['yes', 'no']);
            $table->enum('time_logs', ['yes', 'no']);
            $table->enum('notes', ['yes', 'no']);
            $table->enum('history', ['yes', 'no']);
            $table->timestamps();
        });

        DB::table('task_settings')->insert(
            array(
                'task_category' => 'yes',
                'project' => 'yes',
                'start_date' => 'yes',
                'due_date' => 'yes',
                'assigned_to' => 'yes',
                'assigned_by' => 'yes',
                'description' => 'yes',
                'label' => 'yes',
                'status' => 'yes',
                'priority' => 'yes',
                'make_private' => 'yes',
                'time_estimate' => 'yes',
                'hours_logged' => 'yes',
                'custom_fields' => 'yes',
                'copy_task_link' => 'yes',
                'files' => 'yes',
                'sub_task' => 'yes',
                'comments' => 'yes',
                'time_logs' => 'yes',
                'notes' => 'yes',
                'history' => 'yes',
            )
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_settings');
    }

};
