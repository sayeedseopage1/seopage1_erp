<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

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
            $table->integer('u_id')->nullable();
            $table->string('heading')->nullable();
            $table->longText('description')->nullable();
            $table->date('start_date')->nullable();
            $table->date('due_date')->nullable();
            $table->integer('project_id')->nullable();
            $table->integer('category_id')->nullable();
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->integer('board_column_id')->nullable();
            $table->integer('estimate_hours')->nullable();
            $table->integer('estimate_minutes')->nullable();
            $table->string('deliverable_id')->nullable();
            $table->integer('milestone_id')->nullable();
            $table->integer('user_id')->nullable();
            $table->integer('added_by')->nullable();
            $table->string('acknowledgement')->nullable();
            $table->string('sub_acknowledgement')->nullable();
            $table->longText('comment')->nullable();
            $table->boolean('need_authorization')->default(0);
            $table->boolean('approval_status')->nullable();
            $table->integer('authorize_by')->nullable();
            $table->boolean('independent_task_status')->default(0);
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
