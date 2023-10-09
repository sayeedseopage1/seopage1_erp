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
        Schema::create('pending_parent_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('heading');
            $table->longText('description');
            $table->date('start_date');
            $table->date('due_date');
            $table->integer('project_id');
            $table->integer('category_id');
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->integer('board_column_id');
            $table->integer('estimate_hours');
            $table->integer('estimate_minutes');
            $table->string('deliverable_id');
            $table->integer('milestone_id');
            $table->integer('user_id');
            $table->string('acknowledgement');
            $table->string('sub_acknowledgement');
            $table->integer('need_authorization');
            $table->text('file');
            $table->integer('approval_status');
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
        Schema::dropIfExists('pending_parent_tasks');
    }
};
