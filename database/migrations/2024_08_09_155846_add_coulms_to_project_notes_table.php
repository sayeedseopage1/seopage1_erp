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
        Schema::table('project_notes', function (Blueprint $table) {
            $table->integer('reminder')->default(0)->after('last_updated_by');
            $table->string('option_item')->nullable()->after('reminder');
            $table->dateTime('reminder_time')->nullable()->after('option_item');
            $table->integer('milestone_id')->nullable()->after('reminder_time');
            $table->integer('task_id')->nullable()->after('milestone_id');
            $table->dateTime('project_reminder_time')->nullable()->after('task_id');
            $table->enum('pending_action_status' , [0, 1])->default(0)->after('project_reminder_time');
            $table->enum('status', ['Live', 'Completed', 'Deleted'])->default('Live')->after('pending_action_status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_notes', function (Blueprint $table) {
            $table->dropColumn(['reminder', 'option_item', 'reminder_time', 'milestone_id', 'task_id', 'project_reminder_time', 'pending_action_status', 'status']);
        });
    }
};
