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
        Schema::table('sticky_notes', function (Blueprint $table) {
            $table->string('note_type')->nullable()->after('colour');
            $table->unsignedBigInteger('client_id')->nullable()->after('note_type');
            $table->unsignedBigInteger('project_id')->nullable()->after('client_id');
            $table->unsignedBigInteger('milestone_id')->nullable()->after('project_id');
            $table->unsignedBigInteger('task_id')->nullable()->after('milestone_id');
            $table->unsignedBigInteger('sub_task_id')->nullable()->after('task_id');
            $table->unsignedBigInteger('deal_id')->nullable()->after('sub_task_id');
            $table->unsignedBigInteger('won_deal_id')->nullable()->after('deal_id');
            $table->dateTime('reminder_time')->nullable()->after('won_deal_id');
            $table->enum('pending_action_status' , [0, 1])->default(0)->after('reminder_time');
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
        Schema::table('sticky_notes', function (Blueprint $table) {
            $table->dropColumn(['note_type', 'client_id', 'project_id', 'milestone_id', 'task_id', 'sub_task_id', 'deal_id', 'won_deal_id', 'reminder_time', 'pending_action_status', 'status']);
        });
    }
};
